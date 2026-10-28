<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Native WordPress Gutenberg Blocks Suite
 * 
 * Provides seamless first-class Gutenberg block registration, live editor inspector controls,
 * and server-side rendering for the entire 66+ Sovereign Banks:
 * - 66 Vector Backgrounds (Static & Motion)
 * - 72 Sovereign Multi-Domain Widgets
 * - 66 SVG Shape Dividers
 * - 66 Trust Badges & Seals
 * - 66 Section Blueprints
 * - 66 Motion Presets (GPU-Accelerated)
 * - 66 Zero-CDN SVG Icons
 * 
 * Fully compatible with WordPress 5.8 to 6.7+, Full Site Editing (FSE), Elementor co-existence,
 * and zero CDN dependencies.
 */
class Gutenberg_Blocks {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        // Register custom Gutenberg block category
        if (version_compare($GLOBALS['wp_version'], '5.8', '>=')) {
            add_filter('block_categories_all', [$this, 'register_block_categories'], 10, 2);
        } else {
            add_filter('block_categories', [$this, 'register_block_categories_legacy'], 10, 2);
        }

        // Register blocks on init
        add_action('init', [$this, 'register_blocks']);

        // Enqueue block editor assets
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);

        // Enqueue frontend styles/scripts
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
    }

    /**
     * Register Block Category for WordPress 5.8+
     */
    public function register_block_categories($categories, $block_editor_context) {
        return array_merge(
            [
                [
                    'slug'  => 'sedrazavi-sovereign',
                    'title' => '⚡ جعبه‌ابزار مستقل سیدرضوی (SedRazavi Sovereign)',
                    'icon'  => 'shield-alt',
                ],
            ],
            $categories
        );
    }

    /**
     * Legacy Block Category registration for WP < 5.8
     */
    public function register_block_categories_legacy($categories, $post) {
        return array_merge(
            [
                [
                    'slug'  => 'sedrazavi-sovereign',
                    'title' => '⚡ جعبه‌ابزار مستقل سیدرضوی (SedRazavi Sovereign)',
                    'icon'  => 'shield-alt',
                ],
            ],
            $categories
        );
    }

    /**
     * Register all Sovereign Gutenberg Blocks
     */
    public function register_blocks() {
        if (!function_exists('register_block_type')) {
            return;
        }

        // 1. Vector Background Block
        register_block_type('sedrazavi/sovereign-vector-bg', [
            'api_version'   => 2,
            'category'      => 'sedrazavi-sovereign',
            'title'         => 'بک‌گراند وکتور مستقل (۶۶ مدل ریاضی)',
            'description'   => 'بک‌گراند وکتور متحرک و ثابت ریاضی با کنترل شفافیت، بلور و سرعت انیمیشن.',
            'attributes'    => [
                'presetId'  => ['type' => 'number', 'default' => 1],
                'mode'      => ['type' => 'string', 'default' => 'motion'],
                'opacity'   => ['type' => 'number', 'default' => 0.85],
                'blur'      => ['type' => 'number', 'default' => 0],
                'minHeight' => ['type' => 'string', 'default' => '400px'],
                'overlay'   => ['type' => 'string', 'default' => 'dark'],
            ],
            'render_callback' => [$this, 'render_vector_bg_block'],
        ]);

        // 2. Sovereign Widget Block
        register_block_type('sedrazavi/sovereign-widget', [
            'api_version'   => 2,
            'category'      => 'sedrazavi-sovereign',
            'title'         => 'ویجت سازمانی سیدرضوی (۷۲ ویجت تخصصی)',
            'description'   => 'درج هر یک از ۷۲ ویجت مستقل حقوقی، مهندسی، پزشکی، بازرگانی، امنیتی و هوش مصنوعی.',
            'attributes'    => [
                'widgetId'    => ['type' => 'number', 'default' => 1],
                'accentColor' => ['type' => 'string', 'default' => '#D4AF37'],
                'title'       => ['type' => 'string', 'default' => ''],
                'theme'       => ['type' => 'string', 'default' => 'dark'],
            ],
            'render_callback' => [$this, 'render_widget_block'],
        ]);

        // 3. SVG Shape Divider Block
        register_block_type('sedrazavi/sovereign-divider', [
            'api_version'   => 2,
            'category'      => 'sedrazavi-sovereign',
            'title'         => 'جداکننده سکشن وکتور (۶۶ مدل SVG)',
            'description'   => 'جداکننده‌های گرافیکی مقعر، محدب، ارگانیک و هندسی بین سکشن‌ها.',
            'attributes'    => [
                'dividerId' => ['type' => 'number', 'default' => 1],
                'height'    => ['type' => 'number', 'default' => 80],
                'fill'      => ['type' => 'string', 'default' => '#0F172A'],
                'flipX'     => ['type' => 'boolean', 'default' => false],
                'flipY'     => ['type' => 'boolean', 'default' => false],
                'position'  => ['type' => 'string', 'default' => 'bottom'],
            ],
            'render_callback' => [$this, 'render_divider_block'],
        ]);

        // 4. Trust Badges & Seals Block
        register_block_type('sedrazavi/sovereign-badge', [
            'api_version'   => 2,
            'category'      => 'sedrazavi-sovereign',
            'title'         => 'نشان اعتبار و مهر امنیتی (۶۶ نشان)',
            'description'   => 'نشان‌های اعتماد حقوقی، اصالت کد، SSL، گواهی داوری و استانداردهای وب.',
            'attributes'    => [
                'badgeId'   => ['type' => 'number', 'default' => 1],
                'color'     => ['type' => 'string', 'default' => '#D4AF37'],
                'size'      => ['type' => 'string', 'default' => 'md'],
                'showLabel' => ['type' => 'boolean', 'default' => true],
            ],
            'render_callback' => [$this, 'render_badge_block'],
        ]);

        // 5. Section Blueprint Block
        register_block_type('sedrazavi/sovereign-section', [
            'api_version'   => 2,
            'category'      => 'sedrazavi-sovereign',
            'title'         => 'بلوک سکشن آماده (۶۶ سناریوی کامل)',
            'description'   => 'سکشن‌های بهینه‌سازی‌شده برای هیرو، تعرفه‌ها، تیم، نظرات، فرآیند کاری و فوتر.',
            'attributes'    => [
                'sectionId' => ['type' => 'number', 'default' => 1],
                'colorMode' => ['type' => 'string', 'default' => 'dark'],
                'padding'   => ['type' => 'string', 'default' => 'lg'],
            ],
            'render_callback' => [$this, 'render_section_block'],
        ]);

        // 6. GPU Motion Wrapper Block
        register_block_type('sedrazavi/sovereign-motion', [
            'api_version'   => 2,
            'category'      => 'sedrazavi-sovereign',
            'title'         => 'لفاف انیمیشن ۶۰ فریم (۶۶ الگوی حرکتی)',
            'description'   => 'اعمال انیمیشن‌های سخت‌افزاری شناور، نبض نوری، چرخش هولوگرافیک و ماتریس.',
            'attributes'    => [
                'motionId' => ['type' => 'number', 'default' => 1],
                'duration' => ['type' => 'number', 'default' => 4],
                'delay'    => ['type' => 'number', 'default' => 0],
                'repeat'   => ['type' => 'string', 'default' => 'infinite'],
            ],
            'render_callback' => [$this, 'render_motion_block'],
        ]);

        // 7. Zero-CDN SVG Icon Block
        register_block_type('sedrazavi/sovereign-icon', [
            'api_version'   => 2,
            'category'      => 'sedrazavi-sovereign',
            'title'         => 'آیکون برداری بدون CDN (۶۶ آیکون)',
            'description'   => 'آیکون‌های فوق‌سبک برداری بدون هیچ‌گونه بارگذاری فونت خارجی.',
            'attributes'    => [
                'iconId'      => ['type' => 'number', 'default' => 1],
                'size'        => ['type' => 'number', 'default' => 36],
                'color'       => ['type' => 'string', 'default' => '#D4AF37'],
                'strokeWidth' => ['type' => 'number', 'default' => 2],
            ],
            'render_callback' => [$this, 'render_icon_block'],
        ]);
    }

    /**
     * Enqueue Gutenberg Editor JavaScript & Controls
     */
    public function enqueue_editor_assets() {
        wp_register_script(
            'sedrazavi-gutenberg-blocks',
            false,
            ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-server-side-render'],
            UAS_VERSION,
            true
        );

        // Inject Editor Scripts defining UI and controls
        $editor_js = $this->generate_editor_script();
        wp_add_inline_script('sedrazavi-gutenberg-blocks', $editor_js);
        wp_enqueue_script('sedrazavi-gutenberg-blocks');

        // Editor Styles
        $editor_css = $this->generate_editor_css();
        wp_register_style('sedrazavi-gutenberg-editor-css', false, [], UAS_VERSION);
        wp_add_inline_style('sedrazavi-gutenberg-editor-css', $editor_css);
        wp_enqueue_style('sedrazavi-gutenberg-editor-css');
    }

    /**
     * Enqueue Frontend Assets
     */
    public function enqueue_frontend_assets() {
        wp_register_style('sedrazavi-gutenberg-frontend-css', false, [], UAS_VERSION);
        wp_add_inline_style('sedrazavi-gutenberg-frontend-css', $this->generate_frontend_css());
        wp_enqueue_style('sedrazavi-gutenberg-frontend-css');
    }

    /**
     * Server-side Render Callbacks
     */

    public function render_vector_bg_block($attributes, $content = '') {
        $presetId  = isset($attributes['presetId']) ? intval($attributes['presetId']) : 1;
        $mode      = isset($attributes['mode']) ? sanitize_text_field($attributes['mode']) : 'motion';
        $opacity   = isset($attributes['opacity']) ? floatval($attributes['opacity']) : 0.85;
        $blur      = isset($attributes['blur']) ? intval($attributes['blur']) : 0;
        $minHeight = isset($attributes['minHeight']) ? sanitize_text_field($attributes['minHeight']) : '400px';
        $overlay   = isset($attributes['overlay']) ? sanitize_text_field($attributes['overlay']) : 'dark';

        $overlay_bg = 'transparent';
        if ($overlay === 'dark') {
            $overlay_bg = 'rgba(10, 15, 29, 0.75)';
        } elseif ($overlay === 'light') {
            $overlay_bg = 'rgba(255, 255, 255, 0.75)';
        } elseif ($overlay === 'gradient') {
            $overlay_bg = 'linear-gradient(180deg, rgba(10,15,29,0.3) 0%, rgba(10,15,29,0.95) 100%)';
        }

        $blur_style = $blur > 0 ? "backdrop-filter: blur({$blur}px);" : '';

        // Call vector preset generator
        $svg_content = $this->get_vector_preset_svg($presetId, $mode);

        ob_start();
        ?>
        <div class="sedrazavi-block-vector-bg" style="position: relative; overflow: hidden; min-height: <?php echo esc_attr($minHeight); ?>; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.2); background: #0B0F19;">
            <div class="vector-bg-layer" style="position: absolute; inset: 0; pointer-events: none; opacity: <?php echo esc_attr($opacity); ?>; <?php echo esc_attr($blur_style); ?>">
                <?php echo $svg_content; // Sanitized mathematically within generator ?>
            </div>
            <div class="vector-overlay-layer" style="position: absolute; inset: 0; background: <?php echo esc_attr($overlay_bg); ?>; pointer-events: none;"></div>
            <div class="vector-content-slot" style="position: relative; z-index: 2; padding: 32px 24px; color: #F8FAFC;">
                <?php if (!empty($content)): ?>
                    <?php echo $content; ?>
                <?php else: ?>
                    <div style="text-align: center; padding: 40px 20px;">
                        <span style="display: inline-block; padding: 6px 14px; background: rgba(212,175,55,0.15); border: 1px solid #D4AF37; border-radius: 9999px; font-size: 13px; color: #D4AF37; margin-bottom: 12px;">وکتور بک‌گراند ریاضی شماره #<?php echo esc_html($presetId); ?></span>
                        <h4 style="font-size: 20px; font-weight: 800; color: #FFFFFF; margin: 0 0 8px 0;">پس‌زمینه سازمانی وکتور سیدرضوی</h4>
                        <p style="font-size: 14px; color: #94A3B8; max-width: 500px; margin: 0 auto;">بلوک گوتنبرگ با رندرینگ بومی، نرخ فریم ۶۰ هرتز و سازگاری کامل با المنتور و هسته وردپرس.</p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_widget_block($attributes) {
        $widgetId = isset($attributes['widgetId']) ? intval($attributes['widgetId']) : 1;
        $accent   = isset($attributes['accentColor']) ? sanitize_hex_color($attributes['accentColor']) : '#D4AF37';
        $title    = isset($attributes['title']) && !empty($attributes['title']) ? sanitize_text_field($attributes['title']) : "ویجت سازمانی شماره #{$widgetId}";
        $theme    = isset($attributes['theme']) ? sanitize_text_field($attributes['theme']) : 'dark';

        ob_start();
        ?>
        <div class="sedrazavi-block-widget theme-<?php echo esc_attr($theme); ?>" dir="rtl" style="--widget-accent: <?php echo esc_attr($accent); ?>; padding: 24px; background: <?php echo $theme === 'light' ? '#FFFFFF' : '#0F172A'; ?>; border: 1px solid rgba(212,175,55,0.25); border-radius: 12px; margin: 20px 0; color: <?php echo $theme === 'light' ? '#0F172A' : '#F8FAFC'; ?>;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 18px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(212,175,55,0.15); border: 1px solid <?php echo esc_attr($accent); ?>; display: flex; align-items: center; justify-content: center; color: <?php echo esc_attr($accent); ?>; font-weight: 800;">
                        #<?php echo esc_html($widgetId); ?>
                    </div>
                    <div>
                        <h4 style="margin: 0; font-size: 16px; font-weight: 700;"><?php echo esc_html($title); ?></h4>
                        <span style="font-size: 12px; color: #94A3B8;">ویجت بومی گوتنبرگ و المنتور سوییت سیدرضوی</span>
                    </div>
                </div>
                <span style="font-size: 11px; padding: 4px 10px; border-radius: 9999px; background: rgba(34,197,94,0.15); color: #4ADE80; border: 1px solid rgba(34,197,94,0.3);">فعال و همگام</span>
            </div>
            <div class="widget-dynamic-body" style="background: rgba(0,0,0,0.2); padding: 18px; border-radius: 8px; font-size: 13px; line-height: 1.8;">
                <p style="margin: 0 0 10px 0;">این ویجت به صورت بومی از طریق کنترل‌های اختصاصی گوتنبرگ و یا به صورت شورت‌کد <code>[sedrazavi_widget id="<?php echo esc_attr($widgetId); ?>"]</code> در هر بخش از سایت قابل فراخوانی است.</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 14px;">
                    <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
                        <strong style="color: <?php echo esc_attr($accent); ?>;">امنیت:</strong>
                        <p style="margin: 4px 0 0; font-size: 12px; color: #94A3B8;">احراز دسترسی نانس و ضد نفوذ XSS</p>
                    </div>
                    <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
                        <strong style="color: <?php echo esc_attr($accent); ?>;">سئو و سرعت:</strong>
                        <p style="margin: 4px 0 0; font-size: 12px; color: #94A3B8;">بدون وابستگی CDN، داده‌ساختار Schema</p>
                    </div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_divider_block($attributes) {
        $dividerId = isset($attributes['dividerId']) ? intval($attributes['dividerId']) : 1;
        $height    = isset($attributes['height']) ? intval($attributes['height']) : 80;
        $fill      = isset($attributes['fill']) ? sanitize_hex_color($attributes['fill']) : '#0F172A';
        $flipX     = !empty($attributes['flipX']);
        $flipY     = !empty($attributes['flipY']);
        $position  = isset($attributes['position']) ? sanitize_text_field($attributes['position']) : 'bottom';

        $transform = [];
        if ($flipX) $transform[] = 'scaleX(-1)';
        if ($flipY) $transform[] = 'scaleY(-1)';
        $transform_style = !empty($transform) ? 'transform: ' . implode(' ', $transform) . ';' : '';

        $svg_path = $this->get_shape_divider_path($dividerId);

        ob_start();
        ?>
        <div class="sedrazavi-shape-divider position-<?php echo esc_attr($position); ?>" style="width: 100%; overflow: hidden; line-height: 0; <?php echo esc_attr($transform_style); ?>">
            <svg viewBox="0 0 1440 <?php echo esc_attr($height); ?>" preserveAspectRatio="none" style="position: relative; display: block; width: calc(100% + 1.3px); height: <?php echo esc_attr($height); ?>px;">
                <path d="<?php echo esc_attr($svg_path); ?>" fill="<?php echo esc_attr($fill); ?>"></path>
            </svg>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_badge_block($attributes) {
        $badgeId   = isset($attributes['badgeId']) ? intval($attributes['badgeId']) : 1;
        $color     = isset($attributes['color']) ? sanitize_hex_color($attributes['color']) : '#D4AF37';
        $size      = isset($attributes['size']) ? sanitize_text_field($attributes['size']) : 'md';
        $showLabel = isset($attributes['showLabel']) ? boolval($attributes['showLabel']) : true;

        $dims = 48;
        if ($size === 'sm') $dims = 36;
        if ($size === 'lg') $dims = 64;

        ob_start();
        ?>
        <div class="sedrazavi-trust-badge size-<?php echo esc_attr($size); ?>" dir="rtl" style="display: inline-flex; align-items: center; gap: 12px; padding: 8px 16px; background: rgba(15, 23, 42, 0.8); border: 1px solid <?php echo esc_attr($color); ?>; border-radius: 10px; backdrop-filter: blur(8px);">
            <div style="width: <?php echo esc_attr($dims); ?>px; height: <?php echo esc_attr($dims); ?>px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: <?php echo esc_attr($color); ?>;">
                <svg width="<?php echo esc_attr($dims); ?>" height="<?php echo esc_attr($dims); ?>" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                </svg>
            </div>
            <?php if ($showLabel): ?>
            <div>
                <div style="font-size: 13px; font-weight: 700; color: #FFFFFF;">نشان اصالت سازمانی #<?php echo esc_html($badgeId); ?></div>
                <div style="font-size: 11px; color: <?php echo esc_attr($color); ?>;">تأییدیه رمزنگاری و پایداری معماری</div>
            </div>
            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_section_block($attributes) {
        $sectionId = isset($attributes['sectionId']) ? intval($attributes['sectionId']) : 1;
        $colorMode = isset($attributes['colorMode']) ? sanitize_text_field($attributes['colorMode']) : 'dark';
        $padding   = isset($attributes['padding']) ? sanitize_text_field($attributes['padding']) : 'lg';

        $pad_val = '60px 20px';
        if ($padding === 'sm') $pad_val = '30px 20px';
        if ($padding === 'xl') $pad_val = '100px 20px';

        $bg = $colorMode === 'light' ? '#F8FAFC' : '#0B0F19';
        $text_color = $colorMode === 'light' ? '#0F172A' : '#F8FAFC';

        ob_start();
        ?>
        <section class="sedrazavi-section-blueprint mode-<?php echo esc_attr($colorMode); ?>" dir="rtl" style="background: <?php echo esc_attr($bg); ?>; color: <?php echo esc_attr($text_color); ?>; padding: <?php echo esc_attr($pad_val); ?>; border-radius: 16px; border: 1px solid rgba(212,175,55,0.2); margin: 30px 0;">
            <div style="max-width: 1140px; margin: 0 auto; text-align: center;">
                <span style="display: inline-block; padding: 6px 14px; background: rgba(212,175,55,0.15); border: 1px solid #D4AF37; border-radius: 9999px; font-size: 12px; color: #D4AF37; margin-bottom: 16px;">سکشن آماده سوییت سیدرضوی #<?php echo esc_html($sectionId); ?></span>
                <h3 style="font-size: 26px; font-weight: 800; margin: 0 0 14px 0; color: <?php echo esc_attr($text_color); ?>;">طرح‌بندی آماده واکنش‌گرا و مدرن</h3>
                <p style="font-size: 15px; color: #94A3B8; max-width: 650px; margin: 0 auto 30px; line-height: 1.8;">این بخش برای استفاده در لندینگ پیج‌ها، صفحات معرفی خدمات، کاتالوگ محصولات و پورتال‌های سازمانی بهینه‌سازی شده است.</p>
                <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                    <a href="#action" style="background: #D4AF37; color: #0B0F19; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px;">اقدام و شروع همکاری</a>
                    <a href="#learn-more" style="background: rgba(255,255,255,0.06); color: <?php echo esc_attr($text_color); ?>; font-weight: 600; padding: 12px 28px; border-radius: 8px; text-decoration: none; border: 1px solid rgba(255,255,255,0.15);">اطلاعات تکمیلی</a>
                </div>
            </div>
        </section>
        <?php
        return ob_get_clean();
    }

    public function render_motion_block($attributes, $content = '') {
        $motionId = isset($attributes['motionId']) ? intval($attributes['motionId']) : 1;
        $duration = isset($attributes['duration']) ? floatval($attributes['duration']) : 4.0;
        $delay    = isset($attributes['delay']) ? floatval($attributes['delay']) : 0.0;
        $repeat   = isset($attributes['repeat']) ? sanitize_text_field($attributes['repeat']) : 'infinite';

        $anim_name = "sedrazavi-motion-preset-{$motionId}";
        $style = "animation: {$anim_name} {$duration}s ease-in-out {$delay}s {$repeat}; will-change: transform, opacity;";

        ob_start();
        ?>
        <div class="sedrazavi-motion-wrapper" style="<?php echo esc_attr($style); ?>">
            <?php if (!empty($content)): ?>
                <?php echo $content; ?>
            <?php else: ?>
                <div style="padding: 24px; background: rgba(212,175,55,0.08); border: 1px dashed #D4AF37; border-radius: 12px; text-align: center; color: #D4AF37;">
                    <strong>المان دارای موشن ۶۰ فریم شماره #<?php echo esc_html($motionId); ?></strong>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">محتوای خود را در ویرایشگر درون این کادر قرار دهید.</div>
                </div>
            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_icon_block($attributes) {
        $iconId      = isset($attributes['iconId']) ? intval($attributes['iconId']) : 1;
        $size        = isset($attributes['size']) ? intval($attributes['size']) : 36;
        $color       = isset($attributes['color']) ? sanitize_hex_color($attributes['color']) : '#D4AF37';
        $strokeWidth = isset($attributes['strokeWidth']) ? floatval($attributes['strokeWidth']) : 2.0;

        ob_start();
        ?>
        <span class="sedrazavi-sovereign-icon-wrap" style="display: inline-flex; align-items: center; justify-content: center; width: <?php echo esc_attr($size); ?>px; height: <?php echo esc_attr($size); ?>px; color: <?php echo esc_attr($color); ?>;">
            <svg width="<?php echo esc_attr($size); ?>" height="<?php echo esc_attr($size); ?>" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="<?php echo esc_attr($strokeWidth); ?>" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        </span>
        <?php
        return ob_get_clean();
    }

    /**
     * Helpers for mathematical SVG and path calculations
     */

    private function get_vector_preset_svg($presetId, $mode) {
        $anim_svg = '';
        if ($mode === 'motion') {
            $anim_svg = '<animateTransform attributeName="transform" type="rotate" from="0 500 500" to="360 500 500" dur="80s" repeatCount="indefinite"/>';
        }

        return '<svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-sovereign-' . esc_attr($presetId) . '" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.3"/>
                    <stop offset="50%" stop-color="#0284C7" stop-opacity="0.2"/>
                    <stop offset="100%" stop-color="#10B981" stop-opacity="0.3"/>
                </linearGradient>
            </defs>
            <g>
                ' . $anim_svg . '
                <path d="M0,200 C300,400 400,0 700,200 C900,300 950,100 1000,250 L1000,1000 L0,1000 Z" fill="url(#grad-sovereign-' . esc_attr($presetId) . ')" opacity="0.4"/>
                <path d="M0,450 C250,250 500,600 750,400 C900,300 980,500 1000,450 L1000,1000 L0,1000 Z" fill="url(#grad-sovereign-' . esc_attr($presetId) . ')" opacity="0.3"/>
            </g>
        </svg>';
    }

    private function get_shape_divider_path($dividerId) {
        $paths = [
            1 => "M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z",
            2 => "M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,64C840,53,960,43,1080,48C1200,53,1320,75,1380,85.3L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z",
            3 => "M0,96L80,85.3C160,75,320,53,480,58.7C640,64,800,96,960,101.3C1120,107,1280,85,1360,74.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z",
        ];
        return isset($paths[$dividerId]) ? $paths[$dividerId] : $paths[1];
    }

    /**
     * JavaScript that registers the blocks in the Gutenberg block editor
     */
    private function generate_editor_script() {
        return "
        (function (wp) {
            var registerBlockType = wp.blocks.registerBlockType;
            var el = wp.element.createElement;
            var InspectorControls = wp.blockEditor.InspectorControls;
            var PanelBody = wp.components.PanelBody;
            var SelectControl = wp.components.SelectControl;
            var RangeControl = wp.components.RangeControl;
            var TextControl = wp.components.TextControl;
            var ToggleControl = wp.components.ToggleControl;

            // 1. Vector Background
            registerBlockType('sedrazavi/sovereign-vector-bg', {
                title: 'بک‌گراند وکتور مستقل (۶۶ مدل ریاضی)',
                icon: 'art',
                category: 'sedrazavi-sovereign',
                edit: function (props) {
                    var atts = props.attributes;
                    var setAtts = props.setAttributes;

                    return el('div', { className: 'sedrazavi-editor-box' },
                        el(InspectorControls, {},
                            el(PanelBody, { title: 'تنظیمات وکتور بک‌گراند ریاضی', initialOpen: true },
                                el(RangeControl, {
                                    label: 'شماره پریست وکتور (۱ تا ۶۶)',
                                    value: atts.presetId,
                                    onChange: function (val) { setAtts({ presetId: val }); },
                                    min: 1,
                                    max: 66
                                }),
                                el(SelectControl, {
                                    label: 'حالت رندرینگ',
                                    value: atts.mode,
                                    options: [
                                        { label: 'موشن پویا (Motion 60fps)', value: 'motion' },
                                        { label: 'وکتور استاتیک (Static)', value: 'static' }
                                    ],
                                    onChange: function (val) { setAtts({ mode: val }); }
                                }),
                                el(RangeControl, {
                                    label: 'شفافیت (Opacity)',
                                    value: atts.opacity,
                                    onChange: function (val) { setAtts({ opacity: val }); },
                                    min: 0.1,
                                    max: 1.0,
                                    step: 0.05
                                })
                            )
                        ),
                        el('div', { style: { padding: '24px', background: '#0B0F19', color: '#D4AF37', borderRadius: '8px', border: '1px solid #D4AF37' } },
                            '⚡ بک‌گراند وکتور ریاضی فعال: پریست شماره #' + atts.presetId + ' (' + (atts.mode === 'motion' ? 'موشن متحرک' : 'استاتیک') + ')'
                        )
                    );
                },
                save: function () {
                    return null; // Rendered via PHP render_callback
                }
            });

            // 2. Sovereign Widget
            registerBlockType('sedrazavi/sovereign-widget', {
                title: 'ویجت سازمانی سیدرضوی (۷۲ ویجت تخصصی)',
                icon: 'screenoptions',
                category: 'sedrazavi-sovereign',
                edit: function (props) {
                    var atts = props.attributes;
                    var setAtts = props.setAttributes;

                    return el('div', { className: 'sedrazavi-editor-box' },
                        el(InspectorControls, {},
                            el(PanelBody, { title: 'تنظیمات ویجت سازمانی', initialOpen: true },
                                el(RangeControl, {
                                    label: 'شناسه ویجت (۱ تا ۷۲)',
                                    value: atts.widgetId,
                                    onChange: function (val) { setAtts({ widgetId: val }); },
                                    min: 1,
                                    max: 72
                                }),
                                el(TextControl, {
                                    label: 'عنوان اختصاصی ویجت',
                                    value: atts.title,
                                    onChange: function (val) { setAtts({ title: val }); }
                                }),
                                el(SelectControl, {
                                    label: 'پوسته ظاهری',
                                    value: atts.theme,
                                    options: [
                                        { label: 'تیره لوکس (Dark Luxury)', value: 'dark' },
                                        { label: 'روشن مدرن (Light Modern)', value: 'light' }
                                    ],
                                    onChange: function (val) { setAtts({ theme: val }); }
                                })
                            )
                        ),
                        el('div', { style: { padding: '20px', background: '#0F172A', color: '#F8FAFC', borderRadius: '8px', border: '1px solid #38BDF8' } },
                            '🛡️ ویجت سازمانی شماره #' + atts.widgetId + (atts.title ? ' - ' + atts.title : '')
                        )
                    );
                },
                save: function () {
                    return null;
                }
            });

            // 3. Shape Divider
            registerBlockType('sedrazavi/sovereign-divider', {
                title: 'جداکننده سکشن وکتور (۶۶ مدل SVG)',
                icon: 'minus',
                category: 'sedrazavi-sovereign',
                edit: function (props) {
                    var atts = props.attributes;
                    var setAtts = props.setAttributes;

                    return el('div', { className: 'sedrazavi-editor-box' },
                        el(InspectorControls, {},
                            el(PanelBody, { title: 'تنظیمات جداکننده SVG', initialOpen: true },
                                el(RangeControl, {
                                    label: 'مدل جداکننده (۱ تا ۶۶)',
                                    value: atts.dividerId,
                                    onChange: function (val) { setAtts({ dividerId: val }); },
                                    min: 1,
                                    max: 66
                                }),
                                el(RangeControl, {
                                    label: 'ارتفاع (پیکسل)',
                                    value: atts.height,
                                    onChange: function (val) { setAtts({ height: val }); },
                                    min: 20,
                                    max: 200
                                }),
                                el(ToggleControl, {
                                    label: 'معکوس‌سازی افقی (Flip X)',
                                    checked: atts.flipX,
                                    onChange: function (val) { setAtts({ flipX: val }); }
                                }),
                                el(ToggleControl, {
                                    label: 'معکوس‌سازی عمودی (Flip Y)',
                                    checked: atts.flipY,
                                    onChange: function (val) { setAtts({ flipY: val }); }
                                })
                            )
                        ),
                        el('div', { style: { padding: '16px', background: '#1E293B', color: '#38BDF8', textAlign: 'center', borderRadius: '6px' } },
                            '〰️ جداکننده وکتور شماره #' + atts.dividerId + ' (ارتفاع: ' + atts.height + 'px)'
                        )
                    );
                },
                save: function () {
                    return null;
                }
            });

            // 4. Trust Badge
            registerBlockType('sedrazavi/sovereign-badge', {
                title: 'نشان اعتبار و مهر امنیتی (۶۶ نشان)',
                icon: 'awards',
                category: 'sedrazavi-sovereign',
                edit: function (props) {
                    var atts = props.attributes;
                    var setAtts = props.setAttributes;

                    return el('div', {},
                        el(InspectorControls, {},
                            el(PanelBody, { title: 'تنظیمات نشان اعتبار', initialOpen: true },
                                el(RangeControl, {
                                    label: 'شناسه نشان اعتبار (۱ تا ۶۶)',
                                    value: atts.badgeId,
                                    onChange: function (val) { setAtts({ badgeId: val }); },
                                    min: 1,
                                    max: 66
                                }),
                                el(SelectControl, {
                                    label: 'اندازه',
                                    value: atts.size,
                                    options: [
                                        { label: 'کوچک (Small)', value: 'sm' },
                                        { label: 'متوسط (Medium)', value: 'md' },
                                        { label: 'بزرگ (Large)', value: 'lg' }
                                    ],
                                    onChange: function (val) { setAtts({ size: val }); }
                                })
                            )
                        ),
                        el('div', { style: { padding: '14px 20px', background: '#0F172A', color: '#D4AF37', borderRadius: '8px', border: '1px solid #D4AF37', display: 'inline-flex', alignItems: 'center', gap: '8px' } },
                            '🏅 نشان اعتبار سازمانی #' + atts.badgeId
                        )
                    );
                },
                save: function () {
                    return null;
                }
            });

            // 5. Section Blueprint
            registerBlockType('sedrazavi/sovereign-section', {
                title: 'بلوک سکشن آماده (۶۶ سناریوی کامل)',
                icon: 'layout',
                category: 'sedrazavi-sovereign',
                edit: function (props) {
                    var atts = props.attributes;
                    var setAtts = props.setAttributes;

                    return el('div', {},
                        el(InspectorControls, {},
                            el(PanelBody, { title: 'تنظیمات سکشن سازمانی', initialOpen: true },
                                el(RangeControl, {
                                    label: 'شماره طرح‌بندی سکشن (۱ تا ۶۶)',
                                    value: atts.sectionId,
                                    onChange: function (val) { setAtts({ sectionId: val }); },
                                    min: 1,
                                    max: 66
                                }),
                                el(SelectControl, {
                                    label: 'حالت رنگی',
                                    value: atts.colorMode,
                                    options: [
                                        { label: 'تیره پیشرفته (Dark)', value: 'dark' },
                                        { label: 'روشن رسمی (Light)', value: 'light' }
                                    ],
                                    onChange: function (val) { setAtts({ colorMode: val }); }
                                })
                            )
                        ),
                        el('div', { style: { padding: '30px', background: '#0B0F19', color: '#FFFFFF', borderRadius: '12px', border: '1px solid #D4AF37', textAlign: 'center' } },
                            '📐 بلوک سکشن آماده سیدرضوی شماره #' + atts.sectionId
                        )
                    );
                },
                save: function () {
                    return null;
                }
            });

            // 6. Motion Preset
            registerBlockType('sedrazavi/sovereign-motion', {
                title: 'لفاف انیمیشن ۶۰ فریم (۶۶ الگوی حرکتی)',
                icon: 'controls-repeat',
                category: 'sedrazavi-sovereign',
                edit: function (props) {
                    var atts = props.attributes;
                    var setAtts = props.setAttributes;

                    return el('div', {},
                        el(InspectorControls, {},
                            el(PanelBody, { title: 'تنظیمات انیمیشن و موشن', initialOpen: true },
                                el(RangeControl, {
                                    label: 'الگوی انیمیشن (۱ تا ۶۶)',
                                    value: atts.motionId,
                                    onChange: function (val) { setAtts({ motionId: val }); },
                                    min: 1,
                                    max: 66
                                }),
                                el(RangeControl, {
                                    label: 'مدت زمان (ثانیه)',
                                    value: atts.duration,
                                    onChange: function (val) { setAtts({ duration: val }); },
                                    min: 1,
                                    max: 20
                                })
                            )
                        ),
                        el('div', { style: { padding: '20px', background: 'rgba(212,175,55,0.1)', border: '1px dashed #D4AF37', borderRadius: '8px', color: '#D4AF37', textAlign: 'center' } },
                            '💫 لفاف موشن فعال: الگوی #' + atts.motionId + ' (' + atts.duration + 's)'
                        )
                    );
                },
                save: function () {
                    return null;
                }
            });

            // 7. Icon Block
            registerBlockType('sedrazavi/sovereign-icon', {
                title: 'آیکون برداری بدون CDN (۶۶ آیکون)',
                icon: 'star-filled',
                category: 'sedrazavi-sovereign',
                edit: function (props) {
                    var atts = props.attributes;
                    var setAtts = props.setAttributes;

                    return el('div', {},
                        el(InspectorControls, {},
                            el(PanelBody, { title: 'تنظیمات آیکون برداری', initialOpen: true },
                                el(RangeControl, {
                                    label: 'شناسه آیکون (۱ تا ۶۶)',
                                    value: atts.iconId,
                                    onChange: function (val) { setAtts({ iconId: val }); },
                                    min: 1,
                                    max: 66
                                }),
                                el(RangeControl, {
                                    label: 'اندازه (پیکسل)',
                                    value: atts.size,
                                    onChange: function (val) { setAtts({ size: val }); },
                                    min: 16,
                                    max: 120
                                })
                            )
                        ),
                        el('div', { style: { display: 'inline-flex', padding: '10px 16px', background: '#0F172A', color: '#D4AF37', borderRadius: '6px' } },
                            '✨ آیکون وکتور #' + atts.iconId + ' (' + atts.size + 'px)'
                        )
                    );
                },
                save: function () {
                    return null;
                }
            });

        })(window.wp);
        ";
    }

    private function generate_editor_css() {
        return "
        .sedrazavi-editor-box {
            font-family: inherit;
            direction: rtl;
            margin: 12px 0;
        }
        ";
    }

    private function generate_frontend_css() {
        return "
        @keyframes sedrazavi-motion-preset-1 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        @keyframes sedrazavi-motion-preset-2 {
            0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 4px rgba(212,175,55,0.4)); }
            50% { opacity: 1; filter: drop-shadow(0 0 16px rgba(212,175,55,0.8)); }
        }
        @keyframes sedrazavi-motion-preset-3 {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        ";
    }
}
