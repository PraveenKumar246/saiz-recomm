import React, { Suspense, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../state/store';
import { closeModal, setScreen } from '../../state/slices/screenSlice';
import { ScreenFactory } from '../../domain/factories/ScreenFactory';
import InfoSrc from '../../assets/bi_info.svg';
import SaizLogo from '../../assets/saiz_logo.svg';
import LeftArrow from '../../assets/left_arrow.svg';
import CloseIcon from '../../assets/close_icon.svg';

const WidgetModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modalOpen, currentScreen } = useAppSelector((s) => s.screen);
  const config = useAppSelector((s) => s.product.config);

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
    if (currentScreen === 'welcome') return 33;
    if (currentScreen === 'avatar') return 66;
    if (currentScreen === 'recommendation') return 100;
    return 50;
  };

  const handleCTA = () => {
    if (currentScreen === 'welcome') {
      dispatch(setScreen('avatar'));
    } else if (currentScreen === 'avatar') {
      dispatch(setScreen('recommendation'));
    } else {
      dispatch(closeModal());
    }
  };

  return (
    <div
      className={`modal-overlay ${modalOpen ? 'modal-overlay--visible' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="modal modal--widget">

        {/* HEADER */}
        <div className="modal__header modal__header--widget">
          <div className="modal__header-top">

            {/* Left Icon */}
            <div
              className="modal__icon-btn"
              onClick={() =>
                dispatch(setScreen(currentScreen === 'welcome' ? 'info' : 'welcome'))
              }
            >
              <img
                src={currentScreen === 'welcome' ? InfoSrc : LeftArrow}
                alt="nav"
              />
            </div>

            {/* Logo */}
            <img src={SaizLogo} alt="SAIZ" className="modal__logo-img" />

            {/* Close */}
            <div
              className="modal__icon-btn"
              onClick={() => dispatch(closeModal())}
            >
              <img src={CloseIcon} alt="Close" />
            </div>
          </div>

          {/* Progress */}
          <div className="modal__progress">
            <div
              className="modal__progress-bar"
              style={{ width: `${getProgress()}%` }}
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
          <button className="modal__cta modal__cta--pill" onClick={handleCTA}>
            {currentScreen === 'recommendation'
              ? 'Shop now'
              : 'Get your size recommendation'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetModal;