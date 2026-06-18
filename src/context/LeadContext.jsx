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
 *   source: 'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Instagram' | 'Ads' | 'Cold Email' | 'Other';
 *   value: number;
 *   owner: string;
 *   createdAt: string; // ISO date
 *   contactedAt?: string; // ISO date
 *   meetingAt?: string; // ISO date
 *   proposalAt?: string; // ISO date
 *   wonAt?: string; // ISO date
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
 * @property {'Website'|'Referral'|'LinkedIn'|'Cold Call'|'Email Campaign'|'Instagram'|'Ads'|'Cold Email'|'Other'} source
 * @property {number} [value]
 * @property {string} [owner]
 * @property {string} createdAt
 * @property {string} [contactedAt]
 * @property {string} [meetingAt]
 * @property {string} [proposalAt]
 * @property {string} [wonAt]
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
  // ─── January 2026 Leads ──────────────────────────────────────────────────
  { id: '1', name: 'Alice Vance', company: 'NovaTech Solutions', email: 'alice@novatech.io', phone: '+91 9876543210', status: 'Won', source: 'Website', value: 45000, owner: 'Sarah', createdAt: '2026-01-05T09:00:00.000Z', contactedAt: '2026-01-06T11:00:00.000Z', meetingAt: '2026-01-10T15:00:00.000Z', proposalAt: '2026-01-14T10:00:00.000Z', wonAt: '2026-01-20T12:00:00.000Z' },
  { id: '2', name: 'Bob Sterling', company: 'Apex Global', email: 'bob@apexglobal.co', phone: '+91 9876543211', status: 'Won', source: 'LinkedIn', value: 32000, owner: 'Alex', createdAt: '2026-01-08T11:30:00.000Z', contactedAt: '2026-01-09T14:00:00.000Z', meetingAt: '2026-01-13T10:00:00.000Z', proposalAt: '2026-01-17T09:00:00.000Z', wonAt: '2026-01-25T16:00:00.000Z' },
  { id: '3', name: 'Clara Oswald', company: 'Chronos Inc', email: 'clara@chronos.org', phone: '+91 9876543212', status: 'Lost', source: 'Referral', value: 28000, owner: 'David', createdAt: '2026-01-12T14:15:00.000Z', contactedAt: '2026-01-14T09:00:00.000Z', meetingAt: '2026-01-18T11:00:00.000Z' },
  { id: '4', name: 'David Miller', company: 'Quantum Labs', email: 'david@quantumlabs.dev', phone: '+91 9876543213', status: 'Won', source: 'Cold Email', value: 55000, owner: 'Sarah', createdAt: '2026-01-15T08:45:00.000Z', contactedAt: '2026-01-16T10:00:00.000Z', meetingAt: '2026-01-20T14:00:00.000Z', proposalAt: '2026-01-24T10:00:00.000Z', wonAt: '2026-01-30T12:00:00.000Z' },
  { id: '5', name: 'Eva Green', company: 'Vertigo Media', email: 'eva@vertigo.media', phone: '+91 9876543214', status: 'Lost', source: 'Ads', value: 18000, owner: 'Priya', createdAt: '2026-01-18T16:00:00.000Z', contactedAt: '2026-01-20T10:00:00.000Z' },
  { id: '6', name: 'Frank Castle', company: 'Vigilante Corp', email: 'frank@vigilante.io', phone: '+91 9876543215', status: 'Won', source: 'LinkedIn', value: 42000, owner: 'Alex', createdAt: '2026-01-22T10:00:00.000Z', contactedAt: '2026-01-23T14:00:00.000Z', meetingAt: '2026-01-27T15:00:00.000Z', proposalAt: '2026-01-30T10:00:00.000Z', wonAt: '2026-02-05T12:00:00.000Z' },

  // ─── February 2026 Leads ─────────────────────────────────────────────────
  { id: '7', name: 'Grace Hopper', company: 'ByteForge Systems', email: 'grace@byteforge.ai', phone: '+91 9876543216', status: 'Won', source: 'Website', value: 67000, owner: 'Sarah', createdAt: '2026-02-02T09:30:00.000Z', contactedAt: '2026-02-03T11:00:00.000Z', meetingAt: '2026-02-07T14:00:00.000Z', proposalAt: '2026-02-12T10:00:00.000Z', wonAt: '2026-02-18T15:00:00.000Z' },
  { id: '8', name: 'Henry Cavill', company: 'MetroTech', email: 'henry@metrotech.co', phone: '+91 9876543217', status: 'Lost', source: 'Cold Call', value: 23000, owner: 'David', createdAt: '2026-02-05T13:00:00.000Z', contactedAt: '2026-02-06T10:00:00.000Z', meetingAt: '2026-02-10T11:00:00.000Z' },
  { id: '9', name: 'Irene Adler', company: 'Enigma Solutions', email: 'irene@enigma.dev', phone: '+91 9876543218', status: 'Won', source: 'Referral', value: 38000, owner: 'Priya', createdAt: '2026-02-08T10:00:00.000Z', contactedAt: '2026-02-09T14:00:00.000Z', meetingAt: '2026-02-13T10:00:00.000Z', proposalAt: '2026-02-17T09:00:00.000Z', wonAt: '2026-02-22T12:00:00.000Z' },
  { id: '10', name: 'Jake Peralta', company: 'Nine-Nine Tech', email: 'jake@ninenine.io', phone: '+91 9876543219', status: 'Won', source: 'LinkedIn', value: 51000, owner: 'Alex', createdAt: '2026-02-12T11:00:00.000Z', contactedAt: '2026-02-13T15:00:00.000Z', meetingAt: '2026-02-17T10:00:00.000Z', proposalAt: '2026-02-21T10:00:00.000Z', wonAt: '2026-02-27T14:00:00.000Z' },
  { id: '11', name: 'Karen Page', company: 'Daily Bugle Media', email: 'karen@dailybugle.com', phone: '+91 9876543220', status: 'Lost', source: 'Email Campaign', value: 19000, owner: 'Sarah', createdAt: '2026-02-15T08:00:00.000Z', contactedAt: '2026-02-16T10:00:00.000Z' },
  { id: '12', name: 'Leo Messi', company: 'Goat Analytics', email: 'leo@goatanalytics.co', phone: '+91 9876543221', status: 'Won', source: 'Instagram', value: 72000, owner: 'David', createdAt: '2026-02-20T14:00:00.000Z', contactedAt: '2026-02-21T10:00:00.000Z', meetingAt: '2026-02-25T15:00:00.000Z', proposalAt: '2026-03-01T09:00:00.000Z', wonAt: '2026-03-05T12:00:00.000Z' },
  { id: '13', name: 'Maya Angelou', company: 'Spoken Word Inc', email: 'maya@spokenword.io', phone: '+91 9876543222', status: 'Lost', source: 'Website', value: 15000, owner: 'Priya', createdAt: '2026-02-24T09:00:00.000Z', contactedAt: '2026-02-25T14:00:00.000Z', meetingAt: '2026-02-28T11:00:00.000Z' },

  // ─── March 2026 Leads ────────────────────────────────────────────────────
  { id: '14', name: 'Nate Silver', company: 'FiveThirtyEight AI', email: 'nate@538ai.com', phone: '+91 9876543223', status: 'Won', source: 'Referral', value: 85000, owner: 'Sarah', createdAt: '2026-03-01T10:00:00.000Z', contactedAt: '2026-03-02T11:00:00.000Z', meetingAt: '2026-03-06T14:00:00.000Z', proposalAt: '2026-03-10T10:00:00.000Z', wonAt: '2026-03-18T12:00:00.000Z' },
  { id: '15', name: 'Olivia Pope', company: 'Gladiators PR', email: 'olivia@gladiators.co', phone: '+91 9876543224', status: 'Won', source: 'LinkedIn', value: 44000, owner: 'Alex', createdAt: '2026-03-04T13:00:00.000Z', contactedAt: '2026-03-05T10:00:00.000Z', meetingAt: '2026-03-09T15:00:00.000Z', proposalAt: '2026-03-13T10:00:00.000Z', wonAt: '2026-03-19T14:00:00.000Z' },
  { id: '16', name: 'Paul Graham', company: 'YC Ventures', email: 'pg@ycventures.io', phone: '+91 9876543225', status: 'Lost', source: 'Cold Email', value: 120000, owner: 'Sarah', createdAt: '2026-03-07T09:00:00.000Z', contactedAt: '2026-03-08T14:00:00.000Z', meetingAt: '2026-03-12T11:00:00.000Z', proposalAt: '2026-03-16T10:00:00.000Z' },
  { id: '17', name: 'Quinn Hughes', company: 'IceBreaker SaaS', email: 'quinn@icebreaker.dev', phone: '+91 9876543226', status: 'Won', source: 'Website', value: 36000, owner: 'David', createdAt: '2026-03-10T11:00:00.000Z', contactedAt: '2026-03-11T10:00:00.000Z', meetingAt: '2026-03-15T14:00:00.000Z', proposalAt: '2026-03-19T10:00:00.000Z', wonAt: '2026-03-25T12:00:00.000Z' },
  { id: '18', name: 'Rachel Green', company: 'Fashion Forward', email: 'rachel@fashionfw.co', phone: '+91 9876543227', status: 'Won', source: 'Instagram', value: 29000, owner: 'Priya', createdAt: '2026-03-13T15:00:00.000Z', contactedAt: '2026-03-14T11:00:00.000Z', meetingAt: '2026-03-18T10:00:00.000Z', proposalAt: '2026-03-22T09:00:00.000Z', wonAt: '2026-03-28T14:00:00.000Z' },
  { id: '19', name: 'Sam Wilson', company: 'Falcon Systems', email: 'sam@falconsys.io', phone: '+91 9876543228', status: 'Lost', source: 'Ads', value: 22000, owner: 'Alex', createdAt: '2026-03-16T10:00:00.000Z', contactedAt: '2026-03-17T14:00:00.000Z' },
  { id: '20', name: 'Tina Turner', company: 'Thunderdome Tech', email: 'tina@thunderdome.ai', phone: '+91 9876543229', status: 'Won', source: 'Referral', value: 58000, owner: 'Sarah', createdAt: '2026-03-20T09:00:00.000Z', contactedAt: '2026-03-21T10:00:00.000Z', meetingAt: '2026-03-25T15:00:00.000Z', proposalAt: '2026-03-29T10:00:00.000Z', wonAt: '2026-04-03T12:00:00.000Z' },
  { id: '21', name: 'Uma Thurman', company: 'Kill Bill Software', email: 'uma@killbillsw.co', phone: '+91 9876543230', status: 'Lost', source: 'Cold Call', value: 31000, owner: 'David', createdAt: '2026-03-24T14:00:00.000Z', contactedAt: '2026-03-25T10:00:00.000Z', meetingAt: '2026-03-29T11:00:00.000Z' },

  // ─── April 2026 Leads ────────────────────────────────────────────────────
  { id: '22', name: 'Victor Hugo', company: 'Les Misérables SaaS', email: 'victor@lesmis.dev', phone: '+91 9876543231', status: 'Won', source: 'LinkedIn', value: 63000, owner: 'Alex', createdAt: '2026-04-02T10:00:00.000Z', contactedAt: '2026-04-03T11:00:00.000Z', meetingAt: '2026-04-07T14:00:00.000Z', proposalAt: '2026-04-11T10:00:00.000Z', wonAt: '2026-04-18T12:00:00.000Z' },
  { id: '23', name: 'Wanda Maximoff', company: 'Hex Solutions', email: 'wanda@hexsol.io', phone: '+91 9876543232', status: 'Won', source: 'Website', value: 47000, owner: 'Sarah', createdAt: '2026-04-05T09:00:00.000Z', contactedAt: '2026-04-06T14:00:00.000Z', meetingAt: '2026-04-10T15:00:00.000Z', proposalAt: '2026-04-14T10:00:00.000Z', wonAt: '2026-04-20T14:00:00.000Z' },
  { id: '24', name: 'Xavier Charles', company: 'Cerebro AI', email: 'xavier@cerebroai.com', phone: '+91 9876543233', status: 'Lost', source: 'Email Campaign', value: 35000, owner: 'Priya', createdAt: '2026-04-08T11:00:00.000Z', contactedAt: '2026-04-09T10:00:00.000Z', meetingAt: '2026-04-13T10:00:00.000Z', proposalAt: '2026-04-17T09:00:00.000Z' },
  { id: '25', name: 'Yara Shahidi', company: 'Grown-ish Media', email: 'yara@grownish.co', phone: '+91 9876543234', status: 'Won', source: 'Instagram', value: 41000, owner: 'David', createdAt: '2026-04-11T13:00:00.000Z', contactedAt: '2026-04-12T10:00:00.000Z', meetingAt: '2026-04-16T14:00:00.000Z', proposalAt: '2026-04-20T10:00:00.000Z', wonAt: '2026-04-26T12:00:00.000Z' },
  { id: '26', name: 'Zoe Saldana', company: 'Gamora Industries', email: 'zoe@gamora.io', phone: '+91 9876543235', status: 'Won', source: 'Referral', value: 53000, owner: 'Sarah', createdAt: '2026-04-14T10:00:00.000Z', contactedAt: '2026-04-15T11:00:00.000Z', meetingAt: '2026-04-19T15:00:00.000Z', proposalAt: '2026-04-23T10:00:00.000Z', wonAt: '2026-04-29T14:00:00.000Z' },
  { id: '27', name: 'Adam Scott', company: 'Severance Tech', email: 'adam@severance.dev', phone: '+91 9876543236', status: 'Lost', source: 'Cold Email', value: 26000, owner: 'Alex', createdAt: '2026-04-18T09:00:00.000Z', contactedAt: '2026-04-19T14:00:00.000Z' },
  { id: '28', name: 'Bella Swan', company: 'Twilight Analytics', email: 'bella@twilight.io', phone: '+91 9876543237', status: 'Won', source: 'Ads', value: 39000, owner: 'Priya', createdAt: '2026-04-22T14:00:00.000Z', contactedAt: '2026-04-23T10:00:00.000Z', meetingAt: '2026-04-27T11:00:00.000Z', proposalAt: '2026-05-01T10:00:00.000Z', wonAt: '2026-05-06T12:00:00.000Z' },
  { id: '29', name: 'Carol Danvers', company: 'Captain Marvel Co', email: 'carol@captainmarvel.ai', phone: '+91 9876543238', status: 'Won', source: 'LinkedIn', value: 78000, owner: 'Sarah', createdAt: '2026-04-25T10:00:00.000Z', contactedAt: '2026-04-26T11:00:00.000Z', meetingAt: '2026-04-30T14:00:00.000Z', proposalAt: '2026-05-04T10:00:00.000Z', wonAt: '2026-05-10T12:00:00.000Z' },

  // ─── May 2026 Leads ──────────────────────────────────────────────────────
  { id: '30', name: 'Derek Hale', company: 'Wolf Pack Software', email: 'derek@wolfpack.dev', phone: '+91 9876543239', status: 'Won', source: 'Website', value: 56000, owner: 'Alex', createdAt: '2026-05-01T09:00:00.000Z', contactedAt: '2026-05-02T10:00:00.000Z', meetingAt: '2026-05-06T14:00:00.000Z', proposalAt: '2026-05-10T10:00:00.000Z', wonAt: '2026-05-16T12:00:00.000Z' },
  { id: '31', name: 'Elena Gilbert', company: 'Mystic Falls Tech', email: 'elena@mysticfalls.io', phone: '+91 9876543240', status: 'Lost', source: 'Cold Call', value: 21000, owner: 'David', createdAt: '2026-05-03T13:00:00.000Z', contactedAt: '2026-05-04T10:00:00.000Z', meetingAt: '2026-05-08T11:00:00.000Z' },
  { id: '32', name: 'Finn Hudson', company: 'Glee Platforms', email: 'finn@gleeplatforms.co', phone: '+91 9876543241', status: 'Won', source: 'Referral', value: 44000, owner: 'Sarah', createdAt: '2026-05-06T10:00:00.000Z', contactedAt: '2026-05-07T14:00:00.000Z', meetingAt: '2026-05-11T15:00:00.000Z', proposalAt: '2026-05-15T10:00:00.000Z', wonAt: '2026-05-21T12:00:00.000Z' },
  { id: '33', name: 'Gina Rodriguez', company: 'Jane The Virgin AI', email: 'gina@janethevirgin.co', phone: '+91 9876543242', status: 'Won', source: 'Instagram', value: 62000, owner: 'Priya', createdAt: '2026-05-09T11:00:00.000Z', contactedAt: '2026-05-10T10:00:00.000Z', meetingAt: '2026-05-14T14:00:00.000Z', proposalAt: '2026-05-18T10:00:00.000Z', wonAt: '2026-05-24T14:00:00.000Z' },
  { id: '34', name: 'Hank Pym', company: 'Ant-Man Labs', email: 'hank@antmanlabs.dev', phone: '+91 9876543243', status: 'Lost', source: 'Ads', value: 33000, owner: 'Alex', createdAt: '2026-05-12T09:00:00.000Z', contactedAt: '2026-05-13T14:00:00.000Z', meetingAt: '2026-05-17T10:00:00.000Z', proposalAt: '2026-05-21T10:00:00.000Z' },
  { id: '35', name: 'Iris West', company: 'Central City News', email: 'iris@centralcity.io', phone: '+91 9876543244', status: 'Won', source: 'LinkedIn', value: 48000, owner: 'David', createdAt: '2026-05-15T14:00:00.000Z', contactedAt: '2026-05-16T10:00:00.000Z', meetingAt: '2026-05-20T15:00:00.000Z', proposalAt: '2026-05-24T10:00:00.000Z', wonAt: '2026-05-30T12:00:00.000Z' },
  { id: '36', name: 'Jack Sparrow', company: 'Black Pearl Ventures', email: 'jack@blackpearl.co', phone: '+91 9876543245', status: 'Won', source: 'Referral', value: 71000, owner: 'Sarah', createdAt: '2026-05-18T10:00:00.000Z', contactedAt: '2026-05-19T11:00:00.000Z', meetingAt: '2026-05-23T14:00:00.000Z', proposalAt: '2026-05-27T10:00:00.000Z', wonAt: '2026-06-02T12:00:00.000Z' },
  { id: '37', name: 'Kara Danvers', company: 'Supergirl Media', email: 'kara@supergirl.ai', phone: '+91 9876543246', status: 'Lost', source: 'Email Campaign', value: 17000, owner: 'Priya', createdAt: '2026-05-22T09:00:00.000Z', contactedAt: '2026-05-23T10:00:00.000Z' },
  { id: '38', name: 'Loki Odinson', company: 'Mischief Managed', email: 'loki@mischief.dev', phone: '+91 9876543247', status: 'Won', source: 'Cold Email', value: 43000, owner: 'Alex', createdAt: '2026-05-25T13:00:00.000Z', contactedAt: '2026-05-26T14:00:00.000Z', meetingAt: '2026-05-30T10:00:00.000Z', proposalAt: '2026-06-03T10:00:00.000Z', wonAt: '2026-06-08T12:00:00.000Z' },

  // ─── June 2026 Leads ─────────────────────────────────────────────────────
  { id: '39', name: 'Monica Geller', company: 'Central Perk SaaS', email: 'monica@centralperk.io', phone: '+91 9876543248', status: 'Won', source: 'Website', value: 52000, owner: 'Sarah', createdAt: '2026-06-01T10:00:00.000Z', contactedAt: '2026-06-02T11:00:00.000Z', meetingAt: '2026-06-06T14:00:00.000Z', proposalAt: '2026-06-10T10:00:00.000Z', wonAt: '2026-06-15T12:00:00.000Z' },
  { id: '40', name: 'Nick Fury', company: 'SHIELD Technologies', email: 'nick@shieldtech.co', phone: '+91 9876543249', status: 'Proposal Sent', source: 'LinkedIn', value: 95000, owner: 'Alex', createdAt: '2026-06-03T09:00:00.000Z', contactedAt: '2026-06-04T10:00:00.000Z', meetingAt: '2026-06-08T15:00:00.000Z', proposalAt: '2026-06-12T10:00:00.000Z' },
  { id: '41', name: 'Opal Stone', company: 'Gem Analytics', email: 'opal@gemanalytics.dev', phone: '+91 9876543250', status: 'Meeting Scheduled', source: 'Referral', value: 37000, owner: 'David', createdAt: '2026-06-05T11:00:00.000Z', contactedAt: '2026-06-06T14:00:00.000Z', meetingAt: '2026-06-10T10:00:00.000Z' },
  { id: '42', name: 'Peter Parker', company: 'Spidey Web Solutions', email: 'peter@spideyweb.io', phone: '+91 9876543251', status: 'Contacted', source: 'Instagram', value: 28000, owner: 'Priya', createdAt: '2026-06-07T14:00:00.000Z', contactedAt: '2026-06-08T10:00:00.000Z' },
  { id: '43', name: 'Quinn Fabray', company: 'Cheerio Platforms', email: 'quinn@cheerio.co', phone: '+91 9876543252', status: 'Proposal Sent', source: 'Ads', value: 61000, owner: 'Sarah', createdAt: '2026-06-08T10:00:00.000Z', contactedAt: '2026-06-09T11:00:00.000Z', meetingAt: '2026-06-13T14:00:00.000Z', proposalAt: '2026-06-16T10:00:00.000Z' },
  { id: '44', name: 'Ross Geller', company: 'Paleontology Tech', email: 'ross@paleotech.dev', phone: '+91 9876543253', status: 'New', source: 'Website', value: 25000, owner: 'Alex', createdAt: '2026-06-10T09:00:00.000Z' },
  { id: '45', name: 'Selina Kyle', company: 'Catwoman Digital', email: 'selina@catwoman.io', phone: '+91 9876543254', status: 'Contacted', source: 'Cold Email', value: 34000, owner: 'David', createdAt: '2026-06-11T13:00:00.000Z', contactedAt: '2026-06-12T10:00:00.000Z' },
  { id: '46', name: 'Tony Stark', company: 'Stark Industries AI', email: 'tony@starkai.co', phone: '+91 9876543255', status: 'Meeting Scheduled', source: 'LinkedIn', value: 150000, owner: 'Sarah', createdAt: '2026-06-12T10:00:00.000Z', contactedAt: '2026-06-13T11:00:00.000Z', meetingAt: '2026-06-17T15:00:00.000Z' },
  { id: '47', name: 'Ursula Buffay', company: 'Twin Flame Media', email: 'ursula@twinflame.co', phone: '+91 9876543256', status: 'New', source: 'Referral', value: 22000, owner: 'Priya', createdAt: '2026-06-14T14:00:00.000Z' },
  { id: '48', name: 'Vishnu Patel', company: 'Dharma Software', email: 'vishnu@dharmasw.io', phone: '+91 9876543257', status: 'Contacted', source: 'Cold Call', value: 31000, owner: 'Alex', createdAt: '2026-06-15T09:00:00.000Z', contactedAt: '2026-06-16T10:00:00.000Z' },
  { id: '49', name: 'Whitney Houston', company: 'Vocal AI', email: 'whitney@vocalai.dev', phone: '+91 9876543258', status: 'New', source: 'Email Campaign', value: 40000, owner: 'David', createdAt: '2026-06-16T11:00:00.000Z' },
  { id: '50', name: 'Xena Warrior', company: 'Warrior Princess Tech', email: 'xena@warrior.io', phone: '+91 9876543259', status: 'New', source: 'Instagram', value: 27000, owner: 'Sarah', createdAt: '2026-06-17T10:00:00.000Z' },
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
