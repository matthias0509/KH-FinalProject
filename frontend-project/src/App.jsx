import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProjectPage from './pages/CreateProjectPage';
import NoticePage from './pages/NoticePage';
import ImbakPage from './pages/ImbakPage';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreateProjectPage />} />
      <Route path="/notice" element={<NoticePage />}/>
      <Route path='/imbak' element={<ImbakPage/> }/>
    </Routes>
  );
}
