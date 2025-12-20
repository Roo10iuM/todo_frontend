import { useState } from 'react';
import { signIn } from '@/api/auth';
import styles from './SignIn.module.css';

export default function SignIn({ onAuthSuccess }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getMsgStyle(message) {
    let className = styles.msg;
    className += ' ';
    className += message ? styles['msg-incorrect'] : styles['msg-correct'];
    return className;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const result = await signIn(login, password);
      if (onAuthSuccess) {
        onAuthSuccess(result.user);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid login or password';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className={styles.sign} onSubmit={handleSubmit}>
        <div className={styles['input-area']}>
          <label>Login</label>
          <input
            type="text"
            placeholder="login"
            autoComplete="username"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            required
          />
        </div>
        <div className={styles['input-area']}>
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <button className={styles.submit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
        {errorMessage ? (
          <div className={getMsgStyle(errorMessage)}>{errorMessage}</div>
        ) : null}
      </form>
    </>
  );
}
