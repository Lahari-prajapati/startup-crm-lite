/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * @typedef {Object} ThemeContextValue
 * @property {boolean} isLightMode
 * @property {() => void} toggleTheme
 */

export const ThemeContext = createContext(null);

const STORAGE_KEY = 'crm_theme_preference';

/**
 * Provides theme state and actions to the application.
 *
 * @param {{ children: React.ReactNode }} props - Provider props.
 * @returns {React.JSX.Element} Theme context provider.
 */
export function ThemeProvider({ children }) {
  // Initialize from localStorage or default to false (Dark Mode)
  const [isLightMode, setIsLightMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        return saved === 'light';
      }
      // Check system preference if no saved preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return true;
      }
    } catch (e) {
      console.warn('Failed to read theme from localStorage', e);
    }
    return false; // default
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isLightMode) {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [isLightMode]);

  /**
   * Toggles light mode on or off.
   *
   * @returns {void}
   */
  const toggleTheme = useCallback(() => {
    setIsLightMode((currentValue) => {
      const newValue = !currentValue;
      try {
        localStorage.setItem(STORAGE_KEY, newValue ? 'light' : 'dark');
      } catch (e) {
        console.warn('Failed to save theme to localStorage', e);
      }
      return newValue;
    });
  }, []);

  const value = useMemo(
    () => ({
      isLightMode,
      toggleTheme,
    }),
    [isLightMode, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Reads the ThemeContext value.
 *
 * @returns {ThemeContextValue} Theme state and actions.
 * @throws {Error} When used outside ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider.');
  }

  return context;
}
