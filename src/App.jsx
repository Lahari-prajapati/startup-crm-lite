import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/common/Sidebar';
import MobileHeader from './components/common/MobileHeader';
import AppRoutes from './routes';

/**
 * Main application component.
 * Configures the router provider and handles layouts with the left Sidebar and Mobile Header.
 */
function App() {
  return (
    <BrowserRouter>
      {/* Toast notifications container */}
      <Toaster position="top-right" reverseOrder={false} toastOptions={{ className: 'dark:bg-slate-900 dark:text-white dark:border dark:border-slate-800' }} />
      
      {/* Base container using flexbox layout */}
      <div className="flex min-h-screen bg-slate-50 text-slate-800 font-roboto antialiased dark:bg-[#0b0e14] dark:text-slate-200">
        
        {/* Mobile Top Header (Hidden on md+) */}
        <MobileHeader />

        {/* Responsive Sidebar (Bottom nav on mobile, left sidebar on md+) */}
        <Sidebar />
        
        {/* Main section: offset dynamically to prevent overlap with fixed navigation elements */}
        {/* Mobile: pt-16 (for top header), pb-20 (for bottom nav) */}
        {/* Tablet (md): pl-20 (for thin sidebar), remove top/bottom padding */}
        {/* Desktop (lg): pl-64 (for full sidebar) */}
        <main className="flex-1 pt-16 pb-20 md:pb-0 md:pt-0 md:pl-20 lg:pl-64">
          
          <div className="min-h-screen">
            <AppRoutes />
          </div>

        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
