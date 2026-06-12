# Build Pipeline

## Preflight check

Run this before starting any build. If anything is missing, stop and resolve it first.

```bash
echo "=== Environment Check ==="
node --version 2>/dev/null   && echo "✓ Node.js" || echo "✗ Node.js not found — required for the DOCX builder"
soffice --version 2>/dev/null | head -1 && echo "✓ LibreOffice" || echo "✗ LibreOffice (soffice) not found — PDF conversion will fail"
pdftoppm -v 2>&1 | head -1   && echo "✓ pdftoppm"  || echo "✗ pdftoppm not found — preview rendering will fail"
pdftotext -v 2>&1 | head -1  && echo "✓ pdftotext" || echo "✗ pdftotext not found — ATS verification will fail"
echo "========================="
```

Node.js ≥ 18 is required. LibreOffice and poppler (`pdftoppm`, `pdftotext`) are system packages; if missing in the Claude Desktop environment they will need to be installed by the user before this skill can produce PDFs.

## Setup

Working directory: `/home/claude/resume/` (create if needed). **Never edit `assets/baseline_resume_template.js` in place** — always copy to a working location first.

```bash
# 1. Create working directory and copy the template
mkdir -p /home/claude/resume
cp /mnt/skills/<skill-path>/resume-tailor/assets/baseline_resume_template.js /home/claude/resume/build_resume.js

# 2. Install pinned npm dependencies into the working directory
cp /mnt/skills/<skill-path>/resume-tailor/package.json /home/claude/resume/
cd /home/claude/resume
npm install
# This installs docx ^9.0.0 locally — no global install needed or used
```

Now edit `build_resume.js` with the candidate's actual content.

## Build → preview cycle

```bash
cd /home/claude/resume

# 3. Build the DOCX (uses local node_modules — no NODE_PATH needed)
node build_resume.js

# 4. Convert to PDF
soffice --headless --convert-to pdf <Candidate>-Resume-<Company>-<Role>.docx

# 5. Render preview images for visual review
rm -f preview-*.jpg
pdftoppm -jpeg -r 110 <Candidate>-Resume-<Company>-<Role>.pdf preview
ls preview-*.jpg
```

View each preview JPG to confirm the layout fits on 2 pages. If 3 pages appear, trim.

## Trimming priorities when overflowing 2 pages

1. **Oldest role bullets first.** Roles 15+ years old earn the least space.
2. **Combine adjacent bullets** if related.
3. **Cert layout** — try inline list instead of table to save vertical space.
4. **Bullet line trims** — remove parenthetical asides.
5. **Last resort**: drop one of the weakest certifications.

Never trim the active-role bullets (current role, most recent key role) — those carry the JD signal.

## Validation

```bash
# Verify PDF text extracts cleanly — run against key JD keywords
pdftotext <Candidate>-Resume-<Company>-<Role>.pdf - | grep -A 2 -E "<keyword-1>|<keyword-2>"
```

If key bullets show garbled text or wrong order, the layout has a parsing problem.

## Final delivery

```bash
cp /home/claude/resume/<Candidate>-Resume-<Company>-<Role>.docx /mnt/user-data/outputs/
cp /home/claude/resume/<Candidate>-Resume-<Company>-<Role>.pdf /mnt/user-data/outputs/
```

Present with `present_files` — PDF first, DOCX second.

## Commands used by this skill

| Command | Version requirement | Purpose | Network access |
|---|---|---|---|
| `node` | ≥ 18.0.0 | Runs the DOCX builder | None |
| `npm install` | any | Installs `docx ^9.0.0` locally | npm registry (one-time) |
| `soffice --headless` | any recent | Converts DOCX to PDF via LibreOffice | None |
| `pdftoppm` | any recent | Renders PDF pages as JPG for preview | None |
| `pdftotext` | any recent | Extracts text for ATS verification | None |
