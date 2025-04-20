"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  onClose: () => void;
}

export default function DateRangePicker({ dateRange, onDateRangeChange, onClose }: DateRangePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4)); // May 2025
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selectingStart, setSelectingStart] = useState(!dateRange.from);
  
  // Function to get month name
  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  // Function to get year
  const getYear = (date: Date) => {
    return date.getFullYear();
  };
  
  // Function to get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Function to get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Function to navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  // Function to navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  // Function to check if a date is selected
  const isDateSelected = (date: Date) => {
    if (!dateRange.from && !dateRange.to) return false;
    
    if (dateRange.from && dateRange.to) {
      return (
        date.getTime() === dateRange.from.getTime() ||
        date.getTime() === dateRange.to.getTime() ||
        (date > dateRange.from && date < dateRange.to)
      );
    }
    
    return dateRange.from ? date.getTime() === dateRange.from.getTime() : false;
  };
  
  // Function to check if a date is the start date
  const isStartDate = (date: Date) => {
    return dateRange.from && date.getTime() === dateRange.from.getTime();
  };
  
  // Function to check if a date is the end date
  const isEndDate = (date: Date) => {
    return dateRange.to && date.getTime() === dateRange.to.getTime();
  };
  
  // Function to check if a date is in the hover range
  const isInHoverRange = (date: Date) => {
    if (!dateRange.from || !hoverDate || selectingStart) return false;
    
    return date > dateRange.from && date <= hoverDate;
  };
  
  // Function to handle date click
  const handleDateClick = (date: Date) => {
    if (selectingStart) {
      onDateRangeChange({
        from: date,
        to: undefined
      });
      setSelectingStart(false);
    } else {
      // If clicked date is before start date, swap them
      if (dateRange.from && date < dateRange.from) {
        onDateRangeChange({
          from: date,
          to: dateRange.from
        });
      } else {
        onDateRangeChange({
          from: dateRange.from,
          to: date
        });
      }
      
      // If both dates are selected, close the picker
      if (dateRange.from) {
        setTimeout(() => {
          onClose();
        }, 300);
      }
    }
  };
  
  // Function to handle date hover
  const handleDateHover = (date: Date) => {
    setHoverDate(date);
  };
  
  // Function to handle reset
  const handleReset = () => {
    onDateRangeChange({
      from: undefined,
      to: undefined
    });
    setSelectingStart(true);
  };
  
  // Function to handle apply
  const handleApply = () => {
    onClose();
  };
  
  // Generate calendar for current month
  const generateCalendar = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };
  
  // Generate calendar for next month
  const generateNextMonthCalendar = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
    return generateCalendar(nextMonth);
  };
  
  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Calendar for current month
  const currentMonthCalendar = generateCalendar(currentMonth);
  
  // Calendar for next month
  const nextMonthCalendar = generateNextMonthCalendar();
  
  // Format date range for display
  const formatDateRange = () => {
    if (!dateRange.from && !dateRange.to) return '';
    
    const fromStr = dateRange.from ? dateRange.from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
    const toStr = dateRange.to ? dateRange.to.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';
    
    if (fromStr && toStr) {
      return `${fromStr} — ${toStr}`;
    }
    
    return fromStr || toStr;
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">
          {selectingStart ? 'Select departure date' : 'Select return date'}
        </h3>
        <p className="text-gray-500 text-sm">
          {formatDateRange() || 'No dates selected'}
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Current Month Calendar */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={goToPreviousMonth}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h4 className="font-medium">
              {getMonthName(currentMonth)} {getYear(currentMonth)}
            </h4>
            <div className="w-5 h-5"></div> {/* Spacer to keep the heading centered */}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {/* Days of the week */}
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {currentMonthCalendar.map((date, index) => (
              <div key={index} className="text-center py-2">
                {date ? (
                  <button
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors",
                      isStartDate(date) && "bg-black text-white",
                      isEndDate(date) && "bg-black text-white",
                      !isStartDate(date) && !isEndDate(date) && isDateSelected(date) && "bg-gray-200",
                      !isDateSelected(date) && isInHoverRange(date) && "bg-gray-100",
                      "hover:bg-gray-100"
                    )}
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={() => handleDateHover(date)}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div className="w-8 h-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Next Month Calendar */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-5 h-5"></div> {/* Spacer to keep the heading centered */}
            <h4 className="font-medium">
              {getMonthName(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} {getYear(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            </h4>
            <button 
              onClick={goToNextMonth}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {/* Days of the week */}
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {nextMonthCalendar.map((date, index) => (
              <div key={index} className="text-center py-2">
                {date ? (
                  <button
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors",
                      isStartDate(date) && "bg-black text-white",
                      isEndDate(date) && "bg-black text-white",
                      !isStartDate(date) && !isEndDate(date) && isDateSelected(date) && "bg-gray-200",
                      !isDateSelected(date) && isInHoverRange(date) && "bg-gray-100",
                      "hover:bg-gray-100"
                    )}
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={() => handleDateHover(date)}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div className="w-8 h-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={handleReset}
          className="text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
