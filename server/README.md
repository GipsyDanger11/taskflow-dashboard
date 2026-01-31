# TaskFlow Backend

Backend API for the TaskFlow Dashboard application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```
   MONGO_URI=your-mongodb-connection-string
   PORT=3001
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/health` - Health check

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- CORS enabled
