import { NavLink } from 'react-router-dom'; // Import NavLink to enable vertical navigation links with active routing indicators.
import { LayoutDashboard, Users, BarChart3, Rocket, LogOut, User } from 'lucide-react'; // Import icons from Lucide for branding and navigation links.

/**
 * Sidebar component provides primary left-aligned application navigation.
 * Renders a sticky vertical navigation menu with user profiles and actions.
 */
function Sidebar() {
  // Navigation tabs configuration array.
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard }, // Path to Dashboard page.
    { path: '/leads', label: 'Leads', icon: Users }, // Path to Leads management.
    { path: '/analytics', label: 'Analytics', icon: BarChart3 }, // Path to Analytics view.
  ];

  return (
    // Sidebar wrapper: fixed height viewport, borders on the right, glassmorphism dark-mode ready style.
    <aside className="fixed inset-y-0 left-0 z-40 flex h-screen w-16 flex-col justify-between border-r border-slate-25/90 bg-white shadow-sm transition-all duration-300 sm:w-64 dark:border-slate-800 dark:bg-slate-950">
      
      {/* Top half container grouping the logo and vertical items */}
      <div className="flex flex-col gap-8 px-3 py-6 sm:px-4">
        
        {/* Brand logo banner section */}
        <div className="flex items-center gap-3 px-1 sm:px-2">
          {/* Brand icon with glowing blue tint */}
          <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-500" />
          {/* Responsive Brand Text - hidden on mobile viewports */}
          <span className="hidden text-lg font-bold tracking-tight text-slate-900 sm:inline dark:text-white">
            CRM<span className="text-blue-600 dark:text-blue-500">Lite</span>
          </span>
        </div>

        {/* Navigation group container */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            // Dynamically evaluate target icon.
            const Icon = item.icon;
            
            return (
              // Navigation Link component.
              <NavLink
                key={item.path} // Unique react mapping key.
                to={item.path} // Route navigation target.
                // Dynamic styling logic based on current route.
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl py-3.5 transition-all duration-200 sm:px-4 justify-center sm:justify-start ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400' // Highlight color sets for selected route.
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900/60 dark:hover:text-slate-100' // Idle items colors.
                  }`
                }
              >
                {/* Visual Icon */}
                <Icon className="h-5 w-5 shrink-0" />
                {/* Responsive Navigation label text */}
                <span className="hidden text-sm font-semibold sm:inline">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom section: user profile summary and system logout action */}
      <div className="border-t border-slate-100 p-3 sm:p-4 dark:border-slate-900">
        
        {/* Profile Card details flex */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* User Circle indicator */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-650 dark:bg-slate-900 dark:text-slate-400">
              <User className="h-4 w-4" />
            </div>
            {/* User details labels - hidden on mobile */}
            <div className="hidden flex-col sm:flex">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Alex Johnson</span>
              <span className="text-[10px] text-slate-400">Founder</span>
            </div>
          </div>
          
          {/* Logout Action trigger button */}
          <button className="hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-red-500 sm:inline dark:hover:bg-slate-900">
            <LogOut className="h-4.5 w-4.5" />
          </button>
        </div>

      </div>

    </aside>
  );
}

// Export the Sidebar component as the default export.
export default Sidebar;
