<?php
/**
 * SedRazavi Interactive Onboarding & Educational Tour for Admin
 *
 * @package SedRazavi
 * @version 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_enqueue_admin_tours')) {
    function sedrazavi_enqueue_admin_tours($hook) {
        // Enqueue tour on all SedRazavi admin pages
        if (strpos($hook, 'sedrazavi') !== false) {
            wp_add_inline_style('wp-admin', sedrazavi_get_tour_inline_css());
            wp_add_inline_script('common', sedrazavi_get_tour_inline_js());
        }
    }
    add_action('admin_enqueue_scripts', 'sedrazavi_enqueue_admin_tours');
}

/**
 * Modern RTL CSS for Educational Tour Spotlight & Popover
 */
function sedrazavi_get_tour_inline_css() {
    return '
    .sedrazavi-tour-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(11, 19, 43, 0.72);
        z-index: 99998;
        display: none;
        backdrop-filter: blur(2px);
        transition: opacity 0.3s ease;
    }
    .sedrazavi-tour-highlight {
        position: relative;
        z-index: 99999 !important;
        box-shadow: 0 0 0 4px #D4AF37, 0 0 25px rgba(212, 175, 55, 0.6) !important;
        border-radius: 14px !important;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        background: #ffffff !important;
    }
    .sedrazavi-tour-popover {
        position: absolute;
        z-index: 100000;
        background: #0B132B;
        color: #FFFFFF;
        border: 2px solid #D4AF37;
        border-radius: 16px;
        width: 360px;
        max-width: 90vw;
        padding: 22px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.45);
        font-family: "Vazirmatn", -apple-system, BlinkMacSystemFont, Tahoma, sans-serif;
        direction: rtl;
        text-align: right;
        display: none;
    }
    .sedrazavi-tour-popover h4 {
        margin: 0 0 8px 0;
        color: #D4AF37;
        font-size: 16px;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .sedrazavi-tour-popover p {
        margin: 0 0 16px 0;
        color: #E2E8F0;
        font-size: 13px;
        line-height: 1.7;
    }
    .sedrazavi-tour-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(255,255,255,0.12);
        padding-top: 14px;
        margin-top: 10px;
    }
    .sedrazavi-tour-step-badge {
        font-size: 12px;
        color: #CBD5E1;
        font-weight: 600;
    }
    .sedrazavi-tour-actions {
        display: flex;
        gap: 8px;
    }
    .sedrazavi-tour-btn {
        cursor: pointer;
        border: none;
        padding: 6px 14px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 700;
        font-family: inherit;
        transition: all 0.2s;
    }
    .sedrazavi-tour-btn-next {
        background: #D4AF37;
        color: #0B132B;
    }
    .sedrazavi-tour-btn-next:hover {
        background: #e6be3f;
    }
    .sedrazavi-tour-btn-prev {
        background: rgba(255,255,255,0.15);
        color: #F8FAFC;
    }
    .sedrazavi-tour-btn-close {
        background: transparent;
        color: #94A3B8;
        padding: 4px;
        cursor: pointer;
        border: none;
        font-size: 16px;
        position: absolute;
        top: 12px;
        left: 14px;
    }
    ';
}

/**
 * Educational Tour Logic (4 Interactive Steps)
 */
