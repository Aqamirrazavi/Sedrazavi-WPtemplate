<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Call To Action (CTA) Widget
 */
class Universal_CTA_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_cta';
    }

    public function get_title() {
        return esc_html__('بنر فراخوان اقدام و تماس (CTA)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-call-to-action';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-cta-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('محتوای بنر اقدام', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'title',
            [
                'label'   => esc_html__('عنوان فراخوان', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('آماده‌اید کسب‌وکار خود را به بالاترین سطح برسانید؟', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'description',
            [
                'label'   => esc_html__('توضیحات تکمیلی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('همین حالا با متخصصان ما ارتباط برقرار کنید و از مشاوره اولیه بهره‌مند شوید.', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'button_text',
            [
                'label'   => esc_html__('متن دکمه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('دریافت مشاوره رایگان ←', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'button_url',
            [
                'label'   => esc_html__('لینک دکمه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::URL,
                'default' => ['url' => '#contact'],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-cta-wrapper uas-widget-container" dir="rtl">
            <div class="uas-cta-inner">
                <?php if (!empty($settings['title'])) : ?>
                    <h2 class="uas-cta-title"><?php echo esc_html($settings['title']); ?></h2>
                <?php endif; ?>

                <?php if (!empty($settings['description'])) : ?>
                    <p class="uas-cta-desc"><?php echo esc_html($settings['description']); ?></p>
                <?php endif; ?>

                <?php if (!empty($settings['button_text'])) : ?>
                    <a href="<?php echo esc_url($settings['button_url']['url'] ?? '#'); ?>" class="uas-cta-btn">
                        <?php echo esc_html($settings['button_text']); ?>
                    </a>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}
