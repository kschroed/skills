// ── Resume Build Scaffolding ──────────────────────────────────────────────────
// This is a starter template. Copy and adapt for each candidate/role.
// Run with: node baseline_resume.js
// Output:   /mnt/user-data/outputs/<candidate>-<role>-Resume.docx
//
// Dependencies: npm install -g docx
// ─────────────────────────────────────────────────────────────────────────────

const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  LevelFormat, TabStopType, TabStopPosition, BorderStyle,
} = require('docx');
const fs = require('fs');

// ── Brand Colors — customize per candidate or role ───────────────────────────
const ACCENT = "2E5FA3";   // e.g. NVIDIA green = 76B900, AWS orange = FF9900
const DARK   = "1A1A1A";
const MID    = "444444";
const LIGHT  = "666666";

// ── Helpers ───────────────────────────────────────────────────────────────────
const divider = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 2 } },
  spacing: { before: 100, after: 100 },
  children: []
});

const sectionHeader = (text) => new Paragraph({
  spacing: { before: 140, after: 50 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 2 } },
  children: [new TextRun({ text, bold: true, size: 22, color: DARK, font: "Arial" })]
});

const jobHeader = (title, company, dates) => new Paragraph({
  spacing: { before: 130, after: 30 },
  tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
  children: [
    new TextRun({ text: title, bold: true, size: 20, color: DARK, font: "Arial" }),
    new TextRun({ text: "  |  ", size: 20, color: LIGHT, font: "Arial" }),
    new TextRun({ text: company, size: 20, color: ACCENT, font: "Arial" }),
    new TextRun({ text: "\t", font: "Arial" }),
    new TextRun({ text: dates, size: 19, color: LIGHT, italics: true, font: "Arial" }),
  ]
});

const bullet = (text) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { before: 30, after: 30 },
  children: [new TextRun({ text, size: 20, color: MID, font: "Arial" })]
});

const skillRow = (label, value) => new Paragraph({
  spacing: { before: 28, after: 28 },
  children: [
    new TextRun({ text: label + ":  ", bold: true, size: 19, color: DARK, font: "Arial" }),
    new TextRun({ text: value, size: 19, color: MID, font: "Arial" }),
  ]
});

const italic = (text) => new Paragraph({
  spacing: { before: 30, after: 40 },
  children: [new TextRun({ text, size: 19, color: LIGHT, font: "Arial", italics: true })]
});

// ── Document ──────────────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: "\u2022",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 440, hanging: 260 } } }
      }]
    }]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 20, color: MID } } }
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },  // US Letter
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }  // 0.75"
      }
    },
    children: [

      // ── NAME & CONTACT ────────────────────────────────────────────────────
      new Paragraph({
        spacing: { before: 0, after: 40 },
        children: [new TextRun({ text: "Candidate Name", bold: true, size: 48, color: DARK, font: "Arial" })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 30 },
        children: [new TextRun({ text: "Professional Title", size: 24, color: ACCENT, bold: true, font: "Arial" })]
      }),
      new Paragraph({
        spacing: { before: 0, after: 10 },
        tabStops: [
          { type: TabStopType.LEFT, position: 2700 },
          { type: TabStopType.LEFT, position: 5400 },
        ],
        children: [
          new TextRun({ text: "email@example.com", size: 19, color: LIGHT, font: "Arial" }),
          new TextRun({ text: "\t+1-000-000-0000", size: 19, color: LIGHT, font: "Arial" }),
          new TextRun({ text: "\tCity, State", size: 19, color: LIGHT, font: "Arial" }),
          new TextRun({ text: "   |   linkedin.com/in/handle", size: 19, color: LIGHT, font: "Arial" }),
        ]
      }),

      divider(),

      // ── SUMMARY ───────────────────────────────────────────────────────────
      sectionHeader("PROFESSIONAL SUMMARY"),
      new Paragraph({
        spacing: { before: 60, after: 60 },
        children: [new TextRun({
          text: "2-4 sentence summary. Lead with years of experience and core expertise. " +
                "Highlight what makes this candidate uniquely relevant to the target role. " +
                "Close with a credibility signal (scale, recognition, or outcome).",
          size: 20, color: MID, font: "Arial"
        })]
      }),

      divider(),

      // ── CORE COMPETENCIES ─────────────────────────────────────────────────
      sectionHeader("CORE COMPETENCIES"),
      new Paragraph({ spacing: { before: 60, after: 0 }, children: [] }),
      skillRow("Skill Category 1", "tool, tool, tool, tool"),
      skillRow("Skill Category 2", "tool, tool, tool, tool"),
      skillRow("Skill Category 3", "tool, tool, tool, tool"),
      skillRow("Skill Category 4", "tool, tool, tool, tool"),
      skillRow("Skill Category 5", "tool, tool, tool, tool"),
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [] }),

      divider(),

      // ── EXPERIENCE ────────────────────────────────────────────────────────
      sectionHeader("PROFESSIONAL EXPERIENCE"),

      // Role 1 — Most Recent
      jobHeader("Job Title", "Company Name — Division", "Mon YYYY – Present"),
      italic("One sentence framing the scope and focus of this role."),
      bullet("Outcome-led bullet. What you built, what you used, what the result was. Quantify where possible."),
      bullet("Outcome-led bullet."),
      bullet("Outcome-led bullet."),

      // Role 2
      jobHeader("Job Title", "Company Name — Division", "Mon YYYY – Mon YYYY"),
      italic("One sentence framing the scope and focus of this role."),
      bullet("Outcome-led bullet."),
      bullet("Outcome-led bullet."),

      // Role 3
      jobHeader("Job Title", "Company Name — Division", "Mon YYYY – Mon YYYY"),
      bullet("Outcome-led bullet."),
      bullet("Outcome-led bullet."),

      // Early career — condense to 1-2 bullets for roles 15+ years old
      jobHeader("Early Career Title(s)", "Company Name — Division", "Mon YYYY – Mon YYYY"),
      bullet("Brief summary covering the most relevant technical work from this period. " +
             "For senior candidates, one tight bullet per early role is usually sufficient."),

      divider(),

      // ── EDUCATION & CERTIFICATIONS ────────────────────────────────────────
      sectionHeader("EDUCATION & CERTIFICATIONS"),
      new Paragraph({
        spacing: { before: 60, after: 40 },
        children: [
          new TextRun({ text: "Degree, Major", bold: true, size: 20, color: DARK, font: "Arial" }),
          new TextRun({ text: "  —  University Name", size: 20, color: MID, font: "Arial" }),
        ]
      }),
      new Paragraph({
        spacing: { before: 0, after: 60 },
        children: [new TextRun({
          text: "Certification 1  •  Certification 2  •  Certification 3",
          size: 19, color: MID, font: "Arial"
        })]
      }),

    ]
  }]
});

// ── Output ────────────────────────────────────────────────────────────────────
const OUTPUT = "/mnt/user-data/outputs/Resume.docx";  // update filename per candidate/role

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log(`Written to ${OUTPUT}`);
});
