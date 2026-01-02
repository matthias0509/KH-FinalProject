// src/utils/auth.js

// 🚨 [수정 1] 저장된 키 이름을 'token'으로 변경 (로그인 페이지와 통일)
const TOKEN_STORAGE_KEY = 'token';

const getStorage = () => {
  if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
    return null;
  }
  // 🚨 [수정 2] sessionStorage -> localStorage로 변경
  return window.localStorage;
};

// --- 아래부터는 원래 있던 좋은 코드들입니다 (유지) ---

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
  
  // 토큰 파싱해서 정보 추출
  const payload = parseJwt(token);
  
  // 파싱 실패해도 토큰이 있으면 최소한의 객체는 반환
  if (!payload) {
      return { token };
  }

  return {
    token,
    // 백엔드 JWT 필드명에 따라 다를 수 있으므로 안전하게 처리
    userNo: payload.userNo ?? payload.user_no ?? null,
    userId: payload.sub ?? payload.userId ?? null,
    name: payload.name ?? payload.nickname ?? null,
    role: payload.userRole ?? payload.role ?? null,
    payload,
  };
};

export const getLoginUserNo = () => {
  const info = getLoginUserInfo();
  return info?.userNo ?? null;
};

export const isLoggedIn = () => Boolean(getStoredToken());