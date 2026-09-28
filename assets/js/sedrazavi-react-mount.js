/**
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
            console.warn('SedRazavi React Mount: React or ReactDOM is not loaded yet.');
            return;
        }

        targets.forEach(function(node) {
            var componentName = node.getAttribute('data-component');
            var rawProps = node.getAttribute('data-props');
            var props = {};

            try {
                props = rawProps ? JSON.parse(rawProps) : {};
            } catch (err) {
                console.error('SedRazavi: Error parsing JSON props for ' + componentName, err);
            }

            // ادغام تنظیمات سرور که با wp_localize_script ارسال شده‌اند
            if (window.SedRazaviReactConfig) {
                props.serverContext = window.SedRazaviReactConfig;
            }

            var Component = window.SedRazaviReactComponents[componentName];
            if (Component) {
                try {
                    node.setAttribute('data-mounted', 'true');
                    var skeleton = node.querySelector('.sedrazavi-skeleton-container');
                    if (skeleton) skeleton.remove();

                    if (ReactDOM.createRoot) {
                        var root = ReactDOM.createRoot(node);
                        root.render(React.createElement(Component, props));
                    } else if (ReactDOM.render) {
                        ReactDOM.render(React.createElement(Component, props), node);
                    }
                } catch (mountErr) {
                    console.error('SedRazavi: Failed to mount component ' + componentName, mountErr);
                }
            }
        });
    };

    // اجرای خودکار در زمان بارگذاری DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.SedRazaviMountReactComponents);
    } else {
        window.SedRazaviMountReactComponents();
    }

    // هماهنگی با بارگذاری ایجکس و ویجت‌های المنتور
    window.addEventListener('load', window.SedRazaviMountReactComponents);
    document.addEventListener('sedrazavi:refresh-react-roots', window.SedRazaviMountReactComponents);

    // اتصال به رویدادهای زنده المنتور (Elementor Frontend Hook)
    window.addEventListener('elementor/frontend/init', function() {
        if (window.elementorFrontend && window.elementorFrontend.hooks) {
            window.elementorFrontend.hooks.addAction('frontend/element_ready/global', function() {
                window.SedRazaviMountReactComponents();
            });
        }
    });

})(window, document);
