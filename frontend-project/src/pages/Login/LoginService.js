import axios from 'axios';

// 포트번호 8001 확인 (백엔드 주소)
const API_URL = "http://localhost:8001/foodding"; 

const api = axios.create({ baseURL: API_URL });

export const login = async (userId, userPwd) => {
    try {
        const response = await api.post("/login", { userId, userPwd });
        
        // 🚨 [핵심 수정] 백엔드가 { token: "...", user: {...} } 객체를 줍니다.
        // 기존처럼 문자열 길이를 체크하거나 sessionStorage에 바로 넣지 말고,
        // 데이터를 있는 그대로 LoginPage로 넘겨줘야 합니다.
        
        if (response.data && response.data.token) {
            return response.data; // { token, user } 객체 전체 반환
        }

        return null;
    } catch (error) {

        console.error("LoginService Error:", error);
        throw error;

        console.error("로그인 통신 실패!", error);
        return null;

    }
};

// 로그아웃 시 로컬스토리지 정리 (App.js와 맞춤)
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // sessionStorage.removeItem("loginUser"); // 필요하다면 유지
};

export const getCurrentUser = () => {
    // App.js가 localStorage를 쓰므로 여기도 맞추는 게 좋습니다.
    return localStorage.getItem("token");
};