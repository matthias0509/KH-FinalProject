const TOKEN_STORAGE_KEY = 'loginUser';

const getStorage = () => {
  if (typeof window === 'undefined' || typeof window.sessionStorage === 'undefined') {
    return null;
  }
  return window.sessionStorage;
};

const decodeBase64Url = (value) => {
  if (!value) return '';
  let normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const pad = normalized.length % 4;
  if (pad) {
    normalized += '='.repeat(4 - pad);
  }

  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    return window.atob(normalized);
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(normalized, 'base64').toString('binary');
  }

  return '';
};

const parseJwt = (token) => {
  if (!token) {
    return null;
  }

  const parts = token.split('.');
  if (parts.length < 2) {
    return null;
  }

  try {
    const payload = decodeBase64Url(parts[1]);
    return JSON.parse(payload);
  } catch (error) {
    console.error('JWT 파싱 실패', error);
    return null;
  }
};

export const getStoredToken = () => {
  const storage = getStorage();
  if (!storage) return null;
  return storage.getItem(TOKEN_STORAGE_KEY);
};

export const getLoginUserInfo = () => {
  const token = getStoredToken();
  if (!token) return null;
  const payload = parseJwt(token);
  if (!payload) return null;

  return {
    token,
    userNo: payload.userNo ?? null,
    userId: payload.sub ?? null,
    name: payload.name ?? null,
    role: payload.userRole ?? payload.role ?? null,
    payload,
  };
};

export const getLoginUserNo = () => {
  const info = getLoginUserInfo();
  return info?.userNo ?? null;
};

export const isLoggedIn = () => Boolean(getStoredToken());
