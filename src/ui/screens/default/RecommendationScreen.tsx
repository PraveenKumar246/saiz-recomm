import React from 'react';
import AvatarIcon from '../../../assets/avatar.svg';

const RecommendationScreen: React.FC = () => {
  return (
    <div className="screen screen--recommendation" style={{ padding: '28px 24px 16px' }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, letterSpacing: '-0.8px' }}>
          //SAIZ Recommendation
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div style={{
          width: '100%',
          maxWidth: '320px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
          padding: '22px 18px',
          borderRadius: '26px',
          background: '#FFFFFF',
          boxShadow: '0 16px 45px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{
            width: '96px',
            height: '96px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '22px',
            border: '1px solid #E7E7E7',
            background: '#FAFAFA',
            color: '#111111',
            fontSize: '42px',
            fontWeight: 900,
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
          }}>
            L
          </div>

          <div style={{
            textAlign: 'center',
            color: '#3A3A3A',
            fontSize: '15px',
            fontWeight: 500,
            lineHeight: 1.6,
            maxWidth: '280px'
          }}>
            We believe your expected size M will be too small. We recommend going a size up.
          </div>
        </div>

        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '18px',
          alignItems: 'flex-start'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '20px',
              border: '1px solid #F1F1F1',
              background: '#FFFFFF',
              color: '#111111',
              fontWeight: 600,
              cursor: 'default'
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: '#F8F8F8',
                color: '#111111',
                fontSize: '16px'
              }}>👤</span>
              <span style={{ textAlign: 'left', fontSize: '13px' }}>Change avatar</span>
            </button>

            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '20px',
              border: '1px solid #F1F1F1',
              background: '#FFFFFF',
              color: '#111111',
              fontWeight: 600,
              cursor: 'default'
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: '#F8F8F8',
                color: '#111111',
                fontSize: '16px'
              }}>📏</span>
              <span style={{ textAlign: 'left', fontSize: '13px' }}>Enter your measurements</span>
            </button>
          </div>

          <div style={{
            flex: 1,
            maxWidth: '320px',
            position: 'relative',
            borderRadius: '32px',
            overflow: 'hidden',
            background: '#FFFFFF',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.12)',
            padding: '32px 24px 20px'
          }}>
            <img
              src={AvatarIcon}
              alt="Avatar"
              style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
            />

            <div style={{
              position: 'absolute',
              top: '32%',
              right: '12%',
              transform: 'translateY(-50%)',
              padding: '8px 14px',
              borderRadius: '999px',
              background: '#F08A6A',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              boxShadow: '0 8px 20px rgba(240, 138, 106, 0.22)'
            }}>
              too tight
            </div>
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '12%',
              padding: '8px 14px',
              borderRadius: '999px',
              background: '#6ACF9A',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              boxShadow: '0 8px 20px rgba(106, 207, 154, 0.22)'
            }}>
              fits right
            </div>
            <div style={{
              position: 'absolute',
              top: '65%',
              right: '12%',
              padding: '8px 14px',
              borderRadius: '999px',
              background: '#6ACF9A',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              boxShadow: '0 8px 20px rgba(106, 207, 154, 0.22)'
            }}>
              fits right
            </div>
          </div>
        </div>

        <div style={{
          width: '100%',
          maxWidth: '420px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 24px 0',
          marginTop: '6px',
          borderTop: '1px solid #ECECEC',
          color: '#7C7C7C',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.4px'
        }}>
          <span>← runs smaller</span>
          <span>runs larger →</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationScreen;
