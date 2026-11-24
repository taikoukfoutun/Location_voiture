

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
  if (!user) {
    clearStoredUser();
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    try {
      // Safe fallback if quota is exceeded due to high-res data URLs
      const safeUser = {
        ...user,
        avatar: user.avatar && user.avatar.length > 60000 ? user.avatar.slice(0, 60000) : user.avatar,
        license_document: user.license_document && user.license_document.length > 60000 ? null : user.license_document,
        license_uploaded: Boolean(user.license_uploaded || user.license_document),
        has_avatar: Boolean(user.avatar || user.has_avatar),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    } catch {
      // Ignore fallback failure
    }
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

/**
 * Fetch all gestionnaires (Super Admin only).
 * 
 * @param {Object} [params]
 * @param {string} [params.search]
 * @returns {Promise<Array>} List of gestionnaires
 */
export async function getGestionnaires(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);

  const response = await fetch(`${API_BASE_URL}/admin/gestionnaires?${query.toString()}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch gestionnaires.');
  }
  return data.data || [];
}

/**
 * Create a new gestionnaire staff account (Super Admin only).
 * 
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.email
 * @param {string} params.password
 * @returns {Promise<Object>} Created gestionnaire
 */
export async function createGestionnaire({ name, email, password }) {
  const response = await fetch(`${API_BASE_URL}/admin/gestionnaires`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Failed to create gestionnaire.');
    error.errors = data.errors || {};
    throw error;
  }
  return data;
}

/**
 * Update an existing gestionnaire account.
 * 
 * @param {number|string} id
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.email
 * @param {string} [params.password]
 * @returns {Promise<Object>} Updated gestionnaire
 */
export async function updateGestionnaire(id, { name, email, password }) {
  const response = await fetch(`${API_BASE_URL}/admin/gestionnaires/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Failed to update gestionnaire.');
    error.errors = data.errors || {};
    throw error;
  }
  return data;
}

/**
 * Delete a gestionnaire account.
 * 
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function deleteGestionnaire(id) {
  const response = await fetch(`${API_BASE_URL}/admin/gestionnaires/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete gestionnaire.');
  }
  return data;
}

/**
 * Fetch fresh user profile details from backend.
 * 
 * @param {number|string} userId
 * @returns {Promise<Object>}
 */
export async function getUserProfile(userId) {
  if (!userId) return getStoredUser();
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok && data.user) {
      const currentUser = getStoredUser() || {};
      const merged = { ...currentUser, ...data.user };
      setStoredUser(merged);
      return merged;
    }
  } catch (e) {
    console.warn('Could not fetch remote user profile, using stored user', e);
  }
  return getStoredUser();
}

/**
 * Update user driver profile.
 * 
 * @param {number|string} userId
 * @param {Object} profileData
 * @returns {Promise<Object>}
 */
export async function updateUserProfile(userId, profileData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile.');
    }

    const currentUser = getStoredUser() || {};
    const updatedUser = {
      ...currentUser,
      ...(data.user || profileData),
      license_uploaded: Boolean(
        data.user?.license_uploaded ||
        profileData.license_uploaded ||
        profileData.license_document ||
        currentUser.license_uploaded
      ),
      has_avatar: Boolean(data.user?.avatar || profileData.avatar || currentUser.avatar),
    };
    setStoredUser(updatedUser);
    return { status: 'success', user: updatedUser, data };
  } catch (err) {
    console.warn('API update fallback to local storage:', err);
    const currentUser = getStoredUser() || {};
    const updated = {
      ...currentUser,
      ...profileData,
      license_uploaded: Boolean(profileData.license_uploaded || profileData.license_document || currentUser.license_uploaded),
      has_avatar: Boolean(profileData.avatar || currentUser.avatar),
    };
    setStoredUser(updated);
    return { status: 'success', user: updated };
  }
}

/**
 * Fetch reservations (all for staff, or filtered by user).
 * 
 * @param {Object} [params]
 * @param {number|string} [params.user_id]
 * @param {string} [params.status]
 * @param {string} [params.search]
 * @returns {Promise<{ data: Array, counts: Object }>}
 */
