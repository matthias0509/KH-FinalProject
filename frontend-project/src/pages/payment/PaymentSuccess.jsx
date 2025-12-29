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
      console.log('=== PaymentSuccess 로그인 정보 확인 ===');
      
      const loginUser = sessionStorage.getItem('loginUser');
      console.log('1. sessionStorage.loginUser (raw):', loginUser);
      
      const loginUserLocal = localStorage.getItem('loginUser');
      console.log('2. localStorage.loginUser (raw):', loginUserLocal);
      
      let userNo = 1; // 기본값
      
      if (loginUser) {
        try {
          const payload = JSON.parse(window.atob(loginUser.split('.')[1]));
          console.log('3. JWT payload:', payload);
          console.log('4. payload keys:', Object.keys(payload));
          userNo = payload.userNo || payload.sub || payload.id || 1;
          console.log('5. 추출된 userNo:', userNo);
        } catch (e) {
          console.error('JWT 파싱 실패:', e);
          console.log('원본 loginUser 값:', loginUser);
        }
      } else {
        console.warn('⚠️ 로그인 정보 없음 - userNo를 1로 설정');
      }
      
      console.log('=== 로그인 정보 확인 끝 ===');
      
      // URL 파라미터 가져오기
      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      const amount = searchParams.get('amount');
      const postcode = searchParams.get('postcode');
      const address = searchParams.get('address');
      const quantity = searchParams.get('quantity');
      const optionNo = searchParams.get('optionNo');
      const userNoFromUrl = searchParams.get('userNo'); // URL에서 받은 userNo

      console.log('=== 결제 승인 시작 ===');
      console.log('URL 파라미터:', { 
        paymentKey, 
        orderId, 
        amount, 
        postcode, 
        address, 
        quantity, 
        optionNo,
        userNoFromUrl
      });

      // URL에서 받은 userNo 우선, 없으면 위에서 추출한 userNo 사용
      const finalUserNo = userNoFromUrl ? Number(userNoFromUrl) : userNo;
      console.log('최종 사용할 userNo:', finalUserNo);

      if (!paymentKey || !orderId || !amount) {
        console.error('❌ 필수 파라미터 누락:', { paymentKey, orderId, amount });
        setError('결제 정보가 올바르지 않습니다.');
        setStatus('error');
        return;
      }

      try {
        const requestBody = { 
          paymentKey, 
          orderId, 
          amount: Number(amount),
          postcode: postcode || '00000',
          address: address || '주소 미입력',
          quantity: Number(quantity) || 1,
          optionNo: Number(optionNo) || 1,
          userNo: finalUserNo
        };
        
        console.log('백엔드로 전송할 데이터:', requestBody);
        
        const response = await fetch('http://localhost:8001/foodding/api/payment/confirm', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(requestBody)
        });

        console.log('응답 상태:', response.status);
        const result = await response.json();
        console.log('응답 데이터:', result);

        if (response.ok && result.success) {
          console.log('✅ 결제 승인 성공!');
          setStatus('success');
          setOrderInfo(result.data);
        } else {
          console.error('❌ 결제 승인 실패:', result.message);
          throw new Error(result.message || '결제 승인 실패');
        }
      } catch (error) {
        console.error('❌ 결제 승인 오류:', error);
        console.error('오류 상세:', {
          message: error.message,
          stack: error.stack
        });
        setError(error.message);
        setStatus('error');
      }
      
      console.log('=== 결제 승인 처리 완료 ===');
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