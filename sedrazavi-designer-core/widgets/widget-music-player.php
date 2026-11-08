<?php
/**
 * Cyberpunk Music Player Elementor Widget
 *
 * Cyberpunk audio player with wave visualizer and policy-compliant controls.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore\Widgets;

if (!defined('ABSPATH')) {
    exit;
}

class Widget_Music_Player extends \Elementor\Widget_Base {

    public function get_name() {
        return 'sr_music_player';
    }

    public function get_title() {
        return esc_html__('موزیک‌پلیر سایبرپانک و اکولایزر امواج', 'sedrazavi-designer-core');
    }

    public function get_icon() {
        return 'eicon-headphones';
    }

    public function get_categories() {
        return ['sedrazavi-designer'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_track',
            [
                'label' => esc_html__('مشخصات ترک صوتی', 'sedrazavi-designer-core'),
                'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'track_title',
            [
                'label'   => esc_html__('عنوان قطعه', 'sedrazavi-designer-core'),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => 'Cyber Synthwave Pulse',
            ]
        );

        $this->add_control(
            'artist_name',
            [
                'label'   => esc_html__('نام هنرمند / استودیو', 'sedrazavi-designer-core'),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => 'SedRazavi Studio',
            ]
        );

        $this->add_control(
            'audio_url',
            [
                'label'       => esc_html__('آدرس فایل صوتی (MP3)', 'sedrazavi-designer-core'),
                'type'        => \Elementor\Controls_Manager::TEXT,
                'default'     => 'https://actions.google.com/sounds/v1/science_fiction/scifi_pulse.ogg',
                'placeholder' => 'https://example.com/track.mp3',
            ]
        );

        $this->end_controls_section();

        // Style
        $this->start_controls_section(
            'section_style',
            [
                'label' => esc_html__('رنگ‌بندی نئونی', 'sedrazavi-designer-core'),
                'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'wave_color',
            [
                'label'     => esc_html__('رنگ امواج اکولایزر', 'sedrazavi-designer-core'),
                'type'      => \Elementor\Controls_Manager::COLOR,
                'default'   => '#00f0ff',
                'selectors' => [
                    '{{WRAPPER}} .sr-player-bar' => 'background-color: {{VALUE}}; box-shadow: 0 0 10px {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $is_editor = \Elementor\Plugin::$instance->editor->is_edit_mode();
        $audio_src = !empty($settings['audio_url']) ? esc_url($settings['audio_url']) : '';
        ?>
        <div class="sr-music-player-card" data-src="<?php echo esc_attr($audio_src); ?>">
            <div class="sr-player-track-info">
                <span class="sr-track-badge">CYBER SOUND</span>
                <h4 class="sr-player-title"><?php echo esc_html($settings['track_title']); ?></h4>
                <span class="sr-player-artist"><?php echo esc_html($settings['artist_name']); ?></span>
            </div>

            <div class="sr-player-bars-visualizer">
                <span class="sr-player-bar"></span><span class="sr-player-bar"></span><span class="sr-player-bar"></span>
                <span class="sr-player-bar"></span><span class="sr-player-bar"></span><span class="sr-player-bar"></span>
                <span class="sr-player-bar"></span><span class="sr-player-bar"></span><span class="sr-player-bar"></span>
                <span class="sr-player-bar"></span><span class="sr-player-bar"></span><span class="sr-player-bar"></span>
            </div>

            <div class="sr-player-controls">
                <button type="button" class="sr-player-play-btn" aria-label="پخش / توقف">
                    <span class="sr-play-icon">▶</span>
                </button>
                <div class="sr-player-scrub">
                    <div class="sr-scrub-bar"></div>
                </div>
            </div>

            <?php if (!$is_editor && !empty($audio_src)) : ?>
                <audio class="sr-player-audio" preload="none" src="<?php echo esc_url($audio_src); ?>"></audio>
            <?php endif; ?>
        </div>
        <?php
    }
}
