import { memo, useState, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';

/**
 * Custom active shape renderer for the doughnut chart.
 * Expands the hovered slice with a shadow and label.
 */
function renderActiveShape(props) {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value, percent,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.95}
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* Center label updates on hover */}
      <text x={cx} y={cy - 8} textAnchor="middle" className="fill-slate-900 dark:fill-white" fontSize={22} fontWeight={700}>
        {value}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" className="fill-slate-400" fontSize={10} fontWeight={500}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 26} textAnchor="middle" className="fill-slate-400" fontSize={9}>
        {(percent * 100).toFixed(0)}%
      </text>
    </g>
  );
}

/**
 * PieChartCard renders lead status distribution as an interactive doughnut chart.
 * Features active slice expansion on hover and a center label.
 *
 * @param {{ data: Array<{ name: string, value: number, color: string }>, totalLeads: number }} props
 * @returns {React.JSX.Element} Doughnut chart card.
 */
function PieChartCard({ data, totalLeads }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = useCallback((_, index) => {
    setActiveIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setActiveIndex(-1);
  }, []);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-800/50">
        <p className="text-sm text-slate-400">No status data available</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50">
      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Lead Status Distribution</h3>
        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Pipeline breakdown by current status</p>
      </div>

      {/* Doughnut Chart */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="transparent"
                  className="transition-opacity duration-200"
                  opacity={activeIndex === -1 || activeIndex === index ? 1 : 0.4}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Static center label (shown when nothing is hovered) */}
        {activeIndex === -1 && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{totalLeads}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Total Leads</span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {entry.value}{' '}
              <span className="font-normal text-slate-400">
                ({totalLeads > 0 ? Math.round((entry.value / totalLeads) * 100) : 0}%)
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(PieChartCard);
