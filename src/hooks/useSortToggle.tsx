import { useState } from "react";

type SortOption = {
  id: string;
  label: string;
};

type UseSortToggleProps = {
  options: SortOption[];
  defaultOption?: string;
};

export const useSortToggle = ({ options, defaultOption }: UseSortToggleProps) => {
  const [sortBy, setSortBy] = useState(defaultOption || options[0]?.id || "");

  const SortToggle = () => (
    <div className="flex gap-1 text-sm text-gray-500">
      <span>sort by:</span>
      {options.map((option, index) => (
        <span key={option.id} className="flex items-center">
          {index > 0 && <span className="mx-1">/</span>}
          <button
            type="button"
            onClick={() => setSortBy(option.id)}
            className={sortBy === option.id ? "text-gray-900 font-medium" : "hover:text-gray-700"}
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );

  return { sortBy, setSortBy, SortToggle };
};
