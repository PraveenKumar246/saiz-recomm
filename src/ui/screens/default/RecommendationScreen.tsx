import React, { useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAppSelector, useAppDispatch } from '../../../state/store';
import { setScreen, setSelectedSize } from '../../../state/slices/screenSlice';
import Avatar from '../../components/Avatar';
import SizeSelector from '../../components/SizeSelector';
import FitIndicator from '../../components/FitIndicator';
import type { ProductMeasurement } from '../../../domain/models/types';

/**
 * RecommendationScreen (Screen 2)
 * Shows size recommendation results with avatar fit visualization.
 * Based on the Figma "Step 5 - Detailed view" design.
 */
const RecommendationScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors, mode } = useTheme();
  const product = useAppSelector((s) => s.product.product);
  const { userMeasurements, selectedSize } = useAppSelector((s) => s.screen);

  if (!product) return null;
  
  const sizes = product.measurements.map((m) => m.productSize);

  // ─── 1. Biometric Estimation ───────────────────────────────────
  // We calculate this separately so it only re-runs if height/weight/gender changes
  const estimatedChest = useMemo(() => {
    const { height, weight, gender, heightUnit, weightUnit } = userMeasurements;
    const heightCm = heightUnit === 'ft' ? height * 30.48 : height;
    const weightKg = weightUnit === 'lbs' ? weight / 2.205 : weight;

    if (gender === 'female') {
      return heightCm * 0.38 + weightKg * 0.35 + 20;
    }
    return heightCm * 0.42 + weightKg * 0.38 + 18;
  }, [userMeasurements]);

  // ─── 2. Product Size Matching ─────────────────────────────────────
  // Uses a functional .reduce() to find the size with the minimum distance
  const recommendedSize = useMemo(() => {
    return product.measurements.reduce((best, current) => {
      if (!current.chestRange.display) return best;

      const currentMid = (current.chestRange.min + current.chestRange.max) / 2;
      const bestMid = (best.chestRange.min + best.chestRange.max) / 2;

      const currentDiff = Math.abs(estimatedChest - currentMid);
      const bestDiff = Math.abs(estimatedChest - bestMid);

      return currentDiff < bestDiff ? current : best;
    }, product.measurements[0]);
  }, [product, estimatedChest]);

  // ─── 3. Selected Measurement Details ──────────────────────────────
  const currentMeasurement: ProductMeasurement | undefined = useMemo(() => {
    const sizeToShow = selectedSize || recommendedSize.productSize;
    return product.measurements.find((m) => m.productSize === sizeToShow);
  }, [product, selectedSize, recommendedSize]);

  // ─── 4. Fit Label Analysis ────────────────────────────────────────
  const fitResults = useMemo(() => {
    if (!currentMeasurement) return [];
    
    // Boundary check logic
    const getLabel = (val: number, min: number, max: number) => {
      if (val < min) return 'too loose';
      if (val > max) return 'too tight';
      return 'fits right';
    };

    const results: Array<{
      bodyPart: string;
      label: 'too tight' | 'fits right' | 'too loose';
      position: { top: string; right: string };
    }> = [];

    if (currentMeasurement.chestRange.display) {
      results.push({ 
        bodyPart: 'Chest', 
        label: getLabel(estimatedChest, currentMeasurement.chestRange.min, currentMeasurement.chestRange.max), 
        position: { top: '28%', right: '-8px' } 
      });
    }
    
    // Future-proofing for Waist/Hip if API enables them
    if (currentMeasurement.waistRange.display) {
      results.push({ bodyPart: 'Waist', label: 'fits right', position: { top: '45%', right: '-8px' } });
    }

    return results;
  }, [currentMeasurement, estimatedChest]);

  const handleBack = () => {
    dispatch(setScreen('input'));
  };

  return (
    <div className="screen screen--recommendation" id="recommendation-screen">
      {/* Header */}
      <div className="screen__header">
        <button
          id="back-btn"
          className="screen__back-btn"
          onClick={handleBack}
          style={{ color: colors.textSecondary }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h2 className="screen__title" style={{ color: colors.text }}>
          SAIZ Recommendation
        </h2>
      </div>

      <div className="screen__content">
        {/* Left: Avatar with Fit Overlay */}
        <div className="screen__avatar-section">
          <Avatar
            gender={userMeasurements.gender}
            garmentType={product.garmentType}
            displayConfig={product.display}
            fitResults={fitResults}
          />
        </div>

        {/* Right: Recommendation Details */}
        <div className="screen__details-section">
          {/* Big Size Box */}
          <div className="recommendation-hero">
            <div className="recommendation-hero__box">
              <span className="recommendation-hero__size">
                {recommendedSize.productSize}
              </span>
            </div>
            <div className="recommendation-hero__text">
              <p style={{ color: colors.textSecondary, fontSize: '14px', lineHeight: '1.6' }}>
                We believe your expected size <strong style={{ color: colors.text }}>{recommendedSize.productSize}</strong> will fit you best.
                We recommend going for it!
              </p>
            </div>
          </div>

          <div className="screen__actions screen__actions--vertical">
            <button
              id="learn-more-sizes-btn"
              className="btn btn--outline"
              style={{ color: colors.textSecondary, borderColor: colors.border }}
            >
              Learn more about sizes
            </button>
            <button
              id="shop-now-btn"
              className="btn btn--primary btn--shop"
              style={{ background: colors.accent, color: colors.primary }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Shop now
            </button>
          </div>

          {/* Size Selector (Lower Priority) */}
          <div className="screen__size-section screen__size-section--compact">
            <label className="form-group__label" style={{ color: colors.textSecondary }}>
              Other available sizes
            </label>
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize || recommendedSize.productSize}
              recommendedSize={recommendedSize.productSize}
              onSelect={(size) => dispatch(setSelectedSize(size))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationScreen;
