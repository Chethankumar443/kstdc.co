import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface CustomSelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const CustomSelect: React.FC<Props> = ({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  className = '',
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-900 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all text-left"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 min-w-0 truncate">
          {icon && <span className="shrink-0 text-slate-500">{icon}</span>}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-900' : ''
          }`}
        />
      </button>

      {/* Custom Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-2xl p-1.5 z-50 animate-fade-in max-h-64 overflow-y-auto">
          <ul role="listbox" className="space-y-0.5">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <div className="min-w-0 truncate">
                    <span className="truncate block">{opt.label}</span>
                    {opt.sublabel && (
                      <span
                        className={`text-[11px] font-normal truncate block ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {opt.sublabel}
                      </span>
                    )}
                  </div>
                  {isSelected && <Check className="w-4 h-4 shrink-0 ml-2 text-white" />}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
