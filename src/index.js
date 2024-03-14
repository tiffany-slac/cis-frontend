import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './appRouter';
import reportWebVitals from './reportWebVitals';
import "./services/api.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();
