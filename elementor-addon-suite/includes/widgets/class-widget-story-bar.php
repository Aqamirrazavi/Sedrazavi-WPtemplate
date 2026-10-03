<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Story Bar Widget
 */
class Universal_Story_Bar_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_story_bar';
    }

    public function get_title() {
        return esc_html__('نوار استوری‌ها و هایلایت‌های تصویری', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-instagram-gallery';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-story-bar-css'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core', 'uas-story-bar-js'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تنظیمات استوری‌ها', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'bar_title',
            [
                'label'   => esc_html__('عنوان بالای نوار', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('نکات و هایلایت‌های آموزشی روز', 'universal-elementor-suite'),
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'story_title',
            [
                'label'       => esc_html__('عنوان استوری', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('نکات استراتژیک', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'story_image',
            [
                'label'   => esc_html__('تصویر کاور استوری', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200',
                ],
            ]
        );

        $repeater->add_control(
            'story_content',
            [
                'label'   => esc_html__('شرح یا پیام استوری', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('در تحلیل شاخص‌ها، همواره ریسک سیستماتیک و روند بازار را به عنوان متغیرهای اصلی مد نظر قرار دهید.', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'stories_list',
            [
                'label'       => esc_html__('لیست استوری‌ها', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'story_title' => esc_html__('اصول مذاکره', 'universal-elementor-suite'),
                        'story_image' => ['url' => 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=200'],
                        'story_content' => esc_html__('گوش دادن فعال و درک منافع متقابل، کلید دستیابی به توافقات پایدار است.', 'universal-elementor-suite'),
                    ],
                    [
                        'story_title' => esc_html__('مدیریت ریسک', 'universal-elementor-suite'),
                        'story_image' => ['url' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200'],
                        'story_content' => esc_html__('پیش‌بینی سناریوهای بحران مانع از تحمیل هزینه‌های سنگین غیرمنتظره می‌گردد.', 'universal-elementor-suite'),
                    ],
                    [
                        'story_title' => esc_html__('توسعه فردی', 'universal-elementor-suite'),
                        'story_image' => ['url' => 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=200'],
                        'story_content' => esc_html__('یادگیری پیوسته و بهره‌گیری از ابزارهای هوش مصنوعی موجب برتری رقابتی است.', 'universal-elementor-suite'),
                    ],
                ],
                'title_field' => '{{{ story_title }}}',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-story-bar-wrapper uas-widget-container" dir="rtl">
            <?php if (!empty($settings['bar_title'])) : ?>
                <div class="uas-story-header">
                    <span>⚡</span>
                    <span><?php echo esc_html($settings['bar_title']); ?></span>
                </div>
            <?php endif; ?>

            <div class="uas-story-scroll">
                <?php foreach ($settings['stories_list'] as $item) : ?>
                    <div class="uas-story-item" data-title="<?php echo esc_attr($item['story_title']); ?>" data-content="<?php echo esc_attr($item['story_content']); ?>">
                        <div class="uas-story-ring">
                            <img src="<?php echo esc_url($item['story_image']['url'] ?? ''); ?>" alt="<?php echo esc_attr($item['story_title']); ?>" class="uas-story-avatar" loading="lazy" />
                        </div>
                        <span class="uas-story-title"><?php echo esc_html($item['story_title']); ?></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
}
