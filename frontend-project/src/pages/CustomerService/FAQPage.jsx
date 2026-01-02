import React, { useState, useEffect } from 'react'; // useEffect 추가
import axios from 'axios'; // axios 추가
import CSLayout from '../../components/CustomerService/CSLayout';
import InquiryButton from '../../components/CustomerService/InquiryButton'; 
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../../pages/CustomerService/CSStyle.css';
import Header from '../../components/Header';
import AppFooter from '../../components/AppFooter';
import InquiryHisrotyButton from '../../components/CustomerService/InquiryHistoryButton';

// ❌ dummyFAQs 삭제함 (이제 필요 없음)

export default function FAQPage() {
    const [faqList, setFaqList] = useState([]); // DB 데이터 담을 state
    const [openId, setOpenId] = useState(null);

    // ✅ DB에서 FAQ 목록 가져오기
    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                // 관리자와 같은 API를 사용해서 데이터를 가져옴
                const response = await axios.get('http://localhost:8001/foodding/api/admin/faq/list');
                setFaqList(response.data);
            } catch (error) {
                console.error("FAQ 불러오기 실패:", error);
            }
        };
        fetchFaqs();
    }, []);

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className='app'>
            <Header />
            <CSLayout title="자주 묻는 질문 (FAQ)">
                <div className="faq-header">
                    <p>궁금한 점을 먼저 확인해 보세요.</p>
                    <div className='inquiry-button-group'>
                        <InquiryButton />
                        <InquiryHisrotyButton />
                    </div>
                </div>

                <div className="faq-list">
                    {/* dummyFAQs 대신 faqList 사용 */}
                    {faqList.length > 0 ? (
                        faqList.map((faq) => (
                            // faq.id 대신 faq.faqNo 사용 (DB 컬럼명에 맞춤)
                            <div key={faq.faqNo} className="faq-item">
                                <div 
                                    className="faq-question"
                                    onClick={() => toggleFAQ(faq.faqNo)}
                                >
                                    {/* faq.question 사용 */}
                                    <span className="faq-question-text">{faq.question}</span>
                                    {openId === faq.faqNo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                                
                                {openId === faq.faqNo && (
                                    <div className="faq-answer">
                                        {/* faq.answer 사용 */}
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p style={{textAlign:'center', padding:'20px'}}>등록된 FAQ가 없습니다.</p>
                    )}
                </div>
                <br />
                <div className="faq-header">
                    <p>찾으시는 답변이 없다면, 1:1 문의를 이용해 주세요.</p>
                </div>
            </CSLayout>
            <AppFooter />
        </div>
    );
}