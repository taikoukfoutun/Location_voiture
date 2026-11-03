import { useState } from 'react';
import { registerUser } from '../db';
import luxuryCarBg from '../assets/luxury_coastal_car.jpg';

const registerStyles = `
  .auth-card-split {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    background: #ffffff;
    border-radius: 28px;
    width: 100%;
    max-width: 1100px;
    box-shadow: 0 25px 65px -15px rgba(15, 23, 42, 0.1), 0 0 1px 1px rgba(15, 23, 42, 0.05);
    overflow: hidden;
    border: 1px solid #e2e8f0;
    min-height: 640px;
  }

  @media (max-width: 960px) {
    .auth-card-split {
      grid-template-columns: 1fr;
      max-width: 520px;
    }
  }

  /* ================= LEFT SIDE: BRAND SHOWCASE ================= */
  .brand-showcase {
    position: relative;
    background-image: url('${luxuryCarBg}');
    background-size: cover;
    background-position: center bottom;
    padding: 38px 36px 32px 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    min-height: 520px;
  }

  .brand-showcase::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.94) 0%,
      rgba(255, 255, 255, 0.72) 40%,
      rgba(255, 255, 255, 0.25) 65%,
      rgba(255, 255, 255, 0.88) 100%
    );
    pointer-events: none;
    z-index: 1;
  }

  .showcase-content {
    position: relative;
    z-index: 2;
  }

  .fleet-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(226, 232, 240, 0.9);
    padding: 0.35rem 0.85rem;
    border-radius: 9999px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: #475569;
    text-transform: uppercase;
  }

  .dot-indicator {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
  }

  .showcase-headline {
    font-size: 2.2rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.18;
    margin-top: 14px;
    margin-bottom: 8px;
    letter-spacing: -0.6px;
  }

  .showcase-description {
    font-size: 0.92rem;
    color: #334155;
    line-height: 1.5;
    max-width: 440px;
    margin-bottom: 16px;
  }

  .feature-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }

  .feature-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(226, 232, 240, 0.9);
    padding: 6px 12px;
    border-radius: 9999px;
    font-size: 0.78rem;
    font-weight: 600;
    color: #1e293b;
  }

  .privilege-banner {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 14px;
    padding: 12px 14px;
    box-shadow: 0 10px 25px -5px rgba(0, 82, 255, 0.08);
    margin-bottom: 12px;
  }

  .privilege-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: #0052FF;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 1.15rem;
    flex-shrink: 0;
  }

  .privilege-content .privilege-tag {
    font-size: 0.72rem;
    font-weight: 800;
    color: #0052FF;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }

  .privilege-content .privilege-text {
    font-size: 0.78rem;
    color: #334155;
    font-weight: 500;
    margin-top: 1px;
  }

  .testimonial-card {
    background: #ffffff;
    border-radius: 14px;
    padding: 14px 18px;
    box-shadow: 0 12px 28px -6px rgba(15, 23, 42, 0.08);
    border: 1px solid rgba(226, 232, 240, 0.85);
  }

  .testimonial-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.82rem;
    margin-bottom: 6px;
  }

  .rating-stars {
    color: #0052FF;
    font-weight: 700;
  }

  .rating-score {
    color: #0f172a;
    font-weight: 800;
    margin-left: 2px;
  }

  .rating-cities {
    color: #64748b;
    font-size: 0.75rem;
  }

  .testimonial-quote {
    font-size: 0.8rem;
    font-style: italic;
    color: #334155;
    line-height: 1.45;
    margin-bottom: 8px;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .author-avatar {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #eff6ff;
    color: #0052FF;
    font-size: 0.72rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .author-info {
    font-size: 0.75rem;
    color: #64748b;
  }

  /* ================= RIGHT SIDE: FORM ================= */
  .form-panel {
    background: #ffffff;
    padding: 38px 38px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid #f1f5f9;
  }

  .form-header {
    margin-bottom: 16px;
  }

  .driver-access-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #0052FF;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .form-header h2 {
    font-size: 1.85rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
  }

  .form-header p {
    color: #64748b;
    font-size: 0.86rem;
  }

  .form-group {
    margin-bottom: 12px;
  }

  .form-group label {
    display: block;
    font-size: 0.84rem;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 5px;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-wrapper input {
    width: 100%;
    padding: 10px 14px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.9rem;
    color: #0f172a;
    font-family: inherit;
    transition: all 0.2s ease;
  }

  .input-wrapper input:focus {
    outline: none;
    background: #ffffff;
    border-color: #0052FF;
    box-shadow: 0 0 0 3px rgba(0, 82, 255, 0.12);
  }

  .error-text {
    display: block;
    color: #ef4444;
    font-size: 0.78rem;
    margin-top: 4px;
    font-weight: 500;
  }

  .submit-drive-btn {
    width: 100%;
    padding: 12px 18px;
    background: #0052FF;
    border: none;
    color: #ffffff;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 10px 22px -5px rgba(0, 82, 255, 0.42);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 10px;
    transition: all 0.2s ease;
  }

  .submit-drive-btn:hover {
    background: #0043D6;
    transform: translateY(-1px);
    box-shadow: 0 14px 26px -5px rgba(0, 82, 255, 0.5);
  }

  .submit-drive-btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .switch-signup {
    text-align: center;
    margin-top: 18px;
    font-size: 0.84rem;
    color: #64748b;
  }

  .signup-link-btn {
    background: none;
    border: none;
    color: #0052FF;
    font-weight: 700;
    margin-left: 4px;
    cursor: pointer;
    font-size: 0.84rem;
  }

  .signup-link-btn:hover {
    text-decoration: underline;
  }

  .alert-banner {
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 0.82rem;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .alert-error {
    background: #fef2f2;
    color: #b91c1c;
    border: 1px solid #fecaca;
  }

  .alert-success {
    background: #f0fdf4;
    color: #15803d;
    border: 1px solid #bbf7d0;
  }
`;

