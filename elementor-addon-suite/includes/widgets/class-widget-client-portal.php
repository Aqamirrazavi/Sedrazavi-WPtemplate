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

        $this->add_control(
            'show_stats',
            [
                'label'        => esc_html__('نمایش کارت‌های آماری', 'universal-elementor-suite'),
                'type'         => Controls_Manager::SWITCHER,
                'default'      => 'yes',
                'return_value' => 'yes',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_style',
            [
                'label' => esc_html__('استایل و ظاهر نئونی', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'card_bg',
            [
                'label'     => esc_html__('رنگ پس‌زمینه کارت‌ها', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#0F172A',
                'selectors' => [
                    '{{WRAPPER}} .sr-client-portal-box' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $title = !empty($settings['portal_title']) ? $settings['portal_title'] : esc_html__('داشبورد کاربری و خدمات اختصاصی', 'universal-elementor-suite');
        $show_stats = !empty($settings['show_stats']) && 'yes' === $settings['show_stats'];
        $is_auth = is_user_logged_in();
        $user = $is_auth ? wp_get_current_user() : null;

        // If shortcode function exists and produces output, we can integrate it, otherwise render pure native semantic UI
        ?>
        <div class="sr-client-portal-widget-wrapper" dir="rtl">
            <div class="sr-client-portal-box" style="padding: 24px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: #0F172A; color: #F8FAFC;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 14px; margin-bottom: 16px;">
                    <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: #FFFFFF;"><?php echo esc_html($title); ?></h3>
                    <?php if ($is_auth && $user): ?>
                        <span style="font-size: 12px; padding: 4px 10px; background: rgba(16,185,129,0.15); color: #10B981; border-radius: 9999px;">
                            <?php echo esc_html($user->display_name); ?> (آنلاین)
                        </span>
                    <?php else: ?>
                        <a href="<?php echo esc_url(wp_login_url(get_permalink())); ?>" style="font-size: 12px; padding: 6px 14px; background: #3B82F6; color: #FFFFFF; text-decoration: none; border-radius: 6px;">ورود به حساب</a>
                    <?php endif; ?>
                </div>

                <?php if ($show_stats): ?>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 18px;">
                        <div style="background: rgba(255,255,255,0.04); padding: 12px; border-radius: 8px; text-align: center;">
                            <span style="display: block; font-size: 20px; font-weight: 800; color: #00D1FF;">۱</span>
                            <span style="font-size: 11px; color: #94A3B8;">سفارشات جاری</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.04); padding: 12px; border-radius: 8px; text-align: center;">
                            <span style="display: block; font-size: 20px; font-weight: 800; color: #10B981;">۱۰۰٪</span>
                            <span style="font-size: 11px; color: #94A3B8;">پیشرفت تاییدیه</span>
                        </div>
                        <div style="background: rgba(255,255,255,0.04); padding: 12px; border-radius: 8px; text-align: center;">
                            <span style="display: block; font-size: 20px; font-weight: 800; color: #F59E0B;">SR-9820</span>
                            <span style="font-size: 11px; color: #94A3B8;">کد رهگیری</span>
                        </div>
                    </div>
                <?php endif; ?>

                <?php
                // If shortcode hook is registered, invoke it cleanly inside the native container
                if (shortcode_exists('sedrazavi_client_dashboard')) {
                    echo do_shortcode('[sedrazavi_client_dashboard]');
                }
                ?>
            </div>
        </div>
        <?php
    }
}
