import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../state/store';
import { updateMeasurements, toggleMeasurementUnit } from '../../../state/slices/screenSlice';
import NumericPicker from '../../components/NumericPicker';

const RecommendationMeasurementsStep: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userMeasurements } = useAppSelector((s) => s.screen);
  const measurementUnit = userMeasurements.measurementUnit || 'cm';

  const fields = [
    {
      key: 'chest' as const,
      label: 'Chest',
      value: userMeasurements.chest ?? 80,
      min: measurementUnit === 'cm' ? 60 : 24,
      max: measurementUnit === 'cm' ? 120 : 48,
    },
    {
      key: 'waist' as const,
      label: 'Waist',
      value: userMeasurements.waist ?? 65,
      min: measurementUnit === 'cm' ? 55 : 22,
      max: measurementUnit === 'cm' ? 110 : 44,
    },
    {
      key: 'hips' as const,
      label: 'Hips',
      value: userMeasurements.hips ?? 90,
      min: measurementUnit === 'cm' ? 70 : 28,
      max: measurementUnit === 'cm' ? 130 : 52,
    },
  ];

  return (
    <div className="screen screen--input">

      {/* Consistent Header with Step Indicator */}
      <div className="exact_measurements__header">
        <h2 className="exact_measurements__title">
          Enter your exact measurements
        </h2>
        <p className="welcome__subtitle">
          Lorem ipsum dolor sit amet consectetur, bibendum eu auctor arcu.
        </p>
      </div>

      <div className="screen__content">

        {/* Consistent Unit Toggle */}
        <div className="measurement-unit">
          <div className="measurement-unit-toggle">
            {(['cm', 'in'] as const).map((unit) => {
              const active = measurementUnit === unit;
              return (
                <button
                  key={unit}
                  className={`unit-toggle__btn ${active ? 'active' : ''}`}
                  onClick={() => !active && dispatch(toggleMeasurementUnit())}
                >
                  {unit}
                </button>
              );
            })}
          </div>
        </div>

        {/* Measurement Cards - Using consistent card classes */}
        <div className="measurement-group">
          {fields.map(({ key, label, value, min, max }) => (
            <div key={key} className="measurement-card">
              <div className="measurement-card__label">
                {label}
                <span className="measurement-card__unit">
                  {measurementUnit}
                </span>
              </div>

              <div className="measurement-card__picker">
                <NumericPicker
                  value={value}
                  min={min}
                  max={max}
                  onChange={(next) => dispatch(updateMeasurements({ [key]: next }))}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RecommendationMeasurementsStep;