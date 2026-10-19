<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * VIP Membership Tiers & Media Paywall Elementor Widget
 */
class Universal_VIP_Pricing_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_vip_pricing';
    }

    public function get_title() {
        return esc_html__('پلن‌های اشتراک ویژه (VIP) و پی‌وال', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-price-table';
    }

    public function get_style_depends() {
        return ['uas-widgets-core'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات پلن‌های VIP', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'header_title',
            [
                'label'   => esc_html__('عنوان بالای جدول', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('پلن‌های عضویت ویژه و دانلود نامحدود', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'show_monthly',
            [
                'label'        => esc_html__('نمایش پلن ۱ ماهه', 'universal-elementor-suite'),
                'type'         => Controls_Manager::SWITCHER,
                'default'      => 'yes',
                'return_value' => 'yes',
            ]
        );

        $this->add_control(
            'show_quarterly',
            [
                'label'        => esc_html__('نمایش پلن ۳ ماهه (پیشنهاد ویژه)', 'universal-elementor-suite'),
                'type'         => Controls_Manager::SWITCHER,
                'default'      => 'yes',
                'return_value' => 'yes',
            ]
        );

        $this->add_control(
            'show_yearly',
            [
                'label'        => esc_html__('نمایش پلن ۱ ساله VIP طلایی', 'universal-elementor-suite'),
                'type'         => Controls_Manager::SWITCHER,
                'default'      => 'yes',
                'return_value' => 'yes',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $title = $settings['header_title'];

        echo do_shortcode(sprintf(
            '[sedrazavi_vip_pricing_table title="%s"]',
            esc_attr($title)
        ));
    }
}
