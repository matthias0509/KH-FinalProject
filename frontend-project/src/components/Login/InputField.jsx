import '../../pages/Login/Login.css';

export default function InputField({ label, type = 'text', id, value, onChange, placeholder, error }) {
    return (
        <div className="input-group">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}