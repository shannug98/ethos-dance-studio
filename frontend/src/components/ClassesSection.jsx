import React, { useState } from 'react';

export default function ClassesSection({ onSelectClass }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Morning Batch', 'Kids', 'Adults'];

  const ethosClasses = [
    {
      id: 101,
      title: 'Dance Fitness (Any Age)',
      category: 'Morning Batch',
      level: 'All Ages (Morning 7:30 - 8:30 AM)',
      duration: '60 mins',
      price: 2500,
      instructor: 'Ethos Master Team',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      description: 'High-energy rhythm fitness, cardio jam & sweat workout for all age groups.'
    },
    {
      id: 102,
      title: 'Adults Batch (Beginner)',
      category: 'Adults',
      level: 'Beginner (Morning 9 AM / Evening 6 PM)',
      duration: '60 mins',
      price: 2500,
      instructor: 'Ethos Senior Choreographer',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      description: 'Foundation grooves, body isolations, swag, and step-by-step commercial dance routines.'
    },
    {
      id: 103,
      title: 'Kids Batch (4-6 Years)',
      category: 'Kids',
      level: 'Ages 4-6 yrs (Evening 5:00 - 6:00 PM)',
      duration: '60 mins',
      price: 2000,
      instructor: 'Ethos Kids Lead',
      image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80',
      description: 'Fun, playful movement, basic rhythm building, and creative balance training for little stars.'
    },
    {
      id: 104,
      title: 'Kids Batch (6-12 Years)',
      category: 'Kids',
      level: 'Ages 6-12 yrs (Evening 7:00 - 8:00 PM)',
      duration: '60 mins',
      price: 2000,
      instructor: 'Ethos Kids Lead',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      description: 'Dynamic dance choreography, stage presentation, and beat coordination for growing dancers.'
    },
    {
      id: 105,
      title: 'Adults Batch (Advanced)',
      category: 'Adults',
      level: 'Advanced (Evening 8:00 - 9:00 PM)',
      duration: '60 mins',
      price: 2500,
      instructor: 'Ethos Master Director',
      image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
      description: 'Complex musicality, fast-paced choreography execution, and stage performance attitude.'
    }
  ];

  const filteredClasses = activeCategory === 'All'
    ? ethosClasses
    : ethosClasses.filter(c => c.category === activeCategory);

  return (
    <section id="classes" className="bg-[#000000] text-[#FFFFFF] border-b border-[#333333]">
      
      {/* Split Grid matching Movement Studios */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#333333]">
        
        {/* Left Side: Image Banner */}
        <div className="relative min-h-[450px] bg-[#000000] overflow-hidden flex items-end p-8 sm:p-12 border-r border-[#333333]">
          <img
            src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80"
            alt="Classes Ethos Dance Studio"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-transparent to-transparent" />
          <h2 className="relative z-10 text-6xl sm:text-8xl font-display-giant text-white uppercase tracking-tighter">
            CLASSES
          </h2>
        </div>

        {/* Right Side: Description Block */}
        <div className="p-8 sm:p-16 flex flex-col justify-center space-y-6 bg-[#FFFFFF] text-[#000000]">
          <div className="px-3 py-1 bg-[#FF0044] text-white text-xs font-extrabold uppercase inline-block w-fit">
            MONDAY - FRIDAY: 1 DEMO TRIAL FREE!
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold uppercase font-display tracking-tight">
            OUR CLASSES & BATCHES
          </h3>
          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
            Whether you want morning Dance Fitness, structured Adults Beginner/Advanced training, or engaging Kids batches (Ages 4-12), Ethos Dance Studio provides expert guidance for every stage.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectClass && onSelectClass({ id: 101, title: 'Adults Monthly Batch Pass', price: 2500, type: 'Monthly Pass' })}
              className="btn-blue text-sm font-extrabold uppercase tracking-wider"
            >
              Book Class Pass (₹2,500/mo)
            </button>
          </div>
        </div>

      </div>

      {/* Class Showcase Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        
        {/* Category Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all border ${
                activeCategory === cat
                  ? 'bg-[#1F41FF] text-white border-[#1F41FF]'
                  : 'bg-[#111111] text-slate-300 border-[#333333] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Informative Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredClasses.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectClass && onSelectClass({ id: item.id, title: item.title, price: item.price, type: 'Monthly Pass' })}
              className="bg-[#111111] border border-[#333333] flex flex-col justify-between group hover:border-[#1F41FF] cursor-pointer transition-all p-6 space-y-4"
            >
              <div className="relative h-56 overflow-hidden bg-[#000000] -mx-6 -mt-6 mb-2">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#000000] text-xs font-bold text-[#D0FBF9] border border-[#333333]">
                  {item.level}
                </span>
              </div>

              <span className="text-xs font-bold text-[#D900FF] uppercase tracking-wider block">{item.category}</span>
              <h4 className="text-xl font-extrabold text-white uppercase font-display">{item.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
              
              <div className="pt-3 text-xs text-slate-400 font-semibold border-t border-[#222222] flex justify-between items-center">
                <span>By {item.instructor}</span>
                <span className="text-[#D0FBF9] font-extrabold text-sm">₹{item.price} / mo</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
