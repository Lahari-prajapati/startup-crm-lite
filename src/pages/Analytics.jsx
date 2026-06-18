import { BarChart3 } from 'lucide-react';

import { useLeads } from '../context/LeadContext';
import { useAnalytics } from '../hooks/useAnalytics';
import AnalyticsFilters from '../components/analytics/AnalyticsFilters';
import StatsCards from '../components/analytics/StatsCards';
import PieChartCard from '../components/analytics/PieChartCard';
import FunnelChartCard from '../components/analytics/FunnelChartCard';
import BarChartCard from '../components/analytics/BarChartCard';
import LineChartCard from '../components/analytics/LineChartCard';
import RevenueChartCard from '../components/analytics/RevenueChartCard';
import LeadSourceChart from '../components/analytics/LeadSourceChart';
import SalesVelocityCard from '../components/analytics/SalesVelocityCard';
import ForecastCard from '../components/analytics/ForecastCard';
import ActivityHeatmap from '../components/analytics/ActivityHeatmap';
import TopPerformersCard from '../components/analytics/TopPerformersCard';
import EmptyAnalyticsState from '../components/analytics/EmptyAnalyticsState';

/**
 * Analytics page — the main analytics dashboard providing
 * startup founders and sales teams with actionable insights.
 *
 * @returns {React.JSX.Element} Full analytics dashboard view.
 */
export default function Analytics() {
  const { leads } = useLeads();
  const analytics = useAnalytics();

  // Show empty state when there are no leads at all
  if (!leads || leads.length === 0) {
    return <EmptyAnalyticsState />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ─── Header ────────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
              <BarChart3 className="h-5 w-5 text-white" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Analytics Dashboard
              </h1>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                Track sales performance and growth trends.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Filters ───────────────────────────────────────────────── */}
      <AnalyticsFilters
        period={analytics.period}
        onPeriodChange={analytics.handlePeriodChange}
        customStart={analytics.customStart}
        customEnd={analytics.customEnd}
        onCustomRange={analytics.handleCustomRange}
      />

      {/* ─── KPI Summary Cards ─────────────────────────────────────── */}
      <StatsCards kpis={analytics.kpis} />

      {/* ─── Row 1: Pie Chart + Funnel ─────────────────────────────── */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <PieChartCard
          data={analytics.statusDistribution}
          totalLeads={analytics.totalLeads}
        />
        <FunnelChartCard data={analytics.funnelData} />
      </div>

      {/* ─── Row 2: Bar Chart + Line Chart ─────────────────────────── */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <BarChartCard data={analytics.monthlyLeads} />
        <LineChartCard data={analytics.conversionByMonth} />
      </div>

      {/* ─── Row 3: Revenue + Lead Sources ─────────────────────────── */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <RevenueChartCard data={analytics.revenueByMonth} />
        <LeadSourceChart data={analytics.leadSourceStats} />
      </div>

      {/* ─── Row 4: Heatmap + Top Performers ───────────────────────── */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <ActivityHeatmap data={analytics.activityHeatmap} />
        <TopPerformersCard data={analytics.topPerformers} />
      </div>

      {/* ─── Row 5: Forecast + Sales Velocity ──────────────────────── */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ForecastCard data={analytics.forecastRevenue} />
        <SalesVelocityCard data={analytics.salesVelocity} />
      </div>
    </div>
  );
}
