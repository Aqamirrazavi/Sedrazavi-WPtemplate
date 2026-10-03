<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal FAQ Accordion Widget with Optional Schema.org
 */
class Universal_Faq_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_faq';
    }

    public function get_title() {
        return esc_html__('آکاردئون پرسش‌های متداول هوشمند', 'universal-elementor-suite');
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
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('پرسش و پاسخ‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'enable_schema',
            [
                'label'       => esc_html__('تولید اسکیما ساختاریافته گوگل (FAQPage Schema)', 'universal-elementor-suite'),
                'type'        => Controls_Manager::SWITCHER,
                'default'     => 'yes',
                'description' => esc_html__('بهبود سئو با نمایش سوالات در نتایج Rich Results موتورهای جستجو.', 'universal-elementor-suite'),
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'question',
            [
                'label'       => esc_html__('پرسش', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('مدت زمان ارزیابی اولیه و تدوین طرح پیشنهادی چقدر است؟', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'answer',
            [
                'label'   => esc_html__('پاسخ جامع', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('فرآیند ارزیابی اولیه، بررسی دقیق نیازمندی‌ها و ارائه طرح فنی و مالی معمولاً ظرف ۲ الی ۴ روز کاری انجام می‌پذیرد.', 'universal-elementor-suite'),
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
                ],
                'title_field' => '{{{ question }}}',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $schema_items = [];
        ?>
        <div class="uas-faq-wrapper uas-widget-container" dir="rtl">
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
