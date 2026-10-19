<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Soft98-Style Multi-Server Download Box Elementor Widget
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
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

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
    }
}
