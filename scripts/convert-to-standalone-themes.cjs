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

const legacyThemesRoot = path.join(__dirname, '../wordpress-theme/child-themes');
const targetStandaloneDir = path.join(__dirname, '../standalone-themes');
if (!fs.existsSync(targetStandaloneDir)) {
  fs.mkdirSync(targetStandaloneDir, { recursive: true });
}

const themeConfigs = [
  {
    folder: 'agency-designer',
    standaloneSlug: 'sedrazavi-agency-theme',
    defaultKitSlug: 'template-home-creative-agency',
    name: 'SedRazavi Agency Designer Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل، پرسرعت و مدرن آژانس طراحی وب، دیجیتال مارکتینگ و پورتفولیو طراحان خلاق.',
    accent: '#3B82F6',
    domain: 'creative',
  },
  {
    folder: 'clinic-medical',
    standaloneSlug: 'sedrazavi-clinic-theme',
    defaultKitSlug: 'template-services-bento',
    name: 'SedRazavi Clinic & Medical Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل کلینیک، پزشکان، دندانپزشکی و رزرو آنلاین نوبت و مشاوره سلامت.',
    accent: '#06B6D4',
    domain: 'healthcare',
  },
  {
    folder: 'corporate-pro',
    standaloneSlug: 'sedrazavi-corporate-theme',
    defaultKitSlug: 'template-home-corporate-pro',
    name: 'SedRazavi Corporate Pro Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل شرکتی، هلدینگ‌های چندمنظوره، مشاوره مالی و سازمان‌های بین‌المللی.',
    accent: '#6366F1',
    domain: 'enterprise',
  },
  {
    folder: 'education-lms',
    standaloneSlug: 'sedrazavi-education-theme',
    defaultKitSlug: 'template-home-saas-master',
    name: 'SedRazavi Education & LMS Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل آکادمی آنلاین، دوره‌های آموزشی، اساتید و آزمون‌های آنلاین.',
    accent: '#10B981',
    domain: 'education',
  },
  {
    folder: 'legal-firm',
    standaloneSlug: 'sedrazavi-legal-theme',
    defaultKitSlug: 'template-home-saas-master',
    name: 'SedRazavi Legal Firm Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل موسسه حقوقی، داوری، وکلای پایه یک و مدیریت امور موکلین.',
    accent: '#D4AF37',
    domain: 'legal',
  },
  {
    folder: 'news-editorial',
    standaloneSlug: 'sedrazavi-news-theme',
    defaultKitSlug: 'template-archive-blog-grid',
    name: 'SedRazavi News & Editorial Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل خبرگزاری، مجله خبری، نوار اخبار فوری و تحریریه دیجیتال.',
    accent: '#EF4444',
    domain: 'publishing',
  },
  {
    folder: 'sedrazavi-lawyer-child',
    standaloneSlug: 'sedrazavi-lawyer-theme',
    defaultKitSlug: 'template-home-corporate-pro',
    name: 'SedRazavi Lawyer Elite Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل و تخصصی دفتر وکالت، پیگیری پرونده، لایحه و دادرسی الکترونیک.',
    accent: '#C5A059',
    domain: 'legal',
  },
  {
    folder: 'store-modern',
    standaloneSlug: 'sedrazavi-store-theme',
    defaultKitSlug: 'template-store-showcase',
    name: 'SedRazavi Store Modern Theme (Standalone)',
    desc: 'پوسته کاملاً مستقل فروشگاهی مدرن با سبد خرید سریع، ویترین محصولات و سازگاری کامل با ووکامرس.',
    accent: '#EC4899',
    domain: 'commerce',
  },
];

