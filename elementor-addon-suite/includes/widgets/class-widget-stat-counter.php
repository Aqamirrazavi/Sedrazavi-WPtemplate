<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Animated Stat Counter Widget
 *
 * High-converting statistics counter with smooth viewport-triggered counting,
 * prefixes, suffixes, and comprehensive 3-tab native Elementor sidebar controls.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Universal_Stat_Counter_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_stat_counter';
    }

    public function get_title() {
        return esc_html__('پیشخوان آمار و ارقام انیمیشنی (Stat Counter)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-counter';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-stat-counter-css'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core', 'uas-stat-counter-js'];
    }

    protected function register_controls() {
        // --- 1. TAB_CONTENT: General & Layout ---
        $this->start_controls_section(
            'section_general',
            [
                'label' => esc_html__('تنظیمات عمومی و چیدمان', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'columns',
            [
                'label'   => esc_html__('تعداد ستون‌ها در دسکتاپ', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => '4',
                'options' => [
                    '2' => esc_html__('۲ ستون', 'universal-elementor-suite'),
                    '3' => esc_html__('۳ ستون', 'universal-elementor-suite'),
                    '4' => esc_html__('۴ ستون', 'universal-elementor-suite'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .uas-stat-grid' => '--uas-stat-cols: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'duration',
            [
                'label'   => esc_html__('مدت زمان انیمیشن (میلی‌ثانیه)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::NUMBER,
                'min'     => 500,
                'max'     => 5000,
                'step'    => 100,
                'default' => 2000,
            ]
        );

        $this->end_controls_section();

        // --- 2. TAB_CONTENT: Stats Items Repeater ---
        $this->start_controls_section(
            'section_items',
            [
                'label' => esc_html__('آیتم‌های آماری', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'number',
            [
                'label'       => esc_html__('عدد نهایی هدف', 'universal-elementor-suite'),
                'type'        => Controls_Manager::NUMBER,
                'default'     => 1500,
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'prefix',
            [
                'label'   => esc_html__('پیشوند (اختیاری)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '',
            ]
        );

        $repeater->add_control(
            'suffix',
            [
                'label'   => esc_html__('پسوند (مانند + یا ٪)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '+',
            ]
        );

        $repeater->add_control(
            'title',
            [
                'label'       => esc_html__('عنوان آمار', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('پروژه موفق پیاده‌سازی‌شده', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'description',
            [
                'label'   => esc_html__('توضیح تکمیلی کوتاه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('در صنایع نرم‌افزاری و حقوقی', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'icon',
            [
                'label'   => esc_html__('نماد / ایموجی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '🚀',
            ]
        );

        $this->add_control(
            'stats_list',
            [
                'label'       => esc_html__('لیست آمارها', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'number'      => 1250,
                        'suffix'      => '+',
                        'title'       => esc_html__('پروژه موفق ثبت‌شده', 'universal-elementor-suite'),
                        'description' => esc_html__('در اکوسیستم‌های مختلف وب', 'universal-elementor-suite'),
                        'icon'        => '⚡',
                    ],
                    [
                        'number'      => 99,
                        'suffix'      => '%',
                        'title'       => esc_html__('نرخ رضایت کارفرمایان', 'universal-elementor-suite'),
                        'description' => esc_html__('بر پایه سنجش کیفی مستمر', 'universal-elementor-suite'),
                        'icon'        => '⭐',
                    ],
                    [
                        'number'      => 45,
                        'suffix'      => '+',
                        'title'       => esc_html__('تخصص و خدمت سازمانی', 'universal-elementor-suite'),
                        'description' => esc_html__('طراحی، بهینه‌سازی و سئو', 'universal-elementor-suite'),
                        'icon'        => '🛡️',
                    ],
                    [
                        'number'      => 24,
                        'suffix'      => '/7',
                        'title'       => esc_html__('پایش و پشتیبانی برخط', 'universal-elementor-suite'),
                        'description' => esc_html__('پاسخگویی در کوتاه‌ترین زمان', 'universal-elementor-suite'),
                        'icon'        => '🎯',
                    ],
                ],
                'title_field' => '{{{ title }}} ({{{ number }}}{{{ suffix }}})',
            ]
        );

        $this->end_controls_section();

        // --- 3. TAB_STYLE: Numbers Style ---
        $this->start_controls_section(
            'section_style_number',
            [
                'label' => esc_html__('استایل اعداد و شمارنده', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_typography_and_color_controls('stat_num', esc_html__('اعداد', 'universal-elementor-suite'), '.uas-stat-number', '#4F46E5');

        $this->end_controls_section();

        // --- 4. TAB_STYLE: Titles & Labels Style ---
        $this->start_controls_section(
            'section_style_labels',
            [
                'label' => esc_html__('استایل عناوین و توضیحات', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_typography_and_color_controls('stat_title', esc_html__('عنوان', 'universal-elementor-suite'), '.uas-stat-title', '#0F172A');
        $this->add_typography_and_color_controls('stat_desc', esc_html__('توضیح کوتاه', 'universal-elementor-suite'), '.uas-stat-desc', '#64748B');

        $this->end_controls_section();

        // --- 5. TAB_STYLE: Card Container Style ---
        $this->start_controls_section(
            'section_style_cards',
            [
                'label' => esc_html__('استایل کارت‌های آماری', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_container_style_controls('stat_card', esc_html__('کارت', 'universal-elementor-suite'), '.uas-stat-card');

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $duration = intval($settings['duration'] ?? 2000);
        ?>
        <div class="uas-stat-counter-wrapper uas-widget-container" dir="rtl" data-duration="<?php echo esc_attr($duration); ?>">
            <div class="uas-stat-grid">
                <?php foreach ($settings['stats_list'] as $item) : 
                    $target_num = intval($item['number'] ?? 0);
                    $prefix = esc_html($item['prefix'] ?? '');
                    $suffix = esc_html($item['suffix'] ?? '');
                    $icon = esc_html($item['icon'] ?? '');
                ?>
                    <div class="uas-stat-card">
                        <?php if (!empty($icon)) : ?>
                            <div class="uas-stat-icon-wrap"><?php echo $icon; ?></div>
                        <?php endif; ?>

                        <div class="uas-stat-number-wrap">
                            <span class="uas-stat-prefix"><?php echo $prefix; ?></span>
                            <span class="uas-stat-number" data-target="<?php echo esc_attr($target_num); ?>">0</span>
                            <span class="uas-stat-suffix"><?php echo $suffix; ?></span>
                        </div>

                        <h4 class="uas-stat-title"><?php echo esc_html($item['title'] ?? ''); ?></h4>

                        <?php if (!empty($item['description'])) : ?>
                            <p class="uas-stat-desc"><?php echo esc_html($item['description']); ?></p>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
}
