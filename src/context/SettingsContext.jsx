import React, { createContext, useState, useEffect, useContext } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('quizTheme') || 'light');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('quizFontSize') || 'medium');

  useEffect(() => {
    localStorage.setItem('quizTheme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('quizFontSize', fontSize);
    let sizeValue = '16px'; // medium default
    if (fontSize === 'small') sizeValue = '14px';
    if (fontSize === 'large') sizeValue = '18px';
    document.documentElement.style.fontSize = sizeValue;
  }, [fontSize]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </SettingsContext.Provider>
  );
};
