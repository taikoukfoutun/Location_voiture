import { useState } from 'react';
import FleetShowcase from './components/FleetShowcase';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { getStoredUser, setStoredUser, logoutUser } from './db';

const appGlobalStyles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100vh;
    background: #f8fafc;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #0f172a;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    background: #f8fafc;
  }

  /* Centered Auth Stage for Login / Register */
  .auth-stage-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 1rem;
    background: #f1f5f9;
  }

  /* Admin Mode wrapper */
  .admin-stage-container {
    max-width: 1360px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }
`;

function App() {
  const [user, setUser] = useState(() => getStoredUser());
  const [currentView, setCurrentView] = useState('showcase'); // 'showcase' | 'login' | 'register' | 'user_portal' | 'admin_portal'
  const [intendedCar, setIntendedCar] = useState(null);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setStoredUser(userData);

    // If user was logging in to rent a specific car, return to showcase to complete booking
    if (intendedCar) {
      setCurrentView('showcase');
    } else if (userData?.role === 'admin' || userData?.role === 'gestionnaire') {
      setCurrentView('admin_portal');
    } else {
      setCurrentView('showcase');
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    setStoredUser(updatedUser);
  };

  const handleReturnToShowcase = () => {
    // Ensure fresh user data is synchronized from storage
    const freshUser = getStoredUser();
    if (freshUser) setUser(freshUser);
    setCurrentView('showcase');
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setCurrentView('showcase');
    setIntendedCar(null);
  };

  const handleOpenLogin = (car = null) => {
    if (car) setIntendedCar(car);
    setCurrentView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegister = (car = null) => {
    if (car) setIntendedCar(car);
    setCurrentView('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{appGlobalStyles}</style>

      {/* VIEW 1: PUBLIC FLEET SHOWCASE & STOREFRONT (Default for all visitors!) */}
      {currentView === 'showcase' && (
        <FleetShowcase
          user={user}
          onOpenLogin={handleOpenLogin}
          onOpenRegister={handleOpenRegister}
          onOpenUserPortal={() => setCurrentView('user_portal')}
          onOpenAdminPortal={() => setCurrentView('admin_portal')}
          onLogout={handleLogout}
          intendedCar={intendedCar}
          onClearIntendedCar={() => setIntendedCar(null)}
        />
      )}

      {/* VIEW 2: LOGIN */}
      {currentView === 'login' && (
        <div className="auth-stage-container">
          <Login
            onLoginSuccess={handleAuthSuccess}
            onSwitchToRegister={() => setCurrentView('register')}
            onBackToFleet={() => setCurrentView('showcase')}
          />
        </div>
      )}

      {/* VIEW 3: REGISTER */}
      {currentView === 'register' && (
        <div className="auth-stage-container">
          <Register
            onRegisterSuccess={handleAuthSuccess}
            onSwitchToLogin={() => setCurrentView('login')}
            onBackToFleet={() => setCurrentView('showcase')}
          />
        </div>
      )}

      {/* VIEW 4: CUSTOMER DASHBOARD / PORTAL (Profile, Documents & Reservations) */}
      {currentView === 'user_portal' && user && (
        <UserDashboard
          user={user}
          onLogout={handleLogout}
          onUpdateUser={handleUpdateUser}
          onBackToFleet={handleReturnToShowcase}
        />
      )}

      {/* VIEW 5: ADMIN & GESTIONNAIRE DASHBOARD */}
      {currentView === 'admin_portal' && user && (
        <div className="admin-stage-container">
          <AdminDashboard
            user={user}
            onLogout={handleLogout}
            onBackToFleet={() => setCurrentView('showcase')}
          />
        </div>
      )}
    </>
  );
}

export default App;
