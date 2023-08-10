import React, { useContext } from 'react';

import ThemeContext from './context/ThemeContext';

import Additional from './components/Additional/Additional';
import Main from './components/Main/Main';

import './styles/App.css';
import './styles/themes/light-theme.css';

function App() {
  const { darkTheme } = useContext(ThemeContext);
  const themeClass = darkTheme ? 'dark-theme' : 'light-theme';

  return (
    <main className={`content ${themeClass}`}>
      <Main />
      <Additional />
    </main>
  );
}

export default App;
