import React, { useId } from 'react';
import { VECTOR_BACKGROUND_PRESETS, VectorBackgroundPreset } from '../data/vectorBackgroundPresets';

export interface VectorBackgroundRendererProps {
  presetId?: string;
  opacity?: number;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  isAnimated?: boolean;
  mode?: 'animated' | 'static';
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light';
}

export const VectorBackgroundRenderer: React.FC<VectorBackgroundRendererProps> = ({
  presetId = 'dynamic-flowing-waves',
  opacity = 0.6,
  speed = 'normal',
  className = '',
  isAnimated = true,
  mode = 'animated',
  blendMode = 'normal',
}) => {
  const maskId = useId();
  const gradId = useId();

  const isActuallyAnimated = mode === 'animated' && isAnimated;

  // Find active preset or default to first
  const preset =
    VECTOR_BACKGROUND_PRESETS.find((p) => p.id === presetId) || VECTOR_BACKGROUND_PRESETS[0];

  // Speed multiplier
  const speedDuration = speed === 'slow' ? '40s' : speed === 'fast' ? '14s' : '24s';

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      style={{
        opacity,
        mixBlendMode: blendMode !== 'normal' ? (blendMode as any) : undefined,
      }}
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
          animation: ${isActuallyAnimated ? `sr-wave-flow ${speedDuration} ease-in-out infinite` : 'none'};
          transform-origin: center center;
        }
        .sr-anim-contour-drift {
          animation: ${isActuallyAnimated ? `sr-contour-drift ${speedDuration} ease-in-out infinite` : 'none'};
          transform-origin: center center;
        }
        .sr-anim-guilloche-rotate {
          animation: ${isActuallyAnimated ? `sr-guilloche-rotate ${speedDuration} linear infinite` : 'none'};
          transform-origin: center center;
        }
        .sr-anim-mesh-pulse {
          animation: ${isActuallyAnimated ? `sr-mesh-pulse calc(${speedDuration} * 0.4) ease-in-out infinite` : 'none'};
          transform-origin: center center;
        }
        .sr-anim-dash-travel {
          stroke-dasharray: 12 18;
          animation: ${isActuallyAnimated ? `sr-dash-travel ${speedDuration} linear infinite` : 'none'};
        }
        .sr-anim-gentle-float {
          animation: ${isActuallyAnimated ? `sr-gentle-float calc(${speedDuration} * 0.5) ease-in-out infinite` : 'none'};
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

// Render dedicated geometric paths based on the 66 presets
function renderPresetGeometry(preset: VectorBackgroundPreset, gradId: string) {
  const pId = preset.id;

  // 1. Dynamic Flowing Waves, Auroras, Silk & Fluid Curves
  if (
    pId === 'dynamic-flowing-waves' ||
    pId === 'aurora-ribbons' ||
    pId === 'vortex-fluid-curves' ||
    pId === 'sinusoidal-justice-stream' ||
    pId === 'bezier-silk-strands' ||
    pId === 'parabolic-light-echo' ||
    pId === 'harmonic-resonance-waves' ||
    pId === 'celestial-nebula-plasma' ||
    pId === 'oceanic-depth-currents' ||
    pId === 'aurora-borealis-law-stream' ||
    pId === 'fluid-mercury-ribbons' ||
    pId === 'cosmic-superstring-loops'
  ) {
    return (
      <g className="sr-anim-wave-flow">
        {[...Array(16)].map((_, i) => {
          const yOff = 60 + i * 50;
          const cpY1 = yOff - 90 + (i % 2 === 0 ? 55 : -45);
          const cpY2 = yOff + 115 - (i % 3 === 0 ? 65 : 30);
          return (
            <path
              key={i}
              d={`M -80 ${yOff} C 360 ${cpY1}, 880 ${cpY2}, 1520 ${yOff - 30}`}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={i % 2 === 0 ? 1.6 : 0.9}
              strokeOpacity={0.22 + (i % 5) * 0.07}
            />
          );
        })}
        {[...Array(6)].map((_, i) => (
          <path
            key={`cross-${i}`}
            d={`M 1520 ${100 + i * 140} C 1000 ${250 + i * 80}, 450 ${50 + i * 120}, -80 ${200 + i * 130}`}
            fill="none"
            stroke="var(--sr-gold-secondary, #AA820A)"
            strokeWidth={0.8}
            strokeOpacity={0.15}
            strokeDasharray="6 12"
          />
        ))}
      </g>
    );
  }

  // 2. Topographic Elevation Contours & Terrestrial Bathymetry
  if (
    pId === 'topographic-elevation-contours' ||
    pId === 'cadastral-boundary-mesh' ||
    pId === 'stratified-geological-folds' ||
    pId === 'orbital-gravitational-field' ||
    pId === 'geodetic-surveyor-triangulation' ||
    pId === 'topographic-elevation-lines' ||
    pId === 'seismic-wave-propagation' ||
    pId === 'stratified-sediment-bedding' ||
    pId === 'abstract-topography-3d' ||
    pId === 'fluid-contour-blobs'
  ) {
    return (
      <g className="sr-anim-contour-drift">
        {[...Array(20)].map((_, i) => {
          const radiusX = 140 + i * 62;
          const radiusY = 90 + i * 44;
          return (
            <ellipse
              key={i}
              cx={720 + Math.sin(i * 0.5) * 60}
              cy={450 + Math.cos(i * 0.4) * 45}
              rx={radiusX}
              ry={radiusY}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={i % 4 === 0 ? 1.8 : 0.8}
              strokeOpacity={0.2 + (i % 4) * 0.08}
              strokeDasharray={i % 5 === 0 ? '12 8 4 8' : undefined}
            />
          );
        })}
        {[...Array(12)].map((_, i) => {
          const angle = (i * Math.PI) / 6;
          const x1 = 720 + Math.cos(angle) * 200;
          const y1 = 450 + Math.sin(angle) * 160;
          const x2 = 720 + Math.cos(angle) * 580;
          const y2 = 450 + Math.sin(angle) * 420;
          return (
            <line
              key={`tick-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--sr-gold-primary, #D4AF37)"
              strokeWidth={0.7}
              strokeOpacity={0.16}
              strokeDasharray="3 9"
            />
          );
        })}
      </g>
    );
  }

  // 3. Guilloche Security Mesh, High-Security Banknote & Cryptographic Seals
  if (
    pId === 'guilloche-security-mesh' ||
    pId === 'golden-ratio-spirals' ||
    pId === 'sacred-geometry-flower' ||
    pId === 'chladni-resonance-harmonics' ||
    pId === 'guilloche-rosette-seal' ||
    pId === 'hyperbolic-tessellation' ||
    pId === 'spirograph-hypotrochoid-rosette' ||
    pId === 'fibonacci-phyllotaxis-matrix' ||
    pId === 'fractal-sierpinski-lattice' ||
    pId === 'guilloche-currency-waves'
  ) {
    return (
      <g className="sr-anim-guilloche-rotate" style={{ transformOrigin: '720px 450px' }}>
        {[...Array(32)].map((_, i) => {
          const angle = (i * 360) / 32;
          return (
            <g key={i} transform={`rotate(${angle} 720 450)`}>
              <ellipse
                cx={720}
                cy={450}
                rx={460}
                ry={130}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth={0.9}
                strokeOpacity={0.25}
              />
              <path
                d="M 520 450 Q 720 280 920 450 Q 720 620 520 450 Z"
                fill="none"
                stroke="var(--sr-gold-primary, #D4AF37)"
                strokeWidth={0.6}
                strokeOpacity={0.18}
              />
            </g>
          );
        })}
        <circle cx={720} cy={450} r={180} fill="none" stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={1.5} strokeOpacity={0.4} strokeDasharray="8 6" />
        <circle cx={720} cy={450} r={280} fill="none" stroke="var(--sr-gold-secondary, #AA820A)" strokeWidth={1} strokeOpacity={0.3} />
        <circle cx={720} cy={450} r={80} fill="none" stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={2} strokeOpacity={0.5} />
      </g>
    );
  }

  // 4. Justice Constellation, Optical Nodes & Quantum Matrix
  if (
    pId === 'justice-constellation-nodes' ||
    pId === 'synaptic-neural-web' ||
    pId === 'quantum-probability-lattice' ||
    pId === 'astrolabe-celestial-rings' ||
    pId === 'blockchain-merkle-dag' ||
    pId === 'quantum-entanglement-threads' ||
    pId === 'neural-network-deep-learning' ||
    pId === 'astronomical-armillary-sphere' ||
    pId === 'particle-collider-tracks' ||
    pId === 'sedrazavi-sovereign-emblem'
  ) {
    const nodes = [
      { x: 180, y: 180, r: 4 },
      { x: 380, y: 140, r: 6 },
      { x: 620, y: 220, r: 5 },
      { x: 880, y: 160, r: 7 },
      { x: 1140, y: 240, r: 4 },
      { x: 1300, y: 190, r: 5 },
      { x: 260, y: 460, r: 5 },
      { x: 500, y: 410, r: 7 },
      { x: 720, y: 450, r: 9 },
      { x: 940, y: 420, r: 6 },
      { x: 1200, y: 470, r: 5 },
      { x: 190, y: 720, r: 6 },
      { x: 420, y: 760, r: 5 },
      { x: 680, y: 690, r: 7 },
      { x: 960, y: 740, r: 5 },
      { x: 1240, y: 710, r: 6 },
    ];

    return (
      <g className="sr-anim-mesh-pulse">
        {nodes.map((node, i) =>
          nodes.slice(i + 1, i + 4).map((target, j) => (
            <line
              key={`link-${i}-${j}`}
              x1={node.x}
              y1={node.y}
              x2={target.x}
              y2={target.y}
              stroke={`url(#${gradId})`}
              strokeWidth={0.9}
              strokeOpacity={0.26}
              strokeDasharray={j % 2 === 0 ? '4 8' : undefined}
            />
          ))
        )}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r * 2.8}
              fill="none"
              stroke="var(--sr-gold-primary, #D4AF37)"
              strokeWidth={0.7}
              strokeOpacity={0.25}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill="var(--sr-gold-primary, #D4AF37)"
              fillOpacity={0.8}
            />
          </g>
        ))}
        <circle cx={720} cy={450} r={140} fill="none" stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={1.2} strokeOpacity={0.35} strokeDasharray="6 6" />
      </g>
    );
  }

  // 5. Cyber Matrix, Circuitry, Binary Rain & Laser Grid
  if (
    pId === 'cyber-matrix-circuit' ||
    pId === 'isometric-court-grid' ||
    pId === 'cyber-wireframe-terrain' ||
    pId === 'optical-fiber-bundle' ||
    pId === 'binary-matrix-rain' ||
    pId === 'cyber-neon-hex-grid' ||
    pId === 'circuit-board-micro-traces' ||
    pId === 'synthwave-laser-perspective' ||
    pId === 'isometric-block-cityscape' ||
    pId === 'cyber-hud-tactical-crosshairs'
  ) {
    return (
      <g className="sr-anim-dash-travel">
        {[...Array(16)].map((_, i) => {
          const y = 80 + i * 52;
          return (
            <path
              key={`bus-h-${i}`}
              d={`M 0 ${y} L 400 ${y} L 460 ${y + 40} L 980 ${y + 40} L 1040 ${y} L 1440 ${y}`}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={i % 3 === 0 ? 1.6 : 0.8}
              strokeOpacity={0.25 + (i % 3) * 0.08}
            />
          );
        })}
        {[...Array(12)].map((_, i) => {
          const x = 120 + i * 110;
          return (
            <g key={`tap-${i}`}>
              <line x1={x} y1={120} x2={x + 80} y2={200} stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={1} strokeOpacity={0.28} />
              <rect x={x + 75} y={195} width={10} height={10} fill="none" stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={1} strokeOpacity={0.4} />
            </g>
          );
        })}
        {[...Array(10)].map((_, i) => {
          const y = 550 + i * 35;
          return (
            <line key={`floor-${i}`} x1={0} y1={y} x2={1440} y2={y} stroke="var(--sr-gold-secondary, #AA820A)" strokeWidth={0.9} strokeOpacity={0.2} />
          );
        })}
      </g>
    );
  }

  // 6. Islamic Parametric: Shamseh, Muqarnas, Girih & Arabesque
  if (
    pId === 'islamic-geometric-lines' ||
    pId === 'islamic-arabesque-lattice' ||
    pId === 'persian-girih-decagram' ||
    pId === 'muqarnas-vault-facets' ||
    pId === 'islamic-star-polygon-interlace' ||
    pId === 'persian-toranj-medallion' ||
    pId === 'muqarnas-honeycomb-corbel'
  ) {
    return (
      <g className="sr-anim-guilloche-rotate" style={{ transformOrigin: '720px 450px' }}>
        {[...Array(12)].map((_, i) => {
          const rot = (i * 360) / 12;
          return (
            <g key={`girih-${i}`} transform={`rotate(${rot} 720 450)`}>
              <polygon
                points="720,200 755,360 840,410 770,450 720,450"
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth={1.2}
                strokeOpacity={0.3}
              />
              <path
                d="M 720 150 Q 770 210 820 280 T 720 380"
                fill="none"
                stroke="var(--sr-gold-primary, #D4AF37)"
                strokeWidth={0.8}
                strokeOpacity={0.22}
              />
            </g>
          );
        })}
        <polygon points="720,180 880,260 940,450 880,640 720,720 560,640 500,450 560,260" fill="none" stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={1.2} strokeOpacity={0.35} />
        <circle cx={720} cy={450} r={330} fill="none" stroke="var(--sr-gold-secondary, #AA820A)" strokeWidth={0.8} strokeOpacity={0.2} strokeDasharray="10 10" />
        <circle cx={720} cy={450} r={120} fill="none" stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={1.6} strokeOpacity={0.45} />
      </g>
    );
  }

  // 7. Architectural Pillars, Mathematical Tessellation & Law Chambers
  if (
    pId === 'architectural-perspective-grid' ||
    pId === 'penrose-aperiodic-tiling' ||
    pId === 'voronoi-polygonal-mesh' ||
    pId === 'dodecahedron-holographic-wireframe' ||
    pId === 'hexagonal-honeycomb-cellular'
  ) {
    return (
      <g className="sr-anim-contour-drift">
        {[...Array(16)].map((_, i) => {
          const x = 90 + i * 85;
          return (
            <React.Fragment key={`col-${i}`}>
              <line x1={x} y1={80} x2={x} y2={820} stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={i % 2 === 0 ? 1.6 : 0.8} strokeOpacity={0.24} />
              <circle cx={x} cy={100} r={6} fill="none" stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={1} strokeOpacity={0.3} />
              <circle cx={x} cy={800} r={6} fill="none" stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={1} strokeOpacity={0.3} />
            </React.Fragment>
          );
        })}
        {[...Array(6)].map((_, i) => {
          const y = 140 + i * 110;
          return (
            <path
              key={`arch-${i}`}
              d={`M 90 ${y} Q 720 ${y - 90} 1365 ${y}`}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={1.2}
              strokeOpacity={0.26}
            />
          );
        })}
      </g>
    );
  }

  // 8. Soundwave Advocacy, Audio Spectrum & Resonance
  if (
    pId === 'soundwave-advocacy' ||
    pId === 'sound-frequency-spectrum' ||
    pId === 'radial-soundwave-mandala' ||
    pId === 'lissajous-harmonic-curves'
  ) {
    return (
      <g className="sr-anim-mesh-pulse">
        {[...Array(52)].map((_, i) => {
          const x = 30 + i * 27;
          const height = 45 + Math.sin(i * 0.42) * 175 + (i % 6) * 35;
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
              strokeWidth={i % 3 === 0 ? 2.4 : 1.4}
              strokeOpacity={0.25 + (i % 4) * 0.08}
              strokeLinecap="round"
            />
          );
        })}
        <line x1={0} y1={450} x2={1440} y2={450} stroke="var(--sr-gold-primary, #D4AF37)" strokeWidth={1.2} strokeOpacity={0.4} />
      </g>
    );
  }

  // 9. Default Universal Mathematical Silk & Ribbon Geometry
  return (
    <g className="sr-anim-wave-flow">
      {[...Array(20)].map((_, i) => {
        const offset = i * 38;
        return (
          <path
            key={i}
            d={`M -100 ${120 + offset} Q 360 ${40 + offset * 1.15} 720 ${340 + offset * 0.82} T 1540 ${180 + offset * 1.08}`}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={1.1}
            strokeOpacity={0.2 + (i % 4) * 0.06}
          />
        );
      })}
    </g>
  );
}
