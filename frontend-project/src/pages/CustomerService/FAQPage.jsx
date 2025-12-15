import React, { useState } from 'react';
import CSLayout from '../../components/CustomerService/CSLayout';
import InquiryButton from '../../components/CustomerService/InquiryButton'; 
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../../pages/CustomerService/CSStyle.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import InquiryHisrotyButton from '../../components/CustomerService/InquiryHistoryButton';

const dummyFAQs = [
    { id: 1, question: "결제는 어떻게 하나요?", answer: "신용카드, 계좌이체, 간편결제 등 다양한 방법으로 결제할 수 있습니다. 자세한 내용은 마이페이지 > 결제 관리에서 확인하세요." },
    { id: 2, question: "주문을 취소하고 싶어요.", answer: "주문 상태가 '상품 준비 중' 이전이라면 마이페이지에서 직접 취소할 수 있습니다. 이후에는 1:1 문의를 남겨주세요." },
    { id: 3, question: "비밀번호를 잊어버렸어요.", answer: "로그인 페이지 하단의 '비밀번호 찾기'를 통해 본인 인증 후 재설정할 수 있습니다." },
    { id: 4, question: "배송은 얼마나 걸리나요?", answer: "일반적으로 주문일로부터 2~5일(영업일 기준) 소요되며, 도서산간 지역은 추가 시일이 걸릴 수 있습니다." },
];

export default function FAQPage() {
    const [openId, setOpenId] = useState(null);

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className='app'>
            <Header />
                <CSLayout title="자주 묻는 질문 (FAQ)">
                    <div className="faq-header"> {/* 💡 클래스 적용 */}
                        <p>궁금한 점을 먼저 확인해 보세요.</p>
                        <div className='inquiry-button-group'>
                            <InquiryButton />
                            <InquiryHisrotyButton />
                        </div>
                    </div>

                    <div className="faq-list"> {/* 💡 클래스 적용 */}
                        {dummyFAQs.map((faq) => (
                            <div key={faq.id} className="faq-item"> {/* 💡 클래스 적용 */}
                                {/* 질문 영역 */}
                                <div 
                                    className="faq-question" // 💡 클래스 적용
                                    onClick={() => toggleFAQ(faq.id)}
                                >
                                    <span className="faq-question-text">{faq.question}</span> {/* 💡 클래스 적용 */}
                                    {openId === faq.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                                
                                {/* 답변 영역 (열려 있을 때만 표시) */}
                                {openId === faq.id && (
                                    <div className="faq-answer"> {/* 💡 클래스 적용 */}
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    <div className="faq-bottom-link"> {/* 💡 클래스 적용 */}
                        <p>찾으시는 답변이 없다면, 1:1 문의를 이용해 주세요.</p>
                        <InquiryButton />
                    </div>
                </CSLayout>
            <AppFooter />
        </div>
    );
}