import React, { useState, useEffect } from 'react';
import { Search, Plus, LayoutGrid, List, X, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

import StatusBadge from '../components/leads/StatusBadge';
import LeadForm from '../components/leads/LeadForm';
import LeadCard from '../components/leads/LeadCard';
import LeadTable from '../components/leads/LeadTable';

/**
 * Leads component provides the Lead Management dashboard CRUD workspace.
 * Manages full create, read, update, delete interactions and filter lists.
 *
 * @returns {React.JSX.Element} The rendered leads workspace view.
 */
export default function Leads() {
  // Mock dataset initialized in component state
  const [leads, setLeads] = useState([
    { id: 1, name: 'Alice Vance', company: 'NovaTech Solutions', email: 'alice@novatech.io', phone: '+1 (555) 019-2834', status: 'New', source: 'Website', dateAdded: '2026-06-15' },
    { id: 2, name: 'Bob Sterling', company: 'Apex Global', email: 'bob@apexglobal.co', phone: '+1 (555) 014-9218', status: 'Contacted', source: 'LinkedIn', dateAdded: '2026-06-12' },
    { id: 3, name: 'Clara Oswald', company: 'Chronos Inc', email: 'clara@chronos.org', phone: '+1 (555) 017-3849', status: 'Proposal Sent', source: 'Referral', dateAdded: '2026-06-16' },
    { id: 4, name: 'David Miller', company: 'Quantum Labs', email: 'david@quantumlabs.dev', phone: '+1 (555) 011-8293', status: 'Won', source: 'Cold Call', dateAdded: '2026-06-10' },
    { id: 5, name: 'Eva Green', company: 'Vertigo Media', email: 'eva@vertigo.media', phone: '+1 (555) 016-4720', status: 'Contacted', source: 'Email Campaign', dateAdded: '2026-06-14' },
  ]);

  // Modal and CRUD selected items
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Search and view toggles
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  // Sync keyboard escape key event for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Modal handlers
  const handleOpenCreateModal = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLead(null);
    setIsModalOpen(false);
  };

  // Create or Update Form submit handler
  const handleFormSubmit = (formData) => {
    if (selectedLead) {
      // Edit mode: Update existing entry in state
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === selectedLead.id
            ? { ...lead, ...formData }
            : lead
        )
      );
      toast.success('Lead updated successfully!');
    } else {
      // Create mode: Append new entry to top
      const newLead = {
        id: Date.now(), // Generate a unique numeric identifier
        ...formData,
        dateAdded: new Date().toISOString().slice(0, 10),
      };
      setLeads((prevLeads) => [newLead, ...prevLeads]);
      toast.success('Lead created successfully!');
    }
    handleCloseModal();
  };

  // Delete lead handler
  const handleDeleteLead = (id) => {
    const leadToDelete = leads.find((l) => l.id === id);
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
    
    // Customize red delete notification toast
    toast.error(`Deleted lead for ${leadToDelete ? leadToDelete.name : 'client'}`, {
      icon: '🗑️',
      style: {
        border: '1px solid #EF4444',
        padding: '12px',
        color: '#EF4444',
        background: '#FFF5F5',
      },
    });
  };

  // Filter list based on search term and active status tab
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'All' || lead.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  // Filter tabs mapped from required status categories
  const filterTabs = ['All', 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Title Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Lead Management
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track deals in progress, interact with prospects, and convert opportunities.
          </p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4.5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/95 hover:shadow-primary/30 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="h-4.5 w-4.5" aria-hidden="true" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Control panel: search bar, status tabs, and view mode toggle buttons */}
      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-950">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search bar input container */}
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search leads by name or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-4 pl-11 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filtering status tabs */}
            <div className="flex flex-wrap gap-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-primary text-white shadow-sm shadow-primary/10'
                      : 'text-slate-550 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-205'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Layout representation Toggler (Card vs Table) */}
            <div className="flex rounded-xl bg-slate-50 p-1 dark:bg-slate-900 border border-slate-100 dark:border-slate-850">
              <button
                onClick={() => setViewMode('card')}
                className={`rounded-lg p-1.5 transition-all cursor-pointer ${
                  viewMode === 'card'
                    ? 'bg-white text-primary shadow-xs dark:bg-slate-800'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
                title="Grid Card View"
                aria-label="Toggle grid card layout"
              >
                <LayoutGrid className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`rounded-lg p-1.5 transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-primary shadow-xs dark:bg-slate-800'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
                title="Table List View"
                aria-label="Toggle list table layout"
              >
                <List className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Leads listing area */}
      {viewMode === 'table' ? (
        <>
          {/* Table view is hidden on mobile layout */}
          <div className="hidden md:block">
            <LeadTable
              leads={filteredLeads}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteLead}
            />
          </div>
          {/* Card view stacks naturally on mobile layout */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteLead}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-slate-400 dark:text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Sparkles className="h-6 w-6 text-slate-300" aria-hidden="true" />
                    <span>No leads match search conditions.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Full Grid Layout for Card view mode */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteLead}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-400 dark:text-slate-500">
              <div className="flex flex-col items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-slate-300" aria-hidden="true" />
                <span>No leads match search conditions.</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create / Edit Overlay Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop blur background overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={handleCloseModal}
          />

          {/* Modal Container card */}
          <div className="relative w-full max-w-lg transform rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-950 border border-slate-100 dark:border-slate-900 transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-905 dark:text-white">
                {selectedLead ? 'Edit Lead' : 'Add New Lead'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-200 cursor-pointer transition-colors"
                aria-label="Close form dialog"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <LeadForm
              initialData={selectedLead}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
