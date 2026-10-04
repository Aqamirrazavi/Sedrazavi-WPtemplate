<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Case Interactive Timeline Widget
 */
class Universal_Case_Timeline_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_case_timeline';
    }

    public function get_title() {
        return esc_html__('تایم‌لاین تعاملی پرونده موکل (Case Timeline)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-history';
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات پرونده', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'case_id',
            [
                'label'   => esc_html__('شناسه پرونده', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'c-01',
            ]
        );

        $this->add_control(
            'case_number',
            [
                'label'   => esc_html__('شماره پرونده / کلاسه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '۱۴۰۳-۹۸۲۷۳-ونک',
            ]
        );

        $this->add_control(
            'case_subject',
            [
                'label'   => esc_html__('موضوع دعوا', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => 'الزام به تنظیم سند رسمی انتقال ملک و مطالبه خسارت تاخیر تادیه',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $props = [
            'caseId'      => $settings['case_id'],
            'caseNumber'  => $settings['case_number'],
            'caseSubject' => $settings['case_subject'],
        ];
        ?>
        <div class="sedrazavi-react-root uas-case-timeline-wrap" data-component="CaseInteractiveTimeline" data-props="<?php echo esc_attr(wp_json_encode($props)); ?>" dir="rtl">
            <!-- Native PHP Fallback -->
            <div style="background: #0B132B; color: #FFF; border: 1px solid rgba(212,175,55,0.4); border-radius: 1.5rem; padding: 1.5rem; text-align: right; font-family: inherit;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; margin-bottom: 1rem;">
                    <div>
                        <span style="background: #D4AF37; color: #0B132B; padding: 0.2rem 0.6rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 900;">
                            نقشه راه پرونده
                        </span>
                        <h4 style="font-size: 1.125rem; font-weight: 800; margin: 0.5rem 0 0.25rem 0; color: #FFF;">
                            <?php echo esc_html($settings['case_subject']); ?>
                        </h4>
                        <span style="font-size: 0.75rem; color: #94A3B8;">
                            شماره پرونده: <?php echo esc_html($settings['case_number']); ?>
                        </span>
                    </div>
                    <div style="text-align: center; background: rgba(255,255,255,0.08); padding: 0.75rem 1.25rem; border-radius: 1rem;">
                        <span style="font-size: 0.6875rem; color: #CBD5E1; display: block;">پیشرفت کل</span>
                        <span style="font-size: 1.5rem; font-weight: 900; color: #D4AF37;">۷۵٪</span>
                    </div>
                </div>
                <p style="font-size: 0.8125rem; color: #E2E8F0; margin: 0;">
                    در حال بارگذاری تایم‌لاین کامل تعاملی و اوقات نظارت دادگاه...
                </p>
            </div>
        </div>
        <?php
    }
}
