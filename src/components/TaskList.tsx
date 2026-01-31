import TaskCard, { Task } from "./TaskCard";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="pt-3 border-t border-border">
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    ))}
  </div>
);

const TaskList = ({ tasks, isLoading, onEdit, onDelete }: TaskListProps) => {
  if (isLoading) {
    return <TaskListSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
