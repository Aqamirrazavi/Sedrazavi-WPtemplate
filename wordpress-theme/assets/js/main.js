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
        mobileBtn.addEventListener("click", function() {
            mobileDrawer.classList.add("is-active");
            document.body.style.overflow = "hidden";
        });
    }
    if (closeBtn && mobileDrawer) {
        closeBtn.addEventListener("click", function() {
            mobileDrawer.classList.remove("is-active");
            document.body.style.overflow = "";
        });
    }
    if (backdrop && mobileDrawer) {
        backdrop.addEventListener("click", function() {
            mobileDrawer.classList.remove("is-active");
            document.body.style.overflow = "";
        });
    }

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

// Story Modal Data
var storiesData = [
    {
        title: "نکات چک صیادی",
        category: "نکات کاربردی",
        img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
        slideTitle: "قوانین طلایی صدور و پیگیری چک‌های صیادی بنفش",
        slideDesc: "مطابق ماده ۲۳ قانون اصلاح قانون صدور چک، در صورت برگشت چک صیادی، موکل بدون نیاز به تقدیم دادخواست ماهوی و پرداخت هزینه سنگین دادرسی، می‌تواند مستقیماً از دادگاه تقاضای صدور اجراییه نماید."
    },
    {
        title: "پیروزی در پرونده برج الهیه",
        category: "موفقیت‌های اخیر",
        img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
        slideTitle: "ابطال سند معارض برج مسکونی الهیه به ارزش ۲۴۰ میلیارد ریال",
        slideDesc: "با استناد به اسناد رسمی اولیه و اثبات جعل مادی و معنوی در کمیسیون تخصصی ثبتی، رای قطعی شعبه ۱۲ دادگاه تجدیدنظر استان تهران به نفع موکل صادر و سند رسمی معارض ابطال گردید."
    },
    {
        title: "طلاق و مهریه",
        category: "حقوق خانواده",
        img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
        slideTitle: "رسیدگی تخصصی به طلاق توافقی و توقیف مهریه",
        slideDesc: "تنظیم توافق‌نامه رسمی جامع در خصوص حضانت، نفقه، جهیزیه و مهریه با حفظ کامل حرمت طرفین و صدور گواهی عدم امکان سازش در کوتاه‌ترین زمان ممکن قانونی."
    },
    {
        title: "سهم‌الارث مادر",
        category: "انحصار وراثت",
        img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
        slideTitle: "نحوه محاسبه سهم‌الارث زوجه از عرصه و اعیان",
        slideDesc: "طبق ماده ۹۴۶ قانون مدنی اصلاحی، زوجه از قیمت عرصه و نیز از اعیان ارث می‌برد. دفتر وکالت ما کلیه مراحل تحریر ترکه و تقسیم عادلانه را مدیریت می‌نماید."
    },
    {
        title: "قرارداد مشارکت در ساخت",
        category: "تجاری",
        img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
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
        modalImg.onerror = function() {
            var themeUri = (window.SedRazaviReactConfig && window.SedRazaviReactConfig.site && window.SedRazaviReactConfig.site.url) 
                ? window.SedRazaviReactConfig.site.url + '/wp-content/themes/sedrazavi-theme/screenshot.png' 
                : 'screenshot.png';
            this.src = themeUri;
        };
        modalImg.src = story.img;
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

// Case Search Mock
function searchCaseStatus() {
    var input = document.getElementById("case-search-input").value.trim();
    var display = document.getElementById("case-result-display");
    if (!input) {
        alert("لطفاً شماره پرونده یا شماره همراه خود را وارد فرمایید.");
        return;
    }

    display.classList.remove("hidden");
    document.getElementById("res-case-title").textContent = "پرونده کلاسه " + input + " - دعوی ابطال سند و مطالبه خسارت";
    document.getElementById("res-case-status").textContent = "در حال رسیدگی در دادگاه تجدیدنظر";
    document.getElementById("res-case-desc").textContent = "لایحه دفاعیه تکمیلی توسط وکیل سرپرست در تاریخ جاری در سامانه عدل‌ایران ثبت گردید. وقت رسیدگی نظارت دادگاه تعیین شده است.";
    document.getElementById("res-case-branch").textContent = "شعبه ۱۸ دادگاه تجدیدنظر استان تهران";
    document.getElementById("res-case-date").textContent = "آخرین بروزرسانی: امروز ساعت ۱۱:۴۵";
}

// Booking Form Submit
function handleBookingSubmit(e) {
    e.preventDefault();
    var name = document.getElementById("book-name").value;
    var phone = document.getElementById("book-phone").value;
    alert("درخواست نوبت مشاوره برای «" + name + "» با موفقیت ثبت گردید. پیامک تایید نوبت به شماره " + phone + " ارسال خواهد شد.");
    document.getElementById("booking-form-main").reset();
}

// Modals Controls
function openSurveyModal() {
    document.getElementById("survey-modal").classList.remove("hidden");
    document.getElementById("survey-modal").classList.add("flex");
}
function closeSurveyModal() {
    document.getElementById("survey-modal").classList.add("hidden");
    document.getElementById("survey-modal").classList.remove("flex");
}
function submitSurvey() {
    alert("سپاسگزاریم! دیدگاه شما با موفقیت ثبت گردید.");
    closeSurveyModal();
}

function openTourModal() {
    document.getElementById("tour-modal").classList.remove("hidden");
    document.getElementById("tour-modal").classList.add("flex");
}
function closeTourModal() {
    document.getElementById("tour-modal").classList.add("hidden");
    document.getElementById("tour-modal").classList.remove("flex");
}

function openAcademyModal() {
    document.getElementById("academy-modal").classList.remove("hidden");
    document.getElementById("academy-modal").classList.add("flex");
}
function closeAcademyModal() {
    document.getElementById("academy-modal").classList.add("hidden");
    document.getElementById("academy-modal").classList.remove("flex");
}

function acceptCookies() {
    document.getElementById("cookie-banner").style.display = "none";
    localStorage.setItem("sedrazavi_cookie_consent", "accepted");
}
function dismissCookies() {
    document.getElementById("cookie-banner").style.display = "none";
}

function handleNewsletter(e) {
    e.preventDefault();
    alert("ایمیل شما در خبرنامه تخصصی دفتر وکالت دکتر رضوی با موفقیت ثبت گردید.");
    e.target.reset();
}
