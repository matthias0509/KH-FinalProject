import React, { useState } from 'react';
import '../../styles/UserManagement.css'; 

// 임시 회원 데이터 (더미 데이터)
const DUMMY_USERS = [
    { id: 61, userId: 'mi9286', nickname: '조천판', email: 'mi9440@nate.com', type: '서포터', status: '활성', joined: '2025.11.13', lastLogin: '2025.11.13', phone: '010-1234-5678', birth: '2009.02.17', gender: 'M', address: '서울특별시', accumFund: '500,000', makerStatus: 'N' },
    { id: 60, userId: 'mi9286_DELETED_60', nickname: '조두팔', email: 'a@a.com', type: '메이커', status: '탈퇴', joined: '2025.11.25', lastLogin: '2025.11.25', phone: '010-9876-5432', birth: '1995.01.01', gender: 'F', address: '부산광역시', accumFund: '3,200,000', makerStatus: 'Y' },
    { id: 57, userId: 'asd123', nickname: '로이', email: 'b@b.com', type: '서포터', status: '활성', joined: '2025.11.06', lastLogin: '2025.12.10', phone: '010-2222-3333', birth: '1988.03.15', gender: 'M', address: '대구광역시', accumFund: '10,000', makerStatus: 'N' },
    { id: 56, userId: 'qwe1234', nickname: '박주현', email: 'c@c.com', type: '서포터', status: '정지', joined: '2025.11.04', lastLogin: '2025.11.05', phone: '010-4444-5555', birth: '2000.10.20', gender: 'F', address: '광주광역시', accumFund: '0', makerStatus: 'N' },
];

