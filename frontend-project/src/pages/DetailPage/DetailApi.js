import axios from "axios";

const projectUrl = "http://localhost:8001/foodding/project";

export const fetchProjectAxios = async (projectNo) => {
  try {
    const response = await axios.get(`${projectUrl}/detail/${projectNo}`);
    return response.data;
  } catch (error) {
    console.error("상세조회용 ajax 통신 실패", error);
    throw error;
  }
};
