import { useState } from 'react';
import { loginUser } from '../db';
import luxuryCarBg from '../assets/luxury_coastal_car.jpg';

const loginStyles = `
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

  /* Sunlit soft overlay for clean legibility */
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

  /* Top Pill Badge */
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
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
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

  /* Feature Value Proposition Badges */
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
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  }

  /* Glassmorphic Privilege Tier Banner */
  .privilege-banner {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 14px;
    padding: 12px 14px;
    box-shadow: 0 10px 25px -5px rgba(0, 82, 255, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02);
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
    box-shadow: 0 6px 14px -3px rgba(0, 82, 255, 0.45);
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
    line-height: 1.35;
  }

  /* Driver Testimonial Card */
  .testimonial-card {
    background: #ffffff;
    border-radius: 14px;
    padding: 14px 18px;
    box-shadow: 0 12px 28px -6px rgba(15, 23, 42, 0.08), 0 0 1px 1px rgba(15, 23, 42, 0.03);
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
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .rating-score {
    color: #0f172a;
    font-weight: 800;
    margin-left: 2px;
  }

  .rating-cities {
    color: #64748b;
    font-size: 0.75rem;
    font-weight: 500;
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
    font-weight: 500;
  }

  /* ================= RIGHT SIDE: SIGN IN FORM ================= */
  .form-panel {
    background: #ffffff;
    padding: 40px 38px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid #f1f5f9;
  }

  .form-header {
    margin-bottom: 18px;
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
    line-height: 1.45;
  }

  /* Social Auth Buttons */
  .social-auth-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 18px;
  }

  .social-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 14px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.86rem;
    font-weight: 600;
    color: #1e293b;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
    transition: all 0.2s ease;
  }

  .social-button:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
    transform: translateY(-1px);
  }

  .social-icon-svg {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
  }

  /* Divider */
  .auth-divider {
    display: flex;
    align-items: center;
    margin: 14px 0 18px 0;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }

  .divider-text {
    padding: 0 12px;
    color: #64748b;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  /* Input Fields */
  .form-group {
    margin-bottom: 16px;
  }

  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .label-row label {
    font-size: 0.84rem;
    font-weight: 600;
    color: #1e293b;
  }

  .protected-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #16a34a;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .forgot-link {
    color: #0052FF;
    font-size: 0.78rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
  }

  .forgot-link:hover {
    text-decoration: underline;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .field-icon-left {
    position: absolute;
    left: 12px;
    color: #94a3b8;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .input-wrapper input {
    width: 100%;
    padding: 11px 14px 11px 38px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.9rem;
    color: #0f172a;
    font-family: inherit;
    transition: all 0.2s ease;
  }

  .input-wrapper.has-toggle input {
    padding-right: 38px;
  }

  .input-wrapper input:focus {
    outline: none;
    background: #ffffff;
    border-color: #0052FF;
    box-shadow: 0 0 0 3px rgba(0, 82, 255, 0.12);
  }

  .input-wrapper input::placeholder {
    color: #94a3b8;
  }

  .toggle-password-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    color: #64748b;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 2px;
  }

  .toggle-password-btn:hover {
    color: #0f172a;
  }

  .error-text {
    display: block;
    color: #ef4444;
    font-size: 0.78rem;
    margin-top: 4px;
    font-weight: 500;
  }

  /* Convenience & SSL Row */
  .security-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px 0 18px 0;
  }

  .remember-wrapper {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 0.82rem;
    color: #334155;
    font-weight: 500;
    cursor: pointer;
  }

  .remember-wrapper input[type='checkbox'] {
    width: 15px;
    height: 15px;
    accent-color: #0052FF;
    cursor: pointer;
  }

  .ssl-indicator {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #16a34a;
    font-size: 0.78rem;
    font-weight: 600;
  }

  /* Submit Primary Button */
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
    transition: all 0.2s ease;
  }

  .submit-drive-btn:hover {
    background: #0043D6;
    transform: translateY(-1px);
    box-shadow: 0 14px 26px -5px rgba(0, 82, 255, 0.5);
  }

  .submit-drive-btn:active {
    transform: translateY(0);
  }

  .submit-drive-btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }

  /* Passwordless OTP Link */
  .otp-action {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 14px;
    color: #475569;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    background: none;
    border: none;
    width: 100%;
    transition: color 0.15s ease;
  }

  .otp-action:hover {
    color: #0052FF;
  }

  /* Bottom Switch & Legal */
  .switch-signup {
    text-align: center;
    margin-top: 20px;
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
    text-decoration: none;
    font-size: 0.84rem;
  }

  .signup-link-btn:hover {
    text-decoration: underline;
  }

  .legal-note {
    margin-top: 14px;
    font-size: 0.72rem;
    color: #94a3b8;
    text-align: center;
    line-height: 1.45;
  }

  /* Alert messages */
  .alert-banner {
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 0.82rem;
    margin-bottom: 14px;
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

function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
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
      setErrorMsg(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{loginStyles}</style>
      <div className="auth-card-split">
        {/* ================= LEFT SIDE: BRAND SHOWCASE ================= */}
        <div className="brand-showcase">
          {/* Top Content */}
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

          {/* Bottom Cards Content */}
          <div className="showcase-content">
            {/* Privilege Tier Banner */}
            <div className="privilege-banner">
              <div className="privilege-icon">⚡</div>
              <div className="privilege-content">
                <div className="privilege-tag">Privilege Tier</div>
                <div className="privilege-text">
                  Members receive 15% off first weekend rental + complimentary Supercharging.
                </div>
              </div>
            </div>

            {/* Testimonial Card */}
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

        {/* ================= RIGHT SIDE: SIGN IN FORM ================= */}
        <div className="form-panel">
          <div className="form-header">
            <div className="driver-access-tag">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
                <circle cx="7.5" cy="14.5" r="1.5" />
                <circle cx="16.5" cy="14.5" r="1.5" />
              </svg>
              <span>Express Driver Access</span>
            </div>
            <h2>Welcome back, Driver</h2>
            <p>Please enter your credentials to manage active journeys, digital keys, and rapid billing.</p>
          </div>

          {/* Social Auth Buttons */}
          <div className="social-auth-grid">
            <button
              type="button"
              className="social-button"
              onClick={() => setErrorMsg('Google Sign-In is configured for production SSO.')}
            >
              <svg className="social-icon-svg" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className="social-button"
              onClick={() => setErrorMsg('Apple ID authentication is configured for production SSO.')}
            >
              <svg className="social-icon-svg" viewBox="0 0 24 24" fill="#000000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.86.96-2.94-1 .04-2.13.66-2.77 1.41-.57.66-1.07 1.76-.94 2.81 1.11.09 2.17-.58 2.75-1.28z" />
              </svg>
              <span>Apple ID</span>
            </button>
          </div>

          {/* Divider */}
          <div className="auth-divider">
            <div className="divider-line"></div>
            <div className="divider-text">Or with credentials</div>
            <div className="divider-line"></div>
          </div>

          {/* Alert messages */}
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
            {/* Email Address */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="login-email">Email Address</label>
                <span className="protected-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                  </svg>
                  <span>Protected</span>
                </span>
              </div>
              <div className="input-wrapper">
                <span className="field-icon-left">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="email"
                  placeholder="alex.chen@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: null }));
                  }}
                  required
                />
              </div>
              {fieldErrors.email && <span className="error-text">{fieldErrors.email[0]}</span>}
            </div>

            {/* Master Password */}
            <div className="form-group">
              <div className="label-row">
                <label htmlFor="login-password">Master Password</label>
                <a
                  href="#forgot"
                  className="forgot-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setErrorMsg('Password recovery instructions sent to your email address.');
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="input-wrapper has-toggle">
                <span className="field-icon-left">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your security password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: null }));
                  }}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  )}
                </button>
              </div>
              {fieldErrors.password && <span className="error-text">{fieldErrors.password[0]}</span>}
            </div>

            {/* Remember device & SSL indicator */}
            <div className="security-row">
              <label className="remember-wrapper">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                />
                <span>Remember this device</span>
              </label>

              <span className="ssl-indicator">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                <span>256-bit SSL Session</span>
              </span>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-drive-btn" disabled={loading}>
              <span>{loading ? 'Authenticating...' : 'Sign In to Drive'}</span>
              <span>➔</span>
            </button>
          </form>

          {/* Passwordless OTP */}
          <button
            type="button"
            className="otp-action"
            onClick={() => setErrorMsg('OTP verification sent! Check your registered mobile SMS.')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span>Send a passwordless one-time verification code</span>
          </button>

          {/* Registration link */}
          <div className="switch-signup">
            Don&apos;t have an account?
            <button type="button" className="signup-link-btn" onClick={onSwitchToRegister}>
              Sign up for free (under 2 mins)
            </button>
          </div>

          <p className="legal-note">
            By authenticating, you agree to our Digital Key Protocol, Terms of Service, and
            Telematics Privacy Policy.
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
