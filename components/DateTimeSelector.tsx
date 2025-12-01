import React from 'react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { TIME_SLOTS } from '../constants';
import { Calendar, Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface DateTimeSelectorProps {
  date: Date | null;
  time: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ date, time, onDateSelect, onTimeSelect }) => {
  // Generate next 14 days
  const today = startOfToday();
  const nextDays = Array.from({ length: 14 }).map((_, i) => addDays(today, i));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Date Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-white flex items-center gap-2 drop-shadow-md">
          <Calendar className="text-black fill-white" size={24} strokeWidth={2.5} />
          Select Date
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {nextDays.map((d) => {
            const isSelected = date && isSameDay(date, d);
            return (
              <button
                key={d.toISOString()}
                onClick={() => onDateSelect(d)}
                className={clsx(
                  "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all cursor-pointer",
                  isSelected
                    ? "bg-black text-white border-black shadow-none transform translate-y-0.5"
                    : "bg-white border-black text-black hover:bg-gray-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5"
                )}
              >
                <span className={clsx("text-xs font-bold uppercase", isSelected ? "opacity-80" : "text-gray-500")}>{format(d, 'EEE')}</span>
                <span className="text-2xl font-black">{format(d, 'd')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Section - Only show if date is selected */}
      <div className={clsx("space-y-4 transition-all duration-500", date ? "opacity-100" : "opacity-50 pointer-events-none")}>
        <h3 className="text-xl font-black text-white flex items-center gap-2 drop-shadow-md">
          <Clock className="text-black fill-white" size={24} strokeWidth={2.5} />
          Select Time
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              onClick={() => onTimeSelect(slot)}
              className={clsx(
                "py-2.5 px-1 rounded-lg text-sm font-bold border-2 transition-all text-center truncate",
                time === slot
                  ? "bg-black text-white border-black shadow-none translate-y-0.5"
                  : "bg-white border-black text-black hover:bg-gray-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5"
              )}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};