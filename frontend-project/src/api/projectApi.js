import axios from 'axios';

const PROJECT_API_BASE_URL = 'http://localhost:8001/foodding/project';

export const fetchProjectList = async (limit = 12) => {
  const response = await axios.get(`${PROJECT_API_BASE_URL}/list`, {
    params: { limit },
  });
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
