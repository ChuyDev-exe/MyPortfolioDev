#!/usr/bin/env bash
# =============================================================
#  deploy.sh — Netlify deploy helper (local or CI usage)
#
#  Usage:
#    ./scripts/deploy.sh staging   → draft deploy
#    ./scripts/deploy.sh prod      → production deploy (--prod)
#
#  Required env vars (export them or put in .env.local):
#    NETLIFY_AUTH_TOKEN
#    NETLIFY_SITE_ID          (production site)
#    NETLIFY_STAGING_SITE_ID  (staging site)
# =============================================================

set -euo pipefail

TARGET="${1:-staging}"
DIST_DIR="dist"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log()  { echo -e "${BLUE}[deploy]${NC} $*"; }
ok()   { echo -e "${GREEN}[deploy]${NC} ✅ $*"; }
warn() { echo -e "${YELLOW}[deploy]${NC} ⚠️  $*"; }
fail() { echo -e "${RED}[deploy]${NC} ❌ $*" >&2; exit 1; }

# ── Guards ────────────────────────────────────────────────────
[[ -z "${NETLIFY_AUTH_TOKEN:-}" ]] && fail "NETLIFY_AUTH_TOKEN is not set"
[[ ! -d "$DIST_DIR" ]] && fail "dist/ directory not found. Run 'npm run build' first."

# ── Deploy ────────────────────────────────────────────────────
case "$TARGET" in
  staging|draft)
    [[ -z "${NETLIFY_STAGING_SITE_ID:-}" ]] && fail "NETLIFY_STAGING_SITE_ID is not set"
    log "Deploying to STAGING (draft)…"
    netlify deploy \
      --dir="$DIST_DIR" \
      --site="$NETLIFY_STAGING_SITE_ID" \
      --auth="$NETLIFY_AUTH_TOKEN" \
      --message="Local staging deploy $(date -u)"
    ok "Staging deploy complete."
    ;;

  prod|production)
    [[ -z "${NETLIFY_SITE_ID:-}" ]] && fail "NETLIFY_SITE_ID is not set"
    warn "You are about to deploy to PRODUCTION."
    read -r -p "Type 'yes' to confirm: " CONFIRM
    [[ "$CONFIRM" != "yes" ]] && fail "Aborted."
    log "Deploying to PRODUCTION…"
    netlify deploy \
      --dir="$DIST_DIR" \
      --prod \
      --site="$NETLIFY_SITE_ID" \
      --auth="$NETLIFY_AUTH_TOKEN" \
      --message="Manual production deploy $(date -u)"
    ok "Production deploy complete."
    ;;

  *)
    fail "Unknown target '$TARGET'. Use 'staging' or 'prod'."
    ;;
esac
