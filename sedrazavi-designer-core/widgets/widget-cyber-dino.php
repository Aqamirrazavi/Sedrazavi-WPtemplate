<?php
/**
 * Cyber Dino Runner Elementor Widget
 *
 * Full-color pixel cyber dinosaur runner canvas game with Web Audio API sound effects.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore\Widgets;

if (!defined('ABSPATH')) {
    exit;
}

class Widget_Cyber_Dino extends \Elementor\Widget_Base {

    public function get_name() {
        return 'sr_cyber_dino';
    }

    public function get_title() {
        return esc_html__('بازی دایناسور نئونی (Cyber Dino)', 'sedrazavi-designer-core');
    }

    public function get_icon() {
        return 'eicon-play';
    }

    public function get_categories() {
        return ['sedrazavi-designer'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_game_settings',
            [
                'label' => esc_html__('تنظیمات بازی و فیزیک', 'sedrazavi-designer-core'),
                'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'canvas_height',
            [
                'label'       => esc_html__('ارتفاع بوم بازی (پیکسل)', 'sedrazavi-designer-core'),
                'type'        => \Elementor\Controls_Manager::NUMBER,
                'min'         => 180,
                'max'         => 400,
                'step'        => 10,
                'default'     => 220,
            ]
        );

        $this->add_control(
            'enable_sound',
            [
                'label'        => esc_html__('افکت‌های صوتی Web Audio', 'sedrazavi-designer-core'),
                'type'         => \Elementor\Controls_Manager::SWITCHER,
                'default'      => 'yes',
                'return_value' => 'yes',
            ]
        );

        $this->add_control(
            'dino_neon_color',
            [
                'label'     => esc_html__('رنگ نئونی دایناسور', 'sedrazavi-designer-core'),
                'type'      => \Elementor\Controls_Manager::COLOR,
                'default'   => '#00f0ff',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $is_editor = \Elementor\Plugin::$instance->editor->is_edit_mode();
        $canvas_height = !empty($settings['canvas_height']) ? intval($settings['canvas_height']) : 220;
        $dino_color = !empty($settings['dino_neon_color']) ? $settings['dino_neon_color'] : '#00f0ff';
        ?>
        <div class="sr-dino-game-wrapper" data-sound="<?php echo esc_attr($settings['enable_sound']); ?>" data-color="<?php echo esc_attr($dino_color); ?>">
            <div class="sr-dino-hud">
                <span class="sr-dino-score">امتیاز: <strong class="sr-score-val">0</strong></span>
                <span class="sr-dino-highscore">رکورد: <strong class="sr-highscore-val">0</strong></span>
            </div>

            <?php if ($is_editor) : ?>
                <div class="sr-dino-editor-preview" style="height: <?php echo esc_attr($canvas_height); ?>px;">
                    <div class="sr-dino-preview-msg">
                        <span class="sr-dino-icon">🦖</span>
                        <p>پیش‌نمایش بازی دایناسور نئونی (در حالت ویرایشگر المنتور جهت حفظ سرعت غیرفعال است)</p>
                    </div>
                </div>
            <?php else : ?>
                <canvas class="sr-dino-canvas" height="<?php echo esc_attr($canvas_height); ?>"></canvas>
                <div class="sr-dino-overlay">
                    <button type="button" class="sr-btn sr-btn-sm sr-btn-glow sr-dino-start-btn">
                        <span>شروع بازی (کلید Space یا لمس صفحه)</span>
                        <span>⚡</span>
                    </button>
                </div>
            <?php endif; ?>
        </div>
        <?php
    }
}
