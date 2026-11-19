import { useState, useEffect, useRef } from 'react';
import {
  getCars,
  createCar,
  updateCar,
  deleteCar,
  getGestionnaires,
  createGestionnaire,
  updateGestionnaire,
  deleteGestionnaire,
  getReservations,
  updateReservationStatus,
} from '../db';
import defaultCarBg from '../assets/luxury_coastal_car.jpg';

const IconClose = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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

const IconFile = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IconUser = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconSearch = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconArrowLeft = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconEdit = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconTrash = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const IconLock = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconCamera = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const IconAlert = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconCheck = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconStaff = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconCar = ({ size = 15, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.1 2 11.6 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const IconShield = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const adminDashboardStyles = `
  /* =========================================================
     LUXURY LIGHT MODE ADMIN DASHBOARD STYLING
     Editorial, spacious, clean aesthetic with zero childish colors
     ========================================================= */

  .admin-hub {
    width: 100%;
    color: #0f172a;
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* Top Navigation Bar */
  .admin-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 18px 28px;
    margin-bottom: 24px;
    box-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.04);
  }

  .admin-brand {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .admin-brand-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #0f172a;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 1.25rem;
    box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.25);
  }

  .admin-title-group .admin-kicker {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #64748b;
    margin-bottom: 3px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .admin-kicker-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
    display: inline-block;
  }

  .admin-title-group h1 {
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
    margin: 0;
  }

  .admin-user-profile {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .admin-badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #334155;
    padding: 6px 14px;
    border-radius: 9999px;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .logout-pill-btn {
    padding: 8px 18px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #475569;
    border-radius: 10px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .logout-pill-btn:hover {
    background: #0f172a;
    color: #ffffff;
    border-color: #0f172a;
  }

  /* Admin Mode Tab Switcher */
  .admin-tabs-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f1f5f9;
    padding: 4px;
    border-radius: 12px;
    margin-bottom: 24px;
    width: fit-content;
    border: 1px solid #e2e8f0;
  }

  .admin-tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 18px;
    border-radius: 9px;
    border: none;
    background: transparent;
    color: #64748b;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .admin-tab-btn:hover {
    color: #0f172a;
  }

  .admin-tab-btn.active {
    background: #ffffff;
    color: #0f172a;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
  }

  .admin-tab-count {
    background: #e2e8f0;
    color: #334155;
    font-size: 0.72rem;
    padding: 2px 7px;
    border-radius: 9999px;
  }

  .admin-tab-btn.active .admin-tab-count {
    background: #0f172a;
    color: #ffffff;
  }

  /* Reservations Page Styles */
  .res-filter-strip {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .res-filter-pill {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 7px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .res-filter-pill:hover {
    background: #f1f5f9;
    color: #0f172a;
  }

  .res-filter-pill.active {
    background: #0f172a;
    border-color: #0f172a;
    color: #ffffff;
  }

  .badge-res-pending {
    background: #fffbeb;
    border: 1px solid #fde68a;
    color: #b45309;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  .badge-res-confirmed {
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #059669;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  .badge-res-rejected {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  .badge-res-completed {
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    color: #475569;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  .btn-action-inspect {
    background: #0f172a;
    color: #ffffff;
    border: none;
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-action-inspect:hover {
    background: #1e293b;
  }

  .btn-action-accept {
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #059669;
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-action-accept:hover {
    background: #d1fae5;
  }

  .btn-action-reject {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-action-reject:hover {
    background: #fee2e2;
  }

  /* Issue Modal Bespoke UI */
  .issue-modal-box {
    background: #ffffff;
    border-radius: 20px;
    padding: 28px 30px;
    width: 100%;
    max-width: 580px;
    box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
    border: 1px solid #e2e8f0;
    max-height: 90vh;
    overflow-y: auto;
  }

  .issue-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .issue-badge-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #fef2f2;
    border: 1px solid #fee2e2;
    color: #dc2626;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .issue-context-strip {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 12px 16px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.82rem;
    color: #334155;
    flex-wrap: wrap;
    gap: 10px;
  }

  .issue-preset-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 18px;
  }

  @media (max-width: 640px) {
    .issue-preset-grid {
      grid-template-columns: 1fr;
    }
  }

  .issue-preset-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 12px 14px;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .issue-preset-card:hover {
    border-color: #94a3b8;
    background: #f8fafc;
    transform: translateY(-1px);
  }

  .issue-preset-card.active {
    background: #f8fafc;
    border-color: #0f172a;
    box-shadow: 0 0 0 1.5px #0f172a;
  }

  .issue-preset-title {
    font-size: 0.84rem;
    font-weight: 700;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .issue-preset-desc {
    font-size: 0.74rem;
    color: #64748b;
    line-height: 1.35;
  }

  .issue-textarea {
    width: 100%;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    padding: 12px 14px;
    font-size: 0.88rem;
    color: #0f172a;
    background: #ffffff;
    outline: none;
    font-family: inherit;
    line-height: 1.5;
    transition: all 0.2s ease;
    resize: vertical;
  }

  .issue-textarea:focus {
    border-color: #0f172a;
    box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
  }

  .issue-helper-box {
    background: #eff6ff;
    border: 1px solid #dbeafe;
    border-radius: 10px;
    padding: 10px 14px;
    margin-top: 10px;
    margin-bottom: 22px;
    font-size: 0.78rem;
    color: #1e40af;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1.4;
  }

  /* Global Feedback Alert */
  .admin-alert {
    padding: 14px 20px;
    border-radius: 12px;
    font-size: 0.88rem;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .admin-alert-error {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
  }

  .admin-alert-success {
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #bbf7d0;
  }

  /* Fleet Stats Row - Refined Telemetry Metric Strip */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 28px;
  }

  @media (max-width: 960px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 560px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }

  .stat-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 20px 24px;
    box-shadow: 0 2px 12px -2px rgba(15, 23, 42, 0.03);
    position: relative;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px -4px rgba(15, 23, 42, 0.06);
  }

  .stat-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .stat-card-header h3 {
    font-size: 0.72rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    margin: 0;
  }

  .stat-indicator-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .dot-total { background: #0f172a; }
  .dot-available { background: #10b981; }
  .dot-rented { background: #f59e0b; }
  .dot-maintenance { background: #94a3b8; }

  .stat-number {
    font-size: 2.2rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -1px;
    line-height: 1;
    margin-bottom: 6px;
  }

  .stat-subtext {
    font-size: 0.78rem;
    color: #64748b;
    font-weight: 500;
  }

  /* Controls & Action Bar */
  .toolbar-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 16px 22px;
    margin-bottom: 28px;
    box-shadow: 0 2px 12px -2px rgba(15, 23, 42, 0.03);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    flex: 1;
  }

  .search-input-wrap {
    position: relative;
    min-width: 280px;
    flex: 1;
    max-width: 420px;
  }

  .search-input-wrap input {
    width: 100%;
    padding: 11px 16px 11px 40px;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    font-size: 0.88rem;
    background: #f8fafc;
    color: #0f172a;
    transition: all 0.2s ease;
  }

  .search-input-wrap input:focus {
    outline: none;
    background: #ffffff;
    border-color: #0f172a;
    box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
  }

  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    font-size: 0.95rem;
    pointer-events: none;
  }

  .select-filter {
    padding: 11px 16px;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    font-size: 0.86rem;
    font-weight: 500;
    background: #f8fafc;
    color: #0f172a;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .select-filter:focus {
    outline: none;
    border-color: #0f172a;
    background: #ffffff;
  }

  .add-car-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #0f172a;
    color: #ffffff;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px -2px rgba(15, 23, 42, 0.25);
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .add-car-btn:hover {
    background: #1e293b;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px -2px rgba(15, 23, 42, 0.3);
  }

  /* =========================================================
     GESTIONNAIRES STAFF CARDS GRID
     ========================================================= */

  .gestionnaires-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 24px;
    margin-bottom: 40px;
  }

  @media (max-width: 640px) {
    .gestionnaires-grid {
      grid-template-columns: 1fr;
    }
  }

  .gest-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    padding: 24px;
    box-shadow: 0 4px 16px -4px rgba(15, 23, 42, 0.04);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .gest-card:hover {
    transform: translateY(-2px);
    border-color: #cbd5e1;
    box-shadow: 0 12px 30px -6px rgba(15, 23, 42, 0.08);
  }

  .gest-header-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 18px;
  }

  .gest-avatar {
    width: 50px;
    height: 50px;
    border-radius: 14px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    color: #0f172a;
    font-weight: 800;
  }

  .gest-info h3 {
    font-size: 1.15rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.3px;
    margin: 0 0 4px 0;
  }

  .gest-info p {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0;
  }

  .gest-meta-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f8fafc;
    border: 1px solid #eef2f6;
    border-radius: 12px;
    font-size: 0.8rem;
    color: #64748b;
    margin-bottom: 20px;
  }

  .gest-actions-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-top: 16px;
    border-top: 1px solid #f1f5f9;
  }

  /* =========================================================
     BIG VEHICLE CARDS SHOWCASE GRID
     ========================================================= */

  .fleet-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    gap: 28px;
    margin-bottom: 40px;
  }

  @media (max-width: 640px) {
    .fleet-cards-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  .vehicle-big-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.04);
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .vehicle-big-card:hover {
    transform: translateY(-3px);
    border-color: #cbd5e1;
    box-shadow: 0 16px 36px -8px rgba(15, 23, 42, 0.09);
  }

  /* Card Header Metadata Row */
  .card-top-meta {
    padding: 16px 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f5f9;
    background: #ffffff;
  }

  .card-meta-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .plate-chip {
    display: inline-block;
    background: #f1f5f9;
    color: #1e293b;
    padding: 4px 10px;
    border-radius: 6px;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
    font-weight: 700;
    font-size: 0.78rem;
    letter-spacing: 0.5px;
    border: 1px solid #e2e8f0;
  }

  .year-chip {
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
    background: #ffffff;
    padding: 3px 8px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
  }

  /* Status Pill - Refined Minimalist */
  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .status-available {
    background: #f0fdf4;
    color: #166534;
    border: 1px solid #dcfce7;
  }
  .status-available .status-dot { background: #16a34a; }

  .status-rented {
    background: #fffbeb;
    color: #92400e;
    border: 1px solid #fef3c7;
  }
  .status-rented .status-dot { background: #d97706; }

  .status-maintenance {
    background: #f8fafc;
    color: #475569;
    border: 1px solid #e2e8f0;
  }
  .status-maintenance .status-dot { background: #64748b; }

  /* Hero Stage & Car Image */
  .card-hero-stage {
    position: relative;
    width: 100%;
    height: 230px;
    background: #f8fafc;
    overflow: hidden;
  }

  .card-hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
  }

  .vehicle-big-card:hover .card-hero-image {
    transform: scale(1.025);
  }

  /* Floating Price Badge */
  .card-price-badge {
    position: absolute;
    bottom: 14px;
    right: 14px;
    background: rgba(15, 23, 42, 0.88);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 8px 14px;
    border-radius: 10px;
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  }

  .card-price-amount {
    font-size: 1.15rem;
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.3px;
  }

  .card-price-period {
    font-size: 0.72rem;
    font-weight: 600;
    color: #94a3b8;
    margin-left: 2px;
    text-transform: uppercase;
  }

  /* Card Body & Title */
  .card-body {
    padding: 22px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .card-category-kicker {
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #64748b;
    margin-bottom: 4px;
  }

  .card-vehicle-title {
    font-size: 1.3rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.4px;
    margin: 0 0 16px 0;
    line-height: 1.25;
  }

  /* 4-Cell Telemetry / Spec Matrix */
  .spec-matrix-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 12px 10px;
    gap: 8px;
    margin-bottom: 18px;
  }

  .spec-cell {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .spec-label {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #94a3b8;
    margin-bottom: 4px;
  }

  .spec-value {
    font-size: 0.84rem;
    font-weight: 700;
    color: #1e293b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Telemetry Status Line */
  .telemetry-status-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: #f8fafc;
    border-radius: 10px;
    font-size: 0.78rem;
    color: #475569;
    margin-bottom: 20px;
    border: 1px solid #eef2f6;
  }

  .telemetry-status-text {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
  }

  .telemetry-status-text strong {
    color: #0f172a;
  }

  /* Card Action Buttons */
  .card-actions-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid #f1f5f9;
  }

  .action-edit-btn {
    flex: 1;
    padding: 11px 16px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    color: #0f172a;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .action-edit-btn:hover {
    background: #f8fafc;
    border-color: #0f172a;
    color: #0f172a;
  }

  .action-delete-btn {
    padding: 11px 18px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    color: #64748b;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .action-delete-btn:hover:not(:disabled) {
    background: #fef2f2;
    border-color: #fecaca;
    color: #dc2626;
  }

  .action-delete-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    background: #f8fafc;
    border-color: #e2e8f0;
    color: #94a3b8;
  }

  /* Empty State & Loading State */
  .empty-fleet-container {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 80px 24px;
    text-align: center;
    color: #64748b;
    grid-column: 1 / -1;
  }

  .empty-fleet-icon {
    font-size: 2.8rem;
    margin-bottom: 14px;
    color: #0f172a;
  }

  .empty-fleet-container h3 {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0 0 8px 0;
  }

  .empty-fleet-container p {
    font-size: 0.88rem;
    color: #64748b;
    max-width: 420px;
    margin: 0 auto 20px auto;
  }

  .loading-fleet-container {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    padding: 60px 24px;
    text-align: center;
    font-size: 0.95rem;
    font-weight: 600;
    color: #64748b;
    grid-column: 1 / -1;
  }

  /* =========================================================
     MODAL WINDOWS - CLEAN EDITORIAL LIGHT MODE
     ========================================================= */

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.55);
    backdrop-filter: blur(6px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .modal-card {
    background: #ffffff;
    border-radius: 20px;
    width: 100%;
    max-width: 680px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.25);
    border: 1px solid #e2e8f0;
    padding: 28px 32px;
    position: relative;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f5f9;
  }

  .modal-header h2 {
    font-size: 1.35rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.4px;
    margin: 0;
  }

  .close-modal-btn {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    color: #64748b;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .close-modal-btn:hover {
    background: #0f172a;
    color: #ffffff;
    border-color: #0f172a;
  }

  .form-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  @media (max-width: 600px) {
    .form-grid-2 {
      grid-template-columns: 1fr;
    }
  }

  .form-group-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-group-item label {
    font-size: 0.8rem;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .form-group-item input,
  .form-group-item select {
    padding: 11px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    font-size: 0.88rem;
    background: #f8fafc;
    color: #0f172a;
    transition: all 0.2s ease;
  }

  .form-group-item input:focus,
  .form-group-item select:focus {
    outline: none;
    border-color: #0f172a;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
  }

  /* Image Upload Dropzone */
  .image-uploader-box {
    border: 2px dashed #cbd5e1;
    border-radius: 14px;
    padding: 22px;
    text-align: center;
    background: #f8fafc;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 16px;
    position: relative;
  }

  .image-uploader-box:hover {
    border-color: #0f172a;
    background: #f1f5f9;
  }

  .image-preview-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .preview-img {
    max-height: 150px;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
  }

  .remove-preview-btn {
    background: #ffffff;
    color: #dc2626;
    border: 1px solid #fecaca;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .remove-preview-btn:hover {
    background: #dc2626;
    color: #ffffff;
    border-color: #dc2626;
  }

  .preset-buttons-row {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
  }

  .preset-btn {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    color: #334155;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .preset-btn:hover {
    border-color: #0f172a;
    color: #0f172a;
    background: #f8fafc;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 18px;
    border-top: 1px solid #f1f5f9;
  }

  .cancel-btn {
    padding: 11px 20px;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    color: #475569;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .cancel-btn:hover {
    background: #f1f5f9;
    color: #0f172a;
  }

  .save-car-btn {
    padding: 11px 24px;
    background: #0f172a;
    border: none;
    color: #ffffff;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px -2px rgba(15, 23, 42, 0.25);
    transition: all 0.2s ease;
  }

  .save-car-btn:hover:not(:disabled) {
    background: #1e293b;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px -2px rgba(15, 23, 42, 0.3);
  }

  .save-car-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ISSUE_TEMPLATES = [
  {
    key: 'illegible',
    title: 'Illegible License Scan',
    desc: 'Image is blurred, dark, cut off, or low resolution',
    text: "Driver's license scan is blurred, cropped, or illegible. Please upload a clear, high-resolution photo or PDF scan (front and back visible)."
  },
  {
    key: 'expired',
    title: 'Expired License',
    desc: 'The license expiration date has already passed',
    text: "The driver's license expiration date provided has passed. Please upload your renewed valid driver's license to proceed."
  },
  {
    key: 'mismatch',
    title: 'Identity Mismatch',
    desc: 'Account name differs from the official license',
    text: "The legal name on your customer account does not match the driver's license credentials provided. Please correct your profile name or provide matching credentials."
  },
  {
    key: 'address',
    title: 'Address Verification',
    desc: 'Residential address is invalid or missing',
    text: "Please provide a complete residential address in your driver profile before the reservation can be approved."
  }
];

function AdminDashboard({ user, onLogout, onBackToFleet }) {
  const isAdmin = user?.role === 'admin';

  // Navigation Tab State (Default to 'reservations' so gestionnaires immediately inspect bookings!)
  const [activeTab, setActiveTab] = useState('reservations');

  // =========================================================
  // RESERVATIONS & VERIFICATION STATE
  // =========================================================
  const [reservations, setReservations] = useState([]);
  const [resLoading, setResLoading] = useState(false);
  const [resFilter, setResFilter] = useState('all');
  const [resSearch, setResSearch] = useState('');
  const [resCounts, setResCounts] = useState({ all: 0, pending: 0, confirmed: 0, rejected: 0, completed: 0 });
  const [selectedResForInspection, setSelectedResForInspection] = useState(null);
  const [issueModalRes, setIssueModalRes] = useState(null);
  const [issueMessageText, setIssueMessageText] = useState('');
  const [selectedReasonKey, setSelectedReasonKey] = useState('');
  const [statusActionLoading, setStatusActionLoading] = useState(false);

  // Fleet / Cars State
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [alert, setAlert] = useState(null);

  // Car Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentCarId, setCurrentCarId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Car Form Fields
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'Sports',
    license_plate: '',
    daily_rate: '',
    fuel_type: 'Petrol',
    transmission: 'Automatic',
    seating_capacity: 2,
    horsepower: '',
    status: 'available',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreset, setImagePreset] = useState('');
  const fileInputRef = useRef(null);

  // Delete Safeguard Modal State for Car
  const [carToDelete, setCarToDelete] = useState(null);

  // =========================================================
  // GESTIONNAIRES STAFF MANAGEMENT STATE (SUPER ADMIN)
  // =========================================================
  const [gestionnaires, setGestionnaires] = useState([]);
  const [loadingGestionnaires, setLoadingGestionnaires] = useState(false);
  const [gestSearch, setGestSearch] = useState('');
  const [isGestModalOpen, setIsGestModalOpen] = useState(false);
  const [gestModalMode, setGestModalMode] = useState('add');
  const [currentGestId, setCurrentGestId] = useState(null);
  const [gestSubmitting, setGestSubmitting] = useState(false);
  const [gestFormData, setGestFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [gestToDelete, setGestToDelete] = useState(null);

  useEffect(() => {
    loadFleet();
  }, [statusFilter, categoryFilter]);

  useEffect(() => {
    if (isAdmin) {
      loadGestionnaires();
    }
  }, [gestSearch]);

  const loadFleet = async () => {
    setLoading(true);
    try {
      const data = await getCars({
        status: statusFilter,
        category: categoryFilter,
        search: search.trim(),
      });
      setCars(data);
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Error loading cars.' });
    } finally {
      setLoading(false);
    }
  };

  const loadGestionnaires = async () => {
    if (!isAdmin) return;
    setLoadingGestionnaires(true);
    try {
      const data = await getGestionnaires({ search: gestSearch.trim() });
      setGestionnaires(data);
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Error loading gestionnaires.' });
    } finally {
      setLoadingGestionnaires(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, [resFilter]);

  const loadReservations = async () => {
    setResLoading(true);
    try {
      const res = await getReservations({
        status: resFilter !== 'all' ? resFilter : undefined,
        search: resSearch.trim() || undefined,
      });
      setReservations(res.data || []);
      if (res.counts) setResCounts(res.counts);
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Error loading reservations.' });
    } finally {
      setResLoading(false);
    }
  };

  const handleResSearchSubmit = (e) => {
    e.preventDefault();
    loadReservations();
  };

  const handleAcceptReservation = async (reservation) => {
    setStatusActionLoading(true);
    try {
      await updateReservationStatus(reservation.id, {
        status: 'confirmed',
        admin_message: 'Your driver credentials and booking dates have been verified and approved.',
      });
      setAlert({
        type: 'success',
        message: `Reservation #${reservation.id} confirmed! Vehicle ${reservation.car?.brand || ''} ${reservation.car?.model || ''} has been automatically switched to "Rented".`
      });
      setSelectedResForInspection(null);
      await loadReservations();
      await loadFleet();
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to accept reservation.' });
    } finally {
      setStatusActionLoading(false);
    }
  };

  const handleRejectReservation = async (e) => {
    e.preventDefault();
    if (!issueModalRes) return;
    setStatusActionLoading(true);
    try {
      await updateReservationStatus(issueModalRes.id, {
        status: 'rejected',
        admin_message: issueMessageText.trim() || 'Driver documentation or credentials issue detected. Please check credentials in your profile.',
      });
      setAlert({
        type: 'success',
        message: `Reservation #${issueModalRes.id} marked as Action Required. Feedback message dispatched to client.`
      });
      setIssueModalRes(null);
      setIssueMessageText('');
      setSelectedResForInspection(null);
      await loadReservations();
      await loadFleet();
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to report issue.' });
    } finally {
      setStatusActionLoading(false);
    }
  };

  const handleCompleteReservation = async (reservation) => {
    setStatusActionLoading(true);
    try {
      await updateReservationStatus(reservation.id, {
        status: 'completed',
        admin_message: 'Vehicle returned and checked in successfully.',
      });
      setAlert({
        type: 'success',
        message: `Rental #${reservation.id} completed! Vehicle ${reservation.car?.brand || ''} ${reservation.car?.model || ''} has been automatically returned to "Available".`
      });
      setSelectedResForInspection(null);
      await loadReservations();
      await loadFleet();
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to complete rental.' });
    } finally {
      setStatusActionLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadFleet();
  };

  const handleGestSearchSubmit = (e) => {
    e.preventDefault();
    loadGestionnaires();
  };

  // Car Modal Actions
  const handleOpenAdd = () => {
    setModalMode('add');
    setCurrentCarId(null);
    setFormData({
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      category: 'Sports',
      license_plate: '',
      daily_rate: '',
      fuel_type: 'Petrol',
      transmission: 'Automatic',
      seating_capacity: 2,
      horsepower: '',
      status: 'available',
    });
    setSelectedFile(null);
    setImagePreview(null);
    setImagePreset('/react/assets/luxury_coastal_car.jpg');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (car) => {
    setModalMode('edit');
    setCurrentCarId(car.id);
    setFormData({
      brand: car.brand || '',
      model: car.model || '',
      year: car.year || new Date().getFullYear(),
      category: car.category || 'Sports',
      license_plate: car.license_plate || '',
      daily_rate: car.daily_rate || '',
      fuel_type: car.fuel_type || 'Petrol',
      transmission: car.transmission || 'Automatic',
      seating_capacity: car.seating_capacity || 2,
      horsepower: car.horsepower || '',
      status: car.status || 'available',
    });
    setSelectedFile(null);
    setImagePreview(car.image || null);
    setImagePreset('');
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImagePreset('');
    }
  };

  const handleSelectPreset = (presetUrl) => {
    setSelectedFile(null);
    setImagePreview(presetUrl);
    setImagePreset(presetUrl);
  };

  const handleSaveCar = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAlert(null);

    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          payload.append(key, formData[key]);
        }
      });

      if (selectedFile) {
        payload.append('image', selectedFile);
      } else if (imagePreset) {
        payload.append('image_preset', imagePreset);
      }

      if (modalMode === 'add') {
        const res = await createCar(payload);
        setAlert({ type: 'success', message: res.message || 'Vehicle added to fleet successfully!' });
      } else {
        const res = await updateCar(currentCarId, payload);
        setAlert({ type: 'success', message: res.message || 'Vehicle updated successfully!' });
      }

      setIsModalOpen(false);
      loadFleet();
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to save vehicle.' });
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!carToDelete) return;

    if (carToDelete.status === 'rented') {
      setAlert({
        type: 'error',
        message: 'Action blocked: Cannot delete a car that is currently rented.',
      });
      setCarToDelete(null);
      return;
    }

    try {
      const res = await deleteCar(carToDelete.id);
      setAlert({ type: 'success', message: res.message || 'Car deleted successfully.' });
      setCarToDelete(null);
      loadFleet();
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Error deleting car.' });
      setCarToDelete(null);
    }
  };

  // =========================================================
  // GESTIONNAIRES HANDLERS (SUPER ADMIN)
  // =========================================================
  const handleOpenAddGest = () => {
    setGestModalMode('add');
    setCurrentGestId(null);
    setGestFormData({ name: '', email: '', password: '' });
    setIsGestModalOpen(true);
  };

  const handleOpenEditGest = (gest) => {
    setGestModalMode('edit');
    setCurrentGestId(gest.id);
    setGestFormData({ name: gest.name, email: gest.email, password: '' });
    setIsGestModalOpen(true);
  };

  const handleGestFormChange = (e) => {
    const { name, value } = e.target;
    setGestFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveGest = async (e) => {
    e.preventDefault();
    setGestSubmitting(true);
    setAlert(null);

    try {
      if (gestModalMode === 'add') {
        const res = await createGestionnaire(gestFormData);
        setAlert({ type: 'success', message: res.message || 'Gestionnaire account created successfully!' });
      } else {
        const res = await updateGestionnaire(currentGestId, gestFormData);
        setAlert({ type: 'success', message: res.message || 'Gestionnaire account updated successfully!' });
      }

      setIsGestModalOpen(false);
      loadGestionnaires();
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Failed to save gestionnaire account.' });
    } finally {
      setGestSubmitting(false);
    }
  };

  const confirmDeleteGest = async () => {
    if (!gestToDelete) return;
    try {
      const res = await deleteGestionnaire(gestToDelete.id);
      setAlert({ type: 'success', message: res.message || 'Gestionnaire account removed successfully.' });
      setGestToDelete(null);
      loadGestionnaires();
    } catch (err) {
      setAlert({ type: 'error', message: err.message || 'Error removing gestionnaire account.' });
      setGestToDelete(null);
    }
  };

  // Fleet Statistics
  const totalCount = cars.length;
  const availableCount = cars.filter((c) => c.status === 'available').length;
  const rentedCount = cars.filter((c) => c.status === 'rented').length;
  const maintenanceCount = cars.filter((c) => c.status === 'maintenance').length;

  return (
    <>
      <style>{adminDashboardStyles}</style>
      <div className="admin-hub">
        {/* Top Navigation Bar */}
        <header className="admin-nav">
          <div className="admin-brand">
            <div className="admin-brand-icon">
              <IconShield size={20} />
            </div>
            <div className="admin-title-group">
              <div className="admin-kicker">
                <span className="admin-kicker-dot"></span>
                <span>
                  {isAdmin
                    ? 'Super Admin Console • Executive Administration'
                    : 'Fleet Operations Console • Private Desk'}
                </span>
              </div>
              <h1>
                {activeTab === 'reservations'
                  ? 'Reservations & Driver Verification'
                  : activeTab === 'gestionnaires'
                  ? 'Staff & Gestionnaires Directory'
                  : 'Fleet Management Hub'}
              </h1>
            </div>
          </div>

          <div className="admin-user-profile">
            {onBackToFleet && (
              <button
                type="button"
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginRight: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onClick={onBackToFleet}
              >
                <IconArrowLeft size={13} />
                <span>Public Showcase</span>
              </button>
            )}
            <span className="admin-badge-pill">
              <span>{isAdmin ? 'Super Admin' : 'Gestionnaire'}</span>
              <span>•</span>
              <span>{user?.name || 'Administrator'}</span>
            </span>
            <button type="button" className="logout-pill-btn" onClick={onLogout}>
              Sign Out
            </button>
          </div>
        </header>

        {/* Global Feedback Alert */}
        {alert && (
          <div className={`admin-alert ${alert.type === 'error' ? 'admin-alert-error' : 'admin-alert-success'}`}>
            <span>{alert.type === 'error' ? 'Notice:' : 'Success:'} {alert.message}</span>
            <button
              type="button"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'inherit' }}
              onClick={() => setAlert(null)}
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab Switcher (Available to both Gestionnaires and Super Admin) */}
        <nav className="admin-tabs-nav">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('reservations');
              loadReservations();
            }}
          >
            <IconCalendar size={15} />
            <span>Reservations & Review</span>
            <span
              className="admin-tab-count"
              style={{
                background: resCounts.pending > 0 ? '#f59e0b' : undefined,
                color: resCounts.pending > 0 ? '#ffffff' : undefined,
              }}
            >
              {resCounts.pending > 0 ? `${resCounts.pending} Pending` : reservations.length}
            </span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'fleet' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('fleet');
              loadFleet();
            }}
          >
            <IconCar size={15} />
            <span>Fleet Inventory</span>
            <span className="admin-tab-count">{cars.length}</span>
          </button>

          {isAdmin && (
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === 'gestionnaires' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('gestionnaires');
                loadGestionnaires();
              }}
            >
              <IconStaff size={15} />
              <span>Staff & Gestionnaires</span>
              <span className="admin-tab-count">{gestionnaires.length}</span>
            </button>
          )}
        </nav>

        {/* =========================================================
            VIEW 0: RESERVATIONS & DRIVER VERIFICATION (GESTIONNAIRE & ADMIN)
            ========================================================= */}
        {activeTab === 'reservations' && (
          <div>
            {/* Metric Strip */}
            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-header">
                  <h3>Total Bookings</h3>
                  <span className="stat-indicator-dot dot-total"></span>
                </div>
                <div className="stat-number">{String(reservations.length).padStart(2, '0')}</div>
                <div className="stat-subtext">All Lifetime Records</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <h3>Pending Review</h3>
                  <span className="stat-indicator-dot" style={{ background: '#f59e0b' }}></span>
                </div>
                <div className="stat-number" style={{ color: resCounts.pending > 0 ? '#b45309' : '#0f172a' }}>
                  {String(resCounts.pending).padStart(2, '0')}
                </div>
                <div className="stat-subtext">Awaiting Document Check</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <h3>Active Chartered</h3>
                  <span className="stat-indicator-dot dot-available"></span>
                </div>
                <div className="stat-number" style={{ color: '#059669' }}>
                  {String(resCounts.confirmed).padStart(2, '0')}
                </div>
                <div className="stat-subtext">Vehicles Out on Rental</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <h3>Action Required</h3>
                  <span className="stat-indicator-dot dot-maintenance"></span>
                </div>
                <div className="stat-number" style={{ color: resCounts.rejected > 0 ? '#dc2626' : '#0f172a' }}>
                  {String(resCounts.rejected).padStart(2, '0')}
                </div>
                <div className="stat-subtext">Flagged / Issue Reported</div>
              </div>
            </section>

            {/* Filter Pills & Search Strip */}
            <section className="toolbar-card" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                <div className="res-filter-strip" style={{ marginBottom: 0 }}>
                  <button
                    type="button"
                    className={`res-filter-pill ${resFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setResFilter('all')}
                  >
                    All Bookings ({reservations.length})
                  </button>
                  <button
                    type="button"
                    className={`res-filter-pill ${resFilter === 'pending' ? 'active' : ''}`}
                    onClick={() => setResFilter('pending')}
                  >
                    Pending Review ({resCounts.pending})
                  </button>
                  <button
                    type="button"
                    className={`res-filter-pill ${resFilter === 'confirmed' ? 'active' : ''}`}
                    onClick={() => setResFilter('confirmed')}
                  >
                    Confirmed &amp; Active ({resCounts.confirmed})
                  </button>
                  <button
                    type="button"
                    className={`res-filter-pill ${resFilter === 'rejected' ? 'active' : ''}`}
                    onClick={() => setResFilter('rejected')}
                  >
                    Issues Flagged ({resCounts.rejected})
                  </button>
                  <button
                    type="button"
                    className={`res-filter-pill ${resFilter === 'completed' ? 'active' : ''}`}
                    onClick={() => setResFilter('completed')}
                  >
                    Completed ({resCounts.completed})
                  </button>
                </div>

                <form onSubmit={handleResSearchSubmit} className="search-input-wrap" style={{ minWidth: '300px' }}>
                  <span className="search-icon"><IconSearch size={15} /></span>
                  <input
                    type="text"
                    placeholder="Search client, plate, or vehicle..."
                    value={resSearch}
                    onChange={(e) => setResSearch(e.target.value)}
                  />
                </form>
              </div>
            </section>

            {/* Reservations Table */}
            <div className="fleet-table-container">
              {resLoading ? (
                <div className="loading-fleet-container">
                  Loading reservations and telemetry records...
                </div>
              ) : reservations.length === 0 ? (
                <div className="empty-fleet-container">
                  <div className="empty-fleet-icon"><IconCalendar size={28} /></div>
                  <h3>No Reservations Found</h3>
                  <p>When clients reserve vehicles on the public fleet storefront, their bookings and driver license credentials appear here for verification.</p>
                </div>
              ) : (
                <table className="fleet-table">
                  <thead>
                    <tr>
                      <th>Client / Driver</th>
                      <th>Reserved Vehicle</th>
                      <th>Rental Dates</th>
                      <th>Total Amount</th>
                      <th>Review Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res) => {
                      const car = res.car || {};
                      const isPending = res.status === 'pending';
                      const isConfirmed = res.status === 'confirmed';
                      const isRejected = res.status === 'rejected';
                      const isCompleted = res.status === 'completed';

                      return (
                        <tr key={res.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{
                                width: 38,
                                height: 38,
                                borderRadius: '50%',
                                background: '#0f172a',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '0.9rem',
                                overflow: 'hidden'
                              }}>
                                {res.driver_avatar ? (
                                  <img src={res.driver_avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                  (res.driver_name || 'U').charAt(0).toUpperCase()
                                )}
                              </div>
                              <div>
                                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>
                                  {res.driver_name || 'Customer'}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                                  {res.driver_email || 'No email'} • {res.driver_phone || 'No phone'}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              {car.image && (
                                <img
                                  src={car.image}
                                  alt=""
                                  style={{ width: 44, height: 30, objectFit: 'cover', borderRadius: 6, border: '1px solid #e2e8f0' }}
                                />
                              )}
                              <div>
                                <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>
                                  {car.brand || 'Vehicle'} {car.model || ''}
                                </div>
                                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                                  Plate: <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{car.license_plate || 'VIP-FLEET'}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0f172a' }}>
                              {String(res.start_date).split('T')[0]} → {String(res.end_date).split('T')[0]}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                              {res.pickup_location || 'Showroom Agency'}
                            </div>
                          </td>

                          <td>
                            <div style={{ fontWeight: 800, color: '#0f172a', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem' }}>
                              ${Number(res.total_price).toFixed(2)}
                            </div>
                          </td>

                          <td>
                            {isPending && <span className="badge-res-pending">● Pending Review</span>}
                            {isConfirmed && <span className="badge-res-confirmed">✓ Confirmed (Rented)</span>}
                            {isRejected && <span className="badge-res-rejected">✕ Action Required</span>}
                            {isCompleted && <span className="badge-res-completed">○ Completed</span>}
                          </td>

                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                              <button
                                type="button"
                                className="btn-action-inspect"
                                onClick={() => setSelectedResForInspection(res)}
                              >
                                Inspect
                              </button>

                              {isPending && (
                                <>
                                  <button
                                    type="button"
                                    className="btn-action-accept"
                                    title="Accept & Confirm (Automatically switches car to Rented)"
                                    disabled={statusActionLoading}
                                    onClick={() => handleAcceptReservation(res)}
                                  >
                                    Accept
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-action-reject"
                                    title="Report documentation issue or reject"
                                    disabled={statusActionLoading}
                                    onClick={() => {
                                      setIssueModalRes(res);
                                      setIssueMessageText('');
                                    }}
                                  >
                                    Report Issue
                                  </button>
                                </>
                              )}

                              {isConfirmed && (
                                <button
                                  type="button"
                                  style={{
                                    background: '#f8fafc',
                                    border: '1px solid #cbd5e1',
                                    color: '#0f172a',
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                  disabled={statusActionLoading}
                                  onClick={() => handleCompleteReservation(res)}
                                  title="Check-in vehicle and return to available"
                                >
                                  Return Car
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            VIEW 1: GESTIONNAIRES MANAGEMENT (SUPER ADMIN ONLY)
            ========================================================= */}
        {isAdmin && activeTab === 'gestionnaires' && (
          <div>
            {/* Toolbar for Gestionnaires */}
            <section className="toolbar-card">
              <div className="filter-group">
                <form onSubmit={handleGestSearchSubmit} className="search-input-wrap">
                  <span className="search-icon"><IconSearch size={15} /></span>
                  <input
                    type="text"
                    placeholder="Search staff by name or email..."
                    value={gestSearch}
                    onChange={(e) => setGestSearch(e.target.value)}
                  />
                </form>
              </div>

              <button type="button" className="add-car-btn" onClick={handleOpenAddGest}>
                <span>+ Add New Gestionnaire</span>
              </button>
            </section>

            {/* Gestionnaires Grid */}
            <div className="gestionnaires-grid">
              {loadingGestionnaires ? (
                <div className="loading-fleet-container">
                  Loading gestionnaires staff directory...
                </div>
              ) : gestionnaires.length === 0 ? (
                <div className="empty-fleet-container">
                  <div className="empty-fleet-icon"><IconStaff size={28} /></div>
                  <h3>No Gestionnaires Registered</h3>
                  <p>Create dedicated gestionnaire staff accounts to delegate vehicle management and fleet CRUD operations.</p>
                  <button type="button" className="add-car-btn" onClick={handleOpenAddGest} style={{ margin: '0 auto' }}>
                    <span>+ Add First Gestionnaire</span>
                  </button>
                </div>
              ) : (
                gestionnaires.map((gest) => (
                  <div key={gest.id} className="gest-card">
                    <div>
                      <div className="gest-header-row">
                        <div className="gest-avatar">
                          <span>{gest.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="gest-info">
                          <h3>{gest.name}</h3>
                          <p>{gest.email}</p>
                        </div>
                      </div>

                      <div className="gest-meta-box">
                        <span>Role: <strong>Gestionnaire Flotte</strong></span>
                        <span>ID #{gest.id}</span>
                      </div>
                    </div>

                    <div className="gest-actions-row">
                      <button
                        type="button"
                        className="action-edit-btn"
                        onClick={() => handleOpenEditGest(gest)}
                      >
                        <IconEdit size={13} />
                        <span>Edit Staff</span>
                      </button>
                      <button
                        type="button"
                        className="action-delete-btn"
                        onClick={() => setGestToDelete(gest)}
                      >
                        <IconTrash size={13} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            VIEW 2: FLEET MANAGEMENT (GESTIONNAIRE & SUPER ADMIN)
            ========================================================= */}
        {activeTab === 'fleet' && (
          <div>
            {/* Fleet Metrics Strip */}
            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-header">
                  <h3>Total Fleet</h3>
                  <span className="stat-indicator-dot dot-total"></span>
                </div>
                <div className="stat-number">{String(totalCount).padStart(2, '0')}</div>
                <div className="stat-subtext">Registered Vehicles</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <h3>Available</h3>
                  <span className="stat-indicator-dot dot-available"></span>
                </div>
                <div className="stat-number">{String(availableCount).padStart(2, '0')}</div>
                <div className="stat-subtext">Immediate Dispatch</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <h3>Chartered</h3>
                  <span className="stat-indicator-dot dot-rented"></span>
                </div>
                <div className="stat-number">{String(rentedCount).padStart(2, '0')}</div>
                <div className="stat-subtext">Active Client Bookings</div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <h3>In Service</h3>
                  <span className="stat-indicator-dot dot-maintenance"></span>
                </div>
                <div className="stat-number">{String(maintenanceCount).padStart(2, '0')}</div>
                <div className="stat-subtext">Atelier / Inspection</div>
              </div>
            </section>

            {/* Toolbar & Filter Bar */}
            <section className="toolbar-card">
              <div className="filter-group">
                <form onSubmit={handleSearchSubmit} className="search-input-wrap">
                  <span className="search-icon"><IconSearch size={15} /></span>
                  <input
                    type="text"
                    placeholder="Search marque, model, plate (e.g. Porsche 911, M4)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>

                <select
                  className="select-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="available">● Available</option>
                  <option value="rented">● Chartered / Rented</option>
                  <option value="maintenance">● In Service</option>
                </select>

                <select
                  className="select-filter"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Sports">Sports</option>
                  <option value="Electric">Electric</option>
                  <option value="Luxury Sedan">Luxury Sedan</option>
                  <option value="SUV">SUV</option>
                </select>
              </div>

              <button type="button" className="add-car-btn" onClick={handleOpenAdd}>
                <span>+ Add New Vehicle</span>
              </button>
            </section>

            {/* Big Vehicle Cards Showcase */}
            <div className="fleet-cards-grid">
              {loading ? (
                <div className="loading-fleet-container">
                  Loading fleet telemetry and vehicles...
                </div>
              ) : cars.length === 0 ? (
                <div className="empty-fleet-container">
                  <div className="empty-fleet-icon"><IconCar size={28} /></div>
                  <h3>No Vehicles In Fleet</h3>
                  <p>No vehicles match your active search or filters. Click &quot;+ Add New Vehicle&quot; to expand your fleet catalog.</p>
                  <button type="button" className="add-car-btn" onClick={handleOpenAdd} style={{ margin: '0 auto' }}>
                    <span>+ Add First Vehicle</span>
                  </button>
                </div>
              ) : (
                cars.map((car) => {
                  const isRented = car.status === 'rented';
                  const formattedRate = parseFloat(car.daily_rate || 0).toFixed(0);

                  return (
                    <div key={car.id} className="vehicle-big-card">
                      {/* Card Top Metadata Bar */}
                      <div className="card-top-meta">
                        <div className="card-meta-left">
                          <span className="plate-chip">{car.license_plate}</span>
                          <span className="year-chip">MY {car.year}</span>
                        </div>

                        <span className={`status-pill status-${car.status}`}>
                          <span className="status-dot"></span>
                          <span>{car.status === 'rented' ? 'Chartered' : car.status}</span>
                        </span>
                      </div>

                      {/* Hero Widescreen Vehicle Image Stage */}
                      <div className="card-hero-stage">
                        <img
                          src={car.image || defaultCarBg}
                          alt={`${car.brand} ${car.model}`}
                          className="card-hero-image"
                          onError={(e) => {
                            e.target.src = defaultCarBg;
                          }}
                        />
                        <div className="card-price-badge">
                          <span className="card-price-amount">${formattedRate}</span>
                          <span className="card-price-period">/ day</span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="card-body">
                        <div className="card-category-kicker">
                          {car.category} • {car.brand}
                        </div>

                        <h2 className="card-vehicle-title">
                          {car.brand} {car.model}
                        </h2>

                        {/* 4-Cell Telemetry / Spec Matrix */}
                        <div className="spec-matrix-grid">
                          <div className="spec-cell">
                            <span className="spec-label">Output</span>
                            <span className="spec-value">{car.horsepower ? `${car.horsepower} HP` : '—'}</span>
                          </div>
                          <div className="spec-cell">
                            <span className="spec-label">Drive</span>
                            <span className="spec-value">{car.transmission || 'Auto'}</span>
                          </div>
                          <div className="spec-cell">
                            <span className="spec-label">Cockpit</span>
                            <span className="spec-value">{car.seating_capacity || 2} Seats</span>
                          </div>
                          <div className="spec-cell">
                            <span className="spec-label">Fuel</span>
                            <span className="spec-value">{car.fuel_type || 'Petrol'}</span>
                          </div>
                        </div>

                        {/* Operational Telemetry Line */}
                        <div className="telemetry-status-row">
                          <span className="telemetry-status-text">
                            <span>●</span>
                            <span>
                              {car.status === 'available' && <>Status: <strong>Ready for Dispatch</strong></>}
                              {car.status === 'rented' && <>Status: <strong>Active Client Charter</strong></>}
                              {car.status === 'maintenance' && <>Status: <strong>In Atelier Inspection</strong></>}
                            </span>
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                            ID #{car.id}
                          </span>
                        </div>

                        {/* Card Actions */}
                        <div className="card-actions-row">
                          <button
                            type="button"
                            className="action-edit-btn"
                            onClick={() => handleOpenEdit(car)}
                          >
                            <IconEdit size={13} />
                            <span>Edit Specs</span>
                          </button>

                          <button
                            type="button"
                            className="action-delete-btn"
                            disabled={isRented}
                            title={isRented ? 'Cannot delete rented vehicle' : 'Remove vehicle from fleet'}
                            onClick={() => setCarToDelete(car)}
                          >
                            {isRented ? <IconLock size={13} /> : <IconTrash size={13} />}
                            <span>{isRented ? 'Locked' : 'Remove'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            MODAL: ADD / EDIT GESTIONNAIRE (SUPER ADMIN)
            ========================================================= */}
        {isGestModalOpen && (
          <div className="modal-overlay" onClick={() => setIsGestModalOpen(false)}>
            <div className="modal-card" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{gestModalMode === 'add' ? 'Create Gestionnaire Account' : `Edit ${gestFormData.name}`}</h2>
                <button type="button" className="close-modal-btn" onClick={() => setIsGestModalOpen(false)}>
                  <IconClose size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveGest}>
                <div className="form-group-item" style={{ marginBottom: '16px' }}>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Alexandre Moreau"
                    value={gestFormData.name}
                    onChange={handleGestFormChange}
                    required
                  />
                </div>

                <div className="form-group-item" style={{ marginBottom: '16px' }}>
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. operations@prestige-motors.com"
                    value={gestFormData.email}
                    onChange={handleGestFormChange}
                    required
                  />
                </div>

                <div className="form-group-item" style={{ marginBottom: '20px' }}>
                  <label>{gestModalMode === 'add' ? 'Password *' : 'New Password (Leave blank to keep unchanged)'}</label>
                  <input
                    type="password"
                    name="password"
                    placeholder={gestModalMode === 'add' ? 'Minimum 6 characters' : 'Enter new password'}
                    value={gestFormData.password}
                    onChange={handleGestFormChange}
                    required={gestModalMode === 'add'}
                    minLength={6}
                  />
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setIsGestModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-car-btn" disabled={gestSubmitting}>
                    {gestSubmitting ? 'Saving...' : gestModalMode === 'add' ? 'Create Gestionnaire' : 'Update Credentials'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: DELETE GESTIONNAIRE SAFEGUARD (SUPER ADMIN) */}
        {gestToDelete && (
          <div className="modal-overlay" onClick={() => setGestToDelete(null)}>
            <div className="modal-card" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', color: '#d97706' }}>
                  <IconAlert size={34} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Remove Gestionnaire?
                </h2>
                <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.6 }}>
                  Are you sure you want to deactivate <strong style={{ color: '#0f172a' }}>{gestToDelete.name}</strong> ({gestToDelete.email})? They will no longer have access to manage the fleet.
                </p>
              </div>

              <div className="modal-actions" style={{ justifyContent: 'center' }}>
                <button type="button" className="cancel-btn" onClick={() => setGestToDelete(null)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="action-delete-btn"
                  style={{
                    padding: '11px 22px',
                    background: '#dc2626',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                  }}
                  onClick={confirmDeleteGest}
                >
                  Confirm Removal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            MODAL: ADD / EDIT CAR
            ========================================================= */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{modalMode === 'add' ? 'Add Vehicle to Fleet' : `Edit ${formData.brand} ${formData.model}`}</h2>
                <button type="button" className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveCar}>
                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label>Brand *</label>
                    <input
                      type="text"
                      name="brand"
                      placeholder="e.g. Porsche, Ferrari, Aston Martin"
                      value={formData.brand}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group-item">
                    <label>Model *</label>
                    <input
                      type="text"
                      name="model"
                      placeholder="e.g. 911 GT3 RS, Roma, DBS Superleggera"
                      value={formData.model}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label>Model Year *</label>
                    <input
                      type="number"
                      name="year"
                      min="1980"
                      max={new Date().getFullYear() + 2}
                      value={formData.year}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group-item">
                    <label>Category *</label>
                    <select name="category" value={formData.category} onChange={handleFormChange}>
                      <option value="Sports">Sports</option>
                      <option value="Electric">Electric</option>
                      <option value="Luxury Sedan">Luxury Sedan</option>
                      <option value="SUV">SUV</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label>License Plate (Unique) *</label>
                    <input
                      type="text"
                      name="license_plate"
                      placeholder="e.g. VD-911-RS"
                      value={formData.license_plate}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group-item">
                    <label>Daily Rental Rate ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      name="daily_rate"
                      placeholder="e.g. 1,450.00"
                      value={formData.daily_rate}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label>Transmission *</label>
                    <select name="transmission" value={formData.transmission} onChange={handleFormChange}>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                  <div className="form-group-item">
                    <label>Fuel Type *</label>
                    <select name="fuel_type" value={formData.fuel_type} onChange={handleFormChange}>
                      <option value="Petrol">Petrol</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Diesel">Diesel</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label>Seats *</label>
                    <input
                      type="number"
                      name="seating_capacity"
                      min="1"
                      max="12"
                      value={formData.seating_capacity}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className="form-group-item">
                    <label>Horsepower (HP)</label>
                    <input
                      type="number"
                      name="horsepower"
                      placeholder="e.g. 640"
                      value={formData.horsepower}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="form-group-item" style={{ marginBottom: '18px' }}>
                  <label>Availability Status</label>
                  <select name="status" value={formData.status} onChange={handleFormChange}>
                    <option value="available">● Available for Dispatch</option>
                    <option value="rented">● Currently Chartered / Rented</option>
                    <option value="maintenance">● In Atelier / Maintenance</option>
                  </select>
                </div>

                <div className="form-group-item">
                  <label>Vehicle Presentation Image</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />

                  <div
                    className="image-uploader-box"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    {imagePreview ? (
                      <div className="image-preview-wrap" onClick={(e) => e.stopPropagation()}>
                        <img src={imagePreview} alt="Preview" className="preview-img" />
                        <button
                          type="button"
                          className="remove-preview-btn"
                          onClick={() => {
                            setSelectedFile(null);
                            setImagePreview(null);
                            setImagePreset('');
                          }}
                        >
                          ✕ Remove Image
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', color: '#64748b' }}>
                          <IconCamera size={26} />
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                          Upload high-resolution vehicle photo
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '3px' }}>
                          Supports JPEG, PNG, WEBP.
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="preset-buttons-row">
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Presets:</span>
                    <button
                      type="button"
                      className="preset-btn"
                      onClick={() => handleSelectPreset('/react/assets/luxury_coastal_car.jpg')}
                    >
                      Taycan Blue
                    </button>
                    <button
                      type="button"
                      className="preset-btn"
                      onClick={() => handleSelectPreset('/react/assets/car.jpeg')}
                    >
                      GT3 RS Red
                    </button>
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="save-car-btn" disabled={submitting}>
                    {submitting ? 'Saving Vehicle...' : modalMode === 'add' ? 'Add to Fleet' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: DELETE CAR SAFEGUARD */}
        {carToDelete && (
          <div className="modal-overlay" onClick={() => setCarToDelete(null)}>
            <div className="modal-card" style={{ maxWidth: '460px' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', color: '#dc2626' }}>
                  <IconAlert size={34} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Remove {carToDelete.brand} {carToDelete.model}?
                </h2>
                <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.6 }}>
                  Are you sure you want to remove vehicle with license plate <strong style={{ color: '#0f172a' }}>{carToDelete.license_plate}</strong> from the fleet? This action cannot be reversed.
                </p>

                {carToDelete.status === 'rented' && (
                  <div
                    style={{
                      background: '#fef2f2',
                      border: '1px solid #fee2e2',
                      color: '#dc2626',
                      padding: '12px',
                      borderRadius: '10px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      marginTop: '14px',
                    }}
                  >
                    Action Blocked: This vehicle is currently chartered by a client and cannot be removed.
                  </div>
                )}
              </div>

              <div className="modal-actions" style={{ justifyContent: 'center' }}>
                <button type="button" className="cancel-btn" onClick={() => setCarToDelete(null)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="action-delete-btn"
                  style={{
                    padding: '11px 22px',
                    background: carToDelete.status === 'rented' ? '#f1f5f9' : '#dc2626',
                    color: carToDelete.status === 'rented' ? '#94a3b8' : '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                  }}
                  disabled={carToDelete.status === 'rented'}
                  onClick={confirmDelete}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: INSPECT RESERVATION & DRIVER DOCUMENTS */}
        {selectedResForInspection && (
          <div className="modal-overlay" onClick={() => setSelectedResForInspection(null)}>
            <div className="modal-card" style={{ maxWidth: '780px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                    Inspect Reservation #{selectedResForInspection.id}
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                    Submitted on {new Date(selectedResForInspection.created_at || Date.now()).toLocaleDateString()} • Status: <strong style={{ textTransform: 'uppercase' }}>{selectedResForInspection.status}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setSelectedResForInspection(null)}
                >
                  <IconClose size={16} />
                </button>
              </div>

              {/* Client & Driver Credentials */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748b', marginBottom: '12px' }}>
                  Driver Identification &amp; Contact
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      background: '#0f172a',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '2rem',
                      overflow: 'hidden',
                      border: '2px solid #e2e8f0',
                      margin: '0 auto'
                    }}>
                      {selectedResForInspection.driver_avatar ? (
                        <img src={selectedResForInspection.driver_avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        (selectedResForInspection.driver_name || 'U').charAt(0).toUpperCase()
                      )}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px', display: 'block', fontWeight: 600 }}>Profile Photo</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Legal Name</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>{selectedResForInspection.driver_name || 'Not provided'}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Email Address</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>{selectedResForInspection.driver_email || 'Not provided'}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Phone / WhatsApp</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>{selectedResForInspection.driver_phone || 'Not provided'}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>National ID / Passport</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>{selectedResForInspection.driver_national_id || 'Not provided'}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Driver License Ref</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>{selectedResForInspection.driver_license_number || 'Not provided'}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>License Expiry Date</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>{selectedResForInspection.driver_license_expiry ? String(selectedResForInspection.driver_license_expiry).split('T')[0] : '2029-08-15'}</div>
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Residential Address</span>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0f172a' }}>{selectedResForInspection.driver_address || 'Not provided'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Uploaded Driver's License Document Scan Preview */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748b', marginBottom: '12px' }}>
                  Driver&apos;s License Document Scan Verification
                </h4>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px', textAlign: 'center' }}>
                  {selectedResForInspection.driver_license_doc ? (
                    <div>
                      {selectedResForInspection.driver_license_doc.startsWith('data:image') || selectedResForInspection.driver_license_doc.includes('.jpg') || selectedResForInspection.driver_license_doc.includes('.png') ? (
                        <div>
                          <img
                            src={selectedResForInspection.driver_license_doc}
                            alt="Driver License Document Scan"
                            style={{ maxHeight: '280px', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}
                          />
                          <div style={{ marginTop: '10px' }}>
                            <a
                              href={selectedResForInspection.driver_license_doc}
                              target="_blank"
                              rel="noreferrer"
                              style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 700, textDecoration: 'underline' }}
                            >
                              Open Full Resolution Scan in New Tab
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '24px' }}>
                          <IconFile size={32} color="#059669" />
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontWeight: 800, color: '#0f172a' }}>Driver_License_Verified_Scan.pdf</div>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Digital PDF Document Uploaded by Client</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{ padding: '20px', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.88rem', fontWeight: 600 }}>
                      <IconAlert size={20} color="#d97706" />
                      <span>No document file scan attached by customer.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Reserved Vehicle & Dates */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748b', marginBottom: '12px' }}>
                  Vehicle &amp; Rental Schedule
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {selectedResForInspection.car?.image && (
                      <img
                        src={selectedResForInspection.car.image}
                        alt=""
                        style={{ width: 80, height: 54, objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      />
                    )}
                    <div>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>
                        {selectedResForInspection.car?.brand} {selectedResForInspection.car?.model}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        Plate: <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{selectedResForInspection.car?.license_plate || 'VIP-FLEET'}</span> • Status: <strong>{selectedResForInspection.car?.status}</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                      {String(selectedResForInspection.start_date).split('T')[0]} → {String(selectedResForInspection.end_date).split('T')[0]}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '3px' }}>
                      Pickup: {selectedResForInspection.pickup_location || 'Showroom Agency'}
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', fontFamily: 'Space Grotesk, sans-serif', marginTop: '6px' }}>
                      ${Number(selectedResForInspection.total_price).toFixed(2)} Total
                    </div>
                  </div>
                </div>
              </div>

              {/* Existing Message / Notice */}
              {selectedResForInspection.admin_message && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '14px 18px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#b91c1c', marginBottom: '4px' }}>
                    Concierge Notice Dispatched to Client:
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#991b1b' }}>{selectedResForInspection.admin_message}</div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="modal-actions" style={{ justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '18px' }}>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setSelectedResForInspection(null)}
                >
                  Close Inspection
                </button>

                <div style={{ display: 'flex', gap: '10px' }}>
                  {selectedResForInspection.status === 'pending' && (
                    <>
                      <button
                        type="button"
                        className="btn-action-reject"
                        style={{ padding: '10px 18px', fontSize: '0.86rem' }}
                        disabled={statusActionLoading}
                        onClick={() => {
                          setIssueModalRes(selectedResForInspection);
                          setIssueMessageText('');
                        }}
                      >
                        Report Issue / Reject
                      </button>

                      <button
                        type="button"
                        className="btn-action-accept"
                        style={{ padding: '10px 22px', fontSize: '0.86rem', background: '#0f172a', color: '#ffffff', border: 'none' }}
                        disabled={statusActionLoading}
                        onClick={() => handleAcceptReservation(selectedResForInspection)}
                      >
                        {statusActionLoading ? 'Confirming...' : 'Accept & Set Car to Rented'}
                      </button>
                    </>
                  )}

                  {selectedResForInspection.status === 'confirmed' && (
                    <button
                      type="button"
                      style={{
                        background: '#0f172a',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px 22px',
                        borderRadius: '10px',
                        fontSize: '0.86rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                      disabled={statusActionLoading}
                      onClick={() => handleCompleteReservation(selectedResForInspection)}
                    >
                      {statusActionLoading ? 'Checking In...' : 'Check-In & Return Car to Available'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: REPORT ISSUE / REJECT MESSAGE COMPOSER */}
        {issueModalRes && (
          <div className="modal-overlay" onClick={() => { setIssueModalRes(null); setSelectedReasonKey(''); }}>
            <div className="issue-modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="issue-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div className="issue-badge-icon">
                    <IconAlert size={22} color="#dc2626" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px', margin: 0 }}>
                      Flag Document Issue
                    </h2>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                      Reservation #{issueModalRes.id} • Dispatched to Client Hub
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => { setIssueModalRes(null); setSelectedReasonKey(''); }}
                >
                  <IconClose size={16} />
                </button>
              </div>

              {/* Client & Booking Context Banner */}
              <div className="issue-context-strip">
                <div>
                  <strong style={{ color: '#0f172a' }}>Driver:</strong> {issueModalRes.driver_name || 'Customer'}
                </div>
                <div>
                  <strong style={{ color: '#0f172a' }}>Vehicle:</strong> {issueModalRes.car?.brand} {issueModalRes.car?.model}
                </div>
                <div>
                  <strong style={{ color: '#0f172a' }}>Dates:</strong> {String(issueModalRes.start_date).split('T')[0]} → {String(issueModalRes.end_date).split('T')[0]}
                </div>
              </div>

              <form onSubmit={handleRejectReservation}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                    Select Issue Reason (Quick Template)
                  </label>
                  <div className="issue-preset-grid">
                    {ISSUE_TEMPLATES.map((tpl) => (
                      <div
                        key={tpl.key}
                        className={`issue-preset-card ${selectedReasonKey === tpl.key ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedReasonKey(tpl.key);
                          setIssueMessageText(tpl.text);
                        }}
                      >
                        <div className="issue-preset-title">
                          <span style={{ color: selectedReasonKey === tpl.key ? '#0f172a' : '#94a3b8' }}>●</span>
                          <span>{tpl.title}</span>
                        </div>
                        <div className="issue-preset-desc">{tpl.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '8px' }}>
                  <label className="form-label" style={{ fontWeight: 700, color: '#0f172a' }}>
                    Feedback Message Dispatched to Client *
                  </label>
                  <textarea
                    rows="4"
                    required
                    className="issue-textarea"
                    placeholder="Describe the issue with documents or dates clearly so the client knows what to update..."
                    value={issueMessageText}
                    onChange={(e) => setIssueMessageText(e.target.value)}
                  />
                </div>

                <div className="issue-helper-box">
                  <IconShield size={16} color="#1d4ed8" />
                  <span>
                    The client will see this exact notice in their Driver Hub and can update their profile and documents directly.
                  </span>
                </div>

                <div className="modal-actions" style={{ marginTop: '12px' }}>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => { setIssueModalRes(null); setSelectedReasonKey(''); }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="action-delete-btn"
                    style={{ padding: '11px 24px', border: 'none', fontWeight: 700, background: '#0f172a', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    disabled={statusActionLoading}
                  >
                    <IconAlert size={15} color="#ffffff" />
                    <span>{statusActionLoading ? 'Dispatching Notice...' : 'Send Notice & Flag Reservation'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
