"use client";

import { Plus, Search } from "lucide-react";

interface Props {
  title?: string;
  description?: string;

  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;

  addLabel?: string;
  onAdd?: () => void;
}

export default function TableToolbar({
  title,
  description,
  searchValue = "",
  searchPlaceholder = "Buscar...",
  onSearchChange,
  addLabel,
  onAdd,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4">
      {(title || description || onAdd) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && (
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {title}
              </h1>
            )}

            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>

          {onAdd && addLabel && (
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600"
            >
              <Plus size={18} />
              {addLabel}
            </button>
          )}
        </div>
      )}

      {onSearchChange && (
        <div className="relative w-full sm:max-w-sm">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </span>

          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>
      )}
    </div>
  );
}