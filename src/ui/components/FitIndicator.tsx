import React from 'react';

interface FitIndicatorProps {
  label: 'too tight' | 'fits right' | 'too loose';
  bodyPart?: string;
  style?: React.CSSProperties;
}

const FitIndicator: React.FC<FitIndicatorProps> = ({ label, bodyPart, style }) => {

  const getIndicatorColor = () => {
    switch (label) {
      case 'too tight':
        return { bg: '#E74C5F22', border: '#E74C5F', text: '#E74C5F' };
      case 'fits right':
        return { bg: '#4CAF5022', border: '#4CAF50', text: '#4CAF50' };
      case 'too loose':
        return { bg: '#FF980022', border: '#FF9800', text: '#FF9800' };
    }
  };

  const indicatorColors = getIndicatorColor();

  return (
    <div
      className="fit-indicator"
      style={{
        background: indicatorColors.bg,
        borderColor: indicatorColors.border,
        color: indicatorColors.text,
        border: `1px solid ${indicatorColors.border}`,
        borderRadius: '20px',
        padding: '2px 10px',
        ...style,
      }}
    >
      <span className="fit-indicator__dot" style={{ background: indicatorColors.border }} />
      <span className="fit-indicator__label" style={{ fontSize: '11px', fontWeight: '600' }}>{label}</span>
    </div>
  );
};

export default FitIndicator;
