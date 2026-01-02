import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    fetchProjectReviewDetail,
    fetchProjectReviewList,
    reviewProjectSubmission,
} from '../../api/projectApi';
import { getProjectThumbnail } from '../../utils/projectMedia';
import '../../styles/AdminPage.css';
import '../../styles/UserManagement.css';

const STATUS_LABEL = {
    WAITING: '심사대기',
    OPEN: '진행중',
    REJECT: '반려',
    SUCCESS: '성공',
    FAIL: '실패',
};

const formatCurrency = (amount) => {
    const numeric = Number(amount) || 0;
    return `${numeric.toLocaleString()}원`;
};

const formatStatus = (status) => STATUS_LABEL[status] || status;

// =========================================================
// 1. 심사 모달 컴포넌트
// =========================================================
const ProjectReviewModal = ({
    isOpen,
    project,
    isLoading,
    errorMessage,
    actionLoading,
    actionError,
    onClose,
    onAction,
}) => {
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectInput, setShowRejectInput] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setRejectReason('');
            setShowRejectInput(false);
        }
    }, [isOpen, project?.productNo]);

    if (!isOpen) return null;

    // ✅ 승인 핸들러 (바로 OPEN 처리)
    const handleApprove = () => {
        if (!project || actionLoading || isLoading) return;
        if (
            window.confirm(
                `[${project.productTitle}] 프로젝트를 승인하시겠습니까?\n\n※ 확인 즉시 '진행중(OPEN)' 상태로 변경되어 사용자에게 노출됩니다.`
            )
        ) {
            onAction(project.productNo, 'APPROVE');
        }
    };

    const handleReject = () => {
        if (!project || actionLoading || isLoading) return;
        if (!rejectReason.trim()) {
            alert('반려 사유를 반드시 입력해주세요.');
            return;
        }
        if (window.confirm('이 프로젝트를 반려 처리 하시겠습니까?')) {
            onAction(project.productNo, 'REJECT', rejectReason.trim());
        }
    };

    const storyHtml = project?.storyHtml || project?.productDesc || '<p>등록된 스토리가 없습니다.</p>';
    const thumbnailUrl = getProjectThumbnail(project, 'https://via.placeholder.com/620x420');

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content large project-review-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>📝 프로젝트 심사 ({formatStatus(project?.productStatus)})</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>

                {isLoading ? (
                    <div className="modal-body"><p className="no-data">상세 정보를 불러오는 중입니다...</p></div>
                ) : errorMessage ? (
                    <div className="modal-body"><p className="no-data">{errorMessage}</p></div>
                ) : !project ? (
                    <div className="modal-body"><p className="no-data">정보를 찾을 수 없습니다.</p></div>
                ) : (
                    <div className="modal-body review-layout">
                        {/* 상세 정보 영역 */}
                        <div className="review-section basic-info">
                            <div className="info-row">
                                <span className="label">카테고리</span>
                                <span className="value badge">{project.category}</span>
                                <span className="label">판매자</span>
                                <span className="value">{project.sellerName} ({project.sellerId})</span>
                            </div>
                            <div className="info-row">
                                <span className="label">목표 금액</span>
                                <span className="value highlight">{formatCurrency(project.targetAmount)}</span>
                                <span className="label">펀딩 기간</span>
                                <span className="value">{project.fundStartDate} ~ {project.fundEndDate}</span>
                            </div>
                            {project.rejectReason && (
                                <div className="info-row">
                                    <span className="label">반려 사유</span>
                                    <span className="value reject-reason">{project.rejectReason}</span>
                                </div>
                            )}
                        </div>

                        <hr className="divider" />

                        {/* 스토리 미리보기 */}
                        <div className="review-section content-preview">
                            <h4>스토리 & 썸네일 확인</h4>
                            <div className="preview-container">
                                <div className="preview-item thumbnail-box">
                                    <h5>대표 썸네일</h5>
                                    <img src={thumbnailUrl} alt="썸네일" />
                                </div>
                                <div className="preview-item story-box">
                                    <h5>상세 스토리</h5>
                                    <div className="story-viewer" dangerouslySetInnerHTML={{ __html: storyHtml }} />
                                </div>
                            </div>
                        </div>

                        <hr className="divider" />

                        {/* 리워드 확인 */}
                        <div className="review-section">
                            <h4>리워드 구성</h4>
                            <div className="reward-list-grid">
                                {project.rewards?.map((reward, idx) => (
                                    <div key={idx} className="reward-card">
                                        <div className="reward-header">
                                            <span className="reward-price">{formatCurrency(reward.price)}</span>
                                            <span className="reward-name">{reward.title}</span>
                                        </div>
                                        <p className="reward-desc">{reward.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 하단 버튼 액션 */}
                <div className="modal-footer-actions">
                    {actionError && <div className="admin-seller__error">{actionError}</div>}
                    {!showRejectInput ? (
                        <>
                            <button className="btn-save" onClick={handleApprove} disabled={actionLoading}>
                                승인 (즉시 진행)
                            </button>
                            <button className="btn-action btn-danger" onClick={() => setShowRejectInput(true)} disabled={actionLoading}>
                                반려
                            </button>
                            <button className="btn-close-footer" onClick={onClose}>닫기</button>
                        </>
                    ) : (
                        <div className="reject-input-group">
                            <input
                                type="text"
                                placeholder="반려 사유 입력 (필수)"
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                                className="input-field full-width"
                            />
                            <button className="btn-action btn-danger" onClick={handleReject} disabled={actionLoading}>
                                반려 확정
                            </button>
                            <button className="btn-close-footer" onClick={() => { setShowRejectInput(false); setRejectReason(''); }}>
                                취소
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// =========================================================
// 2. 메인 페이지 컴포넌트
// =========================================================
const ProjectApprovalPage = () => {
    const [projectList, setProjectList] = useState([]);
    const [filterStatus, setFilterStatus] = useState('WAITING');
    const [listLoading, setListLoading] = useState(false);
    
    // 모달 관련
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    // 목록 불러오기
    const loadProjects = useCallback(async () => {
        setListLoading(true);
        try {
            const data = await fetchProjectReviewList(filterStatus);
            setProjectList(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
            setProjectList([]);
        } finally {
            setListLoading(false);
        }
    }, [filterStatus]);

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    // 모달 열기
    const handleOpenModal = async (productNo) => {
        setIsModalOpen(true);
        setModalLoading(true);
        try {
            const detail = await fetchProjectReviewDetail(productNo);
            setSelectedProject(detail);
        } catch (error) {
            console.error(error);
        } finally {
            setModalLoading(false);
        }
    };

    // 승인/반려 처리
    const handleProjectAction = async (productNo, actionType, reason) => {
        setActionLoading(true);
        try {
            // actionType: 'APPROVE' -> 백엔드에서 OPEN으로 처리
            await reviewProjectSubmission(productNo, { action: actionType, reason });
            alert("처리가 완료되었습니다.");
            await loadProjects(); // 목록 갱신
            setIsModalOpen(false);
        } catch (error) {
            alert("처리 중 오류가 발생했습니다.");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="project-approval-page">
            <h2 className="page-title">📝 프로젝트 승인/반려 심사</h2>

            <div className="filter-area admin-card">
                <div className="filter-group">
                    <label>심사 상태:</label>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
                        <option value="WAITING">심사 대기 (신규)</option>
                        <option value="REJECT">반려됨</option>
                        {/* OPEN은 여기서 안 보고 PuddingManagementPage에서 관리하므로 제외해도 됨 */}
                        <option value="OPEN">승인됨 (진행중)</option>
                    </select>
                </div>
            </div>

            <div className="admin-card">
                <table className="user-table flickspot-style">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>카테고리</th>
                            <th>프로젝트 제목</th>
                            <th>판매자</th>
                            <th>목표금액</th>
                            <th>펀딩 기간</th>
                            <th>상태</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectList.length > 0 ? (
                            projectList.map((p) => (
                                <tr key={p.productNo} className="hover-row">
                                    <td>{p.productNo}</td>
                                    <td><span className="category-badge">{p.category}</span></td>
                                    <td className="text-left">{p.productTitle}</td>
                                    <td>{p.sellerName}</td>
                                    <td>{formatCurrency(p.targetAmount)}</td>
                                    <td>{p.fundStartDate} ~ {p.fundEndDate}</td>
                                    <td><span className="status-badge">{formatStatus(p.productStatus)}</span></td>
                                    <td>
                                        <button className="btn-detail-small" onClick={() => handleOpenModal(p.productNo)}>
                                            심사하기
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

            <ProjectReviewModal
                isOpen={isModalOpen}
                project={selectedProject}
                isLoading={modalLoading}
                actionLoading={actionLoading}
                onClose={() => setIsModalOpen(false)}
                onAction={handleProjectAction}
            />
        </div>
    );
};

export default ProjectApprovalPage;