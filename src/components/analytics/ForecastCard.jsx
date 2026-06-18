import { memo } from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/analyticsHelpers';

/**
 * ForecastCard displays predicted revenue for the next month.
 * Includes confidence score and growth trend indicator.
 *
 * @param {{ data: { predicted: number, confidence: number, trend: number } }} props
 * @returns {React.JSX.Element} Forecast widget.
 */
function ForecastCard({ data }) {
  if (!data) return null;

  const { predicted, confidence, trend } = data;
  const isPositiveTrend = trend >= 0;
  const TrendIcon = isPositiveTrend ? TrendingUp : TrendingDown;

  // Confidence color based on score
  const confidenceColor =
    confidence >= 70
      ? 'text-emerald-600 dark:text-emerald-400'
      : confidence >= 40
        ? 'text-amber-600 dark:text-amber-400'
        : 'text-red-500 dark:text-red-400';

  const confidenceBarColor =
    confidence >= 70
      ? 'from-emerald-400 to-emerald-500'
      : confidence >= 40
        ? 'from-amber-400 to-amber-500'
        : 'from-red-400 to-red-500';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue Forecast</h3>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Predicted revenue next month</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 ring-1 ring-violet-100 dark:bg-violet-900/20 dark:ring-violet-800/30">
          <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" strokeWidth={1.8} />
        </div>
      </div>

      {/* Predicted value */}
      <div className="mb-4">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">
          {formatCurrency(predicted)}
        </span>
      </div>

      {/* Trend indicator */}
      <div className="mb-5 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isPositiveTrend
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          <TrendIcon className="h-3 w-3" />
          {Math.abs(trend)}% {isPositiveTrend ? 'growth' : 'decline'}
        </span>
      </div>

      {/* Confidence meter */}
      <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-700/30">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Confidence Score</span>
          <span className={`text-sm font-bold ${confidenceColor}`}>{confidence}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-600">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${confidenceBarColor} transition-all duration-1000 ease-out`}
            style={{ width: `${confidence}%` }}
          />
        </div>
        <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">
          Based on {6}-month revenue trend analysis
        </p>
      </div>
    </div>
  );
}

export default memo(ForecastCard);
