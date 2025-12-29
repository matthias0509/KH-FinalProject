import React, { useState, useEffect } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { CreditCard, Lock, MapPin } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentComponent.css';
import Header from '../../components/Header';

const PaymentComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tossPayments, setTossPayments] = useState(null);

  // location.state에서 리워드 정보 가져오기, 없으면 기본값 사용
  const [selectedReward, setSelectedReward] = useState(() => {
    if (location.state?.reward) {
      return {
        ...location.state.reward,
        quantity: 1
      };
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    address: '',
    detailAddress: '',
    agreeTerms: false
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const clientKey = 'test_ck_6BYq7GWPVvNRd1OJ7eqmVNE5vbo1';
  const customerKey = `customer_${Date.now()}`;

  // 로그인 정보 확인 useEffect 추가
  useEffect(() => {
    console.log('=== PaymentComponent 로그인 정보 확인 ===');
    
    // sessionStorage 확인
    const loginUser = sessionStorage.getItem('loginUser');
    console.log('1. sessionStorage.loginUser (raw):', loginUser);
    
    // localStorage 확인
    const loginUserLocal = localStorage.getItem('loginUser');
    console.log('2. localStorage.loginUser (raw):', loginUserLocal);
    
    // JWT 토큰 디코딩
    if (loginUser) {
      try {
        const payload = JSON.parse(window.atob(loginUser.split('.')[1]));
        console.log('3. JWT 디코딩 결과:', payload);
        console.log('4. userNo:', payload.userNo || payload.sub || payload.id);
        console.log('5. 전체 payload keys:', Object.keys(payload));
      } catch (e) {
        console.error('JWT 디코딩 실패:', e);
        console.log('토큰 형식이 JWT가 아닐 수 있습니다. 원본 값:', loginUser);
      }
    } else {
      console.log('⚠️ sessionStorage에 loginUser가 없습니다');
    }
    
    // 모든 sessionStorage 키 확인
    console.log('6. 전체 sessionStorage keys:', Object.keys(sessionStorage));
    console.log('7. 전체 localStorage keys:', Object.keys(localStorage));
    
    console.log('=== 로그인 정보 확인 끝 ===');
  }, []);

  useEffect(() => {
    loadTossPayments(clientKey).then(payments => {
      setTossPayments(payments);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^0-9]/g, '');
    
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 11) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ' (' + extraAddress + ')' : '');
        }

        setFormData(prev => ({
          ...prev,
          postcode: data.zonecode,
          address: fullAddress
        }));

        document.getElementById('detailAddress').focus();
      }
    }).open();
  };

  const deliveryFee = 3000;
  const totalAmount = (selectedReward.amount * selectedReward.quantity) + deliveryFee;

  const handlePayment = async () => {
    console.log('=== 결제 시작 ===');
    
    if (!formData.agreeTerms) {
      alert('약관에 동의해주세요.');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || 
        !formData.postcode || !formData.address || !formData.detailAddress) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }

    if (!tossPayments) {
      alert('결제 시스템을 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    // 로그인 정보 확인
    const loginUser = sessionStorage.getItem('loginUser');
    console.log('결제 시 loginUser:', loginUser);
    
    let userNo = 1; // 기본값
    if (loginUser) {
      try {
        const payload = JSON.parse(window.atob(loginUser.split('.')[1]));
        console.log('결제 시 JWT payload:', payload);
        userNo = payload.userNo || payload.sub || payload.id || 1;
        console.log('추출된 userNo:', userNo);
      } catch (e) {
        console.error('JWT 파싱 실패:', e);
      }
    } else {
      console.warn('⚠️ 로그인 정보 없음 - userNo를 1로 설정');
    }

    setIsProcessing(true);

    try {
      const orderId = `order_${Date.now()}`;
      const phoneNumberOnly = formData.phone.replace(/[^0-9]/g, '');

      console.log('결제 요청 데이터:', {
        amount: totalAmount,
        orderId: orderId,
        orderName: selectedReward.title,
        customerName: formData.name,
        quantity: selectedReward.quantity,
        optionNo: selectedReward.optionNo,
        userNo: userNo
      });

      await tossPayments.requestPayment('카드', {
        amount: totalAmount,
        orderId: orderId,
        orderName: selectedReward.title,
        customerName: formData.name,
        customerEmail: formData.email,
        customerMobilePhone: phoneNumberOnly,
        successUrl: `${window.location.origin}/payment/success?postcode=${formData.postcode}&address=${encodeURIComponent(formData.address + ' ' + formData.detailAddress)}&quantity=${selectedReward.quantity}&optionNo=${selectedReward.optionNo}&userNo=${userNo}`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('결제 오류:', error);
      if (error.code === 'USER_CANCEL') {
        alert('결제가 취소되었습니다.');
      } else {
        alert('결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page">
      <Header />
      <div className="checkout-container">
        <div className="checkout-grid">
          <div className="checkout-form">
            {/* Step 1: Reward Confirmation */}
            <div className="checkout-section">
              <h2 className="checkout-section__title">
                <span className="checkout-section__badge">1</span>
                선택한 리워드
              </h2>
              
              <div className="reward-card">
                <div className="reward-card__header">
                  <h3 className="reward-card__title">
                    {selectedReward.title}
                  </h3>
                  <span className="reward-card__amount">
                    {selectedReward.amount.toLocaleString()}원
                  </span>
                </div>
                
                {selectedReward.description && (
                  <p className="reward-card__description">{selectedReward.description}</p>
                )}

                {selectedReward.items && selectedReward.items.length > 0 && (
                  <ul className="reward-card__items">
                    {selectedReward.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                <div className="reward-card__quantity">
                  <label>수량:</label>
                  <div className="quantity-control">
                    <button
                      type="button"
                      className="quantity-control__button"
                      onClick={() => setSelectedReward({
                        ...selectedReward,
                        quantity: Math.max(1, selectedReward.quantity - 1)
                      })}
                      disabled={selectedReward.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-control__value">{selectedReward.quantity}</span>
                    <button
                      type="button"
                      className="quantity-control__button"
                      onClick={() => setSelectedReward({
                        ...selectedReward,
                        quantity: Math.min(10, selectedReward.quantity + 1)
                      })}
                      disabled={selectedReward.quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                {selectedReward.shipping && (
                  <div className="reward-card__shipping">
                    배송 예정: {selectedReward.shipping}
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Shipping Information */}
            <div className="checkout-section">
              <h2 className="checkout-section__title">
                <span className="checkout-section__badge">2</span>
                배송 정보
              </h2>

              <div className="form-fields">
                <div className="form-field">
                  <label className="form-field__label">받는 분 성함 *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="홍길동"
                    className="form-field__input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-field__label">이메일 *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="example@email.com"
                      className="form-field__input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-field__label">연락처 *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="010-1234-5678"
                      maxLength="13"
                      className="form-field__input"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-field__label">우편번호 *</label>
                  <div className="address-search">
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      placeholder="우편번호"
                      className="form-field__input"
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={handleAddressSearch}
                      className="address-search__button"
                    >
                      <MapPin size={18} />
                      주소 검색
                    </button>
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-field__label">기본 주소 *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder="주소 검색 버튼을 클릭하세요"
                    className="form-field__input"
                    readOnly
                  />
                </div>

                <div className="form-field">
                  <label className="form-field__label">상세 주소 *</label>
                  <input
                    type="text"
                    id="detailAddress"
                    name="detailAddress"
                    value={formData.detailAddress}
                    onChange={handleInputChange}
                    placeholder="상세 주소를 입력하세요"
                    className="form-field__input"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="checkout-terms">
              <label className="checkout-terms__label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="checkout-terms__checkbox"
                />
                <span className="checkout-terms__text">
                  주문 내용을 확인했으며, 개인정보 수집 및 이용에 동의합니다. (필수)
                </span>
              </label>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="checkout-sidebar">
            <div className="order-summary">
              <h3 className="order-summary__title">결제 금액</h3>

              <div className="order-summary__items">
                <div className="order-summary__item">
                  <span className="order-summary__item-label">상품 금액</span>
                  <span className="order-summary__item-value">
                    {(selectedReward.amount * selectedReward.quantity).toLocaleString()}원
                  </span>
                </div>
                <div className="order-summary__item">
                  <span className="order-summary__item-label">배송비</span>
                  <span className="order-summary__item-value">{deliveryFee.toLocaleString()}원</span>
                </div>
              </div>

              <div className="order-summary__total">
                <span className="order-summary__total-label">총 결제 금액</span>
                <span className="order-summary__total-value">
                  {totalAmount.toLocaleString()}원
                </span>
              </div>

              <div className="order-summary__notice">
                <strong>📦 배송 안내</strong>
                {selectedReward.shipping || '프로젝트 성공 시 2025년 3월부터 순차 배송됩니다.'}
              </div>

              <button
                onClick={handlePayment}
                disabled={!formData.agreeTerms || isProcessing}
                className={`order-summary__button order-summary__button--primary ${
                  (!formData.agreeTerms || isProcessing) ? 'is-disabled' : ''
                }`}
              >
                {isProcessing ? '처리 중...' : `${totalAmount.toLocaleString()}원 결제하기`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;