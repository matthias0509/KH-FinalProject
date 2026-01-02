import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { categories } from '../../data/content'; // 👈 카테고리 데이터 가져오기
import '../../styles/PuddingManagement.css'; 

// ===================================================
// [Helper] 상태 한글 변환 함수
// ===================================================
const formatStatus = (status) => {
    switch(status) {
        case 'PREVIEW': return '공개예정';
        case 'OPEN':    return '진행중'; // DB값 OPEN에 대응
        case 'ONGOING': return '진행중'; // 혹시 모를 구버전 대응
        case 'SUCCESS': return '성공';
        case 'FAIL':    return '실패';
        case 'STOP':    return '중단(정지)';
        case 'BAN':     return '제재(삭제)';
        default: return status;
    }
};

// ===================================================
// A. 프로젝트 상세/수정 모달
// ===================================================
const PuddingDetailModal = ({ project, onClose, onRefresh }) => {
    if (!project) return null;

    // 수정할 데이터 상태 관리
    const [editData, setEditData] = useState({
        projectNo: project.productNo, // 백엔드 메서드 파라미터명에 맞춤
        status: project.productStatus
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    // [API] 상태 수정 요청
    const handleSave = async () => {
        if (!window.confirm(`[${project.productTitle}] 프로젝트 상태를 변경하시겠습니까?`)) return;

        try {
            await axios.put('http://localhost:8001/foodding/api/admin/project/status', editData);
            alert("프로젝트 상태가 수정되었습니다.");
            onRefresh(); // 목록 새로고침
            onClose();   // 모달 닫기
        } catch (error) {
            console.error("Update failed:", error);
            alert("수정 실패: " + (error.response?.data || error.message));
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content large" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>푸슐랭(프로젝트) 상세 관리</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>
                
                <div className="modal-body detail-layout">
                    <div className="detail-form-grid">
                        {/* --- 왼쪽: 프로젝트 기본 정보 (Read Only) --- */}
                        <div className="column">
                            <div className="img-preview-box">
                                {/* 👇 이미지 에러 방지를 위해 placehold.co 사용 */}
                                <img 
                                    src={project.thumbnailUrl || "https://placehold.co/300x200?text=No+Image"} 
                                    alt="썸네일" 
                                />
                            </div>
                            
                            <label>프로젝트 번호</label>
                            <input type="text" value={project.productNo} readOnly className="input-field read-only" />

                            <label>프로젝트명</label>
                            <input type="text" value={project.productTitle} readOnly className="input-field read-only" />

                            <label>창작자(메이커)</label>
                            <input type="text" value={`${project.sellerName} (${project.sellerId})`} readOnly className="input-field read-only" />
                        </div>

                        {/* --- 오른쪽: 성과 및 관리 (Editable) --- */}
                        <div className="column">
                            <label>카테고리</label>
                            <input type="text" value={project.category} readOnly className="input-field read-only" />

                            <label>달성률 / 모금액</label>
                            <div className="input-group">
                                <input type="text" value={`${project.achieveRate}%`} readOnly className="input-field read-only half" />
                                <input type="text" value={`${project.currentAmount?.toLocaleString()}원`} readOnly className="input-field read-only half" />
                            </div>

                            <label>기간</label>
                            <input type="text" value={`${project.fundStartDate} ~ ${project.fundEndDate}`} readOnly className="input-field read-only" />

                            <hr className="divider"/>

                            <label className="highlight-label">관리자 상태 변경</label>
                            <select name="status" value={editData.status} onChange={handleChange} className="input-field">
                                {/* ✅ DB 값과 일치하도록 'OPEN' 사용 */}
                                <option value="OPEN">진행중 (OPEN)</option>
                                <option value="SUCCESS">성공 (SUCCESS)</option>
                                <option value="FAIL">실패 (FAIL)</option>
                                <option value="STOP" style={{color:'red'}}>⚠ 강제 중단 (STOP)</option>
                                <option value="BAN" style={{color:'red'}}>🚫 제재/삭제 (BAN)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="modal-footer-actions">
                        <button className="btn-save" onClick={handleSave}>변경 사항 저장</button>
                        <button className="btn-close-footer" onClick={onClose}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ===================================================
// B. 메인 페이지 컴포넌트
// ===================================================
const PuddingManagementPage = () => {
    // State
    const [projectList, setProjectList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');

    const [modalProject, setModalProject] = useState(null);

    // Data Fetching
    const fetchProjects = useCallback(async (currentPage) => {
        try {
            const response = await axios.get('http://localhost:8001/foodding/api/admin/project/list', {
                params: {
                    page: currentPage,
                    size: 10,
                    status: filterStatus,
                    category: filterCategory,
                    keyword: searchTerm
                }
            });
            
            setProjectList(response.data.list || []);
            setTotalPages(response.data.totalPages || 1);
            setTotalCount(response.data.totalCount || 0);

        } catch (error) {
            console.error("프로젝트 로딩 실패:", error);
            setProjectList([]);
        }
    }, [filterStatus, filterCategory, searchTerm]); 

    // 필터 변경 시 1페이지로 리셋 및 호출
    useEffect(() => {
        setPage(1);
        fetchProjects(1);
    }, [filterStatus, filterCategory, fetchProjects]); 

    // 페이지 변경 시 호출
    useEffect(() => {
        fetchProjects(page);
    }, [page, fetchProjects]);


    const handleSearch = () => {
        setPage(1);
        fetchProjects(1);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="pudding-management-page">
            <div className="header-flex">
                <h2 className="page-title">
                    푸슐랭(프로젝트) 관리 
                    {totalCount > 0 && <span className="count-badge">총 {totalCount}개</span>}
                </h2>
                
                <div className="search-group top-search">
                    <input 
                        type="text" 
                        placeholder="프로젝트명/메이커 검색" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="search-input"
                    />
                    <button className="btn-search" onClick={handleSearch}>검색</button>
                </div>
            </div>

            {/* 필터 바 */}
            <div className="filter-area admin-card">
                <div className="filter-row">
                    <div className="filter-group">
                        <label>진행 상태</label>
                        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="filter-select">
                            <option value="all">전체 상태</option>
                            <option value="OPEN">진행중</option>
                            <option value="SUCCESS">성공</option>
                            <option value="FAIL">실패</option>
                            <option value="STOP">중단/정지</option>
                        </select>
                    </div>
                    
                    <div className="filter-group">
                        <label>카테고리</label>
                        <select 
                            value={filterCategory} 
                            onChange={e => setFilterCategory(e.target.value)} 
                            className="filter-select"
                        >
                            <option value="all">전체 카테고리</option>
                            {/* 외부 파일(categories)에서 데이터 매핑 */}
                            {categories
                                .filter(cat => cat.name !== '전체') // '전체' 중복 제외
                                .map((cat) => (
                                    <option key={cat.name} value={cat.name}>
                                        {cat.icon} {cat.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>

            {/* 테이블 */}
            <div className="list-wrapper admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>정보</th>
                            <th>프로젝트명</th>
                            <th>메이커</th>
                            <th>달성률/모금액</th>
                            <th>상태</th>
                            <th>종료일</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectList.length > 0 ? (
                            projectList.map((item) => (
                                <tr key={item.productNo} className={item.productStatus === 'STOP' || item.productStatus === 'BAN' ? 'row-stopped' : ''}>
                                    <td>{item.productNo}</td>
                                    <td><span className="category-badge">{item.category}</span></td>
                                    <td className="title-cell text-left">{item.productTitle}</td>
                                    <td>{item.sellerName}</td>
                                    <td>
                                        <div className="achievement">
                                            <span className="rate">{item.achieveRate}%</span>
                                            <span className="amount">({item.currentAmount?.toLocaleString()}원)</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-pill ${item.productStatus}`}>
                                            {formatStatus(item.productStatus)}
                                        </span>
                                    </td>
                                    <td>{item.fundEndDate}</td>
                                    <td>
                                        <button className="btn-detail-small" onClick={() => setModalProject(item)}>
                                            관리
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="8" className="no-data">데이터가 없습니다.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 */}
            {totalPages > 0 && (
                <div className="pagination-area">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-page">&lt;</button>
                    <span className="page-info">{page} / {totalPages}</span>
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-page">&gt;</button>
                </div>
            )}

            {/* 모달 */}
            <PuddingDetailModal 
                project={modalProject} 
                onClose={() => setModalProject(null)} 
                onRefresh={() => fetchProjects(page)} 
            />
        </div>
    );
};

export default PuddingManagementPage;