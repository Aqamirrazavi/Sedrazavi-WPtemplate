import React, { useId } from 'react';
import { VECTOR_BACKGROUND_PRESETS, VectorBackgroundPreset } from '../data/vectorBackgroundPresets';

interface VectorBackgroundRendererProps {
  presetId?: string;
  opacity?: number;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export const VectorBackgroundRenderer: React.FC<VectorBackgroundRendererProps> = ({
  presetId = 'dynamic-flowing-waves',
  opacity = 0.6,
  speed = 'normal',
  className = '',
}) => {
  const maskId = useId();
  const gradId = useId();

  // Find active preset or default to first
  const preset =
    VECTOR_BACKGROUND_PRESETS.find((p) => p.id === presetId) || VECTOR_BACKGROUND_PRESETS[0];

  // Speed multiplier
  const speedDuration = speed === 'slow' ? '40s' : speed === 'fast' ? '14s' : '24s';

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes sr-wave-flow {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-3%, -2%, 0) scale(1.03); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes sr-contour-drift {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(2%, -3%, 0) rotate(1deg); }
          100% { transform: translate3d(0, 0, 0) rotate(0deg); }
        }
        @keyframes sr-guilloche-rotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes sr-mesh-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.04); }
        }
        @keyframes sr-dash-travel {
          to { stroke-dashoffset: -1200; }
        }
        @keyframes sr-gentle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .sr-anim-wave-flow {
          animation: sr-wave-flow ${speedDuration} ease-in-out infinite;
          transform-origin: center center;
        }
        .sr-anim-contour-drift {
          animation: sr-contour-drift ${speedDuration} ease-in-out infinite;
          transform-origin: center center;
        }
        .sr-anim-guilloche-rotate {
          animation: sr-guilloche-rotate ${speedDuration} linear infinite;
          transform-origin: center center;
        }
        .sr-anim-mesh-pulse {
          animation: sr-mesh-pulse calc(${speedDuration} * 0.4) ease-in-out infinite;
          transform-origin: center center;
        }
        .sr-anim-dash-travel {
          stroke-dasharray: 12 18;
          animation: sr-dash-travel ${speedDuration} linear infinite;
        }
        .sr-anim-gentle-float {
          animation: sr-gentle-float calc(${speedDuration} * 0.5) ease-in-out infinite;
        }
      `}</style>

      {/* Ambient Radial Vignette that adopts active theme colors */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 85% 15%, var(--sr-gold-primary, #D4AF37) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 15% 85%, var(--sr-gold-secondary, #AA820A) 0%, transparent 65%)
          `,
          opacity: 0.07,
        }}
      />

      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Linear Gradient for strokes that directly inherits CSS variable colors */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--sr-gold-primary, #D4AF37)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--sr-gold-secondary, #AA820A)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--sr-gold-primary, #D4AF37)" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id={`${gradId}-soft`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--sr-gold-secondary, #AA820A)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--sr-gold-primary, #D4AF37)" stopOpacity="0.6" />
          </linearGradient>

          <mask id={maskId}>
            <rect width="1440" height="900" fill="url(#mask-grad)" />
            <radialGradient id="mask-grad" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#fff" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0.3" />
            </radialGradient>
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          {renderPresetGeometry(preset, gradId)}
        </g>
      </svg>
    </div>
  );
};

