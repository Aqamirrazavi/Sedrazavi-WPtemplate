<?php
namespace UniversalElementorSuite;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Background;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Widget Base Class (MPCA Compliant)
 *
 * Abstract base class extending Elementor's Widget_Base with standardized,
 * reusable 3-tab controls (Content, Style, Advanced), responsive helpers,
 * query builders, and graceful fallback mechanisms.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
abstract class Universal_Widget_Base extends \Elementor\Widget_Base {

    /**
     * Get Widget Categories
     *
     * @return array
     */
    public function get_categories() {
        return [Plugin::CATEGORY_SLUG, 'sedrazavi-sovereign-suite'];
    }

    /**
     * Get Style Dependencies
     *
     * @return array
     */
    public function get_style_depends() {
        return ['uas-widgets-core'];
    }

    /**
     * Get Script Dependencies
     *
     * @return array
     */
    public function get_script_depends() {
        return ['uas-widgets-core'];
    }

    /**
     * Helper: Check if Elementor Pro is active
     *
     * @return bool
     */
    public function is_pro_active() {
        return defined('ELEMENTOR_PRO_VERSION');
    }

    /**
     * Helper: Register standard typography and color controls
     *
     * @param string $id_prefix
     * @param string $label
     * @param string $css_selector
     * @param string $default_color
     */
    protected function add_typography_and_color_controls($id_prefix, $label, $css_selector, $default_color = '#0f172a') {
        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'     => $id_prefix . '_typography',
                'label'    => sprintf(esc_html__('تایپوگرافی %s', 'universal-elementor-suite'), $label),
                'selector' => "{{WRAPPER}} {$css_selector}",
            ]
        );

        $this->add_control(
            $id_prefix . '_color',
            [
                'label'     => sprintf(esc_html__('رنگ %s', 'universal-elementor-suite'), $label),
                'type'      => Controls_Manager::COLOR,
                'default'   => $default_color,
                'selectors' => [
                    "{{WRAPPER}} {$css_selector}" => 'color: {{VALUE}};',
                ],
            ]
        );
    }

    /**
     * Helper: Register card / container style controls (Background, Border, Shadow, Padding, Radius)
     *
     * @param string $id_prefix
     * @param string $label
     * @param string $css_selector
     */
    protected function add_container_style_controls($id_prefix, $label, $css_selector) {
        $this->add_group_control(
            Group_Control_Background::get_type(),
            [
                'name'     => $id_prefix . '_bg',
                'label'    => sprintf(esc_html__('پس‌زمینه %s', 'universal-elementor-suite'), $label),
                'types'    => ['classic', 'gradient'],
                'selector' => "{{WRAPPER}} {$css_selector}",
            ]
        );

        $this->add_group_control(
            Group_Control_Border::get_type(),
            [
                'name'     => $id_prefix . '_border',
                'label'    => sprintf(esc_html__('کادر دور %s', 'universal-elementor-suite'), $label),
                'selector' => "{{WRAPPER}} {$css_selector}",
            ]
        );

        $this->add_control(
            $id_prefix . '_border_radius',
            [
                'label'      => sprintf(esc_html__('شعاع گوشه‌ها (Border Radius) %s', 'universal-elementor-suite'), $label),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%', 'rem'],
                'selectors'  => [
                    "{{WRAPPER}} {$css_selector}" => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name'     => $id_prefix . '_box_shadow',
                'label'    => sprintf(esc_html__('سایه باکس %s', 'universal-elementor-suite'), $label),
                'selector' => "{{WRAPPER}} {$css_selector}",
            ]
        );

        $this->add_responsive_control(
            $id_prefix . '_padding',
            [
                'label'      => sprintf(esc_html__('فاصله داخلی (Padding) %s', 'universal-elementor-suite'), $label),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em', '%'],
                'selectors'  => [
                    "{{WRAPPER}} {$css_selector}" => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );
    }

    /**
     * Helper: Register standard query builder controls for widgets that query posts/CPT
     *
     * @param string $cpt
     * @param int $default_posts
     */
    protected function add_standard_query_controls($cpt = 'post', $default_posts = 6) {
        $this->start_controls_section(
            'section_query_filter',
            [
                'label' => esc_html__('تنظیمات کوئری و منبع داده', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'query_posts_per_page',
            [
                'label'   => esc_html__('تعداد نمایش آیتم‌ها', 'universal-elementor-suite'),
                'type'    => Controls_Manager::NUMBER,
                'min'     => 1,
                'max'     => 50,
                'step'    => 1,
                'default' => $default_posts,
            ]
        );

        $this->add_control(
            'query_orderby',
            [
                'label'   => esc_html__('مرتب‌سازی بر اساس', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => 'date',
                'options' => [
                    'date'          => esc_html__('تاریخ انتشار', 'universal-elementor-suite'),
                    'title'         => esc_html__('عنوان الفبایی', 'universal-elementor-suite'),
                    'modified'      => esc_html__('آخرین به‌روزرسانی', 'universal-elementor-suite'),
                    'rand'          => esc_html__('تصادفی', 'universal-elementor-suite'),
                    'comment_count' => esc_html__('تعداد دیدگاه‌ها', 'universal-elementor-suite'),
                ],
            ]
        );

        $this->add_control(
            'query_order',
            [
                'label'   => esc_html__('ترتیب', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => 'DESC',
                'options' => [
                    'DESC' => esc_html__('نزولی (جدیدترین)', 'universal-elementor-suite'),
                    'ASC'  => esc_html__('صعودی (قدیمی‌ترین)', 'universal-elementor-suite'),
                ],
            ]
        );

        $this->end_controls_section();
    }

    /**
     * Helper: Register advanced dynamic query controls with CPT and taxonomy selection
     */
    protected function add_advanced_dynamic_query_controls() {
        $this->start_controls_section(
            'section_dynamic_query',
            [
                'label' => esc_html__('تنظیمات کوئری پویا و منبع محتوا (Dynamic Query)', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $post_types = class_exists('\UniversalElementorSuite\Dynamic_Query_Engine')
            ? Dynamic_Query_Engine::get_queryable_post_types()
            : ['post' => 'نوشته‌ها', 'page' => 'برگه‌ها'];

        $this->add_control(
            'query_post_type',
            [
                'label'   => esc_html__('نوع محتوا (Post Type)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => 'post',
                'options' => $post_types,
            ]
        );

        $this->add_control(
            'query_posts_per_page',
            [
                'label'   => esc_html__('تعداد نمایش در هر صفحه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::NUMBER,
                'min'     => 1,
                'max'     => 40,
                'step'    => 1,
                'default' => 6,
            ]
        );

        $this->add_control(
            'query_orderby',
            [
                'label'   => esc_html__('مرتب‌سازی بر اساس', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => 'date',
                'options' => [
                    'date'          => esc_html__('تاریخ انتشار', 'universal-elementor-suite'),
                    'title'         => esc_html__('عنوان الفبایی', 'universal-elementor-suite'),
                    'rand'          => esc_html__('تصادفی', 'universal-elementor-suite'),
                    'comment_count' => esc_html__('محبوب‌ترین (دیدگاه‌ها)', 'universal-elementor-suite'),
                ],
            ]
        );

        $this->add_control(
            'query_order',
            [
                'label'   => esc_html__('جهت مرتب‌سازی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => 'DESC',
                'options' => [
                    'DESC' => esc_html__('نزولی (جدیدترین)', 'universal-elementor-suite'),
                    'ASC'  => esc_html__('صعودی (قدیمی‌ترین)', 'universal-elementor-suite'),
                ],
            ]
        );

        $this->add_control(
            'query_cache_ttl',
            [
                'label'       => esc_html__('مدت زمان کش هوشمند (ثانیه)', 'universal-elementor-suite'),
                'type'        => Controls_Manager::NUMBER,
                'min'         => 0,
                'max'         => 86400,
                'step'        => 300,
                'default'     => 3600,
                'description' => esc_html__('جهت افزایش حداکثری سرعت و کاهش مراجعات دیتابیس. مقدار ۰ کش را غیرفعال می‌کند.', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();
    }
}

