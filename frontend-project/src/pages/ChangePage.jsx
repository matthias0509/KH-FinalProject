import { useRef, useState } from 'react';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';

const steps = [
  {
    title: '1. 신청서 작성',
    description: '기본 정보와 필요한 서류를 업로드하면 담당자가 확인을 시작합니다.',
  },
  {
    title: '2. 자격 검토',
    description: '영업 신고 여부, 실제 운영 여부 등을 확인하여 영업자 자격을 검토합니다.',
  },
  {
    title: '3. 전환 승인',
    description: '승인 시 메일과 알림으로 안내해 드리며, 판매자 대시보드가 열립니다.',
  },
];

const requirements = [
  '만 19세 이상의 개인 또는 사업자',
  '정식 사업자 등록증 또는 영업 신고증 보유',
  '최근 3개월 내 실제 운영/제조 경험',
  '푸딩 커뮤니티 운영 정책 준수 동의',
];

const benefits = [
  { title: '전용 대시보드', detail: '주문, 정산, 스토리 관리 기능 제공' },
  { title: '프로모션 지원', detail: '홈 메인/뉴스레터 노출 기회 제공' },
  { title: '세무 가이드', detail: '전문 세무사의 온보딩 자료 제공' },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  businessName: '',
  businessNumber: '',
  website: '',
  description: '',
  document: null,
};

export default function ChangePage() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'document') {
      setFormData((prev) => ({ ...prev, document: files?.[0] ?? null }));
      return;
    }
    if (name === 'phone') {
      const digitsOnly = value.replace(/[^0-9]/g, '').slice(0, 11);
      const formatted = digitsOnly.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
      setFormData((prev) => ({ ...prev, phone: formatted }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('전환 신청이 접수되었습니다. 영업일 기준 3일 내 연락드릴게요!');
      setFormData(initialForm);
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
  };

  return (
    <div className="app">
      <Header />
      <main className="change-page">
        <section className="change-page__hero">
          <div>
            <span className="change-page__badge">Maker 전환 신청</span>
            <h1>일반 회원에서 판매자로 전환하고 프로젝트를 시작하세요</h1>
            <p>
              판매자 전환은 빠른 문의와 검증 절차를 거쳐 최대 3영업일 이내에 완료됩니다. 필요한
              서류를 준비해 지금 바로 신청해 보세요.
            </p>
            <div className="change-page__hero-actions">
              <button type="button" className="change-page__cta" onClick={handleScrollToForm}>
                전환 신청하기
              </button>
              <button type="button" className="change-page__cta change-page__cta--ghost">
                가이드 다운로드
              </button>
            </div>
          </div>
          <div className="change-page__hero-card">
            <h3>판매자 전환 상태</h3>
            <ul>
              {steps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="change-page__section">
          <div className="change-page__section-header">
            <h2>자격 요건</h2>
            <p>아래 조건을 모두 충족해야 판매자 전환이 가능합니다.</p>
          </div>
          <ul className="change-page__requirements">
            {requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </section>

        <section className="change-page__section">
          <div className="change-page__section-header">
            <h2>전환 혜택</h2>
            <p>전환 승인 즉시 판매자 도구와 각종 지원 프로그램을 이용할 수 있어요.</p>
          </div>
          <div className="change-page__benefits">
            {benefits.map((benefit) => (
              <article key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="change-page__section" ref={formRef}>
          <div className="change-page__section-header">
            <br />
            <h2>전환 신청서</h2>
            <p>정확한 정보 입력 시 승인까지 더 빨라집니다.</p>
          </div>
          <form className="change-page__form" onSubmit={handleSubmit}>
            <div className="change-page__form-grid">
              <label>
                이름
                <input name="name" value={formData.name} onChange={handleChange} required />
              </label>
              <label>
                이메일
                <input name="email" type="email" value={formData.email} onChange={handleChange} required />
              </label>
              <label>
                연락처
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  required
                  inputMode="numeric"
                  maxLength={13}
                />
              </label>
              <label>
                브랜드/사업명
                <input name="businessName" value={formData.businessName} onChange={handleChange} required />
              </label>
              <label>
                사업자등록번호
                <input name="businessNumber" value={formData.businessNumber} onChange={handleChange} placeholder="123-45-67890" required />
              </label>
              <label>
                웹사이트/인스타그램
                <input name="website" value={formData.website} onChange={handleChange} placeholder="https://" />
              </label>
            </div>
            <label className="change-page__textarea">
              브랜드 소개
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="현재 운영 중인 브랜드/메뉴/생산 환경 등을 알려주세요."
                required
              />
            </label>
            <label className="change-page__upload">
              필수 서류 업로드 (사업자 등록증 또는 영업 신고증)
              <input type="file" name="document" accept="application/pdf,image/*" onChange={handleChange} required />
              {formData.document && <span>{formData.document.name}</span>}
            </label>
            <button type="submit" className="change-page__submit" disabled={isSubmitting}>
              {isSubmitting ? '접수 중...' : '신청 접수하기'}
            </button>
            {submitMessage && <p className="change-page__success">{submitMessage}</p>}
          </form>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
