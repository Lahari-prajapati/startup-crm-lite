import React from 'react';

/**
 * @typedef {Object} Lead
 * @property {number|string} id - Unique identifier for the lead.
 * @property {string} name - Name of the lead contact.
 * @property {string} company - Company name.
 * @property {string} email - Email address.
 * @property {string} status - Lead stage status (e.g., 'New', 'Contacted', 'Proposal', 'Closed').
 * @property {string} value - Value of the deal.
 * @property {string} [dateAdded] - Date the lead was added.
 */

/**
 * Props definition for the PipelineOverview component.
 * @typedef {Object} PipelineOverviewProps
 * @property {Lead[]} leads - The list of leads to analyze and display.
 */

/**
 * PipelineOverview component renders a visual horizontal segmented progress bar
 * representing the distribution of leads across different pipeline stages (New, Contacted, Proposal, Closed).
 *
 * @param {PipelineOverviewProps} props - The component props.
 * @returns {React.JSX.Element} The rendered pipeline overview component.
 */
export default function PipelineOverview({ leads = [] }) {
  // Define pipeline stages and associate them with colors in the theme config
  const stages = [
    { key: 'New', label: 'New', color: 'bg-primary', text: 'text-primary' },
    { key: 'Contacted', label: 'Contacted', color: 'bg-purple-500', text: 'text-purple-500' },
    { key: 'Proposal', label: 'Proposal', color: 'bg-warning', text: 'text-warning' },
    { key: 'Closed', label: 'Closed', color: 'bg-success', text: 'text-success' },
  ];

  const totalLeads = leads.length;

  // Compute distribution metrics for the pipeline segments
  const stageStats = stages.map(stage => {
    const count = leads.filter(lead => lead.status === stage.key).length;
    const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
    return {
      ...stage,
      count,
      percentage,
    };
  });

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-950">
      {/* Component Header info */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Pipeline Overview
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Distribution of leads across sales funnel stages
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-350">
          Total: {totalLeads}
        </span>
      </div>

      {/* Horizontal Segmented Progress Bar */}
      <div className="relative h-4.5 w-full overflow-hidden rounded-full bg-slate-50 flex dark:bg-slate-900">
        {totalLeads > 0 ? (
          stageStats.map((stage) => {
            if (stage.count === 0) return null;
            return (
              <div
                key={stage.key}
                style={{ width: `${stage.percentage}%` }}
                className={`h-full transition-all duration-500 hover:opacity-90 relative group ${stage.color}`}
                title={`${stage.label}: ${stage.count} (${stage.percentage}%)`}
              >
                {/* Subtle highlight overlay on hover */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            );
          })
        ) : (
          <div className="h-full w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] text-slate-400 dark:text-slate-500 font-medium">
            No pipeline stages populated
          </div>
        )}
      </div>

      {/* Pipeline Status Cards / Legend */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stageStats.map(stage => (
          <div
            key={stage.key}
            className="flex flex-col gap-1 p-3 rounded-xl border border-slate-50 bg-slate-50/20 transition-all hover:bg-slate-50/50 dark:border-slate-900 dark:bg-slate-900/10 dark:hover:bg-slate-900/30"
          >
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${stage.color}`} />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {stage.label}
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                {stage.count}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                ({stage.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
