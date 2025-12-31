import axios from 'axios';

// 포트번호 8001 확인 (백엔드 주소)
const API_URL = "http://localhost:8001/foodding"; 

const api = axios.create({ baseURL: API_URL });

export const login = async (userId, userPwd) => {
    try {
        const response = await api.post("/login", { userId, userPwd });
        
        // 백엔드가 { token: "...", user: {...} } 객체를 준다고 가정
        if (response.data && response.data.token) {
            return response.data; // { token, user } 객체 전체 반환
        }

        return null; // 응답은 왔지만 토큰이 없는 경우
    } catch (error) {
        throw error;

        console.error("로그인 통신 실패!", error);
        return null;

        // 방법 2: 그냥 여기서 끝내고 null을 반환하고 싶다면 위 throw를 지우고 아래 주석 해제
        // return null;
    }
};

// 로그아웃 시 로컬스토리지 정리
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// 현재 사용자 정보 가져오기 (토큰 여부만 체크하는 경우)
export const getCurrentUser = () => {
    return localStorage.getItem("token");
};

// (선택사항) 만약 사용자 객체 정보가 필요하다면 아래 함수 추가
export const getLoggedUserInfo = () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
};