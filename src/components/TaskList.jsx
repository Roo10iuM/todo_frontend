import Task from "./Task";
import styles from './TaskList.module.css';

export default function TaskList({ tasks, setTasks, onDeleteTask }) {
  function changeText(index, newText) {
    const newTasks = [...tasks];
    newTasks[index].text = newText;
    setTasks(newTasks);
  }

  function toggleDone(index) {
    const newTasks = [...tasks];
    newTasks[index].isDone = !newTasks[index].isDone;
    setTasks(newTasks);
  }

  function moveUp(index) {
    if (index === 0) return;
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    setTasks(newTasks);
  }

  function moveDown(index) {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
    setTasks(newTasks);
  }

  function taskList() {
    return tasks.map((task, i) => (
      <div key={task.id}>
        <Task
          task={task}
          onChangeText={(text) => changeText(i, text)}
          onToggleDone={() => toggleDone(i)}
          onMoveUp={() => moveUp(i)}
          onMoveDown={() => moveDown(i)}
          onDelete={() => onDeleteTask(i)}
        />
      </div>
    ));
  }

  if (tasks.length === 0) {
    return (
      <div>
        <p>No tasks yet. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles["task-list"]}>
      {taskList()}
    </div>
  );
}