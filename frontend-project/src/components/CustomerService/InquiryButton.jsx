import '../../pages/CustomerService/CSStyle.css';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

export default function InquiryButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/cs/inquiry'); 
    };

    return (
        <button 
            onClick={handleClick}
            className="inquiry-button"
        >
            <MessageSquare size={18} />
            1:1 문의하기
        </button>
    );
}
