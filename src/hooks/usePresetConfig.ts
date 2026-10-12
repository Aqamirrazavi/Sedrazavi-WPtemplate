import { useState, useEffect } from 'react';
import {
  IndustryPreset,
  getActivePreset,
  setActivePreset as storeSetActivePreset,
  savePresetCustomOverrides,
  ModularDashboardSettings,
  getModularDashboardSettings,
  saveModularDashboardSettings,
} from '../data/industryPresets';

export function usePresetConfig() {
  const [preset, setPresetState] = useState<IndustryPreset>(getActivePreset);
  const [modularSettings, setModularSettingsState] = useState<ModularDashboardSettings>(getModularDashboardSettings);

  useEffect(() => {
    const handlePresetChange = () => {
      setPresetState(getActivePreset());
    };

    const handleModularChange = () => {
      setModularSettingsState(getModularDashboardSettings());
    };

    window.addEventListener('sedrazavi_preset_changed', handlePresetChange);
    window.addEventListener('sedrazavi_modular_settings_changed', handleModularChange);

    return () => {
      window.removeEventListener('sedrazavi_preset_changed', handlePresetChange);
      window.removeEventListener('sedrazavi_modular_settings_changed', handleModularChange);
    };
  }, []);

  const changePreset = (id: string) => {
    const updated = storeSetActivePreset(id);
    setPresetState(updated);
  };

  const updateOverrides = (partial: Partial<IndustryPreset>) => {
    savePresetCustomOverrides(preset.id, partial);
    setPresetState(getActivePreset());
  };

  const updateModular = (settings: Partial<ModularDashboardSettings>) => {
    const updated = saveModularDashboardSettings(settings);
    setModularSettingsState(updated);
  };

  return {
    preset,
    changePreset,
    updateOverrides,
    modularSettings,
    updateModular,
  };
}
