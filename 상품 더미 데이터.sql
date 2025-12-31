-- 자동 생성된 더미 데이터 (node scripts/generate-product-dummy.js)
SET DEFINE OFF;
-- === 베이커리 셀러 1 ===
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
    15040000,
    16762500,
    DATE '2025-12-29',
    DATE '2026-02-04',
    DATE '2026-02-07',
    'OPEN',
    '베이커리',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    40500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    85000,
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
    8020000,
    6498000,
    DATE '2025-12-27',
    DATE '2026-02-07',
    DATE '2026-02-10',
    'OPEN',
    '베이커리',
    'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    45500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    29500,
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
    8690000,
    12475000,
    DATE '2025-12-29',
    DATE '2026-02-22',
    DATE '2026-02-25',
    'OPEN',
    '베이커리',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    44500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    61500,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 디저트 셀러 2 ===
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
    11830000,
    12028500,
    DATE '2026-01-01',
    DATE '2026-02-14',
    DATE '2026-02-17',
    'OPEN',
    '디저트',
    'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    48500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    78500,
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
    19320000,
    23181500,
    DATE '2025-12-30',
    DATE '2026-02-26',
    DATE '2026-03-01',
    'OPEN',
    '디저트',
    'https://images.unsplash.com/photo-1511381939415-e44015466834?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    51000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    26000,
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
    17730000,
    17722000,
    DATE '2025-12-27',
    DATE '2026-02-16',
    DATE '2026-02-19',
    'OPEN',
    '디저트',
    'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    30500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    76000,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 한식 셀러 3 ===

INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    54000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    49000,
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
    10460000,
    12449000,
    DATE '2025-12-25',
    DATE '2026-02-09',
    DATE '2026-02-12',
    'OPEN',
    '한식',
    'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    28500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    25500,
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
    8220000,
    7044000,
    DATE '2026-01-05',
    DATE '2026-02-13',
    DATE '2026-02-16',
    'OPEN',
    '한식',
    'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    79000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    64500,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 양식 셀러 4 ===
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
    13020000,
    13251500,
    DATE '2025-12-28',
    DATE '2026-02-14',
    DATE '2026-02-17',
    'OPEN',
    '양식',
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    70000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    31000,
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
    17730000,
    17195500,
    DATE '2025-12-26',
    DATE '2026-02-11',
    DATE '2026-02-14',
    'OPEN',
    '양식',
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    44500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    36000,
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
    19270000,
    21232500,
    DATE '2025-12-25',
    DATE '2026-02-27',
    DATE '2026-03-02',
    'OPEN',
    '양식',
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    29500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    78000,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 일식 셀러 5 ===

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
    17810000,
    21503000,
    DATE '2026-01-02',
    DATE '2026-02-18',
    DATE '2026-02-21',
    'OPEN',
    '일식',
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    25000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    70000,
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
    18160000,
    22306000,
    DATE '2025-12-30',
    DATE '2026-02-01',
    DATE '2026-02-04',
    'OPEN',
    '일식',
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    57500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    57000,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 음료 셀러 6 ===
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
    17160000,
    16657000,
    DATE '2026-01-04',
    DATE '2026-02-25',
    DATE '2026-02-28',
    'OPEN',
    '음료',
    'https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    46000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    65000,
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
    9830000,
    14362500,
    DATE '2025-12-28',
    DATE '2026-02-06',
    DATE '2026-02-09',
    'OPEN',
    '음료',
    'https://images.unsplash.com/photo-1481391032119-d89fee407e44?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    59000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    53500,
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
    19380000,
    20565500,
    DATE '2025-12-31',
    DATE '2026-02-03',
    DATE '2026-02-06',
    'OPEN',
    '음료',
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    40000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    61000,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 건강식품 셀러 7 ===
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
    18690000,
    18229000,
    DATE '2025-12-29',
    DATE '2026-02-17',
    DATE '2026-02-20',
    'OPEN',
    '건강식품',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    25500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    46500,
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
    11230000,
    12966000,
    DATE '2025-12-25',
    DATE '2026-02-19',
    DATE '2026-02-22',
    'OPEN',
    '건강식품',
    'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    31500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    39500,
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
    13080000,
    11218500,
    DATE '2025-12-27',
    DATE '2026-02-04',
    DATE '2026-02-07',
    'OPEN',
    '건강식품',
    'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    23000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    76500,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 간편식/밀키트 셀러 8 ===


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
    12080000,
    12122000,
    DATE '2025-12-30',
    DATE '2026-02-03',
    DATE '2026-02-06',
    'OPEN',
    '간편식/밀키트',
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    71000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    75500,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 비건/대체식품 셀러 9 ===
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
    10540000,
    11901500,
    DATE '2025-12-26',
    DATE '2026-02-08',
    DATE '2026-02-11',
    'OPEN',
    '비건/대체식품',
    'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    56500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    59500,
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
    11470000,
    15146500,
    DATE '2026-01-04',
    DATE '2026-02-09',
    DATE '2026-02-12',
    'OPEN',
    '비건/대체식품',
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    27000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    70500,
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
    17270000,
    18672500,
    DATE '2025-12-25',
    DATE '2026-02-05',
    DATE '2026-02-08',
    'OPEN',
    '비건/대체식품',
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    28500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    77500,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 간식/스낵 셀러 10 ===
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
    16440000,
    19389000,
    DATE '2025-12-26',
    DATE '2026-02-15',
    DATE '2026-02-18',
    'OPEN',
    '간식/스낵',
    'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    69000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    73000,
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
    11940000,
    12886500,
    DATE '2026-01-01',
    DATE '2026-02-05',
    DATE '2026-02-08',
    'OPEN',
    '간식/스낵',
    'https://images.unsplash.com/photo-1430163393927-3dab9af7ea38?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    40000,
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
    11110000,
    14908000,
    DATE '2025-12-29',
    DATE '2026-02-26',
    DATE '2026-03-01',
    'OPEN',
    '간식/스낵',
    'https://images.unsplash.com/photo-1430163393927-3dab9af7ea38?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    27000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    67500,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 지역/로컬 셀러 11 ===

INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    63000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    45500,
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
    14280000,
    15068000,
    DATE '2025-12-31',
    DATE '2026-02-16',
    DATE '2026-02-19',
    'OPEN',
    '지역/로컬',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    21500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    56000,
    SEQ_PRODUCT_NO.CURRVAL
);
-- === 반려동물 간식 셀러 12 ===
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
    8460000,
    13294000,
    DATE '2025-12-27',
    DATE '2026-02-22',
    DATE '2026-02-25',
    'OPEN',
    '반려동물 간식',
    'https://images.unsplash.com/photo-1518378188025-22bd89516ee2?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    35000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    58500,
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
    17020000,
    21486000,
    DATE '2025-12-25',
    DATE '2026-02-14',
    DATE '2026-02-17',
    'OPEN',
    '반려동물 간식',
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    66000,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    29000,
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
    15350000,
    16169500,
    DATE '2026-01-01',
    DATE '2026-02-20',
    DATE '2026-02-23',
    'OPEN',
    '반려동물 간식',
    'https://images.unsplash.com/photo-1518378188025-22bd89516ee2?w=800&h=600&fit=crop',
    SYSDATE,
    'Y',
    1
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드',
    '시즌 한정 구성을 만나볼 수 있습니다.',
    79500,
    SEQ_PRODUCT_NO.CURRVAL
);
INSERT INTO TB_OPTION (
    OPTION_NO, OPTION_NAME, OPTION_CONTENT, OPTION_PRICE, PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '스탠다드',
    '가장 인기가 많은 구성입니다.',
    82500,
    SEQ_PRODUCT_NO.CURRVAL
);
COMMIT;