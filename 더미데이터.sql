
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
