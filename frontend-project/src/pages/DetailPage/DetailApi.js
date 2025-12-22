import axios from "axios";

const commonUrl = "http://localhost:8001/foodding/project";

export const fetchProjectAxios = async (projectNo) => {
  try {
    const response = await axios.get(`${commonUrl}/detail/${projectNo}`);
    return response.data;
  } catch (error) {
    console.error("상세조회용 ajax 통신 실패", error);
    throw error;
  }
};
