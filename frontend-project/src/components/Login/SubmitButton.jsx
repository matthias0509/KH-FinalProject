import '../../pages/Login/Login.css';


export default function SubmitButton({ children, isLoading = false, disabled = false }) {
    return (
        <button 
            type="submit" 
            className="login-button" 
            disabled={disabled || isLoading}
        >
            {isLoading ? '처리 중...' : children}
        </button>
    );
}