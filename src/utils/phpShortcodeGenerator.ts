import { REACT_SHORTCODE_DEFINITIONS, ReactComponentShortcodeDef } from '../data/reactShortcodeDefinitions';

export interface PhpGeneratorOptions {
  selectedComponentIds: string[];
  targetType: 'theme' | 'plugin';
  shortcodePrefix: string;
  functionPrefix: string;
  engine: 'vite-bundle' | 'wp-element' | 'cdn';
  includeRestApi: boolean;
  includeCurrentUser: boolean;
  includeLawyerProfile: boolean;
  includeAdminAjax: boolean;
  includeSkeleton: boolean;
  elementorSupport: boolean;
  customContainerClass: string;
  autoMountScript: boolean;
}

export const DEFAULT_GENERATOR_OPTIONS: PhpGeneratorOptions = {
  selectedComponentIds: REACT_SHORTCODE_DEFINITIONS.map((c) => c.id),
  targetType: 'theme',
  shortcodePrefix: 'sedrazavi_react_',
  functionPrefix: 'sedrazavi_',
  engine: 'vite-bundle',
  includeRestApi: true,
  includeCurrentUser: true,
  includeLawyerProfile: true,
  includeAdminAjax: true,
  includeSkeleton: true,
  elementorSupport: true,
  customContainerClass: 'sedrazavi-ui-wrapper',
  autoMountScript: true,
};

/**
 * Generates the complete, production-ready PHP template file with shortcode wrappers,
 * asset registration, smart lazy wp_enqueue_script, and wp_localize_script logic.
 */
