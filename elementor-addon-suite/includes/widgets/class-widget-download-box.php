<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Border;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Soft98-Style Multi-Server Download Box Elementor Widget with Full Visual Styling
 */
class Universal_Download_Box_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_download_box';
    }

    public function get_title() {
        return esc_html__('جعبه دانلود حرفه‌ای Soft98', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-file-download';
    }

    public function get_style_depends() {
        return ['uas-widgets-core'];
    }

    protected function register_controls() {
        // --- CONTENT SECTION ---
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('اطلاعات فایل دانلودی', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'box_title',
            [
                'label'   => esc_html__('عنوان بسته نرم‌افزاری', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('دانلود بسته نرم‌افزار جامع SedRazavi OS', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'version',
            [
                'label'   => esc_html__('شماره نسخه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'v5.0.0 (نسخه نهایی)',
            ]
        );

        $this->add_control(
            'filesize',
            [
                'label'   => esc_html__('حجم فایل', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '۴۸ مگابایت',
            ]
        );

        $this->add_control(
            'os',
            [
                'label'   => esc_html__('سیستم‌عامل‌های پشتیبانی شده', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'windows,mac,linux,android',
            ]
        );

        $this->add_control(
            'password',
            [
                'label'   => esc_html__('رمز فایل فشرده', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'www.sedrazavi.ir',
            ]
        );

        $this->add_control(
            'direct_url',
            [
                'label'   => esc_html__('لینک مستقیم سرور ۱', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '#download-direct-server-1',
            ]
        );

        $this->add_control(
            'mirror_url',
            [
                'label'   => esc_html__('لینک کمکی سرور ۲', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => '#download-mirror-server-2',
            ]
        );

        $this->end_controls_section();

        // --- STYLE SECTION: CONTAINER ---
        $this->start_controls_section(
            'section_style_box',
            [
                'label' => esc_html__('استایل جعبه دانلود', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'box_bg_color',
            [
                'label'     => esc_html__('رنگ پس‌زمینه کارت', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#0f172a',
                'selectors' => [
                    '{{WRAPPER}} .uas-dl-box-custom' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'primary_accent_color',
            [
                'label'     => esc_html__('رنگ آیکون‌ها و دکمه دانلود', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#2563eb',
                'selectors' => [
                    '{{WRAPPER}} .uas-btn-direct' => 'background-color: {{VALUE}};',
                    '{{WRAPPER}} .uas-dl-title'   => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'     => 'title_typography',
                'label'    => esc_html__('تایپوگرافی عنوان', 'universal-elementor-suite'),
                'selector' => '{{WRAPPER}} .uas-dl-title',
            ]
        );

        $this->add_responsive_control(
            'box_padding',
            [
                'label'      => esc_html__('فاصله‌های درونی (Padding)', 'universal-elementor-suite'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', 'em', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .uas-dl-box-custom' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'box_border_radius',
            [
                'label'      => esc_html__('گردی لبه‌ها (Border Radius)', 'universal-elementor-suite'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => ['px', '%'],
                'selectors'  => [
                    '{{WRAPPER}} .uas-dl-box-custom' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name'     => 'box_shadow',
                'label'    => esc_html__('سایه کارت (Box Shadow)', 'universal-elementor-suite'),
                'selector' => '{{WRAPPER}} .uas-dl-box-custom',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $title = $settings['box_title'] ?? '';
        $version = $settings['version'] ?? '';
        $filesize = $settings['filesize'] ?? '';
        $os = $settings['os'] ?? '';
        $password = $settings['password'] ?? '';
        $direct_url = $settings['direct_url'] ?? '#';
        $mirror_url = $settings['mirror_url'] ?? '#';
        ?>
        <div class="uas-dl-box-custom uas-widget-container" dir="rtl" style="border: 1px solid rgba(255,255,255,0.1); border-radius: 14px; padding: 20px; background: #0f172a; color: #e2e8f0; overflow: hidden;">
            <?php
            if (shortcode_exists('sedrazavi_download_box')) {
                echo do_shortcode(sprintf(
                    '[sedrazavi_download_box title="%s" version="%s" filesize="%s" os="%s" password="%s" direct_url="%s" mirror_url="%s"]',
                    esc_attr($title),
                    esc_attr($version),
                    esc_attr($filesize),
                    esc_attr($os),
                    esc_attr($password),
                    esc_url($direct_url),
                    esc_url($mirror_url)
                ));
            } else {
                ?>
                <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 14px; margin-bottom: 14px;">
                    <div>
                        <h3 class="uas-dl-title" style="margin: 0 0 6px; font-size: 18px; font-weight: 800; color: #3b82f6;"><?php echo esc_html($title); ?></h3>
                        <div style="font-size: 13px; color: #94a3b8; display: flex; flex-wrap: wrap; gap: 14px;">
                            <?php if ($version): ?><span>نسخه: <strong style="color: #fff;"><?php echo esc_html($version); ?></strong></span><?php endif; ?>
                            <?php if ($filesize): ?><span>حجم: <strong style="color: #fff;"><?php echo esc_html($filesize); ?></strong></span><?php endif; ?>
                            <?php if ($os): ?><span>پلتفرم: <strong style="color: #fff;"><?php echo esc_html($os); ?></strong></span><?php endif; ?>
                        </div>
                    </div>
                    <?php if ($password): ?>
                        <div style="background: rgba(255,255,255,0.05); border: 1px dashed rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 8px; font-size: 12px;">
                            رمز فایل: <code style="color: #10b981; font-weight: 700;"><?php echo esc_html($password); ?></code>
                        </div>
                    <?php endif; ?>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    <a href="<?php echo esc_url($direct_url); ?>" class="uas-btn-direct" style="padding: 10px 18px; border-radius: 8px; background: #2563eb; color: #fff; text-decoration: none; font-weight: 700; font-size: 13px;">⬇️ دانلود لینک مستقیم (سرور ۱)</a>
                    <a href="<?php echo esc_url($mirror_url); ?>" style="padding: 10px 18px; border-radius: 8px; background: rgba(255,255,255,0.08); color: #f8fafc; text-decoration: none; font-weight: 600; font-size: 13px;">🔁 سرور کمکی (سرور ۲)</a>
                </div>
                <?php
            }
            ?>
        </div>
        <?php
    }
}
