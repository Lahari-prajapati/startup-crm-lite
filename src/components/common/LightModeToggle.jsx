import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * LightModeToggle provides a UI switch to toggle between light and dark mode.
 * Features an animated sliding pill and icon transitions.
 *
 * @returns {React.JSX.Element} Theme toggle switch.
 */
export default function LightModeToggle() {
  const { isLightMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
        isLightMode ? 'bg-blue-100' : 'bg-slate-700'
      }`}
      role="switch"
      aria-checked={isLightMode}
      aria-label="Toggle light mode"
    >
      <span className="sr-only">Toggle light mode</span>
      
      {/* Sliding Pill */}
      <span
        className={`pointer-events-none absolute left-1 flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${
          isLightMode ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isLightMode ? (
          <Sun className="h-3.5 w-3.5 text-blue-600" strokeWidth={2.5} />
        ) : (
          <Moon className="h-3.5 w-3.5 text-slate-700" strokeWidth={2.5} />
        )}
      </span>

      {/* Background Icons (visible when pill slides away) */}
      <span className="absolute inset-0 flex h-full w-full items-center justify-between px-2 text-xs transition-opacity">
        <Moon
          className={`h-3 w-3 text-slate-400 transition-opacity duration-300 ${
            isLightMode ? 'opacity-100' : 'opacity-0'
          }`}
          strokeWidth={2.5}
        />
        <Sun
          className={`h-3 w-3 text-blue-400 transition-opacity duration-300 ${
            isLightMode ? 'opacity-0' : 'opacity-100'
          }`}
          strokeWidth={2.5}
        />
      </span>
    </button>
  );
}
