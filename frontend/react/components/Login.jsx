import { useState } from 'react';
import { loginUser } from '../db';
import myCar from '../assets/car.jpeg';

const loginStyles = `
  .auth-card-split {
    display: flex;
    flex-direction: row;
    background: #ffffff;
    border-radius: 28px;
    padding: 14px;
    width: 100%;
    max-width: 1080px;
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.04);
    align-items: stretch;
  }

  /* Left Side: Dark Obsidian Luxury Car Showcase */
  .visual-sidebar {
    flex: 1.05;
    background: radial-gradient(circle at 50% 40%, #161424 0%, #0d0c14 55%, #050507 100%);
    border-radius: 20px;
    padding: 28px 26px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.06);
    min-height: 480px;
  }

  /* Ambient light decorations */
  .visual-sidebar::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 220px;
    height: 220px;
    background: radial-gradient(circle, rgba(236, 72, 153, 0.14) 0%, transparent 70%);
    pointer-events: none;
  }

  .visual-sidebar::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: -60px;
    width: 240px;
    height: 240px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .sidebar-header-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 0.35rem 0.85rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.8px;
    color: #e2e8f0;
    width: fit-content;
    z-index: 2;
  }

  .badge-pulse {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ec4899;
    box-shadow: 0 0 8px #ec4899;
  }

  /* Big Fitted Car Display Stage (Seamless Black, No Border) */
  .car-display-stage {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1.4rem 0;
    z-index: 2;
    width: 100%;
  }

  .car-glow-backdrop {
    position: absolute;
    width: 90%;
    height: 75%;
    background: radial-gradient(ellipse, rgba(244, 114, 182, 0.24) 0%, rgba(99, 102, 241, 0.14) 50%, transparent 75%);
    filter: blur(28px);
    pointer-events: none;
  }

  .hero-car-image {
    width: 100%;
    max-width: 440px;
    height: auto;
    object-fit: contain;
    display: block;
    position: relative;
    z-index: 2;
    filter: drop-shadow(0 14px 20px rgba(0, 0, 0, 0.85));
    transition: transform 0.35s ease;
  }

  .hero-car-image:hover {
    transform: scale(1.04) translateY(-2px);
  }

  /* Specs Badges */
  .car-specs-row {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    z-index: 2;
  }

  .spec-pill {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.09);
    padding: 0.3rem 0.65rem;
    border-radius: 8px;
    font-size: 0.73rem;
    font-weight: 600;
    color: #cbd5e1;
    letter-spacing: 0.3px;
  }

  /* Encouraging Words at Bottom */
  .sidebar-footer {
    z-index: 2;
  }

  .sidebar-subtag {
    font-size: 0.78rem;
    font-weight: 600;
    color: #ec4899;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin-bottom: 0.35rem;
  }

  .sidebar-heading {
    font-size: 1.45rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1.35;
    margin: 0;
    letter-spacing: -0.3px;
  }

  /* Right Side: Form Area */
  .form-panel {
    flex: 1.15;
    padding: 28px 46px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-header h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.3rem 0;
    letter-spacing: -0.4px;
  }

  .form-header p {
    font-size: 0.88rem;
    color: #64748b;
    line-height: 1.45;
    margin: 0 0 1.25rem 0;
  }

  .form-group {
    margin-bottom: 0.95rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    text-align: left;
  }

  .form-group label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #1e293b;
  }

  .form-group input {
    width: 100%;
    padding: 0.74rem 0.95rem;
    border-radius: 10px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    color: #0f172a;
    font-size: 0.92rem;
    outline: none;
    transition: all 0.2s ease;
  }

  .form-group input:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }

  .error-text {
    color: #ef4444;
    font-size: 0.78rem;
  }

  .alert-box {
    padding: 0.65rem 0.9rem;
    border-radius: 9px;
    font-size: 0.85rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .alert-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #b91c1c;
  }

  .alert-success {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #15803d;
  }

  .submit-button {
    width: 100%;
    padding: 0.85rem;
    background: #4f46e5;
    border: none;
    border-radius: 10px;
    color: #ffffff;
    font-weight: 600;
    font-size: 0.94rem;
    cursor: pointer;
    box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.45);
    transition: all 0.2s ease;
    margin-top: 0.35rem;
  }

  .submit-button:hover:not(:disabled) {
    background: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 14px 24px -5px rgba(79, 70, 229, 0.5);
  }

  .submit-button:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .switch-footer {
    margin-top: 1.4rem;
    text-align: center;
    font-size: 0.85rem;
    color: #64748b;
  }

  .switch-link {
    background: none;
    border: none;
    color: #4f46e5;
    font-weight: 600;
    cursor: pointer;
    text-decoration: underline;
    margin-left: 0.35rem;
  }

  @media (max-width: 860px) {
    .auth-card-split {
      flex-direction: column;
    }
    .visual-sidebar {
      min-height: 320px;
      padding: 22px;
    }
    .form-panel {
      padding: 24px 18px;
    }
  }
`;

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setFieldErrors({});
    setSuccessMsg('');
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      setSuccessMsg(data.message || 'Login successful!');
      if (data.user) {
        setTimeout(() => {
          onLoginSuccess(data.user);
        }, 500);
      }
    } catch (err) {
      if (err.errors) {
        setFieldErrors(err.errors);
      }
      setErrorMsg(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{loginStyles}</style>
      <div className="auth-card-split">
        {/* Left Visual Sidebar (Dark Luxury Car Showcase) */}
        <div className="visual-sidebar">
          {/* Top Decorative Badge */}
          <div className="sidebar-header-badge">
            <span className="badge-pulse"></span>
            <span>GT3 RS • EXCLUSIVE FLEET</span>
          </div>

          {/* Big Fitted Car Display Stage */}
          <div className="car-display-stage">
            <div className="car-glow-backdrop"></div>
            <img src={myCar} alt="Porsche 911 GT3 RS" className="hero-car-image" />
            <div className="car-specs-row">
              <span className="spec-pill">⚡ 525 HP</span>
              <span className="spec-pill">⏱ 0-100: 3.2s</span>
              <span className="spec-pill">🏁 Track Edition</span>
            </div>
          </div>

          {/* Encouraging Words */}
          <div className="sidebar-footer">
            <div className="sidebar-subtag">Exclusive Collection</div>
            <h3 className="sidebar-heading">
              Drive the car of your dreams with complete freedom
            </h3>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="form-panel">
          <div className="form-header">
            <h2>Sign In</h2>
            <p>Access your vehicles, bookings, and rentals anytime — all in one place.</p>
          </div>

          {errorMsg && (
            <div className="alert-box alert-error">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="alert-box alert-success">
              <span>✅</span>
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="login-email">Your email</label>
              <input
                id="login-email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: null }));
                }}
                required
              />
              {fieldErrors.email && <span className="error-text">{fieldErrors.email[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: null }));
                }}
                required
              />
              {fieldErrors.password && <span className="error-text">{fieldErrors.password[0]}</span>}
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="switch-footer">
            Don't have an account?
            <button type="button" className="switch-link" onClick={onSwitchToRegister}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
