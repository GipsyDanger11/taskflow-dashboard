import { useState, useEffect, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import TaskFilters, { FilterStatus } from "@/components/TaskFilters";
import TaskList from "@/components/TaskList";
import TaskCard, { Task } from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import EmptyState from "@/components/EmptyState";

const generateId = () => Math.random().toString(36).substring(2, 11);

const initialTasks: Task[] = [
  {
    id: generateId(),
    title: "Design new landing page",
    description: "Create wireframes and high-fidelity mockups for the new marketing landing page",
    status: "in-progress",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: generateId(),
    title: "Review pull requests",
    description: "Go through pending PRs and provide feedback to team members",
    status: "pending",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: generateId(),
    title: "Update documentation",
    description: "Add API documentation for the new authentication endpoints",
    status: "completed",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: generateId(),
    title: "Fix navigation bug",
    description: "Users are experiencing issues with the mobile menu not closing properly",
    status: "pending",
    createdAt: new Date(),
  },
];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(initialTasks);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  }), [tasks]);

  const filteredTasks = useMemo(() => {
    if (activeFilter === "all") return tasks;
    return tasks.filter((task) => task.status === activeFilter);
  }, [tasks, activeFilter]);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleSaveTask = (taskData: Omit<Task, "id" | "createdAt"> & { id?: string }) => {
    if (taskData.id) {
      // Edit existing task
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskData.id
            ? { ...task, ...taskData }
            : task
        )
      );
    } else {
      // Add new task
      const newTask: Task = {
        id: generateId(),
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        createdAt: new Date(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  const showEmptyState = !isLoading && tasks.length === 0;
  const showNoResults = !isLoading && tasks.length > 0 && filteredTasks.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
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

        {/* Content */}
        {showEmptyState ? (
          <EmptyState onCreateTask={handleAddTask} />
        ) : showNoResults ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No tasks found with the selected filter.
            </p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            isLoading={isLoading}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        )}
      </main>

      {/* Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default Index;
