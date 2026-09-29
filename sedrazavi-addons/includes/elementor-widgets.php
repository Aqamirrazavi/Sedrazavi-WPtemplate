<?php
/**
 * Elementor 13 Custom Legal Widgets Integrator (Safe & Resilient)
 *
 * @package SedRazavi_Addons
 * @version 2.0.1
 * @author Seyed Amir Hossein Razavi Fardoei (@sedrazavi)
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_addons_register_elementor_category')) {
    function sedrazavi_addons_register_elementor_category($elements_manager) {
        if (!class_exists('\Elementor\Plugin')) {
            return;
        }
        $elements_manager->add_category(
            'sedrazavi-law-elements',
            array(
                'title' => esc_html__('المان‌های تخصصی حقوقی SedRazavi', 'sedrazavi-addons'),
                'icon'  => 'fa fa-gavel',
            )
        );
    }
}
add_action('elementor/elements/categories_registered', 'sedrazavi_addons_register_elementor_category');

if (!function_exists('sedrazavi_addons_load_elementor_widgets')) {
    function sedrazavi_addons_load_elementor_widgets($widgets_manager) {
        // گارد حیاتی: اگر کلاس ویجت المنتور وجود نداشت، بدون هیچ خطایی خارج شو
        if (!class_exists('\Elementor\Widget_Base')) {
            return;
        }

        // ۱. ویجت هیرو و سربرگ لوکس (Hero Widget)
        if (!class_exists('SedRazavi_Elementor_Hero_Widget')) {
            class SedRazavi_Elementor_Hero_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_hero'; }
                public function get_title() { return esc_html__('۱. سربرگ لوکس و هویت حقوقی (هیرو)', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-banner'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-hero-preview p-8 bg-[#0B132B] text-white rounded-2xl border-2 border-[#D4AF37]/40 text-center font-serif shadow-xl"><h2 class="text-3xl text-[#D4AF37] font-bold">دفتر تخصصی وکالت و داوری بین‌المللی SedRazavi</h2><p class="text-base text-gray-300 mt-2">دفاع قاطع و تخصص‌محور در دعاوی کلان حقوقی و کیفری</p><div class="mt-4"><a href="#booking" class="inline-block px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#060B18] font-bold">رزرو نوبت مشاوره حضوری</a></div></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Hero_Widget());
        }

        // ۲. ویجت خدمات حقوقی تخصصی (Services Widget)
        if (!class_exists('SedRazavi_Elementor_Services_Widget')) {
            class SedRazavi_Elementor_Services_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_services'; }
                public function get_title() { return esc_html__('۲. شبکه خدمات و حوزه‌های دعاوی', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-gallery-grid'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-services-preview p-6 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 text-center"><h3 class="text-xl font-bold text-[#D4AF37]">خدمات حقوقی تخصصی (ملکی، تجاری، بین‌المللی، کیفری)</h3><p class="text-sm text-gray-500 mt-1">نمایش گرید خودکار پست‌تایپ service با قابلیت فیلتر دسته‌بندی</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Services_Widget());
        }

        // ۳. ویجت نظرات و رضایت موکلان (Testimonials Widget)
        if (!class_exists('SedRazavi_Elementor_Testimonials_Widget')) {
            class SedRazavi_Elementor_Testimonials_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_testimonials'; }
                public function get_title() { return esc_html__('۳. اسلایدر نظرات و رضایت موکلان', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-testimonial-carousel'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-testimonials-preview p-6 bg-gray-50 dark:bg-[#070D1E] rounded-2xl border border-[#D4AF37]/30 text-center"><p class="text-[#D4AF37] font-bold">اسلایدر متحرک نظرات و اسناد آرای موفق قضایی موکلین</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Testimonials_Widget());
        }

        // ۴. ویجت مقالات و تحلیل‌های حقوقی (Posts Widget)
        if (!class_exists('SedRazavi_Elementor_Posts_Widget')) {
            class SedRazavi_Elementor_Posts_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_posts'; }
                public function get_title() { return esc_html__('۴. مقالات و یادداشت‌های حقوقی', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-post-list'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-posts-preview p-6 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 text-center"><p class="text-[#D4AF37] font-bold">آخرین مقالات، قوانین و تحلیل‌های پرونده‌ها با اسکیما Article</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Posts_Widget());
        }

        // ۵. ویجت ویدئوها و آموزش‌های حقوقی (Videos Widget)
        if (!class_exists('SedRazavi_Elementor_Videos_Widget')) {
            class SedRazavi_Elementor_Videos_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_videos'; }
                public function get_title() { return esc_html__('۵. گالری ویدئوها و مشاوره‌های صوتی/تصویری', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-video-playlist'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-videos-preview p-6 bg-[#070D1E] text-white rounded-2xl border border-[#D4AF37]/30 text-center"><p class="text-[#D4AF37] font-bold">پخش ویدئوهای آموزشی آپارات / یوتیوب با پوستر اختصاصی و فریم طلایی</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Videos_Widget());
        }

        // ۶. ویجت نوار استوری‌های اینستاگرام حقوقی (Instagram Stories Widget)
        if (!class_exists('SedRazavi_Elementor_Instagram_Widget')) {
            class SedRazavi_Elementor_Instagram_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_instagram'; }
                public function get_title() { return esc_html__('۶. نوار استوری‌های حقوقی (اینستاگرامی)', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-instagram-gallery'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-stories-preview p-4 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 text-center"><p class="text-[#D4AF37] font-bold">حلقه‌های استوری متحرک طلایی با قابلیت باز شدن مودال تمام‌صفحه</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Instagram_Widget());
        }

        // ۷. ویجت تیم وکلا و کارشناسان (Team Widget)
        if (!class_exists('SedRazavi_Elementor_Team_Widget')) {
            class SedRazavi_Elementor_Team_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_team'; }
                public function get_title() { return esc_html__('۷. تیم وکلای پایه یک و کارشناسان همکار', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-person'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-team-preview p-6 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 text-center"><p class="text-[#D4AF37] font-bold">کارت‌های معرفی وکلا با تصویر رسمی و مشخصات پروانه وکالت</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Team_Widget());
        }

        // ۸. ویجت پرسش‌های متداول آکاردئونی (FAQ Widget)
        if (!class_exists('SedRazavi_Elementor_Faq_Widget')) {
            class SedRazavi_Elementor_Faq_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_faq'; }
                public function get_title() { return esc_html__('۸. پرسش‌های متداول با اسکیما FAQPage', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-help-o'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-faq-preview p-6 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 text-center"><p class="text-[#D4AF37] font-bold">آکاردئون هوشمند پرسش و پاسخ‌های حقوقی با میکروفرمت سئو</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Faq_Widget());
        }

        // ۹. ویجت فرم تماس و رزرو وقت مشاوره (Contact & Booking Widget)
        if (!class_exists('SedRazavi_Elementor_Contact_Widget')) {
            class SedRazavi_Elementor_Contact_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_contact_booking'; }
                public function get_title() { return esc_html__('۹. فرم رزرو نوبت و درخواست تماس', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-form-horizontal'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-contact-preview p-6 bg-white dark:bg-[#0B132B] rounded-2xl border-2 border-[#D4AF37]/30 text-center"><p class="text-[#D4AF37] font-bold">فرم هوشمند رزرو نوبت حضوری/تلفنی با محاسبه تعرفه و تایید پیامکی</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Contact_Widget());
        }

        // ۱۰. ویجت بنر فراخوان اقدام (CTA Widget)
        if (!class_exists('SedRazavi_Elementor_CTA_Widget')) {
            class SedRazavi_Elementor_CTA_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_cta'; }
                public function get_title() { return esc_html__('۱۰. بنر فراخوان اقدام و مشاوره فوری (CTA)', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-call-to-action'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-cta-preview p-8 bg-gradient-to-r from-[#0B132B] via-[#070D1E] to-[#0B132B] text-white rounded-2xl border border-[#D4AF37]/40 text-center"><h3 class="text-2xl text-[#D4AF37] font-bold">نیاز به مشاوره حقوقی فوری با وکیل پایه یک دادگستری دارید؟</h3><p class="text-sm text-gray-300 mt-2">کارشناسان ما در سریع‌ترین زمان پرونده شما را ارزیابی می‌کنند</p><a href="tel:02188888888" class="inline-block mt-4 px-6 py-2.5 rounded-xl bg-[#D4AF37] text-[#060B18] font-bold">تماس مستقیم با دفتر ونک</a></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_CTA_Widget());
        }

        // ۱۱. ویجت بنر اسلایدر متنی احادیث و اشعار (Banner Text Slider Widget)
        if (!class_exists('SedRazavi_Elementor_Banner_Widget')) {
            class SedRazavi_Elementor_Banner_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_banner_slider'; }
                public function get_title() { return esc_html__('۱۱. بنر اسلایدر متنی احادیث و اشعار', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-text-area'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-banner-preview p-4 bg-[#0B132B] text-white rounded-xl border border-[#D4AF37]/40 text-center font-serif"><p class="text-[#D4AF37] font-bold">«العدل اساس الملک» - امام علی (ع)</p><span class="text-xs text-gray-400">بنر اسلایدر احادیث، آیات، اشعار و حکمت‌های حقوقی با چرخش خودکار ۵ ثانیه</span></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Banner_Widget());
        }

        // ۱۲. ویجت اسکرول‌بار شناور آیکونی (Floating Icon Scrollbar Widget)
        if (!class_exists('SedRazavi_Elementor_Scrollbar_Widget')) {
            class SedRazavi_Elementor_Scrollbar_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_floating_scrollbar'; }
                public function get_title() { return esc_html__('۱۲. اسکرول‌بار شناور و منوی آیکونی بازگشت به بالا', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-navigation-vertical'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-scrollbar-preview p-4 bg-white dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-800 text-center"><p class="text-[#D4AF37] font-bold">دکمه ۵۰×۵۰ طلایی شناور با منوی ۷ آیکون و بازگشت نرم به بالای صفحه</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Scrollbar_Widget());
        }

        // ۱۳. ویجت سوییچ تغییر حالت شب و روز (Theme Toggle Switch Widget)
        if (!class_exists('SedRazavi_Elementor_Theme_Toggle_Widget')) {
            class SedRazavi_Elementor_Theme_Toggle_Widget extends \Elementor\Widget_Base {
                public function get_name() { return 'sedrazavi_theme_toggle'; }
                public function get_title() { return esc_html__('۱۳. سوییچ تغییر حالت شب و روز (Dark/Light)', 'sedrazavi-addons'); }
                public function get_icon() { return 'eicon-adjust'; }
                public function get_categories() { return array('sedrazavi-law-elements'); }
                protected function render() {
                    echo '<div class="sedrazavi-toggle-preview p-4 bg-white dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-800 text-center"><p class="text-[#D4AF37] font-bold">دکمه سوییچ لوکس پالت شب و روز با ذخیره‌سازی LocalStorage و ترنزیشن نرم</p></div>';
                }
            }
            $widgets_manager->register(new SedRazavi_Elementor_Theme_Toggle_Widget());
        }
    }
}
add_action('elementor/widgets/register', 'sedrazavi_addons_load_elementor_widgets');
