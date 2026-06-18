/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * TypeScript-style lead object shape:
 *
 * type Lead = {
 *   id: string;
 *   name: string;
 *   company: string;
 *   email: string;
 *   phone: string;
 *   status: 'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost';
 *   source: 'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other';
 *   createdAt: string; // ISO date
 * };
 */

/**
 * @typedef {Object} Lead
 * @property {string} id
 * @property {string} name
 * @property {string} company
 * @property {string} email
 * @property {string} phone
 * @property {'New'|'Contacted'|'Meeting Scheduled'|'Proposal Sent'|'Won'|'Lost'} status
 * @property {'Website'|'Referral'|'LinkedIn'|'Cold Call'|'Email Campaign'|'Other'} source
 * @property {string} createdAt
 */

/**
 * @typedef {Object} LeadContextValue
 * @property {Lead[]} leads
 * @property {(lead: Omit<Lead, 'id' | 'createdAt'>) => Lead} addLead
 * @property {(id: string, updates: Partial<Omit<Lead, 'id' | 'createdAt'>>) => void} updateLead
 * @property {(id: string) => void} deleteLead
 * @property {(id: string) => Lead | undefined} getLeadById
 */

const STORAGE_KEY = 'crm_leads';

/** @type {Lead[]} */
const INITIAL_LEADS = [
  {
    id: '1',
    name: 'Alice Vance',
    company: 'NovaTech Solutions',
    email: 'alice@novatech.io',
    phone: '+1 (555) 019-2834',
    status: 'New',
    source: 'Website',
    createdAt: '2026-06-15T09:00:00.000Z',
  },
  {
    id: '2',
    name: 'Bob Sterling',
    company: 'Apex Global',
    email: 'bob@apexglobal.co',
    phone: '+1 (555) 014-9218',
    status: 'Contacted',
    source: 'LinkedIn',
    createdAt: '2026-06-12T11:30:00.000Z',
  },
  {
    id: '3',
    name: 'Clara Oswald',
    company: 'Chronos Inc',
    email: 'clara@chronos.org',
    phone: '+1 (555) 017-3849',
    status: 'Proposal Sent',
    source: 'Referral',
    createdAt: '2026-06-16T14:15:00.000Z',
  },
  {
    id: '4',
    name: 'David Miller',
    company: 'Quantum Labs',
    email: 'david@quantumlabs.dev',
    phone: '+1 (555) 011-8293',
    status: 'Won',
    source: 'Cold Call',
    createdAt: '2026-06-10T08:45:00.000Z',
  },
  {
    id: '5',
    name: 'Eva Green',
    company: 'Vertigo Media',
    email: 'eva@vertigo.media',
    phone: '+1 (555) 016-4720',
    status: 'Contacted',
    source: 'Email Campaign',
    createdAt: '2026-06-14T16:00:00.000Z',
  },
];

export const LeadContext = createContext(null);

/**
 * Loads leads from localStorage, falling back to the default seed data.
 *
 * @returns {Lead[]} Stored leads or the initial leads array.
 */
function loadInitialLeads() {
  try {
    const storedLeads = window.localStorage.getItem(STORAGE_KEY);

    if (!storedLeads) {
      return INITIAL_LEADS;
    }

    const parsedLeads = JSON.parse(storedLeads);
    return Array.isArray(parsedLeads) ? parsedLeads : INITIAL_LEADS;
  } catch (error) {
    console.error('[LeadContext] Unable to load leads from localStorage:', error);
    return INITIAL_LEADS;
  }
}

/**
 * Persists leads to localStorage.
 *
 * @param {Lead[]} leads - Leads to persist.
 * @returns {void}
 */
function saveLeads(leads) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (error) {
    console.error('[LeadContext] Unable to save leads to localStorage:', error);
  }
}

/**
 * Creates a unique lead id.
 *
 * @returns {string} Unique id for a lead.
 */
function createLeadId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return String(Date.now());
}

/**
 * Provides lead state and CRUD actions to the application.
 *
 * @param {{ children: React.ReactNode }} props - Provider props.
 * @returns {React.JSX.Element} Lead context provider.
 */
export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(loadInitialLeads);

  /**
   * Adds a new lead with a generated id and createdAt timestamp.
   *
   * @param {Omit<Lead, 'id' | 'createdAt'>} lead - Lead fields from the form.
   * @returns {Lead} Newly created lead.
   */
  const addLead = useCallback((lead) => {
    const newLead = {
      ...lead,
      id: createLeadId(),
      createdAt: new Date().toISOString(),
    };

    setLeads((currentLeads) => {
      const nextLeads = [newLead, ...currentLeads];
      saveLeads(nextLeads);
      return nextLeads;
    });

    return newLead;
  }, []);

  /**
   * Updates an existing lead by id.
   *
   * @param {string} id - Lead id to update.
   * @param {Partial<Omit<Lead, 'id' | 'createdAt'>>} updates - Lead fields to merge.
   * @returns {void}
   */
  const updateLead = useCallback((id, updates) => {
    setLeads((currentLeads) => {
      const nextLeads = currentLeads.map((lead) => {
        if (lead.id !== id) {
          return lead;
        }

        return { ...lead, ...updates, id: lead.id, createdAt: lead.createdAt };
      });

      saveLeads(nextLeads);
      return nextLeads;
    });
  }, []);

  /**
   * Deletes a lead by id.
   *
   * @param {string} id - Lead id to delete.
   * @returns {void}
   */
  const deleteLead = useCallback((id) => {
    setLeads((currentLeads) => {
      const nextLeads = currentLeads.filter((lead) => lead.id !== id);
      saveLeads(nextLeads);
      return nextLeads;
    });
  }, []);

  /**
   * Finds a lead by id.
   *
   * @param {string} id - Lead id to look up.
   * @returns {Lead | undefined} Matching lead when found.
   */
  const getLeadById = useCallback(
    (id) => leads.find((lead) => lead.id === id),
    [leads],
  );

  const value = useMemo(
    () => ({
      leads,
      addLead,
      updateLead,
      deleteLead,
      getLeadById,
    }),
    [addLead, deleteLead, getLeadById, leads, updateLead],
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

/**
 * Reads the LeadContext value.
 *
 * @returns {LeadContextValue} Lead state and CRUD actions.
 * @throws {Error} When used outside LeadProvider.
 */
export function useLeads() {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider.');
  }

  return context;
}
