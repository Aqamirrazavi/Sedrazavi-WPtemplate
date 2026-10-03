<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Team Members Showcase Widget
 */
class Universal_Team_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_team';
    }

    public function get_title() {
        return esc_html__('معرفی اعضای تیم و متخصصان', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-person';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-team-css'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('اعضای تیم', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'columns',
            [
                'label'   => esc_html__('تعداد ستون‌ها', 'universal-elementor-suite'),
                'type'    => Controls_Manager::SELECT,
                'default' => '3',
                'options' => [
                    '2' => esc_html__('۲ ستون', 'universal-elementor-suite'),
                    '3' => esc_html__('۳ ستون', 'universal-elementor-suite'),
                    '4' => esc_html__('۴ ستون', 'universal-elementor-suite'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .uas-team-grid' => '--uas-team-cols: {{VALUE}};',
                ],
            ]
        );

        $repeater = new Repeater();

        $repeater->add_control(
            'name',
            [
                'label'       => esc_html__('نام و نام خانوادگی', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('دکتر سارا شمس', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $repeater->add_control(
            'role',
            [
                'label'   => esc_html__('سمت یا تخصص', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('مدیر ارشد محصول و استراتژیست', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'bio',
            [
                'label'   => esc_html__('معرفی کوتاه', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('بیش از ۱۲ سال تجربه در رهبری تیم‌های فنی و هدایت پروژه‌های بین‌المللی مقیاس‌پذیر.', 'universal-elementor-suite'),
            ]
        );

        $repeater->add_control(
            'photo',
            [
                'label'   => esc_html__('تصویر چهره', 'universal-elementor-suite'),
                'type'    => Controls_Manager::MEDIA,
                'default' => [
                    'url' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
                ],
            ]
        );

        $this->add_control(
            'team_list',
            [
                'label'       => esc_html__('لیست اعضا', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'default'     => [
                    [
                        'name'  => esc_html__('دکتر سارا شمس', 'universal-elementor-suite'),
                        'role'  => esc_html__('مدیر ارشد محصول و استراتژیست', 'universal-elementor-suite'),
                        'bio'   => esc_html__('بیش از ۱۲ سال تجربه در رهبری تیم‌های فنی و هدایت پروژه‌های بین‌المللی مقیاس‌پذیر.', 'universal-elementor-suite'),
                        'photo' => ['url' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'],
                    ],
                    [
                        'name'  => esc_html__('مهندس رضا علوی', 'universal-elementor-suite'),
                        'role'  => esc_html__('راهبر ارشد معماری سیستم', 'universal-elementor-suite'),
                        'bio'   => esc_html__('متخصص طراحی پایگاه‌های داده توزیع‌شده، امنیت سایبری و بهینه‌سازی زیرساخت‌های ابری.', 'universal-elementor-suite'),
                        'photo' => ['url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'],
                    ],
                    [
                        'name'  => esc_html__('رویا معتمدی', 'universal-elementor-suite'),
                        'role'  => esc_html__('مدیر ارتباط با مشتریان و توسعه بازار', 'universal-elementor-suite'),
                        'bio'   => esc_html__('دارای سوابق درخشان در تدوین راهبردهای افزایش رضایت ذی‌نفعان و گسترش بازارهای صادراتی.', 'universal-elementor-suite'),
                        'photo' => ['url' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300'],
                    ],
                ],
                'title_field' => '{{{ name }}} ({{{ role }}})',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-team-wrapper uas-widget-container" dir="rtl">
            <div class="uas-team-grid">
                <?php foreach ($settings['team_list'] as $item) : ?>
                    <div class="uas-team-card">
                        <?php if (!empty($item['photo']['url'])) : ?>
                            <img src="<?php echo esc_url($item['photo']['url']); ?>" alt="<?php echo esc_attr($item['name']); ?>" class="uas-team-photo" loading="lazy" />
                        <?php endif; ?>
                        <h3 class="uas-team-name"><?php echo esc_html($item['name']); ?></h3>
                        <span class="uas-team-role"><?php echo esc_html($item['role']); ?></span>
                        <p class="uas-team-bio"><?php echo esc_html($item['bio']); ?></p>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
}
