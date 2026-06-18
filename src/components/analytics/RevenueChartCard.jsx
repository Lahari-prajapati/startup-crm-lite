import { memo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '../../utils/analyticsHelpers';

/**
 * Custom tooltip for the revenue area chart.
 */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white/95 px-3 py-2 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/95">
      <p className="text-xs font-semibold text-slate-900 dark:text-white">{label} Revenue</p>
      <p className="mt-0.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

/**
 * RevenueChartCard renders a gradient area chart of monthly Won deal revenue.
 *
 * @param {{ data: Array<{ month: string, revenue: number }> }} props
 * @returns {React.JSX.Element} Revenue area chart card.
 */
function RevenueChartCard({ data }) {
  const totalRevenue = data?.reduce((sum, d) => sum + d.revenue, 0) || 0;

  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-800/50">
        <p className="text-sm text-slate-400">No revenue data available</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue Analytics</h3>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Won deal revenue over the last 6 months</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Total</p>
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(totalRevenue)}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#22C55E" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#22C55E" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-700/50" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94A3B8', fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94A3B8' }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#22C55E"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
            dot={{ r: 4, fill: '#ffffff', stroke: '#22C55E', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#22C55E', stroke: '#ffffff', strokeWidth: 2 }}
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(RevenueChartCard);
