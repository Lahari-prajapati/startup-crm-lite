import { memo } from 'react';
import { Trophy, Crown, Medal } from 'lucide-react';
import { formatCurrency } from '../../utils/analyticsHelpers';
import { MEDAL_COLORS } from '../../constants/analyticsColors';

/**
 * TopPerformersCard renders a leaderboard of top sales reps by Won revenue.
 *
 * @param {{ data: Array<{ name: string, revenue: number, deals: number }> }} props
 * @returns {React.JSX.Element} Leaderboard card.
 */
function TopPerformersCard({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-800/50">
        <p className="text-sm text-slate-400">No performance data yet</p>
      </div>
    );
  }

  const topPerformers = data.slice(0, 5);
  const maxRevenue = topPerformers[0]?.revenue || 1;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Top Performers</h3>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Sales reps ranked by Won revenue</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 ring-1 ring-amber-100 dark:bg-amber-900/20 dark:ring-amber-800/30">
          <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" strokeWidth={1.8} />
        </div>
      </div>

      <div className="space-y-3">
        {topPerformers.map((performer, index) => {
          const barWidth = Math.max(15, (performer.revenue / maxRevenue) * 100);

          return (
            <div key={performer.name} className="group">
              <div className="flex items-center gap-3">
                {/* Rank badge */}
                <div className="flex-shrink-0">
                  {index < 3 ? (
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm"
                      style={{ backgroundColor: MEDAL_COLORS[index] }}
                    >
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{index + 1}</span>
                    </div>
                  )}
                </div>

                {/* Name and progress bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-slate-900 truncate dark:text-white">
                      {performer.name}
                    </span>
                    <span className="ml-2 text-sm font-bold text-slate-900 dark:text-white">
                      {formatCurrency(performer.revenue)}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700/50">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        index === 0
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                          : index === 1
                            ? 'bg-gradient-to-r from-slate-300 to-slate-400'
                            : index === 2
                              ? 'bg-gradient-to-r from-amber-600 to-amber-700'
                              : 'bg-gradient-to-r from-blue-400 to-blue-500'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>

                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    {performer.deals} deal{performer.deals !== 1 ? 's' : ''} closed
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(TopPerformersCard);
