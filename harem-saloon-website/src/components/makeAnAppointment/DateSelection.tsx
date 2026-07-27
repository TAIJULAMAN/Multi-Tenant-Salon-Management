"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

// Helper to generate the horizontal dates
const generateUpcomingDays = (numDays: number) => {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < numDays; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

const upcomingDays = generateUpcomingDays(30);
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function DateSelection() {
  const [selectedDate, setSelectedDate] = useState<Date>(upcomingDays[0]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // State for the calendar popup
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date(upcomingDays[0]));
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240; // Approx 3 items
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getDate() === d2.getDate() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getFullYear() === d2.getFullYear();
  };

  // Calendar logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay(); // 0 is Sunday
  
  const handlePrevMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const renderCalendarDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isSelected = isSameDay(date, selectedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isPast = date < today;

      days.push(
        <button
          key={i}
          disabled={isPast}
          onClick={() => {
            setSelectedDate(date);
            setIsCalendarOpen(false);
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-manrope transition-colors ${
            isSelected
              ? "bg-[#635BFF] text-white font-bold shadow-sm shadow-[#635BFF]/30"
              : isPast
              ? "text-gray-300 cursor-not-allowed"
              : "text-[#1E293B] hover:bg-[#EEEDFF] hover:text-[#635BFF]"
          }`}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className="mb-10 relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#1E293B] font-manrope">Select a Date</h3>
        <div className="relative">
          <button 
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
              isCalendarOpen 
                ? "border-[#635BFF] text-[#635BFF] bg-[#EEEDFF]" 
                : "border-gray-200 text-gray-500 hover:border-[#635BFF] hover:text-[#635BFF] bg-white"
            }`}
          >
            <Calendar className="w-5 h-5" />
          </button>
          
          {isCalendarOpen && (
            <div className="absolute right-0 top-12 z-50 bg-white border border-gray-100 rounded-2xl p-4 shadow-xl shadow-gray-200/50 w-[280px]">
              <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-[#635BFF] transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-bold text-[#1E293B] font-manrope text-sm">
                  {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                </span>
                <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-[#635BFF] transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-xs font-bold text-gray-400 font-manrope">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays()}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex items-center">
        <button 
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-0 z-10 -ml-4 w-8 h-8 rounded-full bg-white border border-gray-100 items-center justify-center text-gray-400 shadow-sm hover:text-[#635BFF] hover:border-[#635BFF]"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div 
          ref={scrollContainerRef}
          className="flex w-full gap-3 md:gap-4 overflow-x-auto px-1 md:px-4 py-2 scrollbar-hide scroll-smooth"
        >
          {upcomingDays.map((date, idx) => {
            const isSelected = isSameDay(date, selectedDate);
            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 flex flex-col items-center justify-center w-[72px] h-[88px] md:w-20 md:h-24 rounded-2xl border transition-all ${
                  isSelected
                    ? "border-[#635BFF] bg-[#EEEDFF] shadow-sm shadow-[#635BFF]/10"
                    : "border-gray-100 bg-white hover:border-[#635BFF]/50"
                }`}
              >
                <span
                  className={`text-lg md:text-xl font-bold font-manrope mb-0.5 md:mb-1 ${
                    isSelected ? "text-[#635BFF]" : "text-[#1E293B]"
                  }`}
                >
                  {date.getDate()}
                </span>
                <span
                  className={`text-xs md:text-sm font-manrope ${
                    isSelected ? "text-[#635BFF]" : "text-gray-500"
                  }`}
                >
                  {monthNames[date.getMonth()]}
                </span>
              </button>
            );
          })}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-0 z-10 -mr-4 w-8 h-8 rounded-full bg-white border border-gray-100 items-center justify-center text-gray-400 shadow-sm hover:text-[#635BFF] hover:border-[#635BFF]"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
