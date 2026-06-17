import React from 'react';

/**
 * @typedef {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} LeadStatus
 */

/**
 * Props definition for the StatusBadge component.
 * @typedef {Object} StatusBadgeProps
 * @property {LeadStatus} status - The status code representing the lead's state.
 */

/**
 * StatusBadge component renders a pill-shaped, color-coded badge indicating lead status.
 * Leverages the theme variables for uniform color rendering across light and dark modes.
 *
 * @param {StatusBadgeProps} props - The component props.
 * @returns {React.JSX.Element} The rendered status badge.
 */
export default function StatusBadge({ status }) {
  // Map statuses to appropriate Tailwind classes, incorporating custom v4 theme parameters
  const badgeStyles = {
    'New': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50',
    'Contacted': 'bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400 border border-purple-200/30 dark:border-purple-800/30',
    'Meeting Scheduled': 'bg-blue-55 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200/30 dark:border-blue-800/30',
    'Proposal Sent': 'bg-warning/10 text-warning border border-warning/20',
    'Won': 'bg-success/10 text-success border border-success/20',
    'Lost': 'bg-danger/10 text-danger border border-danger/20',
  };

  const currentStyle = badgeStyles[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-350 border border-slate-200/50 dark:border-slate-700/50';

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide transition-colors duration-150 ${currentStyle}`}>
      {status}
    </span>
  );
}
