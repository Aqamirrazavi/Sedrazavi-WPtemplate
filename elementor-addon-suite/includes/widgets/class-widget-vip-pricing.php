<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * VIP Membership Tiers & Media Paywall Elementor Widget with Visual Style Tab
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
        // --- CONTENT SECTION ---
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
                'label'        => esc_html__('نمایش پلن ۳ ماهه (پیشنهادی)', 'universal-elementor-suite'),
                'type'         => Controls_Manager::SWITCHER,
                'default'      => 'yes',
                'return_value' => 'yes',
            ]
        );

        $this->add_control(
            'show_yearly',
            [
                'label'        => esc_html__('نمایش پلن ۱ ساله طلایی', 'universal-elementor-suite'),
                'type'         => Controls_Manager::SWITCHER,
                'default'      => 'yes',
                'return_value' => 'yes',
            ]
        );

        $this->end_controls_section();

        // --- STYLE SECTION ---
        $this->start_controls_section(
            'section_style_pricing',
            [
                'label' => esc_html__('استایل و رنگ‌بندی جدول قیمت', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'card_bg_color',
            [
                'label'     => esc_html__('رنگ پس‌زمینه کارت‌ها', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#0f172a',
                'selectors' => [
                    '{{WRAPPER}} .uas-vip-pricing-custom' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'vip_accent_color',
            [
                'label'     => esc_html__('رنگ برجسته پلن طلایی و دکمه‌ها', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#f59e0b',
                'selectors' => [
                    '{{WRAPPER}} .uas-vip-pricing-custom .badge-gold' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'     => 'header_typography',
                'label'    => esc_html__('تایپوگرافی عنوان', 'universal-elementor-suite'),
                'selector' => '{{WRAPPER}} .uas-vip-pricing-custom h3',
            ]
        );

        $this->add_responsive_control(
            'card_border_radius',
            [
                'label'      => esc_html__('گردی لبه‌ها (Border Radius)', 'universal-elementor-suite'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .uas-vip-pricing-custom' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name'     => 'pricing_shadow',
                'label'    => esc_html__('سایه کارت‌های اشتراک', 'universal-elementor-suite'),
                'selector' => '{{WRAPPER}} .uas-vip-pricing-custom',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $title = $settings['header_title'];
        ?>
        <div class="uas-vip-pricing-custom uas-widget-container" dir="rtl" style="border: 1px solid rgba(255,255,255,0.1); padding: 24px; border-radius: 16px;">
            <?php
            echo do_shortcode(sprintf(
                '[sedrazavi_vip_pricing title="%s"]',
                esc_attr($title)
            ));
            ?>
        </div>
        <?php
    }
}
