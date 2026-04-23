import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './state/store';
import { fetchProduct } from './state/slices/productSlice';
import { setBrandCode } from './state/slices/themeSlice';
import { openModal } from './state/slices/screenSlice';
import { ModelContextProvider } from './ui/context/ThemeContext';
import WidgetModal from './ui/modal/WidgetModal';
import type { WidgetConfig } from './domain/models/types';

// ─── Config Reader ──────────────────────────────────────────────────
const readWidgetConfig = (): WidgetConfig | null => {
  const container = document.getElementById('saiz-widget-container');
  if (!container) {
    console.warn('[SAIZ Widget] Container element #saiz-widget-container not found.');
    return null;
  }

  // Capture all data attributes into a clean object
  const allData = { ...container.dataset };
  
  const brandCode = allData.brandcode || '';
  const productCode = allData.productcode || '';
  const visitorId = allData.visitorid || '';
  const language = allData.language || 'en-us';

  if (!brandCode || !productCode) {
    console.error('[SAIZ Widget] Missing required data attributes: brandcode, productcode');
    return null;
  }

  return { 
    brandCode, 
    productCode, 
    visitorId, 
    language,
    metadata: allData 
  };
};

// ─── Inner Widget (needs Redux context) ─────────────────────────────
const WidgetInner: React.FC = () => {
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector((s) => s.product);
  const { modalOpen } = useAppSelector((s) => s.screen);

  useEffect(() => {
    const config = readWidgetConfig();
    if (config) {
      dispatch(fetchProduct(config));
      dispatch(setBrandCode(config.brandCode));
    }
  }, [dispatch]);

  // ── Loading State ──
  if (loading) {
    return (
      <div className="widget-trigger widget-trigger--loading" id="saiz-widget-loading">
        <div className="spinner" />
        <span>Loading SAIZ...</span>
      </div>
    );
  }

  // ── Error State ──
  if (error) {
    return (
      <div className="widget-trigger widget-trigger--error" id="saiz-widget-error">
        <span>⚠️ Unable to load size recommendation</span>
        <p className="widget-trigger__error-detail">{error}</p>
      </div>
    );
  }

  // ── Product Not Active ──
  if (product && !product.isActive) {
    return (
      <div className="widget-trigger widget-trigger--inactive" id="saiz-widget-inactive">
        <span>Sorry for your inconvenience, Product is currently inactive.</span>
      </div>
    );
  }

  // ── Active Product: Show Trigger Button + Modal ──
  if (product && product.isActive) {
    return (
      <>
        {!modalOpen && (
          <button
            className="widget-trigger widget-trigger--active"
            id="saiz-widget-trigger"
            onClick={() => dispatch(openModal())}
          >
            <div className="widget-trigger__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="widget-trigger__text">
              <span className="widget-trigger__label">SAIZ</span>
              <span className="widget-trigger__sublabel">Welcome, Product is Active. Click here to get your size recommendation!</span>
            </div>
            <svg className="widget-trigger__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
        <WidgetModal />
      </>
    );
  }

  return null;
};

// ─── Root App Component ─────────────────────────────────────────────
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ModelContextProvider>
        <WidgetInner />
      </ModelContextProvider>
    </Provider>
  );
};

export default App;
