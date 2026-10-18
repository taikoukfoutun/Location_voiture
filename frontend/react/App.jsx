import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { getStoredUser, setStoredUser, logoutUser } from './db';

const appStyles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100vh;
    background: #f1f2f8;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #0f172a;
    -webkit-font-smoothing: antialiased;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  .app-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 1rem;
  }

  /* Simple clean home view after login */
  .home-screen {
    text-align: center;
    background: #ffffff;
    border-radius: 28px;
    padding: 3rem 2.5rem;
    max-width: 480px;
    width: 100%;
    box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.08), 0 0 1px 1px rgba(15, 23, 42, 0.03);
  }

  .home-screen .user-avatar {
    width: 68px;
    height: 68px;
    margin: 0 auto 1.2rem auto;
    border-radius: 50%;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 1.8rem;
    font-weight: 700;
  }

  .home-screen h1 {
    font-size: 1.7rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
    color: #0f172a;
  }

  .home-screen p {
    color: #64748b;
    font-size: 0.95rem;
    margin-bottom: 1.8rem;
  }

  .logout-btn {
    padding: 0.75rem 2rem;
    background: #ef4444;
    border: none;
    color: #ffffff;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 10px 20px -5px rgba(239, 68, 68, 0.35);
    transition: all 0.2s ease;
  }

  .logout-btn:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
`;

function App() {
  const [user, setUser] = useState(() => getStoredUser());
  const [isRegisterView, setIsRegisterView] = useState(false);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setStoredUser(userData);
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <>
      <style>{appStyles}</style>
      <div className="app-container">
        {user ? (
          <div className="home-screen">
            <div className="user-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <h1>Welcome, {user.name}!</h1>
            <p>You are logged in with {user.email}.</p>
            <button className="logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        ) : isRegisterView ? (
          <Register
            onRegisterSuccess={handleAuthSuccess}
            onSwitchToLogin={() => setIsRegisterView(false)}
          />
        ) : (
          <Login
            onLoginSuccess={handleAuthSuccess}
            onSwitchToRegister={() => setIsRegisterView(true)}
          />
        )}
      </div>
    </>
  );
}

export default App;
