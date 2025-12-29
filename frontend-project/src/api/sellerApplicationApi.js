import axios from 'axios';

const SELLER_API_BASE_URL = 'http://localhost:8001/foodding/seller';

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

export const fetchSellerProfileStatus = async (userNo) => {
  const response = await axios.get(`${SELLER_API_BASE_URL}/profile/status`, {
    params: { userNo },
  });
  return response.data?.hasProfile ?? false;
};
