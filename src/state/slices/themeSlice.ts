import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ThemeMode } from '../../domain/models/types';

// ─── State Shape ────────────────────────────────────────────────────
interface ThemeState {
  mode: ThemeMode;
  brandCode: string;
}

const initialState: ThemeState = {
  mode: 'light',
  brandCode: 'default',
};

// ─── Slice ──────────────────────────────────────────────────────────
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    setBrandCode: (state, action: PayloadAction<string>) => {
      state.brandCode = action.payload;
    },
  },
});

export const { toggleTheme, setThemeMode, setBrandCode } = themeSlice.actions;
export default themeSlice.reducer;