export function generatePhpShortcodeTemplate(options: PhpGeneratorOptions): string {
  const {
    selectedComponentIds,
    targetType,
    shortcodePrefix,
    functionPrefix,
    engine,
    includeRestApi,
    includeCurrentUser,
    includeLawyerProfile,
    includeAdminAjax,
    includeSkeleton,
    elementorSupport,
    customContainerClass,
    autoMountScript,
  } = options;

  const selectedComponents = REACT_SHORTCODE_DEFINITIONS.filter((def) =>
    selectedComponentIds.includes(def.id)
  );

  const fileDate = new Date().toLocaleDateString('fa-IR');
  const sanitizedPrefix = shortcodePrefix.replace(/[^a-zA-Z0-9_]/g, '_');
  const funcPrefix = functionPrefix.replace(/[^a-zA-Z0-9_]/g, '_');

  let code = `<?php
/**
 * ==============================================================================
 * پکیج اتصال یکپارچه شورت‌کدهای React در وردپرس (WordPress React Shortcode Bridge)
 * ==============================================================================
 * 
 * نسخه: 2.5.0
 * تاریخ تولید: ${fileDate}
 * توسعه‌دهنده: دفتر حقوقی و وکالت SedRazavi (سید امیر حسین رضوی فردویی)
 * وب‌سایت: https://t.me/sedrazavi
 * مجوز: GPL v2 or later
 * 
 * توضیحات فنی:
 * این فایل شامل رجیستری هوشمند شورت‌کدهای وردپرس برای مانت خودکار مؤلفه‌های مدرن React
 * همراه با سازوکار بهینه Enqueue تاخیری (Lazy Enqueuing) جهت بارگذاری فایل‌های JS/CSS
 * صرفاً در برگه‌های نیازمند شورت‌کد و ارسال متغیرهای سرور با wp_localize_script می‌باشد.
 * 
 * تعداد مؤلفه‌های فعال‌شده: ${selectedComponents.length} از ${REACT_SHORTCODE_DEFINITIONS.length}
 * نحوه استقرار: ${targetType === 'theme' ? 'پوسته وردپرس (Theme Include)' : 'افزونه مستقل وردپرس (Must-Use Plugin / Addon)'}
 * موتور اجرا: ${engine === 'vite-bundle' ? 'باندل کامپایل‌شده Vite (React 19 / 18)' : engine === 'wp-element' ? 'موتور داخلی هسته گوتنبرگ (wp-element)' : 'CDN خارجی React'}
 * ==============================================================================
 */

// جلوگیری از دسترسی مستقیم به فایل
if (!defined('ABSPATH')) {
    exit;
}

// ۱. تعریف ثابت‌های بنیادین ماژول
if (!defined('${funcPrefix.toUpperCase()}REACT_BRIDGE_VERSION')) {
    define('${funcPrefix.toUpperCase()}REACT_BRIDGE_VERSION', '2.5.0');
}
if (!defined('${funcPrefix.toUpperCase()}REACT_PREFIX')) {
    define('${funcPrefix.toUpperCase()}REACT_PREFIX', '${sanitizedPrefix}');
}

/**
 * ۲. ثبت اسکریپت‌ها و استایل‌های اصلی React در وردپرس (Asset Registration)
 * اسکریپت‌ها در این مرحله فقط REGISTER می‌شوند و تا زمان فراخوانی شورت‌کد، در حافظه لود نمی‌شوند.
 */
function ${funcPrefix}register_react_assets() {
    $version = ${funcPrefix.toUpperCase()}REACT_BRIDGE_VERSION;
`;

  if (targetType === 'theme') {
    code += `    $assets_url = get_template_directory_uri() . '/assets/';
    $dist_url   = get_template_directory_uri() . '/dist/';
    $dist_path  = get_template_directory() . '/dist/';
`;
  } else {
    code += `    $assets_url = plugin_dir_url(__FILE__) . 'assets/';
    $dist_url   = plugin_dir_url(__FILE__) . 'dist/';
    $dist_path  = plugin_dir_path(__FILE__) . 'dist/';
`;
  }

  code += `
    // بررسی وجود فایل‌های کامپایل شده یا استفاده از آدرس پیش‌فرض
    $js_bundle  = file_exists($dist_path . 'index.js')  ? $dist_url . 'index.js'  : $assets_url . 'js/react-app.min.js';
    $css_bundle = file_exists($dist_path . 'index.css') ? $dist_url . 'index.css' : $assets_url . 'css/react-app.min.css';

`;

  if (engine === 'wp-element') {
    code += `    // وابستگی به موتور React داخلی گوتنبرگ وردپرس
    $dependencies = array('wp-element', 'wp-i18n', 'wp-api-fetch');
`;
  } else {
    code += `    // وابستگی به اسکریپت‌های مستقل یا بدون پیش‌نیاز
    $dependencies = array();
`;
  }

  code += `
    // ثبت استایل اصلی مؤلفه‌های React (شامل Tailwind CSS کامپایل‌شده)
    wp_register_style(
        '${sanitizedPrefix}styles',
        $css_bundle,
        array(),
        $version
    );

    // ثبت اسکریپت اجرایی React و رجیستری مؤلفه‌ها
    wp_register_script(
        '${sanitizedPrefix}bundle',
        $js_bundle,
        $dependencies,
        $version,
        true // لود در فوتر صفحه جهت بهینه‌سازی سرعت و امتیاز Core Web Vitals
    );
}
add_action('wp_enqueue_scripts', '${funcPrefix}register_react_assets', 10);

/**
 * ۳. تزریق هوشمند اسکریپت‌ها و متغیرهای سرور (Smart Lazy Enqueue & wp_localize_script)
 * این تابع تنها هنگامی که حداقل یک شورت‌کد در صفحه اجرا شود صدا زده می‌شود تا از لود بیهوده جلوگیری گردد.
 */
function ${funcPrefix}enqueue_react_runtime() {
    static $already_enqueued = false;
    if ($already_enqueued) {
        return;
    }
    $already_enqueued = true;

    // ۱. انکیو کردن استایل و اسکریپت ثبت‌شده
    wp_enqueue_style('${sanitizedPrefix}styles');
    wp_enqueue_script('${sanitizedPrefix}bundle');

    // ۲. آماده‌سازی داده‌های سرور جهت ارسال با wp_localize_script
    $localized_data = array(
        'siteUrl'        => home_url(),
        'siteName'       => get_bloginfo('name'),
        'isRtl'          => is_rtl(),
        'shortcodePrefix'=> '${sanitizedPrefix}',
        'version'        => ${funcPrefix.toUpperCase()}REACT_BRIDGE_VERSION,
        'locale'         => get_locale(),
`;

  if (includeRestApi) {
    code += `        // مشخصات REST API جهت ارتباط ایجکس و واکشی داده‌های لحظه‌ای
        'rest' => array(
            'root'      => esc_url_raw(rest_url()),
            'endpoint'  => esc_url_raw(rest_url('sedrazavi/v1/')),
            'nonce'     => wp_create_nonce('wp_rest'),
        ),
`;
  }

  if (includeAdminAjax) {
    code += `        // اطلاعات امنیتی Admin Ajax سنتی وردپرس
        'ajax' => array(
            'url'   => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('${sanitizedPrefix}ajax_security_nonce'),
        ),
`;
  }

  if (includeCurrentUser) {
    code += `        // مشخصات کاربر جاری در صورت لاگین بودن
        'currentUser' => array(
            'isLoggedIn'   => is_user_logged_in(),
            'id'           => get_current_user_id(),
            'displayName'  => is_user_logged_in() ? wp_get_current_user()->display_name : '',
            'email'        => is_user_logged_in() ? wp_get_current_user()->user_email : '',
            'roles'        => is_user_logged_in() ? wp_get_current_user()->roles : array(),
        ),
`;
  }

  if (includeLawyerProfile) {
    code += `        // اطلاعات پایه هویت و پروانه وکیل از تنظیمات پوسته یا پیش‌فرض
        'lawyerProfile' => array(
            'name'           => get_option('sedrazavi_lawyer_name', 'سرکار خانم دکتر سیده مریم رضوی'),
            'title'          => get_option('sedrazavi_lawyer_title', 'وکیل پایه یک دادگستری و مشاور ارشد حقوقی'),
            'licenseNumber'  => get_option('sedrazavi_lawyer_license', '۱۸۴۵۲ / ک.و.م'),
            'phone'          => get_option('sedrazavi_lawyer_phone', '۰۲۱-۸۸۹۹۰۰۱۱'),
            'mobile'         => get_option('sedrazavi_lawyer_mobile', '۰۹۱۲-۳۴۵۶۷۸۹'),
            'address'        => get_option('sedrazavi_lawyer_address', 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi'),
            'onlineBooking'  => true,
        ),
`;
  }

  code += `        'translations' => array(
            'loading'        => __('در حال بارگذاری مؤلفه حقوقی...', 'sedrazavi-react'),
            'error'          => __('خطا در برقراری ارتباط با سامانه حقوقی.', 'sedrazavi-react'),
            'retry'          => __('تلاش مجدد', 'sedrazavi-react'),
            'courtFeeTitle'  => __('محاسبه‌گر تخصصی قوه قضاییه', 'sedrazavi-react'),
            'caseTrackerTitle'=> __('سامانه برخط رهگیری پرونده‌های موکلین', 'sedrazavi-react'),
        ),
    );

    // فیلتر وردپرس برای شخصی‌سازی یا افزودن داده‌های بیشتر توسط افزونه‌ها
    $localized_data = apply_filters('${funcPrefix}react_localized_data', $localized_data);

    // ارسال متغیر امن جاوااسکریپت به پنجره مرورگر
    wp_localize_script('${sanitizedPrefix}bundle', 'SedRazaviReactConfig', $localized_data);
}

/**
 * ۴. تابع کمکی رندر اسکلت پیش‌بارگذار (Skeleton Preloader Renderer)
 * پیشگیری از پرش محتوا (CLS) و ارتقای سئو قبل از هیدراته شدن کامل جاوااسکریپت
 */
function ${funcPrefix}render_react_skeleton($component_name, $custom_title = '') {
`;

  if (includeSkeleton) {
    code += `    ob_start();
    ?>
    <div class="sedrazavi-skeleton-container" style="min-height: 220px; background: linear-gradient(135deg, rgba(11,19,43,0.04) 0%, rgba(212,175,55,0.06) 100%); border: 1px dashed rgba(212,175,55,0.35); border-radius: 1.25rem; padding: 1.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: inherit; direction: rtl; margin: 0.75rem 0;">
        <div style="width: 44px; height: 44px; border: 3px solid rgba(212,175,55,0.25); border-top-color: #D4AF37; border-radius: 50%; animation: sedrazaviSpin 1.1s cubic-bezier(0.5, 0, 0.5, 1) infinite; margin-bottom: 0.75rem;"></div>
        <p style="font-size: 0.875rem; font-weight: 700; color: #0B132B; margin: 0 0 0.25rem 0;">
            <?php echo esc_html(!empty($custom_title) ? $custom_title : 'سامانه حقوقی هوشمند SedRazavi'); ?>
        </p>
        <span style="font-size: 0.75rem; color: #718096;">
            در حال بارگذاری مؤلفه <?php echo esc_html($component_name); ?>...
        </span>
        <style>
            @keyframes sedrazaviSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
    </div>
    <?php
    return ob_get_clean();
`;
  } else {
    code += `    return '<div class="sedrazavi-react-loading" style="padding:10px;text-align:center;color:#888;">در حال بارگذاری...</div>';
`;
  }

  code += `}

/**
 * ==============================================================================
 * ۵. تعریف شورت‌کدهای اختصاصی برای مؤلفه‌های React (Shortcode Wrappers)
 * ==============================================================================
 */
`;

  // Generate wrapper function for each selected component
  selectedComponents.forEach((def, index) => {
    const fullTag = `${sanitizedPrefix}${def.shortcodeTag.replace(/^react_/, '')}`;
    const functionName = `${funcPrefix}shortcode_${def.id.replace(/-/g, '_')}`;

    code += `
/**
 * [${fullTag}]
 * ${def.title}
 * مؤلفه ری‌اکت: <${def.componentName} />
 * ${def.phpDocDescription}
 */
function ${functionName}($atts, $content = null) {
    // ۱. فراخوانی تابع Enqueue تاخیری
    ${funcPrefix}enqueue_react_runtime();

    // ۲. استخراج و اعتبارسنجی اتریبیوت‌های ورودی شورت‌کد
    $default_atts = array(
`;

    def.attributes.forEach((attr) => {
      let defaultValStr = '';
      if (typeof attr.defaultValue === 'boolean') {
        defaultValStr = attr.defaultValue ? "'true'" : "'false'";
      } else if (typeof attr.defaultValue === 'number') {
        defaultValStr = attr.defaultValue.toString();
      } else {
        defaultValStr = `'${attr.defaultValue}'`;
      }
      code += `        '${attr.name}' => ${defaultValStr},\n`;
    });

    code += `        'class' => '',
        'id'    => '',
    );

    $a = shortcode_atts($default_atts, $atts, '${fullTag}');

    // ۳. تمیزکاری و تایپ‌کست مقادیر به صورت امن
    $props = array();
`;

    def.attributes.forEach((attr) => {
      if (attr.type === 'number') {
        code += `    $props['${attr.name}'] = intval($a['${attr.name}']);\n`;
      } else if (attr.type === 'boolean') {
        code += `    $props['${attr.name}'] = filter_var($a['${attr.name}'], FILTER_VALIDATE_BOOLEAN);\n`;
      } else {
        code += `    $props['${attr.name}'] = sanitize_text_field($a['${attr.name}']);\n`;
      }
    });

    code += `
    // اگر محتوای متنی داخل شورت‌کد قرار داده شده باشد
    if (!empty($content)) {
        $props['innerContent'] = do_shortcode($content);
    }

    // ۴. اعمال فیلتر هوک برای توسعه‌پذیری
    $props = apply_filters('${fullTag}_props', $props, $a);

    // ۵. ایجاد شناسه یکتا برای کانتینر مانت
    $unique_id = !empty($a['id']) ? sanitize_html_class($a['id']) : 'sedrazavi-react-' . wp_unique_id();
    $css_class = trim('${customContainerClass} ' . sanitize_text_field($a['class']));

    // ۶. رندر خروجی کانتینر DOM با متادیتا و اسکلت
    ob_start();
    ?>
    <div 
        id="<?php echo esc_attr($unique_id); ?>" 
        class="sedrazavi-react-root <?php echo esc_attr($css_class); ?>"
        data-component="<?php echo esc_attr('${def.componentName}'); ?>"
        data-shortcode="<?php echo esc_attr('${fullTag}'); ?>"
        data-props="<?php echo esc_attr(wp_json_encode($props)); ?>"
        dir="rtl"
    >
        <?php echo ${funcPrefix}render_react_skeleton('${def.componentName}', '${def.title}'); ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('${fullTag}', '${functionName}');
`;
  });

  if (autoMountScript) {
    code += `
/**
 * ==============================================================================
 * ۶. اسکریپت خودکار مانت کلاینت در فوتر (Auto Mount Loader in wp_footer)
 * شناسایی تمام کانتینرهای .sedrazavi-react-root و مانت مؤلفه‌ها با ReactDOM.createRoot
 * ==============================================================================
 */
function ${funcPrefix}render_react_mount_bootstrap() {
    ?>
    <script type="text/javascript" id="${sanitizedPrefix}mount-bootstrap">
    (function() {
        function mountAllSedRazaviComponents() {
            var roots = document.querySelectorAll('.sedrazavi-react-root:not([data-mounted="true"])');
            if (!roots || roots.length === 0) return;

            // بررسی دسترسی به آبجکت و کتابخانه React
            var registry = window.SedRazaviReactComponents || {};
            var React = window.React || (window.wp && window.wp.element);
            var ReactDOM = window.ReactDOM || (window.wp && window.wp.element);

            roots.forEach(function(container) {
                var compName = container.getAttribute('data-component');
                var rawProps = container.getAttribute('data-props');
                var props = {};
                try {
                    props = rawProps ? JSON.parse(rawProps) : {};
                } catch(e) {
                    console.error('SedRazavi React Props Parse Error:', e, rawProps);
                }

                var ComponentClass = registry[compName];
                if (ComponentClass && ReactDOM && React) {
                    try {
                        container.setAttribute('data-mounted', 'true');
                        // پاکسازی اسکلت لودینگ
                        container.innerHTML = '';
                        if (ReactDOM.createRoot) {
                            var root = ReactDOM.createRoot(container);
                            root.render(React.createElement(ComponentClass, props));
                        } else if (ReactDOM.render) {
                            ReactDOM.render(React.createElement(ComponentClass, props), container);
                        }
                    } catch(mountErr) {
                        console.error('Error mounting React component: ' + compName, mountErr);
                    }
                }
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', mountAllSedRazaviComponents);
        } else {
            mountAllSedRazaviComponents();
        }

        // هماهنگی با بارگذاری ایجکس و ویجت‌های المنتور
        window.addEventListener('load', mountAllSedRazaviComponents);
        document.addEventListener('sedrazavi:refresh-react-roots', mountAllSedRazaviComponents);

        ${
          elementorSupport
            ? `
        // اتصال به رویدادهای زنده المنتور (Elementor Frontend Hook)
        window.addEventListener('elementor/frontend/init', function() {
            if (window.elementorFrontend && window.elementorFrontend.hooks) {
                window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function() {
                    mountAllSedRazaviComponents();
                });
            }
        });
        `
            : ''
        }
    })();
    </script>
    <?php
}
add_action('wp_footer', '${funcPrefix}render_react_mount_bootstrap', 99);
`;
  }

  code += `
/**
 * ==============================================================================
 * ۷. راهنمای استفاده و مستندات داخل پیشخوان وردپرس
 * ==============================================================================
 */
function ${funcPrefix}react_shortcodes_admin_notice() {
    $screen = get_current_screen();
    if ($screen && $screen->id === 'dashboard') {
        ?>
        <div class="notice notice-info is-dismissible" style="border-right-color: #D4AF37;">
            <p>
                <strong>🏛️ ماژول شورت‌کدهای React دفتر وکالت SedRazavi فعال است:</strong>
                تعداد ${selectedComponents.length} شورت‌کد اختصاصی آماده استفاده در برگه، نوشته و ویجت کد کوتاه المنتور می‌باشند.
            </p>
        </div>
        <?php
    }
}
add_action('admin_notices', '${funcPrefix}react_shortcodes_admin_notice');
`;

  return code;
}

