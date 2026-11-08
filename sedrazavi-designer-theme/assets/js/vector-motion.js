/**
 * SedRazavi Designer Theme - 33-Pattern Vector Interactive Motion Engine
 *
 * Implements subtle mouse move parallax, scroll translation, and touch swipe response.
 * Strictly respects prefers-reduced-motion.
 *
 * @package SedRazavi_Designer_Theme
 * @version 1.0.0
 */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const backdrop = document.getElementById('sr-ambient-vector-canvas');
    if (!backdrop) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // 1. Mouse Move Parallax
    window.addEventListener('mousemove', (e) => {
        const normX = (e.clientX / window.innerWidth) - 0.5;
        const normY = (e.clientY / window.innerHeight) - 0.5;
        targetX = normX * 18;
        targetY = normY * 18;
    });

    // 2. Scroll Translation Parallax
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const scrollDelta = (window.scrollY - lastScrollY) * 0.05;
        targetY += scrollDelta;
        lastScrollY = window.scrollY;
    }, { passive: true });

    // 3. Touch Swipe Morph
    let touchStartX = 0;
    window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) touchStartX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const diffX = e.touches[0].clientX - touchStartX;
            targetX = (diffX / window.innerWidth) * 25;
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        // Smoothly settle back toward center on touch release
        targetX *= 0.5;
    }, { passive: true });

    // Render loop (RAF)
    function updateMotion() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        backdrop.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
        requestAnimationFrame(updateMotion);
    }

    requestAnimationFrame(updateMotion);
})();
