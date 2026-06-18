import { memo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

/**
 * Custom tooltip for the bar chart.
 */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white/95 px-3 py-2 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/95">
      <p className="text-xs font-semibold text-slate-900 dark:text-white">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-blue-600 dark:text-blue-400">
        {payload[0].value} Leads
      </p>
    </div>
  );
}

/**
 * BarChartCard renders a vertical bar chart of monthly lead counts.
 *
 * @param {{ data: Array<{ month: string, count: number }> }} props
 * @returns {React.JSX.Element} Bar chart card.
 */
function BarChartCard({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-800/50">
        <p className="text-sm text-slate-400">No monthly data available</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Monthly Leads Trend</h3>
        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Lead generation over the last 6 months</p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={32} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.6} />
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
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(37, 99, 235, 0.06)' }} />
          <Bar
            dataKey="count"
            fill="url(#barGradient)"
            radius={[6, 6, 0, 0]}
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(BarChartCard);
