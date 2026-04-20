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
              background: isSelected ? colors.accent : 'transparent',
              color: isSelected ? '#FFFFFF' : colors.text,
              borderColor: isRecommended && !isSelected ? colors.accent : colors.border,
            }}
          >
            <span className="size-selector__label">{size}</span>
            {isRecommended && (
              <span className="size-selector__badge">✓</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default SizeSelector;
