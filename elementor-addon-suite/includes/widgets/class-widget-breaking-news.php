<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Breaking News Marquee Ticker & Editorial Elementor Widget
 */
class Universal_News_Ticker_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_news_ticker';
    }

    public function get_title() {
        return esc_html__('نوار اخبار فوری و تحریریه مجله', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-bullet-list';
    }

    public function get_style_depends() {
        return ['uas-widgets-core'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات نوار خبر فوری', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'ticker_badge',
            [
                'label'   => esc_html__('برچسب بج', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('خبر فوری', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'posts_count',
            [
                'label'   => esc_html__('تعداد عناوین خبری', 'universal-elementor-suite'),
                'type'    => Controls_Manager::NUMBER,
                'default' => 5,
                'min'     => 1,
                'max'     => 15,
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $badge = $settings['ticker_badge'];
        $count = $settings['posts_count'];

        echo do_shortcode(sprintf(
            '[sedrazavi_breaking_news badge="%s" count="%d"]',
            esc_attr($badge),
            absint($count)
        ));
    }
}
