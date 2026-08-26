export interface ThemeConfig {
  id: string;
  name: string;
  nameEn: string;
  hex: string;
  gradient: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  lightBg: string;
}

export const THEME_PRESETS: ThemeConfig[] = [
  {
    id: 'blue',
    name: 'Bleu Royal',
    nameEn: 'Royal Blue',
    hex: '#2563eb',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    bgClass: 'bg-blue-600',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-500',
    lightBg: 'bg-blue-50 text-blue-700',
  },
  {
    id: 'emerald',
    name: 'Vert Émeraude',
    nameEn: 'Emerald Green',
    hex: '#10b981',
    gradient: 'from-emerald-600 via-teal-600 to-teal-400',
    bgClass: 'bg-emerald-600',
    textClass: 'text-emerald-600',
    borderClass: 'border-emerald-500',
    lightBg: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 'purple',
    name: 'Violet Luxe',
    nameEn: 'Luxury Purple',
    hex: '#9333ea',
    gradient: 'from-purple-600 via-purple-700 to-pink-500',
    bgClass: 'bg-purple-600',
    textClass: 'text-purple-600',
    borderClass: 'border-purple-500',
    lightBg: 'bg-purple-50 text-purple-700',
  },
  {
    id: 'dark',
    name: 'Noir Mat / Slate',
    nameEn: 'Matte Black',
    hex: '#1e293b',
    gradient: 'from-slate-950 via-slate-900 to-slate-800',
    bgClass: 'bg-slate-900',
    textClass: 'text-slate-900',
    borderClass: 'border-slate-800',
    lightBg: 'bg-slate-100 text-slate-900',
  },
  {
    id: 'amber',
    name: 'Or / Prestige',
    nameEn: 'Prestige Gold',
    hex: '#d97706',
    gradient: 'from-amber-600 via-yellow-600 to-amber-500',
    bgClass: 'bg-amber-600',
    textClass: 'text-amber-600',
    borderClass: 'border-amber-500',
    lightBg: 'bg-amber-50 text-amber-800',
  },
  {
    id: 'rose',
    name: 'Rose Ruby',
    nameEn: 'Ruby Rose',
    hex: '#e11d48',
    gradient: 'from-rose-600 via-pink-600 to-rose-400',
    bgClass: 'bg-rose-600',
    textClass: 'text-rose-600',
    borderClass: 'border-rose-500',
    lightBg: 'bg-rose-50 text-rose-700',
  },
];

export function getThemeConfig(themeKeyOrHex?: string): {
  id: string;
  name: string;
  gradient: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  hex: string;
  customHex?: string;
} {
  if (!themeKeyOrHex) {
    const defaultTheme = THEME_PRESETS[0];
    return {
      id: defaultTheme.id,
      name: defaultTheme.name,
      gradient: defaultTheme.gradient,
      bgClass: defaultTheme.bgClass,
      textClass: defaultTheme.textClass,
      borderClass: defaultTheme.borderClass,
      hex: defaultTheme.hex,
    };
  }

  const cleanKey = themeKeyOrHex.trim();
  const preset = THEME_PRESETS.find(
    (p) => p.id.toLowerCase() === cleanKey.toLowerCase() || p.hex.toLowerCase() === cleanKey.toLowerCase()
  );

  if (preset) {
    return {
      id: preset.id,
      name: preset.name,
      gradient: preset.gradient,
      bgClass: preset.bgClass,
      textClass: preset.textClass,
      borderClass: preset.borderClass,
      hex: preset.hex,
    };
  }

  // Handle custom hex
  if (cleanKey.startsWith('#')) {
    return {
      id: 'custom',
      name: 'Custom',
      gradient: 'from-slate-900 via-slate-800 to-slate-900',
      bgClass: 'bg-slate-900',
      textClass: 'text-slate-900',
      borderClass: 'border-slate-800',
      hex: cleanKey,
      customHex: cleanKey,
    };
  }

  const fallback = THEME_PRESETS[0];
  return {
    id: fallback.id,
    name: fallback.name,
    gradient: fallback.gradient,
    bgClass: fallback.bgClass,
    textClass: fallback.textClass,
    borderClass: fallback.borderClass,
    hex: fallback.hex,
  };
}
