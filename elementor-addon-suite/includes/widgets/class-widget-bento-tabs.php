<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Bento-Style Interactive Tabs Widget (MPCA Compliant)
 *
 * Innovative Bento Grid cards layout with interactive tab filters,
 * animated transitions, and comprehensive 3-tab native Elementor sidebar controls.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Universal_Interactive_Tabs_Bento_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_bento_tabs';
    }

    public function get_title() {
        return esc_html__('گرید بنتو تعاملی با تب‌های دسته‌بندی (Bento Tabs)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-tabs';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-bento-tabs-css'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core', 'uas-bento-tabs-js'];
    }

    protected function register_controls() {
        // --- 1. TAB_CONTENT: Bento Cards Repeater ---
        $this->start_controls_section(
            'section_bento_items',
            [
                'label' => esc_html__('کارت‌های گرید بنتو', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'category_slug',
            [
                'label'   => esc_html__('دسته‌بندی (برای فیلتر تب‌ها)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => 'all',
                'options' => [
                    'all'        => esc_html__('همه دسته‌ها', 'universal-elementor-suite'),
                    'conversion' => esc_html__('ابزارهای فروش و لندینگ', 'universal-elementor-suite'),
                    'builder'    => esc_html__('تم‌بیلدر و ساختار', 'universal-elementor-suite'),
                    'speed'      => esc_html__('سرعت و سئو', 'universal-elementor-suite'),
                ],
            ]
        );

        $repeater->add_control(
            'card_span',
            [
                'label'   => esc_html__('اندازه کارت در گرید بنتو', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => 'span-1',
                'options' => [
                    'span-1' => esc_html__('معمولی (۱ ستون)', 'universal-elementor-suite'),
                    'span-2' => esc_html__('عریض (۲ ستون)', 'universal-elementor-suite'),
                ],
            ]
        );

        $repeater->add_control(
            'icon',
            [
                'label'   => esc_html__('آیکون / ایموجی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '🚀',
            ]
        );

        $repeater->add_control(
            'title',
            [
                'label'       => esc_html__('عنوان کارت', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('ویجت نرخ‌گذاری با سوییچر ماهانه/سالانه', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'description',
            [
                'label'   => esc_html__('توضیح کوتاه کارکرد', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('افزایش نرخ تبدیل با پیشنهاد هوشمند اشتراک و تخفیف سالانه.', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'metric_tag',
            [
                'label'   => esc_html__('برچسب آماری یا متریال', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '+۳۵٪ افزایش فروش',
            ]
        );

        $this->add_control(
            'bento_list',
            [
                'label'       => esc_html__('لیست کارت‌های بنتو', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'category_slug' => 'conversion',
                        'card_span'     => 'span-2',
                        'icon'          => '⚡',
                        'title'         => 'سوییچر هوشمند پلن‌ها با تخفیف سالانه',
                        'description'   => 'طراحی لوکس شیشه‌ای همراه با انیمیشن روان تغییر قیمت و دکمه‌های مستقیم تسویه‌حساب.',
                        'metric_tag'    => 'ویژه صفحات فرود',
                    ],
                    [
                        'category_slug' => 'conversion',
                        'card_span'     => 'span-1',
                        'icon'          => '⏳',
                        'title'         => 'شمارنده اضطرار فروش (FOMO)',
                        'description'   => 'ذخیره سشن در حافظه کاربر جهت جلوگیری از ریست فریبنده.',
                        'metric_tag'    => 'روانشناسی خرید',
                    ],
                    [
                        'category_slug' => 'builder',
                        'card_span'     => 'span-1',
                        'icon'          => '🧩',
                        'title'         => 'تمپلیت‌های کانتینری و تم‌بیلدر',
                        'description'   => 'هدر، فوتر، تک‌پست و آرشیو آماده درون‌ریزی با یک کلیک.',
                        'metric_tag'    => '۲۶+ الگوی بومی',
                    ],
                    [
                        'category_slug' => 'speed',
                        'card_span'     => 'span-2',
                        'icon'          => '🛡️',
                        'title'         => 'معماری خالص Zero-CDN و هسته سبک PHP',
                        'description'   => 'حذف کامل درخواست‌های شخص ثالث و دارایی‌های فونت خارجی جهت دستیابی به حداکثر رتبه سئو.',
                        'metric_tag'    => 'Core Web Vitals A+',
                    ],
                ],
                'title_field' => '{{{ icon }}} {{{ title }}}',
            ]
        );

        $this->end_controls_section();

        // --- 2. TAB_STYLE: Styling ---
        $this->start_controls_section(
            'section_style_bento',
            [
                'label' => esc_html__('استایل تب‌ها و کارت‌های بنتو', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'active_tab_color',
            [
                'label'     => esc_html__('رنگ تب فعال', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#6366F1',
                'selectors' => [
                    '{{WRAPPER}} .uas-bento-tab-btn.is-active' => 'background-color: {{VALUE}}; color: #fff;',
                ],
            ]
        );

        $this->add_typography_and_color_controls('bento_h', esc_html__('تیتر کارت‌ها', 'universal-elementor-suite'), '.uas-bento-title', '#0F172A');
        $this->add_container_style_controls('bento_box', esc_html__('کارت‌های بنتو', 'universal-elementor-suite'), '.uas-bento-card');

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-bento-tabs-container uas-widget-container" dir="rtl">
            <!-- Filter Tabs Navigation -->
            <div class="uas-bento-nav-tabs">
                <button type="button" class="uas-bento-tab-btn is-active" data-filter="all">همه قابلیت‌ها</button>
                <button type="button" class="uas-bento-tab-btn" data-filter="conversion">ابزارهای فروش و فرود</button>
                <button type="button" class="uas-bento-tab-btn" data-filter="builder">قالب‌های تم‌بیلدر</button>
                <button type="button" class="uas-bento-tab-btn" data-filter="speed">سرعت و معماری</button>
            </div>

            <!-- Bento Grid Cards -->
            <div class="uas-bento-grid">
                <?php foreach ($settings['bento_list'] as $card) : 
                    $cat = esc_attr($card['category_slug'] ?? 'all');
                    $span = esc_attr($card['card_span'] ?? 'span-1');
                ?>
                    <div class="uas-bento-card uas-<?php echo $span; ?>" data-category="<?php echo $cat; ?>">
                        <div class="uas-bento-card-top">
                            <span class="uas-bento-icon"><?php echo esc_html($card['icon']); ?></span>
                            <?php if (!empty($card['metric_tag'])) : ?>
                                <span class="uas-bento-metric"><?php echo esc_html($card['metric_tag']); ?></span>
                            <?php endif; ?>
                        </div>

                        <h3 class="uas-bento-title"><?php echo esc_html($card['title']); ?></h3>
                        <p class="uas-bento-desc"><?php echo esc_html($card['description']); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
}
