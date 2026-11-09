# Latest Public Repository Review — 2026-11-10

Repository: https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate  
Reviewed branch shown by GitHub: `main`  
Review method: public GitHub pages and raw-file views; static/web inspection only. No clone, PHP runtime, WordPress install, Elementor editor, CI execution or Site A→Site B test was performed in this review.  
Commit SHA: **not exposed by the fetched repository page in this review; UNKNOWN**. Do not infer it.

## 1. What the currently rendered repository page says

The fetched GitHub repository page shows:
- Public repository, default branch `main`.
- History count: 62 commits.
- Top-level paths include `.aistudio/artifacts/brain`, `.github/workflows`, `docs`, `elementor-addon-suite`, `sedrazavi-addons`, `sedrazavi-companion`, `sedrazavi-designer-core`, `sedrazavi-designer-theme`, `src`, and `wordpress-theme`.
- The currently rendered README describes ecosystem version `6.0.0 Sovereign Edition`, 31 native Elementor widgets, 30 editable templates, custom project kit ZIP, and 228 automated tests.

These are repository claims, not independently verified runtime outcomes.

## 2. Important inconsistencies / evidence gaps

### A. Test count is not reconciled
- Rendered repository README: claims 228 automated tests and commands such as `npm run test:mpca`, `npm run lint`, `npm run build`.
- `audit-report.md` is dated 2026-10-28 and reports 190/190 tests.
- `CODE_LEVEL_REMEDIATION_PLAN.md` reports 228 tests and describes additional remediations.
- A fetched raw `package.json` snapshot (indexed last week; may lag the currently rendered README) lists `test:all` as five chained scripts: `test-inc-completeness`, `test-css-coverage`, `test-phase4-security-popups`, `test-phase5-phase6-duplicator`, `test-phase10-gutenberg-sovereign-audit`; it lists `lint` as `tsc --noEmit`. It does not show `test:mpca` in that snapshot.

**Conclusion:** the live main-branch state and the fetched raw package snapshot need commit-pinned reconciliation. Until the exact current `package.json`, workflow and CI logs are inspected at one SHA, the 228 count is `EXISTS_UNVERIFIED`, not VERIFIED.

### B. Audit report is stale relative to the currently rendered README
The audit report itself is dated 2026-10-28. It claims P0/P1 fixes and 190 passing tests. The remediation plan claims further fixes and 228 tests, but the claims require code-level verification at the current commit. Do not use a dated audit report as proof of current source state.

### C. README variants / cached source discrepancy
The rendered GitHub root page currently shows a newer-looking 6.0.0 Sovereign README with the 31/30/228 claims. A raw `README.md` fetch returned a different, older legal-theme-oriented document that describes React 19 + Vite and 15 shortcodes. This may be a stale raw cache or branch/content discrepancy. Resolve by fetching the current file at the exact commit SHA, not by choosing whichever version looks newer.

### D. Multiple plugin/core/theme roots remain visible
The repository tree still contains at least three plugin roots (`elementor-addon-suite`, `sedrazavi-addons`, `sedrazavi-companion`) plus designer core/theme and `wordpress-theme`. A remediation document proposes `elementor-addon-suite` as sovereign core and the others as modular packs/adapters. This architecture is a plan/claim until actual bootstrap, data ownership, REST, widget/block registration and migration are traced.

### E. Native Elementor widgets/templates not independently counted
The README claims 31 widgets and 30 templates. The remediation plan says 31 visual native widgets were registered and 30 templates are JSON. However, the fetched pages did not expose enough current source files to verify each class, registration hook, controls, renderer, template import and editor edit/save. Therefore:
- Native widget count: `EXISTS_UNVERIFIED`.
- Editable Elementor template count: `EXISTS_UNVERIFIED`.
- Elementor Free/Pro bridge behavior: `EXISTS_UNVERIFIED`.
- Cross-site portability: `EXISTS_UNVERIFIED`.

### F. Packaging and security claims need runtime proof
The remediation plan describes dependency graph resolution, cycle/conflict checks, rollback and custom project kit generation. Those must be tested against missing dependencies, conflicts, malformed/tampered ZIPs, ZipArchive/write failures, idempotent install, upgrade and rollback. A code method or static source assertion is not sufficient.

## 3. Previously known issues that remain mandatory revalidation targets

1. REST nonce vs identity/capability separation and per-object ownership.
2. Confidential legal case CPT visibility, REST exposure, attachments, search/sitemap/feed/cache leakage.
3. Shortcode activation/onboarding behavior; shortcode must not be the default page-building path.
4. Actual native widget registry vs catalogue/shortcode renderers.
5. Template JSON import/editability and Pro dependency declarations.
6. Package Manager dependency/conflict/security/rollback completeness.
7. PHP lint, PHPUnit/WPCS, live WordPress tests and editor E2E coverage.
8. Version compatibility matrix consistency across README, plugin headers, composer/package manifests and CI.

## 4. Priority verdict

| Priority | Required action | Why |
|---|---|---|
| P0 | Re-fetch exact current commit + reconcile README/package.json/workflows/test logs | Cannot trust version/test count until consistent |
| P0 | Revalidate REST auth, object ownership, private legal data and attachments | Confidential data breach risk |
| P1 | Verify actual Elementor Widget_Base registry and each widget controls/render | Core Elementor-first product claim |
| P1 | Import/open/edit/save every claimed Elementor template | JSON existence is not editor compatibility |
| P1 | Run Site A→Site B portability gate | Central portability promise |
| P1 | Test Package Manager lifecycle and malicious archives | Install/update/rollback security |
| P2 | Expand design banks and niche packs after golden slice | Avoid scaling unproven architecture |

## 5. What changed in this prompt pack because of this review

- Added a mandatory commit-pinned baseline audit and README/CI/test reconciliation.
- Added exact native Elementor widget contract and per-widget verification ledger.
- Added template import + editor open + edit/save + frontend render requirements.
- Clarified PHP Theme Template vs Elementor Template semantics.
- Added Gutenberg block registration and dynamic PHP render requirements.
- Added independent Site A→Site B portability test.
- Added package security, dependency graph, rollback and artifact verification gates.
- Changed execution strategy to one golden vertical slice, then small batches.

## 6. Sources reviewed

- Repository root and currently rendered README: https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate
- Audit report: https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate/blob/main/audit-report.md
- Code-level remediation plan: https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate/blob/main/CODE_LEVEL_REMEDIATION_PLAN.md
- Raw README view (returned older/cached content): https://raw.githubusercontent.com/Aqamirrazavi/Sedrazavi-WPtemplate/main/README.md
- Raw package.json view (returned indexed snapshot): https://raw.githubusercontent.com/Aqamirrazavi/Sedrazavi-WPtemplate/main/package.json

**Bottom line:** repository has more extensive architecture and remediation documentation than the earlier snapshot, but the central product claims (native 31 widgets, 30 editable templates, 228 tests, cross-site portable kit) still need commit-pinned source inspection and runtime evidence. This is not a claim that the latest code is broken; it is a statement that the available public evidence is insufficient to mark those claims VERIFIED.
