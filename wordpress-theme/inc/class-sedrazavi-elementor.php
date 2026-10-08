<?php
/**
 * SedRazavi Elementor Widgets Integration
 * Compatible with Elementor 3.5+ up to latest 3.25+
 *
 * @package SedRazavi
 * @version 3.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!class_exists('SedRazavi_Elementor_Widgets_Manager')) {
class SedRazavi_Elementor_Widgets_Manager {

    public static function init() {
        add_action('elementor/elements/categories_registered', [__CLASS__, 'register_category']);
        add_action('elementor/widgets/register', [__CLASS__, 'register_widgets']);
        add_action('elementor/theme/register_locations', [__CLASS__, 'register_locations']);
    }

    public static function register_locations($elementor_theme_manager) {
        $elementor_theme_manager->register_location('header');
        $elementor_theme_manager->register_location('footer');
        $elementor_theme_manager->register_location('single');
        $elementor_theme_manager->register_location('archive');
    }

    public static function register_category($elements_manager) {
        $elements_manager->add_category(
            'sedrazavi-category',
            [
                'title' => esc_html__('المان‌های تخصصی وکالت و حقوقی (SedRazavi)', 'sedrazavi'),
                'icon'  => 'eicon-gavel',
            ]
        );
    }

    public static function register_widgets($widgets_manager) {
        if (!class_exists('\Elementor\Widget_Base')) {
            return;
        }

        // 1. Universal Legal Suite & Component Widget
        if (class_exists('SedRazavi_Elementor_Legal_Suite_Widget')) {
            $widgets_manager->register(new SedRazavi_Elementor_Legal_Suite_Widget());
        }
    }
}

SedRazavi_Elementor_Widgets_Manager::init();
}

/**
 * Universal Legal Suite Widget for Elementor
 */
