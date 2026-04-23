import React from 'react';
import type { ScreenId } from '../../domain/models/types';

// ─── Screen Component Registry Type ────────────────────────────────
export interface ScreenComponents {
  welcome: React.ComponentType;
  info: React.ComponentType;
  recommendation: React.ComponentType;
}

// ─── Lazy imports for default brand screens ─────────────────────────
const DefaultWelcomeScreen = React.lazy(() => import('../../ui/screens/default/WelcomeScreen'));
const DefaultInfoScreen = React.lazy(() => import('../../ui/screens/default/InfoScreen'));
const DefaultRecommendationScreen = React.lazy(() => import('../../ui/screens/default/RecommendationScreen'));

// ─── Brand Screen Registry ─────────────────────────────────────────
const brandScreenRegistry: Record<string, ScreenComponents> = {
  default: {
    welcome: DefaultWelcomeScreen,
    info: DefaultInfoScreen,
    recommendation: DefaultRecommendationScreen,
  },
};

/**
 * ScreenFactory
 * Factory Pattern: Returns the correct screen components based on brand code.
 */
export const ScreenFactory = {
  getScreens: (brandCode: string): ScreenComponents => {
    const key = brandCode.toLowerCase();
    return brandScreenRegistry[key] || brandScreenRegistry['default'];
  },

  getScreen: (brandCode: string, screenId: ScreenId): React.ComponentType => {
    const screens = ScreenFactory.getScreens(brandCode);
    return screens[screenId];
  },

  registerBrand: (brandCode: string, screens: ScreenComponents): void => {
    brandScreenRegistry[brandCode.toLowerCase()] = screens;
  },
};
