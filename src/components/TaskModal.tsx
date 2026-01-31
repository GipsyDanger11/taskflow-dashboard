import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "./TaskCard";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, "id" | "createdAt"> & { id?: string }) => void;
  task?: Task | null;
}

const TaskModal = ({ isOpen, onClose, onSave, task }: TaskModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("pending");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: task?.id,
      title: title.trim(),
      description: description.trim(),
      status,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {task ? "Edit Task" : "Add New Task"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: Task["status"]) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {task ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
