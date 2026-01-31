# TaskFlow Dashboard - Full Stack Task Management Application

A modern, full-stack task management application built with React, TypeScript, Node.js, Express, and MongoDB.

## 🚀 Features

- ✅ Create, Read, Update, and Delete tasks
- 🎨 Beautiful, responsive UI with Tailwind CSS and shadcn/ui
- 🔄 Real-time data persistence with MongoDB
- 🎯 Filter tasks by status (All, Pending, In Progress, Completed)
- 📱 Fully responsive design
- 🌊 Animated wave background
- 🔔 Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Query** - Data fetching
- **React Router** - Routing

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd taskflow-dashboard
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   The `.env` file is already configured with:
   ```
   MONGO_URI="your-mongodb-connection-string"
   VITE_API_URL=http://localhost:3001
   ```

## 🚀 Running the Application

### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
The backend will start on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
The frontend will start on `http://localhost:5173`

### Option 2: Run Both Concurrently (Recommended)

You can install `concurrently` and add a script to run both:
```bash
npm install -D concurrently
```

Then add to your root `package.json`:
```json
"scripts": {
  "dev:full": "concurrently \"npm run dev\" \"cd server && npm run dev\""
}
```

Run with:
```bash
npm run dev:full
```

## 📁 Project Structure

```
taskflow-dashboard/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── services/           # API service layer
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── server/                  # Backend source code
│   ├── src/
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # Express routes
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── public/                  # Static assets
├── .env                     # Environment variables
└── package.json            # Frontend dependencies
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/health` | Health check |

## 🎯 Usage

1. **Create a Task**: Click the "Add Task" button and fill in the form
2. **Edit a Task**: Hover over a task card and click the edit icon
3. **Delete a Task**: Hover over a task card and click the delete icon
4. **Filter Tasks**: Use the filter buttons to view tasks by status
5. **View Tasks**: All tasks are displayed in a responsive grid layout

## 🧪 Testing

The application includes:
- TypeScript type checking
- ESLint for code quality
- Vitest for unit testing (run with `npm test`)

## 📝 MongoDB Schema

```typescript
{
  title: String (required),
  description: String (required),
  status: String (enum: ['pending', 'in-progress', 'completed']),
  createdAt: Date (auto-generated)
}
```

## 🎨 UI Components

The application uses shadcn/ui components including:
- Button
- Dialog/Modal
- Toast notifications
- Form inputs
- Select dropdowns
- Cards

## 🔒 Environment Variables

- `MONGO_URI` - MongoDB connection string
- `VITE_API_URL` - Backend API URL (default: http://localhost:3001)
- `PORT` - Backend server port (default: 3001)

## 🐛 Troubleshooting

**Backend won't connect to MongoDB:**
- Verify your MongoDB URI in `.env`
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure MongoDB service is running

**Frontend can't connect to backend:**
- Verify backend is running on port 3001
- Check `VITE_API_URL` in `.env`
- Check browser console for CORS errors

**Tasks not persisting:**
- Verify MongoDB connection is successful
- Check backend console for errors
- Ensure MongoDB Atlas cluster is active

## 📄 License

This project is created for educational purposes as part of a Full Stack Development Internship assessment.

## 👨‍💻 Author

Created as part of a Full Stack Development Internship skill assessment.
