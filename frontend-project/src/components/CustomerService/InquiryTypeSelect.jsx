export default function InquiryTypeSelect({ value, onChange }) {
    const options = [
        { label: "선택하세요", value: "" },
        { label: "결제/환불 문의", value: "PAYMENT" },
        { label: "상품/프로젝트/서비스 문의", value: "PRODUCT" },
        { label: "시스템 오류 신고", value: "ERROR" },
        { label: "계정/회원 정보 문의", value: "ACCOUNT" },
        { label: "기타 문의", value: "OTHER" },
    ];

    return (
        <div className="input-field-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="inquiryType" className="select-label">문의 유형</label>
            <select
                id="inquiryType"
                className="select-field"
                value={value}
                onChange={onChange}
                required
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}