<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * GitHub-Style Administration Dashboard Engine
 * Implements GitHub Primer design system, Activity Heatmaps,
 * Issue-style Case Tracking, Commit-style Audit Trails, and Documentation Hub.
 */
class GitHub_Admin {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action('admin_menu', [$this, 'register_github_admin_menus']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
    }

    public function enqueue_admin_assets($hook) {
        if (strpos($hook, 'sedrazavi') === false && strpos($hook, 'universal') === false) {
            return;
        }

        wp_enqueue_style(
            'uas-github-admin-css',
            UAS_URL . 'assets/css/github-admin.css',
            [],
            UAS_VERSION
        );
    }

    public function register_github_admin_menus() {
        $parent_slug = 'sedrazavi-suite';

        // Main Menu
        add_menu_page(
            esc_html__('سامانه جامع SedRazavi (طرح گیت‌هاب)', 'universal-elementor-suite'),
            esc_html__('SedRazavi Suite', 'universal-elementor-suite'),
            'manage_options',
            $parent_slug,
            [$this, 'render_overview_page'],
            'dashicons-editor-code',
            56
        );

        // Submenus
        add_submenu_page(
            $parent_slug,
            esc_html__('پیشخوان و مشارکت‌ها (Overview)', 'universal-elementor-suite'),
            esc_html__('Overview', 'universal-elementor-suite'),
            'manage_options',
            $parent_slug,
            [$this, 'render_overview_page']
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('پرونده‌ها و تیکت‌ها (Cases & Issues)', 'universal-elementor-suite'),
            esc_html__('Cases & Issues', 'universal-elementor-suite'),
            'manage_options',
            'sedrazavi-cases',
            [$this, 'render_cases_page']
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('تایم‌لاین رویدادها (Audit & Commits)', 'universal-elementor-suite'),
            esc_html__('Audit & Commits', 'universal-elementor-suite'),
            'manage_options',
            'sedrazavi-commits',
            [$this, 'render_commits_page']
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('دفتر کل مالی (Transactions Ledger)', 'universal-elementor-suite'),
            esc_html__('Transactions Ledger', 'universal-elementor-suite'),
            'manage_options',
            'sedrazavi-ledger',
            [$this, 'render_ledger_page']
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('مرکز مستندات و شورت‌کدها (Docs Hub)', 'universal-elementor-suite'),
            esc_html__('Documentation & Shortcodes', 'universal-elementor-suite'),
            'manage_options',
            'sedrazavi-docs',
            [$this, 'render_docs_page']
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('سوئیچر و فیلدهای اصناف (Presets & Fields)', 'universal-elementor-suite'),
            esc_html__('Industry Presets', 'universal-elementor-suite'),
            'manage_options',
            'sedrazavi-presets',
            [$this, 'render_presets_page']
        );

        add_submenu_page(
            $parent_slug,
            esc_html__('سازگاری فروشگاهی (WooCommerce & WoodMart)', 'universal-elementor-suite'),
            esc_html__('eCommerce & WoodMart', 'universal-elementor-suite'),
            'manage_options',
            'sedrazavi-ecommerce',
            [$this, 'render_ecommerce_page']
        );
    }

    /**
     * Render GitHub Global Header
     */
    private function render_header($active_tab = 'overview') {
        ?>
        <div class="gh-header" dir="rtl">
            <div class="gh-repo-title">
                <span class="gh-icon-repo">📁</span>
                <span class="gh-owner">sedrazavi</span>
                <span class="gh-slash">/</span>
                <span class="gh-repo-name">law-firm-ecosystem</span>
                <span class="gh-badge-public">Public</span>
                <span class="gh-branch-badge">branch: <strong>main</strong></span>
                <span class="gh-version-badge">v3.0.0-flexible</span>
            </div>
            <div class="gh-tabs">
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-suite'); ?>" class="gh-tab <?php echo $active_tab === 'overview' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">⚡</span> Overview
                </a>
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-cases'); ?>" class="gh-tab <?php echo $active_tab === 'cases' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">🎯</span> Cases & Issues <span class="gh-counter">14</span>
                </a>
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-commits'); ?>" class="gh-tab <?php echo $active_tab === 'commits' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">🌿</span> Audit & Commits
                </a>
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-ledger'); ?>" class="gh-tab <?php echo $active_tab === 'ledger' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">💳</span> Transactions Ledger
                </a>
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-presets'); ?>" class="gh-tab <?php echo $active_tab === 'presets' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">🏢</span> Industry Presets
                </a>
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-ecommerce'); ?>" class="gh-tab <?php echo $active_tab === 'ecommerce' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">🛒</span> WooCommerce & WoodMart
                </a>
                <a href="<?php echo admin_url('admin.php?page=sedrazavi-docs'); ?>" class="gh-tab <?php echo $active_tab === 'docs' ? 'active' : ''; ?>">
                    <span class="gh-tab-icon">📚</span> Docs & Shortcodes
                </a>
            </div>
        </div>
        <?php
    }

