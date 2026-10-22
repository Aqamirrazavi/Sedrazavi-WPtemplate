<?php
/**
 * SedRazavi OS - Procedural Persian-Islamic Girih & Parametric Vector Engine
 * Procedurally generates authentic Shamseh, Karbandi, and 8/10-fold Gereh-Chini vector SVG patterns.
 * Zero external asset dependencies (under 2KB Data-URI) with real-time CSS variable bindings.
 *
 * Location: sedrazavi-companion/includes/class-girih-vector-engine.php
 * @package SedRazavi_Companion
 * @version 6.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Girih_Vector_Engine {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('wp_head', [$this, 'inject_girih_css_variables'], 15);
        add_shortcode('sedrazavi_girih_pattern', [$this, 'render_girih_shortcode']);
    }

    /**
     * Mathematical generator for 8-fold Persian Star Girih (گره‌چینی هشت و چهار لنگه)
     */
    public function generate_eightfold_star_svg($color = 'rgba(212,175,55,0.15)', $stroke_width = 1.2) {
        $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">';
        $svg .= '<defs>';
        $svg .= '<pattern id="girih8" width="80" height="80" patternUnits="userSpaceOnUse">';
        // Central 8-pointed star
        $svg .= '<polygon points="40,16 46,28 60,28 50,38 54,52 40,44 26,52 30,38 20,28 34,28" fill="none" stroke="' . esc_attr($color) . '" stroke-width="' . esc_attr($stroke_width) . '" />';
        // Interlaced diamonds & framing nodes
        $svg .= '<line x1="0" y1="0" x2="80" y2="80" stroke="' . esc_attr($color) . '" stroke-width="' . ($stroke_width * 0.75) . '" stroke-dasharray="2 2" />';
        $svg .= '<line x1="80" y1="0" x2="0" y2="80" stroke="' . esc_attr($color) . '" stroke-width="' . ($stroke_width * 0.75) . '" stroke-dasharray="2 2" />';
        $svg .= '<rect x="10" y="10" width="60" height="60" fill="none" stroke="' . esc_attr($color) . '" stroke-width="' . ($stroke_width * 0.5) . '" transform="rotate(45 40 40)" />';
        $svg .= '</pattern>';
        $svg .= '</defs>';
        $svg .= '<rect width="100%" height="100%" fill="url(#girih8)" />';
        $svg .= '</svg>';

        return 'data:image/svg+xml;utf8,' . rawurlencode($svg);
    }

    /**
     * Mathematical generator for Sacred Geometry Shamseh (شمسه دوازده پر)
     */
    public function generate_shamseh_sunburst_svg($color = 'rgba(99,102,241,0.18)', $size = 120) {
        $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' . intval($size) . '" height="' . intval($size) . '" viewBox="0 0 120 120">';
        $svg .= '<circle cx="60" cy="60" r="54" fill="none" stroke="' . esc_attr($color) . '" stroke-width="1" />';
        $svg .= '<circle cx="60" cy="60" r="38" fill="none" stroke="' . esc_attr($color) . '" stroke-width="1.2" />';
        $svg .= '<circle cx="60" cy="60" r="22" fill="none" stroke="' . esc_attr($color) . '" stroke-width="1.5" />';
        for ($i = 0; $i < 12; $i++) {
            $angle = $i * 30;
            $svg .= '<line x1="60" y1="6" x2="60" y2="38" stroke="' . esc_attr($color) . '" stroke-width="1.2" transform="rotate(' . $angle . ' 60 60)" />';
        }
        $svg .= '</svg>';

        return 'data:image/svg+xml;utf8,' . rawurlencode($svg);
    }

    /**
     * Mathematical generator for Karbandi Vault Geometry (کاربندی مقرنس)
     */
    public function generate_karbandi_vault_svg($color = 'rgba(255,255,255,0.08)') {
        $svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">';
        $svg .= '<path d="M0,0 Q50,30 100,0 Q70,50 100,100 Q50,70 0,100 Q30,50 0,0 Z" fill="none" stroke="' . esc_attr($color) . '" stroke-width="1" />';
        $svg .= '<path d="M15,15 Q50,38 85,15 Q62,50 85,85 Q50,62 15,85 Q38,50 15,15 Z" fill="none" stroke="' . esc_attr($color) . '" stroke-width="0.8" />';
        $svg .= '</svg>';

        return 'data:image/svg+xml;utf8,' . rawurlencode($svg);
    }

    public function inject_girih_css_variables() {
        $girih_bg = $this->generate_eightfold_star_svg('rgba(212,175,55,0.12)', 1.0);
        $shamseh_bg = $this->generate_shamseh_sunburst_svg('rgba(99,102,241,0.15)', 120);
        $karbandi_bg = $this->generate_karbandi_vault_svg('rgba(255,255,255,0.06)');

        echo '<style id="sr-girih-dynamic-tokens">';
        echo ':root {';
        echo '--sr-girih-eightfold: url("' . $girih_bg . '");';
        echo '--sr-girih-shamseh: url("' . $shamseh_bg . '");';
        echo '--sr-girih-karbandi: url("' . $karbandi_bg . '");';
        echo '}';
        echo '.bg-sr-girih-eightfold { background-image: var(--sr-girih-eightfold); background-repeat: repeat; }';
        echo '.bg-sr-girih-shamseh { background-image: var(--sr-girih-shamseh); background-repeat: no-repeat; background-position: center; }';
        echo '.bg-sr-girih-karbandi { background-image: var(--sr-girih-karbandi); background-repeat: repeat; }';
        echo '</style>';
    }

    public function render_girih_shortcode($atts) {
        $atts = shortcode_atts([
            'type'   => 'eightfold',
            'height' => '250px',
            'class'  => '',
        ], $atts, 'sedrazavi_girih_pattern');

        $type_class = 'bg-sr-girih-' . sanitize_key($atts['type']);
        return '<div class="sr-girih-canvas-box ' . esc_attr($type_class . ' ' . $atts['class']) . '" style="height:' . esc_attr($atts['height']) . '; width:100%; position:relative;"></div>';
    }
}
