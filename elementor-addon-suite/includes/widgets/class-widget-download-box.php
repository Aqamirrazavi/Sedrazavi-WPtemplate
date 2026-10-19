<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Border;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Soft98-Style Multi-Server Download Box Elementor Widget with Full Visual Styling
 */
class Universal_Download_Box_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_download_box';
    }

    public function get_title() {
        return esc_html__('جعبه دانلود حرفه‌ای Soft98', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-file-download';
    }

    public function get_style_depends() {
        return ['uas-widgets-core'];
    }

    protected function register_controls() {
        // --- CONTENT SECTION ---
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('اطلاعات فایل دانلودی', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'box_title',
            [
                'label'   => esc_html__('عنوان بسته نرم‌افزاری', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('دانلود بسته نرم‌افزار جامع SedRazavi OS', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'version',
            [
                'label'   => esc_html__('شماره نسخه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'v5.0.0 (نسخه نهایی)',
            ]
        );

        $this->add_control(
            'filesize',
            [
                'label'   => esc_html__('حجم فایل', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '۴۸ مگابایت',
            ]
        );

        $this->add_control(
            'os',
            [
                'label'   => esc_html__('سیستم‌عامل‌های پشتیبانی شده', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'windows,mac,linux,android',
            ]
        );

        $this->add_control(
            'password',
            [
                'label'   => esc_html__('رمز فایل فشرده', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'www.sedrazavi.ir',
            ]
        );

        $this->add_control(
            'direct_url',
            [
                'label'   => esc_html__('لینک مستقیم سرور ۱', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '#download-direct-server-1',
            ]
        );

        $this->add_control(
            'mirror_url',
            [
                'label'   => esc_html__('لینک کمکی سرور ۲', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '#download-mirror-server-2',
            ]
        );

        $this->end_controls_section();

        // --- STYLE SECTION: CONTAINER ---
        $this->start_controls_section(
            'section_style_box',
            [
                'label' => esc_html__('استایل جعبه دانلود', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'box_bg_color',
            [
                'label'     => esc_html__('رنگ پس‌زمینه کارت', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#0f172a',
                'selectors' => [
                    '{{WRAPPER}} .uas-dl-box-custom' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'primary_accent_color',
            [
                'label'     => esc_html__('رنگ آیکون‌ها و دکمه دانلود', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#2563eb',
                'selectors' => [
                    '{{WRAPPER}} .uas-btn-direct' => 'background-color: {{VALUE}};',
                    '{{WRAPPER}} .uas-dl-title'   => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'     => 'title_typography',
                'label'    => esc_html__('تایپوگرافی عنوان', 'universal-elementor-suite'),
                'selector' => '{{WRAPPER}} .uas-dl-title',
            ]
        );

        $this->add_responsive_control(
            'box_padding',
            [
                'label'      => esc_html__('فاصله‌های درونی (Padding)', 'universal-elementor-suite'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .uas-dl-box-custom' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'box_border_radius',
            [
                'label'      => esc_html__('گردی لبه‌ها (Border Radius)', 'universal-elementor-suite'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .uas-dl-box-custom' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name'     => 'box_shadow',
                'label'    => esc_html__('سایه کارت (Box Shadow)', 'universal-elementor-suite'),
                'selector' => '{{WRAPPER}} .uas-dl-box-custom',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-dl-box-custom uas-widget-container" dir="rtl" style="border: 1px solid rgba(255,255,255,0.1); overflow: hidden;">
            <?php
            echo do_shortcode(sprintf(
                '[sedrazavi_download_box title="%s" version="%s" filesize="%s" os="%s" password="%s" direct_url="%s" mirror_url="%s"]',
                esc_attr($settings['box_title']),
                esc_attr($settings['version']),
                esc_attr($settings['filesize']),
                esc_attr($settings['os']),
                esc_attr($settings['password']),
                esc_url($settings['direct_url']),
                esc_url($settings['mirror_url'])
            ));
            ?>
        </div>
        <?php
    }
}
