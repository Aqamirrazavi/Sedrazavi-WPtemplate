<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Feature Comparison Matrix Table Widget (MPCA Compliant)
 *
 * Multi-tier feature comparison table with checkmarks, tooltips, category grouping,
 * featured column highlighting, and comprehensive 3-tab native Elementor sidebar controls.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Universal_Pricing_Comparison_Matrix_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_pricing_matrix';
    }

    public function get_title() {
        return esc_html__('جدول ماتریس مقایسه دقیق ویژگی‌ها و پلن‌ها', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-table';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-pricing-matrix-css'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core', 'uas-pricing-matrix-js'];
    }

    protected function register_controls() {
        // --- 1. TAB_CONTENT: Plans Setup ---
        $this->start_controls_section(
            'section_plans',
            [
                'label' => esc_html__('اطلاعات ستون‌ها و پلن‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        // Plan 1
        $this->add_control('plan1_name', ['label' => esc_html__('نام پلن ۱', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'استارتاپ']);
        $this->add_control('plan1_price', ['label' => esc_html__('قیمت پلن ۱', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => '۲۹۰,۰۰۰ تومان']);
        $this->add_control('plan1_btn_text', ['label' => esc_html__('متن دکمه پلن ۱', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'انتخاب پلن']);
        $this->add_control('plan1_btn_url', ['label' => esc_html__('لینک دکمه پلن ۱', 'universal-elementor-suite'), 'type' => Controls_Manager::URL, 'default' => ['url' => '#p1']]);

        // Plan 2 (Featured)
        $this->add_control('plan2_name', ['label' => esc_html__('نام پلن ۲ (پیشنهادی)', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'حرفه‌ای و سازمانی']);
        $this->add_control('plan2_badge', ['label' => esc_html__('برچسب پلن ۲', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'محبوب‌ترین']);
        $this->add_control('plan2_price', ['label' => esc_html__('قیمت پلن ۲', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => '۷۹۰,۰۰۰ تومان']);
        $this->add_control('plan2_btn_text', ['label' => esc_html__('متن دکمه پلن ۲', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'شروع با پلن محبوب']);
        $this->add_control('plan2_btn_url', ['label' => esc_html__('لینک دکمه پلن ۲', 'universal-elementor-suite'), 'type' => Controls_Manager::URL, 'default' => ['url' => '#p2']]);

        // Plan 3
        $this->add_control('plan3_name', ['label' => esc_html__('نام پلن ۳', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'انترپرایز و مقیاس‌پذیر']);
        $this->add_control('plan3_price', ['label' => esc_html__('قیمت پلن ۳', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => '۱,۸۵۰,۰۰۰ تومان']);
        $this->add_control('plan3_btn_text', ['label' => esc_html__('متن دکمه پلن ۳', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'مشاوره سازمانی']);
        $this->add_control('plan3_btn_url', ['label' => esc_html__('لینک دکمه پلن ۳', 'universal-elementor-suite'), 'type' => Controls_Manager::URL, 'default' => ['url' => '#p3']]);

        $this->end_controls_section();

        // --- 2. TAB_CONTENT: Features Rows Repeater ---
        $this->start_controls_section(
            'section_features',
            [
                'label' => esc_html__('سطرهای ماتریس ویژگی‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'is_category',
            [
                'label'       => esc_html__('ردیف تفکیک دسته‌بندی (Header Row)', 'universal-elementor-suite'),
                'type'        => Controls_Manager::SWITCHER,
                'default'     => 'no',
            ]
        );

        $repeater->add_control(
            'feature_title',
            [
                'label'       => esc_html__('عنوان ویژگی یا سرفصل', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('تعداد کاربران مجاز', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'tooltip_desc',
            [
                'label'       => esc_html__('توضیح پاپ‌آپ (Tooltip)', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => '',
                'condition'   => ['is_category' => 'no'],
            ]
        );

        $repeater->add_control(
            'p1_val',
            [
                'label'     => esc_html__('مقدار در پلن ۱ (بله، خیر، یا متن)', 'universal-elementor-suite'),
                'type'      => Controls_Manager::TEXT,
                'default'   => 'yes',
                'condition' => ['is_category' => 'no'],
            ]
        );

        $repeater->add_control(
            'p2_val',
            [
                'label'     => esc_html__('مقدار در پلن ۲', 'universal-elementor-suite'),
                'type'      => Controls_Manager::TEXT,
                'default'   => 'yes',
                'condition' => ['is_category' => 'no'],
            ]
        );

        $repeater->add_control(
            'p3_val',
            [
                'label'     => esc_html__('مقدار در پلن ۳', 'universal-elementor-suite'),
                'type'      => Controls_Manager::TEXT,
                'default'   => 'نامحدود',
                'condition' => ['is_category' => 'no'],
            ]
        );

        $this->add_control(
            'matrix_rows',
            [
                'label'       => esc_html__('لیست ویژگی‌ها', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'is_category'   => 'yes',
                        'feature_title' => 'زیرساخت و امنیت پایه',
                    ],
                    [
                        'is_category'   => 'no',
                        'feature_title' => 'گواهینامه SSL اختصاصی و Zero-CDN',
                        'tooltip_desc'  => 'بارگذاری سریع بدون وابستگی به سرورهای خارجی',
                        'p1_val'        => 'yes',
                        'p2_val'        => 'yes',
                        'p3_val'        => 'yes',
                    ],
                    [
                        'is_category'   => 'no',
                        'feature_title' => 'سیستم پشتیبان‌گیری خودکار',
                        'p1_val'        => 'هفتگی',
                        'p2_val'        => 'روزانه',
                        'p3_val'        => 'لحظه‌ای و ابری',
                    ],
                    [
                        'is_category'   => 'yes',
                        'feature_title' => 'امکانات فروش و بازاریابی',
                    ],
                    [
                        'is_category'   => 'no',
                        'feature_title' => 'اتصال درگاه پرداخت و سوییچر تخفیف',
                        'p1_val'        => 'yes',
                        'p2_val'        => 'yes',
                        'p3_val'        => 'yes',
                    ],
                    [
                        'is_category'   => 'no',
                        'feature_title' => 'اتوماسیون پیامکی و نوتیفیکیشن اختصاصی',
                        'p1_val'        => 'no',
                        'p2_val'        => 'yes',
                        'p3_val'        => 'yes',
                    ],
                    [
                        'is_category'   => 'no',
                        'feature_title' => 'پشتیبانی تلفنی و مدیر حساب اختصاصی',
                        'p1_val'        => 'no',
                        'p2_val'        => 'no',
                        'p3_val'        => 'yes',
                    ],
                ],
                'title_field' => '{{{ is_category == "yes" ? "📁 " + feature_title : "✓ " + feature_title }}}',
            ]
        );

        $this->end_controls_section();

        // --- 3. TAB_STYLE: Header and Matrix Styling ---
        $this->start_controls_section(
            'section_style_table',
            [
                'label' => esc_html__('استایل جدول و رنگ‌بندی', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'featured_highlight_color',
            [
                'label'     => esc_html__('رنگ برجسته‌سازی پلن ویژه', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#6366F1',
                'selectors' => [
                    '{{WRAPPER}} .uas-matrix-col-featured' => '--uas-featured-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_typography_and_color_controls('matrix_heading', esc_html__('تیتر ویژگی‌ها', 'universal-elementor-suite'), '.uas-matrix-feature-name', '#0F172A');
        $this->add_container_style_controls('matrix_table', esc_html__('باکس کل ماتریس', 'universal-elementor-suite'), '.uas-matrix-table-wrap');

        $this->end_controls_section();
    }

    private function render_value_cell($val) {
        $val_trim = trim(strtolower($val));
        if ($val_trim === 'yes' || $val_trim === 'true' || $val_trim === 'بله') {
            return '<span class="uas-matrix-icon uas-check">✓</span>';
        } elseif ($val_trim === 'no' || $val_trim === 'false' || $val_trim === 'خیر') {
            return '<span class="uas-matrix-icon uas-cross">✕</span>';
        }
        return '<span class="uas-matrix-text-val">' . esc_html($val) . '</span>';
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-pricing-matrix-container uas-widget-container" dir="rtl">
            <div class="uas-matrix-table-wrap">
                <table class="uas-matrix-table">
                    <thead>
                        <tr>
                            <th class="uas-matrix-th-features">
                                <span class="uas-th-title"><?php esc_html_e('مقایسه امکانات', 'universal-elementor-suite'); ?></span>
                            </th>
                            <th class="uas-matrix-th-plan">
                                <div class="uas-plan-head">
                                    <h4><?php echo esc_html($settings['plan1_name']); ?></h4>
                                    <div class="uas-plan-price"><?php echo esc_html($settings['plan1_price']); ?></div>
                                    <a href="<?php echo esc_url($settings['plan1_btn_url']['url'] ?? '#'); ?>" class="uas-matrix-btn"><?php echo esc_html($settings['plan1_btn_text']); ?></a>
                                </div>
                            </th>
                            <th class="uas-matrix-th-plan uas-matrix-col-featured">
                                <div class="uas-plan-head">
                                    <?php if (!empty($settings['plan2_badge'])) : ?>
                                        <span class="uas-featured-badge"><?php echo esc_html($settings['plan2_badge']); ?></span>
                                    <?php endif; ?>
                                    <h4><?php echo esc_html($settings['plan2_name']); ?></h4>
                                    <div class="uas-plan-price"><?php echo esc_html($settings['plan2_price']); ?></div>
                                    <a href="<?php echo esc_url($settings['plan2_btn_url']['url'] ?? '#'); ?>" class="uas-matrix-btn uas-btn-featured"><?php echo esc_html($settings['plan2_btn_text']); ?></a>
                                </div>
                            </th>
                            <th class="uas-matrix-th-plan">
                                <div class="uas-plan-head">
                                    <h4><?php echo esc_html($settings['plan3_name']); ?></h4>
                                    <div class="uas-plan-price"><?php echo esc_html($settings['plan3_price']); ?></div>
                                    <a href="<?php echo esc_url($settings['plan3_btn_url']['url'] ?? '#'); ?>" class="uas-matrix-btn"><?php echo esc_html($settings['plan3_btn_text']); ?></a>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($settings['matrix_rows'] as $row) : 
                            if ($row['is_category'] === 'yes') : ?>
                                <tr class="uas-matrix-cat-row">
                                    <td colspan="4"><?php echo esc_html($row['feature_title']); ?></td>
                                </tr>
                            <?php else : ?>
                                <tr class="uas-matrix-feature-row">
                                    <td class="uas-matrix-feature-cell">
                                        <span class="uas-matrix-feature-name"><?php echo esc_html($row['feature_title']); ?></span>
                                        <?php if (!empty($row['tooltip_desc'])) : ?>
                                            <span class="uas-matrix-tooltip" title="<?php echo esc_attr($row['tooltip_desc']); ?>">ℹ</span>
                                        <?php endif; ?>
                                    </td>
                                    <td class="uas-matrix-val-cell"><?php echo $this->render_value_cell($row['p1_val'] ?? ''); ?></td>
                                    <td class="uas-matrix-val-cell uas-matrix-col-featured"><?php echo $this->render_value_cell($row['p2_val'] ?? ''); ?></td>
                                    <td class="uas-matrix-val-cell"><?php echo $this->render_value_cell($row['p3_val'] ?? ''); ?></td>
                                </tr>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <?php
    }
}
