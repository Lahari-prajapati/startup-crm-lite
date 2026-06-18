import React from 'react';
import { SearchX, Users, FilterX } from 'lucide-react';

/**
 * EmptyState — Shown when filteredLeads is empty.
 *
 * Renders one of two distinct messages:
 *   1. No leads exist at all  → invite the user to create their first lead.
 *   2. Filters/search returned nothing → suggest clearing filters.
 *
 * @param {object}   props
 * @param {number}   props.totalLeadsCount   - Total number of leads before filtering.
 * @param {boolean}  props.hasFiltersActive  - True when any search/filter is active.
 * @param {Function} props.onClearFilters    - Resets search and active filter to defaults.
 */
export default function EmptyState({ totalLeadsCount, hasFiltersActive, onClearFilters }) {
  const isAbsolutelyEmpty = totalLeadsCount === 0;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Decorative icon container */}
      <div
        className={`
          mb-5 flex h-16 w-16 items-center justify-center rounded-2xl
          ${
            isAbsolutelyEmpty
              ? 'bg-slate-100 dark:bg-slate-800'
              : 'bg-primary/10 dark:bg-primary/15'
          }
        `}
      >
        {isAbsolutelyEmpty ? (
          <Users className="h-7 w-7 text-slate-400 dark:text-slate-500" aria-hidden="true" />
        ) : (
          <SearchX className="h-7 w-7 text-primary/70" aria-hidden="true" />
        )}
      </div>

      {/* Heading */}
      <h3 className="mb-1.5 text-base font-bold text-slate-800 dark:text-white">
        {isAbsolutelyEmpty ? 'No leads yet' : 'No leads found'}
      </h3>

      {/* Subtext */}
      <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400">
        {isAbsolutelyEmpty
          ? 'Get started by adding your first lead using the "Add Lead" button above.'
          : 'No leads match your current search or filter. Try adjusting your query or clearing the active filters.'}
      </p>

      {/* Clear filters CTA — only shown when filters are active */}
      {!isAbsolutelyEmpty && hasFiltersActive && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-primary/10 active:scale-95 cursor-pointer dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-primary dark:hover:text-primary"
        >
          <FilterX className="h-4 w-4" aria-hidden="true" />
          Clear Filters
        </button>
      )}
    </div>
  );
}
