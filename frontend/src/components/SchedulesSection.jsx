import React, { useState } from 'react';
import { Sparkles, Sun, Moon, CheckCircle2 } from 'lucide-react';

export default function SchedulesSection({ schedules = [], onSelectScheduleSlot }) {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const ethosOfficialSchedules = [
    // Morning Batches
    { id: 1, day: 'Monday', time: '07:30 AM - 08:30 AM', className: 'Dance Fitness (Any Age)', style: 'Morning Fitness', instructor: 'Ethos Master Team', level: 'Any Age', availableSlots: 15, totalSlots: 25, studioRoom: 'Studio A', price: 2500, period: 'MORNING' },
    { id: 2, day: 'Monday', time: '09:00 AM - 10:00 AM', className: 'Adults Batch (Beginner)', style: 'Adults Beginner', instructor: 'Ethos Senior Choreographer', level: 'Beginner', availableSlots: 12, totalSlots: 20, studioRoom: 'Studio A', price: 2500, period: 'MORNING' },
    
    // Evening Batches
    { id: 3, day: 'Monday', time: '05:00 PM - 06:00 PM', className: 'Kids Batch (4-6 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 4-6 yrs', availableSlots: 10, totalSlots: 15, studioRoom: 'Studio B', price: 2000, period: 'EVENING' },
    { id: 4, day: 'Monday', time: '06:00 PM - 07:00 PM', className: 'Adults Batch (Beginner)', style: 'Adults Evening', instructor: 'Ethos Senior Choreographer', level: 'Beginner', availableSlots: 8, totalSlots: 20, studioRoom: 'Studio A', price: 2500, period: 'EVENING' },
    { id: 5, day: 'Monday', time: '07:00 PM - 08:00 PM', className: 'Kids Batch (6-12 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 6-12 yrs', availableSlots: 10, totalSlots: 20, studioRoom: 'Studio B', price: 2000, period: 'EVENING' },
    { id: 6, day: 'Monday', time: '08:00 PM - 09:00 PM', className: 'Adults Batch (Advanced)', style: 'Adults Advanced', instructor: 'Ethos Master Director', level: 'Advanced', availableSlots: 6, totalSlots: 15, studioRoom: 'Studio A', price: 2500, period: 'EVENING' },

    // Tuesday (Same Mon-Fri schedule)
    { id: 7, day: 'Tuesday', time: '07:30 AM - 08:30 AM', className: 'Dance Fitness (Any Age)', style: 'Morning Fitness', instructor: 'Ethos Master Team', level: 'Any Age', availableSlots: 15, totalSlots: 25, studioRoom: 'Studio A', price: 2500, period: 'MORNING' },
    { id: 8, day: 'Tuesday', time: '09:00 AM - 10:00 AM', className: 'Adults Batch (Beginner)', style: 'Adults Beginner', instructor: 'Ethos Senior Choreographer', level: 'Beginner', availableSlots: 12, totalSlots: 20, studioRoom: 'Studio A', price: 2500, period: 'MORNING' },
    { id: 9, day: 'Tuesday', time: '05:00 PM - 06:00 PM', className: 'Kids Batch (4-6 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 4-6 yrs', availableSlots: 10, totalSlots: 15, studioRoom: 'Studio B', price: 2000, period: 'EVENING' },
    { id: 10, day: 'Tuesday', time: '06:00 PM - 07:00 PM', className: 'Adults Batch (Beginner)', style: 'Adults Evening', instructor: 'Ethos Senior Choreographer', level: 'Beginner', availableSlots: 8, totalSlots: 20, studioRoom: 'Studio A', price: 2500, period: 'EVENING' },
    { id: 11, day: 'Tuesday', time: '07:00 PM - 08:00 PM', className: 'Kids Batch (6-12 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 6-12 yrs', availableSlots: 10, totalSlots: 20, studioRoom: 'Studio B', price: 2000, period: 'EVENING' },
    { id: 12, day: 'Tuesday', time: '08:00 PM - 09:00 PM', className: 'Adults Batch (Advanced)', style: 'Adults Advanced', instructor: 'Ethos Master Director', level: 'Advanced', availableSlots: 6, totalSlots: 15, studioRoom: 'Studio A', price: 2500, period: 'EVENING' },

    // Wednesday
    { id: 13, day: 'Wednesday', time: '07:30 AM - 08:30 AM', className: 'Dance Fitness (Any Age)', style: 'Morning Fitness', instructor: 'Ethos Master Team', level: 'Any Age', availableSlots: 15, totalSlots: 25, studioRoom: 'Studio A', price: 2500, period: 'MORNING' },
    { id: 14, day: 'Wednesday', time: '09:00 AM - 10:00 AM', className: 'Adults Batch (Beginner)', style: 'Adults Beginner', instructor: 'Ethos Senior Choreographer', level: 'Beginner', availableSlots: 12, totalSlots: 20, studioRoom: 'Studio A', price: 2500, period: 'MORNING' },
    { id: 15, day: 'Wednesday', time: '05:00 PM - 06:00 PM', className: 'Kids Batch (4-6 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 4-6 yrs', availableSlots: 10, totalSlots: 15, studioRoom: 'Studio B', price: 2000, period: 'EVENING' },
    { id: 16, day: 'Wednesday', time: '06:00 PM - 07:00 PM', className: 'Adults Batch (Beginner)', style: 'Adults Evening', instructor: 'Ethos Senior Choreographer', level: 'Beginner', availableSlots: 8, totalSlots: 20, studioRoom: 'Studio A', price: 2500, period: 'EVENING' },
    { id: 17, day: 'Wednesday', time: '07:00 PM - 08:00 PM', className: 'Kids Batch (6-12 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 6-12 yrs', availableSlots: 10, totalSlots: 20, studioRoom: 'Studio B', price: 2000, period: 'EVENING' },
    { id: 18, day: 'Wednesday', time: '08:00 PM - 09:00 PM', className: 'Adults Batch (Advanced)', style: 'Adults Advanced', instructor: 'Ethos Master Director', level: 'Advanced', availableSlots: 6, totalSlots: 15, studioRoom: 'Studio A', price: 2500, period: 'EVENING' },

    // Thursday
    { id: 19, day: 'Thursday', time: '07:30 AM - 08:30 AM', className: 'Dance Fitness (Any Age)', style: 'Morning Fitness', instructor: 'Ethos Master Team', level: 'Any Age', availableSlots: 15, totalSlots: 25, studioRoom: 'Studio A', price: 2500, period: 'MORNING' },
    { id: 20, day: 'Thursday', time: '09:00 AM - 10:00 AM', className: 'Adults Batch (Beginner)', style: 'Adults Beginner', instructor: 'Ethos Senior Choreographer', level: 'Beginner', availableSlots: 12, totalSlots: 20, studioRoom: 'Studio A', price: 2500, period: 'MORNING' },
    { id: 21, day: 'Thursday', time: '05:00 PM - 06:00 PM', className: 'Kids Batch (4-6 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 4-6 yrs', availableSlots: 10, totalSlots: 15, studioRoom: 'Studio B', price: 2000, period: 'EVENING' },
    { id: 22, day: 'Thursday', time: '06:00 PM - 07:00 PM', className: 'Adults Batch (Beginner)', style: 'Adults Evening', instructor: 'Ethos Senior Choreographer', level: 'Beginner', availableSlots: 8, totalSlots: 20, studioRoom: 'Studio A', price: 2500, period: 'EVENING' },
    { id: 23, day: 'Thursday', time: '07:00 PM - 08:00 PM', className: 'Kids Batch (6-12 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 6-12 yrs', availableSlots: 10, totalSlots: 20, studioRoom: 'Studio B', price: 2000, period: 'EVENING' },
    { id: 24, day: 'Thursday', time: '08:00 PM - 09:00 PM', className: 'Adults Batch (Advanced)', style: 'Adults Advanced', instructor: 'Ethos Master Director', level: 'Advanced', availableSlots: 6, totalSlots: 15, studioRoom: 'Studio A', price: 2500, period: 'EVENING' },

    // Friday
    { id: 25, day: 'Friday', time: '07:30 AM - 08:30 AM', className: 'Dance Fitness (Any Age)', style: 'Morning Fitness', instructor: 'Ethos Master Team', level: 'Any Age', availableSlots: 15, totalSlots: 25, studioRoom: 'Studio A', price: 2500, period: 'MORNING' },
    { id: 26, day: 'Friday', time: '09:00 AM - 10:00 AM', className: 'Adults Batch (Beginner)', style: 'Adults Beginner', instructor: 'Ethos Senior Choreographer', level: 'Beginner', availableSlots: 12, totalSlots: 20, studioRoom: 'Studio A', price: 2500, period: 'MORNING' },
    { id: 27, day: 'Friday', time: '05:00 PM - 06:00 PM', className: 'Kids Batch (4-6 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 4-6 yrs', availableSlots: 10, totalSlots: 15, studioRoom: 'Studio B', price: 2000, period: 'EVENING' },
    { id: 28, day: 'Friday', time: '06:00 PM - 07:00 PM', className: 'Adults Batch (Beginner)', style: 'Adults Evening', instructor: 'Ethos Senior Choreographer', level: 'Beginner', availableSlots: 8, totalSlots: 20, studioRoom: 'Studio A', price: 2500, period: 'EVENING' },
    { id: 29, day: 'Friday', time: '07:00 PM - 08:00 PM', className: 'Kids Batch (6-12 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 6-12 yrs', availableSlots: 10, totalSlots: 20, studioRoom: 'Studio B', price: 2000, period: 'EVENING' },
    { id: 30, day: 'Friday', time: '08:00 PM - 09:00 PM', className: 'Adults Batch (Advanced)', style: 'Adults Advanced', instructor: 'Ethos Master Director', level: 'Advanced', availableSlots: 6, totalSlots: 15, studioRoom: 'Studio A', price: 2500, period: 'EVENING' }
  ];

  const currentSlots = ethosOfficialSchedules.filter(s => s.day.toLowerCase() === selectedDay.toLowerCase());
  const morningSlots = currentSlots.filter(s => s.period === 'MORNING');
  const eveningSlots = currentSlots.filter(s => s.period === 'EVENING');

  return (
    <section id="schedule" className="bg-[#000000] text-[#FFFFFF] py-20 border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D0FBF9] block mb-2">OFFICIAL ETHOS BATCH TIMETABLE</span>
            <h2 className="text-4xl sm:text-6xl font-display-giant text-white uppercase tracking-tight">
              CLASS SCHEDULE
            </h2>
          </div>

          {/* FREE DEMO TRIAL BANNER */}
          <div className="p-4 bg-[#FF0044] text-white border-2 border-white flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-white animate-spin shrink-0" style={{ animationDuration: '4s' }} />
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider block">SPECIAL DEMO OFFER</span>
              <strong className="text-sm font-black uppercase">MONDAY - FRIDAY: 1 DEMO TRIAL FREE!</strong>
            </div>
          </div>
        </div>

        {/* Day Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 text-xs font-extrabold tracking-wider uppercase transition-all border ${
                selectedDay === day
                  ? 'bg-[#1F41FF] text-white border-[#1F41FF]'
                  : 'bg-[#111111] text-slate-300 border-[#333333] hover:text-white'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule List Split by Morning & Evening */}
        {currentSlots.length > 0 ? (
          <div className="space-y-10 max-w-5xl">
            
            {/* MORNING BATCHES */}
            {morningSlots.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#D0FBF9] pb-2 border-b border-[#333333]">
                  <Sun className="w-4 h-4 text-[#D0FBF9]" />
                  <span>MORNING BATCHES</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {morningSlots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => onSelectScheduleSlot && onSelectScheduleSlot({
                        id: slot.id,
                        title: `${slot.className} (${slot.day} @ ${slot.time})`,
                        price: slot.price,
                        type: 'Monthly Batch Pass'
                      })}
                      className="bg-[#111111] border border-[#333333] p-6 hover:border-[#FF0044] cursor-pointer transition-all flex justify-between items-center group"
                    >
                      <div className="space-y-2">
                        <span className="px-2.5 py-0.5 bg-[#1F41FF] text-white text-[10px] font-bold uppercase inline-block">
                          {slot.level}
                        </span>
                        <h4 className="text-lg font-extrabold uppercase font-display text-white group-hover:text-[#D0FBF9] transition-colors">
                          {slot.className}
                        </h4>
                        <div className="text-xs text-[#D0FBF9] font-bold">{slot.time}</div>
                      </div>

                      <div className="text-right shrink-0 pl-4 border-l border-[#222222]">
                        <div className="text-2xl font-black text-white font-display">₹{slot.price}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">per month</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EVENING BATCHES */}
            {eveningSlots.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#D900FF] pb-2 border-b border-[#333333]">
                  <Moon className="w-4 h-4 text-[#D900FF]" />
                  <span>EVENING BATCHES</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eveningSlots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => onSelectScheduleSlot && onSelectScheduleSlot({
                        id: slot.id,
                        title: `${slot.className} (${slot.day} @ ${slot.time})`,
                        price: slot.price,
                        type: 'Monthly Batch Pass'
                      })}
                      className="bg-[#111111] border border-[#333333] p-6 hover:border-[#FF0044] cursor-pointer transition-all flex justify-between items-center group"
                    >
                      <div className="space-y-2">
                        <span className="px-2.5 py-0.5 bg-[#D900FF] text-black text-[10px] font-bold uppercase inline-block">
                          {slot.level}
                        </span>
                        <h4 className="text-lg font-extrabold uppercase font-display text-white group-hover:text-[#D0FBF9] transition-colors">
                          {slot.className}
                        </h4>
                        <div className="text-xs text-[#D0FBF9] font-bold">{slot.time}</div>
                      </div>

                      <div className="text-right shrink-0 pl-4 border-l border-[#222222]">
                        <div className="text-2xl font-black text-white font-display">₹{slot.price}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">per month</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="py-12 text-center text-slate-500 border border-[#333333] max-w-5xl">
            Sangeet & Special Private Workshops available on {selectedDay}! Mon-Fri batches resume Monday morning.
          </div>
        )}

      </div>
    </section>
  );
}