/**
 * Generates the companion client-side JavaScript mounting engine (sedrazavi-react-mount.js).
 */
export function generateMountingEngineJs(options: PhpGeneratorOptions): string {
  const { shortcodePrefix, elementorSupport } = options;
  return `/**
 * ==============================================================================
 * موتور مانت خودکار مؤلفه‌های React در وردپرس (WordPress React Component Mount Engine)
 * ==============================================================================
 * 
 * این اسکریپت تمام نودهای DOM دارای کلاس '.sedrazavi-react-root' را اسکن کرده،
 * اطلاعات کامپوننت و data-props را استخراج نموده و با ReactDOM.createRoot مانت می‌نماید.
 */

(function(window, document) {
    'use strict';

    // رجیستری مرکزی مؤلفه‌ها
    window.SedRazaviReactComponents = window.SedRazaviReactComponents || {};

    /**
     * ثبت مؤلفه جدید در رجیستری
     * @param {string} name نام مؤلفه
     * @param {React.ComponentType} componentClass کلاس مؤلفه
     */
    window.registerSedRazaviComponent = function(name, componentClass) {
        window.SedRazaviReactComponents[name] = componentClass;
    };

    /**
     * متد اصلی مانت کردن همه ریشه‌های React در صفحه
     */
    window.SedRazaviMountReactComponents = function() {
        var targets = document.querySelectorAll('.sedrazavi-react-root:not([data-mounted="true"])');
        if (!targets || targets.length === 0) return;

        var React = window.React || (window.wp && window.wp.element);
        var ReactDOM = window.ReactDOM || (window.wp && window.wp.element);

        if (!React || !ReactDOM) {
            console.warn('SedRazavi React Mount: React or ReactDOM is not loaded yet. Waiting...');
            return;
        }

        targets.forEach(function(node) {
            var componentName = node.getAttribute('data-component');
            var rawProps = node.getAttribute('data-props');
            var props = {};

            try {
                if (rawProps) {
                    props = JSON.parse(rawProps);
                }
            } catch (err) {
                console.error('Failed to parse data-props for component ' + componentName, err, rawProps);
            }

            // ادغام با تنظیمات سرور از SedRazaviReactConfig
            if (window.SedRazaviReactConfig) {
                props.serverConfig = window.SedRazaviReactConfig;
                props.siteUrl = window.SedRazaviReactConfig.siteUrl;
                props.isRtl = window.SedRazaviReactConfig.isRtl;
                props.currentUser = window.SedRazaviReactConfig.currentUser;
                props.lawyerProfile = window.SedRazaviReactConfig.lawyerProfile;
            }

            var Component = window.SedRazaviReactComponents[componentName];
            if (Component) {
                try {
                    node.setAttribute('data-mounted', 'true');
                    node.innerHTML = ''; // حذف اسکلت لودینگ پیش‌فرض

                    if (ReactDOM.createRoot) {
                        var root = ReactDOM.createRoot(node);
                        root.render(React.createElement(Component, props));
                    } else if (ReactDOM.render) {
                        ReactDOM.render(React.createElement(Component, props), node);
                    }
                } catch (mountError) {
                    console.error('Error mounting React component: ' + componentName, mountError);
                }
            } else {
                console.info('Component [' + componentName + '] is queued, waiting for bundle registry.');
            }
        });
    };

    // اجرای اولیه پس از آماده شدن صفحه
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.SedRazaviMountReactComponents);
    } else {
        window.SedRazaviMountReactComponents();
    }

    // لیسنر برای بارگذاری تصاویر و استایل‌ها
    window.addEventListener('load', window.SedRazaviMountReactComponents);

    // هماهنگی با ایونت سفارشی جهت فراخوانی دستی بعد از تراکنش‌های Ajax
    document.addEventListener('sedrazavi:refresh-roots', window.SedRazaviMountReactComponents);

    ${
      elementorSupport
        ? `
    // اتصال هوشمند به پیش‌نمایش زنده ویرایشگر Elementor
    window.addEventListener('elementor/frontend/init', function() {
        if (window.elementorFrontend && window.elementorFrontend.hooks) {
            window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function() {
                window.SedRazaviMountReactComponents();
            });
        }
    });
    `
        : ''
    }

})(window, document);
`;
}

