import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import '../components/Login/LoginPage.css';

function notice(){
    return (
        <div>
             <Header />
                <div className="main-content">
                    <header className="section-header" style={{ marginBottom: '32px' }}>
                        <h1 className="section-title">공지사항</h1>
                        
                        <div className="header__actions" style={{ gap: '8px' }}>
                            <input 
                                type="text" 
                                placeholder="제목 검색..." 
                                className="select-control"
                            />
                            <button className="header__cta" style={{ padding: '8px 16px' }}>
                                검색
                            </button>
                        </div>
                    </header>

                    {/* 공지사항 목록 더미 ****** 나중에 컴포넌트로 빼기*/}
                    <div className="notice-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="notice-card project-card"> 
                            <div className="notice-card__body project-card__body" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h3 className="project-card__title" style={{ fontSize: '18px', fontWeight: '600' }}>
                                        [필독] 서버 점검 및 업데이트 안내
                                        <span className="tag" style={{ marginLeft: '10px', backgroundColor: 'var(--accent)', color: 'white', fontWeight: 'bold' }}>NEW</span>
                                    </h3>
                                    <div className="project-card__meta" style={{ fontSize: '14px', color: 'var(--muted)' }}>
                                        2025-12-10
                                    </div>
                                </div>
                                <div className="project-card__meta" style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'right' }}>
                                    조회수: 1,250
                                </div>
                            </div>
                        </div>
                        <div className="notice-card project-card"> 
                            <div className="notice-card__body project-card__body" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h3 className="project-card__title" style={{ fontSize: '18px', fontWeight: '600' }}>
                                        새로운 프로젝트 등록 기준 변경 공지
                                    </h3>
                                    <div className="project-card__meta" style={{ fontSize: '14px', color: 'var(--muted)' }}>
                                        2025-12-05
                                    </div>
                                </div>
                                <div className="project-card__meta" style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'right' }}>
                                    조회수: 890
                                </div>
                            </div>
                        </div>
                        <div className="notice-card project-card"> 
                            <div className="notice-card__body project-card__body" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h3 className="project-card__title" style={{ fontSize: '18px', fontWeight: '600' }}>
                                        개인정보처리방침 일부 개정 안내
                                    </h3>
                                    <div className="project-card__meta" style={{ fontSize: '14px', color: 'var(--muted)' }}>
                                        2025-11-20
                                    </div>
                                </div>
                                <div className="project-card__meta" style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'right' }}>
                                    조회수: 520
                                </div>
                            </div>
                        </div>
                        <div className="notice-card project-card"> 
                            <div className="notice-card__body project-card__body" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h3 className="project-card__title" style={{ fontSize: '18px', fontWeight: '600' }}>
                                        시스템 오류 해결 및 복구 완료 보고
                                    </h3>
                                    <div className="project-card__meta" style={{ fontSize: '14px', color: 'var(--muted)' }}>
                                        2025-11-15
                                    </div>
                                </div>
                                <div className="project-card__meta" style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'right' }}>
                                    조회수: 410
                                </div>
                            </div>
                        </div>
                        <div className="notice-card project-card"> 
                            <div className="notice-card__body project-card__body" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h3 className="project-card__title" style={{ fontSize: '18px', fontWeight: '600' }}>
                                        [이벤트 종료] 펀딩 성공률 이벤트 결과 발표
                                    </h3>
                                    <div className="project-card__meta" style={{ fontSize: '14px', color: 'var(--muted)' }}>
                                        2025-11-01
                                    </div>
                                </div>
                                <div className="project-card__meta" style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'right' }}>
                                    조회수: 350
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 페이지네이션 영역 (UI만) */}
                    <div className="pagination-controls">
                        <button className="icon-button" style={{ marginRight: '10px' }}>&lt;</button>
                        <span className="text-accent" style={{ fontWeight: 'bold' }}>1</span>
                        <span className="pagination-number" style={{ color: 'var(--muted)' }}>2</span>
                        <span className="pagination-number" style={{ color: 'var(--muted)' }}>3</span>
                        <button className="icon-button" style={{ marginLeft: '10px' }}>&gt;</button>
                    </div>
                </div>

            <AppFooter/>
        </div>
    )
}

export default notice