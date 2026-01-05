const DEFAULT_API_BASE_URL = 'http://localhost:8001/foodding';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x300?text=Foodding';

const resolveApiBaseUrl = () => {
  const env = typeof import.meta !== 'undefined' ? import.meta.env ?? {} : {};
  const configured =
    env.VITE_UPLOAD_BASE_URL || env.VITE_API_BASE_URL || env.VITE_BACKEND_URL;
  if (configured && typeof configured === 'string') {
    return configured.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined' && window.__FOODDING_API_BASE_URL__) {
    const candidate = String(window.__FOODDING_API_BASE_URL__).trim();
    if (candidate) {
      return candidate.replace(/\/$/, '');
    }
  }

  return DEFAULT_API_BASE_URL;
};

const API_BASE_URL = resolveApiBaseUrl();

const sanitizeRelativePath = (rawPath, defaultSubdir = 'thumbnails') => {
  if (!rawPath) {
    return '';
  }

  let normalized = String(rawPath).trim();
  if (!normalized) {
    return '';
  }

  // 윈도우 경로 구분자 보정
  normalized = normalized.replace(/\\/g, '/');

  // 이미 /uploads/ 가 포함되어 있다면 해당 위치부터 사용
  const uploadsIndex = normalized.lastIndexOf('/uploads/');
  if (uploadsIndex >= 0) {
    normalized = normalized.substring(uploadsIndex);
  }

  // 파일명만 들어있는 경우를 대비해 앞에 /를 붙임
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  // /uploads 로 시작하지 않으면 기본 uploads 폴더로 보정
  if (!normalized.startsWith('/uploads')) {
    const fileName = normalized.substring(normalized.lastIndexOf('/') + 1);
    if (!fileName) {
      return '';
    }
    const subdir = (defaultSubdir || '').replace(/^\/+|\/+$|\s+/g, '');
    const basePath = subdir ? `/uploads/${subdir}` : '/uploads';
    normalized = `${basePath}/${fileName}`;
  }

  return normalized;
};

export const resolveProjectImageUrl = (path = '', fallback = PLACEHOLDER_IMAGE, options = {}) => {
  if (!path) {
    return fallback;
  }

  if (typeof path === 'string') {
    const trimmed = path.trim();
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    if (trimmed.startsWith('//')) {
      const protocol =
        typeof window !== 'undefined' && window.location ? window.location.protocol : 'https:';
      return `${protocol}${trimmed}`;
    }
  }

  const sanitized = sanitizeRelativePath(path, options.defaultSubdir ?? 'thumbnails');
  if (!sanitized) {
    return fallback;
  }

  return `${API_BASE_URL}${sanitized}`;
};

export const resolveProfileImageUrl = (path = '', fallback = PLACEHOLDER_IMAGE, options = {}) =>
  // 마이페이지와 동일하게 /uploads/{파일명} 형태를 기본값으로 사용
  resolveProjectImageUrl(path, fallback, { defaultSubdir: '', ...options });

export const getProjectThumbnail = (project, fallback = '') => {
  if (!project) {
    return fallback || PLACEHOLDER_IMAGE;
  }

  const thumbnailPath = project.modifyThumbnail || project.originThumbnail;
  if (!thumbnailPath) {
    return fallback || PLACEHOLDER_IMAGE;
  }

  return resolveProjectImageUrl(thumbnailPath, fallback || PLACEHOLDER_IMAGE);
};
