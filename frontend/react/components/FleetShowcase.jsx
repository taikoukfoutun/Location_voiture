import { useState, useEffect, useMemo } from 'react';
import { getCars, createReservation, getStoredUser, submitContactMessage } from '../db';
import defaultCarBg from '../assets/luxury_coastal_car.jpg';
import supraHeroBg from '../assets/toyota_supra_hero.jpg';



const IconAlert = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconSearch = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M16 2L3 8V16C3 23.5 8.5 30 16 32C23.5 30 29 23.5 29 16V8L16 2Z" fill="url(#metallicLogoGrad)" stroke="#090a0f" strokeWidth="1.2" />
    <path d="M16 6L7 11V16C7 21.5 10.8 26.3 16 27.8C21.2 26.3 25 21.5 25 16V11L16 6Z" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="#090a0f" />
    <path d="M11 16.5L14.5 20L21 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="metallicLogoGrad" x1="3" y1="2" x2="29" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e2430" />
        <stop offset="0.5" stopColor="#475569" />
        <stop offset="1" stopColor="#090a0f" />
      </linearGradient>
    </defs>
  </svg>
);

const IconGear = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconFuel = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 22V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17" />
    <path d="M15 9h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3" />
    <path d="M6 8h5" />
    <path d="M6 12h5" />
    <line x1="2" y1="22" x2="16" y2="22" />
  </svg>
);

const IconSpeed = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.17.9-.17.9-.6v-1.7" />
    <path d="M12 2a10 10 0 0 1 10 10c0 4.42-2.87 8.17-6.84 9.5-.5.17-.9-.17-.9-.6v-1.7" />
    <line x1="12" y1="12" x2="16" y2="8" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconPlate = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="3" />
    <circle cx="6" cy="12" r="1.5" />
    <circle cx="18" cy="12" r="1.5" />
  </svg>
);

const IconShield = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconCheck = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconArrowRight = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconClose = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconKey = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5L10 10l2 2-6 6H2v-4l6-6-1.5-1.5L9 4l3.5 3.5 1.5-1.5 2-2z" />
    <circle cx="7.5" cy="16.5" r="1.5" />
  </svg>
);

const IconPin = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconPhone = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconClock = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconSparkle = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

const IconIdBadge = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <circle cx="9" cy="10" r="2" />
    <line x1="15" y1="8" x2="17" y2="8" />
    <line x1="15" y1="12" x2="17" y2="12" />
    <line x1="7" y1="16" x2="17" y2="16" />
  </svg>
);

const IconSliders = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14" />
    <line x1="4" y1="10" x2="4" y2="3" />
    <line x1="12" y1="21" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="3" />
    <line x1="20" y1="21" x2="20" y2="16" />
    <line x1="20" y1="12" x2="20" y2="3" />
    <line x1="1" y1="14" x2="7" y2="14" />
    <line x1="9" y1="8" x2="15" y2="8" />
    <line x1="17" y1="16" x2="23" y2="16" />
  </svg>
);

/* =========================================================
   LUXURY LIGHT MODE CSS ARCHITECTURE
   Alabaster, crisp white, brushed platinum grey, deep black
   ========================================================= */

