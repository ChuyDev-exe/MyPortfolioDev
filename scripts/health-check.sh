#!/usr/bin/env bash
# =============================================================
#  health-check.sh — Validate a URL returns HTTP 200
#
#  Usage:
#    ./scripts/health-check.sh https://jesusvelez.xyz
#    ./scripts/health-check.sh https://staging-url.netlify.app
# =============================================================

set -euo pipefail

URL="${1:-https://jesusvelez.xyz}"
MAX_RETRIES="${2:-5}"
RETRY_DELAY="${3:-10}"

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log()  { echo -e "${BLUE}[health]${NC} $*"; }
ok()   { echo -e "${GREEN}[health]${NC} ✅ $*"; }
fail() { echo -e "${RED}[health]${NC} ❌ $*" >&2; exit 1; }

log "Checking: $URL (max $MAX_RETRIES attempts, ${RETRY_DELAY}s delay)"

for i in $(seq 1 "$MAX_RETRIES"); do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "$URL" || echo "000")
  log "Attempt $i/$MAX_RETRIES — HTTP $STATUS"

  if [[ "$STATUS" == "200" ]]; then
    ok "Site is healthy at $URL"
    exit 0
  fi

  [[ "$i" -lt "$MAX_RETRIES" ]] && sleep "$RETRY_DELAY"
done

fail "Health check failed after $MAX_RETRIES attempts (last status: $STATUS)"
