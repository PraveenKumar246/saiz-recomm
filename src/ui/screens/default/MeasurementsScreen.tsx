import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../../../state/store';
import { setScreen, updateMeasurements } from '../../../state/slices/screenSlice';
import NumericPicker from '../../components/NumericPicker';

const MeasurementsScreen: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { userMeasurements } = useAppSelector((s) => s.screen);

  return (
    <div className="screen screen--measurements" id="measurements-screen">
      <div className="screen__header">
        <h2 className="screen__title" style={{ color: colors.text }}>Enter your exact measurements</h2>
        <p className="screen__subtitle" style={{ color: colors.textSecondary }}>Let's calculate the size that suits you best</p>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        <div className="form-card">
          <label className="form-group__label">Chest</label>
          <NumericPicker value={userMeasurements.height || 170} min={50} max={250} unit={userMeasurements.heightUnit === 'cm' ? 'cm' : 'in'} onChange={(v) => dispatch(updateMeasurements({ height: v }))} />
        </div>

        <div className="form-card">
          <label className="form-group__label">Waist</label>
          <NumericPicker value={userMeasurements.weight || 70} min={20} max={250} unit={userMeasurements.weightUnit === 'kg' ? 'kg' : 'lb'} onChange={(v) => dispatch(updateMeasurements({ weight: v }))} />
        </div>

        <div className="form-card">
          <label className="form-group__label">Hips</label>
          <NumericPicker value={userMeasurements.weight || 70} min={20} max={250} unit={userMeasurements.weightUnit === 'kg' ? 'kg' : 'lb'} onChange={(v) => dispatch(updateMeasurements({ weight: v }))} />
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <button className="btn btn--primary" onClick={() => dispatch(setScreen('recommendation'))} style={{ background: 'linear-gradient(90deg,#000,#333)', color: '#fff' }}>Get your size recommendation</button>
      </div>
    </div>
  );
};

export default MeasurementsScreen;
