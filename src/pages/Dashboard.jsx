import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Users, DollarSign, TrendingUp, Briefcase } from 'lucide-react';

import { useLeads } from '../context/LeadContext';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';

/**
 * Dashboard page component representing the main landing workspace of the CRM.
 * Renders statistical metrics, quick actions, and recent activity streams.
 *
 * @returns {React.JSX.Element} The rendered dashboard page view.
 */
export default function Dashboard() {
  const navigate = useNavigate();
  const { leads } = useLeads();

  /**
   * Maps the context lead shape to the shape expected by the dashboard
   * sub-components (RecentLeads, PipelineOverview).
   *
   * Context leads use `createdAt` and granular statuses ('Proposal Sent',
   * 'Won', 'Lost') while the dashboard widgets expect `dateAdded` and
   * coarser statuses ('Proposal', 'Closed').
   *
   * @param {import('../context/LeadContext').Lead} lead
   * @returns {object} Dashboard-shaped lead.
   */
  const toDashboardLead = (lead) => {
    // Map pipeline statuses to the coarser dashboard categories
    let dashboardStatus;
    switch (lead.status) {
      case 'New':
        dashboardStatus = 'New';
        break;
      case 'Contacted':
      case 'Meeting Scheduled':
        dashboardStatus = 'Contacted';
        break;
      case 'Proposal Sent':
        dashboardStatus = 'Proposal';
        break;
      case 'Won':
      case 'Lost':
        dashboardStatus = 'Closed';
        break;
      default:
        dashboardStatus = lead.status;
    }

    return {
      ...lead,
      dateAdded: lead.createdAt ? lead.createdAt.slice(0, 10) : lead.dateAdded,
      status: dashboardStatus,
      value: lead.value || '$0',
    };
  };

  /** Dashboard-shaped leads for sub-components */
  const dashboardLeads = leads.map(toDashboardLead);

  // Callback handlers for QuickActions component
  const handleAddLead = () => {
    toast.success('Opening lead creation module...');
    navigate('/leads');
  };

  const handleViewAll = () => {
    navigate('/leads');
  };

  const handleExport = () => {
    // Generate simple mock CSV export file and trigger browser download
    try {
      const headers = 'ID,Name,Company,Email,Status,Source,Created At\n';
      const rows = leads
        .map(
          (lead) =>
            `${lead.id},"${lead.name}","${lead.company}","${lead.email}","${lead.status}","${lead.source}",${lead.createdAt}`
        )
        .join('\n');

      // Add UTF-8 BOM prefix for Excel compatibility
      const blob = new Blob(['\uFEFF' + headers + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.style.display = 'none';
      link.setAttribute('download', `crm_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      
      // Delay removal to allow browsers (especially Chrome/Firefox) to process the click and download
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 150);

      toast.success('CSV Data exported successfully!');
    } catch (error) {
      toast.error('Failed to export leads data.');
      console.error(error);
    }
  };

  // Compute metrics from context leads
  const activeLeadsCount = leads.length;
  const closedLeadsCount = leads.filter((l) => l.status === 'Won' || l.status === 'Lost').length;

  // Calculate total pipeline value (leads without a value field get $0)
  const totalPipelineValue = leads.reduce((acc, lead) => {
    if (!lead.value) return acc;
    const numericValue = parseFloat(String(lead.value).replace(/[^0-9.]/g, '')) || 0;
    return acc + numericValue;
  }, 0);

  // Format total pipeline value as currency format
  const formattedPipelineValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(totalPipelineValue);

  // Conversion rate: closed / total (guard against zero)
  const conversionRate = activeLeadsCount > 0
    ? ((closedLeadsCount / activeLeadsCount) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header section with heading and modern subtle descriptive subtitle */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            CRM Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Monitor startup metrics, track client interaction, and manage pipeline health.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid - Responsive columns: 1 on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Leads"
          value={activeLeadsCount}
          icon={Users}
          change={12.4}
          color="primary"
        />
        <StatsCard
          title="Pipeline Value"
          value={formattedPipelineValue}
          icon={DollarSign}
          change={8.2}
          color="success"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          icon={TrendingUp}
          change={1.8}
          color="warning"
        />
        <StatsCard
          title="Active Opportunities"
          value={leads.filter(l => l.status !== 'Won' && l.status !== 'Lost').length}
          icon={Briefcase}
          change={-2.4}
          color="danger"
        />
      </div>

      {/* Split section - Main components left, side control panel on the right */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {/* Charts Section: Full width on tablet, 2 columns on desktop */}
        <div className="grid grid-cols-1 gap-8 lg:col-span-2 xl:col-span-3 xl:grid-cols-2">
          {/* Horizontal Segmented Pipeline representation */}
          <div className="flex w-full flex-col">
             <PipelineOverview leads={dashboardLeads} />
          </div>

          {/* Tabular summary list of recent leads */}
          <div className="flex w-full flex-col">
             <RecentLeads leads={dashboardLeads} />
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Operations action cards */}
          <QuickActions
            onAddLead={handleAddLead}
            onViewAll={handleViewAll}
            onExport={handleExport}
          />
        </div>
      </div>
    </div>
  );
}
