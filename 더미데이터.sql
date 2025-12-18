
INSERT INTO TB_USER (
    USER_NO, USER_ID, USER_PWD, USER_NAME,
    NICKNAME, BIRTH_DATE, GENDER, EMAIL,
    PHONE, ORIGIN_PROFILE, MODIFY_PROFILE,
    POSTCODE, MAIN_ADDRESS, DETAIL_ADDRESS,
    ENROLL_DATE, USER_YN, USER_ROLE
) VALUES (
    1, 'testUser', 'password', '테스트유저',
    'tester', SYSDATE, 'M', 'test@example.com',
    '010-0000-0000', NULL, NULL,
    '00000', '서울시', '어딘가 101',
    SYSDATE, 'Y', 'USER'
);

-- 테스트 유저용 판매자 프로필 더미 데이터
INSERT INTO SELLER_PROFILE (
    SELLER_NO,
    INTRODUCTION,
    USER_NO
) VALUES (
    SEQ_SELLER_PROFILE_NO.NEXTVAL,
    '테스트 셀러 프로필',
    1
);

-- 3. PRODUCT 테스트 데이터
INSERT INTO PRODUCT (
    PRODUCT_NO,
    PRODUCT_TITLE,
    PRODUCT_DESC,
    TARGET_AMOUNT,
    CURRENT_AMOUNT,
    FUND_START_DATE,
    FUND_END_DATE,
    PRODUCT_STATUS,
    CATEGORY,
    ORIGIN_THUMBNAIL,
    MODIFY_THUMBNAIL,      -- ✅ NOT NULL
    SELLER_NO
) VALUES (
    SEQ_PRODUCT_NO.NEXTVAL,
    '얼리버드 특가 세트',
    '시그니처 소스 3종과 레시피북이 포함된 특별 세트',
    1000000,
    0,
    SYSDATE,
    SYSDATE + 30,
    'OPEN',
    '푸드',
    'test_thumbnail.jpg',
    'test_thumbnail.jpg',
    1
);

-- 4. TB_OPTION 테스트 데이터
INSERT INTO TB_OPTION (
    OPTION_NO,
    OPTION_NAME,
    OPTION_CONTENT,
    OPTION_PRICE,
    PRODUCT_NO
) VALUES (
    SEQ_OPTION_NO.NEXTVAL,
    '얼리버드 특가 세트',
    '시그니처 소스 3종, 레시피 북, 감사 카드',
    35000,
    SEQ_PRODUCT_NO.CURRVAL
);


COMMIT;
