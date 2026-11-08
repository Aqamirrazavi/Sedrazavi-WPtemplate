/**
 * SedRazavi Designer Core - Elementor Widgets JS Engine
 *
 * 100% Pure Vanilla ES6+, Zero React, Lightweight (<15KB).
 * Powers Cyber Dino Runner (Canvas + Web Audio), Music Player, and World Globe.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

(function () {
    'use strict';

    // ==========================================================================
    // 1. Cyber Dino Runner Game Engine (Canvas + Web Audio API)
    // ==========================================================================
    function initCyberDinoGames() {
        const games = document.querySelectorAll('.sr-dino-game-wrapper');
        games.forEach((wrapper) => {
            const canvas = wrapper.querySelector('.sr-dino-canvas');
            const overlay = wrapper.querySelector('.sr-dino-overlay');
            const startBtn = wrapper.querySelector('.sr-dino-start-btn');
            const scoreEl = wrapper.querySelector('.sr-score-val');
            const highscoreEl = wrapper.querySelector('.sr-highscore-val');

            if (!canvas) return; // Editor mode placeholder

            const ctx = canvas.getContext('2d');
            const soundEnabled = wrapper.getAttribute('data-sound') === 'yes';
            const dinoColor = wrapper.getAttribute('data-color') || '#00f0ff';

            let audioCtx = null;
            function playBeep(startFreq, endFreq, duration) {
                if (!soundEnabled) return;
                try {
                    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                    if (audioCtx.state === 'suspended') audioCtx.resume();
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + duration);
                    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
                    osc.start();
                    osc.stop(audioCtx.currentTime + duration);
                } catch (e) {}
            }

            // High Score
            let highscore = parseInt(localStorage.getItem('sr_dino_highscore') || '0', 10);
            if (highscoreEl) highscoreEl.textContent = highscore;

            // Game variables
            let width = (canvas.width = wrapper.clientWidth || 500);
            let height = (canvas.height = parseInt(canvas.getAttribute('height') || '220', 10));
            const groundY = height - 28;

            let dino = { x: 35, y: groundY - 32, w: 26, h: 32, vy: 0, isJumping: false };
            const gravity = 0.65;
            const jumpForce = -11;

            let obstacles = [];
            let score = 0;
            let speed = 4.5;
            let isRunning = false;
            let animId = null;

            function resizeCanvas() {
                width = canvas.width = wrapper.clientWidth || 500;
            }
            window.addEventListener('resize', resizeCanvas);

            function jump() {
                if (!isRunning) {
                    startGame();
                    return;
                }
                if (!dino.isJumping) {
                    dino.vy = jumpForce;
                    dino.isJumping = true;
                    playBeep(320, 650, 0.12);
                }
            }

            function startGame() {
                isRunning = true;
                if (overlay) overlay.classList.add('is-hidden');
                dino.y = groundY - 32;
                dino.vy = 0;
                dino.isJumping = false;
                obstacles = [];
                score = 0;
                speed = 4.5;
                if (scoreEl) scoreEl.textContent = '0';
                cancelAnimationFrame(animId);
                gameLoop();
            }

            function gameOver() {
                isRunning = false;
                playBeep(180, 70, 0.25);
                if (score > highscore) {
                    highscore = score;
                    localStorage.setItem('sr_dino_highscore', String(highscore));
                    if (highscoreEl) highscoreEl.textContent = highscore;
                }
                if (overlay) {
                    overlay.classList.remove('is-hidden');
                    if (startBtn) startBtn.innerHTML = '<span>بازی مجدد (Space یا لمس)</span> <span>⚡</span>';
                }
            }

            function gameLoop() {
                if (!isRunning) return;

                // Physics
                dino.vy += gravity;
                dino.y += dino.vy;
                if (dino.y >= groundY - dino.h) {
                    dino.y = groundY - dino.h;
                    dino.vy = 0;
                    dino.isJumping = false;
                }

                // Spawn obstacles
                if (obstacles.length === 0 || width - obstacles[obstacles.length - 1].x > 180 + Math.random() * 220) {
                    obstacles.push({
                        x: width + 20,
                        y: groundY - 28,
                        w: 16,
                        h: 28,
                    });
                }

                // Update obstacles
                for (let i = 0; i < obstacles.length; i++) {
                    obstacles[i].x -= speed;
                }
                obstacles = obstacles.filter((obs) => obs.x + obs.w > -10);

                // Collision detection
                for (let i = 0; i < obstacles.length; i++) {
                    const obs = obstacles[i];
                    if (
                        dino.x + 4 < obs.x + obs.w &&
                        dino.x + dino.w - 4 > obs.x &&
                        dino.y + 4 < obs.y + obs.h &&
                        dino.y + dino.h > obs.y
                    ) {
                        gameOver();
                        return;
                    }
                }

                // Score
                score++;
                if (scoreEl && score % 4 === 0) {
                    scoreEl.textContent = Math.floor(score / 4);
                }
                if (score % 250 === 0 && speed < 9) {
                    speed += 0.4;
                }

                // Draw Frame
                ctx.clearRect(0, 0, width, height);

                // Ground neon line
                ctx.strokeStyle = '#334155';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, groundY);
                ctx.lineTo(width, groundY);
                ctx.stroke();

                // Dino (Pixel character)
                ctx.fillStyle = dinoColor;
                ctx.shadowColor = dinoColor;
                ctx.shadowBlur = 12;
                ctx.fillRect(dino.x, dino.y, dino.w, dino.h);

                // Obstacles (Neon spikes)
                ctx.fillStyle = '#ff007f';
                ctx.shadowColor = '#ff007f';
                ctx.shadowBlur = 10;
                obstacles.forEach((obs) => {
                    ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
                });
                ctx.shadowBlur = 0;

                animId = requestAnimationFrame(gameLoop);
            }

            if (startBtn) startBtn.addEventListener('click', jump);
            canvas.addEventListener('click', jump);
            window.addEventListener('keydown', (e) => {
                if (e.code === 'Space' && wrapper.getBoundingClientRect().top < window.innerHeight && wrapper.getBoundingClientRect().bottom > 0) {
                    e.preventDefault();
                    jump();
                }
            });
        });
    }

    // ==========================================================================
    // 2. Cyberpunk Music Player Controller
    // ==========================================================================
    function initMusicPlayers() {
        const players = document.querySelectorAll('.sr-music-player-card');
        players.forEach((card) => {
            const audio = card.querySelector('.sr-player-audio');
            const playBtn = card.querySelector('.sr-player-play-btn');
            const playIcon = card.querySelector('.sr-play-icon');
            const scrub = card.querySelector('.sr-player-scrub');
            const scrubBar = card.querySelector('.sr-scrub-bar');

            if (!audio || !playBtn) return;

            playBtn.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play().then(() => {
                        card.classList.add('is-playing');
                        if (playIcon) playIcon.textContent = '❚❚';
                    }).catch(() => {});
                } else {
                    audio.pause();
                    card.classList.remove('is-playing');
                    if (playIcon) playIcon.textContent = '▶';
                }
            });

            audio.addEventListener('timeupdate', () => {
                if (audio.duration && scrubBar) {
                    const progress = (audio.currentTime / audio.duration) * 100;
                    scrubBar.style.width = `${progress}%`;
                }
            });

            audio.addEventListener('ended', () => {
                card.classList.remove('is-playing');
                if (playIcon) playIcon.textContent = '▶';
                if (scrubBar) scrubBar.style.width = '0%';
            });

            if (scrub) {
                scrub.addEventListener('click', (e) => {
                    if (audio.duration) {
                        const rect = scrub.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const pct = clickX / rect.width;
                        audio.currentTime = pct * audio.duration;
                    }
                });
            }
        });
    }

    // ==========================================================================
    // 3. World Globe Cities Live Time
    // ==========================================================================
    function initWorldGlobeTimes() {
        const cityRows = document.querySelectorAll('.sr-world-globe-widget .sr-city-row');
        if (!cityRows.length) return;

        function updateCityTimes() {
            const now = new Date();
            cityRows.forEach((row) => {
                const tz = row.getAttribute('data-tz');
                const timeEl = row.querySelector('.sr-city-time');
                if (tz && timeEl) {
                    try {
                        timeEl.textContent = new Intl.DateTimeFormat('fa-IR', {
                            timeZone: tz,
                            hour: '2-digit',
                            minute: '2-digit',
                        }).format(now);
                    } catch (e) {
                        timeEl.textContent = '--:--';
                    }
                }
            });
        }

        updateCityTimes();
        setInterval(updateCityTimes, 1000);
    }

    // ==========================================================================
    // 4. Chrono Triple Clock Widget
    // ==========================================================================
    function initChronoWidgets() {
        const chronoBoxes = document.querySelectorAll('.sr-chrono-widget-box');
        if (!chronoBoxes.length) return;

        function updateChronoWidgets() {
            const now = new Date();
            chronoBoxes.forEach((box) => {
                const digits = box.querySelector('.sr-widget-clock-digits');
                const showSec = box.getAttribute('data-show-sec') === 'yes';

                if (digits) {
                    const h = String(now.getHours()).padStart(2, '0');
                    const m = String(now.getMinutes()).padStart(2, '0');
                    const s = String(now.getSeconds()).padStart(2, '0');
                    digits.textContent = showSec ? `${h}:${m}:${s}` : `${h}:${m}`;
                }

                const jEl = box.querySelector('.sr-jdate');
                if (jEl) {
                    try {
                        const jfmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });
                        jEl.textContent = `🇮🇷 ${jfmt.format(now)}`;
                    } catch (e) {}
                }

                const gEl = box.querySelector('.sr-gdate');
                if (gEl) {
                    const gfmt = new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    });
                    gEl.textContent = `🌐 ${gfmt.format(now)}`;
                }

                const hEl = box.querySelector('.sr-hdate');
                if (hEl) {
                    try {
                        const hfmt = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });
                        hEl.textContent = `🌙 ${hfmt.format(now)}`;
                    } catch (e) {}
                }
            });
        }

        updateChronoWidgets();
        setInterval(updateChronoWidgets, 1000);
    }

    // Bootstrap
    document.addEventListener('DOMContentLoaded', () => {
        initCyberDinoGames();
        initMusicPlayers();
        initWorldGlobeTimes();
        initChronoWidgets();
    });
})();
