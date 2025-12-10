import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProjectPage from './pages/CreateProjectPage';
import NoticePage from './pages/NoticePage';
import ImbakPage from './pages/ImbakPage';
import SearchPage from './pages/SearchPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './App.css';
import LoginPage from './components/Login/LoginPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateProjectPage />} />
      <Route path="/notice" element={<NoticePage />}/>
      <Route path='/imbak' element={<ImbakPage/> }/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/projects/premium-macarons" element={<ProductDetailPage />} />
      {/* path="/projects/:slug 예정 각 상품별 상세페이지 */}
    </Routes>
  );
}
