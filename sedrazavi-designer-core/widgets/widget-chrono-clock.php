<?php
/**
 * Chrono Triple Clock Elementor Widget
 *
 * Live digital clock + triple calendar (Jalali, Gregorian, Hijri).
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore\Widgets;

if (!defined('ABSPATH')) {
    exit;
}

class Widget_Chrono_Clock extends \Elementor\Widget_Base {

    public function get_name() {
        return 'sr_chrono_clock';
    }

    public function get_title() {
        return esc_html__('ساعت هوشمند و تقویم سه‌گانه', 'sedrazavi-designer-core');
    }

    public function get_icon() {
        return 'eicon-clock-o';
    }

    public function get_categories() {
        return ['sedrazavi-designer'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات ساعت و تقویم', 'sedrazavi-designer-core'),
                'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'show_seconds',
            [
                'label'        => esc_html__('نمایش ثانیه‌شمار', 'sedrazavi-designer-core'),
                'type'         => \Elementor\Controls_Manager::SWITCHER,
                'default'      => 'yes',
                'return_value' => 'yes',
            ]
        );

        $this->add_control(
            'show_jalali',
            [
                'label'        => esc_html__('نمایش تقویم شمسی', 'sedrazavi-designer-core'),
                'type'         => \Elementor\Controls_Manager::SWITCHER,
                'default'      => 'yes',
                'return_value' => 'yes',
            ]
        );

        $this->add_control(
            'show_gregorian',
            [
                'label'        => esc_html__('نمایش تقویم میلادی', 'sedrazavi-designer-core'),
                'type'         => \Elementor\Controls_Manager::SWITCHER,
                'default'      => 'yes',
                'return_value' => 'yes',
            ]
        );

        $this->add_control(
            'show_hijri',
            [
                'label'        => esc_html__('نمایش تقویم قمری', 'sedrazavi-designer-core'),
                'type'         => \Elementor\Controls_Manager::SWITCHER,
                'default'      => 'yes',
                'return_value' => 'yes',
            ]
        );

        $this->end_controls_section();

        // Style Tab
        $this->start_controls_section(
            'section_style',
            [
                'label' => esc_html__('استایل و جلوه‌های نئونی', 'sedrazavi-designer-core'),
                'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'clock_color',
            [
                'label'     => esc_html__('رنگ ساعت نئونی', 'sedrazavi-designer-core'),
                'type'      => \Elementor\Controls_Manager::COLOR,
                'default'   => '#00f0ff',
                'selectors' => [
                    '{{WRAPPER}} .sr-widget-clock-digits' => 'color: {{VALUE}}; text-shadow: 0 0 16px {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $is_editor = \Elementor\Plugin::$instance->editor->is_edit_mode();
        ?>
        <div class="sr-chrono-widget-box" data-show-sec="<?php echo esc_attr($settings['show_seconds']); ?>">
            <div class="sr-widget-clock-digits">
                <?php echo $is_editor ? '12:45:00' : '--:--:--'; ?>
            </div>
            <div class="sr-chrono-dates-wrap">
                <?php if ('yes' === $settings['show_jalali']) : ?>
                    <span class="sr-chrono-date-item sr-jdate">📅 تقویم هجری شمسی</span>
                <?php endif; ?>
                <?php if ('yes' === $settings['show_gregorian']) : ?>
                    <span class="sr-chrono-date-item sr-gdate">🌐 تقویم میلادی</span>
                <?php endif; ?>
                <?php if ('yes' === $settings['show_hijri']) : ?>
                    <span class="sr-chrono-date-item sr-hdate">🌙 التقویم الهجری</span>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}
