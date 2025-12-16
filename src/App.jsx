import { useState } from 'react';
import Home from './pages/home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import styles from './App.module.css';

function App() {
  const Pages = {
    "HOME": "home",
    "SIGNIN": "signin",
    "SIGNUP": "signup",
  }

  const [page, setPage] = useState(Pages.HOME);

  function pageController(page) {
    switch (page) {
      case Pages.HOME:
        return <Home />;
      case Pages.SIGNIN:
        return <SignIn />;
      case Pages.SIGNUP:
        return <SignUp />;
    }
  }

  return (
    <>
      <div className={styles.dashboard}>
        <button onClick={() => setPage(Pages.HOME)}>Home</button>
        <div>
          <button onClick={() => setPage(Pages.SIGNIN)}>Sign in</button>
          <button onClick={() => setPage(Pages.SIGNUP)}>Sign up</button>
        </div>
      </div>
      <div className={styles.outlet}>
        {pageController(page)}
      </div>
    </>
  )
}

export default App
