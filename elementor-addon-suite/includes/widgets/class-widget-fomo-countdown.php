<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal FOMO Urgency & Countdown Bar Widget
 */
class Universal_FOMO_Countdown_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_fomo_countdown';
    }

    public function get_title() {
        return esc_html__('نوار فوریت و شمارش معکوس تخفیف (FOMO)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-countdown';
    }

    public function get_style_depends() {
        return ['uas-widgets-core'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core', 'uas-fomo-countdown-js'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات نوار فوریت و تایمر', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'badge_text',
            [
                'label'   => esc_html__('متن نشانک (Badge)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'پیشنهاد شگفت‌انگیز محدود',
            ]
        );

        $this->add_control(
            'heading_text',
            [
                'label'   => esc_html__('عنوان پیشنهاد', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'تخفیف ویژه ۴۰ درصدی برای ثبت‌نام در لایسنس حرفه‌ای',
            ]
        );

        $this->add_control(
            'countdown_hours',
            [
                'label'   => esc_html__('تعداد ساعت شمارش معکوس پویا', 'universal-elementor-suite'),
                'type'    => Controls_Manager::NUMBER,
                'default' => 12,
                'min'     => 1,
                'max'     => 720,
            ]
        );

        $this->add_control(
            'remaining_count',
            [
                'label'   => esc_html__('ظرفیت / تعداد باقی‌مانده', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'تنها ۷ عدد لایسنس با این قیمت باقیست',
            ]
        );

        $this->add_control(
            'btn_text',
            [
                'label'   => esc_html__('متن دکمه خرید سریع', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'استفاده از تخفیف ویژه ←',
            ]
        );

        $this->add_control(
            'btn_url',
            [
                'label'   => esc_html__('لینک دکمه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::URL,
                'default' => ['url' => '#pricing'],
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_style',
            [
                'label' => esc_html__('تنظیمات رنگ و استایل', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'bar_background',
            [
                'label'     => esc_html__('رنگ پس‌زمینه نوار', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#0B132B',
                'selectors' => [
                    '{{WRAPPER}} .uas-fomo-bar' => 'background: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'accent_color',
            [
                'label'     => esc_html__('رنگ تاکیدی', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#8B5CF6',
                'selectors' => [
                    '{{WRAPPER}} .uas-fomo-btn' => 'background: {{VALUE}};',
                    '{{WRAPPER}} .uas-fomo-digit' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $widget_id = $this->get_id();
        $hours = !empty($settings['countdown_hours']) ? (int)$settings['countdown_hours'] : 12;
        $total_seconds = $hours * 3600;
        ?>
        <div class="uas-fomo-bar" id="uas-fomo-<?php echo esc_attr($widget_id); ?>" data-widget-id="<?php echo esc_attr($widget_id); ?>" data-duration="<?php echo esc_attr($total_seconds); ?>" style="background: linear-gradient(135deg, #0b132b, #1c2541); border: 1px solid rgba(139,92,246,0.3); border-radius: 16px; padding: 20px 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; color: #fff;">
            
            <div style="display:flex; flex-direction:column; gap:6px; max-width: 450px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="background: #ef4444; color:#fff; font-size:11px; font-weight:700; padding:3px 10px; border-radius:9999px; animation: pulse 2s infinite;">
                        <?php echo esc_html($settings['badge_text']); ?>
                    </span>
                    <span style="font-size: 13px; color: #a78bfa; font-weight: 600;">
                        🔥 <?php echo esc_html($settings['remaining_count']); ?>
                    </span>
                </div>
                <h4 style="margin:0; font-size: 16px; font-weight: 700; color: #f8fafc;">
                    <?php echo esc_html($settings['heading_text']); ?>
                </h4>
            </div>

            <!-- Timer Digits -->
            <div class="uas-fomo-timer" style="display:flex; align-items:center; gap:10px;">
                <div style="text-align:center;">
                    <div class="uas-fomo-digit uas-timer-hours" style="background:#131d38; border:1px solid #8b5cf6; border-radius:10px; min-width:44px; padding:6px 10px; font-size:20px; font-weight:800; font-family:monospace; color:#fff;">--</div>
                    <small style="font-size:11px; color:#94a3b8; display:block; margin-top:4px;">ساعت</small>
                </div>
                <span style="font-size:20px; font-weight:bold; color:#8b5cf6;">:</span>
                <div style="text-align:center;">
                    <div class="uas-fomo-digit uas-timer-minutes" style="background:#131d38; border:1px solid #8b5cf6; border-radius:10px; min-width:44px; padding:6px 10px; font-size:20px; font-weight:800; font-family:monospace; color:#fff;">--</div>
                    <small style="font-size:11px; color:#94a3b8; display:block; margin-top:4px;">دقیقه</small>
                </div>
                <span style="font-size:20px; font-weight:bold; color:#8b5cf6;">:</span>
                <div style="text-align:center;">
                    <div class="uas-fomo-digit uas-timer-seconds" style="background:#131d38; border:1px solid #8b5cf6; border-radius:10px; min-width:44px; padding:6px 10px; font-size:20px; font-weight:800; font-family:monospace; color:#fff;">--</div>
                    <small style="font-size:11px; color:#94a3b8; display:block; margin-top:4px;">ثانیه</small>
                </div>
            </div>

            <!-- Action Button -->
            <div>
                <a href="<?php echo esc_url($settings['btn_url']['url']); ?>" class="uas-fomo-btn" style="display:inline-block; background:#8b5cf6; color:#fff; text-decoration:none; padding:12px 24px; border-radius:10px; font-weight:700; font-size:14px; box-shadow:0 4px 15px rgba(139,92,246,0.35); transition:all 0.2s;">
                    <?php echo esc_html($settings['btn_text']); ?>
                </a>
            </div>

        </div>
        <?php
    }
}
