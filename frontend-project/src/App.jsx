import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProjectPage from './pages/CreateProjectPage';
import NoticePage from './pages/NoticePage';
import ImbakPage from './pages/ImbakPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import MyPage from './pages/MyPage';
import MakerPage from './pages/MakerPage';
import ProfileEditPage from './pages/ProfileEditPage';

import './App.css';

import FundingHistoryPage from './pages/supporter/FundingHistoryPage';
import FundingCancelPage from './pages/supporter/FundingCancelPage';
import FundingDetailPage from './pages/supporter/FundingDetailPage';
import LikeProjectsPage from './pages/supporter/LikeProjectPage';
import FollowProjectsPage from './pages/supporter/FollowProjectPage';
import ChatHistoryPage from './pages/supporter/ChatHistoryPage';
import QnAPage from './pages/supporter/QnAPage';

import LoginPage from './components/Login/LoginPage';

import Paymentcompotnet from './pages/payment/PaymentComponent';
import CreateMember from './components/Login/CreateMember';
import ChangePage from './pages/ChangePage';
import ChatComponent from './pages/chat/ChatComponent';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateProjectPage />} />
      <Route path="/notice" element={<NoticePage />}/>
      <Route path='/imbak' element={<ImbakPage/> }/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/createmember" element={<CreateMember />} />
      <Route path="/search" element={<SearchPage />} />

      <Route path="/mypage" element={<MyPage />} />
      <Route path="/maker" element={<MakerPage />} />
      <Route path="/profile" element={<ProfileEditPage />} />
      <Route path="/history" element={<FundingHistoryPage />} />
      <Route path="/cancel" element={<FundingCancelPage />} />
      <Route path="/detail" element={<FundingDetailPage />} />
      <Route path="/like" element={<LikeProjectsPage />} />
      <Route path="/follow" element={<FollowProjectsPage />} />
      <Route path="/chat" element={<ChatHistoryPage />} />
      <Route path="/qna" element={<QnAPage />} />

      <Route path="/projects/premium-macarons" element={<ProductDetailPage />} />
      <Route path="/payment" element={<Paymentcompotnet />} />
      {/* path="/projects/:slug 예정 각 상품별 상세페이지 */}
      <Route path='/change' element={<ChangePage/>}/>
      <Route path='/chat' element={<ChatComponent />}/>
    </Routes>
  );
}
