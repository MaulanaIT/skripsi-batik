import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';

const initialState = typeof window !== "undefined" && window && window.INITIAL_STATE;

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);

reportWebVitals();
