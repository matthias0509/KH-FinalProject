import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PaymentFail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const message = searchParams.get('message');

  return (
    <div>
      <h1>결제 실패</h1>
      <p>{message || '결제 처리 중 오류가 발생했습니다.'}</p>
      <button onClick={() => navigate('/payment')}>다시 시도</button>
    </div>
  );
};

export default PaymentFail;