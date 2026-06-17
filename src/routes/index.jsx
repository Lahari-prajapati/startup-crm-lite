import { lazy, Suspense } from 'react'; // Import lazy for code-splitting, and Suspense for loading fallbacks.
import { Routes, Route } from 'react-router-dom'; // Import React Router components for mapping URL segments to pages.
import LoadingSpinner from '../components/common/LoadingSpinner'; // Import LoadingSpinner to show while chunks are loading.

// Lazy load the Dashboard page to optimize initial bundle size.
const Dashboard = lazy(() => import('../pages/Dashboard'));
// Lazy load the Leads page so its chunk is fetched only on navigation.
const Leads = lazy(() => import('../pages/Leads'));
// Lazy load the Analytics page for performance benefits.
const Analytics = lazy(() => import('../pages/Analytics'));
// Lazy load the NotFound (404) page component.
const NotFound = lazy(() => import('../pages/NotFound'));

/**
 * AppRoutes component defines the structure of application paths.
 * All routes are wrapped inside Suspense for loading state management.
 */
function AppRoutes() {
  return (
    // Wrap entire routing segment in Suspense to resolve lazy chunks gracefully.
    <Suspense fallback={<LoadingSpinner />}>
      {/* Routes container matches current browser location path to a child Route. */}
      <Routes>
        
        {/* Route mapping root path '/' to lazy-loaded Dashboard page */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Route mapping path '/leads' to lazy-loaded Lead Management page */}
        <Route path="/leads" element={<Leads />} />
        
        {/* Route mapping path '/analytics' to lazy-loaded Analytics page */}
        <Route path="/analytics" element={<Analytics />} />
        
        {/* Wildcard Route mapping all other unregistered paths to NotFound 404 page */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  );
}

// Export the routing component as default.
export default AppRoutes;
