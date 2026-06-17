import React, { useState, useEffect } from 'react';

/**
 * @typedef {Object} LeadFormData
 * @property {string} name - Full name of the contact.
 * @property {string} company - Company organization name.
 * @property {string} email - Email contact address.
 * @property {string} phone - Optional phone contact number.
 * @property {string} status - Funnel pipeline status.
 * @property {string} source - Marketing acquisition source.
 */

/**
 * Props definition for the LeadForm component.
 * @typedef {Object} LeadFormProps
 * @property {Partial<LeadFormData & { id: string|number }>} [initialData] - Existing lead information when editing.
 * @property {function} onSubmit - Callback function triggered with form data on successful submission.
 * @property {function} onCancel - Callback function to abort the operation.
 */

const STATUS_OPTIONS = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
const SOURCE_OPTIONS = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

/**
 * LeadForm component renders a validated lead form for creating or editing leads.
 * Leverages accessibility indicators, clean keyboard focus, and inline warnings.
 *
 * @param {LeadFormProps} props - The component props.
 * @returns {React.JSX.Element} The rendered lead form.
 */
export default function LeadForm({ initialData, onSubmit, onCancel }) {
  const isEditMode = !!initialData;

  // Initialize form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'New',
    source: 'Website',
  });

  // Track validation errors
  const [errors, setErrors] = useState({});

  // Sync form state when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        company: initialData.company || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        status: initialData.status || 'New',
        source: initialData.source || 'Website',
      });
    }
  }, [initialData]);

  // Handle generic input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Run validation checks
  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = 'Full Name is required';
    }
    if (!formData.company.trim()) {
      tempErrors.company = 'Company is required';
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="space-y-4">
        {/* Full Name Input */}
        <div>
          <label htmlFor="lead-name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Full Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="lead-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Sarah Jenkins"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`w-full rounded-xl border py-2.5 px-4 text-sm text-slate-900 bg-slate-50/50 transition-all placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 dark:text-white dark:bg-slate-900 ${
              errors.name
                ? 'border-danger focus:border-danger focus:ring-danger/25'
                : 'border-slate-200 focus:border-primary focus:ring-primary/20 dark:border-slate-800'
            }`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs font-semibold text-danger" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Company Input */}
        <div>
          <label htmlFor="lead-company" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Company Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="lead-company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Stripe Inc."
            aria-required="true"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={`w-full rounded-xl border py-2.5 px-4 text-sm text-slate-900 bg-slate-50/50 transition-all placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 dark:text-white dark:bg-slate-900 ${
              errors.company
                ? 'border-danger focus:border-danger focus:ring-danger/25'
                : 'border-slate-200 focus:border-primary focus:ring-primary/20 dark:border-slate-800'
            }`}
          />
          {errors.company && (
            <p id="company-error" className="mt-1 text-xs font-semibold text-danger" role="alert">
              {errors.company}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="lead-email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Email Address <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="lead-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. sarah@stripe.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`w-full rounded-xl border py-2.5 px-4 text-sm text-slate-900 bg-slate-50/50 transition-all placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 dark:text-white dark:bg-slate-900 ${
              errors.email
                ? 'border-danger focus:border-danger focus:ring-danger/25'
                : 'border-slate-200 focus:border-primary focus:ring-primary/20 dark:border-slate-800'
            }`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs font-semibold text-danger" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label htmlFor="lead-phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="lead-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 (555) 019-2834"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-4 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        {/* Multi-column fields for Status & Source */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Pipeline Status Dropdown */}
          <div>
            <label htmlFor="lead-status" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Pipeline Status
            </label>
            <select
              id="lead-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-4 text-sm text-slate-900 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white cursor-pointer"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Lead Source Dropdown */}
          <div>
            <label htmlFor="lead-source" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Lead Source
            </label>
            <select
              id="lead-source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-4 text-sm text-slate-900 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white cursor-pointer"
            >
              {SOURCE_OPTIONS.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-850">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/10 hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all cursor-pointer"
        >
          {isEditMode ? 'Save Changes' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
}
