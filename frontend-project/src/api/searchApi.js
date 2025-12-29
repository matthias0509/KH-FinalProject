import axios from 'axios';

const SEARCH_API_BASE_URL = 'http://localhost:8001/foodding/search';

export const fetchTrendingKeywords = async () => {
  const response = await axios.get(`${SEARCH_API_BASE_URL}/trending`);
  return response.data ?? [];
};
