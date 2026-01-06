import axios from 'axios';

const LOCAL_DEFAULT = 'http://localhost:8001/foodding';
const DEPLOY_DEFAULT = 'http://13.231.152.142:8001/foodding';
const LEGACY_PREFIXES = [
  'http://localhost:8001/foodding',
  'http://127.0.0.1:8001/foodding',
  'http://192.168.150.11:8001/foodding',
];

const stripTrailingSlash = (value = '') => value.replace(/\/+$/, '');

const resolveFromEnv = () => {
  if (typeof import.meta === 'undefined' || !import.meta.env) {
    return null;
  }
  const env = import.meta.env;
  const candidate = env.VITE_API_BASE_URL || env.VITE_BACKEND_URL;
  if (candidate && typeof candidate === 'string') {
    return stripTrailingSlash(candidate.trim());
  }
  return null;
};

const resolveFromWindow = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const userDefined = window.__FOODDING_API_BASE_URL__;
  if (userDefined && typeof userDefined === 'string' && userDefined.trim()) {
    return stripTrailingSlash(userDefined.trim());
  }
  const protocol = window.location?.protocol || 'http:';
  const host = window.location?.hostname || 'localhost';
  const envPort = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_PORT) || window.__FOODDING_API_PORT__;
  const port = envPort || '8001';
  const contextPath = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_PATH) || window.__FOODDING_API_BASE_PATH__ || '/foodding';
  const normalizedPath = contextPath.startsWith('/') ? contextPath : `/${contextPath}`;
  const portSegment = port ? `:${port}` : '';
  return `${protocol}//${host}${portSegment}${normalizedPath}`;
};

const resolveDefault = () => {
  if (typeof window !== 'undefined') {
    const host = window.location?.hostname;
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      const protocol = window.location?.protocol || 'http:';
      return `${protocol}//${host}:8001/foodding`;
    }
  }
  return DEPLOY_DEFAULT;
};

const API_BASE_URL = stripTrailingSlash(
  resolveFromEnv() || resolveFromWindow() || resolveDefault() || LOCAL_DEFAULT,
);

const normalizeLegacyUrl = (value = '') => {
  if (typeof value !== 'string') {
    return value;
  }
  for (const prefix of LEGACY_PREFIXES) {
    if (value.startsWith(prefix)) {
      return API_BASE_URL + value.substring(prefix.length);
    }
  }
  return value;
};

axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  if (!config) return config;
  const normalizedLocal = LOCAL_DEFAULT;
  if (typeof config.url === 'string' && config.url) {
    config.url = normalizeLegacyUrl(config.url);
    if (config.url.startsWith(normalizedLocal)) {
      config.url = API_BASE_URL + config.url.substring(normalizedLocal.length);
    } else if (config.url.startsWith('/')) {
      config.baseURL = API_BASE_URL;
    } else if (!/^https?:\/\//i.test(config.url) && !config.baseURL) {
      config.baseURL = API_BASE_URL;
    }
  } else if (!config.baseURL) {
    config.baseURL = API_BASE_URL;
  }
  return config;
});

export const getApiBaseUrl = () => API_BASE_URL;

export const resolveApiUrl = (path = '') => {
  if (!path) {
    return API_BASE_URL;
  }
  const normalized = normalizeLegacyUrl(path);
  if (normalized !== path) {
    return normalized;
  }
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};
