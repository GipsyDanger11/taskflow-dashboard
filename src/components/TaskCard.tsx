import { Pencil, Trash2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt: Date;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-status-pending/10 text-status-pending border-status-pending/20",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-status-progress/10 text-status-progress border-status-progress/20",
  },
  completed: {
    label: "Completed",
    className: "bg-status-completed/10 text-status-completed border-status-completed/20",
  },
};

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const status = statusConfig[task.status];

  return (
    <div className="group bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2">
          {task.title}
        </h3>
        <span
          className={cn(
            "shrink-0 px-2.5 py-1 rounded-full text-xs font-medium border",
            status.className
          )}
        >
          {status.label}
        </span>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-xs">
            {task.createdAt.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onEdit(task)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
