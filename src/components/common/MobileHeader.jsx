import { useState, useEffect } from 'react';
import { Menu, X, Rocket, User, LogOut } from 'lucide-react';
import LightModeToggle from './LightModeToggle';

/**
 * MobileHeader component provides a top navigation bar for mobile viewports.
 * Contains the brand logo and a hamburger menu that toggles a slide-out drawer
 * for secondary actions (theme toggle, profile, logout).
 *
 * @returns {React.JSX.Element} The rendered mobile header and drawer.
 */
export default function MobileHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  // Close drawer when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen]);

  return (
    <>
      {/* Top Header Bar (Fixed) */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200/90 bg-white/80 px-4 backdrop-blur-md transition-colors md:hidden dark:border-slate-800/90 dark:bg-slate-950/80">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-500" />
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            CRM<span className="text-blue-600 dark:text-blue-500">Lite</span>
          </span>
        </div>

        {/* Hamburger Button - Ensure 44x44 minimum tap target */}
        <button
          onClick={toggleDrawer}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Toggle menu drawer"
          aria-expanded={isDrawerOpen}
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity md:hidden"
          onClick={toggleDrawer}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 transform border-l border-slate-200 bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden dark:border-slate-800 dark:bg-slate-950 ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Settings</h2>
          <button
            onClick={toggleDrawer}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
            aria-label="Close menu drawer"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {/* Profile Section */}
          <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-900">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <User className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Alex Johnson</span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Founder</span>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 p-4 dark:border-slate-800/80">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Theme Preference</span>
            <LightModeToggle />
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Logout Action */}
          <button className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-900/20 dark:hover:text-red-400">
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-semibold">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
