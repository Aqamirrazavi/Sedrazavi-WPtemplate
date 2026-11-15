<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Unified Design System & Elementor Global Kit Synchronizer
 *
 * Single Source of Truth bridging:
 *  - assets/tokens.json & assets/css/variables.css
 *  - WP Options (`uas_design_tokens`, `sedrazavi_global_design_tokens`)
 *  - Elementor Active Kit (`elementor_active_kit` -> system_colors, custom_colors, system_typography, layout)
 *  - Frontend, Elementor Preview, and Elementor Editor CSS variables (Light/Dark + RTL/LTR)
 *
 * @package UniversalElementorSuite
 * @since 4.0.0
 */
class Design_Tokens {

    const OPTION_KEY       = 'uas_design_tokens';
    const THEME_OPTION_KEY = 'sedrazavi_global_design_tokens';
    const KIT_SYNC_OPTION  = 'uas_kit_tokens_synced_v4';

    private static $_instance = null;

    /**
     * Cached decoded tokens.json schema
     *
     * @var array|null
     */
    private $schema_cache = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function __construct() {
        // Inject dynamic token overrides seamlessly across frontend, Elementor preview, and Elementor editor
        add_action('wp_head', [$this, 'render_dynamic_tokens_css'], 8);
        add_action('elementor/editor/after_enqueue_styles', [$this, 'enqueue_editor_token_vars'], 20);
        add_action('elementor/preview/enqueue_styles', [$this, 'enqueue_preview_token_vars'], 20);

        // Synchronize tokens cleanly with Elementor Active Kit when Elementor initializes or theme switches
        add_action('elementor/init', [$this, 'maybe_sync_elementor_kit'], 25);
        add_action('after_switch_theme', [$this, 'on_theme_switch']);

        // Admin AJAX endpoint for manual or programmatic Kit synchronization
        add_action('wp_ajax_uas_sync_design_tokens', [$this, 'ajax_sync_design_tokens']);
    }

    /**
     * Load canonical design system schema from assets/tokens.json
     *
     * @return array
     */
    public function get_schema() {
        if ($this->schema_cache !== null) {
            return $this->schema_cache;
        }

        $file = UAS_PATH . 'assets/tokens.json';
        if (!file_exists($file)) {
            $this->schema_cache = [];
            return [];
        }

        $decoded = json_decode((string) file_get_contents($file), true);
        $this->schema_cache = is_array($decoded) ? $decoded : [];
        return $this->schema_cache;
    }

    /**
     * Get active unified color, typography, and layout tokens (merged with WP options)
     *
     * @return array
     */
    public function get_active_tokens() {
        $schema       = $this->get_schema();
        $light        = $schema['colors']['light'] ?? [];
        $dark         = $schema['colors']['dark'] ?? [];
        $typography   = $schema['typography'] ?? [];
        $spacing      = $schema['spacing'] ?? [];

        $plugin_saved = get_option(self::OPTION_KEY, []);
        $theme_saved  = get_option(self::THEME_OPTION_KEY, []);
        $plugin_saved = is_array($plugin_saved) ? $plugin_saved : [];
        $theme_saved  = is_array($theme_saved) ? $theme_saved : [];

        // Reconcile theme gold/navy tokens cleanly if configured by user in SedRazavi Theme Options
        $accent_gold = !empty($theme_saved['brand.color_gold'])
            ? sanitize_hex_color($theme_saved['brand.color_gold'])
            : ($light['accent'] ?? '#D4AF37');
        $secondary_navy = !empty($theme_saved['brand.color_navy'])
            ? sanitize_hex_color($theme_saved['brand.color_navy'])
            : ($light['secondary'] ?? '#0B132B');

        $defaults = [
            'primary_color'    => $light['primary'] ?? '#2563EB',
            'secondary_color'  => $secondary_navy ?: '#0B132B',
            'text_color'       => $light['text_primary'] ?? '#0F172A',
            'accent_color'     => $accent_gold ?: '#D4AF37',
            'dark_bg'          => $dark['bg'] ?? '#060B18',
            'dark_surface'     => $dark['surface'] ?? '#0B132B',
            'dark_card'        => $dark['surface_card'] ?? '#0F172A',
            'dark_text'        => $dark['text_primary'] ?? '#F8FAFC',
            'font_family'      => $typography['font_family_primary_name'] ?? 'Vazirmatn',
            'font_stack'       => $typography['font_family_sans'] ?? "'Vazirmatn', sans-serif",
            'container_width'  => intval($spacing['container_max_width_px'] ?? 1280),
            'default_mode'     => get_option('sedrazavi_default_mode', 'light'),
        ];

        return wp_parse_args($plugin_saved, $defaults);
    }

