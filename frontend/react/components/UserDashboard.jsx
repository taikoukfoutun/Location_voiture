import { useState, useEffect, useMemo, useRef } from 'react';
import { getReservations, updateUserProfile, getUserProfile } from '../db';

const IconIdBadge = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="9" cy="10" r="2" />
    <line x1="15" y1="8" x2="17" y2="8" />
    <line x1="15" y1="12" x2="17" y2="12" />
    <line x1="7" y1="16" x2="17" y2="16" />
  </svg>
);

const IconFile = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IconUser = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconCheck = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconArrowLeft = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconUpload = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const IconCamera = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconAlert = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconCar = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.6C2 10.8 2 11.4 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const IconCalendar = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const userStyles = `
  .user-portal-container {
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 36px 24px;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #090a0f;
    background: #f8fafc;
    min-height: 100vh;
  }

  .portal-nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    padding: 18px 28px;
    margin-bottom: 28px;
    box-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.05);
  }

  .portal-brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .portal-brand-icon {
    width: 42px;
    height: 42px;
    background: #090a0f;
    border: 1px solid #1e2430;
    color: #ffffff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .portal-brand-text h2 {
    font-size: 1.18rem;
    font-weight: 800;
    letter-spacing: -0.3px;
    color: #090a0f;
    margin: 0;
  }

  .portal-brand-text span {
    font-size: 0.72rem;
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }

  .portal-nav-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .btn-back-fleet {
    background: #090a0f;
    color: #ffffff;
    border: 1px solid #090a0f;
    padding: 9px 20px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(9, 10, 15, 0.12);
    transition: all 0.2s ease;
  }

  .btn-back-fleet:hover {
    background: #27272a;
    border-color: #27272a;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(9, 10, 15, 0.18);
  }

  .btn-portal-signout {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 9px 18px;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-portal-signout:hover {
    background: #fee2e2;
    color: #b91c1c;
  }

  .portal-layout-grid {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 28px;
  }

  @media (max-width: 960px) {
    .portal-layout-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Profile Sidebar */
  .profile-sidebar-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    padding: 32px 24px;
    text-align: center;
    box-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.05);
    height: fit-content;
  }

  .avatar-upload-wrapper {
    position: relative;
    width: 108px;
    height: 108px;
    margin: 0 auto 16px auto;
  }

  .customer-avatar-large {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(145deg, #090a0f 0%, #27272a 100%);
    border: 3px solid #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 2.5rem;
    font-weight: 800;
    box-shadow: 0 8px 24px rgba(9, 10, 15, 0.15);
    overflow: hidden;
    object-fit: cover;
  }

  .customer-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .avatar-camera-btn {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #090a0f;
    color: #ffffff;
    border: 2px solid #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }

  .avatar-camera-btn:hover {
    background: #27272a;
    transform: scale(1.08);
  }

  .profile-name {
    font-size: 1.35rem;
    font-weight: 800;
    color: #090a0f;
    margin-bottom: 4px;
    letter-spacing: -0.3px;
  }

  .profile-email {
    font-size: 0.86rem;
    color: #64748b;
    margin-bottom: 18px;
    word-break: break-all;
  }

  /* Completion Meter */
  .profile-meter-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 14px 16px;
    margin-bottom: 20px;
    text-align: left;
  }

  .meter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .meter-title {
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #475569;
  }

  .meter-percent {
    font-size: 0.85rem;
    font-weight: 800;
    color: #090a0f;
    font-family: 'Space Grotesk', sans-serif;
  }

  .meter-track {
    width: 100%;
    height: 6px;
    background: #e2e8f0;
    border-radius: 9999px;
    overflow: hidden;
  }

  .meter-bar {
    height: 100%;
    background: #090a0f;
    border-radius: 9999px;
    transition: width 0.4s ease;
  }

  .meter-bar.complete {
    background: #10b981;
  }

  .meter-tip {
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 8px;
    line-height: 1.4;
  }

  .profile-quick-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    border-top: 1px solid #f1f5f9;
    padding-top: 18px;
    text-align: center;
  }

  .quick-stat-item {
    background: #f8fafc;
    border-radius: 12px;
    padding: 12px 8px;
    border: 1px solid #e2e8f0;
  }

  .stat-number {
    font-size: 1.25rem;
    font-weight: 800;
    color: #090a0f;
    font-family: 'Space Grotesk', sans-serif;
  }

  .stat-label {
    font-size: 0.7rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 3px;
  }

  /* Portal Sub-tabs */
  .portal-tabs-nav {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
    background: #f1f5f9;
    padding: 5px;
    border-radius: 14px;
    border: 1px solid #e2e8f0;
    width: fit-content;
  }

  .portal-tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: #64748b;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .portal-tab-btn:hover {
    color: #090a0f;
  }

  .portal-tab-btn.active {
    background: #ffffff;
    color: #090a0f;
    box-shadow: 0 2px 10px rgba(15, 23, 42, 0.08);
  }

  .portal-tab-count {
    background: #e2e8f0;
    color: #334155;
    font-size: 0.72rem;
    padding: 2px 7px;
    border-radius: 9999px;
  }

  /* Main Panels */
  .portal-main-panel {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .panel-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    padding: 30px;
    box-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.05);
  }

  .panel-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f5f9;
  }

  .panel-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: #090a0f;
    display: flex;
    align-items: center;
    gap: 10px;
    letter-spacing: -0.3px;
  }

  .panel-tag {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    color: #475569;
    padding: 4px 12px;
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
    border-color: #090a0f;
    background: #f1f5f9;
  }

  .upload-icon-circle {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #090a0f;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 14px auto;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  }

  .upload-zone-title {
    font-size: 1.02rem;
    font-weight: 700;
    color: #090a0f;
    margin-bottom: 6px;
  }

  .upload-zone-desc {
    font-size: 0.82rem;
    color: #64748b;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.5;
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
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    border-radius: 14px;
    padding: 16px 20px;
    margin-top: 18px;
  }

  .file-info-group {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .file-name-text {
    font-size: 0.92rem;
    font-weight: 700;
    color: #065f46;
  }

  .file-size-text {
    font-size: 0.78rem;
    color: #059669;
    margin-top: 2px;
  }

  .btn-remove-doc {
    background: #ffffff;
    border: 1px solid #fecaca;
    color: #dc2626;
    font-size: 0.82rem;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-remove-doc:hover {
    background: #fee2e2;
  }

  /* Form Fields */
  .portal-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 18px;
  }

  @media (max-width: 680px) {
    .portal-form-grid {
      grid-template-columns: 1fr;
    }
  }

  .portal-label {
    display: block;
    font-size: 0.76rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #475569;
    margin-bottom: 7px;
  }

  .portal-input {
    width: 100%;
    padding: 12px 14px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    font-size: 0.9rem;
    font-family: inherit;
    color: #090a0f;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .portal-input:focus {
    outline: none;
    background: #ffffff;
    border-color: #090a0f;
    box-shadow: 0 0 0 3px rgba(9, 10, 15, 0.08);
  }

  .btn-save-profile {
    background: #090a0f;
    color: #ffffff;
    border: 1px solid #090a0f;
    padding: 12px 28px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(9, 10, 15, 0.12);
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .btn-save-profile:hover {
    background: #27272a;
    border-color: #27272a;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(9, 10, 15, 0.18);
  }

  .save-toast-msg {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #059669;
    font-size: 0.85rem;
    font-weight: 600;
    margin-left: 16px;
  }

  /* Reservations List View */
  .reservations-list-wrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .reservation-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    padding: 24px;
    box-shadow: 0 4px 18px -4px rgba(15, 23, 42, 0.05);
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .res-card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
  }

  @media (max-width: 680px) {
    .res-card-top {
      flex-direction: column;
    }
  }

  .res-car-info {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .res-car-thumb {
    width: 88px;
    height: 60px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    background: #f8fafc;
  }

  .res-car-name {
    font-size: 1.15rem;
    font-weight: 800;
    color: #090a0f;
    margin-bottom: 4px;
  }

  .res-car-meta {
    font-size: 0.82rem;
    color: #64748b;
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .res-status-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  .res-status-pill.pending {
    background: #fffbeb;
    border: 1px solid #fde68a;
    color: #b45309;
  }

  .res-status-pill.confirmed {
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #059669;
  }

  .res-status-pill.rejected {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
  }

  .res-status-pill.completed {
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    color: #475569;
  }

  .res-card-details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 14px 18px;
  }

  .res-detail-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .res-detail-label {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #64748b;
  }

  .res-detail-val {
    font-size: 0.92rem;
    font-weight: 700;
    color: #090a0f;
  }

  .res-issue-banner {
    background: #fef2f2;
    border: 1px solid #fca5a5;
    border-radius: 14px;
    padding: 16px 20px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .res-issue-title {
    font-size: 0.9rem;
    font-weight: 800;
    color: #b91c1c;
    margin-bottom: 4px;
  }

  .res-issue-msg {
    font-size: 0.85rem;
    color: #991b1b;
    line-height: 1.5;
  }

  .empty-res-box {
    text-align: center;
    padding: 48px 24px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
  }

  .empty-res-icon {
    width: 60px;
    height: 60px;
    border-radius: 18px;
    background: #f1f5f9;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px auto;
  }
`;

