import '../../pages/CustomerService/CSStyle.css';
import { useNavigate } from 'react-router-dom';

export default function InquiryButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/inquiries'); 
    };

    return (
        <button 
            onClick={handleClick}
            className="inquiry-button"
        >
            1:1 문의내역
        </button>
    );
}