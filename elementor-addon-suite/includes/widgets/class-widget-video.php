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
                'placeholder' => 'https://example.com/media/intro.mp4',
                'default'     => ['url' => ''],
            ]
        );

        $default_poster = defined('UAS_URL') ? UAS_URL . 'assets/images/placeholders/hero-showcase.svg' : '';

        $this->add_control(
            'poster_image',
            [
                'label'   => esc_html__('تصویر پوستر ویدیو', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url'    => $default_poster,
                    'source' => 'sovereign_local',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings   = $this->get_settings_for_display();
        $video_url  = $settings['video_url']['url'] ?? '';
        $poster_url = !empty($settings['poster_image']['url'])
            ? $settings['poster_image']['url']
            : (defined('UAS_URL') ? UAS_URL . 'assets/images/placeholders/hero-showcase.svg' : '');
        $dir        = (function_exists('is_rtl') && is_rtl()) ? 'rtl' : 'ltr';
        $title      = $settings['video_title'] ?? '';
        ?>
        <div class="uas-video-wrapper uas-widget-container" dir="<?php echo esc_attr($dir); ?>">
            <?php if (!empty($video_url)) : ?>
                <a href="<?php echo esc_url($video_url); ?>" target="_blank" rel="noopener noreferrer" class="uas-video-poster-box" aria-label="<?php echo esc_attr($title ?: esc_html__('پخش ویدیو', 'universal-elementor-suite')); ?>">
                    <?php if (!empty($poster_url)) : ?>
                        <img src="<?php echo esc_url($poster_url); ?>" alt="<?php echo esc_attr($title); ?>" class="uas-video-poster-img" loading="lazy" decoding="async" />
                    <?php endif; ?>
                    <div class="uas-video-play-btn" aria-hidden="true">▶</div>
                </a>
            <?php else : ?>
                <div class="uas-video-poster-box" role="region" aria-label="<?php echo esc_attr($title ?: esc_html__('پیش‌نمایش ویدیو', 'universal-elementor-suite')); ?>">
                    <?php if (!empty($poster_url)) : ?>
                        <img src="<?php echo esc_url($poster_url); ?>" alt="<?php echo esc_attr($title); ?>" class="uas-video-poster-img" loading="lazy" decoding="async" />
                    <?php endif; ?>
                    <div class="uas-video-play-btn" aria-hidden="true">▶</div>
                </div>
            <?php endif; ?>
            <?php if (!empty($title)) : ?>
                <div class="uas-video-caption"><?php echo esc_html($title); ?></div>
            <?php endif; ?>
        </div>
        <?php
    }
}
