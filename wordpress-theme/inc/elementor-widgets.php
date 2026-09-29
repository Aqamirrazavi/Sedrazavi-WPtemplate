<?php
/**
 * SedRazavi Elementor Widgets Integration
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. Register SedRazavi Category in Elementor
 */
if (!function_exists('sedrazavi_register_elementor_category')) {
    function sedrazavi_register_elementor_category($elements_manager) {
        if (!did_action('elementor/loaded')) {
            return;
        }
        $elements_manager->add_category(
            'sedrazavi-law-elements',
            array(
                'title' => esc_html__('المان‌های تخصصی حقوقی سید رضوی', 'sedrazavi'),
                'icon'  => 'fa fa-balance-scale',
            )
        );
    }
    add_action('elementor/elements/categories_registered', 'sedrazavi_register_elementor_category');
}

/**
 * 2. Register 10 Standalone Legal Elementor Widgets
 */
if (class_exists('\Elementor\Widget_Base')) {
    if (!class_exists('SedRazavi_Legal_Base_Widget')) {
        class SedRazavi_Legal_Base_Widget extends ElementorWidget_Base {
        protected $w_name = 'sedrazavi_legal_widget';
        protected $w_title = 'المان حقوقی';
        protected $w_icon = 'eicon-site-identity';

        public function get_name() { return $this->w_name; }
        public function get_title() { return $this->w_title; }
        public function get_icon() { return $this->w_icon; }
        public function get_categories() { return array('sedrazavi-law-elements'); }

        protected function render() {
            echo '<div class="sedrazavi-elementor-widget-rendered p-4 rounded-xl border border-amber-500/30 bg-[#0B132B] text-white">';
            echo '<h4 class="text-sm font-bold text-[#D4AF37] mb-2">⚖️ ' . esc_html($this->get_title()) . '</h4>';
            echo '<p class="text-xs text-slate-300">المان حقوقی فعال است. جهت تنظیم محتوا از کنترل‌های پنل کناری استفاده فرمایید.</p>';
            echo '</div>';
        }
    }
}

if (!class_exists('SedRazavi_Hero_Widget')) {
    class SedRazavi_Hero_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_hero_widget';
        protected $w_title = 'هیرو و شعار وکالت سید رضوی';
        protected $w_icon = 'eicon-banner';
    }
}
if (!class_exists('SedRazavi_Services_Grid_Widget')) {
    class SedRazavi_Services_Grid_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_services_grid_widget';
        protected $w_title = 'شبکه خدمات و دپارتمان‌های وکالت';
        protected $w_icon = 'eicon-gallery-grid';
    }
}
if (!class_exists('SedRazavi_Lawyer_Profile_Widget')) {
    class SedRazavi_Lawyer_Profile_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_lawyer_profile_widget';
        protected $w_title = 'کارت سوابق و مدارک وکیل';
        protected $w_icon = 'eicon-person';
    }
}
if (!class_exists('SedRazavi_Booking_Form_Widget')) {
    class SedRazavi_Booking_Form_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_booking_form_widget';
        protected $w_title = 'فرم رزرو نوبت مشاوره حقوقی';
        protected $w_icon = 'eicon-form-horizontal';
    }
}
if (!class_exists('SedRazavi_Case_Tracker_Widget')) {
    class SedRazavi_Case_Tracker_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_case_tracker_widget';
        protected $w_title = 'سامانه پیگیری آنلاین پرونده';
        protected $w_icon = 'eicon-search';
    }
}
if (!class_exists('SedRazavi_Stats_Widget')) {
    class SedRazavi_Stats_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_stats_widget';
        protected $w_title = 'شمارنده پرونده‌های موفق و آمار';
        protected $w_icon = 'eicon-counter';
    }
}
if (!class_exists('SedRazavi_Testimonials_Widget')) {
    class SedRazavi_Testimonials_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_testimonials_widget';
        protected $w_title = 'دیدگاه‌های موکلین و آرای قطعی';
        protected $w_icon = 'eicon-testimonial';
    }
}
if (!class_exists('SedRazavi_Faq_Widget')) {
    class SedRazavi_Faq_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_faq_widget';
        protected $w_title = 'پرسش‌های متداول حقوقی';
        protected $w_icon = 'eicon-help-o';
    }
}
if (!class_exists('SedRazavi_Trust_Badges_Widget')) {
    class SedRazavi_Trust_Badges_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_trust_badges_widget';
        protected $w_title = 'نشان‌های کانون وکلا و ضمانت';
        protected $w_icon = 'eicon-shield-check';
    }
}
if (!class_exists('SedRazavi_Emergency_Contact_Widget')) {
    class SedRazavi_Emergency_Contact_Widget extends SedRazavi_Legal_Base_Widget {
        protected $w_name = 'sedrazavi_emergency_contact_widget';
        protected $w_title = 'باکس تماس اضطراری دادسرا';
        protected $w_icon = 'eicon-headphones';
    }
}
}

if (!function_exists('sedrazavi_register_elementor_widgets')) {
    function sedrazavi_register_elementor_widgets($widgets_manager) {
        if (!did_action('elementor/loaded') || !class_exists('\Elementor\Widget_Base')) {
            return;
        }

        $widgets = array(
        'SedRazavi_Hero_Widget',
        'SedRazavi_Services_Grid_Widget',
        'SedRazavi_Lawyer_Profile_Widget',
        'SedRazavi_Booking_Form_Widget',
        'SedRazavi_Case_Tracker_Widget',
        'SedRazavi_Stats_Widget',
        'SedRazavi_Testimonials_Widget',
        'SedRazavi_Faq_Widget',
        'SedRazavi_Trust_Badges_Widget',
        'SedRazavi_Emergency_Contact_Widget',
    );

    foreach ($widgets as $widget_class) {
        if (class_exists($widget_class)) {
            if (method_exists($widgets_manager, 'register')) {
                $widgets_manager->register(new $widget_class());
            } elseif (method_exists($widgets_manager, 'register_widget_type')) {
                $widgets_manager->register_widget_type(new $widget_class());
            }
        }
    }
}
add_action('elementor/widgets/register', 'sedrazavi_register_elementor_widgets');
add_action('elementor/widgets/widgets_registered', 'sedrazavi_register_elementor_widgets');
}
