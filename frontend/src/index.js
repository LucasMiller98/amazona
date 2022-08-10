import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from './components/error-boundary'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
