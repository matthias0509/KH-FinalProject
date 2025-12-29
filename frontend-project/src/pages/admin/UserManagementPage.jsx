// src/pages/admin/UserManagementPage.jsx (또는 UserManagementTab.jsx)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/UserManagement.css'; // CSS 파일 경로는 본인 프로젝트에 맞게 확인

// ===================================================
// [Helper] 상태/권한 한글 변환 함수
// ===================================================
const formatStatus = (yn) => {
    switch(yn) {
        case 'Y': return '활성';
        
        case 'N': return '탈퇴';
     
        default: return yn;
    }
};

const formatRole = (role) => {
    switch(role) {
        case 'SUPPORTER': return '서포터';
        case 'USER':      return '서포터';
        case 'MAKER': return '메이커';
        
        default: return role;
    }
};

// ===================================================
// A. 회원 상세 정보 및 수정 모달
// ===================================================
const UserDetailModal = ({ user, onClose, onRefresh }) => {
    if (!user) return null;

    // 수정할 수 있는 데이터 상태 관리 (VO 필드명과 일치시킴)
    const [editData, setEditData] = useState({
        userNo: user.userNo,
        nickname: user.nickname,
        phone: user.phone || '', // null 방지
        mainAddress: user.mainAddress || '',
        detailAddress: user.detailAddress || '',
        email: user.email,
        userYn: user.userYn,
        userRole: user.userRole,
    });

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    // [API] 정보 수정 요청 (Controller: /update)
    const handleSave = async () => {
        try {
            // 주의: 백엔드 포트 확인 (8080)
            await axios.put('http://localhost:8001/foodding/api/admin/user/update', editData);
            alert(`[System] ${user.userId} 님의 정보가 수정되었습니다.`);
            onRefresh(); // 목록 새로고침
            onClose();   // 모달 닫기
        } catch (error) {
            console.error("Update failed:", error);
            alert("정보 수정 실패: " + (error.response?.data || error.message));
        }
    };

    // [API] 상태 변경 (정지/탈퇴) 요청 (Controller: /status)
    const handleStatusAction = async (actionType) => {
        let newUserYn = '';
        let confirmMsg = '';

        if (actionType === '정지') {
            newUserYn = user.userYn === 'S' ? 'Y' : 'S'; // 토글
            confirmMsg = user.userYn === 'S' ? '정지 해제' : '활동 정지';
        } else if (actionType === '탈퇴') {
            newUserYn = 'N';
            confirmMsg = '강제 탈퇴';
        }

        if (window.confirm(`${user.userId} 계정을 [${confirmMsg}] 처리 하시겠습니까?`)) {
            try {
                await axios.put('http://localhost:8001/fooddingapi/admin/user/status', { 
                    userNo: user.userNo, 
                    userYn: newUserYn 
                });
                alert('상태 변경이 완료되었습니다.');
                onRefresh();
                onClose();
            } catch (error) {
                console.error("Status change failed:", error);
                alert("상태 변경 실패");
            }
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content large" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>회원 상세 정보</h3>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>
                
                <div className="modal-body detail-layout">
                    <div className="detail-form-grid">
                        {/* --- 왼쪽 컬럼 --- */}
                        <div className="column">
                            <label>회원번호 (No)</label>
                            <input type="text" value={user.userNo} readOnly className="input-field read-only" />

                            <label>아이디</label>
                            <input type="text" value={user.userId} readOnly className="input-field read-only" />

                            <label>이름 (실명)</label>
                            <input type="text" value={user.userName} readOnly className="input-field read-only" />

                            <label>닉네임</label>
                            <input type="text" name="nickname" value={editData.nickname} onChange={handleChange} className="input-field" />
                            
                            <label>전화번호</label>
                            <input type="text" name="phone" value={editData.phone} onChange={handleChange} className="input-field" />
                            
                            <label>주소 (기본)</label>
                            <input type="text" name="mainAddress" value={editData.mainAddress} onChange={handleChange} className="input-field" />
                            
                            <label>주소 (상세)</label>
                            <input type="text" name="detailAddress" value={editData.detailAddress} onChange={handleChange} className="input-field" />
                        </div>

                        {/* --- 오른쪽 컬럼 --- */}
                        <div className="column">
                            <label>생년월일</label>
                            <input type="text" value={user.birthDate || '-'} readOnly className="input-field read-only" /> 
                            
                            <label>성별</label>
                            <input type="text" value={user.gender || '-'} readOnly className="input-field read-only" /> 

                            <label>이메일</label>
                            <input type="email" name="email" value={editData.email} onChange={handleChange} className="input-field" /> 

                            <label>회원상태</label>
                            <select 
                                name="userYn" 
                                value={editData.userYn} 
                                onChange={handleChange} 
                                className="input-field"
                            >
                                {/* 👇 DB가 허용하는 Y와 N만 남기고 나머지는 삭제! */}
                                <option value="Y">활성 (Y)</option>
                                <option value="N">탈퇴 (N)</option>
                            
                            </select>
                            
                            <label>회원 권한</label>
                            <select name="userRole" value={editData.userRole} onChange={handleChange} className="input-field">
                                <option value="SUPPORTER">서포터</option>
                                <option value="MAKER">메이커</option>
                                
                            </select>

                            <label>가입일</label>
                            <input type="text" value={user.enrollDate} readOnly className="input-field read-only" />
                            
                            <label>누적 후원액</label>
                            <input type="text" value={`${user.accumFund ? user.accumFund.toLocaleString() : 0} 원`} readOnly className="input-field read-only" />
                        </div>
                    </div>
                    
                    <div className="modal-footer-actions">
                        <button className="btn-save" onClick={handleSave}>정보 수정 저장</button>
                        
                        {/* 상태 변경 버튼 */}
                        <button className="btn-action btn-warning" onClick={() => handleStatusAction('정지')}>
                            {user.userYn === 'S' ? '정지 해제' : '활동 정지'}
                        </button>
                        <button className="btn-action btn-danger" onClick={() => handleStatusAction('탈퇴')}>
                            강제 탈퇴
                        </button>
                        
                        <button className="btn-close-footer" onClick={onClose}>닫기</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ===================================================
// B. 메인 탭 컴포넌트
// ===================================================
const UserManagementTab = () => {
    // 1. 상태 관리
    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    // 검색 필터 상태
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    
    const [modalUser, setModalUser] = useState(null); 

    // 2. 데이터 불러오기 함수 (Service: getUserList)
    const fetchUsers = async () => {
        try {
            // 주의: 백엔드 포트 확인 (8080)
            const response = await axios.get('http://localhost:8001/foodding/api/admin/user/list', {
                params: {
                    page: page,
                    size: 10,
                    status: filterStatus,
                    keyword: searchTerm
                }
            });

            console.log("✅ 백엔드 응답 데이터:", response.data);

            // Service에서 put("list", list)로 담았으므로 response.data.list 사용
            const list = response.data.list || [];
            const pages = response.data.totalPages || 1;

            setUserList(list);
            setTotalPages(pages);

        } catch (error) {
            console.error("회원 목록 로딩 실패:", error);
            setUserList([]); // 에러 시 빈 배열
        }
    };

    // 3. 페이지나 필터 변경 시 자동 실행
    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, filterStatus]); // 검색어(searchTerm)는 버튼 클릭 시 실행하므로 제외

    // 검색 핸들러
    const handleSearch = () => {
        setPage(1); 
        fetchUsers();
    };
    
    // 엔터키 검색 지원
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="user-management-tab">
            <div className="header-flex">
                <h2 className="page-title">회원 정보 관리</h2> 
                
                <div className="search-group top-search">
                    <input 
                        type="text" 
                        placeholder="이름/ID/닉네임 검색" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="search-input"
                    />
                    <button className="btn-search" onClick={handleSearch}>검색</button>
                </div>
            </div>
            
            {/* 필터 영역 */}
            <div className="filter-area admin-card">
                <div className="filter-group">
                    <label>회원 상태:</label>
                    <select 
                        value={filterStatus} 
                        onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                        className="filter-select"
                    >
                        <option value="all">전체</option>
                        <option value="Y">활동중 (Y)</option>
                        <option value="N">탈퇴 (N)</option>
                    </select>
                </div>
            </div>

            {/* 테이블 영역 */}
            <div className="user-list-wrapper admin-card">
                <table className="user-table flickspot-style">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>ID</th>
                            <th>이름 (닉네임)</th>
                            <th>이메일</th>
                            <th>권한</th>
                            <th>상태</th>
                            <th>가입일</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList && userList.length > 0 ? (
                            userList.map((user) => (
                                <tr key={user.userNo} className={`user-row ${user.userYn === 'N' ? 'status-deleted' : ''}`}>
                                    {/* VO 필드명 그대로 사용 */}
                                    <td>{user.userNo}</td>
                                    <td>{user.userId}</td>
                                    
                                    {/* VO에 userName과 nickname 둘 다 있으므로 같이 표시 */}
                                    <td>{user.userName} <span className="sub-text">({user.nickname})</span></td>
                                    
                                    <td>{user.email}</td>
                                    <td>{formatRole(user.userRole)}</td>
                                    
                                    <td>
                                        <span className={`status-badge ${user.userYn}`}>
                                            {formatStatus(user.userYn)}
                                        </span>
                                    </td>
                                    <td>{user.enrollDate}</td>
                                    <td>
                                        <button 
                                            className="btn-detail-small" 
                                            onClick={(e) => { e.stopPropagation(); setModalUser(user); }}
                                        >
                                            상세/수정
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="no-data">데이터가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 */}
            <div className="pagination-area">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                    &lt; 이전
                </button>
                <span> {page} / {totalPages} </span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                    다음 &gt;
                </button>
            </div>
            
            {/* 상세 모달 */}
            <UserDetailModal 
                user={modalUser} 
                onClose={() => setModalUser(null)} 
                onRefresh={fetchUsers} 
            />
        </div>
    );
};

export default UserManagementTab;