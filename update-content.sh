#!/bin/bash
# update-content.sh — Bani's content update helper
# Usage: ./update-content.sh  (edit lib/data.ts, then run)
set -e
cd "$(dirname "$0")"

echo "==> Building..."
npm run build

echo "==> Committing..."
git add -A
git commit -m "Update content"

echo "==> Pushing to GitHub (Vercel auto-deploys)..."
git push origin main

echo "==> Done. Live in ~1 min at https://baniadam-portfolio.vercel.app"
