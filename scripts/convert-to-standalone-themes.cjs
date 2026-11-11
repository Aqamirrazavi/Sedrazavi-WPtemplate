/**
 * Convert all vertical themes from Child Themes to 100% Autonomous Standalone Parent Themes
 *
 * Removes 'Template: sedrazavi-theme' from style.css
 * Adds complete independent template hierarchy (index.php, header.php, footer.php, page.php, single.php)
 * Updates functions.php to be 100% self-sufficient (no parent theme dependencies)
 * Embeds universal Frontend Cockpit shortcode and capabilities
 *
 * @package SedRazavi
 */

const fs = require('fs');
const path = require('path');

const themesRoot = path.join(__dirname, '../wordpress-theme/child-themes');
const targetStandaloneDir = path.join(__dirname, '../standalone-themes');
if (!fs.existsSync(targetStandaloneDir)) {
  fs.mkdirSync(targetStandaloneDir, { recursive: true });
}

const themeConfigs = [
  {
    folder: 'agency-designer',
    standaloneSlug: 'sedrazavi-agency-theme',
    name: 'SedRazavi Agency Designer Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل، پرسرعت و مدرن آژانس طراحی وب، دیجیتال مارکتینگ و پورتفولیو طراحان خلاق.',
    accent: '#3B82F6',
    domain: 'creative',
  },
  {
    folder: 'clinic-medical',
    standaloneSlug: 'sedrazavi-clinic-theme',
    name: 'SedRazavi Clinic & Medical Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل کلینیک، پزشکان، دندانپزشکی و رزرو آنلاین نوبت و مشاوره سلامت.',
    accent: '#06B6D4',
    domain: 'healthcare',
  },
  {
    folder: 'corporate-pro',
    standaloneSlug: 'sedrazavi-corporate-theme',
    name: 'SedRazavi Corporate Pro Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل شرکتی، هلدینگ‌های چندمنظوره، مشاوره مالی و سازمان‌های بین‌المللی.',
    accent: '#6366F1',
    domain: 'enterprise',
  },
  {
    folder: 'education-lms',
    standaloneSlug: 'sedrazavi-education-theme',
    name: 'SedRazavi Education & LMS Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل آکادمی آنلاین، دوره‌های آموزشی، اساتید و آزمون‌های آنلاین.',
    accent: '#10B981',
    domain: 'education',
  },
  {
    folder: 'legal-firm',
    standaloneSlug: 'sedrazavi-legal-theme',
    name: 'SedRazavi Legal Firm Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل موسسه حقوقی، داوری، وکلای پایه یک و مدیریت امور موکلین.',
    accent: '#D4AF37',
    domain: 'legal',
  },
  {
    folder: 'news-editorial',
    standaloneSlug: 'sedrazavi-news-theme',
    name: 'SedRazavi News & Editorial Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل خبرگزاری، مجله خبری، نوار اخبار فوری و تحریریه دیجیتال.',
    accent: '#EF4444',
    domain: 'publishing',
  },
  {
    folder: 'sedrazavi-lawyer-child',
    standaloneSlug: 'sedrazavi-lawyer-theme',
    name: 'SedRazavi Lawyer Elite Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل و تخصصی دفتر وکالت، پیگیری پرونده، لایحه و دادرسی الکترونیک.',
    accent: '#C5A059',
    domain: 'legal',
  },
  {
    folder: 'store-modern',
    standaloneSlug: 'sedrazavi-store-theme',
    name: 'SedRazavi Store Modern Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل فروشگاهی مدرن با سبد خرید سریع، ویترین محصولات و سازگاری کامل با ووکامرس.',
    accent: '#EC4899',
    domain: 'commerce',
  },
];

