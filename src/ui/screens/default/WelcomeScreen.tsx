import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../state/store';
import { useTheme } from '../../context/ThemeContext';
import { updateMeasurements, toggleHeightUnit } from '../../../state/slices/screenSlice';
import NumericPicker from '../../components/NumericPicker';

const WelcomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { userMeasurements } = useAppSelector((s) => s.screen);

  return (
    <div className="screen screen--input">

      {/* Title */}
      <div className="welcome__header">
        <h2 className="welcome__title">
          Welcome to //SAIZ<br />Recommender
        </h2>
        <p className="welcome__subtitle">
          Let's calculate the size that suits you best
        </p>
      </div>

      <div className="screen__content">

        {/* Unit Toggle */}
        <div className="unit-toggle">
          <button
            className={`unit-toggle__btn ${userMeasurements.heightUnit === 'cm' ? 'active' : ''}`}
            onClick={() => userMeasurements.heightUnit !== 'cm' && dispatch(toggleHeightUnit())}
          >
            cm
          </button>
          <button
            className={`unit-toggle__btn ${userMeasurements.heightUnit === 'in' ? 'active' : ''}`}
            onClick={() => userMeasurements.heightUnit !== 'in' && dispatch(toggleHeightUnit())}
          >
            in
          </button>
        </div>

        {/* Gender */}
        <div className="form-card">
          <div className="form-card__title">Gender</div>

          <div className="gender-group">
            {['Male', 'Female', 'Other'].map((label) => {
              const val = label.toLowerCase() as 'male' | 'female' | 'other';
              const active = userMeasurements.gender === val;

              return (
                <button
                  key={val}
                  onClick={() => dispatch(updateMeasurements({ gender: val }))}
                  className={`gender-btn ${active ? 'active' : ''}`}
                >
                  {label}

                  <div className={`gender-btn__check ${active ? 'active' : ''}`}>
                    {active && (
                      <svg width="10" height="8" viewBox="0 0 12 10">
                        <path d="M2 5L4.5 7.5L10 2" stroke={colors.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Measurements */}
        <div className="measurement-card">
          <div className="measurement-card__label">Age</div>
          <div className="measurement-card__picker">
            <NumericPicker
              value={userMeasurements.age}
              min={10}
              max={100}
              onChange={(v) => dispatch(updateMeasurements({ age: v }))}
            />
          </div>
        </div>

        <div className="measurement-card">
          <div className="measurement-card__label">
            Weight
            <span className="measurement-card__unit">
              {userMeasurements.weightUnit}
            </span>
          </div>

          <div className="measurement-card__picker">
            <NumericPicker
              value={userMeasurements.weight || 70}
              min={userMeasurements.weightUnit === 'kg' ? 30 : 60}
              max={userMeasurements.weightUnit === 'kg' ? 250 : 500}
              onChange={(v) => dispatch(updateMeasurements({ weight: v }))}
            />
          </div>
        </div>

        <div className="measurement-card">
          <div className="measurement-card__label">
            Height
            <span className="measurement-card__unit">
              {userMeasurements.heightUnit}
            </span>
          </div>

          <div className="measurement-card__picker">
            <NumericPicker
              value={userMeasurements.height || 170}
              min={userMeasurements.heightUnit === 'cm' ? 100 : 40}
              max={userMeasurements.heightUnit === 'cm' ? 250 : 96}
              onChange={(v) => dispatch(updateMeasurements({ height: v }))}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default WelcomeScreen;