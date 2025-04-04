import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Navbar from './components/elements/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
  <BrowserRouter>
  <Navbar />
      <App />
  </BrowserRouter>
  </CookiesProvider>
  </React.StrictMode>
);

reportWebVitals();
