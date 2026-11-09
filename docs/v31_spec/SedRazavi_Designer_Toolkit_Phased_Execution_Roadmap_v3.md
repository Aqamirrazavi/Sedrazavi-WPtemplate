# SedRazavi Phased Execution Roadmap v3 — Evidence-Gated Native Build

**نسخه:** 3.0 | **مبنای کار:** Master Prompt v5 + Native Portability Spec v31 + Master Spec v30.

## اصول کنترل پروژه
- یک فاز در هر نوبت؛ تأیید صریح قبل از فاز بعد.
- ابتدا audit read-only؛ هیچ کد/داده‌ای پیش از baseline و approval تغییر نکند.
- Golden Slice قبل از توسعه بانک بزرگ.
- تعداد catalogued / implemented / tested / verified جداگانه گزارش شود.
- هر تست بدون اجرای واقعی `NOT_RUN` است.

## ترتیب فازها و دروازه‌ها

| فاز | خروجی | Gate برای عبور |
|---|---|---|
| 0. Baseline Audit | commit SHA, inventory, plugin boundaries, route/widget/block/template/package census, test reconciliation | همه یافته‌ها دارای file/line/evidence؛ بدون تغییر کد |
| 1. P0 Security & Privacy | REST/RBAC/ownership, confidential data, archive security | anonymous/IDOR/role tests PASS؛ P0 بسته |
| 2. Architecture & Build | single source of truth plan, asset/dependency/build manifest, CI | no conflicting bootstrap; reproducible build |
| 3. WP Clean Install | installable theme/core plugin, activation, fallback, uninstall | fresh WP install/activate/deactivate no fatal |
| 4. Design System/Admin UX | tokens, admin UX, RTL/LTR, accessibility | keyboard/viewport/contrast/translation checks |
| 5. Golden Elementor Widget | one true `Widget_Base` widget | visible in Elementor, controls edit/save, frontend render |
| 6. Elementor Template | one native Elementor template + conditions/bridge | import, open, edit/save, frontend render |
| 7. Gutenberg Block | one block.json + server registration + PHP render | editor save/reopen without validation error + frontend render |
| 8. Cross-Site Portability | plugin ZIP + template + manifest Site A → Site B | all critical checks PASS on independent Site B |
| 9. Package Manager Lifecycle | full/selective/standalone/vertical/template-only | dependency/conflict/security/rollback/idempotency tests |
| 10. Controlled Banks | widget/template/block batches | each batch passes editor/frontend/package gates |
| 11. Vertical Packs | legal, portfolio, agency, commerce and others | independent dependencies, data boundaries, tests |
| 12. Hardening & Release | perf/SEO/a11y/security, release ZIP/SBOM | clean install, upgrade, rollback, portability all PASS |

## Golden Slice — دقیقاً چه چیزی ساخته شود؟
1. Hero Elementor Widget: content/style/advanced + responsive + accessible render.
2. Data Card/List Widget: data contract ساده و dynamic source محدود.
3. Elementor Landing Template: container-based native export containing the two widgets.
4. Gutenberg Hero Block: `block.json`, PHP server render, editor controls as needed.
5. PHP fallback template: standard WP theme hierarchy; not mislabeled as Elementor editable.
6. Installable plugin ZIP: widgets, template, assets, manifest, checksums, README and tests.

## Batch sizing
- Widgets: 3–5 per batch.
- Elementor templates: 2–3 per batch.
- Gutenberg blocks: 3–5 per batch.
- One vertical pack per phase/batch.
- After each batch: lint → unit/integration → editor E2E → frontend E2E → package smoke test → changelog/evidence.

## Mandatory Site A → Site B portability gate
Site B must be fresh and isolated (separate DB, uploads and file tree). Test install, preflight, import, widget registration, template edit/save, frontend rendering, globals/media/dynamic data, optional/required dependency behavior, conflict, upgrade and rollback. Any missing widget or broken editor editability = FAIL. No two-site environment = NOT_RUN.

## Required CI matrix
- PHP supported versions declared by project.
- WordPress minimum and current supported version.
- Elementor Free minimum/current; Elementor Pro only where explicitly required.
- WooCommerce only for commerce adapter; HPOS where relevant.
- PHP lint + PHPCS/WPCS + PHPUnit + WordPress integration tests.
- Playwright or equivalent browser E2E for Elementor editor and Gutenberg editor.
- Package archive security tests and fresh-install/upgrade/rollback.

## Evidence artifact structure
```text
artifacts/evidence/<release>/
  commit.txt
  environment.json
  traceability.csv
  widget-verification.csv
  template-verification.csv
  block-verification.csv
  package-manifest.json
  checksums.sha256
  test-results/
  screenshots/
  performance/
  sbom.json
  release-notes.md
```

## Stop conditions
P0 security failure, object ownership failure, PHP fatal, missing required dependency, template not editable, package tampering accepted, rollback failure, data loss or failed cross-site import stop the release. Do not hide blockers behind a high test count.
