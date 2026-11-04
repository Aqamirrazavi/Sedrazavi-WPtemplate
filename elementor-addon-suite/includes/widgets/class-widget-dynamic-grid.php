<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;
use UniversalElementorSuite\Dynamic_Query_Engine;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Dynamic Content Grid Widget (MPCA Compliant)
 *
 * Safe, high-performance dynamic content grid supporting posts, portfolio,
 * products, and services with transient caching and full 3-tab Elementor controls.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Universal_Dynamic_Grid_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_dynamic_grid';
    }

    public function get_title() {
        return esc_html__('گرید پویای محتوا و پروژه‌ها (Dynamic Query Grid)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-posts-grid';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-dynamic-grid-css'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core'];
    }

    protected function register_controls() {
        // --- 1. TAB_CONTENT: Layout ---
        $this->start_controls_section(
            'section_layout',
            [
                'label' => esc_html__('چیدمان و ستون‌بندی', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'columns',
            [
                'label'   => esc_html__('تعداد ستون‌ها در دسکتاپ', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => '3',
                'options' => [
                    '1' => esc_html__('۱ ستون (فهرست عریض)', 'universal-elementor-suite'),
                    '2' => esc_html__('۲ ستون', 'universal-elementor-suite'),
                    '3' => esc_html__('۳ ستون (استاندارد)', 'universal-elementor-suite'),
                    '4' => esc_html__('۴ ستون', 'universal-elementor-suite'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .uas-dyn-grid' => '--uas-grid-cols: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'btn_text',
            [
                'label'   => esc_html__('متن دکمه مطالعه یا مشاهده', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('مشاهده و بررسی ↗', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();

        // --- 2. TAB_CONTENT: Advanced Dynamic Query ---
        $this->add_advanced_dynamic_query_controls();

        // --- 3. TAB_STYLE: Styling ---
        $this->start_controls_section(
            'section_style_cards',
            [
                'label' => esc_html__('استایل کارت‌های محتوا', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_typography_and_color_controls('dyn_title', esc_html__('عنوان پست', 'universal-elementor-suite'), '.uas-dyn-card-title', '#0F172A');
        $this->add_typography_and_color_controls('dyn_desc', esc_html__('چکیده محتوا', 'universal-elementor-suite'), '.uas-dyn-card-desc', '#475569');
        $this->add_container_style_controls('dyn_card', esc_html__('کارت', 'universal-elementor-suite'), '.uas-dyn-card');

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

        $query_args = [
            'post_type'      => $settings['query_post_type'] ?? 'post',
            'posts_per_page' => intval($settings['query_posts_per_page'] ?? 6),
            'orderby'        => $settings['query_orderby'] ?? 'date',
            'order'          => $settings['query_order'] ?? 'DESC',
        ];

        $cache_ttl = intval($settings['query_cache_ttl'] ?? 3600);
        $result = Dynamic_Query_Engine::instance()->execute_query($query_args, $cache_ttl);
        $posts  = $result['posts'] ?? [];
        $btn_label = esc_html($settings['btn_text'] ?? 'مشاهده');
        ?>
        <div class="uas-dynamic-grid-container uas-widget-container" dir="rtl">
            <?php if (empty($posts)) : ?>
                <div class="uas-dyn-empty-notice">
                    <p><?php esc_html_e('هیچ آیتم یا محتوایی برای نمایش با این شرایط یافت نشد.', 'universal-elementor-suite'); ?></p>
                </div>
            <?php else : ?>
                <div class="uas-dyn-grid">
                    <?php foreach ($posts as $post_item) : ?>
                        <article class="uas-dyn-card">
                            <?php if (!empty($post_item['thumbnail'])) : ?>
                                <div class="uas-dyn-card-thumb-wrap">
                                    <a href="<?php echo esc_url($post_item['permalink']); ?>" class="uas-dyn-thumb-link">
                                        <img src="<?php echo esc_url($post_item['thumbnail']); ?>" alt="<?php echo esc_attr($post_item['title']); ?>" class="uas-dyn-card-img" loading="lazy" />
                                    </a>
                                    <?php if (!empty($post_item['category'])) : ?>
                                        <span class="uas-dyn-cat-badge"><?php echo esc_html($post_item['category']); ?></span>
                                    <?php endif; ?>
                                </div>
                            <?php endif; ?>

                            <div class="uas-dyn-card-body">
                                <div class="uas-dyn-card-meta">
                                    <span class="uas-dyn-date">📅 <?php echo esc_html($post_item['date']); ?></span>
                                    <span class="uas-dyn-author">✍️ <?php echo esc_html($post_item['author']); ?></span>
                                </div>

                                <h3 class="uas-dyn-card-title">
                                    <a href="<?php echo esc_url($post_item['permalink']); ?>"><?php echo esc_html($post_item['title']); ?></a>
                                </h3>

                                <p class="uas-dyn-card-desc"><?php echo esc_html($post_item['excerpt']); ?></p>

                                <div class="uas-dyn-card-footer">
                                    <a href="<?php echo esc_url($post_item['permalink']); ?>" class="uas-dyn-readmore-btn">
                                        <?php echo $btn_label; ?>
                                    </a>
                                </div>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
        <?php
    }
}
