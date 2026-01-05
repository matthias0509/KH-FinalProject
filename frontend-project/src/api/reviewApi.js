import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/foodding/api/reviews';

const authHeaders = (token) => {
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

export const fetchProductReviews = async (productNo) => {
  const response = await axios.get(`${API_BASE_URL}/product/${productNo}`);
  return response.data || [];
};

export const fetchOrderReview = async (orderNo, token) => {
  const response = await axios.get(`${API_BASE_URL}/order/${orderNo}`, {
    headers: authHeaders(token),
  });
  return response.data;
};

export const submitReview = async (payload, token) => {
  const response = await axios.post(API_BASE_URL, payload, {
    headers: authHeaders(token),
  });
  return response.data;
};
