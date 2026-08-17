import React from 'react';
import { Play, Image, Sparkles } from 'lucide-react';

export default function GallerySection() {
  const images = [
    { title: 'Hip-Hop Jam Session', category: 'Urban', img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80' },
    { title: 'Royal Wedding Sangeet', category: 'Sangeet', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' },
    { title: 'Bollywood Commercial Choreo', category: 'Bollywood', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80' },
    { title: 'Contemporary Floorwork', category: 'Contemporary', img: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80' },
    { title: 'Sensual Heels Routine', category: 'Heels', img: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80' },
    { title: 'Afro-Beats Masterclass', category: 'Workshop', img: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <section id="gallery" className="py-20 bg-[#090A0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-xs font-semibold text-pink-300">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>STUDIO VIBES & GALLERY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase font-display tracking-tight">
            BEHIND THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">SPOTLIGHT</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((item, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden group h-64 border border-slate-800 bg-slate-950">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{item.category}</span>
                  <h4 className="text-base font-bold text-white">{item.title}</h4>
                </div>
                <div className="p-2.5 rounded-full bg-pink-500/80 text-white shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
