#!/usr/bin/env bash
# =============================================================
#  rollback.sh — Roll back to a previous Netlify deploy
#
#  Usage:
#    ./scripts/rollback.sh                    → interactive list
#    ./scripts/rollback.sh <deploy-id>        → roll back to id
#
#  Required env vars:
#    NETLIFY_AUTH_TOKEN
#    NETLIFY_SITE_ID
# =============================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log()  { echo -e "${BLUE}[rollback]${NC} $*"; }
ok()   { echo -e "${GREEN}[rollback]${NC} ✅ $*"; }
warn() { echo -e "${YELLOW}[rollback]${NC} ⚠️  $*"; }
fail() { echo -e "${RED}[rollback]${NC} ❌ $*" >&2; exit 1; }

[[ -z "${NETLIFY_AUTH_TOKEN:-}" ]] && fail "NETLIFY_AUTH_TOKEN is not set"
[[ -z "${NETLIFY_SITE_ID:-}" ]]    && fail "NETLIFY_SITE_ID is not set"

DEPLOY_ID="${1:-}"

# ── If no deploy ID supplied, list recent deploys ─────────────
if [[ -z "$DEPLOY_ID" ]]; then
  log "Fetching recent deploys…"
  DEPLOYS=$(curl -s \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/deploys?per_page=10")

  echo ""
  echo "Recent production deploys:"
  echo "──────────────────────────────────────────────────────"
  echo "$DEPLOYS" | jq -r '.[] | select(.state == "ready") |
    "ID: \(.id)  |  \(.created_at)  |  \(.title // "no title")"'
  echo ""
  read -r -p "Enter deploy ID to roll back to: " DEPLOY_ID
fi

[[ -z "$DEPLOY_ID" ]] && fail "No deploy ID provided."

warn "Rolling back site $NETLIFY_SITE_ID to deploy $DEPLOY_ID"
read -r -p "Type 'yes' to confirm rollback: " CONFIRM
[[ "$CONFIRM" != "yes" ]] && fail "Rollback aborted."

log "Restoring deploy $DEPLOY_ID…"
RESULT=$(curl -s -X POST \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  "https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/deploys/$DEPLOY_ID/restore")

STATE=$(echo "$RESULT" | jq -r '.state // "unknown"')
URL=$(echo "$RESULT" | jq -r '.ssl_url // .url // "unknown"')

ok "Rollback complete — state: $STATE"
log "Live URL: $URL"
