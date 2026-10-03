<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Post Grid Widget
 */
class Universal_Posts_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_posts_grid';
    }

    public function get_title() {
        return esc_html__('گرید مقالات و اخبار پویا', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-post-list';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-posts-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_query',
            [
                'label' => esc_html__('تنظیمات کوئری و محتوا', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'posts_per_page',
            [
                'label'   => esc_html__('تعداد پست‌ها', 'universal-elementor-suite'),
                'type'    => Controls_Manager::NUMBER,
                'default' => 3,
                'min'     => 1,
                'max'     => 12,
            ]
        );

        $this->add_control(
            'columns',
            [
                'label'   => esc_html__('تعداد ستون‌ها', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => '3',
                'options' => [
                    '1' => esc_html__('۱ ستون', 'universal-elementor-suite'),
                    '2' => esc_html__('۲ ستون', 'universal-elementor-suite'),
                    '3' => esc_html__('۳ ستون', 'universal-elementor-suite'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .uas-posts-grid' => '--uas-posts-cols: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'show_date',
            [
                'label'     => esc_html__('نمایش تاریخ انتشار', 'universal-elementor-suite'),
                'type'      => Controls_Manager::SWITCHER,
                'default'   => 'yes',
            ]
        );

        $this->add_control(
            'read_more_text',
            [
                'label'   => esc_html__('متن دکمه ادامه مطلب', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('مطالعه ادامه مقاله ←', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $count = intval($settings['posts_per_page'] ?? 3);

        $args = [
            'post_type'      => 'post',
            'posts_per_page' => $count,
            'post_status'    => 'publish',
        ];

        $query = new \WP_Query($args);
        ?>
        <div class="uas-posts-wrapper uas-widget-container" dir="rtl">
            <div class="uas-posts-grid">
                <?php if ($query->have_posts()) : ?>
                    <?php while ($query->have_posts()) : $query->the_post(); ?>
                        <article class="uas-post-card">
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="uas-post-thumb-wrapper">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('medium_large', ['class' => 'uas-post-thumb']); ?>
                                    </a>
                                </div>
                            <?php endif; ?>

                            <div class="uas-post-body">
                                <?php if ($settings['show_date'] === 'yes') : ?>
                                    <span class="uas-post-date"><?php echo get_the_date(); ?></span>
                                <?php endif; ?>

                                <h3 class="uas-post-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>

                                <p class="uas-post-excerpt"><?php echo wp_trim_words(get_the_excerpt(), 20, '...'); ?></p>

                                <?php if (!empty($settings['read_more_text'])) : ?>
                                    <a href="<?php the_permalink(); ?>" class="uas-post-readmore">
                                        <?php echo esc_html($settings['read_more_text']); ?>
                                    </a>
                                <?php endif; ?>
                            </div>
                        </article>
                    <?php endwhile; wp_reset_postdata(); ?>
                <?php else : ?>
                    <!-- Sample Topic-Agnostic Placeholders if no posts exist -->
                    <?php for ($i = 1; $i <= $count; $i++) : ?>
                        <article class="uas-post-card">
                            <div class="uas-post-thumb-wrapper">
                                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400" alt="Sample post" class="uas-post-thumb" />
                            </div>
                            <div class="uas-post-body">
                                <span class="uas-post-date">امروز</span>
                                <h3 class="uas-post-title"><a href="#">راهنمای جامع بهره‌وری و تحلیل شاخص‌های عملکرد <?php echo $i; ?></a></h3>
                                <p class="uas-post-excerpt">بررسی اصول بنیادین، راهکارهای نوآورانه و روش‌های نوین بهینه‌سازی در دنیای پویای تجارت امروزی...</p>
                                <a href="#" class="uas-post-readmore"><?php echo esc_html($settings['read_more_text']); ?></a>
                            </div>
                        </article>
                    <?php endfor; ?>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}
