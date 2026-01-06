import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { categories } from '../../data/content'; 
import '../../styles/PuddingManagement.css'; 
import '../../styles/AdminPage.css';
import '../../styles/UserManagement.css'; 

const formatStatus = (status) => {
    switch(status) {
        case 'OPEN':    return '✅ 진행중';
        case 'SUCCESS': return '🏆 성공';
        case 'FAIL':    return '❌ 실패';
        case 'BAN':     return '🚫 제재';
        default: return status;
    }
};

// ===================================================
// A. 프로젝트 상세/수정 모달 (이미지 제거됨)
// ===================================================
const PuddingDetailModal = ({ project, onClose, onRefresh }) => {
    // 1. Hook 선언부 (항상 최상단)
    const [editData, setEditData] = useState({ projectNo: '', status: '' });

    useEffect(() => {
        if (project) {
            setEditData({ projectNo: project.productNo, status: project.productStatus });
        }
    }, [project]);

    // 2. 데이터 유무 체크 (Hook 선언 완료 후)
    if (!project) return null;

    // 3. 이벤트 핸들러
    const handleSave = async () => {
        if (!window.confirm(`[${project.productTitle}] 프로젝트 상태를 변경하시겠습니까?`)) return;
        try {
            await axios.put('http://localhost:8001/foodding/api/admin/project/status', editData);
            alert("프로젝트 상태가 수정되었습니다.");
            onRefresh();
            onClose();
        } catch (error) {
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
                        {/* 왼쪽 섹션: 기본 정보 */}
                        <div className="column">
                            <label>프로젝트 번호</label>
                            <input type="text" value={project.productNo} readOnly className="input-field read-only" />
                            
                            <label>프로젝트명</label>
                            <input type="text" value={project.productTitle} readOnly className="input-field read-only" />
                            
                            <label>창작자(메이커)</label>
                            <input type="text" value={`${project.sellerName} (${project.sellerId || 'ID없음'})`} readOnly className="input-field read-only" />
                            
                            <label>카테고리</label>
                            <input type="text" value={project.category} readOnly className="input-field read-only" />
                        </div>

                        {/* 오른쪽 섹션: 성과 및 상태 변경 */}
                        <div className="column">
                            <label>현재 달성률</label>
                            <input type="text" value={`${project.achieveRate}%`} readOnly className="input-field read-only" />

                            <label>누적 모금액</label>
                            <input type="text" value={`${project.currentAmount?.toLocaleString()}원`} readOnly className="input-field read-only" />

                            <label>펀딩 기간</label>
                            <input type="text" value={`${project.fundStartDate} ~ ${project.fundEndDate}`} readOnly className="input-field read-only" />
                            
                            <hr style={{ margin: '25px 0', border: '0', borderTop: '1px solid #eee' }}/>
                            
                            <label style={{ color: '#ff5757', fontWeight: 'bold' }}>관리자 상태 변경</label>
                            <select 
                                name="status" 
                                value={editData.status} 
                                onChange={(e) => setEditData({...editData, status: e.target.value})} 
                                className="input-field"
                            >
                                <option value="OPEN">✅ 진행중 (OPEN)</option>
                                <option value="SUCCESS">🏆 성공 (SUCCESS)</option>
                                <option value="FAIL">❌ 실패 (FAIL)</option>
                                <option value="BAN">🚫 제재/삭제 (BAN)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="modal-footer-actions">
                    <button className="btn-save" onClick={handleSave}>변경 사항 저장</button>
                    <button className="btn-close-footer" onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

// ===================================================
// B. 메인 페이지 컴포넌트
// ===================================================
const PuddingManagementPage = () => {
    const [projectList, setProjectList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [modalProject, setModalProject] = useState(null);

    const fetchProjects = useCallback(async (currentPage) => {
        setLoading(true);
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
            const list = response.data.list || [];
            const filteredList = list.filter(item => item.productStatus !== 'WAITING');
            setProjectList(filteredList);
            setTotalCount(response.data.totalCount || 0);
        } catch (error) {
            console.error("Fetch error:", error);
            setProjectList([]);
        } finally {
            setLoading(false);
        }
    }, [filterStatus, filterCategory, searchTerm]);

    useEffect(() => {
        setPage(1);
        fetchProjects(1);
    }, [filterStatus, filterCategory, fetchProjects]);

    useEffect(() => {
        fetchProjects(page);
    }, [page, fetchProjects]);

    const totalPages = Math.ceil(totalCount / 10) || 1;

    return (
        <div className="project-approval-page">
            <div className="header-flex">
                <h2 className="page-title">
                    🍮 푸슐랭(프로젝트) 관리 
                    {totalCount > 0 && <span className="count-badge" style={{ marginLeft: '10px', fontSize: '14px' }}>총 {totalCount}개</span>}
                </h2>
                <div className="search-group top-search">
                    <input type="text" placeholder="프로젝트명/메이커 검색" className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchProjects(1)} />
                    <button className="btn-search" onClick={() => fetchProjects(1)}>검색</button>
                </div>
            </div>

            <div className="filter-area admin-card">
                <div className="filter-group">
                    <label>진행 상태:</label>
                    <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="filter-select">
                        <option value="all">전체 (심사대기 제외)</option>
                        <option value="OPEN">진행중</option>
                        <option value="SUCCESS">성공</option>
                        <option value="FAIL">실패</option>
                        <option value="STOP">중단/정지</option>
                    </select>
                    <label style={{ marginLeft: '20px' }}>카테고리:</label>
                    <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="filter-select">
                        <option value="all">전체 카테고리</option>
                        {categories.filter(c => c.name !== '전체').map(c => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="admin-card">
                <table className="user-table flickspot-style">
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
                        {loading ? (
                            <tr><td colSpan="8" className="no-data">데이터를 불러오는 중...</td></tr>
                        ) : projectList.length > 0 ? (
                            projectList.map((item) => (
                                <tr key={item.productNo} className="hover-row">
                                    <td>{item.productNo}</td>
                                    <td><span className="category-badge">{item.category}</span></td>
                                    <td className="text-left" style={{ fontWeight: '500' }}>{item.productTitle}</td>
                                    <td>{item.sellerName}</td>
                                    <td>
                                        <div style={{ fontSize: '13px' }}>
                                            <b style={{ color: '#ff5757' }}>{item.achieveRate}%</b><br/>
                                            <span style={{ color: '#888' }}>({item.currentAmount?.toLocaleString()}원)</span>
                                        </div>
                                    </td>
                                    <td><span className={`status-pill ${item.productStatus}`}>{formatStatus(item.productStatus)}</span></td>
                                    <td>{item.fundEndDate}</td>
                                    <td>
                                        <button className="btn-detail-small" onClick={() => setModalProject(item)}>관리</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="8" className="no-data">데이터가 없습니다.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 0 && (
                <div className="pagination-area">
                    <button className="btn-page" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>&lt;</button>
                    <span className="page-info">{page} / {totalPages}</span>
                    <button className="btn-page" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>&gt;</button>
                </div>
            )}

            <PuddingDetailModal project={modalProject} onClose={() => setModalProject(null)} onRefresh={() => fetchProjects(page)} />
        </div>
    );
};

export default PuddingManagementPage;