const compressImageFile = (file, maxWidth = 800, maxHeight = 800, quality = 0.75) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    if (!file.type || !file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => {
        // Fallback to raw dataURL if image load fails
        resolve(e.target.result);
      };
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function UserDashboard({ user, onLogout, onBackToFleet, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'reservations'

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    nationalId: user?.national_id || '',
    licenseNumber: user?.license_number || '',
    licenseExpiry: user?.license_expiry ? String(user.license_expiry).split('T')[0] : '',
    address: user?.address || '',
    avatar: user?.avatar || null,
    license_document: user?.license_document || null,
  });

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [licenseFile, setLicenseFile] = useState(
    user?.license_document || user?.license_uploaded
      ? { name: 'Verified_Driver_License_Doc.pdf', size: '1.2 MB', type: 'Validated Document' }
      : null
  );
  const [licenseUploaded, setLicenseUploaded] = useState(Boolean(user?.license_uploaded || user?.license_document));
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);

  // Reservations State
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(false);

  const avatarInputRef = useRef(null);

  // Sync fresh profile from backend on mount
  useEffect(() => {
    if (user?.id) {
      getUserProfile(user.id).then((fresh) => {
        if (fresh) {
          setProfileData({
            name: fresh.name || user?.name || '',
            email: fresh.email || user?.email || '',
            phone: fresh.phone || '',
            nationalId: fresh.national_id || '',
            licenseNumber: fresh.license_number || '',
            licenseExpiry: fresh.license_expiry ? String(fresh.license_expiry).split('T')[0] : '',
            address: fresh.address || '',
            avatar: fresh.avatar || null,
            license_document: fresh.license_document || null,
          });
          if (fresh.avatar) setAvatarPreview(fresh.avatar);
          if (fresh.license_document || fresh.license_uploaded) {
            setLicenseUploaded(true);
            setLicenseFile({
              name: 'Driver_License_Document',
              size: 'Verified Scan',
              type: 'Attached Document'
            });
          }
        }
      }).catch((e) => console.warn('Sync profile error:', e));
    }
  }, [user?.id]);

  // Fetch reservations on mount and tab switch
  const fetchMyReservations = async () => {
    if (!user?.id) return;
    setLoadingReservations(true);
    try {
      const res = await getReservations({ user_id: user.id });
      setReservations(res.data || []);
    } catch {
      // Handled
    } finally {
      setLoadingReservations(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchMyReservations();
    }
  }, [user?.id]);

  // Handle Avatar Image Upload with automatic downscaling
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 400, 400, 0.85);
        setAvatarPreview(compressed);
        setProfileData((prev) => ({ ...prev, avatar: compressed }));
      } catch (err) {
        console.error('Avatar load error:', err);
      }
    }
  };

  // Handle Driver License Document Upload with auto-optimization
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1000, 1000, 0.75);
        setLicenseFile({
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          type: file.type.includes('pdf') ? 'PDF Document' : 'Image Scan',
          dataUrl: compressed,
        });
        setLicenseUploaded(true);
        setProfileData((prev) => ({ ...prev, license_document: compressed }));
      } catch (err) {
        console.error('File load error:', err);
      }
    }
  };

  // Calculate Profile Completeness accurately
  const profileCompletion = useMemo(() => {
    let score = 0;
    if (avatarPreview || profileData.avatar) score += 20;
    if (profileData.name && profileData.name.trim().length > 2) score += 20;
    if (profileData.phone && profileData.phone.trim().length > 5) score += 20;
    if (profileData.licenseNumber && profileData.licenseNumber.trim().length > 2) score += 20;
    if (licenseUploaded || profileData.license_document) score += 20;
    return score;
  }, [avatarPreview, profileData.avatar, profileData.name, profileData.phone, profileData.licenseNumber, licenseUploaded, profileData.license_document]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      if (!user?.id) {
        throw new Error('User session not found. Please log in.');
      }

      const payload = {
        name: profileData.name,
        phone: profileData.phone,
        national_id: profileData.nationalId,
        license_number: profileData.licenseNumber,
        license_expiry: profileData.licenseExpiry,
        address: profileData.address,
        avatar: profileData.avatar,
        license_document: profileData.license_document,
        license_uploaded: Boolean(licenseUploaded || profileData.license_document),
      };

      const result = await updateUserProfile(user.id, payload);
      const updatedUser = result.user || { ...user, ...payload };

      // Update parent component state and local storage immediately
      if (onUpdateUser) {
        onUpdateUser(updatedUser);
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error('Save profile error:', err);
      setSaveError(err.message || 'Failed to save profile. Please check your network and try again.');
    } finally {
      setSaving(false);
    }
  };

  const initial = profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U';

  const pendingCount = reservations.filter((r) => r.status === 'pending').length;
  const activeCount = reservations.filter((r) => r.status === 'confirmed').length;

  return (
    <>
      <style>{userStyles}</style>
      <div className="user-portal-container">
        {/* Navigation Bar */}
        <header className="portal-nav-bar">
          <div className="portal-brand">
            <div className="portal-brand-icon">
              <IconIdBadge size={22} />
            </div>
            <div className="portal-brand-text">
              <h2>Customer Driver Hub</h2>
              <span>Profile, Documents & Fleet Reservations</span>
            </div>
          </div>

          <div className="portal-nav-actions">
            <button
              type="button"
              className="btn-back-fleet"
              onClick={onBackToFleet}
            >
              <IconArrowLeft size={15} />
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
            <div className="avatar-upload-wrapper">
              {avatarPreview ? (
                <img src={avatarPreview} alt={profileData.name} className="customer-avatar-large" />
              ) : (
                <div className="customer-avatar-large">{initial}</div>
              )}
              <button
                type="button"
                className="avatar-camera-btn"
                title="Upload Profile Picture"
                onClick={() => avatarInputRef.current?.click()}
              >
                <IconCamera size={16} />
              </button>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
            </div>

            <h3 className="profile-name">{profileData.name}</h3>
            <p className="profile-email">{profileData.email}</p>

            {/* Profile Completion Meter */}
            <div className="profile-meter-box">
              <div className="meter-header">
                <span className="meter-title">Driver Verification</span>
                <span className="meter-percent">{profileCompletion}%</span>
              </div>
              <div className="meter-track">
                <div
                  className={`meter-bar ${profileCompletion === 100 ? 'complete' : ''}`}
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              <p className="meter-tip">
                {profileCompletion === 100
                  ? '✓ Verified & ready to reserve any luxury vehicle instantly.'
                  : 'Add your profile picture, phone & driver license scan to unlock instant rentals.'}
              </p>
            </div>

            <div className="profile-quick-stats">
              <div className="quick-stat-item">
                <div className="stat-number">{reservations.length}</div>
                <div className="stat-label">Total Bookings</div>
              </div>
              <div className="quick-stat-item">
                <div className="stat-number" style={{ color: activeCount > 0 ? '#10b981' : '#090a0f' }}>
                  {activeCount}
                </div>
                <div className="stat-label">Active Rentals</div>
              </div>
            </div>
          </aside>

          {/* Main Content Panels */}
          <main className="portal-main-panel">
            {/* Tab Navigation */}
            <nav className="portal-tabs-nav">
              <button
                type="button"
                className={`portal-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <IconUser size={16} />
                <span>Driver Profile & Credentials</span>
              </button>

              <button
                type="button"
                className={`portal-tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('reservations');
                  fetchMyReservations();
                }}
              >
                <IconCar size={16} />
                <span>My Reservations</span>
                {reservations.length > 0 && (
                  <span className="portal-tab-count">{reservations.length}</span>
                )}
              </button>
            </nav>

            {/* VIEW 1: DRIVER PROFILE & CREDENTIALS */}
            {activeTab === 'profile' && (
              <>
                {/* Driver's License Document Section */}
                <section className="panel-card">
                  <div className="panel-header-row">
                    <div className="panel-title">
                      <IconFile size={20} color="#090a0f" />
                      <span>Driver&apos;s License Document (Mandatory for Rentals)</span>
                    </div>
                    <span className="panel-tag">
                      {licenseUploaded ? 'Document Attached' : 'Action Required'}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '20px', lineHeight: 1.6 }}>
                    To reserve vehicles without manual office delays, please upload a clear scan or photograph of your valid driver&apos;s license (front and back or PDF). The agency concierge will review this before confirming your booking.
                  </p>

                  {licenseUploaded && licenseFile ? (
                    <div className="uploaded-file-banner">
                      <div className="file-info-group">
                        <IconFile size={24} color="#059669" />
                        <div>
                          <div className="file-name-text">{licenseFile.name}</div>
                          <div className="file-size-text">
                            {licenseFile.type} • {licenseFile.size} • Attached &amp; Ready for Review
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-remove-doc"
                        onClick={() => {
                          setLicenseFile(null);
                          setLicenseUploaded(false);
                          setProfileData((prev) => ({ ...prev, license_document: null }));
                        }}
                      >
                        <span>Replace Document</span>
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
                      <div className="upload-icon-circle">
                        <IconUpload size={24} />
                      </div>
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
                      <IconUser size={20} color="#090a0f" />
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
                          placeholder="e.g. Jean Dupont"
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
                          style={{ background: '#f8fafc', color: '#94a3b8', borderColor: '#e2e8f0', cursor: 'not-allowed' }}
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
                          placeholder="+212 6 00 00 00 00"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="portal-label">National ID / Passport Number</label>
                        <input
                          type="text"
                          className="portal-input"
                          placeholder="e.g. MR-94827104"
                          value={profileData.nationalId}
                          onChange={(e) => setProfileData({ ...profileData, nationalId: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="portal-form-grid">
                      <div>
                        <label className="portal-label">Driver License Reference</label>
                        <input
                          type="text"
                          required
                          className="portal-input"
                          placeholder="e.g. DL-7729-ESSAOUIRA"
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

                    <div style={{ marginBottom: '22px' }}>
                      <label className="portal-label">Residential Address</label>
                      <input
                        type="text"
                        className="portal-input"
                        placeholder="e.g. 14 Avenue Foch, ESSAOUIRA, MAROC"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button type="submit" className="btn-save-profile" disabled={saving}>
                        <IconCheck size={16} />
                        <span>{saving ? 'Saving...' : 'Save Driver Profile'}</span>
                      </button>

                      {saveSuccess && (
                        <span className="save-toast-msg" style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', padding: '8px 16px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', marginLeft: '14px' }}>
                          <IconCheck size={16} color="#15803d" />
                          <span>Profile &amp; documents verified and saved!</span>
                        </span>
                      )}

                      {saveError && (
                        <span className="save-toast-msg" style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', padding: '8px 16px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '8px', marginLeft: '14px' }}>
                          <IconClose size={16} color="#b91c1c" />
                          <span>{saveError}</span>
                        </span>
                      )}
                    </div>
                  </form>
                </section>
              </>
            )}

            {/* VIEW 2: MY RESERVATIONS */}
            {activeTab === 'reservations' && (
              <section className="panel-card">
                <div className="panel-header-row">
                  <div className="panel-title">
                    <IconCar size={20} color="#090a0f" />
                    <span>My Vehicle Reservations & Rental Status</span>
                  </div>
                  <span className="panel-tag">Live Updates</span>
                </div>

                {loadingReservations ? (
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading your bookings...</p>
                ) : reservations.length === 0 ? (
                  <div className="empty-res-box">
                    <div className="empty-res-icon">
                      <IconCar size={28} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#090a0f', marginBottom: '8px' }}>
                      No Reservations Yet
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: 1.6 }}>
                      You haven&apos;t booked any vehicles yet. Explore our prestige fleet and reserve your preferred model.
                    </p>
                    <button
                      type="button"
                      className="btn-back-fleet"
                      onClick={onBackToFleet}
                    >
                      Browse Available Fleet
                    </button>
                  </div>
                ) : (
                  <div className="reservations-list-wrap">
                    {reservations.map((res) => {
                      const car = res.car || {};
                      const isPending = res.status === 'pending';
                      const isConfirmed = res.status === 'confirmed';
                      const isRejected = res.status === 'rejected';
                      const isCompleted = res.status === 'completed';

                      return (
                        <div key={res.id} className="reservation-card">
                          <div className="res-card-top">
                            <div className="res-car-info">
                              {car.image && (
                                <img src={car.image} alt={car.model} className="res-car-thumb" />
                              )}
                              <div>
                                <h4 className="res-car-name">
                                  {car.brand} {car.model}
                                </h4>
                                <div className="res-car-meta">
                                  <span>Plate: {car.license_plate || 'VIP-FLEET'}</span>
                                  <span>•</span>
                                  <span>${Number(res.total_price).toFixed(2)} Total</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <span className={`res-status-pill ${res.status}`}>
                                {isPending && '🟡 Pending Concierge Review'}
                                {isConfirmed && '🟢 Confirmed & Reserved'}
                                {isRejected && '🔴 Action Required'}
                                {isCompleted && '⚪ Rental Completed'}
                              </span>
                            </div>
                          </div>

                          {/* Issue Alert Banner if Gestionnaire flagged something */}
                          {isRejected && res.admin_message && (
                            <div className="res-issue-banner">
                              <IconAlert size={20} color="#dc2626" />
                              <div style={{ flex: 1 }}>
                                <div className="res-issue-title">Notice from Agency Concierge:</div>
                                <div className="res-issue-msg">{res.admin_message}</div>
                                <button
                                  type="button"
                                  style={{
                                    marginTop: '10px',
                                    background: '#090a0f',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '7px 16px',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => setActiveTab('profile')}
                                >
                                  Update Profile & Documents
                                </button>
                              </div>
                            </div>
                          )}

                          {isConfirmed && (
                            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '12px 18px', fontSize: '0.86rem', color: '#065f46', fontWeight: 600 }}>
                              ✓ Your reservation is approved. Your vehicle is locked and scheduled for handover at {res.pickup_location || 'Main Showroom'}.
                            </div>
                          )}

                          <div className="res-card-details-grid">
                            <div className="res-detail-item">
                              <span className="res-detail-label">Start Date</span>
                              <span className="res-detail-val">{String(res.start_date).split('T')[0]}</span>
                            </div>
                            <div className="res-detail-item">
                              <span className="res-detail-label">End Date</span>
                              <span className="res-detail-val">{String(res.end_date).split('T')[0]}</span>
                            </div>
                            <div className="res-detail-item">
                              <span className="res-detail-label">Handover Location</span>
                              <span className="res-detail-val">{res.pickup_location || 'Showroom Agency'}</span>
                            </div>
                            <div className="res-detail-item">
                              <span className="res-detail-label">Driver Assigned</span>
                              <span className="res-detail-val">{res.driver_name || profileData.name}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
