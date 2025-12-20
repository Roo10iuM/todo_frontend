import { useState } from 'react';
import { signUp } from '@/api/auth';
import styles from './SignUp.module.css';

export default function SignUp({ onRegisterSuccess }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getMsgStyle(isError) {
    let className = styles.msg;
    className += ' ';
    className += isError ? styles['msg-incorrect'] : styles['msg-correct'];
    return className;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const result = await signUp(login, password);
      const message =
        result && typeof result.message === 'string' ? result.message : 'user создан';
      setSuccessMessage(message);
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
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
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <button className={styles.submit} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </form>
      {errorMessage || successMessage ? (
        <div className={getMsgStyle(Boolean(errorMessage))}>
          {errorMessage || successMessage}
        </div>
      ) : null}
    </>
  );
}
