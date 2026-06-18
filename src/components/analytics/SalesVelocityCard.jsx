import { memo } from 'react';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { formatCurrency } from '../../utils/analyticsHelpers';

/**
 * SalesVelocityCard displays the sales velocity metric with a visual gauge.
 *
 * @param {{ data: { velocity: number, opportunities: number, winRate: number, avgDealSize: number, cycleLength: number } }} props
 * @returns {React.JSX.Element} Sales velocity widget.
 */
function SalesVelocityCard({ data }) {
  if (!data) return null;

  const { velocity, opportunities, winRate, avgDealSize, cycleLength } = data;

  // Gauge fill percentage (capped at 100)
  const maxVelocity = 50000;
  const gaugeFill = Math.min(100, (velocity / maxVelocity) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Sales Velocity</h3>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Revenue generation speed</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 ring-1 ring-amber-100 dark:bg-amber-900/20 dark:ring-amber-800/30">
          <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" strokeWidth={1.8} />
        </div>
      </div>

      {/* Main velocity value */}
      <div className="mb-5">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">
          {formatCurrency(velocity)}
        </span>
        <span className="ml-1 text-sm font-medium text-slate-400">/day</span>
      </div>

      {/* Visual gauge bar */}
      <div className="mb-5">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700/50">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 transition-all duration-1000 ease-out"
            style={{ width: `${gaugeFill}%` }}
          />
        </div>
      </div>

      {/* Component metrics breakdown */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-700/30">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Opportunities</p>
          <p className="mt-0.5 text-lg font-bold text-slate-900 dark:text-white">{opportunities}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-700/30">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Win Rate</p>
          <p className="mt-0.5 text-lg font-bold text-emerald-600 dark:text-emerald-400">{winRate}%</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-700/30">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Avg Deal</p>
          <p className="mt-0.5 text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(avgDealSize)}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-700/30">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Cycle</p>
          <p className="mt-0.5 text-lg font-bold text-slate-900 dark:text-white">{cycleLength}d</p>
        </div>
      </div>
    </div>
  );
}

export default memo(SalesVelocityCard);
