import React from 'react';
import { useAppSelector } from '../../../state/store';
import RecommendationMeasurementsStep from './RecommendationMeasurementsStep';
import RecommendationConfirmStep from './RecommendationConfirmStep';

const RecommendationScreen: React.FC = () => {
  const { recommendationStep } = useAppSelector((s) => s.screen);

  if (recommendationStep === 'measurements') {
    return <RecommendationMeasurementsStep />;
  }

  return <RecommendationConfirmStep />;
};

export default RecommendationScreen;
