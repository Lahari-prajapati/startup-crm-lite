// LoadingSpinner component represents a full-screen or container-centered
// animated loading indicator to use as a fallback during React Suspense.
function LoadingSpinner() {
  return (
    // Outer container: takes full width and screen height minus some space for navbar, centering items.
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-slate-50/50 dark:bg-slate-900/50">
      {/* Container for the spinner and text */}
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner ring using Tailwind CSS classes */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-500"></div>
        {/* Subtle loading label text */}
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading resources...</span>
      </div>
    </div>
  );
}

// Export the component as the default export.
export default LoadingSpinner;
