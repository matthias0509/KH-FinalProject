-- **********************************************
-- 주의사항: 기존 데이터를 모두 삭제 후 새 더미 데이터를 삽입합니다.
-- 대상 테이블: QNA, NOTICE
-- *** QNA 작성자: USER_NO "1번" 사용자 기준 ***
-- **********************************************

-- 1. 기존 데이터 전체 삭제
DELETE FROM QNA;
DELETE FROM NOTICE;

-- 2. QNA 더미 데이터 삽입 (총 20개)

-- 2-1. 답변 완료 데이터 (10개)
INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, ANSWER_CONTENT, ANSWER_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '배송지 변경 문의', '이사 예정이라 주소지 변경하고 싶습니다.', SYSDATE - 20, '안녕하세요 서포터님! 배송지 변경 처리 완료되었습니다.', SYSDATE - 19, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, ANSWER_CONTENT, ANSWER_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '제품 보관 방법', '냉장고에 넣어야 하나요?', SYSDATE - 19, '상온 보관이 가능하나 개봉 후에는 냉장 보관을 권장합니다.', SYSDATE - 18, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, ANSWER_CONTENT, ANSWER_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '환불 절차 안내 부탁드려요', '단순 변심으로 취소하고 싶습니다.', SYSDATE - 18, '펀딩 종료 전까지는 마이페이지에서 직접 취소가 가능합니다.', SYSDATE - 17, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, ANSWER_CONTENT, ANSWER_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '선물용 포장 옵션', '선물용으로 박스 포장이 따로 있나요?', SYSDATE - 17, '현재 기본 패키지가 선물용으로 구성되어 별도 옵션은 없습니다.', SYSDATE - 16, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, ANSWER_CONTENT, ANSWER_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '영수증 발급 문의', '법인카드 영수증이 필요한데 어디서 출력하나요?', SYSDATE - 16, '결제 완료 후 내 펀딩 내역에서 출력하실 수 있습니다.', SYSDATE - 15, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, ANSWER_CONTENT, ANSWER_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '유통기한 확인', '이번에 받은 제품 기한이 언제까지죠?', SYSDATE - 15, '패키지 하단에 표기된 날짜로부터 6개월입니다.', SYSDATE - 14, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, ANSWER_CONTENT, ANSWER_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '추가 구매 하고 싶어요', '펀딩이 끝났는데 추가로 살 수 없나요?', SYSDATE - 14, '펀딩 종료 후 자사몰에서 상시 판매가 진행될 예정입니다.', SYSDATE - 13, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, ANSWER_CONTENT, ANSWER_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '비건 인증 여부', '완전 비건 제품인가요?', SYSDATE - 13, '네, 동물성 원료를 사용하지 않은 인증 제품입니다.', SYSDATE - 12, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, ANSWER_CONTENT, ANSWER_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '제주도 배송비', '제주도는 추가 비용 얼마인가요?', SYSDATE - 12, '도서산간 지역은 3,000원의 배송비가 추가됩니다.', SYSDATE - 11, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, ANSWER_CONTENT, ANSWER_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '포토 리뷰 이벤트', '리뷰 남겼는데 당첨자 발표 언제인가요?', SYSDATE - 11, '다음 주 월요일 새소식을 통해 공지될 예정입니다.', SYSDATE - 10, 1);


-- 2-2. 답변 대기 데이터 (10개)
INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '결제 카드 변경', '결제 예약된 카드를 바꾸고 싶어요.', SYSDATE - 9, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '배송 추적이 안 돼요', '송장 번호는 떴는데 조회가 안 됩니다.', SYSDATE - 8, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '알러지 성분 확인', '견과류가 포함되어 있나요?', SYSDATE - 7, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '대량 구매 할인 문의', '회사에서 100세트 사려는데 할인 되나요?', SYSDATE - 6, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '옵션 잘못 선택했어요', 'A세트인데 B세트로 변경 가능한가요?', SYSDATE - 5, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '오프라인 시식회 일정', '팝업 스토어 언제까지 운영하시나요?', SYSDATE - 4, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '구성품이 하나 누락됐습니다', '박스를 열어보니 소스가 없어요.', SYSDATE - 3, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '재펀딩 계획이 있으신지', '너무 맛있어서 또 펀딩하고 싶어요.', SYSDATE - 2, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '쿠폰 적용 오류', '웰컴 쿠폰이 적용이 안 됩니다.', SYSDATE - 1, 1);

