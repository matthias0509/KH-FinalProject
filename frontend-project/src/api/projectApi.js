import axios from 'axios';

const PROJECT_API_BASE_URL = 'http://localhost:8001/foodding/project';

export const fetchProjectList = async (limit = 12, keyword) => {
  const params = { limit };
  if (keyword && keyword.trim()) {
    params.keyword = keyword.trim();
  }
  const response = await axios.get(`${PROJECT_API_BASE_URL}/list`, { params });
  return response.data ?? [];
};

export const fetchAdminProjectList = async (status = 'ALL') => {
  const response = await axios.get(`${PROJECT_API_BASE_URL}/admin/list`, {
    params: { status },
  });
  return response.data ?? [];
};

export const updateProjectVisibility = async (productNo, productYn) => {
  const response = await axios.patch(`${PROJECT_API_BASE_URL}/admin/${productNo}/visibility`, {
    productYn,
  });
  return response.data;
};

export const fetchProjectReviewList = async (status = 'WAITING') => {
  const response = await axios.get(`${PROJECT_API_BASE_URL}/admin/review`, {
    params: { status },
  });
  return response.data ?? [];
};

export const fetchProjectReviewDetail = async (productNo) => {
  const response = await axios.get(`${PROJECT_API_BASE_URL}/admin/review/${productNo}`);
  return response.data;
};

export const reviewProjectSubmission = async (productNo, payload) => {
  const response = await axios.patch(`${PROJECT_API_BASE_URL}/admin/review/${productNo}`, payload);
  return response.data;
};
