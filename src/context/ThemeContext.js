import { createContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const initialTheme = localStorage.getItem('theme') === 'dark';
  const [darkTheme, setDarkTheme] = useState(initialTheme);

  const toggleTheme = () => {
    const newTheme = !darkTheme;
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    setDarkTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
