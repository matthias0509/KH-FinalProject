import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import './style/PaymentComponent.css';
import Header from '../Header';

const PaymentComponent = () => {
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
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    agreeTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  const deliveryFee = 3000;
  const totalAmount = (selectedReward.amount * selectedReward.quantity) + deliveryFee;

  return (
    <div className="checkout-page">
      { <Header /> }
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
                      placeholder="010-1234-5678"
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

            {/* Step 3: Payment Information */}
            <div className="checkout-section">
              <h2 className="checkout-section__title">
                <span className="checkout-section__badge">3</span>
                결제 수단
              </h2>

              <div className="form-fields">
                <div className="form-field">
                  <label className="form-field__label">카드 번호 *</label>
                  <div className="form-field__input-wrapper">
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="form-field__input form-field__input--card"
                    />
                    <CreditCard size={20} className="form-field__icon" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="form-field__label">유효기간 *</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="form-field__input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-field__label">CVC *</label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="3"
                      className="form-field__input"
                    />
                  </div>
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
                disabled={!formData.agreeTerms}
                className={`order-summary__button order-summary__button--primary ${!formData.agreeTerms ? 'is-disabled' : ''}`}
              >
                {totalAmount.toLocaleString()}원 결제하기
              </button>
            </div>

            {/* Security Badge */}
            <div className="security-badge">
              <Lock size={20} className="security-badge__icon" />
              <div className="security-badge__text">
                <strong>안전한 결제</strong>
                SSL 암호화로 보호됩니다
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;