// Render dedicated geometric paths based on the 30 presets
function renderPresetGeometry(preset: VectorBackgroundPreset, gradId: string) {
  const pId = preset.id;

  // 1. Dynamic Flowing Waves
  if (pId === 'dynamic-flowing-waves' || pId === 'aurora-ribbons' || pId === 'vortex-fluid-curves') {
    return (
      <g className="sr-anim-wave-flow">
        {[...Array(14)].map((_, i) => {
          const yOff = 80 + i * 55;
          const cpY1 = yOff - 90 + (i % 2 === 0 ? 50 : -40);
          const cpY2 = yOff + 110 - (i % 3 === 0 ? 60 : 30);
          return (
            <path
              key={i}
              d={`M -100 ${yOff} C 320 ${cpY1}, 880 ${cpY2}, 1540 ${yOff + 40}`}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={i % 3 === 0 ? 1.8 : 1}
              strokeOpacity={0.18 + (i % 5) * 0.08}
            />
          );
        })}
        {/* Counter waves */}
        {[...Array(8)].map((_, i) => {
          const yOff = 200 + i * 75;
          return (
            <path
              key={`c-${i}`}
              d={`M -50 ${yOff} C 450 ${yOff + 160}, 950 ${yOff - 120}, 1500 ${yOff + 80}`}
              fill="none"
              stroke="var(--sr-gold-primary, #D4AF37)"
              strokeWidth={1.2}
              strokeOpacity={0.15 + (i % 4) * 0.06}
            />
          );
        })}
      </g>
    );
  }

  // 2. Topographic Elevation Contours / 3D Stacked Terrain
  if (pId === 'topographic-elevation-contours' || pId === 'abstract-topography-3d' || pId === 'fluid-contour-blobs') {
    return (
      <g className="sr-anim-contour-drift">
        {[...Array(16)].map((_, i) => {
          const rX = 220 + i * 65;
          const rY = 140 + i * 45;
          return (
            <path
              key={i}
              d={`M ${1150 - rX} 350 C ${1150 - rX * 0.8} ${350 - rY * 0.9}, ${1150 + rX * 0.9} ${350 - rY * 1.2}, ${1150 + rX} 350 C ${1150 + rX * 1.1} ${350 + rY * 0.9}, ${1150 - rX * 0.9} ${350 + rY * 1.1}, ${1150 - rX} 350 Z`}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={i === 4 || i === 8 || i === 12 ? 2 : 1}
              strokeOpacity={0.16 + (i % 4) * 0.07}
            />
          );
        })}
        {/* Secondary topographic island on bottom left */}
        {[...Array(10)].map((_, i) => {
          const r = 90 + i * 50;
          return (
            <ellipse
              key={`island-${i}`}
              cx={240}
              cy={680}
              rx={r * 1.3}
              ry={r * 0.8}
              fill="none"
              stroke="var(--sr-gold-secondary, #AA820A)"
              strokeWidth={1.1}
              strokeOpacity={0.15 + (i % 3) * 0.08}
              transform={`rotate(-18 240 680)`}
            />
          );
        })}
      </g>
    );
  }

  // 3. Guilloche Security Mesh & Fibonacci Spirals
  if (pId === 'guilloche-security-mesh' || pId === 'golden-ratio-spirals' || pId === 'concentric-radar-rings') {
    return (
      <g className="sr-anim-guilloche-rotate" style={{ transformOrigin: '720px 450px' }}>
        {[...Array(24)].map((_, i) => {
          const angle = (i * 360) / 24;
          return (
            <g key={i} transform={`rotate(${angle} 720 450)`}>
              <ellipse
                cx={720}
                cy={450}
                rx={560}
                ry={180}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth={1}
                strokeOpacity={0.14 + (i % 4) * 0.06}
              />
              <path
                d="M 280 450 Q 720 220 1160 450 T 280 450"
                fill="none"
                stroke="var(--sr-gold-primary, #D4AF37)"
                strokeWidth={0.8}
                strokeOpacity={0.12}
              />
            </g>
          );
        })}
        <circle cx={720} cy={450} r={90} fill="none" stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={1.5} strokeOpacity={0.4} />
        <circle cx={720} cy={450} r={190} fill="none" stroke="var(--sr-gold-secondary, #AA820A)" strokeWidth={1} strokeOpacity={0.25} />
      </g>
    );
  }

  // 4. Justice Constellation & Neural Mesh & Quantum Field
  if (pId === 'justice-constellation-nodes' || pId === 'neural-legal-brain' || pId === 'quantum-particle-field') {
    const nodes = [
      { x: 180, y: 150 }, { x: 340, y: 220 }, { x: 490, y: 120 }, { x: 620, y: 280 },
      { x: 810, y: 190 }, { x: 970, y: 110 }, { x: 1150, y: 220 }, { x: 1320, y: 140 },
      { x: 260, y: 440 }, { x: 420, y: 520 }, { x: 600, y: 410 }, { x: 740, y: 560 },
      { x: 920, y: 430 }, { x: 1080, y: 510 }, { x: 1260, y: 390 }, { x: 190, y: 720 },
      { x: 380, y: 780 }, { x: 580, y: 690 }, { x: 760, y: 810 }, { x: 960, y: 730 },
      { x: 1160, y: 790 }, { x: 1330, y: 690 },
    ];
    return (
      <g className="sr-anim-mesh-pulse">
        {/* Connecting lines */}
        {nodes.map((node, i) => {
          const next = nodes[(i + 1) % nodes.length];
          const cross = nodes[(i + 4) % nodes.length];
          return (
            <React.Fragment key={i}>
              <line
                x1={node.x}
                y1={node.y}
                x2={next.x}
                y2={next.y}
                stroke={`url(#${gradId})`}
                strokeWidth={1}
                strokeOpacity={0.25}
              />
              <line
                x1={node.x}
                y1={node.y}
                x2={cross.x}
                y2={cross.y}
                stroke="var(--sr-gold-primary, #D4AF37)"
                strokeWidth={0.7}
                strokeOpacity={0.15}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={i % 3 === 0 ? 4 : 2.5}
                fill="var(--sr-gold-primary, #D4AF37)"
                fillOpacity={0.7}
              />
            </React.Fragment>
          );
        })}
      </g>
    );
  }

  // 5. Cyber Matrix Circuit & Blockchain Ledger & Minimal Diagonal Rays
  if (pId === 'cyber-matrix-circuit' || pId === 'blockchain-ledger-chain' || pId === 'minimal-diagonal-rays' || pId === 'geometric-prism-rays') {
    return (
      <g className="sr-anim-dash-travel">
        {/* Grid rails and circuit conduits */}
        {[...Array(18)].map((_, i) => {
          const y = 50 + i * 50;
          return (
            <path
              key={i}
              d={`M -50 ${y} L ${400 + (i % 4) * 80} ${y} L ${550 + (i % 4) * 80} ${y + 60} L 1500 ${y + 60}`}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={i % 4 === 0 ? 2 : 1}
              strokeOpacity={0.22 + (i % 4) * 0.06}
            />
          );
        })}
        {/* Diagonal high-speed bus lines */}
        {[...Array(12)].map((_, i) => {
          const x = 100 + i * 110;
          return (
            <path
              key={`diag-${i}`}
              d={`M ${x} -50 L ${x + 500} 950`}
              fill="none"
              stroke="var(--sr-gold-secondary, #AA820A)"
              strokeWidth={1.2}
              strokeOpacity={0.16}
            />
          );
        })}
      </g>
    );
  }

  // 6. Islamic Modern Linear Geometry & Hexagonal Matrix
  if (pId === 'islamic-geometric-lines' || pId === 'hexagonal-honeycomb-lines' || pId === 'moroccan-arabesque-wire') {
    return (
      <g className="sr-anim-guilloche-rotate" style={{ transformOrigin: '720px 450px' }}>
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <g key={i} transform={`rotate(${angle} 720 450)`}>
              <polygon
                points="720,100 840,320 1060,320 880,450 940,660 720,530 500,660 560,450 380,320 600,320"
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth={1.2}
                strokeOpacity={0.2}
              />
              <rect
                x={520}
                y={250}
                width={400}
                height={400}
                fill="none"
                stroke="var(--sr-gold-primary, #D4AF37)"
                strokeWidth={1}
                strokeOpacity={0.15}
                transform="rotate(45 720 450)"
              />
            </g>
          );
        })}
      </g>
    );
  }

  // 7. Isometric Grid & Architectural Courthouse Facade
  if (pId === 'isometric-court-grid' || pId === 'architectural-facade' || pId === 'origami-faceted-lines') {
    return (
      <g className="sr-anim-gentle-float">
        {/* Isometric perspective floor lines */}
        {[...Array(22)].map((_, i) => {
          const x = -200 + i * 85;
          return (
            <React.Fragment key={i}>
              <line
                x1={x}
                y1={0}
                x2={x + 700}
                y2={950}
                stroke={`url(#${gradId})`}
                strokeWidth={1}
                strokeOpacity={0.18}
              />
              <line
                x1={1640 - i * 85}
                y1={0}
                x2={940 - i * 85}
                y2={950}
                stroke="var(--sr-gold-secondary, #AA820A)"
                strokeWidth={1}
                strokeOpacity={0.18}
              />
            </React.Fragment>
          );
        })}
        {/* Classical pillars / structural upright lines */}
        {[...Array(14)].map((_, i) => {
          const x = 120 + i * 95;
          return (
            <line
              key={`col-${i}`}
              x1={x}
              y1={200}
              x2={x}
              y2={850}
              stroke="var(--sr-gold-primary, #D4AF37)"
              strokeWidth={i % 2 === 0 ? 1.8 : 0.8}
              strokeOpacity={0.22}
            />
          );
        })}
      </g>
    );
  }

  // 8. Soundwave Advocacy & Analytical Frequency Spectrum
  if (pId === 'soundwave-advocacy' || pId === 'sound-frequency-spectrum') {
    return (
      <g className="sr-anim-mesh-pulse">
        {[...Array(48)].map((_, i) => {
          const x = 40 + i * 29;
          const height = 40 + Math.sin(i * 0.45) * 160 + (i % 5) * 35;
          const y1 = 450 - height / 2;
          const y2 = 450 + height / 2;
          return (
            <line
              key={i}
              x1={x}
              y1={y1}
              x2={x}
              y2={y2}
              stroke={`url(#${gradId})`}
              strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
              strokeOpacity={0.25 + (i % 4) * 0.08}
              strokeLinecap="round"
            />
          );
        })}
        {/* Horizontal reference baseline */}
        <line x1={0} y1={450} x2={1440} y2={450} stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={1} strokeOpacity={0.4} />
      </g>
    );
  }

  // 9. Bezier Parallel Silk & DNA Helix & Signature Flourish
  return (
    <g className="sr-anim-wave-flow">
      {[...Array(18)].map((_, i) => {
        const offset = i * 40;
        return (
          <path
            key={i}
            d={`M -100 ${150 + offset} Q 350 ${50 + offset * 1.2} 720 ${350 + offset * 0.8} T 1540 ${200 + offset * 1.1}`}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={1.2}
            strokeOpacity={0.2 + (i % 4) * 0.06}
          />
        );
      })}
    </g>
  );
}