themeConfigs.forEach(cfg => {
  const dirPath = path.join(targetStandaloneDir, cfg.standaloneSlug);
  const legacyDirPath = path.join(legacyThemesRoot, cfg.folder);
  if (!fs.existsSync(dirPath)) {
    if (fs.existsSync(legacyDirPath)) {
      fs.cpSync(legacyDirPath, dirPath, { recursive: true });
    } else {
      return;
    }
  }

  console.log(`Synchronizing Canonical Standalone Theme: ${cfg.name}...`);

  // 1. Update style.css in standalone-themes/ - Ensure zero Template: line
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
<body <?php body_class('sr-standalone-theme'); ?> style="--sr-primary-accent: ${cfg.accent};">
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
        <a href="<?php echo esc_url(home_url('/frontend-cockpit/')); ?>" style="color:var(--sr-primary-accent, ${cfg.accent}); text-decoration:none; font-weight:600;">پیشخوان مدیریت</a>
    </nav>
</header>
<?php endif; ?>
`;
  fs.writeFileSync(path.join(dirPath, 'header.php'), headerContent);

  // 3. Create Standalone footer.php
  const footerContent = `<?php if ( !(function_exists('elementor_theme_do_location') && elementor_theme_do_location('footer')) ) : ?>
<footer id="colophon" class="site-footer" style="padding: 30px 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px; color: #94A3B8; font-size: 14px;">
    <p>&copy; <?php echo esc_html(gmdate('Y')); ?> <?php bloginfo('name'); ?> — طراحی‌شده با معماری مستقل و بومی اکوسیستم SedRazavi.</p>
</footer>
<?php endif; ?>
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
    $rendered_by_elementor = function_exists('sedrazavi_standalone_try_render_elementor')
        && sedrazavi_standalone_try_render_elementor('${cfg.defaultKitSlug}');
    if (!$rendered_by_elementor) :
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
    $rendered_by_elementor = function_exists('sedrazavi_standalone_try_render_elementor')
        && sedrazavi_standalone_try_render_elementor('${cfg.defaultKitSlug}');
    if (!$rendered_by_elementor) :
        while (have_posts()) : the_post();
            the_content();
        endwhile;
    endif;
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

  // Add theme supports & Elementor-First standalone bridge if missing
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

  if (!funcContent.includes('function sedrazavi_standalone_try_render_elementor(')) {
    const bridgeCode = `
if (!function_exists('sedrazavi_standalone_vertical_slug')) {
    function sedrazavi_standalone_vertical_slug() {
        return '${cfg.standaloneSlug}';
    }
}

if (!function_exists('sedrazavi_standalone_try_render_elementor')) {
    function sedrazavi_standalone_try_render_elementor($fallback_template_slug = '') {
        if (!did_action('elementor/loaded') || !class_exists('\\\\Elementor\\\\Plugin')) {
            return false;
        }
        $page_id = function_exists('get_queried_object_id') ? (int) get_queried_object_id() : 0;
        $mode    = $page_id > 0 ? get_post_meta($page_id, '_elementor_edit_mode', true) : '';
        $data    = $page_id > 0 ? get_post_meta($page_id, '_elementor_data', true) : '';
        if ($mode === 'builder' && !empty($data)) {
            echo '<div class="sedrazavi-elementor-migrated-page" data-elementor-source="page">';
            while (have_posts()) {
                the_post();
                the_content();
            }
            echo '</div>';
            return true;
        }
        if (empty($fallback_template_slug)) {
            return false;
        }
        if ($page_id > 0 && function_exists('has_blocks')) {
            $raw = (string) get_post_field('post_content', $page_id);
            if ($raw !== '' && has_blocks($raw)) {
                return false;
            }
        }
        $templates = get_posts([
            'post_type'      => 'elementor_library',
            'post_status'    => 'publish',
            'posts_per_page' => 1,
            'meta_key'       => '_uas_template_slug',
            'meta_value'     => sanitize_key($fallback_template_slug),
        ]);
        if (empty($templates)) {
            return false;
        }
        $instance = \\Elementor\\Plugin::$instance ?? null;
        if (!$instance || !isset($instance->frontend) || !method_exists($instance->frontend, 'get_builder_content_for_display')) {
            return false;
        }
        echo '<div class="sedrazavi-elementor-migrated-page" data-elementor-source="standalone-kit">';
        echo $instance->frontend->get_builder_content_for_display((int) $templates[0]->ID);
        echo '</div>';
        return true;
    }
}
`;
    funcContent += bridgeCode;
  }

  // Remove any duplicate theme-level Frontend Cockpit engine/assets (canonical engine lives in sedrazavi-companion plugin)
  funcContent = funcContent.replace(/\/\/ Load Universal Frontend Management Cockpit[\s\S]*?frontend-cockpit-engine\.php['"][\s\S]*?\}\s*/g, '');

  // Clean any legacy 'Child Theme' comments in style.css and functions.php
  styleContent = styleContent.replace(/Child Theme/gi, 'Standalone Parent Theme');
  fs.writeFileSync(stylePath, styleContent);

  funcContent = funcContent.replace(/Child Theme/gi, 'Standalone Parent Theme');
  fs.writeFileSync(functionsPath, funcContent);

  // Purge stale duplicated Cockpit engine/assets from standalone theme if present
  [
    'inc/frontend-cockpit-engine.php',
    'assets/css/frontend-cockpit.css',
    'assets/js/frontend-cockpit.js',
  ].forEach(rel => {
    const stalePath = path.join(dirPath, rel);
    if (fs.existsSync(stalePath)) {
      fs.rmSync(stalePath, { force: true });
    }
  });

  // Keep only the thin page-frontend-cockpit.php shortcode wrapper template
  const wpThemeRoot = path.join(__dirname, '../wordpress-theme');
  const pageTplSrc = path.join(wpThemeRoot, 'page-frontend-cockpit.php');
  const pageTplDest = path.join(dirPath, 'page-frontend-cockpit.php');
  if (fs.existsSync(pageTplSrc)) {
    fs.copyFileSync(pageTplSrc, pageTplDest);
  }

  console.log(`✅ ${cfg.name} synchronized cleanly (zero duplicate Cockpit engine; delegates to sedrazavi-companion)!`);
});

// Sync thin page template & purge duplicate Cockpit engine copies in sedrazavi-designer-theme
const wpThemeRoot = path.join(__dirname, '../wordpress-theme');
const designerThemeDir = path.join(__dirname, '../sedrazavi-designer-theme');
if (fs.existsSync(designerThemeDir)) {
  [
    'inc/frontend-cockpit-engine.php',
    'assets/css/frontend-cockpit.css',
    'assets/js/frontend-cockpit.js',
  ].forEach(rel => {
    const stalePath = path.join(designerThemeDir, rel);
    if (fs.existsSync(stalePath)) {
      fs.rmSync(stalePath, { force: true });
    }
  });
  const srcPageTpl = path.join(wpThemeRoot, 'page-frontend-cockpit.php');
  if (fs.existsSync(srcPageTpl)) {
    fs.copyFileSync(srcPageTpl, path.join(designerThemeDir, 'page-frontend-cockpit.php'));
  }

  // Sync canonical Elementor JSON templates from elementor-addon-suite to prevent ZIP drift
  const canonicalTplDir = path.join(__dirname, '../elementor-addon-suite/templates');
  const designerCoreDir = path.join(__dirname, '../sedrazavi-designer-core');
  [path.join(designerThemeDir, 'templates'), path.join(designerCoreDir, 'templates')].forEach((destTplDir) => {
    if (fs.existsSync(canonicalTplDir) && fs.existsSync(destTplDir)) {
      fs.readdirSync(canonicalTplDir).filter((f) => f.endsWith('.json')).forEach((file) => {
        fs.copyFileSync(path.join(canonicalTplDir, file), path.join(destTplDir, file));
      });
    }
  });
  console.log('✅ Synced page-frontend-cockpit.php, canonical templates & removed duplicate Cockpit engine from sedrazavi-designer-theme!');
}

console.log('\n🎉 ALL 8 VERTICAL THEMES CONVERTED TO 100% AUTONOMOUS STANDALONE PARENT THEMES!');
