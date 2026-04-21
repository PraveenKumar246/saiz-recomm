import React from 'react';
import { useTheme } from '../context/ThemeContext';
import avatar from '../../assets/avatar.svg';

interface AvatarProps {
  gender: 'male' | 'female' | 'other';
  garmentType: string;
  fitResults?: Array<{
    bodyPart: string;
    label: 'too tight' | 'fits right' | 'too loose';
    position: { top: string; right: string };
  }>;
}

const Avatar: React.FC<AvatarProps> = ({ gender, garmentType, fitResults = [] }) => {
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
      <div className="avatar__body" style={{ background: mode === 'dark' ? '#111111' : '#F5F5F5' }}>
        {/* SVG Body Silhouette */}
        <svg viewBox="0 0 200 400" className="avatar__svg" xmlns="http://www.w3.org/2000/svg">
          {gender === 'female' ? (
            // Female Silhouette
            <g fill={mode === 'dark' ? '#333333' : '#DDDDDD'} stroke={mode === 'dark' ? '#444444' : '#CCCCCC'} strokeWidth="1">
              {/* Head */}
              <ellipse cx="100" cy="40" rx="22" ry="26" />
              {/* Neck */}
              <rect x="92" y="64" width="16" height="16" rx="4" />
              {/* Torso */}
              <path d="M70 80 Q60 100 58 140 Q56 180 65 200 L80 200 Q85 185 100 185 Q115 185 120 200 L135 200 Q144 180 142 140 Q140 100 130 80 Z" />
              {/* Left Arm */}
              <path d="M70 80 Q50 90 42 130 Q38 150 40 170 Q42 175 48 172 Q52 150 56 130 Q58 120 65 100 Z" />
              {/* Right Arm */}
              <path d="M130 80 Q150 90 158 130 Q162 150 160 170 Q158 175 152 172 Q148 150 144 130 Q142 120 135 100 Z" />
              {/* Left Leg */}
              <path d="M65 200 Q60 250 58 300 Q56 340 58 380 L78 380 Q80 340 82 300 Q84 260 80 200 Z" />
              {/* Right Leg */}
              <path d="M120 200 Q124 260 118 300 Q122 340 122 380 L142 380 Q142 340 144 300 Q140 250 135 200 Z" />
              {/* Garment overlay for shirt */}
              {garmentType.toLowerCase() === 'shirt' && (
                <path 
                  d="M70 80 Q60 100 58 140 Q56 170 62 195 L138 195 Q144 170 142 140 Q140 100 130 80 L120 82 Q115 90 100 90 Q85 90 80 82 Z"
              fill={mode === 'dark' ? '#222222' : '#EEEEEE'}
              stroke={colors.accent}
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
          )}
        </g>
      ) : (
        // Male or Other Silhouette
        <g fill={mode === 'dark' ? '#333333' : '#DDDDDD'} stroke={mode === 'dark' ? '#444444' : '#CCCCCC'} strokeWidth="1">
              <ellipse cx="100" cy="38" rx="24" ry="28" />
              <rect x="90" y="64" width="20" height="18" rx="4" />
              <path d="M65 82 Q55 105 52 145 Q50 185 60 205 L85 205 Q90 195 100 195 Q110 195 115 205 L140 205 Q150 185 148 145 Q145 105 135 82 Z" />
              <path d="M65 82 Q42 92 35 135 Q32 155 34 178 Q36 183 42 180 Q46 155 50 135 Q54 118 60 98 Z" />
              <path d="M135 82 Q158 92 165 135 Q168 155 166 178 Q164 183 158 180 Q154 155 150 135 Q146 118 140 98 Z" />
              <path d="M60 205 Q55 260 52 310 Q50 350 52 385 L75 385 Q78 350 80 310 Q82 265 85 205 Z" />
              <path d="M115 205 Q118 265 120 310 Q122 350 125 385 L148 385 Q150 350 148 310 Q145 260 140 205 Z" />
              {garmentType.toLowerCase() === 'shirt' && (
                <path 
                  d="M65 82 Q55 105 52 145 Q50 175 57 200 L143 200 Q150 175 148 145 Q145 105 135 82 L125 85 Q118 95 100 95 Q82 95 75 85 Z"
              fill={mode === 'dark' ? '#222222' : '#EEEEEE'}
              stroke={colors.accent}
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
          )}
        </g>
      )}
        </svg>

        <img src={avatar} alt="Avatar" />

        {/* Fit Result Labels */}
        {fitResults.map((result, index) => (
          <div
            key={index}
            className="avatar__fit-label"
            style={{
              position: 'absolute',
              top: result.position.top,
              right: result.position.right,
              background: getFitColor(result.label) + '22',
              color: getFitColor(result.label),
              borderColor: getFitColor(result.label),
            }}
          >
            <span className="avatar__fit-dot" style={{ background: getFitColor(result.label) }} />
            {result.label}
            <svg width="20" height="1" style={{ position: 'absolute', left: '-20px', top: '50%' }}>
              <line x1="0" y1="0" x2="20" y2="0" stroke={getFitColor(result.label)} strokeWidth="1" strokeDasharray="3 2" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Avatar;
