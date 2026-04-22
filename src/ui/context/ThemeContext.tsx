import React, { createContext, useContext, useMemo } from 'react';
import type { Theme, ThemeColors } from '../../domain/models/types';
import { useAppSelector } from '../../state/store';

// ─── Theme Definitions ─────────────────────────────────────────────
const darkColors: ThemeColors = {
  primary: '#0F0F10',
  secondary: '#111111',
  background: '#0F0F10',
  surface: '#111111',
  surfaceAlt: '#1A1A1A',
  text: '#FFFFFF',
  textSecondary: '#999999',
  border: '#333333',
  accent: '#FFFFFF',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#E74C5F',
};

const lightColors: ThemeColors = {
  primary: '#FFFFFF',
  secondary: '#F5F5F5',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#F9F9F9',
  text: '#0F0F10',
  textSecondary: '#666666',
  border: '#E5E5E5',
  accent: '#0F0F10',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#E74C5F',
};

// Brand-specific overrides (extensible for future brands)
const brandOverrides: Record<string, Partial<ThemeColors>> = {
  ohapril: {
    // accent: '#000000',
  },
};

// ─── Context ────────────────────────────────────────────────────────
const ThemeContext = createContext<Theme>({
  mode: 'dark',
  colors: darkColors,
  brandCode: 'default',
});

// ─── Provider ───────────────────────────────────────────────────────
interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ModelContextProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { mode, brandCode } = useAppSelector((state) => state.theme);

  const theme = useMemo<Theme>(() => {
    const baseColors = mode === 'dark' ? { ...darkColors } : { ...lightColors };
    const overrides = brandOverrides[brandCode.toLowerCase()] || {};
    const colors = { ...baseColors, ...overrides };

    // Inject CSS variables for global CSS access
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--saiz-${key}`, value);
    });

    return { mode, colors, brandCode };
  }, [mode, brandCode]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// ─── Hook ───────────────────────────────────────────────────────────
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ModelContextProvider');
  }
  return context;
};

export default ThemeContext;
