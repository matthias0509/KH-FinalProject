import axios from 'axios';

const API_BASE_URL = "http://localhost:8001/foodding/api/seller";

export const fetchSellerProfile = async (sellerNo) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${sellerNo}`);
        return response.data;
    } catch (error) {
        console.error("판매자 정보 로드 실패", error);
        throw error;
    }
};