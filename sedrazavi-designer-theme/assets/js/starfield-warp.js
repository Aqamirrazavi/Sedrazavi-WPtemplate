/**
 * SedRazavi Studio - Pure Galactic Interstellar Starfield Warp Drive (Addenda 29.0 & 30.0)
 *
 * Physics-based pure cosmic background engine:
 * - 100% full-bleed pure deep space (zero cockpit / window frames / HUD obstructions).
 * - Idle cruising velocity (V_base = 1.2 px/frame).
 * - Scroll impulse acceleration: V(t) = min(V_base + |ΔY| * 0.22, 18.0).
 * - Exponential damping inertia deceleration: λ = 0.92 on scroll stop.
 * - Dynamic light streak tails based on velocity.
 * - Respects prefers-reduced-motion and pauses on Page Visibility hidden.
 *
 * @package SedRazavi_Designer_Theme
 * @version 2.0.0
 */

(function () {
    'use strict';

    // Accessibility check: exit if reduced motion is requested
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const canvas = document.getElementById('sr-starfield-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Configuration & Physics Constants
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const starCount = isMobile ? 110 : (isTablet ? 220 : 450);

    const physics = {
        baseSpeed: 1.2,
        maxSpeed: 18.0,
        accelFactor: 0.22,
        damping: 0.92,
        streakRatio: 1.8,
        minStreak: 1.5,
        maxStreak: 35.0,
    };

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let cx = width / 2;
    let cy = height / 2;

    let currentSpeed = physics.baseSpeed;
    let targetSpeed = physics.baseSpeed;
    let lastScrollY = window.scrollY;
    let isPaused = false;

    // Focal point steering
    let focalOffsetX = 0;
    let focalOffsetY = 0;
    let targetFocalX = 0;
    let targetFocalY = 0;

    // Star data structure
    const stars = [];
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: (Math.random() - 0.5) * width * 2,
            y: (Math.random() - 0.5) * height * 2,
            z: Math.random() * width,
            pz: 0,
            baseAlpha: 0.4 + Math.random() * 0.6,
            twinkleFreq: 0.02 + Math.random() * 0.04,
            twinklePhase: Math.random() * Math.PI * 2,
        });
    }

    function onResize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        cx = width / 2;
        cy = height / 2;
    }

    // Scroll impulse acceleration (both scroll down and scroll up)
    function onScroll() {
        const currentY = window.scrollY;
        const delta = Math.abs(currentY - lastScrollY);
        lastScrollY = currentY;

        // Impulse injection formula: V_target = min(V_base + |ΔY| * 0.22, 18.0)
        targetSpeed = Math.min(physics.baseSpeed + delta * physics.accelFactor, physics.maxSpeed);
    }

    // Gentle mouse parallax steering for cosmic depth (desktop only)
    function onMouseMove(e) {
        if (isMobile) return;
        const normX = (e.clientX / width) - 0.5;
        const normY = (e.clientY / height) - 0.5;
        targetFocalX = normX * 40;
        targetFocalY = normY * 30;
    }

    // Gyroscope tilt support for mobile
    function onDeviceOrientation(e) {
        if (!e.gamma || !e.beta) return;
        targetFocalX = (e.gamma / 45) * 25;
        targetFocalY = (e.beta / 90) * 20;
    }

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    }

    // Page visibility optimization: pause RAF when tab is hidden to save battery
    document.addEventListener('visibilitychange', () => {
        isPaused = document.hidden;
        if (!isPaused) {
            lastScrollY = window.scrollY;
            requestAnimationFrame(render);
        }
    });

    let time = 0;

    function render() {
        if (isPaused) return;

        time += 0.05;

        // Exponential damping inertia deceleration: V_warp(t+1) = V_warp(t) * λ
        currentSpeed += (targetSpeed - currentSpeed) * 0.12;
        targetSpeed = physics.baseSpeed + (targetSpeed - physics.baseSpeed) * physics.damping;

        // Smooth focal point interpolation
        focalOffsetX += (targetFocalX - focalOffsetX) * 0.05;
        focalOffsetY += (targetFocalY - focalOffsetY) * 0.05;

        const effectiveCx = cx + focalOffsetX;
        const effectiveCy = cy + focalOffsetY;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Check active theme color mode
        const isLightMode = document.documentElement.getAttribute('data-theme') === 'light' ||
                            document.body.classList.contains('light-mode');

        const starColor = isLightMode ? '45, 55, 72' : '255, 255, 255';

        for (let i = 0; i < starCount; i++) {
            const star = stars[i];
            star.pz = star.z;
            star.z -= currentSpeed;

            // Recycle star when it passes the camera viewpoint (Z <= 0)
            if (star.z <= 0) {
                star.z = width;
                star.pz = star.z;
                star.x = (Math.random() - 0.5) * width * 2;
                star.y = (Math.random() - 0.5) * height * 2;
            }

            // 3D Perspective Projection to 2D screen coordinates
            const k = 128 / star.z;
            const px = star.x * k + effectiveCx;
            const py = star.y * k + effectiveCy;

            // Previous 2D coordinate for streak tail
            const pk = 128 / star.pz;
            const ppx = star.x * pk + effectiveCx;
            const ppy = star.y * pk + effectiveCy;

            // Draw if within viewport
            if (px >= 0 && px <= width && py >= 0 && py <= height) {
                const depthFactor = Math.max(0.05, 1 - star.z / width);
                const twinkle = 0.8 + 0.2 * Math.sin(time * star.twinkleFreq + star.twinklePhase);
                const alpha = Math.min(1, depthFactor * star.baseAlpha * twinkle);
                const thickness = Math.max(0.6, depthFactor * 2.2);

                ctx.strokeStyle = `rgba(${starColor}, ${alpha.toFixed(2)})`;
                ctx.lineWidth = thickness;
                ctx.beginPath();
                ctx.moveTo(ppx, ppy);
                ctx.lineTo(px, py);
                ctx.stroke();
            }
        }

        requestAnimationFrame(render);
    }

    // Start interstellar cruise
    requestAnimationFrame(render);
})();
