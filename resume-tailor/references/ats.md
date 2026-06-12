# ATS & Format Strategy

## PDF vs. DOCX in 2026

PDF is the default. The old "always DOCX" advice is outdated:
- Modern ATS (Workday, Greenhouse, Lever, Ashby, iCIMS, Eightfold) handle PDFs as well as DOCX
- PDF guarantees your formatting reaches the human reviewer unchanged
- The PDF must be text-selectable (not image-based) — verify with `pdftotext` extraction or visual highlight check

Generate both formats; deliver PDF first unless the candidate specifies otherwise.

## Eightfold and AI-driven ATS

Eightfold is AI-driven semantic matching, not pure keyword parsing. It's better than legacy ATS but still needs clean structured data extraction. Many enterprise portals use it.

Eightfold pattern: AI ranks candidates → human review follows. The ranking can be slightly lower without killing the application if human review happens (e.g., via referral).

## Known formatting risks

The standard pretty layout uses tables, which carry some parsing risk:

| Risk | Severity | Notes |
|---|---|---|
| Skills multi-column table | Medium-High | Category labels may detach from content during linear parse |
| Certs compact table | Low-Medium | Cert names are distinctive enough that recognition survives |
| Tab-aligned dates in job headers | Low | Modern parsers handle this fine |
| Unicode characters (arrows, bullets) | Low | May not render in all parsers — use `•` (U+2022) which is widely supported |

**Practical guidance:** If the candidate has a referral or HR contact who will route to human review, the pretty version is the right choice. The slight ATS rank cost is outweighed by the strong human impression. If applying cold with no internal connection, build an ATS-safe variant.

## ATS-safe variant — when to build one

Build a single-column variant when:
- Cold application, no referral
- Posting explicitly mentions ATS parsing requirements
- Candidate asks for it

The variant uses:
- Single-column layout throughout (no tables)
- Skills as inline comma-separated lists under bold category labels (no grid)
- Certs as bulleted list or inline list
- Plain ASCII characters only (no Unicode arrows; use "/" or hyphen)

## Verification step

Before declaring the PDF done, extract its text to verify critical content parses cleanly:

```bash
pdftotext <Candidate>-Resume-<Company>-<Role>.pdf - | grep -A 2 -E "<key-JD-keyword-1>|<key-JD-keyword-2>"
```

If key bullets show garbled text or wrong order, the layout has a parsing problem.

## What does NOT need fixing (standard safe choices)

- Font (Arial or Calibri) ✓
- Reverse-chronological work history ✓
- "Month YYYY" date format ✓
- Bullet character `•` ✓
- Section header names: "Professional Experience", "Education & Certifications", "Skills" / "Core Competencies" ✓

## Filename convention

`<CandidateName>-Resume-<Company>-<RoleShorthand>.pdf` — e.g., `Smith-Resume-Acme-PrincipalEngineer.pdf`.

Use a consistent naming scheme so the candidate can keep tailored versions distinct in their local archive.
