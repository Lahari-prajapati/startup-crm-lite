import { memo } from 'react';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Briefcase,
  DollarSign,
  Clock,
  XCircle,
  Target,
} from 'lucide-react';
import { formatCurrency } from '../../utils/analyticsHelpers';

/**
 * Single KPI card with icon, value, label, and growth indicator.
 */
function KPICard({ title, value, icon: Icon, growth, color, suffix = '' }) {
  const isPositive = growth >= 0;
  const GrowthIcon = isPositive ? TrendingUp : TrendingDown;

  const colorMap = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      icon: 'text-blue-600 dark:text-blue-400',
      ring: 'ring-blue-100 dark:ring-blue-800/30',
    },
    green: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      icon: 'text-emerald-600 dark:text-emerald-400',
      ring: 'ring-emerald-100 dark:ring-emerald-800/30',
    },
    violet: {
      bg: 'bg-violet-50 dark:bg-violet-900/20',
      icon: 'text-violet-600 dark:text-violet-400',
      ring: 'ring-violet-100 dark:ring-violet-800/30',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      icon: 'text-amber-600 dark:text-amber-400',
      ring: 'ring-amber-100 dark:ring-amber-800/30',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      icon: 'text-red-600 dark:text-red-400',
      ring: 'ring-red-100 dark:ring-red-800/30',
    },
    cyan: {
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
      icon: 'text-cyan-600 dark:text-cyan-400',
      ring: 'ring-cyan-100 dark:ring-cyan-800/30',
    },
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:border-slate-700/60 dark:bg-slate-800/50 dark:hover:border-slate-600">
      {/* Decorative gradient accent */}
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-[0.07] ${colors.bg} blur-2xl transition-all group-hover:opacity-[0.12]`} />

      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {title}
        </p>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} ring-1 ${colors.ring}`}>
          <Icon className={`h-5 w-5 ${colors.icon}`} strokeWidth={1.8} />
        </div>
      </div>

      <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        {value}
        {suffix && <span className="ml-0.5 text-lg font-semibold text-slate-500">{suffix}</span>}
      </h3>

      <div className="mt-2 flex items-center gap-1">
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            isPositive
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          <GrowthIcon className="h-3 w-3" />
          {Math.abs(growth)}%
        </span>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">vs prev period</span>
      </div>
    </div>
  );
}

/**
 * StatsCards renders the 6 KPI summary cards across the dashboard.
 *
 * @param {{ kpis: object }} props - KPI metrics from useAnalytics hook.
 * @returns {React.JSX.Element} Grid of KPI cards.
 */
function StatsCards({ kpis }) {
  const cards = [
    {
      title: 'Total Leads',
      value: kpis.totalLeads.value,
      icon: Users,
      growth: kpis.totalLeads.growth,
      color: 'blue',
    },
    {
      title: 'Conversion Rate',
      value: `${kpis.conversionRate.value.toFixed(1)}%`,
      icon: Target,
      growth: kpis.conversionRate.growth,
      color: 'green',
    },
    {
      title: 'Pipeline Value',
      value: formatCurrency(kpis.pipelineValue.value),
      icon: Briefcase,
      growth: kpis.pipelineValue.growth,
      color: 'violet',
    },
    {
      title: 'Won Revenue',
      value: formatCurrency(kpis.wonRevenue.value),
      icon: DollarSign,
      growth: kpis.wonRevenue.growth,
      color: 'amber',
    },
    {
      title: 'Avg Sales Cycle',
      value: kpis.avgSalesCycle.value,
      suffix: ' Days',
      icon: Clock,
      growth: kpis.avgSalesCycle.growth,
      color: 'cyan',
    },
    {
      title: 'Lost Rate',
      value: `${kpis.lostRate.value.toFixed(1)}%`,
      icon: XCircle,
      growth: kpis.lostRate.growth,
      color: 'red',
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <KPICard key={card.title} {...card} />
      ))}
    </div>
  );
}

export default memo(StatsCards);
