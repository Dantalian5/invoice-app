import React, { forwardRef, useState, useRef } from "react";
import { svgCalendar, svgArrowLeft } from "@/components/svg/SvgIcons";
import { daysOfWeek, formatDate } from "@/lib/dateFns";

interface DatePickerProps {
  value: Date;
  label: string;
  className?: string;
  isError?: boolean;
  errorMessage?: string;
  onChange: (date: Date) => void;
}

function DatePicker(
  {
    value,
    label,
    className,
    isError = false,
    errorMessage,
    onChange,
    ...props
  }: DatePickerProps,
  ref: React.Ref<HTMLButtonElement>,
) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const labelRef = useRef<HTMLDivElement | null>(null);

  const toggleCalendar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsCalendarOpen((prev) => !prev);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (labelRef.current && !labelRef.current.contains(e.target as Node)) {
      setIsCalendarOpen(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleDateClick = (date: any) => {
    onChange(date);
    setIsCalendarOpen(false); // Close the calendar
  };

  return (
    <div
      ref={labelRef}
      className={`${className} ${isError ? "text-danger" : "text-neutral-400"} relative z-0 text-sm font-medium tracking-normal`}
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
        {formatDate(value)}
        {svgCalendar}
      </button>
      {isCalendarOpen && (
        <div className="border-gray-300 transition-theme absolute right-0 top-sm z-10 w-full max-w-80 rounded-lg bg-white shadow-picker dark:bg-secondary-light">
          <Calendar date={value} onDateClick={handleDateClick} />
        </div>
      )}
    </div>
  );
}
export default forwardRef(DatePicker);

const Calendar = ({ onDateClick, date }: any) => {
  const [currentDate, setCurrentDate] = useState(date);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDay = firstDayOfMonth.getDay();
    const endDay = lastDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();
    const days = [];
    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    for (let i = startDay; i > 0; i--) {
      const day = lastDateOfPrevMonth - i + 1;
      days.push(
        <div key={`prev-${day}`} className="pointer-events-none opacity-10">
          {day}
        </div>,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(
        <button
          key={`current-${day}`}
          onClick={() => onDateClick(date)}
          type="button"
          className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {day}
        </button>,
      );
    }

    for (let i = 1; i < 7 - endDay; i++) {
      days.push(
        <div key={`next-${i}`} className="pointer-events-none opacity-10">
          {i}
        </div>,
      );
    }

    return days;
  };

  return (
    <div className="w-full p-6">
      <div className="mb-8 flex items-center justify-between">
        <button type="button" onClick={handlePrevMonth} className="w-fit p-2">
          {svgArrowLeft}
        </button>
        <p className="text-base font-bold leading-none tracking-tight text-black-light dark:text-neutral-200">
          {currentDate.toLocaleString("default", { month: "short" })}{" "}
          {currentDate.getFullYear()}
        </p>
        <button
          type="button"
          onClick={handleNextMonth}
          className="w-fit rotate-180 p-2"
        >
          {svgArrowLeft}
        </button>
      </div>
      <div className="grid w-full grid-cols-7 gap-x-2 gap-y-4 text-center text-base font-bold leading-none tracking-tight text-black-light dark:text-neutral-200">
        {daysOfWeek.map((day) => (
          <span key={day} className="block text-sm font-medium">
            {day}
          </span>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
};
