import axios from "axios";

const commonUrl = "http://localhost:8001/foodding/create/";

const insertProjectAxios = async (payload) => {
  const url = `${commonUrl}insert`;

  try {
    const response = await axios({
      url,
      method: "post",
      data: payload,
      headers: { "Content-Type": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("프로젝트 임시저장용 ajax 통신 실패!", error);
    throw error;
  }
};

export default insertProjectAxios;
