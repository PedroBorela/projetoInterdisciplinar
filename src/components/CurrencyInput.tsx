import { forwardRef, useEffect, useState } from 'react';

interface CurrencyInputProps {
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, placeholder = '0,00', className, autoFocus }, ref) => {
    const [display, setDisplay] = useState('');

    useEffect(() => {
      if (value && value > 0) {
        setDisplay(value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      }
    }, []);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const raw = e.target.value.replace(/\D/g, '');
      if (!raw) {
        setDisplay('');
        onChange?.(0);
        return;
      }
      const number = parseInt(raw, 10) / 100;
      setDisplay(number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      onChange?.(number);
    }

    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={display}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={className}
      />
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
