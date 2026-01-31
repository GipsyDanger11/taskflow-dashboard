import express, { Request, Response } from 'express';
import Task from '../models/Task';

const router = express.Router();

// GET all tasks
router.get('/', async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});

// GET single task by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error });
    }
});

// POST create new task
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const newTask = new Task({
            title,
            description,
            status: status || 'pending',
            priority: priority || 'medium',
            dueDate: dueDate,
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
});

// POST seed default tasks
router.post('/seed', async (req: Request, res: Response) => {
    try {
        const count = await Task.countDocuments();
        if (count > 0) {
            return res.status(200).json({ message: 'Database already has tasks', tasks: [] });
        }

        const defaultTasks = [
            {
                title: "Setup Development Environment",
                description: "Install VS Code, Node.js, and necessary extensions for the project.",
                status: "completed",
                priority: "high",
                dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000)
            },
            {
                title: "Database Schema Design",
                description: "Design the MongoDB schema for Users and Tasks collections.",
                status: "in-progress",
                priority: "high",
                dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
            },
            {
                title: "Frontend UI Components",
                description: "Build reusable UI components using Tailwind CSS and shadcn/ui.",
                status: "pending",
                priority: "medium",
                dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
            },
            {
                title: "Unit Testing",
                description: "Write unit tests for the API endpoints using Jest or Vitest.",
                status: "pending",
                priority: "low",
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }
        ];

        const tasks = await Task.insertMany(defaultTasks);
        res.status(201).json({ message: 'Default tasks seeded successfully', tasks });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding tasks', error });
    }
});

// PUT update task
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, priority, dueDate },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
});

// DELETE task
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
});

export default router;
