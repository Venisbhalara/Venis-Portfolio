// ── GSAP must be imported FIRST so plugins register before any component mounts
import './lib/gsap.config';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>,
);
