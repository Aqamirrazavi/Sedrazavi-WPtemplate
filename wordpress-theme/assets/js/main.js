/**
 * SedRazavi Law Firm Interactive Engine v2.6.0
 * Complete interactive features for 100% parity with Google AI Studio preview
 */
document.addEventListener("DOMContentLoaded", function() {
    console.log("⚖️ SedRazavi Theme Interactive Engine Ready.");

    // 1. Mobile Menu Drawer Toggle
    var mobileBtn = document.getElementById("mobile-menu-btn");
    var mobileDrawer = document.getElementById("mobile-menu-drawer");
    var closeBtn = document.getElementById("close-mobile-menu-btn");
    var backdrop = document.getElementById("mobile-menu-backdrop");

    if (mobileBtn && mobileDrawer) {
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.addEventListener("click", function() {
            mobileDrawer.classList.add("is-active");
            mobileBtn.setAttribute("aria-expanded", "true");
            document.body.style.overflow = "hidden";
        });
    }
    var closeMobileDrawer = function() {
        if (mobileDrawer && mobileDrawer.classList.contains("is-active")) {
            mobileDrawer.classList.remove("is-active");
            if (mobileBtn) mobileBtn.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        }
    };
    if (closeBtn && mobileDrawer) {
        closeBtn.addEventListener("click", closeMobileDrawer);
    }
    if (backdrop && mobileDrawer) {
        backdrop.addEventListener("click", closeMobileDrawer);
    }
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            closeMobileDrawer();
            ["story-modal", "survey-modal", "tour-modal", "academy-modal"].forEach(function(id) {
                var m = document.getElementById(id);
                if (m && !m.classList.contains("hidden")) {
                    m.classList.add("hidden");
                    m.classList.remove("flex");
                    document.body.style.overflow = "";
                }
            });
        }
    });

    // 2. Mobile Services Accordion Toggle
    var servicesBtn = document.getElementById("mobile-services-accordion-btn");
    var servicesList = document.getElementById("mobile-services-list");
    var servicesArrow = document.getElementById("mobile-services-arrow");

    if (servicesBtn && servicesList) {
        servicesBtn.addEventListener("click", function(e) {
            e.preventDefault();
            var isHidden = servicesList.classList.contains("hidden");
            if (isHidden) {
                servicesList.classList.remove("hidden");
                if (servicesArrow) servicesArrow.style.transform = "rotate(180deg)";
            } else {
                servicesList.classList.add("hidden");
                if (servicesArrow) servicesArrow.style.transform = "rotate(0deg)";
            }
        });
    }

    // 3. Dark Mode Toggle
    var themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
        themeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            var current = document.documentElement.getAttribute("data-theme") || "dark";
            var next = current === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", next);
            if (next === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            localStorage.setItem("sedrazavi_theme", next);
        });
    }

    // 4. FAQ Accordion Toggle
    var faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(function(btn) {
        btn.addEventListener("click", function() {
            var answer = this.nextElementSibling;
            var icon = this.querySelector(".faq-icon");
            var isHidden = answer.classList.contains("hidden");

            // Close other FAQs
            document.querySelectorAll(".faq-answer").forEach(function(ans) {
                ans.classList.add("hidden");
            });
            document.querySelectorAll(".faq-icon").forEach(function(ic) {
                ic.textContent = "+";
            });

            if (isHidden) {
                answer.classList.remove("hidden");
                if (icon) icon.textContent = "−";
            }
        });
    });

    // 5. Services Filter Buttons
    var filterBtns = document.querySelectorAll(".service-filter-btn");
    var serviceCards = document.querySelectorAll(".service-card");
    filterBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            filterBtns.forEach(function(b) { b.classList.remove("active"); });
            this.classList.add("active");
            var cat = this.getAttribute("data-filter");
            serviceCards.forEach(function(card) {
                if (cat === "all" || card.getAttribute("data-category") === cat) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 6. Navigation links for modals
    document.querySelectorAll('a[href="#survey"]').forEach(function(a) {
        a.addEventListener("click", function(e) { e.preventDefault(); openSurveyModal(); });
    });
    document.querySelectorAll('a[href="#guide"]').forEach(function(a) {
        a.addEventListener("click", function(e) { e.preventDefault(); openTourModal(); });
    });
    document.querySelectorAll('a[href="#academy"]').forEach(function(a) {
        a.addEventListener("click", function(e) { e.preventDefault(); openAcademyModal(); });
    });
});

