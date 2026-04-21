import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAppSelector, useAppDispatch } from '../../../state/store';
import { setScreen, updateMeasurements, toggleHeightUnit, toggleWeightUnit } from '../../../state/slices/screenSlice';
import Avatar from '../../components/Avatar';

/**
 * InputScreen (Screen 1)
 * Collects user body measurements: gender, age, height, weight.
 * Based on the Figma design showing avatar with measurement inputs.
 */
const InputScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { userMeasurements } = useAppSelector((s) => s.screen);
  const product = useAppSelector((s) => s.product.product);

  if (!product) return null;

  const handleFindSize = () => {
    dispatch(setScreen('recommendation'));
  };

  return (
    <div className="screen screen--input" id="input-screen">
      {/* Header Section */}
      <div className="screen__header">
        <h2 className="screen__title" style={{ color: colors.text }}>
          SAIZ Recommendation
        </h2>
        <p className="screen__subtitle" style={{ color: colors.textSecondary }}>
          Measure yourself for a perfect fit.
        </p>
      </div>

      <div className="screen__content">
        {/* Left: Avatar Preview */}
        <div className="screen__avatar-section">
          <Avatar
            gender={userMeasurements.gender}
            garmentType={product.garmentType}
          />
          <div className="screen__avatar-actions">
            <button
              className="screen__avatar-btn"
              id="change-avatar-btn"
              style={{ color: colors.textSecondary, borderColor: colors.border }}
              onClick={() =>
                dispatch(updateMeasurements({
                  gender: userMeasurements.gender === 'female' ? 'male' : (userMeasurements.gender === 'male' ? 'other' : 'female'),
                }))
              }
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Change avatar
            </button>
          </div>
        </div>

        {/* Right: Measurement Form */}
        <div className="screen__form-section">
          {/* Gender Selection */}
          <div className="form-group" id="gender-group">
            <label className="form-group__label" style={{ color: colors.textSecondary }}>
              Gender
            </label>
            <div className="form-group__toggle">
              <button
                id="gender-male-btn"
                className={`toggle-btn ${userMeasurements.gender === 'male' ? 'toggle-btn--active' : ''}`}
                style={{
                  background: userMeasurements.gender === 'male' ? colors.accent : 'transparent',
                  color: userMeasurements.gender === 'male' ? colors.primary : colors.accent,
                  borderColor: colors.border,
                }}
                onClick={() => dispatch(updateMeasurements({ gender: 'male' }))}
              >
                Male
              </button>
              <button
                id="gender-female-btn"
                className={`toggle-btn ${userMeasurements.gender === 'female' ? 'toggle-btn--active' : ''}`}
                style={{
                  background: userMeasurements.gender === 'female' ? colors.accent : 'transparent',
                  color: userMeasurements.gender === 'female' ? colors.primary : colors.accent,
                  borderColor: colors.border,
                }}
                onClick={() => dispatch(updateMeasurements({ gender: 'female' }))}
              >
                Female
              </button>
              <button
                id="gender-other-btn"
                className={`toggle-btn ${userMeasurements.gender === 'other' ? 'toggle-btn--active' : ''}`}
                style={{
                  background: userMeasurements.gender === 'other' ? colors.accent : 'transparent',
                  color: userMeasurements.gender === 'other' ? colors.primary : colors.accent,
                  borderColor: colors.border,
                }}
                onClick={() => dispatch(updateMeasurements({ gender: 'other' }))}
              >
                Other
              </button>
            </div>
          </div>
          {/* ... (remaining fields) ... */}
          <div className="form-group" id="age-group">
            <label className="form-group__label" style={{ color: colors.textSecondary }}>
              Age
            </label>
            <div className="form-group__input-wrap">
              <input
                id="age-input"
                type="number"
                className="form-group__input"
                value={userMeasurements.age}
                min={10}
                max={100}
                onChange={(e) => dispatch(updateMeasurements({ age: parseInt(e.target.value) || 0 }))}
                style={{
                  background: colors.surfaceAlt,
                  color: colors.text,
                  borderColor: colors.border,
                }}
              />
              <span className="form-group__unit" style={{ color: colors.textSecondary }}>years</span>
            </div>
          </div>

          <div className="form-group" id="height-group">
            <label className="form-group__label" style={{ color: colors.textSecondary }}>
              Height
            </label>
            <div className="form-group__input-wrap">
              <input
                id="height-input"
                type="number"
                className="form-group__input"
                value={userMeasurements.height || ''}
                onChange={(e) => dispatch(updateMeasurements({ height: Number(e.target.value) }))}
                placeholder="0"
                style={{ background: 'transparent', borderColor: colors.border, color: colors.text }}
              />
              <button
                id="height-unit-toggle"
                className="form-group__unit-toggle"
                onClick={() => dispatch(toggleHeightUnit())}
                style={{ color: colors.textSecondary, borderColor: colors.border, }}
              >
                {userMeasurements.heightUnit === 'cm' ? 'cm' : 'in'}
              </button>
            </div>
          </div>

          <div className="form-group" id="weight-group">
            <label className="form-group__label" style={{ color: colors.textSecondary }}>
              Weight
            </label>
            <div className="form-group__input-wrap">
              <input
                id="weight-input"
                type="number"
                className="form-group__input"
                value={userMeasurements.weight || ''}
                onChange={(e) => dispatch(updateMeasurements({ weight: Number(e.target.value) }))}
                placeholder="0"
                style={{ background: 'transparent', borderColor: colors.border, color: colors.text }}
              />
              <button
                id="weight-unit-toggle"
                className="form-group__unit-toggle"
                onClick={() => dispatch(toggleWeightUnit())}
                style={{ color: colors.textSecondary, borderColor: colors.border }}
              >
                {userMeasurements.weightUnit === 'kg' ? 'kg' : 'lb'}
              </button>
            </div>
          </div>

          <button
            id="find-size-btn"
            className="btn btn--primary"
            onClick={handleFindSize}
            style={{ background: colors.accent, color: colors.primary }}
          >
            Get your size recommendation
          </button>

          <button
            id="learn-more-btn"
            className="btn btn--outline"
            style={{ color: colors.textSecondary, borderColor: colors.border }}
          >
            Learn more about sizing
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputScreen;
