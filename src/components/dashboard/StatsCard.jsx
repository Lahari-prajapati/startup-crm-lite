import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * @typedef {'primary' | 'success' | 'warning' | 'danger'} StatsCardColor
 */

/**
 * Props definition for the StatsCard component.
 * @typedef {Object} StatsCardProps
 * @property {string} title - The title/label of the metric.
 * @property {string|number} value - The main metric value to display.
 * @property {import('lucide-react').LucideIcon} icon - The Lucide React icon to render.
 * @property {number} change - The percentage change vs last month.
 * @property {StatsCardColor} color - Theme color variation for icon styling and shadow accent.
 */

/**
 * StatsCard component renders a metric KPI card with an icon, main value,
 * and a trend indicator showing percentage change vs the previous month.
 *
 * @param {StatsCardProps} props - The component props.
 * @returns {React.JSX.Element} The rendered stats card component.
 */
export default function StatsCard({ title, value, icon: Icon, change, color = 'primary' }) {
  // Check if change is positive
  const isPositive = change >= 0;
  
  // Theme color styling mappings that leverage custom @theme variables from index.css
  const colorStyles = {
    primary: {
      bg: 'bg-primary/10 dark:bg-primary/20',
      icon: 'text-primary',
      border: 'hover:border-primary/30',
    },
    success: {
      bg: 'bg-success/10 dark:bg-success/20',
      icon: 'text-success',
      border: 'hover:border-success/30',
    },
    warning: {
      bg: 'bg-warning/10 dark:bg-warning/20',
      icon: 'text-warning',
      border: 'hover:border-warning/30',
    },
    danger: {
      bg: 'bg-danger/10 dark:bg-danger/20',
      icon: 'text-danger',
      border: 'hover:border-danger/30',
    },
  };

  const selectedStyles = colorStyles[color] || colorStyles.primary;

  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-950 ${selectedStyles.border}`}>
      <div className="flex items-center justify-between">
        {/* Metric Label */}
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          {title}
        </span>
        
        {/* Rounded Icon Badge */}
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${selectedStyles.bg} ${selectedStyles.icon}`}>
          {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
        </div>
      </div>
      
      <div className="mt-4">
        {/* Main Value Display */}
        <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </h3>
        
        {/* Metric Trend comparison text */}
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive
                ? 'bg-success/10 text-success'
                : 'bg-danger/10 text-danger'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>{isPositive ? '+' : ''}{change}%</span>
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            vs last month
          </span>
        </div>
      </div>
    </div>
  );
}
