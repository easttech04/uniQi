import React, { useEffect } from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const setTheme = (themeName) => {
    // Remove any existing theme classes
    document.body.className = '';
    // Add the new theme class
    document.body.classList.add(`theme-${themeName}`);
    // Save the theme choice
    localStorage.setItem('theme', themeName);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('light'); // Default theme
    }
  }, []);

  return (
    <div className="theme-switcher">
      <button onClick={() => setTheme('light')} className="theme-btn light" title="Light Theme"></button>
      <button onClick={() => setTheme('dark')} className="theme-btn dark" title="Dark Theme"></button>
      <button onClick={() => setTheme('corporate')} className="theme-btn corporate" title="Corporate Theme"></button>
    </div>
  );
};

export default ThemeSwitcher;
