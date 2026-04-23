import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const InfoScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <div className="screen screen--info" id="info-screen">
      <div className="screen__header" style={{ marginBottom: 24, marginTop: 30 }}>
        <h2 className="screen__title" style={{ color: colors.text, fontSize: 24, fontWeight: 600, textAlign: 'left', letterSpacing: '-0.5px' }}>
          How //SAIZ works
        </h2>
      </div>

      <div className="info-cards">
        <div className="info-card form-card" style={{ padding: 16, borderRadius: 20, position: 'relative' }}>
          <div className="info-card__body">
            <p style={{ color: colors.text, fontWeight: 500, lineHeight: 1.5, fontSize: 14 }}>
              On entering these details, we can calculate your probable size, which we will then compare with the sizes of the selected article in order to recommend the best size for you.
            </p>
          </div>
          <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
            <span className="badge">1</span>
          </div>
        </div>

        <div className="info-card form-card" style={{ padding: 16, borderRadius: 20, position: 'relative' }}>
          <div className="info-card__body">
            <p style={{ color: colors.text, fontWeight: 500, lineHeight: 1.5, fontSize: 14 }}>
              The information you provide will remain anonymous and will only be used for recommending your size.
            </p>
          </div>
          <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
            <span className="badge">2</span>
          </div>
        </div>

        <div className="info-card form-card" style={{ padding: 16, borderRadius: 20, position: 'relative' }}>
          <div className="info-card__body">
            <p style={{ color: colors.text, fontWeight: 500, lineHeight: 1.5, fontSize: 14 }}>
              Help us to cut down the number of returns and make a positive contribution towards the environment.
            </p>
          </div>
          <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
            <span className="badge">3</span>
          </div>
        </div>
      </div>


    </div>
  );
};

export default InfoScreen;
