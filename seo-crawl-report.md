# Technical SEO Crawl & Search Architecture Report
**Project:** SedRazavi Designer Toolkit  
**Status:** Audit Passed & Hardened  
**Date:** 2026-10-28  

---

## 1. Indexing & Canonicalization Rules

| Route / Post Type | Indexing Status | Canonical Tag Target | Robots Directive | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Front Page (`/`)** | `INDEX, FOLLOW` | Clean Root URL (`/`) | `index, follow, max-image-preview:large` | Primary landing page showcasing services and authority. |
| **Services (`/legal-services/*`)** | `INDEX, FOLLOW` | Self-referencing permalink | `index, follow` | Public legal practice areas. |
| **Articles (`/legal-articles/*`)** | `INDEX, FOLLOW` | Self-referencing permalink | `index, follow` | Public legal scholarship and precedential analysis. |
| **Case Studies (`/case-studies/*`)** | `INDEX, FOLLOW` | Self-referencing permalink | `index, follow` | Public marketing case studies with anonymized facts. |
| **Confidential Cases (`/cases/*`)** | `NOINDEX, NOFOLLOW` | `N/A (404/Private)` | `noindex, nofollow` | **CPT is private by default**. Rewrite is disabled. Excluded from sitemaps and search. |
| **Admin & Portal (`/designer`, `/portal`)** | `NOINDEX, NOFOLLOW` | Base Page URL | `noindex, nofollow` | Gated administrative and client portal shells. |
| **Style Previews (`?header_style=*`)** | `NOINDEX, NOFOLLOW` | Clean Canonical URL without query param | `noindex, nofollow (wp_robots_no_robots)` | Prevents duplicate indexation of header/footer archetype variants. |

---

## 2. Structured Data (Schema.org) Architecture

1. **Organization & LegalService Schema:**
   - Injected dynamically in `header.php` via `sedrazavi_render_dynamic_seo_tags()`.
   - Verified `@type`: `LegalService`, `Attorney`.
   - Contains clean local coordinates, contact points, and verified licensing credentials.
2. **BreadcrumbList Schema:**
   - Rendered on hierarchical single pages and services to enhance rich search snippets.
3. **Zero Phantom Ratings Policy:**
   - In accordance with the prompt guidelines, no fabricated aggregate ratings (`AggregateRating`) or fictional 5-star reviews are injected unless backed by verified client reviews.

---

## 3. Multilingual and Directional Integrity (RTL / LTR)

- **Dynamic Direction:** `header.php` invokes `<html <?php language_attributes(); ?> dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>">`.
- **Persian Typography Metrics:** Localized with Vazirmatn font family, baseline height 1.8, and zero clipping of Persian diacritics.
- **English / LTR Readiness:** Symmetrical SVG icons, logical CSS properties (`margin-inline-start`, `inset-inline-start`), and no hardcoded directional assumptions.
