import React from 'react';

/** All available filter options in display order */
const FILTER_OPTIONS = [
  'All',
  'New',
  'Contacted',
  'Meeting Scheduled',
  'Proposal Sent',
  'Won',
  'Lost',
];

/**
 * FilterBar — A row of clickable status filter buttons.
 *
 * Each button shows the status label and the number of leads matching that
 * status. The active filter is highlighted with the primary blue color.
 *
 * @param {object}   props
 * @param {string}   props.activeFilter    - The currently selected filter string.
 * @param {Function} props.onFilterChange  - Called with the new filter string on click.
 * @param {Array}    props.leads           - Full (unfiltered) leads array for count calculation.
 */
export default function FilterBar({ activeFilter, onFilterChange, leads }) {
  /**
   * Compute the count for a given filter option.
   * 'All' returns the full leads length; others count by status match.
   */
  const getCount = (filter) => {
    if (filter === 'All') return leads.length;
    return leads.filter((lead) => lead.status === filter).length;
  };

  return (
    <div
      className="flex flex-wrap gap-1.5"
      role="group"
      aria-label="Filter leads by status"
    >
      {FILTER_OPTIONS.map((filter) => {
        const count = getCount(filter);
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            aria-pressed={isActive}
            className={`
              inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold
              transition-all duration-200 cursor-pointer select-none
              ${
                isActive
                  ? 'bg-primary text-white shadow-sm shadow-primary/25 scale-[1.02]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200'
              }
            `}
          >
            <span>{filter}</span>
            {/* Count badge */}
            <span
              className={`
                rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none
                ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                }
              `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
