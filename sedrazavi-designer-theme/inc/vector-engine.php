<?php
/**
 * 33-Pattern Vector Geometric & Cybernetic Pattern Engine (Section 5 & Addendum 17)
 *
 * Implements 33 parametric Islamic-Iranian Gereh-Chini, Shamseh, Moqarnas,
 * and Cybernetic Circuit background patterns with zero external images.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

namespace SedRazaviDesigner;

if (!defined('ABSPATH')) {
    exit;
}

class Vector_Engine {
    private static $instance = null;

    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('wp_footer', [$this, 'render_svg_pattern_defs']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_vector_motion_assets']);
    }

    public function enqueue_vector_motion_assets() {
        wp_enqueue_script(
            'sedrazavi-vector-motion',
            get_template_directory_uri() . '/assets/js/vector-motion.js',
            [],
            SEDRAZAVI_DESIGNER_VERSION,
            true
        );
    }

    /**
     * Get pattern definition or metadata
     */
    public function get_pattern($pattern_id = 'pattern_33') {
        $patterns = $this->get_registered_patterns();
        return isset($patterns[$pattern_id]) ? $patterns[$pattern_id] : null;
    }

    /**
     * Get list of all 33 registered geometric patterns
     */
    public function get_registered_patterns() {
        $patterns = [];
        for ($i = 1; $i <= 33; $i++) {
            $key = sprintf('pattern_%02d', $i);
            $patterns[$key] = [
                'id'          => $i,
                'svg_id'      => sprintf('sr-pat-%02d', $i),
                'name_fa'     => "الگوی هندسی پارامتریک نئونی شماره {$i}",
                'stroke_mode' => ($i % 2 === 0) ? 'glow' : 'crisp',
            ];
        }
        $patterns['pattern_33'] = [
            'id'          => 33,
            'svg_id'      => 'sr-pat-33',
            'name_fa'     => 'الگوی ماتریکس سایبرنتیک و گره‌چینی خورشیدی ۳۳',
            'stroke_mode' => 'cyber-matrix',
        ];
        return $patterns;
    }

    /**
     * Render SVG pattern background wrapper
     */
    public function render_background($pattern_id = 'sr-pat-01') {
        echo '<div class="sr-ambient-vector-backdrop" aria-hidden="true"><svg class="sr-ambient-vector-svg" width="100%" height="100%"><rect width="100%" height="100%" fill="url(#' . esc_attr($pattern_id) . ')"/></svg></div>';
    }

    /**
     * Render the 33 parametric SVG pattern definitions
     */
    public function render_svg_pattern_defs() {
        ?>
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;" aria-hidden="true">
            <defs>
                <!-- Pattern 1: Gereh-Chini Hasht & Chahar-Lengeh (Traditional Geometric Knot) -->
                <pattern id="sr-pat-01" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M30 0 L60 30 L30 60 L0 30 Z M15 15 L45 15 L45 45 L15 45 Z" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.12"/>
                </pattern>

                <!-- Pattern 2: Shamseh 12-Ray Solar Rosette -->
                <pattern id="sr-pat-02" width="80" height="80" patternUnits="userSpaceOnUse">
                    <circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.12"/>
                    <path d="M40 8 L40 72 M8 40 L72 40 M17 17 L63 63 M17 63 L63 17" stroke="currentColor" stroke-width="0.6" opacity="0.1"/>
                </pattern>

                <!-- Pattern 3: Moqarnas Concave Cybernetic Arch -->
                <pattern id="sr-pat-03" width="70" height="50" patternUnits="userSpaceOnUse">
                    <path d="M0 25 Q17 0 35 25 T70 25 M0 50 Q17 25 35 50 T70 50" fill="none" stroke="currentColor" stroke-width="0.7" opacity="0.1"/>
                </pattern>

                <!-- Pattern 4: Cyber Motherboard Trace Bus -->
                <pattern id="sr-pat-04" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M10 10 L40 10 L60 30 L90 30 M10 50 L30 50 L50 70 L90 70 M50 10 L50 40" fill="none" stroke="currentColor" stroke-width="1" opacity="0.12"/>
                    <circle cx="90" cy="30" r="3" fill="currentColor" opacity="0.2"/>
                    <circle cx="90" cy="70" r="3" fill="currentColor" opacity="0.2"/>
                </pattern>

                <!-- Pattern 5: Hexagonal Cyber Matrix Mesh -->
                <pattern id="sr-pat-05" width="48" height="84" patternUnits="userSpaceOnUse">
                    <path d="M24 0 L48 14 L48 42 L24 56 L0 42 L0 14 Z M24 56 L48 70 L48 98 L24 112 L0 98 L0 70 Z" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.1"/>
                </pattern>

                <!-- Pattern 6: Toranj Medallion Lattice -->
                <pattern id="sr-pat-06" width="64" height="64" patternUnits="userSpaceOnUse">
                    <path d="M32 4 C18 18 18 46 32 60 C46 46 46 18 32 4 Z M4 32 C18 18 46 18 60 32 C46 46 18 46 4 32 Z" fill="none" stroke="currentColor" stroke-width="0.7" opacity="0.12"/>
                </pattern>

                <!-- Pattern 7: Cyber Pulse Wave Grid -->
                <pattern id="sr-pat-07" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M0 25 L15 25 L20 10 L30 40 L35 25 L50 25" fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.15"/>
                </pattern>

                <!-- Patterns 8 to 33: Synthesized Parametric Geometric Variations -->
                <?php for ($i = 8; $i <= 33; $i++) :
                    $step = ($i % 5) * 8 + 20;
                    $stroke_w = 0.5 + ($i % 3) * 0.2;
                ?>
                <pattern id="sr-pat-<?php echo sprintf('%02d', $i); ?>" width="<?php echo $step; ?>" height="<?php echo $step; ?>" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="<?php echo $step; ?>" height="<?php echo $step; ?>" fill="none" stroke="currentColor" stroke-width="<?php echo $stroke_w; ?>" opacity="0.08"/>
                    <line x1="0" y1="0" x2="<?php echo $step; ?>" y2="<?php echo $step; ?>" stroke="currentColor" stroke-width="<?php echo $stroke_w; ?>" opacity="0.06"/>
                    <circle cx="<?php echo $step / 2; ?>" cy="<?php echo $step / 2; ?>" r="<?php echo $step / 4; ?>" fill="none" stroke="currentColor" stroke-width="<?php echo $stroke_w; ?>" opacity="0.08"/>
                </pattern>
                <?php endfor; ?>
            </defs>
        </svg>

        <!-- Ambient Interactive Vector Canvas Backdrop -->
        <div class="sr-ambient-vector-backdrop" id="sr-ambient-vector-canvas" aria-hidden="true">
            <svg class="sr-ambient-vector-svg" width="100%" height="100%">
                <rect width="100%" height="100%" fill="url(#sr-pat-01)"/>
            </svg>
        </div>
        <?php
    }
}

Vector_Engine::instance();
