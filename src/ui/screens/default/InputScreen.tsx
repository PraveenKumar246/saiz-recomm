import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../state/store';
import { updateMeasurements } from '../../../state/slices/screenSlice';
import NumericPicker from '../../components/NumericPicker';

const InputScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userMeasurements } = useAppSelector((s) => s.screen);

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* 1. Gender Card - Matches Screenshot 1 & 11 */}
      <div style={{ 
        border: '1px solid #F3F4F6', borderRadius: '16px', padding: '20px', marginBottom: '12px' 
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Gender</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Male', 'Female', 'Other'].map((g) => (
            <button 
              key={g}
              style={{
                flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #E5E7EB',
                background: userMeasurements.gender === g.toLowerCase() ? '#000' : '#fff',
                color: userMeasurements.gender === g.toLowerCase() ? '#fff' : '#000',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600'
              }}
              onClick={() => dispatch(updateMeasurements({ gender: g.toLowerCase() }))}
            >
              {g}
              <div style={{ 
                width: '18px', height: '18px', borderRadius: '50%', border: '1px solid #D1D5DB',
                background: userMeasurements.gender === g.toLowerCase() ? '#fff' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {userMeasurements.gender === g.toLowerCase() && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#000' }} />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Measurement Rows - Fixed to match the INLINE style of Screenshot 11 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <MeasurementRow 
          label="Age" 
          value={userMeasurements.age} 
          onChange={(v) => dispatch(updateMeasurements({ age: v }))} 
        />
        <MeasurementRow 
          label="Weight" 
          unit="kg" 
          value={userMeasurements.weight} 
          onChange={(v) => dispatch(updateMeasurements({ weight: v }))} 
        />
        <MeasurementRow 
          label="Height" 
          unit="cm" 
          value={userMeasurements.height} 
          onChange={(v) => dispatch(updateMeasurements({ height: v }))} 
        />
      </div>

      <button style={{ 
        marginTop: '32px', width: '100%', background: '#000', color: '#fff', 
        height: '56px', borderRadius: '100px', fontWeight: '700', border: 'none', fontSize: '16px' 
      }}>
        Get your size recommendation
      </button>
    </div>
  );
};

export default InputScreen

const MeasurementRow = ({ label, unit, value, onChange }: any) => (
  <div style={{ 
    border: '1px solid #F3F4F6', borderRadius: '16px', padding: '24px 20px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between' // THIS LOCKS THE LAYOUT
  }}>
    <div style={{ display: 'flex', alignItems: 'baseline' }}>
      <span style={{ fontSize: '20px', fontWeight: '700', color: '#000' }}>{label}</span>
      {unit && <span style={{ fontSize: '12px', color: '#9CA3AF', marginLeft: '4px' }}>{unit}</span>}
    </div>
    
    {/* The Picker takes the right side of the row */}
    <div style={{ width: '180px' }}> 
      <NumericPicker value={value} onChange={onChange} />
    </div>
  </div>
);