function getLocalStoryThumb() {
    var themeUri = (window.SedRazaviThemeConfig && window.SedRazaviThemeConfig.themeUri)
        || (window.SedRazaviReactConfig && window.SedRazaviReactConfig.site && window.SedRazaviReactConfig.site.url && (window.SedRazaviReactConfig.site.url + '/wp-content/themes/sedrazavi-theme'))
        || '';
    return themeUri ? (themeUri + '/screenshot.png') : 'screenshot.png';
}

// Story Modal Data
var storiesData = [
    {
        title: "نکات چک صیادی",
        category: "نکات کاربردی",
        img: "",
        slideTitle: "قوانین طلایی صدور و پیگیری چک‌های صیادی بنفش",
        slideDesc: "مطابق ماده ۲۳ قانون اصلاح قانون صدور چک، در صورت برگشت چک صیادی، موکل بدون نیاز به تقدیم دادخواست ماهوی و پرداخت هزینه سنگین دادرسی، می‌تواند مستقیماً از دادگاه تقاضای صدور اجراییه نماید."
    },
    {
        title: "پیروزی در پرونده برج الهیه",
        category: "موفقیت‌های اخیر",
        img: "",
        slideTitle: "ابطال سند معارض برج مسکونی الهیه به ارزش ۲۴۰ میلیارد ریال",
        slideDesc: "با استناد به اسناد رسمی اولیه و اثبات جعل مادی و معنوی در کمیسیون تخصصی ثبتی، رای قطعی شعبه ۱۲ دادگاه تجدیدنظر استان تهران به نفع موکل صادر و سند رسمی معارض ابطال گردید."
    },
    {
        title: "طلاق و مهریه",
        category: "حقوق خانواده",
        img: "",
        slideTitle: "رسیدگی تخصصی به طلاق توافقی و توقیف مهریه",
        slideDesc: "تنظیم توافق‌نامه رسمی جامع در خصوص حضانت، نفقه، جهیزیه و مهریه با حفظ کامل حرمت طرفین و صدور گواهی عدم امکان سازش در کوتاه‌ترین زمان ممکن قانونی."
    },
    {
        title: "سهم‌الارث مادر",
        category: "انحصار وراثت",
        img: "",
        slideTitle: "نحوه محاسبه سهم‌الارث زوجه از عرصه و اعیان",
        slideDesc: "طبق ماده ۹۴۶ قانون مدنی اصلاحی، زوجه از قیمت عرصه و نیز از اعیان ارث می‌برد. دفتر وکالت ما کلیه مراحل تحریر ترکه و تقسیم عادلانه را مدیریت می‌نماید."
    },
    {
        title: "قرارداد مشارکت در ساخت",
        category: "تجاری",
        img: "",
        slideTitle: "۵ شرط نجات‌بخش در قرارداد مشارکت با سازنده",
        slideDesc: "پیش‌بینی وجه التزام روزانه تاخیر، سلب حق پیش‌فروش تا سقف مشخص ساخت، و تعیین داور مرضی‌الطرفین تخصصی، مانع از قفل شدن سرمایه مالکین عرصه می‌شود."
    }
];

