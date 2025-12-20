import { useEffect, useState } from 'react';
import { fetchMe, signOut } from '@/api/auth';
import Home from './pages/home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import styles from './App.module.css';

function App() {
  const Routes = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [route, setRoute] = useState(() =>
    resolveRoute(window.location.pathname, false),
  );

  useEffect(() => {
    let isMounted = true;
    const checkAuth = async () => {
      try {
        const me = await fetchMe();
        if (isMounted && me) {
          setIsAuthenticated(true);
        }
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    };
    checkAuth();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(resolveRoute(window.location.pathname, isAuthenticated));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isCheckingAuth) {
      return;
    }
    const resolved = resolveRoute(window.location.pathname, isAuthenticated);
    if (resolved !== route || window.location.pathname !== resolved) {
      navigate(resolved, true);
    }
  }, [isAuthenticated, route, isCheckingAuth]);

  function resolveRoute(pathname, isAuthed) {
    if (pathname === Routes.REGISTER) {
      return Routes.REGISTER;
    }
    if (pathname === Routes.LOGIN) {
      return Routes.LOGIN;
    }
    if (pathname === Routes.HOME) {
      return isAuthed ? Routes.HOME : Routes.LOGIN;
    }
    return isAuthed ? Routes.HOME : Routes.LOGIN;
  }

  function navigate(path, replace = false, isAuthedOverride = isAuthenticated) {
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    setRoute(resolveRoute(path, isAuthedOverride));
  }

  function handleAuthSuccess() {
    setIsAuthenticated(true);
    navigate(Routes.HOME, true, true);
  }

  async function handleLogout() {
    try {
      await signOut();
    } catch {
    }
    setIsAuthenticated(false);
    navigate(Routes.LOGIN, true);
  }

  function pageController(currentRoute) {
    switch (currentRoute) {
      case Routes.HOME:
        return <Home />;
      case Routes.LOGIN:
        return <SignIn onAuthSuccess={handleAuthSuccess} />;
      case Routes.REGISTER:
        return <SignUp />;
    }
  }

  return (
    <>
      <div className={styles.dashboard}>
        <button onClick={() => navigate(Routes.HOME)} disabled={!isAuthenticated}>
          Home
        </button>
        <div>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <button onClick={() => navigate(Routes.LOGIN)}>Sign In</button>
              <button onClick={() => navigate(Routes.REGISTER)}>Sign Up</button>
            </>
          )}
        </div>
      </div>
      <div className={styles.outlet}>
        {pageController(route)}
      </div>
    </>
  )
}

export default App
