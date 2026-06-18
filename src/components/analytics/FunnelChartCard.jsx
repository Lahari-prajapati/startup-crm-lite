import { memo, useState } from 'react';

/**
 * FunnelChartCard visualizes the sales pipeline funnel matching the requested aesthetic.
 * Features a sharp, perfectly triangular SVG funnel on top and a detailed data grid below.
 *
 * @param {{ data: Array<{ stage: string, count: number, percentage: number, dropoff: number, color: string }> }} props
 * @returns {React.JSX.Element} Sales funnel card.
 */
function FunnelChartCard({ data }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700/60 dark:bg-slate-800/50">
        <p className="text-sm text-slate-400">No funnel data available</p>
      </div>
    );
  }

  const maxCount = data[0]?.count || 1;

  // --- SVG Configuration ---
  const SVG_WIDTH = 500;
  const STAGE_HEIGHT = 45;
  const GAP = 2; // White gap between slices
  const TOTAL_HEIGHT = data.length * (STAGE_HEIGHT + GAP) - GAP;

  // We want a perfect downward-pointing triangle to match the aesthetic reference.
  const topFunnelWidth = SVG_WIDTH * 0.9;
  const bottomFunnelWidth = 0; // Tapers to a sharp point

  // Calculate the linear taper slopes for a perfect triangle
  const leftSlope = (topFunnelWidth - bottomFunnelWidth) / 2 / TOTAL_HEIGHT;
  
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700/60 dark:bg-[#0f111a]">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Sales Funnel Visualization</h3>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Historical stage-by-stage progression &amp; drop-off rates.</p>
      </div>

      {/* Top Section: Perfect Triangle Funnel */}
      <div className="relative z-10 mx-auto mb-8 w-full max-w-md">
        <div className="relative w-full" style={{ height: TOTAL_HEIGHT }}>
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${TOTAL_HEIGHT}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            {data.map((stage, i) => {
              const yTop = i * (STAGE_HEIGHT + GAP);
              const yBot = yTop + STAGE_HEIGHT;
              
              // Calculate width based on a perfect triangle taper
              const currentTopWidth = topFunnelWidth - (2 * leftSlope * yTop);
              const currentBotWidth = topFunnelWidth - (2 * leftSlope * yBot);
              
              const xTl = (SVG_WIDTH - currentTopWidth) / 2;
              const xTr = SVG_WIDTH - xTl;
              const xBl = (SVG_WIDTH - currentBotWidth) / 2;
              const xBr = SVG_WIDTH - xBl;

              const pathData = `M ${xTl} ${yTop} L ${xTr} ${yTop} L ${xBr} ${yBot} L ${xBl} ${yBot} Z`;
              const isHovered = hoveredIndex === i;

              return (
                <g 
                  key={`svg-${stage.stage}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="transition-all duration-300 cursor-pointer"
                  style={{ transformOrigin: 'center', transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}
                >
                  <path 
                    d={pathData} 
                    fill={stage.color} 
                    stroke="#ffffff" 
                    strokeWidth="1.5"
                    className="dark:stroke-[#0f111a]" 
                  />
                  
                  {/* Label on the right edge */}
                  <text
                    x={xTr + 10}
                    y={yTop + STAGE_HEIGHT / 2 + 4}
                    fill="currentColor"
                    className="text-[11px] font-medium text-slate-500 dark:text-slate-400"
                  >
                    {stage.stage}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Bottom Section: Detailed Data Grid */}
      <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50">
        <div className="flex flex-col space-y-4">
          {data.map((stage, i) => {
            const widthPercent = Math.max(5, (stage.count / maxCount) * 100);
            const isHovered = hoveredIndex === i;
            
            return (
              <div 
                key={`grid-${stage.stage}`} 
                className={`flex items-center gap-4 transition-all duration-300 ${isHovered ? 'bg-slate-200/50 dark:bg-slate-700/50 rounded-lg -mx-2 px-2 py-1' : 'py-1'}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Stage Name & Dot */}
                <div className="flex w-28 flex-shrink-0 items-center gap-2">
                  <div 
                    className="h-2 w-2 rounded-full shadow-sm" 
                    style={{ backgroundColor: stage.color }} 
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {stage.stage}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700/60">
                    <div 
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ 
                        width: `${widthPercent}%`,
                        backgroundColor: stage.color,
                        opacity: isHovered ? 1 : 0.85
                      }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex w-32 flex-shrink-0 items-center justify-end gap-3 text-xs">
                  <span className="w-6 text-right font-bold text-slate-900 dark:text-white">
                    {stage.count}
                  </span>
                  <span className="w-10 text-right font-semibold text-slate-500 dark:text-slate-400">
                    {stage.percentage}%
                  </span>
                  <span className={`w-12 text-right font-bold ${stage.dropoff > 0 ? 'text-red-500 dark:text-red-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {stage.dropoff > 0 ? `-${stage.dropoff}%` : '0%'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(FunnelChartCard);
