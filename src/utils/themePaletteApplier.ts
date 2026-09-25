import { LightPaletteColors, DarkPaletteColors, ThemePalettePreset, THEME_PALETTES } from '../data/themePalettes';

export function generatePaletteCss(light: LightPaletteColors, dark: DarkPaletteColors): string {
  return `
:root {
  --color-gold: ${light.goldPrimary};
  --color-gold-light: ${light.goldSecondary};
  --color-gold-dark: ${light.goldSecondary};
  --color-navy: ${light.text};
  --color-gray-bg: ${light.bg};

  --sr-bg-light: ${light.bg};
  --sr-text-light: ${light.text};
  --sr-gold-primary: ${light.goldPrimary};
  --sr-gold-secondary: ${light.goldSecondary};
  --sr-border-light: ${light.border};
  --sr-primary-accent: ${light.goldPrimary};

  /* Elementor Global Colors Synchronization (Elementor 3.x System Colors) */
  --e-global-color-primary: ${light.goldPrimary};
  --e-global-color-secondary: ${light.goldSecondary};
  --e-global-color-text: ${light.text};
  --e-global-color-accent: ${light.goldPrimary};
  --e-global-color-sr_gold_main: ${light.goldPrimary};
  --e-global-color-sr_gold_secondary: ${light.goldSecondary};
  --e-global-color-sr_court_navy: ${light.text};
  --e-global-color-sr_canvas_bg: ${light.bg};
}

[data-theme="dark"], .dark {
  --color-gold: ${dark.goldPrimary};
  --color-gold-light: ${dark.goldGlow};
  --color-navy: ${dark.bg};
  --color-navy-light: ${dark.cardBg};
  --color-gray-bg: ${dark.bg};

  --sr-bg-dark: ${dark.bg};
  --sr-text-dark: ${dark.text};
  --sr-card-bg: ${dark.cardBg};
  --sr-gold-primary: ${dark.goldPrimary};
  --sr-gold-glow: ${dark.goldGlow};
  --sr-primary-accent: ${dark.goldPrimary};

  /* Elementor Dark Mode Global Colors Synchronization */
  --e-global-color-primary: ${dark.goldPrimary};
  --e-global-color-secondary: ${dark.goldGlow};
  --e-global-color-text: ${dark.text};
  --e-global-color-accent: ${dark.goldGlow};
  --e-global-color-sr_gold_main: ${dark.goldPrimary};
  --e-global-color-sr_gold_secondary: ${dark.goldGlow};
  --e-global-color-sr_court_navy: ${dark.cardBg};
  --e-global-color-sr_canvas_bg: ${dark.bg};
}

/* Dynamic Live Override: Icons, Badges, Borders and Accents inherit the active backend palette */
.text-\\[\\#D4AF37\\],
.text-gold,
[data-theme-icon="accent"] {
  color: var(--sr-gold-primary, #D4AF37) !important;
}

.border-\\[\\#D4AF37\\],
.border-gold {
  border-color: var(--sr-gold-primary, #D4AF37) !important;
}

.bg-\\[\\#D4AF37\\],
.bg-gold {
  background-color: var(--sr-gold-primary, #D4AF37) !important;
}

.border-\\[\\#D4AF37\\]\\/20 {
  border-color: color-mix(in srgb, var(--sr-gold-primary, #D4AF37) 20%, transparent) !important;
}

.border-\\[\\#D4AF37\\]\\/30 {
  border-color: color-mix(in srgb, var(--sr-gold-primary, #D4AF37) 30%, transparent) !important;
}

.border-\\[\\#D4AF37\\]\\/40 {
  border-color: color-mix(in srgb, var(--sr-gold-primary, #D4AF37) 40%, transparent) !important;
}

.border-\\[\\#D4AF37\\]\\/60 {
  border-color: color-mix(in srgb, var(--sr-gold-primary, #D4AF37) 60%, transparent) !important;
}

.bg-\\[\\#D4AF37\\]\\/10 {
  background-color: color-mix(in srgb, var(--sr-gold-primary, #D4AF37) 10%, transparent) !important;
}

.bg-\\[\\#D4AF37\\]\\/20 {
  background-color: color-mix(in srgb, var(--sr-gold-primary, #D4AF37) 20%, transparent) !important;
}

.btn-gold {
  background: linear-gradient(135deg, var(--sr-gold-primary, #D4AF37) 0%, var(--sr-gold-secondary, #B8960F) 100%) !important;
}

.gold-gradient-text {
  background: linear-gradient(135deg, var(--sr-gold-secondary, #AA820A) 0%, var(--sr-gold-primary, #D4AF37) 50%, var(--sr-gold-secondary, #8A6B0A) 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05));
}

[data-theme="dark"] .gold-gradient-text,
.dark .gold-gradient-text {
  background: linear-gradient(135deg, #F3E5AB 0%, var(--sr-gold-primary, #D4AF37) 60%, var(--sr-gold-secondary, #AA820A) 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  filter: drop-shadow(0 1px 2px rgba(212, 175, 55, 0.25));
}

/* High Contrast Touch Ergonomics (WCAG 2.1 AA) */
button, select, input, a {
  touch-action: manipulation;
}

/* Elementor Direct Widget Selectors Synchronization */
.elementor-element .elementor-icon,
.elementor-widget-icon .elementor-icon,
.elementor-icon-box-icon .elementor-icon,
.elementor-view-stacked .elementor-icon {
  fill: var(--sr-gold-primary, #D4AF37) !important;
  color: var(--sr-gold-primary, #D4AF37) !important;
}

.elementor-button,
.elementor-button.elementor-size-md {
  background: linear-gradient(135deg, var(--sr-gold-primary, #D4AF37) 0%, var(--sr-gold-secondary, #B8960F) 100%) !important;
  border-color: var(--sr-gold-primary, #D4AF37) !important;
  color: #FFFFFF !important;
}

.elementor-divider-separator {
  border-color: var(--sr-gold-primary, #D4AF37) !important;
}
`;
}

