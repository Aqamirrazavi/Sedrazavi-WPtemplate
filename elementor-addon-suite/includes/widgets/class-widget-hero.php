<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Image_Size;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Hero Widget (Golden Widget Benchmark - Phase 5)
 *
 * Topic-agnostic, Elementor-first Hero Banner supporting:
 * - Global Kit Design Tokens & Custom Presets (4 architectural variants)
 * - Dynamic Tags compatibility across copy, CTA URLs, accessibility labels & media
 * - Responsive Flexbox direction, spacing & logical RTL/LTR alignment
 * - Bundled Sovereign SVG placeholder fallback (Zero external CDN URLs)
 * - Semantic landmarks, Heading tag allowlist & safe link rel attributes
 */
class Universal_Hero_Widget extends Universal_Widget_Base {

    /**
     * Widget Slug
     *
     * @return string
     */
    public function get_name() {
        return 'uas_hero';
    }

    /**
     * Widget Display Title
     *
     * @return string
     */
    public function get_title() {
        return esc_html__('هیرو بنر مدرن و منعطف', 'universal-elementor-suite');
    }

    /**
     * Widget Icon
     *
     * @return string
     */
    public function get_icon() {
        return 'eicon-banner';
    }

    /**
     * Search Keywords inside Elementor Panel
     *
     * @return array
     */
    public function get_keywords() {
        return ['hero', 'banner', 'header', 'cta', 'showcase', 'هیرو', 'بنر', 'سربرگ'];
    }

    /**
     * Required Stylesheets
     *
     * @return array
     */
    public function get_style_depends() {
        return ['uas-design-tokens', 'uas-widgets-core', 'uas-hero-css'];
    }

    /**
     * Local bundled sovereign placeholder URL (zero external CDN dependencies)
     *
     * @return string
     */
    protected function get_default_hero_image_url() {
        if (defined('UAS_URL')) {
            return trailingslashit(UAS_URL) . 'assets/images/placeholders/hero-showcase.svg';
        }
        return '';
    }

