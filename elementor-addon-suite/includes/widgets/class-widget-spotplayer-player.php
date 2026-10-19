<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * SpotPlayer LMS Course Video & Curriculum Elementor Widget
 */
class Universal_SpotPlayer_Course_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_spotplayer_course';
    }

    public function get_title() {
        return esc_html__('پلیر ضدسرقت اسپات‌پلیر و دوره آموزشی', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-play-o';
    }

    public function get_style_depends() {
        return ['uas-widgets-core'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات دوره و ویدیو', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'course_title',
            [
                'label'   => esc_html__('عنوان دوره', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('دوره فوق‌پیشرفته معماری وب و وردپرس مدرن', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'lesson_title',
            [
                'label'   => esc_html__('عنوان درس جاری', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('فصل ۱ - قسمت سوم: پیکربندی موتور اصناف و لایسنسینگ', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'video_url',
            [
                'label'   => esc_html__('آدرس ویدیو / استریم', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            ]
        );

        $this->add_control(
            'show_watermark',
            [
                'label'        => esc_html__('فعال‌سازی واترمارک متحرک شماره تماس', 'universal-elementor-suite'),
                'type'         => Controls_Manager::SWITCHER,
                'default'      => 'yes',
                'return_value' => 'yes',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $title = $settings['course_title'];
        $lesson = $settings['lesson_title'];
        $video_url = $settings['video_url'];
        $watermark = $settings['show_watermark'] === 'yes';

        echo do_shortcode(sprintf(
            '[sedrazavi_lesson_player course="%s" lesson="%s" video_url="%s" watermark="%s"]',
            esc_attr($title),
            esc_attr($lesson),
            esc_url($video_url),
            $watermark ? 'yes' : 'no'
        ));
    }
}
