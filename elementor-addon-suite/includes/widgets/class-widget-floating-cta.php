<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal High-Converting Floating CTA Dock Widget
 *
 * Sticky conversion dock anchored to bottom or top of viewport for landing pages
 * with direct call, WhatsApp, consultation action, and full 3-tab Elementor controls.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Universal_Floating_CTA_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_floating_cta';
    }

    public function get_title() {
        return esc_html__('نوار چسبان و شناور نرخ تبدیل (Floating CTA Dock)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-anchor';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-floating-cta-css'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core', 'uas-floating-cta-js'];
    }

    protected function register_controls() {
        // --- 1. TAB_CONTENT: General & Position ---
        $this->start_controls_section(
            'section_general',
            [
                'label' => esc_html__('موقعیت و تنظیمات عمومی', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'dock_position',
            [
                'label'   => esc_html__('موقعیت قرارگیری نوار در صفحه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => 'bottom',
                'options' => [
                    'bottom' => esc_html__('پایین صفحه (چسبان)', 'universal-elementor-suite'),
                    'top'    => esc_html__('بالای صفحه (چسبان زیر هدر)', 'universal-elementor-suite'),
                ],
            ]
        );

        $this->add_control(
            'scroll_trigger',
            [
                'label'       => esc_html__('نمایش پس از اسکرول (پیکسل)', 'universal-elementor-suite'),
                'type'        => Controls_Manager::NUMBER,
                'min'         => 0,
                'max'         => 2000,
                'step'        => 50,
                'default'     => 150,
                'description' => esc_html__('در مقدار ۰ از ابتدای لود صفحه نمایان خواهد بود.', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'cta_headline',
            [
                'label'   => esc_html__('تیتر یا پیشنهاد فوری', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('نیاز به راهنمایی و اجرای سریع دارید؟ با ما در ارتباط باشید', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'cta_subtext',
            [
                'label'   => esc_html__('زیرعنوان یا برچسب تخفیف', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('مشاوره اولیه رایگان + پاسخگویی در کمتر از ۳۰ دقیقه', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();

        // --- 2. TAB_CONTENT: Action Buttons ---
        $this->start_controls_section(
            'section_actions',
            [
                'label' => esc_html__('دکمه‌های اقدام و تماس', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        // Action 1: Primary CTA
        $this->add_control(
            'primary_btn_text',
            [
                'label'   => esc_html__('متن دکمه اصلی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('درخواست مشاوره فوری', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'primary_btn_url',
            [
                'label'   => esc_html__('لینک دکمه اصلی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::URL,
                'default' => ['url' => '#contact'],
            ]
        );

        // Action 2: Phone Call
        $this->add_control(
            'show_phone_btn',
            [
                'label'   => esc_html__('نمایش دکمه تماس تلفنی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SWITCHER,
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'phone_number',
            [
                'label'     => esc_html__('شماره تماس (tel:)', 'universal-elementor-suite'),
                'type'      => Controls_Manager::TEXT,
                'default'   => '02188889999',
                'condition' => ['show_phone_btn' => 'yes'],
            ]
        );

        // Action 3: WhatsApp
        $this->add_control(
            'show_whatsapp_btn',
            [
                'label'   => esc_html__('نمایش دکمه پشتیبانی واتساپ', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SWITCHER,
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'whatsapp_number',
            [
                'label'     => esc_html__('شماره واتساپ (با کد کشور)', 'universal-elementor-suite'),
                'type'      => Controls_Manager::TEXT,
                'default'   => '989123456789',
                'condition' => ['show_whatsapp_btn' => 'yes'],
            ]
        );

        $this->end_controls_section();

        // --- 3. TAB_STYLE: Dock Container Style ---
        $this->start_controls_section(
            'section_style_dock',
            [
                'label' => esc_html__('ظاهر و استایل نوار شناور', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'dock_bg_color',
            [
                'label'     => esc_html__('رنگ پس‌زمینه نوار', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => 'rgba(15, 23, 42, 0.92)',
                'selectors' => [
                    '{{WRAPPER}} .uas-floating-cta-inner' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_typography_and_color_controls('cta_headline', esc_html__('تیتر پیشنهاد', 'universal-elementor-suite'), '.uas-floating-cta-title', '#FFFFFF');
        $this->add_typography_and_color_controls('cta_subtext', esc_html__('زیرعنوان', 'universal-elementor-suite'), '.uas-floating-cta-sub', '#94A3B8');

        $this->end_controls_section();

        // --- 4. TAB_STYLE: Buttons Style ---
        $this->start_controls_section(
            'section_style_buttons',
            [
                'label' => esc_html__('استایل دکمه‌های اقدام', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'primary_btn_bg',
            [
                'label'     => esc_html__('رنگ دکمه اصلی', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#6366F1',
                'selectors' => [
                    '{{WRAPPER}} .uas-floating-primary-btn' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'primary_btn_color',
            [
                'label'     => esc_html__('رنگ متن دکمه اصلی', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#FFFFFF',
                'selectors' => [
                    '{{WRAPPER}} .uas-floating-primary-btn' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $position = esc_attr($settings['dock_position'] ?? 'bottom');
        $trigger  = intval($settings['scroll_trigger'] ?? 150);
        $primary_url = !empty($settings['primary_btn_url']['url']) ? esc_url($settings['primary_btn_url']['url']) : '#';
        $phone_raw = preg_replace('/[^0-9+]/', '', $settings['phone_number'] ?? '');
        $wa_raw    = preg_replace('/[^0-9]/', '', $settings['whatsapp_number'] ?? '');
        ?>
        <div class="uas-floating-cta-dock uas-pos-<?php echo $position; ?>" data-trigger="<?php echo esc_attr($trigger); ?>" dir="rtl">
            <div class="uas-floating-cta-inner">
                <div class="uas-floating-cta-text-wrap">
                    <span class="uas-floating-cta-pulse-badge"></span>
                    <div>
                        <div class="uas-floating-cta-title"><?php echo esc_html($settings['cta_headline']); ?></div>
                        <?php if (!empty($settings['cta_subtext'])) : ?>
                            <div class="uas-floating-cta-sub"><?php echo esc_html($settings['cta_subtext']); ?></div>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="uas-floating-cta-actions">
                    <?php if ($settings['show_phone_btn'] === 'yes' && !empty($phone_raw)) : ?>
                        <a href="tel:<?php echo esc_attr($phone_raw); ?>" class="uas-floating-btn uas-btn-call" title="<?php esc_attr_e('تماس تلفنی مستقیم', 'universal-elementor-suite'); ?>">
                            📞 <span class="uas-hide-sm"><?php esc_html_e('تماس', 'universal-elementor-suite'); ?></span>
                        </a>
                    <?php endif; ?>

                    <?php if ($settings['show_whatsapp_btn'] === 'yes' && !empty($wa_raw)) : ?>
                        <a href="https://wa.me/<?php echo esc_attr($wa_raw); ?>" target="_blank" rel="noopener noreferrer" class="uas-floating-btn uas-btn-whatsapp" title="<?php esc_attr_e('پشتیبانی واتساپ', 'universal-elementor-suite'); ?>">
                            💬 <span class="uas-hide-sm"><?php esc_html_e('واتساپ', 'universal-elementor-suite'); ?></span>
                        </a>
                    <?php endif; ?>

                    <?php if (!empty($settings['primary_btn_text'])) : ?>
                        <a href="<?php echo $primary_url; ?>" class="uas-floating-btn uas-floating-primary-btn">
                            <?php echo esc_html($settings['primary_btn_text']); ?> ⚡
                        </a>
                    <?php endif; ?>

                    <button type="button" class="uas-floating-dismiss" aria-label="<?php esc_attr_e('بستن نوار شناور', 'universal-elementor-suite'); ?>">✕</button>
                </div>
            </div>
        </div>
        <?php
    }
}
