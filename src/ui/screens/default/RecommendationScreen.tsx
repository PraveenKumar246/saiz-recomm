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

  // ─── Size Recommendation Logic ──────────────────────────────────
  const recommendedSize = useMemo(() => {
    // Simple estimation based on chest measurement from height/weight
    const estimatedChest = (() => {
      const { height, weight, gender, heightUnit, weightUnit } = userMeasurements;
      const heightCm = heightUnit === 'ft' ? height * 30.48 : height;
      const weightKg = weightUnit === 'lbs' ? weight / 2.205 : weight;
      // Basic estimation formula
      if (gender === 'female') {
        return heightCm * 0.38 + weightKg * 0.35 + 20;
      }
      return heightCm * 0.42 + weightKg * 0.38 + 18;
    })();

    let bestSize = product.measurements[0];
    let bestDiff = Infinity;

    for (const m of product.measurements) {
      if (m.chestRange.display) {
        const mid = (m.chestRange.min + m.chestRange.max) / 2;
        const diff = Math.abs(estimatedChest - mid);
        if (diff < bestDiff) {
          bestDiff = diff;
          bestSize = m;
        }
      }
    }

    return bestSize;
  }, [product, userMeasurements]);

  // ─── Selected Measurement Details ─────────────────────────────────
  const currentMeasurement: ProductMeasurement | undefined = useMemo(() => {
    const sizeToShow = selectedSize || recommendedSize.productSize;
    return product.measurements.find((m) => m.productSize === sizeToShow);
  }, [product, selectedSize, recommendedSize]);

  // ─── Fit Calculation ──────────────────────────────────────────────
  const fitResults = useMemo(() => {
    if (!currentMeasurement) return [];
    const results: Array<{
      bodyPart: string;
      label: 'too tight' | 'fits right' | 'too loose';
      position: { top: string; right: string };
    }> = [];

    // Estimated user chest
    const { height, weight, gender, heightUnit, weightUnit } = userMeasurements;
    const heightCm = heightUnit === 'ft' ? height * 30.48 : height;
    const weightKg = weightUnit === 'lbs' ? weight / 2.205 : weight;
    const estimatedChest = gender === 'female'
      ? heightCm * 0.38 + weightKg * 0.35 + 20
      : heightCm * 0.42 + weightKg * 0.38 + 18;

    if (currentMeasurement.chestRange.display) {
      const { min, max } = currentMeasurement.chestRange;
      let label: 'too tight' | 'fits right' | 'too loose';
      if (estimatedChest < min) {
        label = 'too loose';
      } else if (estimatedChest > max) {
        label = 'too tight';
      } else {
        label = 'fits right';
      }
      results.push({ bodyPart: 'Chest', label, position: { top: '28%', right: '-8px' } });
    }

    if (currentMeasurement.waistRange.display) {
      results.push({ bodyPart: 'Waist', label: 'fits right', position: { top: '45%', right: '-8px' } });
    }

    if (currentMeasurement.hipRange.display) {
      results.push({ bodyPart: 'Hip', label: 'fits right', position: { top: '55%', right: '-8px' } });
    }

    return results;
  }, [currentMeasurement, userMeasurements]);

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
          //SAIZ Recommendation
        </h2>
      </div>

      <div className="screen__content">
        {/* Left: Avatar with Fit Overlay */}
        <div className="screen__avatar-section">
          <Avatar
            gender={userMeasurements.gender}
            garmentType={product.garmentType}
            fitResults={fitResults}
          />
        </div>

        {/* Right: Recommendation Details */}
        <div className="screen__details-section">
          {/* Big Size Box */}
          <div className="recommendation-hero">
            <div className="recommendation-hero__box" style={{ background: mode === 'dark' ? colors.surfaceAlt : '#F8F8FA', borderColor: colors.border }}>
              <span className="recommendation-hero__size" style={{ color: colors.text }}>
                {recommendedSize.productSize}
              </span>
            </div>
            <div className="recommendation-hero__text">
              <p style={{ color: colors.textSecondary }}>
                We believe your expected size {recommendedSize.productSize} will fit you best.
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
              style={{ background: colors.text, color: mode === 'dark' ? colors.background : '#FFFFFF' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
