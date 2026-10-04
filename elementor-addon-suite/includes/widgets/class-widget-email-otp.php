<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Email OTP Magic Login Widget
 */
class Universal_Email_OTP_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_email_otp';
    }

    public function get_title() {
        return esc_html__('ورود با رمز یکبار مصرف ایمیل (Email OTP)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-lock-user';
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات فرم ورود', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'title',
            [
                'label'   => esc_html__('عنوان بالای فرم', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('ورود سریع و امن با رمز یکبار مصرف (Email OTP)', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'subtitle',
            [
                'label'   => esc_html__('متن راهنما', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('برای ورود به سامانه، ایمیل خود را وارد نمایید تا کد ۶ رقمی موقت برای شما ارسال شود.', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $props = [
            'title'    => $settings['title'],
            'subtitle' => $settings['subtitle'],
        ];
        ?>
        <div class="sedrazavi-react-root uas-email-otp-wrap" data-component="EmailOtpAuthComponent" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
            <!-- Native PHP Fallback Form -->
            <div style="max-width: 420px; margin: 2rem auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 1.5rem; padding: 2rem; box-shadow: 0 10px 25px rgba(0,0,0,0.06); text-align: right; font-family: inherit;">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="width: 3.5rem; height: 3.5rem; margin: 0 auto 0.75rem auto; border-radius: 1rem; background: rgba(212,175,55,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #D4AF37;">
                        ✉️
                    </div>
                    <h3 style="font-size: 1.125rem; font-weight: 800; color: #0B132B; margin: 0 0 0.5rem 0;">
                        <?php echo esc_html($settings['title']); ?>
                    </h3>
                    <p style="font-size: 0.75rem; color: #64748B; margin: 0; line-height: 1.5;">
                        <?php echo esc_html($settings['subtitle']); ?>
                    </p>
                </div>

                <form method="post" action="<?php echo esc_url(rest_url('sedrazavi/v1/auth/email-otp-send')); ?>" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <label style="display: block; font-size: 0.75rem; font-weight: 700; color: #334155; margin-bottom: 0.25rem;">آدرس ایمیل معتبر:</label>
                        <input type="email" name="email" required placeholder="user@example.com" style="width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; border: 1px solid #CBD5E1; font-size: 0.8125rem; direction: ltr; text-align: left; box-sizing: border-box;" />
                    </div>
                    <button type="submit" style="width: 100%; padding: 0.75rem 1rem; border-radius: 0.75rem; background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%); color: #0B132B; font-weight: 800; font-size: 0.8125rem; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(212,175,55,0.3);">
                        ارسال کد تایید یکبار مصرف
                    </button>
                </form>
            </div>
        </div>
        <?php
    }
}
