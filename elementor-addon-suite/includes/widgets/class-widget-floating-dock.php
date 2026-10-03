<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

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
