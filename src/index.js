import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ThemeProvider } from './context/ThemeContext';
import { WeatherProvider } from './context/WeatherContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <WeatherProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </WeatherProvider>
  </React.StrictMode>
);
