import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { resolveApiUrl } from '../../utils/apiConfig';
import '../../styles/PuddingManagement.css'; 

// ===================================================
// A. [강화된] 후원 상세 정보 모달
// ===================================================
const FundingDetailModal = ({ funding, onClose, onStatusChange }) => {
    if (!funding) return null;

    // 관리자 강제 취소 핸들러
    const handleForceCancel = async () => {
        if (!window.confirm(`[주문번호: ${funding.orderNo}]\n해당 후원을 강제로 취소/환불 처리하시겠습니까?`)) return;

        try {
            const token = localStorage.getItem('token');
            // 관리자 전용 취소 API 호출
            await axios.post(resolveApiUrl('/admin/funding/cancel'), 
                { orderNo: funding.orderNo },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            
            alert("정상적으로 취소 처리되었습니다.");
            onStatusChange(); // 부모 컴포넌트 목록 새로고침
            onClose();
        } catch (error) {
            console.error("취소 실패:", error);
            alert("취소 처리에 실패했습니다.");
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content large" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>💰 후원 상세 정보</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>
                
                <div className="modal-body detail-layout">
                    <div className="detail-form-grid">
                        
                        {/* 1. 기본 주문 정보 */}
                        <div className="column">
                            <h4 className="section-subtitle">기본 정보</h4>
                            <label>주문번호</label>
                            <input type="text" value={funding.orderNo} readOnly className="input-field read-only" />

                            <label>프로젝트명</label>
                            <input type="text" value={funding.projectTitle} readOnly className="input-field read-only" />

                            <label>후원자 ID</label>
                            <input type="text" value={funding.userId} readOnly className="input-field read-only" />
                            
                            <label>후원 일자</label>
                            <input type="text" value={funding.fundingDate} readOnly className="input-field read-only" />
                        </div>

                        {/* 2. 결제 및 배송 정보 */}
                        <div className="column">
                            <h4 className="section-subtitle">결제 및 배송</h4>
                            
                            <div className="input-group">
                                <div>
                                    <label>결제 금액</label>
                                    <input type="text" value={`${Number(funding.totalAmount).toLocaleString()}원`} readOnly className="input-field read-only" />
                                </div>
                                <div>
                                    <label>주문 상태</label>
                                    <input type="text" value={funding.fundingStatus} readOnly className="input-field read-only" 
                                        style={{ color: funding.fundingStatus === 'CANCEL' ? 'red' : 'green', fontWeight: 'bold' }} 
                                    />
                                </div>
                            </div>

                            <label>배송 상태</label>
                            <input type="text" value={funding.deliveryStatus || '배송 준비중'} readOnly className="input-field read-only" />

                            {/* 🚨 배송지 정보가 있다면 여기에 표시 (VO에 필드 추가 필요) */}
                            {/* <label>배송지 주소</label>
                            <input type="text" value={funding.address || '-'} readOnly className="input-field read-only" /> */}
                        </div>
                    </div>
                    
                    <div className="modal-footer-actions">
                        {/* 결제 완료 상태일 때만 '강제 취소' 버튼 노출 */}
                        {funding.fundingStatus === 'PAY' && (
                            <button className="btn-save" style={{backgroundColor: '#e74c3c'}} onClick={handleForceCancel}>
                                🚫 강제 취소/환불
                            </button>
                        )}
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
const FundingManagementPage = () => {
    // ... (기존 State 및 로직 동일) ...
    const [list, setList] = useState([]);
    const [originalList, setOriginalList] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL'); 
    const [modalData, setModalData] = useState(null);

    // 데이터 불러오기
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(resolveApiUrl('/admin/funding/all'), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setOriginalList(res.data);
            setList(res.data);
        } catch (err) {
            console.error("내역 로딩 실패", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 필터링 로직
    useEffect(() => {
        let result = originalList;
        if (filterStatus !== 'ALL') {
            result = result.filter(item => item.fundingStatus === filterStatus);
        }
        if (searchTerm) {
            const lowerQuery = searchTerm.toLowerCase();
            result = result.filter(item => 
                item.userId.toLowerCase().includes(lowerQuery) || 
                item.projectTitle.toLowerCase().includes(lowerQuery) ||
                String(item.orderNo).includes(lowerQuery)
            );
        }
        setList(result);
        setPage(1);
    }, [searchTerm, filterStatus, originalList]);

    // 페이지네이션
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(list.length / itemsPerPage);

    const getStatusBadgeClass = (status) => {
        if (status === 'PAY' || status === '결제완료') return 'status-pill OPEN'; 
        if (status === 'CANCEL' || status === '취소') return 'status-pill STOP'; 
        return 'status-pill';
    };

    return (
        <div className="pudding-management-page">
            <div className="header-flex">
                <h2 className="page-title">
                    후원/환불 관리
                    <span className="count-badge">총 {list.length}건</span>
                </h2>
                <div className="search-group top-search">
                    <input 
                        type="text" 
                        placeholder="주문번호/ID/프로젝트명 검색" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button className="btn-search">검색</button>
                </div>
            </div>

            <div className="filter-area admin-card">
                <div className="filter-row">
                    <div className="filter-group">
                        <label>결제 상태</label>
                        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="filter-select">
                            <option value="ALL">전체 보기</option>
                            <option value="PAY">✅ 결제 완료</option>
                            <option value="CANCEL">🚫 취소/환불</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="list-wrapper admin-card">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>주문번호</th>
                            <th>주문자 ID</th>
                            <th>프로젝트명</th>
                            <th>결제금액</th>
                            <th>상태</th>
                            <th>주문일자</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="7" className="no-data">데이터를 불러오는 중...</td></tr>
                        ) : currentItems.length > 0 ? (
                            currentItems.map((item) => (
                                <tr key={item.orderNo} className={item.fundingStatus === 'CANCEL' ? 'row-stopped' : ''}>
                                    <td>{item.orderNo}</td>
                                    <td>{item.userId}</td>
                                    <td className="title-cell text-left" title={item.projectTitle}>
                                        {item.projectTitle.length > 20 ? item.projectTitle.substring(0, 20) + '...' : item.projectTitle}
                                    </td>
                                    <td>{Number(item.totalAmount).toLocaleString()}원</td>
                                    <td>
                                        <span className={getStatusBadgeClass(item.fundingStatus)}>
                                            {item.fundingStatus === 'CANCEL' ? '취소/환불' : '결제완료'}
                                        </span>
                                    </td>
                                    <td>{item.fundingDate}</td>
                                    <td>
                                        <button className="btn-detail-small" onClick={() => setModalData(item)}>
                                            상세
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="7" className="no-data">검색 결과가 없습니다.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 0 && (
                <div className="pagination-area">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-page">&lt;</button>
                    <span className="page-info">{page} / {totalPages}</span>
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-page">&gt;</button>
                </div>
            )}

            <FundingDetailModal 
                funding={modalData} 
                onClose={() => setModalData(null)} 
                onStatusChange={fetchData} // 취소 시 목록 갱신
            />
        </div>
    );
};

export default FundingManagementPage;
