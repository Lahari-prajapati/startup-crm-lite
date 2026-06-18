/**
 * Analytics color palette for the CRM dashboard.
 * Provides consistent theming across all chart components.
 */

/** Status-based colors for lead pipeline visualization */
export const STATUS_COLORS = {
  New: '#94A3B8',
  Contacted: '#2563EB',
  Meeting: '#F59E0B',
  Proposal: '#7C3AED',
  Won: '#22C55E',
  Lost: '#EF4444',
};

/** Ordered status keys for funnel and pipeline charts */
export const STATUS_ORDER = ['New', 'Contacted', 'Meeting', 'Proposal', 'Won'];

/** Chart accent colors for multi-series visualizations */
export const CHART_COLORS = [
  '#2563EB', // Blue
  '#22C55E', // Green
  '#F59E0B', // Amber
  '#7C3AED', // Violet
  '#EF4444', // Red
  '#06B6D4', // Cyan
  '#EC4899', // Pink
  '#F97316', // Orange
];

/** Source-based colors for lead source attribution charts */
export const SOURCE_COLORS = {
  Website: '#2563EB',
  Referral: '#22C55E',
  LinkedIn: '#0A66C2',
  Instagram: '#E1306C',
  Ads: '#F59E0B',
  'Cold Email': '#7C3AED',
  'Cold Call': '#06B6D4',
  'Email Campaign': '#EC4899',
  Other: '#94A3B8',
};

/** Heatmap intensity scale (lightest → darkest) */
export const HEATMAP_COLORS = [
  '#F1F5F9', // 0 activity
  '#DBEAFE', // Low
  '#93C5FD', // Medium-low
  '#3B82F6', // Medium
  '#1D4ED8', // High
  '#1E3A8A', // Very high
];

/** Medal colors for top performers leaderboard */
export const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];
