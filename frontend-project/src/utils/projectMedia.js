const API_BASE_URL = 'http://localhost:8001/foodding';

export const resolveProjectImageUrl = (path = '', fallback = '') => {
  if (!path) {
    return fallback;
  }

  if (path.startsWith('http')) {
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
};

export const getProjectThumbnail = (project, fallback = '') => {
  if (!project) {
    return fallback;
  }

  return resolveProjectImageUrl(project.modifyThumbnail || project.originThumbnail, fallback);
};
