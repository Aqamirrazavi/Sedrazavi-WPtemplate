<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class('sr-standalone-theme'); ?> style="--sr-primary-accent: #D4AF37;">
<?php wp_body_open(); ?>
<a class="sr-skip-link screen-reader-text" href="#primary" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;">پرش به محتوای اصلی</a>
<?php if ( !(function_exists('elementor_theme_do_location') && elementor_theme_do_location('header')) ) : ?>
<header id="masthead" class="site-header" style="padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;">
    <div class="site-branding">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-logo" style="font-weight:800; font-size:20px; color:#fff; text-decoration:none;">
            <?php bloginfo('name'); ?>
        </a>
    </div>
    <nav class="main-navigation" aria-label="ناوبری اصلی" style="display:flex; gap:16px;">
        <a href="<?php echo esc_url(home_url('/')); ?>" style="color:#CBD5E1; text-decoration:none;">صفحه اصلی</a>
        <a href="<?php echo esc_url(home_url('/frontend-cockpit/')); ?>" style="color:var(--sr-primary-accent, #D4AF37); text-decoration:none; font-weight:600;">پیشخوان مدیریت</a>
    </nav>
</header>
<?php endif; ?>
