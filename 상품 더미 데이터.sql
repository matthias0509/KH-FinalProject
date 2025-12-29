-- 자동 생성된 더미 데이터 (node scripts/generate-product-dummy.js)
SET DEFINE OFF;
-- === 베이커리 셀러 1 ===
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME, NICKNAME, BIRTH_DATE,
    GENDER, EMAIL, PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS, ENROLL_DATE,
    USER_YN, USER_ROLE
) VALUES (
    SEQ_TB_USER_NO.NEXTVAL,
    'demo_bakery_1',
    '$2a$10$demoHashedPassword',
    '베이커리 셀러',
    '베이커리메이커1',
    DATE '1990-01-01',
    'F',
    'demo_bakery_1@foodding.com',
    '010-1000-1001',
    NULL,
    NULL,
    '04500',
    '서울특별시 성수구 성수동',
    '1호',
    SYSDATE,
    'Y',
    'SELLER'
);
INSERT INTO SELLER_PROFILE (
    SELLER_NO, INTRODUCTION, USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '베이커리 전문 셀러로, 지역 생산자와 협업하고 있습니다.',
    SEQ_TB_USER_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '한정판 천연 발효빵',
    '베이커리 카테고리에서 선보이는 한정판 천연 발효빵 프로젝트입니다.',
    '<p>한정판 천연 발효빵 프로젝트는 베이커리 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["구독자 전용 커뮤니티에서 다음 시즌을 함께 기획합니다.","비건/글루텐 프리 옵션을 선택할 수 있습니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-21"},{"title":"펀딩 종료","date":"2025-04-25"},{"title":"배송 시작","date":"2025-05-14"}]}',
    15039327,
    16762726,
    DATE '2025-03-21',
    DATE '2025-04-25',
    DATE '2025-05-14',
    'OPEN',
    '베이커리',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    40329,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    84960,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '장인 통밀 스콘',
    '베이커리 카테고리에서 선보이는 장인 통밀 스콘 프로젝트입니다.',
    '<p>장인 통밀 스콘 프로젝트는 베이커리 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["하루 생산량을 제한해 신선도를 유지합니다.","친환경 패키징을 도입해 포장재를 줄였습니다."],"timeline":[{"title":"오픈 준비","date":"2025-02-17"},{"title":"펀딩 종료","date":"2025-03-20"},{"title":"배송 시작","date":"2025-03-30"}]}',
    8023952,
    6497861,
    DATE '2025-02-17',
    DATE '2025-03-20',
    DATE '2025-03-30',
    'OPEN',
    '베이커리',
    'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    45268,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    29396,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '스페셜 통밀 스콘',
    '베이커리 카테고리에서 선보이는 스페셜 통밀 스콘 프로젝트입니다.',
    '<p>스페셜 통밀 스콘 프로젝트는 베이커리 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["지역 농가와의 직거래로 신선한 원재료를 사용합니다.","하루 생산량을 제한해 신선도를 유지합니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-03"},{"title":"펀딩 종료","date":"2025-03-29"},{"title":"배송 시작","date":"2025-04-14"}]}',
    8692398,
    12474851,
    DATE '2025-03-03',
    DATE '2025-03-29',
    DATE '2025-04-14',
    'OPEN',
    '베이커리',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    44541,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    61388,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 디저트 셀러 2 ===
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME, NICKNAME, BIRTH_DATE,
    GENDER, EMAIL, PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS, ENROLL_DATE,
    USER_YN, USER_ROLE
) VALUES (
    SEQ_TB_USER_NO.NEXTVAL,
    'demo_dessert_2',
    '$2a$10$demoHashedPassword',
    '디저트 셀러',
    '디저트메이커2',
    DATE '1990-01-01',
    'F',
    'demo_dessert_2@foodding.com',
    '010-1000-1002',
    NULL,
    NULL,
    '04500',
    '서울특별시 성수구 성수동',
    '2호',
    SYSDATE,
    'Y',
    'SELLER'
);
INSERT INTO SELLER_PROFILE (
    SELLER_NO, INTRODUCTION, USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '디저트 전문 셀러로, 지역 생산자와 협업하고 있습니다.',
    SEQ_TB_USER_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '시그니처 초콜릿 한정판',
    '디저트 카테고리에서 선보이는 시그니처 초콜릿 한정판 프로젝트입니다.',
    '<p>시그니처 초콜릿 한정판 프로젝트는 디저트 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["지역 농가와의 직거래로 신선한 원재료를 사용합니다.","친환경 패키징을 도입해 포장재를 줄였습니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-12"},{"title":"펀딩 종료","date":"2025-04-12"},{"title":"배송 시작","date":"2025-05-02"}]}',
    11831211,
    12028320,
    DATE '2025-03-12',
    DATE '2025-04-12',
    DATE '2025-05-02',
    'OPEN',
    '디저트',
    'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    48730,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    78439,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '한정판 프리미엄 케이크',
    '디저트 카테고리에서 선보이는 한정판 프리미엄 케이크 프로젝트입니다.',
    '<p>한정판 프리미엄 케이크 프로젝트는 디저트 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["하루 생산량을 제한해 신선도를 유지합니다.","비건/글루텐 프리 옵션을 선택할 수 있습니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-10"},{"title":"펀딩 종료","date":"2025-04-15"},{"title":"배송 시작","date":"2025-04-27"}]}',
    19319391,
    23181539,
    DATE '2025-03-10',
    DATE '2025-04-15',
    DATE '2025-04-27',
    'OPEN',
    '디저트',
    'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    51017,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    25963,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '수제 시그니처 마카롱',
    '디저트 카테고리에서 선보이는 수제 시그니처 마카롱 프로젝트입니다.',
    '<p>수제 시그니처 마카롱 프로젝트는 디저트 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["구독자 전용 커뮤니티에서 다음 시즌을 함께 기획합니다.","비건/글루텐 프리 옵션을 선택할 수 있습니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-03"},{"title":"펀딩 종료","date":"2025-04-10"},{"title":"배송 시작","date":"2025-04-22"}]}',
    17728602,
    17721999,
    DATE '2025-03-03',
    DATE '2025-04-10',
    DATE '2025-04-22',
    'OPEN',
    '디저트',
    'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    30671,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    76078,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 한식 셀러 3 ===
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME, NICKNAME, BIRTH_DATE,
    GENDER, EMAIL, PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS, ENROLL_DATE,
    USER_YN, USER_ROLE
) VALUES (
    SEQ_TB_USER_NO.NEXTVAL,
    'demo_kfood_3',
    '$2a$10$demoHashedPassword',
    '한식 셀러',
    '한식메이커3',
    DATE '1990-01-01',
    'F',
    'demo_kfood_3@foodding.com',
    '010-1000-1003',
    NULL,
    NULL,
    '04500',
    '서울특별시 성수구 성수동',
    '3호',
    SYSDATE,
    'Y',
    'SELLER'
);
INSERT INTO SELLER_PROFILE (
    SELLER_NO, INTRODUCTION, USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '한식 전문 셀러로, 지역 생산자와 협업하고 있습니다.',
    SEQ_TB_USER_NO.CURRVAL
);

INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    53832,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    49205,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '수제 할머니 손맛 한상',
    '한식 카테고리에서 선보이는 수제 할머니 손맛 한상 프로젝트입니다.',
    '<p>수제 할머니 손맛 한상 프로젝트는 한식 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["구독자 전용 커뮤니티에서 다음 시즌을 함께 기획합니다.","하루 생산량을 제한해 신선도를 유지합니다."],"timeline":[{"title":"오픈 준비","date":"2025-02-23"},{"title":"펀딩 종료","date":"2025-03-24"},{"title":"배송 시작","date":"2025-04-13"}]}',
    10459841,
    12449060,
    DATE '2025-02-23',
    DATE '2025-03-24',
    DATE '2025-04-13',
    'OPEN',
    '한식',
    'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    28375,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    25396,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '장인 장독대 프로젝트',
    '한식 카테고리에서 선보이는 장인 장독대 프로젝트 프로젝트입니다.',
    '<p>장인 장독대 프로젝트 프로젝트는 한식 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["비건/글루텐 프리 옵션을 선택할 수 있습니다.","하루 생산량을 제한해 신선도를 유지합니다."],"timeline":[{"title":"오픈 준비","date":"2025-02-28"},{"title":"펀딩 종료","date":"2025-04-07"},{"title":"배송 시작","date":"2025-04-25"}]}',
    8215900,
    7044242,
    DATE '2025-02-28',
    DATE '2025-04-07',
    DATE '2025-04-25',
    'OPEN',
    '한식',
    'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    78807,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    64557,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 양식 셀러 4 ===
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME, NICKNAME, BIRTH_DATE,
    GENDER, EMAIL, PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS, ENROLL_DATE,
    USER_YN, USER_ROLE
) VALUES (
    SEQ_TB_USER_NO.NEXTVAL,
    'demo_wfood_4',
    '$2a$10$demoHashedPassword',
    '양식 셀러',
    '양식메이커4',
    DATE '1990-01-01',
    'F',
    'demo_wfood_4@foodding.com',
    '010-1000-1004',
    NULL,
    NULL,
    '04500',
    '서울특별시 성수구 성수동',
    '4호',
    SYSDATE,
    'Y',
    'SELLER'
);
INSERT INTO SELLER_PROFILE (
    SELLER_NO, INTRODUCTION, USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '양식 전문 셀러로, 지역 생산자와 협업하고 있습니다.',
    SEQ_TB_USER_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '스페셜 지중해 플레이트',
    '양식 카테고리에서 선보이는 스페셜 지중해 플레이트 프로젝트입니다.',
    '<p>스페셜 지중해 플레이트 프로젝트는 양식 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["친환경 패키징을 도입해 포장재를 줄였습니다.","비건/글루텐 프리 옵션을 선택할 수 있습니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-30"},{"title":"펀딩 종료","date":"2025-05-05"},{"title":"배송 시작","date":"2025-05-24"}]}',
    13017594,
    13251325,
    DATE '2025-03-30',
    DATE '2025-05-05',
    DATE '2025-05-24',
    'OPEN',
    '양식',
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    70037,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    31155,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '시그니처 지중해 플레이트',
    '양식 카테고리에서 선보이는 시그니처 지중해 플레이트 프로젝트입니다.',
    '<p>시그니처 지중해 플레이트 프로젝트는 양식 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["지역 농가와의 직거래로 신선한 원재료를 사용합니다.","친환경 패키징을 도입해 포장재를 줄였습니다."],"timeline":[{"title":"오픈 준비","date":"2025-02-02"},{"title":"펀딩 종료","date":"2025-03-05"},{"title":"배송 시작","date":"2025-03-17"}]}',
    17732308,
    17195726,
    DATE '2025-02-02',
    DATE '2025-03-05',
    DATE '2025-03-17',
    'OPEN',
    '양식',
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    44564,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    36156,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '정기구독 장인 스테이크',
    '양식 카테고리에서 선보이는 정기구독 장인 스테이크 프로젝트입니다.',
    '<p>정기구독 장인 스테이크 프로젝트는 양식 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["친환경 패키징을 도입해 포장재를 줄였습니다.","친환경 패키징을 도입해 포장재를 줄였습니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-14"},{"title":"펀딩 종료","date":"2025-04-19"},{"title":"배송 시작","date":"2025-04-29"}]}',
    19271272,
    21232370,
    DATE '2025-03-14',
    DATE '2025-04-19',
    DATE '2025-04-29',
    'OPEN',
    '양식',
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    29455,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    77882,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 일식 셀러 5 ===
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME, NICKNAME, BIRTH_DATE,
    GENDER, EMAIL, PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS, ENROLL_DATE,
    USER_YN, USER_ROLE
) VALUES (
    SEQ_TB_USER_NO.NEXTVAL,
    'demo_jfood_5',
    '$2a$10$demoHashedPassword',
    '일식 셀러',
    '일식메이커5',
    DATE '1990-01-01',
    'F',
    'demo_jfood_5@foodding.com',
    '010-1000-1005',
    NULL,
    NULL,
    '04500',
    '서울특별시 성수구 성수동',
    '5호',
    SYSDATE,
    'Y',
    'SELLER'
);
INSERT INTO SELLER_PROFILE (
    SELLER_NO, INTRODUCTION, USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '일식 전문 셀러로, 지역 생산자와 협업하고 있습니다.',
    SEQ_TB_USER_NO.CURRVAL
);

INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '정기구독 초밥 바 세트',
    '일식 카테고리에서 선보이는 정기구독 초밥 바 세트 프로젝트입니다.',
    '<p>정기구독 초밥 바 세트 프로젝트는 일식 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["비건/글루텐 프리 옵션을 선택할 수 있습니다.","비건/글루텐 프리 옵션을 선택할 수 있습니다."],"timeline":[{"title":"오픈 준비","date":"2025-02-14"},{"title":"펀딩 종료","date":"2025-03-26"},{"title":"배송 시작","date":"2025-04-11"}]}',
    17807588,
    21502979,
    DATE '2025-02-14',
    DATE '2025-03-26',
    DATE '2025-04-11',
    'OPEN',
    '일식',
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    24759,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    70101,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '장인 초밥 바 세트',
    '일식 카테고리에서 선보이는 장인 초밥 바 세트 프로젝트입니다.',
    '<p>장인 초밥 바 세트 프로젝트는 일식 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["친환경 패키징을 도입해 포장재를 줄였습니다.","구독자 전용 커뮤니티에서 다음 시즌을 함께 기획합니다."],"timeline":[{"title":"오픈 준비","date":"2025-02-25"},{"title":"펀딩 종료","date":"2025-03-25"},{"title":"배송 시작","date":"2025-04-07"}]}',
    18163004,
    22305935,
    DATE '2025-02-25',
    DATE '2025-03-25',
    DATE '2025-04-07',
    'OPEN',
    '일식',
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    57700,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    56898,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 음료 셀러 6 ===
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME, NICKNAME, BIRTH_DATE,
    GENDER, EMAIL, PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS, ENROLL_DATE,
    USER_YN, USER_ROLE
) VALUES (
    SEQ_TB_USER_NO.NEXTVAL,
    'demo_beverage_6',
    '$2a$10$demoHashedPassword',
    '음료 셀러',
    '음료메이커6',
    DATE '1990-01-01',
    'F',
    'demo_beverage_6@foodding.com',
    '010-1000-1006',
    NULL,
    NULL,
    '04500',
    '서울특별시 성수구 성수동',
    '6호',
    SYSDATE,
    'Y',
    'SELLER'
);
INSERT INTO SELLER_PROFILE (
    SELLER_NO, INTRODUCTION, USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '음료 전문 셀러로, 지역 생산자와 협업하고 있습니다.',
    SEQ_TB_USER_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '수제 싱글오리진 커피',
    '음료 카테고리에서 선보이는 수제 싱글오리진 커피 프로젝트입니다.',
    '<p>수제 싱글오리진 커피 프로젝트는 음료 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["친환경 패키징을 도입해 포장재를 줄였습니다.","지역 농가와의 직거래로 신선한 원재료를 사용합니다."],"timeline":[{"title":"오픈 준비","date":"2025-02-17"},{"title":"펀딩 종료","date":"2025-03-28"},{"title":"배송 시작","date":"2025-04-08"}]}',
    17155942,
    16657203,
    DATE '2025-02-17',
    DATE '2025-03-28',
    DATE '2025-04-08',
    'OPEN',
    '음료',
    'https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    45921,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    65210,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '스페셜 핑거라임 에이드',
    '음료 카테고리에서 선보이는 스페셜 핑거라임 에이드 프로젝트입니다.',
    '<p>스페셜 핑거라임 에이드 프로젝트는 음료 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["구독자 전용 커뮤니티에서 다음 시즌을 함께 기획합니다.","하루 생산량을 제한해 신선도를 유지합니다."],"timeline":[{"title":"오픈 준비","date":"2025-02-18"},{"title":"펀딩 종료","date":"2025-03-21"},{"title":"배송 시작","date":"2025-04-10"}]}',
    9828526,
    14362624,
    DATE '2025-02-18',
    DATE '2025-03-21',
    DATE '2025-04-10',
    'OPEN',
    '음료',
    'https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    59069,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    53412,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '장인 로컬 과일 스무디',
    '음료 카테고리에서 선보이는 장인 로컬 과일 스무디 프로젝트입니다.',
    '<p>장인 로컬 과일 스무디 프로젝트는 음료 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["구독자 전용 커뮤니티에서 다음 시즌을 함께 기획합니다.","하루 생산량을 제한해 신선도를 유지합니다."],"timeline":[{"title":"오픈 준비","date":"2025-02-11"},{"title":"펀딩 종료","date":"2025-03-18"},{"title":"배송 시작","date":"2025-03-29"}]}',
    19382047,
    20565719,
    DATE '2025-02-11',
    DATE '2025-03-18',
    DATE '2025-03-29',
    'OPEN',
    '음료',
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    39897,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    61165,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 건강식품 셀러 7 ===
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME, NICKNAME, BIRTH_DATE,
    GENDER, EMAIL, PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS, ENROLL_DATE,
    USER_YN, USER_ROLE
) VALUES (
    SEQ_TB_USER_NO.NEXTVAL,
    'demo_health_7',
    '$2a$10$demoHashedPassword',
    '건강식품 셀러',
    '건강식품메이커7',
    DATE '1990-01-01',
    'F',
    'demo_health_7@foodding.com',
    '010-1000-1007',
    NULL,
    NULL,
    '04500',
    '서울특별시 성수구 성수동',
    '7호',
    SYSDATE,
    'Y',
    'SELLER'
);
INSERT INTO SELLER_PROFILE (
    SELLER_NO, INTRODUCTION, USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '건강식품 전문 셀러로, 지역 생산자와 협업하고 있습니다.',
    SEQ_TB_USER_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '장인 슈퍼푸드 그린스',
    '건강식품 카테고리에서 선보이는 장인 슈퍼푸드 그린스 프로젝트입니다.',
    '<p>장인 슈퍼푸드 그린스 프로젝트는 건강식품 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["지역 농가와의 직거래로 신선한 원재료를 사용합니다.","하루 생산량을 제한해 신선도를 유지합니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-05"},{"title":"펀딩 종료","date":"2025-04-03"},{"title":"배송 시작","date":"2025-04-15"}]}',
    18692888,
    18228793,
    DATE '2025-03-05',
    DATE '2025-04-03',
    DATE '2025-04-15',
    'OPEN',
    '건강식품',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    25329,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    46719,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '시그니처 유산균 셋업',
    '건강식품 카테고리에서 선보이는 시그니처 유산균 셋업 프로젝트입니다.',
    '<p>시그니처 유산균 셋업 프로젝트는 건강식품 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["친환경 패키징을 도입해 포장재를 줄였습니다.","하루 생산량을 제한해 신선도를 유지합니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-31"},{"title":"펀딩 종료","date":"2025-05-07"},{"title":"배송 시작","date":"2025-05-18"}]}',
    11230451,
    12965811,
    DATE '2025-03-31',
    DATE '2025-05-07',
    DATE '2025-05-18',
    'OPEN',
    '건강식품',
    'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    31555,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    39270,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '수제 저당 전통청',
    '건강식품 카테고리에서 선보이는 수제 저당 전통청 프로젝트입니다.',
    '<p>수제 저당 전통청 프로젝트는 건강식품 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["친환경 패키징을 도입해 포장재를 줄였습니다.","비건/글루텐 프리 옵션을 선택할 수 있습니다."],"timeline":[{"title":"오픈 준비","date":"2025-02-23"},{"title":"펀딩 종료","date":"2025-04-04"},{"title":"배송 시작","date":"2025-04-23"}]}',
    13076039,
    11218340,
    DATE '2025-02-23',
    DATE '2025-04-04',
    DATE '2025-04-23',
    'OPEN',
    '건강식품',
    'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    22841,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    76715,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 간편식/밀키트 셀러 8 ===
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME, NICKNAME, BIRTH_DATE,
    GENDER, EMAIL, PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS, ENROLL_DATE,
    USER_YN, USER_ROLE
) VALUES (
    SEQ_TB_USER_NO.NEXTVAL,
    'demo_easy_8',
    '$2a$10$demoHashedPassword',
    '간편식/밀키트 셀러',
    '간편식/밀키트메이커8',
    DATE '1990-01-01',
    'F',
    'demo_easy_8@foodding.com',
    '010-1000-1008',
    NULL,
    NULL,
    '04500',
    '서울특별시 성수구 성수동',
    '8호',
    SYSDATE,
    'Y',
    'SELLER'
);
INSERT INTO SELLER_PROFILE (
    SELLER_NO, INTRODUCTION, USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '간편식/밀키트 전문 셀러로, 지역 생산자와 협업하고 있습니다.',
    SEQ_TB_USER_NO.CURRVAL
);


INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '정기구독 캠핑 파티',
    '간편식/밀키트 카테고리에서 선보이는 정기구독 캠핑 파티 프로젝트입니다.',
    '<p>정기구독 캠핑 파티 프로젝트는 간편식/밀키트 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["지역 농가와의 직거래로 신선한 원재료를 사용합니다.","하루 생산량을 제한해 신선도를 유지합니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-06"},{"title":"펀딩 종료","date":"2025-04-15"},{"title":"배송 시작","date":"2025-04-26"}]}',
    12074778,
    12121903,
    DATE '2025-03-06',
    DATE '2025-04-15',
    DATE '2025-04-26',
    'OPEN',
    '간편식/밀키트',
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    71146,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    75260,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 비건/대체식품 셀러 9 ===
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME, NICKNAME, BIRTH_DATE,
    GENDER, EMAIL, PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS, ENROLL_DATE,
    USER_YN, USER_ROLE
) VALUES (
    SEQ_TB_USER_NO.NEXTVAL,
    'demo_vegan_9',
    '$2a$10$demoHashedPassword',
    '비건/대체식품 셀러',
    '비건/대체식품메이커9',
    DATE '1990-01-01',
    'F',
    'demo_vegan_9@foodding.com',
    '010-1000-1009',
    NULL,
    NULL,
    '04500',
    '서울특별시 성수구 성수동',
    '9호',
    SYSDATE,
    'Y',
    'SELLER'
);
INSERT INTO SELLER_PROFILE (
    SELLER_NO, INTRODUCTION, USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '비건/대체식품 전문 셀러로, 지역 생산자와 협업하고 있습니다.',
    SEQ_TB_USER_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '정기구독 대체육 버거',
    '비건/대체식품 카테고리에서 선보이는 정기구독 대체육 버거 프로젝트입니다.',
    '<p>정기구독 대체육 버거 프로젝트는 비건/대체식품 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["비건/글루텐 프리 옵션을 선택할 수 있습니다.","구독자 전용 커뮤니티에서 다음 시즌을 함께 기획합니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-25"},{"title":"펀딩 종료","date":"2025-04-20"},{"title":"배송 시작","date":"2025-05-08"}]}',
    10537354,
    11901748,
    DATE '2025-03-25',
    DATE '2025-04-20',
    DATE '2025-05-08',
    'OPEN',
    '비건/대체식품',
    'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    56423,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    59463,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '프리미엄 지속가능 스프레드',
    '비건/대체식품 카테고리에서 선보이는 프리미엄 지속가능 스프레드 프로젝트입니다.',
    '<p>프리미엄 지속가능 스프레드 프로젝트는 비건/대체식품 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["비건/글루텐 프리 옵션을 선택할 수 있습니다.","하루 생산량을 제한해 신선도를 유지합니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-22"},{"title":"펀딩 종료","date":"2025-04-17"},{"title":"배송 시작","date":"2025-04-28"}]}',
    11466066,
    15146266,
    DATE '2025-03-22',
    DATE '2025-04-17',
    DATE '2025-04-28',
    'OPEN',
    '비건/대체식품',
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    27099,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    70523,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '수제 대체육 버거',
    '비건/대체식품 카테고리에서 선보이는 수제 대체육 버거 프로젝트입니다.',
    '<p>수제 대체육 버거 프로젝트는 비건/대체식품 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["하루 생산량을 제한해 신선도를 유지합니다.","비건/글루텐 프리 옵션을 선택할 수 있습니다."],"timeline":[{"title":"오픈 준비","date":"2025-02-13"},{"title":"펀딩 종료","date":"2025-03-12"},{"title":"배송 시작","date":"2025-04-01"}]}',
    17265209,
    18672557,
    DATE '2025-02-13',
    DATE '2025-03-12',
    DATE '2025-04-01',
    'OPEN',
    '비건/대체식품',
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    28646,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    77340,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 간식/스낵 셀러 10 ===
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME, NICKNAME, BIRTH_DATE,
    GENDER, EMAIL, PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS, ENROLL_DATE,
    USER_YN, USER_ROLE
) VALUES (
    SEQ_TB_USER_NO.NEXTVAL,
    'demo_snack_10',
    '$2a$10$demoHashedPassword',
    '간식/스낵 셀러',
    '간식/스낵메이커10',
    DATE '1990-01-01',
    'F',
    'demo_snack_10@foodding.com',
    '010-1000-1010',
    NULL,
    NULL,
    '04500',
    '서울특별시 성수구 성수동',
    '10호',
    SYSDATE,
    'Y',
    'SELLER'
);
INSERT INTO SELLER_PROFILE (
    SELLER_NO, INTRODUCTION, USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '간식/스낵 전문 셀러로, 지역 생산자와 협업하고 있습니다.',
    SEQ_TB_USER_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '시그니처 전통 강정',
    '간식/스낵 카테고리에서 선보이는 시그니처 전통 강정 프로젝트입니다.',
    '<p>시그니처 전통 강정 프로젝트는 간식/스낵 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["구독자 전용 커뮤니티에서 다음 시즌을 함께 기획합니다.","비건/글루텐 프리 옵션을 선택할 수 있습니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-18"},{"title":"펀딩 종료","date":"2025-04-22"},{"title":"배송 시작","date":"2025-05-03"}]}',
    16436490,
    19389020,
    DATE '2025-03-18',
    DATE '2025-04-22',
    DATE '2025-05-03',
    'OPEN',
    '간식/스낵',
    'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    69107,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    72904,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '수제 저당 젤리',
    '간식/스낵 카테고리에서 선보이는 수제 저당 젤리 프로젝트입니다.',
    '<p>수제 저당 젤리 프로젝트는 간식/스낵 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["하루 생산량을 제한해 신선도를 유지합니다.","지역 농가와의 직거래로 신선한 원재료를 사용합니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-19"},{"title":"펀딩 종료","date":"2025-04-20"},{"title":"배송 시작","date":"2025-04-30"}]}',
    11942713,
    12886575,
    DATE '2025-03-19',
    DATE '2025-04-20',
    DATE '2025-04-30',
    'OPEN',
    '간식/스낵',
    'https://images.unsplash.com/photo-1430163393927-3dab9af7ea38?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    40138,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    75000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '정기구독 전통 강정',
    '간식/스낵 카테고리에서 선보이는 정기구독 전통 강정 프로젝트입니다.',
    '<p>정기구독 전통 강정 프로젝트는 간식/스낵 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["비건/글루텐 프리 옵션을 선택할 수 있습니다.","하루 생산량을 제한해 신선도를 유지합니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-17"},{"title":"펀딩 종료","date":"2025-04-23"},{"title":"배송 시작","date":"2025-05-05"}]}',
    11107997,
    14907934,
    DATE '2025-03-17',
    DATE '2025-04-23',
    DATE '2025-05-05',
    'OPEN',
    '간식/스낵',
    'https://images.unsplash.com/photo-1430163393927-3dab9af7ea38?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    27228,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    67521,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 지역/로컬 셀러 11 ===
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME, NICKNAME, BIRTH_DATE,
    GENDER, EMAIL, PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS, ENROLL_DATE,
    USER_YN, USER_ROLE
) VALUES (
    SEQ_TB_USER_NO.NEXTVAL,
    'demo_local_11',
    '$2a$10$demoHashedPassword',
    '지역/로컬 셀러',
    '지역/로컬메이커11',
    DATE '1990-01-01',
    'F',
    'demo_local_11@foodding.com',
    '010-1000-1011',
    NULL,
    NULL,
    '04500',
    '서울특별시 성수구 성수동',
    '11호',
    SYSDATE,
    'Y',
    'SELLER'
);
INSERT INTO SELLER_PROFILE (
    SELLER_NO, INTRODUCTION, USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '지역/로컬 전문 셀러로, 지역 생산자와 협업하고 있습니다.',
    SEQ_TB_USER_NO.CURRVAL
);

INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    62879,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    45344,
    SEQ_PRODUCT_NO.CURRVAL
);

INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '시그니처 지역 특산물',
    '지역/로컬 카테고리에서 선보이는 시그니처 지역 특산물 프로젝트입니다.',
    '<p>시그니처 지역 특산물 프로젝트는 지역/로컬 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["구독자 전용 커뮤니티에서 다음 시즌을 함께 기획합니다.","친환경 패키징을 도입해 포장재를 줄였습니다."],"timeline":[{"title":"오픈 준비","date":"2025-02-28"},{"title":"펀딩 종료","date":"2025-04-01"},{"title":"배송 시작","date":"2025-04-11"}]}',
    14282347,
    15068142,
    DATE '2025-02-28',
    DATE '2025-04-01',
    DATE '2025-04-11',
    'OPEN',
    '지역/로컬',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    21734,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    56225,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 반려동물 간식 셀러 12 ===
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME, NICKNAME, BIRTH_DATE,
    GENDER, EMAIL, PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS, ENROLL_DATE,
    USER_YN, USER_ROLE
) VALUES (
    SEQ_TB_USER_NO.NEXTVAL,
    'demo_pet_12',
    '$2a$10$demoHashedPassword',
    '반려동물 간식 셀러',
    '반려동물 간식메이커12',
    DATE '1990-01-01',
    'F',
    'demo_pet_12@foodding.com',
    '010-1000-1012',
    NULL,
    NULL,
    '04500',
    '서울특별시 성수구 성수동',
    '12호',
    SYSDATE,
    'Y',
    'SELLER'
);
INSERT INTO SELLER_PROFILE (
    SELLER_NO, INTRODUCTION, USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '반려동물 간식 전문 셀러로, 지역 생산자와 협업하고 있습니다.',
    SEQ_TB_USER_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '프리미엄 강아지 맞춤 사료',
    '반려동물 간식 카테고리에서 선보이는 프리미엄 강아지 맞춤 사료 프로젝트입니다.',
    '<p>프리미엄 강아지 맞춤 사료 프로젝트는 반려동물 간식 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["구독자 전용 커뮤니티에서 다음 시즌을 함께 기획합니다.","지역 농가와의 직거래로 신선한 원재료를 사용합니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-14"},{"title":"펀딩 종료","date":"2025-04-20"},{"title":"배송 시작","date":"2025-05-06"}]}',
    8455552,
    13293869,
    DATE '2025-03-14',
    DATE '2025-04-20',
    DATE '2025-05-06',
    'OPEN',
    '반려동물 간식',
    'https://images.unsplash.com/photo-1518378188025-22bd89516ee2?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    34799,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    58576,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '프리미엄 수제 펫트릿',
    '반려동물 간식 카테고리에서 선보이는 프리미엄 수제 펫트릿 프로젝트입니다.',
    '<p>프리미엄 수제 펫트릿 프로젝트는 반려동물 간식 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["구독자 전용 커뮤니티에서 다음 시즌을 함께 기획합니다.","비건/글루텐 프리 옵션을 선택할 수 있습니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-27"},{"title":"펀딩 종료","date":"2025-05-01"},{"title":"배송 시작","date":"2025-05-13"}]}',
    17015477,
    21486225,
    DATE '2025-03-27',
    DATE '2025-05-01',
    DATE '2025-05-13',
    'OPEN',
    '반려동물 간식',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    66137,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    29110,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO PRODUCT (
    PRODUCT_NO, PRODUCT_TITLE, PRODUCT_DESC, STORY_HTML, STORY_JSON,
    TARGET_AMOUNT, CURRENT_AMOUNT, FUND_START_DATE, FUND_END_DATE, SHIP_START_DATE,
    PRODUCT_STATUS, CATEGORY, ORIGIN_THUMBNAIL, CREATE_DATE, PRODUCT_YN, SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '프리미엄 수제 펫트릿',
    '반려동물 간식 카테고리에서 선보이는 프리미엄 수제 펫트릿 프로젝트입니다.',
    '<p>프리미엄 수제 펫트릿 프로젝트는 반려동물 간식 애호가들과 함께 만든 기획으로, 지역 재료를 엄선해 제작합니다.</p>',
    '{"highlights":["친환경 패키징을 도입해 포장재를 줄였습니다.","하루 생산량을 제한해 신선도를 유지합니다."],"timeline":[{"title":"오픈 준비","date":"2025-03-30"},{"title":"펀딩 종료","date":"2025-05-04"},{"title":"배송 시작","date":"2025-05-14"}]}',
    15347649,
    16169527,
    DATE '2025-03-30',
    DATE '2025-05-04',
    DATE '2025-05-14',
    'OPEN',
    '반려동물 간식',
    'https://images.unsplash.com/photo-1518378188025-22bd89516ee2?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    SEQ_SELLER_PROFILE_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    79379,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    82439,
    SEQ_PRODUCT_NO.CURRVAL
);
COMMIT;
