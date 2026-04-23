import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import AvatarImg from '../../../assets/avatar.svg';

const RecommendationScreen: React.FC = () => {
  const { colors } = useTheme();
  const sizes = ['S', 'M', 'L', 'XL', '2X'];
  const recommendedSize = 'L';

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: colors.surface,
      color: colors.text,
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '16px'
    }}>

      {/* Recommended Size Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '10px 16px',
        marginBottom: '12px',
        borderRadius: '18px',
        backgroundColor: colors.surfaceAlt,
        border: `1px solid ${colors.border}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: colors.text }}>{'Recommended size'}</span>
          <div style={{
            backgroundColor: colors.text,
            color: colors.surface,
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>{recommendedSize}</div>
        </div>
        <div style={{ border: `1px solid ${colors.border}`, padding: '6px 8px', borderRadius: '8px', fontSize: '12px', color: colors.textSecondary, backgroundColor: colors.surface }}>
          ⊞
        </div>
      </div>

      {/* Size Selector */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '22px 0',
        border: `1px solid ${colors.border}`,
        borderRadius: '18px',
        marginBottom: '24px',
        backgroundColor: colors.surfaceAlt
      }}>
        {sizes.map(size => (
          <span key={size} style={{
            fontSize: size === recommendedSize ? '22px' : '20px',
            fontWeight: size === recommendedSize ? '700' : '500',
            color: size === recommendedSize ? colors.text : colors.textSecondary,
          }}>{size}</span>
        ))}
      </div>

      {/* Avatar Content Area */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}>
        
        {/* Measurement Callouts (Left) */}
        <div style={{ position: 'absolute', left: '0', top: '20%', display: 'flex', flexDirection: 'column', gap: '80px', zIndex: 2 }}>
           <MeasurementBox label="Your chest" val="90-94cm" productVal="90-94 cm" />
           <MeasurementBox label="Your hips" val="90-94cm" productVal="90-94 cm" />
        </div>

        {/* Avatar Image Placeholder */}
        <div style={{ width: '300px', height: '316px' }}>
          <img 
            src={AvatarImg}
            alt="Avatar" 
            style={{ width: '100%', height: 'auto' }} 
          />
        </div>

        {/* Fit Indicators (Right/Center) */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(20px)', top: '28%', display: 'flex', flexDirection: 'column', gap: '45px' }}>
          <FitBadge label="too tight" color="#E67E66" />
          <FitBadge label="fits right" color="#7BC67E" />
          <FitBadge label="fits right" color="#7BC67E" />
        </div>

        {/* Measurement Callouts (Right) */}
        <div style={{ position: 'absolute', right: '0', top: '35%' }}>
           <MeasurementBox label="Your waist" val="90-94cm" productVal="90-94 cm" />
        </div>
      </div>

      {/* Run Scale */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          height: '2px', 
          background: `linear-gradient(to right, ${colors.text} 40%, ${colors.border} 40%)`, 
          width: '60%', 
          margin: '0 auto 8px',
          borderRadius: '2px'
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
          <span style={{ color: colors.textSecondary }}>runs smaller</span>
          <span style={{ color: colors.textSecondary }}>{'runs larger'}</span>
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
      padding: '8px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      fontSize: '10px',
      border: `1px solid ${colors.border}`
    }}>
      <div style={{ color: colors.textSecondary }}>{label} <strong style={{ color: colors.text }}>{val}</strong></div>
      <div style={{ marginTop: '4px' }}>
        <span style={{ background: colors.surface, padding: '2px 4px', borderRadius: '4px', fontWeight: 'bold', color: colors.text }}>Product</span>
      </div>
      <div style={{ fontWeight: 'bold', fontSize: '11px', marginTop: '2px', color: colors.text }}>L &nbsp; {productVal}</div>
    </div>
  );
};

const FitBadge = ({ label, color }: any) => {
  const { colors } = useTheme();

  return (
    <div style={{
      backgroundColor: color,
      color: colors.surface,
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      boxShadow: `0 2px 5px ${colors.border}`
    }}>
      {label}
    </div>
  );
};

export default RecommendationScreen;