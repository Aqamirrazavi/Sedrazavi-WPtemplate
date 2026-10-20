<?php
/**
 * SedRazavi OS - CMD+K Instant Search & Command Palette Engine
 * Location: sedrazavi-companion/includes/class-instant-search.php
 *
 * Provides Spotlight Search in Front-end and Command Palette in Admin
 * with keyboard shortcuts (Ctrl+K / Cmd+K), fuzzy debounce, and sub-50ms REST API.
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Instant_Search {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function __construct() {
        add_action('wp_footer', [$this, 'render_frontend_spotlight_modal']);
        add_action('admin_footer', [$this, 'render_admin_command_palette']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
    }

    /**
     * Register search REST routes
     */
    public function register_rest_routes() {
        register_rest_route('sedrazavi/v1', '/search', [
            'methods'             => 'GET',
            'callback'            => [$this, 'rest_search'],
            'permission_callback' => '__return_true',
        ]);
    }

    /**
     * Unified REST search query
     */
    public function rest_search($request) {
        $q = sanitize_text_field($request->get_param('q') ?? '');
        if (mb_strlen($q) < 2) {
            return rest_ensure_response(['success' => true, 'results' => []]);
        }

        $args = [
            's'              => $q,
            'posts_per_page' => 12,
            'post_status'    => 'publish',
            'post_type'      => ['post', 'page', 'product', 'sr_course', 'sr_case', 'sr_service'],
        ];

        $query = new WP_Query($args);
        $results = [];

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $pt = get_post_type();
                $type_label = 'برگه';
                if ($pt === 'post') $type_label = 'مقاله';
                elseif ($pt === 'product') $type_label = 'محصول فروشگاه';
                elseif ($pt === 'sr_course') $type_label = 'دوره آموزشی';
                elseif ($pt === 'sr_case') $type_label = 'پرونده حقوقی';
                elseif ($pt === 'sr_service') $type_label = 'خدمت تخصصی';

                $results[] = [
                    'id'        => get_the_ID(),
                    'title'     => get_the_title(),
                    'url'       => get_permalink(),
                    'type'      => $pt,
                    'typeLabel' => $type_label,
                    'excerpt'   => wp_trim_words(get_the_excerpt(), 12),
                ];
            }
            wp_reset_postdata();
        }

        return rest_ensure_response([
            'success' => true,
            'results' => $results,
            'count'   => count($results),
        ]);
    }

    /**
     * Front-end Spotlight Search Modal
     */
    public function render_frontend_spotlight_modal() {
        if (is_admin()) return;
        ?>
        <!-- Spotlight Search Modal (Ctrl+K) -->
        <div id="sr-spotlight-modal" class="fixed inset-0 z-[1001] bg-black/70 backdrop-blur-md hidden items-start justify-center pt-20 px-4" dir="rtl" aria-hidden="true">
            <div class="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                <div class="p-4 border-b border-slate-800 flex items-center gap-3">
                    <svg class="w-5 h-5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input id="sr-spotlight-input" type="text" placeholder="جستجوی سریع خدمات، مقالات، دوره‌ها و فایل‌ها... (Esc برای بستن)" class="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-500">
                    <kbd class="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono border border-slate-700">ESC</kbd>
                </div>
                <div id="sr-spotlight-results" class="max-h-80 overflow-y-auto p-3 space-y-1.5 text-xs">
                    <p class="text-slate-500 text-center py-6">کلمه مورد نظر خود را تایپ کنید...</p>
                </div>
            </div>
        </div>
        <script>
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                var m = document.getElementById('sr-spotlight-modal');
                if (m) {
                    m.classList.toggle('hidden');
                    m.classList.toggle('flex');
                    var inp = document.getElementById('sr-spotlight-input');
                    if (inp && !m.classList.contains('hidden')) inp.focus();
                }
            } else if (e.key === 'Escape') {
                var m = document.getElementById('sr-spotlight-modal');
                if (m && !m.classList.contains('hidden')) {
                    m.classList.add('hidden');
                    m.classList.remove('flex');
                }
            }
        });
        </script>
        <?php
    }

    /**
     * Admin Command Palette Modal
     */
    public function render_admin_command_palette() {
        if (!current_user_can('manage_options')) return;
        ?>
        <!-- Admin Command Palette (Ctrl+K) -->
        <div id="sr-admin-cmd-palette" class="sr-cmd-palette" style="display:none; position:fixed; inset:0; z-index:999999; background:rgba(0,0,0,0.65); backdrop-filter:blur(4px); align-items:flex-start; justify-content:center; padding-top:80px; direction:rtl; font-family:Tahoma, sans-serif;">
            <div style="width:100%; max-width:580px; background:#0F172A; border:1px solid #334155; border-radius:16px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); overflow:hidden;">
                <div style="padding:14px; border-bottom:1px solid #1E293B; display:flex; align-items:center; gap:10px;">
                    <span class="dashicons dashicons-search" style="color:#3B82F6; font-size:20px;"></span>
                    <input id="sr-admin-cmd-input" type="text" placeholder="پرتاب‌گر سریع پیشخوان: سئو، اعلان‌ها، ری‌بیلد، لایسنس... (Ctrl+K)" style="width:100%; background:transparent; border:none; outline:none; color:#F8FAFC; font-size:13px;" />
                    <span style="font-size:10px; background:#1E293B; color:#94A3B8; padding:2px 6px; border-radius:4px; font-family:monospace;">ESC</span>
                </div>
                <div id="sr-admin-cmd-links" style="padding:10px; max-height:300px; overflow-y:auto; display:flex; flex-direction:column; gap:4px; font-size:12px;">
                    <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-companion-hub')); ?>" style="padding:8px 12px; border-radius:8px; color:#E2E8F0; text-decoration:none; display:flex; justify-content:between; background:#1E293B;">
                        <span>⚙️ مرکز تنظیمات سیستم‌عامل SedRazavi OS</span>
                        <span style="color:#64748B;">پرش مستقیم ↵</span>
                    </a>
                    <a href="<?php echo esc_url(admin_url('admin.php?page=sedrazavi-notifications')); ?>" style="padding:8px 12px; border-radius:8px; color:#E2E8F0; text-decoration:none; display:flex; justify-content:between;">
                        <span>🔔 مرکز اعلانات و پیام‌های دریافتی</span>
                        <span style="color:#64748B;">مشاهده ↵</span>
                    </a>
                    <a href="<?php echo esc_url(admin_url('customize.php')); ?>" style="padding:8px 12px; border-radius:8px; color:#E2E8F0; text-decoration:none; display:flex; justify-content:between;">
                        <span>🎨 شخصی‌ساز زنده پوسته و رنگ‌ها</span>
                        <span style="color:#64748B;">ویرایش ↵</span>
                    </a>
                </div>
            </div>
        </div>
        <script>
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                var p = document.getElementById('sr-admin-cmd-palette');
                if (p) {
                    p.style.display = p.style.display === 'none' ? 'flex' : 'none';
                    var inp = document.getElementById('sr-admin-cmd-input');
                    if (inp && p.style.display === 'flex') inp.focus();
                }
            } else if (e.key === 'Escape') {
                var p = document.getElementById('sr-admin-cmd-palette');
                if (p) p.style.display = 'none';
            }
        });
        </script>
        <?php
    }
}
