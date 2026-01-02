import React, { useState } from 'react';

// 💡 각 페이지 컴포넌트 Import
import UserManagementPage from './UserManagementPage';
import ProjectApprovalPage from './ProjectApprovalPage';
import DashBoardPage from './DashBoardPage';
import PuddingManagementPage from './PuddingManagementPage';
import InquiryManagement from './InquiryManagement';
import SellerApplicationAdmin from './SellerApplicationAdmin';
import FAQManagementPage from './FAQManagementPage';
import FundingManagementPage from './FundingManagementPage';

import '../../styles/AdminPage.css'; // 관리자 전용 CSS
import '../../styles/MyPageLayout.css'; // 공통 레이아웃

// ===================================================
// A. 관리자 사이드바 컴포넌트
// ===================================================
const AdminSidebar = ({ activeMenu, setActiveMenu }) => {
    
    const adminMenus = [
        { id: 'dashboard', name: '📊 대시보드 (통계)', category: '주요 기능' },
        { id: 'proj_manage', name: '📝 프로젝트 승인/반려', category: '운영 관리' },
        { id: 'seller_apply', name: '🧾 판매자 전환 관리', category: '' },
        { id: 'pudding_manage', name: '🍮 푸슐랭(프로젝트) 관리', category: '' },
        { id: 'refund_manage', name: '💰 후원/환불 관리', category: '' },
        { id: 'user_manage', name: '👤 회원 정보 조회/관리', category: '회원 관리' },
        { id: 'faq_manage', name: '❓ FAQ 관리', category: '문의 관리' },
        { id: 'inquiry_manage', name: '💬 문의 관리 (Q&A/1:1)', category: '' },
    ];

    const groupedMenus = adminMenus.reduce((acc, menu) => {
        const category = menu.category || (acc.length > 0 ? acc[acc.length - 1].category : '기타');
        let existingGroup = acc.find(item => item.category === category);
        
        if (!existingGroup) {
            existingGroup = { category, items: [] };
            acc.push(existingGroup);
        }
        existingGroup.items.push(menu);
        return acc;
    }, []);

    return (
        <aside className="admin-sidebar">
            <h3 className="admin-title">관리자 콘솔</h3>
            <div className="menu-list">
                {groupedMenus.map(group => (
                    <div key={group.category} className="menu-group">
                        {group.category !== '기타' && <div className="menu-category">{group.category}</div>}
                        <ul>
                            {group.items.map(menu => (
                                <li 
                                    key={menu.id} 
                                    className={activeMenu === menu.id ? 'active-menu' : ''}
                                    onClick={() => setActiveMenu(menu.id)}
                                >
                                    <a href="#!">{menu.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
};

// ===================================================
// B. 메인 콘텐츠 뷰어 (ActiveMenu에 따라 내용 변경)
// ===================================================
const AdminContent = ({ activeMenu }) => {
    // 모든 콘텐츠를 <main> 태그 하나로 감싸서 일관성 있게 반환합니다.
    return (
        <main className="main-content admin-main-content">
            {activeMenu === 'dashboard' && <DashBoardPage />}
            {activeMenu === 'proj_manage' && <ProjectApprovalPage />}
            {activeMenu === 'seller_apply' && <SellerApplicationAdmin />}
            {activeMenu === 'pudding_manage' && <PuddingManagementPage />}
            {activeMenu === 'refund_manage' && <FundingManagementPage />}
            {activeMenu === 'user_manage' && <UserManagementPage />}
            {activeMenu === 'faq_manage' && <FAQManagementPage />}
            {activeMenu === 'inquiry_manage' && <InquiryManagement />}
        </main>
    );
};

// ===================================================
// C. 메인 페이지 컴포넌트 (AdminPage)
// ===================================================
const AdminPage = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard');

    return (
        <div className="admin-full-page-wrapper"> 
            <div className="mypage-container admin-container no-header"> 
                {/* --- 왼쪽 사이드바 --- */}
                <AdminSidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

                {/* --- 오른쪽 메인 콘텐츠 --- */}
                <AdminContent activeMenu={activeMenu} />
            </div>
        </div>
    );
};

export default AdminPage;