export function applyPaletteToDom(light: LightPaletteColors, dark: DarkPaletteColors) {
  if (typeof document === 'undefined') return;

  let styleTag = document.getElementById('sr-active-theme-palette') as HTMLStyleElement | null;
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'sr-active-theme-palette';
    document.head.appendChild(styleTag);
  }

  styleTag.textContent = generatePaletteCss(light, dark);
}

export function getPaletteById(id: string): ThemePalettePreset | undefined {
  return THEME_PALETTES.find((p) => p.id === id);
}

/**
 * Generates Elementor Kit JSON schema for direct import into Elementor Global Settings
 */
export function generateElementorKitSettings(light: LightPaletteColors, dark: DarkPaletteColors) {
  return {
    system_colors: [
      { _id: 'primary', title: 'رنگ اصلی تم (Primary)', color: light.goldPrimary },
      { _id: 'secondary', title: 'رنگ ثانویه لوکس (Secondary)', color: light.goldSecondary },
      { _id: 'text', title: 'رنگ متون و عناوین (Text)', color: light.text },
      { _id: 'accent', title: 'رنگ آکسان و نشانه‌ها (Accent)', color: light.goldPrimary },
    ],
    custom_colors: [
      { _id: 'sr_canvas_bg', title: 'پس‌زمینه بوم حقوقی', color: light.bg },
      { _id: 'sr_border_subtle', title: 'کادر و خطوط جداکننده', color: light.border },
      { _id: 'sr_dark_primary', title: 'رنگ طلایی حالت شب', color: dark.goldPrimary },
      { _id: 'sr_dark_bg', title: 'پس‌زمینه شب دیوان عالی', color: dark.bg },
    ],
  };
}

/**
 * Generates WordPress PHP code snippet to hook into Elementor Kit update automatically
 */
export function generateElementorPhpSyncSnippet(palette: ThemePalettePreset): string {
  return `<?php
/**
 * SedRazavi Law Firm - Auto-Sync Theme Palette to Elementor Global Colors
 * Triggered automatically on backend theme palette switch.
 */
add_action('sedrazavi_after_palette_update', function($palette_id) {
    if (!did_action('elementor/loaded')) return;

    $kit_id = get_option('elementor_active_kit');
    if (!$kit_id) return;

    $page_settings = get_post_meta($kit_id, '_elementor_page_settings', true);
    if (!is_array($page_settings)) $page_settings = [];

    // Map theme palette to Elementor System Colors
    $page_settings['system_colors'] = [
        ['_id' => 'primary',   'title' => 'رنگ اصلی حقوقی', 'color' => '${palette.lightColors.goldPrimary}'],
        ['_id' => 'secondary', 'title' => 'رنگ ثانویه لوکس', 'color' => '${palette.lightColors.goldSecondary}'],
        ['_id' => 'text',      'title' => 'متون حقوقی',      'color' => '${palette.lightColors.text}'],
        ['_id' => 'accent',    'title' => 'آکسان و نشانه‌ها', 'color' => '${palette.lightColors.goldPrimary}'],
    ];

    // Update Elementor Kit Meta
    update_post_meta($kit_id, '_elementor_page_settings', $page_settings);

    // Regenerate Elementor CSS cache files
    \\Elementor\\Plugin::$instance->files_manager->clear_cache();
});
`;
}
