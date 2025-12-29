import axios from 'axios';

const API_ROOT = 'http://localhost:8001/foodding';
const projectUrl = `${API_ROOT}/project`;

const authHeaders = () => {
  const token = sessionStorage.getItem('loginUser');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchProjectLikeStatus = async (productNo) => {
  const response = await axios.get(`${projectUrl}/${productNo}/likes`, {
    headers: authHeaders(),
  });
  return response.data;
};

export const likeProject = async (productNo) => {
  const response = await axios.post(
    `${projectUrl}/${productNo}/likes`,
    null,
    { headers: authHeaders() },
  );
  return response.data;
};

export const unlikeProject = async (productNo) => {
  const response = await axios.delete(`${projectUrl}/${productNo}/likes`, {
    headers: authHeaders(),
  });
  return response.data;
};

export const fetchSellerFollowStatus = async (sellerNo) => {
  const response = await axios.get(`${projectUrl}/seller/${sellerNo}/followers`, {
    headers: authHeaders(),
  });
  return response.data;
};

export const followSeller = async (sellerNo) => {
  const response = await axios.post(
    `${projectUrl}/seller/${sellerNo}/followers`,
    null,
    { headers: authHeaders() },
  );
  return response.data;
};

export const unfollowSeller = async (sellerNo) => {
  const response = await axios.delete(
    `${projectUrl}/seller/${sellerNo}/followers`,
    { headers: authHeaders() },
  );
  return response.data;
};