function openStoryModal(index) {
    var story = storiesData[index] || storiesData[0];
    document.getElementById("story-modal-title").textContent = story.title;
    document.getElementById("story-modal-cat").textContent = story.category;
    var modalImg = document.getElementById("story-modal-img");
    if (modalImg) {
        modalImg.src = story.img || getLocalStoryThumb();
    }
    document.getElementById("story-slide-title").textContent = story.slideTitle;
    document.getElementById("story-slide-desc").textContent = story.slideDesc;

    var modal = document.getElementById("story-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
}

function closeStoryModal() {
    var modal = document.getElementById("story-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
}

// Testimonials Data
var testimonialsData = [
    {
        quote: "«تسلط علمی سرکار خانم دکتر رضوی بر قوانین ثبتی و املاک موجب شد ملکی به ارزش بیش از ۴۰۰ میلیارد ریال که با معارض جعلی مواجه شده بود، در دیوان عالی کشور کاملاً احقاق حق و سند معارض باطل گردد. رازداری و نظم بی‌نظیر ایشان ستودنی است.»",
        author: "مهندس علیرضا سلیمانی",
        role: "مدیرعامل گروه سرمایه‌گذاری پارس نوین",
        service: "دعاوی ملکی و تجاری"
    },
    {
        quote: "«در پرونده اختلاف بین‌المللی با شریک خارجی در دبی، سرعت عمل و تسلط ایشان به قواعد داوری اتاق بازرگانی بین‌المللی (ICC) مانع از زیان چند میلیون درهمی شرکت ما شد. ایشان واقعاً وکیلی کم‌نظیر هستند.»",
        author: "دکتر حمیدرضا شمس",
        role: "رئیس هیئت مدیره شرکت بازرگانی کیمیا اروند",
        service: "داوری بین‌المللی"
    },
    {
        quote: "«در جریان یک پرونده بسیار پیچیده خانوادگی و تقسیم ترکه چندصد میلیاردی، صبر، درایت و تدوین لوایح بی‌نقص دکتر رضوی باعث شد بدون کوچکترین تنش و در آرامش کامل، حقوق قانونی به تمامی وراث مسترد گردد.»",
        author: "سرکار خانم مهندس تابش",
        role: "موکل پرونده انحصار وراثت و تقسیم ترکه",
        service: "حقوق خانواده و ارث"
    }
];
var testimonialIdx = 0;

function nextTestimonial() {
    testimonialIdx = (testimonialIdx + 1) % testimonialsData.length;
    renderTestimonial();
}

function prevTestimonial() {
    testimonialIdx = (testimonialIdx - 1 + testimonialsData.length) % testimonialsData.length;
    renderTestimonial();
}

function renderTestimonial() {
    var item = testimonialsData[testimonialIdx];
    document.getElementById("testimonial-quote").textContent = item.quote;
    document.getElementById("testimonial-author").textContent = item.author;
    document.getElementById("testimonial-role").textContent = item.role;
    document.getElementById("testimonial-service").textContent = item.service;
}

function showThemeInlineFeedback(anchorEl, msg, isError) {
    if (!anchorEl) return;
    var parent = anchorEl.parentNode || anchorEl;
    var fb = parent.querySelector(".sr-inline-theme-feedback");
    if (!fb) {
        fb = document.createElement("div");
        fb.className = "sr-inline-theme-feedback";
        fb.setAttribute("role", "status");
        fb.setAttribute("aria-live", "polite");
        fb.style.cssText = "margin-top:12px;padding:10px 14px;border-radius:10px;font-size:13px;font-weight:600;line-height:1.6;";
        parent.appendChild(fb);
    }
    fb.style.background = isError ? "rgba(239,68,68,0.12)" : "rgba(16,185,129,0.12)";
    fb.style.border = isError ? "1px solid #ef4444" : "1px solid #10b981";
    fb.style.color = isError ? "#f87171" : "#34d399";
    fb.textContent = msg;
}

function getThemeRestConfig() {
    var cfg = window.SedRazaviThemeConfig || window.sedrazavi_ajax_obj || {};
    var restUrl = cfg.restUrl || cfg.rest_url || '/wp-json/sedrazavi/v1/';
    if (restUrl && restUrl.slice(-1) !== '/') restUrl += '/';
    return {
        restUrl: restUrl,
        restNonce: cfg.restNonce || cfg.rest_nonce || ''
    };
}

// Case Search (Real REST Endpoint - requires both case_number & client_phone)
function searchCaseStatus() {
    var inputEl = document.getElementById("case-search-input");
    var phoneEl = document.getElementById("case-search-phone");
    var caseNumber = inputEl ? inputEl.value.trim() : "";
    var clientPhone = phoneEl ? phoneEl.value.trim() : "";
    var display = document.getElementById("case-result-display");

    if (!caseNumber || !clientPhone) {
        if (display) display.classList.add("hidden");
        showThemeInlineFeedback(inputEl, "برای رعایت محرمانگی، وارد کردن شماره پرونده و شماره همراه ثبت‌شده موکل الزامی است.", true);
        return;
    }

    var cfg = getThemeRestConfig();
    showThemeInlineFeedback(inputEl, "در حال استعلام برخط وضعیت پرونده از سامانه...", false);

    fetch(cfg.restUrl + "track-case", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": cfg.restNonce
        },
        body: JSON.stringify({ case_number: caseNumber, client_phone: clientPhone })
    })
    .then(function(r) { return r.json().then(function(d) { return { ok: r.ok, data: d }; }); })
    .then(function(res) {
        if (res.ok && res.data && res.data.found) {
            if (display) display.classList.remove("hidden");
            var titleEl = document.getElementById("res-case-title");
            var statusEl = document.getElementById("res-case-status");
            var descEl = document.getElementById("res-case-desc");
            var branchEl = document.getElementById("res-case-branch");
            var dateEl = document.getElementById("res-case-date");
            if (titleEl) titleEl.textContent = "پرونده کلاسه " + (res.data.case_number || caseNumber) + " — " + (res.data.case_type || "پرونده حقوقی");
            if (statusEl) statusEl.textContent = res.data.status || "در جریان رسیدگی";
            if (descEl) descEl.textContent = "موعد یا وضعیت بعدی: " + (res.data.next_session || "ثبت نشده");
            if (branchEl) branchEl.textContent = res.data.court_branch || "";
            if (dateEl) dateEl.textContent = res.data.updated_at ? ("بروزرسانی: " + res.data.updated_at) : "";
            showThemeInlineFeedback(inputEl, "اطلاعات پرونده با موفقیت بازیابی شد.", false);
        } else {
            if (display) display.classList.add("hidden");
            showThemeInlineFeedback(inputEl, (res.data && res.data.message) ? res.data.message : "پرونده‌ای با این کلاسه و شماره تماس یافت نشد.", true);
        }
    })
    .catch(function() {
        if (display) display.classList.add("hidden");
        showThemeInlineFeedback(inputEl, "خطا در برقراری ارتباط با سرور استعلام پرونده.", true);
    });
}

