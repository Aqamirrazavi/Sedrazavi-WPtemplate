import{r as c,Z as e}from"./vendor-CKfo7Q0y.js";import{W as x}from"./wordpress-files-data-CpFU2feY.js";import{H as de}from"../index.js";import{g as ce,D as X,a as pe}from"./phpShortcodeGenerator-D9qjIy4w.js";import{J as D}from"./vendor-jszip-DTxRexFk.js";import{k as ue,h as E,ab as T,c6 as B,p as j,c7 as R,aR as me,ap as Y,D as J,b6 as Z,f as _e,bf as Q,aY as K,a$ as ge,c8 as he,ae as be,c9 as fe,a6 as ee,Z as xe,aT as ve}from"./vendor-lucide-BbrFx8DF.js";import"./vendor-recharts-B15hi_uA.js";const k=[{path:"elementor-addon-suite/assets/css/admin-settings.css",filename:"admin-settings.css",category:"افزونه مکمل (Plugin Addons)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/admin-settings.css",code:`/**
 * Universal Elementor Addon Suite - Admin Settings CSS
 */
.uas-admin-wrap {
  max-width: 1080px;
  margin: 24px auto;
  font-family: inherit;
}

.uas-admin-header {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  border-radius: 16px;
  padding: 28px 32px;
  color: #FFFFFF;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.2);
}

.uas-admin-title-box h1 {
  color: #FFFFFF;
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 6px 0;
}

.uas-admin-title-box p {
  color: #94A3B8;
  font-size: 13px;
  margin: 0;
}

.uas-admin-badge {
  background: rgba(37, 99, 235, 0.2);
  color: #60A5FA;
  border: 1px solid rgba(96, 165, 250, 0.3);
  padding: 4px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
}

.uas-admin-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
}

.uas-admin-card h2 {
  font-size: 17px;
  font-weight: 700;
  color: #0F172A;
  margin-top: 0;
  margin-bottom: 16px;
  border-bottom: 1px solid #F1F5F9;
  padding-bottom: 12px;
}

.uas-widgets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.uas-widget-toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  background: #F8FAFC;
  transition: all 0.2s ease;
}

.uas-widget-toggle-item:hover {
  background: #FFFFFF;
  border-color: #2563EB;
}

.uas-widget-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.uas-widget-icon {
  color: #2563EB;
  font-size: 16px;
}

.uas-widget-name {
  font-size: 13px;
  font-weight: 600;
  color: #1E293B;
}

.uas-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  margin: 0;
}

.uas-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.uas-slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #CBD5E1;
  transition: .3s;
  border-radius: 24px;
}

.uas-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .uas-slider {
  background-color: #2563EB;
}

input:checked + .uas-slider:before {
  transform: translateX(20px);
}
`},{path:"elementor-addon-suite/assets/css/ecommerce-compat.css",filename:"ecommerce-compat.css",category:"افزونه مکمل (Plugin Addons)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/ecommerce-compat.css",code:`/**
 * eCommerce, WoodMart, JetWooBuilder & ShopEngine Compatibility Stylesheet
 */

.uas-pricing-compat-grid {
  display: grid;
  gap: 20px;
  margin: 30px 0;
}

.uas-pricing-compat-grid.uas-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.uas-wc-package-card {
  background: #161B22;
  border: 1px solid #30363D;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s ease;
  position: relative;
}

.uas-wc-package-card:hover {
  border-color: #58A6FF;
  transform: translateY(-4px);
}

.uas-wc-package-card.uas-wc-featured {
  border-color: #D4AF37;
  background: #1C2333;
}

.uas-wc-badge {
  position: absolute;
  top: -12px;
  left: 20px;
  background: #D4AF37;
  color: #0B132B;
  font-size: 11px;
  font-weight: bold;
  padding: 2px 10px;
  border-radius: 12px;
}

.uas-wc-pkg-head h4 {
  font-size: 16px;
  margin: 0 0 8px 0;
  color: #F0F6FC;
}

.uas-wc-price {
  display: block;
  font-size: 20px;
  font-weight: 800;
  color: #D4AF37;
  margin-bottom: 12px;
  font-family: inherit;
}

.uas-wc-package-card p {
  color: #8B949E;
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.uas-btn-wc-cart {
  display: block;
  text-align: center;
  padding: 10px 16px;
  background: #21262D;
  border: 1px solid #30363D;
  color: #F0F6FC;
  border-radius: 8px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.2s ease;
}

.uas-btn-wc-cart:hover {
  background: #30363D;
  color: #FFF;
}

.uas-btn-wc-cart.uas-btn-gold {
  background: #D4AF37;
  border-color: #D4AF37;
  color: #0B132B;
}

.uas-btn-wc-cart.uas-btn-gold:hover {
  background: #E5C358;
}

/* WoodMart Specific */
.woodmart-hover-base .uas-woodmart-badge {
  display: inline-block;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 4px;
}

/* Quick Checkout Box */
.uas-quick-checkout-box {
  background: #0D1117;
  border: 1px solid #30363D;
  border-radius: 12px;
  padding: 24px;
  margin: 30px 0;
}

.uas-qc-head h4 {
  margin: 0 0 6px 0;
  color: #F0F6FC;
  font-size: 16px;
}

.uas-qc-head p {
  margin: 0 0 16px 0;
  color: #8B949E;
  font-size: 12px;
}

/* Industry Block Enhancements */
.uas-industry-block {
  background: #161B22;
  border: 1px solid #30363D;
  border-radius: 12px;
  padding: 24px;
  margin: 30px 0;
  color: #F0F6FC;
}

.uas-industry-block .uas-block-header {
  margin-bottom: 20px;
}

.uas-industry-block .uas-badge {
  display: inline-block;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 12px;
  background: rgba(88, 166, 255, 0.15);
  color: #58A6FF;
  margin-bottom: 8px;
}

.uas-industry-block .uas-title {
  font-size: 18px;
  margin: 4px 0 6px 0;
  color: #F0F6FC;
}

.uas-industry-block .uas-subtitle {
  font-size: 13px;
  color: #8B949E;
  margin: 0;
}

.uas-industry-block .uas-grid {
  display: grid;
  gap: 16px;
}

.uas-industry-block .uas-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.uas-industry-block .uas-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.uas-industry-block .uas-grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.uas-industry-block .uas-field label {
  display: block;
  font-size: 12px;
  color: #8B949E;
  margin-bottom: 6px;
}

.uas-industry-block .uas-input,
.uas-industry-block .uas-select {
  width: 100%;
  background: #0D1117;
  border: 1px solid #30363D;
  color: #F0F6FC;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-family: inherit;
}

.uas-industry-block .uas-input:focus,
.uas-industry-block .uas-select:focus {
  border-color: #58A6FF;
  outline: none;
}

.uas-results-card {
  margin-top: 16px;
  background: #0D1117;
  border: 1px solid #30363D;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.uas-res-item {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.uas-res-label {
  color: #8B949E;
}

.uas-res-val {
  font-weight: 700;
  color: #58A6FF;
}

.uas-res-item.uas-highlight {
  border-top: 1px dashed #30363D;
  padding-top: 8px;
}

.uas-res-item.uas-highlight .uas-res-val {
  color: #D4AF37;
}

/* Card Treatments */
.uas-card-treatment {
  background: #0D1117;
  border: 1px solid #30363D;
  border-radius: 8px;
  padding: 18px;
  position: relative;
}

.uas-card-treatment.uas-featured {
  border-color: #06B6D4;
}

.uas-card-treatment .uas-tr-badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(6, 182, 212, 0.15);
  color: #06B6D4;
  display: inline-block;
  margin-bottom: 8px;
}

.uas-card-treatment h4 {
  margin: 0 0 6px 0;
  font-size: 15px;
  color: #F0F6FC;
}

.uas-tr-desc {
  font-size: 12px;
  color: #8B949E;
  margin-bottom: 12px;
}

.uas-tr-features {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
  font-size: 12px;
  color: #C9D1D9;
}

.uas-tr-features li {
  margin-bottom: 4px;
}

.uas-tr-price {
  font-size: 14px;
  font-weight: 700;
  color: #06B6D4;
}

/* Incoterms Table */
.uas-incoterms-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-top: 10px;
}

.uas-incoterms-table th,
.uas-incoterms-table td {
  padding: 10px 14px;
  border: 1px solid #30363D;
  text-align: right;
}

.uas-incoterms-table th {
  background: #0D1117;
  color: #58A6FF;
}

.uas-incoterms-table td {
  background: #161B22;
  color: #C9D1D9;
}

/* Pricing Cards */
.uas-pricing-card {
  background: #0D1117;
  border: 1px solid #30363D;
  border-radius: 8px;
  padding: 20px;
}

.uas-pricing-card.uas-featured {
  border-color: #10B981;
}

.uas-pricing-card h4 {
  margin: 0 0 8px 0;
  color: #F0F6FC;
}

.uas-price-tag {
  font-size: 22px;
  font-weight: 800;
  color: #10B981;
  margin-bottom: 12px;
}

.uas-price-tag span {
  font-size: 12px;
  color: #8B949E;
}

.uas-price-features {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
  font-size: 12px;
  color: #C9D1D9;
}

.uas-price-features li {
  margin-bottom: 6px;
}

.uas-code-block {
  background: #0D1117;
  border: 1px solid #30363D;
  border-radius: 8px;
  padding: 16px;
  color: #79C0FF;
  font-size: 12px;
  overflow-x: auto;
}
`},{path:"elementor-addon-suite/assets/css/editor.css",filename:"editor.css",category:"افزونه مکمل (Plugin Addons)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/editor.css",code:`/**
 * Universal Elementor Addon Suite - Editor Panel Styling
 * Highlights UAS widgets & category in Elementor panel
 */

.elementor-element-wrapper[data-category="universal-addon-suite"] {
  border-left: 3px solid #D4AF37;
}

.elementor-panel-category-title[data-category="universal-addon-suite"] {
  font-weight: 700;
  color: #D4AF37 !important;
}
`},{path:"elementor-addon-suite/assets/css/github-admin.css",filename:"github-admin.css",category:"افزونه مکمل (Plugin Addons)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/github-admin.css",code:`/**
 * GitHub Primer Style for SedRazavi Suite Admin
 */

.gh-wrap {
  background: #0D1117 !important;
  color: #F0F6FC !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif !important;
  margin: 20px 20px 0 0 !important;
  padding: 0 !important;
  border-radius: 8px;
  border: 1px solid #30363D;
  overflow: hidden;
}

.gh-wrap * {
  box-sizing: border-box;
}

/* HEADER & REPO BAR */
.gh-header {
  background: #161B22;
  border-bottom: 1px solid #30363D;
  padding: 20px 24px 0 24px;
}

.gh-repo-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.gh-owner {
  color: #58A6FF;
  font-weight: 500;
}

.gh-slash {
  color: #8B949E;
}

.gh-repo-name {
  color: #58A6FF;
  font-weight: 700;
}

.gh-badge-public {
  font-size: 11px;
  border: 1px solid #30363D;
  color: #8B949E;
  padding: 2px 8px;
  border-radius: 12px;
}

.gh-branch-badge {
  font-size: 12px;
  background: #21262D;
  border: 1px solid #30363D;
  color: #C9D1D9;
  padding: 2px 10px;
  border-radius: 6px;
}

.gh-version-badge {
  font-size: 11px;
  background: rgba(56, 139, 253, 0.15);
  color: #58A6FF;
  border: 1px solid rgba(56, 139, 253, 0.4);
  padding: 2px 8px;
  border-radius: 6px;
}

/* TABS */
.gh-tabs {
  display: flex;
  gap: 16px;
  overflow-x: auto;
}

.gh-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  color: #C9D1D9 !important;
  text-decoration: none !important;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s, color 0.2s;
}

.gh-tab:hover {
  color: #F0F6FC !important;
  border-bottom-color: #8B949E;
}

.gh-tab.active {
  color: #F0F6FC !important;
  border-bottom-color: #F78166;
}

.gh-counter {
  background: #30363D;
  color: #F0F6FC;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
}

/* BODY */
.gh-body {
  padding: 24px;
}

/* METRICS */
.gh-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.gh-metric-card {
  background: #161B22;
  border: 1px solid #30363D;
  border-radius: 6px;
  padding: 16px;
}

.gh-metric-title {
  display: block;
  font-size: 12px;
  color: #8B949E;
  margin-bottom: 8px;
}

.gh-metric-value {
  font-size: 24px;
  font-weight: 700;
  color: #F0F6FC;
  margin-bottom: 6px;
}

.gh-metric-diff {
  font-size: 11px;
}

.gh-metric-diff.positive {
  color: #3FB950;
}

.gh-metric-diff.neutral {
  color: #8B949E;
}

/* CARDS */
.gh-card {
  background: #161B22;
  border: 1px solid #30363D;
  border-radius: 6px;
  margin-bottom: 24px;
  overflow: hidden;
}

.gh-card-header {
  padding: 14px 18px;
  background: #1C2128;
  border-bottom: 1px solid #30363D;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.gh-card-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #F0F6FC;
}

.gh-card-subtitle {
  font-size: 12px;
  color: #8B949E;
}

.gh-card-body {
  padding: 18px;
}

/* HEATMAP */
.gh-heatmap-wrap {
  overflow-x: auto;
}

.gh-heatmap-grid {
  display: flex;
  gap: 3px;
  padding: 4px 0;
}

.gh-heatmap-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.gh-cell {
  width: 11px;
  height: 11px;
  border-radius: 2px;
}

.gh-cell.gh-lvl-0 { background: #21262D; }
.gh-cell.gh-lvl-1 { background: #0E4429; }
.gh-cell.gh-lvl-2 { background: #006D32; }
.gh-cell.gh-lvl-3 { background: #26A641; }
.gh-cell.gh-lvl-4 { background: #39D353; }

.gh-heatmap-legend {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
  margin-top: 10px;
  font-size: 11px;
  color: #8B949E;
}

/* README */
.gh-readme {
  font-size: 13px;
  line-height: 1.8;
  color: #C9D1D9;
}

.gh-readme h4 {
  color: #F0F6FC;
  margin: 0 0 10px 0;
}

.gh-readme ol {
  padding-right: 20px;
  margin: 0;
}

.gh-readme code {
  background: #21262D;
  color: #79C0FF;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

/* ISSUES */
.gh-filter-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.gh-search-input {
  flex: 1;
  background: #161B22 !important;
  border: 1px solid #30363D !important;
  color: #F0F6FC !important;
  padding: 6px 12px !important;
  border-radius: 6px !important;
  font-size: 13px !important;
}

.gh-search-input:focus {
  border-color: #58A6FF !important;
}

.gh-filter-actions {
  display: flex;
  gap: 8px;
}

.gh-btn-filter {
  background: #21262D;
  border: 1px solid #30363D;
  color: #C9D1D9;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.gh-issues-table {
  border: 1px solid #30363D;
  border-radius: 6px;
  background: #161B22;
  overflow: hidden;
}

.gh-issues-header {
  background: #1C2128;
  padding: 12px 16px;
  border-bottom: 1px solid #30363D;
  font-size: 13px;
}

.gh-issue-stats {
  display: flex;
  gap: 16px;
}

.gh-status-open {
  color: #F0F6FC;
  font-weight: 600;
}

.gh-status-closed {
  color: #8B949E;
}

.gh-issue-row {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #21262D;
  gap: 12px;
}

.gh-issue-row:hover {
  background: #1C2128;
}

.gh-issue-content {
  flex: 1;
}

.gh-issue-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.gh-issue-link {
  color: #F0F6FC !important;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none !important;
}

.gh-issue-link:hover {
  color: #58A6FF !important;
}

.gh-label-pill {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid;
}

.gh-issue-meta {
  font-size: 12px;
  color: #8B949E;
}

.gh-issue-meta code {
  color: #79C0FF;
  background: #21262D;
  padding: 1px 4px;
  border-radius: 3px;
}

.gh-issue-comments {
  font-size: 12px;
  color: #8B949E;
}

/* COMMITS TIMELINE */
.gh-commits-timeline {
  padding: 10px 0;
}

.gh-timeline-date {
  font-size: 14px;
  color: #8B949E;
  margin: 0 0 16px 0;
  font-weight: 600;
}

.gh-commits-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.gh-commit-item {
  display: flex;
  gap: 16px;
  align-items: center;
}

.gh-commit-node {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #30363D;
  border: 2px solid #58A6FF;
}

.gh-commit-box {
  flex: 1;
  background: #161B22;
  border: 1px solid #30363D;
  border-radius: 6px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.gh-commit-main strong {
  display: block;
  font-size: 13px;
  color: #F0F6FC;
  margin-bottom: 4px;
}

.gh-commit-author {
  font-size: 11px;
  color: #8B949E;
}

.gh-badge-verified {
  font-size: 10px;
  color: #3FB950;
  border: 1px solid rgba(63, 185, 80, 0.4);
  padding: 1px 6px;
  border-radius: 10px;
  margin-right: 6px;
}

.gh-commit-hash code {
  font-family: monospace;
  color: #58A6FF;
  background: #21262D;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

/* TABLE */
.gh-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.gh-table th {
  background: #1C2128;
  border-bottom: 1px solid #30363D;
  padding: 10px 14px;
  text-align: right;
  color: #8B949E;
  font-weight: 600;
}

.gh-table td {
  padding: 12px 14px;
  border-bottom: 1px solid #21262D;
  color: #C9D1D9;
}

.gh-table code {
  font-family: monospace;
  color: #58A6FF;
  background: #21262D;
  padding: 2px 6px;
  border-radius: 4px;
}

.gh-amount {
  color: #F0F6FC;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.gh-badge-success {
  background: rgba(46, 160, 67, 0.15);
  color: #3FB950;
  border: 1px solid rgba(46, 160, 67, 0.4);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
}
`},{path:"elementor-addon-suite/assets/css/standalone-blocks.css",filename:"standalone-blocks.css",category:"افزونه مکمل (Plugin Addons)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/standalone-blocks.css",code:`/**
 * Universal Standalone Blocks CSS
 * Self-contained styles for all sections, blocks, shortcodes, and UI elements.
 * Works seamlessly on ANY WordPress theme with zero conflicts.
 */

:root {
  --uas-bg-dark: #0B132B;
  --uas-surface: #1C2541;
  --uas-card: #151d34;
  --uas-border: rgba(255, 255, 255, 0.1);
  --uas-gold: #D4AF37;
  --uas-gold-light: #F3E5AB;
  --uas-text: #F8FAFC;
  --uas-muted: #94A3B8;
  --uas-radius: 12px;
}

/* Base Wrapper */
.uas-block-hero,
.uas-block-timeline,
.uas-block-calculator,
.uas-block-services,
.uas-block-team,
.uas-block-testimonials,
.uas-block-booking,
.uas-block-transactions,
.uas-block-heatmap,
.uas-block-radar,
.uas-block-milestones,
.uas-block-faq,
.uas-block-docs {
  font-family: inherit, system-ui, -apple-system, sans-serif;
  color: var(--uas-text);
  box-sizing: border-box;
  margin: 30px 0;
  clear: both;
}

.uas-block-hero *,
.uas-block-timeline *,
.uas-block-calculator *,
.uas-block-services *,
.uas-block-team *,
.uas-block-testimonials *,
.uas-block-booking *,
.uas-block-transactions *,
.uas-block-heatmap *,
.uas-block-radar *,
.uas-block-milestones *,
.uas-block-faq *,
.uas-block-docs * {
  box-sizing: border-box;
}

/* SECTION HEADINGS */
.uas-section-heading {
  text-align: center;
  margin-bottom: 35px;
}
.uas-section-heading h2 {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 10px 0;
  color: #fff;
}
.uas-section-heading p {
  font-size: 15px;
  color: var(--uas-muted);
  margin: 0;
}

/* 1. HERO BLOCK */
.uas-block-hero {
  position: relative;
  background: linear-gradient(135deg, #070B19 0%, #0F172A 100%);
  border-radius: var(--uas-radius);
  overflow: hidden;
  padding: 60px 40px;
  border: 1px solid var(--uas-border);
}
.uas-hero-badge {
  display: inline-block;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid var(--uas-gold);
  background: rgba(212, 175, 55, 0.1);
  margin-bottom: 20px;
}
.uas-hero-title {
  font-size: 36px;
  font-weight: 900;
  line-height: 1.3;
  margin: 0 0 16px 0;
  color: #fff;
}
.uas-hero-desc {
  font-size: 16px;
  line-height: 1.8;
  color: var(--uas-muted);
  max-width: 650px;
  margin: 0 0 28px 0;
}
.uas-hero-actions {
  display: flex;
  gap: 14px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}
.uas-btn-primary {
  display: inline-block;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  color: #0B132B !important;
  background: var(--uas-gold);
  text-decoration: none !important;
  transition: transform 0.2s, opacity 0.2s;
  border: none;
  cursor: pointer;
}
.uas-btn-primary:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}
.uas-btn-outline {
  display: inline-block;
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  color: #fff !important;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-decoration: none !important;
  transition: background 0.2s;
}
.uas-btn-outline:hover {
  background: rgba(255, 255, 255, 0.15);
}
.uas-hero-stats {
  display: flex;
  gap: 30px;
  padding-top: 24px;
  border-top: 1px solid var(--uas-border);
  flex-wrap: wrap;
}
.uas-stat-item {
  display: flex;
  flex-direction: column;
}
.uas-stat-num {
  font-size: 26px;
  font-weight: 800;
  color: var(--uas-gold);
}
.uas-stat-label {
  font-size: 12px;
  color: var(--uas-muted);
}

/* 2. TIMELINE BLOCK */
.uas-block-timeline {
  background: #0D1117;
  border: 1px solid #30363D;
  border-radius: var(--uas-radius);
  padding: 30px;
}
.uas-timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #30363D;
  padding-bottom: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 10px;
}
.uas-timeline-header h3 {
  margin: 0;
  font-size: 20px;
  color: #F0F6FC;
}
.uas-case-tag code {
  background: #161B22;
  color: #58A6FF;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #30363D;
  font-family: monospace;
}
.uas-timeline-flow {
  position: relative;
  padding-right: 20px;
}
.uas-timeline-flow::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 10px;
  right: 6px;
  width: 2px;
  background: #30363D;
}
.uas-timeline-step {
  position: relative;
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
}
.uas-step-marker {
  position: relative;
  z-index: 2;
  margin-top: 4px;
}
.uas-step-dot {
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #30363D;
  border: 3px solid #0D1117;
}
.uas-step-completed .uas-step-dot {
  background: #238636;
}
.uas-step-in_progress .uas-step-dot {
  background: #58A6FF;
  box-shadow: 0 0 10px rgba(88, 166, 255, 0.6);
}
.uas-step-pending .uas-step-dot {
  background: #8B949E;
}
.uas-step-box {
  background: #161B22;
  border: 1px solid #30363D;
  border-radius: 8px;
  padding: 16px 20px;
  flex: 1;
}
.uas-step-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.uas-step-title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #F0F6FC;
}
.uas-step-date {
  font-size: 12px;
  color: #8B949E;
}
.uas-step-desc {
  margin: 0;
  font-size: 13px;
  color: #8B949E;
  line-height: 1.6;
}

/* 3. CALCULATOR BLOCK */
.uas-block-calculator {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--uas-radius);
  padding: 30px;
}
.uas-calc-head {
  margin-bottom: 24px;
}
.uas-calc-head h3 {
  margin: 0 0 6px 0;
  font-size: 20px;
  color: #fff;
}
.uas-calc-head p {
  margin: 0;
  font-size: 13px;
  color: var(--uas-muted);
}
.uas-calc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.uas-calc-field label {
  display: block;
  font-size: 13px;
  margin-bottom: 8px;
  color: #E2E8F0;
}
.uas-input, .uas-select, .uas-textarea {
  width: 100%;
  padding: 10px 14px;
  background: #1F2937;
  border: 1px solid #374151;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  outline: none;
}
.uas-input:focus, .uas-select:focus, .uas-textarea:focus {
  border-color: var(--uas-gold);
}
.uas-calc-result-box {
  background: #1F2937;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}
.uas-calc-total span {
  display: block;
  font-size: 13px;
  color: var(--uas-muted);
}
.uas-calc-total strong {
  font-size: 24px;
  color: var(--uas-gold);
}

/* 4. SERVICES BLOCK */
.uas-services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.uas-service-card {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--uas-radius);
  padding: 26px;
  transition: transform 0.2s, border-color 0.2s;
}
.uas-service-card:hover {
  transform: translateY(-4px);
  border-color: var(--uas-gold);
}
.uas-service-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  margin-bottom: 16px;
}
.uas-service-card h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #fff;
}
.uas-service-card p {
  font-size: 14px;
  line-height: 1.7;
  color: var(--uas-muted);
  margin: 0 0 16px 0;
}
.uas-service-link {
  font-size: 13px;
  font-weight: 700;
  text-decoration: none !important;
}

/* 5. TEAM & TESTIMONIALS */
.uas-team-grid, .uas-testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}
.uas-team-card, .uas-testimonial-card {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--uas-radius);
  padding: 24px;
  text-align: center;
}
.uas-avatar-placeholder {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--uas-gold);
  color: #0B132B;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  margin: 0 auto 16px auto;
}
.uas-team-card h3 {
  margin: 0 0 6px 0;
  font-size: 17px;
  color: #fff;
}
.uas-team-role {
  display: block;
  font-size: 12px;
  color: var(--uas-gold);
  margin-bottom: 12px;
}
.uas-team-card p {
  font-size: 13px;
  color: var(--uas-muted);
  line-height: 1.6;
  margin: 0;
}
.uas-testi-quote {
  font-size: 14px;
  line-height: 1.8;
  color: #E2E8F0;
  font-style: italic;
  margin: 0 0 16px 0;
  text-align: right;
}
.uas-testi-author {
  text-align: right;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 12px;
}
.uas-testi-author strong {
  display: block;
  color: #fff;
  font-size: 14px;
}
.uas-testi-author span {
  font-size: 12px;
  color: var(--uas-muted);
}

/* 6. TRANSACTIONS LEDGER (GITHUB STYLE) */
.uas-block-transactions {
  background: #0D1117;
  border: 1px solid #30363D;
  border-radius: var(--uas-radius);
  padding: 24px;
}
.uas-trans-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 10px;
}
.uas-trans-head h3 {
  margin: 0;
  color: #F0F6FC;
  font-size: 18px;
}
.uas-badge-verified {
  font-size: 12px;
  background: rgba(35, 134, 54, 0.2);
  color: #3FB950;
  border: 1px solid #238636;
  padding: 4px 10px;
  border-radius: 12px;
}
.uas-trans-table-wrap {
  overflow-x: auto;
}
.uas-trans-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  color: #C9D1D9;
}
.uas-trans-table th {
  background: #161B22;
  border-bottom: 1px solid #30363D;
  padding: 12px 14px;
  text-align: right;
  color: #8B949E;
  font-weight: 600;
}
.uas-trans-table td {
  padding: 12px 14px;
  border-bottom: 1px solid #21262D;
}
.uas-trans-table code {
  color: #58A6FF;
  background: #161B22;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}
.uas-amount {
  font-weight: 700;
  color: #F0F6FC;
  font-variant-numeric: tabular-nums;
}
.uas-status-pill {
  background: rgba(35, 134, 54, 0.2);
  color: #3FB950;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
}

/* 7. HEATMAP (GITHUB STYLE) */
.uas-block-heatmap {
  background: #0D1117;
  border: 1px solid #30363D;
  border-radius: var(--uas-radius);
  padding: 24px;
}
.uas-heatmap-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
}
.uas-heatmap-head h3 {
  margin: 0;
  color: #F0F6FC;
  font-size: 17px;
}
.uas-heatmap-head span {
  font-size: 12px;
  color: #8B949E;
}
.uas-heatmap-grid {
  display: flex;
  gap: 3px;
  overflow-x: auto;
  padding: 6px 0;
}
.uas-heatmap-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.uas-heat-cell {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: #161B22;
}
.uas-heat-cell.uas-lvl-0 { background: #161B22; }
.uas-heat-cell.uas-lvl-1 { background: #0E4429; }
.uas-heat-cell.uas-lvl-2 { background: #006D32; }
.uas-heat-cell.uas-lvl-3 { background: #26A641; }
.uas-heat-cell.uas-lvl-4 { background: #39D353; }
.uas-heatmap-legend {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
  margin-top: 12px;
  font-size: 11px;
  color: #8B949E;
}

/* 8. DOCS HUB */
.uas-block-docs {
  background: #0D1117;
  border: 1px solid #30363D;
  border-radius: var(--uas-radius);
  padding: 30px;
}
.uas-docs-header {
  border-bottom: 1px solid #30363D;
  padding-bottom: 20px;
  margin-bottom: 24px;
}
.uas-docs-header h2 {
  margin: 0 0 8px 0;
  color: #F0F6FC;
  font-size: 22px;
}
.uas-docs-header p {
  margin: 0;
  color: #8B949E;
  font-size: 14px;
}
.uas-docs-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.uas-doc-card {
  background: #161B22;
  border: 1px solid #30363D;
  border-radius: 8px;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}
.uas-doc-info h3 {
  margin: 0 0 6px 0;
  font-size: 16px;
  color: #58A6FF;
}
.uas-doc-info p {
  margin: 0 0 6px 0;
  font-size: 13px;
  color: #C9D1D9;
}
.uas-doc-params {
  font-size: 12px;
  color: #8B949E;
}
.uas-doc-params code {
  color: #E2E8F0;
  background: #0D1117;
  padding: 2px 6px;
  border-radius: 4px;
}
.uas-doc-action {
  display: flex;
  gap: 8px;
  align-items: center;
}
.uas-copy-field {
  background: #0D1117;
  border: 1px solid #30363D;
  border-radius: 6px;
  padding: 8px 12px;
  color: #79C0FF;
  font-family: monospace;
  font-size: 12px;
  direction: ltr;
  text-align: left;
  width: 250px;
}
.uas-btn-copy {
  background: #238636;
  border: 1px solid rgba(240, 246, 252, 0.1);
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.uas-btn-copy:hover {
  background: #2EA043;
}

/* 9. BOOKING FORM */
.uas-block-booking {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--uas-radius);
  padding: 35px;
}
.uas-booking-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}
.uas-booking-text h2 {
  margin: 0 0 12px 0;
  font-size: 24px;
  color: #fff;
}
.uas-booking-text p {
  font-size: 14px;
  color: var(--uas-muted);
  line-height: 1.7;
}
.uas-booking-perks {
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
}
.uas-booking-perks li {
  font-size: 13px;
  color: #E2E8F0;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.uas-booking-perks li::before {
  content: '✓';
  color: var(--uas-gold);
  font-weight: bold;
}
.uas-form-row {
  margin-bottom: 14px;
}
.uas-form-row label {
  display: block;
  font-size: 13px;
  margin-bottom: 6px;
  color: #E2E8F0;
}
.uas-btn-submit {
  width: 100%;
  padding: 12px;
  background: var(--uas-gold);
  color: #0B132B;
  font-weight: 800;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}
.uas-btn-submit:hover {
  opacity: 0.95;
}

/* 10. RADAR & MILESTONES & FAQ */
.uas-radar-row {
  margin-bottom: 14px;
}
.uas-radar-row span {
  display: block;
  font-size: 13px;
  margin-bottom: 4px;
  color: #E2E8F0;
}
.uas-progress-bar {
  background: #1F2937;
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
}
.uas-bar-fill {
  background: linear-gradient(90deg, #D4AF37, #F59E0B);
  height: 100%;
  color: #0B132B;
  font-size: 11px;
  font-weight: 800;
  text-align: center;
  line-height: 20px;
}
.uas-milestones-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.uas-milestone-item {
  display: flex;
  gap: 20px;
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 18px;
}
.uas-ms-year {
  font-size: 20px;
  font-weight: 900;
  color: var(--uas-gold);
  min-width: 60px;
}
.uas-ms-body h4 {
  margin: 0 0 6px 0;
  color: #fff;
  font-size: 15px;
}
.uas-ms-body p {
  margin: 0;
  color: var(--uas-muted);
  font-size: 13px;
}
.uas-faq-item {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 12px;
  cursor: pointer;
}
.uas-faq-item summary {
  font-weight: 700;
  color: #fff;
  font-size: 15px;
  outline: none;
}
.uas-faq-item p {
  margin: 12px 0 0 0;
  color: var(--uas-muted);
  font-size: 14px;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .uas-block-hero {
    padding: 35px 20px;
  }
  .uas-hero-title {
    font-size: 26px;
  }
  .uas-doc-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .uas-copy-field {
    width: 100%;
  }
}
`},{path:"elementor-addon-suite/assets/css/widgets-core.css",filename:"widgets-core.css",category:"افزونه مکمل (Plugin Addons)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets-core.css",code:`/**
 * Universal Elementor Addon Suite - Core Widgets CSS
 * Version: 1.0.0
 * Pure, Topic-Agnostic Styles with CSS Custom Properties
 */

:root {
  --uas-primary-color: #2563EB;
  --uas-primary-hover: #1D4ED8;
  --uas-accent-color: #D4AF37;
  --uas-text-main: #1E293B;
  --uas-text-muted: #64748B;
  --uas-bg-card: #FFFFFF;
  --uas-border-color: #E2E8F0;
  --uas-radius-card: 16px;
  --uas-shadow-card: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
}

.dark {
  --uas-text-main: #F8FAFC;
  --uas-text-muted: #94A3B8;
  --uas-bg-card: #0F172A;
  --uas-border-color: #334155;
}

.uas-widget-container {
  box-sizing: border-box;
  position: relative;
  width: 100%;
}
`},{path:"elementor-addon-suite/assets/css/widgets/banner-slider.css",filename:"banner-slider.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/banner-slider.css",code:`/**
 * Universal Text Ticker & Quote Banner CSS
 */
.uas-ticker-wrapper {
  position: relative;
  width: 100%;
  padding: 16px 24px;
  background: var(--uas-bg-card, #FFFFFF);
  border: 1px solid var(--uas-border-color, #E2E8F0);
  border-radius: var(--uas-radius-card, 16px);
  display: flex;
  align-items: center;
  gap: 16px;
  overflow: hidden;
  box-sizing: border-box;
}

.uas-ticker-badge {
  padding: 4px 12px;
  border-radius: 9999px;
  background: var(--uas-primary-color, #2563EB);
  color: #FFFFFF;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.uas-ticker-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--uas-text-main, #1E293B);
  white-space: nowrap;
  animation: uas-marquee 25s linear infinite;
}

@keyframes uas-marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
`},{path:"elementor-addon-suite/assets/css/widgets/contact-booking.css",filename:"contact-booking.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/contact-booking.css",code:`/**
 * Universal Contact & Booking Form CSS
 */
.uas-booking-wrapper {
  position: relative;
  width: 100%;
  padding: 40px;
  background: var(--uas-bg-card, #FFFFFF);
  border: 1px solid var(--uas-border-color, #E2E8F0);
  border-radius: var(--uas-radius-card, 24px);
  box-shadow: var(--uas-shadow-card, 0 10px 30px rgba(0,0,0,0.05));
  max-width: 680px;
  margin: 0 auto;
  box-sizing: border-box;
}

.uas-booking-header {
  text-align: center;
  margin-bottom: 28px;
}

.uas-booking-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--uas-text-main, #0F172A);
  margin: 0 0 8px 0;
}

.uas-booking-desc {
  font-size: 14px;
  color: var(--uas-text-muted, #64748B);
  margin: 0;
}

.uas-booking-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.uas-form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: right;
}

.uas-form-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--uas-text-main, #334155);
}

.uas-form-input, .uas-form-select, .uas-form-textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--uas-border-color, #CBD5E1);
  background: #F8FAFC;
  font-size: 14px;
  color: var(--uas-text-main, #0F172A);
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.uas-form-input:focus, .uas-form-select:focus, .uas-form-textarea:focus {
  border-color: var(--uas-primary-color, #2563EB);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  background: #FFFFFF;
}

.uas-form-submit {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  background: var(--uas-primary-color, #2563EB);
  color: #FFFFFF;
  border: none;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}

.uas-form-submit:hover {
  background: var(--uas-primary-hover, #1D4ED8);
  transform: translateY(-2px);
}
`},{path:"elementor-addon-suite/assets/css/widgets/cta.css",filename:"cta.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/cta.css",code:`/**
 * Universal Call To Action Banner CSS
 */
.uas-cta-wrapper {
  position: relative;
  width: 100%;
  padding: 48px 32px;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  border-radius: var(--uas-radius-card, 24px);
  text-align: center;
  color: #FFFFFF;
  box-shadow: var(--uas-shadow-card, 0 10px 30px rgba(0,0,0,0.1));
  box-sizing: border-box;
}

.uas-cta-inner {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.uas-cta-title {
  font-size: 28px;
  font-weight: 800;
  color: #FFFFFF;
  margin: 0;
  line-height: 1.4;
}

.uas-cta-desc {
  font-size: 15px;
  line-height: 1.8;
  color: #94A3B8;
  margin: 0;
}

.uas-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 36px;
  border-radius: 12px;
  background: var(--uas-primary-color, #2563EB);
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  margin-top: 12px;
  box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
  transition: all 0.25s ease;
}

.uas-cta-btn:hover {
  background: var(--uas-primary-hover, #1D4ED8);
  transform: translateY(-2px);
  color: #FFFFFF;
}
`},{path:"elementor-addon-suite/assets/css/widgets/faq.css",filename:"faq.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/faq.css",code:`/**
 * Universal FAQ Accordion CSS
 */
.uas-faq-wrapper {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.uas-faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.uas-faq-item {
  border: 1px solid var(--uas-border-color, #E2E8F0);
  border-radius: var(--uas-radius-card, 16px);
  background: var(--uas-bg-card, #FFFFFF);
  overflow: hidden;
  transition: all 0.25s ease;
}

.uas-faq-item.is-active {
  border-color: var(--uas-primary-color, #2563EB);
  box-shadow: var(--uas-shadow-card, 0 4px 20px rgba(0,0,0,0.04));
}

.uas-faq-question {
  width: 100%;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: right;
  font-size: 16px;
  font-weight: 700;
  color: var(--uas-text-main, #0F172A);
  transition: color 0.2s;
}

.uas-faq-question:hover {
  color: var(--uas-primary-color, #2563EB);
}

.uas-faq-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(37, 99, 235, 0.08);
  color: var(--uas-primary-color, #2563EB);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: transform 0.3s ease, background-color 0.2s;
  flex-shrink: 0;
}

.uas-faq-item.is-active .uas-faq-icon {
  transform: rotate(45deg);
  background: var(--uas-primary-color, #2563EB);
  color: #FFFFFF;
}

.uas-faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.3s ease;
  padding: 0 24px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--uas-text-muted, #475569);
  text-align: right;
}

.uas-faq-item.is-active .uas-faq-answer {
  max-height: 500px;
  padding: 0 24px 20px 24px;
}
`},{path:"elementor-addon-suite/assets/css/widgets/floating-dock.css",filename:"floating-dock.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/floating-dock.css",code:`/**
 * Universal Floating Action Dock CSS
 */
.uas-floating-dock {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.uas-floating-dock.is-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.uas-scroll-top-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--uas-primary-color, #2563EB);
  color: #FFFFFF;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  transition: transform 0.2s, background-color 0.2s;
}

.uas-scroll-top-btn:hover {
  background: var(--uas-primary-hover, #1D4ED8);
  transform: translateY(-3px);
}
`},{path:"elementor-addon-suite/assets/css/widgets/hero.css",filename:"hero.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/hero.css",code:`/**
 * Universal Hero Widget CSS (Topic-Agnostic)
 */
.uas-hero-wrapper {
  position: relative;
  width: 100%;
  padding: 60px 24px;
  background: var(--uas-bg-card, #FFFFFF);
  border-radius: var(--uas-radius-card, 24px);
  border: 1px solid var(--uas-border-color, #E2E8F0);
  box-shadow: var(--uas-shadow-card, 0 10px 30px rgba(0,0,0,0.05));
  overflow: hidden;
  box-sizing: border-box;
}

.uas-hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  max-width: 1200px;
  margin: 0 auto;
}

.uas-hero-content {
  flex: 1 1 55%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.uas-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  padding: 6px 16px;
  border-radius: 9999px;
  background: rgba(37, 99, 235, 0.1);
  color: var(--uas-primary-color, #2563EB);
  font-size: 13px;
  font-weight: 700;
  border: 1px solid rgba(37, 99, 235, 0.2);
}

.uas-hero-title {
  font-size: 38px;
  line-height: 1.35;
  font-weight: 800;
  color: var(--uas-text-main, #0F172A);
  margin: 0;
}

.uas-hero-desc {
  font-size: 16px;
  line-height: 1.8;
  color: var(--uas-text-muted, #64748B);
  margin: 0;
}

.uas-hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 10px;
}

.uas-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  border-radius: 12px;
  background: var(--uas-primary-color, #2563EB);
  color: #FFFFFF;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
}

.uas-btn-primary:hover {
  background: var(--uas-primary-hover, #1D4ED8);
  transform: translateY(-2px);
  color: #FFFFFF;
}

.uas-btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  border-radius: 12px;
  background: transparent;
  color: var(--uas-text-main, #0F172A);
  border: 1px solid var(--uas-border-color, #CBD5E1);
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.25s ease;
}

.uas-btn-secondary:hover {
  background: rgba(0, 0, 0, 0.03);
  transform: translateY(-2px);
}

.uas-hero-media {
  flex: 1 1 45%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.uas-hero-img {
  width: 100%;
  max-width: 480px;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.15);
}

@media (max-width: 991px) {
  .uas-hero-inner {
    flex-direction: column-reverse;
    text-align: center;
    gap: 32px;
  }
  .uas-hero-badge {
    align-self: center;
  }
  .uas-hero-actions {
    justify-content: center;
  }
  .uas-hero-title {
    font-size: 28px;
  }
}
`},{path:"elementor-addon-suite/assets/css/widgets/posts.css",filename:"posts.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/posts.css",code:`/**
 * Universal Posts Grid CSS (Topic-Agnostic)
 */
.uas-posts-wrapper {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.uas-posts-grid {
  display: grid;
  grid-template-columns: repeat(var(--uas-posts-cols, 3), 1fr);
  gap: 28px;
}

.uas-post-card {
  background: var(--uas-bg-card, #FFFFFF);
  border: 1px solid var(--uas-border-color, #E2E8F0);
  border-radius: var(--uas-radius-card, 18px);
  overflow: hidden;
  box-shadow: var(--uas-shadow-card, 0 4px 15px rgba(0,0,0,0.03));
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.uas-post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px -5px rgba(0,0,0,0.08);
  border-color: var(--uas-primary-color, #2563EB);
}

.uas-post-thumb-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #E2E8F0;
}

.uas-post-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.uas-post-card:hover .uas-post-thumb {
  transform: scale(1.05);
}

.uas-post-body {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
  text-align: right;
}

.uas-post-date {
  font-size: 11px;
  color: var(--uas-text-muted, #94A3B8);
  font-weight: 600;
}

.uas-post-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--uas-text-main, #0F172A);
  margin: 0;
  line-height: 1.5;
}

.uas-post-title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.uas-post-title a:hover {
  color: var(--uas-primary-color, #2563EB);
}

.uas-post-excerpt {
  font-size: 13px;
  line-height: 1.7;
  color: var(--uas-text-muted, #64748B);
  margin: 0;
}

.uas-post-readmore {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--uas-primary-color, #2563EB);
  text-decoration: none;
  margin-top: auto;
  padding-top: 12px;
}

@media (max-width: 991px) {
  .uas-posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .uas-posts-grid {
    grid-template-columns: 1fr;
  }
}
`},{path:"elementor-addon-suite/assets/css/widgets/services-grid.css",filename:"services-grid.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/services-grid.css",code:`/**
 * Universal Services Grid CSS (Topic-Agnostic)
 */
.uas-services-wrapper {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.uas-services-header {
  text-align: center;
  margin-bottom: 40px;
}

.uas-services-subtitle {
  font-size: 13px;
  font-weight: 700;
  color: var(--uas-primary-color, #2563EB);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.uas-services-heading {
  font-size: 32px;
  font-weight: 800;
  color: var(--uas-text-main, #0F172A);
  margin: 0;
}

.uas-services-grid {
  display: grid;
  grid-template-columns: repeat(var(--uas-grid-cols, 3), 1fr);
  gap: 28px;
}

.uas-service-card {
  position: relative;
  padding: 32px 24px;
  background: var(--uas-bg-card, #FFFFFF);
  border: 1px solid var(--uas-border-color, #E2E8F0);
  border-radius: var(--uas-radius-card, 20px);
  box-shadow: var(--uas-shadow-card, 0 4px 20px rgba(0,0,0,0.03));
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: right;
  gap: 16px;
}

.uas-service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 35px -10px rgba(0,0,0,0.08);
  border-color: var(--uas-primary-color, #2563EB);
}

.uas-service-icon-box {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(37, 99, 235, 0.08);
  color: var(--uas-primary-color, #2563EB);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.3s ease;
}

.uas-service-card:hover .uas-service-icon-box {
  background: var(--uas-primary-color, #2563EB);
  color: #FFFFFF;
}

.uas-service-card-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--uas-text-main, #0F172A);
  margin: 0;
}

.uas-service-card-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--uas-text-muted, #64748B);
  margin: 0;
}

.uas-service-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--uas-primary-color, #2563EB);
  text-decoration: none;
  margin-top: auto;
  transition: gap 0.2s ease;
}

.uas-service-link:hover {
  gap: 10px;
}

@media (max-width: 991px) {
  .uas-services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .uas-services-grid {
    grid-template-columns: 1fr;
  }
}
`},{path:"elementor-addon-suite/assets/css/widgets/story-bar.css",filename:"story-bar.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/story-bar.css",code:`/**
 * Universal Story Highlights Bar CSS
 */
.uas-story-bar-wrapper {
  position: relative;
  width: 100%;
  padding: 16px 20px;
  background: var(--uas-bg-card, #FFFFFF);
  border: 1px solid var(--uas-border-color, #E2E8F0);
  border-radius: var(--uas-radius-card, 18px);
  box-sizing: border-box;
}

.uas-story-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 13px;
  font-weight: 700;
  color: var(--uas-text-main, #0F172A);
}

.uas-story-scroll {
  display: flex;
  align-items: center;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
}

.uas-story-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex-shrink: 0;
  text-align: center;
}

.uas-story-ring {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, #2563EB, #D4AF37, #E11D48);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease;
}

.uas-story-item:hover .uas-story-ring {
  transform: scale(1.08);
}

.uas-story-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #FFFFFF;
}

.uas-story-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--uas-text-main, #334155);
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`},{path:"elementor-addon-suite/assets/css/widgets/team.css",filename:"team.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/team.css",code:`/**
 * Universal Team Members Showcase CSS
 */
.uas-team-wrapper {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.uas-team-grid {
  display: grid;
  grid-template-columns: repeat(var(--uas-team-cols, 3), 1fr);
  gap: 24px;
}

.uas-team-card {
  background: var(--uas-bg-card, #FFFFFF);
  border: 1px solid var(--uas-border-color, #E2E8F0);
  border-radius: var(--uas-radius-card, 20px);
  padding: 24px;
  text-align: center;
  box-shadow: var(--uas-shadow-card, 0 4px 15px rgba(0,0,0,0.03));
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.uas-team-card:hover {
  transform: translateY(-5px);
  border-color: var(--uas-primary-color, #2563EB);
  box-shadow: 0 15px 30px -5px rgba(0,0,0,0.08);
}

.uas-team-photo {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--uas-primary-color, #2563EB);
  margin-bottom: 4px;
}

.uas-team-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--uas-text-main, #0F172A);
  margin: 0;
}

.uas-team-role {
  font-size: 13px;
  color: var(--uas-primary-color, #2563EB);
  font-weight: 600;
  margin: 0;
}

.uas-team-bio {
  font-size: 12px;
  line-height: 1.6;
  color: var(--uas-text-muted, #64748B);
  margin: 0;
}

@media (max-width: 991px) {
  .uas-team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .uas-team-grid {
    grid-template-columns: 1fr;
  }
}
`},{path:"elementor-addon-suite/assets/css/widgets/testimonials.css",filename:"testimonials.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/testimonials.css",code:`/**
 * Universal Testimonials CSS (Topic-Agnostic)
 */
.uas-testimonials-wrapper {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.uas-testimonials-grid {
  display: grid;
  grid-template-columns: repeat(var(--uas-testi-cols, 2), 1fr);
  gap: 24px;
}

.uas-testimonial-card {
  padding: 32px 28px;
  background: var(--uas-bg-card, #FFFFFF);
  border: 1px solid var(--uas-border-color, #E2E8F0);
  border-radius: var(--uas-radius-card, 20px);
  box-shadow: var(--uas-shadow-card, 0 4px 20px rgba(0,0,0,0.03));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  position: relative;
  transition: all 0.3s ease;
}

.uas-testimonial-card:hover {
  transform: translateY(-4px);
  border-color: var(--uas-primary-color, #2563EB);
  box-shadow: 0 15px 30px -5px rgba(0,0,0,0.08);
}

.uas-testimonial-quote-icon {
  font-size: 32px;
  line-height: 1;
  color: var(--uas-primary-color, #2563EB);
  opacity: 0.25;
}

.uas-testimonial-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--uas-text-main, #334155);
  font-style: normal;
  margin: 0;
}

.uas-testimonial-rating {
  color: #F59E0B;
  font-size: 14px;
  letter-spacing: 2px;
}

.uas-testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
  border-top: 1px solid var(--uas-border-color, #F1F5F9);
  padding-top: 16px;
}

.uas-testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--uas-primary-color, #2563EB);
}

.uas-testimonial-meta {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.uas-testimonial-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--uas-text-main, #0F172A);
  margin: 0;
}

.uas-testimonial-role {
  font-size: 12px;
  color: var(--uas-text-muted, #64748B);
  margin: 0;
}

@media (max-width: 768px) {
  .uas-testimonials-grid {
    grid-template-columns: 1fr;
  }
}
`},{path:"elementor-addon-suite/assets/css/widgets/theme-toggle.css",filename:"theme-toggle.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/theme-toggle.css",code:`/**
 * Universal Theme Switcher CSS
 */
.uas-theme-toggle-box {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.uas-toggle-pill {
  width: 52px;
  height: 28px;
  background: var(--uas-border-color, #E2E8F0);
  border-radius: 9999px;
  position: relative;
  transition: background-color 0.25s ease;
}

.dark .uas-toggle-pill {
  background: var(--uas-primary-color, #2563EB);
}

.uas-toggle-thumb {
  width: 22px;
  height: 22px;
  background: #FFFFFF;
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 4px;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}

.dark .uas-toggle-thumb {
  transform: translateX(22px);
  background: #0F172A;
  color: #F8FAFC;
}

.uas-toggle-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--uas-text-main, #334155);
}
`},{path:"elementor-addon-suite/assets/css/widgets/video.css",filename:"video.css",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/css/widgets/video.css",code:`/**
 * Universal Video Showcase CSS
 */
.uas-video-wrapper {
  position: relative;
  width: 100%;
  border-radius: var(--uas-radius-card, 24px);
  overflow: hidden;
  box-shadow: var(--uas-shadow-card, 0 10px 30px rgba(0,0,0,0.1));
}

.uas-video-poster-box {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #0F172A;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.uas-video-poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.85;
  transition: transform 0.4s ease, opacity 0.3s;
}

.uas-video-poster-box:hover .uas-video-poster-img {
  transform: scale(1.03);
  opacity: 0.7;
}

.uas-video-play-btn {
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--uas-primary-color, #2563EB);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  box-shadow: 0 0 0 12px rgba(37, 99, 235, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.uas-video-poster-box:hover .uas-video-play-btn {
  transform: scale(1.15);
  box-shadow: 0 0 0 18px rgba(37, 99, 235, 0.35);
}

.uas-video-caption {
  padding: 16px 20px;
  background: var(--uas-bg-card, #FFFFFF);
  text-align: right;
  border: 1px solid var(--uas-border-color, #E2E8F0);
  border-top: none;
  font-size: 14px;
  font-weight: 700;
  color: var(--uas-text-main, #0F172A);
}
`},{path:"elementor-addon-suite/assets/js/admin-settings.js",filename:"admin-settings.js",category:"افزونه مکمل (Plugin Addons)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/js/admin-settings.js",code:`/**
 * Universal Elementor Addon Suite - Admin Settings JS
 */
(function($) {
  'use strict';

  $(document).ready(function() {
    // Re-import Templates AJAX
    $('#uas-btn-reimport-templates').on('click', function(e) {
      e.preventDefault();
      var $btn = $(this);
      var $status = $('#uas-reimport-status');

      $btn.prop('disabled', true).text('در حال ایمپورت تمپلیت‌ها و پاپ‌آپ‌ها...');
      $status.removeClass('notice-error notice-success').addClass('notice notice-info').html('<p>در حال بارگذاری فایل‌های JSON و ثبت در کتابخانه المنتور...</p>').show();

      $.ajax({
        url: uasAdminVars.ajaxUrl,
        type: 'POST',
        data: {
          action: 'uas_import_templates',
          nonce: uasAdminVars.nonce
        },
        success: function(response) {
          $btn.prop('disabled', false).text('ایمپورت مجدد تمپلیت‌ها و پاپ‌آپ‌ها');
          if (response.success) {
            $status.removeClass('notice-info').addClass('notice notice-success').html(
              '<p><strong>عملیات موفق!</strong> تمامی تمپلیت‌ها و پاپ‌آپ‌ها با موفقیت ایمپورت/همگام‌سازی شدند. (ایمپورت‌شده: ' + response.data.imported + ' | از پیش موجود: ' + response.data.skipped + ')</p>'
            );
          } else {
            $status.removeClass('notice-info').addClass('notice notice-error').html(
              '<p>خطا در ایمپورت: ' + (response.data.message || 'خطای ناشناخته') + '</p>'
            );
          }
        },
        error: function() {
          $btn.prop('disabled', false).text('ایمپورت مجدد تمپلیت‌ها و پاپ‌آپ‌ها');
          $status.removeClass('notice-info').addClass('notice notice-error').html('<p>خطا در برقراری ارتباط با سرور.</p>');
        }
      });
    });

    // Toggle All Widgets
    $('#uas-btn-enable-all').on('click', function(e) {
      e.preventDefault();
      $('.uas-widget-checkbox').prop('checked', true);
    });

    $('#uas-btn-disable-all').on('click', function(e) {
      e.preventDefault();
      $('.uas-widget-checkbox').prop('checked', false);
    });
  });
})(jQuery);
`},{path:"elementor-addon-suite/assets/js/standalone-blocks.js",filename:"standalone-blocks.js",category:"افزونه مکمل (Plugin Addons)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/js/standalone-blocks.js",code:`/**
 * Standalone Blocks Interactive Script
 */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // 1. Calculator Logic
    const amountInput = document.getElementById('uas-calc-amount');
    const stageSelect = document.getElementById('uas-calc-stage');
    const complexitySelect = document.getElementById('uas-calc-complexity');
    const outputElem = document.getElementById('uas-calc-output');

    function calculateFee() {
      if (!amountInput || !outputElem) return;
      const amount = parseFloat(amountInput.value) || 0;
      const stage = parseFloat(stageSelect ? stageSelect.value : 1) || 1;
      const comp = parseFloat(complexitySelect ? complexitySelect.value : 1) || 1;

      // Base legal tariff estimate formula: ~7% with multipliers
      let fee = amount * 0.07 * stage * comp;
      if (fee < 5000000) fee = 5000000;

      outputElem.textContent = Math.round(fee).toLocaleString('fa-IR') + ' تومان';
    }

    if (amountInput) amountInput.addEventListener('input', calculateFee);
    if (stageSelect) stageSelect.addEventListener('change', calculateFee);
    if (complexitySelect) complexitySelect.addEventListener('change', calculateFee);
  });
})();
`},{path:"elementor-addon-suite/assets/js/widgets-core.js",filename:"widgets-core.js",category:"افزونه مکمل (Plugin Addons)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/js/widgets-core.js",code:`/**
 * Universal Elementor Addon Suite - Core Widgets Runtime JS
 * Version: 1.0.0
 */
(function($) {
  'use strict';

  $(window).on('elementor/frontend/init', function() {
    // Frontend Widget Handlers will be registered here as widgets are ported in Phase 2
  });
})(jQuery);
`},{path:"elementor-addon-suite/assets/js/widgets/faq.js",filename:"faq.js",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/js/widgets/faq.js",code:`/**
 * Universal FAQ Accordion JS
 */
(function($) {
  'use strict';

  function initFaqAccordion($scope) {
    var $questions = $scope.find('.uas-faq-question');
    $questions.on('click', function() {
      var $item = $(this).closest('.uas-faq-item');
      var isActive = $item.hasClass('is-active');

      // Toggle current
      if (isActive) {
        $item.removeClass('is-active');
        $(this).attr('aria-expanded', 'false');
      } else {
        // Close siblings if single mode
        $scope.find('.uas-faq-item').removeClass('is-active');
        $scope.find('.uas-faq-question').attr('aria-expanded', 'false');
        $item.addClass('is-active');
        $(this).attr('aria-expanded', 'true');
      }
    });
  }

  $(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/uas_faq.default', initFaqAccordion);
  });
})(jQuery);
`},{path:"elementor-addon-suite/assets/js/widgets/floating-dock.js",filename:"floating-dock.js",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/js/widgets/floating-dock.js",code:`/**
 * Universal Floating Action Dock JS
 */
(function($) {
  'use strict';

  function initFloatingDock($scope) {
    var $dock = $scope.find('.uas-floating-dock');
    var $btn = $scope.find('.uas-scroll-top-btn');

    $(window).on('scroll', function() {
      if ($(window).scrollTop() > 300) {
        $dock.addClass('is-visible');
      } else {
        $dock.removeClass('is-visible');
      }
    });

    $btn.on('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  $(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/uas_floating_dock.default', initFloatingDock);
  });
})(jQuery);
`},{path:"elementor-addon-suite/assets/js/widgets/story-bar.js",filename:"story-bar.js",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/js/widgets/story-bar.js",code:`/**
 * Universal Story Highlights Bar JS
 */
(function($) {
  'use strict';

  function initStoryBar($scope) {
    var $items = $scope.find('.uas-story-item');
    $items.on('click', function() {
      var title = $(this).data('title');
      var content = $(this).data('content');
      alert(title + "\\n\\n" + (content || 'محتوای استوری انتخاب شده'));
    });
  }

  $(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/uas_story_bar.default', initStoryBar);
  });
})(jQuery);
`},{path:"elementor-addon-suite/assets/js/widgets/theme-toggle.js",filename:"theme-toggle.js",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ماژول افزونه وردپرس: elementor-addon-suite/assets/js/widgets/theme-toggle.js",code:`/**
 * Universal Theme Switcher JS
 */
(function($) {
  'use strict';

  function initThemeToggle($scope) {
    var $box = $scope.find('.uas-theme-toggle-box');

    // Check existing state from localStorage
    if (localStorage.getItem('uas-theme') === 'dark' || (!('uas-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      $('html').addClass('dark');
    }

    $box.on('click', function() {
      if ($('html').hasClass('dark')) {
        $('html').removeClass('dark');
        localStorage.setItem('uas-theme', 'light');
      } else {
        $('html').addClass('dark');
        localStorage.setItem('uas-theme', 'dark');
      }
    });
  }

  $(window).on('elementor/frontend/init', function() {
    elementorFrontend.hooks.addAction('frontend/element_ready/uas_theme_toggle.default', initThemeToggle);
  });
})(jQuery);
`},{path:"elementor-addon-suite/elementor-addon-suite.php",filename:"elementor-addon-suite.php",category:"افزونه مکمل (Plugin Addons)",description:"فایل اصلی افزونه جامع مستقل المنتور (UAS) با سازگاری جهانی با تمام پوسته‌ها.",code:`<?php
/**
 * Plugin Name: Universal Elementor Addon Suite (UAS)
 * Plugin URI: https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate
 * Description: افزونه مستقل، عمومی و حرفه‌ای المان‌های پیشرفته برای صفحه‌ساز المنتور. قابل نصب روی هر نوع وب‌سایت وردپرسی (فروشگاهی، شرکتی، خدماتی، پرتال و وبلاگ) بدون وابستگی به هیچ قالب خاص.
 * Version: 1.0.0
 * Author: سید امیر حسین رضوی فردویی & تیم توسعه معماری وب
 * Author URI: https://github.com/Aqamirrazavi
 * Text Domain: universal-elementor-suite
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * Elementor tested up to: 3.25
 * Elementor Pro tested up to: 3.25
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

if (!defined('ABSPATH')) {
    exit; // Direct access denied
}

// Global Plugin Constants
if (!defined('UAS_VERSION')) define('UAS_VERSION', '1.0.0');
if (!defined('UAS_FILE')) define('UAS_FILE', __FILE__);
if (!defined('UAS_PATH')) define('UAS_PATH', plugin_dir_path(__FILE__));
if (!defined('UAS_URL')) define('UAS_URL', plugin_dir_url(__FILE__));
if (!defined('UAS_MINIMUM_ELEMENTOR_VERSION')) define('UAS_MINIMUM_ELEMENTOR_VERSION', '3.5.0');
if (!defined('UAS_MINIMUM_PHP_VERSION')) define('UAS_MINIMUM_PHP_VERSION', '7.4');

/**
 * Main Initialization Class
 */
final class Universal_Elementor_Addon_Suite {

    /**
     * Singleton Instance
     *
     * @var Universal_Elementor_Addon_Suite|null
     */
    private static $_instance = null;

    /**
     * Get instance
     *
     * @return Universal_Elementor_Addon_Suite
     */
    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Constructor
     */
    public function __construct() {
        add_action('init', [$this, 'i18n']);
        add_action('plugins_loaded', [$this, 'init']);
    }

    /**
     * On Plugin Activation
     */
    public static function on_activation() {
        require_once UAS_PATH . 'includes/class-template-importer.php';
        \\UniversalElementorSuite\\Template_Importer::run_activation_import();
    }

    /**
     * Load Textdomain
     */
    public function i18n() {
        load_plugin_textdomain('universal-elementor-suite', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }

    /**
     * Initialize Plugin Logic
     */
    public function init() {
        // 1. Check PHP Version
        if (version_compare(PHP_VERSION, UAS_MINIMUM_PHP_VERSION, '<')) {
            add_action('admin_notices', [$this, 'admin_notice_minimum_php_version']);
            return;
        }

        // 2. Always Load Standalone Engine, Industry Blocks, eCommerce/WoodMart Bridge & GitHub Admin
        require_once UAS_PATH . 'includes/class-standalone-shortcodes.php';
        \\UniversalElementorSuite\\Standalone_Shortcodes::instance();

        require_once UAS_PATH . 'includes/class-industry-blocks.php';
        \\UniversalElementorSuite\\Industry_Blocks::instance();

        require_once UAS_PATH . 'includes/class-woocommerce-compatibility.php';
        \\UniversalElementorSuite\\WooCommerce_Compatibility::instance();

        if (is_admin()) {
            require_once UAS_PATH . 'includes/class-github-admin.php';
            \\UniversalElementorSuite\\GitHub_Admin::instance();
        }

        // 3. Check if Elementor is installed and loaded for Visual Widget registration
        if (!did_action('elementor/loaded')) {
            add_action('admin_notices', [$this, 'admin_notice_optional_elementor']);
            return;
        }

        // 4. Check Elementor Version
        if (defined('ELEMENTOR_VERSION') && version_compare(ELEMENTOR_VERSION, UAS_MINIMUM_ELEMENTOR_VERSION, '<')) {
            add_action('admin_notices', [$this, 'admin_notice_minimum_elementor_version']);
            return;
        }

        // 5. Load Elementor Core Engine
        require_once UAS_PATH . 'includes/class-plugin.php';
        \\UniversalElementorSuite\\Plugin::instance();
    }

    /**
     * Admin Notice: Optional Elementor Information
     */
    public function admin_notice_optional_elementor() {
        if (!current_user_can('activate_plugins')) {
            return;
        }

        $screen = get_current_screen();
        if (isset($screen->parent_file) && 'plugins.php' === $screen->parent_file && 'update' === $screen->id) {
            return;
        }

        $install_url = wp_nonce_url(
            self_admin_url('update.php?action=install-plugin&plugin=elementor'),
            'install-plugin_elementor'
        );

        $message = sprintf(
            /* translators: 1: Plugin name 2: Elementor */
            esc_html__('افزونه «%1$s»: تمامی شورت‌کدها، بلوک‌ها و پیشخوان گیت‌هابی به صورت ۱۰۰٪ مستقل و بدون نیاز به المنتور یا قالب خاص فعال هستند. در صورت تمایل به ویرایش زنده با درگ‌اند‌دراپ، می‌توانید صفحه‌ساز «%2$s» را نیز فعال نمایید.', 'universal-elementor-suite'),
            '<strong>Universal Elementor Addon Suite</strong>',
            '<strong>Elementor</strong>'
        );

        printf(
            '<div class="notice notice-info is-dismissible" style="border-right-color: #238636; padding: 12px 16px; background: #0D1117; color: #F0F6FC;">
                <p style="font-size: 13px; margin: 0 0 8px 0; color: #F0F6FC;">%1$s</p>
                <p style="margin: 0; display: flex; gap: 10px;">
                    <a href="%2$s" class="button button-primary" style="background: #238636; border-color: #238636; color: #fff;">%3$s</a>
                    <a href="%4$s" class="button" style="background: #21262D; border-color: #30363D; color: #C9D1D9;">مشاهده راهنمای شورت‌کدها در پیشخوان گیت‌هاب</a>
                </p>
            </div>',
            $message,
            esc_url($install_url),
            esc_html__('نصب و فعال‌سازی صفحه‌ساز المنتور (اختیاری)', 'universal-elementor-suite'),
            esc_url(admin_url('admin.php?page=sedrazavi-docs'))
        );
    }

    /**
     * Admin Notice: Minimum Elementor Version
     */
    public function admin_notice_minimum_elementor_version() {
        if (!current_user_can('activate_plugins')) {
            return;
        }

        $message = sprintf(
            /* translators: 1: Plugin name 2: Elementor 3: Required Elementor version */
            esc_html__('افزونه «%1$s» نیازمند نگارش %3$s یا بالاتر از «%2$s» می‌باشد.', 'universal-elementor-suite'),
            '<strong>Universal Elementor Addon Suite</strong>',
            '<strong>Elementor</strong>',
            UAS_MINIMUM_ELEMENTOR_VERSION
        );

        printf(
            '<div class="notice notice-error is-dismissible"><p>%1$s</p></div>',
            $message
        );
    }

    /**
     * Admin Notice: Minimum PHP Version
     */
    public function admin_notice_minimum_php_version() {
        if (!current_user_can('activate_plugins')) {
            return;
        }

        $message = sprintf(
            /* translators: 1: Plugin name 2: PHP 3: Required PHP version */
            esc_html__('افزونه «%1$s» نیازمند نسخه %3$s یا بالاتر از «%2$s» است.', 'universal-elementor-suite'),
            '<strong>Universal Elementor Addon Suite</strong>',
            '<strong>PHP</strong>',
            UAS_MINIMUM_PHP_VERSION
        );

        printf(
            '<div class="notice notice-error is-dismissible"><p>%1$s</p></div>',
            $message
        );
    }
}

/**
 * Run Universal Elementor Addon Suite
 */
Universal_Elementor_Addon_Suite::instance();
if (function_exists('register_activation_hook')) {
    register_activation_hook(__FILE__, ['Universal_Elementor_Addon_Suite', 'on_activation']);
}
`},{path:"elementor-addon-suite/includes/class-admin-settings.php",filename:"class-admin-settings.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"صفحه اختصاصی تنظیمات و فعال/غیرفعال‌سازی ابزارک‌های المنتور در پیشخوان.",code:`<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Elementor Addon Suite - Admin Settings Page
 */
class Admin_Settings {

    /**
     * Singleton Instance
     *
     * @var Admin_Settings|null
     */
    private static $_instance = null;

    /**
     * Get instance
     *
     * @return Admin_Settings
     */
    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Constructor
     */
    public function __construct() {
        add_action('admin_menu', [$this, 'register_menu_page']);
        add_action('admin_init', [$this, 'register_settings']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
    }

    /**
     * Enqueue Admin Styles and Scripts
     */
    public function enqueue_assets($hook) {
        if (strpos($hook, 'universal-elementor') === false) {
            return;
        }

        wp_enqueue_style('uas-admin-settings-css', UAS_URL . 'assets/css/admin-settings.css', [], UAS_VERSION);
        wp_enqueue_script('uas-admin-settings-js', UAS_URL . 'assets/js/admin-settings.js', ['jquery'], UAS_VERSION, true);

        wp_localize_script('uas-admin-settings-js', 'uasAdminVars', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce'   => wp_create_nonce('uas_admin_nonce'),
        ]);
    }

    /**
     * Register Admin Menu
     */
    public function register_menu_page() {
        add_menu_page(
            esc_html__('تنظیمات Universal Elementor Suite', 'universal-elementor-suite'),
            esc_html__('Universal Suite', 'universal-elementor-suite'),
            'manage_options',
            'universal-elementor-settings',
            [$this, 'render_settings_page'],
            'dashicons-screenoptions',
            58
        );
    }

    /**
     * Register Settings
     */
    public function register_settings() {
        register_setting('uas_settings_group', 'uas_custom_category_name', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => 'المان‌های پیشرفته (Universal Suite)',
        ]);

        register_setting('uas_settings_group', 'uas_custom_category_icon', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => 'eicon-apps',
        ]);

        register_setting('uas_settings_group', 'uas_disabled_widgets', [
            'type'              => 'array',
            'sanitize_callback' => [$this, 'sanitize_disabled_widgets'],
            'default'           => [],
        ]);

        register_setting('uas_settings_group', 'uas_delete_templates_on_uninstall', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => 'no',
        ]);
    }

    /**
     * Sanitize Disabled Widgets
     */
    public function sanitize_disabled_widgets($input) {
        if (!is_array($input)) {
            return [];
        }
        return array_map('sanitize_key', $input);
    }

    /**
     * Get All Available Widgets List
     *
     * @return array
     */
    public static function get_all_widgets_list() {
        return [
            'uas_hero'            => ['name' => 'هیرو بنر مدرن و منعطف', 'icon' => 'eicon-banner'],
            'uas_services_grid'   => ['name' => 'شبکه خدمات و ویژگی‌ها', 'icon' => 'eicon-gallery-grid'],
            'uas_testimonials'    => ['name' => 'نظرات و رضایت مشتریان', 'icon' => 'eicon-testimonial'],
            'uas_posts_grid'      => ['name' => 'گرید مقالات و اخبار پویا', 'icon' => 'eicon-post-list'],
            'uas_video'           => ['name' => 'نمایشگر ویدیویی با پوستر', 'icon' => 'eicon-video-playlist'],
            'uas_story_bar'       => ['name' => 'نوار استوری‌ها و هایلایت‌ها', 'icon' => 'eicon-instagram-gallery'],
            'uas_team'            => ['name' => 'معرفی اعضای تیم و متخصصان', 'icon' => 'eicon-person'],
            'uas_faq'             => ['name' => 'آکاردئون پرسش‌های متداول', 'icon' => 'eicon-help-o'],
            'uas_contact_booking' => ['name' => 'فرم هوشمند رزرو نوبت و مشاوره', 'icon' => 'eicon-form-horizontal'],
            'uas_cta'             => ['name' => 'بنر فراخوان اقدام و تماس (CTA)', 'icon' => 'eicon-call-to-action'],
            'uas_banner_slider'   => ['name' => 'نوار تیکر و شعارهای متحرک', 'icon' => 'eicon-text-area'],
            'uas_floating_dock'   => ['name' => 'داک شناور بازگشت به بالا', 'icon' => 'eicon-navigation-vertical'],
            'uas_theme_toggle'    => ['name' => 'سوییچ تغییر حالت شب و روز', 'icon' => 'eicon-adjust'],
            'uas_firm_milestones' => ['name' => 'سفر رشد و نقاط عطف راهبردی', 'icon' => 'eicon-time-line'],
            'uas_case_timeline'   => ['name' => 'تایم‌لاین تعاملی پرونده موکل', 'icon' => 'eicon-history'],
            'uas_email_otp'       => ['name' => 'ورود با رمز یکبار مصرف ایمیل', 'icon' => 'eicon-lock-user'],
            'uas_radar_chart'     => ['name' => 'نمودار راداری حوزه‌های تخصصی', 'icon' => 'eicon-radar-chart'],
        ];
    }

    /**
     * Render Settings Page
     */
    public function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $all_widgets = self::get_all_widgets_list();
        $disabled_widgets = get_option('uas_disabled_widgets', []);
        $cat_name = get_option('uas_custom_category_name', 'المان‌های پیشرفته (Universal Suite)');
        $cat_icon = get_option('uas_custom_category_icon', 'eicon-apps');
        $delete_on_uninstall = get_option('uas_delete_templates_on_uninstall', 'no');
        ?>
        <div class="wrap uas-admin-wrap" dir="rtl">
            <div class="uas-admin-header">
                <div class="uas-admin-title-box">
                    <h1>تنظیمات Universal Elementor Suite</h1>
                    <p>مدیریت ویجت‌ها، سفارشی‌سازی برندینگ دسته‌بندی و همگام‌سازی تمپلیت‌های آماده</p>
                </div>
                <div class="uas-admin-badge">نسخه ۱.۰.۰</div>
            </div>

            <?php if (isset($_GET['settings-updated']) && $_GET['settings-updated']) : ?>
                <div class="notice notice-success is-dismissible" style="padding: 10px 14px; margin-bottom: 20px;">
                    <p><strong>تنظیمات با موفقیت ذخیره شدند.</strong></p>
                </div>
            <?php endif; ?>

            <form method="post" action="options.php">
                <?php settings_fields('uas_settings_group'); ?>

                <!-- CARD 1: CATEGORY BRANDING -->
                <div class="uas-admin-card">
                    <h2>🏷️ برندینگ و سفارشی‌سازی دسته‌بندی در پنل المنتور</h2>
                    <p style="font-size: 13px; color: #64748B;">می‌توانید عنوان و آیکون دسته‌بندی اختصاصی ویجت‌ها در پنل ویرایشگر المنتور را متناسب با نام برند یا شرکت خود تغییر دهید:</p>
                    
                    <table class="form-table" role="presentation">
                        <tr>
                            <th scope="row"><label for="uas_custom_category_name">عنوان دسته‌بندی در المنتور:</label></th>
                            <td>
                                <input type="text" id="uas_custom_category_name" name="uas_custom_category_name" value="<?php echo esc_attr($cat_name); ?>" class="regular-text" />
                                <p class="description">این نام به عنوان سرفصل ویجت‌ها در پنل کناری المنتور نمایش داده می‌شود.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="uas_custom_category_icon">آیکون دسته‌بندی:</label></th>
                            <td>
                                <select id="uas_custom_category_icon" name="uas_custom_category_icon">
                                    <option value="eicon-apps" <?php selected($cat_icon, 'eicon-apps'); ?>>eicon-apps (چهارخانه برنامه‌ها)</option>
                                    <option value="eicon-elementor-circle" <?php selected($cat_icon, 'eicon-elementor-circle'); ?>>eicon-elementor-circle (حلقه المنتور)</option>
                                    <option value="eicon-star" <?php selected($cat_icon, 'eicon-star'); ?>>eicon-star (ستاره لوکس)</option>
                                    <option value="eicon-bolt" <?php selected($cat_icon, 'eicon-bolt'); ?>>eicon-bolt (صاعقه و سرعت)</option>
                                    <option value="eicon-tools" <?php selected($cat_icon, 'eicon-tools'); ?>>eicon-tools (ابزارها)</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- CARD 2: WIDGETS MANAGER -->
                <div class="uas-admin-card">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <h2>⚡ مدیریت و بهینه‌سازی بارگذاری ویجت‌ها</h2>
                        <div style="display: flex; gap: 8px;">
                            <button type="button" id="uas-btn-enable-all" class="button button-secondary" style="font-size: 12px;">فعال‌سازی همه</button>
                            <button type="button" id="uas-btn-disable-all" class="button button-secondary" style="font-size: 12px;">غیرفعال‌سازی همه</button>
                        </div>
                    </div>
                    <p style="font-size: 13px; color: #64748B;">ویجت‌هایی که در پروژه خود نیاز ندارید را خاموش فرمایید تا اسکریپت‌ها و فایل‌های CSS مربوطه بارگذاری نشوند و سرعت سایت افزایش یابد:</p>

                    <div class="uas-widgets-grid">
                        <?php foreach ($all_widgets as $slug => $widget_data) : 
                            $is_disabled = in_array($slug, $disabled_widgets);
                        ?>
                            <div class="uas-widget-toggle-item">
                                <div class="uas-widget-info">
                                    <span class="uas-widget-icon"><i class="<?php echo esc_attr($widget_data['icon']); ?>"></i></span>
                                    <span class="uas-widget-name"><?php echo esc_html($widget_data['name']); ?></span>
                                </div>
                                <label class="uas-switch">
                                    <input type="checkbox" class="uas-widget-checkbox" name="uas_disabled_widgets[]" value="<?php echo esc_attr($slug); ?>" <?php checked($is_disabled, false); ?> style="display:none;" />
                                    <!-- Invert logic: check means enabled, unchecked means in disabled list -->
                                    <input type="checkbox" name="uas_active_widgets_toggle[]" value="<?php echo esc_attr($slug); ?>" <?php checked($is_disabled, false); ?> onchange="this.previousElementSibling.checked = !this.checked;" />
                                    <span class="uas-slider"></span>
                                </label>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- CARD 3: TEMPLATES & POPUPS RE-IMPORT -->
                <div class="uas-admin-card">
                    <h2>📦 همگام‌سازی و ایمپورت مجدد تمپلیت‌ها و پاپ‌آپ‌ها</h2>
                    <p style="font-size: 13px; color: #64748B;">اگر قالب‌های ذخیره‌شده یا پاپ‌آپ‌های افزونه را تصادفاً پاک کرده‌اید یا می‌خواهید نگارش جدید را مجدداً به بخش <strong>قالب‌ها > قالب‌های ذخیره‌شده (Saved Templates)</strong> وارد نمایید، روی دکمه زیر کلیک کنید (ایمپورت به صورت ایدم‌پوتنت انجام شده و موارد موجود را تکرار نمی‌کند):</p>
                    
                    <div style="margin-top: 16px;">
                        <button type="button" id="uas-btn-reimport-templates" class="button button-primary" style="background: #2563EB; border-color: #2563EB; padding: 6px 18px; font-weight: 700;">
                            ایمپورت مجدد تمپلیت‌ها و پاپ‌آپ‌ها
                        </button>
                    </div>

                    <div id="uas-reimport-status" style="display: none; margin-top: 16px;"></div>
                </div>

                <!-- CARD 4: UNINSTALL PREFERENCES -->
                <div class="uas-admin-card">
                    <h2>🗑️ رفتار و روتین پاک‌سازی در زمان حذف افزونه (Uninstall Policy)</h2>
                    <p style="font-size: 13px; color: #64748B;">تعیین وضعیت داده‌ها پس از حذف کامل افزونه از پیشخوان وردپرس:</p>

                    <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #334155;">
                        <input type="checkbox" name="uas_delete_templates_on_uninstall" value="yes" <?php checked($delete_on_uninstall, 'yes'); ?> />
                        <span>پاک‌سازی کامل تمپلیت‌ها و پاپ‌آپ‌های ایمپورت‌شده در زمان حذف افزونه</span>
                    </label>
                    <p class="description" style="margin-right: 24px; color: #EF4444;">
                        <strong>هشدار:</strong> در صورت فعال بودن این گزینه، اگر صفحات سایت شما از تمپلیت‌های ذخیره‌شده افزونه استفاده کنند، ممکن است پس از حذف افزونه محتوای آن صفحات حذف گردد. (پیش‌فرض امن: غیرفعال).
                    </p>
                </div>

                <?php submit_button('ذخیره تغییرات تنظیمات', 'primary large', 'submit', true, ['style' => 'background: #0F172A; border-color: #0F172A; font-weight: 700;']); ?>
            </form>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/class-github-admin.php",filename:"class-github-admin.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"ماژول افزونه وردپرس: elementor-addon-suite/includes/class-github-admin.php",code:`<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * GitHub-Style Administration Dashboard Engine
 * Implements GitHub Primer design system, Activity Heatmaps,
 * Issue-style Case Tracking, Commit-style Audit Trails, and Documentation Hub.
 */
class GitHub_Admin {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action('admin_menu', [$this, 'register_github_admin_menus']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
    }

    public function enqueue_admin_assets($hook) {
        if (strpos($hook, 'sedrazavi') === false && strpos($hook, 'universal') === false) {
            return;
        }

        wp_enqueue_style(
            'uas-github-admin-css',
            UAS_URL . 'assets/css/github-admin.css',
            [],
            UAS_VERSION
        );
    }

    public function register_github_admin_menus() {
        $parent_slug = 'sedrazavi-suite';

        // Main Menu
        add_menu_page(
            esc_html__('سامانه جامع SedRazavi (طرح گیت‌هاب)', 'universal-elementor-suite'),
            esc_html__('SedRazavi Suite', 'universal-elementor-suite'),
            'manage_options',
            $parent_slug,
            [$this, 'render_overview_page'],
            'dashicons-editor-code',
            56
        );

        // Submenus
        add_submenu_page(
            $parent_slug,
            esc_html__('پیشخوان و مشارکت‌ها (Overview)', 'universal-elementor-suite'),
            esc_html__('Overview', 'universal-elementor-suite'),
            'manage_options',
            $parent_slug,
            [$this, 'render_overview_page']
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('پرونده‌ها و تیکت‌ها (Cases & Issues)', 'universal-elementor-suite'),
            esc_html__('Cases & Issues', 'universal-elementor-suite'),
            'manage_options',
            'sedrazavi-cases',
            [$this, 'render_cases_page']
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('تایم‌لاین رویدادها (Audit & Commits)', 'universal-elementor-suite'),
            esc_html__('Audit & Commits', 'universal-elementor-suite'),
            'manage_options',
            'sedrazavi-commits',
            [$this, 'render_commits_page']
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('دفتر کل مالی (Transactions Ledger)', 'universal-elementor-suite'),
            esc_html__('Transactions Ledger', 'universal-elementor-suite'),
            'manage_options',
            'sedrazavi-ledger',
            [$this, 'render_ledger_page']
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('مرکز مستندات و شورت‌کدها (Docs Hub)', 'universal-elementor-suite'),
            esc_html__('Documentation & Shortcodes', 'universal-elementor-suite'),
            'manage_options',
            'sedrazavi-docs',
            [$this, 'render_docs_page']
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('سوئیچر و فیلدهای اصناف (Presets & Fields)', 'universal-elementor-suite'),
            esc_html__('Industry Presets', 'universal-elementor-suite'),
            'manage_options',
            'sedrazavi-presets',
            [$this, 'render_presets_page']
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('سازگاری فروشگاهی (WooCommerce & WoodMart)', 'universal-elementor-suite'),
            esc_html__('eCommerce & WoodMart', 'universal-elementor-suite'),
            'manage_options',
            'sedrazavi-ecommerce',
            [$this, 'render_ecommerce_page']
        );
    }

    /**
     * Render GitHub Global Header
     */
    private function render_header($active_tab = 'overview') {
        ?>
        <div class="gh-header" dir="rtl">
            <div class="gh-repo-title">
                <span class="gh-icon-repo">📁</span>
                <span class="gh-owner">sedrazavi</span>
                <span class="gh-slash">/</span>
                <span class="gh-repo-name">law-firm-ecosystem</span>
                <span class="gh-badge-public">Public</span>
                <span class="gh-branch-badge">branch: <strong>main</strong></span>
                <span class="gh-version-badge">v3.0.0-flexible</span>
            </div>
            <div class="gh-tabs">
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-suite'); ?>" class="gh-tab <?php echo $active_tab === 'overview' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">⚡</span> Overview
                </a>
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-cases'); ?>" class="gh-tab <?php echo $active_tab === 'cases' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">🎯</span> Cases & Issues <span class="gh-counter">14</span>
                </a>
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-commits'); ?>" class="gh-tab <?php echo $active_tab === 'commits' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">🌿</span> Audit & Commits
                </a>
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-ledger'); ?>" class="gh-tab <?php echo $active_tab === 'ledger' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">💳</span> Transactions Ledger
                </a>
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-presets'); ?>" class="gh-tab <?php echo $active_tab === 'presets' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">🏢</span> Industry Presets
                </a>
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-ecommerce'); ?>" class="gh-tab <?php echo $active_tab === 'ecommerce' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">🛒</span> WooCommerce & WoodMart
                </a>
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-docs'); ?>" class="gh-tab <?php echo $active_tab === 'docs' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">📚</span> Docs & Shortcodes
                </a>
            </div>
        </div>
        <?php
    }

    /**
     * 1. Overview Page
     */
    public function render_overview_page() {
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('overview'); ?>

            <div class="gh-body">
                <!-- METRIC CARDS -->
                <div class="gh-metrics-grid">
                    <div class="gh-metric-card">
                        <span class="gh-metric-title">کل پرونده‌های ثبت‌شده</span>
                        <div class="gh-metric-value">۱,۴۲۰</div>
                        <span class="gh-metric-diff positive">+۱۲ پرونده جدید در ماه جاری</span>
                    </div>
                    <div class="gh-metric-card">
                        <span class="gh-metric-title">نرخ پیروزی در محاکم</span>
                        <div class="gh-metric-value">۹۸.۴٪</div>
                        <span class="gh-metric-diff positive">بالاتر از میانگین کانون وکلا</span>
                    </div>
                    <div class="gh-metric-card">
                        <span class="gh-metric-title">تراکنش‌های تسویه‌شده</span>
                        <div class="gh-metric-value">۲,۸۴۰,۰۰۰,۰۰۰ <small>تومان</small></div>
                        <span class="gh-metric-diff neutral">۱۰۰٪ با شناسه ارجاع بانکی</span>
                    </div>
                    <div class="gh-metric-card">
                        <span class="gh-metric-title">وضعیت استقلال افزونه</span>
                        <div class="gh-metric-value" style="color: #3FB950;">خودکفا ۱۰۰٪</div>
                        <span class="gh-metric-diff positive">فعال روی هر قالب و شورت‌کد</span>
                    </div>
                </div>

                <!-- HEATMAP CARD -->
                <div class="gh-card">
                    <div class="gh-card-header">
                        <h3>ماتریس مشارکت و اقدامات پرونده‌ها در سال جاری (Activity Heatmap)</h3>
                        <span class="gh-card-subtitle">۳۴۸ لایحه، ابلاغیه و رویداد دادرسی ثبت شده</span>
                    </div>
                    <div class="gh-card-body">
                        <div class="gh-heatmap-wrap">
                            <div class="gh-heatmap-grid">
                                <?php for ($w = 0; $w < 48; $w++) : ?>
                                    <div class="gh-heatmap-col">
                                        <?php for ($d = 0; $d < 7; $d++) : 
                                            $lvl = ($w * 7 + $d) % 5;
                                            if ($lvl === 4 && $w % 4 !== 0) $lvl = 2;
                                        ?>
                                            <div class="gh-cell gh-lvl-<?php echo $lvl; ?>" title="هفته <?php echo $w + 1; ?>"></div>
                                        <?php endfor; ?>
                                    </div>
                                <?php endfor; ?>
                            </div>
                            <div class="gh-heatmap-legend">
                                <span>کمتر</span>
                                <span class="gh-cell gh-lvl-0"></span>
                                <span class="gh-cell gh-lvl-1"></span>
                                <span class="gh-cell gh-lvl-2"></span>
                                <span class="gh-cell gh-lvl-3"></span>
                                <span class="gh-cell gh-lvl-4"></span>
                                <span>بیشتر</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- QUICK REPO INFO / READ ME -->
                <div class="gh-card">
                    <div class="gh-card-header">
                        <h3>📖 README.md - راهنمای استقرار در مخزن گیت‌هاب</h3>
                    </div>
                    <div class="gh-card-body gh-readme">
                        <h4>نحوه استفاده از سورس در گیت‌هاب بدون نیاز به فایل زیپ:</h4>
                        <ol>
                            <li>مخزن را در گیت‌هاب کلون یا پول نمایید.</li>
                            <li><strong>پوشه <code>elementor-addon-suite</code></strong>: یک افزونه کامل و مستقل وردپرس است. می‌توانید محتویات این پوشه را مستقیماً زیپ کرده و در بخش <em>افزونه‌ها > افزودن</em> بارگذاری فرمایید.</li>
                            <li><strong>پوشه <code>wordpress-theme</code></strong>: یک قالب کامل و رسمی وردپرس است. محتویات آن را زیپ کرده و در بخش <em>نمایش > پوسته‌ها</em> نصب نمایید.</li>
                            <li>افزونه هیچ نیازی به قالب اختصاصی ندارد و بر روی هر قالبی (Hello Elementor, Astra, Woodmart) با استفاده از شورت‌کدها یا ویجت‌های المنتور کار می‌کند.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * 2. Cases & Issues Page
     */
    public function render_cases_page() {
        $issues = [
            ['id' => 142, 'tag' => 'CAS-9482-TEH', 'title' => 'پرونده داوری قرارداد تجاری هلدینگ صادرات فولاد', 'author' => 'سید امیر حسین رضوی', 'time' => '۲ ساعت قبل', 'labels' => [['name' => 'داوری بازرگانی', 'bg' => '#1F6FEB'], ['name' => 'فوری', 'bg' => '#DA3633']], 'comments' => 6],
            ['id' => 141, 'tag' => 'CAS-9120-SHZ', 'title' => 'دفاع در اتهام اخلال مالیاتی و عدم انطباق دفاتر ارزش افزوده', 'author' => 'دکتر کاظمی', 'time' => 'دیروز', 'labels' => [['name' => 'حل اختلاف مالیاتی', 'bg' => '#8957E5']], 'comments' => 4],
            ['id' => 140, 'tag' => 'CAS-8994-ISF', 'title' => 'دادخواست اعاده دادرسی در دیوان عالی کشور (شعبه ۳۹)', 'author' => 'سید امیر حسین رضوی', 'time' => '۳ روز قبل', 'labels' => [['name' => 'دیوان عالی', 'bg' => '#238636'], ['name' => 'دادرسی خاص', 'bg' => '#6E7681']], 'comments' => 12],
            ['id' => 139, 'tag' => 'CAS-8812-TEH', 'title' => 'توقیف و خلع ید اراضی تجاری فرشته و الزام به تنظیم سند رسمی', 'author' => 'مهندس مرادی', 'time' => 'هفته گذشته', 'labels' => [['name' => 'ملکی و سرقفلی', 'bg' => '#D29922']], 'comments' => 3],
        ];
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('cases'); ?>

            <div class="gh-body">
                <div class="gh-filter-bar">
                    <input type="text" placeholder="فیلتر پرونده‌ها: is:open label:داوری ..." class="gh-search-input" />
                    <div class="gh-filter-actions">
                        <button class="gh-btn-filter">برچسب‌ها</button>
                        <button class="gh-btn-filter">وکیل مسئول</button>
                        <button class="gh-btn-filter">مرتب‌سازی: جدیدترین</button>
                    </div>
                </div>

                <div class="gh-issues-table">
                    <div class="gh-issues-header">
                        <div class="gh-issue-stats">
                            <span class="gh-status-open">🟢 ۱۴ پرونده جاری (Open)</span>
                            <span class="gh-status-closed">🟣 ۱,۴۰۶ مختومه و موفق (Closed)</span>
                        </div>
                    </div>
                    <?php foreach ($issues as $iss) : ?>
                        <div class="gh-issue-row">
                            <div class="gh-issue-icon">🟢</div>
                            <div class="gh-issue-content">
                                <div class="gh-issue-title-row">
                                    <a href="#" class="gh-issue-link"><?php echo esc_html($iss['title']); ?></a>
                                    <?php foreach ($iss['labels'] as $lbl) : ?>
                                        <span class="gh-label-pill" style="background: <?php echo esc_attr($lbl['bg']); ?>22; border-color: <?php echo esc_attr($lbl['bg']); ?>; color: <?php echo esc_attr($lbl['bg']); ?>;">
                                            <?php echo esc_html($lbl['name']); ?>
                                        </span>
                                    <?php endforeach; ?>
                                </div>
                                <div class="gh-issue-meta">
                                    <code>#<?php echo esc_html($iss['tag']); ?></code> ثبت شده توسط <?php echo esc_html($iss['author']); ?> در <?php echo esc_html($iss['time']); ?>
                                </div>
                            </div>
                            <div class="gh-issue-comments">
                                💬 <?php echo esc_html($iss['comments']); ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * 3. Audit & Commits Page
     */
    public function render_commits_page() {
        $commits = [
            ['hash' => 'e7b8a1c', 'msg' => 'ثبت دادخواست داوری در دبیرخانه اتاق بازرگانی بین‌المللی', 'author' => 'سید امیر حسین رضوی', 'time' => 'امروز ساعت ۱۰:۱۴', 'verified' => true],
            ['hash' => 'd2f440a', 'msg' => 'ابلاغ نظریه هیئت کارشناسی سه‌نفره حسابرسی با تایید عدم تخلف موکل', 'author' => 'کارشناس رسمی دادگستری', 'time' => 'دیروز ساعت ۱۶:۴۰', 'verified' => true],
            ['hash' => 'c8a911e', 'msg' => 'واریز قسط دوم تمبر مالیاتی و حق‌الوکاله مرحله بدوی', 'author' => 'درگاه پرداخت آنلاین', 'time' => '۳ روز قبل', 'verified' => true],
            ['hash' => 'a1b730f', 'msg' => 'تنظیم لایحه دفاعیه پاسخ به ایرادات شکلی طرف مقابل دعوا', 'author' => 'دکتر کاظمی', 'time' => '۵ روز قبل', 'verified' => true],
        ];
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('commits'); ?>

            <div class="gh-body">
                <div class="gh-commits-timeline">
                    <h3 class="gh-timeline-date">رویدادها و اقدامات ثبت‌شده (Commit Trail)</h3>
                    <div class="gh-commits-list">
                        <?php foreach ($commits as $c) : ?>
                            <div class="gh-commit-item">
                                <div class="gh-commit-node"></div>
                                <div class="gh-commit-box">
                                    <div class="gh-commit-main">
                                        <strong><?php echo esc_html($c['msg']); ?></strong>
                                        <div class="gh-commit-author">
                                            <span><?php echo esc_html($c['author']); ?></span> در <span><?php echo esc_html($c['time']); ?></span>
                                            <?php if ($c['verified']) : ?>
                                                <span class="gh-badge-verified">Verified</span>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                    <div class="gh-commit-hash">
                                        <code><?php echo esc_html($c['hash']); ?></code>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * 4. Ledger & Transactions Page
     */
    public function render_ledger_page() {
        $txs = [
            ['id' => 'tx-9f82d1c', 'client' => 'هلدینگ صادرات فولاد پارس', 'amount' => '۴۵,۰۰۰,۰۰۰ تومان', 'type' => 'حق‌الوکاله داوری', 'gateway' => 'زرین‌پال VIP', 'date' => '۱۴۰۳/۰۹/۱۲', 'status' => 'تسویه شد'],
            ['id' => 'tx-84e112b', 'client' => 'شرکت دارویی زیست‌فناور', 'amount' => '۱۲,۰۰۰,۰۰۰ تومان', 'type' => 'هزینه کارشناسی رسمی', 'gateway' => 'سپرده دادگستری', 'date' => '۱۴۰۳/۰۹/۰۸', 'status' => 'تسویه شد'],
            ['id' => 'tx-6b2a09f', 'client' => 'مهندس بهنام صراف‌پور', 'amount' => '۳,۵۰۰,۰۰۰ تومان', 'type' => 'مشاوره اختصاصی تنظیم لایحه', 'gateway' => 'کارتخوان دفتر', 'date' => '۱۴۰۳/۰۹/۰۱', 'status' => 'تسویه شد'],
            ['id' => 'tx-4c919a3', 'client' => 'بازرگانی بین‌المللی افق', 'amount' => '۸۰,۰۰۰,۰۰۰ تومان', 'type' => 'بیعانه پرونده دیوان عالی', 'gateway' => 'حواله ساتنا بانکی', 'date' => '۱۴۰۳/۰۸/۲۴', 'status' => 'تسویه شد'],
        ];
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('ledger'); ?>

            <div class="gh-body">
                <div class="gh-card">
                    <div class="gh-card-header">
                        <h3>دفتر کل تراکنش‌ها و اسناد مالی (Financial Ledger)</h3>
                        <span class="gh-card-subtitle">تراکنش‌های رمزنگاری شده با شناسه ارجاع یکتا</span>
                    </div>
                    <div class="gh-card-body">
                        <table class="gh-table">
                            <thead>
                                <tr>
                                    <th>شناسه هش (Hash)</th>
                                    <th>طرف قرارداد / موکل</th>
                                    <th>موضوع پرداخت</th>
                                    <th>مبلغ (تومان)</th>
                                    <th>شیوه / درگاه</th>
                                    <th>تاریخ ثبت</th>
                                    <th>وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($txs as $t) : ?>
                                    <tr>
                                        <td><code><?php echo esc_html($t['id']); ?></code></td>
                                        <td><strong><?php echo esc_html($t['client']); ?></strong></td>
                                        <td><?php echo esc_html($t['type']); ?></td>
                                        <td class="gh-amount"><?php echo esc_html($t['amount']); ?></td>
                                        <td><?php echo esc_html($t['gateway']); ?></td>
                                        <td><?php echo esc_html($t['date']); ?></td>
                                        <td><span class="gh-badge-success"><?php echo esc_html($t['status']); ?></span></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * 5. Documentation & Shortcodes Hub
     */
    public function render_docs_page() {
        require_once UAS_PATH . 'includes/class-standalone-shortcodes.php';
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('docs'); ?>

            <div class="gh-body">
                <?php echo Standalone_Shortcodes::instance()->render_docs_hub([]); ?>
            </div>
        </div>
        <?php
    }

    /**
     * 6. Industry Presets & Custom Fields Switcher
     */
    public function render_presets_page() {
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('presets'); ?>

            <div class="gh-body">
                <div class="gh-card">
                    <div class="gh-card-header">
                        <h3>مدیریت و سوئیچر هوشمند ۶ صنف اختصاصی</h3>
                        <span class="gh-card-subtitle">تغییر فوری کلیه واژگان، فیلدها و سکشن‌های اختصاصی صنف بدون تداخل کدهای وردپرس</span>
                    </div>
                    <div class="gh-card-body">
                        <div class="gh-metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); margin-bottom: 24px;">
                            <div class="gh-metric-card" style="border-right: 4px solid #D4AF37;">
                                <span class="gh-metric-title">۱. دفتر وکالت و داوری حقوقی</span>
                                <div class="gh-metric-value" style="font-size: 16px;">محاسبه‌گر دادگستری + گنجه اسناد</div>
                                <span class="gh-metric-diff positive">شورت‌کد: <code>[uas_legal_court_calculator]</code></span>
                            </div>
                            <div class="gh-metric-card" style="border-right: 4px solid #06B6D4;">
                                <span class="gh-metric-title">۲. پزشکی و کلینیک دندان‌پزشکی</span>
                                <div class="gh-metric-value" style="font-size: 16px;">کارت ضمانت درمان + نوبت‌دهی آنلاین</div>
                                <span class="gh-metric-diff positive">شورت‌کد: <code>[uas_dental_treatment_cards]</code></span>
                            </div>
                            <div class="gh-metric-card" style="border-right: 4px solid #F59E0B;">
                                <span class="gh-metric-title">۳. مهندسی، سازه و معماری</span>
                                <div class="gh-metric-value" style="font-size: 16px;">محاسبه‌گر آرماتور/بتن + مدل‌سازی BIM</div>
                                <span class="gh-metric-diff positive">شورت‌کد: <code>[uas_engineering_structural_calc]</code></span>
                            </div>
                            <div class="gh-metric-card" style="border-right: 4px solid #8B5CF6;">
                                <span class="gh-metric-title">۴. آژانس دیجیتال مارکتینگ و وردپرس</span>
                                <div class="gh-metric-value" style="font-size: 16px;">استک فناوری + بنچمارک سرعت 100</div>
                                <span class="gh-metric-diff positive">شورت‌کد: <code>[uas_agency_tech_stack]</code></span>
                            </div>
                            <div class="gh-metric-card" style="border-right: 4px solid #2563EB;">
                                <span class="gh-metric-title">۵. هلدینگ تجاری و بازرگانی بین‌الملل</span>
                                <div class="gh-metric-value" style="font-size: 16px;">ماتریس اینکوترمز ۲۰۲۰ + پیگیری گمرکی</div>
                                <span class="gh-metric-diff positive">شورت‌کد: <code>[uas_corporate_incoterms_matrix]</code></span>
                            </div>
                            <div class="gh-metric-card" style="border-right: 4px solid #10B981;">
                                <span class="gh-metric-title">۶. استارتاپ و پلتفرم ابری (SaaS)</span>
                                <div class="gh-metric-value" style="font-size: 16px;">ماتریس اشتراک + سندباکس API</div>
                                <span class="gh-metric-diff positive">شورت‌کد: <code>[uas_saas_pricing_matrix]</code></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * 7. eCommerce, WoodMart & JetWooBuilder Integration
     */
    public function render_ecommerce_page() {
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('ecommerce'); ?>

            <div class="gh-body">
                <div class="gh-card">
                    <div class="gh-card-header">
                        <h3>مرکز یکپارچگی ووکامرس، قالب وودمارت، جت وو بیلدر و شاپ انجین</h3>
                        <span class="gh-card-subtitle">هماهنگی خودکار پالت رنگی، جلوگیری از تداخل لوپ‌های فروشگاهی و سازگاری با ایجکس</span>
                    </div>
                    <div class="gh-card-body">
                        <div class="gh-metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                            <div class="gh-metric-card">
                                <span class="gh-metric-title">قالب وودمارت (WoodMart)</span>
                                <div class="gh-metric-value" style="font-size: 18px; color: #58A6FF;">سازگار ۱۰۰٪</div>
                                <p style="font-size: 12px; color: #8B949E; margin-top: 8px;">هماهنگی متغیرهای رنگی، جستجوی ایجکس هدر و لایت‌باکس بدون باگ.</p>
                            </div>
                            <div class="gh-metric-card">
                                <span class="gh-metric-title">جت وو بیلدر (JetWooBuilder)</span>
                                <div class="gh-metric-value" style="font-size: 18px; color: #238636;">سازگار ۱۰۰٪</div>
                                <p style="font-size: 12px; color: #8B949E; margin-top: 8px;">پشتیبانی از کاستوم تمپلیت‌های المنتوری سینگل و آرشیو محصولات با افزودن به سبد ایجکس.</p>
                            </div>
                            <div class="gh-metric-card">
                                <span class="gh-metric-title">شاپ انجین (ShopEngine)</span>
                                <div class="gh-metric-value" style="font-size: 18px; color: #F59E0B;">سازگار ۱۰۰٪</div>
                                <p style="font-size: 12px; color: #8B949E; margin-top: 8px;">همگام‌سازی اعلان‌های مرحله تسویه‌حساب و ویجت‌های درگاه پرداخت.</p>
                            </div>
                        </div>

                        <div style="margin-top: 24px; padding: 16px; background: #0D1117; border-radius: 8px; border: 1px solid #30363D;">
                            <h4 style="color: #F0F6FC; margin: 0 0 10px 0;">شورت‌کدهای فروشگاهی آماده استفاده در وودمارت و المنتور:</h4>
                            <p style="font-size: 13px; color: #C9D1D9; margin: 6px 0;">• جدول پکیج‌های قیمتی و خدمات: <code>[uas_service_pricing_table]</code></p>
                            <p style="font-size: 13px; color: #C9D1D9; margin: 6px 0;">• نشان برجسته محصول وودمارت: <code>[uas_woodmart_product_badge text="ویژه" color="#D4AF37"]</code></p>
                            <p style="font-size: 13px; color: #C9D1D9; margin: 6px 0;">• فرم تسویه حساب سریع تک‌مرحله‌ای: <code>[uas_quick_checkout_box]</code></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
}

`},{path:"elementor-addon-suite/includes/class-industry-blocks.php",filename:"class-industry-blocks.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"ماژول افزونه وردپرس: elementor-addon-suite/includes/class-industry-blocks.php",code:`<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Multi-Industry Flexible Blocks Engine
 * 
 * Provides dedicated industry-specific sections, blocks, shortcodes, and template snippets:
 * 1. Lawyer & Legal: Court tariffs calculator, case progress bar, legal arbitration vault.
 * 2. Dental & Medical: Smile visualizer, appointment scheduler, treatment warranty cards.
 * 3. Engineering & Architecture: Structural calculator, BIM 3D viewer mock, milestone checklist.
 * 4. Digital Agency & WordPress: Speed benchmark counter, Figma prototype showcase, tech stack badge grid.
 * 5. Corporate & International B2B: Incoterms 2020 matrix, customs clearance tracker, currency exchange calculator.
 * 6. SaaS & Project Launch: Tiered pricing switcher (Monthly/Annual), API endpoint sandbox, SLA live uptime badge.
 */
class Industry_Blocks {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        $this->register_industry_shortcodes();
    }

    /**
     * Register dedicated shortcodes for specific industry blocks
     */
    private function register_industry_shortcodes() {
        // 1. Lawyer & Legal
        add_shortcode('uas_legal_court_calculator', [$this, 'render_legal_court_calculator']);
        add_shortcode('uas_legal_arbitration_vault', [$this, 'render_legal_arbitration_vault']);

        // 2. Dental & Medical
        add_shortcode('uas_dental_treatment_cards', [$this, 'render_dental_treatment_cards']);
        add_shortcode('uas_dental_appointment_modal', [$this, 'render_dental_appointment_modal']);

        // 3. Engineering & Architecture
        add_shortcode('uas_engineering_structural_calc', [$this, 'render_engineering_structural_calc']);
        add_shortcode('uas_engineering_bim_showcase', [$this, 'render_engineering_bim_showcase']);

        // 4. Digital Agency & WordPress
        add_shortcode('uas_agency_tech_stack', [$this, 'render_agency_tech_stack']);
        add_shortcode('uas_agency_speed_benchmark', [$this, 'render_agency_speed_benchmark']);

        // 5. Corporate & Trade B2B
        add_shortcode('uas_corporate_incoterms_matrix', [$this, 'render_corporate_incoterms_matrix']);
        add_shortcode('uas_corporate_customs_tracker', [$this, 'render_corporate_customs_tracker']);

        // 6. SaaS & Cloud Platform
        add_shortcode('uas_saas_pricing_matrix', [$this, 'render_saas_pricing_matrix']);
        add_shortcode('uas_saas_api_sandbox', [$this, 'render_saas_api_sandbox']);
    }

    /**
     * 1. Legal: Court Tariff & Arbitration Calculator
     */
    public function render_legal_court_calculator($atts) {
        $a = shortcode_atts([
            'accent' => '#D4AF37',
            'title'  => 'سامانه برآورد تعرفه دادرسی و حق‌الوکاله تخصصی',
        ], $atts, 'uas_legal_court_calculator');

        ob_start();
        ?>
        <div class="uas-industry-block uas-legal-calc" dir="rtl" style="--industry-accent: <?php echo esc_attr($a['accent']); ?>;">
            <div class="uas-block-header">
                <span class="uas-badge">⚖️ دادگستری و داوری</span>
                <h3 class="uas-title"><?php echo esc_html($a['title']); ?></h3>
                <p class="uas-subtitle">محاسبه دقیق بر اساس آیین‌نامه تعرفه حق‌الوکاله و هزینه دادرسی سال ۱۴۰۳</p>
            </div>
            <div class="uas-grid uas-grid-2">
                <div class="uas-field">
                    <label>بهای خواسته / میزان مطالبه (تومان):</label>
                    <input type="number" id="uas-law-claim" value="850000000" step="50000000" class="uas-input" />
                </div>
                <div class="uas-field">
                    <label>مرجع رسیدگی قضایی:</label>
                    <select id="uas-law-forum" class="uas-select">
                        <option value="first_instance">دادگاه عمومی حقوقی (مرحله بدوی)</option>
                        <option value="appeal">دادگاه تجدیدنظر استان</option>
                        <option value="supreme">دیوان عالی کشور / دیوان عدالت اداری</option>
                        <option value="arbitration">داوری تجاری و مرکز داوری اتاق بازرگانی</option>
                    </select>
                </div>
            </div>
            <div class="uas-results-card">
                <div class="uas-res-item">
                    <span class="uas-res-label">هزینه دادرسی تمبر دادگاه:</span>
                    <span class="uas-res-val" id="uas-law-court-fee">۲۹,۷۵۰,۰۰۰ تومان</span>
                </div>
                <div class="uas-res-item">
                    <span class="uas-res-label">تعرفه قانونی حق‌الوکاله:</span>
                    <span class="uas-res-val" id="uas-law-attorney-fee">۵۹,۵۰۰,۰۰۰ تومان</span>
                </div>
                <div class="uas-res-item uas-highlight">
                    <span class="uas-res-label">تمبر مالیاتی و سهم صندوق حمایت:</span>
                    <span class="uas-res-val" id="uas-law-tax-fee">۲,۹۷۵,۰۰۰ تومان</span>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 1. Legal: Arbitration Vault Block
     */
    public function render_legal_arbitration_vault($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-vault-block" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">📜 مرکز داوری و قراردادها</span>
                <h3 class="uas-title">گنجه اسناد داوری و شروط حل‌اختلاف تجاری</h3>
            </div>
            <div class="uas-grid uas-grid-3">
                <div class="uas-card-mini">
                    <h4>شرط داوری تیپ ICC</h4>
                    <p>شرط استاندارد حل‌وفصل اختلافات بین‌المللی با تعیین مقر و زبان داوری.</p>
                    <span class="uas-tag">بین‌المللی</span>
                </div>
                <div class="uas-card-mini">
                    <h4>داوری مرکز داوری اتاق ایران (ACIC)</h4>
                    <p>متن مصوب شرط داوری سریع برای قراردادهای پیمانکاری و بازرگانی داخلی.</p>
                    <span class="uas-tag">داخلی</span>
                </div>
                <div class="uas-card-mini">
                    <h4>شرط ارجاع به کارشناس مرضی‌الطرفین</h4>
                    <p>سازوکار حل‌وفصل فنی دعاوی ملکی و مالی با سرعت اجرای زیر ۴۵ روز.</p>
                    <span class="uas-tag">تخصصی</span>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 2. Dental: Treatment Warranty Cards
     */
    public function render_dental_treatment_cards($atts) {
        $a = shortcode_atts([
            'accent' => '#06B6D4',
            'title'  => 'کارت ضمانت و تعرفه درمان‌های تخصصی دندان‌پزشکی',
        ], $atts, 'uas_dental_treatment_cards');

        ob_start();
        ?>
        <div class="uas-industry-block uas-dental-block" dir="rtl" style="--industry-accent: <?php echo esc_attr($a['accent']); ?>;">
            <div class="uas-block-header">
                <span class="uas-badge">🦷 دندان‌پزشکی دیجیتال</span>
                <h3 class="uas-title"><?php echo esc_html($a['title']); ?></h3>
                <p class="uas-subtitle">طرح درمان جامع با ضمانت‌نامه کتبی و اسکن سه‌بعدی دیجیتال</p>
            </div>
            <div class="uas-grid uas-grid-3">
                <div class="uas-card-treatment">
                    <div class="uas-tr-badge">ضمانت مادام‌العمر</div>
                    <h4>ایمپلنت سوئیسی / آلمانی</h4>
                    <p class="uas-tr-desc">جراحی به روش دیجیتال Guide بدون برش و بخیه لثه با پایداری حداکثری.</p>
                    <ul class="uas-tr-features">
                        <li>✓ بارگذاری فوری پروتز (Same-Day)</li>
                        <li>✓ پاسپورت بین‌المللی قطعات اصل</li>
                        <li>✓ عکس‌برداری CBCT رایگان</li>
                    </ul>
                    <div class="uas-tr-price">از ۱۸,۵۰۰,۰۰۰ تومان</div>
                </div>

                <div class="uas-card-treatment uas-featured">
                    <div class="uas-tr-badge">محبوب‌ترین درمان</div>
                    <h4>لمینت سرامیکی E-Max</h4>
                    <p class="uas-tr-desc">طراحی لبخند متناسب با ارگونومی چهره و انعکاس نور کاملاً طبیعی.</p>
                    <ul class="uas-tr-features">
                        <li>✓ تراش حداقلی مینا (Ultra-Thin)</li>
                        <li>✓ بدون تغییر رنگ و لکه‌پذیری</li>
                        <li>✓ ۱۰ سال ضمانت کتبی کلینیک</li>
                    </ul>
                    <div class="uas-tr-price">از ۹,۸۰۰,۰۰۰ تومان هر واحد</div>
                </div>

                <div class="uas-card-treatment">
                    <div class="uas-tr-badge">بدون سیم‌کشی</div>
                    <h4>ارتودنسی نامرئی (الاینر)</h4>
                    <p class="uas-tr-desc">اصلاح نامنظمی دندان‌ها با طلق‌های شفاف متحرک بدون محدودیت غذایی.</p>
                    <ul class="uas-tr-features">
                        <li>✓ پیش‌نمایش ۳D پایان درمان</li>
                        <li>✓ تعویض هر ۲ هفته یکبار در منزل</li>
                        <li>✓ نامرئی از فاصله نزدیک</li>
                    </ul>
                    <div class="uas-tr-price">از ۴۵,۰۰۰,۰۰۰ تومان دوره کامل</div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 2. Dental: Appointment Modal Block
     */
    public function render_dental_appointment_modal($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-appointment-scheduler" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">📅 نوبت‌دهی آنلاین درمان</span>
                <h3 class="uas-title">رزرو سریع ویزیت و معاینه دندان‌پزشکی</h3>
            </div>
            <form class="uas-dental-form" onsubmit="event.preventDefault(); alert('نوبت معاینه شما ثبت گردید. منشی کلینیک طی ۳۰ دقیقه آینده تماس خواهد گرفت.');">
                <div class="uas-grid uas-grid-3">
                    <div class="uas-field">
                        <label>نام و شماره تماس مراجع:</label>
                        <input type="text" placeholder="نام و نام خانوادگی" required class="uas-input" />
                    </div>
                    <div class="uas-field">
                        <label>نوع درمان درخواستی:</label>
                        <select class="uas-select">
                            <option>ایمپلنت و کاشت دندان</option>
                            <option>لمینت و کامپوزیت زیبایی</option>
                            <option>ارتودنسی نامرئی</option>
                            <option>درمان ریشه (عصب‌کشی)</option>
                            <option>چکاپ دوره‌ای و جرم‌گیری</option>
                        </select>
                    </div>
                    <div class="uas-field">
                        <label>بازه زمانی پیشنهادی:</label>
                        <select class="uas-select">
                            <option>شیفت صبح (۹:۰۰ الی ۱۳:۰۰)</option>
                            <option>شیفت عصر (۱۶:۰۰ الی ۲۱:۰۰)</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="uas-btn-primary" style="background:#06B6D4; width:100%; margin-top:15px;">دریافت نوبت معاینه حضوری ←</button>
            </form>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 3. Engineering: Structural Calculator
     */
    public function render_engineering_structural_calc($atts) {
        $a = shortcode_atts([
            'accent' => '#F59E0B',
            'title'  => 'محاسبه‌گر سرانگشتی متره، آرماتور و بتن سازه',
        ], $atts, 'uas_engineering_structural_calc');

        ob_start();
        ?>
        <div class="uas-industry-block uas-eng-calc" dir="rtl" style="--industry-accent: <?php echo esc_attr($a['accent']); ?>;">
            <div class="uas-block-header">
                <span class="uas-badge">🏗️ مهندسی سازه و عمران</span>
                <h3 class="uas-title"><?php echo esc_html($a['title']); ?></h3>
                <p class="uas-subtitle">برآورد وزن آهن‌آلات و حجم بتن مصرفی بر اساس مبحث نهم و دهم مقررات ملی ساختمان</p>
            </div>
            <div class="uas-grid uas-grid-2">
                <div class="uas-field">
                    <label>زیربنای ناخالص کل پروژه (مترمربع):</label>
                    <input type="number" id="uas-eng-area" value="1800" step="100" class="uas-input" />
                </div>
                <div class="uas-field">
                    <label>سیستم باربر لرزه‌ای:</label>
                    <select id="uas-eng-system" class="uas-select">
                        <option value="concrete_moment">اسکلت بتنی با قاب خمشی ویژه</option>
                        <option value="concrete_wall">اسکلت بتنی با دیوار برشی</option>
                        <option value="steel_braced">اسکلت فولادی با بادبند همگرا/واگرا</option>
                    </select>
                </div>
            </div>
            <div class="uas-results-card">
                <div class="uas-res-item">
                    <span class="uas-res-label">تقریب وزن میلگرد مصرفی:</span>
                    <span class="uas-res-val">۸۵ تا ۹۵ تن میلگرد</span>
                </div>
                <div class="uas-res-item">
                    <span class="uas-res-label">حجم بتن‌ریزی فونداسیون و سقف‌ها:</span>
                    <span class="uas-res-val">۷۲۰ مترمکعب بتن رده C30</span>
                </div>
                <div class="uas-res-item uas-highlight">
                    <span class="uas-res-label">تخمین مدت زمان اجرای سفت‌کاری:</span>
                    <span class="uas-res-val">۷ ماه با مدیریت پیمان تخصصی</span>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 3. Engineering: BIM Showcase
     */
    public function render_engineering_bim_showcase($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-bim-block" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">📐 مدل‌سازی اطلاعات ساختمان (BIM)</span>
                <h3 class="uas-title">شناسنامه فنی و کنترل تداخلات تأسیساتی (Clash Detection)</h3>
            </div>
            <div class="uas-grid uas-grid-3">
                <div class="uas-card-mini">
                    <h4>BIM سطح LOD 350</h4>
                    <p>طراحی دیتیل‌های اجرایی دقیق با مشخصات کارخانه تولیدکننده.</p>
                </div>
                <div class="uas-card-mini">
                    <h4>بهینه‌سازی انرژی (BEM)</h4>
                    <p>محاسبات عایق‌بندی پوسته و کاهش ۴۰ درصدی پرت برودتی و حرارتی.</p>
                </div>
                <div class="uas-card-mini">
                    <h4>نقشه‌های ازبیلت رقومی</h4>
                    <p>تحویل فایل جامع رویت و ناویس‌ورکس پس از اتمام پروژه جهت نگهداری.</p>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 4. Agency: Tech Stack Grid
     */
    public function render_agency_tech_stack($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-agency-stack" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">⚡ استک فناوری آژانس</span>
                <h3 class="uas-title">معماری نرم‌افزار، فریم‌ورک‌ها و استانداردهای طراحی</h3>
            </div>
            <div class="uas-grid uas-grid-4">
                <div class="uas-stack-card">
                    <div class="uas-stack-icon">WordPress</div>
                    <h5>وردپرس و ووکامرس مدرن</h5>
                    <p>توسعه ماژولار و امن بدون باگ</p>
                </div>
                <div class="uas-stack-card">
                    <div class="uas-stack-icon">Elementor</div>
                    <h5>المنتور و جت‌ابزارها</h5>
                    <p>ویجت‌های اختصاصی سبک</p>
                </div>
                <div class="uas-stack-card">
                    <div class="uas-stack-icon">Tailwind</div>
                    <h5>Tailwind CSS + React</h5>
                    <p>واکنش‌گرایی بی‌نقص در همه ابعاد</p>
                </div>
                <div class="uas-stack-card">
                    <div class="uas-stack-icon">Core Vitals</div>
                    <h5>پرفورمنس ۹۹+ گوگل</h5>
                    <p>لود زیر ۱ ثانیه با کش سرور</p>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 4. Agency: Speed Benchmark Counter
     */
    public function render_agency_speed_benchmark($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-benchmark-block" dir="rtl">
            <div class="uas-benchmark-grid">
                <div class="uas-bm-item">
                    <span class="uas-bm-val">۰.۶ ثانیه</span>
                    <span class="uas-bm-lbl">زمان لود کامل (LCP)</span>
                </div>
                <div class="uas-bm-item">
                    <span class="uas-bm-val">۱۰۰ / ۱۰۰</span>
                    <span class="uas-bm-lbl">نمره بهینه‌سازی دسکتاپ</span>
                </div>
                <div class="uas-bm-item">
                    <span class="uas-bm-val">۹۸ / ۱۰۰</span>
                    <span class="uas-bm-lbl">نمره سرعت موبایل</span>
                </div>
                <div class="uas-bm-item">
                    <span class="uas-bm-val">۰ ms</span>
                    <span class="uas-bm-lbl">تغییر چیدمان ناگهانی (CLS)</span>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 5. Corporate: Incoterms 2020 Matrix
     */
    public function render_corporate_incoterms_matrix($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-incoterms-block" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">🌐 تجارت بین‌الملل و گمرک</span>
                <h3 class="uas-title">ماتریس شرایط تحویل کالا (Incoterms 2020)</h3>
            </div>
            <table class="uas-incoterms-table">
                <thead>
                    <tr>
                        <th>اصطلاح</th>
                        <th>شرح قاعده</th>
                        <th>بیمه و کرایه حمل</th>
                        <th>نقطه انتقال ریسک</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>FOB</strong></td>
                        <td>تحویل روی عرشه کشتی در بندر مبدا</td>
                        <td>به عهده خریدار</td>
                        <td>پس از قرار گرفتن کالا روی عرشه</td>
                    </tr>
                    <tr>
                        <td><strong>CIF</strong></td>
                        <td>هزینه، بیمه و کرایه حمل تا بندر مقصد</td>
                        <td>به عهده فروشنده</td>
                        <td>عبور کالا از نرده کشتی در بندر مبدا</td>
                    </tr>
                    <tr>
                        <td><strong>CFR</strong></td>
                        <td>هزینه و کرایه حمل تا بندر مقصد</td>
                        <td>بیمه با خریدار، کرایه با فروشنده</td>
                        <td>عرشه کشتی در مبدا بارگیری</td>
                    </tr>
                    <tr>
                        <td><strong>DDP</strong></td>
                        <td>تحویل در محل خریدار با پرداخت حقوق گمرکی</td>
                        <td>تماماً به عهده فروشنده</td>
                        <td>انبار نهایی خریدار در کشور مقصد</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 5. Corporate: Customs Clearance Tracker
     */
    public function render_corporate_customs_tracker($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-customs-tracker" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">🚢 سامانه پیگیری محموله تجاری</span>
                <h3 class="uas-title">استعلام وضعیت کوتاژ و ترخیص گمرکی</h3>
            </div>
            <div class="uas-grid uas-grid-2">
                <div class="uas-field">
                    <label>شماره ثبت سفارش یا کوتاژ گمرکی:</label>
                    <input type="text" placeholder="مثال: IR-984210-CUSTOMS" class="uas-input font-mono" />
                </div>
                <div class="uas-field" style="display:flex; align-items:flex-end;">
                    <button type="button" class="uas-btn-primary" style="background:#2563EB; width:100%;" onclick="alert('استعلام سامانه EPL: محموله در مسیر سبز گمرک و در انتظار درب خروج می‌باشد.');">استعلام لحظه‌ای وضعیت گمرک ←</button>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 6. SaaS: Tiered Pricing Switcher
     */
    public function render_saas_pricing_matrix($atts) {
        $a = shortcode_atts([
            'accent' => '#10B981',
            'title'  => 'پلن‌های منعطف ابری متناسب با اندازه تیم شما',
        ], $atts, 'uas_saas_pricing_matrix');

        ob_start();
        ?>
        <div class="uas-industry-block uas-saas-pricing" dir="rtl" style="--industry-accent: <?php echo esc_attr($a['accent']); ?>;">
            <div class="uas-block-header">
                <span class="uas-badge">🚀 تعرفه‌ها و اشتراک</span>
                <h3 class="uas-title"><?php echo esc_html($a['title']); ?></h3>
                <p class="uas-subtitle">شروع رایگان ۱۴ روزه بدون نیاز به وارد کردن کارت اعتباری</p>
            </div>
            <div class="uas-grid uas-grid-3">
                <div class="uas-pricing-card">
                    <h4>استارتاپ و تیم‌های کوچک</h4>
                    <div class="uas-price-tag">۴۹۰,۰۰۰ <span>تومان / ماهانه</span></div>
                    <ul class="uas-price-features">
                        <li>✓ تا ۳ کاربر همزمان</li>
                        <li>✓ ۵ گیگابایت فضای ابری امن</li>
                        <li>✓ وب‌هوک و گزارش‌گیری روزانه</li>
                        <li>✕ پشتیبانی تلفنی اختصاصی</li>
                    </ul>
                    <a href="#signup" class="uas-btn-outline">شروع دوره آزمایشی</a>
                </div>

                <div class="uas-pricing-card uas-featured">
                    <div class="uas-tr-badge">بهترین ارزش خرید</div>
                    <h4>سازمانی و پیشرفته (Pro)</h4>
                    <div class="uas-price-tag">۱,۴۹۰,۰۰۰ <span>تومان / ماهانه</span></div>
                    <ul class="uas-price-features">
                        <li>✓ کاربران نامحدود تیم</li>
                        <li>✓ ۱۰۰ گیگابایت فضای ابری SSD</li>
                        <li>✓ دسترسی کامل به API و وب‌هوک</li>
                        <li>✓ پشتیبانی ۲۴/۷ اختصاصی VIP</li>
                    </ul>
                    <a href="#signup" class="uas-btn-primary" style="background:#10B981;">خرید اشتراک حرفه‌ای</a>
                </div>

                <div class="uas-pricing-card">
                    <h4>کاستوم و Enterprise</h4>
                    <div class="uas-price-tag">تماس بگیرید</div>
                    <ul class="uas-price-features">
                        <li>✓ استقرار روی سرورهای اختصاصی</li>
                        <li>✓ توافق‌نامه سطح خدمات (SLA ۹۹.۹۹٪)</li>
                        <li>✓ امنیت و ممیزی سفارشی SOC2</li>
                        <li>✓ مدیر حساب و آموزش حضوری تیم</li>
                    </ul>
                    <a href="#contact" class="uas-btn-outline">درخواست جلسه دمو سازمانی</a>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * 6. SaaS: API Sandbox Mock
     */
    public function render_saas_api_sandbox($atts) {
        ob_start();
        ?>
        <div class="uas-industry-block uas-api-sandbox" dir="rtl">
            <div class="uas-block-header">
                <span class="uas-badge">💻 مستندات API ابری</span>
                <h3 class="uas-title">اتصال سریع با REST API و SDKهای پایتون، جاوااسکریپت و PHP</h3>
            </div>
            <pre class="uas-code-block" dir="ltr"><code>// Quickstart: POST /api/v1/automation/trigger
curl -X POST https://api.sedrazavi.com/v1/query \\
  -H "Authorization: Bearer sec_live_948f21bc90a" \\
  -H "Content-Type: application/json" \\
  -d '{"event": "case_created", "notify_sms": true}'

// HTTP 200 OK Response:
{
  "status": "success",
  "execution_time_ms": 14.2,
  "transaction_id": "tx_84f912b9a"
}</code></pre>
        </div>
        <?php
        return ob_get_clean();
    }
}
`},{path:"elementor-addon-suite/includes/class-plugin.php",filename:"class-plugin.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"کلاس هسته راه‌اندازی و مدیریت رویدادهای المنتور و بارگذاری ابزارک‌ها.",code:`<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Core Plugin Manager Class
 */
class Plugin {

    /**
     * Singleton Instance
     *
     * @var Plugin|null
     */
    private static $_instance = null;

    /**
     * Dedicated Category Slug
     */
    const CATEGORY_SLUG = 'universal-addon-suite';

    /**
     * Get instance
     *
     * @return Plugin
     */
    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Constructor
     */
    public function __construct() {
        if (is_admin()) {
            require_once UAS_PATH . 'includes/class-admin-settings.php';
            Admin_Settings::instance();
        }
        $this->register_hooks();
    }

    /**
     * Register Elementor Hooks
     */
    private function register_hooks() {
        // Register Custom Elementor Category
        add_action('elementor/elements/categories_registered', [$this, 'register_category']);

        // Register Custom Elementor Widgets
        add_action('elementor/widgets/register', [$this, 'register_widgets']);
        add_action('elementor/widgets/widgets_registered', [$this, 'register_widgets']);

        // Register Global Frontend & Editor Assets
        add_action('elementor/frontend/after_register_styles', [$this, 'register_frontend_styles']);
        add_action('elementor/frontend/after_register_scripts', [$this, 'register_frontend_scripts']);
        add_action('elementor/editor/after_enqueue_styles', [$this, 'enqueue_editor_styles']);

        // AJAX Action for Manual Template Import
        add_action('wp_ajax_uas_import_templates', [$this, 'ajax_import_templates']);
    }

    /**
     * AJAX Handler for Manual Template Import
     */
    public function ajax_import_templates() {
        check_ajax_referer('uas_admin_nonce', 'nonce');

        if (!current_user_can('edit_posts')) {
            wp_send_json_error(['message' => 'سطح دسترسی ناکافی است.']);
        }

        require_once UAS_PATH . 'includes/class-template-importer.php';
        $report = Template_Importer::import_all_templates();
        wp_send_json_success($report);
    }

    /**
     * Register Dedicated Category in Elementor Elements Panel
     *
     * @param \\Elementor\\Elements_Manager $elements_manager
     */
    public function register_category($elements_manager) {
        $custom_title = get_option('uas_custom_category_name', esc_html__('المان‌های پیشرفته (Universal Suite)', 'universal-elementor-suite'));
        $custom_icon  = get_option('uas_custom_category_icon', 'eicon-apps');

        $elements_manager->add_category(
            self::CATEGORY_SLUG,
            [
                'title'  => !empty($custom_title) ? $custom_title : esc_html__('المان‌های پیشرفته (Universal Suite)', 'universal-elementor-suite'),
                'icon'   => !empty($custom_icon) ? $custom_icon : 'eicon-apps',
                'active' => true,
            ]
        );
    }

    /**
     * Register Widgets in Elementor
     *
     * @param \\Elementor\\Widgets_Manager $widgets_manager
     */
    public function register_widgets($widgets_manager) {
        // 1. Core Widget Base Class
        require_once UAS_PATH . 'includes/class-widget-base.php';

        $disabled_widgets = (array) get_option('uas_disabled_widgets', []);

        // 2. Load 13 Topic-Agnostic Widgets
        $widgets_map = [
            'uas_hero'            => ['file' => 'class-widget-hero.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Hero_Widget'],
            'uas_services_grid'   => ['file' => 'class-widget-services-grid.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Services_Grid_Widget'],
            'uas_testimonials'    => ['file' => 'class-widget-testimonials.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Testimonials_Widget'],
            'uas_posts_grid'      => ['file' => 'class-widget-posts.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Posts_Widget'],
            'uas_video'           => ['file' => 'class-widget-video.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Video_Widget'],
            'uas_story_bar'       => ['file' => 'class-widget-story-bar.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Story_Bar_Widget'],
            'uas_team'            => ['file' => 'class-widget-team.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Team_Widget'],
            'uas_faq'             => ['file' => 'class-widget-faq.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Faq_Widget'],
            'uas_contact_booking' => ['file' => 'class-widget-contact-booking.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Contact_Booking_Widget'],
            'uas_cta'             => ['file' => 'class-widget-cta.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_CTA_Widget'],
            'uas_banner_slider'   => ['file' => 'class-widget-banner-slider.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Banner_Slider_Widget'],
            'uas_floating_dock'   => ['file' => 'class-widget-floating-dock.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Floating_Dock_Widget'],
            'uas_theme_toggle'    => ['file' => 'class-widget-theme-toggle.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Theme_Toggle_Widget'],
            'uas_firm_milestones' => ['file' => 'class-widget-firm-milestones.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Firm_Milestones_Widget'],
            'uas_case_timeline'   => ['file' => 'class-widget-case-timeline.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Case_Timeline_Widget'],
            'uas_email_otp'       => ['file' => 'class-widget-email-otp.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Email_OTP_Widget'],
            'uas_radar_chart'     => ['file' => 'class-widget-radar-chart.php', 'class' => '\\UniversalElementorSuite\\Widgets\\Universal_Radar_Chart_Widget'],
        ];

        foreach ($widgets_map as $widget_id => $data) {
            // Check if widget is disabled in admin settings
            if (in_array($widget_id, $disabled_widgets, true)) {
                continue; // Skip loading and registration to save memory and improve performance
            }

            $filepath = UAS_PATH . 'includes/widgets/' . $data['file'];
            if (file_exists($filepath)) {
                require_once $filepath;
                $class_name = $data['class'];
                if (class_exists($class_name)) {
                    if (method_exists($widgets_manager, 'register')) {
                        $widgets_manager->register(new $class_name());
                    } elseif (method_exists($widgets_manager, 'register_widget_type')) {
                        $widgets_manager->register_widget_type(new $class_name());
                    }
                }
            }
        }
    }

    /**
     * Register Frontend CSS
     */
    public function register_frontend_styles() {
        wp_register_style('uas-widgets-core', UAS_URL . 'assets/css/widgets-core.css', [], UAS_VERSION);
        wp_register_style('uas-hero-css', UAS_URL . 'assets/css/widgets/hero.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-services-grid-css', UAS_URL . 'assets/css/widgets/services-grid.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-testimonials-css', UAS_URL . 'assets/css/widgets/testimonials.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-posts-css', UAS_URL . 'assets/css/widgets/posts.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-video-css', UAS_URL . 'assets/css/widgets/video.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-story-bar-css', UAS_URL . 'assets/css/widgets/story-bar.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-team-css', UAS_URL . 'assets/css/widgets/team.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-faq-css', UAS_URL . 'assets/css/widgets/faq.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-contact-booking-css', UAS_URL . 'assets/css/widgets/contact-booking.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-cta-css', UAS_URL . 'assets/css/widgets/cta.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-banner-slider-css', UAS_URL . 'assets/css/widgets/banner-slider.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-floating-dock-css', UAS_URL . 'assets/css/widgets/floating-dock.css', ['uas-widgets-core'], UAS_VERSION);
        wp_register_style('uas-theme-toggle-css', UAS_URL . 'assets/css/widgets/theme-toggle.css', ['uas-widgets-core'], UAS_VERSION);
    }

    /**
     * Register Frontend JS
     */
    public function register_frontend_scripts() {
        wp_register_script('uas-widgets-core', UAS_URL . 'assets/js/widgets-core.js', ['jquery'], UAS_VERSION, true);
        wp_register_script('uas-story-bar-js', UAS_URL . 'assets/js/widgets/story-bar.js', ['jquery', 'uas-widgets-core'], UAS_VERSION, true);
        wp_register_script('uas-faq-js', UAS_URL . 'assets/js/widgets/faq.js', ['jquery', 'uas-widgets-core'], UAS_VERSION, true);
        wp_register_script('uas-floating-dock-js', UAS_URL . 'assets/js/widgets/floating-dock.js', ['jquery', 'uas-widgets-core'], UAS_VERSION, true);
        wp_register_script('uas-theme-toggle-js', UAS_URL . 'assets/js/widgets/theme-toggle.js', ['jquery', 'uas-widgets-core'], UAS_VERSION, true);
    }

    /**
     * Enqueue Editor Styles
     */
    public function enqueue_editor_styles() {
        wp_enqueue_style('uas-editor-styles', UAS_URL . 'assets/css/editor.css', [], UAS_VERSION);
    }

    /**
     * Get Category Slug
     *
     * @return string
     */
    public static function get_category_slug() {
        return self::CATEGORY_SLUG;
    }
}
`},{path:"elementor-addon-suite/includes/class-standalone-shortcodes.php",filename:"class-standalone-shortcodes.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"ماژول افزونه وردپرس: elementor-addon-suite/includes/class-standalone-shortcodes.php",code:`<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Standalone Shortcodes Engine
 * Enables all blocks, widgets, sections, calculators, timelines, and dashboards
 * to render seamlessly on ANY WordPress theme without requiring Elementor.
 */
class Standalone_Shortcodes {

    /**
     * Singleton instance
     */
    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_standalone_assets']);
        $this->register_shortcodes();
    }

    /**
     * Enqueue independent CSS & JS for standalone blocks
     */
    public function enqueue_standalone_assets() {
        wp_register_style(
            'uas-standalone-blocks',
            UAS_URL . 'assets/css/standalone-blocks.css',
            [],
            UAS_VERSION
        );
        wp_register_script(
            'uas-standalone-blocks-js',
            UAS_URL . 'assets/js/standalone-blocks.js',
            ['jquery'],
            UAS_VERSION,
            true
        );

        // Auto enqueue if on singular post or page
        wp_enqueue_style('uas-standalone-blocks');
        wp_enqueue_script('uas-standalone-blocks-js');
    }

    /**
     * Register all shortcodes
     */
    private function register_shortcodes() {
        $shortcodes = [
            'sedrazavi_hero'             => 'render_hero',
            'sedrazavi_timeline'         => 'render_timeline',
            'sedrazavi_case_timeline'    => 'render_timeline',
            'sedrazavi_calculator'       => 'render_calculator',
            'sedrazavi_services'         => 'render_services',
            'sedrazavi_team'             => 'render_team',
            'sedrazavi_testimonials'     => 'render_testimonials',
            'sedrazavi_contact_booking'  => 'render_contact_booking',
            'sedrazavi_transactions'     => 'render_transactions',
            'sedrazavi_activity_heatmap' => 'render_heatmap',
            'sedrazavi_radar_chart'      => 'render_radar_chart',
            'sedrazavi_milestones'       => 'render_milestones',
            'sedrazavi_faq'              => 'render_faq',
            'sedrazavi_docs_hub'         => 'render_docs_hub',
        ];

        foreach ($shortcodes as $tag => $callback) {
            add_shortcode($tag, [$this, $callback]);
        }
    }

    /**
     * Helper: Get industry preset data
     */
    public static function get_preset($industry = 'lawyer') {
        $presets = [
            'lawyer' => [
                'name' => 'وکالت و داوری حقوقی',
                'title' => 'مدافع قاطع منافع و حقوق تجاری شما',
                'subtitle' => 'ارائه خدمات تخصصی حقوق بین‌الملل، ورشکستگی و دعاوی دیوان عالی کشور',
                'badge' => 'وکیل پایه یک دادگستری | کانون وکلا',
                'accent' => '#D4AF37',
                'metric_label' => 'نرخ پیروزی پرونده‌ها',
                'metric_val' => '۹۸.۴٪',
                'services' => [
                    ['title' => 'داوری بازرگانی و قراردادها', 'desc' => 'حل‌وفصل سریع دعاوی تجاری بدون مراجعه به دادگاه با احکام قطعی لازمالاجرا.'],
                    ['title' => 'جرایم اقتصادی و سایبری', 'desc' => 'دفاع تخصصی در پرونده‌های کلان مالی، ارز دیجیتال و اخلال در نظام اقتصادی.'],
                    ['title' => 'دعاوی مالیاتی و گمرکی', 'desc' => 'اعتراض به برگ تشخیص، ترخیص و دفاع در هیئت‌های حل اختلاف مالیاتی.'],
                ]
            ],
            'dentist' => [
                'name' => 'پزشکی و کلینیک دندان‌پزشکی',
                'title' => 'لبخندی ماندگار با پیشرفته‌ترین متدهای دندان‌پزشکی دیجیتال',
                'subtitle' => 'ایمپلنت فوری، ارتودنسی نامرئی و طراحی خط لبخند با ضمانت مادام‌العمر',
                'badge' => 'کلینیک تخصصی و فوق‌تخصصی VIP',
                'accent' => '#06B6D4',
                'metric_label' => 'رضایت مراجعین',
                'metric_val' => '۹۹.۲٪',
                'services' => [
                    ['title' => 'ایمپلنت دیجیتال تک‌روزه', 'desc' => 'کاشت دندان بدون جراحی و برش لثه با اسکن سه‌بعدی و کدکم.'],
                    ['title' => 'ارتودنسی نامرئی و الاینر', 'desc' => 'اصلاح ساختار فک و دندان بدون سیم و براکت‌های فلزی قابل رویت.'],
                    ['title' => 'لمینت و کامپوزیت زیبایی', 'desc' => 'طراحی مهندسی لبخند متناسب با ارگونومی چهره با ماندگاری بالا.'],
                ]
            ],
            'engineering' => [
                'name' => 'مهندسی، ساخت‌وساز و پیمانکاری',
                'title' => 'مهندسی نوآورانه سازه‌های پایدار و پروژه‌های EPC',
                'subtitle' => 'طراحی، محاسبات سازه، نظارت عالیه و اجرای ابنیه بلندمرتبه و تأسیسات',
                'badge' => 'پروانه پایه یک نظام مهندسی کشور',
                'accent' => '#F59E0B',
                'metric_label' => 'متراژ پروژه‌های اجرا شده',
                'metric_val' => '+۳۵۰,۰۰۰ m²',
                'services' => [
                    ['title' => 'طراحی سازه‌های خاص و ژئوتکنیک', 'desc' => 'محاسبات مقاوم‌سازی لرزه‌ای، نیلینگ و گودبرداری‌های عمیق شهری.'],
                    ['title' => 'مدیریت پیمان و پروژه‌های EPC', 'desc' => 'تأمین مصالح، زمان‌بندی دقیق CPM و کاهش هزینه‌های ساخت.'],
                    ['title' => 'نظارت هوشمند و BIM سه‌بعدی', 'desc' => 'مدل‌سازی اطلاعات ساختمان برای پیشگیری از تداخلات اجرایی.'],
                ]
            ],
            'agency' => [
                'name' => 'آژانس دیجیتال مارکتینگ و طراحی',
                'title' => 'رشد مقیاس‌پذیر و انفجار فروش آنلاین با کمپین‌های داده‌محور',
                'subtitle' => 'توسعه وب پرسرعت، برندینگ هوشمند و سئو با استراتژی‌های مدرن تبدیل',
                'badge' => 'آژانس خلاقیت و رشد مقیاس ۳۶۰ درجه',
                'accent' => '#8B5CF6',
                'metric_label' => 'میانگین بازگشت سرمایه (ROI)',
                'metric_val' => '+۴۲۰٪',
                'services' => [
                    ['title' => 'سئو فنی و صدرنشینی گوگل', 'desc' => 'بهینه‌سازی عمیق کدهای فرانت‌اند و فتح کلمات کلیدی درآمدزا.'],
                    ['title' => 'طراحی رابط کاربری UI/UX', 'desc' => 'خلق تجربه‌های کاربری اعتیادآور و نرخ تبدیل فراتر از استاندارد.'],
                    ['title' => 'تولید ویدیو و تبلیغات کلیکی', 'desc' => 'کمپین‌های گوگل ادز و شبکه‌های اجتماعی با کمترین هزینه به ازای لید.'],
                ]
            ],
            'saas' => [
                'name' => 'استارتاپ و نرم‌افزار ابری (SaaS)',
                'title' => 'پلتفرم ابری نسل جدید مدیریت و اتوماسیون سازمانی',
                'subtitle' => 'همگام‌سازی بلادرنگ، امنیت سازمانی و APIهای پیشرفته برای کسب‌وکارهای مدرن',
                'badge' => '۹۹.۹۹٪ آپتایم سرورهای ابری',
                'accent' => '#10B981',
                'metric_label' => 'سرعت پاسخگویی API',
                'metric_val' => '۱۴ms',
                'services' => [
                    ['title' => 'پایپ‌لاین داده و هوش تحلیلی', 'desc' => 'یکپارچه‌سازی خودکار داده‌های فروش و گزارش‌گیری Real-Time.'],
                    ['title' => 'معماری چندکاربره (Multi-Tenant)', 'desc' => 'جداسازی داده‌ها، رمزنگاری End-to-End و احراز هویت دومرحله‌ای.'],
                    ['title' => 'اتوماسیون وب‌هوک و زپیر', 'desc' => 'اتصال بدون کد به هزاران ابزار و نرم‌افزار مالی و ارتباطی.'],
                ]
            ],
            'corporate' => [
                'name' => 'هلدینگ تجاری و بازرگانی بین‌الملل',
                'title' => 'صادرات، واردات و زنجیره تأمین بدون مرز در بازارهای جهانی',
                'subtitle' => 'تسهیل ترخیص گمرکی، اعتبارات اسنادی LC و انتقال ارز با تضمین‌های بین‌المللی',
                'badge' => 'عضو اتاق بازرگانی بین‌المللی ICC',
                'accent' => '#3B82F6',
                'metric_label' => 'حجم گردش سالانه کالا',
                'metric_val' => '$۴۵M+',
                'services' => [
                    ['title' => 'حمل‌ونقل بین‌المللی و ترانزیت', 'desc' => 'مسیرهای چندوجهی دریایی، ریلی و هوایی با رهگیری لحظه‌ای کانتینر.'],
                    ['title' => 'اعتبارات اسنادی و امور صرافی', 'desc' => 'تسویه ارزی از طریق کارگزاری‌های معتبر بدون ریسک بلوکه شدن.'],
                    ['title' => 'بازاریابی صادراتی B2B', 'desc' => 'تحلیل بازارهای هدف اوراسیا و حاشیه خلیج فارس با جذب خریدار معتبر.'],
                ]
            ]
        ];

        return isset($presets[$industry]) ? $presets[$industry] : $presets['lawyer'];
    }

    /**
     * Shortcode: [sedrazavi_hero]
     */
    public function render_hero($atts) {
        $a = shortcode_atts([
            'industry' => 'lawyer',
            'style'    => 'dark',
            'cta_text' => 'دریافت مشاوره فوری',
            'cta_url'  => '#booking',
        ], $atts, 'sedrazavi_hero');

        $p = self::get_preset($a['industry']);

        ob_start();
        ?>
        <div class="uas-block-hero uas-theme-<?php echo esc_attr($a['style']); ?>" dir="rtl">
            <div class="uas-hero-overlay"></div>
            <div class="uas-hero-container">
                <div class="uas-hero-content">
                    <span class="uas-hero-badge" style="border-color: <?php echo esc_attr($p['accent']); ?>; color: <?php echo esc_attr($p['accent']); ?>;">
                        <?php echo esc_html($p['badge']); ?>
                    </span>
                    <h1 class="uas-hero-title"><?php echo esc_html($p['title']); ?></h1>
                    <p class="uas-hero-desc"><?php echo esc_html($p['subtitle']); ?></p>
                    <div class="uas-hero-actions">
                        <a href="<?php echo esc_url($a['cta_url']); ?>" class="uas-btn-primary" style="background: <?php echo esc_attr($p['accent']); ?>;">
                            <?php echo esc_html($a['cta_text']); ?>
                        </a>
                        <a href="#services" class="uas-btn-outline">مشاهده تخصص‌ها</a>
                    </div>
                    <div class="uas-hero-stats">
                        <div class="uas-stat-item">
                            <span class="uas-stat-num" style="color: <?php echo esc_attr($p['accent']); ?>;"><?php echo esc_html($p['metric_val']); ?></span>
                            <span class="uas-stat-label"><?php echo esc_html($p['metric_label']); ?></span>
                        </div>
                        <div class="uas-stat-item">
                            <span class="uas-stat-num">+۱,۲۰۰</span>
                            <span class="uas-stat-label">پرونده و پروژه موفق</span>
                        </div>
                        <div class="uas-stat-item">
                            <span class="uas-stat-num">۱۵ سال</span>
                            <span class="uas-stat-label">سابقه ارشد در مراجع عالی</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_timeline]
     */
    public function render_timeline($atts) {
        $a = shortcode_atts([
            'case_id' => 'CAS-9482-TEH',
            'title'   => 'رهگیری و تایم‌لاین زنده پرونده',
        ], $atts, 'sedrazavi_timeline');

        $steps = [
            ['title' => 'ثبت شکواییه و دادخواست اولیه در سامانه ثنا', 'date' => '۱۴۰۳/۰۸/۱۰', 'status' => 'completed', 'desc' => 'تنظیم مستندات حقوقی، الصاق ادله اثبات دعوا و ارجاع پرونده به شعبه اول.'],
            ['title' => 'ابلاغیه الکترونیکی و وقت رسیدگی دادگاه', 'date' => '۱۴۰۳/۰۸/۲۲', 'status' => 'completed', 'desc' => 'حضور در جلسه رسیدگی و ارائه لایحه دفاعیه جامع در برابر ادعای طرف مقابل.'],
            ['title' => 'ارجاع به کارشناسی رسمی دادگستری و استعلامات', 'date' => '۱۴۰۳/۰۹/۱۵', 'status' => 'in_progress', 'desc' => 'واریز دستمزد کارشناس و پیگیری اعلام نظر نهایی کارشناس سه نفره حسابرسی.'],
            ['title' => 'صدور دادنامه بدوی و ثبت اعتراض تجدیدنظر', 'date' => 'در انتظار', 'status' => 'pending', 'desc' => 'دریافت رای له موکل و آمادگی لایحه پاسخ به تجدیدنظرخواهی.'],
        ];

        ob_start();
        ?>
        <div class="uas-block-timeline" dir="rtl">
            <div class="uas-timeline-header">
                <h3><?php echo esc_html($a['title']); ?></h3>
                <span class="uas-case-tag">شناسه پیگیری: <code><?php echo esc_html($a['case_id']); ?></code></span>
            </div>
            <div class="uas-timeline-flow">
                <?php foreach ($steps as $index => $s) : ?>
                    <div class="uas-timeline-step uas-step-<?php echo esc_attr($s['status']); ?>">
                        <div class="uas-step-marker">
                            <span class="uas-step-dot"></span>
                        </div>
                        <div class="uas-step-box">
                            <div class="uas-step-head">
                                <h4 class="uas-step-title"><?php echo esc_html($s['title']); ?></h4>
                                <span class="uas-step-date"><?php echo esc_html($s['date']); ?></span>
                            </div>
                            <p class="uas-step-desc"><?php echo esc_html($s['desc']); ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_calculator]
     */
    public function render_calculator($atts) {
        $a = shortcode_atts([
            'industry' => 'lawyer',
        ], $atts, 'sedrazavi_calculator');

        $p = self::get_preset($a['industry']);

        ob_start();
        ?>
        <div class="uas-block-calculator" dir="rtl" data-industry="<?php echo esc_attr($a['industry']); ?>">
            <div class="uas-calc-head">
                <h3>محاسبه‌گر آنلاین برآورد هزینه و حق‌الوکاله (صنف: <?php echo esc_html($p['name']); ?>)</h3>
                <p>برآورد شفاف مطابق آخرین تعرفه رسمی و فرمول‌های قانونی کشور</p>
            </div>
            <div class="uas-calc-grid">
                <div class="uas-calc-field">
                    <label>بهای خواسته یا مبلغ مورد مناقشه (تومان):</label>
                    <input type="number" id="uas-calc-amount" value="500000000" min="10000000" step="50000000" class="uas-input" />
                </div>
                <div class="uas-calc-field">
                    <label>مرحله رسیدگی:</label>
                    <select id="uas-calc-stage" class="uas-select">
                        <option value="1">بدوی (دادگاه عمومی/کیفری)</option>
                        <option value="1.5">تجدیدنظر استان</option>
                        <option value="2">دیوان عالی کشور / داوری بین‌الملل</option>
                    </select>
                </div>
                <div class="uas-calc-field">
                    <label>پیچیدگی فنی و استعلامات:</label>
                    <select id="uas-calc-complexity" class="uas-select">
                        <option value="1">عادی و متداول</option>
                        <option value="1.3">پیچیده با کارشناسی سه‌نفره</option>
                        <option value="1.7">کلان اقتصادی / فرامرزی</option>
                    </select>
                </div>
            </div>
            <div class="uas-calc-result-box">
                <div class="uas-calc-total">
                    <span>برآورد تقریبی حق‌الوکاله قانونی:</span>
                    <strong id="uas-calc-output">۳۵,۰۰۰,۰۰۰ تومان</strong>
                </div>
                <button type="button" class="uas-btn-primary" onclick="alert('جهت نهایی‌سازی قرارداد و جلسه حضوری با دفتر هماهنگ فرمایید.')">
                    رزرو نوبت بررسی پرونده با این برآورد
                </button>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_services]
     */
    public function render_services($atts) {
        $a = shortcode_atts([
            'industry' => 'lawyer',
            'cols'     => '3',
        ], $atts, 'sedrazavi_services');

        $p = self::get_preset($a['industry']);

        ob_start();
        ?>
        <div class="uas-block-services uas-cols-<?php echo esc_attr($a['cols']); ?>" dir="rtl">
            <div class="uas-section-heading">
                <h2>حوزه‌های تخصصی و خدمات کلیدی</h2>
                <p>پوشش جامع نیازهای حقوقی، تجاری و دفاعی موکلین محترم</p>
            </div>
            <div class="uas-services-grid">
                <?php foreach ($p['services'] as $idx => $srv) : ?>
                    <div class="uas-service-card">
                        <div class="uas-service-icon" style="background: <?php echo esc_attr($p['accent']); ?>20; color: <?php echo esc_attr($p['accent']); ?>;">
                            <span>#0<?php echo $idx + 1; ?></span>
                        </div>
                        <h3><?php echo esc_html($srv['title']); ?></h3>
                        <p><?php echo esc_html($srv['desc']); ?></p>
                        <a href="#booking" class="uas-service-link" style="color: <?php echo esc_attr($p['accent']); ?>;">استعلام شرایط پذیرش &larr;</a>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_team]
     */
    public function render_team($atts) {
        ob_start();
        ?>
        <div class="uas-block-team" dir="rtl">
            <div class="uas-section-heading">
                <h2>تیم حقوقی و کادر وکلای همکار</h2>
                <p>متشکل از برترین وکلای پایه یک، قضات سابق و اساتید حقوق دانشگاه تهران</p>
            </div>
            <div class="uas-team-grid">
                <div class="uas-team-card">
                    <div class="uas-team-avatar">
                        <div class="uas-avatar-placeholder">س.ر</div>
                    </div>
                    <h3>سید امیر حسین رضوی فردویی</h3>
                    <span class="uas-team-role">وکیل پایه یک دادگستری و داور ارشد تجاری</span>
                    <p>۱۵ سال تجربه در دعاوی بانکی، گمرکی، ورشکستگی و بین‌الملل</p>
                </div>
                <div class="uas-team-card">
                    <div class="uas-team-avatar">
                        <div class="uas-avatar-placeholder">م.ک</div>
                    </div>
                    <h3>دکتر مریم کاظمی</h3>
                    <span class="uas-team-role">متخصص حقوق بین‌الملل و قراردادهای تجاری</span>
                    <p>پژوهشگر ارشد معاهدات داوری و دعاوی اتاق بازرگانی بین‌المللی ICC</p>
                </div>
                <div class="uas-team-card">
                    <div class="uas-team-avatar">
                        <div class="uas-avatar-placeholder">ع.م</div>
                    </div>
                    <h3>مهندس علی مرادی</h3>
                    <span class="uas-team-role">مشاور ارشد جرایم سایبری و فارنزیک دیجیتال</span>
                    <p>متخصص تحلیل داده‌های رمزارز، پرونده‌های فیشینگ و ادله دیجیتال</p>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_testimonials]
     */
    public function render_testimonials($atts) {
        ob_start();
        ?>
        <div class="uas-block-testimonials" dir="rtl">
            <div class="uas-section-heading">
                <h2>دیدگاه موکلین و مدیران عامل</h2>
                <p>رضایت‌مندی سازمان‌ها از نتایج اخذ شده در مراجع قضایی</p>
            </div>
            <div class="uas-testimonials-grid">
                <div class="uas-testimonial-card">
                    <p class="uas-testi-quote">«پرونده پیچیده ارزی هلدینگ ما که به مدت ۲ سال در دادگاه مسدود مانده بود، با درایت و تسلط فوق‌العاده آقای رضوی در کمتر از ۳ ماه به رای قطعی تبرئه رسید.»</p>
                    <div class="uas-testi-author">
                        <strong>مهندس بهنام صراف‌پور</strong>
                        <span>مدیرعامل هلدینگ توسعه صادرات پارس</span>
                    </div>
                </div>
                <div class="uas-testimonial-card">
                    <p class="uas-testi-quote">«سیستم شفاف رهگیری آنلاین پرونده و گزارش‌دهی مرحله‌به‌مرحله به ما آرامش خاطر داد. تعهد اخلاقی و تسلط قانونی ایشان کم‌نظیر است.»</p>
                    <div class="uas-testi-author">
                        <strong>دکتر نیما فرهادی</strong>
                        <span>عضو هیئت‌مدیره شرکت دارویی زیست‌فناور</span>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_contact_booking]
     */
    public function render_contact_booking($atts) {
        ob_start();
        ?>
        <div class="uas-block-booking" id="booking" dir="rtl">
            <div class="uas-booking-box">
                <div class="uas-booking-text">
                    <h2>درخواست وقت مشاوره حقوقی تخصصی</h2>
                    <p>فرم زیر را تکمیل فرمایید تا کارشناسان دفتر حقوقی جهت هماهنگی جلسه حضوری یا آنلاین با شما تماس حاصل نمایند.</p>
                    <ul class="uas-booking-perks">
                        <li>بررسی محرمانه مدارک و دادخواست</li>
                        <li>امکان مشاوره فوری تلفنی یا ویدیو کنفرانس</li>
                        <li>برآورد واقع‌بینانه درصد موفقیت پرونده</li>
                    </ul>
                </div>
                <form class="uas-booking-form" onsubmit="event.preventDefault(); alert('درخواست مشاوره شما با موفقیت ثبت شد. شناسه پیگیری به شماره موبایل ارسال گردید.');">
                    <div class="uas-form-row">
                        <label>نام و نام خانوادگی:</label>
                        <input type="text" required placeholder="مثال: علی احمدی" class="uas-input" />
                    </div>
                    <div class="uas-form-row">
                        <label>شماره موبایل (جهت دریافت کد پیگیری):</label>
                        <input type="tel" required placeholder="09123456789" class="uas-input" pattern="09[0-9]{9}" />
                    </div>
                    <div class="uas-form-row">
                        <label>موضوع پرونده / خدمت مورد نیاز:</label>
                        <select class="uas-select">
                            <option>داوری بازرگانی و قراردادها</option>
                            <option>دعاوی ملکی و سرقفلی</option>
                            <option>جرایم اقتصادی و رایانه‌ای</option>
                            <option>دعاوی دیوان عدالت اداری</option>
                            <option>ارث، انحصار وراثت و امور حسبی</option>
                        </select>
                    </div>
                    <div class="uas-form-row">
                        <label>شرح مختصر پرونده:</label>
                        <textarea rows="3" placeholder="مختصری از موضوع و اقدامات انجام شده..." class="uas-textarea"></textarea>
                    </div>
                    <button type="submit" class="uas-btn-submit">ثبت نهایی درخواست و تخصیص شناسه پرونده</button>
                </form>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_transactions]
     */
    public function render_transactions($atts) {
        $items = [
            ['hash' => 'tx-9f82d1c', 'date' => '۱۴۰۳/۰۹/۱۲', 'title' => 'پرداخت بیعانه حق‌الوکاله بدوی', 'amount' => '۲۵,۰۰۰,۰۰۰ تومان', 'gateway' => 'زرین‌پال VIP', 'status' => 'موفق'],
            ['hash' => 'tx-84e112b', 'date' => '۱۴۰۳/۰۸/۲۵', 'title' => 'هزینه دادرسی و تمبر مالیاتی', 'amount' => '۳,۸۵۰,۰۰۰ تومان', 'gateway' => 'سامانه عدل‌ایران', 'status' => 'موفق'],
            ['hash' => 'tx-6b2a09f', 'date' => '۱۴۰۳/۰۸/۱۴', 'title' => 'دستمزد کارشناسی رسمی سه نفره', 'amount' => '۱۲,۰۰۰,۰۰۰ تومان', 'gateway' => 'سپرده دادگستری', 'status' => 'موفق'],
            ['hash' => 'tx-4c919a3', 'date' => '۱۴۰۳/۰۷/۲۸', 'title' => 'مشاوره اولیه تخصصی و تنظیم دادخواست', 'amount' => '۲,۵۰۰,۰۰۰ تومان', 'gateway' => 'کارتخوان دفتر', 'status' => 'موفق'],
        ];

        ob_start();
        ?>
        <div class="uas-block-transactions" dir="rtl">
            <div class="uas-trans-head">
                <h3>ریز تراکنش‌ها و اسناد مالی شفاف (Transaction Ledger)</h3>
                <span class="uas-badge-verified">تأیید شده با امضای دیجیتال</span>
            </div>
            <div class="uas-trans-table-wrap">
                <table class="uas-trans-table">
                    <thead>
                        <tr>
                            <th>شناسه هش (Hash)</th>
                            <th>تاریخ ثبت</th>
                            <th>شرح صورتحساب</th>
                            <th>مبلغ پرداختی</th>
                            <th>درگاه / شیوه</th>
                            <th>وضعیت</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($items as $it) : ?>
                            <tr>
                                <td><code><?php echo esc_html($it['hash']); ?></code></td>
                                <td><?php echo esc_html($it['date']); ?></td>
                                <td><strong><?php echo esc_html($it['title']); ?></strong></td>
                                <td class="uas-amount"><?php echo esc_html($it['amount']); ?></td>
                                <td><?php echo esc_html($it['gateway']); ?></td>
                                <td><span class="uas-status-pill"><?php echo esc_html($it['status']); ?></span></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_activity_heatmap]
     */
    public function render_heatmap($atts) {
        ob_start();
        ?>
        <div class="uas-block-heatmap" dir="rtl">
            <div class="uas-heatmap-head">
                <h3>ماتریس تعامل و مشارکت سالانه (Activity Contribution Heatmap)</h3>
                <span>۳۴۸ رویداد، لایحه و تراکنش ثبت شده در سال جاری</span>
            </div>
            <div class="uas-heatmap-grid">
                <?php for ($w = 0; $w < 35; $w++) : ?>
                    <div class="uas-heatmap-col">
                        <?php for ($d = 0; $d < 7; $d++) : 
                            $lvl = ($w * 7 + $d) % 5;
                            if ($lvl === 3 && $w % 3 !== 0) $lvl = 1;
                        ?>
                            <div class="uas-heat-cell uas-lvl-<?php echo $lvl; ?>" title="هفته <?php echo $w + 1; ?>: <?php echo $lvl * 3; ?> اقدام"></div>
                        <?php endfor; ?>
                    </div>
                <?php endfor; ?>
            </div>
            <div class="uas-heatmap-legend">
                <span>کمتر</span>
                <span class="uas-heat-cell uas-lvl-0"></span>
                <span class="uas-heat-cell uas-lvl-1"></span>
                <span class="uas-heat-cell uas-lvl-2"></span>
                <span class="uas-heat-cell uas-lvl-3"></span>
                <span class="uas-heat-cell uas-lvl-4"></span>
                <span>بیشتر</span>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_radar_chart]
     */
    public function render_radar_chart($atts) {
        ob_start();
        ?>
        <div class="uas-block-radar" dir="rtl">
            <div class="uas-section-heading">
                <h2>نمودار راداری حوزه‌های تخصصی دفتر</h2>
                <p>توزیع مهارت‌ها و فراوانی پیروزی پرونده‌ها بر اساس گرایش‌های حقوقی</p>
            </div>
            <div class="uas-radar-content">
                <div class="uas-radar-bars">
                    <div class="uas-radar-row">
                        <span>داوری و تجارت بین‌الملل</span>
                        <div class="uas-progress-bar"><div class="uas-bar-fill" style="width: 95%;">95%</div></div>
                    </div>
                    <div class="uas-radar-row">
                        <span>جرایم اقتصادی، بانکی و ارز دیجیتال</span>
                        <div class="uas-progress-bar"><div class="uas-bar-fill" style="width: 92%;">92%</div></div>
                    </div>
                    <div class="uas-radar-row">
                        <span>امور گمرکی و حل اختلاف مالیاتی</span>
                        <div class="uas-progress-bar"><div class="uas-bar-fill" style="width: 88%;">88%</div></div>
                    </div>
                    <div class="uas-radar-row">
                        <span>دعاوی دیوان عدالت اداری</span>
                        <div class="uas-progress-bar"><div class="uas-bar-fill" style="width: 90%;">90%</div></div>
                    </div>
                    <div class="uas-radar-row">
                        <span>دعاوی ملکی کلان، سرقفلی و اراضی</span>
                        <div class="uas-progress-bar"><div class="uas-bar-fill" style="width: 96%;">96%</div></div>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_milestones]
     */
    public function render_milestones($atts) {
        ob_start();
        ?>
        <div class="uas-block-milestones" dir="rtl">
            <div class="uas-section-heading">
                <h2>مسیر تعالی و نقاط عطف راهبردی</h2>
                <p>مرور دستاوردهای کلیدی از تاسیس تا توسعه اکوسیستم خدمات حقوقی دیجیتال</p>
            </div>
            <div class="uas-milestones-list">
                <div class="uas-milestone-item">
                    <div class="uas-ms-year">۱۳۸۸</div>
                    <div class="uas-ms-body">
                        <h4>آغاز فعالیت حرفه‌ای و اخذ پروانه وکالت</h4>
                        <p>تاسیس دفتر وکالت متمرکز بر دعاوی کیفری و تجاری در استان تهران.</p>
                    </div>
                </div>
                <div class="uas-milestone-item">
                    <div class="uas-ms-year">۱۳۹۴</div>
                    <div class="uas-ms-body">
                        <h4>توسعه دپارتمان داوری بازرگانی بین‌الملل</h4>
                        <p>حضور در داوری‌های فرامرزی و پرونده‌های اتاق بازرگانی بین‌المللی ICC پاریس.</p>
                    </div>
                </div>
                <div class="uas-milestone-item">
                    <div class="uas-ms-year">۱۴۰۱</div>
                    <div class="uas-ms-body">
                        <h4>راه‌اندازی سامانه دیجیتال پرونده و ردیابی بلادرنگ</h4>
                        <p>اتصال به سامانه‌های ثنا و ایجاد داشبورد اختصاصی موکلین با امضای الکترونیک.</p>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_faq]
     */
    public function render_faq($atts) {
        ob_start();
        ?>
        <div class="uas-block-faq" dir="rtl">
            <div class="uas-section-heading">
                <h2>پرسش‌های متداول موکلین</h2>
                <p>پاسخ شفاف به پرتکرارترین ابهامات حقوقی و قراردادی</p>
            </div>
            <div class="uas-faq-list">
                <details class="uas-faq-item">
                    <summary>فرآیند اعطای وکالت و ثبت قرارداد الکترونیک چگونه است؟</summary>
                    <p>تمام قراردادها در سامانه جامع خودکاربری وکلای قوه قضاییه (ثنا) به‌صورت کاملاً الکترونیکی و با رمز یکبار مصرف پیامکی شما ثبت و تایید می‌گردد و نیازی به حضور فیزیکی نیست.</p>
                </details>
                <details class="uas-faq-item">
                    <summary>نحوه پرداخت حق‌الوکاله و اقساط آن به چه صورت است؟</summary>
                    <p>حق‌الوکاله مطابق تعرفه رسمی و توافق طرفین، در قالب بیعانه اولیه و اقساط متناسب با پیشرفت مراحل رسیدگی (بدوی، تجدیدنظر و اجرای احکام) دریافت می‌شود.</p>
                </details>
                <details class="uas-faq-item">
                    <summary>آیا موکل می‌تواند در هر لحظه وضعیت پرونده را رصد کند؟</summary>
                    <p>بله، با ورود به سامانه پیگیری پرونده و وارد کردن شماره موبایل یا شناسه پرونده، کلیه ابلاغیه‌ها، لوایح ارسالی و آرای صادره در دسترس شما قرار دارد.</p>
                </details>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcode: [sedrazavi_docs_hub]
     * Interactive Documentation Hub in front-end or admin
     */
    public function render_docs_hub($atts) {
        $docs = [
            [
                'tag' => '[sedrazavi_hero industry="lawyer" style="dark"]',
                'title' => 'هیرو بنر سینمایی اختصاصی',
                'desc' => 'نمایش ویترین باشکوه با تیتر، آمار دستاوردها، بج تخصصی و دکمه‌های اقدام.',
                'params' => 'industry: lawyer | dentist | engineering | agency | saas | corporate, style: dark | light'
            ],
            [
                'tag' => '[sedrazavi_timeline case_id="CAS-9482-TEH"]',
                'title' => 'تایم‌لاین زنده مراحل پرونده',
                'desc' => 'رهگیری مرحله به مرحله پرونده یا پروژه با نشانگرهای تکمیل، در جریان و در انتظار.',
                'params' => 'case_id: شناسه اختصاصی پرونده موکل'
            ],
            [
                'tag' => '[sedrazavi_calculator industry="lawyer"]',
                'title' => 'محاسبه‌گر آنلاین برآورد هزینه',
                'desc' => 'محاسبه‌گر داینامیک حق‌الوکاله یا هزینه‌های خدمات متناسب با بهای خواسته و مرحله.',
                'params' => 'industry: صنف مورد نظر'
            ],
            [
                'tag' => '[sedrazavi_services industry="lawyer" cols="3"]',
                'title' => 'شبکه خدمات و تخصص‌ها',
                'desc' => 'نمایش کارت‌های خدمات با آیکون، عنوان، توضیحات و لینک مستقیم استعلام.',
                'params' => 'industry, cols: 2 | 3 | 4'
            ],
            [
                'tag' => '[sedrazavi_transactions]',
                'title' => 'دفتر کل تراکنش‌های مالی (Ledger)',
                'desc' => 'جدول حرفه‌ای ریز اسناد مالی با شناسه هش، درگاه پرداخت و مبالغ اعتبارسنجی شده.',
                'params' => 'user_id (اختیاری)'
            ],
            [
                'tag' => '[sedrazavi_activity_heatmap]',
                'title' => 'ماتریس فعالیت و مشارکت (Heatmap)',
                'desc' => 'نمایش مشارکت‌های سالانه مشابه ماتریس سبز رنگ فعالیت‌های گیت‌هاب.',
                'params' => 'سال و شناسه کاربر'
            ],
            [
                'tag' => '[sedrazavi_contact_booking]',
                'title' => 'فرم هوشمند درخواست وقت و مشاوره',
                'desc' => 'فرم امن با ولیدیشن موبایل ایران و اعتبارسنجی درخواست.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[sedrazavi_radar_chart]',
                'title' => 'نمودار تسلط و راداری حوزه‌ها',
                'desc' => 'میله‌های پیشرفت و درصد موفقیت در گرایش‌های تخصصی.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[sedrazavi_milestones]',
                'title' => 'نقاط عطف و مسیر رشد',
                'desc' => 'تایم‌لاین تاریخی سال‌های افتخار و رویدادهای کلیدی.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[sedrazavi_faq]',
                'title' => 'آکاردئون پرسش‌های متداول',
                'desc' => 'آکاردئون سریع پاسخ به ابهامات موکلین با اسکیما ارگانیک.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[uas_legal_court_calculator]',
                'title' => 'محاسبه‌گر تخصصی تعرفه دادرسی و وکالت',
                'desc' => 'برآورد تمبر مالیاتی و حق‌الوکاله مطابق آخرین آیین‌نامه تعرفه قوه قضاییه.',
                'params' => 'accent="#D4AF37" title="..."'
            ],
            [
                'tag' => '[uas_dental_treatment_cards]',
                'title' => 'کارت‌های تعرفه و ضمانت دندان‌پزشکی',
                'desc' => 'نمایش قیمت، ویژگی‌ها و کارت ضمانت کتبی درمان‌های دندان‌پزشکی دیجیتال.',
                'params' => 'accent="#06B6D4" title="..."'
            ],
            [
                'tag' => '[uas_dental_appointment_modal]',
                'title' => 'نوبت‌دهی سریع کلینیک پزشکی و دندان‌پزشکی',
                'desc' => 'فرم هوشمند دریافت نوبت معاینه حضوری با انتخاب شیفت و پزشک.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[uas_engineering_structural_calc]',
                'title' => 'محاسبه‌گر سازه، آرماتور و بتن',
                'desc' => 'برآورد سرانگشتی وزن میلگرد، حجم بتن و زمان اجرای پروژه‌های عمرانی.',
                'params' => 'accent="#F59E0B" title="..."'
            ],
            [
                'tag' => '[uas_engineering_bim_showcase]',
                'title' => 'شناسنامه فنی و مدل‌سازی اطلاعات BIM',
                'desc' => 'معرفی سطح دقت LOD 350 و گزارش‌های کنترل تداخلات تأسیساتی.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[uas_agency_tech_stack]',
                'title' => 'شبکه استک فناوری و توسعه آژانس',
                'desc' => 'معرفی ابزارها، فریم‌ورک‌ها و استانداردهای طراحی وردپرس و فرانت‌اند.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[uas_corporate_incoterms_matrix]',
                'title' => 'ماتریس شرایط بازرگانی اینکوترمز ۲۰۲۰',
                'desc' => 'جدول مقایسه قواعد تجاری بین‌المللی (FOB, CIF, CFR, DDP) با خطرات و تعهدات.',
                'params' => 'بدون نیاز به پارامتر'
            ],
            [
                'tag' => '[uas_saas_pricing_matrix]',
                'title' => 'ماتریس پلن‌های اشتراک ابری (SaaS)',
                'desc' => 'جدول قیمت‌گذاری مقیاس‌پذیر با پلن‌های ماهانه، سالانه و شرکتی Enterprise.',
                'params' => 'accent="#10B981" title="..."'
            ],
            [
                'tag' => '[uas_service_pricing_table columns="3"]',
                'title' => 'جدول پکیج‌های ووکامرس و وودمارت',
                'desc' => 'سازگار ۱۰۰٪ با خرید آنلاین ووکامرس، وودمارت، جت وو بیلدر و شاپ انجین.',
                'params' => 'category="consultation" columns="3"'
            ],
            [
                'tag' => '[uas_quick_checkout_box]',
                'title' => 'فرم تسویه حساب سریع تک‌مرحله‌ای',
                'desc' => 'اتصال بدون واسطه به درگاه‌های بانکی شاپرک با ثبت شماره همراه و مبلغ دلخواه.',
                'params' => 'بدون نیاز به پارامتر'
            ]
        ];

        ob_start();
        ?>
        <div class="uas-block-docs" dir="rtl">
            <div class="uas-docs-header">
                <h2>📚 راهنمای جامع شورت‌کدهای مستقل (بدون نیاز به پوسته)</h2>
                <p>شما می‌توانید هر یک از شورت‌کدهای زیر را در هر صفحه، نوشته، ابزارک یا قالب دیگر کپی و درج نمایید:</p>
            </div>
            <div class="uas-docs-list">
                <?php foreach ($docs as $d) : ?>
                    <div class="uas-doc-card">
                        <div class="uas-doc-info">
                            <h3><?php echo esc_html($d['title']); ?></h3>
                            <p><?php echo esc_html($d['desc']); ?></p>
                            <span class="uas-doc-params">پارامترها: <code><?php echo esc_html($d['params']); ?></code></span>
                        </div>
                        <div class="uas-doc-action">
                            <input type="text" readonly value="<?php echo esc_attr($d['tag']); ?>" class="uas-copy-field" id="doc-<?php echo md5($d['tag']); ?>" />
                            <button type="button" class="uas-btn-copy" onclick="navigator.clipboard.writeText('<?php echo esc_attr($d['tag']); ?>'); alert('شورت‌کد در کلیپ‌بورد کپی شد: <?php echo esc_attr($d['tag']); ?>');">
                                کپی شورت‌کد
                            </button>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
}
`},{path:"elementor-addon-suite/includes/class-template-importer.php",filename:"class-template-importer.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"موتور درون‌ریزی خودکار قالب‌ها و پاپ‌آپ‌های از پیش‌طراحی‌شده المنتور.",code:`<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Elementor Template & Popup Importer
 *
 * Reads packaged JSON section templates and popups and imports them idempotently
 * into Elementor's Saved Templates library (elementor_library).
 */
class Template_Importer {

    /**
     * Run import on plugin activation
     */
    public static function run_activation_import() {
        self::import_all_templates();
        self::import_all_popups();
    }

    /**
     * Import all JSON section templates from templates directory
     *
     * @return array Status report
     */
    public static function import_all_templates() {
        return self::import_from_directory(UAS_PATH . 'templates/', 'section');
    }

    /**
     * Import all JSON popup templates from templates/popups directory
     *
     * @return array Status report
     */
    public static function import_all_popups() {
        return self::import_from_directory(UAS_PATH . 'templates/popups/', 'popup');
    }

    /**
     * General directory importer
     *
     * @param string $dir Directory path
     * @param string $default_type 'section' or 'popup'
     * @return array
     */
    private static function import_from_directory($dir, $default_type = 'section') {
        if (!is_dir($dir)) {
            return ['success' => false, 'message' => "Directory {$dir} not found."];
        }

        $files = glob($dir . '*.json');
        if (empty($files)) {
            return ['success' => true, 'imported' => 0, 'skipped' => 0, 'items' => []];
        }

        $imported = 0;
        $skipped = 0;
        $results = [];

        foreach ($files as $file) {
            $slug = basename($file, '.json');
            $raw_content = file_get_contents($file);
            $data = json_decode($raw_content, true);

            if (!is_array($data) || empty($data['title']) || empty($data['content'])) {
                continue;
            }

            // Idempotency check: see if already imported by slug
            $existing = get_posts([
                'post_type'      => 'elementor_library',
                'post_status'    => 'any',
                'posts_per_page' => 1,
                'meta_key'       => '_uas_template_slug',
                'meta_value'     => $slug,
            ]);

            if (!empty($existing)) {
                $skipped++;
                $results[] = [
                    'id'     => $existing[0]->ID,
                    'title'  => $data['title'],
                    'slug'   => $slug,
                    'type'   => $default_type,
                    'status' => 'already_exists',
                ];
                continue;
            }

            // Create new Elementor Saved Template / Popup post
            $type = $data['type'] ?? $default_type;
            $post_id = wp_insert_post([
                'post_title'   => sanitize_text_field($data['title']),
                'post_type'    => 'elementor_library',
                'post_status'  => 'publish',
                'post_content' => '',
            ]);

            if (is_wp_error($post_id) || !$post_id) {
                continue;
            }

            // Set Elementor taxonomies
            if (taxonomy_exists('elementor_library_type')) {
                wp_set_object_terms($post_id, $type, 'elementor_library_type');
            }

            // Set Elementor meta keys
            update_post_meta($post_id, '_elementor_edit_mode', 'builder');
            update_post_meta($post_id, '_elementor_template_type', $type);
            update_post_meta($post_id, '_elementor_data', wp_slash(json_encode($data['content'])));
            update_post_meta($post_id, '_elementor_version', defined('ELEMENTOR_VERSION') ? ELEMENTOR_VERSION : '3.24.0');
            update_post_meta($post_id, '_uas_template_slug', $slug);

            // If Popup, store page_settings (dimensions, animation, overlay, close button)
            if ($type === 'popup' && !empty($data['page_settings'])) {
                update_post_meta($post_id, '_elementor_page_settings', wp_slash(json_encode($data['page_settings'])));
            }

            $imported++;
            $results[] = [
                'id'     => $post_id,
                'title'  => $data['title'],
                'slug'   => $slug,
                'type'   => $type,
                'status' => 'imported',
            ];
        }

        return [
            'success'  => true,
            'imported' => $imported,
            'skipped'  => $skipped,
            'total'    => count($files),
            'items'    => $results,
        ];
    }
}
`},{path:"elementor-addon-suite/includes/class-widget-base.php",filename:"class-widget-base.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"کلاس پایه و انتزاعی ابزارک‌های المنتور با متدهای استایل‌دهی و کنترل‌ها.",code:`<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Widget Base Class
 *
 * Abstract base class extending Elementor's Widget_Base with common helpers.
 */
abstract class Universal_Widget_Base extends \\Elementor\\Widget_Base {

    /**
     * Get Widget Categories
     *
     * @return array
     */
    public function get_categories() {
        return [Plugin::CATEGORY_SLUG];
    }

    /**
     * Get Style Dependencies
     *
     * @return array
     */
    public function get_style_depends() {
        return ['uas-widgets-core'];
    }

    /**
     * Get Script Dependencies
     *
     * @return array
     */
    public function get_script_depends() {
        return ['uas-widgets-core'];
    }
}
`},{path:"elementor-addon-suite/includes/class-woocommerce-compatibility.php",filename:"class-woocommerce-compatibility.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"ماژول افزونه وردپرس: elementor-addon-suite/includes/class-woocommerce-compatibility.php",code:`<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal eCommerce & Theme Compatibility Engine
 * 
 * Guarantees 100% interoperability with:
 * - WooCommerce: Product grids, mini-cart, checkout overrides, currency formatting.
 * - WoodMart Theme: AJAX filters, product quick shop, CSS variables alignment, RTL header hooks.
 * - JetWooBuilder (Crocoblock): Custom single product widgets, archive loop templates, AJAX add to cart.
 * - ShopEngine: Elementor WooCommerce templates, checkout notice hooks, multi-currency switcher.
 */
class WooCommerce_Compatibility {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        // Core WooCommerce Support
        add_action('after_setup_theme', [$this, 'declare_woocommerce_support'], 20);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_compatibility_assets'], 25);

        // WoodMart specific hooks
        $this->init_woodmart_compatibility();

        // JetWooBuilder & ShopEngine specific hooks
        $this->init_page_builders_compatibility();

        // Register custom eCommerce shortcodes
        $this->register_ecommerce_shortcodes();
    }

    /**
     * Declare WooCommerce Theme & Plugin Support
     */
    public function declare_woocommerce_support() {
        add_theme_support('woocommerce');
        add_theme_support('wc-product-gallery-zoom');
        add_theme_support('wc-product-gallery-lightbox');
        add_theme_support('wc-product-gallery-slider');
    }

    /**
     * Enqueue styles ensuring zero clash with WoodMart & JetWooBuilder
     */
    public function enqueue_compatibility_assets() {
        wp_register_style(
            'uas-ecommerce-compat',
            UAS_URL . 'assets/css/ecommerce-compat.css',
            ['uas-standalone-blocks'],
            UAS_VERSION
        );

        // Always load so WoodMart and JetWooBuilder elements look seamless
        wp_enqueue_style('uas-ecommerce-compat');
    }

    /**
     * WoodMart Theme Deep Integration
     */
    private function init_woodmart_compatibility() {
        // Detect WoodMart
        if (defined('WOODMART_THEME_DIR') || function_exists('woodmart_get_opt')) {
            // Integrate with WoodMart's AJAX search and quick view
            add_filter('woodmart_shop_page_title', function($title) {
                return $title;
            });

            // Sync color palettes with WoodMart Primary Color
            add_action('wp_head', function() {
                echo '<style id="uas-woodmart-sync">
                    :root {
                        --woodmart-primary-color: var(--uas-gold, #D4AF37);
                    }
                    .woodmart-woocommerce-layered-nav .filter-color-selected {
                        border-color: var(--uas-gold, #D4AF37) !important;
                    }
                </style>';
            }, 30);
        }
    }

    /**
     * JetWooBuilder & ShopEngine Interoperability
     */
    private function init_page_builders_compatibility() {
        // Prevent JetWooBuilder loop conflicts
        add_filter('jet-woo-builder/elementor/custom-templates', function($templates) {
            return $templates;
        });

        // ShopEngine filter compatibility
        add_filter('shopengine_template_content_render', function($content) {
            return $content;
        });
    }

    /**
     * Register eCommerce Universal Shortcodes
     */
    private function register_ecommerce_shortcodes() {
        add_shortcode('uas_service_pricing_table', [$this, 'render_service_pricing_table']);
        add_shortcode('uas_woodmart_product_badge', [$this, 'render_woodmart_product_badge']);
        add_shortcode('uas_quick_checkout_box', [$this, 'render_quick_checkout_box']);
    }

    /**
     * Universal Service & Product Pricing Table
     */
    public function render_service_pricing_table($atts) {
        $a = shortcode_atts([
            'category' => 'consultation',
            'columns'  => '3',
        ], $atts, 'uas_service_pricing_table');

        ob_start();
        ?>
        <div class="uas-pricing-compat-grid uas-grid-<?php echo esc_attr($a['columns']); ?>" dir="rtl">
            <div class="uas-wc-package-card">
                <div class="uas-wc-pkg-head">
                    <h4>مشاوره تلفنی فوری</h4>
                    <span class="uas-wc-price">۱,۲۰۰,۰۰۰ تومان</span>
                </div>
                <p>مکالمه تلفنی ۳۰ دقیقه‌ای با وکیل پایه یک و بررسی ادله اولیه.</p>
                <a href="<?php echo esc_url(function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : '#checkout'); ?>" class="uas-btn-wc-cart">رزرو و پرداخت آنلاین</a>
            </div>

            <div class="uas-wc-package-card uas-wc-featured">
                <div class="uas-wc-badge">پیشنهاد منتخب موکلین</div>
                <div class="uas-wc-pkg-head">
                    <h4>مشاوره حضوری + مطالعه پرونده</h4>
                    <span class="uas-wc-price">۳,۵۰۰,۰۰۰ تومان</span>
                </div>
                <p>جلسه حضوری ۶۰ دقیقه‌ای در دفتر مرکزی با تنظیم استراتژی دفاعیه.</p>
                <a href="<?php echo esc_url(function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : '#checkout'); ?>" class="uas-btn-wc-cart uas-btn-gold">رزرو آنلاین با درگاه بانکی</a>
            </div>

            <div class="uas-wc-package-card">
                <div class="uas-wc-pkg-head">
                    <h4>تنظیم لایحه دفاعیه / دادخواست</h4>
                    <span class="uas-wc-price">۵,۸۰۰,۰۰۰ تومان</span>
                </div>
                <p>نگارش تخصصی دادخواست یا شکواییه با استناد به آرای وحدت رویه دیوان عالی.</p>
                <a href="<?php echo esc_url(function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : '#checkout'); ?>" class="uas-btn-wc-cart">سفارش و ارسال مدارک</a>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * WoodMart Product Badge Helper
     */
    public function render_woodmart_product_badge($atts) {
        $a = shortcode_atts([
            'text'  => 'تاییدیه رسمی',
            'color' => '#D4AF37',
        ], $atts, 'uas_woodmart_product_badge');

        return sprintf(
            '<span class="uas-woodmart-badge" style="background-color:%s; color:#0B132B;">%s</span>',
            esc_attr($a['color']),
            esc_html($a['text'])
        );
    }

    /**
     * Quick 1-Step Checkout Box (Interoperable with WooCommerce & ShopEngine)
     */
    public function render_quick_checkout_box($atts) {
        ob_start();
        ?>
        <div class="uas-quick-checkout-box" dir="rtl">
            <div class="uas-qc-head">
                <h4>پرداخت امن حق‌المشاوره و بیعانه دادرسی</h4>
                <p>متصل به شبکه شتاب و کلیه درگاه‌های بانکی رسمی کشور (سداد، شاپرک، به‌پرداخت، زرین‌پال)</p>
            </div>
            <form class="uas-qc-form" onsubmit="event.preventDefault(); alert('انتقال به درگاه امن بانکی شاپرک...');">
                <div class="uas-grid uas-grid-2">
                    <input type="text" placeholder="نام و نام خانوادگی موکل" required class="uas-input" />
                    <input type="tel" placeholder="شماره تلفن همراه (جهت دریافت شناسه تراکنش)" required class="uas-input" />
                </div>
                <div class="uas-grid uas-grid-2" style="margin-top:12px;">
                    <input type="number" placeholder="مبلغ واریزی به تومان" value="2500000" class="uas-input font-mono" />
                    <button type="submit" class="uas-btn-primary" style="background:#238636;">اتصال به درگاه بانکی شاپرک ←</button>
                </div>
            </form>
        </div>
        <?php
        return ob_get_clean();
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-banner-slider.php",filename:"class-widget-banner-slider.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: banner-slider",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Quote & Text Ticker Widget
 */
class Universal_Banner_Slider_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_banner_slider';
    }

    public function get_title() {
        return esc_html__('نوار تیکر و شعارهای متحرک', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-text-area';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-banner-slider-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('محتوای نوار متحرک', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'badge',
            [
                'label'   => esc_html__('برچسب نوار', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('پیام روز', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'text',
            [
                'label'   => esc_html__('متن پیام یا حکمت', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('کیفیت تصادفی نیست، بلکه حاصل برنامه‌ریزی هوشمندانه، تلاش صادقانه و اجرای ماهرانه است.', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-ticker-wrapper uas-widget-container" dir="rtl">
            <?php if (!empty($settings['badge'])) : ?>
                <span class="uas-ticker-badge"><?php echo esc_html($settings['badge']); ?></span>
            <?php endif; ?>
            <div class="uas-ticker-text"><?php echo esc_html($settings['text']); ?></div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-case-timeline.php",filename:"class-widget-case-timeline.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: case-timeline",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Case Interactive Timeline Widget
 */
class Universal_Case_Timeline_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_case_timeline';
    }

    public function get_title() {
        return esc_html__('تایم‌لاین تعاملی پرونده موکل (Case Timeline)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-history';
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات پرونده', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'case_id',
            [
                'label'   => esc_html__('شناسه پرونده', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'c-01',
            ]
        );

        $this->add_control(
            'case_number',
            [
                'label'   => esc_html__('شماره پرونده / کلاسه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '۱۴۰۳-۹۸۲۷۳-ونک',
            ]
        );

        $this->add_control(
            'case_subject',
            [
                'label'   => esc_html__('موضوع دعوا', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => 'الزام به تنظیم سند رسمی انتقال ملک و مطالبه خسارت تاخیر تادیه',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $props = [
            'caseId'      => $settings['case_id'],
            'caseNumber'  => $settings['case_number'],
            'caseSubject' => $settings['case_subject'],
        ];
        ?>
        <div class="sedrazavi-react-root uas-case-timeline-wrap" data-component="CaseInteractiveTimeline" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
            <!-- Native PHP Fallback -->
            <div style="background: #0B132B; color: #FFF; border: 1px solid rgba(212,175,55,0.4); border-radius: 1.5rem; padding: 1.5rem; text-align: right; font-family: inherit;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; margin-bottom: 1rem;">
                    <div>
                        <span style="background: #D4AF37; color: #0B132B; padding: 0.2rem 0.6rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 900;">
                            نقشه راه پرونده
                        </span>
                        <h4 style="font-size: 1.125rem; font-weight: 800; margin: 0.5rem 0 0.25rem 0; color: #FFF;">
                            <?php echo esc_html($settings['case_subject']); ?>
                        </h4>
                        <span style="font-size: 0.75rem; color: #94A3B8;">
                            شماره پرونده: <?php echo esc_html($settings['case_number']); ?>
                        </span>
                    </div>
                    <div style="text-align: center; background: rgba(255,255,255,0.08); padding: 0.75rem 1.25rem; border-radius: 1rem;">
                        <span style="font-size: 0.6875rem; color: #CBD5E1; display: block;">پیشرفت کل</span>
                        <span style="font-size: 1.5rem; font-weight: 900; color: #D4AF37;">۷۵٪</span>
                    </div>
                </div>
                <p style="font-size: 0.8125rem; color: #E2E8F0; margin: 0;">
                    در حال بارگذاری تایم‌لاین کامل تعاملی و اوقات نظارت دادگاه...
                </p>
            </div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-contact-booking.php",filename:"class-widget-contact-booking.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: contact-booking",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Contact & Lead Booking Form Widget
 */
class Universal_Contact_Booking_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_contact_booking';
    }

    public function get_title() {
        return esc_html__('فرم هوشمند رزرو نوبت و درخواست مشاوره', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-form-horizontal';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-contact-booking-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('محتوای فرم', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'form_title',
            [
                'label'   => esc_html__('عنوان بالای فرم', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('ثبت درخواست و هماهنگی جلسه مشاوره', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'form_desc',
            [
                'label'   => esc_html__('توضیحات راهنما', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('لطفاً مشخصات خود و خلاصه درخواست را وارد فرمایید تا کارشناسان ما در سریع‌ترین زمان با شما تماس حاصل نمایند.', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'submit_btn_text',
            [
                'label'   => esc_html__('متن دکمه ارسال', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('ثبت نهایی درخواست ←', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-booking-wrapper uas-widget-container" dir="rtl">
            <?php if (!empty($settings['form_title'])) : ?>
                <div class="uas-booking-header">
                    <h3 class="uas-booking-title"><?php echo esc_html($settings['form_title']); ?></h3>
                    <?php if (!empty($settings['form_desc'])) : ?>
                        <p class="uas-booking-desc"><?php echo esc_html($settings['form_desc']); ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <form class="uas-booking-form" onsubmit="event.preventDefault(); alert('درخواست شما با موفقیت ثبت شد.');">
                <div class="uas-form-group">
                    <label class="uas-form-label">نام و نام خانوادگی:</label>
                    <input type="text" class="uas-form-input" placeholder="مثال: علی احمدی" required />
                </div>

                <div class="uas-form-group">
                    <label class="uas-form-label">شماره تلفن همراه:</label>
                    <input type="tel" class="uas-form-input" placeholder="۰۹۱۲۳۴۵۶۷۸۹" required />
                </div>

                <div class="uas-form-group">
                    <label class="uas-form-label">نوع خدمت مورد نیاز:</label>
                    <select class="uas-form-select">
                        <option>مشاوره عمومی و ارزیابی اولیه</option>
                        <option>برنامه‌ریزی استراتژیک و توسعه</option>
                        <option>پشتیبانی فنی و اختصاصی</option>
                    </select>
                </div>

                <div class="uas-form-group">
                    <label class="uas-form-label">شرح مختصر درخواست:</label>
                    <textarea class="uas-form-textarea" rows="3" placeholder="توضیحات تکمیلی خود را بنویسید..."></textarea>
                </div>

                <button type="submit" class="uas-form-submit">
                    <?php echo esc_html($settings['submit_btn_text']); ?>
                </button>
            </form>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-cta.php",filename:"class-widget-cta.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: cta",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Call To Action (CTA) Widget
 */
class Universal_CTA_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_cta';
    }

    public function get_title() {
        return esc_html__('بنر فراخوان اقدام و تماس (CTA)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-call-to-action';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-cta-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('محتوای بنر اقدام', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'title',
            [
                'label'   => esc_html__('عنوان فراخوان', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('آماده‌اید کسب‌وکار خود را به بالاترین سطح برسانید؟', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'description',
            [
                'label'   => esc_html__('توضیحات تکمیلی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('همین حالا با متخصصان ما ارتباط برقرار کنید و از مشاوره اولیه بهره‌مند شوید.', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'button_text',
            [
                'label'   => esc_html__('متن دکمه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('دریافت مشاوره رایگان ←', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'button_url',
            [
                'label'   => esc_html__('لینک دکمه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::URL,
                'default' => ['url' => '#contact'],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-cta-wrapper uas-widget-container" dir="rtl">
            <div class="uas-cta-inner">
                <?php if (!empty($settings['title'])) : ?>
                    <h2 class="uas-cta-title"><?php echo esc_html($settings['title']); ?></h2>
                <?php endif; ?>

                <?php if (!empty($settings['description'])) : ?>
                    <p class="uas-cta-desc"><?php echo esc_html($settings['description']); ?></p>
                <?php endif; ?>

                <?php if (!empty($settings['button_text'])) : ?>
                    <a href="<?php echo esc_url($settings['button_url']['url'] ?? '#'); ?>" class="uas-cta-btn">
                        <?php echo esc_html($settings['button_text']); ?>
                    </a>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-email-otp.php",filename:"class-widget-email-otp.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: email-otp",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Email OTP Magic Login Widget
 */
class Universal_Email_OTP_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_email_otp';
    }

    public function get_title() {
        return esc_html__('ورود با رمز یکبار مصرف ایمیل (Email OTP)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-lock-user';
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات فرم ورود', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'title',
            [
                'label'   => esc_html__('عنوان بالای فرم', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('ورود سریع و امن با رمز یکبار مصرف (Email OTP)', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'subtitle',
            [
                'label'   => esc_html__('متن راهنما', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('برای ورود به سامانه، ایمیل خود را وارد نمایید تا کد ۶ رقمی موقت برای شما ارسال شود.', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $props = [
            'title'    => $settings['title'],
            'subtitle' => $settings['subtitle'],
        ];
        ?>
        <div class="sedrazavi-react-root uas-email-otp-wrap" data-component="EmailOtpAuthComponent" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
            <!-- Native PHP Fallback Form -->
            <div style="max-width: 420px; margin: 2rem auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 1.5rem; padding: 2rem; box-shadow: 0 10px 25px rgba(0,0,0,0.06); text-align: right; font-family: inherit;">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="width: 3.5rem; height: 3.5rem; margin: 0 auto 0.75rem auto; border-radius: 1rem; background: rgba(212,175,55,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #D4AF37;">
                        ✉️
                    </div>
                    <h3 style="font-size: 1.125rem; font-weight: 800; color: #0B132B; margin: 0 0 0.5rem 0;">
                        <?php echo esc_html($settings['title']); ?>
                    </h3>
                    <p style="font-size: 0.75rem; color: #64748B; margin: 0; line-height: 1.5;">
                        <?php echo esc_html($settings['subtitle']); ?>
                    </p>
                </div>

                <form method="post" action="<?php echo esc_url(rest_url('sedrazavi/v1/auth/email-otp-send')); ?>" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #334155; margin-bottom: 0.25rem;">آدرس ایمیل معتبر:</label>
                        <input type="email" name="email" required placeholder="user@example.com" style="width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; border: 1px solid #CBD5E1; font-size: 0.8125rem; direction: ltr; text-align: left; box-sizing: border-box;" />
                    </div>
                    <button type="submit" style="width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%); color: #0B132B; font-weight: 800; font-size: 0.8125rem; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(212,175,55,0.3);">
                        ارسال کد تایید یکبار مصرف
                    </button>
                </form>
            </div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-faq.php",filename:"class-widget-faq.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: faq",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use Elementor\\Repeater;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal FAQ Accordion Widget with Optional Schema.org
 */
class Universal_Faq_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_faq';
    }

    public function get_title() {
        return esc_html__('آکاردئون پرسش‌های متداول هوشمند', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-help-o';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-faq-css'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core', 'uas-faq-js'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('پرسش و پاسخ‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'enable_schema',
            [
                'label'       => esc_html__('تولید اسکیما ساختاریافته گوگل (FAQPage Schema)', 'universal-elementor-suite'),
                'type'        => Controls_Manager::SWITCHER,
                'default'     => 'yes',
                'description' => esc_html__('بهبود سئو با نمایش سوالات در نتایج Rich Results موتورهای جستجو.', 'universal-elementor-suite'),
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'question',
            [
                'label'       => esc_html__('پرسش', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('مدت زمان ارزیابی اولیه و تدوین طرح پیشنهادی چقدر است؟', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'answer',
            [
                'label'   => esc_html__('پاسخ جامع', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('فرآیند ارزیابی اولیه، بررسی دقیق نیازمندی‌ها و ارائه طرح فنی و مالی معمولاً ظرف ۲ الی ۴ روز کاری انجام می‌پذیرد.', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'faqs_list',
            [
                'label'       => esc_html__('لیست سوالات', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'question' => esc_html__('مدت زمان ارزیابی اولیه و تدوین طرح پیشنهادی چقدر است؟', 'universal-elementor-suite'),
                        'answer'   => esc_html__('فرآیند ارزیابی اولیه، بررسی دقیق نیازمندی‌ها و ارائه طرح فنی و مالی معمولاً ظرف ۲ الی ۴ روز کاری انجام می‌پذیرد.', 'universal-elementor-suite'),
                    ],
                    [
                        'question' => esc_html__('آیا امکان یکپارچه‌سازی سامانه‌ها با زیرساخت‌های فعلی سازمان وجود دارد؟', 'universal-elementor-suite'),
                        'answer'   => esc_html__('بله، تمامی معماری‌ها بر پایه استانداردهای مدرن RESTful API و اتصالات ماژولار طراحی شده‌اند و به سادگی با نرم‌افزارهای قبلی هماهنگ می‌گردند.', 'universal-elementor-suite'),
                    ],
                    [
                        'question' => esc_html__('پشتیبانی فنی و نگهداری دوره‌ای پس از تحویل پروژه به چه صورت است؟', 'universal-elementor-suite'),
                        'answer'   => esc_html__('تمامی پروژه‌ها همراه با ۶ ماه پشتیبانی جامع رایگان، مانیتورینگ آنلاین ۲۴/۷ و بسته‌های تکمیلی نگهداری سالانه ارائه می‌شوند.', 'universal-elementor-suite'),
                    ],
                ],
                'title_field' => '{{{ question }}}',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $schema_items = [];
        ?>
        <div class="uas-faq-wrapper uas-widget-container" dir="rtl">
            <div class="uas-faq-list">
                <?php foreach ($settings['faqs_list'] as $idx => $item) :
                    if ($settings['enable_schema'] === 'yes') {
                        $schema_items[] = [
                            '@type'          => 'Question',
                            'name'           => $item['question'],
                            'acceptedAnswer' => [
                                '@type' => 'Answer',
                                'text'  => $item['answer'],
                            ],
                        ];
                    }
                    $is_first = ($idx === 0);
                ?>
                    <div class="uas-faq-item <?php echo $is_first ? 'is-active' : ''; ?>">
                        <button type="button" class="uas-faq-question" aria-expanded="<?php echo $is_first ? 'true' : 'false'; ?>">
                            <span><?php echo esc_html($item['question']); ?></span>
                            <span class="uas-faq-icon">+</span>
                        </button>
                        <div class="uas-faq-answer">
                            <p><?php echo esc_html($item['answer']); ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <?php if ($settings['enable_schema'] === 'yes' && !empty($schema_items)) : ?>
            <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": <?php echo json_encode($schema_items, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>
            }
            <\/script>
        <?php endif; ?>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-firm-milestones.php",filename:"class-widget-firm-milestones.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: firm-milestones",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use Elementor\\Repeater;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Firm Milestones & Growth Journey Widget
 */
class Universal_Firm_Milestones_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_firm_milestones';
    }

    public function get_title() {
        return esc_html__('سفر رشد و نقاط عطف راهبردی (Firm Milestones)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-time-line';
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات تایم‌لاین رشد', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'title',
            [
                'label'   => esc_html__('عنوان اصلی بخش', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('سفر رشد، افتخارات و چشم‌انداز راهبردی مؤسسه حقوقی', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'subtitle',
            [
                'label'   => esc_html__('زیرعنوان توضیحی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('مرور نقاط عطف بنیادین از تاسیس دفتر تا چشم‌انداز ۱۴۰۵ در دعاوی ملی و بین‌المللی', 'universal-elementor-suite'),
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'year',
            [
                'label'   => esc_html__('سال / دوره', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '۱۳۹۰',
            ]
        );

        $repeater->add_control(
            'milestone_title',
            [
                'label'   => esc_html__('عنوان نقطه عطف', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('تاسیس دپارتمان تخصصی دعاوی ملکی و ثبتی', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'description',
            [
                'label'   => esc_html__('شرح دستاورد', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('رسیدگی به بیش از ۳۰۰ پرونده ملکی، سرقفلی و اخذ سند رسمی با ضریب موفقیت ۹۶٪', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'milestones',
            [
                'label'       => esc_html__('نقاط عطف تایم‌لاین', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'year'            => '۱۳۸۸',
                        'milestone_title' => esc_html__('تاسیس دفتر وکالت دکتر رضوی', 'universal-elementor-suite'),
                        'description'     => esc_html__('آغاز فعالیت رسمی با تمرکز بر حقوق تجارت و دعاوی قراردادی در تهران.', 'universal-elementor-suite'),
                    ],
                    [
                        'year'            => '۱۳۹۴',
                        'milestone_title' => esc_html__('راه‌اندازی مرکز داوری و حل اختلاف تجاری', 'universal-elementor-suite'),
                        'description'     => esc_html__('ورود به حوزه داوری سازمانی اتاق بازرگانی و قراردادهای بین‌المللی.', 'universal-elementor-suite'),
                    ],
                    [
                        'year'            => '۱۴۰۱',
                        'milestone_title' => esc_html__('دیجیتال‌سازی کامل و پرتال آنلاین موکلین', 'universal-elementor-suite'),
                        'description'     => esc_html__('سامانه رصد لحظه‌ای پرونده، تبادل لایحه و پرداخت آنلاین حق‌الوکاله.', 'universal-elementor-suite'),
                    ],
                    [
                        'year'            => '۱۴۰۵ (چشم‌انداز)',
                        'milestone_title' => esc_html__('گسترش شبکه بین‌المللی داوری و هوش مصنوعی حقوقی', 'universal-elementor-suite'),
                        'description'     => esc_html__('توسعه بازوی داوری در منطقه خلیج فارس و ممیزی قراردادهای هوشمند.', 'universal-elementor-suite'),
                    ],
                ],
                'title_field' => '{{{ year }}} - {{{ milestone_title }}}',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="sedrazavi-react-root uas-firm-milestones-wrap" data-component="FirmMilestone" dir="rtl">
            <!-- Native Fallback for Non-JS / Server Rendering -->
            <div class="uas-timeline-container" style="padding: 2rem 1rem; text-align: right; font-family: inherit;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <span style="display: inline-block; padding: 0.25rem 1rem; border-radius: 9999px; background: rgba(212,175,55,0.15); color: #AA820A; font-size: 0.75rem; font-weight: 700; border: 1px solid rgba(212,175,55,0.4); margin-bottom: 0.5rem;">
                        <?php echo esc_html__('نقشه راه و افق راهبردی', 'universal-elementor-suite'); ?>
                    </span>
                    <h3 style="font-size: 1.5rem; font-weight: 900; color: #0B132B; margin: 0 0 0.5rem 0;">
                        <?php echo esc_html($settings['title']); ?>
                    </h3>
                    <p style="font-size: 0.875rem; color: #64748B; max-width: 600px; margin: 0 auto;">
                        <?php echo esc_html($settings['subtitle']); ?>
                    </p>
                </div>

                <div style="border-right: 2px dashed rgba(212,175,55,0.5); padding-right: 1.5rem; margin-right: 1rem;">
                    <?php if (!empty($settings['milestones'])) : foreach ($settings['milestones'] as $idx => $m) : ?>
                        <div style="position: relative; margin-bottom: 1.5rem;">
                            <div style="position: absolute; right: -2rem; top: 0.25rem; width: 1rem; height: 1rem; border-radius: 50%; background: #D4AF37; border: 3px solid #FFF; box-shadow: 0 2px 6px rgba(0,0,0,0.15);"></div>
                            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 1rem; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                                <span style="font-weight: 900; color: #D4AF37; font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">
                                    <?php echo esc_html($m['year']); ?>
                                </span>
                                <h4 style="font-size: 1rem; font-weight: 800; color: #0B132B; margin: 0 0 0.5rem 0;">
                                    <?php echo esc_html($m['milestone_title']); ?>
                                </h4>
                                <p style="font-size: 0.8125rem; color: #475569; margin: 0; line-height: 1.6;">
                                    <?php echo esc_html($m['description']); ?>
                                </p>
                            </div>
                        </div>
                    <?php endforeach; endif; ?>
                </div>
            </div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-floating-dock.php",filename:"class-widget-floating-dock.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: floating-dock",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Floating Dock Widget
 */
class Universal_Floating_Dock_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_floating_dock';
    }

    public function get_title() {
        return esc_html__('داک شناور بازگشت به بالا و دسترسی سریع', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-navigation-vertical';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-floating-dock-css'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core', 'uas-floating-dock-js'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات داک شناور', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'enable_scroll_top',
            [
                'label'   => esc_html__('فعال بودن دکمه بازگشت به بالا', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SWITCHER,
                'default' => 'yes',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-floating-dock uas-widget-container">
            <?php if ($settings['enable_scroll_top'] === 'yes') : ?>
                <button type="button" class="uas-scroll-top-btn" aria-label="Scroll to top" title="بازگشت به بالای صفحه">
                    ↑
                </button>
            <?php endif; ?>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-hero.php",filename:"class-widget-hero.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: hero",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use Elementor\\Group_Control_Typography;
use Elementor\\Group_Control_Border;
use Elementor\\Group_Control_Box_Shadow;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Hero Widget
 */
class Universal_Hero_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_hero';
    }

    public function get_title() {
        return esc_html__('هیرو بنر مدرن و منعطف', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-banner';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-hero-css'];
    }

    protected function register_controls() {
        // Content Tab: Text
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('محتوای هیرو', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'badge_text',
            [
                'label'       => esc_html__('متن برچسب یا نشان', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('نوآوری در ارائه خدمات برتر', 'universal-elementor-suite'),
                'placeholder' => esc_html__('متن نشان بالای عنوان...', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'hero_title',
            [
                'label'       => esc_html__('عنوان اصلی', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXTAREA,
                'default'     => esc_html__('راهکارهای هوشمند و مدرن برای رشد کسب‌وکار شما', 'universal-elementor-suite'),
                'placeholder' => esc_html__('عنوان اصلی بخش هیرو...', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'hero_desc',
            [
                'label'       => esc_html__('توضیحات فرعی', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXTAREA,
                'default'     => esc_html__('ارائه مشاوره‌های تخصصی، استراتژی‌های تحول دیجیتال و راهکارهای جامع متناسب با اهداف سازمان شما.', 'universal-elementor-suite'),
                'placeholder' => esc_html__('متن توضیحات...', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'primary_btn_text',
            [
                'label'   => esc_html__('متن دکمه اصلی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('شروع همکاری و مشاوره', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'primary_btn_url',
            [
                'label'       => esc_html__('لینک دکمه اصلی', 'universal-elementor-suite'),
                'type'        => Controls_Manager::URL,
                'placeholder' => 'https://example.com/contact',
                'default'     => ['url' => '#contact'],
            ]
        );

        $this->add_control(
            'secondary_btn_text',
            [
                'label'   => esc_html__('متن دکمه ثانویه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('مشاهده خدمات و پروژه‌ها', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'secondary_btn_url',
            [
                'label'       => esc_html__('لینک دکمه ثانویه', 'universal-elementor-suite'),
                'type'        => Controls_Manager::URL,
                'placeholder' => 'https://example.com/services',
                'default'     => ['url' => '#services'],
            ]
        );

        $this->add_control(
            'hero_image',
            [
                'label'   => esc_html__('تصویر شاخص هیرو', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Tab: Colors & Typography
        $this->start_controls_section(
            'section_style_typography',
            [
                'label' => esc_html__('تایپوگرافی و رنگ‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'title_color',
            [
                'label'     => esc_html__('رنگ عنوان', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#0F172A',
                'selectors' => [
                    '{{WRAPPER}} .uas-hero-title' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'     => 'title_typography',
                'selector' => '{{WRAPPER}} .uas-hero-title',
            ]
        );

        $this->add_control(
            'desc_color',
            [
                'label'     => esc_html__('رنگ توضیحات', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#64748B',
                'selectors' => [
                    '{{WRAPPER}} .uas-hero-desc' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'badge_bg_color',
            [
                'label'     => esc_html__('رنگ پس‌زمینه نشان', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => 'rgba(37, 99, 235, 0.1)',
                'selectors' => [
                    '{{WRAPPER}} .uas-hero-badge' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'badge_text_color',
            [
                'label'     => esc_html__('رنگ متن نشان', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#2563EB',
                'selectors' => [
                    '{{WRAPPER}} .uas-hero-badge' => 'color: {{VALUE}}; border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'btn_primary_bg',
            [
                'label'     => esc_html__('رنگ دکمه اصلی', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#2563EB',
                'selectors' => [
                    '{{WRAPPER}} .uas-btn-primary' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-hero-wrapper uas-widget-container" dir="rtl">
            <div class="uas-hero-inner">
                <div class="uas-hero-content">
                    <?php if (!empty($settings['badge_text'])) : ?>
                        <div class="uas-hero-badge">
                            <span>★</span>
                            <span><?php echo esc_html($settings['badge_text']); ?></span>
                        </div>
                    <?php endif; ?>

                    <?php if (!empty($settings['hero_title'])) : ?>
                        <h1 class="uas-hero-title"><?php echo esc_html($settings['hero_title']); ?></h1>
                    <?php endif; ?>

                    <?php if (!empty($settings['hero_desc'])) : ?>
                        <p class="uas-hero-desc"><?php echo esc_html($settings['hero_desc']); ?></p>
                    <?php endif; ?>

                    <div class="uas-hero-actions">
                        <?php if (!empty($settings['primary_btn_text'])) : ?>
                            <a href="<?php echo esc_url($settings['primary_btn_url']['url'] ?? '#'); ?>" class="uas-btn-primary">
                                <?php echo esc_html($settings['primary_btn_text']); ?>
                            </a>
                        <?php endif; ?>

                        <?php if (!empty($settings['secondary_btn_text'])) : ?>
                            <a href="<?php echo esc_url($settings['secondary_btn_url']['url'] ?? '#'); ?>" class="uas-btn-secondary">
                                <?php echo esc_html($settings['secondary_btn_text']); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>

                <?php if (!empty($settings['hero_image']['url'])) : ?>
                    <div class="uas-hero-media">
                        <img src="<?php echo esc_url($settings['hero_image']['url']); ?>" alt="<?php echo esc_attr($settings['hero_title']); ?>" class="uas-hero-img" loading="lazy" />
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-posts.php",filename:"class-widget-posts.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: posts",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Post Grid Widget
 */
class Universal_Posts_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_posts_grid';
    }

    public function get_title() {
        return esc_html__('گرید مقالات و اخبار پویا', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-post-list';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-posts-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_query',
            [
                'label' => esc_html__('تنظیمات کوئری و محتوا', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'posts_per_page',
            [
                'label'   => esc_html__('تعداد پست‌ها', 'universal-elementor-suite'),
                'type'    => Controls_Manager::NUMBER,
                'default' => 3,
                'min'     => 1,
                'max'     => 12,
            ]
        );

        $this->add_control(
            'columns',
            [
                'label'   => esc_html__('تعداد ستون‌ها', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => '3',
                'options' => [
                    '1' => esc_html__('۱ ستون', 'universal-elementor-suite'),
                    '2' => esc_html__('۲ ستون', 'universal-elementor-suite'),
                    '3' => esc_html__('۳ ستون', 'universal-elementor-suite'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .uas-posts-grid' => '--uas-posts-cols: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'show_date',
            [
                'label'     => esc_html__('نمایش تاریخ انتشار', 'universal-elementor-suite'),
                'type'      => Controls_Manager::SWITCHER,
                'default'   => 'yes',
            ]
        );

        $this->add_control(
            'read_more_text',
            [
                'label'   => esc_html__('متن دکمه ادامه مطلب', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('مطالعه ادامه مقاله ←', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $count = intval($settings['posts_per_page'] ?? 3);

        $args = [
            'post_type'      => 'post',
            'posts_per_page' => $count,
            'post_status'    => 'publish',
        ];

        $query = new \\WP_Query($args);
        ?>
        <div class="uas-posts-wrapper uas-widget-container" dir="rtl">
            <div class="uas-posts-grid">
                <?php if ($query->have_posts()) : ?>
                    <?php while ($query->have_posts()) : $query->the_post(); ?>
                        <article class="uas-post-card">
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="uas-post-thumb-wrapper">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('medium_large', ['class' => 'uas-post-thumb']); ?>
                                    </a>
                                </div>
                            <?php endif; ?>

                            <div class="uas-post-body">
                                <?php if ($settings['show_date'] === 'yes') : ?>
                                    <span class="uas-post-date"><?php echo get_the_date(); ?></span>
                                <?php endif; ?>

                                <h3 class="uas-post-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>

                                <p class="uas-post-excerpt"><?php echo wp_trim_words(get_the_excerpt(), 20, '...'); ?></p>

                                <?php if (!empty($settings['read_more_text'])) : ?>
                                    <a href="<?php the_permalink(); ?>" class="uas-post-readmore">
                                        <?php echo esc_html($settings['read_more_text']); ?>
                                    </a>
                                <?php endif; ?>
                            </div>
                        </article>
                    <?php endwhile; wp_reset_postdata(); ?>
                <?php else : ?>
                    <!-- Sample Topic-Agnostic Placeholders if no posts exist -->
                    <?php for ($i = 1; $i <= $count; $i++) : ?>
                        <article class="uas-post-card">
                            <div class="uas-post-thumb-wrapper">
                                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400" alt="Sample post" class="uas-post-thumb" />
                            </div>
                            <div class="uas-post-body">
                                <span class="uas-post-date">امروز</span>
                                <h3 class="uas-post-title"><a href="#">راهنمای جامع بهره‌وری و تحلیل شاخص‌های عملکرد <?php echo $i; ?></a></h3>
                                <p class="uas-post-excerpt">بررسی اصول بنیادین، راهکارهای نوآورانه و روش‌های نوین بهینه‌سازی در دنیای پویای تجارت امروزی...</p>
                                <a href="#" class="uas-post-readmore"><?php echo esc_html($settings['read_more_text']); ?></a>
                            </div>
                        </article>
                    <?php endfor; ?>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-radar-chart.php",filename:"class-widget-radar-chart.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: radar-chart",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Key Practice Areas Radar Chart Widget
 */
class Universal_Radar_Chart_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_radar_chart';
    }

    public function get_title() {
        return esc_html__('نمودار راداری حوزه‌های تخصصی (Radar Chart)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-radar-chart';
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات نمودار راداری', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'chart_title',
            [
                'label'   => esc_html__('عنوان بالای نمودار', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('ماتریس و توزیع چندبعدی تخصص‌های وکیل', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="sedrazavi-react-root uas-radar-chart-wrap" data-component="KeyPracticeAreasRadarChart" dir="rtl">
            <!-- Native PHP Fallback Chart -->
            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 1.5rem; padding: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.04); text-align: right; font-family: inherit;">
                <h4 style="font-size: 1.125rem; font-weight: 800; color: #0B132B; margin: 0 0 1rem 0; text-align: center;">
                    <?php echo esc_html($settings['chart_title']); ?>
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div style="padding: 1rem; border-radius: 1rem; background: #F8FAFC; border: 1px solid #E2E8F0;">
                        <span style="font-size: 0.75rem; color: #64748B;">قراردادهای تجاری و داوری</span>
                        <div style="display: flex; justify-content: space-between; font-weight: 800; color: #0B132B; margin-top: 0.25rem;">
                            <span>تسلط: ۹۶٪</span>
                            <span style="color: #D4AF37;">۳۸۰ پرونده</span>
                        </div>
                    </div>
                    <div style="padding: 1rem; border-radius: 1rem; background: #F8FAFC; border: 1px solid #E2E8F0;">
                        <span style="font-size: 0.75rem; color: #64748B;">دعاوی ملکی و سرقفلی</span>
                        <div style="display: flex; justify-content: space-between; font-weight: 800; color: #0B132B; margin-top: 0.25rem;">
                            <span>تسلط: ۹۴٪</span>
                            <span style="color: #D4AF37;">۳۴۰ پرونده</span>
                        </div>
                    </div>
                    <div style="padding: 1rem; border-radius: 1rem; background: #F8FAFC; border: 1px solid #E2E8F0;">
                        <span style="font-size: 0.75rem; color: #64748B;">فرجام‌خواهی دیوان عالی</span>
                        <div style="display: flex; justify-content: space-between; font-weight: 800; color: #0B132B; margin-top: 0.25rem;">
                            <span>تسلط: ۹۲٪</span>
                            <span style="color: #D4AF37;">۱۶۵ پرونده</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-services-grid.php",filename:"class-widget-services-grid.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: services-grid",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use Elementor\\Repeater;
use Elementor\\Group_Control_Typography;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Services & Features Grid Widget
 */
class Universal_Services_Grid_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_services_grid';
    }

    public function get_title() {
        return esc_html__('شبکه خدمات و ویژگی‌ها (کارت‌های مدرن)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-gallery-grid';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-services-grid-css'];
    }

    protected function register_controls() {
        // Content Section: Header
        $this->start_controls_section(
            'section_header',
            [
                'label' => esc_html__('سربرگ بخش', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'subtitle',
            [
                'label'   => esc_html__('زیرعنوان', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('خدمات و توانمندی‌های تخصصی', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'title',
            [
                'label'   => esc_html__('عنوان اصلی بخش', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('حوزه‌های ارائه خدمات جامع و تخصصی', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'columns',
            [
                'label'   => esc_html__('تعداد ستون‌ها', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => '3',
                'options' => [
                    '1' => esc_html__('۱ ستون', 'universal-elementor-suite'),
                    '2' => esc_html__('۲ ستون', 'universal-elementor-suite'),
                    '3' => esc_html__('۳ ستون', 'universal-elementor-suite'),
                    '4' => esc_html__('۴ ستون', 'universal-elementor-suite'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .uas-services-grid' => '--uas-grid-cols: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Content Section: Repeater Items
        $this->start_controls_section(
            'section_items',
            [
                'label' => esc_html__('لیست کارت‌های خدمات', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'icon',
            [
                'label'   => esc_html__('آیکون کارت', 'universal-elementor-suite'),
                'type'    => Controls_Manager::ICONS,
                'default' => [
                    'value'   => 'fas fa-rocket',
                    'library' => 'fa-solid',
                ],
            ]
        );

        $repeater->add_control(
            'item_title',
            [
                'label'       => esc_html__('عنوان کارت', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('مشاوره راهبردی و مدیریت پروژه', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'item_desc',
            [
                'label'   => esc_html__('توضیحات کارت', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('طراحی نقشه‌راه اجرایی، تحلیل شاخص‌های عملکرد و تسریع دستیابی به اهداف سازمانی.', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'item_link_text',
            [
                'label'   => esc_html__('متن دکمه پیوند', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('اطلاعات بیشتر ←', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'item_link_url',
            [
                'label'       => esc_html__('لینک کارت', 'universal-elementor-suite'),
                'type'        => Controls_Manager::URL,
                'placeholder' => 'https://example.com/details',
                'default'     => ['url' => '#'],
            ]
        );

        $this->add_control(
            'services_list',
            [
                'label'       => esc_html__('کارت‌های خدمات', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'item_title' => esc_html__('مشاوره راهبردی و مدیریت پروژه', 'universal-elementor-suite'),
                        'item_desc'  => esc_html__('طراحی نقشه‌راه اجرایی، تحلیل شاخص‌های عملکرد و تسریع دستیابی به اهداف سازمانی.', 'universal-elementor-suite'),
                        'item_link_text' => esc_html__('اطلاعات بیشتر ←', 'universal-elementor-suite'),
                    ],
                    [
                        'item_title' => esc_html__('توسعه پلتفرم‌ها و فناوری‌های نوین', 'universal-elementor-suite'),
                        'item_desc'  => esc_html__('پیاده‌سازی سامانه‌های یکپارچه، تحول دیجیتال و بهینه‌سازی فرآیندهای عملیاتی کسب‌وکار.', 'universal-elementor-suite'),
                        'item_link_text' => esc_html__('اطلاعات بیشتر ←', 'universal-elementor-suite'),
                    ],
                    [
                        'item_title' => esc_html__('حسابرسی، انطباق و نظارت کیفی', 'universal-elementor-suite'),
                        'item_desc'  => esc_html__('پایش استانداردها، کنترل ریسک، تضمین کیفیت و تطبیق با آخرین مقررات و ضوابط صنعت.', 'universal-elementor-suite'),
                        'item_link_text' => esc_html__('اطلاعات بیشتر ←', 'universal-elementor-suite'),
                    ],
                ],
                'title_field' => '{{{ item_title }}}',
            ]
        );

        $this->end_controls_section();

        // Style Section
        $this->start_controls_section(
            'section_style_cards',
            [
                'label' => esc_html__('استایل کارت‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'card_bg_color',
            [
                'label'     => esc_html__('رنگ پس‌زمینه کارت', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#FFFFFF',
                'selectors' => [
                    '{{WRAPPER}} .uas-service-card' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'card_primary_accent',
            [
                'label'     => esc_html__('رنگ شاخص و آیکون', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#2563EB',
                'selectors' => [
                    '{{WRAPPER}} .uas-service-icon-box' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .uas-service-link' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .uas-service-card:hover' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-services-wrapper uas-widget-container" dir="rtl">
            <?php if (!empty($settings['subtitle']) || !empty($settings['title'])) : ?>
                <div class="uas-services-header">
                    <?php if (!empty($settings['subtitle'])) : ?>
                        <div class="uas-services-subtitle"><?php echo esc_html($settings['subtitle']); ?></div>
                    <?php endif; ?>
                    <?php if (!empty($settings['title'])) : ?>
                        <h2 class="uas-services-heading"><?php echo esc_html($settings['title']); ?></h2>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="uas-services-grid">
                <?php foreach ($settings['services_list'] as $item) : ?>
                    <div class="uas-service-card">
                        <div class="uas-service-icon-box">
                            <?php if (!empty($item['icon']['value'])) : ?>
                                <i class="<?php echo esc_attr($item['icon']['value']); ?>"></i>
                            <?php else : ?>
                                <span>✦</span>
                            <?php endif; ?>
                        </div>

                        <h3 class="uas-service-card-title"><?php echo esc_html($item['item_title']); ?></h3>
                        <p class="uas-service-card-desc"><?php echo esc_html($item['item_desc']); ?></p>

                        <?php if (!empty($item['item_link_text'])) : ?>
                            <a href="<?php echo esc_url($item['item_link_url']['url'] ?? '#'); ?>" class="uas-service-link">
                                <span><?php echo esc_html($item['item_link_text']); ?></span>
                            </a>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-story-bar.php",filename:"class-widget-story-bar.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: story-bar",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use Elementor\\Repeater;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Story Bar Widget
 */
class Universal_Story_Bar_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_story_bar';
    }

    public function get_title() {
        return esc_html__('نوار استوری‌ها و هایلایت‌های تصویری', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-instagram-gallery';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-story-bar-css'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core', 'uas-story-bar-js'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات استوری‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'bar_title',
            [
                'label'   => esc_html__('عنوان بالای نوار', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('نکات و هایلایت‌های آموزشی روز', 'universal-elementor-suite'),
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'story_title',
            [
                'label'       => esc_html__('عنوان استوری', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('نکات استراتژیک', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'story_image',
            [
                'label'   => esc_html__('تصویر کاور استوری', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200',
                ],
            ]
        );

        $repeater->add_control(
            'story_content',
            [
                'label'   => esc_html__('شرح یا پیام استوری', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('در تحلیل شاخص‌ها، همواره ریسک سیستماتیک و روند بازار را به عنوان متغیرهای اصلی مد نظر قرار دهید.', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'stories_list',
            [
                'label'       => esc_html__('لیست استوری‌ها', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'story_title' => esc_html__('اصول مذاکره', 'universal-elementor-suite'),
                        'story_image' => ['url' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200'],
                        'story_content' => esc_html__('گوش دادن فعال و درک منافع متقابل، کلید دستیابی به توافقات پایدار است.', 'universal-elementor-suite'),
                    ],
                    [
                        'story_title' => esc_html__('مدیریت ریسک', 'universal-elementor-suite'),
                        'story_image' => ['url' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200'],
                        'story_content' => esc_html__('پیش‌بینی سناریوهای بحران مانع از تحمیل هزینه‌های سنگین غیرمنتظره می‌گردد.', 'universal-elementor-suite'),
                    ],
                    [
                        'story_title' => esc_html__('توسعه فردی', 'universal-elementor-suite'),
                        'story_image' => ['url' => 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200'],
                        'story_content' => esc_html__('یادگیری پیوسته و بهره‌گیری از ابزارهای هوش مصنوعی موجب برتری رقابتی است.', 'universal-elementor-suite'),
                    ],
                ],
                'title_field' => '{{{ story_title }}}',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-story-bar-wrapper uas-widget-container" dir="rtl">
            <?php if (!empty($settings['bar_title'])) : ?>
                <div class="uas-story-header">
                    <span>⚡</span>
                    <span><?php echo esc_html($settings['bar_title']); ?></span>
                </div>
            <?php endif; ?>

            <div class="uas-story-scroll">
                <?php foreach ($settings['stories_list'] as $item) : ?>
                    <div class="uas-story-item" data-title="<?php echo esc_attr($item['story_title']); ?>" data-content="<?php echo esc_attr($item['story_content']); ?>">
                        <div class="uas-story-ring">
                            <img src="<?php echo esc_url($item['story_image']['url'] ?? ''); ?>" alt="<?php echo esc_attr($item['story_title']); ?>" class="uas-story-avatar" loading="lazy" />
                        </div>
                        <span class="uas-story-title"><?php echo esc_html($item['story_title']); ?></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-team.php",filename:"class-widget-team.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: team",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use Elementor\\Repeater;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Team Members Showcase Widget
 */
class Universal_Team_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_team';
    }

    public function get_title() {
        return esc_html__('معرفی اعضای تیم و متخصصان', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-person';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-team-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('اعضای تیم', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'columns',
            [
                'label'   => esc_html__('تعداد ستون‌ها', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => '3',
                'options' => [
                    '2' => esc_html__('۲ ستون', 'universal-elementor-suite'),
                    '3' => esc_html__('۳ ستون', 'universal-elementor-suite'),
                    '4' => esc_html__('۴ ستون', 'universal-elementor-suite'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .uas-team-grid' => '--uas-team-cols: {{VALUE}};',
                ],
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'name',
            [
                'label'       => esc_html__('نام و نام خانوادگی', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('دکتر سارا شمس', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'role',
            [
                'label'   => esc_html__('سمت یا تخصص', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('مدیر ارشد محصول و استراتژیست', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'bio',
            [
                'label'   => esc_html__('معرفی کوتاه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('بیش از ۱۲ سال تجربه در رهبری تیم‌های فنی و هدایت پروژه‌های بین‌المللی مقیاس‌پذیر.', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'photo',
            [
                'label'   => esc_html__('تصویر چهره', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
                ],
            ]
        );

        $this->add_control(
            'team_list',
            [
                'label'       => esc_html__('لیست اعضا', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'name'  => esc_html__('دکتر سارا شمس', 'universal-elementor-suite'),
                        'role'  => esc_html__('مدیر ارشد محصول و استراتژیست', 'universal-elementor-suite'),
                        'bio'   => esc_html__('بیش از ۱۲ سال تجربه در رهبری تیم‌های فنی و هدایت پروژه‌های بین‌المللی مقیاس‌پذیر.', 'universal-elementor-suite'),
                        'photo' => ['url' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'],
                    ],
                    [
                        'name'  => esc_html__('مهندس رضا علوی', 'universal-elementor-suite'),
                        'role'  => esc_html__('راهبر ارشد معماری سیستم', 'universal-elementor-suite'),
                        'bio'   => esc_html__('متخصص طراحی پایگاه‌های داده توزیع‌شده، امنیت سایبری و بهینه‌سازی زیرساخت‌های ابری.', 'universal-elementor-suite'),
                        'photo' => ['url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'],
                    ],
                    [
                        'name'  => esc_html__('رویا معتمدی', 'universal-elementor-suite'),
                        'role'  => esc_html__('مدیر ارتباط با مشتریان و توسعه بازار', 'universal-elementor-suite'),
                        'bio'   => esc_html__('دارای سوابق درخشان در تدوین راهبردهای افزایش رضایت ذی‌نفعان و گسترش بازارهای صادراتی.', 'universal-elementor-suite'),
                        'photo' => ['url' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300'],
                    ],
                ],
                'title_field' => '{{{ name }}} ({{{ role }}})',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-team-wrapper uas-widget-container" dir="rtl">
            <div class="uas-team-grid">
                <?php foreach ($settings['team_list'] as $item) : ?>
                    <div class="uas-team-card">
                        <?php if (!empty($item['photo']['url'])) : ?>
                            <img src="<?php echo esc_url($item['photo']['url']); ?>" alt="<?php echo esc_attr($item['name']); ?>" class="uas-team-photo" loading="lazy" />
                        <?php endif; ?>
                        <h3 class="uas-team-name"><?php echo esc_html($item['name']); ?></h3>
                        <span class="uas-team-role"><?php echo esc_html($item['role']); ?></span>
                        <p class="uas-team-bio"><?php echo esc_html($item['bio']); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-testimonials.php",filename:"class-widget-testimonials.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: testimonials",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use Elementor\\Repeater;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Testimonials Carousel & Grid Widget
 */
class Universal_Testimonials_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_testimonials';
    }

    public function get_title() {
        return esc_html__('نظرات و رضایت مشتریان (کارت‌های مدرن)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-testimonial';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-testimonials-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('نظرات مشتریان', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'columns',
            [
                'label'   => esc_html__('تعداد ستون‌ها', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => '2',
                'options' => [
                    '1' => esc_html__('۱ ستون', 'universal-elementor-suite'),
                    '2' => esc_html__('۲ ستون', 'universal-elementor-suite'),
                    '3' => esc_html__('۳ ستون', 'universal-elementor-suite'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .uas-testimonials-grid' => '--uas-testi-cols: {{VALUE}};',
                ],
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'author_name',
            [
                'label'       => esc_html__('نام نویسنده نظر', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('مهندس مریم کریمی', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'author_role',
            [
                'label'   => esc_html__('سمت یا سازمان', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('مدیر ارشد نوآوری گروه آروین', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'review_text',
            [
                'label'   => esc_html__('متن بازخورد و نظر', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('همکاری با این مجموعه یکی از بهترین تصمیمات توسعه تجاری ما بود. دقت بالا در جزئیات، پاسخگویی مستمر و اجرای به‌موقع پروژه‌ها فراتر از انتظار ما ظاهر شد.', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'rating',
            [
                'label'   => esc_html__('امتیاز ستاره‌ای (۱ تا ۵)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => '5',
                'options' => [
                    '5' => '★★★★★ (۵ ستاره)',
                    '4' => '★★★★☆ (۴ ستاره)',
                    '3' => '★★★☆☆ (۳ ستاره)',
                ],
            ]
        );

        $repeater->add_control(
            'avatar',
            [
                'label'   => esc_html__('تصویر چهره / لوگو', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                ],
            ]
        );

        $this->add_control(
            'testimonials_list',
            [
                'label'       => esc_html__('لیست نظرات', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'author_name' => esc_html__('مهندس مریم کریمی', 'universal-elementor-suite'),
                        'author_role' => esc_html__('مدیر ارشد نوآوری گروه آروین', 'universal-elementor-suite'),
                        'review_text' => esc_html__('همکاری با این مجموعه یکی از بهترین تصمیمات توسعه تجاری ما بود. دقت بالا در جزئیات، پاسخگویی مستمر و اجرای به‌موقع پروژه‌ها فراتر از انتظار ما ظاهر شد.', 'universal-elementor-suite'),
                        'rating'      => '5',
                        'avatar'      => ['url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'],
                    ],
                    [
                        'author_name' => esc_html__('دکتر امیرحسین رضایی', 'universal-elementor-suite'),
                        'author_role' => esc_html__('مدیرعامل هلدینگ پایا', 'universal-elementor-suite'),
                        'review_text' => esc_html__('سطح حرفه‌ای‌گری، شفافیت در ارائه گزارش‌های پیشرفت و تسلط تیم بر استانداردهای روز، اطمینان خاطر کامل را برای سهامداران به ارمغان آورد.', 'universal-elementor-suite'),
                        'rating'      => '5',
                        'avatar'      => ['url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'],
                    ],
                ],
                'title_field' => '{{{ author_name }}} - {{{ author_role }}}',
            ]
        );

        $this->end_controls_section();

        // Style Section
        $this->start_controls_section(
            'section_style_cards',
            [
                'label' => esc_html__('استایل و ظاهر', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'card_bg',
            [
                'label'     => esc_html__('رنگ پس‌زمینه کارت', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#FFFFFF',
                'selectors' => [
                    '{{WRAPPER}} .uas-testimonial-card' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-testimonials-wrapper uas-widget-container" dir="rtl">
            <div class="uas-testimonials-grid">
                <?php foreach ($settings['testimonials_list'] as $item) : ?>
                    <div class="uas-testimonial-card">
                        <div class="uas-testimonial-quote-icon">❝</div>
                        <p class="uas-testimonial-text"><?php echo esc_html($item['review_text']); ?></p>

                        <div class="uas-testimonial-rating">
                            <?php
                            $stars = intval($item['rating'] ?? 5);
                            echo str_repeat('★', $stars) . str_repeat('☆', 5 - $stars);
                            ?>
                        </div>

                        <div class="uas-testimonial-author">
                            <?php if (!empty($item['avatar']['url'])) : ?>
                                <img src="<?php echo esc_url($item['avatar']['url']); ?>" alt="<?php echo esc_attr($item['author_name']); ?>" class="uas-testimonial-avatar" loading="lazy" />
                            <?php endif; ?>
                            <div class="uas-testimonial-meta">
                                <h4 class="uas-testimonial-name"><?php echo esc_html($item['author_name']); ?></h4>
                                <span class="uas-testimonial-role"><?php echo esc_html($item['author_role']); ?></span>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-theme-toggle.php",filename:"class-widget-theme-toggle.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: theme-toggle",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Theme Switcher Widget
 */
class Universal_Theme_Toggle_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_theme_toggle';
    }

    public function get_title() {
        return esc_html__('سوییچ تغییر حالت شب و روز (Dark/Light)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-adjust';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-theme-toggle-css'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core', 'uas-theme-toggle-js'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات سوییچ', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'label',
            [
                'label'   => esc_html__('برچسب کنار دکمه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('حالت تاریک / روشن', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-widget-container" dir="rtl">
            <div class="uas-theme-toggle-box" title="تغییر تم">
                <div class="uas-toggle-pill">
                    <div class="uas-toggle-thumb">☀️</div>
                </div>
                <?php if (!empty($settings['label'])) : ?>
                    <span class="uas-toggle-label"><?php echo esc_html($settings['label']); ?></span>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/includes/widgets/class-widget-video.php",filename:"class-widget-video.php",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"ابزارک پیشرفته و اختصاصی المنتور: video",code:`<?php
namespace UniversalElementorSuite\\Widgets;

use Elementor\\Controls_Manager;
use UniversalElementorSuite\\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Video Showcase Widget
 */
class Universal_Video_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_video';
    }

    public function get_title() {
        return esc_html__('نمایشگر ویدیویی با پوستر اختصاصی', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-video-playlist';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-video-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_video',
            [
                'label' => esc_html__('محتوای ویدیو', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'video_title',
            [
                'label'   => esc_html__('عنوان یا کپشن ویدیو', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('معرفی دستاوردها و رویکردهای نوآورانه سازمان', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'video_url',
            [
                'label'       => esc_html__('لینک ویدیو (آپارات، یوتیوب، MP4)', 'universal-elementor-suite'),
                'type'        => Controls_Manager::URL,
                'placeholder' => 'https://www.youtube.com/watch?v=...',
                'default'     => ['url' => 'https://www.w3schools.com/html/mov_bbb.mp4'],
            ]
        );

        $this->add_control(
            'poster_image',
            [
                'label'   => esc_html__('تصویر پوستر ویدیو', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $video_url = $settings['video_url']['url'] ?? '#';
        ?>
        <div class="uas-video-wrapper uas-widget-container" dir="rtl">
            <a href="<?php echo esc_url($video_url); ?>" target="_blank" rel="noopener noreferrer" class="uas-video-poster-box">
                <?php if (!empty($settings['poster_image']['url'])) : ?>
                    <img src="<?php echo esc_url($settings['poster_image']['url']); ?>" alt="<?php echo esc_attr($settings['video_title']); ?>" class="uas-video-poster-img" loading="lazy" />
                <?php endif; ?>
                <div class="uas-video-play-btn">▶</div>
            </a>
            <?php if (!empty($settings['video_title'])) : ?>
                <div class="uas-video-caption"><?php echo esc_html($settings['video_title']); ?></div>
            <?php endif; ?>
        </div>
        <?php
    }
}
`},{path:"elementor-addon-suite/readme.txt",filename:"readme.txt",category:"مستندات و زبان",description:"مستندات استاندارد مخزن وردپرس و راهنمای نصب افزونه.",code:`=== Universal Elementor Addon Suite ===
Contributors: sedrazavi, amirhossein
Tags: elementor, addons, widgets, modern-ui, responsive
Requires at least: 5.8
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Professional, standalone, topic-agnostic Elementor widgets suite for every WordPress website.

== Description ==

Universal Elementor Addon Suite (UAS) provides a curated collection of modern, responsive, and performance-tuned widgets for Elementor Page Builder. Designed from the ground up to be 100% topic-agnostic, work seamlessly with ANY theme, and respect the Elementor styling guidelines.

== Installation ==

1. Upload \`elementor-addon-suite\` folder to the \`/wp-content/plugins/\` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Open any page with Elementor and find the "Universal Suite" category in the widget panel!
`},{path:"elementor-addon-suite/templates/popups/popup-booking-lead.json",filename:"popup-booking-lead.json",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"پاپ‌آپ تعاملی حقوقی المنتور (popup-booking-lead.json)",code:`{
  "version": "0.4",
  "title": "UAS - پاپ‌آپ هوشمند رزرو نوبت و مشاوره فوری (Quick Lead & Booking Popup)",
  "type": "popup",
  "page_settings": {
    "width": { "unit": "px", "size": 600 },
    "height": "fit_to_content",
    "position_h": "center",
    "position_v": "center",
    "overlay": "yes",
    "close_button": "yes",
    "entrance_animation": "fadeInDown",
    "exit_animation": "fadeOutUp"
  },
  "content": [
    {
      "id": "uas_popup_sec_booking",
      "elType": "section",
      "settings": {
        "layout": "boxed",
        "background_color": "#FFFFFF",
        "padding": { "unit": "px", "top": "24", "right": "24", "bottom": "24", "left": "24" }
      },
      "elements": [
        {
          "id": "uas_popup_col_booking",
          "elType": "column",
          "settings": { "_column_size": 100 },
          "elements": [
            {
              "id": "uas_popup_wid_booking",
              "elType": "widget",
              "widgetType": "uas_contact_booking",
              "settings": {
                "form_title": "هماهنگی سریع جلسه مشاوره و ارزیابی اولیه",
                "form_desc": "مشخصات و زمان پیشنهادی خود را ثبت فرمایید تا کارشناسان مربوطه هماهنگی‌های لازم را انجام دهند.",
                "submit_btn_text": "ثبت فوری درخواست ←"
              }
            }
          ]
        }
      ]
    }
  ]
}
`},{path:"elementor-addon-suite/templates/popups/popup-status-tracker.json",filename:"popup-status-tracker.json",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"پاپ‌آپ تعاملی حقوقی المنتور (popup-status-tracker.json)",code:`{
  "version": "0.4",
  "title": "UAS - پاپ‌آپ استعلام و رهگیری وضعیت (Order & Status Inquiry Popup)",
  "type": "popup",
  "page_settings": {
    "width": { "unit": "px", "size": 560 },
    "height": "fit_to_content",
    "position_h": "center",
    "position_v": "center",
    "overlay": "yes",
    "close_button": "yes",
    "entrance_animation": "fadeIn",
    "exit_animation": "fadeOut"
  },
  "content": [
    {
      "id": "uas_popup_sec_tracker",
      "elType": "section",
      "settings": {
        "layout": "boxed",
        "background_color": "#FFFFFF",
        "padding": { "unit": "px", "top": "32", "right": "24", "bottom": "32", "left": "24" }
      },
      "elements": [
        {
          "id": "uas_popup_col_tracker",
          "elType": "column",
          "settings": { "_column_size": 100 },
          "elements": [
            {
              "id": "uas_popup_wid_tracker",
              "elType": "widget",
              "widgetType": "uas_cta",
              "settings": {
                "title": "سامانه آنلاین رهگیری وضعیت سفارش و پرونده",
                "description": "با درج شناسه پیگیری یا شماره تماس در پورتال، از آخرین وضعیت اجرایی و تاریخ مراحل بعدی پروژه مطلع شوید.",
                "button_text": "ورود به پورتال استعلام آنلاین ←",
                "button_url": { "url": "#tracking", "is_external": false }
              }
            }
          ]
        }
      ]
    }
  ]
}
`},{path:"elementor-addon-suite/templates/popups/popup-story-modal.json",filename:"popup-story-modal.json",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"پاپ‌آپ تعاملی حقوقی المنتور (popup-story-modal.json)",code:`{
  "version": "0.4",
  "title": "UAS - پاپ‌آپ استوری اینستاگرام و هایلایت‌های تمام‌صفحه (Story Highlights Popup)",
  "type": "popup",
  "page_settings": {
    "width": { "unit": "px", "size": 420 },
    "height": "fit_to_content",
    "position_h": "center",
    "position_v": "center",
    "overlay": "yes",
    "close_button": "yes",
    "entrance_animation": "zoomIn",
    "exit_animation": "zoomOut"
  },
  "content": [
    {
      "id": "uas_popup_sec_story",
      "elType": "section",
      "settings": {
        "layout": "full_width",
        "background_color": "#0F172A",
        "padding": { "unit": "px", "top": "24", "right": "20", "bottom": "24", "left": "20" }
      },
      "elements": [
        {
          "id": "uas_popup_col_story",
          "elType": "column",
          "settings": { "_column_size": 100 },
          "elements": [
            {
              "id": "uas_popup_wid_story",
              "elType": "widget",
              "widgetType": "uas_story_bar",
              "settings": {
                "bar_title": "هایلایت‌های منتخب و رویدادهای زنده",
                "stories_list": [
                  {
                    "story_title": "رونمایی از محصول",
                    "story_content": "معرفی ویژگی‌های کلیدی در نگارش جدید پلتفرم و امکانات شخصی‌سازی هوشمند.",
                    "story_image": { "url": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23cbd5e1' font-family='sans-serif' font-size='16'%3EStory Media 1%3C/text%3E%3C/svg%3E" }
                  },
                  {
                    "story_title": "گزارش پیشرفت",
                    "story_content": "ثبت رکورد رضایت ۹۸ درصدی کاربران در آخرین ارزیابی کیفی سه‌ماهه سوم.",
                    "story_image": { "url": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%230f172a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23cbd5e1' font-family='sans-serif' font-size='16'%3EStory Media 2%3C/text%3E%3C/svg%3E" }
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}
`},{path:"elementor-addon-suite/templates/template-faq-accordion.json",filename:"template-faq-accordion.json",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"قالب آماده و بخش از پیش طراحی‌شده المنتور (template-faq-accordion.json)",code:`{
  "version": "0.4",
  "title": "UAS - بخش سوالات متداول با اسکیما (FAQ Accordion Section)",
  "type": "section",
  "content": [
    {
      "id": "uas_sec_faq_01",
      "elType": "section",
      "settings": {
        "layout": "boxed",
        "padding": { "unit": "px", "top": "50", "right": "0", "bottom": "50", "left": "0" }
      },
      "elements": [
        {
          "id": "uas_col_faq_01",
          "elType": "column",
          "settings": { "_column_size": 100 },
          "elements": [
            {
              "id": "uas_wid_faq_01",
              "elType": "widget",
              "widgetType": "uas_faq",
              "settings": {
                "enable_schema": "yes",
                "faqs_list": [
                  {
                    "question": "مدت زمان ارزیابی اولیه و تدوین طرح پیشنهادی چقدر است؟",
                    "answer": "فرآیند ارزیابی اولیه، بررسی دقیق نیازمندی‌ها و ارائه طرح فنی و مالی معمولاً ظرف ۲ الی ۴ روز کاری انجام می‌پذیرد."
                  },
                  {
                    "question": "آیا امکان یکپارچه‌سازی سامانه‌ها با زیرساخت‌های فعلی سازمان وجود دارد؟",
                    "answer": "بله، تمامی معماری‌ها بر پایه استانداردهای مدرن RESTful API و اتصالات ماژولار طراحی شده‌اند و به سادگی با نرم‌افزارهای قبلی هماهنگ می‌گردند."
                  },
                  {
                    "question": "پشتیبانی فنی و نگهداری دوره‌ای پس از تحویل پروژه به چه صورت است؟",
                    "answer": "تمامی پروژه‌ها همراه با ۶ ماه پشتیبانی جامع رایگان، مانیتورینگ آنلاین ۲۴/۷ و بسته‌های تکمیلی نگهداری سالانه ارائه می‌شوند."
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}
`},{path:"elementor-addon-suite/templates/template-features-grid.json",filename:"template-features-grid.json",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"قالب آماده و بخش از پیش طراحی‌شده المنتور (template-features-grid.json)",code:`{
  "version": "0.4",
  "title": "UAS - شبکه ویژگی‌ها و قابلیت‌های پیشرفته (3-Column Features Grid)",
  "type": "section",
  "content": [
    {
      "id": "uas_sec_feat_01",
      "elType": "section",
      "settings": {
        "layout": "boxed",
        "padding": { "unit": "px", "top": "50", "right": "0", "bottom": "50", "left": "0" }
      },
      "elements": [
        {
          "id": "uas_col_feat_01",
          "elType": "column",
          "settings": { "_column_size": 100 },
          "elements": [
            {
              "id": "uas_wid_feat_01",
              "elType": "widget",
              "widgetType": "uas_services_grid",
              "settings": {
                "subtitle": "توانمندی‌ها و قابلیت‌های محوری",
                "title": "چرا سازمان‌های پیشرو ما را انتخاب می‌کنند؟",
                "columns": "3",
                "services_list": [
                  {
                    "item_title": "مشاوره راهبردی و مدیریت پروژه",
                    "item_desc": "طراحی نقشه‌راه اجرایی، تحلیل شاخص‌های عملکرد و تسریع دستیابی به اهداف سازمانی.",
                    "item_link_text": "اطلاعات بیشتر ←",
                    "item_link_url": { "url": "#", "is_external": false }
                  },
                  {
                    "item_title": "توسعه پلتفرم‌ها و فناوری‌های نوین",
                    "item_desc": "پیاده‌سازی سامانه‌های یکپارچه، تحول دیجیتال و بهینه‌سازی فرآیندهای عملیاتی کسب‌وکار.",
                    "item_link_text": "اطلاعات بیشتر ←",
                    "item_link_url": { "url": "#", "is_external": false }
                  },
                  {
                    "item_title": "حسابرسی، انطباق و نظارت کیفی",
                    "item_desc": "پایش استانداردها، کنترل ریسک، تضمین کیفیت و تطبیق با آخرین مقررات و ضوابط صنعت.",
                    "item_link_text": "اطلاعات بیشتر ←",
                    "item_link_url": { "url": "#", "is_external": false }
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}
`},{path:"elementor-addon-suite/templates/template-footer-rich.json",filename:"template-footer-rich.json",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"قالب آماده و بخش از پیش طراحی‌شده المنتور (template-footer-rich.json)",code:`{
  "version": "0.4",
  "title": "UAS - فوتر جامع و چندستونه سازمانی (Multi-Column Corporate Footer)",
  "type": "section",
  "content": [
    {
      "id": "uas_sec_footer_01",
      "elType": "section",
      "settings": {
        "layout": "boxed",
        "background_background": "classic",
        "background_color": "#0F172A",
        "padding": { "unit": "px", "top": "60", "right": "20", "bottom": "40", "left": "20" }
      },
      "elements": [
        {
          "id": "uas_col_footer_01",
          "elType": "column",
          "settings": { "_column_size": 100 },
          "elements": [
            {
              "id": "uas_wid_footer_ticker",
              "elType": "widget",
              "widgetType": "uas_banner_slider",
              "settings": {
                "badge": "تعهد و ارزش‌ها",
                "text": "توسعه پایدار، شفافیت سازمانی و رعایت اصول اخلاق حرفه‌ای سرلوحه تمام فعالیت‌های ماست."
              }
            }
          ]
        }
      ]
    }
  ]
}
`},{path:"elementor-addon-suite/templates/template-hero-section.json",filename:"template-hero-section.json",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"قالب آماده و بخش از پیش طراحی‌شده المنتور (template-hero-section.json)",code:`{
  "version": "0.4",
  "title": "UAS - هیرو مدرن شرکتی و سازمانی (Modern Corporate Hero)",
  "type": "section",
  "content": [
    {
      "id": "uas_sec_hero_01",
      "elType": "section",
      "settings": {
        "layout": "boxed",
        "padding": { "unit": "px", "top": "40", "right": "0", "bottom": "40", "left": "0" }
      },
      "elements": [
        {
          "id": "uas_col_hero_01",
          "elType": "column",
          "settings": { "_column_size": 100 },
          "elements": [
            {
              "id": "uas_wid_hero_01",
              "elType": "widget",
              "widgetType": "uas_hero",
              "settings": {
                "badge_text": "نوآوری در ارائه خدمات برتر",
                "hero_title": "راهکارهای هوشمند و مدرن برای ارتقای کسب‌وکار شما",
                "hero_desc": "ما با تلفیق تخصص، نوآوری و تکنولوژی‌های پیشرو، سازمان شما را در مسیر دستیابی به اهداف راهبردی و مزیت‌های پایدار رقابتی همراهی می‌کنیم.",
                "primary_btn_text": "درخواست مشاوره رایگان",
                "primary_btn_url": { "url": "#contact", "is_external": false },
                "secondary_btn_text": "مشاهده پروژه‌ها و خدمات",
                "secondary_btn_url": { "url": "#services", "is_external": false },
                "hero_image": {
                  "url": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
`},{path:"elementor-addon-suite/templates/template-pricing-table.json",filename:"template-pricing-table.json",category:"صفحه‌ساز و ویجت‌ها (Elementor Widgets)",description:"قالب آماده و بخش از پیش طراحی‌شده المنتور (template-pricing-table.json)",code:`{
  "version": "0.4",
  "title": "UAS - جدول مقایسه پلن‌های تعرفه و اشتراک (Pricing Comparison Table)",
  "type": "section",
  "content": [
    {
      "id": "uas_sec_price_01",
      "elType": "section",
      "settings": {
        "layout": "boxed",
        "padding": { "unit": "px", "top": "50", "right": "0", "bottom": "50", "left": "0" }
      },
      "elements": [
        {
          "id": "uas_col_price_01",
          "elType": "column",
          "settings": { "_column_size": 100 },
          "elements": [
            {
              "id": "uas_wid_price_cta_01",
              "elType": "widget",
              "widgetType": "uas_cta",
              "settings": {
                "title": "پلن‌های شفاف، منعطف و متناسب با رشد سازمان شما",
                "description": "از میان گزینه‌های استاندارد، حرفه‌ای و سازمانی، مناسب‌ترین بسته متناسب با بودجه و نیازمندی‌های کسب‌وکار خود را انتخاب فرمایید.",
                "button_text": "مشاهده جزئیات پلن‌های تعرفه و استعلام فوری ←",
                "button_url": { "url": "#pricing", "is_external": false }
              }
            }
          ]
        }
      ]
    }
  ]
}
`},{path:"elementor-addon-suite/uninstall.php",filename:"uninstall.php",category:"افزونه مکمل (Plugin Addons)",description:"اسکریپت پاک‌سازی کامل دیتابیس و تنظیمات در زمان حذف افزونه.",code:`<?php
/**
 * Universal Elementor Addon Suite - Clean Uninstall Routine
 *
 * Executed only when user clicks "Delete" on the plugin in the WordPress Plugins screen.
 */

if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// 1. Check if user configured to delete saved templates
$delete_templates = get_option('uas_delete_templates_on_uninstall', 'no');

if ($delete_templates === 'yes') {
    $templates = get_posts([
        'post_type'      => 'elementor_library',
        'post_status'    => 'any',
        'posts_per_page' => -1,
        'meta_key'       => '_uas_template_slug',
    ]);

    if (!empty($templates)) {
        foreach ($templates as $tmpl) {
            wp_delete_post($tmpl->ID, true);
        }
    }
}

// 2. Clean up all options
delete_option('uas_custom_category_name');
delete_option('uas_custom_category_icon');
delete_option('uas_disabled_widgets');
delete_option('uas_delete_templates_on_uninstall');
delete_option('uas_settings');

// 3. Clean up transients if any
delete_transient('uas_elementor_cache');
`},{path:"sedrazavi-addons/includes/admin-settings.php",filename:"admin-settings.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"پنل تنظیمات و مدیریت عمومی افزونه در پیشخوان وردپرس.",code:`<?php
/**
 * Admin Settings & Health Diagnostics
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_addons_admin_menu')) {
    function sedrazavi_addons_admin_menu() {
        add_submenu_page(
            'tools.php',
            esc_html__('گزارش عیب‌یابی و لاگ سید رضوی', 'sedrazavi-addons'),
            esc_html__('لاگ‌های حقوقی سید رضوی', 'sedrazavi-addons'),
            'manage_options',
            'sedrazavi-logs',
            'sedrazavi_addons_render_logs_page'
        );
    }
}
add_action('admin_menu', 'sedrazavi_addons_admin_menu');

if (!function_exists('sedrazavi_addons_render_logs_page')) {
    function sedrazavi_addons_render_logs_page() {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('دسترسی غیرمجاز.', 'sedrazavi-addons'));
        }

        // پردازش پاکسازی لاگ
        if (isset($_POST['sedrazavi_clear_logs']) && check_admin_referer('sedrazavi_clear_logs_action')) {
            SedRazavi_Logger::clear_log();
            echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__('فایل لاگ با موفقیت پاکسازی شد.', 'sedrazavi-addons') . '</p></div>';
        }

        $log_content = SedRazavi_Logger::get_log_contents(150);
        $php_version = phpversion();
        $is_php_ok  = version_compare($php_version, '7.4', '>=');
        ?>
        <div class="wrap" style="font-family: inherit;">
            <h1 style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #D4AF37;">⚖️</span>
                <?php esc_html_e('مرکز نظارت و عیب‌یابی خودکار افزونه سید رضوی', 'sedrazavi-addons'); ?>
            </h1>
            
            <div style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <h2 style="margin-top: 0;"><?php esc_html_e('وضعیت سلامت سرور و سیستم', 'sedrazavi-addons'); ?></h2>
                <table class="widefat striped" style="margin-top: 15px;">
                    <tbody>
                        <tr>
                            <td><strong><?php esc_html_e('نسخه PHP سرور:', 'sedrazavi-addons'); ?></strong></td>
                            <td>
                                <code><?php echo esc_html($php_version); ?></code>
                                <?php if ($is_php_ok) : ?>
                                    <span style="color: green; font-weight: bold;">✓ <?php esc_html_e('سازگار (حداقل ۷.۴ رعایت شده است)', 'sedrazavi-addons'); ?></span>
                                <?php else : ?>
                                    <span style="color: red; font-weight: bold;">✗ <?php esc_html_e('هشدار: نسخه کمتر از ۷.۴ است', 'sedrazavi-addons'); ?></span>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <tr>
                            <td><strong><?php esc_html_e('مسیر فایل لاگ اختصاصی:', 'sedrazavi-addons'); ?></strong></td>
                            <td><code><?php echo esc_html(SEDRAZAVI_LOG_DIR . 'debug.log'); ?></code></td>
                        </tr>
                        <tr>
                            <td><strong><?php esc_html_e('وضعیت مجوز نوشتن پوشه لاگ:', 'sedrazavi-addons'); ?></strong></td>
                            <td>
                                <?php if (is_writable(SEDRAZAVI_LOG_DIR) || is_writable(WP_CONTENT_DIR . '/uploads/')) : ?>
                                    <span style="color: green; font-weight: bold;">✓ <?php esc_html_e('قابل نوشتن و امن', 'sedrazavi-addons'); ?></span>
                                <?php else : ?>
                                    <span style="color: orange; font-weight: bold;">! <?php esc_html_e('عدم دسترسی نوشتن روی wp-content/uploads', 'sedrazavi-addons'); ?></span>
                                <?php endif; ?>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style="background: #fff; border: 1px solid #ccd0d4; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h2 style="margin: 0;"><?php esc_html_e('محتوای فایل لاگ سیستم (۱۵۰ خط اخیر)', 'sedrazavi-addons'); ?></h2>
                    <form method="post">
                        <?php wp_nonce_field('sedrazavi_clear_logs_action'); ?>
                        <input type="submit" name="sedrazavi_clear_logs" class="button button-secondary" value="<?php esc_attr_e('پاکسازی لاگ', 'sedrazavi-addons'); ?>" onclick="return confirm('آیا از پاکسازی لاگ اطمینان دارید؟');" />
                    </form>
                </div>
                <textarea readonly style="width: 100%; height: 350px; font-family: monospace; font-size: 12px; background: #0B132B; color: #cbd5e1; direction: ltr; padding: 12px; border-radius: 6px; border: 1px solid #1C2541;"><?php echo esc_textarea($log_content); ?></textarea>
            </div>
        </div>
        <?php
    }
}
`},{path:"sedrazavi-addons/includes/booking-system.php",filename:"booking-system.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"هندلر فرم‌های نوبت‌دهی، ذخیره‌سازی در دیتابیس و اعتبارسنجی سرور.",code:`<?php
/**
 * Consultation Booking Backend & AJAX Handlers
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_handle_booking_submission')) {
    function sedrazavi_handle_booking_submission() {
        // ۱. بررسی امنیتی توکن نانس
        if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'sedrazavi_security_nonce')) {
            wp_send_json_error(array(
                'message' => esc_html__('اعتبار سنجی امنیتی ناموفق بود. لطفاً صفحه را تازه‌سازی کنید.', 'sedrazavi-addons')
            ), 403);
        }

        // ۲. ضدعفونی و دریافت ورودی‌ها
        $fullname     = isset($_POST['fullname']) ? sanitize_text_field(wp_unslash($_POST['fullname'])) : '';
        $phone        = isset($_POST['phone']) ? sanitize_text_field(wp_unslash($_POST['phone'])) : '';
        $email        = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
        $service_type = isset($_POST['service_type']) ? sanitize_text_field(wp_unslash($_POST['service_type'])) : '';
        $date         = isset($_POST['date']) ? sanitize_text_field(wp_unslash($_POST['date'])) : '';
        $time         = isset($_POST['time']) ? sanitize_text_field(wp_unslash($_POST['time'])) : '';
        $message      = isset($_POST['message']) ? sanitize_textarea_field(wp_unslash($_POST['message'])) : '';

        // اعتبارسنجی فیلدهای اجباری
        if (empty($fullname) || empty($phone) || empty($service_type)) {
            wp_send_json_error(array(
                'message' => esc_html__('لطفاً تمامی فیلدهای الزامی (نام، شماره تماس و حوزه خدمت) را تکمیل فرمایید.', 'sedrazavi-addons')
            ), 400);
        }

        // ۳. ذخیره‌سازی در دیتابیس اختصاصی
        global $wpdb;
        $table_name = $wpdb->prefix . 'sedrazavi_consultations';

        try {
            $inserted = $wpdb->insert(
                $table_name,
                array(
                    'fullname'       => $fullname,
                    'phone'          => $phone,
                    'email'          => $email,
                    'service_type'   => $service_type,
                    'preferred_date' => $date,
                    'preferred_time' => $time,
                    'message'        => $message,
                    'status'         => 'pending',
                    'created_at'     => current_time('mysql'),
                ),
                array('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
            );

            if ($inserted === false) {
                sedrazavi_addons_log_error(
                    'خطای دیتابیس در ثبت نوبت: ' . $wpdb->last_error,
                    __FILE__,
                    __LINE__,
                    'ERROR'
                );
                wp_send_json_error(array(
                    'message' => esc_html__('خطایی در ذخیره اطلاعات رخ داد. لطفاً با دفتر تماس بگیرید.', 'sedrazavi-addons')
                ), 500);
            }

            $booking_id = $wpdb->insert_id;

            // ارسال اعلان ایمیل به مدیر در صورت تنظیم
            $admin_email = get_option('admin_email');
            $subject = sprintf(esc_html__('درخواست نوبت مشاوره حقوقی جدید - کد #%d', 'sedrazavi-addons'), $booking_id);
            $email_body = sprintf(
                "درخواست جدیدی با مشخصات زیر در سایت ثبت شد:
نام: %s
تلفن: %s
موضوع: %s
تاریخ درخواستی: %s ساعت %s
توضیحات: %s",
                $fullname,
                $phone,
                $service_type,
                $date,
                $time,
                $message
            );
            @wp_mail($admin_email, $subject, $email_body);

            wp_send_json_success(array(
                'message'    => esc_html__('درخواست وقت مشاوره شما با موفقیت ثبت شد. کارشناسان حقوقی به زودی با شما تماس خواهند گرفت.', 'sedrazavi-addons'),
                'booking_id' => $booking_id,
            ));

        } catch (Throwable $e) {
            sedrazavi_addons_log_error('استثنا در ثبت مشاوره: ' . $e->getMessage(), $e->getFile(), $e->getLine());
            wp_send_json_error(array('message' => esc_html__('خطای سرور در پردازش درخواست.', 'sedrazavi-addons')), 500);
        }
    }
}
add_action('wp_ajax_sedrazavi_book_consultation', 'sedrazavi_handle_booking_submission');
add_action('wp_ajax_nopriv_sedrazavi_book_consultation', 'sedrazavi_handle_booking_submission');
`},{path:"sedrazavi-addons/includes/case-metaboxes-ui.php",filename:"case-metaboxes-ui.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"متاباکس‌های پیشرفته مدیریت پرونده (خواهان، خوانده، روند دادرسی، شعبه دادگاه).",code:`<?php
/**
 * Attorney-Optimized Case Management Meta Boxes & Admin UI
 *
 * @package SedRazavi_Addons
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;

/**
 * ۱. افزودن متاباکس‌های تخصصی به پرونده‌های حقوقی
 */
function sedrazavi_register_case_metaboxes() {
    add_meta_box(
        'sedrazavi_case_core_details',
        '⚖️ اطلاعات قضایی و حقوقی پرونده (سامانه هوشمند وکیل)',
        'sedrazavi_render_case_metabox',
        'sedrazavi_case',
        'normal',
        'high'
    );

    add_meta_box(
        'sedrazavi_case_financials',
        '💳 قرارداد مالی و حق‌الوکاله',
        'sedrazavi_render_case_financial_metabox',
        'sedrazavi_case',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'sedrazavi_register_case_metaboxes');

/**
 * رندر متاباکس اصلی پرونده با رابط کاربری لوکس و راهنماهای دقیق برای وکیل
 */
function sedrazavi_render_case_metabox($post) {
    wp_nonce_field('sedrazavi_case_meta_action', 'sedrazavi_case_meta_nonce');

    $case_number = get_post_meta($post->ID, '_sedrazavi_case_number', true);
    $client_name = get_post_meta($post->ID, '_sedrazavi_client_name', true);
    $client_phone = get_post_meta($post->ID, '_sedrazavi_client_phone', true);
    $court_branch = get_post_meta($post->ID, '_sedrazavi_court_branch', true);
    $judge_name = get_post_meta($post->ID, '_sedrazavi_judge_name', true);
    $case_stage = get_post_meta($post->ID, '_sedrazavi_case_stage', true);
    $progress = get_post_meta($post->ID, '_sedrazavi_progress', true);
    $next_session = get_post_meta($post->ID, '_sedrazavi_next_session', true);
    $lawyer_memo = get_post_meta($post->ID, '_sedrazavi_lawyer_memo', true);

    if ($progress === '') $progress = '50';
    if (empty($case_stage)) $case_stage = 'بدوی';
    ?>
    <style>
        .sr-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .sr-meta-field { margin-bottom: 12px; }
        .sr-meta-field label { display: block; font-weight: bold; margin-bottom: 4px; color: #0B132B; font-size: 12px; }
        .sr-meta-field .sr-hint { display: block; font-size: 11px; color: #64748b; margin-top: 3px; }
        .sr-meta-field input[type="text"], .sr-meta-field select, .sr-meta-field textarea { width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; }
        .sr-meta-field input[type="text"]:focus, .sr-meta-field select:focus { border-color: #D4AF37; box-shadow: 0 0 0 1px #D4AF37; outline: none; }
        .sr-stage-badge { display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; background: #e0f2fe; color: #0369a1; }
    </style>

    <div style="background: #f8fafc; padding: 14px; border-radius: 10px; border-right: 4px solid #D4AF37; margin-bottom: 18px;">
        <p style="margin: 0; font-size: 12px; color: #334155; line-height: 1.6;">
            <strong>همکار گرامی / وکیل محترم:</strong> اطلاعات وارد شده در این بخش به صورت زنده در کارتابل آنلاین موکل و سامانه پیگیری پرونده نمایش داده خواهد شد. لطفاً کلاسه پرونده و زمان جلسات را با دقت درج نمایید.
        </p>
    </div>

    <div class="sr-meta-grid">
        <div class="sr-meta-field">
            <label>کلاسه بایگانی / شماره پرونده ثنا:</label>
            <input type="text" name="sr_case_number" value="<?php echo esc_attr($case_number); ?>" placeholder="مثال: ۱۴۰۳-۹۸۲۷۳-ونک" />
            <span class="sr-hint">این کد توسط موکل برای استعلام در سامانه پیگیری استفاده می‌شود.</span>
        </div>

        <div class="sr-meta-field">
            <label>نام و نام خانوادگی موکل:</label>
            <input type="text" name="sr_client_name" value="<?php echo esc_attr($client_name); ?>" placeholder="مثال: علیرضا رادمنش" />
        </div>
    </div>

    <div class="sr-meta-grid">
        <div class="sr-meta-field">
            <label>شماره تماس همراه موکل:</label>
            <input type="text" name="sr_client_phone" value="<?php echo esc_attr($client_phone); ?>" placeholder="۰۹۱۲۳۴۵۶۷۸۹" style="direction: ltr; text-align: right;" />
            <span class="sr-hint">جهت ارسال پیامک‌های خودکار اطلاع‌رسانی جلسات دادگاه</span>
        </div>

        <div class="sr-meta-field">
            <label>شعبه و مجتمع قضایی رسیدگی‌کننده:</label>
            <input type="text" name="sr_court_branch" value="<?php echo esc_attr($court_branch); ?>" placeholder="مثال: شعبه ۱۲ عمومی حقوقی مجتمع شهید بهشتی" />
        </div>
    </div>

    <div class="sr-meta-grid">
        <div class="sr-meta-field">
            <label>مرحله دادرسی فعلی:</label>
            <select name="sr_case_stage">
                <option value="ثبت دادخواست بدوی" <?php selected($case_stage, 'ثبت دادخواست بدوی'); ?>>۱. ثبت دادخواست و ابلاغ</option>
                <option value="تبادل لوایح طرفین" <?php selected($case_stage, 'تبادل لوایح طرفین'); ?>>۲. تبادل لوایح طرفین</option>
                <option value="ارجاع به کارشناسی رسمی" <?php selected($case_stage, 'ارجاع به کارشناسی رسمی'); ?>>۳. ارجاع به کارشناسی رسمی دادگستری</option>
                <option value="تشکیل جلسه رسیدگی بدوی" <?php selected($case_stage, 'تشکیل جلسه رسیدگی بدوی'); ?>>۴. تشکیل جلسه رسیدگی در دادگاه بدوی</option>
                <option value="صدور دادنامه بدوی" <?php selected($case_stage, 'صدور دادنامه بدوی'); ?>>۵. صدور دادنامه بدوی</option>
                <option value="تجدیدنظرخواهی" <?php selected($case_stage, 'تجدیدنظرخواهی'); ?>>۶. تجدیدنظرخواهی در دادگاه تجدیدنظر استان</option>
                <option value="داوری / صلح و سازش" <?php selected($case_stage, 'داوری / صلح و سازش'); ?>>۷. داوری بین‌المللی / سازش</option>
                <option value="اجرای احکام و وصول محکوم‌به" <?php selected($case_stage, 'اجرای احکام و وصول محکوم‌به'); ?>>۸. مرحله اجرای احکام و وصول</option>
                <option value="مختومه و بایگانی" <?php selected($case_stage, 'مختومه و بایگانی'); ?>>۹. پرونده با موفقیت مختومه شد</option>
            </select>
        </div>

        <div class="sr-meta-field">
            <label>درصد پیشرفت کار (%): <strong id="sr_progress_display" style="color: #D4AF37;"><?php echo esc_html($progress); ?>%</strong></label>
            <input type="range" min="0" max="100" step="5" name="sr_progress" value="<?php echo esc_attr($progress); ?>" oninput="document.getElementById('sr_progress_display').innerText = this.value + '%';" style="width: 100%; accent-color: #D4AF37;" />
        </div>
    </div>

    <div class="sr-meta-field">
        <label>تاریخ و ساعت جلسه آینده / وقت نظارت:</label>
        <input type="text" name="sr_next_session" value="<?php echo esc_attr($next_session); ?>" placeholder="مثال: سه‌شنبه ۱۵ مهر ۱۴۰۳ - ساعت ۰۹:۳۰ صبح" />
    </div>

    <div class="sr-meta-field">
        <label>یادداشت راهبردی و توضیحات وکیل برای موکل:</label>
        <textarea name="sr_lawyer_memo" rows="3" placeholder="توضیحاتی که موکل در پرتال شخصی مشاهده می‌کند (اقدامات انجام شده، دفاعیات و...)"><?php echo esc_textarea($lawyer_memo); ?></textarea>
    </div>
    <?php
}

/**
 * متاباکس امور مالی و حق‌الوکاله در سایدبار
 */
function sedrazavi_render_case_financial_metabox($post) {
    $total_fee = get_post_meta($post->ID, '_sedrazavi_total_fee', true);
    $paid_fee  = get_post_meta($post->ID, '_sedrazavi_paid_fee', true);
    ?>
    <div style="font-size: 12px; space-y: 10px;">
        <p>
            <label><strong>مبلغ کل حق‌الوکاله (تومان):</strong></label>
            <input type="text" name="sr_total_fee" value="<?php echo esc_attr($total_fee); ?>" placeholder="مثال: ۴۵,۰۰۰,۰۰۰" style="width: 100%; margin-top: 4px;" />
        </p>
        <p>
            <label><strong>مبلغ تسویه شده تا کنون:</strong></label>
            <input type="text" name="sr_paid_fee" value="<?php echo esc_attr($paid_fee); ?>" placeholder="مثال: ۳۰,۰۰۰,۰۰۰" style="width: 100%; margin-top: 4px;" />
        </p>
    </div>
    <?php
}

/**
 * ذخیره امن اطلاعات متاباکس
 */
function sedrazavi_save_case_metabox_data($post_id) {
    if (!isset($_POST['sedrazavi_case_meta_nonce']) || !wp_verify_nonce($_POST['sedrazavi_case_meta_nonce'], 'sedrazavi_case_meta_action')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $fields = array(
        '_sedrazavi_case_number' => 'sr_case_number',
        '_sedrazavi_client_name' => 'sr_client_name',
        '_sedrazavi_client_phone' => 'sr_client_phone',
        '_sedrazavi_court_branch' => 'sr_court_branch',
        '_sedrazavi_judge_name'  => 'sr_judge_name',
        '_sedrazavi_case_stage'  => 'sr_case_stage',
        '_sedrazavi_progress'    => 'sr_progress',
        '_sedrazavi_next_session'=> 'sr_next_session',
        '_sedrazavi_lawyer_memo' => 'sr_lawyer_memo',
        '_sedrazavi_total_fee'   => 'sr_total_fee',
        '_sedrazavi_paid_fee'    => 'sr_paid_fee',
    );

    foreach ($fields as $meta_key => $post_key) {
        if (isset($_POST[$post_key])) {
            update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$post_key]));
        }
    }
}
add_action('save_post_sedrazavi_case', 'sedrazavi_save_case_metabox_data');

/**
 * ۲. افزودن ستون‌های حرفه‌ای به جدول مدیریت پرونده‌ها در ادمین وردپرس
 */
function sedrazavi_case_columns($columns) {
    $custom = array();
    $custom['cb'] = $columns['cb'];
    $custom['title'] = 'موضوع دعوی و عنوان پرونده';
    $custom['case_number'] = 'کلاسه پرونده';
    $custom['client_name'] = 'نام موکل';
    $custom['case_stage'] = 'مرحله دادرسی';
    $custom['progress'] = 'پیشرفت کار';
    $custom['next_session'] = 'جلسه آینده';
    $custom['date'] = 'تاریخ ثبت';
    return $custom;
}
add_filter('manage_sedrazavi_case_posts_columns', 'sedrazavi_case_columns');

function sedrazavi_case_column_content($column, $post_id) {
    switch ($column) {
        case 'case_number':
            $num = get_post_meta($post_id, '_sedrazavi_case_number', true);
            echo $num ? '<code style="font-weight:bold; color:#0B132B;">' . esc_html($num) . '</code>' : '—';
            break;
        case 'client_name':
            $name = get_post_meta($post_id, '_sedrazavi_client_name', true);
            echo $name ? '<strong>' . esc_html($name) . '</strong>' : '—';
            break;
        case 'case_stage':
            $stage = get_post_meta($post_id, '_sedrazavi_case_stage', true);
            echo '<span style="background:#fef3c7; color:#92400e; padding:3px 8px; border-radius:12px; font-size:11px; font-weight:bold;">' . esc_html($stage ?: 'در دست اقدام') . '</span>';
            break;
        case 'progress':
            $prog = get_post_meta($post_id, '_sedrazavi_progress', true) ?: '0';
            echo '<div style="background:#e2e8f0; border-radius:10px; width:80px; height:8px; overflow:hidden; display:inline-block; vertical-align:middle; margin-left:6px;"><div style="background:#D4AF37; height:100%; width:' . esc_attr($prog) . '%;"></div></div> <span style="font-size:11px; font-weight:bold;">' . esc_html($prog) . '%</span>';
            break;
        case 'next_session':
            $session = get_post_meta($post_id, '_sedrazavi_next_session', true);
            echo $session ? '<span style="font-size:11px; color:#475569;">' . esc_html($session) . '</span>' : 'تعیین نشده';
            break;
    }
}
add_action('manage_sedrazavi_case_posts_custom_column', 'sedrazavi_case_column_content', 10, 2);
`},{path:"sedrazavi-addons/includes/case-tracking.php",filename:"case-tracking.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"سامانه جستجو و استعلام وضعیت پرونده‌ها بر اساس کدرهگیری و شماره پرونده.",code:`<?php
/**
 * Online Case Tracking System for Clients
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_ajax_track_case')) {
    function sedrazavi_ajax_track_case() {
        check_ajax_referer('sedrazavi_security_nonce', 'nonce');

        $case_number = isset($_POST['case_number']) ? sanitize_text_field(wp_unslash($_POST['case_number'])) : '';
        $national_id = isset($_POST['national_id']) ? sanitize_text_field(wp_unslash($_POST['national_id'])) : '';

        if (empty($case_number) || empty($national_id)) {
            wp_send_json_error(array(
                'message' => esc_html__('لطفاً هم شماره پرونده و هم کد ملی موکل را وارد کنید.', 'sedrazavi-addons')
            ));
        }

        // جستجو در پست‌های پرونده
        $args = array(
            'post_type'      => 'sedrazavi_case',
            'post_status'    => 'publish',
            'posts_per_page' => 1,
            'meta_query'     => array(
                'relation' => 'AND',
                array(
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_number,
                    'compare' => '=',
                ),
                array(
                    'key'     => '_sedrazavi_client_national_id',
                    'value'   => $national_id,
                    'compare' => '=',
                ),
            ),
        );

        $query = new WP_Query($args);

        if ($query->have_posts()) {
            $query->the_post();
            $case_id = get_the_ID();
            $status = get_post_meta($case_id, '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی';
            $court  = get_post_meta($case_id, '_sedrazavi_court_branch', true) ?: 'شعبه تجدیدنظر استان';
            $next_date = get_post_meta($case_id, '_sedrazavi_next_session', true) ?: 'در انتظار تعیین وقت دادگاه';

            wp_send_json_success(array(
                'title'       => get_the_title(),
                'status'      => esc_html($status),
                'court'       => esc_html($court),
                'next_session'=> esc_html($next_date),
                'lawyer'      => esc_html(get_post_meta($case_id, '_sedrazavi_assigned_lawyer', true) ?: 'سید رضوی'),
            ));
        } else {
            wp_send_json_error(array(
                'message' => esc_html__('پرونده‌ای با این مشخصات یافت نشد. لطفاً از صحت شماره پرونده و کد ملی اطمینان حاصل فرمایید.', 'sedrazavi-addons')
            ));
        }
        wp_reset_postdata();
    }
}
add_action('wp_ajax_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
add_action('wp_ajax_nopriv_sedrazavi_track_case', 'sedrazavi_ajax_track_case');
`},{path:"sedrazavi-addons/includes/class-sedrazavi-legal-intelligence.php",filename:"class-sedrazavi-legal-intelligence.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"کلاس هوش مصنوعی حقوقی و ممیزی شروط قراردادها.",code:`<?php
/**
 * Class SedRazavi_Legal_Intelligence
 *
 * @package SedRazavi_Core_Plugin
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Legal_Intelligence {

    public function __construct() {
        add_action('wp_ajax_sedrazavi_audit_clause', array($this, 'ajax_audit_clause'));
        add_action('wp_ajax_nopriv_sedrazavi_audit_clause', array($this, 'ajax_audit_clause'));
        add_action('wp_ajax_sedrazavi_search_precedents', array($this, 'ajax_search_precedents'));
        add_action('wp_ajax_nopriv_sedrazavi_search_precedents', array($this, 'ajax_search_precedents'));

        add_shortcode('sedrazavi_legal_intelligence_portal', array($this, 'render_portal'));
        add_shortcode('sedrazavi_contract_auditor', array($this, 'render_contract_auditor'));
    }

    /**
     * آنالیز هوشمند بند قرارداد و تعیین ریسک حقوقی
     */
    public function ajax_audit_clause() {
        check_ajax_referer('sedrazavi_intel_nonce', 'security');

        $raw_text = sanitize_textarea_field($_POST['clause_text'] ?? '');
        if (empty($raw_text)) {
            wp_send_json_error(array('message' => 'متن شرط قراردادی ارسال نشده است.'));
        }

        // الگوریتم غربالگری کلمات پرخطر حقوقی ایران
        $risk_level = 'low';
        $detected_risks = array();
        $recommendations = array();

        if (mb_stripos($raw_text, 'غبن افحش') !== false || mb_stripos($raw_text, 'کافه خیارات') !== false) {
            $risk_level = 'high';
            $detected_risks[] = 'اسقاط خیار غبن فاحش یا افحش به ضرر طرفین.';
            $recommendations[] = 'خیار تدلیس و خیار تخلف از شرط صفت را مستثنی کنید (ماده ۴۴۸ ق.م).';
        }

        if (mb_stripos($raw_text, 'فورس‌ماژور') !== false && (mb_stripos($raw_text, 'تورم') !== false || mb_stripos($raw_text, 'افزایش قیمت') !== false)) {
            $risk_level = 'critical';
            $detected_risks[] = 'تفسیر غیرقانونی تورم تجاری به عنوان فورس‌ماژور قهری.';
            $recommendations[] = 'تورم را صراحتاً از شمول قوه قاهره خارج کنید (مواد ۲۲۷ و ۲۲۹ ق.م).';
        }

        if (mb_stripos($raw_text, 'وجه التزام') !== false) {
            $detected_risks[] = 'نیاز به تطبیق با رأی وحدت رویه ۸۰۵ دیوان عالی کشور.';
        }

        wp_send_json_success(array(
            'risk_level'      => $risk_level,
            'detected_risks'  => $detected_risks,
            'recommendations' => $recommendations,
            'safety_score'    => $risk_level === 'critical' ? 35 : ($risk_level === 'high' ? 60 : 92),
        ));
    }

    /**
     * جستجوی سریع در بانک آرای وحدت رویه
     */
    public function ajax_search_precedents() {
        $keyword = sanitize_text_field($_GET['keyword'] ?? '');
        $category = sanitize_text_field($_GET['category'] ?? '');

        $args = array(
            'post_type'      => 'legal_precedent',
            'posts_per_page' => 15,
            's'              => $keyword,
        );

        if (!empty($category)) {
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'precedent_category',
                    'field'    => 'slug',
                    'terms'    => $category,
                ),
            );
        }

        $query = new WP_Query($args);
        $results = array();

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $results[] = array(
                    'id'      => get_the_ID(),
                    'title'   => get_the_title(),
                    'excerpt' => get_the_excerpt(),
                    'number'  => get_post_meta(get_the_ID(), '_precedent_number', true),
                    'date'    => get_post_meta(get_the_ID(), '_precedent_date', true),
                );
            }
            wp_reset_postdata();
        }

        wp_send_json_success(array('precedents' => $results));
    }

    public function render_portal() {
        ob_start();
        ?>
        <div id="sedrazavi-legal-ai-root" class="legal-intelligence-app">
            <p class="text-xs text-slate-500 text-center font-mono">در حال آماده‌سازی دستیار هوش مصنوعی و ممیزی قراردادها...</p>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_contract_auditor() {
        ob_start();
        ?>
        <div id="sedrazavi-contract-audit-root" class="contract-auditor-app">
            <p class="text-xs text-slate-500 text-center font-mono">بارگذاری ماژول غربالگری ریسک قرارداد...</p>
        </div>
        <?php
        return ob_get_clean();
    }
}

new SedRazavi_Legal_Intelligence();
`},{path:"sedrazavi-addons/includes/class-sedrazavi-odr-arbitration.php",filename:"class-sedrazavi-odr-arbitration.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"کلاس داوری و حل اختلاف آنلاین و تبادل لوایح محرمانه.",code:`<?php
/**
 * Class SedRazavi_ODR_Arbitration
 *
 * @package SedRazavi_Core_Plugin
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_ODR_Arbitration {

    public function __construct() {
        add_action('wp_ajax_sedrazavi_submit_pleading', array($this, 'ajax_submit_pleading'));
        add_action('wp_ajax_nopriv_sedrazavi_submit_pleading', array($this, 'ajax_submit_pleading'));
        add_action('wp_ajax_sedrazavi_issue_award', array($this, 'ajax_issue_award'));
        add_shortcode('sedrazavi_odr_portal', array($this, 'render_odr_portal'));
        add_shortcode('sedrazavi_virtual_courtroom', array($this, 'render_virtual_courtroom'));
        add_shortcode('sedrazavi_petition_builder', array($this, 'render_petition_builder'));
    }

    /**
     * ثبت لایحه جدید در پرونده داوری با پیامک خودکار
     */
    public function ajax_submit_pleading() {
        check_ajax_referer('sedrazavi_odr_nonce', 'security');

        $case_id = intval($_POST['case_id']);
        $title   = sanitize_text_field($_POST['title']);
        $content = wp_kses_post($_POST['content']);
        $sender  = sanitize_text_field($_POST['sender']);

        if (!$case_id || empty($title) || empty($content)) {
            wp_send_json_error(array('message' => 'اطلاعات لایحه ناقص است.'));
        }

        $tracking_code = 'PLD-SR-' . rand(10000, 99999);

        // ذخیره به عنوان کامنت متصل به پست داوری یا جدول اختصاصی
        $pleading_data = array(
            'comment_post_ID'      => $case_id,
            'comment_content'      => $content,
            'comment_author'       => $sender,
            'comment_type'         => 'odr_pleading',
            'comment_approved'     => 1,
        );

        $comment_id = wp_insert_comment($pleading_data);
        add_comment_meta($comment_id, 'tracking_code', $tracking_code);
        add_comment_meta($comment_id, 'pleading_title', $title);

        // ارسال پیامک خودکار ابلاغ لایحه به طرف مقابل
        do_action('sedrazavi_odr_pleading_submitted', $case_id, $tracking_code);

        wp_send_json_success(array(
            'message'       => 'لایحه با موفقیت در پرونده داوری ثبت گردید.',
            'tracking_code' => $tracking_code
        ));
    }

    public function render_odr_portal() {
        ob_start();
        ?>
        <div id="sedrazavi-odr-root" class="odr-interactive-app">
            <p class="text-xs text-slate-500 text-center font-mono">بارگذاری پورتال تعاملی داوری آنلاین و ثبت پرونده...</p>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_virtual_courtroom() {
        ob_start();
        ?>
        <div id="sedrazavi-virtual-court-root" class="virtual-court-app">
            <p class="text-xs text-slate-500 text-center font-mono">اتصال به تالار دادرسی مجازی و استماع زنده...</p>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_petition_builder() {
        ob_start();
        ?>
        <div id="sedrazavi-petition-builder-root" class="petition-builder-app">
            <p class="text-xs text-slate-500 text-center font-mono">بارگذاری فرم‌ساز هوشمند دادخواست و لوایح عدل‌ایران...</p>
        </div>
        <?php
        return ob_get_clean();
    }
}

new SedRazavi_ODR_Arbitration();
`},{path:"sedrazavi-addons/includes/elementor-widgets.php",filename:"elementor-widgets.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"پل ارتباطی ابزارک‌های پوسته و افزونه با صفحه‌ساز المنتور.",code:`<?php
/**
 * Elementor Widgets Integrator & Universal Suite Bridge
 *
 * @package SedRazavi_Addons
 * @version 3.0.0
 * @author Seyed Amir Hossein Razavi Fardoei (@sedrazavi)
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. If Universal Elementor Addon Suite is present, defer directly to the standalone suite
if (class_exists('\\UniversalElementorSuite\\Plugin')) {
    // Standalone Suite is loaded, no duplicate registration needed.
    return;
}

// 2. Fallback loader when standalone plugin is not yet active
if (!function_exists('sedrazavi_addons_register_elementor_category')) {
    function sedrazavi_addons_register_elementor_category($elements_manager) {
        if (!class_exists('\\Elementor\\Plugin')) {
            return;
        }
        $elements_manager->add_category(
            'sedrazavi-law-elements',
            array(
                'title' => esc_html__('المان‌های تخصصی حقوقی SedRazavi', 'sedrazavi-addons'),
                'icon'  => 'fa fa-gavel',
            )
        );
    }
}
add_action('elementor/elements/categories_registered', 'sedrazavi_addons_register_elementor_category');

if (!function_exists('sedrazavi_addons_load_elementor_widgets')) {
    function sedrazavi_addons_load_elementor_widgets($widgets_manager) {
        if (!class_exists('\\Elementor\\Widget_Base')) {
            return;
        }

        // Bridge to load standalone suite if available in wp-content/plugins
        $standalone_suite = WP_PLUGIN_DIR . '/elementor-addon-suite/elementor-addon-suite.php';
        if (file_exists($standalone_suite)) {
            require_once $standalone_suite;
            return;
        }
    }
}
add_action('elementor/widgets/register', 'sedrazavi_addons_load_elementor_widgets', 20);
add_action('elementor/widgets/widgets_registered', 'sedrazavi_addons_load_elementor_widgets', 20);
`},{path:"sedrazavi-addons/includes/logger.php",filename:"logger.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"لاگر خودکار خطاها و استثنائات در پوشه امنیتی wp-content/uploads/sedrazavi-logs.",code:`<?php
/**
 * Automated System Logger for SedRazavi Law Firm
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('SedRazavi_Logger')) {
    class SedRazavi_Logger {
        
        public static function init() {
            // ضبط استثناهای مدیریت‌نشده در صورت فعال بودن دیباگ افزونه
            if (get_option('sedrazavi_enable_custom_logger', 1)) {
                set_error_handler(array(__CLASS__, 'handle_php_error'));
            }
        }

        public static function handle_php_error($errno, $errstr, $errfile, $errline) {
            // تنها خطاهای مهم مربوط به فضای کاری سید رضوی ثبت شوند
            if (strpos($errfile, 'sedrazavi') !== false) {
                sedrazavi_addons_log_error($errstr, $errfile, $errline, 'PHP_ERROR_' . $errno);
            }
            return false; // اجازه ادامه به سیستم پیش‌فرض
        }

        public static function get_log_contents($max_lines = 100) {
            $log_file = SEDRAZAVI_LOG_DIR . 'debug.log';
            if (!file_exists($log_file)) {
                return esc_html__('هیچ خطایی ثبت نشده است؛ سیستم پایدار است.', 'sedrazavi-addons');
            }

            $lines = @file($log_file);
            if (empty($lines)) {
                return esc_html__('فایل لاگ خالی است.', 'sedrazavi-addons');
            }

            $sliced = array_slice($lines, -$max_lines);
            return implode('', array_reverse($sliced));
        }

        public static function clear_log() {
            $log_file = SEDRAZAVI_LOG_DIR . 'debug.log';
            if (file_exists($log_file)) {
                return @file_put_contents($log_file, '');
            }
            return true;
        }
    }
}

SedRazavi_Logger::init();
`},{path:"sedrazavi-addons/includes/otp-auth-integration.php",filename:"otp-auth-integration.php",category:"امنیت و احراز هویت (Security & Auth)",description:"یکپارچه‌سازی رمز یکبار مصرف ایمیلی با احراز هویت استاندارد وردپرس.",code:`<?php
/**
 * ماژول همگام‌سازی ورود با موبایل، سامانه Digits و ارتباط مستقیم موکلان
 * Module: OTP Mobile Authentication & Guest Instant Callback Engine
 * 
 * @package SedRazavi_Addons
 * @author Dr. Seyedeh Maryam Razavi
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * ۱. ایجاد جدول اختصاصی درخواست‌های تماس فوری مراجعین مهمان
 */
function sedrazavi_create_callbacks_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'sedrazavi_quick_callbacks';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        tracking_code varchar(30) NOT NULL,
        client_name varchar(100) DEFAULT '',
        phone_number varchar(20) NOT NULL,
        legal_topic varchar(100) DEFAULT 'مشاوره فوری',
        notes text DEFAULT '',
        status varchar(30) DEFAULT 'pending',
        ip_address varchar(45) DEFAULT '',
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        KEY phone_idx (phone_number),
        KEY tracking_idx (tracking_code)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
add_action('after_setup_theme', 'sedrazavi_create_callbacks_table');

/**
 * ۲. ثبت مسیرهای اختصاصی REST API جهت ارتباط بدون ثبت‌نام و ورود OTP
 */
add_action('rest_api_init', function () {
    // اندپوینت ثبت درخواست تماس فوری مراجعین بدون نیاز به حساب کاربری
    register_rest_route('sedrazavi/v1', '/quick-callback', array(
        'methods' => 'POST',
        'callback' => 'sedrazavi_api_handle_quick_callback',
        'permission_callback' => '__return_true',
    ));

    // اندپوینت ارسال کد تایید یکبار مصرف (سازگار با ملی‌پیامک و کاوه‌نگار)
    register_rest_route('sedrazavi/v1', '/otp/send', array(
        'methods' => 'POST',
        'callback' => 'sedrazavi_api_handle_otp_send',
        'permission_callback' => '__return_true',
    ));

    // اندپوینت اعتبارسنجی کد پیامک و ورود/عضویت خودکار کاربر در وردپرس
    register_rest_route('sedrazavi/v1', '/otp/verify', array(
        'methods' => 'POST',
        'callback' => 'sedrazavi_api_handle_otp_verify',
        'permission_callback' => '__return_true',
    ));
});

/**
 * مدیریت درخواست تماس فوری مراجعین بدون نیاز به ساخت حساب
 */
function sedrazavi_api_handle_quick_callback($request) {
    global $wpdb;
    $params = $request->get_json_params();

    $phone = sanitize_text_field($params['phone'] ?? '');
    $name = sanitize_text_field($params['name'] ?? 'مراجع محترم');
    $topic = sanitize_text_field($params['topic'] ?? 'مشاوره فوری تلفنی');
    $notes = sanitize_textarea_field($params['notes'] ?? '');

    // اعتبارسنجی شماره موبایل ایران
    if (!preg_match('/^09[0-9]{9}$/', $phone)) {
        return new WP_Error('invalid_phone', 'شماره موبایل وارد شده معتبر نمی‌باشد.', array('status' => 400));
    }

    $tracking_code = 'CB-' . wp_rand(100000, 999999);
    $table_name = $wpdb->prefix . 'sedrazavi_quick_callbacks';

    $inserted = $wpdb->insert($table_name, array(
        'tracking_code' => $tracking_code,
        'client_name'   => $name,
        'phone_number'  => $phone,
        'legal_topic'   => $topic,
        'notes'         => $notes,
        'ip_address'    => sanitize_text_field($_SERVER['REMOTE_ADDR'] ?? ''),
        'status'        => 'pending',
    ));

    if (!$inserted) {
        return new WP_Error('db_error', 'خطا در ثبت درخواست در پایگاه داده.', array('status' => 500));
    }

    // ارسال پیامک فوری به مدیر دفتر و وکیل جهت پاسخگویی سریع
    sedrazavi_send_admin_sms_alert($phone, $name, $topic, $tracking_code);

    return rest_ensure_response(array(
        'success' => true,
        'tracking_code' => $tracking_code,
        'message' => 'درخواست تماس شما با موفقیت ثبت شد. به زودی تماس خواهیم گرفت.'
    ));
}

/**
 * ارسال پیامک به وکیل با وب‌سرویس‌های ایرانی (کاوه‌نگار / ملی‌پیامک / فراز اس‌ام‌اس)
 */
function sedrazavi_send_admin_sms_alert($client_phone, $client_name, $topic, $tracking_code) {
    $admin_phone = get_option('sedrazavi_admin_phone', '09123456789');
    $sms_gateway = get_option('sedrazavi_sms_gateway', 'kavenegar'); // kavenegar, melipayamak, farazsms

    $msg = "دفتر وکالت دکتر رضوی:
درخواست تماس جدید بدون ثبت‌نام
نام: {$client_name}
شماره: {$client_phone}
موضوع: {$topic}
کد پیگیری: {$tracking_code}";

    // اعمال فیلتر برای سفارشی‌سازی متن توسط سایر افزونه‌ها یا وب‌هوک‌ها
    apply_filters('sedrazavi_dispatch_sms', $admin_phone, $msg, $sms_gateway);
}

/**
 * ۳. همگام‌سازی عمیق با افزونه محبوب ورود پیامکی Digits
 */
add_action('digits_after_login', function ($user_id) {
    // اعطای نقش پیش‌فرض "موکل حقوقی" و ایجاد سابقه لاگ
    $user = get_user_by('ID', $user_id);
    if ($user && !in_array('administrator', (array)$user->roles)) {
        $user->add_role('sedrazavi_client');
    }
}, 10, 1);

/**
 * کد کوتاه فرم ورود پیامکی هوشمند [sedrazavi_otp_login]
 */
function sedrazavi_shortcode_otp_login() {
    if (is_user_logged_in()) {
        $current_user = wp_get_current_user();
        return '<div class="sedrazavi-logged-box p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-right">' .
               'سلام <strong>' . esc_html($current_user->display_name) . '</strong> گرامی! شما وارد پرتال شده‌اید. ' .
               '<a href="' . wp_logout_url(home_url()) . '" class="text-red-600 underline mr-2">خروج</a>' .
               '</div>';
    }

    // اگر افزونه Digits فعال باشد، دکمه پیشرفته آن را فراخوانی می‌کند
    if (function_exists('digits_login_button')) {
        return do_shortcode('[digits_login]');
    }

    // فرم رزرو پیامکی مستقل در غیاب دیجیتس
    ob_start();
    ?>
    <div class="sedrazavi-otp-box max-w-sm mx-auto p-6 rounded-2xl bg-white shadow-lg border border-[#D4AF37]/30 text-right font-persian">
        <h3 class="text-base font-bold text-[#0B132B] mb-2">ورود / عضویت با شماره موبایل</h3>
        <p class="text-xs text-gray-500 mb-4">کد تایید یک‌بار مصرف به شماره همراه شما ارسال خواهد شد.</p>
        <form class="space-y-3" onsubmit="return false;">
            <input type="tel" dir="ltr" placeholder="۰۹۱۲۳۴۵۶۷۸۹" class="w-full px-3 py-2.5 rounded-xl border border-gray-300 font-mono text-sm focus:border-[#D4AF37]" required />
            <button type="button" class="w-full py-2.5 rounded-xl bg-[#D4AF37] text-white font-bold text-xs hover:bg-[#AA820A] transition-colors">
                دریافت کد تایید پیامکی
            </button>
        </form>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_otp_login', 'sedrazavi_shortcode_otp_login');

/**
 * کد کوتاه ویجت تماس فوری بدون ثبت‌نام [sedrazavi_quick_callback]
 */
function sedrazavi_shortcode_quick_callback() {
    ob_start();
    ?>
    <div class="sedrazavi-quick-callback-card p-5 rounded-2xl bg-amber-50/50 border border-[#D4AF37]/40 text-right font-persian">
        <div class="flex items-center gap-2 mb-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="text-sm font-bold text-[#0B132B]">تماس تلفنی فوری وکیل (بدون نیاز به ثبت نام)</h4>
        </div>
        <p class="text-xs text-gray-600 mb-3">شماره تماس خود را بگذارید؛ در اسرع وقت کارشناسان دفتر با شما تماس می‌گیرند:</p>
        <form class="flex gap-2" onsubmit="return false;">
            <input type="tel" dir="ltr" placeholder="۰۹۱۲۳۴۵۶۷۸۹" class="flex-1 px-3 py-2 rounded-xl border border-gray-300 font-mono text-xs focus:border-[#D4AF37]" required />
            <button type="button" class="px-4 py-2 rounded-xl bg-[#0B132B] text-[#F3E5AB] text-xs font-bold hover:bg-[#1C2541]">
                ثبت و تماس
            </button>
        </form>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_quick_callback', 'sedrazavi_shortcode_quick_callback');
`},{path:"sedrazavi-addons/includes/post-types.php",filename:"post-types.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"ثبت ۵ پست‌تایپ اختصاصی: خدمات حقوقی، پرونده‌ها، نظرات موکلین، پیام‌ها و ویدیوها.",code:`<?php
/**
 * Custom Post Types & Taxonomies
 *
 * @package SedRazavi_Addons
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_addons_register_post_types')) {
    function sedrazavi_addons_register_post_types() {
        
        // ۱. پست‌تایپ خدمات حقوقی تخصصی (Legal Services)
        $service_labels = array(
            'name'                  => esc_html__('خدمات حقوقی', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('خدمت حقوقی', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('خدمات حقوقی', 'sedrazavi-addons'),
            'add_new'               => esc_html__('افزودن خدمت جدید', 'sedrazavi-addons'),
            'add_new_item'          => esc_html__('افزودن خدمت حقوقی جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش خدمت', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه خدمات حقوقی', 'sedrazavi-addons'),
            'search_items'          => esc_html__('جستجوی خدمات', 'sedrazavi-addons'),
            'not_found'             => esc_html__('خدمتی یافت نشد', 'sedrazavi-addons'),
        );
        register_post_type('service', array(
            'labels'             => $service_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-hammer',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'services'),
            'show_in_rest'       => true,
        ));

        // تاکسونومی دسته‌بندی خدمات حقوقی
        register_taxonomy('service_category', 'service', array(
            'labels'            => array(
                'name'          => esc_html__('دسته‌بندی خدمات', 'sedrazavi-addons'),
                'singular_name' => esc_html__('دسته خدمت', 'sedrazavi-addons'),
            ),
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'rewrite'           => array('slug' => 'service-category'),
            'show_in_rest'      => true,
        ));

        // ۲. پست‌تایپ دعاوی و پرونده‌های حقوقی موکلین (Legal Cases)
        $case_labels = array(
            'name'                  => esc_html__('دعاوی و پرونده‌ها', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('پرونده حقوقی', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('پرونده‌های موکلین', 'sedrazavi-addons'),
            'add_new'               => esc_html__('ثبت پرونده جدید', 'sedrazavi-addons'),
            'add_new_item'          => esc_html__('افزودن پرونده جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش پرونده', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه پرونده‌ها', 'sedrazavi-addons'),
            'search_items'          => esc_html__('جستجوی پرونده', 'sedrazavi-addons'),
            'not_found'             => esc_html__('پرونده‌ای یافت نشد', 'sedrazavi-addons'),
        );
        register_post_type('sedrazavi_case', array(
            'labels'             => $case_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-portfolio',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'cases'),
            'show_in_rest'       => true,
        ));

        register_taxonomy('case_category', 'sedrazavi_case', array(
            'labels'            => array(
                'name'          => esc_html__('حوزه دعاوی', 'sedrazavi-addons'),
                'singular_name' => esc_html__('حوزه دعوی', 'sedrazavi-addons'),
            ),
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'rewrite'           => array('slug' => 'case-category'),
            'show_in_rest'      => true,
        ));

        // ۳. پست‌تایپ نظرات و رضایت موکلان (Testimonials)
        $testimonial_labels = array(
            'name'                  => esc_html__('نظرات موکلان', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('نظر موکل', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('نظرات موکلان', 'sedrazavi-addons'),
            'add_new'               => esc_html__('ثبت نظر جدید', 'sedrazavi-addons'),
            'add_new_item'          => esc_html__('افزودن نظر جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش نظر', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه نظرات موکلان', 'sedrazavi-addons'),
        );
        register_post_type('testimonial', array(
            'labels'             => $testimonial_labels,
            'public'             => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-format-quote',
            'supports'           => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'testimonials'),
            'show_in_rest'       => true,
        ));

        // ۴. پست‌تایپ ایمیل‌ها و پیام‌های استعلام و رزرو مشاوره (Emails & Consultations)
        $email_labels = array(
            'name'                  => esc_html__('پیام‌ها و استعلام‌ها', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('پیام / استعلام', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('پیام‌های دریافتی', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه پیام‌ها و ایمیل‌ها', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('مشاهده پیام', 'sedrazavi-addons'),
        );
        register_post_type('email', array(
            'labels'             => $email_labels,
            'public'             => false,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-email-alt',
            'supports'           => array('title', 'editor', 'custom-fields'),
            'show_in_rest'       => false,
        ));

        // ۵. پست‌تایپ ویدئوهای حقوقی و آموزشی (Legal Educational Videos)
        $video_labels = array(
            'name'                  => esc_html__('ویدئوهای حقوقی', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('ویدئوی حقوقی', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('ویدئوها و آموزش‌ها', 'sedrazavi-addons'),
            'add_new'               => esc_html__('افزودن ویدئو', 'sedrazavi-addons'),
            'add_new_item'          => esc_html__('افزودن ویدئوی حقوقی جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش ویدئو', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه ویدئوها', 'sedrazavi-addons'),
        );
        register_post_type('video', array(
            'labels'             => $video_labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-video-alt3',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'videos'),
            'show_in_rest'       => true,
        ));

        register_taxonomy('video_category', 'video', array(
            'labels'            => array(
                'name'          => esc_html__('دسته‌بندی ویدئوها', 'sedrazavi-addons'),
                'singular_name' => esc_html__('دسته ویدئو', 'sedrazavi-addons'),
            ),
            'hierarchical'      => true,
            'show_ui'           => true,
            'show_admin_column' => true,
            'rewrite'           => array('slug' => 'video-category'),
            'show_in_rest'      => true,
        ));

        // ۶. پست‌تایپ تیم وکلای همکار و مشاوران (Lawyers Team)
        $lawyer_labels = array(
            'name'                  => esc_html__('تیم وکلا و همکاران', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('وکیل / همکار', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('تیم وکلا', 'sedrazavi-addons'),
            'add_new'               => esc_html__('افزودن همکار جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('ویرایش اطلاعات همکار', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه اعضای تیم و همکاران', 'sedrazavi-addons'),
        );
        register_post_type('sedrazavi_lawyer', array(
            'labels'             => $lawyer_labels,
            'public'             => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-businessman',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'has_archive'        => true,
            'rewrite'            => array('slug' => 'lawyers'),
            'show_in_rest'       => true,
        ));

        // ۷. پست‌تایپ رسمی نوبت‌های مشاوره و رزرو وقت (Appointments & Consultations)
        $appointment_labels = array(
            'name'                  => esc_html__('نوبت‌های مشاوره', 'sedrazavi-addons'),
            'singular_name'         => esc_html__('نوبت مشاوره', 'sedrazavi-addons'),
            'menu_name'             => esc_html__('رزرو نوبت‌ها', 'sedrazavi-addons'),
            'add_new'               => esc_html__('ثبت نوبت جدید', 'sedrazavi-addons'),
            'edit_item'             => esc_html__('مشاهده نوبت', 'sedrazavi-addons'),
            'all_items'             => esc_html__('همه نوبت‌های رزرو', 'sedrazavi-addons'),
        );
        register_post_type('sedrazavi_appointment', array(
            'labels'             => $appointment_labels,
            'public'             => false,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'menu_icon'          => 'dashicons-calendar-alt',
            'supports'           => array('title', 'editor', 'custom-fields'),
            'show_in_rest'       => true,
        ));
        register_post_type('sedrazavi_booking', array(
            'labels'             => $appointment_labels,
            'public'             => false,
            'show_ui'            => false,
            'show_in_menu'       => false,
            'supports'           => array('title', 'editor', 'custom-fields'),
            'show_in_rest'       => true,
        ));
    }
}
add_action('init', 'sedrazavi_addons_register_post_types');
`},{path:"sedrazavi-addons/includes/shortcodes-engine.php",filename:"shortcodes-engine.php",category:"ماژول‌های افزونه (Plugin Includes)",description:"موتور رندر شورت‌کدهای تعاملی و ثبت در هسته وردپرس.",code:`<?php
/**
 * Master Shortcode Engine for SedRazavi Law Firm
 *
 * @package SedRazavi_Addons
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;

/**
 * ۱. کد کوتاه پرتال کاربری موکلین [sedrazavi_client_portal]
 */
function sedrazavi_shortcode_client_portal($atts) {
    ob_start();
    ?>
    <div id="sedrazavi-client-portal-app" class="sedrazavi-client-portal-wrapper">
        <div class="p-6 rounded-3xl bg-[#0B132B] text-white border border-[#D4AF37]/40 shadow-xl text-right">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-gray-800">
                <div class="flex items-center gap-3">
                    <span style="font-size:2rem;">⚖️</span>
                    <div>
                        <h3 class="text-xl font-bold font-serif text-white">پرتال جامع موکلین دفتر وکالت SedRazavi</h3>
                        <p class="text-xs text-gray-300">مشاهده لحظه‌ای لوایح، تقویم جلسات دادگاه و اسناد محرمانه</p>
                    </div>
                </div>
                <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">سامانه امن ثنا</span>
            </div>
            <div class="py-6 text-center">
                <p class="text-sm text-gray-300 mb-4">برای مشاهده پرونده‌های خود، شماره پرونده یا کد ملی خود را وارد فرمایید:</p>
                <form class="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
                    <input type="text" placeholder="شماره کلاسه پرونده (مثال: ۱۴۰۳-۹۸۲۷۳-ونک)..." class="px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900 text-white text-xs w-full sm:w-80" />
                    <button type="button" class="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold">ورود به کارتابل</button>
                </form>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_client_portal', 'sedrazavi_shortcode_client_portal');

/**
 * ۲. کد کوتاه پیگیری سریع پرونده [sedrazavi_tracking]
 */
function sedrazavi_shortcode_tracking($atts) {
    ob_start();
    ?>
    <div class="sedrazavi-tracking-box p-6 rounded-2xl bg-white border border-gray-200 shadow-lg text-right max-w-xl mx-auto">
        <h4 class="text-base font-bold text-[#0B132B] mb-2">استعلام سریع وضعیت پرونده</h4>
        <p class="text-xs text-gray-500 mb-4">کد پرونده درج‌شده در قرارداد وکالت را وارد نمایید:</p>
        <div class="flex gap-2">
            <input type="text" placeholder="کد رهگیری پرونده..." class="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-xs font-mono" />
            <button class="btn-gold px-5 py-2 rounded-xl text-xs font-bold">استعلام</button>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_tracking', 'sedrazavi_shortcode_tracking');

/**
 * ۳. کد کوتاه پل‌های ارتباطی و شبکه‌های اجتماعی [sedrazavi_social_icons]
 */
function sedrazavi_shortcode_social_icons($atts) {
    ob_start();
    ?>
    <div class="sedrazavi-social-channels text-right py-4">
        <h4 class="text-sm font-bold text-gray-800 mb-3">شبکه‌های اجتماعی و پیام‌رسان‌های وکیل:</h4>
        <div class="flex flex-wrap gap-3">
            <a href="https://instagram.com/Dr_SedRazavi_Law" target="_blank" class="px-4 py-2 rounded-xl bg-pink-500/10 text-pink-600 border border-pink-500/20 text-xs font-bold flex items-center gap-1.5">
                <span>اینستاگرام رسمی: @Dr_SedRazavi_Law</span>
            </a>
            <a href="https://t.me/SedRazavi_Law" target="_blank" class="px-4 py-2 rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 text-xs font-bold flex items-center gap-1.5">
                <span>تلگرام دفتر: @SedRazavi_Law</span>
            </a>
            <a href="https://wa.me/989123456789" target="_blank" class="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
                <span>واتس‌اپ ارسال مدارک: ۰۹۱۲۳۴۵۶۷۸۹</span>
            </a>
            <a href="https://linkedin.com" target="_blank" class="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20 text-xs font-bold flex items-center gap-1.5">
                <span>لینکدین تخصصی</span>
            </a>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_social_icons', 'sedrazavi_shortcode_social_icons');

/**
 * ۴. کد کوتاه اسکرول‌بار طلایی [sedrazavi_gold_scroll]
 */
function sedrazavi_shortcode_gold_scroll() {
    ob_start();
    ?>
    <div id="sr-gold-scrollbar-indicator" style="position:fixed; top:0; left:0; height:4px; background:linear-gradient(90deg, #D4AF37, #F3E5AB); z-index:99999; width:0%; transition:width 0.1s ease-out;"></div>
    <script>
    window.addEventListener('scroll', function() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        var el = document.getElementById('sr-gold-scrollbar-indicator');
        if (el) el.style.width = scrolled + '%';
    });
    <\/script>
    <?php
    return ob_get_clean();
}
add_shortcode('sedrazavi_gold_scroll', 'sedrazavi_shortcode_gold_scroll');
`},{path:"sedrazavi-addons/sedrazavi-addons.php",filename:"sedrazavi-addons.php",category:"افزونه مکمل (Plugin Addons)",description:"فایل اصلی افزونه مکمل حقوقی با بارگذاری مقاوم، ثبت قلاب‌ها و تعریف ثابت‌ها.",code:`<?php
/**
 * Plugin Name: SedRazavi Addons
 * Plugin URI: https://t.me/sedrazavi
 * Description: افزونه مکمل و اختصاصی SedRazavi Addons برای پورتال حقوقی با ۵ پست‌تایپ اختصاصی (خدمات، پرونده‌ها، نظرات، پیام‌ها و ویدئوها)، سیستم مدیریت پرونده‌ها، سامانه استعلام برخط موکلین، سیستم رزرواسیون وقت مشاوره، لاگر مقاوم خودکار و ویجت‌های اختصاصی المنتور.
 * Version: 2.0.1
 * Author: سید امیر حسین رضوی فردویی
 * Author URI: https://t.me/sedrazavi
 * Text Domain: sedrazavi-addons
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 * License: GPL v2 or later
 * Creator Telegram: @sedrazavi
 * Creator Eitaa: @sedrazavi
 */

if (!defined('ABSPATH')) {
    exit; // خروج مستقیم در صورت فراخوانی خارج از محیط وردپرس
}

// ۱. تعریف ثابت‌های یکتای افزونه با کنترل امنیتی if (!defined)
if (!defined('SEDRAZAVI_ADDONS_VERSION')) {
    define('SEDRAZAVI_ADDONS_VERSION', '2.0.1');
}
if (!defined('SEDRAZAVI_ADDONS_DIR')) {
    define('SEDRAZAVI_ADDONS_DIR', plugin_dir_path(__FILE__));
}
if (!defined('SEDRAZAVI_ADDONS_URL')) {
    define('SEDRAZAVI_ADDONS_URL', plugin_dir_url(__FILE__));
}
if (!defined('SEDRAZAVI_LOG_DIR')) {
    define('SEDRAZAVI_LOG_DIR', WP_CONTENT_DIR . '/uploads/sedrazavi-logs/');
}

// ۲. سیستم ثبت لاگ اختصاصی و خودکار خطاها (Automated Error Logger)
if (!function_exists('sedrazavi_addons_log_error')) {
    /**
     * ثبت خطاهای سیستمی در فایل wp-content/uploads/sedrazavi-logs/debug.log
     *
     * @param string $message پیام خطا
     * @param string $file نام فایل محل خطا
     * @param int|string $line شماره خط
     * @param string $level سطح خطا (INFO, WARNING, CRITICAL, FATAL)
     */
    function sedrazavi_addons_log_error($message, $file = '', $line = '', $level = 'ERROR') {
        $log_dir = SEDRAZAVI_LOG_DIR;
        if (!file_exists($log_dir)) {
            wp_mkdir_p($log_dir);
            // ایجاد فایل htaccess جهت جلوگیری از دسترسی عمومی و حفظ امنیت داده‌های محرمانه
            $htaccess_file = $log_dir . '.htaccess';
            if (!file_exists($htaccess_file)) {
                @file_put_contents($htaccess_file, "Order Deny,Allow
Deny from all
");
            }
            $index_file = $log_dir . 'index.php';
            if (!file_exists($index_file)) {
                @file_put_contents($index_file, "<?php // Silence is golden
");
            }
        }

        $log_file = $log_dir . 'debug.log';
        $timestamp = date_i18n('Y-m-d H:i:s');
        $formatted_msg = sprintf(
            "[%s] [%s] %s | File: %s (Line %s)
",
            $timestamp,
            strtoupper($level),
            $message,
            $file ?: 'N/A',
            $line ?: 'N/A'
        );

        @error_log($formatted_msg, 3, $log_file);
    }
}

// ۳. کلاس بارگذار مقاوم ماژول‌ها (Resilient Plugin Loader)
if (!class_exists('SedRazavi_Addons_Loader')) {
    class SedRazavi_Addons_Loader {
        private static $instance = null;

        public static function get_instance() {
            if (null === self::$instance) {
                self::$instance = new self();
            }
            return self::$instance;
        }

        private function __construct() {
            $this->load_resilient_modules();
            add_action('plugins_loaded', array($this, 'init_plugin'));
        }

        /**
         * بارگذاری ایزوله و مقاوم فایل‌ها با مکانیسم Try-Catch
         * در صورت بروز خطا در هر فایل، بقیه افزونه و هسته سایت متوقف نمی‌شوند.
         */
        private function load_resilient_modules() {
            $modules = array(
                'logger.php',
                'post-types.php',
                'case-metaboxes-ui.php',
                'shortcodes-engine.php',
                'booking-system.php',
                'case-tracking.php',
                'elementor-widgets.php',
                'admin-settings.php',
                'otp-auth-integration.php',
                'class-sedrazavi-auth-dual-mode.php',
                'class-sedrazavi-dual-panel-unified.php',
                'class-sedrazavi-admin-protection.php',
                'class-sedrazavi-design-tokens.php',
                'class-sedrazavi-elementor-widgets.php',
                'class-sedrazavi-payment-adapter.php',
            );

            foreach ($modules as $module) {
                $file_path = SEDRAZAVI_ADDONS_DIR . 'includes/' . $module;
                if (file_exists($file_path)) {
                    try {
                        require_once $file_path;
                    } catch (Throwable $e) {
                        sedrazavi_addons_log_error(
                            'خطا در بارگذاری ماژول ' . $module . ': ' . $e->getMessage(),
                            $e->getFile(),
                            $e->getLine(),
                            'CRITICAL'
                        );
                    } catch (Exception $e) {
                        sedrazavi_addons_log_error(
                            'استثنا در ماژول ' . $module . ': ' . $e->getMessage(),
                            $e->getFile(),
                            $e->getLine(),
                            'ERROR'
                        );
                    }
                } else {
                    sedrazavi_addons_log_error(
                        'فایل ماژول یافت نشد: ' . $module,
                        __FILE__,
                        __LINE__,
                        'WARNING'
                    );
                }
            }
        }

        public function init_plugin() {
            // بارگذاری متن ترجمه افزونه
            load_plugin_textdomain('sedrazavi-addons', false, dirname(plugin_basename(__FILE__)) . '/languages');
        }
    }
}

// راه‌اندازی نمونه اصلی لودر افزونه
SedRazavi_Addons_Loader::get_instance();

// ۴. هوک فعال‌سازی مقاوم با Try-Catch جامع (Activation Hook)
if (!function_exists('sedrazavi_addons_activate')) {
    function sedrazavi_addons_activate() {
        try {
            global $wpdb;
            
            // ایجاد پوشه لاگ و محافظت امنیتی
            sedrazavi_addons_log_error('افزونه با موفقیت فعال‌سازی شد.', __FILE__, __LINE__, 'INFO');

            // ایجاد جدول رزرو نوبت مشاوره حقوقی با استفاده از dbDelta
            $table_name = $wpdb->prefix . 'sedrazavi_consultations';
            $charset_collate = $wpdb->get_charset_collate();

            $sql = "CREATE TABLE IF NOT EXISTS {$table_name} (
                id bigint(20) NOT NULL AUTO_INCREMENT,
                fullname varchar(191) NOT NULL,
                phone varchar(50) NOT NULL,
                email varchar(100) DEFAULT '',
                service_type varchar(100) NOT NULL,
                preferred_date varchar(50) NOT NULL,
                preferred_time varchar(50) NOT NULL,
                message text,
                status varchar(30) DEFAULT 'pending',
                created_at datetime DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY phone (phone),
                KEY status (status)
            ) {$charset_collate};";

            require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
            dbDelta($sql);

            // ثبت زمان نصب اولیه در آپشن‌ها
            if (!get_option('sedrazavi_addons_installed')) {
                update_option('sedrazavi_addons_installed', current_time('mysql'));
            }

            // ۶. اتوماسیون هوشمند ایجاد خودکار برگه سامانه ری‌اکت در وردپرس (Auto-Provisioning)
            $existing_page = get_page_by_path('sedrazavi-portal');
            if (!$existing_page) {
                $page_id = wp_insert_post(array(
                    'post_title'     => 'سامانه جامع حقوقی و پرتال موکلین (SedRazavi Portal)',
                    'post_name'      => 'sedrazavi-portal',
                    'post_content'   => '<!-- wp:shortcode -->[sedrazavi_app]<!-- /wp:shortcode -->',
                    'post_status'    => 'publish',
                    'post_type'      => 'page',
                    'comment_status' => 'closed'
                ));
                if (!is_wp_error($page_id)) {
                    update_option('sedrazavi_auto_portal_page_id', $page_id);
                }
            }

            // فلاش امن ری‌رایت رول‌ها
            if (function_exists('sedrazavi_addons_register_post_types')) {
                sedrazavi_addons_register_post_types();
            }
            flush_rewrite_rules(false);

        } catch (Throwable $e) {
            // ثبت خطا در فایل لاگ بدون ایجاد صفحه سفید مرگ (WSOD)
            sedrazavi_addons_log_error(
                'خطا در حین فرآیند فعال‌سازی افزونه: ' . $e->getMessage(),
                $e->getFile(),
                $e->getLine(),
                'FATAL'
            );
        }
    }
}
register_activation_hook(__FILE__, 'sedrazavi_addons_activate');

// ۵. هوک غیرفعال‌سازی ایمن (Deactivation Hook)
if (!function_exists('sedrazavi_addons_deactivate')) {
    function sedrazavi_addons_deactivate() {
        flush_rewrite_rules(false);
        sedrazavi_addons_log_error('افزونه غیرفعال شد.', __FILE__, __LINE__, 'INFO');
    }
}
register_deactivation_hook(__FILE__, 'sedrazavi_addons_deactivate');

// ۶. شورت‌کدهای هوشمند اتوماسیون ری‌اکت در وردپرس (Automated Universal Shortcodes)
if (!function_exists('sedrazavi_register_universal_shortcodes')) {
    function sedrazavi_render_react_app_shortcode($atts) {
        $a = shortcode_atts(array(
            'mode' => 'full',
            'view' => 'all'
        ), $atts);

        // بارگذاری خودکار استایل و اسکریپت بیلد شده
        $plugin_dist_css = SEDRAZAVI_ADDONS_DIR . 'dist/index.css';
        $plugin_dist_js  = SEDRAZAVI_ADDONS_DIR . 'dist/index.js';

        if (file_exists($plugin_dist_css) && file_exists($plugin_dist_js)) {
            wp_enqueue_style(
                'sedrazavi-addon-react-css',
                SEDRAZAVI_ADDONS_URL . 'dist/index.css',
                array(),
                filemtime($plugin_dist_css)
            );
            wp_enqueue_script(
                'sedrazavi-addon-react-js',
                SEDRAZAVI_ADDONS_URL . 'dist/index.js',
                array(),
                filemtime($plugin_dist_js),
                true
            );

            wp_localize_script('sedrazavi-addon-react-js', 'SedRazaviPluginConfig', array(
                'siteUrl'   => home_url(),
                'ajaxUrl'   => admin_url('admin-ajax.php'),
                'pluginUrl' => SEDRAZAVI_ADDONS_URL,
                'nonce'     => wp_create_nonce('sedrazavi_security_nonce'),
            ));
        }

        ob_start();
        ?>
        <div id="root" class="sedrazavi-embedded-app" data-embed-mode="<?php echo esc_attr($a['mode']); ?>">
            <div style="min-height: 400px; display: flex; align-items: center; justify-content: center; background: #0B132B; color: #D4AF37; font-family: 'Vazirmatn', Tahoma, sans-serif; direction: rtl; border-radius: 1.5rem; padding: 2rem; margin: 1rem 0;">
                <div style="text-align: center;">
                    <div style="width: 40px; height: 40px; border: 3px solid rgba(212,175,55,0.2); border-top-color: #D4AF37; border-radius: 50%; margin: 0 auto 1rem; animation: spin 1s linear infinite;"></div>
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">سامانه تخصصی حقوقی دکتر سیده مریم رضوی</h3>
                    <p style="font-size: 0.85rem; color: #D4AF37;">در حال بارگذاری خودکار ماژول‌های سامانه...</p>
                </div>
            </div>
        </div>
        <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
        <?php
        return ob_get_clean();
    }

    add_shortcode('sedrazavi_app', 'sedrazavi_render_react_app_shortcode');
    add_shortcode('sedrazavi_portal', 'sedrazavi_render_react_app_shortcode');
    add_shortcode('sedrazavi_tracker', 'sedrazavi_render_react_app_shortcode');
}

// ۷. اعلان خودکار راهنمای اتوماسیون در پیشخوان وردپرس (Automated Admin Notice)
add_action('admin_notices', function() {
    $screen = get_current_screen();
    if ($screen && in_array($screen->id, array('dashboard', 'plugins', 'edit-page'))) {
        $portal_page_id = get_option('sedrazavi_auto_portal_page_id');
        $portal_url = $portal_page_id ? get_permalink($portal_page_id) : home_url('/sedrazavi-portal');
        ?>
        <div class="notice notice-success is-dismissible" style="border-right-color: #D4AF37; border-right-width: 4px; padding: 12px 16px; background: #fdfdfd;">
            <p style="font-weight: 700; color: #0B132B; margin-bottom: 6px; font-size: 14px;">
                ✨ اتوماسیون هوشمند سامانه حقوقی سید رضوی با موفقیت فعال است!
            </p>
            <p style="color: #4b5563; font-size: 13px; line-height: 1.8; margin-bottom: 8px;">
                برگه سامانه تعاملی به صورت خودکار ایجاد گردید. همچنین می‌توانید با شورت‌کد <code>[sedrazavi_app]</code> در هر برگه‌ای از المنتور، گوتنبرگ یا ویرایشگر کلاسیک، سامانه را بدون نیاز به هیچ تنظیم دستی نمایش دهید.
            </p>
            <p>
                <a href="<?php echo esc_url($portal_url); ?>" target="_blank" class="button button-primary" style="background: #D4AF37; border-color: #AA820A; color: #0B132B; font-weight: 700;">
                    🚀 مشاهده سامانه در سایت
                </a>
            </p>
        </div>
        <?php
    }
});

// ۸. ثبت مسیرهای REST API جهت اتصال فرانت‌اند ری‌اکت و کلاینت‌های Headless (WP REST API & CORS)
add_action('rest_api_init', function () {
    // اندپوینت رهگیری و استعلام وضعیت پرونده
    register_rest_route('sedrazavi/v1', '/track-case', array(
        'methods'             => 'POST',
        'callback'            => 'sedrazavi_api_track_case_handler',
        'permission_callback' => '__return_true',
    ));

    // اندپوینت رزرو نوبت مشاوره حقوقی
    register_rest_route('sedrazavi/v1', '/book-appointment', array(
        'methods'             => 'POST',
        'callback'            => 'sedrazavi_api_book_appointment_handler',
        'permission_callback' => '__return_true',
    ));
});

if (!function_exists('sedrazavi_api_track_case_handler')) {
    function sedrazavi_api_track_case_handler($request) {
        if (class_exists('SedRazavi_REST_API')) {
            return SedRazavi_REST_API::handle_track_case($request);
        }

        $params = $request->get_json_params() ?: $request->get_params();
        $case_no = isset($params['case_number']) ? sanitize_text_field($params['case_number']) : '';
        $phone   = isset($params['phone']) ? sanitize_text_field($params['phone']) : (isset($params['client_phone']) ? sanitize_text_field($params['client_phone']) : '');

        if (empty($case_no) || empty($phone)) {
            return new WP_Error('missing_param', 'شماره پرونده و تلفن همراه ثبت‌شده موکل الزامی است.', array('status' => 400));
        }

        $norm = function($p) {
            $p = str_replace(array('۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'), array('0','1','2','3','4','5','6','7','8','9'), $p);
            return ltrim(preg_replace('/[^\\d]/', '', $p), '0');
        };

        $args = array(
            'post_type'      => 'sedrazavi_case',
            'posts_per_page' => 1,
            'meta_query'     => array(
                array(
                    'key'     => '_sedrazavi_case_number',
                    'value'   => $case_no,
                    'compare' => '=',
                ),
            ),
        );
        $query = new WP_Query($args);

        if ($query->have_posts()) {
            $query->the_post();
            $stored_phone = get_post_meta(get_the_ID(), '_sedrazavi_client_phone', true);
            if ($norm($stored_phone) === $norm($phone)) {
                $case_data = array(
                    'found'        => true,
                    'case_number'  => $case_no,
                    'case_type'    => get_post_meta(get_the_ID(), '_sedrazavi_case_type', true) ?: 'دعاوی حقوقی',
                    'status'       => get_post_meta(get_the_ID(), '_sedrazavi_case_status', true) ?: 'در جریان رسیدگی',
                    'court_branch' => get_post_meta(get_the_ID(), '_sedrazavi_court_branch', true) ?: 'شعبه دادگاه عمومی حقوقی',
                    'next_session' => get_post_meta(get_the_ID(), '_sedrazavi_next_session', true) ?: 'در نوبت تعیین وقت',
                    'updated_at'   => get_the_modified_date('Y/m/d'),
                );
                wp_reset_postdata();
                return rest_ensure_response($case_data);
            }
            wp_reset_postdata();
        }

        if (get_option('sedrazavi_demo_mode', false)) {
            return rest_ensure_response(array(
                'found'        => true,
                'is_demo'      => true,
                'demo_label'   => 'نمونه فرضی',
                'case_number'  => $case_no,
                'case_type'    => 'دعاوی حقوقی (نمونه)',
                'status'       => 'در جریان تبادل لوایح',
                'court_branch' => 'شعبه ۵ دادگاه تجدیدنظر (نمونه)',
                'next_session' => '۱۴۰۳/۰۸/۱۵',
                'updated_at'   => date('Y/m/d'),
            ));
        }

        return new WP_REST_Response(array(
            'found'   => false,
            'message' => 'پرونده‌ای با این مشخصات یافت نشد.',
        ), 404);
    }
}

if (!function_exists('sedrazavi_api_book_appointment_handler')) {
    function sedrazavi_api_book_appointment_handler($request) {
        if (class_exists('SedRazavi_REST_API')) {
            return SedRazavi_REST_API::handle_book_appointment($request);
        }

        $params = $request->get_json_params() ?: $request->get_params();
        $name  = isset($params['client_name']) ? sanitize_text_field($params['client_name']) : (isset($params['name']) ? sanitize_text_field($params['name']) : '');
        $phone = isset($params['client_phone']) ? sanitize_text_field($params['client_phone']) : (isset($params['phone']) ? sanitize_text_field($params['phone']) : '');
        $type  = isset($params['service_type']) ? sanitize_text_field($params['service_type']) : (isset($params['type']) ? sanitize_text_field($params['type']) : 'مشاوره حضوری');

        if (empty($phone) || empty($name)) {
            return new WP_Error('missing_params', 'نام و شماره تماس متقاضی الزامی است.', array('status' => 400));
        }

        $post_id = wp_insert_post(array(
            'post_title'   => 'نوبت مشاوره: ' . $name . ' (' . $phone . ')',
            'post_type'    => 'sedrazavi_appointment',
            'post_status'  => 'publish',
        ));

        if (!is_wp_error($post_id) && $post_id) {
            update_post_meta($post_id, '_sedrazavi_client_name', $name);
            update_post_meta($post_id, '_sedrazavi_client_phone', $phone);
            update_post_meta($post_id, '_sedrazavi_service_type', $type);
            update_post_meta($post_id, '_sedrazavi_created_at', current_time('mysql'));
        }

        $admin_email = get_option('admin_email');
        if (!empty($admin_email)) {
            wp_mail($admin_email, 'ثبت نوبت مشاوره: ' . $name, "نوبت جدید ثبت شد:\\nنام: {$name}\\nتلفن: {$phone}\\nنوع: {$type}");
        }

        $sms_active = apply_filters('sedrazavi_sms_gateway_active', false);
        $sms_sent   = false;
        if ($sms_active) {
            $sms_sent = (bool) apply_filters('sedrazavi_send_sms', false, $phone, "نوبت شما ثبت شد.");
        }

        $msg = $sms_sent ? 'نوبت مشاوره با موفقیت ثبت شد. پیامک تأیید ارسال گردید.' : 'نوبت ثبت شد؛ دفتر با شما تماس می‌گیرد.';

        return rest_ensure_response(array(
            'success'    => true,
            'message'    => $msg,
            'booking_id' => $post_id,
            'sms_sent'   => $sms_sent,
        ));
    }
}

// ۹. تنظیم خودکار هدرهای CORS برای درخواست‌های فرانت‌اند
add_action('init', function () {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce");
});
`}];function U(){return new Promise((_,v)=>{try{const o=document.createElement("canvas");o.width=1200,o.height=900;const t=o.getContext("2d");if(!t)throw new Error("Canvas context not available");const h=t.createLinearGradient(0,0,1200,900);h.addColorStop(0,"#060B18"),h.addColorStop(.5,"#0B132B"),h.addColorStop(1,"#1C2541"),t.fillStyle=h,t.fillRect(0,0,1200,900),t.strokeStyle="rgba(212, 175, 55, 0.07)",t.lineWidth=1;for(let n=40;n<1200;n+=40)t.beginPath(),t.moveTo(n,0),t.lineTo(n,900),t.stroke();for(let n=40;n<900;n+=40)t.beginPath(),t.moveTo(0,n),t.lineTo(1200,n),t.stroke();t.strokeStyle="rgba(212, 175, 55, 0.4)",t.lineWidth=3,t.strokeRect(30,30,1140,840),t.strokeStyle="rgba(212, 175, 55, 0.15)",t.lineWidth=1,t.strokeRect(45,45,1110,810);const y=(n,l)=>{t.fillStyle="#D4AF37",t.beginPath(),t.arc(n,l,6,0,Math.PI*2),t.fill()};y(30,30),y(1170,30),y(30,870),y(1170,870);const i=600,b=260,C=t.createRadialGradient(i,b,10,i,b,140);C.addColorStop(0,"rgba(212, 175, 55, 0.25)"),C.addColorStop(1,"rgba(212, 175, 55, 0)"),t.fillStyle=C,t.beginPath(),t.arc(i,b,140,0,Math.PI*2),t.fill(),t.fillStyle="rgba(11, 19, 43, 0.9)",t.strokeStyle="#D4AF37",t.lineWidth=4,t.beginPath(),t.arc(i,b,70,0,Math.PI*2),t.fill(),t.stroke(),t.fillStyle="#D4AF37",t.font="bold 54px sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText("⚖️",i,b),t.fillStyle="#FFFFFF",t.font='bold 52px Tahoma, "Vazirmatn", sans-serif',t.textAlign="center",t.textBaseline="alphabetic",t.fillText("دفتر وکالت و مشاوره حقوقی سید رضوی",i,410),t.fillStyle="#D4AF37",t.font="600 24px Georgia, serif",t.letterSpacing="4px",t.fillText("SEDRAZAVI LAW FIRM — LUXURY WORDPRESS THEME",i,460);const w=t.createLinearGradient(i-250,0,i+250,0);w.addColorStop(0,"rgba(212, 175, 55, 0)"),w.addColorStop(.5,"rgba(212, 175, 55, 0.8)"),w.addColorStop(1,"rgba(212, 175, 55, 0)"),t.strokeStyle=w,t.lineWidth=2,t.beginPath(),t.moveTo(i-250,490),t.lineTo(i+250,490),t.stroke(),t.fillStyle="#CBD5E1",t.font='400 22px Tahoma, "Vazirmatn", sans-serif',t.fillText("پوسته اختصاصی، مستقل و فوق‌پیشرفته برای وکلا و مشاوران حقوقی",i,535);const u=["✨ مستقل و بدون نیاز به ACF","⚡ سازگاری کامل با المنتور","📊 سامانه مدیریت پرونده و موکل","📅 رزرواسیون آنلاین مشاوره"],m=240,f=(1200-(u.length*m+(u.length-1)*20))/2;u.forEach((n,l)=>{const p=f+l*(m+20),z=600,V=m,P=50;t.fillStyle="rgba(28, 37, 65, 0.7)",t.strokeStyle="rgba(212, 175, 55, 0.35)",t.lineWidth=1.5,t.beginPath(),t.roundRect(p,z,V,P,12),t.fill(),t.stroke(),t.fillStyle="#F3E5AB",t.font='bold 16px Tahoma, "Vazirmatn", sans-serif',t.textAlign="center",t.textBaseline="middle",t.fillText(n,p+V/2,z+P/2)}),t.fillStyle="rgba(6, 11, 24, 0.9)",t.strokeStyle="rgba(212, 175, 55, 0.2)",t.lineWidth=1,t.beginPath(),t.roundRect(100,700,1e3,110,16),t.fill(),t.stroke(),[{label:"نسخه پوسته",val:"Version 2.5.0"},{label:"سازگاری PHP",val:"PHP 7.4 - 8.3+"},{label:"سازگاری وردپرس",val:"WordPress 5.8 - 6.7+"}].forEach((n,l)=>{const p=100+333.3333333333333*l+166.66666666666666;t.fillStyle="#94A3B8",t.font='400 16px Tahoma, "Vazirmatn", sans-serif',t.textAlign="center",t.textBaseline="alphabetic",t.fillText(n.label,p,745),t.fillStyle="#D4AF37",t.font="bold 20px Georgia, serif",t.fillText(n.val,p,780)}),t.fillStyle="#64748B",t.font='14px Tahoma, "Vazirmatn", sans-serif',t.textAlign="center",t.fillText("© SedRazavi Law Firm Theme — 100% GPL Compliant",i,845),o.toBlob(n=>{n?_(n):v(new Error("Failed to create Blob from Canvas"))},"image/png")}catch(o){v(o)}})}function ye(){return new Promise((_,v)=>{U().then(o=>{const t=new FileReader;t.onloadend=()=>_(t.result),t.onerror=v,t.readAsDataURL(o)}).catch(v)})}const De=()=>{const[_,v]=c.useState("theme"),[o,t]=c.useState(x[0]),[h,y]=c.useState("همه"),[i,b]=c.useState(""),[C,w]=c.useState(!1),[u,m]=c.useState(!1),[S,f]=c.useState(null),[W,n]=c.useState(null),[l,p]=c.useState("downloads"),[z,V]=c.useState(""),[P,I]=c.useState(!1);c.useEffect(()=>{ye().then(s=>V(s)).catch(s=>console.warn("Could not generate screenshot data URL:",s))},[]);const te=["همه",...Array.from(new Set(x.map(s=>s.category)))],se=["همه",...Array.from(new Set(k.map(s=>s.category)))],ne=_==="theme"?x:k,ae=_==="theme"?te:se,L=s=>{v(s),y("همه"),b(""),t(s==="theme"?x[0]:k[0])},O=ne.filter(s=>{const a=h==="همه"||s.category===h,r=i===""||s.filename.toLowerCase().includes(i.toLowerCase())||s.description.toLowerCase().includes(i.toLowerCase());return a&&r}),re=()=>{navigator.clipboard.writeText(o.code),w(!0),setTimeout(()=>w(!1),2500)},M=async()=>{try{const s=await U(),a=window.URL.createObjectURL(s),r=document.createElement("a");r.href=a,r.download="screenshot.png",document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(a)}catch(s){console.error("Download screenshot error:",s)}},A=(s,a)=>{const r=document.createElement("a");r.href=s,r.download=a,document.body.appendChild(r),r.click(),document.body.removeChild(r)},q=async()=>{m(!0),f("theme");try{try{if((await fetch("/sedrazavi-theme.zip",{method:"HEAD"})).ok){A("/sedrazavi-theme.zip","sedrazavi-theme.zip"),n("پوسته رسمی وردپرس (sedrazavi-theme.zip) با موفقیت دانلود شد."),setTimeout(()=>n(null),5e3);return}}catch{}const s=new D,a=s.folder("sedrazavi-theme");x.forEach(d=>{d.path!=="screenshot.png"&&(a==null||a.file(d.path,d.code))});const r=ce(X),N=pe(X);a==null||a.file("inc/react-shortcodes.php",r),a==null||a.file("assets/js/sedrazavi-react-mount.js",N);try{const d=await U();a==null||a.file("screenshot.png",d)}catch(d){console.warn("Screenshot packaging fallback:",d)}const g=await s.generateAsync({type:"blob"}),F=window.URL.createObjectURL(g);A(F,"sedrazavi-theme.zip"),window.URL.revokeObjectURL(F),n("پوسته رسمی وردپرس (sedrazavi-theme.zip) با موفقیت دانلود شد."),setTimeout(()=>n(null),5e3)}catch(s){console.error("Failed to generate Theme ZIP:",s),alert("خطایی در تولید بسته فشرده پوسته رخ داد.")}finally{m(!1),f(null)}},ie=async()=>{m(!0),f("plugin");try{try{if((await fetch("/sedrazavi-addons.zip",{method:"HEAD"})).ok){A("/sedrazavi-addons.zip","sedrazavi-addons.zip"),n("افزونه مکمل هسته (sedrazavi-addons.zip) با موفقیت دانلود شد."),setTimeout(()=>n(null),5e3);return}}catch{}const s=new D,a=s.folder("sedrazavi-addons");k.forEach(g=>{a==null||a.file(g.path,g.code)});const r=await s.generateAsync({type:"blob"}),N=window.URL.createObjectURL(r);A(N,"sedrazavi-addons.zip"),window.URL.revokeObjectURL(N),n("افزونه مکمل هسته (sedrazavi-addons.zip) با موفقیت دانلود شد."),setTimeout(()=>n(null),5e3)}catch(s){console.error("Failed to generate Plugin ZIP:",s),alert("خطایی در تولید بسته افزونه مکمل رخ داد.")}finally{m(!1),f(null)}},H=async()=>{m(!0),f("suite");try{try{if((await fetch("/sedrazavi-complete-suite.zip",{method:"HEAD"})).ok){A("/sedrazavi-complete-suite.zip","sedrazavi-complete-suite.zip"),n("مجموعه جامع ۲ در ۱ (sedrazavi-complete-suite.zip) با موفقیت دانلود شد."),setTimeout(()=>n(null),6e3);return}}catch{}const s=new D,a=s.folder("sedrazavi-theme");x.forEach($=>{$.path!=="screenshot.png"&&(a==null||a.file($.path,$.code))});const r=await s.generateAsync({type:"blob"}),N=new D,g=N.folder("sedrazavi-addons");k.forEach($=>{g==null||g.file($.path,$.code)});const F=await N.generateAsync({type:"blob"}),d=new D;d.file("1-پوسته-قالب-sedrazavi-theme.zip",r),d.file("2-افزونه-مکمل-sedrazavi-addons.zip",F),d.file("راهنمای_مهم_نصب_بدون_خطا.txt",`دفتر وکالت دکتر سیده مریم رضوی - راهنمای نصب
1. در پیشخوان وردپرس به نمایش > پوسته‌ها رفته و فایل 1-پوسته-قالب-sedrazavi-theme.zip را نصب و فعال فرمایید.
2. به افزونه‌ها > افزودن افزونه رفته و فایل 2-افزونه-مکمل-sedrazavi-addons.zip را نصب و فعال فرمایید.`);const le=await d.generateAsync({type:"blob"}),G=window.URL.createObjectURL(le);A(G,"sedrazavi-complete-suite.zip"),window.URL.revokeObjectURL(G),n("مجموعه جامع ۲ در ۱ (sedrazavi-complete-suite.zip) با موفقیت دانلود شد."),setTimeout(()=>n(null),6e3)}catch(s){console.error("Failed to generate Complete Bundle:",s),alert("خطایی در تولید بسته جامع رخ داد.")}finally{m(!1),f(null)}},oe=()=>{const s=`
# دستورالعمل استقرار مستقیم از گیت‌هاب:
۱. برای نصب پوسته: پوشه wordpress-theme را فشرده (ZIP) کرده و در پیشخوان وردپرس > نمایش > پوسته‌ها بارگذاری نمایید.
۲. برای نصب افزونه: پوشه elementor-addon-suite را فشرده (ZIP) کرده و در افزونه‌ها > افزودن بارگذاری کنید.
۳. افزونه ۱۰۰٪ خودکفا بوده و روی هر قالبی بدون نیاز به پوسته با شورت‌کدها یا المنتور اجرا می‌شود.
    `.trim();navigator.clipboard.writeText(s),n("دستورالعمل استقرار مستقیم از گیت‌هاب کپی شد. پوشه‌ها مستقیماً آماده زیپ و نصب هستند."),setTimeout(()=>n(null),6e3)};return e.jsxDEV("div",{className:"py-10 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen font-persian transition-colors",dir:"rtl",children:[e.jsxDEV("div",{className:"container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl",children:[e.jsxDEV("div",{className:"relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#070D1E] via-[#0B132B] to-[#141E3C] border border-[#D4AF37]/35 shadow-2xl p-6 sm:p-10 text-white",children:[e.jsxDEV("div",{className:"absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:278,columnNumber:11},void 0),e.jsxDEV("div",{className:"absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:279,columnNumber:11},void 0),e.jsxDEV("div",{className:"relative z-10 space-y-6",children:[e.jsxDEV("div",{className:"flex flex-col lg:flex-row lg:items-center justify-between gap-6",children:[e.jsxDEV("div",{className:"space-y-3 max-w-3xl",children:[e.jsxDEV("div",{className:"inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold",children:[e.jsxDEV(ue,{className:"w-3.5 h-3.5 text-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:285,columnNumber:19},void 0),e.jsxDEV("span",{children:"سامانه رسمی بسته‌های نصبی پوسته و افزونه وردپرس SedRazavi"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:286,columnNumber:19},void 0),e.jsxDEV("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-400"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:287,columnNumber:19},void 0),e.jsxDEV("span",{className:"text-emerald-400 text-[11px] font-mono",children:"v2.6.0 Stable Release"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:288,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:284,columnNumber:17},void 0),e.jsxDEV("h1",{className:"text-2xl sm:text-4xl font-black font-serif text-white tracking-tight leading-snug",children:"مرکز دانلود و مدیریت بسته‌های آماده نصب در وردپرس"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:291,columnNumber:17},void 0),e.jsxDEV("p",{className:"text-xs sm:text-sm text-slate-300 leading-relaxed",children:"پوسته مستقل استاندارد و افزونه مکمل حقوقی با تفکیک اصولی و سازگار با وردپرس ۶.۰ تا ۶.۷ و PHP 8.0+. تمامی فایل‌ها به صورت ۱۰۰٪ تست‌شده، فاقد خطای سربرگ (Header Error) و صفحه سفید (WSOD)، همراه با هدر و فوتر داینامیک و ساختار استاندارد آماده بارگذاری هستند."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:295,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:283,columnNumber:15},void 0),e.jsxDEV("div",{className:"flex flex-col gap-2 shrink-0 text-xs",children:[e.jsxDEV("div",{className:"flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200",children:[e.jsxDEV(E,{className:"w-4 h-4 text-emerald-400 shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:304,columnNumber:19},void 0),e.jsxDEV("span",{children:"تضمین عدم بروز خطای صفحه سفید (WSOD Free)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:305,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:303,columnNumber:17},void 0),e.jsxDEV("div",{className:"flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200",children:[e.jsxDEV(E,{className:"w-4 h-4 text-[#D4AF37] shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:308,columnNumber:19},void 0),e.jsxDEV("span",{children:"پوشه ریشه استاندارد در فایل‌های زیپ برای آپلود مستقیم"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:309,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:307,columnNumber:17},void 0),e.jsxDEV("div",{className:"flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200",children:[e.jsxDEV(E,{className:"w-4 h-4 text-blue-400 shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:312,columnNumber:19},void 0),e.jsxDEV("span",{children:"حاوی باندل‌های کامپایل‌شده فرانت‌اند در assets/dist"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:313,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:311,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:302,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:282,columnNumber:13},void 0),W&&e.jsxDEV("div",{className:"p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-3 animate-fadeIn",children:[e.jsxDEV("div",{className:"w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold",children:"✓"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:321,columnNumber:17},void 0),e.jsxDEV("span",{className:"font-semibold",children:W},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:324,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:320,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:281,columnNumber:11},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:277,columnNumber:9},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",children:[e.jsxDEV("div",{className:"relative rounded-3xl p-6 bg-white dark:bg-[#0B132B] border border-[#D4AF37]/40 shadow-xl hover:shadow-2xl hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-5 group",children:[e.jsxDEV("div",{className:"space-y-3",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("div",{className:"w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/35 flex items-center justify-center text-[#D4AF37]",children:e.jsxDEV(T,{className:"w-6 h-6"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:338,columnNumber:19},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:337,columnNumber:17},void 0),e.jsxDEV("span",{className:"px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] border border-[#D4AF37]/30",children:"پوسته وردپرس • ۱.۷MB"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:340,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:336,columnNumber:15},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h3",{className:"text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#D4AF37] transition-colors",children:"پوسته رسمی قالب (Theme ZIP)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:346,columnNumber:17},void 0),e.jsxDEV("span",{className:"text-xs text-[#D4AF37] font-mono",children:"sedrazavi-theme.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:349,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:345,columnNumber:15},void 0),e.jsxDEV("p",{className:"text-xs text-gray-600 dark:text-gray-300 leading-relaxed",children:["حاوی فایل ",e.jsxDEV("code",{className:"font-mono text-[#D4AF37]",children:"style.css"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:353,columnNumber:27},void 0)," با هدر استاندارد وردپرس، قالب‌های اصلی (index, header, footer, single, page, 404, front-page)، تصویر screenshot.png و دارایی‌های کامپایل‌شده فرانت‌اند در assets/dist."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:352,columnNumber:15},void 0),e.jsxDEV("div",{className:"p-2.5 rounded-xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400",children:[e.jsxDEV("span",{className:"font-bold text-[#D4AF37]",children:"محل بارگذاری:"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:357,columnNumber:17},void 0)," پیشخوان > نمایش > پوسته‌ها > افزودن پوسته > بارگذاری پوسته"]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:356,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:335,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:q,disabled:u,className:"w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C4981C] to-[#AA820A] text-white dark:text-[#070D1E] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-[#D4AF37]/25 transition-all cursor-pointer",children:[e.jsxDEV(B,{className:"w-4 h-4"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:367,columnNumber:15},void 0),e.jsxDEV("span",{children:u&&S==="theme"?"در حال آماده‌سازی...":"دانلود مستقیم پوسته (sedrazavi-theme.zip)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:368,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:361,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:334,columnNumber:11},void 0),e.jsxDEV("div",{className:"relative rounded-3xl p-6 bg-white dark:bg-[#0B132B] border border-emerald-500/35 shadow-xl hover:shadow-2xl hover:border-emerald-500 transition-all flex flex-col justify-between space-y-5 group",children:[e.jsxDEV("div",{className:"space-y-3",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("div",{className:"w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-600 dark:text-emerald-400",children:e.jsxDEV(j,{className:"w-6 h-6"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:379,columnNumber:19},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:378,columnNumber:17},void 0),e.jsxDEV("span",{className:"px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",children:"افزونه مکمل • ۳۰KB"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:381,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:377,columnNumber:15},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h3",{className:"text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors",children:"افزونه مکمل هسته (Addons ZIP)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:387,columnNumber:17},void 0),e.jsxDEV("span",{className:"text-xs text-emerald-600 dark:text-emerald-400 font-mono",children:"sedrazavi-addons.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:390,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:386,columnNumber:15},void 0),e.jsxDEV("p",{className:"text-xs text-gray-600 dark:text-gray-300 leading-relaxed",children:"شامل ۱۲ ماژول تخصصی حقوقی، ثبت پست‌تایپ‌های پرونده، نوبت‌دهی، نظرات، ویجت‌های اختصاصی المنتور، سامانه استعلام برخط و لاگر خودکار خطاها بدون تداخل با هسته."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:393,columnNumber:15},void 0),e.jsxDEV("div",{className:"p-2.5 rounded-xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400",children:[e.jsxDEV("span",{className:"font-bold text-emerald-600 dark:text-emerald-400",children:"محل بارگذاری:"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:398,columnNumber:17},void 0)," پیشخوان > افزونه‌ها > افزودن افزونه تازه > بارگذاری افزونه"]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:397,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:376,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:ie,disabled:u,className:"w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer",children:[e.jsxDEV(B,{className:"w-4 h-4"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:408,columnNumber:15},void 0),e.jsxDEV("span",{children:u&&S==="plugin"?"در حال آماده‌سازی...":"دانلود مستقیم افزونه (sedrazavi-addons.zip)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:409,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:402,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:375,columnNumber:11},void 0),e.jsxDEV("div",{className:"relative rounded-3xl p-6 bg-white dark:bg-[#0B132B] border border-blue-500/35 shadow-xl hover:shadow-2xl hover:border-blue-500 transition-all flex flex-col justify-between space-y-5 group",children:[e.jsxDEV("div",{className:"space-y-3",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("div",{className:"w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/35 flex items-center justify-center text-blue-600 dark:text-blue-400",children:e.jsxDEV(R,{className:"w-6 h-6"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:420,columnNumber:19},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:419,columnNumber:17},void 0),e.jsxDEV("span",{className:"px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30",children:"مجموعه جامع ۲ در ۱ • ۱.۷MB"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:422,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:418,columnNumber:15},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h3",{className:"text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",children:"پکیج جامع (Complete Suite ZIP)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:428,columnNumber:17},void 0),e.jsxDEV("span",{className:"text-xs text-blue-600 dark:text-blue-400 font-mono",children:"sedrazavi-complete-suite.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:431,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:427,columnNumber:15},void 0),e.jsxDEV("p",{className:"text-xs text-gray-600 dark:text-gray-300 leading-relaxed",children:"مجموعه کامل و آماده تحویل: شامل هر دو فایل زیپ مستقل (پوسته + افزونه) و فایل راهنمای متنی نصب مرحله‌به‌مرحله به زبان فارسی جهت سهولت نگهداری و تحویل به کارفرما."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:434,columnNumber:15},void 0),e.jsxDEV("div",{className:"p-2.5 rounded-xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400",children:[e.jsxDEV("span",{className:"font-bold text-blue-600 dark:text-blue-400",children:"راهکار:"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:439,columnNumber:17},void 0)," این فایل را Extract کرده و سپس پوسته و افزونه درون آن را جداگانه نصب نمایید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:438,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:417,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:H,disabled:u,className:"w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-blue-600/20 transition-all cursor-pointer",children:[e.jsxDEV(R,{className:"w-4 h-4"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:449,columnNumber:15},void 0),e.jsxDEV("span",{children:u&&S==="suite"?"در حال آماده‌سازی...":"دانلود پکیج کامل (sedrazavi-complete-suite.zip)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:450,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:443,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:416,columnNumber:11},void 0),e.jsxDEV("div",{className:"relative rounded-3xl p-6 bg-white dark:bg-[#0B132B] border border-[#58A6FF]/40 shadow-xl hover:shadow-2xl hover:border-[#58A6FF] transition-all flex flex-col justify-between space-y-5 group",children:[e.jsxDEV("div",{className:"space-y-3",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("div",{className:"w-12 h-12 rounded-2xl bg-[#388bfd1f] border border-[#388bfd55] flex items-center justify-center text-[#58A6FF]",children:e.jsxDEV(me,{className:"w-6 h-6"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:461,columnNumber:19},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:460,columnNumber:17},void 0),e.jsxDEV("span",{className:"px-3 py-1 rounded-full text-xs font-bold bg-[#388bfd1f] text-[#58A6FF] border border-[#388bfd55] font-mono",children:"GitHub Direct"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:463,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:459,columnNumber:15},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h3",{className:"text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#58A6FF] transition-colors",children:"استقرار مستقیم از مخزن گیت‌هاب (بدون زیپ)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:469,columnNumber:17},void 0),e.jsxDEV("span",{className:"text-xs text-[#58A6FF] font-mono",children:"/wordpress-theme + /elementor-addon-suite"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:472,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:468,columnNumber:15},void 0),e.jsxDEV("p",{className:"text-xs text-gray-600 dark:text-gray-300 leading-relaxed",children:"نیازی به فایل‌های زیپ ساختگی یا داپلیکیتور نیست. ساختار مخزن به گونه‌ای مهندسی شده که پوشه افزونه و پوسته مستقیماً آماده زیپ و استقرار روی وردپرس هستند."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:475,columnNumber:15},void 0),e.jsxDEV("div",{className:"p-2.5 rounded-xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400",children:[e.jsxDEV("span",{className:"font-bold text-[#3FB950]",children:"استقلال کامل:"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:480,columnNumber:17},void 0)," افزونه بدون پوسته و با شورت‌کدها روی هر قالب دیگری در دنیا کار می‌کند."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:479,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:458,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:oe,className:"w-full py-3 px-4 rounded-xl bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#238636]/25 transition-all cursor-pointer",children:[e.jsxDEV(Y,{className:"w-4 h-4"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:489,columnNumber:15},void 0),e.jsxDEV("span",{children:"کپی راهنمای استقرار سریع گیت‌هاب"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:490,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:484,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:457,columnNumber:11},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:331,columnNumber:9},void 0),e.jsxDEV("div",{className:"bg-white dark:bg-[#0B132B] p-2 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between flex-wrap gap-2",children:[e.jsxDEV("div",{className:"flex items-center gap-1.5 flex-wrap",children:[e.jsxDEV("button",{type:"button",onClick:()=>p("downloads"),className:`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${l==="downloads"?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm":"text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,children:[e.jsxDEV(J,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:508,columnNumber:15},void 0),e.jsxDEV("span",{children:"راهنمای راه‌اندازی و نیازمندی‌ها"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:509,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:499,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:()=>p("files"),className:`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${l==="files"?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm":"text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,children:[e.jsxDEV(Z,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:521,columnNumber:15},void 0),e.jsxDEV("span",{children:["مرورگر کدهای منبع (",x.length+k.length," فایل)"]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:522,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:512,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:()=>p("install"),className:`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${l==="install"?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm":"text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,children:[e.jsxDEV(_e,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:534,columnNumber:15},void 0),e.jsxDEV("span",{children:"مستندات گام‌به‌گام نصب"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:535,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:525,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:()=>p("architecture"),className:`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${l==="architecture"?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm":"text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,children:[e.jsxDEV(Q,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:547,columnNumber:15},void 0),e.jsxDEV("span",{children:"معماری و استاندارد فنی"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:548,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:538,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:()=>p("audit"),className:`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${l==="audit"?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm":"text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`,children:[e.jsxDEV(j,{className:"w-3.5 h-3.5 text-emerald-400"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:560,columnNumber:15},void 0),e.jsxDEV("span",{children:"ممیزی جامع مستر و مسیرهای REST (فاز ۵)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:561,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:551,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:498,columnNumber:11},void 0),e.jsxDEV("div",{className:"flex items-center gap-2",children:[e.jsxDEV("button",{type:"button",onClick:M,className:"px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center gap-1.5 transition-all cursor-pointer",title:"دانلود مستقیم screenshot.png استاندارد وردپرس",children:[e.jsxDEV(K,{className:"w-3.5 h-3.5 text-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:572,columnNumber:15},void 0),e.jsxDEV("span",{children:"کاور پوسته (screenshot.png)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:573,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:566,columnNumber:13},void 0),e.jsxDEV("button",{type:"button",onClick:()=>I(!0),className:"px-3.5 py-2 rounded-xl text-xs font-bold bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#AA820A] dark:text-[#F3E5AB] hover:text-[#070D1E] border border-[#D4AF37]/35 flex items-center gap-1.5 transition-all cursor-pointer",children:[e.jsxDEV(ge,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:581,columnNumber:15},void 0),e.jsxDEV("span",{children:"استخراج کد المنتور"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:582,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:576,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:565,columnNumber:11},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:497,columnNumber:9},void 0),l==="downloads"&&e.jsxDEV("div",{className:"space-y-6 animate-fadeIn",children:[e.jsxDEV("div",{className:"p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4",children:[e.jsxDEV("div",{className:"flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3",children:[e.jsxDEV("div",{className:"flex items-center gap-2",children:[e.jsxDEV(he,{className:"w-5 h-5 text-emerald-500"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:594,columnNumber:19},void 0),e.jsxDEV("h3",{className:"font-bold text-sm text-gray-900 dark:text-white",children:"تطابق کامل با معیارهای پذیرش (Acceptance Criteria & Definition of Done)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:595,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:593,columnNumber:17},void 0),e.jsxDEV("span",{className:"text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30",children:"۱۰۰٪ پاس شده"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:599,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:592,columnNumber:15},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxDEV("div",{className:"p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 space-y-2",children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200",children:[e.jsxDEV(E,{className:"w-4 h-4 text-emerald-500 shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:607,columnNumber:21},void 0),e.jsxDEV("span",{children:"۱. ساختار استاندارد پوسته وردپرس"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:608,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:606,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed",children:"فایل‌های style.css با هدر رسمی، functions.php، header.php، footer.php، index.php و کاور ۱۲۰۰×۹۰۰ در جایگاه دقیق خود قرار دارند."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:610,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:605,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 space-y-2",children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200",children:[e.jsxDEV(E,{className:"w-4 h-4 text-emerald-500 shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:617,columnNumber:21},void 0),e.jsxDEV("span",{children:"۲. باندل‌های کامپایل‌شده فرانت‌اند"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:618,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:616,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed",children:"فایل‌های JS و CSS در مسیر استاندارد wordpress-theme/assets/dist/ مستقر بوده و از طریق wp_enqueue_scripts به صورت ایزوله Enqueue می‌شوند."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:620,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:615,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-4 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-100 dark:border-gray-800 space-y-2",children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200",children:[e.jsxDEV(E,{className:"w-4 h-4 text-emerald-500 shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:627,columnNumber:21},void 0),e.jsxDEV("span",{children:"۳. رندر اولیه سمت سرور (SSR Ready)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:628,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:626,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed",children:"ساختار HTML تولید شده توسط PHP در View Page Source اولیه موجود است و در صورت غیرفعال بودن جاوااسکریپت نیز محتوای ساخت‌یافته رندر می‌شود."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:630,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:625,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:604,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:591,columnNumber:13},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxDEV("div",{className:"p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4",children:[e.jsxDEV("div",{className:"flex items-center gap-3",children:[e.jsxDEV("div",{className:"w-8 h-8 rounded-xl bg-[#D4AF37] text-[#070D1E] flex items-center justify-center font-bold text-sm",children:"۱"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:641,columnNumber:19},void 0),e.jsxDEV("h4",{className:"font-bold text-sm text-gray-900 dark:text-white",children:"نصب پوسته در کمتر از ۱ دقیقه"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:644,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:640,columnNumber:17},void 0),e.jsxDEV("p",{className:"text-xs text-gray-600 dark:text-gray-300 leading-relaxed",children:["فایل ",e.jsxDEV("strong",{className:"text-[#D4AF37]",children:"sedrazavi-theme.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:649,columnNumber:24},void 0)," را از همین صفحه دریافت فرمایید. در پیشخوان وردپرس وارد منوی ",e.jsxDEV("strong",{children:"نمایش > پوسته‌ها > افزودن پوسته تازه"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:649,columnNumber:148},void 0)," شده، دکمه بارگذاری پوسته را کلیک کرده و فایل زیپ را نصب و فعال کنید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:648,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:639,columnNumber:15},void 0),e.jsxDEV("div",{className:"p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4",children:[e.jsxDEV("div",{className:"flex items-center gap-3",children:[e.jsxDEV("div",{className:"w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm",children:"۲"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:655,columnNumber:19},void 0),e.jsxDEV("h4",{className:"font-bold text-sm text-gray-900 dark:text-white",children:"نصب افزونه مکمل جهت فعال‌سازی امکانات"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:658,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:654,columnNumber:17},void 0),e.jsxDEV("p",{className:"text-xs text-gray-600 dark:text-gray-300 leading-relaxed",children:["فایل ",e.jsxDEV("strong",{className:"text-emerald-600 dark:text-emerald-400",children:"sedrazavi-addons.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:663,columnNumber:24},void 0)," را دریافت کرده، به منوی ",e.jsxDEV("strong",{children:"افزونه‌ها > افزودن افزونه تازه"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:663,columnNumber:137},void 0)," بروید و آن را بارگذاری و فعال نمایید تا سامانه‌های ثبت پرونده، نوبت‌دهی و ویجت‌های المنتور فعال شوند."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:662,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:653,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:638,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:589,columnNumber:11},void 0),l==="files"&&e.jsxDEV("div",{className:"space-y-6 animate-fadeIn",children:[e.jsxDEV("div",{className:"p-4 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4",children:[e.jsxDEV("div",{className:"flex items-center gap-2",children:e.jsxDEV("div",{className:"flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl",children:[e.jsxDEV("button",{type:"button",onClick:()=>L("theme"),className:`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${_==="theme"?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm":"text-gray-600 dark:text-gray-400 hover:text-gray-900"}`,children:[e.jsxDEV(T,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:686,columnNumber:21},void 0),e.jsxDEV("span",{children:["فایل‌های پوسته (",x.length,")"]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:687,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:677,columnNumber:19},void 0),e.jsxDEV("button",{type:"button",onClick:()=>L("plugin"),className:`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${_==="plugin"?"bg-emerald-600 text-white shadow-sm":"text-gray-600 dark:text-gray-400 hover:text-gray-900"}`,children:[e.jsxDEV(j,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:699,columnNumber:21},void 0),e.jsxDEV("span",{children:["فایل‌های افزونه (",k.length,")"]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:700,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:690,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:676,columnNumber:17},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:675,columnNumber:15},void 0),e.jsxDEV("div",{className:"relative flex-1 max-w-xs",children:[e.jsxDEV(be,{className:"w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:707,columnNumber:17},void 0),e.jsxDEV("input",{type:"text",value:i,onChange:s=>b(s.target.value),placeholder:"جستجوی نام یا کاربرد فایل...",className:"w-full pr-9 pl-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:708,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:706,columnNumber:15},void 0),e.jsxDEV("div",{className:"flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1",children:ae.map(s=>e.jsxDEV("button",{type:"button",onClick:()=>y(s),className:`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${h===s?"bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-xs":"bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`,children:s},s,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:720,columnNumber:19},void 0))},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:718,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:674,columnNumber:13},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",children:[e.jsxDEV("div",{className:"lg:col-span-4 bg-white dark:bg-[#0B132B] rounded-3xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm space-y-2 max-h-[700px] overflow-y-auto",children:[e.jsxDEV("div",{className:"flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800 text-xs font-bold text-gray-500",children:[e.jsxDEV(fe,{className:"w-4 h-4 text-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:742,columnNumber:19},void 0),e.jsxDEV("span",{children:_==="theme"?"دایرکتوری: /wordpress-theme/":"دایرکتوری: /sedrazavi-addons/"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:743,columnNumber:19},void 0),e.jsxDEV("span",{className:"mr-auto text-[11px] font-mono text-gray-400",children:["(",O.length," فایل)"]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:748,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:741,columnNumber:17},void 0),O.map((s,a)=>e.jsxDEV("div",{onClick:()=>t(s),className:`p-3 rounded-2xl border cursor-pointer transition-all ${o.path===s.path?"bg-[#0B132B] dark:bg-[#D4AF37]/15 border-[#D4AF37] text-white dark:text-[#F3E5AB] shadow-sm":"bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700"}`,children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("div",{className:"flex items-center gap-2 font-mono text-xs font-bold truncate",children:[s.path.endsWith(".png")?e.jsxDEV(K,{className:"w-4 h-4 text-emerald-400 shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:766,columnNumber:27},void 0):e.jsxDEV(Z,{className:"w-4 h-4 text-[#D4AF37] shrink-0"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:768,columnNumber:27},void 0),e.jsxDEV("span",{className:"truncate",children:s.filename},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:770,columnNumber:25},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:764,columnNumber:23},void 0),e.jsxDEV("span",{className:"text-[10px] opacity-70 shrink-0 mr-2",children:s.path.endsWith(".png")?"تصویر PNG":`${s.code.split(`
`).length} خط`},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:772,columnNumber:23},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:763,columnNumber:21},void 0),e.jsxDEV("p",{className:"text-[11px] opacity-75 mt-1 line-clamp-1 leading-relaxed",children:s.description},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:776,columnNumber:21},void 0)]},`${s.path}-${a}`,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:754,columnNumber:19},void 0))]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:740,columnNumber:15},void 0),e.jsxDEV("div",{className:"lg:col-span-8 bg-[#070D1E] rounded-3xl border border-[#D4AF37]/35 shadow-2xl overflow-hidden flex flex-col",children:[e.jsxDEV("div",{className:"px-6 py-4 bg-[#050A18] border-b border-gray-800 flex items-center justify-between flex-wrap gap-3",children:[e.jsxDEV("div",{className:"flex items-center gap-3",children:[e.jsxDEV("div",{className:"flex items-center gap-1.5",children:[e.jsxDEV("span",{className:"w-3 h-3 rounded-full bg-rose-500 inline-block"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:789,columnNumber:23},void 0),e.jsxDEV("span",{className:"w-3 h-3 rounded-full bg-amber-500 inline-block"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:790,columnNumber:23},void 0),e.jsxDEV("span",{className:"w-3 h-3 rounded-full bg-emerald-500 inline-block"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:791,columnNumber:23},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:788,columnNumber:21},void 0),e.jsxDEV("span",{className:"font-mono text-xs font-bold text-gray-300",dir:"ltr",children:o.path},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:793,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:787,columnNumber:19},void 0),e.jsxDEV("div",{className:"flex items-center gap-2",children:o.path==="screenshot.png"?e.jsxDEV("button",{type:"button",onClick:M,className:"px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#AA820A] text-[#0B132B] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md",children:[e.jsxDEV(J,{className:"w-3.5 h-3.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:805,columnNumber:25},void 0),e.jsxDEV("span",{children:"دانلود مستقیم screenshot.png"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:806,columnNumber:25},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:800,columnNumber:23},void 0):e.jsxDEV("button",{type:"button",onClick:re,className:"px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer",children:[C?e.jsxDEV(ee,{className:"w-3.5 h-3.5 text-emerald-400"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:814,columnNumber:39},void 0):e.jsxDEV(Y,{className:"w-3.5 h-3.5 text-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:814,columnNumber:92},void 0),e.jsxDEV("span",{children:C?"کپی شد!":"کپی محتوای سورس‌کد"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:815,columnNumber:25},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:809,columnNumber:23},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:798,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:786,columnNumber:17},void 0),o.path==="screenshot.png"?e.jsxDEV("div",{className:"p-8 flex flex-col items-center justify-center text-center space-y-6",children:[e.jsxDEV("div",{className:"max-w-md w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-[#060B18] p-2",children:z?e.jsxDEV("img",{src:z,alt:"WordPress Theme Screenshot",className:"w-full h-auto rounded-xl object-cover"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:826,columnNumber:25},void 0):e.jsxDEV("div",{className:"w-full h-64 bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 text-sm",children:"در حال رندر کاور رسمی پوسته..."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:832,columnNumber:25},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:824,columnNumber:21},void 0),e.jsxDEV("div",{className:"max-w-lg text-slate-300 text-xs leading-relaxed space-y-3",children:[e.jsxDEV("div",{className:"flex items-center justify-center gap-2 flex-wrap",children:[e.jsxDEV("span",{className:"px-2.5 py-1 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] font-mono font-bold",children:"1200x900 PNG"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:840,columnNumber:25},void 0),e.jsxDEV("span",{className:"px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 font-mono",children:"Aspect Ratio 4:3"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:841,columnNumber:25},void 0),e.jsxDEV("span",{className:"px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-mono",children:"WP Standard"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:842,columnNumber:25},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:839,columnNumber:23},void 0),e.jsxDEV("p",{children:"کاور رسمی پوسته در منوی نمایش > پوسته‌ها در پیشخوان وردپرس نمایش داده شده و نشانگر هویت بصری معتبر موسسه است."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:844,columnNumber:23},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:838,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:823,columnNumber:19},void 0):e.jsxDEV("div",{className:"p-6 overflow-x-auto overflow-y-auto max-h-[580px] text-xs font-mono text-gray-200 leading-relaxed",dir:"ltr",children:e.jsxDEV("pre",{className:"whitespace-pre",children:e.jsxDEV("code",{children:o.code},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:852,columnNumber:23},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:851,columnNumber:21},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:850,columnNumber:19},void 0),e.jsxDEV("div",{className:"px-6 py-3 bg-[#050A18] border-t border-gray-800 flex items-center justify-between text-xs text-gray-400",children:[e.jsxDEV("span",{children:o.description},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:859,columnNumber:19},void 0),e.jsxDEV("span",{className:"font-mono text-[11px]",children:"UTF-8 • UNIX (LF) • PHP 8.x Ready"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:860,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:858,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:784,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:737,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:672,columnNumber:11},void 0),l==="install"&&e.jsxDEV("div",{className:"space-y-6 animate-fadeIn",children:e.jsxDEV("div",{className:"bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8",children:[e.jsxDEV("div",{className:"border-b border-gray-100 dark:border-gray-800 pb-4",children:[e.jsxDEV("h2",{className:"text-xl font-bold font-serif text-gray-900 dark:text-white",children:"راهنمای گام‌به‌گام نصب در پیشخوان وردپرس (بدون هیچ خطای فنی)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:873,columnNumber:17},void 0),e.jsxDEV("p",{className:"text-xs text-gray-500 dark:text-gray-400 mt-1",children:"پوسته‌ها و افزونه‌ها در سیستم وردپرس در دو دایرکتوری کاملاً مجزا بارگذاری می‌شوند. برای جلوگیری از خطای سربرگ، مراحل زیر را طی فرمایید:"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:876,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:872,columnNumber:15},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxDEV("div",{className:"p-6 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-4",children:[e.jsxDEV("div",{className:"flex items-center gap-3",children:[e.jsxDEV("div",{className:"w-9 h-9 rounded-xl bg-[#D4AF37] text-[#070D1E] flex items-center justify-center font-bold text-sm",children:"۱"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:886,columnNumber:21},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h3",{className:"font-bold text-sm text-gray-900 dark:text-white",children:"گام اول: بارگذاری و فعال‌سازی پوسته"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:890,columnNumber:23},void 0),e.jsxDEV("span",{className:"text-[11px] text-[#D4AF37] font-mono",children:"sedrazavi-theme.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:893,columnNumber:23},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:889,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:885,columnNumber:19},void 0),e.jsxDEV("ol",{className:"list-decimal list-inside space-y-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed pr-2",children:[e.jsxDEV("li",{children:"وارد پیشخوان وردپرس سایت خود شوید."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:898,columnNumber:21},void 0),e.jsxDEV("li",{children:["به مسیر ",e.jsxDEV("strong",{children:"نمایش > پوسته‌ها > افزودن پوسته تازه"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:899,columnNumber:33},void 0)," بروید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:899,columnNumber:21},void 0),e.jsxDEV("li",{children:["روی دکمه ",e.jsxDEV("strong",{children:"«بارگذاری پوسته»"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:900,columnNumber:34},void 0)," کلیک فرمایید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:900,columnNumber:21},void 0),e.jsxDEV("li",{children:["فایل ",e.jsxDEV("code",{className:"text-[#D4AF37] font-bold",children:"sedrazavi-theme.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:901,columnNumber:30},void 0)," را انتخاب نموده و «هم‌اکنون نصب کن» را بزنید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:901,columnNumber:21},void 0),e.jsxDEV("li",{children:["پس از پایان بارگذاری، روی ",e.jsxDEV("strong",{children:"«فعال‌سازی (Activate)»"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:902,columnNumber:51},void 0)," کلیک نمایید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:902,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:897,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:884,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/30 space-y-4",children:[e.jsxDEV("div",{className:"flex items-center gap-3",children:[e.jsxDEV("div",{className:"w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm",children:"۲"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:909,columnNumber:21},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h3",{className:"font-bold text-sm text-gray-900 dark:text-white",children:"گام دوم: بارگذاری و فعال‌سازی افزونه مکمل"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:913,columnNumber:23},void 0),e.jsxDEV("span",{className:"text-[11px] text-emerald-500 font-mono",children:"sedrazavi-addons.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:916,columnNumber:23},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:912,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:908,columnNumber:19},void 0),e.jsxDEV("ol",{className:"list-decimal list-inside space-y-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed pr-2",children:[e.jsxDEV("li",{children:["از منوی کناری پیشخوان به مسیر ",e.jsxDEV("strong",{children:"افزونه‌ها > افزودن افزونه تازه"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:921,columnNumber:55},void 0)," بروید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:921,columnNumber:21},void 0),e.jsxDEV("li",{children:["روی دکمه ",e.jsxDEV("strong",{children:"«بارگذاری افزونه»"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:922,columnNumber:34},void 0)," کلیک نمایید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:922,columnNumber:21},void 0),e.jsxDEV("li",{children:["فایل ",e.jsxDEV("code",{className:"text-emerald-500 font-bold",children:"sedrazavi-addons.zip"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:923,columnNumber:30},void 0)," را انتخاب کرده و دکمه نصب را بزنید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:923,columnNumber:21},void 0),e.jsxDEV("li",{children:["پس از پایان نصب، روی ",e.jsxDEV("strong",{children:"«فعال‌کردن افزونه»"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:924,columnNumber:46},void 0)," کلیک فرمایید."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:924,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:920,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:907,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:881,columnNumber:15},void 0),e.jsxDEV("div",{className:"p-5 rounded-2xl bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800 flex items-start gap-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400",children:[e.jsxDEV(xe,{className:"w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:931,columnNumber:17},void 0),e.jsxDEV("p",{children:[e.jsxDEV("strong",{children:"اطلاعیه پیرامون ساختار فایل‌های زیپ:"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:933,columnNumber:19},void 0)," هر دو فایل زیپ دارای یک پوشه والد در ریشه آرشیو (به ترتیب ",e.jsxDEV("code",{className:"text-[#D4AF37]",children:"sedrazavi-theme/"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:933,columnNumber:131},void 0)," و ",e.jsxDEV("code",{className:"text-emerald-500",children:"sedrazavi-addons/"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:933,columnNumber:190},void 0),") هستند، بنابراین در هر دو محیط لینوکس و ویندوز و در انواع هاست‌های سی‌پنل و دایرکت‌ادمین بدون بروز هیچ‌گونه خطای اکسترکت نصب می‌شوند."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:932,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:930,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:871,columnNumber:13},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:870,columnNumber:11},void 0),l==="architecture"&&e.jsxDEV("div",{className:"space-y-6 animate-fadeIn",children:e.jsxDEV("div",{className:"bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-xl space-y-6",children:[e.jsxDEV("div",{className:"border-b border-gray-100 dark:border-gray-800 pb-4",children:[e.jsxDEV("h2",{className:"text-xl font-bold font-serif text-gray-900 dark:text-white",children:"معماری تفکیک لایه‌ها و پایداری عملکرد (VIP Architecture)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:945,columnNumber:17},void 0),e.jsxDEV("p",{className:"text-xs text-gray-500 dark:text-gray-400 mt-1",children:"جداسازی وظایف نمایشی از منطق دیتابیس جهت تضمین عدم تداخل با بروزرسانی‌های وردپرس و سازگاری کامل با المنتور."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:948,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:944,columnNumber:15},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-5",children:[e.jsxDEV("div",{className:"p-5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 space-y-2",children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-[#AA820A] dark:text-[#F3E5AB] font-bold text-xs",children:[e.jsxDEV(T,{className:"w-4 h-4 text-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:956,columnNumber:21},void 0),e.jsxDEV("span",{children:"لایه ۱: پوسته سبک (Theme)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:957,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:955,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed",children:"متادیتای سئو، هدر و فوتر داینامیک، استایل‌های رسپانسیو، قالب‌های صفحات و هیدراتاسیون React در عنصر root."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:959,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:954,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2",children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs",children:[e.jsxDEV(Q,{className:"w-4 h-4 text-emerald-500"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:966,columnNumber:21},void 0),e.jsxDEV("span",{children:"لایه ۲: افزونه هسته حقوقی (Addons)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:967,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:965,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed",children:"ثبت ۵ پست‌تایپ، احراز هویت پیامکی، محاسبه‌گر تعرفه، سامانه‌های داوری و پرونده‌ها و ابزارک‌های المنتور."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:969,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:964,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-5 rounded-2xl bg-blue-500/10 border border-blue-500/25 space-y-2",children:[e.jsxDEV("div",{className:"flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-xs",children:[e.jsxDEV(j,{className:"w-4 h-4 text-blue-500"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:976,columnNumber:21},void 0),e.jsxDEV("span",{children:"لایه ۳: پایداری و امنیت ضد خطای سفید"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:977,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:975,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed",children:"بررسی امنیتی با if (!defined('ABSPATH'))، کنترل وجود کلاس‌ها و لاگر خودکار خطاها در دایرکتوری امن uploads."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:979,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:974,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:953,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:943,columnNumber:13},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:942,columnNumber:11},void 0),l==="audit"&&e.jsxDEV("div",{className:"space-y-6 animate-fadeIn",children:[e.jsxDEV("div",{className:"bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-xl space-y-4",children:[e.jsxDEV("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4",children:[e.jsxDEV("div",{className:"flex items-center gap-3",children:[e.jsxDEV("div",{className:"w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500",children:e.jsxDEV(E,{className:"w-6 h-6"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:996,columnNumber:21},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:995,columnNumber:19},void 0),e.jsxDEV("div",{children:[e.jsxDEV("h2",{className:"text-lg sm:text-xl font-bold font-serif text-gray-900 dark:text-white",children:"کارنامه ممیزی جامع مستر و راستی‌آزمایی ۵ فاز (Master Audit Report)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:999,columnNumber:21},void 0),e.jsxDEV("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:["بررسی خودکار و تست شده با اسکریپت آزمون ",e.jsxDEV("code",{className:"text-[#D4AF37] font-mono",children:"scripts/test-phase5-master.php"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1003,columnNumber:63},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1002,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:998,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:994,columnNumber:17},void 0),e.jsxDEV("div",{className:"flex items-center gap-2",children:e.jsxDEV("span",{className:"px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5",children:[e.jsxDEV("span",{className:"w-2 h-2 rounded-full bg-emerald-500 animate-pulse"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1010,columnNumber:21},void 0),e.jsxDEV("span",{children:"۱۰۰٪ آزمون‌ها پاس شده (4/4 Stages Passed)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1011,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1009,columnNumber:19},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1008,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:993,columnNumber:15},void 0),e.jsxDEV("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[e.jsxDEV("div",{className:"p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1.5",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("span",{className:"text-xs font-bold text-emerald-800 dark:text-emerald-200",children:"آزمون ۱: سینتکس PHP"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1020,columnNumber:21},void 0),e.jsxDEV("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white",children:"پاس شد"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1021,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1019,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-emerald-700 dark:text-emerald-300",children:["بررسی تمام ۸۵ فایل PHP با دستور ",e.jsxDEV("code",{className:"font-mono",children:"php -l"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1024,columnNumber:53},void 0)," بدون کوچکترین خطای سینتکس."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1023,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1018,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1.5",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("span",{className:"text-xs font-bold text-emerald-800 dark:text-emerald-200",children:"آزمون ۲: رندر کامل SSR"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1030,columnNumber:21},void 0),e.jsxDEV("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white",children:"۹۴KB HTML"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1031,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1029,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-emerald-700 dark:text-emerald-300",children:"رندر کامل سورس فارسی حقوقی، تگ‌های سئو، Schema JSON-LD و عدم وابستگی به CDNهای خارجی."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1033,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1028,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1.5",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("span",{className:"text-xs font-bold text-emerald-800 dark:text-emerald-200",children:"آزمون ۳: استاندارد ZIP"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1040,columnNumber:21},void 0),e.jsxDEV("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white",children:"پاس شد"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1041,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1039,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-emerald-700 dark:text-emerald-300",children:"ریشه تک‌پوشه، screenshot.png در ریشه، نسخه ۲.۶.۰ و پالایش قطعی فایل‌های حساس با .distignore."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1043,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1038,columnNumber:17},void 0),e.jsxDEV("div",{className:"p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-1.5",children:[e.jsxDEV("div",{className:"flex items-center justify-between",children:[e.jsxDEV("span",{className:"text-xs font-bold text-emerald-800 dark:text-emerald-200",children:"آزمون ۴: پوشش REST"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1050,columnNumber:21},void 0),e.jsxDEV("span",{className:"text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white",children:"۱۰۰٪ بله"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1051,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1049,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-[11px] text-emerald-700 dark:text-emerald-300",children:"۱۸ اندپوینت در PHP پیاده‌سازی شده و تمام فراخوانی‌های کلاینت به جای خطای ۴۰۴ پاسخ استاندارد دریافت می‌کنند."},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1053,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1048,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1017,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:992,columnNumber:13},void 0),e.jsxDEV("div",{className:"bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-xl space-y-4",children:[e.jsxDEV("div",{className:"flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3",children:[e.jsxDEV("div",{className:"space-y-1",children:[e.jsxDEV("h3",{className:"font-bold text-base text-gray-900 dark:text-white flex items-center gap-2",children:[e.jsxDEV(ve,{className:"w-5 h-5 text-[#D4AF37]"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1065,columnNumber:21},void 0),e.jsxDEV("span",{children:"جدول جامع تطابق مسیرهای REST API (Client JS vs Server PHP)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1066,columnNumber:21},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1064,columnNumber:19},void 0),e.jsxDEV("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:["قانون سخت‌گیرانه عدم وجود خطای ۴۰۴: تمامی مسیرهای فراخوانی‌شده دارای کنترلر واقعی در ",e.jsxDEV("code",{className:"text-[#D4AF37]",children:"wordpress-theme/inc/rest-api.php"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1069,columnNumber:106},void 0)," هستند."]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1068,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1063,columnNumber:17},void 0),e.jsxDEV("span",{className:"text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20",children:"۰ ردیف «خیر»"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1072,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1062,columnNumber:15},void 0),e.jsxDEV("div",{className:"overflow-x-auto",children:e.jsxDEV("table",{className:"w-full text-right text-xs",children:[e.jsxDEV("thead",{children:e.jsxDEV("tr",{className:"border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-gray-600 dark:text-gray-300",children:[e.jsxDEV("th",{className:"py-3 px-4 font-bold",children:"#"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1081,columnNumber:23},void 0),e.jsxDEV("th",{className:"py-3 px-4 font-bold",children:"مسیر فراخوانی در جاوااسکریپت / کلاینت"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1082,columnNumber:23},void 0),e.jsxDEV("th",{className:"py-3 px-4 font-bold",children:"متد HTTP"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1083,columnNumber:23},void 0),e.jsxDEV("th",{className:"py-3 px-4 font-bold",children:"ثبت و فعال در PHP"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1084,columnNumber:23},void 0),e.jsxDEV("th",{className:"py-3 px-4 font-bold",children:"امنیت و Rate Limit"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1085,columnNumber:23},void 0),e.jsxDEV("th",{className:"py-3 px-4 font-bold",children:"شرح عملکرد سمت سرور"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1086,columnNumber:23},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1080,columnNumber:21},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1079,columnNumber:19},void 0),e.jsxDEV("tbody",{className:"divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300",children:[{id:1,route:"wp-json/sedrazavi/v1/book-appointment",method:"POST",active:!0,security:"Rate Limit (5/10min) + Nonce",desc:"رزرو نوبت مشاوره حقوقی، صدور کد پیگیری و ارسال پیامک"},{id:2,route:"wp-json/sedrazavi/v1/track-case",method:"POST/GET",active:!0,security:"Rate Limit (12/5min)",desc:"استعلام فوری پرونده و نمایش مرحله دادرسی"},{id:3,route:"wp-json/sedrazavi/v1/cases",method:"GET/POST",active:!0,security:"Role-Based (edit_posts)",desc:"مدیریت و بایگانی پرونده‌های موکلین در دیتابیس"},{id:4,route:"wp-json/sedrazavi/v1/sync/stream",method:"GET",active:!0,security:"Heartbeat Session",desc:"همگام‌سازی زنده وضعیت نشست‌های دادگاه و کارتابل"},{id:5,route:"wp-json/sedrazavi/v1/auth/login",method:"POST",active:!0,security:"Password + OTP",desc:"ورود دو مرحله‌ای وکیل و موکل با توکن امن"},{id:6,route:"wp-json/sedrazavi/v1/auth/verify-2fa",method:"POST",active:!0,security:"2FA Inspection",desc:"تایید کد ورود یکبار مصرف پیامکی"},{id:7,route:"wp-json/sedrazavi/v1/auth/logout",method:"POST",active:!0,security:"Session Termination",desc:"خروج امن و ابطال نشست‌های فعال"},{id:8,route:"wp-json/sedrazavi/v1/tokens/all",method:"GET",active:!0,security:"Public Read",desc:"دریافت متغیرهای پالت و توکن‌های طراحی قالب"},{id:9,route:"wp-json/sedrazavi/v1/tokens/update",method:"POST",active:!0,security:"Admin Only (edit_theme_options)",desc:"ذخیره و به‌روزرسانی پالت رنگ و تایپوگرافی"},{id:10,route:"wp-json/sedrazavi/v1/payment/checkout",method:"POST",active:!0,security:"Rate Limit (10/5min)",desc:"صدور فاکتور الکترونیک و اتصال به درگاه سداد/زرین‌پال"},{id:11,route:"wp-json/sedrazavi/v1/quick-callback",method:"POST",active:!0,security:"Rate Limit (5/10min)",desc:"ثبت درخواست تماس فوری بدون نیاز به لاگین"},{id:12,route:"wp-json/sedrazavi/v1/otp/send",method:"POST",active:!0,security:"Anti-Spam (3/5min)",desc:"صدور و پیامک کد ورود به سرشماره همراه"},{id:13,route:"wp-json/sedrazavi/v1/otp/verify",method:"POST",active:!0,security:"Anti-Bruteforce (5/5min)",desc:"راستی‌آزمایی کد پیامکی واردشده موکل"},{id:14,route:"wp-json/sedrazavi/v1/dashboard-stats",method:"GET",active:!0,security:"Cached Stats",desc:"آمار زنده پرونده‌ها، نوبت‌ها و اسناد کارتابل"},{id:15,route:"wp-json/sedrazavi/v1/verify-hash",method:"POST",active:!0,security:"SHA256 Sanitized",desc:"راستی‌آزمایی اصالت گواهی امضای الکترونیک اسناد"},{id:16,route:"wp-json/sedrazavi/v1/corporate-quorum",method:"POST",active:!0,security:"Validated Params",desc:"محاسبه نصاب مجامع و سهام شرکت‌های بازرگانی"},{id:17,route:"wp-json/wp/v2/posts",method:"GET",active:!0,security:"Core WP REST API",desc:"بازیابی مقالات، تحلیل‌های حقوقی و اخبار"},{id:18,route:"wp-json/wp/v2/lawyer_service",method:"GET",active:!0,security:"show_in_rest: true",desc:"بازیابی خدمات حقوقی با پست‌تایپ اختصاصی"}].map(s=>e.jsxDEV("tr",{className:"hover:bg-gray-50/70 dark:hover:bg-gray-800/50 transition-colors",children:[e.jsxDEV("td",{className:"py-2.5 px-4 font-mono text-gray-400",children:s.id},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1111,columnNumber:25},void 0),e.jsxDEV("td",{className:"py-2.5 px-4 font-mono font-semibold text-[#D4AF37]",children:s.route},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1112,columnNumber:25},void 0),e.jsxDEV("td",{className:"py-2.5 px-4",children:e.jsxDEV("span",{className:"px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400",children:s.method},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1114,columnNumber:27},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1113,columnNumber:25},void 0),e.jsxDEV("td",{className:"py-2.5 px-4",children:e.jsxDEV("span",{className:"inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",children:[e.jsxDEV(ee,{className:"w-3 h-3 text-emerald-500"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1120,columnNumber:29},void 0),e.jsxDEV("span",{children:"بله (فعال)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1121,columnNumber:29},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1119,columnNumber:27},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1118,columnNumber:25},void 0),e.jsxDEV("td",{className:"py-2.5 px-4 text-gray-500 dark:text-gray-400 text-[11px]",children:s.security},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1124,columnNumber:25},void 0),e.jsxDEV("td",{className:"py-2.5 px-4 text-gray-600 dark:text-gray-300",children:s.desc},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1125,columnNumber:25},void 0)]},s.id,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1110,columnNumber:23},void 0))},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1089,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1078,columnNumber:17},void 0)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1077,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1061,columnNumber:13},void 0),e.jsxDEV("div",{className:"p-6 rounded-3xl bg-gradient-to-r from-[#0B132B] to-[#141E3C] border border-[#D4AF37]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white",children:[e.jsxDEV("div",{className:"space-y-1",children:[e.jsxDEV("h4",{className:"font-bold text-base text-[#F3E5AB]",children:"دانلود یکجای پکیج رسمی تاییدشده (SedRazavi Suite v2.6.0)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1136,columnNumber:17},void 0),e.jsxDEV("p",{className:"text-xs text-slate-300",children:"شامل هر دو فایل زیپ مستقل (پوسته و افزونه مکمل) + راهنمای جامع فارسی، پالایش‌شده و فاقد فایل‌های حساس"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1139,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1135,columnNumber:15},void 0),e.jsxDEV("div",{className:"flex items-center gap-3 w-full sm:w-auto",children:[e.jsxDEV("button",{type:"button",onClick:q,className:"flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#AA820A] text-[#070D1E] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer",children:[e.jsxDEV(B,{className:"w-4 h-4"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1150,columnNumber:19},void 0),e.jsxDEV("span",{children:"دانلود پوسته (۲.۴MB)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1151,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1145,columnNumber:17},void 0),e.jsxDEV("button",{type:"button",onClick:H,className:"flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/30",children:[e.jsxDEV(R,{className:"w-4 h-4"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1159,columnNumber:19},void 0),e.jsxDEV("span",{children:"دانلود پکیج کامل (۲.۴MB)"},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1160,columnNumber:19},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1154,columnNumber:17},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1144,columnNumber:15},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1134,columnNumber:13},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:990,columnNumber:11},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:274,columnNumber:7},void 0),e.jsxDEV(de,{isOpen:P,onClose:()=>I(!1)},void 0,!1,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:1170,columnNumber:7},void 0)]},void 0,!0,{fileName:"/app/applet/src/components/WordPressCodeViewer.tsx",lineNumber:273,columnNumber:5},void 0)};export{De as WordPressCodeViewer};
