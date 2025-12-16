import { useState } from 'react';
import styles from './SignIn.module.css'

export default function SignIn() {
  const [isCorrectData, setIsCorrectData] = useState(true);

  function getMsgStyle(isCorrectData) {
    let className = styles.msg;
    className += " ";
    className += isCorrectData ? styles["msg-correct"] : styles["msg-incorrect"];
    return className;
  }

  async function submit(formData) {
    setIsCorrectData(!isCorrectData);
  }

  return (
    <>
      <form
        className={styles.sign}
        action={submit}
      >
        <div className={styles["input-area"]}>
          <label>Login</label>
          <input
            type="text"
            placeholder="email"
          />
        </div>
        <div className={styles["input-area"]}>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
          />
        </div>
        <div>
          <button className={styles.submit} type="submit">
            Sign Up
          </button>
        </div>
        <div className={getMsgStyle(isCorrectData)}>
          Incorrect login or password
        </div>
      </form>
    </>
  )
}