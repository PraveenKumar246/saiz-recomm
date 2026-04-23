import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface NumericPickerProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}

const NumericPicker: React.FC<NumericPickerProps> = ({ value, onChange, min = 10, max = 200 }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { colors } = useTheme();
  const ITEM_WIDTH = 45; // Adjust this to match the spacing in Figma
  const items = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  // Sync scroll position when the component mounts or value changes externally
  useEffect(() => {
    if (scrollRef.current) {
      const index = items.indexOf(value);
      if (index !== -1) {
        scrollRef.current.scrollLeft = index * ITEM_WIDTH;
      }
    }
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / ITEM_WIDTH);
    const newValue = items[index];
    
    if (newValue !== undefined && newValue !== value) {
      onChange(newValue);
    }
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '40px',
      overflow: 'hidden',
      // This creates the "Fade out" effect on left and right sides
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 35%, black 65%, transparent)',
      maskImage: 'linear-gradient(to right, transparent, black 35%, black 65%, transparent)'
    }}>
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ 
          display: 'flex', 
          flexDirection: 'row', // Forces numbers to stay in a line
          overflowX: 'auto', 
          scrollSnapType: 'x mandatory', 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          paddingLeft: 'calc(50% - 22.5px)', // Centers the selection
          paddingRight: 'calc(50% - 22.5px)',
          alignItems: 'center',
          height: '100%',
          cursor: 'grab'
        }}
      >
        {items.map((n) => {
          const isActive = n === value;
          return (
            <div 
              key={n}
              style={{ 
                minWidth: `${ITEM_WIDTH}px`, 
                textAlign: 'center', 
                scrollSnapAlign: 'center',
                fontSize: '20px',
                fontWeight: isActive ? '700' : '400',
                color: isActive ? colors.text : colors.textSecondary,
                opacity: isActive ? '1' : '.5',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none'
              }}
            >
              {n}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NumericPicker;