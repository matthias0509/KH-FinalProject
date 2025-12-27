import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import { getLoginUserInfo } from '../utils/auth';
import { submitSellerApplication, fetchMySellerApplication } from '../api/sellerApplicationApi';
import { toast } from 'react-toastify';

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

const requirementsDescription =
  '만 19세 이상의 개인 또는 사업자이며 정식 사업자 등록증 또는 영업 신고증을 보유하고, 최근 3개월 내 실제 운영/제조 경험이 있으며 푸딩 커뮤니티 운영 정책 준수에 동의해야 전환이 가능합니다.';

const benefitsDescription =
  '전용 대시보드에서 주문, 정산, 스토리 관리까지 한 번에 처리하고 홈 메인·뉴스레터 노출 등 프로모션 지원과 전문 세무사의 온보딩 가이드까지 제공해 드립니다.';

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
  const [application, setApplication] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const loginInfo = getLoginUserInfo();
  const userNo = loginInfo?.userNo;

  useEffect(() => {
    if (!userNo) {
      return;
    }
    let cancelled = false;
    const load = async () => {
      setStatusLoading(true);
      try {
        const data = await fetchMySellerApplication(userNo);
        if (!cancelled) {
          const normalized = data && typeof data === 'object' ? data : null;
          setApplication(normalized);
        }
      } catch (error) {
        if (!cancelled) {
      setApplication(null);
        }
      } finally {
        if (!cancelled) {
          setStatusLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [userNo]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userNo) {
      toast.error('로그인 후 이용해 주세요.');
      return;
    }
    if (application && application.status === 'PENDING') {
      toast.info('이미 접수된 신청이 있습니다. 결과를 기다려 주세요.');
      return;
    }
    setIsSubmitting(true);

    try {
      const payload = {
        userNo,
        applicantName: formData.name,
        applicantEmail: formData.email,
        applicantPhone: formData.phone,
        businessName: formData.businessName,
        businessNumber: formData.businessNumber,
        website: formData.website,
        brandDescription: formData.description,
        documentPath: formData.document?.name ?? null,
      };
      const response = await submitSellerApplication(payload);
      setApplication(response);
      setSubmitMessage('전환 신청이 접수되었습니다. 영업일 기준 3일 내 연락드릴게요!');
      setFormData(initialForm);
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
      const message = error.response?.data || '신청 접수에 실패했습니다.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStatus = application?.status ?? (statusLoading ? 'LOADING' : null);
  const statusLabelMap = {
    PENDING: '심사 중',
    APPROVED: '승인 완료',
    REJECTED: '반려됨',
  };
  const statusClassMap = {
    PENDING: 'change-page__status change-page__status--pending',
    APPROVED: 'change-page__status change-page__status--approved',
    REJECTED: 'change-page__status change-page__status--rejected',
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
            {currentStatus && currentStatus !== 'LOADING' && (
              <div className={statusClassMap[application?.status] ?? 'change-page__status'}>
                현재 상태: {statusLabelMap[application?.status] ?? '정보 없음'}
              </div>
            )}
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
          <p className="change-page__description">{requirementsDescription}</p>
        </section>

        <section className="change-page__section">
          <div className="change-page__section-header">
            <br />
            <h2>전환 혜택</h2>
            <p>전환 승인 즉시 판매자 도구와 각종 지원 프로그램을 이용할 수 있어요.</p>
          </div>
          <p className="change-page__description">{benefitsDescription}</p>
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
            <button
              type="submit"
              className="change-page__submit"
              disabled={
                isSubmitting ||
                !userNo ||
                (application && application.status === 'PENDING')
              }
            >
              {isSubmitting ? '접수 중...' : '신청 접수하기'}
            </button>
            {submitMessage && <p className="change-page__success">{submitMessage}</p>}
            {!userNo && <p className="change-page__error">로그인 후 신청이 가능합니다.</p>}
            {application?.status === 'APPROVED' && (
              <p className="change-page__success">이미 판매자 전환이 완료된 계정입니다.</p>
            )}
          </form>
        </section>
      </main>
      <AppFooter />
    </div>
  );
}
