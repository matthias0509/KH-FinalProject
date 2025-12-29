import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/AdminPage.css'; // 관리자 공통 스타일
import '../../styles/UserManagement.css'; // 테이블/배지 스타일 재사용

// ===================================================
// [Helper] 상태 코드 변환 및 포맷팅
// ===================================================
const formatCurrency = (amount) => {
    return amount ? amount.toLocaleString() + '원' : '0원';
};

const formatStatus = (status) => {
    switch (status) {
        case 'WAITING': return '심사대기'; // DB에는 없지만 관리자 로직용
        case 'OPEN': return '진행중';
        case 'REJECT': return '반려';
        case 'CLOSE': return '종료';
        default: return status;
    }
};

// ===================================================
// A. 프로젝트 상세 검토 모달 (핵심 기능)
// ===================================================
const ProjectReviewModal = ({ project, onClose, onAction }) => {
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectInput, setShowRejectInput] = useState(false);

    if (!project) return null;

    // 승인 처리 (PRODUCT_STATUS='OPEN', PRODUCT_YN='Y')
    const handleApprove = () => {
        if (window.confirm(`[${project.productTitle}] 프로젝트를 승인하시겠습니까?\n승인 시 '진행중(OPEN)' 상태로 변경되며 사용자에게 공개됩니다.`)) {
            onAction(project.productNo, 'APPROVE', null);
        }
    };

    // 반려 처리 (PRODUCT_STATUS='REJECT' or 'FAIL', PRODUCT_YN='N')
    const handleReject = () => {
        if (!rejectReason.trim()) {
            alert('반려 사유를 반드시 입력해주세요.');
            return;
        }
        if (window.confirm('이 프로젝트를 반려 처리 하시겠습니까?')) {
            onAction(project.productNo, 'REJECT', rejectReason);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content large project-review-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>📝 프로젝트 심사 ({project.productStatus === 'WAITING' ? '대기중' : formatStatus(project.productStatus)})</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body review-layout">
                    {/* 1. 상단 정보 요약 */}
                    <div className="review-section basic-info">
                        <div className="info-row">
                            <span className="label">카테고리</span>
                            <span className="value badge">{project.category}</span>
                            <span className="label">판매자(No)</span>
                            <span className="value">{project.sellerName} ({project.sellerNo})</span>
                        </div>
                        <div className="info-row">
                            <span className="label">목표 금액</span>
                            <span className="value highlight">{formatCurrency(project.targetAmount)}</span>
                            <span className="label">펀딩 기간</span>
                            <span className="value">{project.fundStartDate} ~ {project.fundEndDate}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">예상 발송일</span>
                            <span className="value">{project.shipStartDate}</span>
                            <span className="label">등록일</span>
                            <span className="value">{project.createDate}</span>
                        </div>
                    </div>

                    <hr className="divider" />

                    {/* 2. 썸네일 및 스토리 (HTML 렌더링) */}
                    <div className="review-section content-preview">
                        <h4>프로젝트 스토리 & 이미지</h4>
                        
                        <div className="preview-container">
                            <div className="preview-item thumbnail-box">
                                <h5>대표 썸네일</h5>
                                {/* 실제 서버 이미지 경로로 수정 필요 */}
                                <img src={project.modifyThumbnail || "https://via.placeholder.com/620x420"} alt="썸네일" />
                            </div>
                            
                            <div className="preview-item story-box">
                                <h5>상세 스토리 (HTML Preview)</h5>
                                <div className="story-viewer">
                                    {/* ⚠️ TipTap 에디터로 작성된 HTML을 여기서 보여줍니다 */}
                                    <div dangerouslySetInnerHTML={{ __html: project.productDesc }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="divider" />

                    {/* 3. 리워드 리스트 (DB조인 결과라고 가정) */}
                    <div className="review-section">
                        <h4>리워드 구성</h4>
                        <div className="reward-list-grid">
                            {project.rewards && project.rewards.length > 0 ? (
                                project.rewards.map((reward, idx) => (
                                    <div key={idx} className="reward-card">
                                        <div className="reward-header">
                                            <span className="reward-price">{formatCurrency(reward.price)}</span>
                                            <span className="reward-name">{reward.title}</span>
                                        </div>
                                        <p className="reward-desc">{reward.description}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="no-data">등록된 리워드 정보가 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 4. 하단 승인/반려 버튼 */}
                <div className="modal-footer-actions">
                    {!showRejectInput ? (
                        <>
                            <button className="btn-save" onClick={handleApprove}>승인 (공개 처리)</button>
                            <button className="btn-action btn-danger" onClick={() => setShowRejectInput(true)}>반려</button>
                            <button className="btn-close-footer" onClick={onClose}>닫기</button>
                        </>
                    ) : (
                        <div className="reject-input-group">
                            <input 
                                type="text" 
                                placeholder="반려 사유를 입력하세요 (필수)"
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                className="input-field full-width"
                            />
                            <button className="btn-action btn-danger" onClick={handleReject}>반려 확정</button>
                            <button className="btn-close-footer" onClick={() => {setShowRejectInput(false); setRejectReason('');}}>취소</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ===================================================
// B. 메인 페이지 컴포넌트
// ===================================================
const ProjectApprovalPage = () => {
    const [projectList, setProjectList] = useState([]);
    const [filterStatus, setFilterStatus] = useState('WAITING'); // 기본값: 심사대기
    const [selectedProject, setSelectedProject] = useState(null);

    // [API Mock] 백엔드에서 가져올 데이터 형태 (TB_PRODUCT + TB_REWARD 조인)
    useEffect(() => {
        // fetchProjects(); // 실제 API 호출
        
        // 더미 데이터 (DB 컬럼명 매핑)
        const mockData = [
            {
                productNo: 101,
                productTitle: "유기농 비건 통밀빵 프로젝트",
                productDesc: "<h1>건강한 빵입니다.</h1><p>버터와 우유가 들어가지 않았습니다.</p><img src='https://via.placeholder.com/300' />",
                targetAmount: 5000000,
                currentAmount: 0,
                fundStartDate: "2025-01-01",
                fundEndDate: "2025-01-31",
                productStatus: "WAITING", // 심사대기
                category: "푸드",
                modifyThumbnail: "https://via.placeholder.com/600x400",
                shipStartDate: "2025-02-10",
                createDate: "2024-12-25",
                productYn: "N",
                sellerNo: 2,
                sellerName: "빵굽는마을", // JOIN으로 가져온 이름
                rewards: [
                    { title: "얼리버드 세트", price: 15000, description: "통밀빵 2개 + 잼" },
                    { title: "패밀리 세트", price: 40000, description: "통밀빵 5개 + 잼 2개" }
                ]
            },
            {
                productNo: 102,
                productTitle: "제로웨이스트 대나무 칫솔",
                productDesc: "<p>지구를 위한 작은 실천.</p>",
                targetAmount: 1000000,
                currentAmount: 0,
                fundStartDate: "2025-02-01",
                fundEndDate: "2025-02-15",
                productStatus: "WAITING",
                category: "리빙",
                modifyThumbnail: null,
                shipStartDate: "2025-02-20",
                createDate: "2024-12-26",
                productYn: "N",
                sellerNo: 5,
                sellerName: "에코라이프",
                rewards: [
                    { title: "싱글팩", price: 5000, description: "칫솔 1개" }
                ]
            }
        ];

        // 필터링 시늉 (실제로는 API 파라미터로 처리)
        setProjectList(mockData.filter(p => p.productStatus === filterStatus));

    }, [filterStatus]);

    // [Action] 승인/반려 처리
    const handleProjectAction = async (productNo, actionType, reason) => {
        try {
            console.log(`Sending API: /api/admin/project/${actionType}`, { productNo, reason });
            
            // await axios.put('/api/admin/project/status', { productNo, status: actionType, reason });

            alert(`프로젝트 번호 [${productNo}] 처리가 완료되었습니다.`);
            
            // 목록에서 제거 (UI 갱신)
            setProjectList(prev => prev.filter(p => p.productNo !== productNo));
            setSelectedProject(null);
        } catch (error) {
            console.error("Error updating project status:", error);
            alert("처리 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="project-approval-page">
            <h2 className="page-title">📝 프로젝트 승인 및 반려</h2>
            
            {/* 필터 영역 */}
            <div className="filter-area admin-card">
                <div className="filter-group">
                    <label>진행 상태:</label>
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)} 
                        className="filter-select"
                    >
                        <option value="WAITING">심사 대기 (신규)</option>
                        <option value="OPEN">승인됨 (진행중)</option>
                        <option value="REJECT">반려됨</option>
                    </select>
                </div>
            </div>

            {/* 테이블 영역 */}
            <div className="admin-card">
                <table className="user-table flickspot-style">
                    <thead>
                        <tr>
                            <th width="5%">No</th>
                            <th width="10%">카테고리</th>
                            <th width="35%">프로젝트 제목</th>
                            <th width="10%">판매자</th>
                            <th width="10%">목표금액</th>
                            <th width="15%">신청일 / 펀딩기간</th>
                            <th width="10%">관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectList.length > 0 ? (
                            projectList.map(project => (
                                <tr key={project.productNo} className="hover-row">
                                    <td>{project.productNo}</td>
                                    <td><span className="category-badge">{project.category}</span></td>
                                    <td className="text-left">
                                        <div className="project-list-title">{project.productTitle}</div>
                                    </td>
                                    <td>{project.sellerName}</td>
                                    <td>{formatCurrency(project.targetAmount)}</td>
                                    <td>
                                        <div className="date-col">
                                            <span>신청: {project.createDate}</span>
                                            <span className="sub-date">({project.fundStartDate}~)</span>
                                        </div>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn-detail-small"
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            심사하기
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="no-data">해당 상태의 프로젝트가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 상세 검토 모달 */}
            <ProjectReviewModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
                onAction={handleProjectAction}
            />
        </div>
    );
};

export default ProjectApprovalPage;