import { memo } from 'react';
import { BarChart3, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * EmptyAnalyticsState displays a friendly prompt when no lead data exists.
 * Encourages the user to add their first lead to begin tracking analytics.
 *
 * @returns {React.JSX.Element} Empty state card with CTA button.
 */
function EmptyAnalyticsState() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-20 text-center backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/30">
        {/* Icon container with gradient background */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/20">
          <BarChart3 className="h-10 w-10 text-blue-500 dark:text-blue-400" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          No analytics available yet
        </h2>

        {/* Description */}
        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Add your first lead to start tracking business performance. Your analytics dashboard will
          show lead generation, conversion trends, revenue insights, and more.
        </p>

        {/* CTA button */}
        <button
          id="empty-analytics-add-lead"
          onClick={() => navigate('/leads')}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.97]"
        >
          <Plus className="h-4 w-4" />
          Add Lead
        </button>
      </div>
    </div>
  );
}

export default memo(EmptyAnalyticsState);