// ===================================================
// A. 회원 상세 정보 및 액션 모달 (최종)
// ===================================================
const UserDetailModal = ({ user, onClose, onAction }) => {
    if (!user) return null;

    const [editData, setEditData] = useState({
        nickname: user.nickname,
        phone: user.phone,
        address: user.address,
        email: user.email,
        status: user.status,
        type: user.type, 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // 백엔드: 회원 정보 변경 로직 (닉네임, 주소, 전화번호, 이메일, 상태, 권한)
        alert(`[UI] ${user.userId} 정보 수정 처리 완료!`);
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content large">
                <div className="modal-header">
                    <h3>회원 상세 정보</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>
                
                <div className="modal-body detail-layout">
                    {/* 1. 기본 상세 정보 (2열 레이아웃) */}
                    <div className="detail-form-grid">
                        
                        {/* 왼쪽 컬럼 (image_214240.png 참고) */}
                        <div className="column">
                            <label>회원번호</label>
                            <input type="text" value={user.id} readOnly className="input-field read-only" />

                            <label>비밀번호</label>
                            <input type="password" value="********" readOnly className="input-field read-only" />

                            <label>생년월일</label>
                            <input type="text" value={user.birth || '-'} readOnly className="input-field read-only" /> 
                            
                            <label>주소</label>
                            <input type="text" name="address" value={editData.address || ''} onChange={handleChange} className="input-field" />
                            
                            <label>전화번호</label>
                            <input type="text" name="phone" value={editData.phone || ''} onChange={handleChange} className="input-field" />
                            
                            <label>가입일</label>
                            <input type="text" value={user.joined} readOnly className="input-field read-only" />
                            
                            <label>성인인증일</label>
                            <input type="text" value="-" readOnly className="input-field read-only" /> 
                        </div>

                        {/* 오른쪽 컬럼 (image_214240.png 참고) */}
                        <div className="column">
                            <label>아이디</label>
                            <input type="text" value={user.userId} readOnly className="input-field read-only" />

                            <label>이름 (닉네임)</label>
                            <input type="text" name="nickname" value={editData.nickname} onChange={handleChange} className="input-field" /> 
                            
                            <label>성별</label>
                            <input type="text" value={user.gender || '-'} readOnly className="input-field read-only" /> 

                            <label>이메일</label>
                            <input type="email" name="email" value={editData.email} onChange={handleChange} className="input-field" /> 

                            <label>회원상태</label>
                            <select name="status" value={editData.status} onChange={handleChange} className="input-field">
                                <option value="활성">활성 (Y)</option>
                                <option value="정지">정지 (S)</option>
                                <option value="탈퇴대기">탈퇴대기 (D)</option>
                                <option value="탈퇴">탈퇴 (N)</option>
                            </select>
                            
                            {/* 💡 권한 수정 필드 */}
                            <label>회원 권한 (타입)</label>
                            <select name="type" value={editData.type} onChange={handleChange} className="input-field">
                                <option value="서포터">서포터</option>
                                <option value="메이커">메이커 (판매자)</option>
                            </select>


                            <label>정보수정일</label>
                            <input type="text" value="2025.12.13" readOnly className="input-field read-only" />
                            
                            <label>누적 후원액</label>
                            <input type="text" value={`${user.accumFund} 원`} readOnly className="input-field read-only" />
                        </div>
                    </div>
                    
                    <div className="modal-footer-actions">
                        <button className="btn-save" onClick={handleSave}>정보 수정</button>
                        <button className="btn-action btn-warning" onClick={() => onAction(user, '정지')}>
                            {user.status === '정지' ? '정지 해제' : '활동 정지'}
                        </button>
                        <button className="btn-action btn-danger" onClick={() => onAction(user, '탈퇴')}>
                            강제 탈퇴 처리
                        </button>
                        <button className="btn-close-footer" onClick={onClose}>목록으로</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

// ===================================================
// B. 회원 관리 메인 탭 (UserManagementTab)
// ===================================================
const UserManagementTab = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [page, setPage] = useState(1);
    const totalPages = 5; 
    
    const [modalUser, setModalUser] = useState(null); 

    // 필터링 및 검색 로직
    const filteredUsers = DUMMY_USERS.filter(user => 
        (filterStatus === 'all' || user.status === filterStatus) &&
        (user.userId.includes(searchTerm) || user.nickname.includes(searchTerm) || user.email.includes(searchTerm))
    );

    const handleAction = (user, actionType) => {
        // ... (액션 로직 유지) ...
        if (actionType === '정지') {
            const newStatus = user.status === '정지' ? '활성' : '정지';
            if (window.confirm(`[UI] ${user.userId} 계정을 ${newStatus} 처리 하시겠습니까?`)) {
                alert(`[UI] ${user.userId} 상태를 ${newStatus}로 변경 처리 완료!`);
                setModalUser(null);
            }
        } else if (actionType === '탈퇴') {
            if (window.confirm(`[UI] 경고: ${user.userId} 계정을 강제 탈퇴 처리 하시겠습니까?`)) {
                alert(`[UI] ${user.userId} 강제 탈퇴 처리 완료!`);
                setModalUser(null);
            }
        }
    };
    
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="user-management-tab">
            <div className="header-flex">
                <h2 className="page-title">회원 관리</h2> 
                
                {/* 검색 기능 (오른쪽 상단 배치) */}
                <div className="search-group top-search">
                    <input 
                        type="text" 
                        placeholder="이름 검색" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button className="btn-search">검색</button>
                </div>
            </div>
            
            <div className="filter-area admin-card">
                <div className="filter-group">
                    <label>상태:</label>
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">전체</option>
                        <option value="활성">활성 (Y)</option>
                        <option value="정지">정지 (S)</option>
                        <option value="탈퇴대기">탈퇴대기 (D)</option>
                        <option value="탈퇴">탈퇴 (N)</option>
                    </select>

                    <label>정렬:</label>
                    <select className="filter-select">
                        <option value="latest">최신 가입 순</option>
                        <option value="name">닉네임 순</option>
                    </select>
                </div>
            </div>

            {/* 회원 목록 테이블 */}
            <div className="user-list-wrapper admin-card">
                <table className="user-table flickspot-style">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>상태</th>
                            <th>가입일</th>
                            <th>동작</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr 
                                key={user.id} 
                                className={`user-row ${user.status === '탈퇴' ? 'status-deleted' : ''}`}
                            >
                                <td>{user.id}</td>
                                <td>{user.userId}</td>
                                <td>{user.nickname}</td>
                                <td>{user.status === '활성' ? 'Y' : user.status === '탈퇴' ? 'N' : 'S'}</td>
                                <td>{user.joined}</td>
                                <td>
                                    <button 
                                        className="btn-detail-small" 
                                        onClick={(e) => { e.stopPropagation(); setModalUser(user); }}
                                    >
                                        상세
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 */}
            <div className="pagination-area">
                <button 
                    onClick={() => handlePageChange(page - 1)} 
                    disabled={page === 1}
                >
                    &lt; 이전
                </button>
                <span> {page} / {totalPages} </span>
                <button 
                    onClick={() => handlePageChange(page + 1)} 
                    disabled={page === totalPages}
                >
                    다음 &gt;
                </button>
            </div>
            
            {/* 회원 상세 정보 모달 */}
            <UserDetailModal 
                user={modalUser} 
                onClose={() => setModalUser(null)} 
                onAction={handleAction}
            />
        </div>
    );
};

export default UserManagementTab;