import { STATUS_COLORS, STATUS_ORDER } from '../constants/analyticsColors';

/**
 * Normalizes context lead statuses to analytics display statuses.
 * Maps 'Meeting Scheduled' → 'Meeting', 'Proposal Sent' → 'Proposal'.
 *
 * @param {string} status - Raw lead status from context.
 * @returns {string} Normalized status string.
 */
export function normalizeStatus(status) {
  const map = {
    'Meeting Scheduled': 'Meeting',
    'Proposal Sent': 'Proposal',
  };
  return map[status] || status;
}

/**
 * Formats a number as Indian Rupee currency.
 *
 * @param {number} value - Numeric value to format.
 * @returns {string} Formatted currency string (e.g., "₹12,40,000").
 */
export function formatCurrency(value) {
  if (value == null || isNaN(value)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formats a number with Indian locale grouping.
 *
 * @param {number} value - Number to format.
 * @returns {string} Formatted number string.
 */
export function formatNumber(value) {
  if (value == null || isNaN(value)) return '0';
  return new Intl.NumberFormat('en-IN').format(value);
}

/**
 * Returns a short month name from a Date object.
 *
 * @param {Date} date - Date to extract month name from.
 * @returns {string} Short month name (e.g., "Jan").
 */
function getMonthName(date) {
  return date.toLocaleString('en-US', { month: 'short' });
}

/**
 * Generates the last N months as { key, label } objects.
 *
 * @param {number} count - Number of months to generate.
 * @param {Date} [refDate] - Reference date (defaults to now).
 * @returns {Array<{ key: string, label: string }>} Array of month descriptors.
 */
export function getLastNMonths(count = 6, refDate = new Date()) {
  const months = [];
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(refDate.getFullYear(), refDate.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: getMonthName(d),
    });
  }
  return months;
}

/**
 * Filters leads by a given date range based on createdAt.
 *
 * @param {Array} leads - Array of lead objects.
 * @param {Date} startDate - Start of the date range.
 * @param {Date} endDate - End of the date range.
 * @returns {Array} Filtered leads within the date range.
 */
export function filterLeadsByDateRange(leads, startDate, endDate) {
  if (!Array.isArray(leads)) return [];
  return leads.filter((lead) => {
    if (!lead?.createdAt) return false;
    const created = new Date(lead.createdAt);
    return created >= startDate && created <= endDate;
  });
}

/**
 * Computes date range boundaries from a period key.
 *
 * @param {string} period - One of '7d', '30d', '90d', '1y', 'all'.
 * @param {Date} [customStart] - Custom start date.
 * @param {Date} [customEnd] - Custom end date.
 * @returns {{ startDate: Date, endDate: Date }} Date range boundaries.
 */
export function getDateRange(period, customStart, customEnd) {
  const now = new Date();
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  switch (period) {
    case '7d': {
      const start = new Date(endDate);
      start.setDate(start.getDate() - 7);
      start.setHours(0, 0, 0, 0);
      return { startDate: start, endDate };
    }
    case '30d': {
      const start = new Date(endDate);
      start.setDate(start.getDate() - 30);
      start.setHours(0, 0, 0, 0);
      return { startDate: start, endDate };
    }
    case '90d': {
      const start = new Date(endDate);
      start.setDate(start.getDate() - 90);
      start.setHours(0, 0, 0, 0);
      return { startDate: start, endDate };
    }
    case '1y': {
      const start = new Date(endDate);
      start.setFullYear(start.getFullYear() - 1);
      start.setHours(0, 0, 0, 0);
      return { startDate: start, endDate };
    }
    case 'custom': {
      return {
        startDate: customStart ? new Date(customStart) : new Date(0),
        endDate: customEnd ? new Date(customEnd) : endDate,
      };
    }
    default:
      return { startDate: new Date(0), endDate };
  }
}

/**
 * Computes the previous period date range for trend comparison.
 *
 * @param {Date} startDate - Current period start.
 * @param {Date} endDate - Current period end.
 * @returns {{ startDate: Date, endDate: Date }} Previous period range.
 */
export function getPreviousPeriodRange(startDate, endDate) {
  const duration = endDate.getTime() - startDate.getTime();
  return {
    startDate: new Date(startDate.getTime() - duration),
    endDate: new Date(startDate.getTime() - 1),
  };
}

// ─── KPI Computations ──────────────────────────────────────────────────────────

/**
 * Computes the conversion rate (Won / Total).
 *
 * @param {Array} leads - Lead array.
 * @returns {number} Conversion rate as percentage (0–100).
 */
