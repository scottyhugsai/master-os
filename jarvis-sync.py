#!/usr/bin/env python3
"""
============================================================
 MASTER OS  ->  JARVIS  knowledge bridge
============================================================
 Exports every shared memory from Postgres into a markdown
 file, then ingests it into Jarvis's RAG knowledge base so
 Jarvis can surface shared context in chat automatically
 (no tool-calling needed — perfect for a small local model).

 Run it anytime to refresh Jarvis:
     python3 jarvis-sync.py

 Or schedule it (e.g. cron every few hours).
============================================================
"""
import os
import subprocess

import psycopg2

DB          = dict(host="127.0.0.1", port=5433, dbname="masteros", user="postgres")
EXPORT_DIR  = os.path.expanduser("~/.masteros/jarvis-export")
EXPORT_FILE = os.path.join(EXPORT_DIR, "shared-memory.md")
JARVIS_BIN  = os.path.expanduser("~/.jarvis/venv/bin/jarvis")


def db_password():
    pw = os.environ.get("MASTEROS_DB_PASSWORD", "").strip()
    if pw:
        return pw
    try:
        with open(os.path.expanduser("~/.masteros/db_password")) as f:
            return f.read().strip()
    except OSError:
        return ""


def main():
    conn = psycopg2.connect(password=db_password(), **DB)
    with conn.cursor() as cur:
        cur.execute("""
            SELECT COALESCE(v.name, 'Global'), m.kind, m.source, m.content, m.created_at
            FROM memories m
            LEFT JOIN ventures v ON v.id = m.venture_id
            ORDER BY v.name NULLS FIRST, m.created_at;
        """)
        rows = cur.fetchall()
    conn.close()

    os.makedirs(EXPORT_DIR, exist_ok=True)
    out = ["# Master OS — Shared Memory",
           "",
           "Memories shared across Hermes, Paperclip, Jarvis, and the operator.",
           ""]
    for venture, kind, source, content, created in rows:
        out.append(f"## {venture} — {kind} (via {source}, {created:%Y-%m-%d})")
        out.append(content)
        out.append("")
    with open(EXPORT_FILE, "w") as f:
        f.write("\n".join(out))
    print(f"Exported {len(rows)} memories -> {EXPORT_FILE}")

    jarvis = JARVIS_BIN if os.path.exists(JARVIS_BIN) else "jarvis"
    # best-effort: drop the previous version so we update instead of duplicating
    subprocess.run([jarvis, "knowledge", "remove", EXPORT_FILE], capture_output=True)
    result = subprocess.run([jarvis, "knowledge", "add", EXPORT_FILE])
    if result.returncode == 0:
        print("Synced into Jarvis knowledge base.")
    else:
        print("jarvis knowledge add returned non-zero — check the output above.")


if __name__ == "__main__":
    main()
