<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Video Showcase Widget
 */
class Universal_Video_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_video';
    }

    public function get_title() {
        return esc_html__('نمایشگر ویدیویی با پوستر اختصاصی', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-video-playlist';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-video-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_video',
            [
                'label' => esc_html__('محتوای ویدیو', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'video_title',
            [
                'label'   => esc_html__('عنوان یا کپشن ویدیو', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('معرفی دستاوردها و رویکردهای نوآورانه سازمان', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'video_url',
            [
                'label'       => esc_html__('لینک ویدیو (آپارات، یوتیوب، MP4)', 'universal-elementor-suite'),
                'type'        => Controls_Manager::URL,
                'placeholder' => 'https://www.youtube.com/watch?v=...',
                'default'     => ['url' => 'https://www.w3schools.com/html/mov_bbb.mp4'],
            ]
        );

        $this->add_control(
            'poster_image',
            [
                'label'   => esc_html__('تصویر پوستر ویدیو', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $video_url = $settings['video_url']['url'] ?? '#';
        ?>
        <div class="uas-video-wrapper uas-widget-container" dir="rtl">
            <a href="<?php echo esc_url($video_url); ?>" target="_blank" rel="noopener noreferrer" class="uas-video-poster-box">
                <?php if (!empty($settings['poster_image']['url'])) : ?>
                    <img src="<?php echo esc_url($settings['poster_image']['url']); ?>" alt="<?php echo esc_attr($settings['video_title']); ?>" class="uas-video-poster-img" loading="lazy" />
                <?php endif; ?>
                <div class="uas-video-play-btn">▶</div>
            </a>
            <?php if (!empty($settings['video_title'])) : ?>
                <div class="uas-video-caption"><?php echo esc_html($settings['video_title']); ?></div>
            <?php endif; ?>
        </div>
        <?php
    }
}
