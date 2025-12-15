import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import './PaymentResult.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('confirming');
  const [orderInfo, setOrderInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const confirmPayment = async () => {
      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      const amount = searchParams.get('amount');

      console.log('결제 승인 시작:', { paymentKey, orderId, amount });

      if (!paymentKey || !orderId || !amount) {
        setError('결제 정보가 올바르지 않습니다.');
        setStatus('error');
        return;
      }

      try {
        const response = await fetch('http://localhost:8001/foodding/api/payment/confirm', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              paymentKey, 
              orderId, 
              amount: Number(amount)
            })
          });

        console.log('응답 상태:', response.status);
        const result = await response.json();
        console.log('응답 데이터:', result);

        if (response.ok && result.success) {
          setStatus('success');
          setOrderInfo(result.data);
        } else {
          throw new Error(result.message || '결제 승인 실패');
        }
      } catch (error) {
        console.error('결제 승인 오류:', error);
        setError(error.message);
        setStatus('error');
      }
    };

    confirmPayment();
  }, [searchParams]);

  return (
    <>
      <Header />
      <div className="payment-result">
        <div className="payment-result__container">
          {status === 'confirming' && (
            <>
              <div className="payment-result__spinner"></div>
              <h2>결제를 확인하는 중입니다...</h2>
              <p>잠시만 기다려주세요.</p>
            </>
          )}

          {status === 'error' && (
            <div className="payment-result__content payment-result__content--error">
              <div className="payment-result__icon">❌</div>
              <h1>결제 승인 실패</h1>
              <p className="payment-result__error-message">
                {error || '결제 승인 중 오류가 발생했습니다.'}
              </p>
              <div className="payment-result__buttons">
                <button 
                  className="payment-result__button payment-result__button--secondary"
                  onClick={() => navigate('/payment')}
                >
                  다시 시도
                </button>
                <button 
                  className="payment-result__button"
                  onClick={() => navigate('/')}
                >
                  홈으로
                </button>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="payment-result__content payment-result__content--success">
              <div className="payment-result__icon">✅</div>
              <h1>결제가 완료되었습니다!</h1>
              
              {orderInfo && (
                <div className="payment-result__info">
                  <div className="payment-result__info-item">
                    <span className="label">주문번호</span>
                    <span className="value">{orderInfo.orderId}</span>
                  </div>
                  <div className="payment-result__info-item">
                    <span className="label">결제금액</span>
                    <span className="value">
                      {orderInfo.totalAmount?.toLocaleString() || orderInfo.amount?.toLocaleString()}원
                    </span>
                  </div>
                  <div className="payment-result__info-item">
                    <span className="label">결제수단</span>
                    <span className="value">카드</span>
                  </div>
                  <div className="payment-result__info-item">
                    <span className="label">결제시간</span>
                    <span className="value">
                      {new Date(orderInfo.approvedAt || Date.now()).toLocaleString('ko-KR')}
                    </span>
                  </div>
                </div>
              )}

              <div className="payment-result__notice">
                <strong>📦 배송 안내</strong>
                <p>프로젝트 성공 시 2025년 3월부터 순차 배송됩니다.</p>
                <p>주문 내역은 이메일로 발송되었습니다.</p>
              </div>

              <button 
                className="payment-result__button"
                onClick={() => navigate('/')}
              >
                홈으로 돌아가기
              </button>
            </div>
          )}
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default PaymentSuccess;