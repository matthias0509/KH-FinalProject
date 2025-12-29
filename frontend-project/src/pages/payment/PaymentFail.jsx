import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';

const PaymentFail = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="payment-result">
        <h1>결제 실패</h1>
        <button onClick={() => navigate(-1)}>다시 시도</button>
        <button onClick={() => navigate('/')}>홈으로</button>
      </div>
      <AppFooter />
    </>
  );
};

export default PaymentFail;
