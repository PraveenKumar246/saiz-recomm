import React from 'react';
import { useAppSelector } from '../../../state/store';
import { useTheme } from '../../context/ThemeContext';
import AvatarImg from '../../../assets/avatar.svg';

const RecommendationDetailsStep: React.FC = () => {
  const { colors } = useTheme();
  const { userMeasurements } = useAppSelector((s) => s.screen);
  
  const sizes = ['S', 'M', 'L', 'XL', '2X'];
  const recommendedSize = 'L';
  const measurementUnit = userMeasurements.measurementUnit || 'cm';

  return (
    <div style={{
      minHeight: '100%',
      background: colors.surface,
      color: colors.text,
      padding: '22px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Recommended Size Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 16px',
        borderRadius: '18px',
        backgroundColor: colors.surfaceAlt,
        border: `1px solid ${colors.border}`,
        gap: '10px'
      }}>
        <span style={{ fontSize: '14px', fontWeight: 600 }}>Recommended size</span>
        <div style={{
          backgroundColor: colors.text,
          color: colors.surface,
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          {recommendedSize}
        </div>
        <div style={{ marginLeft: 'auto', border: `1px solid ${colors.border}`, padding: '6px 8px', borderRadius: '8px', fontSize: '12px', color: colors.textSecondary, backgroundColor: colors.surface }}>
          ⊞
        </div>
      </div>

      {/* Size Selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '16px 12px',
        border: `1px solid ${colors.border}`,
        borderRadius: '18px',
        backgroundColor: colors.surfaceAlt,
        gap: '8px'
      }}>
        {sizes.map(size => (
          <span key={size} style={{
            fontSize: size === recommendedSize ? '22px' : '18px',
            fontWeight: size === recommendedSize ? '700' : '400',
            color: size === recommendedSize ? colors.text : colors.textSecondary,
          }}>
            {size}
          </span>
        ))}
      </div>

      {/* Avatar Content Area */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '280px' }}>
        
        {/* Measurement Callouts (Left) */}
        <div style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '60px', zIndex: 2 }}>
          <MeasurementBox label="Your chest" val={`${userMeasurements.chest ?? 80}${measurementUnit}`} productVal={`90-94 ${measurementUnit}`} />
          <MeasurementBox label="Your hips" val={`${userMeasurements.hips ?? 90}${measurementUnit}`} productVal={`90-94 ${measurementUnit}`} />
        </div>

        {/* Avatar Image */}
        <div style={{ width: '220px', height: 'auto', zIndex: 1 }}>
          <img 
            src={AvatarImg}
            alt="Avatar" 
            style={{ width: '100%', height: 'auto', opacity: 0.85 }} 
          />
        </div>

        {/* Fit Indicators (Right/Center) */}
        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '40px', zIndex: 2 }}>
          <FitBadge label="too tight" color="#E67E66" />
          <FitBadge label="fits right" color="#7BC67E" />
          <FitBadge label="fits right" color="#7BC67E" />
        </div>

        {/* Right Measurement */}
        <div style={{ position: 'absolute', right: '0', top: '45%', transform: 'translateY(-50%)' }}>
          <MeasurementBox label="Your waist" val={`${userMeasurements.waist ?? 65}${measurementUnit}`} productVal={`90-94 ${measurementUnit}`} />
        </div>
      </div>

      {/* Run Scale */}
      <div style={{ textAlign: 'center', marginBottom: '0' }}>
        <div style={{ 
          height: '2px', 
          background: `linear-gradient(to right, ${colors.text} 40%, ${colors.border} 40%)`, 
          width: '70%', 
          margin: '0 auto 8px',
          borderRadius: '2px'
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600 }}>
          <span style={{ color: colors.text }}>runs smaller</span>
          <span style={{ color: colors.textSecondary }}>runs larger</span>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const MeasurementBox = ({ label, val, productVal }: any) => {
  const { colors } = useTheme();

  return (
    <div style={{ 
      background: colors.surfaceAlt,
      padding: '8px 10px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      fontSize: '10px',
      border: `1px solid ${colors.border}`,
      whiteSpace: 'nowrap'
    }}>
      <div style={{ color: colors.textSecondary, fontSize: '9px', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontWeight: 'bold', color: colors.text, fontSize: '11px', marginBottom: '3px' }}>{val}</div>
      <div style={{ marginBottom: '2px' }}>
        <span style={{ background: colors.surface, padding: '1px 3px', borderRadius: '3px', fontWeight: 'bold', color: colors.text, fontSize: '8px' }}>Product</span>
      </div>
      <div style={{ fontWeight: 'bold', fontSize: '10px', color: colors.text }}>L &nbsp; {productVal}</div>
    </div>
  );
};

const FitBadge = ({ label, color }: any) => {
  return (
    <div style={{
      backgroundColor: color,
      color: '#FFFFFF',
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
      textTransform: 'capitalize'
    }}>
      {label}
    </div>
  );
};

export default RecommendationDetailsStep;
