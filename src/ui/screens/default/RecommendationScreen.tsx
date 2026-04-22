import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAppSelector, useAppDispatch } from '../../../state/store';
import { setScreen, setSelectedSize } from '../../../state/slices/screenSlice';
import Avatar from '../../components/Avatar';
import SizeSelector from '../../components/SizeSelector';


/**
 * RecommendationScreen (Screen 2)
 * Shows size recommendation results with avatar fit visualization.
 * Based on the Figma "Step 5 - Detailed view" design.
 */
const RecommendationScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const product = useAppSelector((s) => s.product.product);
  const { userMeasurements, selectedSize } = useAppSelector((s) => s.screen);

  if (!product) return null;

  const sizes = product.measurements.map((m) => m.productSize);

  // simple recommended size fallback (use first available for now)
  const recommendedSize = product.measurements[0];

  const handleBack = () => dispatch(setScreen('input'));

  return (
    <div className="screen screen--recommendation" id="recommendation-screen">
      <div className="screen__header">
        <button id="back-btn" className="screen__back-btn" onClick={handleBack} style={{ color: colors.textSecondary }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="screen__title" style={{ color: colors.text }}>//SAIZ Recommendation</h2>
      </div>

      <div className="recommendation-hero">
        <div className="recommendation-hero__top">
          <div className="size-chip" aria-hidden>
            <span>{recommendedSize.productSize}</span>
          </div>
        </div>

        <div className="recommendation-hero__avatar">
          <div className="avatar-wrapper">
            <Avatar gender={userMeasurements.gender} />

            {/* Fit bubbles - static placeholders to match Figma visuals */}
            <div className="fit-bubble fit-bubble--chest">too tight</div>
            <div className="fit-bubble fit-bubble--waist">fits right</div>
            <div className="fit-bubble fit-bubble--hips">fits right</div>
          </div>
        </div>

        <div className="recommendation-hero__actions">
          <button id="learn-more-sizes-btn" className="btn btn--outline" style={{ color: colors.textSecondary, borderColor: colors.border }}>Learn more about sizes</button>
          <button id="shop-now-btn" className="btn btn--primary btn--shop" style={{ background: 'linear-gradient(90deg,#000,#333)', color: '#fff' }}>Shop now</button>
        </div>

        <div className="recommendation-hero__sizes">
          <label className="form-group__label" style={{ color: colors.textSecondary }}>Other available sizes</label>
          <SizeSelector sizes={sizes} selectedSize={selectedSize || recommendedSize.productSize} recommendedSize={recommendedSize.productSize} onSelect={(size) => dispatch(setSelectedSize(size))} />
        </div>
      </div>
    </div>
  );
};

export default RecommendationScreen;
