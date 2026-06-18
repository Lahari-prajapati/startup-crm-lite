import { memo, useState, useCallback } from 'react';
import { HEATMAP_COLORS } from '../../constants/analyticsColors';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * ActivityHeatmap renders a GitHub-style contribution heatmap.
 * Tracks lead creation, meetings, and calls over the last 26 weeks.
 *
 * @param {{ data: { weeks: Array<Array<{ date: string, count: number, level: number, isFuture?: boolean }>>, maxCount: number } }} props
 * @returns {React.JSX.Element} Activity heatmap card.
 */
function ActivityHeatmap({ data }) {
  const [tooltip, setTooltip] = useState(null);

  const handleMouseEnter = useCallback((cell, e) => {
    if (cell.isFuture) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      date: cell.date,
      count: cell.count,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  if (!data || !data.weeks || data.weeks.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-800/50">
        <p className="text-sm text-slate-400">No activity data available</p>
      </div>
    );
  }

  const heatmapColors = [
    '#F1F5F9', // 0 - No activity
    '#DBEAFE', // 1 - Low
    '#93C5FD', // 2 - Medium-low
    '#3B82F6', // 3 - Medium
    '#1D4ED8', // 4 - High
  ];

  const darkHeatmapColors = [
    'rgb(30, 41, 59)',   // 0 - No activity (dark)
    'rgb(30, 58, 138)',  // 1
    'rgb(37, 99, 235)',  // 2
    'rgb(59, 130, 246)', // 3
    'rgb(96, 165, 250)', // 4
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Activity Heatmap</h3>
        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Lead creation &amp; meeting activity over 6 months</p>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <div className="inline-flex gap-1">
          {/* Day labels column */}
          <div className="flex flex-col gap-1 pr-1">
            {DAY_LABELS.map((day, i) => (
              <div key={day} className="flex h-[14px] items-center">
                {i % 2 === 1 && (
                  <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500">{day}</span>
                )}
              </div>
            ))}
          </div>

          {/* Weeks grid */}
          {data.weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((cell, di) => (
                <div
                  key={`${wi}-${di}`}
                  className={`h-[14px] w-[14px] rounded-[3px] transition-all duration-150 ${
                    cell.isFuture
                      ? 'bg-slate-50 dark:bg-slate-800/30'
                      : 'cursor-pointer hover:ring-2 hover:ring-blue-400/50 hover:ring-offset-1'
                  }`}
                  style={{
                    backgroundColor: cell.isFuture ? undefined : heatmapColors[cell.level],
                  }}
                  onMouseEnter={(e) => handleMouseEnter(cell, e)}
                  onMouseLeave={handleMouseLeave}
                  role="gridcell"
                  aria-label={`${cell.date}: ${cell.count} activities`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 dark:text-slate-500">Less</span>
        <div className="flex items-center gap-1">
          {heatmapColors.map((color, i) => (
            <div
              key={i}
              className="h-[12px] w-[12px] rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-800"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <p className="font-semibold text-slate-900 dark:text-white">
            {tooltip.count} {tooltip.count === 1 ? 'activity' : 'activities'}
          </p>
          <p className="text-slate-400 dark:text-slate-500">{tooltip.date}</p>
        </div>
      )}
    </div>
  );
}

export default memo(ActivityHeatmap);