export function getConversionRate(leads) {
  if (!Array.isArray(leads) || leads.length === 0) return 0;
  const won = leads.filter((l) => normalizeStatus(l?.status) === 'Won').length;
  return (won / leads.length) * 100;
}

/**
 * Computes total pipeline value (active leads, excludes Won/Lost).
 *
 * @param {Array} leads - Lead array.
 * @returns {number} Total pipeline value.
 */
export function getPipelineValue(leads) {
  if (!Array.isArray(leads)) return 0;
  return leads
    .filter((l) => {
      const s = normalizeStatus(l?.status);
      return s !== 'Won' && s !== 'Lost';
    })
    .reduce((sum, l) => sum + (Number(l?.value) || 0), 0);
}

/**
 * Computes total revenue from Won leads.
 *
 * @param {Array} leads - Lead array.
 * @returns {number} Sum of Won lead values.
 */
export function getWonRevenue(leads) {
  if (!Array.isArray(leads)) return 0;
  return leads
    .filter((l) => normalizeStatus(l?.status) === 'Won')
    .reduce((sum, l) => sum + (Number(l?.value) || 0), 0);
}

/**
 * Computes average sales cycle length in days (wonAt − createdAt).
 *
 * @param {Array} leads - Lead array.
 * @returns {number} Average cycle length in days, or 0.
 */
export function getAverageSalesCycle(leads) {
  if (!Array.isArray(leads)) return 0;
  const wonLeads = leads.filter(
    (l) => normalizeStatus(l?.status) === 'Won' && l?.createdAt && l?.wonAt
  );
  if (wonLeads.length === 0) return 0;

  const totalDays = wonLeads.reduce((sum, l) => {
    const created = new Date(l.createdAt);
    const won = new Date(l.wonAt);
    const diff = Math.max(0, (won - created) / (1000 * 60 * 60 * 24));
    return sum + diff;
  }, 0);

  return Math.round(totalDays / wonLeads.length);
}

/**
 * Computes the lost rate (Lost / Total).
 *
 * @param {Array} leads - Lead array.
 * @returns {number} Lost rate as percentage (0–100).
 */
export function getLostRate(leads) {
  if (!Array.isArray(leads) || leads.length === 0) return 0;
  const lost = leads.filter((l) => normalizeStatus(l?.status) === 'Lost').length;
  return (lost / leads.length) * 100;
}

// ─── Chart Data Generators ──────────────────────────────────────────────────────

/**
 * Computes lead status distribution for pie chart.
 *
 * @param {Array} leads - Lead array.
 * @returns {Array<{ name: string, value: number, color: string }>} Distribution data.
 */
