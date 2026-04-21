import React, { Suspense, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAppSelector, useAppDispatch } from '../../state/store';
import { closeModal } from '../../state/slices/screenSlice';
import { ScreenFactory } from '../../domain/factories/ScreenFactory';
import ThemeSwitch from '../components/ThemeSwitch';

/**
 * WidgetModal
 * The main modal container that holds the two screens.
 * Uses the ScreenFactory to resolve brand-specific screens.
 */
const WidgetModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { modalOpen, currentScreen } = useAppSelector((s) => s.screen);
  const product = useAppSelector((s) => s.product.product);
  const config = useAppSelector((s) => s.product.config);

  // Get brand-specific screen component from the factory
  const ScreenComponent = useMemo(() => {
    const brandCode = config?.brandCode || 'default';
    return ScreenFactory.getScreen(brandCode, currentScreen);
  }, [config?.brandCode, currentScreen]);

  if (!modalOpen || !product) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    }
  };

  return (
    <div
      className={`modal-overlay ${modalOpen ? 'modal-overlay--visible' : ''}`}
      id="widget-modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className="modal"
        id="widget-modal"
        style={{
          background: colors.surface,
          borderColor: colors.border,
        }}
        role="dialog"
        aria-modal="true"
        aria-label="SAIZ Size Recommendation"
      >
        {/* Modal Header */}
        <div
          className="modal__header"
          style={{ borderBottomColor: colors.border }}
        >
          <div className="modal__brand">
            <span className="modal__logo" style={{ color: colors.text, fontWeight: 900 }}>
              SAIZ
            </span>
          </div>
          <div className="modal__header-actions">
            <ThemeSwitch />
            <button
              id="modal-close-btn"
              className="modal__close"
              onClick={() => dispatch(closeModal())}
              aria-label="Close modal"
              style={{ color: colors.textSecondary }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal__body">
          {/* Screen Progress Indicator */}
          <div className="modal__progress">
            <div
              className={`modal__progress-step ${currentScreen === 'input' ? 'modal__progress-step--active' : 'modal__progress-step--done'}`}
              style={{
                background: currentScreen === 'input' ? colors.accent : colors.success,
              }}
            />
            <div
              className="modal__progress-line"
              style={{ background: colors.border }}
            >
              <div
                className="modal__progress-line-fill"
                style={{
                  background: colors.accent,
                  width: currentScreen === 'recommendation' ? '100%' : '0%',
                }}
              />
            </div>
            <div
              className={`modal__progress-step ${currentScreen === 'recommendation' ? 'modal__progress-step--active' : ''}`}
              style={{
                background: currentScreen === 'recommendation' ? colors.accent : colors.border,
              }}
            />
          </div>

          {/* Render Active Screen */}
          <Suspense
            fallback={
              <div className="modal__loading" style={{ color: colors.textSecondary }}>
                <div className="spinner" />
                Loading...
              </div>
            }
          >
            <ScreenComponent />
          </Suspense>
        </div>

        {/* Modal Footer */}
        <div
          className="modal__footer"
          style={{ borderTopColor: colors.border, color: colors.textSecondary }}
        >
          <span className="modal__footer-text">
            Powered by <strong style={{ color: colors.text }}>SAIZ</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WidgetModal;