INSERT INTO QNA (QNA_NO, QNA_TITLE, QNA_CONTENT, QNA_DATE, USER_NO)
VALUES (SEQ_QNA_NO.NEXTVAL, '방금 문의한 내용 취소요', '직접 해결했습니다. 답변 안 주셔도 돼요!', SYSDATE, 1);


-- 3. NOTICE 더미 데이터 삽입 (총 20개)

-- 3-1. 서비스 이용 및 안내 관련 (5개)
INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[공지] Foodding 서비스 정식 오픈 안내', '안녕하세요, Foodding입니다. 오랜 준비 끝에 서비스를 정식 오픈하게 되었습니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[공지] 개인정보 처리방침 개정 안내 (2025/12)', '개인정보 보호법 개정에 따라 처리방침이 변경될 예정입니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[안내] 시스템 정기 점검으로 인한 서비스 일시 중단 안내', '더 나은 서비스를 위해 새벽 2시부터 4시까지 점검이 진행됩니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[안내] 고객센터 운영 시간 변경 안내', '동절기 고객센터 운영 시간이 오전 10시부터로 변경됩니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[공지] 신규 결제 수단(Apple Pay) 도입 안내', '이제 Foodding에서도 간편하게 Apple Pay를 이용하실 수 있습니다.', SYSDATE, 0, 'N');

-- 3-2. 배송 및 품질 관련 (5개)
INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[배송] 연말 택배 물량 증가로 인한 배송 지연 안내', '택배사 사정으로 인해 평소보다 1~2일 더 소요될 수 있습니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[품질] 신선식품 보관 및 섭취 가이드 안내', '펀딩하신 밀키트 상품의 신선도를 유지하는 최적의 방법입니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[배송] 제주 및 도서산간 지역 배송비 정책 변경 안내', '2026년부터 적용되는 추가 배송비 안내입니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[공지] 친환경 패키지(에코 박스) 도입 순차 적용 안내', '환경을 위해 테이프 없는 박스를 사용하기 시작합니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[배송] 1월 신년 연휴 배송 일정 공지', '신년 연휴 기간 동안의 배송 휴무 안내입니다.', SYSDATE, 0, 'N');

-- 3-3. 이벤트 및 혜택 관련 (5개)
INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[이벤트] 친구 초대 시 5,000원 쿠폰 무제한 증정!', '함께 맛있는 펀딩을 즐겨보세요! 친구를 초대하면 혜택을 드립니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[당첨자발표] 리뷰왕 이벤트 당첨자 안내 (11월)', '참여해주신 모든 분들께 감사드립니다. 선정되신 10분을 공개합니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[혜택] 신규 회원 가입 축하 웰컴 패키지 안내', '가입만 해도 드리는 3종 쿠폰 혜택을 확인하세요.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[이벤트] 얼리버드 전용 무료 배송권 사용 안내', '슈퍼 얼리버드 고객님들을 위한 특별 혜택 안내입니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[공지] 멤버십 등급별 혜택 리뉴얼 안내', '더 풍성해진 등급별 적립 혜택을 소개합니다.', SYSDATE, 0, 'N');

-- 3-4. 커뮤니티 및 기타 (5개)
INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[공지] 커뮤니티 클린 캠페인 안내', '타인에게 불쾌감을 주는 댓글은 제재 대상이 될 수 있습니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[안내] 펀딩금 반환 정책 변경 안내', '사용자 보호를 위해 펀딩금 반환 절차가 강화됩니다.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[공지] 푸딩(Foodding) 앱 2.0 업데이트 예고', '새로워진 디자인과 기능을 기대해 주세요!', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[안내] 메일 수신 동의 혜택 및 설정 방법', '혜택 정보를 놓치지 않으려면 수신 동의를 체크해 주세요.', SYSDATE, 0, 'N');

INSERT INTO NOTICE (NOTICE_NO, NOTICE_TITLE, NOTICE_CONTENT, NOTICE_CREATE_DATE, NOTICE_VIEW, NOTICE_YN)
VALUES (SEQ_NOTICE_NO.NEXTVAL, '[공지] 연말 결산: 2025년 가장 사랑받은 푸드 프로젝트 TOP 10', '여러분이 만들어주신 놀라운 기록들입니다.', SYSDATE, 0, 'N');

-- 4. 변경사항 영구 저장
COMMIT;