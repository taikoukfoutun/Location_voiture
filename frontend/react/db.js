/**
 * Database & Backend API Bridge
 * 
 * This module connects the React frontend to the Laravel backend API
 * and handles data synchronization with the MySQL database.
 */

const API_BASE_URL = 'http://127.0.0.1:8000/api';
const STORAGE_KEY = 'location_voitures_user';

/**
 * Register a new user in the database.
 * 
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.email
 * @param {string} params.password
 * @param {string} params.passwordConfirmation
 * @returns {Promise<Object>} Response data containing the newly created user
 */
export async function registerUser({ name, email, password, passwordConfirmation }) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Registration failed. Please check your inputs.');
    error.errors = data.errors || {};
    throw error;
  }

  return data;
}

/**
 * Authenticate an existing user against the database.
 * 
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 * @returns {Promise<Object>} Response data containing user details
 */
export async function loginUser({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'Login failed. Invalid email or password.');
    error.errors = data.errors || {};
    throw error;
  }

  return data;
}

/**
 * Log out the current user session.
 * 
 * @returns {Promise<Object>}
 */
export async function logoutUser() {
  try {
    await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });
  } catch {
    // Ignore network error on logout to always allow local cleanup
  } finally {
    clearStoredUser();
  }
}

/**
 * Retrieve the active user from local storage.
 * 
 * @returns {Object|null}
 */
export function getStoredUser() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

/**
 * Persist the authenticated user into local storage.
 * 
 * @param {Object} user
 */
export function setStoredUser(user) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // Local storage unavailable or full
  }
}

/**
 * Remove the stored user from local storage.
 */
export function clearStoredUser() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  getStoredUser,
  setStoredUser,
  clearStoredUser,
};
