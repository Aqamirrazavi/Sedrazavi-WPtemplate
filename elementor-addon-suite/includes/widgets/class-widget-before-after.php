<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Before / After Image Comparison Slider Widget
 */
class Universal_Before_After_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_before_after';
    }

    public function get_title() {
        return esc_html__('اسلایدر مقایسه قبل و بعد (Before / After)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-image-before-after';
    }

    public function get_style_depends() {
        return ['uas-widgets-core'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('تصاویر و برچسب‌های مقایسه', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'before_image',
            [
                'label'   => esc_html__('تصویر قبل (Before)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
                ],
            ]
        );

        $this->add_control(
            'after_image',
            [
                'label'   => esc_html__('تصویر بعد (After)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url' => 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&q=80&w=800',
                ],
            ]
        );

        $this->add_control(
            'before_label',
            [
                'label'   => esc_html__('متن برچسب قبل', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'وضعیت قبلی',
            ]
        );

        $this->add_control(
            'after_label',
            [
                'label'   => esc_html__('متن برچسب بعد', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => 'نتیجه بهینه‌سازی',
            ]
        );

        $this->add_control(
            'initial_position',
            [
                'label'   => esc_html__('موقعیت اولیه اسلایدر (درصد)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SLIDER,
                'default' => ['size' => 50],
                'range'   => ['px' => ['min' => 10, 'max' => 90]],
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_style',
            [
                'label' => esc_html__('تنظیمات استایل', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'handle_color',
            [
                'label'     => esc_html__('رنگ دسته اسلایدر', 'universal-elementor-suite'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '#8B5CF6',
                'selectors' => [
                    '{{WRAPPER}} .uas-ba-handle' => 'background: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $widget_id = $this->get_id();
        $pos = !empty($settings['initial_position']['size']) ? (int)$settings['initial_position']['size'] : 50;
        $before_url = !empty($settings['before_image']['url']) ? esc_url($settings['before_image']['url']) : '';
        $after_url = !empty($settings['after_image']['url']) ? esc_url($settings['after_image']['url']) : '';
        ?>
        <div class="uas-ba-container" id="uas-ba-<?php echo esc_attr($widget_id); ?>" style="position:relative; width:100%; max-width:800px; margin:auto; overflow:hidden; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.15); user-select:none; aspect-ratio:16/9; background:#0f172a;">
            
            <!-- After Image (Background) -->
            <img src="<?php echo $after_url; ?>" alt="After" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; pointer-events:none;">
            <span style="position:absolute; bottom:16px; left:16px; background:rgba(0,0,0,0.65); color:#fff; font-size:12px; font-weight:700; padding:4px 12px; border-radius:6px; backdrop-filter:blur(4px); pointer-events:none; z-index:2;">
                <?php echo esc_html($settings['after_label']); ?>
            </span>

            <!-- Before Image (Clipped Overlay) -->
            <div class="uas-ba-before" style="position:absolute; top:0; left:0; width:<?php echo $pos; ?>%; height:100%; overflow:hidden; z-index:3;">
                <img src="<?php echo $before_url; ?>" alt="Before" style="position:absolute; top:0; left:0; width:800px; max-width:none; height:100%; object-fit:cover; pointer-events:none;">
                <span style="position:absolute; bottom:16px; right:16px; background:rgba(0,0,0,0.65); color:#fff; font-size:12px; font-weight:700; padding:4px 12px; border-radius:6px; backdrop-filter:blur(4px); pointer-events:none;">
                    <?php echo esc_html($settings['before_label']); ?>
                </span>
            </div>

            <!-- Draggable Handle Divider -->
            <div class="uas-ba-handle" style="position:absolute; top:0; bottom:0; left:<?php echo $pos; ?>%; width:4px; background:#8B5CF6; z-index:4; cursor:ew-resize; transform:translateX(-50%);">
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:36px; height:36px; border-radius:50%; background:#8B5CF6; color:#fff; display:flex; align-items:center; justify-content:center; box-shadow:0 0 12px rgba(0,0,0,0.3); font-size:14px; font-weight:bold;">
                    ⇄
                </div>
            </div>

            <!-- Native Range Input for seamless Dragging / Accessibility -->
            <input type="range" min="0" max="100" value="<?php echo $pos; ?>" class="uas-ba-range" oninput="uasUpdateBA('<?php echo esc_attr($widget_id); ?>', this.value)" style="position:absolute; top:0; left:0; width:100%; height:100%; opacity:0; cursor:ew-resize; z-index:5; margin:0;">
        </div>

        <script>
        function uasUpdateBA(id, val) {
            var container = document.getElementById('uas-ba-' + id);
            if (!container) return;
            var before = container.querySelector('.uas-ba-before');
            var handle = container.querySelector('.uas-ba-handle');
            if (before) before.style.width = val + '%';
            if (handle) handle.style.left = val + '%';
            var beforeImg = before ? before.querySelector('img') : null;
            if (beforeImg) beforeImg.style.width = container.offsetWidth + 'px';
        }
        window.addEventListener('resize', function(){
            var el = document.getElementById('uas-ba-<?php echo esc_attr($widget_id); ?>');
            if (el) {
                var range = el.querySelector('.uas-ba-range');
                if (range) uasUpdateBA('<?php echo esc_attr($widget_id); ?>', range.value);
            }
        });
        </script>
        <?php
    }
}
