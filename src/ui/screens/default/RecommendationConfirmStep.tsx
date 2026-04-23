import React from 'react';
import AvatarImg from '../../../assets/avatar.svg';
import ChangeAvatarSrc from '../../../assets/change_avatar.svg';
import EnterMeasurementsSrc from '../../../assets/enter_measurements.svg';
import { setScreen } from '../../../state/slices/screenSlice';
import { useAppDispatch } from '../../../state/store';
import { useTheme } from '../../context/ThemeContext';

const RecommendationConfirmStep: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mode } = useTheme(); // Access the current theme mode
  const recommendedSize = 'L';

  // Apply inversion filter if in dark mode to turn black icons white
  const iconFilterStyle = mode === 'dark' ? { filter: 'invert(1)' } : {};

  return (
    <div className="screen screen--confirm">
      
      <div className="confirm__header">
        <span className="confirm__brand">//SAIZ Recommendation</span>
        <div className="confirm__size-box">
          <span className="confirm__size-value">{recommendedSize}</span>
        </div>
        <p className="confirm__subtitle">
          We believe your expected size M will be too small. We recommend going a size up.
        </p>
      </div>

      <div className="confirm__content">
        <div className="confirm__avatar-container">
          
          {/* Side Actions with Theme-Aware Icons */}
          <div className="confirm__side-actions">
            <SideAction 
              label="Change avatar" 
              icon={<img src={ChangeAvatarSrc} alt='' style={iconFilterStyle} />} 
              onClick={() => {}} 
            />
            <SideAction 
              label="Enter your measurements" 
              icon={<img src={EnterMeasurementsSrc} alt='' style={iconFilterStyle} />} 
              onClick={() => dispatch(setScreen('recommendation'))}
            />
          </div>

          {/* Centered Avatar Image */}
          <img src={AvatarImg} alt="Avatar" className="confirm__avatar-img" />
          
          {/* Wrappers & Bubbles */}
          <DottedLine color="#EB7956" position={{ top: '30%' }} />
          <FitBubble label="too tight" type="tight" position={{ top: '30%' }} />

          <DottedLine color="#7BBA80" position={{ top: '50%' }} />
          <FitBubble label="fits right" type="good" position={{ top: '50%' }} />

          <DottedLine color="#7BBA80" position={{ top: '72%' }} />
          <FitBubble label="fits right" type="good" position={{ top: '72%' }} />
        </div>
      </div>
    </div>
  );
};

/* --- Sub-components --- */

const DottedLine = ({ color, position }: { color: string; position: React.CSSProperties }) => (
  <div className="confirm__dotted-wrap" style={position}>
    <svg width="100%" height="40" viewBox="0 0 200 40" fill="none">
      <ellipse cx="100" cy="20" rx="90" ry="14" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
    </svg>
  </div>
);

const SideAction = ({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) => (
  <button className="side-action" onClick={onClick}>
    <div className="side-action__icon">{icon}</div>
    <span className="side-action__label">{label}</span>
  </button>
);

const FitBubble = ({ label, type, position }: { label: string; type: 'tight' | 'good'; position: React.CSSProperties }) => (
  <div className={`fit-bubble fit-bubble--${type}`} style={position}>{label}</div>
);

export default RecommendationConfirmStep;