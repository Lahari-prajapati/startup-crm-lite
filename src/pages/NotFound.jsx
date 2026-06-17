import { Link } from 'react-router-dom'; // Import Link from react-router-dom to navigate without reloading.
import { AlertCircle, ArrowLeft } from 'lucide-react'; // Import icons from Alert and Back buttons.

/**
 * NotFound component displays when a requested route pattern does not match
 * any defined application paths (404 page).
 */
function NotFound() {
  return (
    // Centered outer container with flex alignment, taking full height.
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-slate-50/50 px-4 text-center dark:bg-slate-900/10">
      
      {/* Container holding layout assets and details */}
      <div className="max-w-md">
        
        {/* Modern animated icon badge */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 shadow-sm animate-bounce dark:bg-amber-950/20 dark:text-amber-500">
          <AlertCircle className="h-10 w-10" />
        </div>

        {/* Big error status code title */}
        <h1 className="mt-6 text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">404</h1>
        
        {/* Error message title */}
        <h2 className="mt-2 text-xl font-bold text-slate-800 dark:text-slate-100">Page Not Found</h2>
        
        {/* Explanation message */}
        <p className="mt-2 text-sm text-slate-550 dark:text-slate-400">
          The requested page might have been moved, deleted, or does not exist. Please check the URL or return home.
        </p>

        {/* Action Button Section wrapper */}
        <div className="mt-8">
          {/* Link component to routing home */}
          <Link
            to="/" // Link to home path.
            // Button visual styles with hover and transition properties.
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/30 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>

      </div>

    </div>
  );
}

// Export the NotFound component.
export default NotFound;