themeConfigs.forEach(cfg => {
  const dirPath = path.join(themesRoot, cfg.folder);
  if (!fs.existsSync(dirPath)) return;

  console.log(`Processing Standalone Theme: ${cfg.name}...`);

  // 1. Update style.css - Remove Template: line
  const stylePath = path.join(dirPath, 'style.css');
  let styleContent = fs.readFileSync(stylePath, 'utf8');

  // Strip Template: line completely
  styleContent = styleContent.replace(/Template:\s*[^\r\n]+[\r\n]*/gi, '');
  // Replace Theme Name
  styleContent = styleContent.replace(/Theme Name:\s*[^\r\n]+/i, `Theme Name: ${cfg.name}`);
  // Replace Text Domain
  styleContent = styleContent.replace(/Text Domain:\s*[^\r\n]+/i, `Text Domain: ${cfg.standaloneSlug}`);

  fs.writeFileSync(stylePath, styleContent);

  // 2. Create Standalone header.php
  const headerContent = `<!DOCTYPE html>
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
`;
  fs.writeFileSync(path.join(dirPath, 'header.php'), headerContent);

  // 3. Create Standalone footer.php
  const footerContent = `<footer id="colophon" class="site-footer" style="padding: 30px 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; color: #94A3B8; font-size: 14px;">
    <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?> — طراحی‌شده با معماری مستقل و بومی اکوسیستم SedRazavi.</p>
</footer>
<?php wp_footer(); ?>
</body>
</html>
`;
  fs.writeFileSync(path.join(dirPath, 'footer.php'), footerContent);

  // 4. Create Standalone index.php
  const indexContent = `<?php
/**
 * Standalone Main Index Template
 *
 * @package ${cfg.standaloneSlug}
 */

get_header();
?>
<main id="primary" class="site-main" style="max-width: 1200px; margin: 40px auto; padding: 0 16px;">
    <?php
    if (have_posts()) :
        while (have_posts()) : the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?> style="margin-bottom: 40px;">
                <h1 class="entry-title" style="color: #fff; margin-bottom: 16px;"><?php the_title(); ?></h1>
                <div class="entry-content" style="color: #CBD5E1; line-height: 1.8;">
                    <?php the_content(); ?>
                </div>
            </article>
            <?php
        endwhile;
    else :
        ?>
        <p style="color: #94A3B8;">هیچ محتوایی یافت نشد.</p>
        <?php
    endif;
    ?>
</main>
<?php
get_footer();
`;
  fs.writeFileSync(path.join(dirPath, 'index.php'), indexContent);

  // 5. Create Standalone page.php
  const pageContent = `<?php
/**
 * Standalone Page Template
 *
 * @package ${cfg.standaloneSlug}
 */

get_header();
?>
<main id="primary" class="site-main" style="max-width: 1200px; margin: 40px auto; padding: 0 16px;">
    <?php
    while (have_posts()) : the_post();
        the_content();
    endwhile;
    ?>
</main>
<?php
get_footer();
`;
  fs.writeFileSync(path.join(dirPath, 'page.php'), pageContent);

  // 6. Create Standalone single.php
  const singleContent = `<?php
/**
 * Standalone Single Post Template
 *
 * @package ${cfg.standaloneSlug}
 */

get_header();
?>
<main id="primary" class="site-main" style="max-width: 900px; margin: 40px auto; padding: 0 16px;">
    <?php
    while (have_posts()) : the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <h1 style="color: #fff; margin-bottom: 20px; font-size: 28px;"><?php the_title(); ?></h1>
            <div class="entry-content" style="color: #E2E8F0; line-height: 1.9; font-size: 16px;">
                <?php the_content(); ?>
            </div>
        </article>
        <?php
    endwhile;
    ?>
</main>
<?php
get_footer();
`;
  fs.writeFileSync(path.join(dirPath, 'single.php'), singleContent);

  // 7. Update functions.php to be 100% self-sufficient
  const functionsPath = path.join(dirPath, 'functions.php');
  let funcContent = fs.readFileSync(functionsPath, 'utf8');

  // Replace parent enqueue with standalone style enqueue
  funcContent = funcContent.replace(
    /wp_enqueue_style\('sedrazavi-parent-style'[\s\S]*?\);[\s\S]*?wp_enqueue_style\([\s\S]*?\);/g,
    `wp_enqueue_style('${cfg.standaloneSlug}-style', get_stylesheet_uri(), [], '6.0.0');`
  );

  // Add theme supports if missing
  if (!funcContent.includes("add_theme_support('title-tag')")) {
    const supportsCode = `
// Standalone theme features
add_action('after_setup_theme', function() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
});
`;
    funcContent += supportsCode;
  }

  // Ensure Frontend Cockpit engine loader is included if file exists
  if (!funcContent.includes('frontend-cockpit-engine.php')) {
    funcContent += `
// Load Universal Frontend Management Cockpit
if (file_exists(get_template_directory() . '/inc/frontend-cockpit-engine.php')) {
    require_once get_template_directory() . '/inc/frontend-cockpit-engine.php';
} elseif (file_exists(dirname(get_template_directory()) . '/inc/frontend-cockpit-engine.php')) {
    require_once dirname(get_template_directory()) . '/inc/frontend-cockpit-engine.php';
}
`;
  }

  fs.writeFileSync(functionsPath, funcContent);

  // Also duplicate to standalone-themes/ directory for dedicated root export
  const standaloneDest = path.join(targetStandaloneDir, cfg.standaloneSlug);
  if (!fs.existsSync(standaloneDest)) {
    fs.mkdirSync(standaloneDest, { recursive: true });
  }

  // Copy files to standalone-themes/
  fs.cpSync(dirPath, standaloneDest, { recursive: true });
  console.log(`✅ ${cfg.name} converted to 100% standalone parent theme!`);
});

console.log('\n🎉 ALL 8 VERTICAL THEMES CONVERTED TO 100% AUTONOMOUS STANDALONE PARENT THEMES!');
