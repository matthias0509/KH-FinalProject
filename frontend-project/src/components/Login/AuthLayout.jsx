import '../../pages/Login/Login.css';

export default function AuthLayout({title, children}) {
    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">{title}</h2>
                {children}
            </div>
        </div>
    )
}