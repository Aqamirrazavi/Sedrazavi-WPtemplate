<?php if ( !(function_exists('elementor_theme_do_location') && elementor_theme_do_location('footer')) ) : ?>
<footer id="colophon" class="site-footer" style="padding: 30px 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; color: #94A3B8; font-size: 14px;">
    <p>&copy; <?php echo esc_html(gmdate('Y')); ?> <?php bloginfo('name'); ?> — طراحی‌شده با معماری مستقل و بومی اکوسیستم SedRazavi.</p>
</footer>
<?php endif; ?>
<?php wp_footer(); ?>
</body>
</html>
