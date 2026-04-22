import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch } from '../../../state/store';
import { setScreen } from '../../../state/slices/screenSlice';

const SizePreferencesScreen: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <div className="screen screen--size-prefs" id="size-prefs-screen">
      <div className="screen__header">
        <h2 className="screen__title" style={{ color: colors.text }}>What size do you usually shop?</h2>
        <p className="screen__subtitle" style={{ color: colors.textSecondary }}>(Optional)</p>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        <div className="form-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/assets/top-placeholder.png" alt="tops" style={{ width: 48 }} />
            <div style={{ flex: 1 }}>Tops</div>
            <div>▾</div>
          </div>
        </div>

        <div className="form-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/assets/pants-placeholder.png" alt="pants" style={{ width: 48 }} />
            <div style={{ flex: 1 }}>Pants</div>
            <div>▾</div>
          </div>
        </div>

        <div className="form-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/assets/bras-placeholder.png" alt="bras" style={{ width: 48 }} />
            <div style={{ flex: 1 }}>Bras</div>
            <div>▾</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <button className="btn btn--primary" onClick={() => dispatch(setScreen('input'))} style={{ background: 'linear-gradient(90deg,#000,#333)', color: '#fff' }}>Next</button>
      </div>
    </div>
  );
};

export default SizePreferencesScreen;
