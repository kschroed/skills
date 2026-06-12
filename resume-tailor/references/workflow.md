# Workflow Reference

## Phase 1: Assessment (before any writing)

Read the JD top to bottom. Ask these questions:

- **What's the actual job title in the JD?** This determines title strategy.
- **What's the comp band?** If listed, it signals the seniority bar — higher bands mean more exacting technical interviews.
- **What does "highly preferred" tell me?** These are the discriminators between candidates with similar core fit.
- **What phrases repeat?** ("force multiplier", "fault-tolerant", "distributed systems", "cloud-native") — these are the words to weave naturally.
- **What's listed as a hard requirement vs. a nice-to-have?** Languages, years of experience, specific products.

Then produce a candid fit assessment. Be willing to say "2-3 out of 10 shot" if accurate. Candidates at senior levels prefer honest framing.

**Then ask the candidate before drafting:**
1. Title strategy (match JD, one notch down, current role)
2. How to handle each major gap (skip, soften, address head-on)
3. Whether they have context not captured in `candidate-context.md` (recent projects, new certifications, etc.)

## Phase 2: Bullet patterns

The proven bullet shape:

```
**Bold action lead-in** — context with technical specifics; quantified outcome.
```

Examples of the pattern (fill in with actual candidate work):
- "**Architected and led HLD/LLD for the [system]** supporting [company/context], including [specific technical design decisions]; delivered [quantified outcome]."
- "**Cut [metric] from X to Y** via [specific automation approach], including [key implementation details]."

Strong verbs (active, ownership-signaling): Architected, Built, Led, Drove, Authored, Designed, Cut, Delivered, Pioneered, Established, Evaluated.

Weak verbs to avoid: Helped, Assisted, Worked on, Participated in, Contributed to.

Numbers matter: keep existing quantified claims, don't invent new ones. If the candidate doesn't have a number, use a qualifier ("large-scale", "enterprise-wide") rather than fabricating a figure.

## Phase 3: Iteration loop

For each edit:
1. Make the change via `str_replace` on the working `build_resume.js`
2. Rebuild + render preview images
3. View the preview JPG(s) to verify visual layout
4. If overflowing 2 pages, trim per `assets/build_helpers.md`
5. If anything looks off, fix and re-render

## Phase 4: Honest claim verification

Before delivering, scan the resume for any claim the candidate might struggle to defend in interview:

- **Skills list**: Every term should map to a real project or hands-on work. If asked "tell me about your X work" they would struggle, the term needs to come off or be softened.
- **Numbers**: Quantified claims must be real. Don't invent new ones.
- **Technologies**: If the JD lists technologies the candidate hasn't worked with, don't sprinkle them in. Honest framing in interview is far stronger than fabricated keywords.

## Recurring gap-handling patterns

| Gap type | Honest framing approach |
|---|---|
| Missing language (e.g., Go/Rust when candidate knows Python) | Show primary language prominently; frame ramp-up honestly: "Python-first; would ramp on Go in role" |
| Adjacent technology (heard of it, not hands-on) | Omit from skills list; in interview: "I've operated X as a consumer but haven't implemented it" |
| Title level mismatch | Use candidate's actual highest awarded title; note context (e.g., awarded via customer-impacting delivery) |
| Cloud depth (only one hyperscaler) | List the one the candidate knows deeply; frame others as "evaluation/PoC" |
| Publications vs. patents | Use the accurate term — never call a defensive publication or whitepaper a "patent" |

## Format-level decisions

- **Title in header**: "Job Title | Domain & Specialization" — adjustable subtitle based on JD focus
- **Section headers** (in order): Professional Summary, Core Competencies, Professional Experience, Education & Certifications
- **Skills section**: flat label + value rows; can use 2-column table layout but verify ATS parsing (see `references/ats.md`)
- **Font**: Arial (preferred) or Calibri
- **Colors**: Pick a professional accent color (navy, dark teal, or match target company brand); keep body text near-black
- **Page**: US Letter, ~0.75" margins all sides
- **Bullets**: `•` character with hanging indent
