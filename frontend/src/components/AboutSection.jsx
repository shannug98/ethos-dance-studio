import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#FFFFFF] text-[#000000] border-b border-[#333333]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Card: Image with 'Vision' Overlay */}
        <div className="relative min-h-[450px] md:min-h-[550px] bg-[#000000] overflow-hidden flex items-end p-8 sm:p-12">
          <img
            src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80"
            alt="Vision Ethos Studio"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-transparent to-transparent" />
          <h2 className="relative z-10 text-6xl sm:text-8xl font-display-giant text-white uppercase tracking-tighter">
            VISION
          </h2>
        </div>

        {/* Right Card: Text Info */}
        <div className="p-8 sm:p-16 flex flex-col justify-center space-y-6 bg-[#FFFFFF]">
          <h3 className="text-3xl sm:text-4xl font-extrabold uppercase font-display tracking-tight text-[#000000]">
            ABOUT ETHOS
          </h3>
          
          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
            At <strong>ETHOS DANCE STUDIO</strong>, we’re passionate about creating an empowering and inspiring environment for dancers of all levels. Whether you’re a complete beginner eager to explore movement, a wedding couple preparing for Sangeet night, or a performer refining your technique, you’ll find a home here.
          </p>

          <div className="pt-4">
            <a href="#classes" className="btn-blue text-sm font-bold uppercase tracking-wider">
              Explore Our Classes
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
