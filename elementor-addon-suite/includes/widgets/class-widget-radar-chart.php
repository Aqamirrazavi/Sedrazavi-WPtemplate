<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Key Practice Areas Radar Chart Widget
 */
class Universal_Radar_Chart_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_radar_chart';
    }

    public function get_title() {
        return esc_html__('نمودار راداری حوزه‌های تخصصی (Radar Chart)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-radar-chart';
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات نمودار راداری', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'chart_title',
            [
                'label'   => esc_html__('عنوان بالای نمودار', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('ماتریس و توزیع چندبعدی تخصص‌های وکیل', 'universal-elementor-suite'),
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="sedrazavi-react-root uas-radar-chart-wrap" data-component="KeyPracticeAreasRadarChart" dir="rtl">
            <!-- Native PHP Fallback Chart -->
            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 1.5rem; padding: 2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.04); text-align: right; font-family: inherit;">
                <h4 style="font-size: 1.125rem; font-weight: 800; color: #0B132B; margin: 0 0 1rem 0; text-align: center;">
                    <?php echo esc_html($settings['chart_title']); ?>
                </h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div style="padding: 1rem; border-radius: 1rem; background: #F8FAFC; border: 1px solid #E2E8F0;">
                        <span style="font-size: 0.75rem; color: #64748B;">قراردادهای تجاری و داوری</span>
                        <div style="display: flex; justify-content: space-between; font-weight: 800; color: #0B132B; margin-top: 0.25rem;">
                            <span>تسلط: ۹۶٪</span>
                            <span style="color: #D4AF37;">۳۸۰ پرونده</span>
                        </div>
                    </div>
                    <div style="padding: 1rem; border-radius: 1rem; background: #F8FAFC; border: 1px solid #E2E8F0;">
                        <span style="font-size: 0.75rem; color: #64748B;">دعاوی ملکی و سرقفلی</span>
                        <div style="display: flex; justify-content: space-between; font-weight: 800; color: #0B132B; margin-top: 0.25rem;">
                            <span>تسلط: ۹۴٪</span>
                            <span style="color: #D4AF37;">۳۴۰ پرونده</span>
                        </div>
                    </div>
                    <div style="padding: 1rem; border-radius: 1rem; background: #F8FAFC; border: 1px solid #E2E8F0;">
                        <span style="font-size: 0.75rem; color: #64748B;">فرجام‌خواهی دیوان عالی</span>
                        <div style="display: flex; justify-content: space-between; font-weight: 800; color: #0B132B; margin-top: 0.25rem;">
                            <span>تسلط: ۹۲٪</span>
                            <span style="color: #D4AF37;">۱۶۵ پرونده</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
}
