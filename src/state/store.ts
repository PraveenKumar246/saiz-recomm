import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import screenReducer from './slices/screenSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    screen: screenReducer,
    theme: themeReducer,
  },
});

// ─── Type Exports ───────────────────────────────────────────────────
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ─── Typed Hooks (avoids useSelector/useDispatch boilerplate) ───────
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
