import axios from "axios";

const API_URL = "http://localhost:8001/foodding";

const api = axios.create({
  baseURL: API_URL,
});

// ✅ 요청 인터셉터 (JWT 첨부)
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("accessToken");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login?expired=true";
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (userId, userPwd) => {
  try {
    const res = await api.post("/login", { userId, userPwd });
    const token = res.data;

    if (token && token.split(".").length === 3) {
      sessionStorage.setItem("accessToken", token);
      return token;
    }
    return null;
  } catch (e) {
    console.error("로그인 실패", e);
    return null;
  }
};

export default api;
