/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * @typedef {Object} ThemeContextValue
 * @property {boolean} isDarkMode
 * @property {() => void} toggleTheme
 */

export const ThemeContext = createContext(null);

/**
 * Provides theme state and actions to the application.
 *
 * @param {{ children: React.ReactNode }} props - Provider props.
 * @returns {React.JSX.Element} Theme context provider.
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  /**
   * Toggles dark mode on or off.
   *
   * @returns {void}
   */
  const toggleTheme = useCallback(() => {
    setIsDarkMode((currentValue) => !currentValue);
  }, []);

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleTheme,
    }),
    [isDarkMode, toggleTheme],
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
