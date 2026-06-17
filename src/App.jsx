import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter to enable HTML5 history API client-side routing.
import { Toaster } from 'react-hot-toast'; // Import Toast notifications provider.
import Sidebar from './components/common/Sidebar'; // Import the new Sidebar component to render on the left.
import AppRoutes from './routes'; // Import route paths structure mappings.

/**
 * Main application component.
 * Configures the router provider and handles layouts with the left Sidebar.
 */
function App() {
  return (
    // Wrap entire app tree inside BrowserRouter to provide routing context.
    <BrowserRouter>
      {/* Toast notifications container */}
      <Toaster position="top-right" reverseOrder={false} toastOptions={{ className: 'dark:bg-slate-950 dark:text-white' }} />
      
      {/* Base container using flexbox layout */}
      <div className="flex min-h-screen bg-slate-55/40 text-slate-800 font-roboto antialiased transition-colors duration-250 dark:bg-slate-900 dark:text-slate-205">
        
        {/* Render Sidebar fixed on the left hand side */}
        <Sidebar />
        
        {/* Main section: offset dynamically to prevent overlap with the fixed sidebar (w-16 on mobile, w-64 on desktop) */}
        <main className="flex-1 pl-16 sm:pl-64">
          
          {/* Inner container to hold page routes view */}
          <div className="min-h-screen">
            {/* Mount routes component containing page views */}
            <AppRoutes />
          </div>

        </main>

      </div>

    </BrowserRouter>
  );
}

// Export App component.
export default App;
