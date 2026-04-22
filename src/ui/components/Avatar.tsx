import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface AvatarProps {
  gender: 'male' | 'female' | 'other';
  displayConfig?: {
    chest: boolean;
    waist: boolean;
    hip: boolean;
    length: boolean;
  };
  fitResults?: Array<{
    bodyPart: string;
    label: 'too tight' | 'fits right' | 'too loose';
    position: { top: string; right: string };
  }>;
}

const Avatar: React.FC<AvatarProps> = ({ 
  gender, 
  displayConfig = { chest: true, waist: true, hip: true, length: false },
  fitResults = [] 
}) => {
  const { colors, mode } = useTheme();

  const getFitColor = (label: string) => {
    switch (label) {
      case 'too tight': return '#E74C5F';
      case 'fits right': return '#4CAF50';
      case 'too loose': return '#FF9800';
      default: return colors.textSecondary;
    }
  };

  return (
    <div className="avatar" id="avatar-display">
      <div className="avatar__body" style={{ background: mode === 'dark' ? '#111111' : '#F8F8F8' }}>
        {/* SVG Body Silhouette */}
        <svg viewBox="0 0 100 200" className="avatar__svg" xmlns="http://www.w3.org/2000/svg">
          {/* Helper Lines (Anatomical Markers) - Behind the silhouette */}
          {displayConfig.chest && <line x1="20" y1="58" x2="80" y2="58" stroke={mode === 'dark' ? '#333' : '#E0E0E0'} strokeWidth="0.8" strokeDasharray="3,2" />}
          {displayConfig.waist && <line x1="25" y1="88" x2="75" y2="88" stroke={mode === 'dark' ? '#333' : '#E0E0E0'} strokeWidth="0.8" strokeDasharray="3,2" />}
          {displayConfig.hip && <line x1="22" y1="108" x2="78" y2="108" stroke={mode === 'dark' ? '#333' : '#E0E0E0'} strokeWidth="0.8" strokeDasharray="3,2" />}

          {gender === 'female' ? (
            <path 
              d="M50 20 C42 20 38 28 38 35 C38 45 42 48 50 48 C58 48 62 45 62 35 C62 28 58 20 50 20 M48 48 L46 55 L35 58 C30 60 28 75 30 95 L32 95 C33 78 35 72 40 70 L44 105 L35 110 L30 180 L48 180 L50 120 L52 180 L70 180 L65 110 L56 105 L60 70 C65 72 67 78 68 95 L70 95 C72 75 70 60 65 58 L54 55 L52 48 Z" 
              fill={mode === 'dark' ? '#222' : '#E0E0E0'} 
              stroke={mode === 'dark' ? '#333' : '#D0D0D0'}
              strokeWidth="0.5"
            />
          ) : (
            <path 
              d="M50 18 C41 18 36 28 36 38 C36 48 41 52 50 52 C59 52 64 48 64 38 C64 28 59 18 50 18 M48 52 L45 60 L30 65 C25 68 22 85 24 105 L27 105 C28 85 30 78 38 75 L42 110 L32 115 L28 185 L48 185 L50 125 L52 185 L72 185 L68 115 L58 110 L62 75 C70 78 72 85 73 105 L76 105 C78 85 75 68 70 65 L55 60 L52 52 Z" 
              fill={mode === 'dark' ? '#222' : '#E0E0E0'} 
              stroke={mode === 'dark' ? '#333' : '#D0D0D0'}
              strokeWidth="0.5"
            />
          )}
        </svg>

        {/* Fit Result Labels */}
        {fitResults.map((result, index) => (
          <div
            key={index}
            className="avatar__fit-label"
            style={{
              position: 'absolute',
              top: result.position.top,
              right: result.position.right,
              background: '#000000',
              color: '#FFFFFF',
              borderColor: '#000000',
            }}
          >
            <span className="avatar__fit-dot" style={{ background: getFitColor(result.label) }} />
            {result.bodyPart}: {result.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Avatar;
