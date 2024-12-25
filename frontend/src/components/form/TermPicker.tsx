import React, { forwardRef, useState, useRef } from "react";
import { svgArrowDown, svgCheck } from "@/components/svg/SvgIcons";

interface TermPickerProps {
  value: number;
  label: string;
  className?: string;
  isError?: boolean;
  errorMessage?: string;
  onChange: (option: number) => void;
}

function TermPicker(
  {
    value,
    label,
    className,
    isError = false,
    errorMessage,
    onChange,
    ...props
  }: TermPickerProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const labelRef = useRef<HTMLDivElement | null>(null);

  const toggleCalendar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsSelectorOpen((prev) => !prev);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (labelRef.current && !labelRef.current.contains(e.target as Node)) {
      setIsSelectorOpen(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleOptionClick = (option: number) => {
    onChange(option);
    setIsSelectorOpen(false);
  };

  return (
    <div
      ref={labelRef}
      className={`${className} ${isError ? "text-danger" : "text-neutral-400"} relative text-sm font-medium tracking-normal`}
    >
      <span className="flex w-full items-center justify-between">
        {label}
        {isError && <span role="alert">{errorMessage}</span>}
      </span>
      <button
        ref={ref}
        type="button"
        className={`${isError ? "border-danger" : "border-neutral-200 focus:border-primary dark:border-secondary-light"} mt-2 flex w-full items-center justify-between rounded-[4px] border bg-white bg-none px-5 py-4 text-base font-bold leading-none tracking-tight text-black-light focus:outline-none dark:bg-secondary dark:text-white`}
        {...props}
        onClick={toggleCalendar}
        aria-label="Open Calendar and select invoice date"
      >
        Next {value} Days
        <span
          className={`${isSelectorOpen && "rotate-180"} text-primary transition-transform`}
        >
          {svgArrowDown}
        </span>
      </button>
      {isSelectorOpen && (
        <div className="border-gray-300 transition-theme absolute right-0 top-sm z-10 w-full max-w-80 overflow-hidden rounded-lg bg-white shadow-picker dark:bg-secondary-light">
          <SelectOptions option={value} onOptionClick={handleOptionClick} />
        </div>
      )}
    </div>
  );
}
export default forwardRef(TermPicker);

interface SelectOptionsProps {
  option: number;
  onOptionClick: (option: number) => void;
}
const SelectOptions = ({ onOptionClick, option }: SelectOptionsProps) => {
  return (
    <ul className="w-full">
      {[1, 7, 14, 30].map((value) => (
        <li
          key={value}
          className="w-full border-b border-b-neutral-200 last:border-b-0 dark:border-b-secondary"
        >
          <button
            onClick={() => onOptionClick(value)}
            type="button"
            className="flex w-full items-center justify-between px-6 py-4 text-base font-bold leading-none tracking-tight text-black-light hover:text-primary dark:text-neutral-200"
          >
            Next {value} Days
            {option === value && svgCheck}
          </button>
        </li>
      ))}
    </ul>
  );
};
