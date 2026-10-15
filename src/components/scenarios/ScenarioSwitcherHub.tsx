import React, { useState } from 'react';
import {
  LayoutGrid, Table, ShieldCheck, Zap, SlidersHorizontal,
  Layers, ArrowRight, CheckCircle2, Sparkles, RefreshCw,
  FolderTree, ExternalLink, Code2, Download
} from 'lucide-react';
import { BentoGridHub } from './BentoGridHub';
import { DenseMatrixWorkspace } from './DenseMatrixWorkspace';
import { HybridExecutiveView } from './HybridExecutiveView';
import { UniversalActionDrawer } from './UniversalActionDrawer';
import { LayoutScenarioId, ActionDrawerMode } from '../../types/scenarios';
import { SCENARIO_PRESETS } from '../../data/scenarioData';

interface ScenarioSwitcherHubProps {
  onBackToHome?: () => void;
}

export const ScenarioSwitcherHub: React.FC<ScenarioSwitcherHubProps> = ({ onBackToHome }) => {
  const [activeScenario, setActiveScenario] = useState<LayoutScenarioId>('bento-hud');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<ActionDrawerMode>('slide-over');

  const currentScenarioInfo = SCENARIO_PRESETS[activeScenario];

  const handleOpenActionDrawer = (mode: ActionDrawerMode = 'slide-over') => {
    setDrawerMode(mode);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* Top Breadcrumb & Executive Navigation Bar */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به سایت اصلی</span>
            </button>
          )}

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <h1 className="text-sm sm:text-base font-bold text-white">
                سامانه چندسناریویی چیدمان اینترفیس (Multi-Scenario Framework)
              </h1>
            </div>
            <p className="text-[11px] text-slate-400">
              طراحی اختصاصی برگرفته از ۶ اسکرین‌شات مرجع با تفکیک کامل هسته، سئو و بلوک‌های FSE
            </p>
          </div>
        </div>

        {/* Action Trigger Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleOpenActionDrawer('slide-over')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>باز کردن کشوی استعلام و اقدام</span>
          </button>
        </div>
      </div>

      {/* Scenario Switcher Tabs Toolbar */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Option 1: Bento HUD */}
          <button
            type="button"
            onClick={() => setActiveScenario('bento-hud')}
            className={`p-5 rounded-3xl text-right transition-all border cursor-pointer relative overflow-hidden ${
              activeScenario === 'bento-hud'
                ? 'bg-[#0D121F] border-cyan-500/80 shadow-2xl shadow-cyan-500/10'
                : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
            }`}
          >
            {activeScenario === 'bento-hud' && (
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
            )}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${activeScenario === 'bento-hud' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold font-mono text-cyan-400">سناریوی اول</span>
              </div>
              <span className="text-[10px] text-slate-500 bg-slate-800/70 px-2 py-0.5 rounded">تصویر ۱ و ۳</span>
            </div>
            <h3 className="text-sm font-bold text-white">{SCENARIO_PRESETS['bento-hud'].title}</h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {SCENARIO_PRESETS['bento-hud'].description}
            </p>
          </button>

          {/* Option 2: 3-Column Dense Matrix */}
          <button
            type="button"
            onClick={() => setActiveScenario('dense-matrix')}
            className={`p-5 rounded-3xl text-right transition-all border cursor-pointer relative overflow-hidden ${
              activeScenario === 'dense-matrix'
                ? 'bg-[#0D121F] border-emerald-500/80 shadow-2xl shadow-emerald-500/10'
                : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
            }`}
          >
            {activeScenario === 'dense-matrix' && (
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
            )}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${activeScenario === 'dense-matrix' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  <Table className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold font-mono text-emerald-400">سناریوی دوم</span>
              </div>
              <span className="text-[10px] text-slate-500 bg-slate-800/70 px-2 py-0.5 rounded">تصویر ۲، ۴ و ۶</span>
            </div>
            <h3 className="text-sm font-bold text-white">{SCENARIO_PRESETS['dense-matrix'].title}</h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {SCENARIO_PRESETS['dense-matrix'].description}
            </p>
          </button>

          {/* Option 3: Hybrid Executive Contrast */}
          <button
            type="button"
            onClick={() => setActiveScenario('hybrid-executive')}
            className={`p-5 rounded-3xl text-right transition-all border cursor-pointer relative overflow-hidden ${
              activeScenario === 'hybrid-executive'
                ? 'bg-[#0D121F] border-indigo-500/80 shadow-2xl shadow-indigo-500/10'
                : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
            }`}
          >
            {activeScenario === 'hybrid-executive' && (
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-purple-500" />
            )}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${activeScenario === 'hybrid-executive' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold font-mono text-indigo-400">سناریوی سوم</span>
              </div>
              <span className="text-[10px] text-slate-500 bg-slate-800/70 px-2 py-0.5 rounded">تصویر ۳ Mandate</span>
            </div>
            <h3 className="text-sm font-bold text-white">{SCENARIO_PRESETS['hybrid-executive'].title}</h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {SCENARIO_PRESETS['hybrid-executive'].description}
            </p>
          </button>
        </div>
      </div>

      {/* Active Scenario Canvas View */}
      <div className="max-w-7xl mx-auto">
        {activeScenario === 'bento-hud' && (
          <BentoGridHub onOpenActionDrawer={handleOpenActionDrawer} />
        )}
        {activeScenario === 'dense-matrix' && (
          <DenseMatrixWorkspace onOpenActionDrawer={handleOpenActionDrawer} />
        )}
        {activeScenario === 'hybrid-executive' && (
          <HybridExecutiveView onOpenActionDrawer={handleOpenActionDrawer} />
        )}
      </div>

      {/* Interactive Action Drawer Modal / Overlay */}
      <UniversalActionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        mode={drawerMode}
        onModeChange={(m) => setDrawerMode(m)}
      />
    </div>
  );
};