const showcaseStyles = `
  :root {
    --bg-base: #f8fafc;
    --bg-surface: #ffffff;
    --bg-surface-elevated: #f1f5f9;
    --bg-card: #ffffff;
    --bg-card-hover: #ffffff;
    --bg-glass: rgba(255, 255, 255, 0.94);

    --border-subtle: #e2e8f0;
    --border-medium: #cbd5e1;
    --border-hover: #94a3b8;

    --text-primary: #090a0f;
    --text-secondary: #334155;
    --text-muted: #64748b;
    --text-dim: #94a3b8;

    --card-shadow: 0 10px 30px -4px rgba(15, 23, 42, 0.05), 0 4px 12px -2px rgba(15, 23, 42, 0.03);
    --card-shadow-hover: 0 20px 40px -8px rgba(15, 23, 42, 0.12), 0 6px 16px -4px rgba(15, 23, 42, 0.04);
  }

  .showcase-wrapper {
    min-height: 100vh;
    background: var(--bg-base);
    color: var(--text-primary);
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* ================= TOP NAVIGATION ================= */
  .public-navbar {
    position: sticky;
    top: 0;
    z-index: 60;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-subtle);
    transition: all 0.25s ease;
  }

  .nav-inner {
    max-width: 1360px;
    margin: 0 auto;
    padding: 16px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .brand-logo-area {
    display: flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    text-decoration: none;
    user-select: none;
  }

  .brand-logo-icon {
    width: 44px;
    height: 44px;
    background: #090a0f;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
  }

  .brand-titles {
    display: flex;
    flex-direction: column;
  }

  .brand-name {
    font-size: 1.18rem;
    font-weight: 800;
    letter-spacing: -0.4px;
    color: #090a0f;
    line-height: 1.15;
  }

  .brand-accent {
    color: #475569;
    font-weight: 800;
  }

  .brand-tagline {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-top: 2px;
  }

  .nav-center-links {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .nav-link-btn {
    background: transparent;
    border: 1px solid transparent;
    padding: 8px 18px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .nav-link-btn:hover {
    color: #090a0f;
    background: #f1f5f9;
  }

  .nav-link-btn.active {
    color: #090a0f;
    background: #f1f5f9;
    border-color: var(--border-subtle);
    font-weight: 700;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .btn-ghost-signin {
    background: #ffffff;
    border: 1px solid var(--border-medium);
    padding: 9px 20px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 600;
    color: #090a0f;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-ghost-signin:hover {
    background: #f8fafc;
    border-color: #94a3b8;
  }

  .btn-primary-register {
    background: #090a0f;
    border: 1px solid #090a0f;
    padding: 9px 22px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.18);
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .btn-primary-register:hover {
    background: #1e2430;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.25);
  }

  .user-badge-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #ffffff;
    border: 1px solid var(--border-subtle);
    padding: 5px 14px 5px 6px;
    border-radius: 30px;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  }

  .user-avatar-mini {
    width: 32px;
    height: 32px;
    background: #090a0f;
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 700;
  }

  .user-name-mini {
    font-size: 0.86rem;
    font-weight: 600;
    color: #090a0f;
  }

  .btn-nav-portal {
    background: #f1f5f9;
    border: 1px solid var(--border-subtle);
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 0.82rem;
    font-weight: 600;
    color: #090a0f;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .btn-nav-portal:hover {
    background: #e2e8f0;
  }

  .btn-nav-signout {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 8px 14px;
    border-radius: 10px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-nav-signout:hover {
    background: #fee2e2;
  }

  /* ---- Nav chip: clickable version ---- */
  .user-badge-pill--clickable {
    cursor: pointer;
    background: #ffffff;
    border: 1px solid var(--border-subtle);
    padding: 5px 14px 5px 6px;
    border-radius: 30px;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
    display: flex;
    align-items: center;
    gap: 10px;
    transition: box-shadow 0.18s ease, border-color 0.18s ease;
  }
  .user-badge-pill--clickable:hover {
    border-color: #94a3b8;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.10);
  }

  /* Avatar image in nav chip */
  .nav-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }

  /* ================= PROFILE SIDEBAR ================= */
  .profile-sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(9, 10, 15, 0.42);
    z-index: 200;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.28s ease;
  }
  .profile-sidebar-overlay.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .profile-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 360px;
    max-width: 92vw;
    height: 100%;
    background: #ffffff;
    z-index: 201;
    display: flex;
    flex-direction: column;
    box-shadow: -6px 0 40px rgba(9, 10, 15, 0.14);
    transform: translateX(100%);
    transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
  }
  .profile-sidebar.open {
    transform: translateX(0);
  }

  .profile-sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 24px 18px 24px;
    border-bottom: 1px solid var(--border-subtle);
  }
  .profile-sidebar-title {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #64748b;
  }
  .profile-sidebar-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #64748b;
    padding: 4px;
    display: flex;
    align-items: center;
    border-radius: 6px;
    transition: color 0.15s ease, background 0.15s ease;
  }
  .profile-sidebar-close:hover {
    color: #090a0f;
    background: #f1f5f9;
  }

  .profile-sidebar-identity {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 28px 24px 22px 24px;
    border-bottom: 1px solid var(--border-subtle);
  }
  .profile-avatar-large {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: #090a0f;
    flex-shrink: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .profile-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .profile-avatar-initial {
    font-size: 1.6rem;
    font-weight: 700;
    color: #ffffff;
    line-height: 1;
  }
  .profile-identity-text {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }
  .profile-full-name {
    font-size: 1.05rem;
    font-weight: 700;
    color: #090a0f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .profile-identity-email {
    font-size: 0.82rem;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .profile-identity-phone {
    font-size: 0.82rem;
    color: #94a3b8;
  }

  .profile-sidebar-details {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-bottom: 1px solid var(--border-subtle);
  }
  .profile-detail-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .profile-detail-label {
    font-size: 0.74rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #94a3b8;
    min-width: 72px;
    flex-shrink: 0;
  }
  .profile-detail-value {
    font-size: 0.84rem;
    color: #334155;
    font-weight: 500;
  }
  .profile-detail-role {
    display: inline-block;
    background: #f1f5f9;
    border: 1px solid var(--border-subtle);
    padding: 2px 10px;
    border-radius: 20px;
    font-size: 0.76rem;
    font-weight: 600;
    color: #475569;
  }

  .profile-sidebar-btn-reservations {
    margin: 24px 24px 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 14px 20px;
    background: #090a0f;
    color: #ffffff;
    border: none;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.18s ease, transform 0.14s ease;
    letter-spacing: 0.01em;
  }
  .profile-sidebar-btn-reservations:hover {
    background: #1e2430;
    transform: translateY(-1px);
  }

  .profile-sidebar-signout {
    margin: 14px 24px 32px 24px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.84rem;
    font-weight: 600;
    color: #dc2626;
    text-align: left;
    padding: 8px 0;
    transition: color 0.15s ease;
    letter-spacing: 0.01em;
  }
  .profile-sidebar-signout:hover {
    color: #b91c1c;
  }

  /* ================= HERO SECTION (LIGHT LUXURY) ================= */
  .hero-section {
    position: relative;
    background: transparent;
    color: #090a0f;
    padding: 0 0 48px 0;
    overflow: hidden;
  }

  .hero-stage-banner {
    position: relative;
    background-image: url('${supraHeroBg}');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    min-height: 480px;
    padding: 130px 24px 150px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 1px solid var(--border-subtle);
  }

  .hero-stage-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(15, 7, 30, 0.42) 0%,
      rgba(15, 7, 30, 0.18) 45%,
      rgba(15, 7, 30, 0.52) 100%
    );
    pointer-events: none;
    z-index: 1;
  }

  .hero-inner {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .hero-title {
    font-size: 3.6rem;
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -1.5px;
    margin-bottom: 0;
    max-width: 940px;
    margin-left: auto;
    margin-right: auto;
    color: #ffffff;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.65), 0 1px 4px rgba(0, 0, 0, 0.85);
  }

  .hero-title .title-gradient {
    background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-subtitle {
    font-size: 1.12rem;
    color: rgba(255, 255, 255, 0.94);
    max-width: 720px;
    margin: 0 auto;
    line-height: 1.65;
    font-weight: 500;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.7);
  }

  .hero-perks-strip {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 0;
  }

  .perk-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.84rem;
    font-weight: 600;
    color: #1e293b;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(226, 232, 240, 0.9);
    padding: 8px 18px;
    border-radius: 20px;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
  }

  .perk-icon {
    color: #090a0f;
    display: flex;
    align-items: center;
  }

  /* Floating Filter Card */
  .search-filter-wrapper {
    max-width: 1120px;
    margin: -36px auto 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 5;
  }

  .search-filter-card {
    background: #ffffff;
    border: 1px solid var(--border-medium);
    border-radius: 20px;
    padding: 26px 30px;
    box-shadow: 0 20px 45px -10px rgba(15, 23, 42, 0.08);
    text-align: left;
  }

  .search-card-grid {
    display: grid;
    grid-template-columns: 2fr 1.2fr 1fr 1fr;
    gap: 16px;
    align-items: end;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .filter-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-muted);
  }

  .filter-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .filter-input-icon {
    position: absolute;
    left: 14px;
    color: var(--text-muted);
    pointer-events: none;
    display: flex;
    align-items: center;
  }

  .filter-input {
    width: 100%;
    padding: 13px 14px 13px 40px;
    background: #f8fafc;
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    font-size: 0.9rem;
    font-family: inherit;
    color: #090a0f;
    transition: all 0.2s ease;
  }

  .filter-input::placeholder {
    color: var(--text-dim);
  }

  .filter-input:focus {
    outline: none;
    border-color: #090a0f;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(9, 10, 15, 0.06);
  }

  .filter-select {
    width: 100%;
    padding: 13px 14px;
    background: #f8fafc;
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    font-size: 0.9rem;
    font-family: inherit;
    color: #090a0f;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-select:focus {
    outline: none;
    border-color: #090a0f;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(9, 10, 15, 0.06);
  }

  .category-pill-strip {
    display: flex;
    align-items: center;
    gap: 10px;
    overflow-x: auto;
    padding: 20px 0 4px 0;
    border-top: 1px solid var(--border-subtle);
    margin-top: 20px;
  }

  .cat-pill {
    background: #f1f5f9;
    border: 1px solid var(--border-subtle);
    padding: 8px 18px;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-secondary);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .cat-pill:hover {
    background: #e2e8f0;
    color: #090a0f;
  }

  .cat-pill.active {
    background: #090a0f;
    color: #ffffff;
    border-color: #090a0f;
    font-weight: 700;
  }

  /* ================= FLEET SHOWCASE SECTION (LIGHT) ================= */
  .fleet-section {
    max-width: 1360px;
    margin: 0 auto;
    padding: 68px 28px;
  }

  .fleet-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 36px;
    flex-wrap: wrap;
    gap: 18px;
  }

  .fleet-heading-title {
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.6px;
    color: #090a0f;
    margin-bottom: 6px;
  }

  .fleet-heading-desc {
    font-size: 0.95rem;
    color: var(--text-muted);
  }

  .fleet-sorting-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .fleet-count-pill {
    background: #ffffff;
    border: 1px solid var(--border-medium);
    padding: 7px 16px;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-secondary);
    letter-spacing: 0.3px;
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.03);
  }

  .fleet-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 28px;
  }

  /* Vehicle Card */
  .car-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid var(--border-subtle);
    box-shadow: var(--card-shadow);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
  }

  .car-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
    border-color: var(--border-medium);
  }

  .car-image-stage {
    position: relative;
    width: 100%;
    height: 230px;
    background: #0f172a;
    overflow: hidden;
  }

  .car-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.5s ease;
  }

  .car-card:hover .car-img {
    transform: scale(1.05);
  }

  .car-status-pill {
    position: absolute;
    top: 14px;
    left: 14px;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .car-status-pill.available {
    background: rgba(16, 185, 129, 0.92);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }

  .car-status-pill.rented {
    background: rgba(234, 179, 8, 0.92);
    color: #ffffff;
  }

  .car-status-pill.maintenance {
    background: rgba(100, 116, 139, 0.92);
    color: #ffffff;
  }

  .car-category-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    background: rgba(9, 10, 15, 0.85);
    backdrop-filter: blur(8px);
    color: #ffffff;
    padding: 5px 12px;
    border-radius: 8px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .car-price-overlay {
    position: absolute;
    bottom: 12px;
    right: 14px;
    background: rgba(9, 10, 15, 0.88);
    backdrop-filter: blur(10px);
    padding: 6px 14px;
    border-radius: 10px;
    color: #ffffff;
    display: flex;
    align-items: baseline;
    gap: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .car-price-value {
    font-size: 1.25rem;
    font-weight: 800;
    color: #ffffff;
    font-family: 'Space Grotesk', sans-serif;
  }

  .car-price-unit {
    font-size: 0.76rem;
    color: #cbd5e1;
  }

  .car-content {
    padding: 22px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
  }

  .car-header-row {
    margin-bottom: 12px;
  }

  .car-brand-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: #090a0f;
    letter-spacing: -0.3px;
    line-height: 1.25;
    margin-bottom: 6px;
  }

  .car-meta-subtitle {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    color: var(--text-muted);
    font-weight: 500;
  }

  .meta-dot {
    width: 4px;
    height: 4px;
    background: var(--border-medium);
    border-radius: 50%;
  }

  .car-specs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 14px 0 22px 0;
    background: #f8fafc;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid var(--border-subtle);
  }

  .spec-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .spec-icon-wrap {
    color: var(--text-muted);
    display: flex;
    align-items: center;
  }

  .card-actions-row {
    display: grid;
    grid-template-columns: 1fr 1.35fr;
    gap: 10px;
  }

  .btn-view-specs {
    background: #ffffff;
    border: 1px solid var(--border-medium);
    padding: 11px;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #090a0f;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
  }

  .btn-view-specs:hover {
    background: #f1f5f9;
    border-color: #94a3b8;
  }

  .btn-rent-now {
    background: #090a0f;
    border: 1px solid #090a0f;
    padding: 11px 16px;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.16);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn-rent-now:hover {
    transform: translateY(-1px);
    background: #1e2430;
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.24);
  }

  .btn-rent-now:disabled {
    background: #e2e8f0;
    border-color: #e2e8f0;
    color: var(--text-dim);
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
  }

  /* Empty State */
  .empty-fleet-state {
    text-align: center;
    padding: 72px 24px;
    background: #ffffff;
    border-radius: 20px;
    border: 1px dashed var(--border-medium);
  }

  .empty-icon-wrap {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #f1f5f9;
    border: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 18px auto;
    color: var(--text-muted);
  }

  .empty-title {
    font-size: 1.35rem;
    font-weight: 700;
    color: #090a0f;
    margin-bottom: 8px;
  }

  .empty-desc {
    font-size: 0.92rem;
    color: var(--text-muted);
    max-width: 440px;
    margin: 0 auto 24px auto;
  }

  .btn-reset-filters {
    background: #090a0f;
    color: #ffffff;
    border: none;
    padding: 10px 24px;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-reset-filters:hover {
    background: #1e2430;
    transform: translateY(-1px);
  }

  /* ================= HOW IT WORKS SECTION (LIGHT) ================= */
  .how-it-works-section {
    background: #ffffff;
    border-top: 1px solid var(--border-subtle);
    border-bottom: 1px solid var(--border-subtle);
    padding: 84px 28px;
  }

  .section-container {
    max-width: 1280px;
    margin: 0 auto;
  }

  .section-tag-center {
    text-align: center;
    margin-bottom: 14px;
  }

  .section-pill {
    background: #f1f5f9;
    border: 1px solid var(--border-medium);
    color: var(--text-secondary);
    padding: 5px 16px;
    border-radius: 20px;
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }

  .section-title-center {
    font-size: 2.4rem;
    font-weight: 800;
    letter-spacing: -0.8px;
    text-align: center;
    color: #090a0f;
    margin-bottom: 14px;
  }

  .section-desc-center {
    font-size: 1rem;
    color: var(--text-muted);
    text-align: center;
    max-width: 620px;
    margin: 0 auto 56px auto;
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .step-box {
    background: #f8fafc;
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 36px 30px;
    position: relative;
    transition: all 0.28s ease;
  }

  .step-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 36px -6px rgba(15, 23, 42, 0.08);
    border-color: var(--border-medium);
    background: #ffffff;
  }

  .step-number {
    position: absolute;
    top: 24px;
    right: 28px;
    font-size: 2.2rem;
    font-weight: 900;
    color: #cbd5e1;
    font-family: 'Space Grotesk', sans-serif;
    line-height: 1;
  }

  .step-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: #090a0f;
    border: 1px solid #1e2430;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 22px;
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.15);
  }

  .step-photo {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 24px;
    display: block;
    border: 1px solid var(--border-subtle);
  }

  .step-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #090a0f;
    margin-bottom: 10px;
  }

  .step-text {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
  }

  /* ================= CONTACT SECTION (LIGHT) ================= */
  .contact-section {
    max-width: 1280px;
    margin: 0 auto;
    padding: 84px 28px;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.35fr;
    gap: 48px;
    background: #ffffff;
    border-radius: 24px;
    border: 1px solid var(--border-subtle);
    padding: 48px;
    box-shadow: var(--card-shadow);
  }

  .contact-info-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .contact-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f1f5f9;
    border: 1px solid var(--border-medium);
    color: var(--text-secondary);
    padding: 5px 14px;
    border-radius: 20px;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
  }

  .contact-col-title {
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: -0.6px;
    color: #090a0f;
    margin-bottom: 12px;
  }

  .contact-col-desc {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.65;
    margin-bottom: 34px;
  }

  .contact-detail-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 32px;
  }

  .contact-detail-row {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .detail-icon-circle {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: #f1f5f9;
    border: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #090a0f;
    flex-shrink: 0;
  }

  .detail-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--text-muted);
    margin-bottom: 2px;
  }

  .detail-value {
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  /* Form Column */
  .contact-form-col {
    background: #f8fafc;
    border-radius: 20px;
    padding: 34px;
    border: 1px solid var(--border-subtle);
  }

  .form-title-h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #090a0f;
    margin-bottom: 6px;
  }

  .form-desc-p {
    font-size: 0.88rem;
    color: var(--text-muted);
    margin-bottom: 24px;
  }

  .contact-input-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 16px;
  }

  .contact-input-full {
    margin-bottom: 16px;
  }

  .contact-label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 7px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .contact-field {
    width: 100%;
    padding: 12px 14px;
    background: #ffffff;
    border: 1px solid var(--border-medium);
    border-radius: 10px;
    font-size: 0.9rem;
    font-family: inherit;
    color: #090a0f;
    transition: all 0.2s ease;
  }

  .contact-field::placeholder {
    color: var(--text-dim);
  }

  .contact-field:focus {
    outline: none;
    border-color: #090a0f;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(9, 10, 15, 0.06);
  }

  .btn-submit-contact {
    width: 100%;
    background: #090a0f;
    color: #ffffff;
    border: none;
    padding: 13px;
    border-radius: 10px;
    font-size: 0.92rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.18);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn-submit-contact:hover {
    background: #1e2430;
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(15, 23, 42, 0.25);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ================= FOOTER (LIGHT LUXURY) ================= */
  .public-footer {
    background: #ffffff;
    border-top: 1px solid var(--border-subtle);
    color: #090a0f;
    padding: 64px 28px 36px 28px;
  }

  .footer-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 52px;
  }

  .footer-brand-p {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.65;
    margin-top: 16px;
    max-width: 340px;
  }

  .footer-col-title {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #090a0f;
    margin-bottom: 18px;
  }

  .footer-links-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-link-item {
    font-size: 0.88rem;
    color: var(--text-muted);
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .footer-link-item:hover {
    color: #090a0f;
  }

  .footer-bottom-row {
    max-width: 1280px;
    margin: 0 auto;
    padding-top: 26px;
    border-top: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.82rem;
    color: var(--text-dim);
    flex-wrap: wrap;
    gap: 12px;
  }

  /* ================= MODALS & POPUPS (LIGHT LUXURY) ================= */
  .modal-backdrop-blur {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }

  .modal-window {
    background: #ffffff;
    border-radius: 24px;
    max-width: 680px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.25);
    border: 1px solid var(--border-medium);
    position: relative;
    color: #090a0f;
  }

  .modal-window-lg {
    max-width: 820px;
  }

  .modal-close-x {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: #f1f5f9;
    border: 1px solid var(--border-subtle);
    color: #090a0f;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 10;
  }

  .modal-close-x:hover {
    background: #e2e8f0;
  }

  /* Auth Gate Modal */
  .auth-gate-body {
    padding: 44px 36px;
    text-align: center;
  }

  .gate-icon-halo {
    width: 72px;
    height: 72px;
    border-radius: 22px;
    background: #f1f5f9;
    border: 1px solid var(--border-medium);
    color: #090a0f;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 22px auto;
  }

  .gate-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #090a0f;
    margin-bottom: 10px;
  }

  .gate-car-preview-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #f8fafc;
    border: 1px solid var(--border-medium);
    padding: 6px 18px;
    border-radius: 20px;
    font-size: 0.88rem;
    font-weight: 700;
    color: #090a0f;
    margin-bottom: 18px;
  }

  .gate-desc {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.6;
    max-width: 500px;
    margin: 0 auto 32px auto;
  }

  .gate-actions-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 380px;
    margin: 0 auto;
  }

  .btn-gate-signin {
    background: #090a0f;
    color: #ffffff;
    border: none;
    padding: 13px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.18);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn-gate-signin:hover {
    transform: translateY(-1px);
    background: #1e2430;
    box-shadow: 0 6px 22px rgba(15, 23, 42, 0.25);
  }

  .btn-gate-register {
    background: #ffffff;
    border: 1px solid var(--border-medium);
    color: #090a0f;
    padding: 13px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-gate-register:hover {
    background: #f8fafc;
    border-color: #94a3b8;
  }

  .btn-gate-cancel {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 4px;
    transition: color 0.2s ease;
  }

  .btn-gate-cancel:hover {
    color: #090a0f;
  }

  /* Booking Modal */
  .booking-modal-body {
    padding: 34px;
  }

  .booking-header {
    display: flex;
    gap: 18px;
    align-items: center;
    border-bottom: 1px solid var(--border-subtle);
    padding-bottom: 22px;
    margin-bottom: 26px;
  }

  .booking-car-thumb {
    width: 96px;
    height: 68px;
    border-radius: 10px;
    object-fit: cover;
    background: #0f172a;
    border: 1px solid var(--border-subtle);
  }

  .booking-car-info h4 {
    font-size: 1.35rem;
    font-weight: 800;
    color: #090a0f;
    margin-bottom: 4px;
  }

  .booking-car-info p {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  .booking-price-pill {
    margin-left: auto;
    text-align: right;
  }

  .booking-rate-num {
    font-size: 1.35rem;
    font-weight: 800;
    color: #090a0f;
    font-family: 'Space Grotesk', sans-serif;
  }

  .booking-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 18px;
  }

  .booking-summary-box {
    background: #f8fafc;
    border: 1px solid var(--border-subtle);
    border-radius: 14px;
    padding: 18px 22px;
    margin: 22px 0;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.88rem;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }

  .summary-row.total-row {
    border-top: 1px dashed var(--border-medium);
    padding-top: 12px;
    margin-top: 12px;
    font-size: 1.15rem;
    font-weight: 800;
    color: #090a0f;
  }

  .btn-confirm-rental {
    width: 100%;
    background: #090a0f;
    color: #ffffff;
    border: none;
    padding: 15px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 18px rgba(15, 23, 42, 0.18);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn-confirm-rental:hover {
    transform: translateY(-1px);
    background: #1e2430;
    box-shadow: 0 6px 24px rgba(15, 23, 42, 0.25);
  }

  @media (max-width: 900px) {
    .hero-stage-banner {
      min-height: 380px;
      padding: 90px 16px 120px 16px;
    }
    .hero-title {
      font-size: 2.35rem;
      letter-spacing: -0.8px;
    }
    .hero-subtitle {
      font-size: 0.98rem;
      margin-bottom: 28px;
    }
    .search-filter-wrapper {
      margin-top: -24px;
      padding: 0 12px;
    }
    .search-card-grid {
      grid-template-columns: 1fr;
    }
    .steps-grid {
      grid-template-columns: 1fr;
    }
    .contact-grid {
      grid-template-columns: 1fr;
    }
    .footer-inner {
      grid-template-columns: 1fr 1fr;
    }
    .nav-center-links {
      display: none;
    }
  }
`;

