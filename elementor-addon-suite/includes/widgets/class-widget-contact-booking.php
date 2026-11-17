<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Contact & Lead Booking Form Widget
 */
class Universal_Contact_Booking_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_contact_booking';
    }

    public function get_title() {
        return esc_html__('فرم هوشمند رزرو نوبت و درخواست مشاوره', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-form-horizontal';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-contact-booking-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('محتوای فرم', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'form_title',
            [
                'label'   => esc_html__('عنوان بالای فرم', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('ثبت درخواست و هماهنگی جلسه مشاوره', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'form_desc',
            [
                'label'   => esc_html__('توضیحات راهنما', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('لطفاً مشخصات خود و خلاصه درخواست را وارد فرمایید تا کارشناسان ما در سریع‌ترین زمان با شما تماس حاصل نمایند.', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'submit_btn_text',
            [
                'label'   => esc_html__('متن دکمه ارسال', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('ثبت نهایی درخواست ←', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'submit_mode',
            [
                'label'   => esc_html__('مسیر ثبت اطلاعات (Workflow)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => 'inquiry',
                'options' => [
                    'inquiry'      => esc_html__('استعلام پروژه / مشاوره عمومی (/inquiry/submit)', 'universal-elementor-suite'),
                    'legal_intake' => esc_html__('صف پذیرش و تریاژ حقوقی با کد رهگیری (/intake/submit)', 'universal-elementor-suite'),
                ],
            ]
        );

        $this->add_control(
            'enable_consent',
            [
                'label'        => esc_html__('الزامی‌سازی تایید حریم خصوصی', 'universal-elementor-suite'),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => esc_html__('بله', 'universal-elementor-suite'),
                'label_off'    => esc_html__('خیر', 'universal-elementor-suite'),
                'return_value' => 'yes',
                'default'      => 'yes',
            ]
        );

        $this->add_control(
            'consent_label',
            [
                'label'     => esc_html__('متن رضایت‌نامه حریم خصوصی', 'universal-elementor-suite'),
                'type'      => Controls_Manager::TEXT,
                'default'   => esc_html__('شرایط محرمانگی و سیاست نگهداری داده‌ها را مطالعه کرده و می‌پذیرم.', 'universal-elementor-suite'),
                'condition' => ['enable_consent' => 'yes'],
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_style',
            [
                'label' => esc_html__('استایل و رنگ‌بندی فرم', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'accent_color',
            [
                'label'     => esc_html__('رنگ دکمه و حاشیه تاکیدی', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#D4AF37',
                'selectors' => [
                    '{{WRAPPER}} .uas-booking-wrapper' => '--uas-booking-accent: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings    = $this->get_settings_for_display();
        $dir         = (function_exists('is_rtl') && is_rtl()) ? 'rtl' : 'ltr';
        $submit_mode = !empty($settings['submit_mode']) ? sanitize_key($settings['submit_mode']) : 'inquiry';
        $consent_on  = !isset($settings['enable_consent']) || $settings['enable_consent'] === 'yes';
        $consent_txt = !empty($settings['consent_label']) ? $settings['consent_label'] : __('شرایط محرمانگی و سیاست نگهداری داده‌ها را می‌پذیرم.', 'universal-elementor-suite');
        ?>
        <div class="uas-booking-wrapper uas-widget-container" dir="<?php echo esc_attr($dir); ?>">
            <?php if (!empty($settings['form_title'])) : ?>
                <div class="uas-booking-header">
                    <h3 class="uas-booking-title"><?php echo esc_html($settings['form_title']); ?></h3>
                    <?php if (!empty($settings['form_desc'])) : ?>
                        <p class="uas-booking-desc"><?php echo esc_html($settings['form_desc']); ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <form class="uas-booking-form uas-widget-booking-form" data-submit-mode="<?php echo esc_attr($submit_mode); ?>">
                <div style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;" aria-hidden="true">
                    <label>Website
                        <input type="text" name="sr_website_trap" value="" tabindex="-1" autocomplete="off" />
                    </label>
                </div>

                <div class="uas-form-group">
                    <label class="uas-form-label">نام و نام خانوادگی:</label>
                    <input type="text" name="full_name" class="uas-form-input" placeholder="مثال: علی احمدی" required />
                </div>

                <div class="uas-form-group">
                    <label class="uas-form-label">شماره تلفن همراه:</label>
                    <input type="tel" name="phone" class="uas-form-input" placeholder="۰۹۱۲۳۴۵۶۷۸۹" required />
                </div>

                <div class="uas-form-group">
                    <label class="uas-form-label">نوع خدمت مورد نیاز:</label>
                    <select name="service_type" class="uas-form-select">
                        <option value="مشاوره عمومی و ارزیابی اولیه">مشاوره عمومی و ارزیابی اولیه</option>
                        <option value="برنامه‌ریزی استراتژیک و توسعه">برنامه‌ریزی استراتژیک و توسعه</option>
                        <option value="پشتیبانی فنی و اختصاصی">پشتیبانی فنی و اختصاصی</option>
                    </select>
                </div>

                <div class="uas-form-group">
                    <label class="uas-form-label">شرح مختصر درخواست:</label>
                    <textarea name="details" class="uas-form-textarea" rows="3" placeholder="توضیحات تکمیلی خود را بنویسید..."></textarea>
                </div>

                <?php if ($consent_on) : ?>
                    <div class="uas-form-group uas-consent-group">
                        <label class="uas-consent-label" style="display:flex;align-items:flex-start;gap:8px;font-size:12px;cursor:pointer;">
                            <input type="checkbox" name="privacy_consent" value="1" required style="margin-top:3px;" />
                            <span><?php echo esc_html($consent_txt); ?></span>
                        </label>
                    </div>
                <?php endif; ?>

                <button type="submit" class="uas-form-submit">
                    <?php echo esc_html($settings['submit_btn_text']); ?>
                </button>
                <div class="uas-booking-feedback" role="status" aria-live="polite" style="display:none;margin-top:12px;padding:10px 14px;border-radius:8px;font-size:13px;"></div>
            </form>
        </div>
        <?php
    }
}
