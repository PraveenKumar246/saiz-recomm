import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch } from '../../../state/store';
import { setScreen } from '../../../state/slices/screenSlice';

const AnalyzeScreen: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <div className="screen screen--analyze" id="analyze-screen">
      <div className="screen__header">
        <h2 className="screen__title" style={{ color: colors.text }}>//SAIZ Recommendation</h2>
      </div>

      <div style={{ textAlign: 'center', padding: '24px 12px' }}>
        <p style={{ color: colors.text }}>Printed T-shirt runs smaller than average.</p>
        <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/assets/tshirt-placeholder.png" alt="product" style={{ maxWidth: '60%' }} />
        </div>
        <p style={{ color: colors.textSecondary }}>Analyzing the product... Comparing to 1000s of products...</p>
      </div>

      <div style={{ marginTop: 18 }}>
        <button className="btn btn--primary" onClick={() => dispatch(setScreen('sizePreferences'))} style={{ background: 'linear-gradient(90deg,#000,#333)', color: '#fff' }}>Next</button>
      </div>
    </div>
  );
};

export default AnalyzeScreen;
