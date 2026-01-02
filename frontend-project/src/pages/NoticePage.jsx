import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import './Login/Login.css';
import { useNavigate } from 'react-router-dom';

export default function NoticeListPage() {
    const [notices, setNotices] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 💡 1. 관리자 권한 확인 (토큰 Payload 해독)
    const token = sessionStorage.getItem("loginUser");
    let isAdmin = false;
    if (token) {
        try {
            const payload = JSON.parse(window.atob(token.split('.')[1]));
            isAdmin = payload.role === 'ADMIN';
        } catch (e) {
            console.error("토큰 확인 실패", e);
        }
    }

    const limit = 7; 
    const pageBlock = 5; 

    // 검색 실행 함수
    const handleSearch = () => {
        setCurrentPage(1); // 검색 시 1페이지로 이동
        fetchNotices(1); // 변경된 검색어와 1페이지 정보를 서버에 요청
    };
    // 데이터 요청
    const fetchNotices = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8001/foodding/notice/list", {
                // 서버에 현재 페이지와 검색어를 전달하여 필터링된 결과를 가져옴
                params: { page: page, keyword: search }
            });
            setNotices(response.data.list || []);
            setTotalCount(response.data.totalCount || 0);
        } catch (error) {
            console.error("목록 로딩 실패:", error);
            setNotices([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices(currentPage);
    }, [currentPage]);

    // 클릭 핸들러
    const handleNoticeClick = async (id) => {
            navigate(`/notice/${id}`);
    };

    

    const resetSearch = () => {
        setSearch("");
        setCurrentPage(1);
        fetchNotices(1);
    };

    const totalPages = Math.ceil(totalCount / limit);
    const startPage = Math.floor((currentPage - 1) / pageBlock) * pageBlock + 1;
    let endPage = startPage + pageBlock - 1;
    if (endPage > totalPages) endPage = totalPages;

    return (
        <div className="app">
            <Header />
            <br />
            <div className="main-content">
                <header className="section-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <h2 className='login-title' style={{marginLeft: '10px', marginBottom:'4px', alignItems:'center'}}>공지사항</h2>
                    
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {/* 💡 관리자일 때만 등록 버튼 표시 */}
                        {isAdmin && (
                            <button 
                                className="header__cta" 
                                onClick={() => navigate('/notice/write')}
                                style={{ padding: '8px 16px', backgroundColor: '#333' }}
                            >
                                공지 등록
                            </button>
                        )}

                        <div className="header__actions" style={{ gap: '8px', display: 'flex' }}>
                            <input 
                                type="text" 
                                placeholder="제목 검색..." 
                                className="select-control"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button className="header__cta" onClick={handleSearch} style={{ padding: '8px 16px' }}>검색</button>
                        </div>
                    </div>
                </header>

                <div className="notice-list" style={{ minHeight: '500px' }}>
                    {loading ? (
                        <p style={{ textAlign: 'center', marginTop: '50px' }}>로딩 중...</p>
                    ) : notices.length > 0 ? (
                        notices.map((n) => {
                            const id = n.noticeNo || n.NOTICE_NO;
                            return (
                                <div key={id} className="notice-card project-card"
                                     onClick={() => handleNoticeClick(id)} // 💡 클릭 시 조회수 증가 함수 실행
                                     style={{ cursor: 'pointer', marginBottom: '12px' }}>
                                    <div className="notice-card__body project-card__body" style={{ padding: '12px 20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>{n.noticeTitle}</h3>
                                            <span style={{ fontSize: '14px', color: '#888' }}>{n.noticeCreateDate}</span>
                                        </div>
                                        <div style={{ textAlign: 'right', fontSize: '12px', color: '#aaa', marginTop: '8px' }}>
                                            조회수: {n.noticeView}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ textAlign: 'center', padding: '100px 0', border: '1px dashed #ddd', borderRadius: '8px' }}>
                            <p>{search ? `"${search}"에 대한 결과가 없습니다.` : "공지사항이 없습니다."}</p>
                            {search && <button onClick={resetSearch} className="list-button">목록보기</button>}
                        </div>
                    )}
                </div>

                {/* 페이지네이션 */}
                <div className="pagination-container">
                    <button className="nav-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>{"<<"}</button>
                    <button className="nav-btn" disabled={startPage === 1} onClick={() => setCurrentPage(startPage - 1)}>{"<"}</button>
                    {[...Array(endPage - startPage + 1)].map((_, i) => {
                        const pageNum = startPage + i;
                        return (
                            <button key={pageNum} onClick={() => setCurrentPage(pageNum)}
                                    className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}>
                                {pageNum}
                            </button>
                        );
                    })}
                    <button className="nav-btn" disabled={endPage === totalPages} onClick={() => setCurrentPage(endPage + 1)}>{">"}</button>
                    <button className="nav-btn" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(totalPages)}>{">>"}</button>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}
