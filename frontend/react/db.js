

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
 * LOGIN.
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

/**
 * Fetch cars from backend.
 * 
 * @param {Object} [params]
 * @returns {Promise<Array>} List of cars
 */
export async function getCars(params = {}) {
  const query = new URLSearchParams();
  if (params.status) query.append('status', params.status);
  if (params.category) query.append('category', params.category);
  if (params.search) query.append('search', params.search);

  const url = `${API_BASE_URL}/cars${query.toString() ? `?${query.toString()}` : ''}`;
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to load fleet.');
  }
  return data.data || [];
}

/**
 * Create a new car with multipart/form-data.
 * 
 * @param {FormData} formData
 * @returns {Promise<Object>} Created car
 */
export async function createCar(formData) {
  const response = await fetch(`${API_BASE_URL}/cars`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Failed to create car.');
    error.errors = data.errors || {};
    throw error;
  }
  return data;
}

/**
 * Update an existing car.
 * 
 * @param {number|string} id
 * @param {FormData} formData
 * @returns {Promise<Object>} Updated car
 */
export async function updateCar(id, formData) {
  const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Failed to update car.');
    error.errors = data.errors || {};
    throw error;
  }
  return data;
}

/**
 * Delete a car from the fleet.
 * 
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function deleteCar(id) {
  const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete car.');
  }
  return data;
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  getStoredUser,
  setStoredUser,
  clearStoredUser,
  getCars,
  createCar,
  updateCar,
  deleteCar,
};
