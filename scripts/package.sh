#!/bin/bash
# package.sh — Build a .skill file from a skill directory.
#
# Usage:
#   ./scripts/package.sh <skill-name>             # generic (no personal files)
#   ./scripts/package.sh <skill-name> --personal  # includes your filled-in context files
#
# The generic build is safe to share publicly.
# The --personal build includes candidate-context.md and baseline_resume.js —
# use it only for your own Claude Desktop installation.

set -euo pipefail

SKILL_NAME="${1:-}"
PERSONAL="${2:-}"

if [ -z "$SKILL_NAME" ]; then
  echo "Usage: ./scripts/package.sh <skill-name> [--personal]"
  echo ""
  echo "Available skills:"
  find . -maxdepth 2 -name "SKILL.md" | sed 's|./||;s|/SKILL.md||' | sed 's/^/  /'
  exit 1
fi

if [ ! -d "$SKILL_NAME" ]; then
  echo "Error: directory '$SKILL_NAME' not found."
  exit 1
fi

if [ ! -f "$SKILL_NAME/SKILL.md" ]; then
  echo "Error: '$SKILL_NAME/SKILL.md' not found — is this a valid skill directory?"
  exit 1
fi

OUTPUT="${SKILL_NAME}.skill"
TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

cp -r "$SKILL_NAME" "$TMPDIR/"

if [ "$PERSONAL" != "--personal" ]; then
  # Strip personal files so the package is safe to share
  find "$TMPDIR/$SKILL_NAME" -name "candidate-context.md" -delete
  find "$TMPDIR/$SKILL_NAME" -name "baseline_resume.js" -delete
  find "$TMPDIR/$SKILL_NAME" -name "*.pdf" -delete
  find "$TMPDIR/$SKILL_NAME" -name "*.docx" -delete
fi

(cd "$TMPDIR" && zip -qr - "$SKILL_NAME") > "$OUTPUT"

echo "Built: $OUTPUT"
if [ "$PERSONAL" = "--personal" ]; then
  echo "Note: this package contains your personal context files. Do not share it publicly."
fi
