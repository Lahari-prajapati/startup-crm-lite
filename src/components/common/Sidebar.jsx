import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Rocket, LogOut, User } from 'lucide-react';
import LightModeToggle from './LightModeToggle';

/**
 * Sidebar component provides primary navigation.
 * Responsive behavior:
 * - Mobile (< md): Bottom navigation bar with icons only.
 * - Tablet (md): Left sidebar (w-20) with compact icons/labels.
 * - Desktop (lg): Left sidebar (w-64) with full labels.
 *
 * @returns {React.JSX.Element} Responsive navigation container.
 */
function Sidebar() {
  const navItems = [
    { path: '/', label: 'Dashboard', subLabel: 'Overview & Metrics', icon: LayoutDashboard },
    { path: '/leads', label: 'Leads', subLabel: 'Manage Contacts', icon: Users },
    { path: '/analytics', label: 'Analytics', subLabel: 'Growth & Funnels', icon: BarChart3 },
  ];

  return (
    <aside className="fixed z-40 bg-white transition-all duration-300 dark:bg-slate-950 
                      bottom-0 inset-x-0 flex h-20 flex-row items-center justify-around border-t border-slate-200/90 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]
                      md:sticky md:top-0 md:h-screen md:w-20 md:flex-col md:justify-between md:border-r md:border-t-0 md:shadow-sm
                      lg:w-64 dark:border-slate-800">
      
      {/* Top half (Desktop/Tablet) or Hidden (Mobile) */}
      <div className="hidden flex-col gap-8 px-3 py-6 md:flex lg:px-4">
        
        {/* Brand logo banner section */}
        <div className="flex items-center justify-center gap-3 px-1 lg:justify-start lg:px-2">
          <Rocket className="h-7 w-7 text-blue-600 dark:text-blue-500 shrink-0" />
          <span className="hidden text-xl font-extrabold tracking-tight text-slate-900 lg:inline dark:text-white">
            CRM<span className="text-blue-600 dark:text-blue-500">Lite</span>
          </span>
        </div>

        {/* Navigation group container (Desktop/Tablet) */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={`desk-${item.path}`}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1.5 rounded-xl py-3 transition-all duration-200 lg:flex-row lg:justify-start lg:px-4 lg:py-3.5 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/60 dark:hover:text-slate-100'
                  }`
                }
              >
                <Icon className="h-5.5 w-5.5 shrink-0" />
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-[10px] font-bold lg:text-sm">{item.label}</span>
                  <span className="hidden text-[10px] font-medium text-slate-400 dark:text-slate-500 lg:inline">
                    {item.subLabel}
                  </span>
                </div>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Navigation group container (Mobile Bottom Bar) */}
      <nav className="flex w-full flex-row items-center justify-around px-2 pb-2 pt-1 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={`mob-${item.path}`}
              to={item.path}
              className={({ isActive }) =>
                `flex min-h-[44px] min-w-[64px] flex-col items-center justify-center gap-1 rounded-2xl p-2 transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/60 dark:hover:text-slate-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors ${isActive ? 'bg-blue-100/60 dark:bg-blue-900/40' : ''}`}>
                    <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  {/* Text hidden on mobile as per requirement "icons only" but we can show tiny label if active for UX. Let's strictly follow requirement: icons only. Wait, material design shows text, but prompt says "Mobile: bottom navigation bar with icons only". I will stick to icons only to perfectly match requirements. */}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section: user profile summary, theme toggle, and system logout action (Hidden on Mobile) */}
      <div className="hidden flex-col gap-2 border-t border-slate-100 p-3 md:flex lg:p-4 dark:border-slate-900">
        
        {/* Theme Toggle Container */}
        <div className="mb-2 flex justify-center lg:justify-start lg:px-2">
          <LightModeToggle />
        </div>

        {/* Profile Card details flex */}
        <div className="flex items-center justify-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-650 dark:bg-slate-900 dark:text-slate-400">
              <User className="h-4.5 w-4.5" />
            </div>
            <div className="hidden flex-col lg:flex">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Alex Johnson</span>
              <span className="text-xs font-medium text-slate-400">Founder</span>
            </div>
          </div>
          
          <button className="hidden rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 lg:inline-flex dark:hover:bg-red-950/30 dark:hover:text-red-400" aria-label="Log Out">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;
