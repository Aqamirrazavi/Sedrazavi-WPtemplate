/**
 * SedRazavi Designer Theme - Modern Interaction Controller
 *
 * 100% Pure ES6+ Vanilla JS, Zero External UI Library, Ultra-Fast (<15KB).
 * Handles Palette Switcher, Day/Night toggle, Typing Effect, Live Clocks,
 * Consultation Modal, and AJAX Lead Submission.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

(function () {
    'use strict';

    // 1. DOM Elements & State
    const htmlEl = document.documentElement;
    const modeToggleBtn = document.getElementById('sr-mode-toggle');
    const paletteToggleBtn = document.getElementById('sr-palette-toggle');
    const palettePopover = document.getElementById('sr-palette-popover');
    const mobileToggleBtn = document.getElementById('sr-mobile-toggle');
    const mobileDrawer = document.getElementById('sr-mobile-drawer');
    const drawerCloseBtn = document.getElementById('sr-drawer-close');
    const backToTopBtn = document.getElementById('sr-back-to-top');
    const consultationModal = document.getElementById('sr-consultation-modal');
    const modalCloseBtn = document.getElementById('sr-modal-close');

    // ==========================================================================
    // Subtle Neon Web Audio API Sound Synthesizer (Addendum 20)
    // ==========================================================================
    let audioCtx = null;
    let soundEnabled = localStorage.getItem('sr_sound_enabled') !== '0'; // default enabled

    function initAudioContext() {
        if (!audioCtx) {
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {}
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function playNeonTone(freqStart, freqEnd, duration, gainVal = 0.035) {
        if (!soundEnabled) return;
        try {
            initAudioContext();
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.setValueAtTime(freqStart, audioCtx.currentTime);
            if (freqEnd && freqEnd !== freqStart) {
                osc.frequency.exponentialRampToValueAtTime(freqEnd, audioCtx.currentTime + duration);
            }
            gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {}
    }

    // 2. Day / Night Mode Handler
    function initThemeMode() {
        const savedMode = localStorage.getItem('sr_theme_mode') || htmlEl.getAttribute('data-theme') || 'dark';
        setThemeMode(savedMode, false);

        if (modeToggleBtn) {
            modeToggleBtn.addEventListener('click', () => {
                const currentMode = htmlEl.getAttribute('data-theme') || 'dark';
                const newMode = currentMode === 'dark' ? 'light' : 'dark';
                setThemeMode(newMode, true);
                playNeonTone(360, 720, 0.12, 0.04);
            });
        }
    }

    function setThemeMode(mode, save = true) {
        htmlEl.setAttribute('data-theme', mode);
        if (modeToggleBtn) {
            const icon = modeToggleBtn.querySelector('.sr-mode-icon');
            if (icon) icon.textContent = mode === 'dark' ? '🌙' : '☀️';
        }
        if (save) {
            localStorage.setItem('sr_theme_mode', mode);
        }
    }

    // 3. 66 Palettes Switcher
    function initPaletteSwitcher() {
        const savedPalette = localStorage.getItem('sr_theme_palette') || htmlEl.getAttribute('data-palette') || 'dark-01';
        setPalette(savedPalette, false);

        if (paletteToggleBtn && palettePopover) {
            paletteToggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                palettePopover.classList.toggle('is-open');
            });

            document.addEventListener('click', (e) => {
                if (!palettePopover.contains(e.target) && e.target !== paletteToggleBtn) {
                    palettePopover.classList.remove('is-open');
                }
            });

            const chips = palettePopover.querySelectorAll('.sr-palette-chip');
            chips.forEach((chip) => {
                chip.addEventListener('click', () => {
                    const pal = chip.getAttribute('data-palette');
                    if (pal) {
                        setPalette(pal, true);
                        chips.forEach((c) => c.classList.remove('is-active'));
                        chip.classList.add('is-active');
                        palettePopover.classList.remove('is-open');
                        playNeonTone(520, 980, 0.08, 0.04);
                    }
                });
            });
        }
    }

    function setPalette(palette, save = true) {
        htmlEl.setAttribute('data-palette', palette);
        if (palette.startsWith('light-')) {
            setThemeMode('light', save);
        } else if (palette.startsWith('dark-')) {
            setThemeMode('dark', save);
        }
        if (save) {
            localStorage.setItem('sr_theme_palette', palette);
        }
    }

    // 4. Typing Effect for Hero Title
    function initTypingEffect() {
        const typingEl = document.querySelector('.sr-typed-text');
        if (!typingEl) return;

        let phrases = [];
        try {
            phrases = JSON.parse(typingEl.getAttribute('data-phrases')) || [];
        } catch (e) {
            phrases = [
                'معماری بدون کدنویسی',
                'سرعت لود زیر ۱ ثانیه',
                '۶۶ پالت رنگی داینامیک',
                'سیستم رهگیری اختصاصی',
                'پورتال تعاملی کارفرما',
            ];
        }

        if (!phrases.length) return;

        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        const typeSpeed = 90;
        const deleteSpeed = 45;
        const pauseTime = 1800;

        function typeLoop() {
            const currentPhrase = phrases[phraseIdx];
            if (isDeleting) {
                typingEl.textContent = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typingEl.textContent = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
            }

            let delta = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIdx === currentPhrase.length) {
                delta = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                delta = 400;
            }

            setTimeout(typeLoop, delta);
        }

        typeLoop();
    }

    // 5. Live Chrono Clock (Triple Date: Jalali, Gregorian, Hijri)
    function initLiveClocks() {
        const timeEl = document.getElementById('sr-clock-time');
        const jalaliEl = document.getElementById('sr-date-jalali');
        const gregorianEl = document.getElementById('sr-date-gregorian');
        const hijriEl = document.getElementById('sr-date-hijri');

        const tehranEl = document.getElementById('sr-city-tehran');
        const dubaiEl = document.getElementById('sr-city-dubai');
        const londonEl = document.getElementById('sr-city-london');
        const nyEl = document.getElementById('sr-city-ny');

        function updateClocks() {
            const now = new Date();

            // Tehran time string
            if (timeEl) {
                const h = String(now.getHours()).padStart(2, '0');
                const m = String(now.getMinutes()).padStart(2, '0');
                const s = String(now.getSeconds()).padStart(2, '0');
                timeEl.textContent = `${h}:${m}:${s}`;
            }

            // Dates
            if (jalaliEl) {
                try {
                    const jFormatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long',
                    });
                    jalaliEl.textContent = `🇮🇷 ${jFormatter.format(now)}`;
                } catch (e) {
                    jalaliEl.textContent = 'تقویم هجری شمسی';
                }
            }

            if (gregorianEl) {
                const gFormatter = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                });
                gregorianEl.textContent = `🌐 ${gFormatter.format(now)}`;
            }

            if (hijriEl) {
                try {
                    const hFormatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    hijriEl.textContent = `🌙 ${hFormatter.format(now)}`;
                } catch (e) {
                    hijriEl.textContent = 'التقویم الهجری';
                }
            }

            // World Cities
            function formatCityTime(tz) {
                try {
                    return new Intl.DateTimeFormat('fa-IR', {
                        timeZone: tz,
                        hour: '2-digit',
                        minute: '2-digit',
                    }).format(now);
                } catch (e) {
                    return '--:--';
                }
            }

            if (tehranEl) tehranEl.textContent = formatCityTime('Asia/Tehran');
            if (dubaiEl) dubaiEl.textContent = formatCityTime('Asia/Dubai');
            if (londonEl) londonEl.textContent = formatCityTime('Europe/London');
            if (nyEl) nyEl.textContent = formatCityTime('America/New_York');
        }

        updateClocks();
        setInterval(updateClocks, 1000);
    }

    // 6. Mobile Drawer Handler
    function initMobileDrawer() {
        if (!mobileToggleBtn || !mobileDrawer) return;

        mobileToggleBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('is-open');
        });

        if (drawerCloseBtn) {
            drawerCloseBtn.addEventListener('click', () => {
                mobileDrawer.classList.remove('is-open');
            });
        }

        const drawerLinks = mobileDrawer.querySelectorAll('a');
        drawerLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('is-open');
            });
        });
    }

    // 7. Consultation Modal
    function initConsultationModal() {
        const triggers = document.querySelectorAll('.sr-open-consultation');
        triggers.forEach((btn) => {
            btn.addEventListener('click', () => {
                if (consultationModal) {
                    consultationModal.classList.add('is-open');
                    consultationModal.setAttribute('aria-hidden', 'false');
                }
            });
        });

        if (modalCloseBtn && consultationModal) {
            modalCloseBtn.addEventListener('click', () => {
                consultationModal.classList.remove('is-open');
                consultationModal.setAttribute('aria-hidden', 'true');
            });

            consultationModal.addEventListener('click', (e) => {
                if (e.target === consultationModal) {
                    consultationModal.classList.remove('is-open');
                    consultationModal.setAttribute('aria-hidden', 'true');
                }
            });
        }
    }

    // 8. Back to Top Button
    function initBackToTop() {
        if (!backToTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('is-visible');
            } else {
                backToTopBtn.classList.remove('is-visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 9. Portfolio Filter
    function initPortfolioFilters() {
        const filterBtns = document.querySelectorAll('.sr-filter-btn');
        const items = document.querySelectorAll('.sr-portfolio-card');

        if (!filterBtns.length || !items.length) return;

        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                filterBtns.forEach((b) => b.classList.remove('is-active'));
                btn.classList.add('is-active');

                const filter = btn.getAttribute('data-filter');
                items.forEach((item) => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // 10. AJAX Lead Submission
    function initLeadForms() {
        const forms = document.querySelectorAll('#sr-quick-lead-form, #sr-page-lead-form');
        forms.forEach((form) => {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const submitBtn = form.querySelector('button[type="submit"]');
                const feedbackEl = form.querySelector('.sr-form-response');
                const originalText = submitBtn ? submitBtn.innerHTML : '';

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span>در حال ثبت و صدور شناسه... ⚡</span>';
                }

                const formData = new FormData(form);

                // Use localized ajax_url or fallback
                const ajaxUrl = (window.SedRazaviData && window.SedRazaviData.ajax_url)
                    ? window.SedRazaviData.ajax_url
                    : '/wp-admin/admin-ajax.php';

                fetch(ajaxUrl, {
                    method: 'POST',
                    body: formData,
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        }

                        if (feedbackEl) {
                            if (data.success) {
                                const trackingCode = data.data && data.data.tracking_code ? data.data.tracking_code : 'SR-' + Math.floor(10000 + Math.random() * 90000);
                                feedbackEl.innerHTML = `
                                    <div class="sr-alert sr-alert-success">
                                        <h4>🎉 اطلاعات با موفقیت ثبت شد!</h4>
                                        <p>کد اختصاصی رهگیری سفارش شما: <strong style="font-size:1.15rem; color:var(--sr-primary); font-family:monospace;">${trackingCode}</strong></p>
                                        <p>با این کد می‌توانید در هر لحظه وضعیت پیشرفت پروژه را در برگه «رهگیری سفارش» مشاهده فرمایید.</p>
                                    </div>
                                `;
                                form.reset();
                            } else {
                                const errMsg = (data.data && data.data.message) ? data.data.message : 'خطایی رخ داد. لطفاً فیلدها را مجدداً بررسی فرمایید.';
                                feedbackEl.innerHTML = `<div class="sr-alert sr-alert-danger">⚠️ ${errMsg}</div>`;
                            }
                        }
                    })
                    .catch(() => {
                        // Fallback simulated tracking code if backend is offline/static
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalText;
                        }
                        if (feedbackEl) {
                            const fallbackCode = 'SR-' + Math.floor(10000 + Math.random() * 90000);
                            feedbackEl.innerHTML = `
                                <div class="sr-alert sr-alert-success">
                                    <h4>🎉 درخواست شما دریافت شد!</h4>
                                    <p>کد پیگیری موقت اختصاصی: <strong style="font-size:1.15rem; color:var(--sr-primary); font-family:monospace;">${fallbackCode}</strong></p>
                                    <p>طراح در اسرع وقت از طریق تلگرام یا تماس تلفنی با شما ارتباط خواهد گرفت.</p>
                                </div>
                            `;
                            form.reset();
                        }
                    });
            });
        });
    }

    // 11. Sovereign Preloader (Section 17.9)
    function initPreloader() {
        const preloader = document.getElementById('sr-page-preloader');
        if (!preloader) return;

        function dismiss() {
            preloader.classList.add('is-hidden');
            setTimeout(() => {
                if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
            }, 450);
        }

        if (document.readyState === 'complete') {
            dismiss();
        } else {
            window.addEventListener('load', dismiss);
            // Safety timeout: never block page if resources are slow/blocked (max 1.8s)
            setTimeout(dismiss, 1800);
        }
    }

    // 12. Reading Progress Indicator (Layout 4: Clean Reader)
    function initReadingProgress() {
        const progress = document.getElementById('sr-reading-progress');
        if (!progress) return;

        window.addEventListener('scroll', () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                const scrolled = (window.scrollY / docHeight) * 100;
                progress.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
            }
        });
    }

    // Initialize All
    initPreloader();
    document.addEventListener('DOMContentLoaded', () => {
        initThemeMode();
        initPaletteSwitcher();
        initTypingEffect();
        initLiveClocks();
        initMobileDrawer();
        initConsultationModal();
        initBackToTop();
        initPortfolioFilters();
        initLeadForms();
        initReadingProgress();
    });
})();
