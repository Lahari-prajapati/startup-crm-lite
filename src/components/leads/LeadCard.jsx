import React from 'react';
import { Pencil, Trash2, Building, Mail, Phone } from 'lucide-react';
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
 * Props definition for the LeadCard component.
 * @typedef {Object} LeadCardProps
 * @property {Lead} lead - The lead object to display.
 * @property {function} onEdit - Callback triggered when the edit button is clicked.
 * @property {function} onDelete - Callback triggered when the delete button is clicked.
 */

/**
 * LeadCard component displays details for a single lead in a grid/card layout.
 *
 * @param {LeadCardProps} props - The component props.
 * @returns {React.JSX.Element} The rendered lead card.
 */
export default function LeadCard({ lead, onEdit, onDelete }) {
  /**
   * Helper to extract initials for avatar icon.
   * @param {string} name - Full lead contact name.
   * @returns {string} Initials letters.
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
    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-950">
      {/* Top Header Row: Name & Status */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          {/* Circular initials avatar bubble */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary dark:bg-primary/20">
            {getInitials(lead.name)}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-base text-slate-905 dark:text-white truncate group-hover:text-primary transition-colors">
              {lead.name}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <Building className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span className="truncate">{lead.company}</span>
            </div>
          </div>
        </div>

        {/* Status indicator pill */}
        <div className="shrink-0">
          <StatusBadge status={lead.status} />
        </div>
      </div>

      {/* Body Details: Contact Information */}
      <div className="mt-5 space-y-2.5 border-t border-slate-50 pt-4 dark:border-slate-900/60">
        {/* Email Row */}
        <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-350">
          <Mail className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          <a href={`mailto:${lead.email}`} className="truncate hover:text-primary hover:underline" title={lead.email}>
            {lead.email}
          </a>
        </div>

        {/* Phone Row */}
        <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-350">
          <Phone className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          {lead.phone ? (
            <a href={`tel:${lead.phone}`} className="hover:text-primary hover:underline">
              {lead.phone}
            </a>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 italic">No phone provided</span>
          )}
        </div>
      </div>

      {/* Action buttons footer */}
      <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-50 pt-3 dark:border-slate-900/60">
        <button
          onClick={() => onEdit(lead)}
          className="flex items-center justify-center p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-primary dark:hover:bg-slate-900 transition-colors cursor-pointer"
          title="Edit Lead"
          aria-label={`Edit details for ${lead.name}`}
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          onClick={() => onDelete(lead.id)}
          className="flex items-center justify-center p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-danger dark:hover:bg-slate-900 transition-colors cursor-pointer"
          title="Delete Lead"
          aria-label={`Delete ${lead.name}`}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
