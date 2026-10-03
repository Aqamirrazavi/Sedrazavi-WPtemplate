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

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-booking-wrapper uas-widget-container" dir="rtl">
            <?php if (!empty($settings['form_title'])) : ?>
                <div class="uas-booking-header">
                    <h3 class="uas-booking-title"><?php echo esc_html($settings['form_title']); ?></h3>
                    <?php if (!empty($settings['form_desc'])) : ?>
                        <p class="uas-booking-desc"><?php echo esc_html($settings['form_desc']); ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <form class="uas-booking-form" onsubmit="event.preventDefault(); alert('درخواست شما با موفقیت ثبت شد.');">
                <div class="uas-form-group">
                    <label class="uas-form-label">نام و نام خانوادگی:</label>
                    <input type="text" class="uas-form-input" placeholder="مثال: علی احمدی" required />
                </div>

                <div class="uas-form-group">
                    <label class="uas-form-label">شماره تلفن همراه:</label>
                    <input type="tel" class="uas-form-input" placeholder="۰۹۱۲۳۴۵۶۷۸۹" required />
                </div>

                <div class="uas-form-group">
                    <label class="uas-form-label">نوع خدمت مورد نیاز:</label>
                    <select class="uas-form-select">
                        <option>مشاوره عمومی و ارزیابی اولیه</option>
                        <option>برنامه‌ریزی استراتژیک و توسعه</option>
                        <option>پشتیبانی فنی و اختصاصی</option>
                    </select>
                </div>

                <div class="uas-form-group">
                    <label class="uas-form-label">شرح مختصر درخواست:</label>
                    <textarea class="uas-form-textarea" rows="3" placeholder="توضیحات تکمیلی خود را بنویسید..."></textarea>
                </div>

                <button type="submit" class="uas-form-submit">
                    <?php echo esc_html($settings['submit_btn_text']); ?>
                </button>
            </form>
        </div>
        <?php
    }
}
