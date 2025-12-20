import { useEffect, useState } from 'react';
import TaskList from '@/components/TaskList';
import { getTasks, saveTasks } from '@/api/tasks';
import styles from './Home.module.css';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      const formattedTasks = data.map(task => ({
        id: task.id,
        text: task.title,
        isDone: task.is_done,
      }));
      setTasks(formattedTasks);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError(err.message);
      if (err.message.includes('401')) {
        window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveTasks() {
    try {
      setLoading(true);
      const tasksToSave = tasks.map(task => ({
        title: task.text,
        is_done: task.isDone || false,
        id: task.id,
      }));
      await saveTasks(tasksToSave);
      alert('Tasks saved successfully!');
    } catch (err) {
      console.error('Failed to save tasks:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleAddTask() {
    const newTask = {
      id: Date.now(),
      text: 'New Task',
      isDone: false,
    };
    setTasks([...tasks, newTask]);
  }

  function handleDeleteTask(index) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={loadTasks}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Todo App</h1>
        <div>
          <button onClick={handleAddTask}>
            + Add Task
          </button>
          <button onClick={handleSaveTasks} >
            💾 Save
          </button>
          <button onClick={loadTasks} >
            🔄 Refresh
          </button>
        </div>
      </div>

      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        onDeleteTask={handleDeleteTask}
      />

      <div>
        <p>Total tasks: {tasks.length}</p>
        <p>
          Completed: {tasks.filter(t => t.isDone).length} / {tasks.length}
        </p>
      </div>
    </div>
  );
}