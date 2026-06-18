import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar — A controlled, debounced search input with a clear button.
 *
 * The component manages its own internal display value for instant visual
 * feedback, while debouncing the parent `onChange` call by 300ms so that
 * filtering logic only runs after the user has stopped typing.
 *
 * @param {object}   props
 * @param {string}   props.value    - The authoritative search value from the parent.
 * @param {Function} props.onChange - Called with the debounced search string.
 */
export default function SearchBar({ value, onChange }) {
  // Internal state tracks keystrokes instantly (no debounce delay on UI)
  const [inputValue, setInputValue] = useState(value);
  const debounceTimer = useRef(null);

  // Sync internal state when parent resets the value (e.g. clear filters)
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Debounce: cancel any pending call and restart the 300ms timer
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  };

  const handleClear = () => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setInputValue('');
    onChange(''); // Clear is immediate — no need to debounce
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  return (
    <div className="relative flex-1 min-w-0">
      {/* Search icon — left side */}
      <Search
        className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search by name, company, or email..."
        aria-label="Search leads"
        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-slate-900 transition-all duration-200 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-primary dark:focus:bg-slate-900"
      />

      {/* Clear button — right side, only when there is text */}
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 cursor-pointer"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