// Booking Form Submit (Real REST Persistence)
function handleBookingSubmit(e) {
    e.preventDefault();
    var form = document.getElementById("booking-form-main") || e.target;
    var name = (document.getElementById("book-name") || {}).value || "";
    var phone = (document.getElementById("book-phone") || {}).value || "";
    var service = (document.getElementById("book-service") || {}).value || "مشاوره حقوقی";
    var mode = (document.getElementById("book-mode") || {}).value || "";
    var notesRaw = (document.getElementById("book-notes") || {}).value || "";
    var notes = mode ? ("[نحوه جلسه: " + mode + "] " + notesRaw) : notesRaw;

    if (!name.trim() || !phone.trim()) {
        showThemeInlineFeedback(form, "لطفاً نام موکل و شماره همراه معتبر را وارد فرمایید.", true);
        return;
    }

    var cfg = getThemeRestConfig();
    var btn = form ? form.querySelector('button[type="submit"]') : null;
    if (btn) btn.disabled = true;
    showThemeInlineFeedback(form, "در حال ثبت نوبت مشاوره در سامانه...", false);

    fetch(cfg.restUrl + "book-appointment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": cfg.restNonce
        },
        body: JSON.stringify({
            client_name: name.trim(),
            client_phone: phone.trim(),
            service_type: service,
            notes: notes.trim()
        })
    })
    .then(function(r) { return r.json().then(function(d) { return { ok: r.ok, data: d }; }); })
    .then(function(res) {
        if (btn) btn.disabled = false;
        if (res.ok && res.data && res.data.success) {
            var idLabel = res.data.booking_id ? (" (کد نوبت: #" + res.data.booking_id + ")") : "";
            showThemeInlineFeedback(form, (res.data.message || "نوبت مشاوره با موفقیت ثبت شد.") + idLabel, false);
            if (form) form.reset();
        } else {
            showThemeInlineFeedback(form, (res.data && res.data.message) ? res.data.message : "خطا در ثبت نوبت مشاوره.", true);
        }
    })
    .catch(function() {
        if (btn) btn.disabled = false;
        showThemeInlineFeedback(form, "خطا در برقراری ارتباط با سرور رزرو نوبت.", true);
    });
}

