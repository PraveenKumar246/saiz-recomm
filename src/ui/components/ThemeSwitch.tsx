import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch } from '../../state/store';
import { toggleTheme } from '../../state/slices/themeSlice';

const ThemeSwitch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mode, colors } = useTheme();

  return (
    <button
      id="theme-switch-btn"
      className="theme-switch"
      onClick={() => dispatch(toggleTheme())}
      aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        background: colors.surfaceAlt,
        border: `1px solid ${colors.border}`,
        color: colors.text,
      }}
    >
      <span className="theme-switch__icon">
        {mode === 'dark' ? '☀️' : '🌙'}
      </span>
      <span className="theme-switch__label">
        {mode === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};

export default ThemeSwitch;
