import { useEffect, useState } from 'react';
import { Plus, LayoutGrid, List, X } from 'lucide-react';
import toast from 'react-hot-toast';

import { useLeads } from '../context/LeadContext';
import LeadForm from '../components/leads/LeadForm';
import LeadCard from '../components/leads/LeadCard';
import LeadTable from '../components/leads/LeadTable';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';

/**
 * Leads component provides the Lead Management dashboard CRUD workspace.
 * Consumes the global LeadContext for all lead data and CRUD operations.
 *
 * @returns {React.JSX.Element} The rendered leads workspace view.
 */
export default function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();

  // Modal and CRUD selected items
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Search, filter, and view mode state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

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

  /**
   * Creates or updates a lead from submitted form data.
   *
   * @param {object} formData - The form values from LeadForm.
   * @returns {void}
   */
  const handleFormSubmit = (formData) => {
    if (selectedLead) {
      updateLead(selectedLead.id, formData);
      toast.success('Lead updated successfully!');
    } else {
      addLead(formData);
      toast.success('Lead created successfully!');
    }
    handleCloseModal();
  };

  /**
   * Deletes a lead and shows a confirmation toast.
   *
   * @param {string} id - Lead id to remove.
   * @returns {void}
   */
  const handleDeleteLead = (id) => {
    const leadToDelete = leads.find((l) => l.id === id);
    deleteLead(id);

    toast.error(`Deleted lead for ${leadToDelete ? leadToDelete.name : 'client'}`, {
      style: {
        border: '1px solid #EF4444',
        padding: '12px',
        color: '#EF4444',
        background: '#FFF5F5',
      },
    });
  };

  // Reset all search and filter state to defaults
  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  // Derived: leads filtered by active status tab AND search query
  const filteredLeads = leads
    .filter((lead) => activeFilter === 'All' || lead.status === activeFilter)
    .filter((lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // True when any filter or search query is active
  const hasFiltersActive = activeFilter !== 'All' || searchQuery.trim() !== '';

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

      {/* Control panel: SearchBar, FilterBar, and view mode toggle */}
      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-950">
        {/* Top row: Search + View toggle */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          {/* Layout representation Toggler (Card vs Table) */}
          <div className="flex shrink-0 rounded-xl bg-slate-50 p-1 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
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

        {/* Bottom row: FilterBar */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            leads={leads}
          />
        </div>
      </div>

      {/* Leads listing area */}
      {filteredLeads.length === 0 ? (
        /* Empty state shown for both zero total leads and zero filtered results */
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-950">
          <EmptyState
            totalLeadsCount={leads.length}
            hasFiltersActive={hasFiltersActive}
            onClearFilters={handleClearFilters}
          />
        </div>
      ) : viewMode === 'table' ? (
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
              {filteredLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteLead}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Full Grid Layout for Card view mode */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteLead}
            />
          ))}
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
