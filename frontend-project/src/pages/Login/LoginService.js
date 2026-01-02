import axios from 'axios';

const API_URL = "http://localhost:8001/foodding";

// 1. Axios 인스턴스 생성
const api = axios.create({ baseURL: API_URL });

/**
 * 💡 응답 인터셉터: 서버의 응답을 가로채서 토큰 만료(401)를 감지
 */
api.interceptors.response.use(
    (response) => response, // 성공시 통과
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("세션 만료 감지");
            
            // 세션 스토리지 비우기
            sessionStorage.removeItem("loginUser");
            localStorage.removeItem("token");

            // 로그인 페이지로 
            window.location.href = "/login?expired=true";
        }
        return Promise.reject(error);
    }
);

/**
 * 💡 토큰 만료 시간 체크 함수 (Base64 해독)
 */
export const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const payload = JSON.parse(window.atob(token.split('.')[1]));
        const exp = payload.exp * 1000; // exp는 초 단위이므로 밀리초로 변환
        return Date.now() >= exp; // 현재 시간이 만료 시간보다 크면 true
    } catch (e) {
        return true;
    }
};

export const login = async (userId, userPwd) => {
    try {
        const response = await api.post("/login", { userId, userPwd });
        const jwtToken = response.data;

        if (jwtToken && jwtToken.length > 50) { 
            // 토큰을 'loginUser'라는 키로 sessionStorage에 저장
            sessionStorage.setItem("loginUser", jwtToken); 
            return jwtToken; 
        }
        return null;
    } catch (error) {
        console.error("로그인 통신 실패!", error);
        return null;
    }
};

export const logout = () => {
    sessionStorage.removeItem("loginUser");
    // 필요한 경우 localStorage의 토큰도 삭제
    localStorage.removeItem("token");
};

export const getCurrentUser = () => {
    const token = sessionStorage.getItem("loginUser");
    
    // 💡 토큰이 있지만 이미 만료되었다면 자동으로 로그아웃
    if (token && isTokenExpired(token)) {
        logout();
        return null;
    }
    
    return token ? token : null;
};