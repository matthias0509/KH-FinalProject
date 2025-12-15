import '../../pages/CustomerService/CSStyle.css';

export default function CustomerServiceLayout({ title, children }) {
    return (
        <div className="cs-container">
            <h1 className="cs-title">{title}</h1>
            <div className="cs-content">
                {children}
            </div>
        </div>
    );
}