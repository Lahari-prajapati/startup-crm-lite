import { TrendingUp } from 'lucide-react'; // Import trend icon from Lucide for analytics sections.

/**
 * Analytics page component provides interactive graphical representations of
 * CRM data metrics, sales trends, and lead channels.
 */
function Analytics() {
  return (
    // Outer page wrapper with layout rules.
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Title section */}
      <div className="mb-8">
        {/* Main page title */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Analytics Portal</h1>
        {/* Subtitle description */}
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Analyze funnel conversion metrics, revenue acquisition flow, and lead attribution.
        </p>
      </div>

      {/* Analytics stats banner row */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* Widget 1 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-950">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Deal Size</span>
          <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$12,450</h3>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-455">+5.3% this quarter</p>
        </div>
        {/* Widget 2 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-950">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sales Velocity</span>
          <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">18 Days</h3>
          <p className="mt-1 text-xs text-blue-600 dark:text-blue-455">-2 days improvement</p>
        </div>
        {/* Widget 3 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-950">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Attribution ROI</span>
          <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">3.4x</h3>
          <p className="mt-1 text-xs text-amber-600 dark:text-amber-500">Stable channel performance</p>
        </div>
      </div>

      {/* Main Charts Row - Responsive layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Revenue Performance Trend (SVG Area Chart) */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2 dark:border-slate-800/80 dark:bg-slate-950">
          <div className="mb-4 flex items-center justify-between">
            <div>
              {/* Chart Title */}
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-roboto">Revenue Performance Trend</h3>
              {/* Supporting description */}
              <p className="text-xs text-slate-400">Monthly gross lead conversions (USD)</p>
            </div>
            {/* Chart legend item */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2 py-1 text-2xs font-semibold text-blue-700 dark:bg-blue-950/45 dark:text-blue-455">
              <TrendingUp className="h-3 w-3" />
              <span>Q1-Q2 2026</span>
            </span>
          </div>

          {/* Interactive Responsive SVG Line & Area Chart */}
          <div className="relative h-64 w-full">
            <svg viewBox="0 0 500 200" className="h-full w-full overflow-visible" preserveAspectRatio="none">
              <defs>
                {/* Gradient Fill for the Area Under the Curve */}
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="4" className="dark:stroke-slate-800" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="4" className="dark:stroke-slate-800" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="4" className="dark:stroke-slate-800" />
              <line x1="0" y1="180" x2="500" y2="180" stroke="#CBD5E1" strokeWidth="1" className="dark:stroke-slate-800" />
              
              {/* Area Path (Gradient background) */}
              <path
                d="M 0 170 Q 100 130, 200 100 T 400 60 L 500 45 L 500 180 L 0 180 Z"
                fill="url(#chartGradient)"
              />
              
              {/* Line Path */}
              <path
                d="M 0 170 Q 100 130, 200 100 T 400 60 L 500 45"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points (dots on the line chart) */}
              <circle cx="100" cy="148" r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" className="transition-all hover:r-7" />
              <circle cx="200" cy="100" r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" className="transition-all hover:r-7" />
              <circle cx="300" cy="80" r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" className="transition-all hover:r-7" />
              <circle cx="400" cy="60" r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" className="transition-all hover:r-7" />
              <circle cx="500" cy="45" r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" className="transition-all hover:r-7" />
            </svg>
          </div>

          {/* Month labels at bottom */}
          <div className="mt-3 flex justify-between px-2 text-[10px] font-bold text-slate-400">
            <span>JAN</span>
            <span>FEB</span>
            <span>MAR</span>
            <span>APR</span>
            <span>MAY</span>
            <span>JUN</span>
          </div>
        </div>

        {/* Lead Attribution Channels (SVG Donut Chart) */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-950">
          <div>
            {/* Chart Title */}
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-roboto">Attribution Channels</h3>
            {/* Supporting description */}
            <p className="text-xs text-slate-400">Lead acquisition sources</p>
          </div>

          {/* Centered Circle SVG for Donut Chart */}
          <div className="my-6 flex items-center justify-center">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 36 36" className="h-full w-full">
                {/* Background base track */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F1F5F9" strokeWidth="4" className="dark:stroke-slate-900" />
                {/* Organic Traffic stroke segment */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="50 100" strokeDashoffset="25" />
                {/* Paid Advertising stroke segment */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="75" />
                {/* Referral Traffic stroke segment */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="105" />
              </svg>
              {/* Centered summary metric inside the donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">100%</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">Coverage</span>
              </div>
            </div>
          </div>

          {/* Color Indicators Legend */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                <span>Organic Search</span>
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200">50%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                <span>Paid Ads</span>
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200">30%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                <span>Referrals</span>
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200">20%</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

// Export the Analytics component.
export default Analytics;