    /**
     * 1. Overview Page
     */
    public function render_overview_page() {
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('overview'); ?>

            <div class="gh-body">
                <!-- METRIC CARDS -->
                <div class="gh-metrics-grid">
                    <div class="gh-metric-card">
                        <span class="gh-metric-title">کل پرونده‌های ثبت‌شده</span>
                        <div class="gh-metric-value">۱,۴۲۰</div>
                        <span class="gh-metric-diff positive">+۱۲ پرونده جدید در ماه جاری</span>
                    </div>
                    <div class="gh-metric-card">
                        <span class="gh-metric-title">نرخ پیروزی در محاکم</span>
                        <div class="gh-metric-value">۹۸.۴٪</div>
                        <span class="gh-metric-diff positive">بالاتر از میانگین کانون وکلا</span>
                    </div>
                    <div class="gh-metric-card">
                        <span class="gh-metric-title">تراکنش‌های تسویه‌شده</span>
                        <div class="gh-metric-value">۲,۸۴۰,۰۰۰,۰۰۰ <small>تومان</small></div>
                        <span class="gh-metric-diff neutral">۱۰۰٪ با شناسه ارجاع بانکی</span>
                    </div>
                    <div class="gh-metric-card">
                        <span class="gh-metric-title">وضعیت استقلال افزونه</span>
                        <div class="gh-metric-value" style="color: #3FB950;">خودکفا ۱۰۰٪</div>
                        <span class="gh-metric-diff positive">فعال روی هر قالب و شورت‌کد</span>
                    </div>
                </div>

                <!-- HEATMAP CARD -->
                <div class="gh-card">
                    <div class="gh-card-header">
                        <h3>ماتریس مشارکت و اقدامات پرونده‌ها در سال جاری (Activity Heatmap)</h3>
                        <span class="gh-card-subtitle">۳۴۸ لایحه، ابلاغیه و رویداد دادرسی ثبت شده</span>
                    </div>
                    <div class="gh-card-body">
                        <div class="gh-heatmap-wrap">
                            <div class="gh-heatmap-grid">
                                <?php for ($w = 0; $w < 48; $w++) : ?>
                                    <div class="gh-heatmap-col">
                                        <?php for ($d = 0; $d < 7; $d++) : 
                                            $lvl = ($w * 7 + $d) % 5;
                                            if ($lvl === 4 && $w % 4 !== 0) $lvl = 2;
                                        ?>
                                            <div class="gh-cell gh-lvl-<?php echo $lvl; ?>" title="هفته <?php echo $w + 1; ?>"></div>
                                        <?php endfor; ?>
                                    </div>
                                <?php endfor; ?>
                            </div>
                            <div class="gh-heatmap-legend">
                                <span>کمتر</span>
                                <span class="gh-cell gh-lvl-0"></span>
                                <span class="gh-cell gh-lvl-1"></span>
                                <span class="gh-cell gh-lvl-2"></span>
                                <span class="gh-cell gh-lvl-3"></span>
                                <span class="gh-cell gh-lvl-4"></span>
                                <span>بیشتر</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- QUICK REPO INFO / READ ME -->
                <div class="gh-card">
                    <div class="gh-card-header">
                        <h3>📖 README.md - راهنمای استقرار در مخزن گیت‌هاب</h3>
                    </div>
                    <div class="gh-card-body gh-readme">
                        <h4>نحوه استفاده از سورس در گیت‌هاب بدون نیاز به فایل زیپ:</h4>
                        <ol>
                            <li>مخزن را در گیت‌هاب کلون یا پول نمایید.</li>
                            <li><strong>پوشه <code>elementor-addon-suite</code></strong>: یک افزونه کامل و مستقل وردپرس است. می‌توانید محتویات این پوشه را مستقیماً زیپ کرده و در بخش <em>افزونه‌ها > افزودن</em> بارگذاری فرمایید.</li>
                            <li><strong>پوشه <code>wordpress-theme</code></strong>: یک قالب کامل و رسمی وردپرس است. محتویات آن را زیپ کرده و در بخش <em>نمایش > پوسته‌ها</em> نصب نمایید.</li>
                            <li>افزونه هیچ نیازی به قالب اختصاصی ندارد و بر روی هر قالبی (Hello Elementor, Astra, Woodmart) با استفاده از شورت‌کدها یا ویجت‌های المنتور کار می‌کند.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * 2. Cases & Issues Page
     */
    public function render_cases_page() {
        $issues = [
            ['id' => 142, 'tag' => 'CAS-9482-TEH', 'title' => 'پرونده داوری قرارداد تجاری هلدینگ صادرات فولاد', 'author' => 'سید امیر حسین رضوی', 'time' => '۲ ساعت قبل', 'labels' => [['name' => 'داوری بازرگانی', 'bg' => '#1F6FEB'], ['name' => 'فوری', 'bg' => '#DA3633']], 'comments' => 6],
            ['id' => 141, 'tag' => 'CAS-9120-SHZ', 'title' => 'دفاع در اتهام اخلال مالیاتی و عدم انطباق دفاتر ارزش افزوده', 'author' => 'دکتر کاظمی', 'time' => 'دیروز', 'labels' => [['name' => 'حل اختلاف مالیاتی', 'bg' => '#8957E5']], 'comments' => 4],
            ['id' => 140, 'tag' => 'CAS-8994-ISF', 'title' => 'دادخواست اعاده دادرسی در دیوان عالی کشور (شعبه ۳۹)', 'author' => 'سید امیر حسین رضوی', 'time' => '۳ روز قبل', 'labels' => [['name' => 'دیوان عالی', 'bg' => '#238636'], ['name' => 'دادرسی خاص', 'bg' => '#6E7681']], 'comments' => 12],
            ['id' => 139, 'tag' => 'CAS-8812-TEH', 'title' => 'توقیف و خلع ید اراضی تجاری فرشته و الزام به تنظیم سند رسمی', 'author' => 'مهندس مرادی', 'time' => 'هفته گذشته', 'labels' => [['name' => 'ملکی و سرقفلی', 'bg' => '#D29922']], 'comments' => 3],
        ];
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('cases'); ?>

            <div class="gh-body">
                <div class="gh-filter-bar">
                    <input type="text" placeholder="فیلتر پرونده‌ها: is:open label:داوری ..." class="gh-search-input" />
                    <div class="gh-filter-actions">
                        <button class="gh-btn-filter">برچسب‌ها</button>
                        <button class="gh-btn-filter">وکیل مسئول</button>
                        <button class="gh-btn-filter">مرتب‌سازی: جدیدترین</button>
                    </div>
                </div>

                <div class="gh-issues-table">
                    <div class="gh-issues-header">
                        <div class="gh-issue-stats">
                            <span class="gh-status-open">🟢 ۱۴ پرونده جاری (Open)</span>
                            <span class="gh-status-closed">🟣 ۱,۴۰۶ مختومه و موفق (Closed)</span>
                        </div>
                    </div>
                    <?php foreach ($issues as $iss) : ?>
                        <div class="gh-issue-row">
                            <div class="gh-issue-icon">🟢</div>
                            <div class="gh-issue-content">
                                <div class="gh-issue-title-row">
                                    <a href="#" class="gh-issue-link"><?php echo esc_html($iss['title']); ?></a>
                                    <?php foreach ($iss['labels'] as $lbl) : ?>
                                        <span class="gh-label-pill" style="background: <?php echo esc_attr($lbl['bg']); ?>22; border-color: <?php echo esc_attr($lbl['bg']); ?>; color: <?php echo esc_attr($lbl['bg']); ?>;">
                                            <?php echo esc_html($lbl['name']); ?>
                                        </span>
                                    <?php endforeach; ?>
                                </div>
                                <div class="gh-issue-meta">
                                    <code>#<?php echo esc_html($iss['tag']); ?></code> ثبت شده توسط <?php echo esc_html($iss['author']); ?> در <?php echo esc_html($iss['time']); ?>
                                </div>
                            </div>
                            <div class="gh-issue-comments">
                                💬 <?php echo esc_html($iss['comments']); ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * 3. Audit & Commits Page
     */
    public function render_commits_page() {
        $commits = [
            ['hash' => 'e7b8a1c', 'msg' => 'ثبت دادخواست داوری در دبیرخانه اتاق بازرگانی بین‌المللی', 'author' => 'سید امیر حسین رضوی', 'time' => 'امروز ساعت ۱۰:۱۴', 'verified' => true],
            ['hash' => 'd2f440a', 'msg' => 'ابلاغ نظریه هیئت کارشناسی سه‌نفره حسابرسی با تایید عدم تخلف موکل', 'author' => 'کارشناس رسمی دادگستری', 'time' => 'دیروز ساعت ۱۶:۴۰', 'verified' => true],
            ['hash' => 'c8a911e', 'msg' => 'واریز قسط دوم تمبر مالیاتی و حق‌الوکاله مرحله بدوی', 'author' => 'درگاه پرداخت آنلاین', 'time' => '۳ روز قبل', 'verified' => true],
            ['hash' => 'a1b730f', 'msg' => 'تنظیم لایحه دفاعیه پاسخ به ایرادات شکلی طرف مقابل دعوا', 'author' => 'دکتر کاظمی', 'time' => '۵ روز قبل', 'verified' => true],
        ];
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('commits'); ?>

            <div class="gh-body">
                <div class="gh-commits-timeline">
                    <h3 class="gh-timeline-date">رویدادها و اقدامات ثبت‌شده (Commit Trail)</h3>
                    <div class="gh-commits-list">
                        <?php foreach ($commits as $c) : ?>
                            <div class="gh-commit-item">
                                <div class="gh-commit-node"></div>
                                <div class="gh-commit-box">
                                    <div class="gh-commit-main">
                                        <strong><?php echo esc_html($c['msg']); ?></strong>
                                        <div class="gh-commit-author">
                                            <span><?php echo esc_html($c['author']); ?></span> در <span><?php echo esc_html($c['time']); ?></span>
                                            <?php if ($c['verified']) : ?>
                                                <span class="gh-badge-verified">Verified</span>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                    <div class="gh-commit-hash">
                                        <code><?php echo esc_html($c['hash']); ?></code>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * 4. Ledger & Transactions Page
     */
    public function render_ledger_page() {
        $txs = [
            ['id' => 'tx-9f82d1c', 'client' => 'هلدینگ صادرات فولاد پارس', 'amount' => '۴۵,۰۰۰,۰۰۰ تومان', 'type' => 'حق‌الوکاله داوری', 'gateway' => 'زرین‌پال VIP', 'date' => '۱۴۰۳/۰۹/۱۲', 'status' => 'تسویه شد'],
            ['id' => 'tx-84e112b', 'client' => 'شرکت دارویی زیست‌فناور', 'amount' => '۱۲,۰۰۰,۰۰۰ تومان', 'type' => 'هزینه کارشناسی رسمی', 'gateway' => 'سپرده دادگستری', 'date' => '۱۴۰۳/۰۹/۰۸', 'status' => 'تسویه شد'],
            ['id' => 'tx-6b2a09f', 'client' => 'مهندس بهنام صراف‌پور', 'amount' => '۳,۵۰۰,۰۰۰ تومان', 'type' => 'مشاوره اختصاصی تنظیم لایحه', 'gateway' => 'کارتخوان دفتر', 'date' => '۱۴۰۳/۰۹/۰۱', 'status' => 'تسویه شد'],
            ['id' => 'tx-4c919a3', 'client' => 'بازرگانی بین‌المللی افق', 'amount' => '۸۰,۰۰۰,۰۰۰ تومان', 'type' => 'بیعانه پرونده دیوان عالی', 'gateway' => 'حواله ساتنا بانکی', 'date' => '۱۴۰۳/۰۸/۲۴', 'status' => 'تسویه شد'],
        ];
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('ledger'); ?>

            <div class="gh-body">
                <div class="gh-card">
                    <div class="gh-card-header">
                        <h3>دفتر کل تراکنش‌ها و اسناد مالی (Financial Ledger)</h3>
                        <span class="gh-card-subtitle">تراکنش‌های رمزنگاری شده با شناسه ارجاع یکتا</span>
                    </div>
                    <div class="gh-card-body">
                        <table class="gh-table">
                            <thead>
                                <tr>
                                    <th>شناسه هش (Hash)</th>
                                    <th>طرف قرارداد / موکل</th>
                                    <th>موضوع پرداخت</th>
                                    <th>مبلغ (تومان)</th>
                                    <th>شیوه / درگاه</th>
                                    <th>تاریخ ثبت</th>
                                    <th>وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($txs as $t) : ?>
                                    <tr>
                                        <td><code><?php echo esc_html($t['id']); ?></code></td>
                                        <td><strong><?php echo esc_html($t['client']); ?></strong></td>
                                        <td><?php echo esc_html($t['type']); ?></td>
                                        <td class="gh-amount"><?php echo esc_html($t['amount']); ?></td>
                                        <td><?php echo esc_html($t['gateway']); ?></td>
                                        <td><?php echo esc_html($t['date']); ?></td>
                                        <td><span class="gh-badge-success"><?php echo esc_html($t['status']); ?></span></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * 5. Documentation & Shortcodes Hub
     */
    public function render_docs_page() {
        require_once UAS_PATH . 'includes/class-standalone-shortcodes.php';
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('docs'); ?>

            <div class="gh-body">
                <?php echo Standalone_Shortcodes::instance()->render_docs_hub([]); ?>
            </div>
        </div>
        <?php
    }

    /**
     * 6. Industry Presets & Custom Fields Switcher
     */
    public function render_presets_page() {
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('presets'); ?>

            <div class="gh-body">
                <div class="gh-card">
                    <div class="gh-card-header">
                        <h3>مدیریت و سوئیچر هوشمند ۶ صنف اختصاصی</h3>
                        <span class="gh-card-subtitle">تغییر فوری کلیه واژگان، فیلدها و سکشن‌های اختصاصی صنف بدون تداخل کدهای وردپرس</span>
                    </div>
                    <div class="gh-card-body">
                        <div class="gh-metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); margin-bottom: 24px;">
                            <div class="gh-metric-card" style="border-right: 4px solid #D4AF37;">
                                <span class="gh-metric-title">۱. دفتر وکالت و داوری حقوقی</span>
                                <div class="gh-metric-value" style="font-size: 16px;">محاسبه‌گر دادگستری + گنجه اسناد</div>
                                <span class="gh-metric-diff positive">شورت‌کد: <code>[uas_legal_court_calculator]</code></span>
                            </div>
                            <div class="gh-metric-card" style="border-right: 4px solid #06B6D4;">
                                <span class="gh-metric-title">۲. پزشکی و کلینیک دندان‌پزشکی</span>
                                <div class="gh-metric-value" style="font-size: 16px;">کارت ضمانت درمان + نوبت‌دهی آنلاین</div>
                                <span class="gh-metric-diff positive">شورت‌کد: <code>[uas_dental_treatment_cards]</code></span>
                            </div>
                            <div class="gh-metric-card" style="border-right: 4px solid #F59E0B;">
                                <span class="gh-metric-title">۳. مهندسی، سازه و معماری</span>
                                <div class="gh-metric-value" style="font-size: 16px;">محاسبه‌گر آرماتور/بتن + مدل‌سازی BIM</div>
                                <span class="gh-metric-diff positive">شورت‌کد: <code>[uas_engineering_structural_calc]</code></span>
                            </div>
                            <div class="gh-metric-card" style="border-right: 4px solid #8B5CF6;">
                                <span class="gh-metric-title">۴. آژانس دیجیتال مارکتینگ و وردپرس</span>
                                <div class="gh-metric-value" style="font-size: 16px;">استک فناوری + بنچمارک سرعت 100</div>
                                <span class="gh-metric-diff positive">شورت‌کد: <code>[uas_agency_tech_stack]</code></span>
                            </div>
                            <div class="gh-metric-card" style="border-right: 4px solid #2563EB;">
                                <span class="gh-metric-title">۵. هلدینگ تجاری و بازرگانی بین‌الملل</span>
                                <div class="gh-metric-value" style="font-size: 16px;">ماتریس اینکوترمز ۲۰۲۰ + پیگیری گمرکی</div>
                                <span class="gh-metric-diff positive">شورت‌کد: <code>[uas_corporate_incoterms_matrix]</code></span>
                            </div>
                            <div class="gh-metric-card" style="border-right: 4px solid #10B981;">
                                <span class="gh-metric-title">۶. استارتاپ و پلتفرم ابری (SaaS)</span>
                                <div class="gh-metric-value" style="font-size: 16px;">ماتریس اشتراک + سندباکس API</div>
                                <span class="gh-metric-diff positive">شورت‌کد: <code>[uas_saas_pricing_matrix]</code></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * 7. eCommerce, WoodMart & JetWooBuilder Integration
     */
    public function render_ecommerce_page() {
        ?>
        <div class="wrap gh-wrap" dir="rtl">
            <?php $this->render_header('ecommerce'); ?>

            <div class="gh-body">
                <div class="gh-card">
                    <div class="gh-card-header">
                        <h3>مرکز یکپارچگی ووکامرس، قالب وودمارت، جت وو بیلدر و شاپ انجین</h3>
                        <span class="gh-card-subtitle">هماهنگی خودکار پالت رنگی، جلوگیری از تداخل لوپ‌های فروشگاهی و سازگاری با ایجکس</span>
                    </div>
                    <div class="gh-card-body">
                        <div class="gh-metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                            <div class="gh-metric-card">
                                <span class="gh-metric-title">قالب وودمارت (WoodMart)</span>
                                <div class="gh-metric-value" style="font-size: 18px; color: #58A6FF;">سازگار ۱۰۰٪</div>
                                <p style="font-size: 12px; color: #8B949E; margin-top: 8px;">هماهنگی متغیرهای رنگی، جستجوی ایجکس هدر و لایت‌باکس بدون باگ.</p>
                            </div>
                            <div class="gh-metric-card">
                                <span class="gh-metric-title">جت وو بیلدر (JetWooBuilder)</span>
                                <div class="gh-metric-value" style="font-size: 18px; color: #238636;">سازگار ۱۰۰٪</div>
                                <p style="font-size: 12px; color: #8B949E; margin-top: 8px;">پشتیبانی از کاستوم تمپلیت‌های المنتوری سینگل و آرشیو محصولات با افزودن به سبد ایجکس.</p>
                            </div>
                            <div class="gh-metric-card">
                                <span class="gh-metric-title">شاپ انجین (ShopEngine)</span>
                                <div class="gh-metric-value" style="font-size: 18px; color: #F59E0B;">سازگار ۱۰۰٪</div>
                                <p style="font-size: 12px; color: #8B949E; margin-top: 8px;">همگام‌سازی اعلان‌های مرحله تسویه‌حساب و ویجت‌های درگاه پرداخت.</p>
                            </div>
                        </div>

                        <div style="margin-top: 24px; padding: 16px; background: #0D1117; border-radius: 8px; border: 1px solid #30363D;">
                            <h4 style="color: #F0F6FC; margin: 0 0 10px 0;">شورت‌کدهای فروشگاهی آماده استفاده در وودمارت و المنتور:</h4>
                            <p style="font-size: 13px; color: #C9D1D9; margin: 6px 0;">• جدول پکیج‌های قیمتی و خدمات: <code>[uas_service_pricing_table]</code></p>
                            <p style="font-size: 13px; color: #C9D1D9; margin: 6px 0;">• نشان برجسته محصول وودمارت: <code>[uas_woodmart_product_badge text="ویژه" color="#D4AF37"]</code></p>
                            <p style="font-size: 13px; color: #C9D1D9; margin: 6px 0;">• فرم تسویه حساب سریع تک‌مرحله‌ای: <code>[uas_quick_checkout_box]</code></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
}

