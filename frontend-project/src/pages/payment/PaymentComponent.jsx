import React, { useState, useEffect } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { CreditCard, Lock } from 'lucide-react';
import './PaymentComponent.css';
import Header from '../../components/Header';

const PaymentComponent = () => {
  const [tossPayments, setTossPayments] = useState(null);
  const [selectedReward, setSelectedReward] = useState({
    id: 1,
    title: '얼리버드 특가 세트',
    amount: 35000,
    quantity: 1,
    items: ['시그니처 소스 3종', '레시피 북', '감사 카드']
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    agreeTerms: false
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // 토스페이먼츠 클라이언트 키 (테스트용)
  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
  const customerKey = `customer_${Date.now()}`; // 고유한 고객 키 생성

  useEffect(() => {
    // 토스페이먼츠 SDK 로드
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

  const deliveryFee = 3000;
  const totalAmount = (selectedReward.amount * selectedReward.quantity) + deliveryFee;

  // 결제 처리 함수
  const handlePayment = async () => {
    if (!formData.agreeTerms) {
      alert('약관에 동의해주세요.');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }

    if (!tossPayments) {
      alert('결제 시스템을 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setIsProcessing(true);

    try {
      // 주문 ID 생성 (실제로는 서버에서 생성하는 것이 권장됩니다)
      const orderId = `order_${Date.now()}`;

      // 결제 요청
      await tossPayments.requestPayment('카드', {
        amount: totalAmount,
        orderId: orderId,
        orderName: selectedReward.title,
        customerName: formData.name,
        customerEmail: formData.email,
        customerMobilePhone: formData.phone,
        successUrl: `${window.location.origin}/payment/success`,
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
      {/* Main Content */}
      <div className="checkout-container">
        <div className="checkout-grid">
          {/* Left Column - Form */}
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
                
                <ul className="reward-card__items">
                  {selectedReward.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

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
                      onChange={handleInputChange}
                      placeholder="01012345678"
                      className="form-field__input"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-field__label">배송 주소 *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="서울특별시 강남구 테헤란로 123"
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
                프로젝트 성공 시 2025년 3월부터 순차 배송됩니다.
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