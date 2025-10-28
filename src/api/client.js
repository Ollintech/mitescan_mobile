import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FALLBACK_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:8000',
  ios: 'http://localhost:8000',
  default: 'http://localhost:8000',
});

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || FALLBACK_BASE_URL;

async function getAuthToken() {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    return token || null;
  } catch (e) {
    return null;
  }
}

async function request(path, { method = 'GET', headers = {}, body, isForm = false } = {}) {
  const token = await getAuthToken();
  const finalHeaders = {
    ...(isForm ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body,
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json().catch(() => ({})) : await response.text();

  if (!response.ok) {
    const errorMessage = isJson && data && data.detail ? data.detail : `HTTP ${response.status}`;
    const error = new Error(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function loginRoot({ email, password }) {
  // FastAPI OAuth2PasswordRequestForm expects: username + password (x-www-form-urlencoded)
  const form = new URLSearchParams();
  form.append('username', email);
  form.append('password', password);

  return request('/users_root/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
    isForm: true,
  });
}

export async function getAllHives(userRootId) {
  return request(`/${userRootId}/hives/all`, { method: 'GET' });
}

export async function saveAuth({ token, user }) {
  await AsyncStorage.multiSet([
    ['auth_token', token],
    ['auth_user', JSON.stringify(user)],
  ]);
}

export async function clearAuth() {
  await AsyncStorage.multiRemove(['auth_token', 'auth_user']);
}

export async function getStoredUser() {
  const json = await AsyncStorage.getItem('auth_user');
  return json ? JSON.parse(json) : null;
}

export { API_BASE_URL };


