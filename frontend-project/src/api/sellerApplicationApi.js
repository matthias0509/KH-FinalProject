import axios from 'axios';

// 🚨 [수정됨] 백엔드 주소 변경에 맞춰 중간에 '/api'를 추가했습니다.
// 기존: 'http://localhost:8001/foodding/seller'
const SELLER_API_BASE_URL = 'http://localhost:8001/foodding/api/seller';

export const submitSellerApplication = async (payload) => {
  const response = await axios.post(`${SELLER_API_BASE_URL}/applications`, payload);
  return response.data;
};

export const fetchMySellerApplication = async (userNo) => {
  const response = await axios.get(`${SELLER_API_BASE_URL}/applications/me`, {
    params: { userNo },
  });
  return response.data ?? null;
};

export const fetchSellerApplications = async (status = 'ALL') => {
  const response = await axios.get(`${SELLER_API_BASE_URL}/applications`, {
    params: { status },
  });
  return response.data;
};

export const reviewSellerApplication = async (applicationNo, { status, adminMemo }) => {
  const response = await axios.patch(`${SELLER_API_BASE_URL}/applications/${applicationNo}`, {
    status,
    adminMemo,
  });
  return response.data;
};

// [확인] 이제 요청 주소가 '/foodding/api/seller/profile/status'로 완성되어 404가 사라집니다.
export const fetchSellerProfileStatus = async (userNo) => {
  const response = await axios.get(`${SELLER_API_BASE_URL}/profile/status`, {
    params: { userNo },
  });
  return response.data?.hasProfile ?? false;
};