// Modals Controls
function openSurveyModal() {
    var m = document.getElementById("survey-modal");
    if (!m) return;
    m.classList.remove("hidden");
    m.classList.add("flex");
}
function closeSurveyModal() {
    var m = document.getElementById("survey-modal");
    if (!m) return;
    m.classList.add("hidden");
    m.classList.remove("flex");
}
function selectSurveyRating(rating) {
    var box = document.getElementById("survey-stars");
    if (!box) return;
    box.setAttribute("data-rating", String(rating));
    box.querySelectorAll(".sr-survey-star").forEach(function(btn) {
        var val = parseInt(btn.getAttribute("data-val") || "0", 10);
        btn.style.opacity = val <= rating ? "1" : "0.35";
    });
}
function submitSurvey() {
    var modal = document.getElementById("survey-modal");
    var starsEl = document.getElementById("survey-stars");
    var commentEl = document.getElementById("survey-comment") || (modal ? modal.querySelector("textarea") : null);
    var submitBtn = document.getElementById("survey-submit-btn");
    var anchor = modal ? (modal.querySelector("#survey-submit-btn") || modal.firstElementChild) : document.body;

    var rating = starsEl ? parseInt(starsEl.getAttribute("data-rating") || "5", 10) : 5;
    var comment = commentEl ? commentEl.value.trim() : "";
    var cfg = getThemeRestConfig();

    if (submitBtn) submitBtn.disabled = true;
    showThemeInlineFeedback(anchor, "در حال ثبت بازخورد...", false);

    fetch(cfg.restUrl + "survey/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": cfg.restNonce
        },
        body: JSON.stringify({ rating: rating, comment: comment })
    })
    .then(function(r) { return r.json().then(function(d) { return { ok: r.ok, data: d }; }); })
    .then(function(res) {
        if (submitBtn) submitBtn.disabled = false;
        if (res.ok && res.data && res.data.success) {
            showThemeInlineFeedback(anchor, res.data.message || "بازخورد شما ثبت گردید.", false);
            if (commentEl) commentEl.value = "";
            setTimeout(closeSurveyModal, 1100);
        } else {
            showThemeInlineFeedback(anchor, (res.data && res.data.message) ? res.data.message : "خطا در ثبت بازخورد.", true);
        }
    })
    .catch(function() {
        if (submitBtn) submitBtn.disabled = false;
        showThemeInlineFeedback(anchor, "عدم برقراری ارتباط با سرور.", true);
    });
}

function openTourModal() {
    var m = document.getElementById("tour-modal");
    if (!m) return;
    m.classList.remove("hidden");
    m.classList.add("flex");
}
function closeTourModal() {
    var m = document.getElementById("tour-modal");
    if (!m) return;
    m.classList.add("hidden");
    m.classList.remove("flex");
}

function openAcademyModal() {
    var m = document.getElementById("academy-modal");
    if (!m) return;
    m.classList.remove("hidden");
    m.classList.add("flex");
}
function closeAcademyModal() {
    var m = document.getElementById("academy-modal");
    if (!m) return;
    m.classList.add("hidden");
    m.classList.remove("flex");
}

function acceptCookies() {
    var el = document.getElementById("cookie-banner");
    if (el) el.style.display = "none";
    localStorage.setItem("sedrazavi_cookie_consent", "accepted");
}
function dismissCookies() {
    var el = document.getElementById("cookie-banner");
    if (el) el.style.display = "none";
}

function handleNewsletter(e) {
    if (e && e.preventDefault) e.preventDefault();
    var form = (e && e.target) ? e.target : document.getElementById("sr-footer-newsletter-form");
    if (!form) return false;
    var emailInput = form.querySelector('input[type="email"]');
    var email = emailInput ? emailInput.value.trim() : "";
    if (!email) {
        showThemeInlineFeedback(form, "لطفاً نشانی ایمیل معتبر وارد کنید.", true);
        return false;
    }

    var cfg = getThemeRestConfig();
    var btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    showThemeInlineFeedback(form, "در حال ثبت اشتراک خبرنامه...", false);

    fetch(cfg.restUrl + "newsletter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-WP-Nonce": cfg.restNonce
        },
        body: JSON.stringify({ email: email })
    })
    .then(function(r) { return r.json().then(function(d) { return { ok: r.ok, data: d }; }); })
    .then(function(res) {
        if (btn) btn.disabled = false;
        if (res.ok && res.data && res.data.success) {
            showThemeInlineFeedback(form, res.data.message || "عضویت در خبرنامه با موفقیت انجام شد.", false);
            form.reset();
        } else {
            showThemeInlineFeedback(form, (res.data && res.data.message) ? res.data.message : "خطا در ثبت ایمیل در خبرنامه.", true);
        }
    })
    .catch(function() {
        if (btn) btn.disabled = false;
        showThemeInlineFeedback(form, "خطا در ارتباط با سرور خبرنامه.", true);
    });
    return false;
}
