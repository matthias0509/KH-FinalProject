import React, { useState } from 'react';
import CSLayout from '../../components/CustomerService/CSLayout';
import InquiryButton from '../../components/CustomerService/InquiryButton'; 
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../../pages/CustomerService/CSStyle.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import InquiryHisrotyButton from '../../components/CustomerService/InquiryHistoryButton';

const dummyFAQs = [
    { 
        id: 1, 
        question: "펀딩이 성공해야만 음식을 받을 수 있나요?", 
        answer: "네, 그렇습니다. 음식 펀딩은 목표 금액이 100% 이상 달성되어야만 생산 및 배송이 시작됩니다. 만약 목표에 달성하지 못하면 결제된 금액은 전액 환불됩니다." 
    },
    { 
        id: 2, 
        question: "신선식품인데 배송은 안전하게 오나요?", 
        answer: "Foodding은 음식 전문 펀딩인 만큼 모든 상품을 신선도 유지 전용 박스와 아이스팩을 동봉하여 배송합니다. 상품 특성에 따라 냉장/냉동 차량으로 안전하게 전달해 드립니다." 
    },
    { 
        id: 3, 
        question: "펀딩 결제는 언제 이루어지나요?", 
        answer: "펀딩에 참여한 즉시 결제가 예약되며, 목표 금액이 달성되어 펀딩이 종료된 다음 날 최종적으로 결제가 승인됩니다. 실패 시 예약된 결제는 자동으로 취소됩니다." 
    },
    { 
        id: 4, 
        question: "음식에 문제가 있을 때 교환이나 환불이 가능한가요?", 
        answer: "식품의 특성상 단순 변심에 의한 환불은 어려울 수 있습니다. 다만, 배송 중 파손이나 상품 변질이 확인될 경우 수령 후 24시간 이내에 사진과 함께 마이페이지 > 1:1 문의를 남겨주시면 즉시 처리해 드립니다." 
    },
    { 
        id: 5, 
        question: "도착 날짜를 지정할 수 있나요?", 
        answer: "펀딩 상품은 한꺼번에 대량 생산되는 방식이므로 정확한 배송일 지정은 어렵습니다. 다만, 생산 완료 후 예상 배송 시작일을 공지사항과 알림톡을 통해 미리 안내해 드립니다." 
    },
    { 
        id: 6, 
        question: "알레르기 유발 물질 정보를 어디서 확인하나요?", 
        answer: "각 펀딩 상세 페이지 하단에 '식품위생법에 의한 표시사항'이 기재되어 있습니다. 특정 원재료에 대한 알레르기가 있으신 분들은 펀딩 전 반드시 확인해 주시기 바랍니다." 
    },
    { 
        id: 7, 
        question: "제주도나 도서산간 지역도 배송이 가능한가요?", 
        answer: "상품 종류(냉동/신선)에 따라 배송 가능 지역이 제한될 수 있습니다. 펀딩 시 '배송지 선택' 단계에서 배송 가능 여부를 확인할 수 있으며, 추가 배송비가 발생할 수 있습니다." 
    },
    { 
        id: 8, 
        question: "펀딩한 음식을 맛있게 먹는 법(조리법)을 알 수 있나요?", 
        answer: "메이커(생산자)가 제공하는 최적의 레시피 카드가 상품에 동봉되어 배송됩니다. 또한 상세 페이지 내 '커뮤니티' 탭에서 다른 서포터들의 조리 팁도 확인하실 수 있습니다." 
    },
    { 
        id: 9, 
        question: "단체 주문이나 대량 구매가 가능한가요?", 
        answer: "별도의 대량 구매 리워드가 설정되어 있지 않은 경우, 1:1 문의를 통해 메이커에게 수량 조절 가능 여부를 문의해 주시면 안내를 도와드리겠습니다." 
    },
    { 
        id: 10, 
        question: "결제 수단을 변경하고 싶어요.", 
        answer: "펀딩이 진행 중인 상태에서는 마이페이지 > 참여한 펀딩 상세 내역에서 결제 수단을 변경하실 수 있습니다. 단, 펀딩 종료 후에는 변경이 어렵습니다." 
    }
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