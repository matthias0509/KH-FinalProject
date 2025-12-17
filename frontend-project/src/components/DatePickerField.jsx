import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

const formatISODate = (date) => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseDateString = (value) => {
  if (!value) return undefined;
  const parts = value.split('-');
  if (parts.length !== 3) return undefined;
  const [year, month, day] = parts.map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
};

const CalendarIcon = () => (
  <svg
    className="date-picker-field__icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M7 2v2H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-2V2h-2v2H9V2H7Zm12 6H5v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1Zm-9 3h2v2H10Zm4 0h2v2h-2ZM7 5h10V4h2v2h2v2H3V6h2V4h2Z"
      fill="currentColor"
    />
  </svg>
);

export default function DatePickerField({
  id,
  name,
  label,
  value,
  onChange,
  helperText,
  min,
  max,
  required,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const selectedDate = parseDateString(value);
  const minDate = parseDateString(min);
  const maxDate = parseDateString(max);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current || containerRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const disabledDays = {};
  if (minDate) {
    disabledDays.before = minDate;
  }
  if (maxDate) {
    disabledDays.after = maxDate;
  }

  const handleSelect = (day) => {
    if (!day) return;
    const iso = formatISODate(day);
    onChange({ target: { name, value: iso } });
    setOpen(false);
  };

  const displayText = selectedDate ? formatISODate(selectedDate) : '';

  return (
    <div className="date-picker-field" ref={containerRef}>
      <label className="date-picker-field__label" htmlFor={id}>
        {label}
      </label>
      <button
        type="button"
        id={id}
        name={name}
        className="date-picker-field__control"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        disabled={disabled}
      >
        <span className="date-picker-field__value">
          {displayText || '날짜 선택'}
        </span>
        <CalendarIcon />
      </button>
      {helperText && <span className="date-picker-field__helper">{helperText}</span>}
      {open && !disabled && (
        <div className="date-picker-field__popover">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={disabledDays}
            defaultMonth={selectedDate || minDate || new Date()}
            locale={ko}
            weekStartsOn={1}
            formatters={{
              formatCaption: (month) => `${month.getFullYear()}년 ${month.getMonth() + 1}월`,
            }}
          />
          <div className="date-picker-field__actions">
            <button type="button" onClick={() => onChange({ target: { name, value: '' } })}>
              초기화
            </button>
            <button type="button" onClick={() => setOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

DatePickerField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

DatePickerField.defaultProps = {
  value: '',
  helperText: undefined,
  min: undefined,
  max: undefined,
  required: false,
  disabled: false,
};
