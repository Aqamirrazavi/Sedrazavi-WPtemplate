<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use Elementor\Group_Control_Typography;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Services & Features Grid Widget
 */
class Universal_Services_Grid_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_services_grid';
    }

    public function get_title() {
        return esc_html__('شبکه خدمات و ویژگی‌ها (کارت‌های مدرن)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-gallery-grid';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-services-grid-css'];
    }

    protected function register_controls() {
        // Content Section: Header
        $this->start_controls_section(
            'section_header',
            [
                'label' => esc_html__('سربرگ بخش', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'subtitle',
            [
                'label'   => esc_html__('زیرعنوان', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('خدمات و توانمندی‌های تخصصی', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'title',
            [
                'label'   => esc_html__('عنوان اصلی بخش', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('حوزه‌های ارائه خدمات جامع و تخصصی', 'universal-elementor-suite'),
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
                    '4' => esc_html__('۴ ستون', 'universal-elementor-suite'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .uas-services-grid' => '--uas-grid-cols: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();

        // Content Section: Repeater Items
        $this->start_controls_section(
            'section_items',
            [
                'label' => esc_html__('لیست کارت‌های خدمات', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'icon',
            [
                'label'   => esc_html__('آیکون کارت', 'universal-elementor-suite'),
                'type'    => Controls_Manager::ICONS,
                'default' => [
                    'value'   => 'fas fa-rocket',
                    'library' => 'fa-solid',
                ],
            ]
        );

        $repeater->add_control(
            'item_title',
            [
                'label'       => esc_html__('عنوان کارت', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('مشاوره راهبردی و مدیریت پروژه', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'item_desc',
            [
                'label'   => esc_html__('توضیحات کارت', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('طراحی نقشه‌راه اجرایی، تحلیل شاخص‌های عملکرد و تسریع دستیابی به اهداف سازمانی.', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'item_link_text',
            [
                'label'   => esc_html__('متن دکمه پیوند', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('اطلاعات بیشتر ←', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'item_link_url',
            [
                'label'       => esc_html__('لینک کارت', 'universal-elementor-suite'),
                'type'        => Controls_Manager::URL,
                'placeholder' => 'https://example.com/details',
                'default'     => ['url' => '#'],
            ]
        );

        $this->add_control(
            'services_list',
            [
                'label'       => esc_html__('کارت‌های خدمات', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'item_title' => esc_html__('مشاوره راهبردی و مدیریت پروژه', 'universal-elementor-suite'),
                        'item_desc'  => esc_html__('طراحی نقشه‌راه اجرایی، تحلیل شاخص‌های عملکرد و تسریع دستیابی به اهداف سازمانی.', 'universal-elementor-suite'),
                        'item_link_text' => esc_html__('اطلاعات بیشتر ←', 'universal-elementor-suite'),
                    ],
                    [
                        'item_title' => esc_html__('توسعه پلتفرم‌ها و فناوری‌های نوین', 'universal-elementor-suite'),
                        'item_desc'  => esc_html__('پیاده‌سازی سامانه‌های یکپارچه، تحول دیجیتال و بهینه‌سازی فرآیندهای عملیاتی کسب‌وکار.', 'universal-elementor-suite'),
                        'item_link_text' => esc_html__('اطلاعات بیشتر ←', 'universal-elementor-suite'),
                    ],
                    [
                        'item_title' => esc_html__('حسابرسی، انطباق و نظارت کیفی', 'universal-elementor-suite'),
                        'item_desc'  => esc_html__('پایش استانداردها، کنترل ریسک، تضمین کیفیت و تطبیق با آخرین مقررات و ضوابط صنعت.', 'universal-elementor-suite'),
                        'item_link_text' => esc_html__('اطلاعات بیشتر ←', 'universal-elementor-suite'),
                    ],
                ],
                'title_field' => '{{{ item_title }}}',
            ]
        );

        $this->end_controls_section();

        // Style Section
        $this->start_controls_section(
            'section_style_cards',
            [
                'label' => esc_html__('استایل کارت‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'card_bg_color',
            [
                'label'     => esc_html__('رنگ پس‌زمینه کارت', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#FFFFFF',
                'selectors' => [
                    '{{WRAPPER}} .uas-service-card' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'card_primary_accent',
            [
                'label'     => esc_html__('رنگ شاخص و آیکون', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#2563EB',
                'selectors' => [
                    '{{WRAPPER}} .uas-service-icon-box' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .uas-service-link' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .uas-service-card:hover' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-services-wrapper uas-widget-container" dir="rtl">
            <?php if (!empty($settings['subtitle']) || !empty($settings['title'])) : ?>
                <div class="uas-services-header">
                    <?php if (!empty($settings['subtitle'])) : ?>
                        <div class="uas-services-subtitle"><?php echo esc_html($settings['subtitle']); ?></div>
                    <?php endif; ?>
                    <?php if (!empty($settings['title'])) : ?>
                        <h2 class="uas-services-heading"><?php echo esc_html($settings['title']); ?></h2>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="uas-services-grid">
                <?php foreach ($settings['services_list'] as $item) : ?>
                    <div class="uas-service-card">
                        <div class="uas-service-icon-box">
                            <?php if (!empty($item['icon']['value'])) : ?>
                                <i class="<?php echo esc_attr($item['icon']['value']); ?>"></i>
                            <?php else : ?>
                                <span>✦</span>
                            <?php endif; ?>
                        </div>

                        <h3 class="uas-service-card-title"><?php echo esc_html($item['item_title']); ?></h3>
                        <p class="uas-service-card-desc"><?php echo esc_html($item['item_desc']); ?></p>

                        <?php if (!empty($item['item_link_text'])) : ?>
                            <a href="<?php echo esc_url($item['item_link_url']['url'] ?? '#'); ?>" class="uas-service-link">
                                <span><?php echo esc_html($item['item_link_text']); ?></span>
                            </a>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
}
