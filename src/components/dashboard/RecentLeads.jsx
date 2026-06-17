import React from 'react';
import { Building, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * @typedef {Object} Lead
 * @property {number|string} id - Unique identifier for the lead.
 * @property {string} name - Name of the lead contact.
 * @property {string} company - Company name.
 * @property {string} email - Email address.
 * @property {string} status - Lead stage status (e.g., 'New', 'Contacted', 'Proposal', 'Closed').
 * @property {string} value - Value of the deal.
 * @property {string} dateAdded - Date the lead was added.
 */

/**
 * Props definition for the RecentLeads component.
 * @typedef {Object} RecentLeadsProps
 * @property {Lead[]} leads - The list of leads to filter and display.
 */

/**
 * RecentLeads component shows a listing of the 5 most recently added leads.
 * Renders details in a modern table with badge indicators and layout offsets.
 *
 * @param {RecentLeadsProps} props - The component props.
 * @returns {React.JSX.Element} The rendered recent leads table.
 */
export default function RecentLeads({ leads = [] }) {
  // Sort leads chronologically by dateAdded (newest first) and take top 5
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 5);

  /**
   * Formats a date string to a user-friendly text pattern.
   * @param {string} dateStr - Date string to parse.
   * @returns {string} Formatted date.
   */
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  /**
   * Extracts initials from name for avatar bubble.
   * @param {string} name - User full name.
   * @returns {string} Two-letter initials.
   */
  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-950 overflow-hidden">
      {/* Table Header Section */}
      <div className="flex items-center justify-between border-b border-slate-50 p-6 dark:border-slate-900">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Recent Leads
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Latest additions to your sales pipeline
          </p>
        </div>
        <Link
          to="/leads"
          className="flex items-center gap-1 text-xs font-bold text-primary hover:underline hover:opacity-90 transition-opacity"
        >
          <span>View All</span>
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>

      {/* Table Shell with overflow support */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-slate-500 dark:text-slate-400">
          <thead>
            <tr className="border-b border-slate-50 bg-slate-50/20 text-xs font-bold uppercase tracking-wider text-slate-450 dark:border-slate-900 dark:bg-slate-900/10 dark:text-slate-400">
              <th className="px-6 py-4">Lead Name</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50/30 dark:hover:bg-slate-900/10 transition-colors duration-150"
                >
                  {/* Lead Name with avatar circle */}
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-extrabold text-primary dark:bg-primary/20">
                        {getInitials(lead.name)}
                      </div>
                      <span className="truncate max-w-[140px] sm:max-w-none">{lead.name}</span>
                    </div>
                  </td>

                  {/* Company info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 shrink-0 text-slate-450 dark:text-slate-500" />
                      <span className="truncate max-w-[130px] sm:max-w-none">{lead.company}</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        lead.status === 'New'
                          ? 'bg-primary/10 text-primary dark:bg-primary/20'
                          : lead.status === 'Contacted'
                          ? 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
                          : lead.status === 'Proposal'
                          ? 'bg-warning/10 text-warning dark:bg-warning/20'
                          : 'bg-success/10 text-success dark:bg-success/20'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  {/* Date format layout */}
                  <td className="px-6 py-4 text-slate-450 dark:text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                      <span className="text-xs">{formatDate(lead.dateAdded)}</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-12 text-center text-slate-400 dark:text-slate-500">
                  No recent leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
