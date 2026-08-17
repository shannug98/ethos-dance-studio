import React, { useState } from 'react';

export default function SchedulesSection({ schedules = [], onSelectScheduleSlot }) {
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const sampleSchedules = schedules.length > 0 ? schedules : [
    { id: 1, day: 'Monday', time: '06:00 PM - 07:15 PM', className: 'Urban Hip-Hop & Grooves', style: 'Hip-Hop', instructor: 'Rohan Sharma', level: 'All Levels', availableSlots: 6, totalSlots: 20, studioRoom: 'Studio A', price: 499 },
    { id: 2, day: 'Monday', time: '07:30 PM - 08:30 PM', className: 'Bollywood Commercial Fusion', style: 'Bollywood', instructor: 'Ananya Roy', level: 'Beginner', availableSlots: 4, totalSlots: 25, studioRoom: 'Studio B', price: 450 },
    { id: 3, day: 'Tuesday', time: '06:30 PM - 08:00 PM', className: 'Contemporary Storytelling', style: 'Contemporary', instructor: 'Vikram Sengupta', level: 'Intermediate', availableSlots: 9, totalSlots: 15, studioRoom: 'Studio A', price: 550 },
    { id: 4, day: 'Wednesday', time: '07:00 PM - 08:15 PM', className: 'High Heels Commercial', style: 'Heels', instructor: 'Natasha Kapoor', level: 'Intermediate', availableSlots: 3, totalSlots: 18, studioRoom: 'Studio A', price: 599 },
    { id: 5, day: 'Thursday', time: '06:00 PM - 07:15 PM', className: 'Latin Salsa & Bachata', style: 'Latin', instructor: 'Carlos & Priya', level: 'All Levels', availableSlots: 8, totalSlots: 20, studioRoom: 'Studio B', price: 600 },
    { id: 6, day: 'Friday', time: '07:00 PM - 08:30 PM', className: 'Bollywood Mass & Swag', style: 'Bollywood', instructor: 'Ananya Roy', level: 'All Levels', availableSlots: 12, totalSlots: 30, studioRoom: 'Studio A', price: 450 },
    { id: 7, day: 'Saturday', time: '04:00 PM - 05:00 PM', className: 'Kids Hip-Hop Blast', style: 'Kids', instructor: 'Sneha Mehta', level: 'Beginner', availableSlots: 10, totalSlots: 20, studioRoom: 'Studio B', price: 399 },
    { id: 8, day: 'Sunday', time: '11:00 AM - 01:00 PM', className: 'Sunday Sangeet Intensive', style: 'Sangeet', instructor: 'Studio Master Team', level: 'Open to Families', availableSlots: 5, totalSlots: 15, studioRoom: 'Grand Ballroom', price: 1499 }
  ];

  const currentSlots = sampleSchedules.filter(s => s.day.toLowerCase() === selectedDay.toLowerCase());

  return (
    <section id="schedule" className="bg-[#000000] text-[#FFFFFF] py-20 border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D0FBF9] block mb-2">LIVE WEEKLY TIMETABLE</span>
          <h2 className="text-4xl sm:text-6xl font-display-giant text-white uppercase tracking-tight">
            BATCH SCHEDULE
          </h2>
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

        {/* Clean Schedule List */}
        <div className="space-y-4 max-w-4xl">
          {currentSlots.length > 0 ? (
            currentSlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => onSelectScheduleSlot && onSelectScheduleSlot({
                  id: slot.id,
                  title: `${slot.className} (${slot.day} @ ${slot.time})`,
                  price: slot.price || 499,
                  type: 'Schedule Reservation'
                })}
                className="bg-[#111111] border border-[#333333] p-6 hover:border-[#1F41FF] cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 bg-[#D900FF] text-[#000000] text-[11px] font-bold uppercase">
                      {slot.style}
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#222222] text-slate-300 text-[11px] font-semibold">
                      {slot.level}
                    </span>
                  </div>

                  <h4 className="text-xl font-extrabold uppercase font-display text-white">{slot.className}</h4>

                  <div className="text-xs text-slate-400 space-x-4">
                    <span className="text-[#D0FBF9] font-bold">{slot.time}</span>
                    <span>• Instructor: {slot.instructor}</span>
                    <span>• {slot.studioRoom || 'Studio A'}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-[#D900FF] font-bold">{slot.availableSlots || 5} Seats Remaining</div>
                  <div className="text-xl font-extrabold text-white">₹{slot.price || 499}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 border border-[#333333]">
              No regular slots scheduled for {selectedDay}. Sangeet & Private sessions available on request!
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
