#!/usr/bin/env bash
# Aegis — Master OS security gate. Run before any deploy or push.
# Usage: aegis [path]   (default: current directory)
# Exit 0 = PASS (cleared). Non-zero = FAIL (deploy vetoed).
set -uo pipefail
TARGET="${1:-$PWD}"
MEM="$HOME/Desktop/projects/master-os/memory.py"
echo "================================================"
echo " Aegis security gate  —  $TARGET"
echo "================================================"
FAIL=0
FOUND=""

if command -v gitleaks >/dev/null 2>&1; then
  echo ">> gitleaks (leaked secrets/keys)..."
  if gitleaks dir "$TARGET" --no-banner; then echo "   clean"; else FAIL=1; FOUND="$FOUND secrets"; fi
fi

if command -v semgrep >/dev/null 2>&1; then
  echo ">> semgrep (code vulnerabilities)..."
  if semgrep scan --config auto --error --quiet "$TARGET"; then echo "   clean"; else FAIL=1; FOUND="$FOUND code-vulns"; fi
fi

if command -v trivy >/dev/null 2>&1; then
  echo ">> trivy (vulnerable deps & misconfig)..."
  if trivy fs --quiet --scanners vuln,misconfig --severity HIGH,CRITICAL --exit-code 1 "$TARGET"; then echo "   clean"; else FAIL=1; FOUND="$FOUND dependencies"; fi
fi

echo "------------------------------------------------"
if [ "$FAIL" -eq 0 ]; then
  VERDICT="PASS - cleared for deploy: $TARGET"
  echo "PASS - cleared for deploy."
else
  VERDICT="FAIL - DEPLOY VETOED (${FOUND# }): $TARGET"
  echo "FAIL - deploy vetoed. Issues:${FOUND}"
fi
python3 "$MEM" remember "$VERDICT" --kind security --source aegis >/dev/null 2>&1 || true
echo "================================================"
exit $FAIL
