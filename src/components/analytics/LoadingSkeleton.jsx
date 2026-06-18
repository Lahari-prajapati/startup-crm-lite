import { memo } from 'react';

/**
 * Skeleton card mimics the KPI card layout during loading.
 */
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-800/50">
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="mt-4 h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-700" />
      <div className="mt-3 h-3 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

/**
 * Skeleton chart mimics the chart card layout during loading.
 */
function SkeletonChart({ tall = false }) {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-800/50">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="h-4 w-36 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="mt-2 h-3 w-48 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
      <div className={`rounded-xl bg-slate-100 dark:bg-slate-700/50 ${tall ? 'h-72' : 'h-56'}`} />
    </div>
  );
}

/**
 * LoadingSkeleton renders a full-page loading state
 * that mirrors the Analytics dashboard layout.
 *
 * @returns {React.JSX.Element} Animated skeleton placeholder.
 */
function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
        <div className="mt-2 h-4 w-96 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>

      {/* Filter skeleton */}
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700" />
        ))}
      </div>

      {/* KPI cards skeleton */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SkeletonChart />
        <SkeletonChart />
        <SkeletonChart />
        <SkeletonChart />
        <SkeletonChart tall />
        <SkeletonChart />
      </div>
    </div>
  );
}

export default memo(LoadingSkeleton);
