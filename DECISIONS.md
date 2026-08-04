# مِران (MIRAN) — DECISIONS

## Assumptions

1. **Audience language:** Full Arabic UI and instructional prose; Latin equipment tags (`FCV-101`, `ESDV`, `PZHH`) stay LTR via `unicode-bidi: isolate` / `.tag`.
2. **No facility procedures:** Standards table leaves the third column empty for local document numbers; the product never invents site-specific SOP IDs.
3. **Isolation process model:** Body pressure is binary for training (12.4 bar or 0.0). Flow is ~100% through the CV path, ~92% when only the bypass is open, and collapses when both blocks are shut without a bypass. A red “اضطراب عملية” state appears below 70% flow.
4. **Gas geometry:** 9×9 Chebyshev grid. Plume/edge generation and start/muster filters follow the specified algorithm with up to 60 regeneration retries, plus a deterministic fallback if all retries fail (should be rare).
5. **Radio timing:** Stage 1 starts at 45s. Stage 2 keeps the same interval clock and floors remaining time at 28s when entering stage 2. Timeout fails either stage.
6. **Readback injection:** ~60% of stage-2 runs inject exactly one error into one of five labeled lines; error types rotate by line kind (tag transposition, generic status, wrong wind, wrong casualties, swapped badge digits).
7. **Persistence:** `localStorage` key `miran_state_v1` with try/catch and in-memory fallback. Event log capped at 300 entries. Isolation mid-state is not persisted—only aggregates and the event log.
8. **Offline:** After Google Fonts cache (or system fallbacks if fonts blocked), the app runs with no network calls. Opens from `file://`.
9. **Accessibility:** Native `<button>` controls throughout; gas cells expose row/column `aria-label`; focus-visible rings; `prefers-reduced-motion` kills transitions; print CSS reveals all panels.

## Simplifications

- Isolation P&ID is schematic, not a full ISA drawing set.
- Gas “windsock” is a directional SVG marker, not fluid simulation.
- Substation content is educational static material (no live electrical simulator).
- Quiz is 14 fixed items (not adaptive item-response).
- Sticky tab bar uses a semi-opaque backdrop for usability; header itself is not sticky (per IA: sticky-free header, tab bar remains usable on scroll).

## What I would build differently next

- Server-authored scenario packs and anonymized cohort analytics (out of scope here).
- Spatial audio cues for radio channel congestion.
- Partial-stroke animation tied to real valve travel times.
- Instructor mode with forced error seeds for live drills.
- Automated Playwright suite encoding the acceptance checklist (gas 30×, radio 20× injection rate, LOTO under pressure).

## Deliverable paths

| File | Role |
|------|------|
| `mockups.html` | Static annotated design review (18 screens) |
| `index.html` | Production single-file app |
| `DECISIONS.md` | This note |

## Acceptance self-check (manual / scripted)

- [x] Single file, vanilla JS/CSS, Google Fonts only external
- [x] Storage guard + report notice when blocked
- [x] Gas algorithm with regenerate ≤60; player start outside plume/edge
- [x] Keyboard gas controls only while tab 04 active
- [x] Isolation disables controls on completion; LOTO under pressure does not complete step 8
- [x] Radio pool shuffled once per scenario (not per render)
- [x] Readback confirm-with-error = fail; object-to-clean = fail
- [x] Timers cleared on terminal radio outcomes
- [x] RTL + LTR tags; print CSS; reduced motion
