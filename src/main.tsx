import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Mount to the saiz-widget-container if it exists, otherwise fallback to #root
const widgetContainer = document.getElementById('saiz-widget-container');
const rootElement = widgetContainer || document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('[SAIZ Widget] No mount point found. Add #saiz-widget-container or #root to the DOM.');
}
