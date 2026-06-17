import React from 'react';
import { Plus, List, Download } from 'lucide-react';

/**
 * Props definition for the QuickActions component.
 * @typedef {Object} QuickActionsProps
 * @property {function} [onAddLead] - Callback triggered when the "Add New Lead" button is clicked.
 * @property {function} [onViewAll] - Callback triggered when the "View All Leads" button is clicked.
 * @property {function} [onExport] - Callback triggered when the "Export Data" button is clicked.
 */

/**
 * QuickActions component displays a list of quick action shortcuts for routine CRM activities,
 * styled as modern interactive cards.
 *
 * @param {QuickActionsProps} props - The component props.
 * @returns {React.JSX.Element} The rendered quick actions panel.
 */
export default function QuickActions({ onAddLead, onViewAll, onExport }) {
  const actions = [
    {
      label: 'Add New Lead',
      description: 'Create a new client entry',
      icon: Plus,
      color: 'bg-primary text-white hover:bg-primary/95 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20',
      textColor: 'text-white',
      descColor: 'text-blue-100/80',
      onClick: onAddLead,
    },
    {
      label: 'View All Leads',
      description: 'Explore full client directory',
      icon: List,
      color: 'bg-white text-slate-805 border border-slate-100 hover:bg-slate-50 hover:border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 dark:hover:bg-slate-800/80 dark:hover:border-slate-750',
      textColor: 'text-slate-900 dark:text-white',
      descColor: 'text-slate-500 dark:text-slate-400',
      onClick: onViewAll,
    },
    {
      label: 'Export Data',
      description: 'Download CSV status report',
      icon: Download,
      color: 'bg-white text-slate-805 border border-slate-100 hover:bg-slate-50 hover:border-slate-200 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 dark:hover:bg-slate-800/80 dark:hover:border-slate-750',
      textColor: 'text-slate-900 dark:text-white',
      descColor: 'text-slate-500 dark:text-slate-400',
      onClick: onExport,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-950">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5">
        Quick Operations
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
        Perform key workflow actions
      </p>

      <div className="flex flex-col gap-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={action.onClick}
              className={`flex items-center gap-4 w-full p-4 rounded-xl text-left transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${action.color}`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-500/10 backdrop-blur-xs">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex-grow min-w-0">
                <span className={`block font-bold text-sm leading-tight truncate ${action.textColor}`}>
                  {action.label}
                </span>
                <span className={`text-xs mt-0.5 block truncate ${action.descColor}`}>
                  {action.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
