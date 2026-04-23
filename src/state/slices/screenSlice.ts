import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ScreenId, UserMeasurements } from '../../domain/models/types';

// ─── State Shape ────────────────────────────────────────────────────
interface ScreenState {
  currentScreen: ScreenId;
  recommendationStep: 'measurements' | 'recommendation';
  modalOpen: boolean;
  selectedSize: string | null;
  userMeasurements: UserMeasurements;
}

const initialState: ScreenState = {
  currentScreen: 'welcome',
  recommendationStep: 'measurements',
  modalOpen: false,
  selectedSize: null,
  userMeasurements: {
    gender: 'female',
    age: 25,
    height: 165,
    weight: 60,
    heightUnit: 'cm',
    weightUnit: 'kg',
    // Step 2 - Measurements
    chest: 80,
    waist: 65,
    hips: 90,
    measurementUnit: 'cm',
    // Step 2 - Size Preferences
    clothingSize: 'M',
    clothingSizeStandard: 'EU',
    pantsWaist: 29,
    pantsLength: 32,
    cupSize: 'C',
    braBand: 85,
  },
};

// ─── Slice ──────────────────────────────────────────────────────────
const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setScreen: (state, action: PayloadAction<ScreenId>) => {
      state.currentScreen = action.payload;
      if (action.payload === 'recommendation') {
        state.recommendationStep = 'measurements';
      }
    },
    openModal: (state) => {
      state.modalOpen = true;
        state.currentScreen = 'welcome';
    },
    closeModal: (state) => {
      state.modalOpen = false;
        state.currentScreen = 'welcome';
    },
    setSelectedSize: (state, action: PayloadAction<string>) => {
      state.selectedSize = action.payload;
    },
    nextRecommendationStep: (state) => {
      if (state.recommendationStep === 'measurements') {
        state.recommendationStep = 'recommendation';
      }
    },
    updateMeasurements: (state, action: PayloadAction<Partial<UserMeasurements>>) => {
      state.userMeasurements = { ...state.userMeasurements, ...action.payload };
    },
    toggleHeightUnit: (state) => {
      if (state.userMeasurements.heightUnit === 'cm') {
        state.userMeasurements.heightUnit = 'in';
        state.userMeasurements.height = Math.round(state.userMeasurements.height / 2.54 * 10) / 10;
      } else {
        state.userMeasurements.heightUnit = 'cm';
        state.userMeasurements.height = Math.round(state.userMeasurements.height * 30.48);
      }
    },
    toggleWeightUnit: (state) => {
      if (state.userMeasurements.weightUnit === 'kg') {
        state.userMeasurements.weightUnit = 'lbs';
        state.userMeasurements.weight = Math.round(state.userMeasurements.weight * 2.205);
      } else {
        state.userMeasurements.weightUnit = 'kg';
        state.userMeasurements.weight = Math.round(state.userMeasurements.weight / 2.205);
      }
    },
    toggleMeasurementUnit: (state) => {
      if (state.userMeasurements.measurementUnit === 'cm') {
        state.userMeasurements.measurementUnit = 'in';
        state.userMeasurements.chest = state.userMeasurements.chest
          ? Math.round(state.userMeasurements.chest / 2.54)
          : undefined;
        state.userMeasurements.waist = state.userMeasurements.waist
          ? Math.round(state.userMeasurements.waist / 2.54)
          : undefined;
        state.userMeasurements.hips = state.userMeasurements.hips
          ? Math.round(state.userMeasurements.hips / 2.54)
          : undefined;
      } else {
        state.userMeasurements.measurementUnit = 'cm';
        state.userMeasurements.chest = state.userMeasurements.chest
          ? Math.round(state.userMeasurements.chest * 2.54)
          : undefined;
        state.userMeasurements.waist = state.userMeasurements.waist
          ? Math.round(state.userMeasurements.waist * 2.54)
          : undefined;
        state.userMeasurements.hips = state.userMeasurements.hips
          ? Math.round(state.userMeasurements.hips * 2.54)
          : undefined;
      }
    },
  },
});

export const {
  setScreen,
  openModal,
  closeModal,
  setSelectedSize,
  nextRecommendationStep,
  updateMeasurements,
  toggleHeightUnit,
  toggleWeightUnit,
  toggleMeasurementUnit,
} = screenSlice.actions;

export default screenSlice.reducer;
