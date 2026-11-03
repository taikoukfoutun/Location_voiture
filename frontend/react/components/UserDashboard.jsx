const userStyles = `
  .dashboard-card {
    background: #ffffff;
    border-radius: 28px;
    padding: 3rem 2.5rem;
    max-width: 520px;
    width: 100%;
    box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.1), 0 0 1px 1px rgba(15, 23, 42, 0.04);
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .dashboard-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #4f46e5, #06b6d4);
  }

  .user-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(79, 70, 229, 0.08);
    border: 1px solid rgba(79, 70, 229, 0.2);
    color: #4f46e5;
    padding: 0.4rem 1rem;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  .user-avatar {
    width: 76px;
    height: 76px;
    margin: 0 auto 1.2rem auto;
    border-radius: 50%;
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 2rem;
    font-weight: 700;
    box-shadow: 0 12px 24px -6px rgba(79, 70, 229, 0.35);
  }

  .dashboard-title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
    margin-bottom: 0.5rem;
  }

  .dashboard-subtitle {
    color: #64748b;
    font-size: 0.95rem;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .info-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 1.2rem 1.4rem;
    margin-bottom: 2rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.88rem;
  }

  .info-label {
    color: #64748b;
    font-weight: 500;
  }

  .info-value {
    color: #0f172a;
    font-weight: 600;
  }

  .info-value.badge-role {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
    padding: 0.2rem 0.6rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .signout-btn {
    width: 100%;
    padding: 0.85rem 1.5rem;
    background: #ef4444;
    border: none;
    color: #ffffff;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 10px 20px -5px rgba(239, 68, 68, 0.35);
    transition: all 0.2s ease;
  }

  .signout-btn:hover {
    background: #dc2626;
    transform: translateY(-1px);
    box-shadow: 0 14px 24px -5px rgba(239, 68, 68, 0.45);
  }

  .signout-btn:active {
    transform: translateY(0);
  }
`;

function UserDashboard({ user, onLogout }) {
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <>
      <style>{userStyles}</style>
      <div className="dashboard-card">
        <div className="user-badge">
          <span>🚗</span>
          <span>Customer Portal</span>
        </div>

        <div className="user-avatar">{initial}</div>

        <h1 className="dashboard-title">Hey User</h1>
        <p className="dashboard-subtitle">
          Welcome back! Explore our luxury fleet and manage your vehicle reservations.
        </p>

        <div className="info-box">
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{user?.name || 'Customer'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Role:</span>
            <span className="info-value badge-role">USER</span>
          </div>
          <div className="info-row">
            <span className="info-label">Account Status:</span>
            <span className="info-value" style={{ color: '#16a34a' }}>● Active</span>
          </div>
        </div>

        <button type="button" className="signout-btn" onClick={onLogout}>
          Sign Out
        </button>
      </div>
    </>
  );
}

export default UserDashboard;
