// src/components/Task.jsx
import styles from './Task.module.css';

export default function Task({
  task,
  onChangeText,
  onToggleDone,
  onMoveUp,
  onMoveDown,
  onDelete
}) {
  const handleChange = (event) => {
    onChangeText(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.prior}>
          <button onClick={onMoveUp} title="Move up">↑</button>
          <button onClick={onMoveDown} title="Move down">↓</button>
        </div>

        <div>
          <input
            type="checkbox"
            checked={task.isDone}
            onChange={onToggleDone}
          />
        </div>
      </div>

      <textarea
        value={task.text}
        onChange={handleChange}
        placeholder="Enter task description..."
      />

      <div>
        <button
          onClick={onToggleDone}
        >
          {task.isDone ? 'Undone' : 'Done'}
        </button>
        <button
          onClick={onDelete}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}