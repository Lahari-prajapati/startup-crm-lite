import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Users, DollarSign, TrendingUp, Briefcase } from 'lucide-react';

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

  // Mock leads dataset representing typical startup client opportunities.
  // Real data will integrate dynamically in Phase 8.
  const sampleLeads = [
    { id: 1, name: 'Alice Vance', company: 'NovaTech Solutions', email: 'alice@novatech.io', status: 'New', value: '$12,000', dateAdded: '2026-06-15' },
    { id: 2, name: 'Bob Sterling', company: 'Apex Global', email: 'bob@apexglobal.co', status: 'Contacted', value: '$8,500', dateAdded: '2026-06-12' },
    { id: 3, name: 'Clara Oswald', company: 'Chronos Inc', email: 'clara@chronos.org', status: 'Proposal', value: '$19,800', dateAdded: '2026-06-16' },
    { id: 4, name: 'David Miller', company: 'Quantum Labs', email: 'david@quantumlabs.dev', status: 'Closed', value: '$5,000', dateAdded: '2026-06-10' },
    { id: 5, name: 'Eva Green', company: 'Vertigo Media', email: 'eva@vertigo.media', status: 'Contacted', value: '$14,200', dateAdded: '2026-06-14' },
    { id: 6, name: 'Frank Wright', company: 'Solaria Energy', email: 'frank@solaria.com', status: 'New', value: '$22,000', dateAdded: '2026-06-13' },
    { id: 7, name: 'Grace Hopper', company: 'Cobol Corp', email: 'grace@cobol.org', status: 'Closed', value: '$35,000', dateAdded: '2026-06-08' },
    { id: 8, name: 'Henry Cavill', company: 'Steel Dynamics', email: 'henry@steel.co', status: 'Proposal', value: '$27,500', dateAdded: '2026-06-11' },
  ];

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
      const headers = 'ID,Name,Company,Email,Status,Value,Date Added\n';
      const rows = sampleLeads
        .map(
          (lead) =>
            `${lead.id},"${lead.name}","${lead.company}","${lead.email}","${lead.status}","${lead.value}",${lead.dateAdded}`
        )
        .join('\n');
      
      const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `crm_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('CSV Data exported successfully!');
    } catch (error) {
      toast.error('Failed to export leads data.');
      console.error(error);
    }
  };

  // Compute metrics from sample leads
  const activeLeadsCount = sampleLeads.length;
  
  // Calculate total pipeline value (ignoring non-numeric currency characters)
  const totalPipelineValue = sampleLeads.reduce((acc, lead) => {
    const numericValue = parseFloat(lead.value.replace(/[^0-9.]/g, '')) || 0;
    return acc + numericValue;
  }, 0);
  
  // Format total pipeline value as currency format
  const formattedPipelineValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(totalPipelineValue);

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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          value="24.3%"
          icon={TrendingUp}
          change={1.8}
          color="warning"
        />
        <StatsCard
          title="Active Opportunities"
          value={sampleLeads.filter(l => l.status !== 'Closed').length}
          icon={Briefcase}
          change={-2.4}
          color="danger"
        />
      </div>

      {/* Split section - Main components left, side control panel on the right */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Horizontal Segmented Pipeline representation */}
          <PipelineOverview leads={sampleLeads} />

          {/* Tabular summary list of recent leads */}
          <RecentLeads leads={sampleLeads} />
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
