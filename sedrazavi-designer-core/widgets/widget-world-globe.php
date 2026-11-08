<?php
/**
 * World Globe Clock Elementor Widget
 *
 * 3D vector world clock globe with city search.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore\Widgets;

if (!defined('ABSPATH')) {
    exit;
}

class Widget_World_Globe extends \Elementor\Widget_Base {

    public function get_name() {
        return 'sr_world_globe';
    }

    public function get_title() {
        return esc_html__('کره سه‌بعدی ساعت جهانی (World Globe)', 'sedrazavi-designer-core');
    }

    public function get_icon() {
        return 'eicon-globe';
    }

    public function get_categories() {
        return ['sedrazavi-designer'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_globe',
            [
                'label' => esc_html__('تنظیمات کره و پایتخت‌ها', 'sedrazavi-designer-core'),
                'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'globe_size',
            [
                'label'   => esc_html__('قطر کره (پیکسل)', 'sedrazavi-designer-core'),
                'type'    => \Elementor\Controls_Manager::NUMBER,
                'min'     => 180,
                'max'     => 450,
                'step'    => 10,
                'default' => 260,
            ]
        );

        $this->add_control(
            'neon_color',
            [
                'label'     => esc_html__('رنگ مدارات نئونی', 'sedrazavi-designer-core'),
                'type'      => \Elementor\Controls_Manager::COLOR,
                'default'   => '#00f0ff',
                'selectors' => [
                    '{{WRAPPER}} .sr-globe-ring' => 'border-color: {{VALUE}}; box-shadow: 0 0 20px {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $is_editor = \Elementor\Plugin::$instance->editor->is_edit_mode();
        $size = !empty($settings['globe_size']) ? intval($settings['globe_size']) : 260;
        ?>
        <div class="sr-world-globe-widget" style="--globe-size: <?php echo esc_attr($size); ?>px;">
            <div class="sr-globe-viewport">
                <div class="sr-globe-ring">
                    <div class="sr-globe-sphere">
                        <span class="sr-globe-icon">🌍</span>
                    </div>
                </div>
            </div>

            <div class="sr-globe-cities-list">
                <div class="sr-city-row" data-tz="Asia/Tehran">
                    <span class="sr-city-name">تهران (Tehran)</span>
                    <strong class="sr-city-time">--:--</strong>
                </div>
                <div class="sr-city-row" data-tz="Asia/Dubai">
                    <span class="sr-city-name">دبی (Dubai)</span>
                    <strong class="sr-city-time">--:--</strong>
                </div>
                <div class="sr-city-row" data-tz="Europe/London">
                    <span class="sr-city-name">لندن (London)</span>
                    <strong class="sr-city-time">--:--</strong>
                </div>
                <div class="sr-city-row" data-tz="America/New_York">
                    <span class="sr-city-name">نیویورک (New York)</span>
                    <strong class="sr-city-time">--:--</strong>
                </div>
                <div class="sr-city-row" data-tz="Asia/Tokyo">
                    <span class="sr-city-name">توکیو (Tokyo)</span>
                    <strong class="sr-city-time">--:--</strong>
                </div>
            </div>
        </div>
        <?php
    }
}
