<?php
/**
 * SedRazavi OS - Zero-Asset SVG Mathematical Pattern Generator
 * Location: sedrazavi-companion/includes/class-vector-patterns.php
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Vector_Patterns {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('wp_head', [$this, 'inject_dynamic_pattern_styles'], 90);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    /**
     * Get list of mathematical SVG patterns
     */
    public static function get_patterns_catalog() {
        return [
            'grid' => [
                'name'    => 'شبکه خطوط مدرن (Modern Grid)',
                'category'=> 'architectural',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path d="M40 0H0v40h40V0zM1 39V1h38v38H1z" fill="currentColor" fill-opacity="{opacity}"/></svg>',
            ],
            'dots' => [
                'name'    => 'ماتریس نقطه‌ای (Dot Matrix)',
                'category'=> 'minimal',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5" fill="currentColor" fill-opacity="{opacity}"/></svg>',
            ],
            'topography' => [
                'name'    => 'خطوط تراز توپوگرافی (Topography)',
                'category'=> 'organic',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path d="M0 20c20 0 20 40 40 40s20-40 40-40v40C60 60 60 20 40 20S20 60 0 60V20z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/></svg>',
            ],
            'bauhaus-waves' => [
                'name'    => 'امواج باوهاوس (Bauhaus Waves)',
                'category'=> 'modernist',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 60 30"><path d="M0 15 Q 15 0, 30 15 T 60 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/></svg>',
            ],
            'circuit' => [
                'name'    => 'مدار الکترونیکی و فناوری (Tech Circuit)',
                'category'=> 'cyber',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><path d="M10 10h15v15H10zm25 0h5v15h-5zm0 25h15v10h-15zM0 25h10v5H0z" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><circle cx="10" cy="10" r="2" fill="currentColor" fill-opacity="{opacity}"/><circle cx="35" cy="35" r="2" fill="currentColor" fill-opacity="{opacity}"/></svg>',
            ],
            'hexagons' => [
                'name'    => 'شبکه لانه زنبوری (Hexagonal Matrix)',
                'category'=> 'geometry',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="48" viewBox="0 0 28 48"><path d="M14 0l14 8v16l-14 8L0 24V8l14-8zm0 48l14-8V24l-14 8-14-8v16l14 8z" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
        ];
    }

    /**
     * Generate data URI for given pattern and opacity
     */
    public static function get_data_uri($pattern_id = 'grid', $opacity = 0.08) {
        $catalog = self::get_patterns_catalog();
        if (!isset($catalog[$pattern_id])) {
            $pattern_id = 'grid';
        }

        $svg_raw = $catalog[$pattern_id]['svg'];
        $svg_with_opacity = str_replace('{opacity}', esc_attr((string)$opacity), $svg_raw);
        $encoded = rawurlencode($svg_with_opacity);

        return "data:image/svg+xml;utf8,{$encoded}";
    }

    /**
     * Inject dynamic CSS utility classes
     */
    public function inject_dynamic_pattern_styles() {
        $active_pattern = get_theme_mod('sedrazavi_bg_pattern', 'grid');
        $active_opacity = get_theme_mod('sedrazavi_bg_pattern_opacity', '0.07');
        $data_uri = self::get_data_uri($active_pattern, floatval($active_opacity));
        ?>
        <style id="sedrazavi-vector-pattern-css">
            :root {
                --sr-bg-pattern-uri: url("<?php echo $data_uri; ?>");
            }
            .sr-pattern-bg-active {
                background-image: var(--sr-bg-pattern-uri);
                background-repeat: repeat;
            }
            .sr-pattern-overlay {
                position: absolute;
                inset: 0;
                background-image: var(--sr-bg-pattern-uri);
                background-repeat: repeat;
                pointer-events: none;
                z-index: 1;
            }
        </style>
        <?php
    }

    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/patterns', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_patterns'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function rest_get_patterns($request) {
        $catalog = self::get_patterns_catalog();
        $output = [];
        foreach ($catalog as $key => $item) {
            $output[] = [
                'id'       => $key,
                'name'     => $item['name'],
                'category' => $item['category'],
                'data_uri' => self::get_data_uri($key, 0.15),
            ];
        }

        return rest_ensure_response([
            'success'  => true,
            'patterns' => $output,
        ]);
    }
}
