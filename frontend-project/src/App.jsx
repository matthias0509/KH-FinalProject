import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProjectPage from './pages/CreateProjectPage';
import NoticePage from './pages/NoticePage';
import ImbakPage from './pages/ImbakPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './App.css';
import LoginPage from './pages/Login/LoginPage';
import CreateMember from './pages/Login/CreateMemberPage';
import ChangePage from './pages/ChangePage';
import MyPage from './pages/MyPage'

import MakerPage from './pages/MakerPage'

import FundingHistoryPage from './pages/supporter/FundingHistoryPage'
import FundingCancelPage from './pages/supporter/FundingCancelPage'
import FundingDetailPage from './pages/supporter/FundingDetailPage'
import LikeProjectPage from './pages/supporter/LikeProjectPage'
import FollowProjectPage from './pages/supporter/FollowProjectPage'
import ProfileEditPage from './pages/supporter/ProfileEditPage'
import QnAPage from './pages/supporter/QnAPage'

import ChatComponent from './pages/chat/ChatComponent';
import PaymentComponent from './pages/payment/PaymentComponent'
import ProjectPage from './pages/maker/ProjectPage';
import SettlementPage from './pages/maker/SettlementPage';
import ChatHistoryPage from './pages/maker/ChatHistoryPage';
import AdminPage from './pages/admin/AdminPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import DashBoardPage from './pages/admin/DashBoardPage';



export default function App() {

  // ★ 여기서 유저 정보를 "딱 한 곳"에서 관리합니다 (Single Source of Truth)
  const [userInfo, setUserInfo] = useState({
    name: '푸딩러버',
    profileImg: '🍮',
    role: 'maker', // 이 값을 'supporter'로 바꾸면 양쪽 다 서포터 모드로 변함!
    stats: {
        fundingCount: 12,
        followingCount: 5,
        likedCount: 8
    }
  });

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateProjectPage />} />
      <Route path="/notice" element={<NoticePage />}/>
      <Route path='/imbak' element={<ImbakPage/> }/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/createmember" element={<CreateMember />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/projects/premium-macarons" element={<ProductDetailPage />} />
      {/* path="/projects/:slug 예정 각 상품별 상세페이지 */}
      <Route path='/change' element={<ChangePage/>}/>

      {/* supper용 사이드바*/}
      <Route path="/mypage" element={<MyPage userInfo={userInfo} />} />
      <Route path="/maker" element={<MakerPage userInfo={userInfo} />} />
      <Route path="/profile" element={<ProfileEditPage />} />
      <Route path="/history" element={<FundingHistoryPage />} />
      <Route path="/cancel" element={<FundingCancelPage />} />
      <Route path="/detail" element={<FundingDetailPage />} />
      <Route path="/like" element={<LikeProjectPage />} />
      <Route path="/follow" element={<FollowProjectPage />} />
      <Route path="/chat" element={<ChatComponent />} />
      <Route path="/qna" element={<QnAPage />} />

      {/* maker용 사이드바*/} 
      <Route path="/maker/chat-history" element={<ChatHistoryPage userInfo={userInfo}/>} />
      <Route path="/maker/project" element={<ProjectPage userInfo={userInfo}/>} />
      <Route path="/maker/settlement" element={<SettlementPage userInfo={userInfo}/>} />

      {/* 관리자 전용 */}
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/adminlogin" element={<AdminLoginPage />} />
      <Route path="/usermanagement" element={<UserManagementPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />



      <Route path='/payment' element={<PaymentComponent/>}/>
    </Routes>
  );
}