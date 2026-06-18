import { memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

/**
 * Custom tooltip for the conversion trend line chart.
 */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white/95 px-3 py-2 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/95">
      <p className="text-xs font-semibold text-slate-900 dark:text-white">{label}</p>
      <p className="mt-0.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">
        {payload[0].value}%
      </p>
    </div>
  );
}

/**
 * LineChartCard renders a smooth line chart tracking monthly conversion rates.
 *
 * @param {{ data: Array<{ month: string, rate: number }> }} props
 * @returns {React.JSX.Element} Line chart card.
 */
function LineChartCard({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-800/50">
        <p className="text-sm text-slate-400">No conversion data available</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Conversion Trend</h3>
        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Monthly win rate over the last 6 months</p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
          <defs>
            <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
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
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#22C55E"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#ffffff', stroke: '#22C55E', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: '#22C55E', stroke: '#ffffff', strokeWidth: 2 }}
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(LineChartCard);
