<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Firm Milestones & Growth Journey Widget
 */
class Universal_Firm_Milestones_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_firm_milestones';
    }

    public function get_title() {
        return esc_html__('سفر رشد و نقاط عطف راهبردی (Firm Milestones)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-time-line';
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات تایم‌لاین رشد', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'title',
            [
                'label'   => esc_html__('عنوان اصلی بخش', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('سفر رشد، افتخارات و چشم‌انداز راهبردی مؤسسه حقوقی', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'subtitle',
            [
                'label'   => esc_html__('زیرعنوان توضیحی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('مرور نقاط عطف بنیادین از تاسیس دفتر تا چشم‌انداز ۱۴۰۵ در دعاوی ملی و بین‌المللی', 'universal-elementor-suite'),
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'year',
            [
                'label'   => esc_html__('سال / دوره', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '۱۳۹۰',
            ]
        );

        $repeater->add_control(
            'milestone_title',
            [
                'label'   => esc_html__('عنوان نقطه عطف', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('تاسیس دپارتمان تخصصی دعاوی ملکی و ثبتی', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'description',
            [
                'label'   => esc_html__('شرح دستاورد', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('رسیدگی به بیش از ۳۰۰ پرونده ملکی، سرقفلی و اخذ سند رسمی با ضریب موفقیت ۹۶٪', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'milestones',
            [
                'label'       => esc_html__('نقاط عطف تایم‌لاین', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'year'            => '۱۳۸۸',
                        'milestone_title' => esc_html__('تاسیس دفتر وکالت دکتر رضوی', 'universal-elementor-suite'),
                        'description'     => esc_html__('آغاز فعالیت رسمی با تمرکز بر حقوق تجارت و دعاوی قراردادی در تهران.', 'universal-elementor-suite'),
                    ],
                    [
                        'year'            => '۱۳۹۴',
                        'milestone_title' => esc_html__('راه‌اندازی مرکز داوری و حل اختلاف تجاری', 'universal-elementor-suite'),
                        'description'     => esc_html__('ورود به حوزه داوری سازمانی اتاق بازرگانی و قراردادهای بین‌المللی.', 'universal-elementor-suite'),
                    ],
                    [
                        'year'            => '۱۴۰۱',
                        'milestone_title' => esc_html__('دیجیتال‌سازی کامل و پرتال آنلاین موکلین', 'universal-elementor-suite'),
                        'description'     => esc_html__('سامانه رصد لحظه‌ای پرونده، تبادل لایحه و پرداخت آنلاین حق‌الوکاله.', 'universal-elementor-suite'),
                    ],
                    [
                        'year'            => '۱۴۰۵ (چشم‌انداز)',
                        'milestone_title' => esc_html__('گسترش شبکه بین‌المللی داوری و هوش مصنوعی حقوقی', 'universal-elementor-suite'),
                        'description'     => esc_html__('توسعه بازوی داوری در منطقه خلیج فارس و ممیزی قراردادهای هوشمند.', 'universal-elementor-suite'),
                    ],
                ],
                'title_field' => '{{{ year }}} - {{{ milestone_title }}}',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="sedrazavi-react-root uas-firm-milestones-wrap" data-component="FirmMilestone" dir="rtl">
            <!-- Native Fallback for Non-JS / Server Rendering -->
            <div class="uas-timeline-container" style="padding: 2rem 1rem; text-align: right; font-family: inherit;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <span style="display: inline-block; padding: 0.25rem 1rem; border-radius: 9999px; background: rgba(212,175,55,0.15); color: #AA820A; font-size: 0.75rem; font-weight: 700; border: 1px solid rgba(212,175,55,0.4); margin-bottom: 0.5rem;">
                        <?php echo esc_html__('نقشه راه و افق راهبردی', 'universal-elementor-suite'); ?>
                    </span>
                    <h3 style="font-size: 1.5rem; font-weight: 900; color: #0B132B; margin: 0 0 0.5rem 0;">
                        <?php echo esc_html($settings['title']); ?>
                    </h3>
                    <p style="font-size: 0.875rem; color: #64748B; max-width: 600px; margin: 0 auto;">
                        <?php echo esc_html($settings['subtitle']); ?>
                    </p>
                </div>

                <div style="border-right: 2px dashed rgba(212,175,55,0.5); padding-right: 1.5rem; margin-right: 1rem;">
                    <?php if (!empty($settings['milestones'])) : foreach ($settings['milestones'] as $idx => $m) : ?>
                        <div style="position: relative; margin-bottom: 1.5rem;">
                            <div style="position: absolute; right: -2rem; top: 0.25rem; width: 1rem; height: 1rem; border-radius: 50%; background: #D4AF37; border: 3px solid #FFF; box-shadow: 0 2px 6px rgba(0,0,0,0.15);"></div>
                            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 1rem; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                                <span style="font-weight: 900; color: #D4AF37; font-size: 0.875rem; display: block; margin-bottom: 0.25rem;">
                                    <?php echo esc_html($m['year']); ?>
                                </span>
                                <h4 style="font-size: 1rem; font-weight: 800; color: #0B132B; margin: 0 0 0.5rem 0;">
                                    <?php echo esc_html($m['milestone_title']); ?>
                                </h4>
                                <p style="font-size: 0.8125rem; color: #475569; margin: 0; line-height: 1.6;">
                                    <?php echo esc_html($m['description']); ?>
                                </p>
                            </div>
                        </div>
                    <?php endforeach; endif; ?>
                </div>
            </div>
        </div>
        <?php
    }
}
