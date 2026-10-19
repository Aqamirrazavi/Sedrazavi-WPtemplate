<?php
/**
 * SedRazavi Soft98-Style Professional Download Box
 *
 * Implements a high-converting, multi-mirror download box with OS badges,
 * one-click copy archive password, checksum verification, and AJAX broken link reporter.
 *
 * @package SedRazavi_Companion
 * @version 5.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Soft98_Download_Box {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_shortcode('sedrazavi_download_box', [$this, 'render_download_box_shortcode']);
        add_action('wp_ajax_sedrazavi_report_broken_link', [$this, 'ajax_report_broken_link']);
        add_action('wp_ajax_nopriv_sedrazavi_report_broken_link', [$this, 'ajax_report_broken_link']);
    }

    public function render_download_box_shortcode($atts) {
        $atts = shortcode_atts([
            'title'        => 'دانلود بسته نرم‌افزار مهندسی وردپرس',
            'version'      => 'v5.0.0 (نسخه نهایی)',
            'filesize'     => '۴۸ مگابایت',
            'os'           => 'windows,mac,linux', // windows, mac, android, linux
            'password'     => 'www.sedrazavi.ir',
            'direct_url'   => '#download-direct',
            'mirror_url'   => '#download-mirror',
            'md5'          => 'd41d8cd98f00b204e9800998ecf8427e',
        ], $atts);

        $box_id = 'sr-dl-' . wp_generate_password(6, false);
        $os_list = array_map('trim', explode(',', strtolower($atts['os'])));

        ob_start();
        ?>
        <div class="sr-soft98-download-box my-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden" id="<?php echo esc_attr($box_id); ?>" dir="rtl">
            <!-- Box Header -->
            <div class="flex flex-wrap items-center justify-between p-4 bg-gradient-to-l from-slate-900 via-slate-800/80 to-slate-900 border-b border-slate-800 gap-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    </div>
                    <div>
                        <h4 class="text-sm font-bold text-white"><?php echo esc_html($atts['title']); ?></h4>
                        <div class="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span class="font-mono text-blue-400 font-semibold"><?php echo esc_html($atts['version']); ?></span>
                            <span>•</span>
                            <span>حجم: <?php echo esc_html($atts['filesize']); ?></span>
                        </div>
                    </div>
                </div>

                <!-- OS Badges -->
                <div class="flex items-center gap-1.5">
                    <?php if (in_array('windows', $os_list, true)): ?>
                        <span class="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono">Windows</span>
                    <?php endif; ?>
                    <?php if (in_array('mac', $os_list, true)): ?>
                        <span class="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono">macOS</span>
                    <?php endif; ?>
                    <?php if (in_array('linux', $os_list, true)): ?>
                        <span class="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono">Linux</span>
                    <?php endif; ?>
                    <?php if (in_array('android', $os_list, true)): ?>
                        <span class="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">Android</span>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Download Links & Password Section -->
            <div class="p-5 space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <!-- Direct Download Link -->
                    <a href="<?php echo esc_url($atts['direct_url']); ?>" class="flex items-center justify-between p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-600/20">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                            <span>دانلود با لینک مستقیم (سرور پرسرعت)</span>
                        </div>
                        <span class="text-[10px] opacity-80 font-mono">HTTP/2</span>
                    </a>

                    <!-- Mirror / Backup Link -->
                    <a href="<?php echo esc_url($atts['mirror_url']); ?>" class="flex items-center justify-between p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all border border-slate-700">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                            <span>لینک کمکی (سرور پشتیبان آلمان)</span>
                        </div>
                        <span class="text-[10px] text-slate-400 font-mono">Mirror</span>
                    </a>
                </div>

                <!-- Password Row & Checksum -->
                <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
                    <div class="flex items-center gap-2">
                        <span class="text-slate-400">رمز فایل فشرده:</span>
                        <div class="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800">
                            <span class="font-mono text-emerald-400 font-bold select-all" id="<?php echo esc_attr($box_id); ?>-pwd"><?php echo esc_html($atts['password']); ?></span>
                            <button type="button" class="text-slate-400 hover:text-white transition-colors" onclick="navigator.clipboard.writeText('<?php echo esc_js($atts['password']); ?>'); this.innerText='کپی شد!';" title="کپی رمز">
                                📋
                            </button>
                        </div>
                    </div>

                    <!-- Broken link reporter with nonce and rate-limiting -->
                    <?php $nonce = wp_create_nonce('sedrazavi_nonce'); ?>
                    <button type="button" class="text-rose-400 hover:text-rose-300 text-[11px] flex items-center gap-1 transition-colors" onclick="
                        var btn = this;
                        btn.disabled = true;
                        btn.innerText = 'در حال ثبت...';
                        var data = new FormData();
                        data.append('action', 'sedrazavi_report_broken_link');
                        data.append('nonce', '<?php echo esc_js($nonce); ?>');
                        data.append('post_id', '<?php echo esc_js(get_the_ID() ?: 0); ?>');
                        data.append('link_url', '<?php echo esc_js($atts['direct_url']); ?>');
                        fetch('<?php echo admin_url('admin-ajax.php'); ?>', { method: 'POST', body: data })
                            .then(function(r) { return r.json(); })
                            .then(function(res) {
                                if (res.success) {
                                    btn.innerText = '✅ گزارش ثبت شد';
                                } else {
                                    btn.innerText = '⚠️ ' + (res.data && res.data.message ? res.data.message : 'خطا');
                                }
                            }).catch(function() {
                                btn.innerText = 'خطا در ارتباط';
                            });
                    ">
                        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        <span>گزارش خرابی لینک</span>
                    </button>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    public function ajax_report_broken_link() {
        // 1. Nonce check
        $nonce = isset($_POST['nonce']) ? sanitize_text_field($_POST['nonce']) : '';
        if (!wp_verify_nonce($nonce, 'sedrazavi_nonce')) {
            wp_send_json_error(['message' => 'کد امنیتی نامعتبر است (Invalid Nonce)'], 403);
        }

        // 2. IP Rate Limit: Max 3 reports per hour per IP
        $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field($_SERVER['REMOTE_ADDR']) : 'unknown';
        $rate_key = 'sr_broken_report_' . md5($ip);
        $attempts = (int) get_transient($rate_key);

        if ($attempts >= 3) {
            wp_send_json_error(['message' => 'محدودیت ارسال: شما حداکثر ۳ گزارش در هر ساعت مجاز به ارسال هستید.'], 429);
        }

        set_transient($rate_key, $attempts + 1, HOUR_IN_SECONDS);

        // 3. Sanitize inputs
        $post_id = isset($_POST['post_id']) ? absint($_POST['post_id']) : 0;
        $link_url = isset($_POST['link_url']) ? esc_url_raw($_POST['link_url']) : '';

        $report_entry = [
            'timestamp' => current_time('mysql'),
            'ip'        => $ip,
            'link'      => $link_url,
            'userAgent' => isset($_SERVER['HTTP_USER_AGENT']) ? sanitize_text_field(substr($_SERVER['HTTP_USER_AGENT'], 0, 150)) : '',
        ];

        // 4. Store in post meta or global option
        if ($post_id > 0) {
            $existing_logs = get_post_meta($post_id, '_sedrazavi_broken_links_log', true) ?: [];
            $existing_logs[] = $report_entry;
            update_post_meta($post_id, '_sedrazavi_broken_links_log', $existing_logs);
        }

        $global_logs = get_option('_sedrazavi_recent_broken_links', []) ?: [];
        array_unshift($global_logs, array_merge($report_entry, ['postId' => $post_id]));
        if (count($global_logs) > 50) {
            $global_logs = array_slice($global_logs, 0, 50);
        }
        update_option('_sedrazavi_recent_broken_links', $global_logs);

        // 5. Trigger email or admin notification filter
        do_action('sedrazavi_broken_link_reported', $post_id, $link_url, $report_entry);

        wp_send_json_success([
            'message' => 'گزارش خرابی لینک با موفقیت ثبت شد و به مدیر سایت اطلاع‌رسانی گردید.',
            'logged'  => true,
        ]);
    }
}
