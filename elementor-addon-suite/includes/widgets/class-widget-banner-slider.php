<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Quote & Text Ticker Widget
 */
class Universal_Banner_Slider_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_banner_slider';
    }

    public function get_title() {
        return esc_html__('نوار تیکر و شعارهای متحرک', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-text-area';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-banner-slider-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('محتوای نوار متحرک', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'badge',
            [
                'label'   => esc_html__('برچسب نوار', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('پیام روز', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'text',
            [
                'label'   => esc_html__('متن پیام یا حکمت', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('کیفیت تصادفی نیست، بلکه حاصل برنامه‌ریزی هوشمندانه، تلاش صادقانه و اجرای ماهرانه است.', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-ticker-wrapper uas-widget-container" dir="rtl">
            <?php if (!empty($settings['badge'])) : ?>
                <span class="uas-ticker-badge"><?php echo esc_html($settings['badge']); ?></span>
            <?php endif; ?>
            <div class="uas-ticker-text"><?php echo esc_html($settings['text']); ?></div>
        </div>
        <?php
    }
}
