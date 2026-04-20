import React, { createContext, useContext, useMemo } from 'react';
import type { Theme, ThemeColors } from '../../domain/models/types';
import { useAppSelector } from '../../state/store';

// ─── Theme Definitions ─────────────────────────────────────────────
const darkColors: ThemeColors = {
  primary: '#1A1A2E',
  secondary: '#16213E',
  background: '#0F0F1A',
  surface: '#1A1A2E',
  surfaceAlt: '#222244',
  text: '#FFFFFF',
  textSecondary: '#A0A0B8',
  border: '#2A2A4A',
  accent: '#6C63FF',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#E74C5F',
};

const lightColors: ThemeColors = {
  primary: '#FFFFFF',
  secondary: '#F5F5FA',
  background: '#FAFAFE',
  surface: '#FFFFFF',
  surfaceAlt: '#F0F0F8',
  text: '#1A1A2E',
  textSecondary: '#6B6B80',
  border: '#E0E0EE',
  accent: '#6C63FF',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#E74C5F',
};

// Brand-specific overrides (extensible for future brands)
const brandOverrides: Record<string, Partial<ThemeColors>> = {
  ohapril: {
    accent: '#6C63FF',
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
