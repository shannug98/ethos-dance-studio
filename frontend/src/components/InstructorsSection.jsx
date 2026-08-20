import React from 'react';
import { Award, Star, Sparkles, UserCheck } from 'lucide-react';

export default function InstructorsSection() {
  const founders = [
    {
      id: 1,
      name: 'Sreekanth Lendugure',
      role: 'Co-Founder & Managing Director',
      bio: 'Visionary leader driving Ethos Studio’s creative growth, strategic expansion, and commitment to world-class dance education.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      badge: 'FOUNDER'
    },
    {
      id: 2,
      name: 'Mude Manikanta',
      role: 'Co-Founder & Artistic Director',
      bio: 'Co-founding pioneer leading choreography development, performance direction, and nurturing elite dance talent across India.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      badge: 'FOUNDER'
    }
  ];

  const choreographers = [
    {
      id: 1,
      name: 'Sophia Bennett',
      role: 'Master Hip-Hop & Commercial Choreographer',
      bio: '12+ years directing national stage ensembles, urban dance concepts, and international masterclass tours.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      specialty: 'Hip-Hop & Commercial Fusion'
    },
    {
      id: 2,
      name: 'Rohan Sharma',
      role: 'Lead Street & Popping Instructor',
      bio: 'Specialist in body isolations, popping, locking, and high-energy stage performance dynamics.',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
      specialty: 'Street Styles & Popping'
    },
    {
      id: 3,
      name: 'Ananya Roy',
      role: 'Head Contemporary & Floorwork Lecturer',
      bio: 'Expert in fluid movement mechanics, expressive contemporary fusion, and emotional storytelling through dance.',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      specialty: 'Contemporary & Floorwork'
    },
    {
      id: 4,
      name: 'Arjun Das',
      role: 'Senior Royal Sangeet & Bollywood Director',
      bio: 'Choreographed over 200+ royal wedding entrances, flashmobs, and grand celebratory group productions.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      specialty: 'Bollywood & Wedding Sangeet'
    }
  ];

  return (
    <section id="instructors" className="bg-[#FAF8F5] text-slate-900 border-b border-slate-200">
      
      {/* 🌟 1. SECTION: OUR FOUNDERS 🌟 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-12 border-b border-slate-200">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#0088FF] bg-[#0088FF]/10 px-3 py-1 rounded-full inline-block mb-3">
              LEADERSHIP & VISION
            </span>
            <h2 className="text-4xl sm:text-6xl font-black font-syne text-slate-900 uppercase tracking-tight">
              OUR FOUNDERS
            </h2>
          </div>

          <div className="max-w-md border-l-4 border-[#0088FF] pl-4 py-1">
            <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
              "Building a sanctuary where movement meets passion, empowering dancers to turn expression into artistry."
            </p>
          </div>
        </div>

        {/* Founders Cards Grid (2 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {founders.map((person) => (
            <div
              key={person.id}
              className="bg-white border border-slate-200/80 shadow-xl rounded-3xl overflow-hidden flex flex-col sm:flex-row group hover:border-[#0088FF]/40 transition-all hover:shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative w-full sm:w-1/2 h-72 sm:h-auto bg-slate-100 overflow-hidden shrink-0">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-3 py-1 rounded-full border border-white/20 tracking-wider">
                  {person.badge}
                </div>
              </div>

              {/* Founder Info */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase font-syne text-slate-900 tracking-tight leading-tight">
                    {person.name}
                  </h3>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#0088FF]">
                    {person.role}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                    {person.bio}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] font-bold text-slate-500">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Ethos Executive Leadership</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 🌟 2. SECTION: CHOREOGRAPHERS & LECTURERS 🌟 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF0055] bg-[#FF0055]/10 px-3.5 py-1 rounded-full inline-block">
            EXPERT FACULTY & MASTERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-syne text-slate-900 uppercase tracking-tight">
            CHOREOGRAPHERS & LECTURERS
          </h2>
          <p className="text-sm font-medium text-slate-600">
            Our master choreographers and lecturers bring years of stage experience, commercial training, and passion to every studio class.
          </p>
        </div>

        {/* Choreographers Cards Grid (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {choreographers.map((person) => (
            <div
              key={person.id}
              className="bg-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-[#FF0055]/40 transition-all hover:scale-[1.02]"
            >
              {/* Photo Container */}
              <div className="relative h-72 bg-slate-100 overflow-hidden">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-xl border border-white/10 text-center truncate">
                  {person.specialty}
                </div>
              </div>

              {/* Card Info */}
              <div className="p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-xl font-black uppercase font-syne text-slate-900 tracking-tight leading-tight">
                    {person.name}
                  </h3>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#FF0055]">
                    {person.role}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                    {person.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-1 text-[#0088FF]">
                    <Award className="w-3.5 h-3.5" /> Studio Master
                  </span>
                  <span className="text-slate-400">Regular Classes</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
