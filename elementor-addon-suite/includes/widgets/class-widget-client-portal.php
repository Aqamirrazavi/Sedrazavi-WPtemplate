<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dynamic Multi-Niche Client Portal Elementor Widget
 */
class Universal_Client_Portal_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_client_portal';
    }

    public function get_title() {
        return esc_html__('پورتال هوشمند مشتری و کاربر', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-user-preferences';
    }

    public function get_style_depends() {
        return ['uas-widgets-core'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('پیکربندی پورتال کاربر', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'portal_title',
            [
                'label'   => esc_html__('عنوان بالای پورتال', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('داشبورد کاربری و خدمات اختصاصی', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        echo do_shortcode('[sedrazavi_client_dashboard]');
    }
}
