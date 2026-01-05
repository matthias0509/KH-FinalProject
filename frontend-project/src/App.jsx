import { useState, useEffect } from 'react';
import { Routes, Route, useLocation ,Navigate} from 'react-router-dom';
import './App.css';

// 김동규
import HomePage from './pages/HomePage';
import CreateProjectLandingPage from './pages/CreateProjectPage/CreateProjectLandingPage';
import CreateProjectPage from './pages/CreateProjectPage/CreateProjectPage';
import CreateProjectSuccessPage from './pages/CreateProjectPage/CreateProjectSuccessPage';
import ImbakPage from './pages/ImbakPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/DetailPage/ProductDetailPage';
import ChangePage from './pages/ChangePage';

// 박성진
import LoginPage from './pages/Login/LoginPage';
import CreateMember from './pages/Login/CreateMemberPage';
import NoticePage from './pages/NoticePage';
import FindIdPage from './pages/Login/FindIdPage';
import ResetPasswordPage from './pages/Login/ResetPasswordPage';
import FAQPage from './pages/CustomerService/FAQPage';
import NoticeDetailPage from './pages/CustomerService/NoticeDetailPage';
import InquiryPage from './pages/CustomerService/InquiryPage';
import InquiryHistoryPage from './pages/CustomerService/InquiryHistoryPage';
import NoticeWritePage from './pages/CustomerService/NoticeWritePage';
import LogoutPage from './pages/Login/logoutPage';
import NoticeEditPage from './pages/CustomerService/NoticeEditPage';

// 박주현
import MakerPage from './pages/MakerPage'
import MyPage from './pages/MyPage'
import FundingHistoryPage from './pages/supporter/FundingHistoryPage'
import FundingCancelPage from './pages/supporter/FundingCancelPage'
import FundingDetailPage from './pages/supporter/FundingDetailPage'
import LikeProjectPage from './pages/supporter/LikeProjectPage'
import FollowProjectPage from './pages/supporter/FollowProjectPage'
import ProfileEditPage from './pages/supporter/ProfileEditPage'
import QnAPage from './pages/supporter/QnAPage'
import ProjectApprovalPage from './pages/admin/ProjectApprovalPage'; // 관리자 페이지

// 강호형
import ChatComponent from './pages/chat/ChatComponent';
import PaymentComponent from './pages/payment/PaymentComponent'
import PaymentSuccess from './pages/payment/PaymentSuccess';
import PaymentFail from './pages/payment/PaymentFail';
import ProjectPage from './pages/maker/ProjectPage';
import SettlementPage from './pages/maker/SettlementPage';
import ChatHistoryPage from './pages/maker/ChatHistoryPage';
import AdminPage from './pages/admin/AdminPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import DashBoardPage from './pages/admin/DashBoardPage';
import ChatListPage from './pages/chat/ChatListPage';
import FAQManagementPage from './pages/admin/FAQManagementPage';
import InquiryManagement from './pages/admin/InquiryManagement';

// ==========================================
// 🔒 1. 로그인한 유저만 접근 가능 (마이페이지용)
// ==========================================
const PrivateRoute = ({ children }) => {
  // 로컬 또는 세션 스토리지 확인
  const storedUser = localStorage.getItem('user') || sessionStorage.getItem('loginUser');

  if (!storedUser) {
    alert("로그인이 필요한 서비스입니다.");

    return <Navigate to="/login" replace />;
  }

  return children;
};

// ==========================================
// 🏭 2. 메이커 권한이 있는 유저만 접근 가능 (메이커 페이지용)
// ==========================================
const MakerRoute = ({ children }) => {
  const storedUser = localStorage.getItem('user') || sessionStorage.getItem('loginUser');

  if (!storedUser) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" replace />;
  }

  const parsedUser = JSON.parse(storedUser);
  // 데이터 구조에 따라 userRole 위치 확인 (보통 user.userRole 또는 user.user.userRole)
  const role = parsedUser.userRole || parsedUser.user?.userRole;

  // MAKER가 아니면 (SUPPORTER나 USER라면) 튕겨냄
  if (role !== 'MAKER') {
    alert("메이커 권한이 없습니다. 판매자 전환 신청을 해주세요.");
    return <Navigate to="/change" replace />; // 또는 메인('/')으로 이동
  }

  return children;
};


