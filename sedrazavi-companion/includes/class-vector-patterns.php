<?php
/**
 * SedRazavi OS - Zero-Asset SVG Mathematical Pattern Generator
 * Location: sedrazavi-companion/includes/class-vector-patterns.php
 *
 * Provides a 66-model Vector Background Bank for backend Data-URI generation,
 * Elementor/Gutenberg background controls, and REST API access.
 *
 * @package SedRazavi_Companion
 * @version 7.0.0
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Vector_Patterns {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('wp_head', [$this, 'inject_dynamic_pattern_styles'], 90);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    /**
     * Get list of all 66 mathematical SVG patterns
     */
    public static function get_patterns_catalog() {
        return [
            // 1-10
            'dynamic-flowing-waves' => [
                'name'    => 'امواج مواج سینوسی روان (Dynamic Sine Waves)',
                'category'=> 'waves',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60"><path d="M0 30 Q 30 5, 60 30 T 120 30" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/></svg>',
            ],
            'topographic-elevation-contours' => [
                'name'    => 'کانتورهای تراز توپوگرافی حقوقی (Topographic Contours)',
                'category'=> 'contours',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="45" ry="30" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><ellipse cx="50" cy="50" rx="30" ry="18" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><ellipse cx="50" cy="50" rx="14" ry="8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/></svg>',
            ],
            'guilloche-security-mesh' => [
                'name'    => 'شبکه امنیتی گیلوش و اوراق بهادار (Guilloche Mesh)',
                'category'=> 'guilloche',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><ellipse cx="40" cy="40" rx="36" ry="14" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><ellipse cx="40" cy="40" rx="14" ry="36" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'justice-constellation-nodes' => [
                'name'    => 'صورت فلکی میزان و پیوندهای شبکه‌ای (Justice Constellation)',
                'category'=> 'constellation',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90"><circle cx="20" cy="20" r="3" fill="currentColor" fill-opacity="{opacity}"/><circle cx="70" cy="30" r="4" fill="currentColor" fill-opacity="{opacity}"/><circle cx="45" cy="75" r="3.5" fill="currentColor" fill-opacity="{opacity}"/><line x1="20" y1="20" x2="70" y2="30" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="70" y1="30" x2="45" y2="75" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="45" y1="75" x2="20" y2="20" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'cyber-matrix-circuit' => [
                'name'    => 'مدارهای سایبری و شاهراه داده (Cyber Matrix Circuits)',
                'category'=> 'cyber',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M0 30h20l10-10h30M0 50h35l10-10" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><circle cx="20" cy="30" r="2.5" fill="currentColor" fill-opacity="{opacity}"/><rect x="42" y="38" width="5" height="5" fill="currentColor" fill-opacity="{opacity}"/></svg>',
            ],
            'aurora-ribbons' => [
                'name'    => 'روبان‌های نورانی شفق قطبی (Aurora Wave Ribbons)',
                'category'=> 'waves',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="140" height="70" viewBox="0 0 140 70"><path d="M0 45 C 40 10, 90 60, 140 25" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="{opacity}"/><path d="M0 55 C 45 20, 95 65, 140 35" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            'islamic-geometric-lines' => [
                'name'    => 'هندسه زرین شمسه و خطوط اسلیمی مدرن (Islamic Linear Geometry)',
                'category'=> 'geometric',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><polygon points="32,4 40,24 60,32 40,40 32,60 24,40 4,32 24,24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><circle cx="32" cy="32" r="14" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'isometric-court-grid' => [
                'name'    => 'تراز ایزومتریک کاخ دادگستری (Isometric Grid)',
                'category'=> 'architectural',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="35" viewBox="0 0 60 35"><line x1="0" y1="0" x2="30" y2="17.5" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="60" y1="0" x2="30" y2="17.5" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="30" y1="17.5" x2="30" y2="35" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="0" y1="17.5" x2="30" y2="35" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="60" y1="17.5" x2="30" y2="35" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'cadastral-boundary-mesh' => [
                'name'    => 'شبکه کاداستر و تفکیک اراضی شهری (Cadastral Mesh)',
                'category'=> 'contours',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><rect x="5" y="5" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><rect x="25" y="5" width="20" height="40" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><rect x="5" y="25" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            'golden-ratio-spirals' => [
                'name'    => 'مارپیچ لگاریتمی نسبت طلایی فیبوناچی (Golden Spiral)',
                'category'=> 'geometric',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path d="M40 40 a10 10 0 0 1 10 10 a20 20 0 0 1 -20 20 a40 40 0 0 1 -40 -40 a70 70 0 0 1 70 -70" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/></svg>',
            ],
            // 11-20
            'sinusoidal-justice-stream' => [
                'name'    => 'جریان ممتد سینوسی عدالت (Sinusoidal Stream)',
                'category'=> 'waves',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40" viewBox="0 0 80 40"><path d="M0 20 Q 20 0, 40 20 T 80 20" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><path d="M0 26 Q 20 6, 40 26 T 80 26" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'synaptic-neural-web' => [
                'name'    => 'تار و پود سیناپسی هوش مصنوعی حقوقی (Synaptic Web)',
                'category'=> 'constellation',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"><circle cx="35" cy="35" r="4" fill="currentColor" fill-opacity="{opacity}"/><circle cx="10" cy="15" r="2.5" fill="currentColor" fill-opacity="{opacity}"/><circle cx="60" cy="20" r="3" fill="currentColor" fill-opacity="{opacity}"/><circle cx="20" cy="60" r="2" fill="currentColor" fill-opacity="{opacity}"/><circle cx="55" cy="55" r="3" fill="currentColor" fill-opacity="{opacity}"/><line x1="35" y1="35" x2="10" y2="15" stroke="currentColor" stroke-width="0.7" stroke-opacity="{opacity}"/><line x1="35" y1="35" x2="60" y2="20" stroke="currentColor" stroke-width="0.7" stroke-opacity="{opacity}"/><line x1="35" y1="35" x2="20" y2="60" stroke="currentColor" stroke-width="0.7" stroke-opacity="{opacity}"/><line x1="35" y1="35" x2="55" y2="55" stroke="currentColor" stroke-width="0.7" stroke-opacity="{opacity}"/></svg>',
            ],
            'stratified-geological-folds' => [
                'name'    => 'لایه‌بندی‌های چین‌خورده ژئولوژیک (Geological Folds)',
                'category'=> 'contours',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50" viewBox="0 0 100 50"><path d="M0 10 Q 25 35, 50 10 T 100 10" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><path d="M0 25 Q 25 50, 50 25 T 100 25" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><path d="M0 40 Q 25 65, 50 40 T 100 40" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'bezier-silk-strands' => [
                'name'    => 'الیاف موازی ابریشمین بزیه (Bezier Silk Strands)',
                'category'=> 'waves',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="50" viewBox="0 0 120 50"><path d="M0 10 C 40 40, 80 0, 120 30" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><path d="M0 18 C 40 48, 80 8, 120 38" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><path d="M0 26 C 40 56, 80 16, 120 46" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            'cyber-wireframe-terrain' => [
                'name'    => 'شبکه وایرفریم دشت دیجیتال (Wireframe Terrain)',
                'category'=> 'cyber',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40" viewBox="0 0 80 40"><line x1="0" y1="40" x2="40" y2="0" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="80" y1="40" x2="40" y2="0" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="0" y1="20" x2="80" y2="20" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="0" y1="35" x2="80" y2="35" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/></svg>',
            ],
            'sacred-geometry-flower' => [
                'name'    => 'گل حیات و دوایر متقاطع قدسی (Flower of Life)',
                'category'=> 'guilloche',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><circle cx="30" cy="10" r="20" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><circle cx="30" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><circle cx="12" cy="20" r="20" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><circle cx="48" cy="20" r="20" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'quantum-probability-lattice' => [
                'name'    => 'شبکه احتمالات کوانتومی (Quantum Probability)',
                'category'=> 'constellation',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="1.5" fill="currentColor" fill-opacity="{opacity}"/><circle cx="6" cy="6" r="1.5" fill="currentColor" fill-opacity="{opacity}"/><circle cx="34" cy="34" r="1.5" fill="currentColor" fill-opacity="{opacity}"/><line x1="6" y1="6" x2="34" y2="34" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 3" stroke-opacity="{opacity}"/></svg>',
            ],
            'soundwave-advocacy' => [
                'name'    => 'طیف فرکانس نطق و دفاعیه وکیل (Soundwave Advocacy)',
                'category'=> 'minimal',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><line x1="5" y1="15" x2="5" y2="25" stroke="currentColor" stroke-width="2" stroke-opacity="{opacity}"/><line x1="15" y1="8" x2="15" y2="32" stroke="currentColor" stroke-width="2" stroke-opacity="{opacity}"/><line x1="25" y1="2" x2="25" y2="38" stroke="currentColor" stroke-width="2" stroke-opacity="{opacity}"/><line x1="35" y1="10" x2="35" y2="30" stroke="currentColor" stroke-width="2" stroke-opacity="{opacity}"/><line x1="45" y1="5" x2="45" y2="35" stroke="currentColor" stroke-width="2" stroke-opacity="{opacity}"/><line x1="55" y1="16" x2="55" y2="24" stroke="currentColor" stroke-width="2" stroke-opacity="{opacity}"/></svg>',
            ],
            'islamic-arabesque-lattice' => [
                'name'    => 'پنجره مشبک اسلیمی حرم (Arabesque Lattice)',
                'category'=> 'geometric',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path d="M24 0 L48 24 L24 48 L0 24 Z" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><path d="M24 8 Q 32 16, 24 24 T 24 40" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'vortex-fluid-curves' => [
                'name'    => 'گرداب خم‌های دینامیک (Vortex Fluid Curves)',
                'category'=> 'waves',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90"><path d="M45 45 m -35 0 a 35 35 0 1 0 70 0 a 35 35 0 1 0 -70 0" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><path d="M45 45 m -20 0 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/></svg>',
            ],
            // 21-30
            'chladni-resonance-harmonics' => [
                'name'    => 'الگوهای هارمونیک تشدید کلادنی (Chladni Resonance)',
                'category'=> 'guilloche',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><ellipse cx="30" cy="30" rx="25" ry="10" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><ellipse cx="30" cy="30" rx="10" ry="25" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            'optical-fiber-bundle' => [
                'name'    => 'رشته‌های موازی فیبر نوری زرین (Fiber Optic Bundle)',
                'category'=> 'cyber',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50" viewBox="0 0 100 50"><line x1="0" y1="10" x2="100" y2="40" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><line x1="0" y1="20" x2="100" y2="30" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><line x1="0" y1="30" x2="100" y2="20" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            'parabolic-light-echo' => [
                'name'    => 'پژواک‌های سهمی بازتاب نور (Parabolic Echoes)',
                'category'=> 'waves',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path d="M0 80 Q 40 40, 80 0" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><path d="M15 80 Q 45 45, 80 15" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'astrolabe-celestial-rings' => [
                'name'    => 'حلقه‌های فلکی اسطرلاب کهن (Astrolabe Celestial Rings)',
                'category'=> 'constellation',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}" stroke-dasharray="4 4"/><circle cx="40" cy="40" r="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/><line x1="40" y1="5" x2="40" y2="75" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'architectural-perspective-grid' => [
                'name'    => 'پرسپکتیو رواق‌های ستون‌دار عدلیه (Courthouse Colonnade)',
                'category'=> 'architectural',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="50" viewBox="0 0 80 50"><line x1="10" y1="0" x2="10" y2="50" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/><line x1="40" y1="0" x2="40" y2="50" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/><line x1="70" y1="0" x2="70" y2="50" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/><line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'orbital-gravitational-field' => [
                'name'    => 'میدان گرادیان مداری جاذبه (Orbital Field)',
                'category'=> 'contours',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><circle cx="35" cy="35" r="20" fill="none" stroke="currentColor" stroke-width="1.1" stroke-opacity="{opacity}"/><circle cx="35" cy="35" r="8" fill="currentColor" fill-opacity="{opacity}"/></svg>',
            ],
            'harmonic-resonance-waves' => [
                'name'    => 'امواج تشدید هارمونیک پیوسته (Harmonic Resonance)',
                'category'=> 'waves',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 100 40"><path d="M0 20 Q 25 0, 50 20 T 100 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/><path d="M0 20 Q 12.5 5, 25 20 T 50 20 T 75 20 T 100 20" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'binary-matrix-rain' => [
                'name'    => 'باران کد باینری و بیت‌های رمزنگاری (Binary Rain Stream)',
                'category'=> 'cyber',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" viewBox="0 0 30 50"><text x="5" y="15" font-family="monospace" font-size="10" fill="currentColor" fill-opacity="{opacity}">1</text><text x="5" y="30" font-family="monospace" font-size="10" fill="currentColor" fill-opacity="{opacity}">0</text><text x="5" y="45" font-family="monospace" font-size="10" fill="currentColor" fill-opacity="{opacity}">1</text><text x="18" y="22" font-family="monospace" font-size="10" fill="currentColor" fill-opacity="{opacity}">0</text><text x="18" y="38" font-family="monospace" font-size="10" fill="currentColor" fill-opacity="{opacity}">1</text></svg>',
            ],
            'guilloche-rosette-seal' => [
                'name'    => 'مهر برجسته گیلوش مدالیون عدلیه (Guilloche Rosette Seal)',
                'category'=> 'guilloche',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><polygon points="40,5 50,30 75,40 50,50 40,75 30,50 5,40 30,30" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/></svg>',
            ],
            'blockchain-merkle-dag' => [
                'name'    => 'ساختار زنجیره بلوکی و درخت مرکل (Merkle DAG)',
                'category'=> 'constellation',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect x="25" y="5" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><rect x="10" y="35" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><rect x="40" y="35" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><line x1="30" y1="15" x2="15" y2="35" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><line x1="30" y1="15" x2="45" y2="35" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            // 31-40
            'persian-girih-decagram' => [
                'name'    => 'گره ده‌تند اصیل ایرانی (Persian Girih Decagram)',
                'category'=> 'geometric',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"><polygon points="35,5 42,24 62,24 46,36 52,55 35,44 18,55 24,36 8,24 28,24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/></svg>',
            ],
            'hyperbolic-tessellation' => [
                'name'    => 'موزاییک هذلولی پوآنکاره (Hyperbolic Tessellation)',
                'category'=> 'guilloche',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><path d="M2 30 A28 28 0 0 0 58 30" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><path d="M30 2 A28 28 0 0 0 30 58" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'geodetic-surveyor-triangulation' => [
                'name'    => 'مثلث‌بندی ژئودتیک نقشه‌برداری (Surveyor Triangulation)',
                'category'=> 'contours',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="60" viewBox="0 0 70 60"><polygon points="35,5 65,55 5,55" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><line x1="35" y1="5" x2="35" y2="55" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3" stroke-opacity="{opacity}"/><line x1="5" y1="55" x2="50" y2="30" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'cyber-neon-hex-grid' => [
                'name'    => 'شبکه شش‌ضلعی نئونی سایبر (Neon Hex Grid)',
                'category'=> 'cyber',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="48" viewBox="0 0 56 48"><polygon points="28,2 54,16 54,46 28,60 2,46 2,16" transform="scale(0.8)" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/></svg>',
            ],
            'muqarnas-vault-facets' => [
                'name'    => 'پایه‌های مقرنس طاق نصرت (Muqarnas Vault Facets)',
                'category'=> 'geometric',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="50" viewBox="0 0 60 50"><path d="M0 0 L30 25 L60 0 L60 25 L30 50 L0 25 Z" fill="none" stroke="currentColor" stroke-width="1.1" stroke-opacity="{opacity}"/><line x1="30" y1="25" x2="30" y2="50" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            'quantum-entanglement-threads' => [
                'name'    => 'تارهای درهم‌تنیدگی کوانتومی (Quantum Threads)',
                'category'=> 'constellation',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="90" height="45" viewBox="0 0 90 45"><ellipse cx="25" cy="22" rx="18" ry="12" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><ellipse cx="65" cy="22" rx="18" ry="12" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><line x1="25" y1="22" x2="65" y2="22" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" stroke-opacity="{opacity}"/></svg>',
            ],
            'penrose-aperiodic-tiling' => [
                'name'    => 'کاشی‌کاری غیردوره‌ای پنروز (Penrose Aperiodic Tiling)',
                'category'=> 'architectural',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><polygon points="30,5 55,22 45,52 15,52 5,22" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><polygon points="30,20 42,28 38,44 22,44 18,28" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'sound-frequency-spectrum' => [
                'name'    => 'طیف فرکانسی آنالیز صوت و استراق‌سمع (Sound Spectrum)',
                'category'=> 'minimal',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="30" viewBox="0 0 70 30"><rect x="5" y="10" width="3" height="15" fill="currentColor" fill-opacity="{opacity}"/><rect x="15" y="4" width="3" height="21" fill="currentColor" fill-opacity="{opacity}"/><rect x="25" y="1" width="3" height="24" fill="currentColor" fill-opacity="{opacity}"/><rect x="35" y="8" width="3" height="17" fill="currentColor" fill-opacity="{opacity}"/><rect x="45" y="2" width="3" height="23" fill="currentColor" fill-opacity="{opacity}"/><rect x="55" y="12" width="3" height="13" fill="currentColor" fill-opacity="{opacity}"/></svg>',
            ],
            'celestial-nebula-plasma' => [
                'name'    => 'پلاسمای سیال سحابی‌های کهکشانی (Celestial Nebula)',
                'category'=> 'waves',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60" viewBox="0 0 100 60"><path d="M10 30 C 30 10, 70 50, 90 30 C 70 10, 30 50, 10 30 Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/></svg>',
            ],
            'spirograph-hypotrochoid-rosette' => [
                'name'    => 'اسپیروگراف هایپوتروکوئید زرین (Spirograph Rosette)',
                'category'=> 'guilloche',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" stroke-width="0.7" stroke-opacity="{opacity}"/><ellipse cx="40" cy="40" rx="35" ry="10" transform="rotate(30 40 40)" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><ellipse cx="40" cy="40" rx="35" ry="10" transform="rotate(60 40 40)" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><ellipse cx="40" cy="40" rx="35" ry="10" transform="rotate(90 40 40)" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            // 41-50
            'topographic-elevation-lines' => [
                'name'    => 'خطوط تراز سطحی زمین‌شناسی (Topographic Elevation)',
                'category'=> 'contours',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40" viewBox="0 0 80 40"><path d="M0 20 Q 20 5, 40 20 T 80 20" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><path d="M0 28 Q 20 13, 40 28 T 80 28" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'circuit-board-micro-traces' => [
                'name'    => 'میکروترک‌های برد الکترونیک (Circuit Micro Traces)',
                'category'=> 'cyber',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><line x1="5" y1="10" x2="30" y2="10" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><line x1="30" y1="10" x2="45" y2="25" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><circle cx="45" cy="25" r="2" fill="currentColor" fill-opacity="{opacity}"/></svg>',
            ],
            'islamic-star-polygon-interlace' => [
                'name'    => 'گره‌بندی ستاره هشت‌پر اسلامی (Eight-Point Star)',
                'category'=> 'geometric',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><rect x="15" y="15" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><rect x="15" y="15" width="30" height="30" transform="rotate(45 30 30)" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            'neural-network-deep-learning' => [
                'name'    => 'شبکه عصبی یادگیری عمیق (Deep Neural Network)',
                'category'=> 'constellation',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="15" cy="15" r="3" fill="currentColor" fill-opacity="{opacity}"/><circle cx="15" cy="45" r="3" fill="currentColor" fill-opacity="{opacity}"/><circle cx="45" cy="30" r="3.5" fill="currentColor" fill-opacity="{opacity}"/><line x1="15" y1="15" x2="45" y2="30" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="15" y1="45" x2="45" y2="30" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'voronoi-polygonal-mesh' => [
                'name'    => 'شبکه سلولی ورونوی برداری (Voronoi Polygonal Mesh)',
                'category'=> 'architectural',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><polygon points="10,10 30,5 45,25 35,45 15,40" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><polygon points="30,5 55,10 50,35 45,25" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            'radial-soundwave-mandala' => [
                'name'    => 'ماندالای امواج شعاعی صوتی (Soundwave Mandala)',
                'category'=> 'minimal',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 4" stroke-opacity="{opacity}"/><circle cx="35" cy="35" r="18" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><circle cx="35" cy="35" r="5" fill="currentColor" fill-opacity="{opacity}"/></svg>',
            ],
            'fibonacci-phyllotaxis-matrix' => [
                'name'    => 'آرایش دانه‌ای مارپیچ فیلوتاکسی (Fibonacci Phyllotaxis)',
                'category'=> 'guilloche',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="2" fill="currentColor" fill-opacity="{opacity}"/><circle cx="38" cy="26" r="2.5" fill="currentColor" fill-opacity="{opacity}"/><circle cx="22" cy="38" r="2.5" fill="currentColor" fill-opacity="{opacity}"/><circle cx="45" cy="38" r="3" fill="currentColor" fill-opacity="{opacity}"/><circle cx="15" cy="20" r="3" fill="currentColor" fill-opacity="{opacity}"/></svg>',
            ],
            'oceanic-depth-currents' => [
                'name'    => 'جریان‌های ژرفاقیانوسی اطلس (Oceanic Depth Currents)',
                'category'=> 'waves',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="90" height="45" viewBox="0 0 90 45"><path d="M0 15 C 30 35, 60 5, 90 25" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><path d="M0 25 C 30 45, 60 15, 90 35" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'synthwave-laser-perspective' => [
                'name'    => 'پرسپکتیو لیزری سینت‌ویو (Synthwave Laser Grid)',
                'category'=> 'cyber',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40" viewBox="0 0 80 40"><line x1="0" y1="40" x2="40" y2="0" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><line x1="80" y1="40" x2="40" y2="0" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><line x1="20" y1="40" x2="40" y2="0" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="60" y1="40" x2="40" y2="0" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="0" y1="30" x2="80" y2="30" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/></svg>',
            ],
            'seismic-wave-propagation' => [
                'name'    => 'انتشار موجی امواج لرزه‌ای زمین (Seismic Wave Propagation)',
                'category'=> 'contours',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 100 40"><path d="M0 20 L20 20 L30 5 L40 35 L50 10 L60 28 L70 20 L100 20" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/></svg>',
            ],
            // 51-66
            'persian-toranj-medallion' => [
                'name'    => 'ترنج و شمسه اصیل فرش ایرانی (Persian Toranj Medallion)',
                'category'=> 'geometric',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"><ellipse cx="35" cy="35" rx="30" ry="18" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><ellipse cx="35" cy="35" rx="18" ry="30" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><circle cx="35" cy="35" r="8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/></svg>',
            ],
            'astronomical-armillary-sphere' => [
                'name'    => 'کره آرمیلاری رصدخانه مراغه (Armillary Sphere)',
                'category'=> 'constellation',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><ellipse cx="35" cy="35" rx="30" ry="12" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}" transform="rotate(35 35 35)"/><line x1="35" y1="2" x2="35" y2="68" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/></svg>',
            ],
            'dodecahedron-holographic-wireframe' => [
                'name'    => 'وایرفریم هولوگرافیک دوازده‌وجهی (Dodecahedron Wireframe)',
                'category'=> 'architectural',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><polygon points="30,8 52,22 44,48 16,48 8,22" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><polygon points="30,18 42,26 38,42 22,42 18,26" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'lissajous-harmonic-curves' => [
                'name'    => 'خم‌های هارمونیک لیساژو (Lissajous Curves)',
                'category'=> 'minimal',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"><path d="M15 35 C 15 15, 55 15, 55 35 C 55 55, 15 55, 15 35 Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><path d="M35 15 C 15 15, 15 55, 35 55 C 55 55, 55 15, 35 15 Z" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'aurora-borealis-law-stream' => [
                'name'    => 'شفق پرتوافشان حاکمیت قانون (Sovereign Law Aurora)',
                'category'=> 'waves',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="110" height="50" viewBox="0 0 110 50"><path d="M0 35 Q 28 5, 55 30 T 110 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/><path d="M0 45 Q 28 15, 55 40 T 110 25" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            'fractal-sierpinski-lattice' => [
                'name'    => 'شبکه فرکتالی سرپینسکی زرین (Sierpinski Lattice)',
                'category'=> 'guilloche',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="52" viewBox="0 0 60 52"><polygon points="30,2 58,50 2,50" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><polygon points="30,50 44,26 16,26" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'isometric-block-cityscape' => [
                'name'    => 'افق شهری ایزومتریک کلان‌شهر (Isometric Cityscape)',
                'category'=> 'cyber',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><polygon points="30,5 50,15 30,25 10,15" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><line x1="10" y1="15" x2="10" y2="35" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><line x1="30" y1="25" x2="30" y2="40" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><line x1="50" y1="15" x2="50" y2="35" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            'stratified-sediment-bedding' => [
                'name'    => 'چینه‌شناسی لایه‌های رسوبی (Sediment Bedding)',
                'category'=> 'contours',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="90" height="45" viewBox="0 0 90 45"><path d="M0 10 Q 45 25, 90 10" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/><path d="M0 22 Q 45 37, 90 22" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><path d="M0 34 Q 45 49, 90 34" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'muqarnas-honeycomb-corbel' => [
                'name'    => 'پیش‌آمدگی‌های مقرنس کندویی (Muqarnas Honeycomb)',
                'category'=> 'geometric',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><path d="M0 10 L15 0 L30 10 L45 0 L60 10 L60 30 L45 40 L30 30 L15 40 L0 30 Z" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            'particle-collider-tracks' => [
                'name'    => 'ردپای ذرات شتاب‌دهنده فیزیک (Particle Collider Tracks)',
                'category'=> 'constellation',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70"><circle cx="35" cy="35" r="30" fill="none" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><path d="M5 35 Q 35 15, 65 35" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><circle cx="35" cy="25" r="3" fill="currentColor" fill-opacity="{opacity}"/></svg>',
            ],
            'hexagonal-honeycomb-cellular' => [
                'name'    => 'کندوی شش‌وجهی سلولی ارگانیک (Honeycomb Cellular)',
                'category'=> 'architectural',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="42" viewBox="0 0 48 42"><polygon points="24,2 46,14 46,38 24,50 2,38 2,14" transform="scale(0.7)" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/></svg>',
            ],
            'fluid-mercury-ribbons' => [
                'name'    => 'روبان‌های روان جیوه و فلز مایع (Fluid Mercury Ribbons)',
                'category'=> 'waves',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50" viewBox="0 0 100 50"><path d="M0 25 C 25 5, 75 45, 100 25" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="{opacity}"/><path d="M0 32 C 25 12, 75 52, 100 32" fill="none" stroke="currentColor" stroke-width="1" stroke-opacity="{opacity}"/></svg>',
            ],
            'cyber-hud-tactical-crosshairs' => [
                'name'    => 'نشانه‌گیرها و رادار تاکتیکی هاد (Tactical HUD Crosshairs)',
                'category'=> 'cyber',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="6 4" stroke-opacity="{opacity}"/><line x1="30" y1="2" x2="30" y2="58" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/><line x1="2" y1="30" x2="58" y2="30" stroke="currentColor" stroke-width="0.8" stroke-opacity="{opacity}"/></svg>',
            ],
            'guilloche-currency-waves' => [
                'name'    => 'امواج امنیتی خطی اسکناس‌های بین‌المللی (Guilloche Currency)',
                'category'=> 'guilloche',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="90" height="40" viewBox="0 0 90 40"><path d="M0 20 Q 22 5, 45 20 T 90 20" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><path d="M0 20 Q 22 35, 45 20 T 90 20" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/></svg>',
            ],
            'cosmic-superstring-loops' => [
                'name'    => 'حلقه‌های ریسمان کیهانی کوانتوم (Cosmic Superstring Loops)',
                'category'=> 'waves',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="50" viewBox="0 0 80 50"><ellipse cx="40" cy="25" rx="35" ry="15" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><ellipse cx="40" cy="25" rx="20" ry="10" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3" stroke-opacity="{opacity}"/></svg>',
            ],
            'sedrazavi-sovereign-emblem' => [
                'name'    => 'نشان شاهین حاکمیت عدلیه سید رضوی (SedRazavi Sovereign Emblem)',
                'category'=> 'constellation',
                'svg'     => '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="{opacity}"/><polygon points="40,10 48,32 70,40 48,48 40,70 32,48 10,40 32,32" fill="none" stroke="currentColor" stroke-width="1.2" stroke-opacity="{opacity}"/><circle cx="40" cy="40" r="6" fill="currentColor" fill-opacity="{opacity}"/></svg>',
            ],
        ];
    }

    /**
     * Generate data URI for given pattern and opacity
     */
    public static function get_data_uri($pattern_id = 'dynamic-flowing-waves', $opacity = 0.08) {
        $catalog = self::get_patterns_catalog();
        if (!isset($catalog[$pattern_id])) {
            $pattern_id = 'dynamic-flowing-waves';
        }

        $svg_raw = $catalog[$pattern_id]['svg'];
        $svg_with_opacity = str_replace('{opacity}', esc_attr((string)$opacity), $svg_raw);
        $encoded = rawurlencode($svg_with_opacity);

        return "data:image/svg+xml;utf8,{$encoded}";
    }

    /**
     * Inject dynamic CSS utility classes
     */
    public function inject_dynamic_pattern_styles() {
        $active_pattern = get_theme_mod('sedrazavi_bg_pattern', 'dynamic-flowing-waves');
        $active_opacity = get_theme_mod('sedrazavi_bg_pattern_opacity', '0.07');
        $data_uri = self::get_data_uri($active_pattern, floatval($active_opacity));
        ?>
        <style id="sedrazavi-vector-pattern-css">
            :root {
                --sr-bg-pattern-uri: url("<?php echo $data_uri; ?>");
            }
            .sr-pattern-bg-active {
                background-image: var(--sr-bg-pattern-uri);
                background-repeat: repeat;
            }
            .sr-pattern-overlay {
                position: absolute;
                inset: 0;
                background-image: var(--sr-bg-pattern-uri);
                background-repeat: repeat;
                pointer-events: none;
                z-index: 1;
            }
        </style>
        <?php
    }

    /**
     * Register REST API routes
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/patterns', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_get_patterns'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function rest_get_patterns($request) {
        $catalog = self::get_patterns_catalog();
        $output = [];
        foreach ($catalog as $key => $item) {
            $output[] = [
                'id'       => $key,
                'name'     => $item['name'],
                'category' => $item['category'],
                'data_uri' => self::get_data_uri($key, 0.15),
            ];
        }

        return rest_ensure_response([
            'success'  => true,
            'total'    => count($output),
            'patterns' => $output,
        ]);
    }
}
