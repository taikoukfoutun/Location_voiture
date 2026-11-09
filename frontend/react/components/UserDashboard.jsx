import { useState } from 'react';

const userStyles = `
  .user-portal-container {
    width: 100%;
    max-width: 1080px;
    margin: 0 auto;
    padding: 32px 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', Helvetica, Arial, sans-serif;
    color: #0f172a;
  }

  .portal-nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 16px 24px;
    margin-bottom: 28px;
    box-shadow: 0 4px 16px -4px rgba(15, 23, 42, 0.05);
  }

  .portal-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .portal-brand-icon {
    width: 40px;
    height: 40px;
    background: #0f172a;
    color: #ffffff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15rem;
  }

  .portal-brand-text h2 {
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: -0.3px;
    color: #0f172a;
  }

  .portal-brand-text span {
    font-size: 0.72rem;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }

  .portal-nav-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .btn-back-fleet {
    background: #2563eb;
    color: #ffffff;
    border: none;
    padding: 9px 18px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    transition: all 0.2s ease;
  }

  .btn-back-fleet:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
  }

  .btn-portal-signout {
    background: #fee2e2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 9px 16px;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-portal-signout:hover {
    background: #fca5a5;
  }

  /* Portal Grid Layout */
  .portal-layout-grid {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 28px;
  }

  @media (max-width: 860px) {
    .portal-layout-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Profile Summary Card */
  .profile-sidebar-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    padding: 32px 24px;
    text-align: center;
    box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.05);
    height: fit-content;
  }

  .customer-avatar-large {
    width: 88px;
    height: 88px;
    margin: 0 auto 16px auto;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #4f46e5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 2.2rem;
    font-weight: 800;
    box-shadow: 0 12px 24px -6px rgba(37, 99, 235, 0.35);
  }

  .profile-name {
    font-size: 1.4rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 4px;
  }

  .profile-email {
    font-size: 0.88rem;
    color: #64748b;
    margin-bottom: 20px;
  }

  .verification-badge-box {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .verification-badge-box.verified {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #16a34a;
  }

  .verification-badge-box.pending {
    background: #fffbeb;
    border: 1px solid #fde68a;
    color: #d97706;
  }

  .profile-quick-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    border-top: 1px solid #f1f5f9;
    padding-top: 20px;
    text-align: center;
  }

  .quick-stat-item {
    background: #f8fafc;
    border-radius: 12px;
    padding: 12px;
    border: 1px solid #e2e8f0;
  }

  .stat-number {
    font-size: 1.3rem;
    font-weight: 800;
    color: #0f172a;
  }

  .stat-label {
    font-size: 0.72rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    margin-top: 2px;
  }

  /* Main Document & Form Panels */
  .portal-main-panel {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .panel-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    padding: 30px;
    box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.05);
  }

  .panel-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
    padding-bottom: 14px;
    border-bottom: 1px solid #f1f5f9;
  }

  .panel-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .panel-tag {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    background: #eff6ff;
    color: #2563eb;
    padding: 3px 10px;
    border-radius: 6px;
  }

  /* Driver's License Upload Zone */
  .license-upload-zone {
    border: 2px dashed #cbd5e1;
    border-radius: 16px;
    padding: 32px 20px;
    text-align: center;
    background: #f8fafc;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
  }

  .license-upload-zone:hover {
    border-color: #2563eb;
    background: #f0f7ff;
  }

  .upload-icon-circle {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #2563eb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin: 0 auto 14px auto;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
  }

  .upload-zone-title {
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 6px;
  }

  .upload-zone-desc {
    font-size: 0.82rem;
    color: #64748b;
    max-width: 380px;
    margin: 0 auto;
  }

  .file-hidden-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }

  .uploaded-file-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f0fdf4;
    border: 1px solid #86efac;
    border-radius: 12px;
    padding: 14px 18px;
    margin-top: 18px;
  }

  .file-info-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .file-icon-badge {
    font-size: 1.6rem;
  }

  .file-name-text {
    font-size: 0.9rem;
    font-weight: 700;
    color: #14532d;
  }

  .file-size-text {
    font-size: 0.78rem;
    color: #15803d;
  }

  .btn-remove-doc {
    background: transparent;
    border: none;
    color: #dc2626;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
  }

  /* Form Fields */
  .portal-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 18px;
  }

  .portal-label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 6px;
  }

  .portal-input {
    width: 100%;
    padding: 11px 14px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.9rem;
    color: #0f172a;
    transition: all 0.2s ease;
  }

  .portal-input:focus {
    outline: none;
    background: #ffffff;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  .btn-save-profile {
    background: linear-gradient(135deg, #0f172a, #1e293b);
    color: #ffffff;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
    transition: all 0.2s ease;
  }

  .btn-save-profile:hover {
    background: #020617;
    transform: translateY(-1px);
  }

  .save-toast-msg {
    display: inline-block;
    color: #16a34a;
    font-size: 0.85rem;
    font-weight: 600;
    margin-left: 14px;
  }
`;

