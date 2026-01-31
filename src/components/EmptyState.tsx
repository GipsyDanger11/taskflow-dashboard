import { ClipboardList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateTask: () => void;
}

const EmptyState = ({ onCreateTask }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <ClipboardList className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No tasks yet</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-sm">
        Get started by creating your first task. Stay organized and boost your productivity!
      </p>
      <Button onClick={onCreateTask} className="gap-2">
        <Plus className="w-4 h-4" />
        Create your first task
      </Button>
    </div>
  );
};

export default EmptyState;
