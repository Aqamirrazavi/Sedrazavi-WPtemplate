<?php
/**
 * SedRazavi Designer Theme - 404 Error Page
 *
 * Cyberpunk neon terminal 404 page.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<div class="sr-container sr-404-container text-center">
    <div class="sr-404-card">
        <div class="sr-terminal-header">
            <span class="sr-term-dot sr-term-red"></span>
            <span class="sr-term-dot sr-term-yellow"></span>
            <span class="sr-term-dot sr-term-green"></span>
            <span class="sr-term-title">CONSOLE: ERROR_404_PAGE_NOT_FOUND</span>
        </div>
        <div class="sr-terminal-body">
            <div class="sr-404-glitch-code">404</div>
            <h1 class="sr-404-title">سیگنال گم شده است! برگه مورد نظر پیدا نشد.</h1>
            <p class="sr-404-desc">
                آدرسی که وارد کرده‌اید یا وجود ندارد یا به بخش دیگری منتقل شده است. جای نگرانی نیست؛ می‌توانید از طریق گزینه‌های زیر مسیر خود را پیدا کنید:
            </p>
            <div class="sr-404-actions">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="sr-btn sr-btn-glow">
                    <span>بازگشت به مرکز کنترل (خانه)</span>
                    <span class="sr-btn-arrow">&larr;</span>
                </a>
                <a href="<?php echo esc_url(home_url('/track-order/')); ?>" class="sr-btn sr-btn-outline">
                    <span>رهگیری وضعیت پروژه</span>
                    <span class="sr-btn-icon">⚡</span>
                </a>
            </div>
        </div>
    </div>
</div>

<?php
get_footer();
