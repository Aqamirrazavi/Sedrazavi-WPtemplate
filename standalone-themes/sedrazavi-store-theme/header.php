<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class('sr-standalone-theme'); ?>>
<?php wp_body_open(); ?>
<header id="masthead" class="site-header" style="padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center;">
    <div class="site-branding">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-logo" style="font-weight:800; font-size:20px; color:#fff; text-decoration:none;">
            <?php bloginfo('name'); ?>
        </a>
    </div>
    <nav class="main-navigation" style="display:flex; gap:16px;">
        <a href="<?php echo esc_url(home_url('/')); ?>" style="color:#CBD5E1; text-decoration:none;">صفحه اصلی</a>
        <a href="<?php echo esc_url(home_url('/frontend-cockpit/')); ?>" style="color:var(--sr-primary-accent, #3B82F6); text-decoration:none; font-weight:600;">پیشخوان مدیریت</a>
    </nav>
</header>