    /**
     * Register Widget Controls (Content Tab + Style Tab)
     */
    protected function register_controls() {
        /* ---------------------------------------------------------------------
         * TAB_CONTENT: 1. Primary Content & Actions (with Dynamic Tags)
         * ------------------------------------------------------------------ */
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('محتوای هیرو', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'show_badge',
            [
                'label'        => esc_html__('نمایش نشان بالای عنوان', 'universal-elementor-suite'),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => esc_html__('بله', 'universal-elementor-suite'),
                'label_off'    => esc_html__('خیر', 'universal-elementor-suite'),
                'return_value' => 'yes',
                'default'      => 'yes',
            ]
        );

        $this->add_control(
            'badge_text',
            [
                'label'       => esc_html__('متن برچسب یا نشان', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'dynamic'     => ['active' => true],
                'default'     => esc_html__('نوآوری در ارائه خدمات برتر', 'universal-elementor-suite'),
                'placeholder' => esc_html__('متن نشان بالای عنوان...', 'universal-elementor-suite'),
                'condition'   => ['show_badge' => 'yes'],
            ]
        );

        $this->add_control(
            'hero_title',
            [
                'label'       => esc_html__('عنوان اصلی', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXTAREA,
                'rows'        => 2,
                'dynamic'     => ['active' => true],
                'default'     => esc_html__('راهکارهای هوشمند و مدرن برای رشد کسب‌وکار شما', 'universal-elementor-suite'),
                'placeholder' => esc_html__('عنوان اصلی بخش هیرو...', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'title_tag',
            [
                'label'   => esc_html__('تگ HTML عنوان (سئو و دسترس‌پذیری)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => 'h1',
                'options' => [
                    'h1'  => 'H1',
                    'h2'  => 'H2',
                    'h3'  => 'H3',
                    'div' => 'DIV',
                ],
            ]
        );

        $this->add_control(
            'hero_desc',
            [
                'label'       => esc_html__('توضیحات فرعی', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXTAREA,
                'rows'        => 3,
                'dynamic'     => ['active' => true],
                'default'     => esc_html__('ارائه مشاوره‌های تخصصی، استراتژی‌های تحول دیجیتال و راهکارهای جامع متناسب با اهداف سازمان شما.', 'universal-elementor-suite'),
                'placeholder' => esc_html__('متن توضیحات...', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'primary_btn_text',
            [
                'label'   => esc_html__('متن دکمه اصلی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'dynamic' => ['active' => true],
                'default' => esc_html__('شروع همکاری و مشاوره', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'primary_btn_url',
            [
                'label'       => esc_html__('لینک دکمه اصلی', 'universal-elementor-suite'),
                'type'        => Controls_Manager::URL,
                'dynamic'     => ['active' => true],
                'placeholder' => 'https://example.com/contact',
                'options'     => ['url', 'is_external', 'nofollow'],
                'default'     => [
                    'url'         => '#contact',
                    'is_external' => false,
                    'nofollow'    => false,
                ],
            ]
        );

        $this->add_control(
            'primary_btn_aria_label',
            [
                'label'       => esc_html__('برچسب دسترس‌پذیری دکمه اصلی (Aria Label)', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'dynamic'     => ['active' => true],
                'default'     => '',
                'placeholder' => esc_html__('توضیح تکمیلی برای صفحه‌خوان‌ها...', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'secondary_btn_text',
            [
                'label'   => esc_html__('متن دکمه ثانویه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'dynamic' => ['active' => true],
                'default' => esc_html__('مشاهده خدمات و پروژه‌ها', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'secondary_btn_url',
            [
                'label'       => esc_html__('لینک دکمه ثانویه', 'universal-elementor-suite'),
                'type'        => Controls_Manager::URL,
                'dynamic'     => ['active' => true],
                'placeholder' => 'https://example.com/services',
                'options'     => ['url', 'is_external', 'nofollow'],
                'default'     => [
                    'url'         => '#services',
                    'is_external' => false,
                    'nofollow'    => false,
                ],
            ]
        );

        $this->add_control(
            'secondary_btn_aria_label',
            [
                'label'       => esc_html__('برچسب دسترس‌پذیری دکمه ثانویه (Aria Label)', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'dynamic'     => ['active' => true],
                'default'     => '',
                'placeholder' => esc_html__('توضیح تکمیلی برای صفحه‌خوان‌ها...', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();

        /* ---------------------------------------------------------------------
         * TAB_CONTENT: 2. Sovereign Media Control (No External Stock CDN)
         * ------------------------------------------------------------------ */
        $this->start_controls_section(
            'section_media',
            [
                'label' => esc_html__('رسانه و تصویر شاخص', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'show_media',
            [
                'label'        => esc_html__('نمایش تصویر هیرو', 'universal-elementor-suite'),
                'type'         => Controls_Manager::SWITCHER,
                'label_on'     => esc_html__('بله', 'universal-elementor-suite'),
                'label_off'    => esc_html__('خیر', 'universal-elementor-suite'),
                'return_value' => 'yes',
                'default'      => 'yes',
            ]
        );

        $this->add_control(
            'hero_image',
            [
                'label'     => esc_html__('تصویر شاخص هیرو', 'universal-elementor-suite'),
                'type'      => Controls_Manager::MEDIA,
                'dynamic'   => ['active' => true],
                'default'   => [
                    'url' => $this->get_default_hero_image_url(),
                ],
                'condition' => ['show_media' => 'yes'],
            ]
        );

        if (class_exists('\Elementor\Group_Control_Image_Size')) {
            $this->add_group_control(
                Group_Control_Image_Size::get_type(),
                [
                    'name'      => 'hero_image_size',
                    'default'   => 'large',
                    'condition' => ['show_media' => 'yes'],
                ]
            );
        }

        $this->add_control(
            'hero_image_alt',
            [
                'label'       => esc_html__('متن جایگزین تصویر (Alt Text)', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'dynamic'     => ['active' => true],
                'default'     => '',
                'placeholder' => esc_html__('در صورت خالی بودن از عنوان اصلی استفاده می‌شود...', 'universal-elementor-suite'),
                'condition'   => ['show_media' => 'yes'],
            ]
        );

        $this->end_controls_section();

        /* ---------------------------------------------------------------------
         * TAB_CONTENT: 3. Presets & Responsive Layout (RTL / LTR)
         * ------------------------------------------------------------------ */
        $this->start_controls_section(
            'section_layout_presets',
            [
                'label' => esc_html__('پریست‌ها و چیدمان واکنش‌گرا', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'hero_preset',
            [
                'label'   => esc_html__('طرح پیش‌فرض (Preset)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => 'modern-card',
                'options' => [
                    'modern-card'        => esc_html__('کارت مدرن (پیش‌فرض)', 'universal-elementor-suite'),
                    'split-executive'    => esc_html__('اجرایی لوکس (سرمه‌ای و طلایی)', 'universal-elementor-suite'),
                    'centered-editorial' => esc_html__('سرمقاله متمرکز', 'universal-elementor-suite'),
                    'minimal-glass'      => esc_html__('شیشه‌ای مینیمال', 'universal-elementor-suite'),
                ],
            ]
        );

        $this->add_responsive_control(
            'layout_direction',
            [
                'label'   => esc_html__('جهت چیدمان محتوا و تصویر', 'universal-elementor-suite'),
                'type'    => Controls_Manager::CHOOSE,
                'options' => [
                    'row' => [
                        'title' => esc_html__('افقی (استاندارد)', 'universal-elementor-suite'),
                        'icon'  => 'eicon-h-align-right',
                    ],
                    'row-reverse' => [
                        'title' => esc_html__('افقی (معکوس)', 'universal-elementor-suite'),
                        'icon'  => 'eicon-h-align-left',
                    ],
                    'column' => [
                        'title' => esc_html__('عمودی (تصویر پایین)', 'universal-elementor-suite'),
                        'icon'  => 'eicon-v-align-bottom',
                    ],
                    'column-reverse' => [
                        'title' => esc_html__('عمودی (تصویر بالا)', 'universal-elementor-suite'),
                        'icon'  => 'eicon-v-align-top',
                    ],
                ],
                'default'   => 'row',
                'selectors' => [
                    '{{WRAPPER}} .uas-hero-inner' => 'flex-direction: {{VALUE}};',
                ],
            ]
        );

        $this->add_rtl_alignment_control(
            'content_align',
            esc_html__('ترازبندی متن (RTL/LTR)', 'universal-elementor-suite'),
            '.uas-hero-content'
        );

        $this->add_responsive_control(
            'container_max_width',
            [
                'label'      => esc_html__('حداکثر عرض محتوا', 'universal-elementor-suite'),
                'type'       => Controls_Manager::SLIDER,
                'size_units' => ['px', '%'],
                'range'      => [
                    'px' => ['min' => 640, 'max' => 1600, 'step' => 20],
                    '%'  => ['min' => 50, 'max' => 100],
                ],
                'default'    => ['unit' => 'px', 'size' => 1200],
                'selectors'  => [
                    '{{WRAPPER}} .uas-hero-inner' => 'max-width: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'content_gap',
            [
                'label'      => esc_html__('فاصله بین متن و تصویر', 'universal-elementor-suite'),
                'type'       => Controls_Manager::SLIDER,
                'size_units' => ['px', 'rem'],
                'range'      => [
                    'px'  => ['min' => 12, 'max' => 96, 'step' => 4],
                    'rem' => ['min' => 1, 'max' => 6, 'step' => 0.25],
                ],
                'default'    => ['unit' => 'px', 'size' => 48],
                'selectors'  => [
                    '{{WRAPPER}} .uas-hero-inner' => 'gap: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        /* ---------------------------------------------------------------------
         * TAB_STYLE: 1. Wrapper Container (Background, Border, Radius, Shadow, Padding)
         * ------------------------------------------------------------------ */
        $this->start_controls_section(
            'section_style_wrapper',
            [
                'label' => esc_html__('قاب و کانتینر هیرو', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_container_style_controls(
            'hero_wrapper',
            esc_html__('کانتینر هیرو', 'universal-elementor-suite'),
            '.uas-hero-wrapper'
        );

        $this->end_controls_section();

        /* ---------------------------------------------------------------------
         * TAB_STYLE: 2. Typography & Global Kit Colors
         * (Preserves title_color, title_typography, desc_color, badge_* IDs)
         * ------------------------------------------------------------------ */
        $this->start_controls_section(
            'section_style_typography',
            [
                'label' => esc_html__('تایپوگرافی و رنگ‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_typography_and_color_controls(
            'title',
            esc_html__('عنوان', 'universal-elementor-suite'),
            '.uas-hero-title',
            '#0F172A',
            'primary',
            'primary'
        );

        $this->add_typography_and_color_controls(
            'desc',
            esc_html__('توضیحات', 'universal-elementor-suite'),
            '.uas-hero-desc',
            '#64748B',
            'text',
            'text'
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
                'condition' => ['show_badge' => 'yes'],
            ]
        );

        $badge_text_args = [
            'label'     => esc_html__('رنگ متن نشان', 'universal-elementor-suite'),
            'type'      => Controls_Manager::COLOR,
            'default'   => '#2563EB',
            'selectors' => [
                '{{WRAPPER}} .uas-hero-badge' => 'color: {{VALUE}}; border-color: {{VALUE}};',
            ],
            'condition' => ['show_badge' => 'yes'],
        ];
        if (class_exists('\Elementor\Core\Kits\Documents\Tabs\Global_Colors')) {
            $badge_text_args['global'] = ['default' => Global_Colors::COLOR_PRIMARY];
        }
        $this->add_control('badge_text_color', $badge_text_args);

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'      => 'badge_typography',
                'label'     => esc_html__('تایپوگرافی نشان', 'universal-elementor-suite'),
                'selector'  => '{{WRAPPER}} .uas-hero-badge',
                'condition' => ['show_badge' => 'yes'],
            ]
        );

        $this->end_controls_section();

        /* ---------------------------------------------------------------------
         * TAB_STYLE: 3. CTA Buttons (Primary & Secondary + Hover States)
         * (Preserves btn_primary_bg control ID for template compatibility)
         * ------------------------------------------------------------------ */
        $this->start_controls_section(
            'section_style_buttons',
            [
                'label' => esc_html__('دکمه‌های فراخوان (CTA)', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'     => 'btn_primary_typography',
                'label'    => esc_html__('تایپوگرافی دکمه‌ها', 'universal-elementor-suite'),
                'selector' => '{{WRAPPER}} .uas-btn-primary, {{WRAPPER}} .uas-btn-secondary',
            ]
        );

        $btn_primary_bg_args = [
            'label'     => esc_html__('رنگ دکمه اصلی', 'universal-elementor-suite'),
            'type'      => Controls_Manager::COLOR,
            'default'   => '#2563EB',
            'selectors' => [
                '{{WRAPPER}} .uas-btn-primary' => 'background-color: {{VALUE}};',
            ],
        ];
        if (class_exists('\Elementor\Core\Kits\Documents\Tabs\Global_Colors')) {
            $btn_primary_bg_args['global'] = ['default' => Global_Colors::COLOR_PRIMARY];
        }
        $this->add_control('btn_primary_bg', $btn_primary_bg_args);

        $this->add_control(
            'btn_primary_text_color',
            [
                'label'     => esc_html__('رنگ متن دکمه اصلی', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#FFFFFF',
                'selectors' => [
                    '{{WRAPPER}} .uas-btn-primary' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'btn_primary_hover_bg',
            [
                'label'     => esc_html__('پس‌زمینه هاور دکمه اصلی', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#1D4ED8',
                'selectors' => [
                    '{{WRAPPER}} .uas-btn-primary:hover, {{WRAPPER}} .uas-btn-primary:focus-visible' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'btn_secondary_text_color',
            [
                'label'     => esc_html__('رنگ متن دکمه ثانویه', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .uas-btn-secondary' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'btn_secondary_border_color',
            [
                'label'     => esc_html__('رنگ کادر دکمه ثانویه', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .uas-btn-secondary' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'btn_secondary_hover_bg',
            [
                'label'     => esc_html__('پس‌زمینه هاور دکمه ثانویه', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .uas-btn-secondary:hover, {{WRAPPER}} .uas-btn-secondary:focus-visible' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'btn_padding',
            [
                'label'      => esc_html__('فاصله داخلی دکمه‌ها', 'universal-elementor-suite'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em'],
                'selectors'  => [
                    '{{WRAPPER}} .uas-btn-primary, {{WRAPPER}} .uas-btn-secondary' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'btn_border_radius',
            [
                'label'      => esc_html__('شعاع گوشه دکمه‌ها', 'universal-elementor-suite'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .uas-btn-primary, {{WRAPPER}} .uas-btn-secondary' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        /* ---------------------------------------------------------------------
         * TAB_STYLE: 4. Hero Media Style
         * ------------------------------------------------------------------ */
        $this->start_controls_section(
            'section_style_media',
            [
                'label'     => esc_html__('استایل تصویر شاخص', 'universal-elementor-suite'),
                'tab'       => Controls_Manager::TAB_STYLE,
                'condition' => ['show_media' => 'yes'],
            ]
        );

        $this->add_responsive_control(
            'media_max_width',
            [
                'label'      => esc_html__('حداکثر عرض تصویر', 'universal-elementor-suite'),
                'type'       => Controls_Manager::SLIDER,
                'size_units' => ['px', '%'],
                'range'      => [
                    'px' => ['min' => 200, 'max' => 900, 'step' => 10],
                    '%'  => ['min' => 25, 'max' => 100],
                ],
                'selectors'  => [
                    '{{WRAPPER}} .uas-hero-img' => 'max-width: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'media_object_fit',
            [
                'label'     => esc_html__('تناسب برش تصویر (Object Fit)', 'universal-elementor-suite'),
                'type'      => Controls_Manager::SELECT,
                'default'   => 'cover',
                'options'   => [
                    'cover'   => 'Cover',
                    'contain' => 'Contain',
                    'fill'    => 'Fill',
                ],
                'selectors' => [
                    '{{WRAPPER}} .uas-hero-img' => 'object-fit: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'media_border_radius',
            [
                'label'      => esc_html__('شعاع گوشه تصویر', 'universal-elementor-suite'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .uas-hero-img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name'     => 'media_border',
                'selector' => '{{WRAPPER}} .uas-hero-img',
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name'     => 'media_box_shadow',
                'selector' => '{{WRAPPER}} .uas-hero-img',
            ]
        );

        $this->end_controls_section();
    }

    /**
     * Build safe link attributes with noopener/noreferrer protection on external URLs
     *
     * @param string $attr_key
     * @param array  $url_control
     * @param string $aria_label
     * @param string $default_href
     * @return string Rendered HTML attribute string
     */
    protected function build_safe_link_attrs($attr_key, $url_control, $aria_label = '', $default_href = '#') {
        $url_data = is_array($url_control) ? $url_control : ['url' => (string) $url_control];
        $href = !empty($url_data['url']) ? $url_data['url'] : $default_href;
        $url_data['url'] = $href;

        $is_external = !empty($url_data['is_external']);
        $is_nofollow = !empty($url_data['nofollow']);

        if (method_exists($this, 'add_link_attributes')) {
            $this->add_link_attributes($attr_key, $url_data);
            $rel_parts = [];
            if ($is_external) {
                $rel_parts[] = 'noopener';
                $rel_parts[] = 'noreferrer';
            }
            if ($is_nofollow) {
                $rel_parts[] = 'nofollow';
            }
            if (!empty($rel_parts)) {
                $this->add_render_attribute($attr_key, 'rel', implode(' ', array_unique($rel_parts)));
            }
            if (!empty($aria_label)) {
                $this->add_render_attribute($attr_key, 'aria-label', $aria_label);
            }
            $rendered = $this->get_render_attribute_string($attr_key);
            if (!empty($rendered)) {
                return $rendered;
            }
        }

        $attrs = 'href="' . esc_url($href) . '"';
        if ($is_external) {
            $attrs .= ' target="_blank"';
        }
        $rel_parts = [];
        if ($is_external) {
            $rel_parts[] = 'noopener';
            $rel_parts[] = 'noreferrer';
        }
        if ($is_nofollow) {
            $rel_parts[] = 'nofollow';
        }
        if (!empty($rel_parts)) {
            $attrs .= ' rel="' . esc_attr(implode(' ', array_unique($rel_parts))) . '"';
        }
        if (!empty($aria_label)) {
            $attrs .= ' aria-label="' . esc_attr($aria_label) . '"';
        }
        return $attrs;
    }

    /**
     * Render Frontend Output (Accessible, RTL/LTR Aware, Safe Tags & Media)
     */
    protected function render() {
        $settings = $this->get_settings_for_display();

        // Allowlisted heading tag
        $raw_tag = $settings['title_tag'] ?? 'h1';
        $title_tag = in_array($raw_tag, ['h1', 'h2', 'h3', 'div'], true) ? $raw_tag : 'h1';

        // Allowlisted design preset
        $raw_preset = $settings['hero_preset'] ?? 'modern-card';
        $allowed_presets = ['modern-card', 'split-executive', 'centered-editorial', 'minimal-glass'];
        $preset = in_array($raw_preset, $allowed_presets, true) ? $raw_preset : 'modern-card';

        // Conditional document direction (never hardcoded RTL on LTR sites)
        $dir_attr = (function_exists('is_rtl') && !is_rtl()) ? 'ltr' : 'rtl';
        $widget_uid = method_exists($this, 'get_id') ? sanitize_html_class($this->get_id()) : 'hero';
        $title_dom_id = 'uas-hero-title-' . $widget_uid;

        $show_badge = ($settings['show_badge'] ?? 'yes') === 'yes';
        $show_media = ($settings['show_media'] ?? 'yes') === 'yes';
        $has_title = !empty($settings['hero_title']);

        $media = is_array($settings['hero_image'] ?? null) ? $settings['hero_image'] : [];
        $img_url = !empty($media['url']) ? $media['url'] : $this->get_default_hero_image_url();
        $img_id = !empty($media['id']) ? (int) $media['id'] : 0;
        $alt_text = !empty($settings['hero_image_alt'])
            ? $settings['hero_image_alt']
            : (!empty($settings['hero_title']) ? wp_strip_all_tags($settings['hero_title']) : esc_html__('تصویر هیرو', 'universal-elementor-suite'));
        ?>
        <section
            class="uas-hero-wrapper uas-widget-container uas-hero-preset-<?php echo esc_attr($preset); ?>"
            dir="<?php echo esc_attr($dir_attr); ?>"
            <?php echo $has_title ? 'aria-labelledby="' . esc_attr($title_dom_id) . '"' : ''; ?>
        >
            <div class="uas-hero-inner">
                <div class="uas-hero-content">
                    <?php if ($show_badge && !empty($settings['badge_text'])) : ?>
                        <div class="uas-hero-badge">
                            <span aria-hidden="true">★</span>
                            <span><?php echo esc_html($settings['badge_text']); ?></span>
                        </div>
                    <?php endif; ?>

                    <?php if ($has_title) : ?>
                        <<?php echo $title_tag; ?> id="<?php echo esc_attr($title_dom_id); ?>" class="uas-hero-title">
                            <?php echo esc_html($settings['hero_title']); ?>
                        </<?php echo $title_tag; ?>>
                    <?php endif; ?>

                    <?php if (!empty($settings['hero_desc'])) : ?>
                        <p class="uas-hero-desc"><?php echo esc_html($settings['hero_desc']); ?></p>
                    <?php endif; ?>

                    <?php if (!empty($settings['primary_btn_text']) || !empty($settings['secondary_btn_text'])) : ?>
                        <div class="uas-hero-actions">
                            <?php if (!empty($settings['primary_btn_text'])) : ?>
                                <a <?php echo $this->build_safe_link_attrs(
                                    'primary_btn_link',
                                    $settings['primary_btn_url'] ?? [],
                                    $settings['primary_btn_aria_label'] ?? '',
                                    '#contact'
                                ); ?> class="uas-btn-primary">
                                    <?php echo esc_html($settings['primary_btn_text']); ?>
                                </a>
                            <?php endif; ?>

                            <?php if (!empty($settings['secondary_btn_text'])) : ?>
                                <a <?php echo $this->build_safe_link_attrs(
                                    'secondary_btn_link',
                                    $settings['secondary_btn_url'] ?? [],
                                    $settings['secondary_btn_aria_label'] ?? '',
                                    '#services'
                                ); ?> class="uas-btn-secondary">
                                    <?php echo esc_html($settings['secondary_btn_text']); ?>
                                </a>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>

                <?php if ($show_media && !empty($img_url)) : ?>
                    <div class="uas-hero-media">
                        <?php
                        $used_wp_attachment = false;
                        if (
                            $img_id > 0
                            && function_exists('get_post_type')
                            && get_post_type($img_id) === 'attachment'
                            && class_exists('\Elementor\Group_Control_Image_Size')
                            && method_exists('\Elementor\Group_Control_Image_Size', 'get_attachment_image_html')
                        ) {
                            $attachment_html = Group_Control_Image_Size::get_attachment_image_html($settings, 'hero_image_size', 'hero_image');
                            if (!empty($attachment_html)) {
                                if (strpos($attachment_html, 'class="') !== false) {
                                    $attachment_html = str_replace('class="', 'class="uas-hero-img ', $attachment_html);
                                } else {
                                    $attachment_html = str_replace('<img ', '<img class="uas-hero-img" ', $attachment_html);
                                }
                                echo $attachment_html; // Elementor core sanitized attachment markup
                                $used_wp_attachment = true;
                            }
                        }

                        if (!$used_wp_attachment) :
                            ?>
                            <img
                                src="<?php echo esc_url($img_url); ?>"
                                alt="<?php echo esc_attr($alt_text); ?>"
                                class="uas-hero-img"
                                loading="eager"
                                decoding="async"
                            />
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            </div>
        </section>
        <?php
    }
}
