import React from 'react';

export default function GallerySection() {
  const images = [
    { id: 1, title: 'Hip-Hop Jam Session', category: 'Live Studio', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Wedding Sangeet Rehearsal', category: 'Sangeet Hub', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Contemporary Expression', category: 'Stage Choreo', image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Kids Dance Showcase', category: 'Kids Batch', image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=800&q=80' },
    { id: 5, title: 'Afro-Beats Masterclass', category: 'Guest Workshop', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80' },
    { id: 6, title: 'Heels Choreo Intensive', category: 'Commercial', image: 'https://images.unsplash.com/photo-1535525153412-5a42439e210d?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <section id="gallery" className="bg-[#000000] text-[#FFFFFF] py-20 border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D0FBF9] block mb-2">STUDIO MOMENTS & PERFORMANCE</span>
          <h2 className="text-4xl sm:text-6xl font-display-giant text-white uppercase tracking-tight">
            ETHOS GALLERY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((item) => (
            <div key={item.id} className="relative group overflow-hidden bg-[#111111] border border-[#333333] h-72 cursor-pointer">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] font-bold text-[#D0FBF9] uppercase tracking-wider block">{item.category}</span>
                <h3 className="text-xl font-extrabold uppercase font-display text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
