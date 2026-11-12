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
        $badge = !empty($settings['ticker_badge']) ? $settings['ticker_badge'] : esc_html__('خبر فوری', 'universal-elementor-suite');
        $count = !empty($settings['posts_count']) ? absint($settings['posts_count']) : 5;

        if (shortcode_exists('sedrazavi_breaking_news')) {
            echo do_shortcode(sprintf(
                '[sedrazavi_breaking_news badge="%s" count="%d"]',
                esc_attr($badge),
                $count
            ));
            return;
        }

        $recent = get_posts([
            'numberposts' => max(1, $count),
            'post_status' => 'publish',
        ]);
        ?>
        <div class="uas-news-ticker uas-widget-container" dir="rtl" style="display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-radius: 10px; background: #0f172a; border: 1px solid rgba(255,255,255,0.12); overflow: hidden;">
            <span style="background: #ef4444; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 6px; white-space: nowrap;"><?php echo esc_html($badge); ?></span>
            <div style="display: flex; gap: 20px; overflow-x: auto; white-space: nowrap; font-size: 13px; color: #e2e8f0;">
                <?php if (!empty($recent)): ?>
                    <?php foreach ($recent as $p): ?>
                        <a href="<?php echo esc_url(get_permalink($p->ID)); ?>" style="color: #f8fafc; text-decoration: none;">• <?php echo esc_html(get_the_title($p->ID)); ?></a>
                    <?php endforeach; ?>
                <?php else: ?>
                    <span>• آماده انتشار آخرین اخبار و اطلاعیه‌های تحریریه</span>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}
