<?php
namespace UniversalElementorSuite\Widgets;

use Elementor\Controls_Manager;
use Elementor\Repeater;
use UniversalElementorSuite\Universal_Widget_Base;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Split-Screen High-Converting Hero Widget (MPCA Compliant)
 *
 * Split-layout hero section with direct lead capture box, trust badge pills,
 * client social proof avatars, and comprehensive 3-tab native Elementor sidebar controls.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Universal_Hero_Split_Conversion_Widget extends Universal_Widget_Base {

    public function get_name() {
        return 'uas_hero_split';
    }

    public function get_title() {
        return esc_html__('هیرو بنر اسپلیت فرود و جذب لید (Split Hero)', 'universal-elementor-suite');
    }

    public function get_icon() {
        return 'eicon-split';
    }

    public function get_style_depends() {
        return ['uas-widgets-core', 'uas-hero-split-css'];
    }

    public function get_script_depends() {
        return ['uas-widgets-core', 'uas-hero-split-js'];
    }

    protected function register_controls() {
        // --- 1. TAB_CONTENT: Hero Content (Right Side) ---
        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('محتوای تیتر و پیشنهاد اصلی', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'badge_text',
            [
                'label'   => esc_html__('برچسب کوچک بالای تیتر', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXT,
                'default' => esc_html__('💎 معماری پیشرفته بدون کدنویسی', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'headline',
            [
                'label'   => esc_html__('تیتر بزرگ اصلی (H1)', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('طراحی وب‌سایت‌های حرفه‌ای در چند دقیقه، فراتر از قالب‌های آماده', 'universal-elementor-suite'),
            ]
        );

        $this->add_control(
            'description',
            [
                'label'   => esc_html__('توضیح ارزش پیشنهادی', 'universal-elementor-suite'),
                'type'    => Controls_Manager::TEXTAREA,
                'default' => esc_html__('با مجموعه‌ای کامل از ۲۶+ الگو و ویجت‌های فوق‌سریع المنتور، بدون نیاز به کدنویسی، وب‌سایت‌های مدرن، پرسرعت و امن بسازید.', 'universal-elementor-suite'),
            ]
        );

        $repeater_bullets = new Repeater();
        $repeater_bullets->add_control(
            'bullet_text',
            [
                'label'       => esc_html__('متن مزیت کلیدی', 'universal-elementor-suite'),
                'type'        => Controls_Manager::TEXT,
                'default'     => esc_html__('بارگذاری فوق‌سریع و بدون وابستگی به CDN خارجی (Zero-CDN)', 'universal-elementor-suite'),
                'label_block' => true,
            ]
        );

        $this->add_control(
            'bullets_list',
            [
                'label'       => esc_html__('مزایای کلیدی تیک‌دار', 'universal-elementor-suite'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater_bullets->get_controls(),
                'default'     => [
                    ['bullet_text' => esc_html__('بارگذاری فوق‌سریع با معماری Zero-CDN و هسته سبک PHP', 'universal-elementor-suite')],
                    ['bullet_text' => esc_html__('سایدبار ۳ تبه بومی المنتور برای تمام ویجت‌ها بدون پنل خارجی', 'universal-elementor-suite')],
                    ['bullet_text' => esc_html__('بسته‌های مستقل و قابل حمل (Portable) بدون قفل‌شدگی در قالب', 'universal-elementor-suite')],
                ],
                'title_field' => '✓ {{{ bullet_text }}}',
            ]
        );

        $this->end_controls_section();

        // --- 2. TAB_CONTENT: Lead Capture Card (Left Side) ---
        $this->start_controls_section(
            'section_lead_box',
            [
                'label' => esc_html__('باکس جذب لید و اقدام سریع', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control('lead_title', ['label' => esc_html__('تیتر باکس اقدام', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'دریافت مشاوره و پیش‌نمایش اختصاصی']);
        $this->add_control('lead_desc', ['label' => esc_html__('توضیح کوتاه زیر تیتر', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'شماره تماس خود را وارد نمایید تا کارشناسان ما ظرف کمتر از ۱۵ دقیقه با شما تماس بگیرند:']);
        $this->add_control('input_placeholder', ['label' => esc_html__('متن داخل فیلد شماره', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'شماره همراه خود را وارد کنید (مثلاً ۰۹۱۲...)']);
        $this->add_control('submit_btn_text', ['label' => esc_html__('متن دکمه ثبت', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => 'شروع رایگان و مشاوره فوری ⚡']);
        $this->add_control('trust_guarantee', ['label' => esc_html__('متن تضمین حریم خصوصی', 'universal-elementor-suite'), 'type' => Controls_Manager::TEXT, 'default' => '🔒 اطلاعات شما محفوظ است و هرگز به اشخاص ثالث واگذار نمی‌شود.']);

        $this->end_controls_section();

        // --- 3. TAB_STYLE: Styling ---
        $this->start_controls_section(
            'section_style_hero',
            [
                'label' => esc_html__('استایل و تایپوگرافی هیرو', 'universal-elementor-suite'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_typography_and_color_controls('hero_h1', esc_html__('تیتر اصلی', 'universal-elementor-suite'), '.uas-hero-split-h1', '#0F172A');
        $this->add_typography_and_color_controls('hero_p', esc_html__('توضیح', 'universal-elementor-suite'), '.uas-hero-split-desc', '#475569');
        $this->add_container_style_controls('lead_card', esc_html__('باکس لید', 'universal-elementor-suite'), '.uas-hero-lead-card');

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="uas-hero-split-container uas-widget-container" dir="rtl">
            <div class="uas-hero-split-grid">
                <!-- Content Column -->
                <div class="uas-hero-split-content">
                    <?php if (!empty($settings['badge_text'])) : ?>
                        <div class="uas-hero-badge-pill"><?php echo esc_html($settings['badge_text']); ?></div>
                    <?php endif; ?>

                    <h1 class="uas-hero-split-h1"><?php echo esc_html($settings['headline']); ?></h1>
                    <p class="uas-hero-split-desc"><?php echo esc_html($settings['description']); ?></p>

                    <ul class="uas-hero-bullets-list">
                        <?php foreach ($settings['bullets_list'] as $bullet) : ?>
                            <li>
                                <span class="uas-bullet-icon">✓</span>
                                <span><?php echo esc_html($bullet['bullet_text']); ?></span>
                            </li>
                        <?php endforeach; ?>
                    </ul>

                    <!-- Social Proof Avatar Stack -->
                    <div class="uas-hero-social-proof">
                        <div class="uas-avatar-stack">
                            <span class="uas-avatar-pill">👥</span>
                            <span class="uas-avatar-pill">⭐</span>
                            <span class="uas-avatar-pill">🏆</span>
                        </div>
                        <div class="uas-proof-text">
                            <strong>بیش از ۱,۵۰۰+ پروژه موفق</strong>
                            <span>مورد اعتماد توسعه‌دهندگان و طراحان برتر وردپرس</span>
                        </div>
                    </div>
                </div>

                <!-- Lead Capture Column -->
                <div class="uas-hero-split-lead">
                    <div class="uas-hero-lead-card">
                        <div class="uas-lead-card-head">
                            <span class="uas-lead-badge-pulse"></span>
                            <h3 class="uas-lead-title"><?php echo esc_html($settings['lead_title']); ?></h3>
                        </div>
                        <p class="uas-lead-desc"><?php echo esc_html($settings['lead_desc']); ?></p>

                        <form class="uas-hero-lead-form" onsubmit="event.preventDefault(); this.classList.add('is-submitted');">
                            <div class="uas-form-group">
                                <input type="tel" class="uas-form-input" placeholder="<?php echo esc_attr($settings['input_placeholder']); ?>" required pattern="[0-9\u06F0-\u06F9+]{10,14}" />
                            </div>
                            <button type="submit" class="uas-form-submit-btn">
                                <?php echo esc_html($settings['submit_btn_text']); ?>
                            </button>
                            <div class="uas-form-success-msg">
                                ✓ درخواست شما با موفقیت ثبت شد؛ کارشناسان به زودی تماس می‌گیرند.
                            </div>
                        </form>

                        <div class="uas-lead-guarantee">
                            <?php echo esc_html($settings['trust_guarantee']); ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
}
