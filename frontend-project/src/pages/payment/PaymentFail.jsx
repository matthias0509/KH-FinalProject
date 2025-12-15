import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import './PaymentResult.css';

const PaymentFail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const message = searchParams.get('message');

  return (
    <>
      <Header />
      <div className="payment-result">
        <div className="payment-result__container">
          <div className="payment-result__content payment-result__content--error">
            <div className="payment-result__icon">❌</div>
            <h1>결제 실패</h1>
            
            <div className="payment-result__error">
              <p className="error-message">
                {message || '결제 처리 중 오류가 발생했습니다.'}
              </p>
              {code && (
                <p className="error-code">오류 코드: {code}</p>
              )}
            </div>

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
                홈으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </>
  );
};

export default PaymentFail;