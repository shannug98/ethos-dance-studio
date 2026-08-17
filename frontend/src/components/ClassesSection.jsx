import React, { useState } from 'react';

export default function ClassesSection({ onSelectClass }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Commercial Hip-Hop', 'Bollywood Fusion', 'Contemporary', 'Salsa Partner', 'Heels Choreo', 'Kids'];

  const danceClasses = [
    {
      id: 101,
      title: 'Urban Hip-Hop & Grooves',
      category: 'Commercial Hip-Hop',
      level: 'All Levels',
      duration: '75 mins',
      price: 499,
      instructor: 'Rohan Sharma',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      description: 'Master high-energy urban choreography, body isolations, bounce, and musicality.'
    },
    {
      id: 102,
      title: 'Bollywood Commercial Fusion',
      category: 'Bollywood Fusion',
      level: 'Beginner to Intermediate',
      duration: '60 mins',
      price: 450,
      instructor: 'Ananya Roy',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      description: 'High octane Bollywood hits blended with Afro & Hip-Hop routines for energy & swag.'
    },
    {
      id: 103,
      title: 'Contemporary Storytelling',
      category: 'Contemporary',
      level: 'Intermediate',
      duration: '90 mins',
      price: 550,
      instructor: 'Vikram Sengupta',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80',
      description: 'Explore fluid floorwork, emotional storytelling, releases, and graceful weight transfers.'
    },
    {
      id: 104,
      title: 'Salsa & Bachata Sensual',
      category: 'Salsa Partner',
      level: 'All Levels',
      duration: '75 mins',
      price: 600,
      instructor: 'Carlos & Priya',
      image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=800&q=80',
      description: 'Latin partner dancing focusing on lead & follow techniques, smooth body rolls, and turn patterns.'
    },
    {
      id: 105,
      title: 'High Heels Commercial Choreo',
      category: 'Heels Choreo',
      level: 'Intermediate',
      duration: '75 mins',
      price: 599,
      instructor: 'Natasha Kapoor',
      image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80',
      description: 'Unleash fierce confidence, poise, lines, and sensual power choreography in high heels.'
    },
    {
      id: 106,
      title: 'Kids Hip-Hop Blast',
      category: 'Kids',
      level: 'Beginner (Ages 6-14)',
      duration: '60 mins',
      price: 399,
      instructor: 'Sneha Mehta',
      image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80',
      description: 'Fun, creative, and energetic dance foundation for young stars to build rhythm and confidence.'
    }
  ];

  const filteredClasses = activeCategory === 'All'
    ? danceClasses
    : danceClasses.filter(c => c.category === activeCategory);

  return (
    <section id="classes" className="bg-[#000000] text-[#FFFFFF] border-b border-[#333333]">
      
      {/* Split Grid matching Movement Studios */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#333333]">
        
        {/* Left Side: Image with Giant 'Classes' Banner */}
        <div className="relative min-h-[450px] bg-[#000000] overflow-hidden flex items-end p-8 sm:p-12 border-r border-[#333333]">
          <img
            src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=1200&q=80"
            alt="Classes Movement Studio"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-transparent to-transparent" />
          <h2 className="relative z-10 text-6xl sm:text-8xl font-display-giant text-white uppercase tracking-tighter">
            CLASSES
          </h2>
        </div>

        {/* Right Side: Description Block */}
        <div className="p-8 sm:p-16 flex flex-col justify-center space-y-6 bg-[#FFFFFF] text-[#000000]">
          <h3 className="text-3xl sm:text-4xl font-extrabold uppercase font-display tracking-tight">
            OUR CLASSES
          </h3>
          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
            Get your groove on with Commercial Hip Hop, find your rhythm in Bollywood Fusion, and explore expression in Contemporary Storytelling. Movement Studio offers a diverse range of classes for every dancer.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectClass && onSelectClass({ id: 101, title: 'Single Dance Class Pass', price: 499, type: 'Class Pass' })}
              className="btn-blue text-sm font-extrabold uppercase tracking-wider"
            >
              Book Class Pass
            </button>
          </div>
        </div>

      </div>

      {/* Class Showcase Cards (Clean Information Grid without redundant buttons) */}
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
              onClick={() => onSelectClass && onSelectClass({ id: item.id, title: item.title, price: item.price, type: 'Class Pass' })}
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
              
              <div className="pt-3 text-xs text-slate-400 font-semibold border-t border-[#222222] flex justify-between">
                <span>By {item.instructor}</span>
                <span className="text-white font-bold">₹{item.price} / session</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
