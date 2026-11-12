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
        $title = !empty($settings['header_title']) ? $settings['header_title'] : esc_html__('پلن‌های عضویت ویژه و دانلود نامحدود', 'universal-elementor-suite');
        $show_m = !isset($settings['show_monthly']) || $settings['show_monthly'] === 'yes';
        $show_q = !isset($settings['show_quarterly']) || $settings['show_quarterly'] === 'yes';
        $show_y = !isset($settings['show_yearly']) || $settings['show_yearly'] === 'yes';
        ?>
        <div class="uas-vip-pricing-custom uas-widget-container" dir="rtl" style="border: 1px solid rgba(255,255,255,0.1); padding: 24px; border-radius: 16px; background: #0f172a; color: #f8fafc;">
            <?php
            if (shortcode_exists('sedrazavi_vip_pricing')) {
                echo do_shortcode(sprintf(
                    '[sedrazavi_vip_pricing title="%s"]',
                    esc_attr($title)
                ));
            } else {
                ?>
                <h3 style="margin: 0 0 20px; text-align: center; font-size: 20px; font-weight: 800; color: #fff;"><?php echo esc_html($title); ?></h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px;">
                    <?php if ($show_m): ?>
                        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; text-align: center;">
                            <div style="font-size: 14px; color: #94a3b8; margin-bottom: 8px;">اشتراک ۱ ماهه پایه</div>
                            <div style="font-size: 24px; font-weight: 900; color: #3b82f6; margin-bottom: 12px;">۲۹۰,۰۰۰ تومان</div>
                            <a href="#subscribe-monthly" style="display: inline-block; padding: 8px 18px; border-radius: 8px; background: #1e293b; color: #fff; text-decoration: none; font-size: 13px;">انتخاب پلن</a>
                        </div>
                    <?php endif; ?>
                    <?php if ($show_q): ?>
                        <div style="background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.45); border-radius: 12px; padding: 20px; text-align: center;">
                            <span class="badge-gold" style="display: inline-block; font-size: 11px; padding: 3px 10px; border-radius: 9999px; background: #f59e0b; color: #0f172a; font-weight: 700; margin-bottom: 8px;">پیشنهادی</span>
                            <div style="font-size: 14px; color: #fde68a; margin-bottom: 8px;">اشتراک ۳ ماهه حرفه‌ای</div>
                            <div style="font-size: 24px; font-weight: 900; color: #fff; margin-bottom: 12px;">۶۹۰,۰۰۰ تومان</div>
                            <a href="#subscribe-quarterly" style="display: inline-block; padding: 8px 18px; border-radius: 8px; background: #f59e0b; color: #0f172a; text-decoration: none; font-weight: 700; font-size: 13px;">شروع اشتراک</a>
                        </div>
                    <?php endif; ?>
                    <?php if ($show_y): ?>
                        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; text-align: center;">
                            <div style="font-size: 14px; color: #94a3b8; margin-bottom: 8px;">اشتراک ۱ ساله طلایی VIP</div>
                            <div style="font-size: 24px; font-weight: 900; color: #10b981; margin-bottom: 12px;">۱,۹۹۰,۰۰۰ تومان</div>
                            <a href="#subscribe-yearly" style="display: inline-block; padding: 8px 18px; border-radius: 8px; background: #10b981; color: #fff; text-decoration: none; font-weight: 700; font-size: 13px;">انتخاب پلن طلایی</a>
                        </div>
                    <?php endif; ?>
                </div>
                <?php
            }
            ?>
        </div>
        <?php
    }
}
