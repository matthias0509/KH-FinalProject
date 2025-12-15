import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode'; // 훅 import
import SubmitButton from './SubmitButton'; // SubmitButton을 재활용하거나 별도 버튼 스타일 사용

// Daum Postcode API의 스크립트 URL (고정)
const postCodeScriptUrl = "https://t1.daumcdn.net/mapjs/prod/postcode/v2/exec_jquery.js";

/**
 * @param {function} onComplete 주소 검색 완료 시 호출될 콜백 함수 (인수로 주소 데이터 전달)
 */
export default function AddressSearch({ onComplete }) {
    
    // 팝업 열기 함수를 제공하는 훅
    const open = useDaumPostcodePopup(postCodeScriptUrl);

    // 주소 검색 완료 시 호출될 핸들러
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        // 법정동명이 있을 경우 추가
        if (data.bname !== '') {
            extraAddress += data.bname;
        }
        // 건물명이 있고 공동주택일 경우 괄호 안에 추가
        if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        
        // 부모 컴포넌트로 우편번호, 도로명 주소, 추가 주소 데이터 전달
        onComplete({
            zipcode: data.zonecode, // 우편번호
            roadAddress: fullAddress, // 도로명 주소 (기본 주소)
        });
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        // SubmitButton 대신 일반 버튼 스타일을 사용해도 됩니다. 여기서는 디자인 통일을 위해 SubmitButton CSS를 활용하는 새로운 버튼으로 대체
        <button 
            type="button" 
            className="login-button" // SubmitButton의 CSS 클래스를 재활용
            onClick={handleClick}
            style={{ width: '100px', padding: '10px 12px', fontSize: '14px', alignSelf: 'flex-end', opacity: 0.8 }}
        >
            주소 검색
        </button>
    );
}