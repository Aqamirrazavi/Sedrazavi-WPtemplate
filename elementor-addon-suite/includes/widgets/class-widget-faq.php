<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal High-Converting FAQ Accordion Widget (MPCA Compliant)
 *
 * Smart accordion with Google Schema.org FAQPage structured data injection,
 * instant live search filter, and comprehensive 3-tab native Elementor sidebar controls.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Universal_Faq_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_faq';
    }

    public function get_title() {
        return esc_html__('آکاردئون هوشمند پرسش و پاسخ با اسکیما گوگل', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-help-o';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-faq-css'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core', 'uas-faq-js'];
    }

    protected function register_controls() {
        // --- 1. TAB_CONTENT: General & Schema ---
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات پرسش و پاسخ‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'enable_schema',
            [
                'label'       => esc_html__('تولید اسکیما ساختاریافته گوگل (FAQPage Schema)', 'universal-elementor-suite'),
                'type'        => Controls_Manager::SWITCHER,
                'default'     => 'yes',
                'description' => esc_html__('نمایش پرسش‌ها در نتایج غنی (Rich Snippets) جستجوی گوگل جهت افزایش CTR.', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'enable_search',
            [
                'label'       => esc_html__('فعال‌سازی فیلتر و جستجوی لحظه‌ای سوالات', 'universal-elementor-suite'),
                'type'        => Controls_Manager::SWITCHER,
                'default'     => 'yes',
            ]
        );

        $this->add_control(
            'search_placeholder',
            [
                'label'     => esc_html__('متن پیش‌فرض کادر جستجو', 'universal-elementor-suite'),
                'type'      => Controls_Manager::TEXT,
                'default'   => esc_html__('جستجو میان سوالات متداول...', 'universal-elementor-suite'),
                'condition' => ['enable_search' => 'yes'],
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'question',
            [
                'label'       => esc_html__('پرسش', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('فرآیند استقرار و اجرای پروژه‌ها به چه صورت است؟', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'answer',
            [
                'label'   => esc_html__('پاسخ جامع', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('پس از عقد قرارداد و نیازسنجی، معماری سیستم بر پایه الگوهای ماژولار و امن وردپرس ظرف کمترین زمان اجرایی می‌گردد.', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'faqs_list',
            [
                'label'       => esc_html__('لیست سوالات', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'question' => esc_html__('مدت زمان ارزیابی اولیه و تدوین طرح پیشنهادی چقدر است؟', 'universal-elementor-suite'),
                        'answer'   => esc_html__('فرآیند ارزیابی اولیه، بررسی دقیق نیازمندی‌ها و ارائه طرح فنی و مالی معمولاً ظرف ۲ الی ۴ روز کاری انجام می‌پذیرد.', 'universal-elementor-suite'),
                    ],
                    [
                        'question' => esc_html__('آیا امکان یکپارچه‌سازی سامانه‌ها با زیرساخت‌های فعلی سازمان وجود دارد؟', 'universal-elementor-suite'),
                        'answer'   => esc_html__('بله، تمامی معماری‌ها بر پایه استانداردهای مدرن RESTful API و اتصالات ماژولار طراحی شده‌اند و به سادگی با نرم‌افزارهای قبلی هماهنگ می‌گردند.', 'universal-elementor-suite'),
                    ],
                    [
                        'question' => esc_html__('پشتیبانی فنی و نگهداری دوره‌ای پس از تحویل پروژه به چه صورت است؟', 'universal-elementor-suite'),
                        'answer'   => esc_html__('تمامی پروژه‌ها همراه با ۶ ماه پشتیبانی جامع رایگان، مانیتورینگ آنلاین ۲۴/۷ و بسته‌های تکمیلی نگهداری سالانه ارائه می‌شوند.', 'universal-elementor-suite'),
                    ],
                    [
                        'question' => esc_html__('آیا قابلیت‌ها و ویجت‌ها به صورت مستقل روی سایر سایت‌ها قابل نصب هستند؟', 'universal-elementor-suite'),
                        'answer'   => esc_html__('بله، به لطف معماری ماژولار MPCA، هر بسته و ویجت به صورت یک فایل مستقل ZIP قابل استخراج و نصب در هر وردپرس دیگری است.', 'universal-elementor-suite'),
                    ],
                ],
                'title_field' => '{{{ question }}}',
            ]
        );

        $this->end_controls_section();

        // --- 2. TAB_STYLE: Question Title Style ---
        $this->start_controls_section(
            'section_style_questions',
            [
                'label' => esc_html__('استایل سوالات و تیترها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_typography_and_color_controls('faq_q', esc_html__('پرسش', 'universal-elementor-suite'), '.uas-faq-question span', '#0F172A');

        $this->add_control(
            'faq_q_hover_color',
            [
                'label'     => esc_html__('رنگ پرسش در حالت باز یا هاور', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#4F46E5',
                'selectors' => [
                    '{{WRAPPER}} .uas-faq-item.is-active .uas-faq-question span' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .uas-faq-question:hover span' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();

        // --- 3. TAB_STYLE: Answer Text Style ---
        $this->start_controls_section(
            'section_style_answers',
            [
                'label' => esc_html__('استایل پاسخ‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_typography_and_color_controls('faq_a', esc_html__('متن پاسخ', 'universal-elementor-suite'), '.uas-faq-answer p', '#475569');

        $this->end_controls_section();

        // --- 4. TAB_STYLE: Accordion Box Container ---
        $this->start_controls_section(
            'section_style_boxes',
            [
                'label' => esc_html__('استایل آیتم‌ها و کادرها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_container_style_controls('faq_item', esc_html__('آیتم آکاردئون', 'universal-elementor-suite'), '.uas-faq-item');

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $schema_items = [];
        ?>
        <div class="uas-faq-wrapper uas-widget-container" dir="rtl">
            <?php if ($settings['enable_search'] === 'yes') : ?>
                <div class="uas-faq-search-box">
                    <input type="text" class="uas-faq-search-input" placeholder="<?php echo esc_attr($settings['search_placeholder']); ?>" />
                </div>
            <?php endif; ?>

            <div class="uas-faq-list">
                <?php foreach ($settings['faqs_list'] as $idx => $item) :
                    if ($settings['enable_schema'] === 'yes') {
                        $schema_items[] = [
                            '@type'          => 'Question',
                            'name'           => $item['question'],
                            'acceptedAnswer' => [
                                '@type' => 'Answer',
                                'text'  => $item['answer'],
                            ],
                        ];
                    }
                    $is_first = ($idx === 0);
                ?>
                    <div class="uas-faq-item <?php echo $is_first ? 'is-active' : ''; ?>">
                        <button type="button" class="uas-faq-question" aria-expanded="<?php echo $is_first ? 'true' : 'false'; ?>">
                            <span><?php echo esc_html($item['question']); ?></span>
                            <span class="uas-faq-icon">+</span>
                        </button>
                        <div class="uas-faq-answer">
                            <p><?php echo esc_html($item['answer']); ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <?php if ($settings['enable_schema'] === 'yes' && !empty($schema_items)) : ?>
            <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": <?php echo json_encode($schema_items, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>
            }
            </script>
        <?php endif; ?>
        <?php
    }
}
