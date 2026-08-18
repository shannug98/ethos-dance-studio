import React, { useState } from 'react';
import { Sparkles, Sun, Moon, Clock, MapPin, UserCheck } from 'lucide-react';

export default function SchedulesSection() {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const ethosOfficialSchedules = [
    // Morning Batches
    { id: 1, day: 'Monday', time: '07:30 AM - 08:30 AM', className: 'Dance Fitness (Any Age)', style: 'Morning Fitness', instructor: 'Ethos Master Team', level: 'Any Age', studioRoom: 'Studio A', period: 'MORNING' },
    { id: 2, day: 'Monday', time: '09:00 AM - 10:00 AM', className: 'Adults Batch (Beginner)', style: 'Adults Beginner', instructor: 'Ethos Senior Choreographer', level: 'Beginner', studioRoom: 'Studio A', period: 'MORNING' },
    
    // Evening Batches
    { id: 3, day: 'Monday', time: '05:00 PM - 06:00 PM', className: 'Kids Batch (4-6 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 4-6 yrs', studioRoom: 'Studio B', period: 'EVENING' },
    { id: 4, day: 'Monday', time: '06:00 PM - 07:00 PM', className: 'Adults Batch (Beginner)', style: 'Adults Evening', instructor: 'Ethos Senior Choreographer', level: 'Beginner', studioRoom: 'Studio A', period: 'EVENING' },
    { id: 5, day: 'Monday', time: '07:00 PM - 08:00 PM', className: 'Kids Batch (6-12 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 6-12 yrs', studioRoom: 'Studio B', period: 'EVENING' },
    { id: 6, day: 'Monday', time: '08:00 PM - 09:00 PM', className: 'Adults Batch (Advanced)', style: 'Adults Advanced', instructor: 'Ethos Master Director', level: 'Advanced', studioRoom: 'Studio A', period: 'EVENING' },

    // Tuesday
    { id: 7, day: 'Tuesday', time: '07:30 AM - 08:30 AM', className: 'Dance Fitness (Any Age)', style: 'Morning Fitness', instructor: 'Ethos Master Team', level: 'Any Age', studioRoom: 'Studio A', period: 'MORNING' },
    { id: 8, day: 'Tuesday', time: '09:00 AM - 10:00 AM', className: 'Adults Batch (Beginner)', style: 'Adults Beginner', instructor: 'Ethos Senior Choreographer', level: 'Beginner', studioRoom: 'Studio A', period: 'MORNING' },
    { id: 9, day: 'Tuesday', time: '05:00 PM - 06:00 PM', className: 'Kids Batch (4-6 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 4-6 yrs', studioRoom: 'Studio B', period: 'EVENING' },
    { id: 10, day: 'Tuesday', time: '06:00 PM - 07:00 PM', className: 'Adults Batch (Beginner)', style: 'Adults Evening', instructor: 'Ethos Senior Choreographer', level: 'Beginner', studioRoom: 'Studio A', period: 'EVENING' },
    { id: 11, day: 'Tuesday', time: '07:00 PM - 08:00 PM', className: 'Kids Batch (6-12 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 6-12 yrs', studioRoom: 'Studio B', period: 'EVENING' },
    { id: 12, day: 'Tuesday', time: '08:00 PM - 09:00 PM', className: 'Adults Batch (Advanced)', style: 'Adults Advanced', instructor: 'Ethos Master Director', level: 'Advanced', studioRoom: 'Studio A', period: 'EVENING' },

    // Wednesday
    { id: 13, day: 'Wednesday', time: '07:30 AM - 08:30 AM', className: 'Dance Fitness (Any Age)', style: 'Morning Fitness', instructor: 'Ethos Master Team', level: 'Any Age', studioRoom: 'Studio A', period: 'MORNING' },
    { id: 14, day: 'Wednesday', time: '09:00 AM - 10:00 AM', className: 'Adults Batch (Beginner)', style: 'Adults Beginner', instructor: 'Ethos Senior Choreographer', level: 'Beginner', studioRoom: 'Studio A', period: 'MORNING' },
    { id: 15, day: 'Wednesday', time: '05:00 PM - 06:00 PM', className: 'Kids Batch (4-6 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 4-6 yrs', studioRoom: 'Studio B', period: 'EVENING' },
    { id: 16, day: 'Wednesday', time: '06:00 PM - 07:00 PM', className: 'Adults Batch (Beginner)', style: 'Adults Evening', instructor: 'Ethos Senior Choreographer', level: 'Beginner', studioRoom: 'Studio A', period: 'EVENING' },
    { id: 17, day: 'Wednesday', time: '07:00 PM - 08:00 PM', className: 'Kids Batch (6-12 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 6-12 yrs', studioRoom: 'Studio B', period: 'EVENING' },
    { id: 18, day: 'Wednesday', time: '08:00 PM - 09:00 PM', className: 'Adults Batch (Advanced)', style: 'Adults Advanced', instructor: 'Ethos Master Director', level: 'Advanced', studioRoom: 'Studio A', period: 'EVENING' },

    // Thursday
    { id: 19, day: 'Thursday', time: '07:30 AM - 08:30 AM', className: 'Dance Fitness (Any Age)', style: 'Morning Fitness', instructor: 'Ethos Master Team', level: 'Any Age', studioRoom: 'Studio A', period: 'MORNING' },
    { id: 20, day: 'Thursday', time: '09:00 AM - 10:00 AM', className: 'Adults Batch (Beginner)', style: 'Adults Beginner', instructor: 'Ethos Senior Choreographer', level: 'Beginner', studioRoom: 'Studio A', period: 'MORNING' },
    { id: 21, day: 'Thursday', time: '05:00 PM - 06:00 PM', className: 'Kids Batch (4-6 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 4-6 yrs', studioRoom: 'Studio B', period: 'EVENING' },
    { id: 22, day: 'Thursday', time: '06:00 PM - 07:00 PM', className: 'Adults Batch (Beginner)', style: 'Adults Evening', instructor: 'Ethos Senior Choreographer', level: 'Beginner', studioRoom: 'Studio A', period: 'EVENING' },
    { id: 23, day: 'Thursday', time: '07:00 PM - 08:00 PM', className: 'Kids Batch (6-12 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 6-12 yrs', studioRoom: 'Studio B', period: 'EVENING' },
    { id: 24, day: 'Thursday', time: '08:00 PM - 09:00 PM', className: 'Adults Batch (Advanced)', style: 'Adults Advanced', instructor: 'Ethos Master Director', level: 'Advanced', studioRoom: 'Studio A', period: 'EVENING' },

    // Friday
    { id: 25, day: 'Friday', time: '07:30 AM - 08:30 AM', className: 'Dance Fitness (Any Age)', style: 'Morning Fitness', instructor: 'Ethos Master Team', level: 'Any Age', studioRoom: 'Studio A', period: 'MORNING' },
    { id: 26, day: 'Friday', time: '09:00 AM - 10:00 AM', className: 'Adults Batch (Beginner)', style: 'Adults Beginner', instructor: 'Ethos Senior Choreographer', level: 'Beginner', studioRoom: 'Studio A', period: 'MORNING' },
    { id: 27, day: 'Friday', time: '05:00 PM - 06:00 PM', className: 'Kids Batch (4-6 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 4-6 yrs', studioRoom: 'Studio B', period: 'EVENING' },
    { id: 28, day: 'Friday', time: '06:00 PM - 07:00 PM', className: 'Adults Batch (Beginner)', style: 'Adults Evening', instructor: 'Ethos Senior Choreographer', level: 'Beginner', studioRoom: 'Studio A', period: 'EVENING' },
    { id: 29, day: 'Friday', time: '07:00 PM - 08:00 PM', className: 'Kids Batch (6-12 Years)', style: 'Kids Batch', instructor: 'Ethos Kids Lead', level: 'Ages 6-12 yrs', studioRoom: 'Studio B', period: 'EVENING' },
    { id: 30, day: 'Friday', time: '08:00 PM - 09:00 PM', className: 'Adults Batch (Advanced)', style: 'Adults Advanced', instructor: 'Ethos Master Director', level: 'Advanced', studioRoom: 'Studio A', period: 'EVENING' }
  ];

  const currentSlots = ethosOfficialSchedules.filter(s => s.day.toLowerCase() === selectedDay.toLowerCase());
  const morningSlots = currentSlots.filter(s => s.period === 'MORNING');
  const eveningSlots = currentSlots.filter(s => s.period === 'EVENING');

  return (
    <section id="schedule" className="bg-[#FAF8F5] text-slate-900 py-16 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#0088FF] block mb-2">OFFICIAL STUDIO TIMETABLE</span>
            <h2 className="text-4xl sm:text-6xl font-black font-syne text-slate-900 uppercase tracking-tight">
              CLASS TIMETABLE
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-2">
              Explore weekly batch schedules, studio rooms, and instructor sessions below.
            </p>
          </div>
        </div>

        {/* Day Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 text-xs font-extrabold tracking-wider uppercase transition-all rounded-full border ${
                selectedDay === day
                  ? 'bg-gradient-to-r from-[#FF0055] to-[#7928CA] text-white border-transparent shadow-lg shadow-[#FF0055]/20'
                  : 'bg-white text-slate-700 border-slate-300 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Timetable List Split by Morning & Evening */}
        {currentSlots.length > 0 ? (
          <div className="space-y-10 max-w-5xl">
            
            {/* MORNING BATCHES */}
            {morningSlots.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0088FF] pb-2 border-b border-slate-200">
                  <Sun className="w-4 h-4 text-[#0088FF]" />
                  <span>MORNING TIMETABLE</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {morningSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="bg-white border border-slate-200 shadow-md rounded-2xl p-6 flex justify-between items-center group hover:shadow-lg hover:border-slate-300 transition-all"
                    >
                      <div className="space-y-2">
                        <span className="px-2.5 py-0.5 bg-[#0088FF]/10 border border-[#0088FF]/30 text-[#0088FF] text-[10px] font-extrabold uppercase rounded-full inline-block">
                          {slot.level}
                        </span>
                        <h4 className="text-lg font-black uppercase font-syne text-slate-900 group-hover:text-[#0088FF] transition-colors">
                          {slot.className}
                        </h4>
                        <div className="text-xs text-[#0088FF] font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{slot.time}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0 pl-4 border-l border-slate-200 space-y-1">
                        <div className="text-xs font-extrabold text-slate-800 font-outfit uppercase flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#FF0055]" />
                          <span>{slot.studioRoom}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">
                          {slot.instructor}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EVENING BATCHES */}
            {eveningSlots.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#FF0055] pb-2 border-b border-slate-200">
                  <Moon className="w-4 h-4 text-[#FF0055]" />
                  <span>EVENING TIMETABLE</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eveningSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="bg-white border border-slate-200 shadow-md rounded-2xl p-6 flex justify-between items-center group hover:shadow-lg hover:border-slate-300 transition-all"
                    >
                      <div className="space-y-2">
                        <span className="px-2.5 py-0.5 bg-[#FF0055]/10 border border-[#FF0055]/30 text-[#FF0055] text-[10px] font-extrabold uppercase rounded-full inline-block">
                          {slot.level}
                        </span>
                        <h4 className="text-lg font-black uppercase font-syne text-slate-900 group-hover:text-[#FF0055] transition-colors">
                          {slot.className}
                        </h4>
                        <div className="text-xs text-[#FF0055] font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{slot.time}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0 pl-4 border-l border-slate-200 space-y-1">
                        <div className="text-xs font-extrabold text-slate-800 font-outfit uppercase flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#0088FF]" />
                          <span>{slot.studioRoom}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">
                          {slot.instructor}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="py-12 text-center text-slate-600 bg-white border border-slate-200 shadow-md rounded-2xl max-w-5xl font-medium">
            Sangeet & Special Private Workshops available on {selectedDay}! Mon-Fri batches resume Monday morning.
          </div>
        )}

      </div>
    </section>
  );
}
