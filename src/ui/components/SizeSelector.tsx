import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
  recommendedSize?: string;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelect,
  recommendedSize,
}) => {
  const { colors } = useTheme();

  return (
    <div className="size-selector" id="size-selector">
      {sizes.map((size) => {
        const isSelected = size === selectedSize;
        const isRecommended = size === recommendedSize;

        return (
          <button
            key={size}
            id={`size-btn-${size}`}
            className={`size-selector__btn ${isSelected ? 'size-selector__btn--selected' : ''} ${isRecommended ? 'size-selector__btn--recommended' : ''}`}
            onClick={() => onSelect(size)}
            style={{
              background: isSelected ? colors.text : 'transparent',
              color: isSelected ? colors.surface : colors.text,
              borderColor: isSelected ? colors.text : (isRecommended ? colors.text : colors.border),
            }}
          >
            <span className="size-selector__label">{size}</span>
            {isRecommended && (
              <span className="size-selector__badge" style={{ background: '#4CAF50', border: `1px solid ${colors.surface}` }} />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SizeSelector;
