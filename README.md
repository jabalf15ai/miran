# مِران (MIRAN)

**نظام التأهيب الميداني للمشغل المبتدئ**  
Industrial process-safety readiness trainer for entry-level oil & gas operators.

Product thesis: novice operators fail from **behavioral** barriers (hesitation, sequence why, correcting a superior) — not from lack of syllabus knowledge.

## Live

| Surface | URL |
|---------|-----|
| **Learning path (v1)** | https://miran-alpha.vercel.app |
| **Ops platform (v3)** | https://miran-alpha.vercel.app/platform |
| **UI mockups** | https://miran-alpha.vercel.app/mockups |
| **Vercel dashboard** | https://vercel.com/jabalf15ai-7693s-projects/miran |
| **GitHub** | https://github.com/jabalf15ai/miran |

Clean aliases: `/learn` → learning, `/platform` → platform, `/mockups` → mockups.

## Product map (one product, two modes)

| Mode | File | Role |
|------|------|------|
| **التعلّم** | `index.html` | Curriculum: concept, tags, PZV, isolation/gas/radio drills, substation, quiz, personal report |
| **المنصة** | `platform.html` | Ops layer: trainee registry, scenario-driven isolation, gas, radio, behavioral diagnostics (initiative / sequence / correction), supervisor board, scenario authoring, audit report |
| **النماذج** | `mockups.html` | Static annotated design screens for review / submission |

Shared chrome: product bar at the top of learning + platform (`التعلّم · المنصة · النماذج`).

## Open locally

- Learning: open `index.html` (works offline / `file://`)
- Platform: open `platform.html`
- Mockups: open `mockups.html`
- Decisions: see `DECISIONS.md`

## Stack

Vanilla HTML/CSS/JS · RTL Arabic · Google Fonts only · no build step · no backend

## Persistence

| Key | App |
|-----|-----|
| `miran_state_v1` | Learning session (quiz, drill aggregates, event log) |
| `miran_v3_db` | Platform trainees, axes, events |
| `miran_v3_scenarios` | User-authored isolation scenarios (beyond CORE pack) |

Both wrap `localStorage` with try/catch and in-memory fallback.
