const APIError = class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
};

const normalizeMessage = (data, fallback) => {
  if (!data) return fallback;
  if (typeof data === 'string') return data;
  if (typeof data?.message === 'string') return data.message;
  if (typeof data?.error === 'string') return data.error;
  return fallback;
};

export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = (token) => {
  if (!token) localStorage.removeItem('token');
  else localStorage.setItem('token', token);
};

export const apiRequest = async (path, { method = 'GET', body, token, headers } = {}) => {
  const finalToken = token ?? getAuthToken();

  const res = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(finalToken ? { Authorization: `Bearer ${finalToken}` } : {}),
      ...(headers || {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    throw new APIError(normalizeMessage(data, `Request failed (${res.status})`), res.status, data);
  }

  return data;
};

export const authApi = {
  login: (email, password) => apiRequest('/api/auth/login', { method: 'POST', body: { email, password } }),
  register: (payload) => apiRequest('/api/auth/register', { method: 'POST', body: payload }),
  me: () => apiRequest('/api/auth/me'),
};

export const venuesApi = {
  list: () => apiRequest('/api/venues'),
};

export const bookingsApi = {
  myBookings: () => apiRequest('/api/bookings'),
  create: (payload) => apiRequest('/api/bookings', { method: 'POST', body: payload }),
};

export { APIError };
