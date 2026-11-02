<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal High-Converting Pricing & Plan Switcher Widget
 */
class Universal_Pricing_Switcher_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_pricing_switcher';
    }

    public function get_title() {
        return esc_html__('جدول قیمت‌گذاری هوشمند با سوییچر تخفیف', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-table';
    }

    public function get_style_depends() {
        return ['uas-widgets-core'];
    }

    protected function register_controls() {
        // --- CONTENT SECTION: GENERAL ---
        $this->start_controls_section(
            'section_general',
            [
                'label' => esc_html__('تنظیمات عمومی و سوییچر', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'section_badge',
            [
                'label'   => esc_html__('برچسب بالای بخش', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('تعرفه‌ها و اشتراک‌ها', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'section_title',
            [
                'label'   => esc_html__('تیتر بخش', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('پلن متناسب با کسب‌وکار خود را انتخاب کنید', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'monthly_label',
            [
                'label'   => esc_html__('عنوان پلن ماهانه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('پرداخت ماهانه', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'yearly_label',
            [
                'label'   => esc_html__('عنوان پلن سالانه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('پرداخت سالانه (۲۰٪ تخفیف)', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();

        // --- CONTENT SECTION: PLAN 1 ---
        $this->start_controls_section(
            'section_plan_1',
            [
                'label' => esc_html__('پلن اول (پایه)', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control('p1_name', ['label' => esc_html__('نام پلن', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'استارتاپ']);
        $this->add_control('p1_price_monthly', ['label' => esc_html__('قیمت ماهانه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => '۲۹۰,۰۰۰ تومان']);
        $this->add_control('p1_price_yearly', ['label' => esc_html__('قیمت سالانه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => '۲,۳۲۰,۰۰۰ تومان']);
        $this->add_control('p1_desc', ['label' => esc_html__('توضیح کوتاه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'مناسب فریلنسرها و شروع کسب‌وکارهای آنلاین نوپا']);
        $this->add_control('p1_features', ['label' => esc_html__('ویژگی‌ها (هر خط یک مورد)', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXTAREA, 'default' => "دسترسی به تمام الگوهای پایه\nبه‌روزرسانی خودکار ۶ ماهه\nپشتیبانی تیکتی استاندارد\nامکان اتصال به یک دامنه"]);
        $this->add_control('p1_btn_text', ['label' => esc_html__('متن دکمه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'شروع با پلن پایه']);
        $this->add_control('p1_btn_url', ['label' => esc_html__('لینک خرید', 'universal-elementor-suite'), 'type' => Controls_Manager::URL, 'default' => ['url' => '#plan1']]);
        $this->end_controls_section();

        // --- CONTENT SECTION: PLAN 2 (FEATURED) ---
        $this->start_controls_section(
            'section_plan_2',
            [
                'label' => esc_html__('پلن دوم (پیشنهادی / ویژه)', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control('p2_featured', ['label' => esc_html__('برجسته کردن این پلن', 'universal-elementor-suite'), 'type' => Controls_Manager::SWITCHER, 'default' => 'yes']);
        $this->add_control('p2_badge', ['label' => esc_html__('بج پلن ویژه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'محبوب‌ترین انتخاب']);
        $this->add_control('p2_name', ['label' => esc_html__('نام پلن', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'حرفه‌ای و سازمانی']);
        $this->add_control('p2_price_monthly', ['label' => esc_html__('قیمت ماهانه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => '۵۹۰,۰۰۰ تومان']);
        $this->add_control('p2_price_yearly', ['label' => esc_html__('قیمت سالانه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => '۴,۷۲۰,۰۰۰ تومان']);
        $this->add_control('p2_desc', ['label' => esc_html__('توضیح کوتاه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'ایده‌آل برای آژانس‌های فعال و وب‌سایت‌های پرترافیک']);
        $this->add_control('p2_features', ['label' => esc_html__('ویژگی‌ها (هر خط یک مورد)', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXTAREA, 'default' => "دسترسی نامحدود به ۲۱+ الگوی المنتور\nبه‌روزرسانی مادام‌العمر\nپشتیبانی اولویت‌دار ۲۴ ساعته\nنصب روی ۵ وب‌سایت مجزا\nابزارهای پیشرفته فرم و پاپ‌آپ"]);
        $this->add_control('p2_btn_text', ['label' => esc_html__('متن دکمه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'سفارش پلن حرفه‌ای']);
        $this->add_control('p2_btn_url', ['label' => esc_html__('لینک خرید', 'universal-elementor-suite'), 'type' => Controls_Manager::URL, 'default' => ['url' => '#plan2']]);
        $this->end_controls_section();

        // --- CONTENT SECTION: PLAN 3 ---
        $this->start_controls_section(
            'section_plan_3',
            [
                'label' => esc_html__('پلن سوم (کامل و اختصاصی)', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control('p3_name', ['label' => esc_html__('نام پلن', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'انترپرایز و توسعه نامحدود']);
        $this->add_control('p3_price_monthly', ['label' => esc_html__('قیمت ماهانه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => '۱,۲۰۰,۰۰۰ تومان']);
        $this->add_control('p3_price_yearly', ['label' => esc_html__('قیمت سالانه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => '۹,۶۰۰,۰۰۰ تومان']);
        $this->add_control('p3_desc', ['label' => esc_html__('توضیح کوتاه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXTAREA, 'default' => 'پاسخگوی تمام نیازهای شرکت‌ها و هولدینگ‌های بزرگ']);
        $this->add_control('p3_features', ['label' => esc_html__('ویژگی‌ها (هر خط یک مورد)', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXTAREA, 'default' => "لایسنس استفاده روی بی‌نهایت سایت\nسورس کد کامل و توسعه اختصاصی\nمشاور اختصاصی طراحی و سئو\nگارانتی ۱۰۰٪ بازگشت وجه\nاتصال مستقیم به API و وب‌هوک"]);
        $this->add_control('p3_btn_text', ['label' => esc_html__('متن دکمه', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'مشاوره و خرید پلن']);
        $this->add_control('p3_btn_url', ['label' => esc_html__('لینک خرید', 'universal-elementor-suite'), 'type' => Controls_Manager::URL, 'default' => ['url' => '#plan3']]);
        $this->end_controls_section();

        // --- STYLE SECTION ---
        $this->start_controls_section(
            'section_style_general',
            [
                'label' => esc_html__('استایل و رنگ‌بندی', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'primary_color',
            [
                'label'     => esc_html__('رنگ اصلی / بنفش تاکیدی', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#8B5CF6',
                'selectors' => [
                    '{{WRAPPER}} .uas-pricing-switch.active' => 'background: {{VALUE}};',
                    '{{WRAPPER}} .uas-plan-card.featured' => 'border-color: {{VALUE}};',
                    '{{WRAPPER}} .uas-plan-btn.featured' => 'background: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $widget_id = $this->get_id();
        ?>
        <div class="uas-pricing-wrapper" id="uas-pricing-<?php echo esc_attr($widget_id); ?>">
            <div class="uas-pricing-header" style="text-align:center; margin-bottom: 35px;">
                <?php if (!empty($settings['section_badge'])) : ?>
                    <span style="display:inline-block; padding: 6px 14px; background: rgba(139, 92, 246, 0.15); color: #a78bfa; border-radius: 9999px; font-size: 13px; font-weight: 600; margin-bottom: 12px;">
                        <?php echo esc_html($settings['section_badge']); ?>
                    </span>
                <?php endif; ?>

                <?php if (!empty($settings['section_title'])) : ?>
                    <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; margin: 0 0 20px;">
                        <?php echo esc_html($settings['section_title']); ?>
                    </h2>
                <?php endif; ?>

                <!-- Switcher Toggle -->
                <div class="uas-switcher-container" style="display:inline-flex; align-items:center; background:#f1f5f9; padding:5px; border-radius:12px; gap:6px;">
                    <button type="button" class="uas-switch-btn active" data-period="monthly" onclick="uasTogglePeriod('<?php echo esc_attr($widget_id); ?>', 'monthly', this)" style="border:0; padding:8px 18px; border-radius:8px; font-weight:600; font-size:14px; cursor:pointer; background:#fff; color:#0f172a; box-shadow:0 2px 4px rgba(0,0,0,0.06); transition: all 0.2s;">
                        <?php echo esc_html($settings['monthly_label']); ?>
                    </button>
                    <button type="button" class="uas-switch-btn" data-period="yearly" onclick="uasTogglePeriod('<?php echo esc_attr($widget_id); ?>', 'yearly', this)" style="border:0; padding:8px 18px; border-radius:8px; font-weight:600; font-size:14px; cursor:pointer; background:transparent; color:#64748b; transition: all 0.2s;">
                        <?php echo esc_html($settings['yearly_label']); ?>
                    </button>
                </div>
            </div>

            <!-- Pricing Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; align-items: stretch;">
                
                <!-- Plan 1 -->
                <div class="uas-plan-card" style="background:#fff; border:1px solid #e2e8f0; border-radius:20px; padding:32px 24px; display:flex; flex-direction:column; justify-content:space-between; position:relative;">
                    <div>
                        <h3 style="font-size:20px; font-weight:700; color:#0f172a; margin:0 0 8px;"><?php echo esc_html($settings['p1_name']); ?></h3>
                        <p style="color:#64748b; font-size:13px; margin:0 0 20px; line-height:1.7;"><?php echo esc_html($settings['p1_desc']); ?></p>
                        <div class="uas-price-box" style="margin-bottom:24px;">
                            <span class="uas-price-monthly" style="font-size:28px; font-weight:800; color:#0f172a;"><?php echo esc_html($settings['p1_price_monthly']); ?></span>
                            <span class="uas-price-yearly" style="font-size:28px; font-weight:800; color:#0f172a; display:none;"><?php echo esc_html($settings['p1_price_yearly']); ?></span>
                        </div>
                        <ul style="list-style:none; padding:0; margin:0 0 28px;">
                            <?php foreach (explode("\n", (string)$settings['p1_features']) as $feat) : if (trim($feat)) : ?>
                                <li style="display:flex; align-items:center; gap:8px; font-size:14px; color:#334155; margin-bottom:10px;">
                                    <span style="color:#10b981; font-weight:bold;">✓</span> <?php echo esc_html(trim($feat)); ?>
                                </li>
                            <?php endif; endforeach; ?>
                        </ul>
                    </div>
                    <a href="<?php echo esc_url($settings['p1_btn_url']['url']); ?>" style="display:block; text-align:center; padding:12px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; color:#0f172a; font-weight:700; text-decoration:none; transition:all 0.2s;">
                        <?php echo esc_html($settings['p1_btn_text']); ?>
                    </a>
                </div>

                <!-- Plan 2 (Featured) -->
                <div class="uas-plan-card featured" style="background:#fff; border:2px solid #8b5cf6; border-radius:20px; padding:32px 24px; display:flex; flex-direction:column; justify-content:space-between; position:relative; box-shadow:0 12px 30px rgba(139,92,246,0.12);">
                    <?php if (!empty($settings['p2_badge'])) : ?>
                        <div style="position:absolute; top:-14px; right:50%; transform:translateX(50%); background:#8b5cf6; color:#fff; font-size:12px; font-weight:700; padding:4px 14px; border-radius:9999px;">
                            <?php echo esc_html($settings['p2_badge']); ?>
                        </div>
                    <?php endif; ?>
                    <div>
                        <h3 style="font-size:20px; font-weight:700; color:#0f172a; margin:0 0 8px;"><?php echo esc_html($settings['p2_name']); ?></h3>
                        <p style="color:#64748b; font-size:13px; margin:0 0 20px; line-height:1.7;"><?php echo esc_html($settings['p2_desc']); ?></p>
                        <div class="uas-price-box" style="margin-bottom:24px;">
                            <span class="uas-price-monthly" style="font-size:28px; font-weight:800; color:#8b5cf6;"><?php echo esc_html($settings['p2_price_monthly']); ?></span>
                            <span class="uas-price-yearly" style="font-size:28px; font-weight:800; color:#8b5cf6; display:none;"><?php echo esc_html($settings['p2_price_yearly']); ?></span>
                        </div>
                        <ul style="list-style:none; padding:0; margin:0 0 28px;">
                            <?php foreach (explode("\n", (string)$settings['p2_features']) as $feat) : if (trim($feat)) : ?>
                                <li style="display:flex; align-items:center; gap:8px; font-size:14px; color:#334155; margin-bottom:10px;">
                                    <span style="color:#8b5cf6; font-weight:bold;">✓</span> <?php echo esc_html(trim($feat)); ?>
                                </li>
                            <?php endif; endforeach; ?>
                        </ul>
                    </div>
                    <a href="<?php echo esc_url($settings['p2_btn_url']['url']); ?>" style="display:block; text-align:center; padding:12px; background:#8b5cf6; color:#fff; border-radius:10px; font-weight:700; text-decoration:none; box-shadow:0 4px 12px rgba(139,92,246,0.25);">
                        <?php echo esc_html($settings['p2_btn_text']); ?>
                    </a>
                </div>

                <!-- Plan 3 -->
                <div class="uas-plan-card" style="background:#fff; border:1px solid #e2e8f0; border-radius:20px; padding:32px 24px; display:flex; flex-direction:column; justify-content:space-between; position:relative;">
                    <div>
                        <h3 style="font-size:20px; font-weight:700; color:#0f172a; margin:0 0 8px;"><?php echo esc_html($settings['p3_name']); ?></h3>
                        <p style="color:#64748b; font-size:13px; margin:0 0 20px; line-height:1.7;"><?php echo esc_html($settings['p3_desc']); ?></p>
                        <div class="uas-price-box" style="margin-bottom:24px;">
                            <span class="uas-price-monthly" style="font-size:28px; font-weight:800; color:#0f172a;"><?php echo esc_html($settings['p3_price_monthly']); ?></span>
                            <span class="uas-price-yearly" style="font-size:28px; font-weight:800; color:#0f172a; display:none;"><?php echo esc_html($settings['p3_price_yearly']); ?></span>
                        </div>
                        <ul style="list-style:none; padding:0; margin:0 0 28px;">
                            <?php foreach (explode("\n", (string)$settings['p3_features']) as $feat) : if (trim($feat)) : ?>
                                <li style="display:flex; align-items:center; gap:8px; font-size:14px; color:#334155; margin-bottom:10px;">
                                    <span style="color:#10b981; font-weight:bold;">✓</span> <?php echo esc_html(trim($feat)); ?>
                                </li>
                            <?php endif; endforeach; ?>
                        </ul>
                    </div>
                    <a href="<?php echo esc_url($settings['p3_btn_url']['url']); ?>" style="display:block; text-align:center; padding:12px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; color:#0f172a; font-weight:700; text-decoration:none;">
                        <?php echo esc_html($settings['p3_btn_text']); ?>
                    </a>
                </div>

            </div>
        </div>

        <script>
        function uasTogglePeriod(widgetId, period, btn) {
            var wrapper = document.getElementById('uas-pricing-' + widgetId);
            if (!wrapper) return;
            var buttons = wrapper.querySelectorAll('.uas-switch-btn');
            buttons.forEach(function(b) {
                b.style.background = 'transparent';
                b.style.color = '#64748b';
                b.style.boxShadow = 'none';
            });
            btn.style.background = '#fff';
            btn.style.color = '#0f172a';
            btn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.06)';

            var monthlies = wrapper.querySelectorAll('.uas-price-monthly');
            var yearlies = wrapper.querySelectorAll('.uas-price-yearly');

            if (period === 'yearly') {
                monthlies.forEach(function(el){ el.style.display = 'none'; });
                yearlies.forEach(function(el){ el.style.display = 'inline-block'; });
            } else {
                monthlies.forEach(function(el){ el.style.display = 'inline-block'; });
                yearlies.forEach(function(el){ el.style.display = 'none'; });
            }
        }
        </script>
        <?php
    }
}
