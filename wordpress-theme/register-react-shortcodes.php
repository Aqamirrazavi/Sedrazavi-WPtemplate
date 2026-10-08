<?php
/**
 * SedRazavi React Components Universal Shortcode Bridge
 *
 * Registers the universal '[react_component name="ComponentName" props="{}"]' shortcode,
 * allowing WordPress content editors to embed any modern React component into any page,
 * post, or widget using the '.sedrazavi-react-root' container pattern.
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Direct access denied
}

class SedRazavi_React_Shortcode_Registrar {

    /**
     * Map of supported React components and their descriptive titles
     */
    const SUPPORTED_COMPONENTS = [
        'LawyerDashboard'               => 'پیشخوان جامع مدیریت پرونده‌ها و وکالت (Lawyer Dashboard)',
        'ClientPortalView'              => 'کارتابل محرمانه موکلین و مراجعین (Client Portal)',
        'CaseInteractiveTimeline'       => 'تایم‌لاین تعاملی و اوقات نظارت پرونده (Case Interactive Timeline)',
        'FirmMilestone'                 => 'سفر رشد و نقاط عطف راهبردی مؤسسه حقوقی (Firm Milestones)',
        'KeyPracticeAreasRadarChart'    => 'نمودار راداری صلاحیت‌های تخصصی وکیل (Key Practice Areas Radar Chart)',
        'LawyerPrintBioCard'            => 'شناسنامه رسمی و کارت بیوگرافی قابل پرینت (Lawyer Print Bio Card)',
        'EmailOtpAuthComponent'         => 'سامانه ورود بدون پسورد با رمز یکبار مصرف ایمیلی (Email OTP Login)',
        'EmailOtpMagicLogin'            => 'فرم لاگین هوشمند با ایمیل (Email OTP Magic Login)',
        'LawyerRealtimeToastNotifier'   => 'مرکز اعلان‌های بلادرنگ مواعد دادگاه و پیام‌های موکلین (Real-time Notifier)',
        'CaseProgressTracker'           => 'استپر و پیگیری وضعیت پرونده دادگستری (Case Progress Tracker)',
        'CourtFeeCalculator'            => 'میز محاسبات قضایی و تمبر دادرسی (Court Fee Calculator)',
        'ComprehensiveAdminPortal'      => 'پنل جامع ادمین و راهبری وکالت (Comprehensive Admin Portal)',
        'AdminHelpAndDocsSystem'        => 'مرکز مستندات و راهنمای تصویری مدیریت (Admin Help & Docs)',
        'CorporateInsolvencySuite'      => 'سامانه ورشکستگی، تصفیه دیون و قرارداد ارفاقی (Corporate Insolvency Suite)',
        'LegalFinancialSuite'           => 'سامانه محاسبات و امور مالی حقوقی و اقساط (Legal Financial Suite)',
        'LegalOdrSuite'                 => 'سامانه حل اختلاف آنلاین و داوری هوشمند (Legal ODR Suite)',
        'LegalIntelligenceSuite'        => 'موتور تحلیل هوش حقوقی و وحدت رویه قضایی (Legal Intelligence Suite)',
        'LegalStrategySuite'            => 'اتاق استراتژی دفاع و تقویم مواعد دادگاه (Legal Strategy Suite)',
        'CorporateInternationalSuite'   => 'سامانه حقوق تجارت، سرمایه‌گذاری و اینکوترمز (Corporate International Suite)',
        'IntellectualPropertySuite'     => 'مالکیت فکری، ثبت اختراع، علامت تجاری و اسکرو (IP Suite)',
        'CyberForensicsSuite'           => 'فارنزیک جرایم سایبری و کشف ادله دیجیتال (Cyber Forensics Suite)',
        'FinancialComplianceSuite'      => 'سامانه تطبیق مالی و پیشگیری از پولشویی (AML & Financial Compliance)',
        'RealEstateConstructionSuite'   => 'دعاوی تخصصی ملکی، سرقفلی و ساخت‌وساز (Real Estate & Construction)',
        'FamilyInheritanceSuite'        => 'حقوق خانواده، ارث، وصیت و ترکه (Family & Inheritance Suite)',
        'LegalAutomationLibrary'        => 'کتابخانه اتوماسیون فرم‌ها و اوراق قضایی (Legal Automation Library)',
        'AdministrativeJusticeSuite'    => 'فرجام‌خواهی در دیوان عدالت اداری (Administrative Justice Suite)',
        'CasePredictionRiskSuite'       => 'شبیه‌ساز و پیش‌بینی ریسک آرای دادگاه (Case Prediction & Risk Suite)',
        'EngineeringProcurementSuite'   => 'قراردادهای پیمانکاری مهندسی و شرایط عمومی پیمان (EPC & Procurement)',
        'InternationalArbitrationSuite' => 'داوری تجاری بین‌المللی و اجرای آرای خارجی (International Arbitration)',
        'ComprehensiveCodexSuite'       => 'کدکس جامع قوانین و مقررات جمهوری اسلامی ایران (Comprehensive Legal Codex)',
        'MasterDraftingVaultSuite'      => 'گنجینه جامع نگارش لوایح و متون تخصصی وکالت (Master Drafting Vault)',
        'TaxDisputesMoadianSuite'       => 'دعاوی مالیاتی، هیئت‌های حل اختلاف و سامانه مودیان (Tax Disputes Suite)',
        'LaborSocialSecuritySuite'      => 'دعاوی روابط کار، هیئت تشخیص و تامین اجتماعی (Labor & Social Security)',
        'EconomicCrimesDefenseSuite'    => 'دفاع تخصصی در جرایم اقتصادی و اخلال در نظام مالی (Economic Crimes Defense)',
        'CustomsTransitDisputesSuite'   => 'کمیسیون اختلافات گمرکی و ترانزیت کالا (Customs & Transit Disputes)',
        'LegalCrmSmartNotifierSuite'    => 'سامانه ارتباط با موکلین و پیام‌رسان هوشمند (Legal CRM & Smart Notifier)',
        'CommercialArbitrationSuite'    => 'مرکز داوری بازرگانی و حل و فصل قراردادها (Commercial Arbitration Suite)',
        'ContractAuditAnalyzer'         => 'ممیزی هوشمند قراردادها و ارزیابی ریسک شروط (Contract Audit Analyzer)',
        'PetitionGeneratorModal'        => 'تنظیم هوشمند دادخواست و لوایح عدل‌ایران (Petition Generator)',
        'VirtualHearingRoom'            => 'اتاق دادرسی الکترونیک و دادگاه مجازی (Virtual Hearing Room)',
        'ClientPortalQuickAccessWidget' => 'ابزارک دسترسی سریع کارتابل موکل (Client Quick Access)',
        'LawyerHeroSlider'              => 'هیرو اسلایدر صفحه اصلی (Lawyer Hero Slider)',
        'TextBannerSlider'              => 'نوار متحرک شعارهای حقوقی (Text Banner Slider)',
        'StoryBar'                      => 'نوار هایلایت‌ها و استوری‌های آموزشی (Story Bar)',
        'ServicesSection'               => 'گرید خدمات حقوقی (Services Section)',
        'AboutSection'                  => 'بخش درباره وکیل و سوگندنامه (About Section)',
        'FaqSection'                    => 'پرسش و پاسخ‌های متداول حقوقی (FAQ Section)',
        'TestimonialsSlider'            => 'اسلایدر نظرات و رضایت‌نامه موکلین (Testimonials Slider)',
        'ContactAndBookingSection'      => 'فرم نوبت‌دهی مشاوره و تماس (Contact & Booking Section)',
        'ArticlesSection'               => 'آرشیو مقالات و یادداشت‌های تحلیلی (Articles Section)',
    ];

    /**
     * Initialize shortcode registration
     */
    public static function init() {
        // Universal Shortcode: [react_component name="ComponentName" props="{}"]
        add_shortcode('react_component', [__CLASS__, 'render_universal_react_component']);

        // Dedicated shortcut shortcodes
        add_shortcode('sedrazavi_dashboard', [__CLASS__, 'render_dashboard_shortcut']);
        add_shortcode('sedrazavi_timeline', [__CLASS__, 'render_timeline_shortcut']);
        add_shortcode('sedrazavi_firm_milestones', [__CLASS__, 'render_milestones_shortcut']);
        add_shortcode('sedrazavi_radar_chart', [__CLASS__, 'render_radar_shortcut']);
        add_shortcode('sedrazavi_email_otp', [__CLASS__, 'render_email_otp_shortcut']);
        add_shortcode('sedrazavi_bio_card', [__CLASS__, 'render_bio_card_shortcut']);
        add_shortcode('sedrazavi_insolvency', [__CLASS__, 'render_insolvency_shortcut']);
        add_shortcode('sedrazavi_contract_auditor', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'ContractAuditAnalyzer']));
        });
        add_shortcode('sedrazavi_petition_builder', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'PetitionGeneratorModal']));
        });
        add_shortcode('sedrazavi_virtual_courtroom', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'VirtualHearingRoom']));
        });
        add_shortcode('sedrazavi_legal_finance', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalFinancialSuite']));
        });
        add_shortcode('sedrazavi_odr_suite', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalOdrSuite']));
        });
        add_shortcode('sedrazavi_odr_portal', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalOdrSuite']));
        });
        add_shortcode('sedrazavi_legal_intelligence', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalIntelligenceSuite']));
        });
        add_shortcode('sedrazavi_legal_intelligence_portal', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalIntelligenceSuite']));
        });
        add_shortcode('sedrazavi_legal_strategy', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalStrategySuite']));
        });
        add_shortcode('sedrazavi_corporate_international', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CorporateInternationalSuite']));
        });
        add_shortcode('sedrazavi_ip_suite', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'IntellectualPropertySuite']));
        });
        add_shortcode('sedrazavi_cyber_suite', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CyberForensicsSuite']));
        });
        add_shortcode('sedrazavi_compliance_aml', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'FinancialComplianceSuite']));
        });
        add_shortcode('sedrazavi_aml_compliance_suite', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'FinancialComplianceSuite']));
        });
        add_shortcode('sedrazavi_real_estate', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'RealEstateConstructionSuite']));
        });
        add_shortcode('sedrazavi_real_estate_suite', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'RealEstateConstructionSuite']));
        });
        add_shortcode('sedrazavi_family_inheritance', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'FamilyInheritanceSuite']));
        });
        add_shortcode('sedrazavi_court_fee_calculator', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CourtFeeCalculator']));
        });
        add_shortcode('sedrazavi_judicial_calculators', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalFinancialSuite']));
        });
        add_shortcode('sedrazavi_customs_transit', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CustomsTransitDisputesSuite']));
        });
        add_shortcode('sedrazavi_epc_procurement', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'EngineeringProcurementSuite']));
        });
        add_shortcode('sedrazavi_government_tenders', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'GovernmentTendersGuaranteesSuite']));
        });
        add_shortcode('sedrazavi_economic_crimes', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'EconomicCrimesDefenseSuite']));
        });
        add_shortcode('sedrazavi_labor_security', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LaborSocialSecuritySuite']));
        });
        add_shortcode('sedrazavi_supreme_court', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'SupremeCourtAppealsSuite']));
        });
        add_shortcode('sedrazavi_codex', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'ComprehensiveCodexSuite']));
        });
        add_shortcode('sedrazavi_drafting_vault', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'MasterDraftingVaultSuite']));
        });
        add_shortcode('sedrazavi_crm_notifier', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LegalCrmSmartNotifierSuite']));
        });
        add_shortcode('sedrazavi_payment_adapter', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'PaymentAdapterSystemSuite']));
        });
        add_shortcode('sedrazavi_commercial_arbitration', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CommercialArbitrationSuite']));
        });
        add_shortcode('sedrazavi_tax_disputes', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'TaxDisputesMoadianSuite']));
        });
        add_shortcode('sedrazavi_administrative_justice', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'AdministrativeJusticeSuite']));
        });
        add_shortcode('sedrazavi_booking', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'ContactAndBookingSection']));
        });
        add_shortcode('sedrazavi_social_icons', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'AttorneySocialAccounts']));
        });
        add_shortcode('sedrazavi_gold_scroll', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'GoldScrollSidebar']));
        });
        add_shortcode('sedrazavi_corporate_suite', function($atts) {
            return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CorporateInternationalSuite']));
        });
    }

    /**
     * Universal shortcode callback: [react_component name="ComponentName" props='{"key":"value"}']
     */
    public static function render_universal_react_component($atts, $content = null) {
        $a = shortcode_atts([
            'name'  => 'LawyerDashboard',
            'props' => '{}',
            'class' => '',
            'id'    => '',
            'title' => '',
        ], $atts, 'react_component');

        $component_name = sanitize_text_field($a['name']);
        
        // Decode and validate props JSON
        $props = [];
        if (!empty($a['props'])) {
            $decoded = json_decode(html_entity_decode($a['props']), true);
            if (is_array($decoded)) {
                $props = $decoded;
            }
        }

        // Fetch display title
        $fallback_title = !empty($a['title']) 
            ? sanitize_text_field($a['title']) 
            : (self::SUPPORTED_COMPONENTS[$component_name] ?? "مؤلفه حقوقی {$component_name}");

        return self::render_bridge_markup($component_name, $props, $a['class'], $a['id'], $fallback_title);
    }

    /**
     * Helper to render the .sedrazavi-react-root container with skeleton preloader
     */
    public static function render_bridge_markup($component_name, $props = [], $custom_class = '', $custom_id = '', $fallback_title = '') {
        $unique_id = !empty($custom_id) 
            ? sanitize_html_class($custom_id) 
            : 'sedrazavi-react-' . strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $component_name)) . '-' . wp_unique_id();

        $classes = trim('sedrazavi-react-root sedrazavi-ui-wrapper ' . sanitize_text_field($custom_class));
        $props_json = esc_attr(wp_json_encode($props));
        $title = !empty($fallback_title) ? $fallback_title : "سامانه حقوقی {$component_name}";

        ob_start();
        ?>
        <div 
            id="<?php echo esc_attr($unique_id); ?>" 
            class="<?php echo esc_attr($classes); ?>" 
            data-component="<?php echo esc_attr($component_name); ?>" 
            data-props="<?php echo $props_json; ?>" 
            dir="rtl"
        >
            <div class="sedrazavi-skeleton-container" style="min-height: 180px; background: linear-gradient(135deg, rgba(11,19,43,0.03) 0%, rgba(212,175,55,0.06) 100%); border: 1px dashed rgba(212,175,55,0.35); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: inherit; direction: rtl; margin: 0.75rem 0;">
                <div style="width: 36px; height: 36px; border: 3px solid rgba(212,175,55,0.25); border-top-color: #D4AF37; border-radius: 50%; animation: sedrazaviSpin 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite; margin-bottom: 0.75rem;"></div>
                <h4 style="font-size: 0.875rem; font-weight: 800; color: #D4AF37; margin: 0 0 0.25rem 0;">
                    <?php echo esc_html($title); ?>
                </h4>
                <span style="font-size: 0.75rem; color: #94A3B8;">
                    در حال راه‌اندازی و اجرای مؤلفه React در وردپرس...
                </span>
                <style>
                    @keyframes sedrazaviSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                </style>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    /**
     * Shortcuts for popular components
     */
    public static function render_dashboard_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LawyerDashboard']));
    }

    public static function render_timeline_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CaseInteractiveTimeline']));
    }

    public static function render_milestones_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'FirmMilestone']));
    }

    public static function render_radar_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'KeyPracticeAreasRadarChart']));
    }

    public static function render_email_otp_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'EmailOtpAuthComponent']));
    }

    public static function render_bio_card_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'LawyerPrintBioCard']));
    }

    public static function render_insolvency_shortcut($atts) {
        return self::render_universal_react_component(array_merge((array)$atts, ['name' => 'CorporateInsolvencySuite']));
    }
}

// Bootstrap Universal Shortcodes
SedRazavi_React_Shortcode_Registrar::init();
