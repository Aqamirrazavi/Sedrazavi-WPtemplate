<?php
/**
 * Pure Galactic Interstellar Starfield Warp Engine (Addenda 29.0 & 30.0)
 *
 * Implements the full-bleed pure cosmic background with scroll acceleration and damping.
 * Pure cosmic space, zero cockpit/window frames.
 *
 * @package SedRazavi_Designer_Theme
 * @version 2.0.0
 */

namespace SedRazaviDesigner;

if (!defined('ABSPATH')) {
    exit;
}

class Starfield_Warp {
    private static $instance = null;

    public static function instance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('wp_footer', [$this, 'render_starfield_canvas'], 1);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
        add_action('customize_register', [$this, 'register_customizer_controls']);
    }

    public function enqueue_scripts() {
        if (!get_theme_mod('sr_starfield_enable', true)) {
            return;
        }

        wp_enqueue_script(
            'sedrazavi-starfield-warp',
            get_template_directory_uri() . '/assets/js/starfield-warp.js',
            [],
            SEDRAZAVI_DESIGNER_VERSION,
            true
        );
    }

    /**
     * Render the full-bleed pure canvas backdrop (Zero cockpit obstruction)
     */
    public function render_starfield_canvas() {
        if (!get_theme_mod('sr_starfield_enable', true)) {
            return;
        }
        ?>
        <!-- Pure Deep Cosmic Starfield Canvas (No cockpit or frame obstruction) -->
        <canvas id="sr-starfield-canvas" class="sr-starfield-fullbleed" aria-hidden="true"></canvas>
        <style>
            #sr-starfield-canvas {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: -1;
                pointer-events: none;
                background: transparent;
            }
        </style>
        <?php
    }

    public function register_customizer_controls($wp_customize) {
        $wp_customize->add_section('sr_starfield_section', [
            'title'       => __('✨ پس‌زمینه کهکشان و پرواز بین‌ستاره‌ای', 'sedrazavi-designer-theme'),
            'priority'    => 35,
            'description' => __('تنظیمات موتور پرواز ستاره‌ای و شتاب با اسکرول (الحاقیه ۳۰ مسترپرامپت)', 'sedrazavi-designer-theme'),
        ]);

        $wp_customize->add_setting('sr_starfield_enable', [
            'default'           => true,
            'sanitize_callback' => 'wp_validate_boolean',
        ]);

        $wp_customize->add_control('sr_starfield_enable', [
            'label'    => __('فعال‌سازی پس‌زمینه کهکشان پویا', 'sedrazavi-designer-theme'),
            'section'  => 'sr_starfield_section',
            'type'     => 'checkbox',
        ]);
    }
}

Starfield_Warp::instance();
