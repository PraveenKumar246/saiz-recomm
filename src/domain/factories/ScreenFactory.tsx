import React from 'react';
import type { ScreenId } from '../../domain/models/types';

// ─── Screen Component Registry Type ────────────────────────────────
export interface ScreenComponents {
  input: React.ComponentType;
  recommendation: React.ComponentType;
}

// ─── Lazy imports for default brand screens ─────────────────────────
const DefaultInputScreen = React.lazy(
  () => import('../../ui/screens/default/InputScreen')
);
const DefaultRecommendationScreen = React.lazy(
  () => import('../../ui/screens/default/RecommendationScreen')
);

// ─── Brand Screen Registry ─────────────────────────────────────────
// Open/Closed Principle: Add new brands here without modifying factory logic.
const brandScreenRegistry: Record<string, ScreenComponents> = {
  default: {
    input: DefaultInputScreen,
    recommendation: DefaultRecommendationScreen,
  },
};

/**
 * ScreenFactory
 * Factory Pattern: Returns the correct screen components based on brand code.
 * Refactored to use ES6 object/functional pattern instead of class.
 */
export const ScreenFactory = {
  /**
   * Returns the screen components for a given brand.
   * Falls back to default screens if no brand-specific screens are registered.
   */
  getScreens: (brandCode: string): ScreenComponents => {
    const key = brandCode.toLowerCase();
    return brandScreenRegistry[key] || brandScreenRegistry['default'];
  },

  /**
   * Returns a specific screen component by brand and screen ID.
   */
  getScreen: (brandCode: string, screenId: ScreenId): React.ComponentType => {
    const screens = ScreenFactory.getScreens(brandCode);
    return screens[screenId];
  },

  /**
   * Registers screen components for a brand (runtime extensibility).
   */
  registerBrand: (brandCode: string, screens: ScreenComponents): void => {
    brandScreenRegistry[brandCode.toLowerCase()] = screens;
  },
};
