import React from 'react';
import { Pencil, Trash2, Building, Mail, Calendar, Sparkles } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * @typedef {Object} Lead
 * @property {number|string} id - Unique identifier for the lead.
 * @property {string} name - Name of the lead contact.
 * @property {string} company - Company name.
 * @property {string} email - Email address.
 * @property {string} [phone] - Phone number.
 * @property {string} status - Lead stage status (e.g., 'New', 'Contacted', 'Proposal', 'Closed').
 * @property {string} source - Marketing source.
 * @property {string} dateAdded - Date created.
 */

/**
 * Props definition for the LeadTable component.
 * @typedef {Object} LeadTableProps
 * @property {Lead[]} leads - The list of leads to display.
 * @property {function} onEdit - Callback triggered when edit is requested for a lead.
 * @property {function} onDelete - Callback triggered when delete is requested for a lead.
 */

/**
 * LeadTable component renders leads list in a structured, responsive table format.
 *
 * @param {LeadTableProps} props - The component props.
 * @returns {React.JSX.Element} The rendered lead table.
 */
export default function LeadTable({ leads = [], onEdit, onDelete }) {
  /**
   * Helper to format dates cleanly.
   * @param {string} dateStr - The raw date string.
   * @returns {string} Formatted output.
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
   * Helper to get initials.
   * @param {string} name - Full contact name.
   * @returns {string} Initials string.
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
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-950">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-slate-500 dark:text-slate-400 animate-fade-in">
          {/* Table Headings */}
          <thead className="border-b border-slate-50 bg-slate-50/20 text-xs font-bold uppercase tracking-wider text-slate-450 dark:border-slate-900 dark:bg-slate-900/10 dark:text-slate-400">
            <tr>
              <th className="px-6 py-4">Lead Name</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Date Added</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-50/30 dark:hover:bg-slate-900/10 transition-colors duration-150"
                >
                  {/* Lead Name initials avatar */}
                  <td className="px-6 py-4 font-semibold text-slate-905 dark:text-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-extrabold text-primary dark:bg-primary/20">
                        {getInitials(lead.name)}
                      </div>
                      <span className="truncate max-w-[130px] sm:max-w-none">{lead.name}</span>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                      <span className="truncate max-w-[130px] sm:max-w-none">{lead.company}</span>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0 text-slate-405" aria-hidden="true" />
                      <a href={`mailto:${lead.email}`} className="truncate hover:text-primary hover:underline max-w-[150px] sm:max-w-none">
                        {lead.email}
                      </a>
                    </div>
                  </td>

                  {/* Source */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-500/10 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-800">
                      {lead.source}
                    </span>
                  </td>

                  {/* Date Added */}
                  <td className="px-6 py-4 text-slate-405 dark:text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                      <span className="text-xs">{formatDate(lead.dateAdded)}</span>
                    </div>
                  </td>

                  {/* Action buttons */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(lead)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-primary dark:hover:bg-slate-900 cursor-pointer transition-colors"
                        title="Edit Lead"
                        aria-label={`Edit details for ${lead.name}`}
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => onDelete(lead.id)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-danger dark:hover:bg-slate-900 cursor-pointer transition-colors"
                        title="Delete Lead"
                        aria-label={`Delete ${lead.name}`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Empty list state
              <tr>
                <td colSpan="7" className="py-12 text-center text-slate-400 dark:text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Sparkles className="h-6 w-6 text-slate-300" aria-hidden="true" />
                    <span>No leads match search conditions.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
