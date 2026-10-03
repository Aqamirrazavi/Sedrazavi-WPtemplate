<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Hero Widget
 */
class Universal_Hero_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_hero';
    }

    public function get_title() {
        return esc_html__('هیرو بنر مدرن و منعطف', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-banner';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-hero-css'];
    }

    protected function register_controls() {
        // Content Tab: Text
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('محتوای هیرو', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'badge_text',
            [
                'label'       => esc_html__('متن برچسب یا نشان', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('نوآوری در ارائه خدمات برتر', 'universal-elementor-suite'),
                'placeholder' => esc_html__('متن نشان بالای عنوان...', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'hero_title',
            [
                'label'       => esc_html__('عنوان اصلی', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXTAREA,
                'default'     => esc_html__('راهکارهای هوشمند و مدرن برای رشد کسب‌وکار شما', 'universal-elementor-suite'),
                'placeholder' => esc_html__('عنوان اصلی بخش هیرو...', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'hero_desc',
            [
                'label'       => esc_html__('توضیحات فرعی', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXTAREA,
                'default'     => esc_html__('ارائه مشاوره‌های تخصصی، استراتژی‌های تحول دیجیتال و راهکارهای جامع متناسب با اهداف سازمان شما.', 'universal-elementor-suite'),
                'placeholder' => esc_html__('متن توضیحات...', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'primary_btn_text',
            [
                'label'   => esc_html__('متن دکمه اصلی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('شروع همکاری و مشاوره', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'primary_btn_url',
            [
                'label'       => esc_html__('لینک دکمه اصلی', 'universal-elementor-suite'),
                'type'        => Controls_Manager::URL,
                'placeholder' => 'https://example.com/contact',
                'default'     => ['url' => '#contact'],
            ]
        );

        $this->add_control(
            'secondary_btn_text',
            [
                'label'   => esc_html__('متن دکمه ثانویه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('مشاهده خدمات و پروژه‌ها', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'secondary_btn_url',
            [
                'label'       => esc_html__('لینک دکمه ثانویه', 'universal-elementor-suite'),
                'type'        => Controls_Manager::URL,
                'placeholder' => 'https://example.com/services',
                'default'     => ['url' => '#services'],
            ]
        );

        $this->add_control(
            'hero_image',
            [
                'label'   => esc_html__('تصویر شاخص هیرو', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url' => 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
                ],
            ]
        );

        $this->end_controls_section();

        // Style Tab: Colors & Typography
        $this->start_controls_section(
            'section_style_typography',
            [
                'label' => esc_html__('تایپوگرافی و رنگ‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'title_color',
            [
                'label'     => esc_html__('رنگ عنوان', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#0F172A',
                'selectors' => [
                    '{{WRAPPER}} .uas-hero-title' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'     => 'title_typography',
                'selector' => '{{WRAPPER}} .uas-hero-title',
            ]
        );

        $this->add_control(
            'desc_color',
            [
                'label'     => esc_html__('رنگ توضیحات', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#64748B',
                'selectors' => [
                    '{{WRAPPER}} .uas-hero-desc' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'badge_bg_color',
            [
                'label'     => esc_html__('رنگ پس‌زمینه نشان', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => 'rgba(37, 99, 235, 0.1)',
                'selectors' => [
                    '{{WRAPPER}} .uas-hero-badge' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'badge_text_color',
            [
                'label'     => esc_html__('رنگ متن نشان', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#2563EB',
                'selectors' => [
                    '{{WRAPPER}} .uas-hero-badge' => 'color: {{VALUE}}; border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'btn_primary_bg',
            [
                'label'     => esc_html__('رنگ دکمه اصلی', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#2563EB',
                'selectors' => [
                    '{{WRAPPER}} .uas-btn-primary' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-hero-wrapper uas-widget-container" dir="rtl">
            <div class="uas-hero-inner">
                <div class="uas-hero-content">
                    <?php if (!empty($settings['badge_text'])) : ?>
                        <div class="uas-hero-badge">
                            <span>★</span>
                            <span><?php echo esc_html($settings['badge_text']); ?></span>
                        </div>
                    <?php endif; ?>

                    <?php if (!empty($settings['hero_title'])) : ?>
                        <h1 class="uas-hero-title"><?php echo esc_html($settings['hero_title']); ?></h1>
                    <?php endif; ?>

                    <?php if (!empty($settings['hero_desc'])) : ?>
                        <p class="uas-hero-desc"><?php echo esc_html($settings['hero_desc']); ?></p>
                    <?php endif; ?>

                    <div class="uas-hero-actions">
                        <?php if (!empty($settings['primary_btn_text'])) : ?>
                            <a href="<?php echo esc_url($settings['primary_btn_url']['url'] ?? '#'); ?>" class="uas-btn-primary">
                                <?php echo esc_html($settings['primary_btn_text']); ?>
                            </a>
                        <?php endif; ?>

                        <?php if (!empty($settings['secondary_btn_text'])) : ?>
                            <a href="<?php echo esc_url($settings['secondary_btn_url']['url'] ?? '#'); ?>" class="uas-btn-secondary">
                                <?php echo esc_html($settings['secondary_btn_text']); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>

                <?php if (!empty($settings['hero_image']['url'])) : ?>
                    <div class="uas-hero-media">
                        <img src="<?php echo esc_url($settings['hero_image']['url']); ?>" alt="<?php echo esc_attr($settings['hero_title']); ?>" class="uas-hero-img" loading="lazy" />
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
}
