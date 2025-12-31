import axios from 'axios';
// 🚨 [수정 1] 아까 만든 auth.js에서 토큰 가져오는 함수를 임포트합니다.
// (경로가 맞는지 확인해주세요. api 폴더와 utils 폴더가 형제 레벨이라고 가정)
import { getStoredToken } from '../utils/auth'; 

const API_ROOT = 'http://localhost:8001/foodding';
const projectUrl = `${API_ROOT}/project`;

const authHeaders = () => {
  // 🚨 [수정 2] sessionStorage.getItem('loginUser') -> getStoredToken() 으로 변경
  // 이제 LocalStorage에 있는 'token'을 정확히 가져옵니다.
  const token = getStoredToken(); 
  
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