import { useState, useEffect, useMemo } from 'react';
import { getCars } from '../db';
import defaultCarBg from '../assets/luxury_coastal_car.jpg';

const showcaseStyles = `
  /* =========================================================
     LUXURY SHOWCASE & PUBLIC FLEET CATALOG STYLING
     Editorial, ultra-clean automotive typography & glass aesthetics
     ========================================================= */

  :root {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --accent: #4f46e5;
    --slate-900: #0f172a;
    --slate-800: #1e293b;
    --slate-700: #334155;
    --slate-600: #475569;
    --slate-500: #64748b;
    --slate-400: #94a3b8;
    --slate-200: #e2e8f0;
    --slate-100: #f1f5f9;
    --slate-50: #f8fafc;
    --emerald: #10b981;
    --amber: #f59e0b;
    --card-shadow: 0 12px 32px -4px rgba(15, 23, 42, 0.06), 0 4px 12px -2px rgba(15, 23, 42, 0.03);
    --card-shadow-hover: 0 24px 48px -8px rgba(15, 23, 42, 0.12), 0 8px 20px -4px rgba(15, 23, 42, 0.05);
  }

  .showcase-wrapper {
    min-height: 100vh;
    background: #f8fafc;
    color: var(--slate-900);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ================= TOP NAVIGATION ================= */
  .public-navbar {
    position: sticky;
    top: 0;
    z-index: 60;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--slate-200);
    transition: all 0.25s ease;
  }

  .nav-inner {
    max-width: 1360px;
    margin: 0 auto;
    padding: 16px 24px;
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
    background: linear-gradient(135deg, var(--slate-900), #1e293b);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 1.25rem;
    box-shadow: 0 8px 20px -4px rgba(15, 23, 42, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .brand-titles {
    display: flex;
    flex-direction: column;
  }

  .brand-name {
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: var(--slate-900);
    line-height: 1.15;
  }

  .brand-name span {
    color: var(--primary);
  }

  .brand-tagline {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--slate-500);
  }

  .nav-center-links {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-link-btn {
    background: transparent;
    border: none;
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--slate-600);
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .nav-link-btn:hover {
    color: var(--slate-900);
    background: var(--slate-100);
  }

  .nav-link-btn.active {
    color: var(--primary);
    background: rgba(37, 99, 235, 0.08);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .btn-ghost-signin {
    background: transparent;
    border: 1px solid var(--slate-200);
    padding: 9px 18px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--slate-700);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-ghost-signin:hover {
    background: var(--slate-100);
    color: var(--slate-900);
    border-color: var(--slate-300);
  }

  .btn-primary-register {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    border: none;
    padding: 9px 20px;
    border-radius: 10px;
    font-size: 0.88rem;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .btn-primary-register:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
  }

  /* Logged-in User Pill */
  .user-badge-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #ffffff;
    border: 1px solid var(--slate-200);
    padding: 5px 12px 5px 6px;
    border-radius: 30px;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  }

  .user-avatar-mini {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
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
    color: var(--slate-900);
  }

  .btn-nav-portal {
    background: var(--slate-100);
    border: 1px solid var(--slate-200);
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--slate-800);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-nav-portal:hover {
    background: var(--slate-200);
  }

  .btn-nav-signout {
    background: #fee2e2;
    border: 1px solid #fecaca;
    color: #dc2626;
    padding: 7px 14px;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-nav-signout:hover {
    background: #fca5a5;
  }

  /* ================= HERO SECTION ================= */
  .hero-section {
    position: relative;
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
    color: #ffffff;
    padding: 72px 24px 84px 24px;
    overflow: hidden;
  }

  .hero-ambient-glow {
    position: absolute;
    top: -20%;
    right: 10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(79, 70, 229, 0.08) 50%, transparent 70%);
    pointer-events: none;
    z-index: 1;
  }

  .hero-inner {
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.16);
    padding: 6px 16px;
    border-radius: 30px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #93c5fd;
    margin-bottom: 24px;
  }

  .hero-title {
    font-size: 3.4rem;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -1.2px;
    margin-bottom: 20px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-title span {
    background: linear-gradient(135deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-subtitle {
    font-size: 1.15rem;
    color: var(--slate-400);
    max-width: 680px;
    margin: 0 auto 36px auto;
    line-height: 1.6;
    font-weight: 400;
  }

  /* Quick Perks Strip */
  .hero-perks-strip {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 24px;
    margin-bottom: 40px;
  }

  .perk-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.86rem;
    font-weight: 500;
    color: #cbd5e1;
  }

  .perk-icon {
    color: #38bdf8;
    font-size: 1rem;
  }

  /* Search & Filter Floating Card */
  .search-filter-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px 28px;
    box-shadow: 0 20px 45px -10px rgba(15, 23, 42, 0.25);
    max-width: 1100px;
    margin: 0 auto;
    text-align: left;
    color: var(--slate-900);
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
    gap: 6px;
  }

  .filter-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--slate-500);
  }

  .filter-input {
    width: 100%;
    padding: 12px 14px;
    background: var(--slate-50);
    border: 1px solid var(--slate-200);
    border-radius: 10px;
    font-size: 0.92rem;
    color: var(--slate-900);
    transition: all 0.2s ease;
  }

  .filter-input:focus {
    outline: none;
    background: #ffffff;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  .filter-select {
    width: 100%;
    padding: 12px 14px;
    background: var(--slate-50);
    border: 1px solid var(--slate-200);
    border-radius: 10px;
    font-size: 0.92rem;
    color: var(--slate-900);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-select:focus {
    outline: none;
    background: #ffffff;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  /* Quick Category Tabs */
  .category-pill-strip {
    display: flex;
    align-items: center;
    gap: 10px;
    overflow-x: auto;
    padding: 18px 0 4px 0;
    border-top: 1px solid var(--slate-100);
    margin-top: 18px;
  }

  .cat-pill {
    background: var(--slate-100);
    border: 1px solid var(--slate-200);
    padding: 7px 16px;
    border-radius: 20px;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--slate-600);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .cat-pill:hover {
    background: var(--slate-200);
    color: var(--slate-900);
  }

  .cat-pill.active {
    background: var(--slate-900);
    color: #ffffff;
    border-color: var(--slate-900);
  }

  /* ================= FLEET SHOWCASE SECTION ================= */
  .fleet-section {
    max-width: 1360px;
    margin: 0 auto;
    padding: 56px 24px;
  }

  .fleet-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .fleet-heading-title {
    font-size: 1.85rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: var(--slate-900);
    margin-bottom: 6px;
  }

  .fleet-heading-desc {
    font-size: 0.95rem;
    color: var(--slate-500);
  }

  .fleet-sorting-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .fleet-count-pill {
    background: var(--slate-100);
    border: 1px solid var(--slate-200);
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--slate-700);
  }

  /* Vehicle Grid */
  .fleet-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 28px;
  }

  /* Individual Vehicle Card */
  .car-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid var(--slate-200);
    box-shadow: var(--card-shadow);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all 0.25s ease;
    position: relative;
  }

  .car-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--card-shadow-hover);
    border-color: #cbd5e1;
  }

  /* Card Image Stage */
  .car-image-stage {
    position: relative;
    width: 100%;
    height: 220px;
    background: #0f172a;
    overflow: hidden;
  }

  .car-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.4s ease;
  }

  .car-card:hover .car-img {
    transform: scale(1.04);
  }

  .car-status-pill {
    position: absolute;
    top: 14px;
    left: 14px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .car-status-pill.available {
    background: rgba(16, 185, 129, 0.9);
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.4);
  }

  .car-status-pill.rented {
    background: rgba(245, 158, 11, 0.9);
    color: #ffffff;
    box-shadow: 0 4px 10px rgba(245, 158, 11, 0.4);
  }

  .car-status-pill.maintenance {
    background: rgba(100, 116, 139, 0.9);
    color: #ffffff;
  }

  .car-category-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(6px);
    color: #ffffff;
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .car-price-overlay {
    position: absolute;
    bottom: 12px;
    right: 14px;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(8px);
    padding: 6px 12px;
    border-radius: 10px;
    color: #ffffff;
    display: flex;
    align-items: baseline;
    gap: 4px;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .car-price-value {
    font-size: 1.15rem;
    font-weight: 800;
    color: #38bdf8;
  }

  .car-price-unit {
    font-size: 0.75rem;
    color: #cbd5e1;
  }

  /* Card Content */
  .car-content {
    padding: 20px;
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
    color: var(--slate-900);
    letter-spacing: -0.3px;
    line-height: 1.2;
    margin-bottom: 4px;
  }

  .car-meta-subtitle {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    color: var(--slate-500);
    font-weight: 500;
  }

  .meta-dot {
    width: 4px;
    height: 4px;
    background: var(--slate-400);
    border-radius: 50%;
  }

  /* Specs Grid */
  .car-specs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin: 14px 0 20px 0;
    background: var(--slate-50);
    padding: 12px;
    border-radius: 12px;
    border: 1px solid var(--slate-100);
  }

  .spec-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: var(--slate-700);
    font-weight: 500;
  }

  .spec-icon {
    font-size: 0.88rem;
    opacity: 0.85;
  }

  /* Card Action Buttons */
  .card-actions-row {
    display: grid;
    grid-template-columns: 1fr 1.35fr;
    gap: 10px;
  }

  .btn-view-specs {
    background: #ffffff;
    border: 1px solid var(--slate-200);
    padding: 10px;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--slate-700);
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
  }

  .btn-view-specs:hover {
    background: var(--slate-100);
    border-color: var(--slate-300);
    color: var(--slate-900);
  }

  .btn-rent-now {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    border: none;
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 0.85rem;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  .btn-rent-now:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.35);
  }

  .btn-rent-now:disabled {
    background: var(--slate-200);
    color: var(--slate-400);
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
  }

  /* Empty State */
  .empty-fleet-state {
    text-align: center;
    padding: 64px 20px;
    background: #ffffff;
    border-radius: 20px;
    border: 1px dashed var(--slate-300);
  }

  .empty-icon {
    font-size: 2.8rem;
    margin-bottom: 16px;
    color: var(--slate-400);
  }

  .empty-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--slate-800);
    margin-bottom: 8px;
  }

  .empty-desc {
    font-size: 0.92rem;
    color: var(--slate-500);
    max-width: 420px;
    margin: 0 auto 20px auto;
  }

  .btn-reset-filters {
    background: var(--slate-900);
    color: #ffffff;
    border: none;
    padding: 9px 20px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
  }

  /* ================= HOW IT WORKS SECTION ================= */
  .how-it-works-section {
    background: #ffffff;
    border-top: 1px solid var(--slate-200);
    border-bottom: 1px solid var(--slate-200);
    padding: 72px 24px;
  }

  .section-container {
    max-width: 1280px;
    margin: 0 auto;
  }

  .section-tag-center {
    text-align: center;
    margin-bottom: 12px;
  }

  .section-pill {
    background: rgba(37, 99, 235, 0.08);
    border: 1px solid rgba(37, 99, 235, 0.2);
    color: var(--primary);
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .section-title-center {
    font-size: 2.3rem;
    font-weight: 800;
    letter-spacing: -0.8px;
    text-align: center;
    color: var(--slate-900);
    margin-bottom: 14px;
  }

  .section-desc-center {
    font-size: 1rem;
    color: var(--slate-500);
    text-align: center;
    max-width: 620px;
    margin: 0 auto 52px auto;
  }

  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }

  .step-box {
    background: var(--slate-50);
    border: 1px solid var(--slate-200);
    border-radius: 18px;
    padding: 32px 26px;
    position: relative;
    transition: all 0.25s ease;
  }

  .step-box:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 36px -6px rgba(15, 23, 42, 0.08);
    background: #ffffff;
    border-color: #cbd5e1;
  }

  .step-number {
    position: absolute;
    top: 20px;
    right: 24px;
    font-size: 2.2rem;
    font-weight: 900;
    color: var(--slate-200);
    line-height: 1;
  }

  .step-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    margin-bottom: 20px;
    box-shadow: 0 8px 18px rgba(37, 99, 235, 0.25);
  }

  .step-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--slate-900);
    margin-bottom: 10px;
  }

  .step-text {
    font-size: 0.9rem;
    color: var(--slate-600);
    line-height: 1.55;
  }

  /* ================= CONTACT SECTION ================= */
  .contact-section {
    max-width: 1280px;
    margin: 0 auto;
    padding: 72px 24px;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.35fr;
    gap: 48px;
    background: #ffffff;
    border-radius: 24px;
    border: 1px solid var(--slate-200);
    padding: 44px;
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
    background: rgba(37, 99, 235, 0.08);
    color: var(--primary);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  .contact-col-title {
    font-size: 2.1rem;
    font-weight: 800;
    letter-spacing: -0.6px;
    color: var(--slate-900);
    margin-bottom: 12px;
  }

  .contact-col-desc {
    font-size: 0.95rem;
    color: var(--slate-600);
    line-height: 1.6;
    margin-bottom: 32px;
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
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--slate-100);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .detail-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--slate-400);
    margin-bottom: 2px;
  }

  .detail-value {
    font-size: 0.92rem;
    font-weight: 600;
    color: var(--slate-800);
  }

  /* Form Column */
  .contact-form-col {
    background: var(--slate-50);
    border-radius: 18px;
    padding: 32px;
    border: 1px solid var(--slate-200);
  }

  .form-title-h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--slate-900);
    margin-bottom: 6px;
  }

  .form-desc-p {
    font-size: 0.88rem;
    color: var(--slate-500);
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
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--slate-700);
    margin-bottom: 6px;
  }

  .contact-field {
    width: 100%;
    padding: 11px 14px;
    background: #ffffff;
    border: 1px solid var(--slate-200);
    border-radius: 10px;
    font-size: 0.9rem;
    color: var(--slate-900);
    transition: all 0.2s ease;
  }

  .contact-field:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  .btn-submit-contact {
    width: 100%;
    background: linear-gradient(135deg, var(--slate-900), #1e293b);
    color: #ffffff;
    border: none;
    padding: 13px;
    border-radius: 10px;
    font-size: 0.92rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
    transition: all 0.2s ease;
  }

  .btn-submit-contact:hover {
    background: #020617;
    transform: translateY(-1px);
  }

  /* ================= FOOTER ================= */
  .public-footer {
    background: var(--slate-900);
    color: #ffffff;
    padding: 56px 24px 32px 24px;
  }

  .footer-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 48px;
  }

  .footer-brand-p {
    font-size: 0.9rem;
    color: var(--slate-400);
    line-height: 1.6;
    margin-top: 14px;
    max-width: 320px;
  }

  .footer-col-title {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 16px;
  }

  .footer-links-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer-link-item {
    font-size: 0.88rem;
    color: var(--slate-400);
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .footer-link-item:hover {
    color: #ffffff;
  }

  .footer-bottom-row {
    max-width: 1280px;
    margin: 0 auto;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.82rem;
    color: var(--slate-500);
    flex-wrap: wrap;
    gap: 12px;
  }

  /* ================= MODALS & POPUPS ================= */
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
    box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.35);
    border: 1px solid var(--slate-200);
    position: relative;
  }

  .modal-window-lg {
    max-width: 820px;
  }

  .modal-close-x {
    position: absolute;
    top: 18px;
    right: 18px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--slate-100);
    border: none;
    color: var(--slate-600);
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 10;
  }

  .modal-close-x:hover {
    background: var(--slate-200);
    color: var(--slate-900);
  }

  /* Auth Gate Modal Content */
  .auth-gate-body {
    padding: 36px 32px;
    text-align: center;
  }

  .gate-icon-halo {
    width: 72px;
    height: 72px;
    border-radius: 24px;
    background: rgba(37, 99, 235, 0.1);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.2rem;
    margin: 0 auto 20px auto;
  }

  .gate-title {
    font-size: 1.7rem;
    font-weight: 800;
    color: var(--slate-900);
    margin-bottom: 8px;
  }

  .gate-car-preview-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--slate-100);
    border: 1px solid var(--slate-200);
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--slate-800);
    margin-bottom: 16px;
  }

  .gate-desc {
    font-size: 0.95rem;
    color: var(--slate-600);
    line-height: 1.6;
    max-width: 480px;
    margin: 0 auto 28px auto;
  }

  .gate-actions-stack {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 380px;
    margin: 0 auto;
  }

  .btn-gate-signin {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: #ffffff;
    border: none;
    padding: 13px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
    transition: all 0.2s ease;
  }

  .btn-gate-signin:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
  }

  .btn-gate-register {
    background: #ffffff;
    border: 1px solid var(--slate-200);
    color: var(--slate-800);
    padding: 13px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-gate-register:hover {
    background: var(--slate-100);
    border-color: var(--slate-300);
  }

  .btn-gate-cancel {
    background: transparent;
    border: none;
    color: var(--slate-400);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 4px;
  }

  .btn-gate-cancel:hover {
    color: var(--slate-700);
  }

  /* Booking Modal (Logged in) */
  .booking-modal-body {
    padding: 32px;
  }

  .booking-header {
    display: flex;
    gap: 18px;
    align-items: center;
    border-bottom: 1px solid var(--slate-200);
    padding-bottom: 20px;
    margin-bottom: 24px;
  }

  .booking-car-thumb {
    width: 90px;
    height: 65px;
    border-radius: 10px;
    object-fit: cover;
    background: #0f172a;
  }

  .booking-car-info h4 {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--slate-900);
    margin-bottom: 4px;
  }

  .booking-car-info p {
    font-size: 0.85rem;
    color: var(--slate-500);
  }

  .booking-price-pill {
    margin-left: auto;
    text-align: right;
  }

  .booking-rate-num {
    font-size: 1.3rem;
    font-weight: 800;
    color: var(--primary);
  }

  .booking-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 18px;
  }

  .booking-summary-box {
    background: var(--slate-50);
    border: 1px solid var(--slate-200);
    border-radius: 14px;
    padding: 16px 20px;
    margin: 20px 0;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.88rem;
    color: var(--slate-600);
    margin-bottom: 8px;
  }

  .summary-row.total-row {
    border-top: 1px dashed var(--slate-300);
    padding-top: 10px;
    margin-top: 10px;
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--slate-900);
  }

  .btn-confirm-rental {
    width: 100%;
    background: linear-gradient(135deg, var(--emerald), #059669);
    color: #ffffff;
    border: none;
    padding: 14px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
    transition: all 0.2s ease;
  }

  .btn-confirm-rental:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
  }

  /* Responsive Adjustments */
  @media (max-width: 900px) {
    .hero-title {
      font-size: 2.4rem;
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
  const [bookingCar, setBookingCar] = useState(intendedCar || null);

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
    phone: '',
    message: '',
  });
  const [contactSuccess, setContactSuccess] = useState(false);

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
            // If backend returned empty database, show fallback fleet so showcase is live
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
        // Text search
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchBrand = car.brand?.toLowerCase().includes(query);
          const matchModel = car.model?.toLowerCase().includes(query);
          const matchPlate = car.license_plate?.toLowerCase().includes(query);
          if (!matchBrand && !matchModel && !matchPlate) return false;
        }

        // Category filter
        if (selectedCategory !== 'all') {
          if (car.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // Transmission filter
        if (selectedTransmission !== 'all') {
          if (car.transmission?.toLowerCase() !== selectedTransmission.toLowerCase()) {
            return false;
          }
        }

        // Fuel filter
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
        // Recommended: Available cars first, then high horsepower
        if (a.status === 'available' && b.status !== 'available') return -1;
        if (b.status === 'available' && a.status !== 'available') return 1;
        return (Number(b.horsepower) || 0) - (Number(a.horsepower) || 0);
      });
  }, [fleet, searchQuery, selectedCategory, selectedTransmission, selectedFuel, sortBy]);

  // Rent button handler: gates guest vs logged-in
  const handleRentClick = (car) => {
    if (car.status !== 'available') return;

    if (!user) {
      // Guest: show auth gate popup
      setAuthGateCar(car);
    } else {
      // Logged-in: open rental booking modal
      setBookingCar(car);
    }
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

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingCar(null);
      if (onClearIntendedCar) onClearIntendedCar();
    }, 3200);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
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
              <div className="brand-logo-icon">🚗</div>
              <div className="brand-titles">
                <span className="brand-name">LOCATION <span>VOITURES</span></span>
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
                  <div className="user-badge-pill">
                    <div className="user-avatar-mini">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="user-name-mini">{user.name || 'Member'}</span>
                  </div>

                  {user.role === 'admin' || user.role === 'gestionnaire' ? (
                    <button
                      type="button"
                      className="btn-nav-portal"
                      onClick={onOpenAdminPortal}
                    >
                      Admin Portal ⚙️
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-nav-portal"
                      onClick={onOpenUserPortal}
                    >
                      My Profile & Docs 🪪
                    </button>
                  )}

                  <button
                    type="button"
                    className="btn-nav-signout"
                    onClick={onLogout}
                  >
                    Sign Out
                  </button>
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
                    <span>➔</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ================= HERO SECTION ================= */}
        <section className="hero-section">
          <div className="hero-ambient-glow" />
          <div className="hero-inner">
            <div className="hero-tag">
              <span>✦</span>
              <span>Premium Automotive Mobility</span>
            </div>

            <h1 className="hero-title">
              Drive the <span>Extraordinary</span>.<br />
              Uncompromising Fleet Rental.
            </h1>

            <p className="hero-subtitle">
              Browse our luxury collection of executive sedans, high-performance coupes, and prestige SUVs.
              Transparent pricing, zero paperwork friction, and instant digital reservation.
            </p>

            <div className="hero-perks-strip">
              <div className="perk-item">
                <span className="perk-icon">✓</span>
                <span>All-Inclusive Comprehensive Cover</span>
              </div>
              <div className="perk-item">
                <span className="perk-icon">✓</span>
                <span>Fast Driver Verification (PDF / Image)</span>
              </div>
              <div className="perk-item">
                <span className="perk-icon">✓</span>
                <span>24/7 VIP Roadside Concierge</span>
              </div>
              <div className="perk-item">
                <span className="perk-icon">✓</span>
                <span>Free Cancellation up to 24h</span>
              </div>
            </div>

            {/* Quick Filter Card */}
            <div className="search-filter-card">
              <div className="search-card-grid">
                <div className="filter-group">
                  <label className="filter-label">Search Vehicle</label>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Search brand (e.g. Mercedes, BMW, Audi)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="filter-group">
                  <label className="filter-label">Transmission</label>
                  <select
                    className="filter-select"
                    value={selectedTransmission}
                    onChange={(e) => setSelectedTransmission(e.target.value)}
                  >
                    <option value="all">All Transmissions</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Fuel Type</label>
                  <select
                    className="filter-select"
                    value={selectedFuel}
                    onChange={(e) => setSelectedFuel(e.target.value)}
                  >
                    <option value="all">All Fuels</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Sort By</label>
                  <select
                    className="filter-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="year-desc">Newest Year</option>
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
                    {cat === 'all' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= FLEET CATALOG ================= */}
        <section id="fleet-catalog" className="fleet-section">
          <div className="fleet-header">
            <div>
              <h2 className="fleet-heading-title">Explore Our Available Fleet</h2>
              <p className="fleet-heading-desc">
                Select any vehicle to inspect full technical specifications, equipment, and reserve instantly.
              </p>
            </div>

            <div className="fleet-sorting-controls">
              <span className="fleet-count-pill">
                {filteredFleet.length} {filteredFleet.length === 1 ? 'vehicle' : 'vehicles'} found
              </span>
            </div>
          </div>

          {filteredFleet.length === 0 ? (
            <div className="empty-fleet-state">
              <div className="empty-icon">🔍</div>
              <h3 className="empty-title">No vehicles match your search</h3>
              <p className="empty-desc">
                Try loosening your filters, changing fuel types, or clearing the search keyword.
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
                        <span>●</span>
                        <span>{car.status || 'Available'}</span>
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
                          <span>Model Year {car.year}</span>
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
                          <span className="spec-icon">⚙️</span>
                          <span>{car.transmission || 'Automatic'}</span>
                        </div>
                        <div className="spec-badge">
                          <span className="spec-icon">⛽</span>
                          <span>{car.fuel_type || 'Petrol'}</span>
                        </div>
                        <div className="spec-badge">
                          <span className="spec-icon">🪪</span>
                          <span>Plate: {car.license_plate || 'VIP'}</span>
                        </div>
                        <div className="spec-badge">
                          <span className="spec-icon">🛡️</span>
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
                          <span>{isAvail ? 'Rent This Car' : 'Unavailable'}</span>
                          {isAvail && <span>➔</span>}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section id="how-it-works" className="how-it-works-section">
          <div className="section-container">
            <div className="section-tag-center">
              <span className="section-pill">Effortless Process</span>
            </div>
            <h2 className="section-title-center">How Renting With Us Works</h2>
            <p className="section-desc-center">
              Experience the pinnacle of automotive convenience with our 3-step digital journey.
            </p>

            <div className="steps-grid">
              <div className="step-box">
                <span className="step-number">01</span>
                <div className="step-icon-wrap">🔍</div>
                <h3 className="step-title">1. Select Your Vehicle</h3>
                <p className="step-text">
                  Browse our open showcase. Compare real-time horsepower, transmission, and transparent daily rates
                  with no registration required upfront.
                </p>
              </div>

              <div className="step-box">
                <span className="step-number">02</span>
                <div className="step-icon-wrap">🪪</div>
                <h3 className="step-title">2. Fast Digital ID & License</h3>
                <p className="step-text">
                  Sign in or create your profile in under 2 minutes. Upload your driver&apos;s license in PDF or photo
                  format for swift digital verification.
                </p>
              </div>

              <div className="step-box">
                <span className="step-number">03</span>
                <div className="step-icon-wrap">🔑</div>
                <h3 className="step-title">3. Drive & Enjoy</h3>
                <p className="step-text">
                  Collect your vehicle at our agency or enjoy airport concierge delivery with 24/7 customer support and
                  full insurance peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTACT & AGENCY SECTION ================= */}
        <section id="agency-contact" className="contact-section">
          <div className="contact-grid">
            <div className="contact-info-col">
              <div>
                <span className="contact-badge">Direct Agency Concierge</span>
                <h2 className="contact-col-title">Visit Us or Get in Touch</h2>
                <p className="contact-col-desc">
                  Have a custom request, VIP chauffeur inquiry, or corporate fleet requirement? Our team is available
                  around the clock to assist you.
                </p>

                <div className="contact-detail-list">
                  <div className="contact-detail-row">
                    <div className="detail-icon-circle">📍</div>
                    <div>
                      <div className="detail-label">Agency Headquarters</div>
                      <div className="detail-value">Boulevard de la Corniche, Marina Bay, Agency Hub</div>
                    </div>
                  </div>

                  <div className="contact-detail-row">
                    <div className="detail-icon-circle">📞</div>
                    <div>
                      <div className="detail-label">Direct Phone & WhatsApp</div>
                      <div className="detail-value">+33 (0) 1 42 68 55 00 / +212 522 99 88 77</div>
                    </div>
                  </div>

                  <div className="contact-detail-row">
                    <div className="detail-icon-circle">✉️</div>
                    <div>
                      <div className="detail-label">Email Concierge</div>
                      <div className="detail-value">booking@locationvoitures-luxury.com</div>
                    </div>
                  </div>

                  <div className="contact-detail-row">
                    <div className="detail-icon-circle">⏰</div>
                    <div>
                      <div className="detail-label">Agency Hours</div>
                      <div className="detail-value">Monday – Saturday: 08:00 – 21:00 | Sunday: 09:00 – 19:00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="contact-form-col">
              <h3 className="form-title-h3">Send a Direct Inquiry</h3>
              <p className="form-desc-p">We typically reply within 15 minutes during operating hours.</p>

              {contactSuccess ? (
                <div style={{
                  padding: '24px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '12px',
                  textAlign: 'center',
                  color: '#166534'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✓</div>
                  <h4 style={{ fontWeight: 800, marginBottom: '6px' }}>Message Sent Successfully!</h4>
                  <p style={{ fontSize: '0.88rem' }}>Our agency concierge has received your request and will contact you promptly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="contact-input-grid">
                    <div>
                      <label className="contact-label">Your Name</label>
                      <input
                        type="text"
                        required
                        className="contact-field"
                        placeholder="John Doe"
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
                        placeholder="john@example.com"
                        value={contactData.email}
                        onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="contact-input-full">
                    <label className="contact-label">Phone Number / WhatsApp</label>
                    <input
                      type="tel"
                      className="contact-field"
                      placeholder="+33 6 12 34 56 78"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    />
                  </div>

                  <div className="contact-input-full">
                    <label className="contact-label">Your Message or Rental Query</label>
                    <textarea
                      rows="4"
                      required
                      className="contact-field"
                      placeholder="Tell us about your rental dates, preferred vehicle model, or special requirements..."
                      value={contactData.message}
                      onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-submit-contact">
                    Transmit Concierge Message ➔
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="public-footer">
          <div className="footer-inner">
            <div>
              <div className="brand-logo-area" style={{ color: '#ffffff' }}>
                <div className="brand-logo-icon">🚗</div>
                <div className="brand-titles">
                  <span className="brand-name" style={{ color: '#ffffff' }}>LOCATION <span style={{ color: '#60a5fa' }}>VOITURES</span></span>
                  <span className="brand-tagline" style={{ color: '#94a3b8' }}>Excellence Fleet</span>
                </div>
              </div>
              <p className="footer-brand-p">
                Premier vehicle rental and luxury automotive experiences. Handpicked fleet, digital contract
                management, and dedicated customer support.
              </p>
            </div>

            <div>
              <h4 className="footer-col-title">Fleet Selection</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item" onClick={() => { setSelectedCategory('Luxury'); scrollToSection('fleet-catalog'); }}>Luxury Sedans</li>
                <li className="footer-link-item" onClick={() => { setSelectedCategory('SUV'); scrollToSection('fleet-catalog'); }}>Prestige SUVs</li>
                <li className="footer-link-item" onClick={() => { setSelectedCategory('Sports'); scrollToSection('fleet-catalog'); }}>High-Performance Coupes</li>
                <li className="footer-link-item" onClick={() => { setSelectedCategory('Electric'); scrollToSection('fleet-catalog'); }}>Electric & Hybrid</li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Services & Terms</h4>
              <ul className="footer-links-list">
                <li className="footer-link-item">Rental Conditions</li>
                <li className="footer-link-item">Insurance Coverage</li>
                <li className="footer-link-item">Driver License Requirements</li>
                <li className="footer-link-item">Airport Handover VIP</li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Customer Access</h4>
              <ul className="footer-links-list">
                {user ? (
                  <>
                    <li className="footer-link-item" onClick={onOpenUserPortal}>Customer Portal</li>
                    <li className="footer-link-item" onClick={onLogout}>Sign Out</li>
                  </>
                ) : (
                  <>
                    <li className="footer-link-item" onClick={() => onOpenLogin()}>Driver Sign In</li>
                    <li className="footer-link-item" onClick={() => onOpenRegister()}>Create Account</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="footer-bottom-row">
            <span>© {new Date().getFullYear()} Location Voitures. All rights reserved.</span>
            <span>Digital Key & Telematics Ready • ISO-27001 Certified Protection</span>
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
                ✕
              </button>

              <div className="auth-gate-body">
                <div className="gate-icon-halo">🪪</div>

                <div className="gate-car-preview-pill">
                  <span>🚗</span>
                  <span>{authGateCar.brand} {authGateCar.model}</span>
                  <span>•</span>
                  <span style={{ color: '#2563eb' }}>${Number(authGateCar.daily_rate).toFixed(0)}/day</span>
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
                    Sign In to Continue Booking ➔
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

        {/* ================= MODAL: VEHICLE SPECS DETAILS ================= */}
        {selectedCarForSpecs && (
          <div className="modal-backdrop-blur" onClick={() => setSelectedCarForSpecs(null)}>
            <div className="modal-window modal-window-lg" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="modal-close-x"
                onClick={() => setSelectedCarForSpecs(null)}
              >
                ✕
              </button>

              <div style={{ height: '300px', width: '100%', position: 'relative', background: '#0f172a' }}>
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
                  padding: '24px 28px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.92) 100%)',
                  color: '#ffffff'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        background: 'rgba(255,255,255,0.2)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        letterSpacing: '0.6px'
                      }}>
                        {selectedCarForSpecs.category || 'Luxury'}
                      </span>
                      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '6px' }}>
                        {selectedCarForSpecs.brand} {selectedCarForSpecs.model}
                      </h2>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8' }}>
                        ${Number(selectedCarForSpecs.daily_rate).toFixed(0)}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}> / day</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: '28px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#64748b', marginBottom: '14px' }}>
                  Technical Specifications
                </h4>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>TRANSMISSION</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>{selectedCarForSpecs.transmission || 'Automatic'}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>FUEL MOTORIZATION</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>{selectedCarForSpecs.fuel_type || 'Petrol'}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>HORSEPOWER</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>{selectedCarForSpecs.horsepower || '300+'} HP</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>SEATING CAPACITY</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>{selectedCarForSpecs.seating_capacity || 5} Passengers</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>MODEL YEAR</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>{selectedCarForSpecs.year}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>STATUS</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: selectedCarForSpecs.status === 'available' ? '#16a34a' : '#d97706', marginTop: '2px', textTransform: 'capitalize' }}>
                      {selectedCarForSpecs.status || 'Available'}
                    </div>
                  </div>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: '#64748b', marginBottom: '12px' }}>
                  Included With Every Rental
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '28px', fontSize: '0.88rem', color: '#334155' }}>
                  <div>✓ Fully Comprehensive Insurance (Collision & Theft)</div>
                  <div>✓ 250 km / day allowance included</div>
                  <div>✓ 24/7 VIP Roadside Assistance & Recovery</div>
                  <div>✓ Thorough sanitization & showroom polish</div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <button
                    type="button"
                    style={{
                      flex: 1,
                      background: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      padding: '12px',
                      borderRadius: '10px',
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
                      background: selectedCarForSpecs.status === 'available' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : '#94a3b8',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      cursor: selectedCarForSpecs.status === 'available' ? 'pointer' : 'not-allowed'
                    }}
                    disabled={selectedCarForSpecs.status !== 'available'}
                    onClick={() => {
                      const car = selectedCarForSpecs;
                      setSelectedCarForSpecs(null);
                      handleRentClick(car);
                    }}
                  >
                    {selectedCarForSpecs.status === 'available' ? 'Reserve This Vehicle ➔' : 'Currently Rented'}
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
                ✕
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
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>per 24-hour day</span>
                  </div>
                </div>

                {bookingConfirmed ? (
                  <div style={{
                    padding: '36px 20px',
                    textAlign: 'center',
                    background: '#f0fdf4',
                    border: '1px solid #86efac',
                    borderRadius: '16px'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '10px', color: '#16a34a' }}>🎉</div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#14532d', marginBottom: '8px' }}>
                      Rental Reservation Confirmed!
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: '#166534', maxWidth: '460px', margin: '0 auto 16px auto', lineHeight: 1.5 }}>
                      Your reservation for the <strong>{bookingCar.brand} {bookingCar.model}</strong> has been created.
                      Check your email for the rental voucher and digital key instructions!
                    </p>
                    <span style={{ fontSize: '0.82rem', color: '#15803d', fontWeight: 600 }}>
                      ● Status: Verified & Pending Agency Handover
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit}>
                    <div className="booking-form-grid">
                      <div>
                        <label className="contact-label">Start Date</label>
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
                        <label className="contact-label">Return Date</label>
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
                          placeholder="e.g. DL-984321-B"
                          className="contact-field"
                          value={bookingForm.licenseNumber}
                          onChange={(e) => setBookingForm({ ...bookingForm, licenseNumber: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Driver's License Document Notice */}
                    <div style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '14px 18px',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px'
                    }}>
                      <div style={{ fontSize: '1.8rem' }}>🪪</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                          Driver License Document Verification
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          You can manage your PDF/photo driver credentials anytime in your <strong>Customer Portal</strong>.
                        </div>
                      </div>
                      <button
                        type="button"
                        style={{
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          padding: '6px 12px',
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
                        <span style={{ color: '#16a34a', fontWeight: 600 }}>Included (Free)</span>
                      </div>
                      <div className="summary-row total-row">
                        <span>Estimated Total</span>
                        <span style={{ color: '#2563eb' }}>${estimatedTotal.toFixed(0)}</span>
                      </div>
                    </div>

                    <button type="submit" className="btn-confirm-rental">
                      Confirm & Place Rental Reservation (${estimatedTotal.toFixed(0)}) ➔
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