/**
 * Generates the 1-line integration snippet to include in functions.php.
 */
export function generateFunctionsPhpSnippet(options: PhpGeneratorOptions): string {
  const { targetType, functionPrefix } = options;
  if (targetType === 'theme') {
    return `// ==============================================================================
// اتصال پل شورت‌کدهای React دفتر وکالت SedRazavi
// این خط کد را در انتهای فایل functions.php پوسته خود قرار دهید:
// ==============================================================================
if (file_exists(get_template_directory() . '/inc/sedrazavi-react-shortcodes.php')) {
    require_once get_template_directory() . '/inc/sedrazavi-react-shortcodes.php';
}`;
  } else {
    return `// ==============================================================================
// استفاده به صورت افزونه مستقل وردپرس (Plugin)
// فایل را در مسیر wp-content/plugins/sedrazavi-react-shortcodes/sedrazavi-react-shortcodes.php
// قرار داده و از منوی «افزونه‌ها > افزونه‌های نصب‌شده» در پیشخوان وردپرس آن را فعال نمایید.
// ==============================================================================`;
  }
}

/**
 * Generates complete documentation markdown file.
 */
export function generateDocumentationMarkdown(options: PhpGeneratorOptions): string {
  const { shortcodePrefix, selectedComponentIds } = options;
  const selectedComponents = REACT_SHORTCODE_DEFINITIONS.filter((def) =>
    selectedComponentIds.includes(def.id)
  );

  return `# راهنمای جامع اتصال و مانت مؤلفه‌های React در وردپرس (SedRazavi React Shortcodes)

این بسته نرم‌افزاری به شما اجازه می‌دهد تمام مؤلفه‌های غنی، مدرن و تعاملی React این داشبورد (نظیر استپر رهگیری پرونده، ماشین‌حساب قضایی، پورتال موکل و...) را به راحتی از طریق **شورت‌کدهای استاندارد وردپرس** در هر برگه، نوشته، ابزارک یا المان المنتور قرار دهید.

---

## ⚡ مراحل نصب سریع (در ۲ دقیقه)

### روش اول: قرار دادن در پوسته (Theme)
1. فایل \`sedrazavi-react-shortcodes.php\` تولیدشده را داخل پوشه \`inc/\` پوسته فعال وردپرس قرار دهید:
   \`\`\`
   /wp-content/themes/sedrazavi-theme/inc/sedrazavi-react-shortcodes.php
   \`\`\`
2. خط زیر را به انتهای فایل \`functions.php\` پوسته خود بیفزایید:
   \`\`\`php
   require_once get_template_directory() . '/inc/sedrazavi-react-shortcodes.php';
   \`\`\`

### روش دوم: استفاده به عنوان افزونه اختصاصی (Plugin)
پوشه‌ای با نام \`sedrazavi-react-shortcodes\` در مسیر \`wp-content/plugins/\` بسازید و فایل تولیدشده را در آن کپی کرده و از بخش افزونه‌های وردپرس فعال کنید.

---

## 🛠️ عملکرد wp_enqueue_script و wp_localize_script

- **لود تاخیری (Lazy Enqueue):** کدهای جاوااسکریپت و استایل‌های Tailwind صرفاً در صفحاتی انکیو می‌شوند که شورت‌کد مربوطه در محتوای آن‌ها درج شده باشد.
- **تزریق امن متغیرها با wp_localize_script:**
  آبجکت سراسری \`window.SedRazaviReactConfig\` متغیرهای کلیدی زیر را از سرور به کلاینت منتقل می‌کند:
  - \`rest.endpoint\`: آدرس پایه REST API
  - \`rest.nonce\`: کلید امنیتی Nonce برای اعتبارسنجی درخواست‌های Ajax
  - \`currentUser\`: اطلاعات کاربر جاری در صورت لاگین بودن
  - \`lawyerProfile\`: اطلاعات پروانه، نام و شماره تلفن وکیل از دیتابیس وردپرس

---

## 📋 فهرست کدهای کوتاه فعال‌شده (${selectedComponents.length} مؤلفه)

${selectedComponents
  .map(
    (c) => `### ۱. ${c.title}
- **تگ شورت‌کد:** \`[${shortcodePrefix}${c.shortcodeTag.replace(/^react_/, '')}]\`
- **مؤلفه React:** \`<${c.componentName} />\`
- **توضیحات:** ${c.description}
- **نمونه استفاده در المنتور یا گوتنبرگ:**
\`\`\`text
[${shortcodePrefix}${c.shortcodeTag.replace(/^react_/, '')} ${Object.entries(c.sampleAttributes)
      .map(([k, v]) => `${k}="${v}"`)
      .join(' ')}]
\`\`\`
- **اتریبیوت‌ها:**
${c.attributes.map((a) => `  - \`${a.name}\` (${a.label} - پیش‌فرض: \`${a.defaultValue}\`): ${a.description}`).join('\n')}
`
  )
  .join('\n---\n')}

---

## 🎨 نحوه استفاده در ویرایشگر المنتور (Elementor)
1. برگه مورد نظر را با المنتور ویرایش کنید.
2. از منوی ابزارک‌های سمت راست، ابزارک **«کد کوتاه» (Shortcode)** را به صفحه بکشید.
3. کد کوتاه دلخواه خود را در کادر پیست نمایید (برای مثال \`[${shortcodePrefix}case_tracker case_number="۱۴۰۳-۹۵۴"]\`).
4. دکمه انتشار را بزنید. مؤلفه React همراه با استایل‌ها و داده‌های زنده به صورت آنی بارگذاری می‌شود!
`;
}