function sedrazavi_get_tour_inline_js() {
    return '
    document.addEventListener("DOMContentLoaded", function() {
        var steps = [
            {
                elementId: "tour-step-contact",
                title: "📞 گام ۱: نحوه‌ی تغییر شماره تماس و آدرس",
                text: "برای تغییر تلفن مستقیم دفتر، ایمیل و آدرس حضوری کافیست روی دکمه این بخش کلیک کنید یا به «تنظیمات قالب» بروید. تغییرات بلافاصله در کل سایت ذخیره می‌شود.",
                fallbackNotice: "تنظیمات اطلاعات تماس در منوی چپ «وکالت سید رضوی > تنظیمات قالب» در دسترس است."
            },
            {
                elementId: "tour-step-service",
                title: "⚖️ گام ۲: نحوه‌ی افزودن خدمت حقوقی جدید",
                text: "برای ثبت یک تخصص جدید (مانند دعاوی ملکی، بین‌المللی یا مالیات)، روی دکمه این کارت بزنید. می‌توانید عنوان، شرح تعرفه و مدارک لازم را برای مراجعین مشخص کنید.",
                fallbackNotice: "برای افزودن خدمت از منوی «وکالت دکتر رضوی > ثبت پرونده/رکورد جدید» استفاده کنید."
            },
            {
                elementId: "tour-step-bookings",
                title: "📅 گام ۳: نحوه‌ی دیدن نوبت‌های رزروشده",
                text: "تمام نوبت‌های رزرو شده توسط موکلین همراه با شماره تماس و ساعت مشاوره در این بخش ثبت می‌شوند تا بتوانید قبل از جلسه با موکل هماهنگی لازم را انجام دهید.",
                fallbackNotice: "نوبت‌ها در زیرمنوی «رزروها و نوبت‌ها» قابل مشاهده و پیگیری تلفنی هستند."
            },
            {
                elementId: "tour-step-cases",
                title: "📂 گام ۴: مدیریت پرونده‌ها و دادرسی موکلین",
                text: "کارتابل پرونده‌های دادگستری، شماره پرونده ثنا و مهلت‌های اخطاریه تجدیدنظرخواهی ۲۰ روزه در این قسمت با یک نگاه مدیریت می‌شوند.",
                fallbackNotice: "پرونده‌ها و مهلت‌های مواعد قانونی در تب «پرونده‌ها و دادرسی» مستقر هستند."
            }
        ];

        var currentStep = 0;
        var overlay = null;
        var popover = null;

        function createTourElements() {
            if (document.getElementById("sedrazavi-tour-overlay")) return;

            overlay = document.createElement("div");
            overlay.id = "sedrazavi-tour-overlay";
            overlay.className = "sedrazavi-tour-overlay";
            document.body.appendChild(overlay);

            popover = document.createElement("div");
            popover.id = "sedrazavi-tour-popover";
            popover.className = "sedrazavi-tour-popover";
            popover.innerHTML = \'\' +
                \'<button type="button" class="sedrazavi-tour-btn-close" id="tour-close-btn" title="بستن">✕</button>\' +
                \'<h4 id="tour-title">عنوان مرحله</h4>\' +
                \'<p id="tour-text">توضیحات مرحله آموزشی</p>\' +
                \'<div class="sedrazavi-tour-footer">\' +
                \'  <span class="sedrazavi-tour-step-badge" id="tour-step-count">گام ۱ از ۴</span>\' +
                \'  <div class="sedrazavi-tour-actions">\' +
                \'    <button type="button" class="sedrazavi-tour-btn sedrazavi-tour-btn-prev" id="tour-prev-btn">قبلی</button>\' +
                \'    <button type="button" class="sedrazavi-tour-btn sedrazavi-tour-btn-next" id="tour-next-btn">بعدی</button>\' +
                \'  </div>\' +
                \'</div>\';
            document.body.appendChild(popover);

            document.getElementById("tour-close-btn").onclick = closeTour;
            document.getElementById("tour-prev-btn").onclick = prevStep;
            document.getElementById("tour-next-btn").onclick = nextStep;
            overlay.onclick = closeTour;
        }

        function showStep(index) {
            currentStep = index;
            var step = steps[index];
            var targetEl = document.getElementById(step.elementId);

            // Clear previous highlight
            document.querySelectorAll(".sedrazavi-tour-highlight").forEach(function(el) {
                el.classList.remove("sedrazavi-tour-highlight");
            });

            document.getElementById("tour-title").innerText = step.title;
            document.getElementById("tour-text").innerText = step.text;
            document.getElementById("tour-step-count").innerText = "گام " + (index + 1) + " از " + steps.length;
            
            var prevBtn = document.getElementById("tour-prev-btn");
            var nextBtn = document.getElementById("tour-next-btn");

            prevBtn.style.display = index === 0 ? "none" : "inline-block";
            nextBtn.innerText = index === steps.length - 1 ? "پایان آموزش (متوجه شدم)" : "گام بعدی ←";

            overlay.style.display = "block";
            popover.style.display = "block";

            if (targetEl) {
                targetEl.classList.add("sedrazavi-tour-highlight");
                var rect = targetEl.getBoundingClientRect();
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                // Center popover near target element
                var topPos = rect.bottom + scrollTop + 12;
                var leftPos = rect.left + scrollLeft + (rect.width / 2) - 180;
                
                // Keep inside screen
                if (leftPos < 20) leftPos = 20;
                if (leftPos + 380 > window.innerWidth) leftPos = window.innerWidth - 400;

                popover.style.top = topPos + "px";
                popover.style.left = leftPos + "px";

                targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
                // Centered modal fallback
                popover.style.top = "30%";
                popover.style.left = "calc(50% - 180px)";
            }
        }

        function nextStep() {
            if (currentStep < steps.length - 1) {
                showStep(currentStep + 1);
            } else {
                closeTour();
            }
        }

        function prevStep() {
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        }

        function closeTour() {
            if (overlay) overlay.style.display = "none";
            if (popover) popover.style.display = "none";
            document.querySelectorAll(".sedrazavi-tour-highlight").forEach(function(el) {
                el.classList.remove("sedrazavi-tour-highlight");
            });
            localStorage.setItem("sedrazavi_tour_completed", "true");
        }

        function startTour() {
            createTourElements();
            showStep(0);
        }

        // Trigger button listener
        var triggerBtn = document.getElementById("sedrazavi-start-tour-btn");
        if (triggerBtn) {
            triggerBtn.addEventListener("click", function(e) {
                e.preventDefault();
                startTour();
            });
        }

        // Auto launch on start_tour URL parameter or first visit
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("start_tour") === "1" || (!localStorage.getItem("sedrazavi_tour_completed") && triggerBtn)) {
            setTimeout(startTour, 600);
        }
    });
    ';
}
