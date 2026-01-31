// @ts-nocheck
const API_URL = 'http://localhost:3001/api/tasks';

async function testAPI() {
    console.log('🧪 Starting API Verification...');

    try {
        // 1. Health Check
        console.log('\nChecking Health...');
        const health = await fetch('http://localhost:3001/api/health').then(r => r.json());
        console.log('✅ Health:', health);

        // 2. Create Task
        console.log('\nCreating Task...');
        const newTask = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Task without Description',
                // description omitted
                status: 'pending',
                priority: 'high',
                dueDate: new Date().toISOString()
            })
        }).then(r => r.json());
        console.log('✅ Created:', newTask);

        if (newTask.priority !== 'high' || !newTask.dueDate) throw new Error('Task creation missing new fields');

        if (!newTask._id && !newTask.id) throw new Error('Task creation failed');
        const taskId = newTask._id || newTask.id;

        // 3. Get All Tasks
        console.log('\nFetching Tasks...');
        const tasks = await fetch(API_URL).then(r => r.json());
        console.log(`✅ Fetched ${tasks.length} tasks`);
        const createdTask = tasks.find((t: any) => (t._id || t.id) === taskId);
        if (!createdTask) throw new Error('Created task not found in list');

        // 4. Update Task
        console.log('\nUpdating Task...');
        const updatedTask = await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: 'in-progress'
            })
        }).then(r => r.json());
        console.log('✅ Updated:', updatedTask);
        if (updatedTask.status !== 'in-progress') throw new Error('Update failed');

        // 5. Delete Task
        console.log('\nDeleting Task...');
        const deleteResult = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE'
        }).then(r => r.json());
        console.log('✅ Deleted:', deleteResult);

        // Verify Deletion
        const finalTasks = await fetch(API_URL).then(r => r.json());
        if (finalTasks.find((t: any) => (t._id || t.id) === taskId)) {
            throw new Error('Task verification failed - task still exists');
        }

        console.log('\n✨ All API tests passed successfully!');

    } catch (error) {
        console.error('\n❌ Test Failed:', error);
        process.exit(1);
    }
}

testAPI();