if (did_action('elementor/loaded') && class_exists('\Elementor\Widget_Base') && !class_exists('SedRazavi_Elementor_Legal_Suite_Widget')) {
class SedRazavi_Elementor_Legal_Suite_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'sedrazavi_legal_suite';
    }

    public function get_title() {
        return esc_html__('سامانه و ماژول‌های حقوقی تخصصی (Legal Suites)', 'sedrazavi');
    }

    public function get_icon() {
        return 'eicon-apps';
    }

    public function get_categories() {
        return ['sedrazavi-category', 'general'];
    }

    public function get_keywords() {
        return ['legal', 'lawyer', 'court', 'calculator', 'arbitration', 'contract', 'وکالت', 'حقوقی', 'دادگاه'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('انتخاب سامانه یا ابزار حقوقی', 'sedrazavi'),
            ]
        );

        $this->add_control(
            'suite_name',
            [
                'label'   => esc_html__('ماژول حقوقی', 'sedrazavi'),
                'type'    => \Elementor\Controls_Manager::SELECT,
                'default' => 'ContractAuditAnalyzer',
                'options' => [
                    'ContractAuditAnalyzer'            => 'ممیزی هوشمند قراردادها (Contract Audit)',
                    'PetitionGeneratorModal'           => 'تنظیم هوشمند دادخواست و لوایح (Petition Generator)',
                    'VirtualHearingRoom'               => 'تالار دادگاه مجازی و دادرسی (Virtual Courtroom)',
                    'CourtFeeCalculator'               => 'محاسبه‌گر هزینه دادرسی و تمبر وکالت (Fee Calculator)',
                    'LegalFinancialSuite'              => 'میز محاسبات جامع قضایی (Judicial Calculators)',
                    'LegalOdrSuite'                    => 'سامانه داوری آنلاین ODR (Arbitration Portal)',
                    'LegalIntelligenceSuite'           => 'مرکز هوش حقوقی و داده‌کاوی قضایی (Legal Intelligence)',
                    'LegalStrategySuite'               => 'مدیریت استراتژی دعاوی و بحران (Legal Strategy)',
                    'CorporateInternationalSuite'      => 'دعاوی تجاری و بین‌المللی (Corporate International)',
                    'IntellectualPropertySuite'        => 'مالکیت فکری و برند (Intellectual Property)',
                    'CyberForensicsSuite'              => 'جرایم سایبری و فارنزیک (Cyber Forensics)',
                    'FinancialComplianceSuite'         => 'مبارزه با پولشویی و تطبیق مقررات (AML Compliance)',
                    'RealEstateConstructionSuite'      => 'دعاوی ملکی و سرقفلی (Real Estate & Construction)',
                    'FamilyInheritanceSuite'           => 'حقوق خانواده و انحصار وراثت (Family & Inheritance)',
                    'TaxDisputesMoadianSuite'          => 'دعاوی مالیاتی و مودیان (Tax Disputes)',
                    'AdministrativeJusticeSuite'       => 'دیوان عدالت اداری (Administrative Justice)',
                    'CommercialArbitrationSuite'       => 'داوری اختلافات بازرگانی (Commercial Arbitration)',
                    'SupremeCourtAppealsSuite'         => 'دیوان عالی کشور و اعاده دادرسی (Supreme Court Appeals)',
                    'GovernmentTendersGuaranteesSuite' => 'مناقصات و ضمانت‌نامه‌ها (Government Tenders)',
                    'LawyerDashboard'                  => 'پیشخوان جامع وکالت و پرونده‌ها (Lawyer Dashboard)',
                    'ClientPortalView'                 => 'کارتابل محرمانه موکل (Client Portal)',
                    'CaseProgressTracker'              => 'پیگیری هوشمند پرونده (Case Progress Tracker)',
                    'EmailOtpMagicLogin'               => 'ورود ایمن با رمز یکبارمصرف OTP (Secure Auth)',
                ],
            ]
        );

        $this->add_control(
            'display_title',
            [
                'label'       => esc_html__('عنوان دلخواه نمایشی', 'sedrazavi'),
                'type'        => \Elementor\Controls_Manager::TEXT,
                'placeholder' => esc_html__('عنوان بالای ماژول (اختیاری)', 'sedrazavi'),
            ]
        );

        $this->add_control(
            'card_theme',
            [
                'label'   => esc_html__('پوسته و پس‌زمینه کارت', 'sedrazavi'),
                'type'    => \Elementor\Controls_Manager::SELECT,
                'default' => 'dark_navy',
                'options' => [
                    'dark_navy'  => esc_html__('سرمه‌ای متالیک رسمی (Navy & Gold)', 'sedrazavi'),
                    'pure_white' => esc_html__('سفید و مینیمال (Modern Light)', 'sedrazavi'),
                    'transparent'=> esc_html__('شفاف بدون کادر (Transparent)', 'sedrazavi'),
                ],
            ]
        );

        $this->end_controls_section();

        // Style Tab
        $this->start_controls_section(
            'section_style',
            [
                'label' => esc_html__('استایل و چیدمان', 'sedrazavi'),
                'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'border_radius',
            [
                'label'      => esc_html__('گردی لبه‌ها (Border Radius)', 'sedrazavi'),
                'type'       => \Elementor\Controls_Manager::SLIDER,
                'size_units' => ['px', 'rem'],
                'range'      => ['px' => ['min' => 0, 'max' => 40, 'step' => 2]],
                'default'    => ['unit' => 'px', 'size' => 24],
                'selectors'  => [
                    '{{WRAPPER}} .sedrazavi-elementor-suite-container' => 'border-radius: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $suite    = !empty($settings['suite_name']) ? sanitize_text_field($settings['suite_name']) : 'ContractAuditAnalyzer';
        $title    = !empty($settings['display_title']) ? esc_html($settings['display_title']) : '';
        $theme    = !empty($settings['card_theme']) ? sanitize_html_class($settings['card_theme']) : 'dark_navy';

        $bg_class = 'bg-[#0B132B] text-slate-100 border border-slate-800 shadow-2xl';
        if ($theme === 'pure_white') {
            $bg_class = 'bg-white text-slate-900 border border-slate-200 shadow-xl';
        } elseif ($theme === 'transparent') {
            $bg_class = 'bg-transparent text-inherit border-none shadow-none';
        }

        echo '<div class="sedrazavi-elementor-suite-container ' . esc_attr($bg_class) . ' p-6 sm:p-8 rounded-3xl my-6 transition-all duration-300" dir="rtl">';
        
        if (!empty($title)) {
            echo '<div class="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">';
            echo '<span class="w-2.5 h-6 bg-gradient-to-b from-[#D4AF37] to-[#AA820A] rounded-full inline-block"></span>';
            echo '<h3 class="text-xl font-bold font-serif">' . esc_html($title) . '</h3>';
            echo '</div>';
        }

        // Render universal react shortcode or native fallback
        if (shortcode_exists('react_component')) {
            echo do_shortcode('[react_component name="' . esc_attr($suite) . '"]');
        } else {
            echo '<div class="sedrazavi-react-root" data-component="' . esc_attr($suite) . '" data-mounted="false">';
            echo '<div class="p-8 text-center text-slate-400 bg-black/20 rounded-2xl border border-dashed border-white/10">';
            echo '<p class="font-medium">ماژول تخصصی: ' . esc_html($suite) . '</p>';
            echo '<p class="text-xs text-[#D4AF37] mt-2">آماده هیدراتاسیون پویا و اتصال به پایگاه داده وردپرس</p>';
            echo '</div>';
            echo '</div>';
        }

        echo '</div>';
    }
}
}
