import { cn } from "@/lib/utils";

export type FilterStatus = "all" | "pending" | "in-progress" | "completed";

interface TaskFiltersProps {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  taskCounts: {
    all: number;
    pending: number;
    "in-progress": number;
    completed: number;
  };
}

const filters: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const TaskFilters = ({ activeFilter, onFilterChange, taskCounts }: TaskFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            activeFilter === filter.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {filter.label}
          <span className={cn(
            "ml-2 px-1.5 py-0.5 rounded-full text-xs",
            activeFilter === filter.value
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-background text-muted-foreground"
          )}>
            {taskCounts[filter.value]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
