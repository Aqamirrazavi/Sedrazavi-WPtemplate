<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * SpotPlayer LMS Course Video & Curriculum Elementor Widget with Visual Controls
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
        // --- CONTENT SECTION ---
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

        // --- STYLE SECTION ---
        $this->start_controls_section(
            'section_style_player',
            [
                'label' => esc_html__('استایل پلیر و دوره‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'player_bg_color',
            [
                'label'     => esc_html__('رنگ پس‌زمینه قاب پلیر', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#0b132b',
                'selectors' => [
                    '{{WRAPPER}} .uas-spotplayer-custom' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'accent_color',
            [
                'label'     => esc_html__('رنگ نشان‌ها و دکمه پخش', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#3b82f6',
                'selectors' => [
                    '{{WRAPPER}} .uas-spotplayer-custom .badge' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'     => 'title_typography',
                'label'    => esc_html__('تایپوگرافی عنوان دوره', 'universal-elementor-suite'),
                'selector' => '{{WRAPPER}} .uas-spotplayer-custom h3',
            ]
        );

        $this->add_responsive_control(
            'border_radius',
            [
                'label'      => esc_html__('گردی لبه‌ها (Border Radius)', 'universal-elementor-suite'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .uas-spotplayer-custom' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name'     => 'box_shadow',
                'label'    => esc_html__('سایه قاب پلیر', 'universal-elementor-suite'),
                'selector' => '{{WRAPPER}} .uas-spotplayer-custom',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $title = $settings['course_title'] ?? '';
        $lesson = $settings['lesson_title'] ?? '';
        $video_url = $settings['video_url'] ?? '';
        $watermark = ($settings['show_watermark'] ?? 'yes') === 'yes';
        ?>
        <div class="uas-spotplayer-custom uas-widget-container" dir="rtl" style="border: 1px solid rgba(255,255,255,0.1); overflow: hidden; padding: 20px; border-radius: 16px; background: #0b132b; color: #f8fafc;">
            <?php
            if (shortcode_exists('sedrazavi_lesson_player')) {
                echo do_shortcode(sprintf(
                    '[sedrazavi_lesson_player course="%s" lesson="%s" video_url="%s" watermark="%s"]',
                    esc_attr($title),
                    esc_attr($lesson),
                    esc_url($video_url),
                    $watermark ? 'yes' : 'no'
                ));
            } else {
                $user_label = is_user_logged_in() ? wp_get_current_user()->user_login : 'Protected-Stream';
                ?>
                <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                    <div>
                        <h3 style="margin: 0 0 4px; font-size: 18px; color: #fff;"><?php echo esc_html($title); ?></h3>
                        <div style="font-size: 13px; color: #94a3b8;"><?php echo esc_html($lesson); ?></div>
                    </div>
                    <span class="badge" style="padding: 4px 10px; border-radius: 9999px; background: #3b82f6; color: #fff; font-size: 11px; font-weight: 700;">پخش امن دوره</span>
                </div>
                <div style="position: relative; border-radius: 12px; overflow: hidden; background: #020617;">
                    <video controls preload="metadata" style="width: 100%; display: block; max-height: 420px;">
                        <source src="<?php echo esc_url($video_url); ?>" type="video/mp4">
                    </video>
                    <?php if ($watermark): ?>
                        <div style="position: absolute; top: 12px; left: 14px; font-size: 11px; color: rgba(255,255,255,0.55); pointer-events: none; background: rgba(0,0,0,0.4); padding: 2px 8px; border-radius: 6px;">
                            🔒 <?php echo esc_html($user_label); ?>
                        </div>
                    <?php endif; ?>
                </div>
                <?php
            }
            ?>
        </div>
        <?php
    }
}
