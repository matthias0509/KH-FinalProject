export const dummyInquiries = [
    { 
        id: 101, 
        type: "PAYMENT", 
        title: "지난달 결제 내역 확인 요청", 
        status: "답변 완료", 
        date: "2024.12.10", 
        replyDate: "2024.12.12",
        content: "11월 15일에 결제한 내역이 카드 명세서에 보이지 않습니다. 확인 부탁드립니다.",
        replyContent: "안녕하세요, 고객님. 해당 결제 건은 시스템 오류로 인해 일시적으로 누락되었으나, 12월 12일자로 정상 반영 처리되었습니다. 이용에 불편을 드려 죄송합니다. 감사합니다."
    },
    { 
        id: 102, 
        type: "PRODUCT", 
        title: "A 상품 상세 스펙 문의", 
        status: "접수 완료", 
        date: "2024.12.12", 
        replyDate: null,
        content: "A 상품의 최대 허용 중량이 어떻게 되나요? 상세 페이지에 정보가 없어서 문의드립니다.",
        replyContent: null
    },
    { 
        id: 103, 
        type: "ERROR", 
        title: "로그인 시 간헐적 오류 발생", 
        status: "답변 완료", 
        date: "2024.12.01", 
        replyDate: "2024.12.03",
        content: "특정 브라우저에서 로그인 버튼 클릭 시 'Internal Server Error'가 가끔 발생합니다. 캡처 화면 첨부했습니다.",
        replyContent: "고객님, 불편을 드려 죄송합니다. 해당 오류는 임시 배포 서버 문제였으며, 현재 수정 완료되었습니다. 다시 시도해 주시기 바랍니다."
    },
];

// 문의 유형 코드 -> 이름 매핑
export const INQUIRY_TYPE_MAP = {
    PAYMENT: "결제/환불",
    PRODUCT: "상품/서비스",
    ERROR: "시스템 오류",
    ACCOUNT: "계정/회원 정보",
    OTHER: "기타",
};