import styles from './Task.module.css';

export default function Task({ text, setText }) {
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.prior}>
        <button>Up</button>
        <button>Down</button>
      </div>
      <textarea value={text} onChange={handleChange} />
      <button>Done</button>
    </div>
  )
}