function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setFieldErrors({});
    setSuccessMsg('');
    setLoading(true);

    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.password_confirmation,
      });

      setSuccessMsg(data.message || 'Account created successfully!');
      if (data.user) {
        setTimeout(() => {
          onRegisterSuccess(data.user);
        }, 500);
      }
    } catch (err) {
      if (err.errors) {
        setFieldErrors(err.errors);
      }
      setErrorMsg(err.message || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{registerStyles}</style>
      <div className="auth-card-split">
        {/* ================= LEFT SIDE: BRAND SHOWCASE ================= */}
        <div className="brand-showcase">
          <div className="showcase-content">
            <div className="fleet-badge">
              <span className="dot-indicator"></span>
              <span>Fleet Access Portal</span>
            </div>

            <h1 className="showcase-headline">Unlock the Open Road.</h1>
            <p className="showcase-description">
              Experience pristine luxury, electric performance, and seamless instant keyless booking
              with zero waiting lines.
            </p>

            <div className="feature-pills">
              <span className="feature-pill">📱 Instant Keyless Mobile Unlock</span>
              <span className="feature-pill">📅 Free Cancellation up to 24h</span>
              <span className="feature-pill">🛡️ Fully Insured & 24/7 VIP Concierge</span>
            </div>
          </div>

          <div className="showcase-content">
            <div className="privilege-banner">
              <div className="privilege-icon">⚡</div>
              <div className="privilege-content">
                <div className="privilege-tag">Privilege Tier</div>
                <div className="privilege-text">
                  Members receive 15% off first weekend rental + complimentary Supercharging.
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-header">
                <span className="rating-stars">
                  ★★★★★ <span className="rating-score">4.98 / 5</span>
                </span>
                <span className="rating-cities">120,000+ Drivers Across 45 Cities</span>
              </div>
              <p className="testimonial-quote">
                &ldquo;Smoothest rental process ever created. Booked on departure, unlocked the
                Taycan at the airport bay in under 30 seconds.&rdquo;
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">M</div>
                <span className="author-info">Marcus V. — Verified Club Member, Zurich</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE: FORM ================= */}
        <div className="form-panel">
          <div className="form-header">
            <div className="driver-access-tag">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
                <circle cx="7.5" cy="14.5" r="1.5" />
                <circle cx="16.5" cy="14.5" r="1.5" />
              </svg>
              <span>Driver Registration</span>
            </div>
            <h2>Join Veloce Drive</h2>
            <p>Create your verified account in under 2 minutes and unlock our exclusive fleet.</p>
          </div>

          {errorMsg && (
            <div className="alert-banner alert-error">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="alert-banner alert-success">
              <span>✅</span>
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="reg-name">Full Name</label>
              <div className="input-wrapper">
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Alex Chen"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {fieldErrors.name && <span className="error-text">{fieldErrors.name[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email Address</label>
              <div className="input-wrapper">
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  placeholder="alex.chen@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {fieldErrors.email && <span className="error-text">{fieldErrors.email[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <div className="input-wrapper">
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {fieldErrors.password && <span className="error-text">{fieldErrors.password[0]}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="reg-confirm">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  id="reg-confirm"
                  name="password_confirmation"
                  type="password"
                  placeholder="Repeat your password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  required
                />
              </div>
              {fieldErrors.password_confirmation && (
                <span className="error-text">{fieldErrors.password_confirmation[0]}</span>
              )}
            </div>

            <button type="submit" className="submit-drive-btn" disabled={loading}>
              <span>{loading ? 'Creating Account...' : 'Complete Driver Registration'}</span>
              <span>➔</span>
            </button>
          </form>

          <div className="switch-signup">
            Already have an account?
            <button type="button" className="signup-link-btn" onClick={onSwitchToLogin}>
              Sign In to Drive
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