// Initial luxury fallback fleet so showroom displays immediately even if backend empty
const FALLBACK_FLEET = [
  {
    id: 101,
    brand: 'Mercedes-Benz',
    model: 'AMG GT 4-Door Coupe',
    year: 2024,
    category: 'Luxury',
    daily_rate: 195,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    seating_capacity: 4,
    horsepower: 435,
    license_plate: 'LUX-001',
    status: 'available',
    image: defaultCarBg,
  },
  {
    id: 102,
    brand: 'BMW',
    model: 'M4 Competition Coupe',
    year: 2024,
    category: 'Sports',
    daily_rate: 180,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    seating_capacity: 4,
    horsepower: 503,
    license_plate: 'M4-COMP',
    status: 'available',
    image: defaultCarBg,
  },
  {
    id: 103,
    brand: 'Porsche',
    model: 'Taycan 4S Cross Turismo',
    year: 2024,
    category: 'Luxury',
    daily_rate: 220,
    fuel_type: 'Electric',
    transmission: 'Automatic',
    seating_capacity: 5,
    horsepower: 530,
    license_plate: 'ELE-777',
    status: 'available',
    image: defaultCarBg,
  },
  {
    id: 104,
    brand: 'Range Rover',
    model: 'Sport Dynamic SE',
    year: 2023,
    category: 'SUV',
    daily_rate: 165,
    fuel_type: 'Hybrid',
    transmission: 'Automatic',
    seating_capacity: 5,
    horsepower: 395,
    license_plate: 'SUV-999',
    status: 'available',
    image: defaultCarBg,
  },
  {
    id: 105,
    brand: 'Audi',
    model: 'RS6 Avant Quattro',
    year: 2024,
    category: 'Sports',
    daily_rate: 210,
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    seating_capacity: 5,
    horsepower: 591,
    license_plate: 'RS6-V8',
    status: 'rented',
    image: defaultCarBg,
  },
  {
    id: 106,
    brand: 'Tesla',
    model: 'Model S Plaid Tri-Motor',
    year: 2024,
    category: 'Sedan',
    daily_rate: 175,
    fuel_type: 'Electric',
    transmission: 'Automatic',
    seating_capacity: 5,
    horsepower: 1020,
    license_plate: 'TSL-1020',
    status: 'available',
    image: defaultCarBg,
  },
];

