import '../../pages/Login/Login.css';

export default function InputField({ label, type = 'text', id, value, onChange, onBlur, placeholder, error, name, readOnly, ...props }) {
    return (
        <div className="input-group">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                readOnly={readOnly}
                required
                {...props}
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}