export async function getReservations(params = {}) {
  const query = new URLSearchParams();
  if (params.user_id) query.append('user_id', params.user_id);
  if (params.status) query.append('status', params.status);
  if (params.search) query.append('search', params.search);

  try {
    const response = await fetch(`${API_BASE_URL}/reservations?${query.toString()}`, {
      headers: { Accept: 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch reservations.');
    return data;
  } catch (err) {
    const local = JSON.parse(localStorage.getItem('location_voitures_reservations') || '[]');
    let filtered = local;
    if (params.user_id) filtered = filtered.filter(r => String(r.user_id) === String(params.user_id));
    if (params.status && params.status !== 'all') filtered = filtered.filter(r => r.status === params.status);
    return {
      status: 'success',
      data: filtered,
      counts: {
        all: local.length,
        pending: local.filter(r => r.status === 'pending').length,
        confirmed: local.filter(r => r.status === 'confirmed').length,
        rejected: local.filter(r => r.status === 'rejected').length,
        completed: local.filter(r => r.status === 'completed').length,
      }
    };
  }
}

/**
 * Create a new vehicle reservation.
 * 
 * @param {Object} reservationData
 * @returns {Promise<Object>}
 */
export async function createReservation(reservationData) {
  try {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(reservationData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit reservation.');
    }
    return data;
  } catch (err) {
    const local = JSON.parse(localStorage.getItem('location_voitures_reservations') || '[]');
    const newReservation = {
      id: Date.now(),
      status: 'pending',
      created_at: new Date().toISOString(),
      ...reservationData,
    };
    local.unshift(newReservation);
    localStorage.setItem('location_voitures_reservations', JSON.stringify(local));
    return { status: 'success', message: 'Reservation recorded.', data: newReservation };
  }
}

/**
 * Update reservation status (accept, reject with message, complete).
 * 
 * @param {number|string} id
 * @param {Object} params
 * @param {string} params.status
 * @param {string} [params.admin_message]
 * @returns {Promise<Object>}
 */
export async function updateReservationStatus(id, { status, admin_message }) {
  try {
    const response = await fetch(`${API_BASE_URL}/reservations/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ status, admin_message }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update reservation status.');
    }
    return data;
  } catch (err) {
    const local = JSON.parse(localStorage.getItem('location_voitures_reservations') || '[]');
    const index = local.findIndex(r => String(r.id) === String(id));
    if (index !== -1) {
      local[index].status = status;
      if (admin_message !== undefined) local[index].admin_message = admin_message;
      localStorage.setItem('location_voitures_reservations', JSON.stringify(local));
      return { status: 'success', data: local[index] };
    }
    throw err;
  }
}

/**
 * Submit a concierge inquiry / contact message (Public).
 * 
 * @param {Object} messageData
 * @returns {Promise<Object>}
 */
export async function submitContactMessage(messageData) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(messageData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit contact message.');
    }
    return data;
  } catch (err) {
    // Offline / fallback storage
    const local = JSON.parse(localStorage.getItem('location_voitures_contacts') || '[]');
    const newMsg = {
      id: Date.now(),
      name: messageData.name,
      email: messageData.email,
      phone: messageData.phone || '',
      subject: messageData.subject || 'Concierge Rental Inquiry',
      message: messageData.message,
      status: 'unread',
      created_at: new Date().toISOString(),
    };
    local.unshift(newMsg);
    localStorage.setItem('location_voitures_contacts', JSON.stringify(local));
    return { status: 'success', message: 'Concierge request stored locally.', data: newMsg };
  }
}

/**
 * Fetch all contact inquiries with filters (Staff).
 * 
 * @param {Object} [params]
 * @param {string} [params.status]
 * @param {string} [params.search]
 * @returns {Promise<{ data: Array, counts: Object }>}
 */
export async function getContactMessages(params = {}) {
  const query = new URLSearchParams();
  if (params.status) query.append('status', params.status);
  if (params.search) query.append('search', params.search);

  try {
    const response = await fetch(`${API_BASE_URL}/contact-messages?${query.toString()}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch contact inquiries.');
    }
    return data;
  } catch (err) {
    const local = JSON.parse(localStorage.getItem('location_voitures_contacts') || '[]');
    let filtered = [...local];
    if (params.status && params.status !== 'all') {
      filtered = filtered.filter(m => m.status === params.status);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(m => 
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q)) ||
        (m.message && m.message.toLowerCase().includes(q))
      );
    }
    const counts = {
      all: local.length,
      unread: local.filter(m => m.status === 'unread').length,
      read: local.filter(m => m.status === 'read').length,
      replied: local.filter(m => m.status === 'replied').length,
      archived: local.filter(m => m.status === 'archived').length,
    };
    return { status: 'success', data: filtered, counts };
  }
}

/**
 * Update contact inquiry status and record reply notes.
 * 
 * @param {number|string} id
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
export async function updateContactMessageStatus(id, payload = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact-messages/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update inquiry status.');
    }
    return data;
  } catch (err) {
    const local = JSON.parse(localStorage.getItem('location_voitures_contacts') || '[]');
    const index = local.findIndex(m => String(m.id) === String(id));
    if (index !== -1) {
      if (payload.status) local[index].status = payload.status;
      if (payload.admin_reply) {
        local[index].admin_reply = payload.admin_reply;
        local[index].replied_at = new Date().toISOString();
        local[index].status = 'replied';
      }
      localStorage.setItem('location_voitures_contacts', JSON.stringify(local));
      return { status: 'success', data: local[index] };
    }
    throw err;
  }
}

/**
 * Delete a contact message (Admin).
 * 
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function deleteContactMessage(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact-messages/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete inquiry.');
    }
    return data;
  } catch (err) {
    const local = JSON.parse(localStorage.getItem('location_voitures_contacts') || '[]');
    const updated = local.filter(m => String(m.id) !== String(id));
    localStorage.setItem('location_voitures_contacts', JSON.stringify(updated));
    return { status: 'success' };
  }
}

/**
 * Fetch all registered users (Super Admin only).
 * 
 * @param {Object} [params]
 * @param {string} [params.search]
 * @param {string} [params.status]
 * @param {string} [params.role]
 * @returns {Promise<Object>} { data: Array, counts: Object }
 */
export async function getAdminUsers(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.status && params.status !== 'all') query.append('status', params.status);
  if (params.role) query.append('role', params.role);

  const response = await fetch(`${API_BASE_URL}/admin/users?${query.toString()}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch registered users.');
  }
  return data;
}

/**
 * Toggle active/deactivated status of a user (Super Admin only).
 * 
 * @param {number|string} id
 * @param {boolean} [isActive]
 * @returns {Promise<Object>}
 */
export async function toggleUserStatus(id, isActive) {
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(typeof isActive === 'boolean' ? { is_active: isActive } : {}),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update user status.');
  }
  return data;
}

/**
 * Delete a user account (Super Admin only).
 * 
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function deleteUserAccount(id) {
  const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete user account.');
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
  getUserProfile,
  updateUserProfile,
  getCars,
  createCar,
  updateCar,
  deleteCar,
  getGestionnaires,
  createGestionnaire,
  updateGestionnaire,
  deleteGestionnaire,
  getReservations,
  createReservation,
  updateReservationStatus,
  submitContactMessage,
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
  getAdminUsers,
  toggleUserStatus,
  deleteUserAccount,
};