export default function FleetShowcase({
  user,
  onOpenLogin,
  onOpenRegister,
  onOpenUserPortal,
  onOpenAdminPortal,
  onLogout,
  intendedCar,
  onClearIntendedCar,
}) {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTransmission, setSelectedTransmission] = useState('all');
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  // Modals & Navigation
  const [selectedCarForSpecs, setSelectedCarForSpecs] = useState(null);
  const [authGateCar, setAuthGateCar] = useState(null);
  const [profileIncompleteCar, setProfileIncompleteCar] = useState(null);
  const [bookingCar, setBookingCar] = useState(intendedCar || null);
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    startDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    pickupLocation: 'Main City Center Agency',
    licenseNumber: '',
    specialRequest: '',
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    subject: 'General Inquiry',
    message: '',
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [submittingContact, setSubmittingContact] = useState(false);
  const [contactError, setContactError] = useState('');
  const [profileSidebarOpen, setProfileSidebarOpen] = useState(false);

  // Auto-fill contact info if authenticated user changes or logs in
  useEffect(() => {
    if (user) {
      setContactData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  // Fetch Fleet from Laravel Backend
  useEffect(() => {
    let isMounted = true;
    async function loadFleet() {
      try {
        setLoading(true);
        const data = await getCars();
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setFleet(data);
          } else {
            setFleet(FALLBACK_FLEET);
          }
        }
      } catch (err) {
        console.warn('Backend fleet endpoint unavailable, using showcase fleet:', err);
        if (isMounted) {
          setFleet(FALLBACK_FLEET);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadFleet();
    return () => {
      isMounted = false;
    };
  }, []);

  // When intendedCar arrives (e.g. after successful login), open booking modal automatically
  useEffect(() => {
    if (intendedCar && user) {
      setBookingCar(intendedCar);
    }
  }, [intendedCar, user]);

  // Filter & Sort Fleet
  const filteredFleet = useMemo(() => {
    return fleet
      .filter((car) => {
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchBrand = car.brand?.toLowerCase().includes(query);
          const matchModel = car.model?.toLowerCase().includes(query);
          const matchPlate = car.license_plate?.toLowerCase().includes(query);
          if (!matchBrand && !matchModel && !matchPlate) return false;
        }

        if (selectedCategory !== 'all') {
          if (car.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        if (selectedTransmission !== 'all') {
          if (car.transmission?.toLowerCase() !== selectedTransmission.toLowerCase()) {
            return false;
          }
        }

        if (selectedFuel !== 'all') {
          if (car.fuel_type?.toLowerCase() !== selectedFuel.toLowerCase()) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return Number(a.daily_rate) - Number(b.daily_rate);
        }
        if (sortBy === 'price-desc') {
          return Number(b.daily_rate) - Number(a.daily_rate);
        }
        if (sortBy === 'year-desc') {
          return Number(b.year) - Number(a.year);
        }
        if (a.status === 'available' && b.status !== 'available') return -1;
        if (b.status === 'available' && a.status !== 'available') return 1;
        return (Number(b.horsepower) || 0) - (Number(a.horsepower) || 0);
      });
  }, [fleet, searchQuery, selectedCategory, selectedTransmission, selectedFuel, sortBy]);

  // Check if driver profile is complete before booking
  const isProfileReady = (u) => {
    if (!u) return false;
    const hasAvatar = Boolean(u.avatar);
    const hasPhone = Boolean(u.phone && String(u.phone).trim().length > 5);
    const hasDoc = Boolean(u.license_uploaded || u.license_document);
    return hasAvatar && hasPhone && hasDoc;
  };

  // Rent button handler: gates guest vs incomplete profile vs logged-in
  const handleRentClick = (car) => {
    if (car.status !== 'available') return;

    const activeUser = user || getStoredUser();

    if (!activeUser) {
      setAuthGateCar(car);
      return;
    }

    if (!isProfileReady(activeUser)) {
      setProfileIncompleteCar(car);
      return;
    }

    setBookingCar(car);
  };

  // Calculate rental days & total price
  const rentalDays = useMemo(() => {
    if (!bookingForm.startDate || !bookingForm.endDate) return 1;
    const start = new Date(bookingForm.startDate);
    const end = new Date(bookingForm.endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [bookingForm.startDate, bookingForm.endDate]);

  const estimatedTotal = useMemo(() => {
    if (!bookingCar) return 0;
    return Number(bookingCar.daily_rate) * rentalDays;
  }, [bookingCar, rentalDays]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setSubmittingBooking(true);
    setBookingError('');
    try {
      await createReservation({
        user_id: user.id,
        car_id: bookingCar.id,
        start_date: bookingForm.startDate,
        end_date: bookingForm.endDate,
        total_price: estimatedTotal,
        pickup_location: bookingForm.pickupLocation,
        driver_name: user.name,
        driver_email: user.email,
        driver_phone: user.phone || bookingForm.phone,
        driver_license_number: bookingForm.licenseNumber || user.license_number,
        driver_avatar: user.avatar,
        driver_license_doc: user.license_document,
      });
      setBookingConfirmed(true);
    } catch (err) {
      setBookingError(err.message || 'Failed to submit reservation.');
    } finally {
      setSubmittingBooking(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmittingContact(true);
    setContactError('');
    try {
      await submitContactMessage({
        user_id: user?.id || null,
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        subject: contactData.subject || 'General Inquiry',
        message: contactData.message,
      });
      setContactSuccess(true);
      setTimeout(() => {
        setContactSuccess(false);
        setContactData({
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || '',
          subject: 'General Inquiry',
          message: '',
        });
      }, 5000);
    } catch (err) {
      setContactError(err.message || 'Failed to submit concierge request. Please try again.');
    } finally {
      setSubmittingContact(false);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories = ['all', 'Luxury', 'SUV', 'Sedan', 'Sports', 'City'];

  return (
    <>
      <style>{showcaseStyles}</style>
      <div className="showcase-wrapper">
        {/* ================= TOP NAVBAR ================= */}
        <header className="public-navbar">
          <div className="nav-inner">
            <div className="brand-logo-area" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="brand-logo-icon">
                <IconLogo size={26} />
              </div>
              <div className="brand-titles">
                <span className="brand-name">LOCATION <span className="brand-accent">VOITURES</span></span>
                <span className="brand-tagline">Excellence Fleet</span>
              </div>
            </div>

            <nav className="nav-center-links">
              <button
                type="button"
                className="nav-link-btn active"
                onClick={() => scrollToSection('fleet-catalog')}
              >
                <span>Browse Fleet</span>
              </button>
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => scrollToSection('how-it-works')}
              >
                <span>How It Works</span>
              </button>
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => scrollToSection('agency-contact')}
              >
                <span>Contact & Agency</span>
              </button>
            </nav>

            <div className="nav-actions">
              {user ? (
                <>
                  {/* Single chip — clicking opens profile sidebar */}
                  <button
                    type="button"
                    className="user-badge-pill user-badge-pill--clickable"
                    onClick={() => setProfileSidebarOpen(true)}
                    aria-label="Open profile panel"
                  >
                    <div className="user-avatar-mini">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name || 'Profile'} className="nav-avatar-img" />
                      ) : (
                        <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                      )}
                    </div>
                    <span className="user-name-mini">{user.name || 'Member'}</span>
                  </button>

                  {/* Admin Portal button stays in navbar for staff */}
                  {(user.role === 'admin' || user.role === 'gestionnaire') && (
                    <button
                      type="button"
                      className="btn-nav-portal"
                      onClick={onOpenAdminPortal}
                    >
                      <IconSliders size={15} />
                      <span>Admin Portal</span>
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn-ghost-signin"
                    onClick={() => onOpenLogin()}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="btn-primary-register"
                    onClick={() => onOpenRegister()}
                  >
                    <span>Create Account</span>
                    <IconArrowRight size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ================= HERO SECTION (LIGHT LUXURY) ================= */}
        <section className="hero-section">
          <div className="hero-stage-banner">
            <div className="hero-stage-overlay" />
            <div className="hero-inner">
              <h1 className="hero-title">
                Drive the <span className="title-gradient">Extraordinary</span>.<br />
                Uncompromising Fleet Rental.
              </h1>
            </div>
          </div>

          {/* Quick Filter Card */}
          <div className="search-filter-wrapper">
            <div className="search-filter-card">
              <div className="search-card-grid">
                <div className="filter-group">
                  <label className="filter-label">Search Marque or Model</label>
                  <div className="filter-input-wrap">
                    <span className="filter-input-icon">
                      <IconSearch size={16} />
                    </span>
                    <input
                      type="text"
                      className="filter-input"
                      placeholder="Search prestige marque or model (e.g. Porsche 911 GT3, Bentley, Ferrari)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Transmission</label>
                  <select
                    className="filter-select"
                    value={selectedTransmission}
                    onChange={(e) => setSelectedTransmission(e.target.value)}
                  >
                    <option value="all">All Transmissions</option>
                    <option value="Automatic">Automatic Transmission</option>
                    <option value="Manual">Manual Shift</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Motorization</label>
                  <select
                    className="filter-select"
                    value={selectedFuel}
                    onChange={(e) => setSelectedFuel(e.target.value)}
                  >
                    <option value="all">All Powertrains</option>
                    <option value="Petrol">Petrol High-Output</option>
                    <option value="Diesel">Diesel Touring</option>
                    <option value="Hybrid">Hybrid Performance</option>
                    <option value="Electric">Pure Electric EV</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Sort By</label>
                  <select
                    className="filter-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recommended">Curated Fleet First</option>
                    <option value="price-asc">Daily Rate: Low to High</option>
                    <option value="price-desc">Daily Rate: High to Low</option>
                    <option value="year-desc">Latest Model Year</option>
                  </select>
                </div>
              </div>

              {/* Category Pills */}
              <div className="category-pill-strip">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`cat-pill ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === 'all' ? 'All Classes' : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= FLEET CATALOG (LIGHT) ================= */}
        <section id="fleet-catalog" className="fleet-section">
          <div className="fleet-header">
            <div>
              <h2 className="fleet-heading-title">Curated Available Fleet</h2>
              <p className="fleet-heading-desc">
                Select any prestige model to inspect telemetry, powertrain specifications, and lock in your reservation.
              </p>
            </div>

            <div className="fleet-sorting-controls">
              <span className="fleet-count-pill">
                {filteredFleet.length} {filteredFleet.length === 1 ? 'vehicle' : 'vehicles'} available
              </span>
            </div>
          </div>

          {filteredFleet.length === 0 ? (
            <div className="empty-fleet-state">
              <div className="empty-icon-wrap">
                <IconSearch size={28} />
              </div>
              <h3 className="empty-title">No matching vehicles found</h3>
              <p className="empty-desc">
                Adjust your search marque, reset transmission preferences, or clear powertrain filters.
              </p>
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedTransmission('all');
                  setSelectedFuel('all');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="fleet-grid">
              {filteredFleet.map((car) => {
                const isAvail = car.status === 'available';
                return (
                  <article key={car.id} className="car-card">
                    {/* Image Stage */}
                    <div className="car-image-stage">
                      <img
                        src={car.image || defaultCarBg}
                        alt={`${car.brand} ${car.model}`}
                        className="car-img"
                        onError={(e) => {
                          e.target.src = defaultCarBg;
                        }}
                      />

                      <span className={`car-status-pill ${car.status || 'available'}`}>
                        <span style={{ fontSize: '0.65rem' }}>●</span>
                        <span>{car.status === 'available' ? 'Available' : (car.status || 'Reserved')}</span>
                      </span>

                      <span className="car-category-badge">{car.category || 'Luxury'}</span>

                      <div className="car-price-overlay">
                        <span className="car-price-value">${Number(car.daily_rate).toFixed(0)}</span>
                        <span className="car-price-unit">/ day</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="car-content">
                      <div className="car-header-row">
                        <h3 className="car-brand-title">
                          {car.brand} {car.model}
                        </h3>
                        <div className="car-meta-subtitle">
                          <span>Year {car.year}</span>
                          <span className="meta-dot" />
                          <span>{car.seating_capacity || 5} Seats</span>
                          {car.horsepower ? (
                            <>
                              <span className="meta-dot" />
                              <span>{car.horsepower} HP</span>
                            </>
                          ) : null}
                        </div>
                      </div>

                      {/* Specs Badges */}
                      <div className="car-specs-grid">
                        <div className="spec-badge">
                          <span className="spec-icon-wrap"><IconGear size={15} /></span>
                          <span>{car.transmission || 'Automatic'}</span>
                        </div>
                        <div className="spec-badge">
                          <span className="spec-icon-wrap"><IconFuel size={15} /></span>
                          <span>{car.fuel_type || 'Petrol'}</span>
                        </div>
                        <div className="spec-badge">
                          <span className="spec-icon-wrap"><IconPlate size={15} /></span>
                          <span>{car.license_plate || 'VIP-PLATE'}</span>
                        </div>
                        <div className="spec-badge">
                          <span className="spec-icon-wrap"><IconShield size={15} /></span>
                          <span>Zero Excess</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="card-actions-row">
                        <button
                          type="button"
                          className="btn-view-specs"
                          onClick={() => setSelectedCarForSpecs(car)}
                        >
                          View Specs
                        </button>

                        <button
                          type="button"
                          className="btn-rent-now"
                          disabled={!isAvail}
                          onClick={() => handleRentClick(car)}
                        >
                          <span>{isAvail ? 'Reserve Vehicle' : 'Currently Rented'}</span>
                          {isAvail && <IconArrowRight size={14} />}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ================= HOW IT WORKS (LIGHT) ================= */}
        <section id="how-it-works" className="how-it-works-section">
          <div className="section-container">
            <div className="section-tag-center">
              <span className="section-pill">Effortless Concierge</span>
            </div>
            <h2 className="section-title-center">The Seamless Booking Experience</h2>
            <p className="section-desc-center">
              Experience the gold standard in prestige mobility through our streamlined 3-step digital journey.
            </p>

            <div className="steps-grid">
              <div className="step-box">
                <span className="step-number">01</span>
                <img
                  className="step-photo"
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=85&auto=format&fit=crop"
                  alt="Luxury supercar cockpit"
                  loading="lazy"
                />
                <div className="step-icon-wrap">
                  <IconSearch size={22} />
                </div>
                <h3 className="step-title">1. Curate Your Supercar</h3>
                <p className="step-text">
                  Browse our open luxury catalog. Review real-time horsepower, transmission dynamics, and all-inclusive
                  daily pricing without preliminary sign-up.
                </p>
              </div>

              <div className="step-box">
                <span className="step-number">02</span>
                <img
                  className="step-photo"
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=85&auto=format&fit=crop"
                  alt="Digital identity verification on mobile"
                  loading="lazy"
                />
                <div className="step-icon-wrap">
                  <IconIdBadge size={22} />
                </div>
                <h3 className="step-title">2. Frictionless ID Verification</h3>
                <p className="step-text">
                  Verify your profile in minutes. Upload your driver&apos;s license in PDF or high-resolution photo format
                  for encrypted, rapid concierge approval.
                </p>
              </div>

              <div className="step-box">
                <span className="step-number">03</span>
                <div className="step-icon-wrap">
                  <IconKey size={22} />
                </div>
                <img
                  className="step-photo"
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85&auto=format&fit=crop"
                  alt="Luxury vehicle at private handover"
                  loading="lazy"
                />
                <h3 className="step-title">3. Delivery & Driving</h3>
                <p className="step-text">
                  Receive your vehicle at our private showroom, private aviation terminal, or luxury hotel doorstep
                  with 24/7 dedicated assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTACT & AGENCY SECTION (LIGHT) ================= */}
        <section id="agency-contact" className="contact-section">
          <div className="contact-grid">
            <div className="contact-info-col">
              <div>
                <span className="contact-badge">Direct Agency Concierge</span>
                <h2 className="contact-col-title">Connect with Our Private Desk</h2>
                <p className="contact-col-desc">
                  Require bespoke handover at an airport tarmac, multi-week executive hire, or corporate fleet logistics?
                  Our concierge team is at your immediate service.
                </p>

                <div className="contact-detail-list">
                  <div className="contact-detail-row">
                    <div className="detail-icon-circle">
                      <IconPin size={18} />
                    </div>
                    <div>
                      <div className="detail-label">Agency Headquarters</div>
                      <div className="detail-value">Boulevard de la Corniche, Marina Bay, Agency Hub</div>
                    </div>
                  </div>

                  <div className="contact-detail-row">
                    <div className="detail-icon-circle">
                      <IconPhone size={18} />
                    </div>
                    <div>
                      <div className="detail-label">Direct Concierge Line</div>
                      <div className="detail-value">+33 (0) 1 42 68 55 00 / +212 522 99 88 77</div>
                    </div>
                  </div>

                  <div className="contact-detail-row">
                    <div className="detail-icon-circle">
                      <IconMail size={18} />
                    </div>
                    <div>
                      <div className="detail-label">Email Concierge</div>
                      <div className="detail-value">concierge@prestige-motors.com</div>
                    </div>
                  </div>

                  <div className="contact-detail-row">
                    <div className="detail-icon-circle">
                      <IconClock size={18} />
                    </div>
                    <div>
                      <div className="detail-label">Operating Schedule</div>
                      <div className="detail-value">Monday – Saturday: 08:00 – 21:00 | Sunday: 09:00 – 19:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="contact-form-col">
              <h3 className="form-title-h3">Submit Private Inquiry</h3>
              <p className="form-desc-p">Our concierge team reviews and answers within 15 minutes.</p>

              {contactSuccess ? (
                <div style={{
                  padding: '30px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '14px',
                  textAlign: 'center',
                  color: '#166534'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconCheck size={24} color="#16a34a" />
                    </div>
                  </div>
                  <h4 style={{ fontWeight: 800, marginBottom: '6px', color: '#166534', fontSize: '1.1rem' }}>Inquiry Transmitted Successfully</h4>
                  <p style={{ fontSize: '0.88rem', color: '#15803d' }}>Your concierge inquiry has been received. Our team will contact you shortly via email.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="contact-input-grid">
                    <div>
                      <label className="contact-label">Full Name</label>
                      <input
                        type="text"
                        required
                        className="contact-field"
                        placeholder="Full legal name as on passport / ID"
                        value={contactData.name}
                        onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="contact-label">Email Address</label>
                      <input
                        type="email"
                        required
                        className="contact-field"
                        placeholder="client@private-office.com"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="contact-input-grid">
                    <div>
                      <label className="contact-label">Telephone / WhatsApp</label>
                      <input
                        type="tel"
                        className="contact-field"
                        placeholder="+33 6 00 00 00 00"
                        value={contactData.phone}
                        onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="contact-label">Inquiry Subject</label>
                      <select
                        className="contact-field"
                        value={contactData.subject}
                        onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                        style={{ background: '#ffffff', cursor: 'pointer' }}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Vehicle Availability & Rates">Vehicle Availability & Rates</option>
                        <option value="VIP Chauffeur Service">VIP Chauffeur Service</option>
                        <option value="Corporate Booking">Corporate Booking</option>
                        <option value="Reservation Modification">Reservation Modification</option>
                      </select>
                    </div>
                  </div>

                  <div className="contact-input-full">
                    <label className="contact-label">Concierge Requirements</label>
                    <textarea
                      rows="4"
                      required
                      className="contact-field"
                      placeholder="Specify bespoke concierge requests (airport tarmac handover, private chauffeur, child seat, specific vehicle model)..."
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    />
                  </div>

                  {contactError && (
                    <div style={{
                      padding: '10px 16px',
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '8px',
                      color: '#dc2626',
                      fontSize: '0.85rem',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <IconAlert size={16} color="#dc2626" />
                      <span>{contactError}</span>
                    </div>
                  )}

                  <button type="submit" className="btn-submit-contact" disabled={submittingContact}>
                    {submittingContact ? (
                      <>
                        <span
                          style={{
                            display: 'inline-block',
                            width: 16,
                            height: 16,
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderTopColor: '#ffffff',
                            borderRadius: '50%',
                            animation: 'spin 0.8s linear infinite',
                          }}
                        />
                        <span>Transmitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Concierge Request</span>
                        <IconArrowRight size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ================= FOOTER (LIGHT) ================= */}
        <footer className="public-footer">
          <div className="footer-inner">
            <div>
              <div className="brand-logo-area">
                <div className="brand-logo-icon">
                  <IconLogo size={24} />
                </div>
                <div className="brand-titles">
                  <span className="brand-name">LOCATION <span className="brand-accent">VOITURES</span></span>
                  <span className="brand-tagline">Excellence Fleet</span>
                </div>
              </div>
              <p className="footer-brand-p">
                Premier luxury automobile rental and concierge services. Curated supercars, encrypted digital key
                delivery, and 24/7 dedicated client care.
              </p>
            </div>

            <div>
              <h4 className="footer-col-title">Fleet Portfolios</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item" onClick={() => { setSelectedCategory('Luxury'); scrollToSection('fleet-catalog'); }}>Bespoke Sedans</li>
                <li className="footer-link-item" onClick={() => { setSelectedCategory('SUV'); scrollToSection('fleet-catalog'); }}>Prestige SUVs</li>
                <li className="footer-link-item" onClick={() => { setSelectedCategory('Sports'); scrollToSection('fleet-catalog'); }}>High-Performance Coupes</li>
                <li className="footer-link-item" onClick={() => { setSelectedCategory('Electric'); scrollToSection('fleet-catalog'); }}>Electric Performance</li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Services & Terms</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item">Rental Conditions & Insurance</li>
                <li className="footer-link-item">VIP Handover & Airport Escort</li>
                <li className="footer-link-item">Driver License Requirements</li>
                <li className="footer-link-item">Security Deposit Protocol</li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Client Access</h4>
              <ul className="footer-links-list">
                {user ? (
                  <>
                    <li className="footer-link-item" onClick={onOpenUserPortal}>Customer Portal</li>
                    <li className="footer-link-item" onClick={onLogout}>Sign Out</li>
                  </>
                ) : (
                  <>
                    <li className="footer-link-item" onClick={() => onOpenLogin()}>Driver Sign In</li>
                    <li className="footer-link-item" onClick={() => onOpenRegister()}>Register Driver Account</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="footer-bottom-row">
            <span>© {new Date().getFullYear()} Location Voitures Prestige. All rights reserved.</span>
            <span>Telematics Encrypted • Zero Excess VIP Protection • ISO-27001 Certified</span>
          </div>
        </footer>

        {/* ================= MODAL: GUEST AUTH GATE ================= */}
        {authGateCar && (
          <div className="modal-backdrop-blur" onClick={() => setAuthGateCar(null)}>
            <div className="modal-window" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="modal-close-x"
                onClick={() => setAuthGateCar(null)}
              >
                <IconClose size={16} />
              </button>

              <div className="auth-gate-body">
                <div className="gate-icon-halo">
                  <IconIdBadge size={32} />
                </div>

                <div className="gate-car-preview-pill">
                  <span>{authGateCar.brand} {authGateCar.model}</span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span style={{ color: '#090a0f', fontFamily: 'Space Grotesk, sans-serif' }}>
                    ${Number(authGateCar.daily_rate).toFixed(0)} / day
                  </span>
                </div>

                <h3 className="gate-title">Sign In to Reserve Vehicle</h3>
                <p className="gate-desc">
                  To complete your booking and verify your driver profile (driver&apos;s license and contact information),
                  please sign in or create your verified driver account in under 2 minutes.
                </p>

                <div className="gate-actions-stack">
                  <button
                    type="button"
                    className="btn-gate-signin"
                    onClick={() => {
                      const car = authGateCar;
                      setAuthGateCar(null);
                      onOpenLogin(car);
                    }}
                  >
                    <span>Sign In to Continue Booking</span>
                    <IconArrowRight size={15} />
                  </button>

                  <button
                    type="button"
                    className="btn-gate-register"
                    onClick={() => {
                      const car = authGateCar;
                      setAuthGateCar(null);
                      onOpenRegister(car);
                    }}
                  >
                    Create New Account (Free)
                  </button>

                  <button
                    type="button"
                    className="btn-gate-cancel"
                    onClick={() => setAuthGateCar(null)}
                  >
                    Keep Browsing Fleet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL: DRIVER VERIFICATION REQUIRED GATE ================= */}
        {profileIncompleteCar && (
          <div className="modal-backdrop-blur" onClick={() => setProfileIncompleteCar(null)}>
            <div className="modal-window" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="modal-close-x"
                onClick={() => setProfileIncompleteCar(null)}
              >
                <IconClose size={16} />
              </button>

              <div className="auth-gate-body">
                <div className="gate-icon-halo">
                  <IconIdBadge size={32} />
                </div>

                <div className="gate-car-preview-pill">
                  <span>{profileIncompleteCar.brand} {profileIncompleteCar.model}</span>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <span style={{ color: '#090a0f', fontFamily: 'Space Grotesk, sans-serif' }}>
                    ${Number(profileIncompleteCar.daily_rate).toFixed(0)} / day
                  </span>
                </div>

                <h3 className="gate-title">Driver Profile Verification Required</h3>
                <p className="gate-desc">
                  To complete vehicle reservations, our concierge team requires a verified driver record including your profile picture, contact phone, and an uploaded driver&apos;s license scan.
                </p>

                {/* Verification Checklist */}
                {(() => {
                  const activeU = user || getStoredUser() || {};
                  const hasAv = Boolean(activeU.avatar);
                  const hasPh = Boolean(activeU.phone && String(activeU.phone).trim().length > 5);
                  const hasDc = Boolean(activeU.license_uploaded || activeU.license_document);

                  return (
                    <div style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '16px 20px',
                      margin: '18px 0',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                        <span style={{ color: '#334155', fontWeight: 600 }}>Driver Profile Picture</span>
                        <span style={{ fontWeight: 700, color: hasAv ? '#10b981' : '#ef4444' }}>
                          {hasAv ? '✓ Attached' : '✕ Missing Profile Photo'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                        <span style={{ color: '#334155', fontWeight: 600 }}>Phone / WhatsApp Contact</span>
                        <span style={{ fontWeight: 700, color: hasPh ? '#10b981' : '#ef4444' }}>
                          {hasPh ? '✓ Attached' : '✕ Missing Phone Number'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.86rem' }}>
                        <span style={{ color: '#334155', fontWeight: 600 }}>Driver&apos;s License Document</span>
                        <span style={{ fontWeight: 700, color: hasDc ? '#10b981' : '#ef4444' }}>
                          {hasDc ? '✓ Attached' : '✕ Missing License Scan/PDF'}
                        </span>
                      </div>
                    </div>
                  );
                })()}

                <div className="gate-actions-stack">
                  <button
                    type="button"
                    className="btn-gate-signin"
                    onClick={() => {
                      setProfileIncompleteCar(null);
                      onOpenUserPortal();
                    }}
                  >
                    <span>Complete Driver Profile Now</span>
                    <IconArrowRight size={15} />
                  </button>

                  <button
                    type="button"
                    className="btn-gate-cancel"
                    onClick={() => setProfileIncompleteCar(null)}
                  >
                    Keep Browsing Fleet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL: VEHICLE SPECS DETAILS ================= */}
        {selectedCarForSpecs && (
          <div className="modal-backdrop-blur" onClick={() => setSelectedCarForSpecs(null)}>
            <div className="modal-window modal-window-lg" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="modal-close-x"
                onClick={() => setSelectedCarForSpecs(null)}
              >
                <IconClose size={16} />
              </button>

              <div style={{ height: '320px', width: '100%', position: 'relative', background: '#090b10' }}>
                <img
                  src={selectedCarForSpecs.image || defaultCarBg}
                  alt={`${selectedCarForSpecs.brand} ${selectedCarForSpecs.model}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = defaultCarBg;
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '28px 32px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(9, 10, 15, 0.92) 100%)',
                  color: '#ffffff'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        background: 'rgba(255,255,255,0.2)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        letterSpacing: '0.8px',
                        border: '1px solid rgba(255,255,255,0.3)'
                      }}>
                        {selectedCarForSpecs.category || 'Luxury'}
                      </span>
                      <h2 style={{ fontSize: '1.9rem', fontWeight: 800, marginTop: '8px', letterSpacing: '-0.5px' }}>
                        {selectedCarForSpecs.brand} {selectedCarForSpecs.model}
                      </h2>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', fontFamily: 'Space Grotesk, sans-serif' }}>
                        ${Number(selectedCarForSpecs.daily_rate).toFixed(0)}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}> / day</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: '32px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  Technical Specifications
                </h4>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '26px'
                }}>
                  <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.6px' }}>TRANSMISSION</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#090a0f', marginTop: '3px' }}>{selectedCarForSpecs.transmission || 'Automatic'}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.6px' }}>MOTORIZATION</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#090a0f', marginTop: '3px' }}>{selectedCarForSpecs.fuel_type || 'Petrol'}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.6px' }}>HORSEPOWER</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#090a0f', marginTop: '3px' }}>{selectedCarForSpecs.horsepower || '450+'} HP</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.6px' }}>SEATING CAPACITY</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#090a0f', marginTop: '3px' }}>{selectedCarForSpecs.seating_capacity || 5} Passengers</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.6px' }}>MODEL YEAR</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#090a0f', marginTop: '3px' }}>{selectedCarForSpecs.year}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.6px' }}>AVAILABILITY</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: selectedCarForSpecs.status === 'available' ? '#16a34a' : '#d97706', marginTop: '3px', textTransform: 'capitalize' }}>
                      {selectedCarForSpecs.status === 'available' ? 'Available Now' : (selectedCarForSpecs.status || 'Reserved')}
                    </div>
                  </div>
                </div>

                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  White-Glove Inclusions
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconCheck size={16} color="#090a0f" />
                    <span>Comprehensive Collision & Theft Insurance</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconCheck size={16} color="#090a0f" />
                    <span>250 km / day allowance included</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconCheck size={16} color="#090a0f" />
                    <span>24/7 VIP Roadside Assistance & Recovery</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconCheck size={16} color="#090a0f" />
                    <span>Showroom detail & bespoke preparation</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <button
                    type="button"
                    style={{
                      flex: 1,
                      background: '#f1f5f9',
                      border: '1px solid var(--border-medium)',
                      color: '#090a0f',
                      padding: '13px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedCarForSpecs(null)}
                  >
                    Close Specs
                  </button>
                  <button
                    type="button"
                    style={{
                      flex: 1.5,
                      background: selectedCarForSpecs.status === 'available' ? '#090a0f' : '#e2e8f0',
                      color: selectedCarForSpecs.status === 'available' ? '#ffffff' : 'var(--text-dim)',
                      border: 'none',
                      padding: '13px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      cursor: selectedCarForSpecs.status === 'available' ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                    disabled={selectedCarForSpecs.status !== 'available'}
                    onClick={() => {
                      const car = selectedCarForSpecs;
                      setSelectedCarForSpecs(null);
                      handleRentClick(car);
                    }}
                  >
                    <span>{selectedCarForSpecs.status === 'available' ? 'Reserve This Vehicle' : 'Currently Rented'}</span>
                    {selectedCarForSpecs.status === 'available' && <IconArrowRight size={15} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL: BOOKING FORM (FOR LOGGED-IN USERS) ================= */}
        {bookingCar && user && (
          <div className="modal-backdrop-blur" onClick={() => setBookingCar(null)}>
            <div className="modal-window modal-window-lg" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="modal-close-x"
                onClick={() => setBookingCar(null)}
              >
                <IconClose size={16} />
              </button>

              <div className="booking-modal-body">
                <div className="booking-header">
                  <img
                    src={bookingCar.image || defaultCarBg}
                    alt={bookingCar.model}
                    className="booking-car-thumb"
                    onError={(e) => { e.target.src = defaultCarBg; }}
                  />
                  <div className="booking-car-info">
                    <h4>Reserve {bookingCar.brand} {bookingCar.model}</h4>
                    <p>{bookingCar.category} • {bookingCar.transmission} • {bookingCar.fuel_type}</p>
                  </div>
                  <div className="booking-price-pill">
                    <div className="booking-rate-num">${Number(bookingCar.daily_rate).toFixed(0)}</div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>per 24-hour day</span>
                  </div>
                </div>

                {bookingConfirmed ? (
                  <div style={{
                    padding: '40px 24px',
                    textAlign: 'center',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                      <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconCheck size={30} color="#16a34a" />
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#090a0f', marginBottom: '8px' }}>
                      Reservation Submitted for Concierge Review
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: '#475569', maxWidth: '480px', margin: '0 auto 18px auto', lineHeight: 1.6 }}>
                      Your reservation for the <strong>{bookingCar.brand} {bookingCar.model}</strong> has been transmitted.
                      The agency gestionnaire will inspect your driver documents and approve the vehicle for handover.
                    </p>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#fffbeb',
                      border: '1px solid #fde68a',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#b45309',
                      fontWeight: 700,
                      marginBottom: '24px'
                    }}>
                      <span>● Status: Pending Concierge Verification</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                      <button
                        type="button"
                        style={{
                          background: '#090a0f',
                          color: '#ffffff',
                          border: 'none',
                          padding: '11px 22px',
                          borderRadius: '10px',
                          fontSize: '0.88rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setBookingCar(null);
                          setBookingConfirmed(false);
                          onOpenUserPortal();
                        }}
                      >
                        Track in My Reservations
                      </button>

                      <button
                        type="button"
                        style={{
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          color: '#090a0f',
                          padding: '11px 20px',
                          borderRadius: '10px',
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setBookingCar(null);
                          setBookingConfirmed(false);
                        }}
                      >
                        Back to Fleet
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit}>
                    <div className="booking-form-grid">
                      <div>
                        <label className="contact-label">Handover Start Date</label>
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="contact-field"
                          value={bookingForm.startDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, startDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="contact-label">Return Repatriation Date</label>
                        <input
                          type="date"
                          required
                          min={bookingForm.startDate || new Date().toISOString().split('T')[0]}
                          className="contact-field"
                          value={bookingForm.endDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, endDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="booking-form-grid">
                      <div>
                        <label className="contact-label">Pickup & Handover Location</label>
                        <select
                          className="contact-field"
                          value={bookingForm.pickupLocation}
                          onChange={(e) => setBookingForm({ ...bookingForm, pickupLocation: e.target.value })}
                        >
                          <option value="Main City Center Agency">Main City Center Agency Hub</option>
                          <option value="Airport Terminal 1 VIP Handover">Airport Terminal 1 VIP Handover</option>
                          <option value="Airport Terminal 2 VIP Handover">Airport Terminal 2 VIP Handover</option>
                          <option value="Doorstep Hotel / Residence Delivery">Doorstep Hotel / Residence Delivery</option>
                        </select>
                      </div>

                      <div>
                        <label className="contact-label">Driver&apos;s License Number</label>
                        <input
                          type="text"
                          required
                          placeholder="Driver licence reference (e.g. MC-98240-B)"
                          className="contact-field"
                          value={bookingForm.licenseNumber}
                          onChange={(e) => setBookingForm({ ...bookingForm, licenseNumber: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Driver's License Document Notice */}
                    <div style={{
                      background: '#f8fafc',
                      border: '1px solid var(--border-medium)',
                      borderRadius: '12px',
                      padding: '16px 20px',
                      marginBottom: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: '#ffffff',
                        border: '1px solid var(--border-medium)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#090a0f'
                      }}>
                        <IconIdBadge size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#090a0f' }}>
                          Driver License Document Verification
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          Manage your PDF/photo driver credentials anytime in your <strong>Customer Portal</strong>.
                        </div>
                      </div>
                      <button
                        type="button"
                        style={{
                          background: '#ffffff',
                          border: '1px solid var(--border-medium)',
                          color: '#090a0f',
                          padding: '7px 14px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setBookingCar(null);
                          onOpenUserPortal();
                        }}
                      >
                        Open Portal
                      </button>
                    </div>

                    {/* Cost Summary Box */}
                    <div className="booking-summary-box">
                      <div className="summary-row">
                        <span>Daily Rate</span>
                        <span>${Number(bookingCar.daily_rate).toFixed(0)} / day</span>
                      </div>
                      <div className="summary-row">
                        <span>Rental Duration</span>
                        <span>{rentalDays} {rentalDays === 1 ? 'day' : 'days'}</span>
                      </div>
                      <div className="summary-row">
                        <span>Comprehensive Insurance & 24/7 Roadside</span>
                        <span style={{ color: '#16a34a', fontWeight: 600 }}>Included (Complimentary)</span>
                      </div>
                      <div className="summary-row total-row">
                        <span>Estimated Total</span>
                        <span style={{ color: '#090a0f', fontFamily: 'Space Grotesk, sans-serif' }}>
                          ${estimatedTotal.toFixed(0)}
                        </span>
                      </div>
                    </div>

                    {bookingError && (
                      <div style={{
                        padding: '12px 16px',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '10px',
                        color: '#dc2626',
                        fontSize: '0.85rem',
                        marginBottom: '16px'
                      }}>
                        {bookingError}
                      </div>
                    )}

                    <button type="submit" className="btn-confirm-rental" disabled={submittingBooking}>
                      <span>
                        {submittingBooking
                          ? 'Transmitting Reservation to Concierge...'
                          : `Confirm & Place Rental Reservation ($${estimatedTotal.toFixed(0)})`}
                      </span>
                      <IconArrowRight size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= PROFILE SIDEBAR ================= */}
      {user && (
        <>
          {/* Overlay — click to dismiss */}
          <div
            className={`profile-sidebar-overlay${profileSidebarOpen ? ' visible' : ''}`}
            onClick={() => setProfileSidebarOpen(false)}
            aria-hidden="true"
          />

          <aside className={`profile-sidebar${profileSidebarOpen ? ' open' : ''}`} aria-label="Account panel">
            {/* Header */}
            <div className="profile-sidebar-header">
              <span className="profile-sidebar-title">Account</span>
              <button
                type="button"
                className="profile-sidebar-close"
                onClick={() => setProfileSidebarOpen(false)}
                aria-label="Close panel"
              >
                <IconClose size={18} />
              </button>
            </div>

            {/* Avatar + Name + Email */}
            <div className="profile-sidebar-identity">
              <div className="profile-avatar-large">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name || 'Profile'} className="profile-avatar-img" />
                ) : (
                  <span className="profile-avatar-initial">
                    {(user.name || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="profile-identity-text">
                <div className="profile-full-name">{user.name || 'Member'}</div>
                <div className="profile-identity-email">{user.email}</div>
                {user.phone && <div className="profile-identity-phone">{user.phone}</div>}
              </div>
            </div>

            {/* Info rows */}
            <div className="profile-sidebar-details">
              {user.address && (
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Address</span>
                  <span className="profile-detail-value">{user.address}</span>
                </div>
              )}
              {user.license_number && (
                <div className="profile-detail-row">
                  <span className="profile-detail-label">License</span>
                  <span className="profile-detail-value">{user.license_number}</span>
                </div>
              )}
              {user.license_expiry && (
                <div className="profile-detail-row">
                  <span className="profile-detail-label">Expiry</span>
                  <span className="profile-detail-value">{user.license_expiry}</span>
                </div>
              )}
              <div className="profile-detail-row">
                <span className="profile-detail-label">Role</span>
                <span className="profile-detail-value profile-detail-role">
                  {user.role === 'admin' ? 'Administrator' : user.role === 'gestionnaire' ? 'Gestionnaire' : 'Client'}
                </span>
              </div>
            </div>

            {/* My Reservations CTA */}
            <button
              type="button"
              className="profile-sidebar-btn-reservations"
              onClick={() => { setProfileSidebarOpen(false); onOpenUserPortal(); }}
            >
              <span>My Reservations</span>
              <IconArrowRight size={15} />
            </button>

            {/* Sign Out */}
            <button
              type="button"
              className="profile-sidebar-signout"
              onClick={() => { setProfileSidebarOpen(false); onLogout(); }}
            >
              Sign Out
            </button>
          </aside>
        </>
      )}
    </>
  );
}