export default function UserDashboard({ user, onLogout, onBackToFleet }) {
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Customer',
    email: user?.email || '',
    phone: '+33 6 82 45 91 20',
    nationalId: 'FR-94827104',
    licenseNumber: 'DL-7729-PARIS',
    licenseExpiry: '2029-08-15',
    address: '14 Avenue Foch, Paris, France',
  });

  const [licenseFile, setLicenseFile] = useState(null);
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const initial = profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U';

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLicenseFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type.includes('pdf') ? 'PDF Document' : 'Image Scan',
      });
      setLicenseUploaded(true);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3500);
  };

  return (
    <>
      <style>{userStyles}</style>
      <div className="user-portal-container">
        {/* Navigation Bar */}
        <header className="portal-nav-bar">
          <div className="portal-brand">
            <div className="portal-brand-icon">🪪</div>
            <div className="portal-brand-text">
              <h2>Customer Driver Hub</h2>
              <span>Profile, Documents & Reservations</span>
            </div>
          </div>

          <div className="portal-nav-actions">
            <button
              type="button"
              className="btn-back-fleet"
              onClick={onBackToFleet}
            >
              <span>🚗</span>
              <span>Back to Fleet Showcase</span>
            </button>

            <button
              type="button"
              className="btn-portal-signout"
              onClick={onLogout}
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Layout Grid */}
        <div className="portal-layout-grid">
          {/* Profile Sidebar */}
          <aside className="profile-sidebar-card">
            <div className="customer-avatar-large">{initial}</div>
            <h3 className="profile-name">{profileData.name}</h3>
            <p className="profile-email">{profileData.email}</p>

            <div className={`verification-badge-box ${licenseUploaded ? 'verified' : 'pending'}`}>
              <span>{licenseUploaded ? '✓' : '●'}</span>
              <span>{licenseUploaded ? 'License Verified' : 'License Pending Upload'}</span>
            </div>

            <div className="profile-quick-stats">
              <div className="quick-stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">Active Rentals</div>
              </div>
              <div className="quick-stat-item">
                <div className="stat-number" style={{ color: '#2563eb' }}>Tier 1</div>
                <div className="stat-label">Driver Status</div>
              </div>
            </div>
          </aside>

          {/* Main Content Panels */}
          <main className="portal-main-panel">
            {/* Driver's License Document Section */}
            <section className="panel-card">
              <div className="panel-header-row">
                <div className="panel-title">
                  <span>📄</span>
                  <span>Driver&apos;s License Document (PDF / Image)</span>
                </div>
                <span className="panel-tag">Mandatory for Rentals</span>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '18px', lineHeight: 1.5 }}>
                To rent vehicles without manual office check-in, please upload a clear scan or photograph of your valid driver&apos;s license (front and back or full PDF).
              </p>

              {licenseUploaded && licenseFile ? (
                <div className="uploaded-file-banner">
                  <div className="file-info-group">
                    <span className="file-icon-badge">📁</span>
                    <div>
                      <div className="file-name-text">{licenseFile.name}</div>
                      <div className="file-size-text">{licenseFile.type} • {licenseFile.size} • Uploaded &amp; Validated</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-remove-doc"
                    onClick={() => {
                      setLicenseFile(null);
                      setLicenseUploaded(false);
                    }}
                  >
                    Replace Document ✕
                  </button>
                </div>
              ) : (
                <div className="license-upload-zone">
                  <input
                    type="file"
                    accept=".pdf,image/jpeg,image/png,image/webp"
                    className="file-hidden-input"
                    onChange={handleFileUpload}
                  />
                  <div className="upload-icon-circle">🪪</div>
                  <h4 className="upload-zone-title">Upload Driver&apos;s License Scan</h4>
                  <p className="upload-zone-desc">
                    Click here to select a file or drag and drop. Supported formats: <strong>PDF, JPG, PNG</strong> (up to 10MB).
                  </p>
                </div>
              )}
            </section>

            {/* Profile & Contact Details Form */}
            <section className="panel-card">
              <div className="panel-header-row">
                <div className="panel-title">
                  <span>👤</span>
                  <span>Driver Identification Details</span>
                </div>
                <span className="panel-tag">Official Record</span>
              </div>

              <form onSubmit={handleSaveProfile}>
                <div className="portal-form-grid">
                  <div>
                    <label className="portal-label">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      className="portal-input"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="portal-label">Email Address</label>
                    <input
                      type="email"
                      required
                      disabled
                      className="portal-input"
                      value={profileData.email}
                      style={{ background: '#f1f5f9', cursor: 'not-allowed' }}
                    />
                  </div>
                </div>

                <div className="portal-form-grid">
                  <div>
                    <label className="portal-label">Mobile Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      className="portal-input"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="portal-label">National ID / Passport Number</label>
                    <input
                      type="text"
                      className="portal-input"
                      value={profileData.nationalId}
                      onChange={(e) => setProfileData({ ...profileData, nationalId: e.target.value })}
                    />
                  </div>
                </div>

                <div className="portal-form-grid">
                  <div>
                    <label className="portal-label">Driver License Number</label>
                    <input
                      type="text"
                      required
                      className="portal-input"
                      value={profileData.licenseNumber}
                      onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="portal-label">License Expiry Date</label>
                    <input
                      type="date"
                      required
                      className="portal-input"
                      value={profileData.licenseExpiry}
                      onChange={(e) => setProfileData({ ...profileData, licenseExpiry: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label className="portal-label">Residential Address</label>
                  <input
                    type="text"
                    className="portal-input"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-save-profile">
                  Save Driver Profile 💾
                </button>

                {saveSuccess && (
                  <span className="save-toast-msg">
                    ✓ Profile credentials saved successfully!
                  </span>
                )}
              </form>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
