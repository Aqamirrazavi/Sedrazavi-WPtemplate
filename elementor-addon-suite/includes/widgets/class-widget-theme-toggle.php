<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

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