    /**
     * Build CSS Custom Properties override string bridging --uas-* and --sr-* tokens
     *
     * @return string
     */
    public function build_dynamic_css() {
        $t      = $this->get_active_tokens();
        $is_rtl = function_exists('is_rtl') ? is_rtl() : true;

        $primary   = esc_attr($t['primary_color']);
        $secondary = esc_attr($t['secondary_color']);
        $text      = esc_attr($t['text_color']);
        $accent    = esc_attr($t['accent_color']);
        $font      = esc_attr($t['font_stack']);
        $width     = intval($t['container_width']) ?: 1280;
        $dark_bg   = esc_attr($t['dark_bg']);
        $dark_surf = esc_attr($t['dark_surface']);
        $dark_card = esc_attr($t['dark_card']);
        $dark_text = esc_attr($t['dark_text']);

        $css  = ":root {\n";
        $css .= "  --uas-primary-color: {$primary};\n";
        $css .= "  --uas-secondary-color: {$secondary};\n";
        $css .= "  --uas-accent-color: {$accent};\n";
        $css .= "  --uas-text-main: {$text};\n";
        $css .= "  --uas-font-family: {$font};\n";
        $css .= "  --uas-container-max: {$width}px;\n";
        $css .= "  --sr-primary-accent: {$accent};\n";
        $css .= "  --sr-gold-accent: {$accent};\n";
        $css .= "  --sr-navy-900: {$secondary};\n";
        $css .= "  --sr-font-family: {$font};\n";
        $css .= "  --uas-dir: " . ($is_rtl ? 'rtl' : 'ltr') . ";\n";
        $css .= "}\n";

        $css .= ".dark, html.dark, html[data-theme=\"dark\"], body.dark-mode {\n";
        $css .= "  --uas-bg-body: {$dark_bg};\n";
        $css .= "  --uas-bg-surface: {$dark_surf};\n";
        $css .= "  --uas-bg-card: {$dark_card};\n";
        $css .= "  --uas-text-main: {$dark_text};\n";
        $css .= "}\n";

        return $css;
    }

    /**
     * Render dynamic tokens CSS in frontend <head>
     */
    public function render_dynamic_tokens_css() {
        echo '<style id="uas-dynamic-design-tokens">' . "\n" . $this->build_dynamic_css() . "</style>\n";
    }

    /**
     * Attach dynamic tokens inside Elementor Editor
     */
    public function enqueue_editor_token_vars() {
        if (wp_style_is('uas-editor-styles', 'enqueued')) {
            wp_add_inline_style('uas-editor-styles', $this->build_dynamic_css());
        }
    }

    /**
     * Attach dynamic tokens inside Elementor Preview canvas
     */
    public function enqueue_preview_token_vars() {
        if (wp_style_is('uas-design-tokens', 'registered') || wp_style_is('uas-widgets-core', 'enqueued')) {
            $handle = wp_style_is('uas-widgets-core', 'enqueued') ? 'uas-widgets-core' : 'uas-design-tokens';
            wp_add_inline_style($handle, $this->build_dynamic_css());
        }
    }

    /**
     * Sync tokens to Elementor Kit once after activation or version upgrade
     */
    public function maybe_sync_elementor_kit() {
        if (!class_exists('\Elementor\Plugin')) {
            return;
        }
        if (!get_option(self::KIT_SYNC_OPTION, false)) {
            $synced = $this->sync_to_elementor_kit(false);
            if ($synced) {
                update_option(self::KIT_SYNC_OPTION, true);
            }
        }
    }

    /**
     * Re-sync when switching themes
     */
    public function on_theme_switch() {
        $this->sync_to_elementor_kit(true);
    }

