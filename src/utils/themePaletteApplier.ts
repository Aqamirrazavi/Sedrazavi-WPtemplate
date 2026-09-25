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
  background: linear-gradient(135deg, var(--sr-gold-primary, #D4AF37) 0%, var(--sr-gold-secondary, #B8960F) 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
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
