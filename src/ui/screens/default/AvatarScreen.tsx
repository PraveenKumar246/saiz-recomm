import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAppDispatch } from '../../../state/store';
import { setScreen } from '../../../state/slices/screenSlice';
import Avatar from '../../components/Avatar';

const AvatarScreen: React.FC = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [activeMod, setActiveMod] = useState<number>(0);

  // Mod icons mock paths
  const icons = [
    // body
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path><path d="M19 12h-4l-3-6-3 6H5v2h4l1.5 8h3L15 14h4v-2z"></path></svg>,
    // chest
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="6" width="16" height="8" rx="4" ry="4"></rect><path d="M4 10h16"></path></svg>,
    // waist
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="8" width="12" height="8" rx="2" ry="2"></rect><path d="M6 12h12"></path></svg>,
    // exact bottom/pants
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="8" width="14" height="8" rx="3" ry="3"></rect><path d="M5 12h14"></path></svg>
  ];

  return (
    <div className="screen screen--avatar" id="avatar-screen" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="screen__header" style={{ marginBottom: 12, textAlign: 'center' }}>
        <h2 className="screen__title" style={{ color: colors.text, fontSize: 20, fontWeight: 800 }}>Set up your avatar</h2>
        <p className="screen__subtitle" style={{ color: colors.textSecondary, fontSize: 13, margin: '8px auto', maxWidth: 260 }}>
          Recreate your body shape as much as possible.
        </p>
      </div>

      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <div style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar gender="male" />
            
            {/* The dotted outline representing the body bounds */}
            <div style={{ position: 'absolute', top: '15%', bottom: '20%', left: '15%', right: '15%', border: '2px dotted #ccc', borderRadius: '50%', zIndex: -1 }}></div>
            
            {/* 
              State 0 activeMod: Top Arc Slider
              Figma Image 3 shows top arc is solid black with a knob in the middle.
            */}
            {activeMod === 0 && (
              <div style={{ position: 'absolute', top: '15%', width: '40%', height: '2px', background: '#000', borderRadius: '50% 50% 0 0', border: '1px solid #000' }}>
                 <div style={{ position: 'absolute', left: '50%', top: -5, transform: 'translateX(-50%)', width: 12, height: 12, borderRadius: '50%', background: '#fff', border: '2px solid #ccc' }}></div>
              </div>
            )}

            {/* 
              State 1 activeMod: Chest Slider
              Figma Image 4 shows a straight horizontal slider exiting from the right side of the chest towards the edge of the circle.
            */}
            {activeMod === 1 && (
              <div style={{ position: 'absolute', right: '15%', top: '35%', width: '25%', height: '8px', background: 'linear-gradient(90deg, transparent, #eee)', borderRadius: 4 }}>
                <div style={{ position: 'absolute', right: 0, top: -2, width: 12, height: 12, borderRadius: '50%', background: '#fff', border: '2px solid #ccc' }}></div>
              </div>
            )}
         </div>

         {/* Sidebar mods */}
         <div style={{ position: 'absolute', right: 0, top: '10%', bottom: '10%', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {icons.map((icon, idx) => (
              <button
                key={idx}
                onClick={() => setActiveMod(idx)}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: activeMod === idx ? '#F5F5F5' : 'transparent',
                  border: 'none',
                  color: activeMod === idx ? '#000' : '#BBB',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {icon}
              </button>
            ))}
         </div>
         
         <button 
           style={{ 
             position: 'absolute', 
             bottom: 12, 
             left: 0, 
             display: 'flex', 
             flexDirection: 'column', 
             alignItems: 'center', 
             gap: 4, 
             background: 'none', 
             border: 'none', 
             color: colors.textSecondary, 
             cursor: 'pointer' 
           }}
           onClick={() => setActiveMod(0)}
         >
           <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
           </div>
           <span style={{ fontSize: 10, fontWeight: 700 }}>Reset</span>
         </button>
      </div>




    </div>
  );
};

export default AvatarScreen;
