const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
    createdAt: Date;
}

interface MongoTask {
    _id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    createdAt: string;
}

// Convert MongoDB task to frontend Task format
const convertToTask = (mongoTask: MongoTask): Task => ({
    id: mongoTask._id,
    title: mongoTask.title,
    description: mongoTask.description,
    status: mongoTask.status,
    priority: mongoTask.priority || 'medium', // Default to medium if missing
    dueDate: mongoTask.dueDate ? new Date(mongoTask.dueDate) : undefined,
    createdAt: new Date(mongoTask.createdAt),
});

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks`);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const data: MongoTask[] = await response.json();
        return data.map(convertToTask);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

// Create a new task
export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create task');
        }

        const data: MongoTask = await response.json();
        return convertToTask(data);
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

// Update an existing task
export const updateTask = async (id: string, task: Partial<Omit<Task, 'id' | 'createdAt'>>): Promise<Task> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }

        const data: MongoTask = await response.json();
        return convertToTask(data);
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

// Seed default tasks
export const seedTasks = async (): Promise<Task[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/seed`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Failed to seed tasks');
        }

        const data = await response.json();
        return (data.tasks || []).map(convertToTask);
    } catch (error) {
        console.error('Error seeding tasks:', error);
        return [];
    }
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};