// ==========================================
// 🛡️ 관리자 전용 보호 라우트 컴포넌트
// ==========================================
const AdminRoute = ({ children }) => {
  // sessionStorage에서 로그인 정보 확인 (관리자 로그인은 보안상 sessionStorage 권장)
  const storedUser = sessionStorage.getItem('loginUser') || localStorage.getItem('user');
  
  if (!storedUser) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/adminlogin" replace />;
  }

  const parsedUser = JSON.parse(storedUser);
  // 백엔드 응답 구조에 따라 parsedUser.user.userRole 또는 parsedUser.userRole 확인
  const role = parsedUser.user?.userRole || parsedUser.userRole;

  if (role !== 'ADMIN') {
    alert("관리자 권한이 없습니다.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 로컬 스토리지 또는 세션 스토리지에서 유저 정보 복구
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('loginUser');
    if (storedUser) {
      try {
        setUserInfo(JSON.parse(storedUser));
      } catch (e) {
        console.error("사용자 정보 파싱 오류", e);
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 3. 페이지 이동 시 스크롤 최상단으로 이동 (UX 개선)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


 return (
    <Routes>
      {/* --- 공통 및 일반 사용자 경로 --- */}
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateProjectLandingPage />} />
      {/* ⚠️ 프로젝트 생성도 로그인이 필요하다면 PrivateRoute 적용 추천 */}
      <Route path="/create/new" element={<PrivateRoute><CreateProjectPage /></PrivateRoute>} />
      <Route path="/create/success" element={<CreateProjectSuccessPage />} />
      <Route path='/imbak' element={<ImbakPage/> }/>
      <Route path="/search" element={<SearchPage />} />
      <Route path="/projects/:ProjectNo" element={<ProductDetailPage />} />
      <Route path='/change' element={<PrivateRoute><ChangePage/></PrivateRoute>}/> {/* 전환 신청도 로그인 필요 */}
      
      <Route path="/notice" element={<NoticePage />}/>  
      <Route path="/login" element={<LoginPage />} />
      <Route path="/createmember" element={<CreateMember />} />
      <Route path="/findid" element={<FindIdPage />} />
      <Route path="/resetpassword" element={<ResetPasswordPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/notice/write" element={<AdminRoute><NoticeWritePage /></AdminRoute>} /> {/* 공지 작성은 관리자만 */}
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/notice/:noticeNo" element={<NoticeDetailPage />} />
      <Route path="/notice/edit/:noticeNo" element={<AdminRoute><NoticeEditPage /></AdminRoute>} /> {/* 공지 수정도 관리자만 */}

      {/* ======================================================= */}
      {/* 🔒 [마이페이지] 로그인 안 하면 못 들어감 (PrivateRoute 적용) */}
      {/* ======================================================= */}
      <Route path="/mypage" element={<PrivateRoute><MyPage userInfo={userInfo} /></PrivateRoute>} />
      <Route path="/mypage/profile" element={<PrivateRoute><ProfileEditPage userInfo={userInfo} /></PrivateRoute>} />
      <Route path="/mypage/history" element={<PrivateRoute><FundingHistoryPage userInfo={userInfo} /></PrivateRoute>} />
      <Route path="/mypage/cancel" element={<PrivateRoute><FundingCancelPage userInfo={userInfo} /></PrivateRoute>} />
      <Route path="/mypage/history/:fundingNo" element={<PrivateRoute><FundingDetailPage userInfo={userInfo} /></PrivateRoute>} />
      <Route path="/mypage/like" element={<PrivateRoute><LikeProjectPage userInfo={userInfo} /></PrivateRoute>} />
      <Route path="/mypage/follow" element={<PrivateRoute><FollowProjectPage userInfo={userInfo} /></PrivateRoute>} />
      <Route path="/mypage/qna" element={<PrivateRoute><QnAPage userInfo={userInfo} /></PrivateRoute>} />
      <Route path="/mypage/chat" element={<PrivateRoute><ChatListPage userInfo={userInfo} isMaker={false}/></PrivateRoute>} />
      <Route path="/inquiry" element={<PrivateRoute><InquiryPage /></PrivateRoute>} />
      <Route path="/inquiries" element={<PrivateRoute><InquiryHistoryPage /></PrivateRoute>} />

      {/* ======================================================= */}
      {/* 🏭 [메이커 페이지] 서포터는 못 들어감 (MakerRoute 적용) */}
      {/* ======================================================= */}
      <Route path="/maker" element={<MakerRoute><MakerPage userInfo={userInfo} /></MakerRoute>} />
      <Route path="/maker/chat-history" element={<MakerRoute><ChatHistoryPage userInfo={userInfo}/></MakerRoute>} />
      <Route path="/maker/project" element={<MakerRoute><ProjectPage userInfo={userInfo}/></MakerRoute>} />
      <Route path="/maker/settlement" element={<MakerRoute><SettlementPage userInfo={userInfo}/></MakerRoute>} />
      <Route path="/maker/chat" element={<MakerRoute><ChatListPage userInfo={userInfo} isMaker={true}/></MakerRoute>} />

      {/* ======================================================= */}
      {/* 👑 [관리자 페이지] 관리자만 접근 (AdminRoute 적용) */}
      {/* ======================================================= */}
      <Route path="/adminlogin" element={<AdminLoginPage />} />
      
      <Route path="/adminpage" element={<AdminRoute><AdminPage /></AdminRoute>} />
      <Route path="/usermanagement" element={<AdminRoute><UserManagementPage /></AdminRoute>} />
      <Route path="/dashboard" element={<AdminRoute><DashBoardPage /></AdminRoute>} />
      <Route path="/projectapproval" element={<AdminRoute><ProjectApprovalPage /></AdminRoute>} />
      <Route path="/faqmanagement" element={<AdminRoute><FAQManagementPage /></AdminRoute>} />
      <Route path="/inquirymanagement" element={<AdminRoute><InquiryManagement /></AdminRoute>} />

      {/* 강호형 - 결제 관련 */}
      <Route path='/payment' element={<PrivateRoute><PaymentComponent/></PrivateRoute>}/>
      <Route path="/payment/success" element={<PaymentSuccess />}/>
      <Route path="/payment/fail" element={<PaymentFail />}/>

      {/* 채팅 관련 */}
      <Route path="/chat" element={<PrivateRoute><ChatComponent /></PrivateRoute>} />
    
    </Routes>
  );
}