export function getStatusDistribution(leads) {
  if (!Array.isArray(leads)) return [];
  const counts = {};

  leads.forEach((lead) => {
    const status = normalizeStatus(lead?.status);
    counts[status] = (counts[status] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([name, value]) => ({
      name,
      value,
      color: STATUS_COLORS[name] || '#94A3B8',
    }))
    .sort((a, b) => b.value - a.value);
}

/**
 * Groups leads by month for the bar chart.
 *
 * @param {Array} leads - Lead array.
 * @param {number} [monthCount=6] - Number of trailing months to include.
 * @returns {Array<{ month: string, count: number }>} Monthly lead counts.
 */
export function getMonthlyLeads(leads, monthCount = 6) {
  const months = getLastNMonths(monthCount);
  const counts = {};

  months.forEach((m) => {
    counts[m.key] = 0;
  });

  if (Array.isArray(leads)) {
    leads.forEach((lead) => {
      if (!lead?.createdAt) return;
      const d = new Date(lead.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (key in counts) {
        counts[key]++;
      }
    });
  }

  return months.map((m) => ({
    month: m.label,
    count: counts[m.key],
  }));
}

/**
 * Computes monthly conversion rate (Won / Total per month).
 *
 * @param {Array} leads - Lead array.
 * @param {number} [monthCount=6] - Number of trailing months.
 * @returns {Array<{ month: string, rate: number }>} Monthly conversion rates.
 */
export function getConversionByMonth(leads, monthCount = 6) {
  const months = getLastNMonths(monthCount);
  const grouped = {};

  months.forEach((m) => {
    grouped[m.key] = { total: 0, won: 0 };
  });

  if (Array.isArray(leads)) {
    leads.forEach((lead) => {
      if (!lead?.createdAt) return;
      const d = new Date(lead.createdAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (key in grouped) {
        grouped[key].total++;
        if (normalizeStatus(lead?.status) === 'Won') {
          grouped[key].won++;
        }
      }
    });
  }

  return months.map((m) => ({
    month: m.label,
    rate: grouped[m.key].total > 0
      ? Math.round((grouped[m.key].won / grouped[m.key].total) * 100)
      : 0,
  }));
}

/**
 * Computes monthly revenue from Won leads.
 *
 * @param {Array} leads - Lead array.
 * @param {number} [monthCount=6] - Number of trailing months.
 * @returns {Array<{ month: string, revenue: number }>} Monthly revenue data.
 */
export function getRevenueByMonth(leads, monthCount = 6) {
  const months = getLastNMonths(monthCount);
  const revenue = {};

  months.forEach((m) => {
    revenue[m.key] = 0;
  });

  if (Array.isArray(leads)) {
    leads.forEach((lead) => {
      if (normalizeStatus(lead?.status) !== 'Won') return;
      const dateField = lead?.wonAt || lead?.createdAt;
      if (!dateField) return;
      const d = new Date(dateField);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (key in revenue) {
        revenue[key] += Number(lead?.value) || 0;
      }
    });
  }

  return months.map((m) => ({
    month: m.label,
    revenue: revenue[m.key],
  }));
}

/**
 * Computes lead source distribution for horizontal bar chart.
 *
 * @param {Array} leads - Lead array.
 * @returns {Array<{ source: string, count: number }>} Sources sorted descending.
 */
export function getLeadSourceStats(leads) {
  if (!Array.isArray(leads)) return [];
  const counts = {};

  leads.forEach((lead) => {
    const source = lead?.source || 'Other';
    counts[source] = (counts[source] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Computes funnel data for the sales pipeline funnel chart.
 *
 * @param {Array} leads - Lead array.
 * @returns {Array<{ stage: string, count: number, percentage: number, dropoff: number, color: string }>}
 */
export function getFunnelData(leads) {
  if (!Array.isArray(leads) || leads.length === 0) return [];

  const counts = {};
  STATUS_ORDER.forEach((s) => {
    counts[s] = 0;
  });

  // For funnel, we count cumulative progression: a Won lead has passed through all stages
  leads.forEach((lead) => {
    const status = normalizeStatus(lead?.status);
    if (status === 'Lost') return; // Lost leads drop out

    const stageIndex = STATUS_ORDER.indexOf(status);
    if (stageIndex === -1) return;

    // Count this lead in its stage and all prior stages
    for (let i = 0; i <= stageIndex; i++) {
      counts[STATUS_ORDER[i]]++;
    }
  });

  const topCount = counts[STATUS_ORDER[0]] || 1;

  return STATUS_ORDER.map((stage, i) => ({
    stage,
    count: counts[stage],
    percentage: Math.round((counts[stage] / topCount) * 100),
    dropoff: i > 0 ? Math.round(((counts[STATUS_ORDER[i - 1]] - counts[stage]) / (counts[STATUS_ORDER[i - 1]] || 1)) * 100) : 0,
    color: STATUS_COLORS[stage],
  }));
}

/**
 * Computes sales velocity metric.
 * Formula: (Opportunities × Win Rate × Avg Deal Size) / Sales Cycle Length
 *
 * @param {Array} leads - Lead array.
 * @returns {{ velocity: number, opportunities: number, winRate: number, avgDealSize: number, cycleLength: number }}
 */
export function getSalesVelocity(leads) {
  if (!Array.isArray(leads) || leads.length === 0) {
    return { velocity: 0, opportunities: 0, winRate: 0, avgDealSize: 0, cycleLength: 1 };
  }

  const activePipeline = leads.filter((l) => {
    const s = normalizeStatus(l?.status);
    return s !== 'Lost';
  });

  const opportunities = activePipeline.length;
  const wonLeads = leads.filter((l) => normalizeStatus(l?.status) === 'Won');
  const winRate = leads.length > 0 ? wonLeads.length / leads.length : 0;

  const totalValue = wonLeads.reduce((sum, l) => sum + (Number(l?.value) || 0), 0);
  const avgDealSize = wonLeads.length > 0 ? totalValue / wonLeads.length : 0;

  const cycleLength = getAverageSalesCycle(leads) || 1;
  const velocity = (opportunities * winRate * avgDealSize) / cycleLength;

  return {
    velocity: Math.round(velocity),
    opportunities,
    winRate: Math.round(winRate * 100),
    avgDealSize: Math.round(avgDealSize),
    cycleLength,
  };
}

/**
 * Forecasts next month's revenue based on average of last N months.
 *
 * @param {Array} leads - Lead array.
 * @param {number} [monthCount=6] - Number of months to average.
 * @returns {{ predicted: number, confidence: number, trend: number }}
 */
export function getForecastRevenue(leads, monthCount = 6) {
  const monthlyData = getRevenueByMonth(leads, monthCount);
  const revenues = monthlyData.map((m) => m.revenue);
  const nonZeroRevenues = revenues.filter((r) => r > 0);

  if (nonZeroRevenues.length === 0) {
    return { predicted: 0, confidence: 0, trend: 0 };
  }

  const average = nonZeroRevenues.reduce((a, b) => a + b, 0) / nonZeroRevenues.length;

  // Trend: compare last 3 months average vs first 3 months average
  const recentMonths = revenues.slice(-3);
  const olderMonths = revenues.slice(0, 3);
  const recentAvg = recentMonths.reduce((a, b) => a + b, 0) / 3;
  const olderAvg = olderMonths.reduce((a, b) => a + b, 0) / 3;
  const trend = olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0;

  // Confidence based on data consistency (lower standard deviation = higher confidence)
  const variance = nonZeroRevenues.reduce((sum, r) => sum + Math.pow(r - average, 2), 0) / nonZeroRevenues.length;
  const stdDev = Math.sqrt(variance);
  const cv = average > 0 ? stdDev / average : 1;
  const confidence = Math.max(20, Math.min(95, Math.round(100 - cv * 100)));

  // Predicted using weighted average (more weight on recent months)
  const weights = revenues.map((_, i) => i + 1);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const weighted = revenues.reduce((sum, r, i) => sum + r * weights[i], 0) / totalWeight;
  const predicted = Math.round(weighted * (1 + trend / 200)); // slight trend adjustment

  return {
    predicted: Math.max(0, predicted),
    confidence,
    trend: Math.round(trend),
  };
}

/**
 * Ranks sales reps by total Won revenue.
 *
 * @param {Array} leads - Lead array.
 * @returns {Array<{ name: string, revenue: number, deals: number }>}
 */
export function getTopPerformers(leads) {
  if (!Array.isArray(leads)) return [];

  const performers = {};

  leads.forEach((lead) => {
    if (normalizeStatus(lead?.status) !== 'Won') return;
    const owner = lead?.owner || 'Unassigned';
    if (!performers[owner]) {
      performers[owner] = { revenue: 0, deals: 0 };
    }
    performers[owner].revenue += Number(lead?.value) || 0;
    performers[owner].deals++;
  });

  return Object.entries(performers)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue);
}

/**
 * Generates GitHub-style activity heatmap data.
 * Shows the last 26 weeks (≈6 months) of lead activity.
 *
 * @param {Array} leads - Lead array.
 * @returns {{ weeks: Array<Array<{ date: string, count: number, level: number }>>, maxCount: number }}
 */
export function getActivityHeatmapData(leads) {
  if (!Array.isArray(leads)) return { weeks: [], maxCount: 0 };

  // Count activities per day
  const activityMap = {};
  leads.forEach((lead) => {
    const dates = [lead?.createdAt, lead?.contactedAt, lead?.meetingAt].filter(Boolean);
    dates.forEach((d) => {
      const key = new Date(d).toISOString().slice(0, 10);
      activityMap[key] = (activityMap[key] || 0) + 1;
    });
  });

  const maxCount = Math.max(1, ...Object.values(activityMap));
  const weeks = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get the start of the current week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  // Go back 25 weeks to get 26 weeks total
  const startDate = new Date(startOfWeek);
  startDate.setDate(startDate.getDate() - 25 * 7);

  for (let w = 0; w < 26; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(cellDate.getDate() + w * 7 + d);
      const key = cellDate.toISOString().slice(0, 10);
      const count = activityMap[key] || 0;

      // Compute intensity level (0–4)
      let level = 0;
      if (count > 0) {
        level = Math.min(4, Math.ceil((count / maxCount) * 4));
      }

      week.push({
        date: key,
        count,
        level,
        isFuture: cellDate > today,
      });
    }
    weeks.push(week);
  }

  return { weeks, maxCount };
}

/**
 * Computes growth percentage between current and previous period values.
 *
 * @param {number} current - Current period value.
 * @param {number} previous - Previous period value.
 * @returns {number} Growth percentage (can be negative).
 */
export function getGrowthPercentage(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}
