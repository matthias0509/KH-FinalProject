import axios from 'axios';

const API_URL = "http://localhost:8001/foodding"

const api = axios.create({ baseURL: API_URL });

export const login = async (userId, userPwd) => { // userId, userPwd 사용
    try {
        const response = await api.post("/login", { userId, userPwd });
        const jwtToken = response.data;

        if (jwtToken && jwtToken.length > 50) { 
            
            // 🚨 핵심 수정: 토큰을 객체 대신 순수 문자열 그대로 저장
            sessionStorage.setItem("loginUser", jwtToken); 
            
            // ⭐️ 반환 값도 순수 문자열로 변경
            return jwtToken; // LoginService 호출부에 순수 토큰 반환
        }
        return null;
    } catch (error) {
        console.error("로그인 통신 실패!", error);
        return null;
    }
};

export const logout = () => {
    sessionStorage.removeItem("loginUser");
};

export const getCurrentUser = () => {
    const user = sessionStorage.getItem("loginUser");
    // 이제 JSON.parse() 없이 순수 문자열 또는 null을 반환
    return user ? user : null;
};