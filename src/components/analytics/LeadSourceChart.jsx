import { memo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { SOURCE_COLORS } from '../../constants/analyticsColors';

/**
 * Custom tooltip for the lead source chart.
 */
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white/95 px-3 py-2 shadow-xl backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/95">
      <p className="text-xs font-semibold text-slate-900 dark:text-white">{payload[0].payload.source}</p>
      <p className="mt-0.5 text-sm font-bold text-blue-600 dark:text-blue-400">
        {payload[0].value} Leads
      </p>
    </div>
  );
}

/**
 * LeadSourceChart renders a horizontal bar chart of lead sources, sorted descending.
 *
 * @param {{ data: Array<{ source: string, count: number }> }} props
 * @returns {React.JSX.Element} Horizontal bar chart card.
 */
function LeadSourceChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-800/50">
        <p className="text-sm text-slate-400">No source data available</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Lead Sources</h3>
        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Where your leads are coming from</p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          layout="vertical"
          barSize={20}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" className="dark:stroke-slate-700/50" />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#94A3B8' }}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="source"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#64748B', fontWeight: 500 }}
            width={85}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(37, 99, 235, 0.04)' }} />
          <Bar
            dataKey="count"
            radius={[0, 6, 6, 0]}
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={SOURCE_COLORS[entry.source] || '#94A3B8'}
                opacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(LeadSourceChart);
