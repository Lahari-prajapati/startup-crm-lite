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
      
      {/* Outer viewport container with full page background */}
      <div className="min-h-screen bg-slate-100 dark:bg-[#07090e] transition-colors duration-200">
        
        {/* Main application container centered on screens > 1440px */}
        <div className="mx-auto flex min-h-screen w-full flex-col bg-slate-50 text-slate-800 font-roboto antialiased dark:bg-[#0b0e14] dark:text-slate-200 md:flex-row min-[1440px]:max-w-[1440px] min-[1440px]:shadow-2xl min-[1440px]:border-x min-[1440px]:border-slate-200/50 dark:min-[1440px]:border-slate-800/50">
          
          {/* Mobile Top Header (Hidden on md+) */}
          <MobileHeader />

          {/* Responsive Sidebar (Bottom nav on mobile, left sidebar on md+) */}
          <Sidebar />
          
          {/* Main section: offset dynamically to prevent overlap with fixed navigation elements */}
          {/* Mobile: pt-16 (for top header), pb-20 (for bottom nav) */}
          {/* Tablet/Desktop: in flow, no padding left offset needed */}
          <main className="flex-1 pt-16 pb-20 md:pb-0 md:pt-0">
            
            <div className="min-h-screen">
              <AppRoutes />
            </div>

          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
