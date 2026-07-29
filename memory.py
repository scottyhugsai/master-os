#!/usr/bin/env python3
"""
============================================================
 MASTER OS  —  Shared Memory CLI
============================================================
 remember : store text as semantic memory
 recall   : pull back the closest memories by MEANING

 Everything runs locally:
   - embeddings  -> Ollama  (nomic-embed-text, 768-dim)
   - storage     -> Postgres + pgvector  (container: masteros-memory, port 5433)

 DB PASSWORD resolves in this order, so any system can use it:
   1. environment variable  MASTEROS_DB_PASSWORD
   2. file                  ~/.masteros/db_password   (chmod 600)

 USAGE
   python3 memory.py remember "We chose pgvector for the memory layer" --venture 4 --kind decision
   python3 memory.py recall   "what database are we using"
   python3 memory.py recall   "roofing pricing" --venture 1 --limit 3

 VENTURE IDS (from the seed)
   1 = Guayas Roofing & Construction
   2 = Scotty Hugs Intelligence
   3 = Aqua Finish
   4 = Quoting Tool (SaaS)
   (omit --venture to store/search GLOBAL memory)
============================================================
"""
import os
import sys
import json
import argparse
import urllib.request
import urllib.error

# --- Auto-route to the Master OS venv if psycopg2 isn't on this interpreter ---
# Homebrew installs (e.g. semgrep pulling python@3.14) can change the default
# `python3`. If that interpreter lacks psycopg2, relaunch under our dedicated
# venv so every caller keeps working without changing how they invoke us.
try:
    import psycopg2  # noqa: F401
except ModuleNotFoundError:
    _venv_py = os.path.expanduser("~/.masteros/venv/bin/python")
    if os.path.exists(_venv_py) and os.path.realpath(sys.executable) != os.path.realpath(_venv_py):
        os.execv(_venv_py, [_venv_py, *sys.argv])
    raise

OLLAMA_URL  = "http://localhost:11434/api/embeddings"
EMBED_MODEL = "nomic-embed-text"

DB = dict(host="127.0.0.1", port=5433, dbname="masteros", user="postgres")


def db_password():
    """Env var first, then a protected fallback file."""
    pw = os.environ.get("MASTEROS_DB_PASSWORD", "").strip()
    if pw:
        return pw
    path = os.path.expanduser("~/.masteros/db_password")
    try:
        with open(path) as f:
            return f.read().strip()
    except OSError:
        return ""


def embed(text):
    """Ask Ollama to turn text into a 768-number vector."""
    payload = json.dumps({"model": EMBED_MODEL, "prompt": text}).encode("utf-8")
    req = urllib.request.Request(
        OLLAMA_URL, data=payload, headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.URLError as e:
        sys.exit(f"Could not reach Ollama at {OLLAMA_URL} — is it running?  ({e})")
    vec = data.get("embedding")
    if not vec:
        sys.exit(f"No embedding returned. Is '{EMBED_MODEL}' pulled in Ollama?  Response: {data}")
    return vec


def vec_literal(vec):
    """Format a Python list as a pgvector literal: [0.1,0.2,...]"""
    return "[" + ",".join(repr(float(x)) for x in vec) + "]"


def connect():
    pw = db_password()
    if not pw:
        sys.exit("No DB password found. Set MASTEROS_DB_PASSWORD or create ~/.masteros/db_password")
    return psycopg2.connect(password=pw, **DB)


def do_remember(args):
    vec = embed(args.content)
    conn = connect()
    with conn, conn.cursor() as cur:
        cur.execute(
            """INSERT INTO memories (venture_id, kind, source, content, embedding)
               VALUES (%s, %s, %s, %s, %s::vector) RETURNING id;""",
            (args.venture, args.kind, args.source, args.content, vec_literal(vec)),
        )
        new_id = cur.fetchone()[0]
    conn.close()
    scope = f"venture {args.venture}" if args.venture else "global"
    print(f"Remembered  (id {new_id}, {args.kind}/{args.source}, {scope}).")


def do_recall(args):
    vec = embed(args.query)
    where, params = "WHERE embedding IS NOT NULL", [vec_literal(vec)]
    if args.venture is not None:
        where += " AND venture_id = %s"
        params.append(args.venture)
    params.extend([vec_literal(vec), args.limit])
    sql = f"""
        SELECT id, kind, source, content,
               1 - (embedding <=> %s::vector) AS similarity
        FROM memories
        {where}
        ORDER BY embedding <=> %s::vector
        LIMIT %s;
    """
    conn = connect()
    with conn, conn.cursor() as cur:
        cur.execute(sql, params)
        rows = cur.fetchall()
    conn.close()
    if not rows:
        print("No memories matched (the store may be empty).")
        return
    for rid, kind, source, content, sim in rows:
        print(f"\n[{sim:.0%} match]  id {rid}  ({kind}/{source})\n   {content}")
    print()


def main():
    p = argparse.ArgumentParser(prog="memory", description="Master OS shared memory")
    sub = p.add_subparsers(dest="cmd", required=True)

    r = sub.add_parser("remember", help="store a memory")
    r.add_argument("content", help="the text to remember")
    r.add_argument("--venture", type=int, default=None, help="venture id 1-4; omit for global")
    r.add_argument("--kind", default="note",
                   help="decision | research | agent_output | note | market | opportunity")
    r.add_argument("--source", default="scott",
                   help="hermes | paperclip | jarvis | scott | n8n")
    r.set_defaults(func=do_remember)

    q = sub.add_parser("recall", help="retrieve memories by meaning")
    q.add_argument("query", help="what you want to remember")
    q.add_argument("--venture", type=int, default=None, help="limit to one venture id")
    q.add_argument("--limit", type=int, default=5, help="how many results (default 5)")
    q.set_defaults(func=do_recall)

    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
