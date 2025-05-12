
import { useState } from "react";
import { Search } from "lucide-react";

interface FilterBarProps {
  onFilterChange?: (filters: {
    search: string;
    provider: string;
    dateRange: string;
    visitType: string;
  }) => void;
}

export const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState({
    search: "",
    provider: "",
    dateRange: "all",
    visitType: "",
  });

  const handleFilterChange = (
    key: "search" | "provider" | "dateRange" | "visitType",
    value: string
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="relative flex-grow">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search patients..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-syntera-purple text-sm"
          />
        </div>
        
        <div className="flex flex-wrap sm:flex-nowrap gap-2">
          <select
            value={filters.provider}
            onChange={(e) => handleFilterChange("provider", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-syntera-purple text-sm bg-white"
          >
            <option value="">All Providers</option>
            <option value="dr-smith">Dr. Smith</option>
            <option value="dr-jones">Dr. Jones</option>
            <option value="dr-patel">Dr. Patel</option>
          </select>
          
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange("dateRange", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-syntera-purple text-sm bg-white"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          
          <select
            value={filters.visitType}
            onChange={(e) => handleFilterChange("visitType", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-syntera-purple text-sm bg-white"
          >
            <option value="">All Visit Types</option>
            <option value="well-check">Well Check</option>
            <option value="sick-visit">Sick Visit</option>
            <option value="follow-up">Follow-up</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
