import { formatDistanceToNow } from "date-fns";
import { Copy, Check, Pencil, Trash2, Calendar, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: Date;
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

const priorityConfig = {
  low: {
    label: "Low",
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  medium: {
    label: "Medium",
    className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  },
  high: {
    label: "High",
    className: "bg-red-500/10 text-red-600 border-red-500/20",
  },
};

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed";

  const timeRemaining = task.dueDate ? formatDistanceToNow(new Date(task.dueDate), { addSuffix: true }) : null;

  return (
    <div className="group bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-5 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-foreground text-lg leading-tight line-clamp-2">
          {task.title}
        </h3>
        <Badge variant="outline" className={cn("capitalize font-normal", status.className)}>
          {status.label}
        </Badge>
      </div>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Badge variant="outline" className={cn("text-xs font-normal", priority.className)}>
          {priority.label} Priority
        </Badge>

        <div className={cn(
          "flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border",
          task.dueDate
            ? isOverdue
              ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50"
              : "bg-muted text-muted-foreground border-border"
            : "bg-muted/50 text-muted-foreground/70 border-border/50"
        )}>
          <Clock className="w-3 h-3" />
          <span>
            {task.dueDate ? (
              <>
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
                {task.status !== 'completed' && (
                  <span className="ml-1 font-medium opacity-80">
                    ({isOverdue ? 'Overdue ' : ''}{timeRemaining})
                  </span>
                )}
              </>
            ) : (
              <span>No Due Date</span>
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-xs">
            Created {task.createdAt.toLocaleDateString("en-US", {
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
