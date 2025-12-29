import axios from "axios";

// 공지사항 상세조회 (조회수 증가 포함)
const noticeDetailAxios = async (noticeNo) => {
    try {
        // 💡 1. 조회수 증가 요청
        const increaseUrl = `http://localhost:8001/foodding/notice/increaseCount/${noticeNo}`;
        const incResponse = await axios({
            url: increaseUrl,
            method: "get",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("loginUser")}`
            }
        });

        if (incResponse.data > 0) {
            // 💡 2. 조회수 증가 성공 시 데이터 가져오기
            const detailUrl = `http://localhost:8001/foodding/notice/detail/${noticeNo}`;
            const response = await axios({
                url: detailUrl,
                method: "get",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("loginUser")}`
                }
            });
            return response.data;
        }
        return null;
    } catch (error) {
        console.error("공지사항 상세조회 통신 실패!", error);
    }
};

// 공지사항 등록용 (관리자 전용)
const insertNoticeAxios = async (noticeData) => {
    try {
        const url = "http://localhost:8001/foodding/notice/insert";
        const response = await axios({
            url,
            method: "post",
            data: noticeData, // noticeTitle, noticeContent 등
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("loginUser")}`
            }
        });
        return response.data; // "success" 또는 "fail"
    } catch (error) {
        console.error("공지사항 등록 통신 실패!", error);
    }
};

// 공지사항 수정용
const updateNoticeAxios = async (noticeData) => {
    try {
        const url = "http://localhost:8001/foodding/notice/update";
        const response = await axios({
            url,
            method: "post",
            data: noticeData,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("loginUser")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("공지사항 수정 통신 실패!", error);
    }
};

// 공지사항 삭제용
const deleteNoticeAxios = async (noticeNo) => {
    try {
        const url = "http://localhost:8001/foodding/notice/delete";
        const response = await axios({
            url,
            method: "post",
            data: { noticeNo },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("loginUser")}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("공지사항 삭제 통신 실패!", error);
    }
};

export { noticeDetailAxios, insertNoticeAxios, updateNoticeAxios, deleteNoticeAxios };