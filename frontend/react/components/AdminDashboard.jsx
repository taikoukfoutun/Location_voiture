import { useState, useEffect, useRef } from 'react';
import { getCars, createCar, updateCar, deleteCar } from '../db';
import defaultCarBg from '../assets/luxury_coastal_car.jpg';

const adminDashboardStyles = `
  /* =========================================================
     LUXURY LIGHT MODE ADMIN DASHBOARD STYLING
     Editorial, spacious, clean aesthetic with zero childish colors
     ========================================================= */

  .admin-hub {
    width: 100%;
    color: #0f172a;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', Helvetica, Arial, sans-serif;
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
    margin-bottom: 28px;
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
     BIG VEHICLE CARDS SHOWCASE GRID
     Expansive, editorial car cards with high-res hero framing
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

function AdminDashboard({ user, onLogout }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [alert, setAlert] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentCarId, setCurrentCarId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
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

  // Delete Safeguard Modal State
  const [carToDelete, setCarToDelete] = useState(null);

  useEffect(() => {
    loadFleet();
  }, [statusFilter, categoryFilter]);

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadFleet();
  };

  // Open modal for Adding
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

  // Open modal for Editing
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

  // Safe Delete Action
  const confirmDelete = async () => {
    if (!carToDelete) return;

    // Frontend Safeguard Check
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
              <span>✦</span>
            </div>
            <div className="admin-title-group">
              <div className="admin-kicker">
                <span className="admin-kicker-dot"></span>
                <span>Fleet Telemetry Console • Monaco Vault</span>
              </div>
              <h1>Fleet Overview</h1>
            </div>
          </div>

          <div className="admin-user-profile">
            <span className="admin-badge-pill">
              <span>👑</span>
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
            <span>{alert.type === 'error' ? '⚠️' : '✓'} {alert.message}</span>
            <button
              type="button"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'inherit' }}
              onClick={() => setAlert(null)}
            >
              ✕
            </button>
          </div>
        )}

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
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search brand, model, license plate..."
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
              <div className="empty-fleet-icon">✦</div>
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
                        <span>✏️</span>
                        <span>Edit Specifications</span>
                      </button>

                      <button
                        type="button"
                        className="action-delete-btn"
                        disabled={isRented}
                        title={isRented ? 'Cannot delete rented vehicle' : 'Remove vehicle from fleet'}
                        onClick={() => setCarToDelete(car)}
                      >
                        <span>{isRented ? '🔒' : '🗑️'}</span>
                        <span>{isRented ? 'Locked' : 'Remove'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal: Add / Edit Car */}
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
                {/* Brand & Model */}
                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label>Brand *</label>
                    <input
                      type="text"
                      name="brand"
                      placeholder="e.g. Porsche, BMW, Audi"
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
                      placeholder="e.g. 911 GT3 RS, M4, Taycan"
                      value={formData.model}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                {/* Year, Category, License Plate */}
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

                {/* License Plate & Daily Rate */}
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
                      placeholder="e.g. 450.00"
                      value={formData.daily_rate}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                {/* Transmission & Fuel Type */}
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

                {/* Seating Capacity & Horsepower */}
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
                      placeholder="e.g. 525"
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

                {/* Image Upload Box */}
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
                        <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>📷</div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                          Upload high-resolution vehicle photo
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '3px' }}>
                          Supports JPEG, PNG, WEBP.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Preset Quick Select */}
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

        {/* Delete Confirmation Safeguard Dialog */}
        {carToDelete && (
          <div className="modal-overlay" onClick={() => setCarToDelete(null)}>
            <div className="modal-card" style={{ maxWidth: '460px' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '12px' }}>⚠️</div>
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
                    🔒 Action Blocked: This vehicle is currently chartered by a client and cannot be removed.
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
      </div>
    </>
  );
}

export default AdminDashboard;
