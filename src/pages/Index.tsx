import { useState, useEffect, useMemo } from "react";
import { Plus, LayoutGrid, ListTodo, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import TaskFilters, { FilterStatus } from "@/components/TaskFilters";
import TaskList from "@/components/TaskList";
import TaskCard, { Task } from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import EmptyState from "@/components/EmptyState";
import WaveBackground from "@/components/WaveBackground";
import * as api from "@/services/api";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  // Fetch tasks from API on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      let fetchedTasks = await api.fetchTasks();

      // Auto-seed if empty
      if (fetchedTasks.length === 0) {
        try {
          fetchedTasks = await api.seedTasks();
          toast({
            title: "Welcome!",
            description: "We've added some sample tasks to get you started.",
          });
        } catch (seedError) {
          console.error("Error seeding tasks:", seedError);
        }
      }

      setTasks(fetchedTasks);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tasks. Please make sure the backend server is running.",
        variant: "destructive",
      });
      console.error("Error loading tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  }), [tasks]);

  const [completedTask, setCompletedTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    let result = tasks;
    if (activeFilter !== "all") {
      result = tasks.filter((task) => task.status === activeFilter);
    }

    // Sort: Upcoming (closest dueDate) first, then those without dueDate
    return result.sort((a, b) => {
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return 0; // Keep original order if neither has date
    });
  }, [tasks, activeFilter]);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
      console.error("Error deleting task:", error);
    }
  };

  const handleSaveTask = async (taskData: Omit<Task, "id" | "createdAt"> & { id?: string }) => {
    try {
      if (taskData.id) {
        // Edit existing task
        const updatedTask = await api.updateTask(taskData.id, {
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          priority: taskData.priority,
          dueDate: taskData.dueDate,
        });

        // Check for completion
        if (updatedTask.status === 'completed' && (!editingTask || editingTask.status !== 'completed')) {
          setCompletedTask(updatedTask);
        }

        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskData.id ? updatedTask : task
          )
        );
        toast({
          title: "Success",
          description: "Task updated successfully",
        });
      } else {
        // Add new task
        const newTask = await api.createTask({
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          priority: taskData.priority,
          dueDate: taskData.dueDate,
        });

        if (newTask.status === 'completed') {
          setCompletedTask(newTask);
        }

        setTasks((prev) => [newTask, ...prev]);
        toast({
          title: "Success",
          description: "Task created successfully",
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast({
        title: "Error",
        description: `Failed to ${taskData.id ? 'update' : 'create'} task: ${errorMessage}`,
        variant: "destructive",
      });
      console.error("Error saving task:", error);
    }
  };

  const showEmptyState = !isLoading && tasks.length === 0;
  const showNoResults = !isLoading && tasks.length > 0 && filteredTasks.length === 0;

  return (
    <div className="min-h-screen relative">
      <WaveBackground />
      <Navbar />

      <main className="container max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your tasks efficiently
            </p>
          </div>
          <Button onClick={handleAddTask} className="gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>

        {/* Filters */}
        {!showEmptyState && (
          <div className="mb-6">
            <TaskFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              taskCounts={taskCounts}
            />
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 rounded-xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-muted">
            <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
            <p className="text-muted-foreground mb-6">
              {activeFilter === "all"
                ? "Start by creating your first task!"
                : `No ${activeFilter} tasks found.`}
            </p>
            {activeFilter === "all" && (
              <Button onClick={handleAddTask} className="bg-primary hover:bg-primary/90">
                Create Task
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />

      {/* Completion Popup */}
      {completedTask && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setCompletedTask(null)}
          />
          <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-primary/50 w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-300 text-center">
            <div className="mb-4 flex justify-center">
              <div className="h-12 w-12 rounded-full bg-status-completed/20 flex items-center justify-center text-status-completed">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">Task Completed! 🎉</h3>
            <p className="font-medium text-lg mb-1">{completedTask.title}</p>
            {completedTask.description && (
              <p className="text-muted-foreground text-sm mb-6 line-clamp-3">{completedTask.description}</p>
            )}

            <Button
              className="w-full mt-4"
              onClick={() => setCompletedTask(null)}
            >
              Awesome!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
