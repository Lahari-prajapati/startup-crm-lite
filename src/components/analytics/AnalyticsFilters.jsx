import { memo, useState, useCallback } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const PERIOD_OPTIONS = [
  { key: '7d', label: 'Last 7 Days' },
  { key: '30d', label: 'Last 30 Days' },
  { key: '90d', label: 'Last 90 Days' },
  { key: '1y', label: 'This Year' },
  { key: 'custom', label: 'Custom Range' },
];

/**
 * AnalyticsFilters provides date range selection controls.
 * Supports preset periods and a custom date range picker.
 *
 * @param {{ period: string, onPeriodChange: Function, customStart: string, customEnd: string, onCustomRange: Function }} props
 * @returns {React.JSX.Element} Filter controls bar.
 */
function AnalyticsFilters({ period, onPeriodChange, customStart, customEnd, onCustomRange }) {
  const [showCustom, setShowCustom] = useState(period === 'custom');

  const handlePeriodClick = useCallback(
    (key) => {
      if (key === 'custom') {
        setShowCustom(true);
        onPeriodChange('custom');
      } else {
        setShowCustom(false);
        onPeriodChange(key);
      }
    },
    [onPeriodChange]
  );

  const handleStartChange = useCallback(
    (e) => {
      onCustomRange(e.target.value, customEnd);
    },
    [customEnd, onCustomRange]
  );

  const handleEndChange = useCallback(
    (e) => {
      onCustomRange(customStart, e.target.value);
    },
    [customStart, onCustomRange]
  );

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      {/* Period preset buttons */}
      {PERIOD_OPTIONS.map((opt) => (
        <button
          key={opt.key}
          id={`filter-${opt.key}`}
          onClick={() => handlePeriodClick(opt.key)}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
            period === opt.key
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
          }`}
        >
          {opt.key === 'custom' && <Calendar className="h-3 w-3" />}
          {opt.label}
        </button>
      ))}

      {/* Custom date range inputs */}
      {showCustom && (
        <div className="ml-2 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
          <input
            type="date"
            id="filter-custom-start"
            value={customStart}
            onChange={handleStartChange}
            className="border-0 bg-transparent text-xs text-slate-700 outline-none dark:text-slate-300"
            aria-label="Start date"
          />
          <ChevronDown className="h-3 w-3 rotate-[-90deg] text-slate-400" />
          <input
            type="date"
            id="filter-custom-end"
            value={customEnd}
            onChange={handleEndChange}
            className="border-0 bg-transparent text-xs text-slate-700 outline-none dark:text-slate-300"
            aria-label="End date"
          />
        </div>
      )}
    </div>
  );
}

export default memo(AnalyticsFilters);
