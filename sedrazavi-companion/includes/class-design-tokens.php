<?php
/**
 * SedRazavi Dynamic Design Token Engine & Vector Background Propagator
 *
 * Generates unified CSS variables (:root) across Gutenberg, Elementor Global Kit,
 * and dynamic Vector Backgrounds without manual code edits.
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Design_Tokens {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('wp_head', [$this, 'inject_dynamic_root_tokens'], 5);
        add_action('admin_head', [$this, 'inject_dynamic_root_tokens'], 5);
        add_filter('wp_theme_json_data_theme', [$this, 'filter_gutenberg_theme_json']);
        add_action('elementor/init', [$this, 'sync_elementor_global_kit']);
    }

    public function get_active_palette() {
        $preset = get_option('sedrazavi_active_palette', 'default');

        $palettes = [
            'default' => [
                'primary'   => '#D4AF37',
                'secondary' => '#AA820A',
                'accent'    => '#F3E5AB',
                'surface'   => '#0B132B',
                'bg'        => '#060B18',
                'text'      => '#F8FAFC',
                'icon'      => '#D4AF37',
                'shadow'    => 'rgba(212, 175, 55, 0.25)',
                'border'    => 'rgba(212, 175, 55, 0.22)',
            ],
            'cyber-blue' => [
                'primary'   => '#3b82f6',
                'secondary' => '#1d4ed8',
                'accent'    => '#60a5fa',
                'surface'   => '#0f172a',
                'bg'        => '#020617',
                'text'      => '#f8fafc',
                'icon'      => '#38bdf8',
                'shadow'    => 'rgba(59, 130, 246, 0.25)',
                'border'    => 'rgba(59, 130, 246, 0.22)',
            ],
            'emerald-store' => [
                'primary'   => '#10b981',
                'secondary' => '#059669',
                'accent'    => '#34d399',
                'surface'   => '#064e3b',
                'bg'        => '#022c22',
                'text'      => '#f0fdf4',
                'icon'      => '#10b981',
                'shadow'    => 'rgba(16, 185, 129, 0.25)',
                'border'    => 'rgba(16, 185, 129, 0.22)',
            ],
            'corporate-sky' => [
                'primary'   => '#0ea5e9',
                'secondary' => '#0284c7',
                'accent'    => '#7dd3fc',
                'surface'   => '#0c4a6e',
                'bg'        => '#082f49',
                'text'      => '#f0f9ff',
                'icon'      => '#38bdf8',
                'shadow'    => 'rgba(14, 165, 233, 0.25)',
                'border'    => 'rgba(14, 165, 233, 0.22)',
            ],
            'purple-lms' => [
                'primary'   => '#8b5cf6',
                'secondary' => '#6d28d9',
                'accent'    => '#a78bfa',
                'surface'   => '#2e1065',
                'bg'        => '#170638',
                'text'      => '#faf5ff',
                'icon'      => '#c084fc',
                'shadow'    => 'rgba(139, 92, 246, 0.25)',
                'border'    => 'rgba(139, 92, 246, 0.22)',
            ],
        ];

        return isset($palettes[$preset]) ? $palettes[$preset] : $palettes['default'];
    }

    public function inject_dynamic_root_tokens() {
        $p = $this->get_active_palette();
        ?>
        <style id="sedrazavi-dynamic-design-tokens">
            :root {
                --sr-primary: <?php echo esc_attr($p['primary']); ?>;
                --sr-secondary: <?php echo esc_attr($p['secondary']); ?>;
                --sr-accent: <?php echo esc_attr($p['accent']); ?>;
                --sr-surface: <?php echo esc_attr($p['surface']); ?>;
                --sr-bg: <?php echo esc_attr($p['bg']); ?>;
                --sr-text: <?php echo esc_attr($p['text']); ?>;
                --sr-icon: <?php echo esc_attr($p['icon']); ?>;
                --sr-shadow: <?php echo esc_attr($p['shadow']); ?>;
                --sr-border: <?php echo esc_attr($p['border']); ?>;

                /* Dynamic Vector Background URIs */
                --sr-bg-isometric: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z' fill='none' stroke='<?php echo urlencode($p['primary']); ?>' stroke-opacity='0.08' stroke-width='1'/%3E%3C/svg%3E");
                --sr-bg-dots: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='<?php echo urlencode($p['primary']); ?>' fill-opacity='0.12'/%3E%3C/svg%3E");
                --sr-bg-circuits: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M10 10 h40 v40 h-40 Z' fill='none' stroke='<?php echo urlencode($p['accent']); ?>' stroke-opacity='0.06' stroke-width='1.5'/%3E%3Ccircle cx='10' cy='10' r='3' fill='<?php echo urlencode($p['primary']); ?>' fill-opacity='0.2'/%3E%3C/svg%3E");
            }

            .sr-vector-bg-isometric { background-image: var(--sr-bg-isometric); background-repeat: repeat; }
            .sr-vector-bg-dots { background-image: var(--sr-bg-dots); background-repeat: repeat; }
            .sr-vector-bg-circuits { background-image: var(--sr-bg-circuits); background-repeat: repeat; }
        </style>
        <?php
    }

    public function filter_gutenberg_theme_json($theme_json) {
        $p = $this->get_active_palette();

        $custom_palette = [
            'version'  => 2,
            'settings' => [
                'color' => [
                    'palette' => [
                        ['slug' => 'sr-primary',   'color' => $p['primary'],   'name' => 'Primary Brand'],
                        ['slug' => 'sr-secondary', 'color' => $p['secondary'], 'name' => 'Secondary Brand'],
                        ['slug' => 'sr-accent',    'color' => $p['accent'],    'name' => 'Accent Highlight'],
                        ['slug' => 'sr-surface',   'color' => $p['surface'],   'name' => 'Card Surface'],
                        ['slug' => 'sr-bg',        'color' => $p['bg'],        'name' => 'Background Canvas'],
                    ],
                ],
            ],
        ];

        return $theme_json->update_with($custom_palette);
    }

    public function sync_elementor_global_kit() {
        if (!did_action('elementor/loaded') || !class_exists('\Elementor\Plugin')) {
            return;
        }

        $kit = \Elementor\Plugin::$instance->kits_manager->get_active_kit();
        if (!$kit) {
            return;
        }

        $p = $this->get_active_palette();
        $system_colors = $kit->get_settings('system_colors');

        if (is_array($system_colors)) {
            foreach ($system_colors as &$item) {
                if ($item['_id'] === 'primary') {
                    $item['color'] = $p['primary'];
                } elseif ($item['_id'] === 'secondary') {
                    $item['color'] = $p['secondary'];
                } elseif ($item['_id'] === 'accent') {
                    $item['color'] = $p['accent'];
                }
            }
            $kit->update_settings(['system_colors' => $system_colors]);
        }
    }
}