    /**
     * Synchronize unified Design System tokens into Elementor's Active Global Kit (`elementor_active_kit`)
     *
     * @param bool $overwrite_existing Whether to overwrite already customized Kit system colors
     * @return bool
     */
    public function sync_to_elementor_kit($overwrite_existing = false) {
        if (!class_exists('\Elementor\Plugin')) {
            return false;
        }

        $active_kit_id = intval(get_option('elementor_active_kit', 0));
        if (!$active_kit_id && isset(\Elementor\Plugin::$instance->kits_manager) && method_exists(\Elementor\Plugin::$instance->kits_manager, 'get_active_id')) {
            $active_kit_id = intval(\Elementor\Plugin::$instance->kits_manager->get_active_id());
        }

        if ($active_kit_id <= 0) {
            return false;
        }

        $schema       = $this->get_schema();
        $kit_defaults = $schema['elementor_kit'] ?? [];
        $tokens       = $this->get_active_tokens();

        $kit_settings = get_post_meta($active_kit_id, '_elementor_page_settings', true);
        if (!is_array($kit_settings)) {
            $kit_settings = [];
        }

        // 1. System Colors (primary, secondary, text, accent)
        $target_system_colors = [
            ['_id' => 'primary', 'title' => __('رنگ اصلی (Primary)', 'universal-elementor-suite'), 'color' => $tokens['primary_color']],
            ['_id' => 'secondary', 'title' => __('رنگ ثانویه (Secondary / Navy)', 'universal-elementor-suite'), 'color' => $tokens['secondary_color']],
            ['_id' => 'text', 'title' => __('متن اصلی (Text)', 'universal-elementor-suite'), 'color' => $tokens['text_color']],
            ['_id' => 'accent', 'title' => __('طلایی شاخص (Accent)', 'universal-elementor-suite'), 'color' => $tokens['accent_color']],
        ];

        if ($overwrite_existing || empty($kit_settings['system_colors']) || !is_array($kit_settings['system_colors'])) {
            $kit_settings['system_colors'] = $target_system_colors;
        }

        // 2. Custom Semantic Colors from tokens.json
        if (!empty($kit_defaults['custom_colors']) && is_array($kit_defaults['custom_colors'])) {
            if ($overwrite_existing || empty($kit_settings['custom_colors']) || !is_array($kit_settings['custom_colors'])) {
                $kit_settings['custom_colors'] = $kit_defaults['custom_colors'];
            } else {
                // Merge missing custom semantic swatches without clobbering user custom swatches
                $existing_ids = array_column($kit_settings['custom_colors'], '_id');
                foreach ($kit_defaults['custom_colors'] as $swatch) {
                    if (!empty($swatch['_id']) && !in_array($swatch['_id'], $existing_ids, true)) {
                        $kit_settings['custom_colors'][] = $swatch;
                    }
                }
            }
        }

        // 3. System Typography (Vazirmatn responsive scale)
        if (!empty($kit_defaults['system_typography']) && is_array($kit_defaults['system_typography'])) {
            if ($overwrite_existing || empty($kit_settings['system_typography']) || !is_array($kit_settings['system_typography'])) {
                $kit_settings['system_typography'] = $kit_defaults['system_typography'];
            }
        }

        // 4. Layout Container Width & Breakpoints
        $container_width = intval($tokens['container_width']) ?: 1280;
        if ($overwrite_existing || empty($kit_settings['container_width'])) {
            $kit_settings['container_width'] = [
                'unit'  => 'px',
                'size'  => $container_width,
                'sizes' => [],
            ];
        }
        if ($overwrite_existing || empty($kit_settings['space_between_widgets'])) {
            $kit_settings['space_between_widgets'] = [
                'column' => (string) intval($schema['spacing']['widget_gap_px'] ?? 20),
                'row'    => (string) intval($schema['spacing']['widget_gap_px'] ?? 20),
                'unit'   => 'px',
                'isLinked' => true,
            ];
        }
        if (empty($kit_settings['viewport_md'])) {
            $kit_settings['viewport_md'] = intval($schema['rtl_ltr']['viewport_md'] ?? 768);
        }
        if (empty($kit_settings['viewport_lg'])) {
            $kit_settings['viewport_lg'] = intval($schema['rtl_ltr']['viewport_lg'] ?? 1025);
        }

        update_post_meta($active_kit_id, '_elementor_page_settings', $kit_settings);

        if (isset(\Elementor\Plugin::$instance->files_manager) && method_exists(\Elementor\Plugin::$instance->files_manager, 'clear_cache')) {
            \Elementor\Plugin::$instance->files_manager->clear_cache();
        }

        return true;
    }

    /**
     * AJAX endpoint to force-sync unified Design Tokens with Elementor Global Kit
     */
    public function ajax_sync_design_tokens() {
        check_ajax_referer('uas_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(['message' => 'سطح دسترسی ناکافی است.']);
        }

        $updates = [];
        $hex_fields = ['primary_color', 'secondary_color', 'text_color', 'accent_color', 'dark_bg', 'dark_surface', 'dark_card', 'dark_text'];
        foreach ($hex_fields as $field) {
            if (!empty($_POST[$field])) {
                $sanitized = sanitize_hex_color(wp_unslash($_POST[$field]));
                if ($sanitized) {
                    $updates[$field] = $sanitized;
                }
            }
        }
        if (!empty($_POST['font_family'])) {
            $updates['font_family'] = sanitize_text_field(wp_unslash($_POST['font_family']));
        }
        if (!empty($_POST['container_width'])) {
            $updates['container_width'] = max(960, min(1600, intval($_POST['container_width'])));
        }

        if (!empty($updates)) {
            $current = get_option(self::OPTION_KEY, []);
            $merged  = wp_parse_args($updates, is_array($current) ? $current : []);
            update_option(self::OPTION_KEY, $merged);
        }

        $synced = $this->sync_to_elementor_kit(true);
        wp_send_json_success([
            'message'    => $synced
                ? 'توکن‌های طراحی با کیت سراسری المنتور (Global Kit) با موفقیت همگام‌سازی شدند.'
                : 'توکن‌های CSS ذخیره شدند (افزونه المنتور یا کیت فعال هنوز راه‌اندازی نشده است).',
            'kit_synced' => $synced,
            'tokens'     => $this->get_active_tokens(),
        ]);
    }
}
