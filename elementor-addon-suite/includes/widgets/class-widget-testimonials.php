<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Testimonials & Social Proof Widget (MPCA Compliant)
 *
 * Testimonials grid and social proof cards with star ratings, avatar badges,
 * and comprehensive 3-tab native Elementor sidebar controls.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Universal_Testimonials_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_testimonials';
    }

    public function get_title() {
        return esc_html__('نظرات و رضایت مشتریان (Social Proof Cards)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-testimonial';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-testimonials-css'];
    }

    protected function register_controls() {
        // --- 1. TAB_CONTENT: Layout & Testimonials ---
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('نظرات و بازخورد مشتریان', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'columns',
            [
                'label'   => esc_html__('تعداد ستون‌ها', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => '2',
                'options' => [
                    '1' => esc_html__('۱ ستون (عریض)', 'universal-elementor-suite'),
                    '2' => esc_html__('۲ ستون', 'universal-elementor-suite'),
                    '3' => esc_html__('۳ ستون', 'universal-elementor-suite'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .uas-testimonials-grid' => '--uas-testi-cols: {{VALUE}};',
                ],
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'author_name',
            [
                'label'       => esc_html__('نام نویسنده نظر', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('مهندس مریم کریمی', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'author_role',
            [
                'label'   => esc_html__('سمت یا سازمان', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('مدیر ارشد نوآوری گروه آروین', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'review_text',
            [
                'label'   => esc_html__('متن بازخورد و نظر', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('همکاری با این مجموعه یکی از بهترین تصمیمات توسعه تجاری ما بود. سرعت پیاده‌سازی و کیفیت خروجی فراتر از انتظار ظاهر شد.', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'rating',
            [
                'label'   => esc_html__('امتیاز ستاره‌ای (۱ تا ۵)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => '5',
                'options' => [
                    '5' => '★★★★★ (۵ ستاره)',
                    '4' => '★★★★☆ (۴ ستاره)',
                    '3' => '★★★☆☆ (۳ ستاره)',
                ],
            ]
        );

        $default_avatar = defined('UAS_URL') ? UAS_URL . 'assets/images/placeholders/client-avatar.svg' : '';

        $repeater->add_control(
            'avatar',
            [
                'label'   => esc_html__('تصویر چهره یا لوگو', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url'    => $default_avatar,
                    'source' => 'sovereign_local',
                ],
            ]
        );

        $this->add_control(
            'testimonials_list',
            [
                'label'       => esc_html__('لیست نظرات', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'author_name' => esc_html__('مهندس مریم کریمی', 'universal-elementor-suite'),
                        'author_role' => esc_html__('مدیر ارشد نوآوری گروه آروین', 'universal-elementor-suite'),
                        'review_text' => esc_html__('همکاری با این مجموعه یکی از بهترین تصمیمات توسعه تجاری ما بود. سرعت پیاده‌سازی و کیفیت خروجی فراتر از انتظار ظاهر شد.', 'universal-elementor-suite'),
                        'rating'      => '5',
                        'avatar'      => ['url' => $default_avatar, 'source' => 'sovereign_local'],
                    ],
                    [
                        'author_name' => esc_html__('دکتر امیرحسین رضایی', 'universal-elementor-suite'),
                        'author_role' => esc_html__('مدیرعامل هلدینگ پایا', 'universal-elementor-suite'),
                        'review_text' => esc_html__('سطح حرفه‌ای‌گری، شفافیت در ارائه گزارش‌های پیشرفت و تسلط تیم بر استانداردهای روز، اطمینان خاطر کامل را برای ما به ارمغان آورد.', 'universal-elementor-suite'),
                        'rating'      => '5',
                        'avatar'      => ['url' => $default_avatar, 'source' => 'sovereign_local'],
                    ],
                ],
                'title_field' => '{{{ author_name }}} - {{{ author_role }}}',
            ]
        );

        $this->end_controls_section();

        // --- 2. TAB_STYLE: Review Text Style ---
        $this->start_controls_section(
            'section_style_review',
            [
                'label' => esc_html__('استایل متن نظر', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_typography_and_color_controls('testi_review', esc_html__('متن نظر', 'universal-elementor-suite'), '.uas-testimonial-text', '#334155');

        $this->end_controls_section();

        // --- 3. TAB_STYLE: Author Meta Style ---
        $this->start_controls_section(
            'section_style_meta',
            [
                'label' => esc_html__('استایل نام و سمت نویسنده', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_typography_and_color_controls('testi_author', esc_html__('نام نویسنده', 'universal-elementor-suite'), '.uas-testimonial-name', '#0F172A');
        $this->add_typography_and_color_controls('testi_role', esc_html__('سمت یا شرکت', 'universal-elementor-suite'), '.uas-testimonial-role', '#64748B');

        $this->add_control(
            'rating_star_color',
            [
                'label'     => esc_html__('رنگ ستاره‌های امتیاز', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#F59E0B',
                'selectors' => [
                    '{{WRAPPER}} .uas-testimonial-rating' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();

        // --- 4. TAB_STYLE: Card Container Style ---
        $this->start_controls_section(
            'section_style_cards',
            [
                'label' => esc_html__('استایل کارت‌های نظرات', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_container_style_controls('testi_card', esc_html__('کارت بازخورد', 'universal-elementor-suite'), '.uas-testimonial-card');

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $dir      = (function_exists('is_rtl') && is_rtl()) ? 'rtl' : 'ltr';
        $fallback = defined('UAS_URL') ? UAS_URL . 'assets/images/placeholders/client-avatar.svg' : '';
        ?>
        <div class="uas-testimonials-wrapper uas-widget-container" dir="<?php echo esc_attr($dir); ?>">
            <div class="uas-testimonials-grid">
                <?php foreach ($settings['testimonials_list'] as $item) :
                    $stars = intval($item['rating'] ?? 5);
                    $avatar_url = !empty($item['avatar']['url']) ? $item['avatar']['url'] : $fallback;
                ?>
                    <div class="uas-testimonial-card">
                        <div class="uas-testimonial-quote-icon" aria-hidden="true">❝</div>
                        <p class="uas-testimonial-text"><?php echo esc_html($item['review_text']); ?></p>

                        <div class="uas-testimonial-rating" aria-label="<?php echo esc_attr(sprintf('%d از ۵ ستاره', $stars)); ?>">
                            <?php
                            echo str_repeat('★', $stars) . str_repeat('☆', 5 - $stars);
                            ?>
                        </div>

                        <div class="uas-testimonial-author">
                            <?php if (!empty($avatar_url)) : ?>
                                <img src="<?php echo esc_url($avatar_url); ?>" alt="<?php echo esc_attr($item['author_name']); ?>" class="uas-testimonial-avatar" loading="lazy" decoding="async" />
                            <?php endif; ?>
                            <div class="uas-testimonial-meta">
                                <h4 class="uas-testimonial-name"><?php echo esc_html($item['author_name']); ?></h4>
                                <span class="uas-testimonial-role"><?php echo esc_html($item['author_role']); ?></span>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
}
