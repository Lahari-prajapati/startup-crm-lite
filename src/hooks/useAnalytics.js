import { useMemo, useState, useCallback } from 'react';
import { useLeads } from '../context/LeadContext';
import {
  filterLeadsByDateRange,
  getDateRange,
  getPreviousPeriodRange,
  getConversionRate,
  getPipelineValue,
  getWonRevenue,
  getAverageSalesCycle,
  getLostRate,
  getStatusDistribution,
  getMonthlyLeads,
  getConversionByMonth,
  getRevenueByMonth,
  getLeadSourceStats,
  getFunnelData,
  getSalesVelocity,
  getForecastRevenue,
  getTopPerformers,
  getActivityHeatmapData,
  getGrowthPercentage,
} from '../utils/analyticsHelpers';

/**
 * Custom hook that computes all analytics data from leads.
 * All computations are memoized for performance with large datasets.
 *
 * @returns {object} Analytics state including all computed metrics, filter controls, and loading state.
 */
export function useAnalytics() {
  const { leads } = useLeads();
  const [period, setPeriod] = useState('1y');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  /** Current date range based on selected period */
  const dateRange = useMemo(
    () => getDateRange(period, customStart, customEnd),
    [period, customStart, customEnd]
  );

  /** Previous period range for trend comparison */
  const prevRange = useMemo(
    () => getPreviousPeriodRange(dateRange.startDate, dateRange.endDate),
    [dateRange]
  );

  /** Leads filtered by current date range */
  const filteredLeads = useMemo(
    () => filterLeadsByDateRange(leads, dateRange.startDate, dateRange.endDate),
    [leads, dateRange]
  );

  /** Leads from the previous period for comparison */
  const previousLeads = useMemo(
    () => filterLeadsByDateRange(leads, prevRange.startDate, prevRange.endDate),
    [leads, prevRange]
  );

  // ─── KPI Metrics ───────────────────────────────────────────────────────────

  const totalLeads = filteredLeads.length;
  const previousTotalLeads = previousLeads.length;
  const totalLeadsGrowth = useMemo(
    () => getGrowthPercentage(totalLeads, previousTotalLeads),
    [totalLeads, previousTotalLeads]
  );

  const conversionRate = useMemo(() => getConversionRate(filteredLeads), [filteredLeads]);
  const previousConversionRate = useMemo(() => getConversionRate(previousLeads), [previousLeads]);
  const conversionRateGrowth = useMemo(
    () => getGrowthPercentage(conversionRate, previousConversionRate),
    [conversionRate, previousConversionRate]
  );

  const pipelineValue = useMemo(() => getPipelineValue(filteredLeads), [filteredLeads]);
  const previousPipelineValue = useMemo(() => getPipelineValue(previousLeads), [previousLeads]);
  const pipelineValueGrowth = useMemo(
    () => getGrowthPercentage(pipelineValue, previousPipelineValue),
    [pipelineValue, previousPipelineValue]
  );

  const wonRevenue = useMemo(() => getWonRevenue(filteredLeads), [filteredLeads]);
  const previousWonRevenue = useMemo(() => getWonRevenue(previousLeads), [previousLeads]);
  const wonRevenueGrowth = useMemo(
    () => getGrowthPercentage(wonRevenue, previousWonRevenue),
    [wonRevenue, previousWonRevenue]
  );

  const avgSalesCycle = useMemo(() => getAverageSalesCycle(filteredLeads), [filteredLeads]);
  const previousAvgSalesCycle = useMemo(() => getAverageSalesCycle(previousLeads), [previousLeads]);
  const avgSalesCycleGrowth = useMemo(
    () => getGrowthPercentage(previousAvgSalesCycle, avgSalesCycle), // inverted: lower is better
    [avgSalesCycle, previousAvgSalesCycle]
  );

  const lostRate = useMemo(() => getLostRate(filteredLeads), [filteredLeads]);
  const previousLostRate = useMemo(() => getLostRate(previousLeads), [previousLeads]);
  const lostRateGrowth = useMemo(
    () => getGrowthPercentage(previousLostRate, lostRate), // inverted: lower is better
    [lostRate, previousLostRate]
  );

  // ─── Chart Data ────────────────────────────────────────────────────────────

  const statusDistribution = useMemo(() => getStatusDistribution(filteredLeads), [filteredLeads]);
  const monthlyLeads = useMemo(() => getMonthlyLeads(filteredLeads), [filteredLeads]);
  const conversionByMonth = useMemo(() => getConversionByMonth(filteredLeads), [filteredLeads]);
  const revenueByMonth = useMemo(() => getRevenueByMonth(filteredLeads), [filteredLeads]);
  const leadSourceStats = useMemo(() => getLeadSourceStats(filteredLeads), [filteredLeads]);
  const funnelData = useMemo(() => getFunnelData(filteredLeads), [filteredLeads]);
  const salesVelocity = useMemo(() => getSalesVelocity(filteredLeads), [filteredLeads]);
  const forecastRevenue = useMemo(() => getForecastRevenue(filteredLeads), [filteredLeads]);
  const topPerformers = useMemo(() => getTopPerformers(filteredLeads), [filteredLeads]);
  const activityHeatmap = useMemo(() => getActivityHeatmapData(filteredLeads), [filteredLeads]);

  // ─── Filter Handlers ──────────────────────────────────────────────────────

  const handlePeriodChange = useCallback((newPeriod) => {
    setPeriod(newPeriod);
  }, []);

  const handleCustomRange = useCallback((start, end) => {
    setCustomStart(start);
    setCustomEnd(end);
    setPeriod('custom');
  }, []);

  return {
    // Filter state
    period,
    customStart,
    customEnd,
    handlePeriodChange,
    handleCustomRange,

    // Raw data
    filteredLeads,
    totalLeads,

    // KPI metrics with growth
    kpis: {
      totalLeads: { value: totalLeads, growth: totalLeadsGrowth },
      conversionRate: { value: conversionRate, growth: conversionRateGrowth },
      pipelineValue: { value: pipelineValue, growth: pipelineValueGrowth },
      wonRevenue: { value: wonRevenue, growth: wonRevenueGrowth },
      avgSalesCycle: { value: avgSalesCycle, growth: avgSalesCycleGrowth },
      lostRate: { value: lostRate, growth: lostRateGrowth },
    },

    // Chart data
    statusDistribution,
    monthlyLeads,
    conversionByMonth,
    revenueByMonth,
    leadSourceStats,
    funnelData,
    salesVelocity,
    forecastRevenue,
    topPerformers,
    activityHeatmap,
  };
}
