import React, { Suspense, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/store';
import { closeModal, setScreen } from '../../state/slices/screenSlice';
import { ScreenFactory } from '../../domain/factories/ScreenFactory';
import { useTheme } from '../context/ThemeContext';
import ThemeSwitch from '../components/ThemeSwitch';
import SaizLogo from '../../assets/saiz_logo.svg';
import InfoSrc from '../../assets/bi_info.svg';
import LeftArrow from '../../assets/left_arrow.svg';
import CloseIcon from '../../assets/close_icon.svg';
import ShoppingBagIcon from '../../assets/shop_now.svg';

const WidgetModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modalOpen, currentScreen } = useAppSelector((s) => s.screen);
  const config = useAppSelector((s) => s.product.config);
  const { colors, mode } = useTheme();

  // This filter inverts black icons to white for dark mode
  const iconFilterStyle = mode === 'dark' ? { filter: 'invert(1)' } : {};

  const ScreenComponent = useMemo(() => {
    const brandCode = config?.brandCode || 'default';
    return ScreenFactory.getScreen(brandCode, currentScreen);
  }, [config?.brandCode, currentScreen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    }
  };

  const getProgress = () => {
    const progressMap: Record<string, number> = {
      welcome: 33,
      info: 66,
      recommendation: 100,
    };
    return progressMap[currentScreen] ?? 0;
  };

  const handleCTA = () => {
    if (currentScreen === 'recommendation') {
      dispatch(closeModal());
    } else {
      dispatch(setScreen('recommendation'));
    }
  };

  const getCTAText = () => {
    return currentScreen === 'recommendation' ?
      <><img alt="" src={ShoppingBagIcon} style={{ ...iconFilterStyle, marginRight: '10px' }} /> Shop now</> : 'Get your size recommendation';
  };

  return (
    <div
      className={`modal-overlay ${modalOpen ? 'modal-overlay--visible' : ''}`}
      onClick={handleOverlayClick}
    >
      <div
        className="modal modal--widget"
        style={{ background: colors.surface, color: colors.text }}
      >
        {/* HEADER */}
        <div className="modal__header modal__header--widget" style={{ borderColor: colors.border }}>
          <div className="modal__header-top">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {currentScreen === 'welcome' ? (
                <div
                  className="modal__icon-btn"
                  onClick={() => dispatch(setScreen('info'))}
                >
                  <img
                    src={InfoSrc}
                    alt="Info"
                    style={iconFilterStyle}
                  />
                </div>
              ) : (
                <div
                  className="modal__icon-btn"
                  onClick={() => dispatch(setScreen('welcome'))}
                >
                  <img
                    src={LeftArrow}
                    alt="Back"
                    style={iconFilterStyle}
                  />
                </div>
              )}
            </div>

            {/* Logo */}
            <img
              src={SaizLogo}
              alt="SAIZ"
              className="modal__logo-img"
              style={iconFilterStyle}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ThemeSwitch />
              <div
                className="modal__icon-btn"
                onClick={() => dispatch(closeModal())}
              >
                <img
                  src={CloseIcon}
                  alt="Close"
                  style={iconFilterStyle}
                />
              </div>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="modal__progress" style={{ background: colors.border }}>
            <div
              className="modal__progress-bar"
              style={{ width: `${getProgress()}%`, background: colors.text }}
            />
          </div>
        </div>

        {/* BODY */}
        <div className="modal__body modal__body--no-padding">
          <Suspense fallback={<div className="spinner" />}>
            <ScreenComponent />
          </Suspense>
        </div>

        {/* FOOTER */}
        <div className="modal__footer-sticky modal__footer--widget">
          <button
            className="modal__cta modal__cta--pill"
            onClick={handleCTA}
            style={{ background: colors.text, color: colors.surface }}
          >
            {getCTAText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetModal;