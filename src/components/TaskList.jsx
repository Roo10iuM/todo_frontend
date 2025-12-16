import Task from "./Task"
import styles from './TaskList.module.css';

export default function TaskList({ taskTexts, setTaskTexts }) {

  function changeText(i, taskTexts) {
    return (newText) => setTaskTexts(taskTexts.map((text, j) => i != j ? text : newText));
  }

  function taskList(taskTexts) {
    return taskTexts.map(
      (text, i) => <Task key={i} text={text} setText={changeText(i, taskTexts)} />
    )
  }

  function Up(i, taskTexts) {
    if (i == 0) {
      return;
    }
    return;
  }

  function Down(i, taskTexts) {
    if (i == taskTexts.length) {
      return;
    }
    return;
  }

  return (
    <>
      <div className={styles["task-list"]}>
        {taskList(taskTexts)}
      </div>
    </>
  )

}