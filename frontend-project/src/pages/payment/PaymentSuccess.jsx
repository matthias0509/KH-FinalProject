import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(true);

  useEffect(() => {
    const confirmPayment = async () => {
      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      const amount = searchParams.get('amount');

      try {
        // 백엔드 서버로 결제 승인 요청
        const response = await fetch('/api/payment/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentKey, orderId, amount })
        });

        if (response.ok) {
          setIsConfirming(false);
        } else {
          throw new Error('결제 승인 실패');
        }
      } catch (error) {
        console.error(error);
        alert('결제 승인 중 오류가 발생했습니다.');
        navigate('/payment/fail');
      }
    };

    confirmPayment();
  }, [searchParams, navigate]);

  if (isConfirming) {
    return <div>결제를 확인하는 중입니다...</div>;
  }

  return (
    <div>
      <h1>결제 성공!</h1>
      <p>주문이 완료되었습니다.</p>
    </div>
  );
};

export default PaymentSuccess;