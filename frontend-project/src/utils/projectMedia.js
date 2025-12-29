const API_BASE_URL = 'http://localhost:8001/foodding';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x300?text=Foodding';

const sanitizeRelativePath = (rawPath) => {
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
    normalized = `/uploads/thumbnails/${fileName}`;
  }

  return normalized;
};

export const resolveProjectImageUrl = (path = '', fallback = PLACEHOLDER_IMAGE) => {
  if (!path) {
    return fallback;
  }

  if (typeof path === 'string' && path.startsWith('http')) {
    return path;
  }

  const sanitized = sanitizeRelativePath(path);
  if (!sanitized) {
    return fallback;
  }

  return `${API_BASE_URL}${sanitized}`;
};

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
