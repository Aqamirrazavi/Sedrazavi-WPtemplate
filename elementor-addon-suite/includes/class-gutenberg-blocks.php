<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Native WordPress Gutenberg Blocks Suite
 *
 * Provides first-class Gutenberg block.json registration, wp.serverSideRender live previews,
 * InspectorControls, and service-backed server-side rendering wired to:
 * - Sovereign_Widgets_Registry (72 shortcode presets + 31 Elementor widgets)
 * - Sovereign_Sections_Bank (66 section blueprints)
 * - Sovereign_Svg_Icons (66 Zero-CDN SVG icons)
 * - Sovereign_Motion_Presets (66 GPU-accelerated CSS motion presets)
 * - 66 Vector Backgrounds & 66 SVG Shape Dividers & 66 Trust Badges
 *
 * @package Universal_Elementor_Suite
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
        if (isset($GLOBALS['wp_version']) && version_compare($GLOBALS['wp_version'], '5.8', '>=')) {
            add_filter('block_categories_all', [$this, 'register_block_categories'], 10, 2);
        } else {
            add_filter('block_categories', [$this, 'register_block_categories_legacy'], 10, 2);
        }

        add_action('init', [$this, 'register_blocks']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
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
     * Helper to register a block via its canonical block.json when available,
     * falling back cleanly to manual registration when packaged without block.json.
     */
    private function register_single_block($slug, $block_name, array $fallback_args) {
        $blocks_dir = trailingslashit(UAS_PATH) . 'blocks/';
        $meta_dir   = $blocks_dir . $slug;
        if (file_exists($meta_dir . '/block.json')) {
            register_block_type($meta_dir, [
                'render_callback' => $fallback_args['render_callback'],
            ]);
            return;
        }
        register_block_type($block_name, $fallback_args);
    }

    /**
     * Register all 7 Sovereign Gutenberg Blocks
     */
    public function register_blocks() {
        if (!function_exists('register_block_type')) {
            return;
        }

        // 1. Vector Background Block
        $this->register_single_block('sovereign-vector-bg', 'sedrazavi/sovereign-vector-bg', [
            'api_version'     => 2,
            'category'        => 'sedrazavi-sovereign',
            'title'           => 'بک‌گراند وکتور مستقل (۶۶ مدل ریاضی)',
            'description'     => 'بک‌گراند وکتور متحرک و ثابت ریاضی با کنترل شفافیت، بلور و سرعت انیمیشن.',
            'attributes'      => [
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
        $this->register_single_block('sovereign-widget', 'sedrazavi/sovereign-widget', [
            'api_version'     => 2,
            'category'        => 'sedrazavi-sovereign',
            'title'           => 'ویجت سازمانی سیدرضوی (۷۲ ویجت تخصصی)',
            'description'     => 'درج هر یک از ۷۲ ویجت مستقل حقوقی، مهندسی، پزشکی، بازرگانی، امنیتی و هوش مصنوعی.',
            'attributes'      => [
                'widgetId'    => ['type' => 'number', 'default' => 1],
                'accentColor' => ['type' => 'string', 'default' => '#D4AF37'],
                'title'       => ['type' => 'string', 'default' => ''],
                'theme'       => ['type' => 'string', 'default' => 'dark'],
            ],
            'render_callback' => [$this, 'render_widget_block'],
        ]);

        // 3. SVG Shape Divider Block
        $this->register_single_block('sovereign-divider', 'sedrazavi/sovereign-divider', [
            'api_version'     => 2,
            'category'        => 'sedrazavi-sovereign',
            'title'           => 'جداکننده سکشن وکتور (۶۶ مدل SVG)',
            'description'     => 'جداکننده‌های گرافیکی مقعر، محدب، ارگانیک و هندسی بین سکشن‌ها.',
            'attributes'      => [
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
        $this->register_single_block('sovereign-badge', 'sedrazavi/sovereign-badge', [
            'api_version'     => 2,
            'category'        => 'sedrazavi-sovereign',
            'title'           => 'نشان اعتبار و مهر امنیتی (۶۶ نشان)',
            'description'     => 'نشان‌های اعتماد حقوقی، اصالت کد، SSL، گواهی داوری و استانداردهای وب.',
            'attributes'      => [
                'badgeId'   => ['type' => 'number', 'default' => 1],
                'color'     => ['type' => 'string', 'default' => '#D4AF37'],
                'size'      => ['type' => 'string', 'default' => 'md'],
                'showLabel' => ['type' => 'boolean', 'default' => true],
            ],
            'render_callback' => [$this, 'render_badge_block'],
        ]);

        // 5. Section Blueprint Block
        $this->register_single_block('sovereign-section', 'sedrazavi/sovereign-section', [
            'api_version'     => 2,
            'category'        => 'sedrazavi-sovereign',
            'title'           => 'بلوک سکشن آماده (۶۶ سناریوی کامل)',
            'description'     => 'سکشن‌های بهینه‌سازی‌شده برای هیرو، تعرفه‌ها، تیم، نظرات، فرآیند کاری و فوتر.',
            'attributes'      => [
                'sectionId' => ['type' => 'number', 'default' => 1],
                'colorMode' => ['type' => 'string', 'default' => 'dark'],
                'padding'   => ['type' => 'string', 'default' => 'lg'],
            ],
            'render_callback' => [$this, 'render_section_block'],
        ]);

        // 6. GPU Motion Wrapper Block
        $this->register_single_block('sovereign-motion', 'sedrazavi/sovereign-motion', [
            'api_version'     => 2,
            'category'        => 'sedrazavi-sovereign',
            'title'           => 'لفاف انیمیشن ۶۰ فریم (۶۶ الگوی حرکتی)',
            'description'     => 'اعمال انیمیشن‌های سخت‌افزاری شناور، نبض نوری، چرخش هولوگرافیک و ماتریس.',
            'attributes'      => [
                'motionId' => ['type' => 'number', 'default' => 1],
                'duration' => ['type' => 'number', 'default' => 4],
                'delay'    => ['type' => 'number', 'default' => 0],
                'repeat'   => ['type' => 'string', 'default' => 'infinite'],
            ],
            'render_callback' => [$this, 'render_motion_block'],
        ]);

        // 7. Zero-CDN SVG Icon Block
        $this->register_single_block('sovereign-icon', 'sedrazavi/sovereign-icon', [
            'api_version'     => 2,
            'category'        => 'sedrazavi-sovereign',
            'title'           => 'آیکون برداری بدون CDN (۶۶ آیکون)',
            'description'     => 'آیکون‌های فوق‌سبک برداری بدون هیچ‌گونه بارگذاری فونت خارجی.',
            'attributes'      => [
                'iconId'      => ['type' => 'number', 'default' => 1],
                'size'        => ['type' => 'number', 'default' => 36],
                'color'       => ['type' => 'string', 'default' => '#D4AF37'],
                'strokeWidth' => ['type' => 'number', 'default' => 2],
            ],
            'render_callback' => [$this, 'render_icon_block'],
        ]);
    }

    /**
     * Enqueue Gutenberg Editor JavaScript, SSR Preview & Controls
     */
    public function enqueue_editor_assets() {
        wp_register_script(
            'sedrazavi-gutenberg-blocks',
            false,
            ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-server-side-render'],
            UAS_VERSION,
            true
        );

        $editor_js = $this->generate_editor_script();
        wp_add_inline_script('sedrazavi-gutenberg-blocks', $editor_js);
        wp_enqueue_script('sedrazavi-gutenberg-blocks');

        $editor_css = $this->generate_editor_css() . "\n" . $this->generate_frontend_css();
        wp_register_style('sedrazavi-gutenberg-editor-css', false, [], UAS_VERSION);
        wp_add_inline_style('sedrazavi-gutenberg-editor-css', $editor_css);
        wp_enqueue_style('sedrazavi-gutenberg-editor-css');
    }

    /**
     * Enqueue Frontend Styles
     */
    public function enqueue_frontend_assets() {
        wp_register_style('sedrazavi-gutenberg-frontend-css', false, [], UAS_VERSION);
        wp_add_inline_style('sedrazavi-gutenberg-frontend-css', $this->generate_frontend_css());
        wp_enqueue_style('sedrazavi-gutenberg-frontend-css');
    }

    /**
     * Server-side Render Callbacks (Wired to Sovereign Service Registries)
     */

    public function render_vector_bg_block($attributes, $content = '') {
        $presetId  = max(1, min(66, isset($attributes['presetId']) ? intval($attributes['presetId']) : 1));
        $mode      = isset($attributes['mode']) ? sanitize_text_field($attributes['mode']) : 'motion';
        $opacity   = max(0.05, min(1.0, isset($attributes['opacity']) ? floatval($attributes['opacity']) : 0.85));
        $blur      = max(0, min(40, isset($attributes['blur']) ? intval($attributes['blur']) : 0));
        $minHeight = isset($attributes['minHeight']) ? sanitize_text_field($attributes['minHeight']) : '400px';
        $overlay   = isset($attributes['overlay']) ? sanitize_text_field($attributes['overlay']) : 'dark';

        if (!preg_match('/^\d+(px|vh|vw|rem|em|%)$/', $minHeight)) {
            $minHeight = '400px';
        }

        $overlay_bg = 'transparent';
        if ($overlay === 'dark') {
            $overlay_bg = 'rgba(10, 15, 29, 0.75)';
        } elseif ($overlay === 'light') {
            $overlay_bg = 'rgba(255, 255, 255, 0.75)';
        } elseif ($overlay === 'gradient') {
            $overlay_bg = 'linear-gradient(180deg, rgba(10,15,29,0.3) 0%, rgba(10,15,29,0.95) 100%)';
        }

        $blur_style  = $blur > 0 ? "backdrop-filter: blur({$blur}px);" : '';
        $svg_content = $this->get_vector_preset_svg($presetId, $mode);

        ob_start();
        ?>
        <div class="sedrazavi-block-vector-bg" style="position: relative; overflow: hidden; min-height: <?php echo esc_attr($minHeight); ?>; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.2); background: #0B0F19;">
            <div class="vector-bg-layer" style="position: absolute; inset: 0; pointer-events: none; opacity: <?php echo esc_attr($opacity); ?>; <?php echo esc_attr($blur_style); ?>">
                <?php echo $svg_content; ?>
            </div>
            <div class="vector-overlay-layer" style="position: absolute; inset: 0; background: <?php echo esc_attr($overlay_bg); ?>; pointer-events: none;"></div>
            <div class="vector-content-slot" style="position: relative; z-index: 2; padding: 32px 24px; color: #F8FAFC;">
                <?php if (!empty($content)) : ?>
                    <?php echo do_shortcode($content); ?>
                <?php else : ?>
                    <div style="text-align: center; padding: 40px 20px;">
                        <span style="display: inline-block; padding: 6px 14px; background: rgba(212,175,55,0.15); border: 1px solid #D4AF37; border-radius: 9999px; font-size: 13px; color: #D4AF37; margin-bottom: 12px;">وکتور بک‌گراند ریاضی شماره #<?php echo esc_html($presetId); ?></span>
                        <h4 style="font-size: 20px; font-weight: 800; color: #FFFFFF; margin: 0 0 8px 0;">پس‌زمینه سازمانی وکتور سیدرضوی</h4>
                        <p style="font-size: 14px; color: #94A3B8; max-width: 500px; margin: 0 auto;">بلوک بومی گوتنبرگ (پریست #<?php echo esc_html($presetId); ?> · حالت <?php echo esc_html($mode === 'motion' ? 'موشن ۶۰ فریم' : 'استاتیک'); ?>)</p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_widget_block($attributes) {
        $widgetId = max(1, min(72, isset($attributes['widgetId']) ? intval($attributes['widgetId']) : 1));
        $accent   = sanitize_hex_color($attributes['accentColor'] ?? '') ?: '#D4AF37';
        $customTitle = isset($attributes['title']) ? sanitize_text_field($attributes['title']) : '';
        $theme    = isset($attributes['theme']) ? sanitize_text_field($attributes['theme']) : 'dark';

        $matched = null;
        if (class_exists('\UniversalElementorSuite\Sovereign_Widgets_Registry')) {
            $registry = Sovereign_Widgets_Registry::instance();
            $catalog  = $registry->get_widgets_catalog();
            foreach ($catalog as $entry) {
                if ((int) ($entry['number'] ?? 0) === $widgetId) {
                    $matched = $entry;
                    break;
                }
            }
            if (!$matched && !empty($catalog)) {
                $matched = $catalog[($widgetId - 1) % count($catalog)];
            }
        }

        $title = !empty($customTitle) ? $customTitle : ($matched['title'] ?? "ویجت سازمانی شماره #{$widgetId}");
        $rendered_widget_html = '';

        if ($matched) {
            $tag = $matched['shortcode_tag'] ?? '';
            $raw_sc = $matched['shortcode'] ?? ($tag ? "[{$tag}]" : '');
            if (!empty($tag) && function_exists('shortcode_exists') && shortcode_exists($tag) && function_exists('do_shortcode')) {
                $rendered_widget_html = do_shortcode($raw_sc);
            } elseif (class_exists('\UniversalElementorSuite\Sovereign_Widgets_Registry')) {
                $rendered_widget_html = Sovereign_Widgets_Registry::instance()->render_sovereign_widget($matched, ['class' => 'theme-' . $theme]);
            }
        }

        ob_start();
        ?>
        <div class="sedrazavi-block-widget theme-<?php echo esc_attr($theme); ?>" dir="rtl" data-widget-id="<?php echo esc_attr($widgetId); ?>" style="--widget-accent: <?php echo esc_attr($accent); ?>; padding: 20px; background: <?php echo $theme === 'light' ? '#FFFFFF' : '#0F172A'; ?>; border: 1px solid <?php echo esc_attr($accent); ?>44; border-radius: 12px; margin: 18px 0; color: <?php echo $theme === 'light' ? '#0F172A' : '#F8FAFC'; ?>;">
            <?php if (!empty($customTitle)) : ?>
                <h4 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: <?php echo esc_attr($accent); ?>;"><?php echo esc_html($title); ?></h4>
            <?php endif; ?>
            <div class="widget-dynamic-body">
                <?php if (!empty($rendered_widget_html)) : ?>
                    <?php echo $rendered_widget_html; ?>
                <?php else : ?>
                    <p style="margin: 0; font-size: 13px;"><?php echo esc_html($title); ?> — آماده اجرا با سرویس ویجت‌های حاکمیتی.</p>
                <?php endif; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_divider_block($attributes) {
        $dividerId = max(1, min(66, isset($attributes['dividerId']) ? intval($attributes['dividerId']) : 1));
        $height    = max(20, min(260, isset($attributes['height']) ? intval($attributes['height']) : 80));
        $fill      = sanitize_hex_color($attributes['fill'] ?? '') ?: '#0F172A';
        $flipX     = !empty($attributes['flipX']);
        $flipY     = !empty($attributes['flipY']);
        $position  = isset($attributes['position']) ? sanitize_key($attributes['position']) : 'bottom';

        $transform = [];
        if ($flipX) $transform[] = 'scaleX(-1)';
        if ($flipY) $transform[] = 'scaleY(-1)';
        $transform_style = !empty($transform) ? 'transform: ' . implode(' ', $transform) . ';' : '';

        $svg_path = $this->get_shape_divider_path($dividerId);

        ob_start();
        ?>
        <div class="sedrazavi-shape-divider position-<?php echo esc_attr($position); ?>" data-divider-id="<?php echo esc_attr($dividerId); ?>" style="width: 100%; overflow: hidden; line-height: 0; <?php echo esc_attr($transform_style); ?>">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 1440 120" preserveAspectRatio="none" style="position: relative; display: block; width: calc(100% + 1.3px); height: <?php echo esc_attr($height); ?>px;">
                <path d="<?php echo esc_attr($svg_path); ?>" fill="<?php echo esc_attr($fill); ?>"></path>
            </svg>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_badge_block($attributes) {
        $badgeId   = max(1, min(66, isset($attributes['badgeId']) ? intval($attributes['badgeId']) : 1));
        $color     = sanitize_hex_color($attributes['color'] ?? '') ?: '#D4AF37';
        $size      = isset($attributes['size']) ? sanitize_key($attributes['size']) : 'md';
        $showLabel = isset($attributes['showLabel']) ? (bool) $attributes['showLabel'] : true;

        $dims = 48;
        if ($size === 'sm') $dims = 36;
        if ($size === 'lg') $dims = 64;

        $badge_labels = [
            1  => 'نشان اصالت و انطباق حقوقی',
            2  => 'گواهی رمزنگاری End-to-End و HMAC',
            3  => 'تاییدیه پایداری معماری بدون CDN',
            4  => 'مهر سلامت دادرسی و داوری تجاری',
            5  => 'تاییدیه استاندارد وکتور ۶۰ فریم',
            6  => 'گواهی اصالت بسته مستقل المنتور/گوتنبرگ',
            7  => 'نشان محافظت Anti-IDOR پرونده‌های محرمانه',
            8  => 'گواهی بهینه‌سازی Core Web Vitals ۱۰۰/۱۰۰',
            9  => 'مهر استاندارد دسترسی‌پذیری WCAG 2.1 AA',
            10 => 'تاییدیه سازگاری WooCommerce HPOS & Blocks',
            11 => 'نشان زرین شمسه و هندسه اصیل ایرانی',
            12 => 'مهر رسمی معمار سامانه سوییت سیدرضوی',
        ];
        $badge_title = $badge_labels[(($badgeId - 1) % count($badge_labels)) + 1] . ' #' . $badgeId;

        ob_start();
        ?>
        <div class="sedrazavi-trust-badge size-<?php echo esc_attr($size); ?>" dir="rtl" data-badge-id="<?php echo esc_attr($badgeId); ?>" style="display: inline-flex; align-items: center; gap: 12px; padding: 8px 16px; background: rgba(15, 23, 42, 0.85); border: 1px solid <?php echo esc_attr($color); ?>; border-radius: 10px; backdrop-filter: blur(8px);">
            <div aria-hidden="true" style="width: <?php echo esc_attr($dims); ?>px; height: <?php echo esc_attr($dims); ?>px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: <?php echo esc_attr($color); ?>;">
                <svg aria-hidden="true" width="<?php echo esc_attr($dims); ?>" height="<?php echo esc_attr($dims); ?>" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                </svg>
            </div>
            <?php if ($showLabel) : ?>
            <div>
                <div style="font-size: 13px; font-weight: 700; color: #FFFFFF;"><?php echo esc_html($badge_title); ?></div>
                <div style="font-size: 11px; color: <?php echo esc_attr($color); ?>;">گواهی تایید‌شده استاندارد سوییت سیدرضوی</div>
            </div>
            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_section_block($attributes) {
        $sectionId = max(1, min(66, isset($attributes['sectionId']) ? intval($attributes['sectionId']) : 1));
        $colorMode = isset($attributes['colorMode']) ? sanitize_key($attributes['colorMode']) : 'dark';
        $padding   = isset($attributes['padding']) ? sanitize_key($attributes['padding']) : 'lg';

        $matched_section = null;
        if (class_exists('\UniversalElementorSuite\Sovereign_Sections_Bank')) {
            $bank = Sovereign_Sections_Bank::instance();
            $catalog = $bank->get_sections_catalog();
            foreach ($catalog as $sec) {
                if ((int) ($sec['model_number'] ?? 0) === $sectionId) {
                    $matched_section = $sec;
                    break;
                }
            }
            if (!$matched_section && !empty($catalog)) {
                $values = array_values($catalog);
                $matched_section = $values[($sectionId - 1) % count($values)];
            }
            if ($matched_section) {
                $pad_class = 'pad-' . $padding;
                return $bank->render_section_shortcode([
                    'id'    => $matched_section['id'],
                    'class' => "sedrazavi-section-blueprint mode-{$colorMode} {$pad_class}",
                ]);
            }
        }

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
                <p style="font-size: 15px; color: #94A3B8; max-width: 650px; margin: 0 auto; line-height: 1.8;">سکشن استاندارد قابل استفاده در صفحات گوتنبرگ و المنتور.</p>
            </div>
        </section>
        <?php
        return ob_get_clean();
    }

    public function render_motion_block($attributes, $content = '') {
        $motionId = max(1, min(66, isset($attributes['motionId']) ? intval($attributes['motionId']) : 1));
        $duration = max(0.5, min(30.0, isset($attributes['duration']) ? floatval($attributes['duration']) : 4.0));
        $delay    = max(0.0, min(15.0, isset($attributes['delay']) ? floatval($attributes['delay']) : 0.0));
        $repeat   = isset($attributes['repeat']) ? sanitize_text_field($attributes['repeat']) : 'infinite';

        if (!in_array($repeat, ['infinite', '1', '2', '3'], true)) {
            $repeat = 'infinite';
        }

        $preset_title = sprintf('الگوی موشن #%d', $motionId);
        $preset_class = 'sedrazavi-motion-preset-' . ((($motionId - 1) % 3) + 1);
        if (class_exists('\UniversalElementorSuite\Sovereign_Motion_Presets')) {
            $catalog = Sovereign_Motion_Presets::instance()->get_presets_catalog();
            $slug = sprintf('sz-motion-fx-%02d', $motionId);
            if (isset($catalog[$slug])) {
                $preset_title = $catalog[$slug]['title_fa'];
                $preset_class .= ' ' . sanitize_html_class($catalog[$slug]['css_class']);
            }
        }

        $kf_idx = (($motionId - 1) % 3) + 1;
        $anim_name = "sedrazavi-motion-preset-{$kf_idx}";
        $style = "animation: {$anim_name} {$duration}s ease-in-out {$delay}s {$repeat}; will-change: transform, opacity;";

        ob_start();
        ?>
        <div class="sedrazavi-motion-wrapper <?php echo esc_attr($preset_class); ?>" data-motion-id="<?php echo esc_attr($motionId); ?>" style="<?php echo esc_attr($style); ?>">
            <?php if (!empty($content)) : ?>
                <?php echo do_shortcode($content); ?>
            <?php else : ?>
                <div style="padding: 24px; background: rgba(212,175,55,0.08); border: 1px dashed #D4AF37; border-radius: 12px; text-align: center; color: #D4AF37;">
                    <strong><?php echo esc_html($preset_title); ?> (<?php echo esc_html($duration); ?>s)</strong>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">محتوای خود را درون این لفاف موشن ۶۰ فریم قرار دهید.</div>
                </div>
            <?php endif; ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_icon_block($attributes) {
        $iconId      = max(1, min(66, isset($attributes['iconId']) ? intval($attributes['iconId']) : 1));
        $size        = max(12, min(160, isset($attributes['size']) ? intval($attributes['size']) : 36));
        $color       = sanitize_hex_color($attributes['color'] ?? '') ?: '#D4AF37';
        $strokeWidth = max(1.0, min(4.0, isset($attributes['strokeWidth']) ? floatval($attributes['strokeWidth']) : 2.0));

        if (class_exists('\UniversalElementorSuite\Sovereign_Svg_Icons')) {
            $svg_service = Sovereign_Svg_Icons::instance();
            $catalog = $svg_service->get_icons_catalog();
            $icon_key = '';

            foreach ($catalog as $slug => $meta) {
                if ((int) ($meta['number'] ?? 0) === $iconId) {
                    $icon_key = $slug;
                    break;
                }
            }
            if (empty($icon_key) && !empty($catalog)) {
                $keys = array_keys($catalog);
                $icon_key = $keys[($iconId - 1) % count($keys)];
            }

            if (!empty($icon_key)) {
                return $svg_service->render_icon_shortcode([
                    'name'   => $icon_key,
                    'size'   => (string) $size,
                    'color'  => $color,
                    'stroke' => (string) $strokeWidth,
                    'class'  => 'sedrazavi-sovereign-icon-wrap',
                ]);
            }
        }

        ob_start();
        ?>
        <span class="sedrazavi-sovereign-icon-wrap" style="display: inline-flex; align-items: center; justify-content: center; width: <?php echo esc_attr($size); ?>px; height: <?php echo esc_attr($size); ?>px; color: <?php echo esc_attr($color); ?>;">
            <svg width="<?php echo esc_attr($size); ?>" height="<?php echo esc_attr($size); ?>" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="<?php echo esc_attr($strokeWidth); ?>" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m9 12 2 2 4-4"></path>
            </svg>
        </span>
        <?php
        return ob_get_clean();
    }

    /**
     * Mathematical SVG Background and Shape Divider generators
     */

    private function get_vector_preset_svg($presetId, $mode) {
        $anim_svg = '';
        if ($mode === 'motion') {
            $anim_svg = '<animateTransform attributeName="transform" type="rotate" from="0 500 500" to="360 500 500" dur="80s" repeatCount="indefinite"/>';
        }

        $c1 = sprintf('#%02X%02X%02X', 180 + ($presetId * 3) % 75, 140 + ($presetId * 5) % 90, 45 + ($presetId * 7) % 120);
        $c2 = sprintf('#%02X%02X%02X', 10 + ($presetId * 9) % 100, 120 + ($presetId * 11) % 120, 180 + ($presetId * 5) % 70);
        $waveShift = ($presetId * 17) % 180;

        return '<svg aria-hidden="true" focusable="false" width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-sovereign-' . esc_attr($presetId) . '" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="' . esc_attr($c1) . '" stop-opacity="0.32"/>
                    <stop offset="50%" stop-color="' . esc_attr($c2) . '" stop-opacity="0.22"/>
                    <stop offset="100%" stop-color="#10B981" stop-opacity="0.3"/>
                </linearGradient>
            </defs>
            <g>
                ' . $anim_svg . '
                <path d="M0,' . (180 + $waveShift) . ' C300,400 400,0 700,200 C900,300 950,100 1000,250 L1000,1000 L0,1000 Z" fill="url(#grad-sovereign-' . esc_attr($presetId) . ')" opacity="0.4"/>
                <path d="M0,450 C250,250 500,600 750,' . (320 + $waveShift) . ' C900,300 980,500 1000,450 L1000,1000 L0,1000 Z" fill="url(#grad-sovereign-' . esc_attr($presetId) . ')" opacity="0.3"/>
            </g>
        </svg>';
    }

    private function get_shape_divider_path($dividerId) {
        $id = max(1, min(66, intval($dividerId)));
        $amp = 10 + (($id * 7) % 36);
        $mid = 45 + (($id * 11) % 50);
        $base_paths = [
            0 => "M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L0,120Z",
            1 => "M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,64C840,53,960,43,1080,48C1200,53,1320,75,1380,85.3L1440,96L1440,120L0,120Z",
            2 => "M0,96L80,85.3C160,75,320,53,480,58.7C640,64,800,96,960,101.3C1120,107,1280,85,1360,74.7L1440,64L1440,120L0,120Z",
            3 => "M0,0L720,{$mid}L1440,0L1440,120L0,120Z",
            4 => "M0,110Q360,{$amp} 720,{$mid}T1440,20L1440,120L0,120Z",
            5 => "M0,40L240,95L480,30L720,95L960,30L1200,95L1440,40L1440,120L0,120Z",
            6 => "M0,{$mid}C360," . max(0, $mid - $amp) . ",720," . min(115, $mid + $amp) . ",1080,{$mid}C1260," . max(0, $mid - $amp) . ",1380,48,1440,{$mid}L1440,120L0,120Z",
            7 => "M0,90L180,35L360,90L540,35L720,90L900,35L1080,90L1260,35L1440,90L1440,120L0,120Z",
            8 => "M0,20L480,20L720,{$mid}L960,20L1440,20L1440,120L0,120Z",
            9 => "M0,100C240,20,480,20,720,{$mid}C960,100,1200,20,1440,100L1440,120L0,120Z",
            10 => "M0,{$amp}L360,95L720,{$amp}L1080,95L1440,{$amp}L1440,120L0,120Z",
        ];
        return $base_paths[($id - 1) % count($base_paths)];
    }

    /**
     * Gutenberg Block Editor JavaScript powered by wp.serverSideRender for live SSR preview
     */
    private function generate_editor_script() {
        return "
        (function (wp) {
            var registerBlockType = wp.blocks.registerBlockType;
            var el = wp.element.createElement;
            var InspectorControls = wp.blockEditor.InspectorControls;
            var ServerSideRender = wp.serverSideRender;
            var PanelBody = wp.components.PanelBody;
            var SelectControl = wp.components.SelectControl;
            var RangeControl = wp.components.RangeControl;
            var TextControl = wp.components.TextControl;
            var ToggleControl = wp.components.ToggleControl;

            function ssrOrFallback(blockName, attributes, fallbackText) {
                if (ServerSideRender) {
                    return el(ServerSideRender, {
                        block: blockName,
                        attributes: attributes
                    });
                }
                return el('div', {
                    style: { padding: '20px', background: '#0B0F19', color: '#D4AF37', borderRadius: '8px', border: '1px solid #D4AF37' }
                }, fallbackText);
            }

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
                                    min: 1, max: 66
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
                                    min: 0.1, max: 1.0, step: 0.05
                                }),
                                el(RangeControl, {
                                    label: 'تاری (Blur px)',
                                    value: atts.blur || 0,
                                    onChange: function (val) { setAtts({ blur: val }); },
                                    min: 0, max: 20
                                }),
                                el(SelectControl, {
                                    label: 'لایه پوششی (Overlay)',
                                    value: atts.overlay || 'dark',
                                    options: [
                                        { label: 'تیره (Dark)', value: 'dark' },
                                        { label: 'روشن (Light)', value: 'light' },
                                        { label: 'گرادیان', value: 'gradient' }
                                    ],
                                    onChange: function (val) { setAtts({ overlay: val }); }
                                })
                            )
                        ),
                        ssrOrFallback('sedrazavi/sovereign-vector-bg', atts, '⚡ بک‌گراند وکتور ریاضی #' + atts.presetId)
                    );
                },
                save: function () { return null; }
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
                                    min: 1, max: 72
                                }),
                                el(TextControl, {
                                    label: 'عنوان اختصاصی ویجت',
                                    value: atts.title,
                                    onChange: function (val) { setAtts({ title: val }); }
                                }),
                                el(TextControl, {
                                    label: 'رنگ تاکیدی (Hex)',
                                    value: atts.accentColor || '#D4AF37',
                                    onChange: function (val) { setAtts({ accentColor: val }); }
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
                        ssrOrFallback('sedrazavi/sovereign-widget', atts, '🛡️ ویجت سازمانی #' + atts.widgetId)
                    );
                },
                save: function () { return null; }
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
                                    min: 1, max: 66
                                }),
                                el(RangeControl, {
                                    label: 'ارتفاع (پیکسل)',
                                    value: atts.height,
                                    onChange: function (val) { setAtts({ height: val }); },
                                    min: 20, max: 240
                                }),
                                el(TextControl, {
                                    label: 'رنگ پرکننده (Hex)',
                                    value: atts.fill || '#0F172A',
                                    onChange: function (val) { setAtts({ fill: val }); }
                                }),
                                el(ToggleControl, {
                                    label: 'معکوس‌سازی افقی (Flip X)',
                                    checked: !!atts.flipX,
                                    onChange: function (val) { setAtts({ flipX: val }); }
                                }),
                                el(ToggleControl, {
                                    label: 'معکوس‌سازی عمودی (Flip Y)',
                                    checked: !!atts.flipY,
                                    onChange: function (val) { setAtts({ flipY: val }); }
                                })
                            )
                        ),
                        ssrOrFallback('sedrazavi/sovereign-divider', atts, '〰️ جداکننده وکتور #' + atts.dividerId)
                    );
                },
                save: function () { return null; }
            });

            // 4. Trust Badge
            registerBlockType('sedrazavi/sovereign-badge', {
                title: 'نشان اعتبار و مهر امنیتی (۶۶ نشان)',
                icon: 'awards',
                category: 'sedrazavi-sovereign',
                edit: function (props) {
                    var atts = props.attributes;
                    var setAtts = props.setAttributes;
                    return el('div', { className: 'sedrazavi-editor-box' },
                        el(InspectorControls, {},
                            el(PanelBody, { title: 'تنظیمات نشان اعتبار', initialOpen: true },
                                el(RangeControl, {
                                    label: 'شناسه نشان اعتبار (۱ تا ۶۶)',
                                    value: atts.badgeId,
                                    onChange: function (val) { setAtts({ badgeId: val }); },
                                    min: 1, max: 66
                                }),
                                el(TextControl, {
                                    label: 'رنگ نشان (Hex)',
                                    value: atts.color || '#D4AF37',
                                    onChange: function (val) { setAtts({ color: val }); }
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
                                }),
                                el(ToggleControl, {
                                    label: 'نمایش برچسب متنی',
                                    checked: atts.showLabel !== false,
                                    onChange: function (val) { setAtts({ showLabel: val }); }
                                })
                            )
                        ),
                        ssrOrFallback('sedrazavi/sovereign-badge', atts, '🏅 نشان اعتبار سازمانی #' + atts.badgeId)
                    );
                },
                save: function () { return null; }
            });

            // 5. Section Blueprint
            registerBlockType('sedrazavi/sovereign-section', {
                title: 'بلوک سکشن آماده (۶۶ سناریوی کامل)',
                icon: 'layout',
                category: 'sedrazavi-sovereign',
                edit: function (props) {
                    var atts = props.attributes;
                    var setAtts = props.setAttributes;
                    return el('div', { className: 'sedrazavi-editor-box' },
                        el(InspectorControls, {},
                            el(PanelBody, { title: 'تنظیمات سکشن سازمانی', initialOpen: true },
                                el(RangeControl, {
                                    label: 'شماره طرح‌بندی سکشن (۱ تا ۶۶)',
                                    value: atts.sectionId,
                                    onChange: function (val) { setAtts({ sectionId: val }); },
                                    min: 1, max: 66
                                }),
                                el(SelectControl, {
                                    label: 'حالت رنگی',
                                    value: atts.colorMode,
                                    options: [
                                        { label: 'تیره پیشرفته (Dark)', value: 'dark' },
                                        { label: 'روشن رسمی (Light)', value: 'light' }
                                    ],
                                    onChange: function (val) { setAtts({ colorMode: val }); }
                                }),
                                el(SelectControl, {
                                    label: 'فاصله داخلی (Padding)',
                                    value: atts.padding || 'lg',
                                    options: [
                                        { label: 'کم (SM)', value: 'sm' },
                                        { label: 'معمولی (LG)', value: 'lg' },
                                        { label: 'وسیع (XL)', value: 'xl' }
                                    ],
                                    onChange: function (val) { setAtts({ padding: val }); }
                                })
                            )
                        ),
                        ssrOrFallback('sedrazavi/sovereign-section', atts, '📐 بلوک سکشن آماده #' + atts.sectionId)
                    );
                },
                save: function () { return null; }
            });

            // 6. Motion Preset
            registerBlockType('sedrazavi/sovereign-motion', {
                title: 'لفاف انیمیشن ۶۰ فریم (۶۶ الگوی حرکتی)',
                icon: 'controls-repeat',
                category: 'sedrazavi-sovereign',
                edit: function (props) {
                    var atts = props.attributes;
                    var setAtts = props.setAttributes;
                    return el('div', { className: 'sedrazavi-editor-box' },
                        el(InspectorControls, {},
                            el(PanelBody, { title: 'تنظیمات انیمیشن و موشن', initialOpen: true },
                                el(RangeControl, {
                                    label: 'الگوی انیمیشن (۱ تا ۶۶)',
                                    value: atts.motionId,
                                    onChange: function (val) { setAtts({ motionId: val }); },
                                    min: 1, max: 66
                                }),
                                el(RangeControl, {
                                    label: 'مدت زمان (ثانیه)',
                                    value: atts.duration,
                                    onChange: function (val) { setAtts({ duration: val }); },
                                    min: 1, max: 20
                                }),
                                el(RangeControl, {
                                    label: 'تاخیر شروع (ثانیه)',
                                    value: atts.delay || 0,
                                    onChange: function (val) { setAtts({ delay: val }); },
                                    min: 0, max: 10
                                })
                            )
                        ),
                        ssrOrFallback('sedrazavi/sovereign-motion', atts, '💫 لفاف موشن #' + atts.motionId)
                    );
                },
                save: function () { return null; }
            });

            // 7. Icon Block
            registerBlockType('sedrazavi/sovereign-icon', {
                title: 'آیکون برداری بدون CDN (۶۶ آیکون)',
                icon: 'star-filled',
                category: 'sedrazavi-sovereign',
                edit: function (props) {
                    var atts = props.attributes;
                    var setAtts = props.setAttributes;
                    return el('div', { className: 'sedrazavi-editor-box' },
                        el(InspectorControls, {},
                            el(PanelBody, { title: 'تنظیمات آیکون برداری', initialOpen: true },
                                el(RangeControl, {
                                    label: 'شناسه آیکون (۱ تا ۶۶)',
                                    value: atts.iconId,
                                    onChange: function (val) { setAtts({ iconId: val }); },
                                    min: 1, max: 66
                                }),
                                el(RangeControl, {
                                    label: 'اندازه (پیکسل)',
                                    value: atts.size,
                                    onChange: function (val) { setAtts({ size: val }); },
                                    min: 16, max: 120
                                }),
                                el(TextControl, {
                                    label: 'رنگ آیکون (Hex)',
                                    value: atts.color || '#D4AF37',
                                    onChange: function (val) { setAtts({ color: val }); }
                                })
                            )
                        ),
                        ssrOrFallback('sedrazavi/sovereign-icon', atts, '✨ آیکون وکتور #' + atts.iconId)
                    );
                },
                save: function () { return null; }
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
