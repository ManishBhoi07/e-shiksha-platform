import React, { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import "./i18n.js";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Suspense fallback="loading">
      <Router>
        <App />
      </Router>
    </Suspense>
  </StrictMode>
);