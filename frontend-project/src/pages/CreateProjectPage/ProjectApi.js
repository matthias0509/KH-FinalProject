import axios from "axios";

const commonUrl = "http://localhost:8001/foodding/create/";


// 임시저장
export const imsiProjectAxios = async (payload) => {
  const url = `${commonUrl}imsi`;

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


// 제출하기
export const insertProjectAxios = async (payload) => {
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
    console.error("프로젝트 제출용 ajax 통신 실패!", error);
    throw error;
  }
};


// 임시저장 썸네일 가져오기
export const fetchImsiAxios = async (userNo) => {
    const url = `${commonUrl}drafts`;

    try {
      const response = await axios({
        url,
        method: 'get',
        params: { userNo },        // 필요 시 쿼리 파라미터
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('임시저장 목록 조회 실패!', error);
      throw error;
    }
  };

  export const uploadThumbnailAxios = async (file) => {
    const url = `${commonUrl}thumbnail`;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios({
        url,
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('썸네일 업로드 실패!', error);
      throw error;
    }
  };

  export const fetchDraftDetailAxios = async ({ userNo, tempNo }) => {
    const url = `${commonUrl}drafts/${tempNo}`;

    try {
      const response = await axios({
        url,
        method: 'get',
        params: { userNo },
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('임시저장 상세 조회 실패!', error);
      throw error;
    }
  };

