import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      batch: 'Adult Beginner Batch',
      rating: 5,
      comment: 'Ethos Dance Studio is hands down the best studio in Hyderabad! The instructors make learning commercial hip-hop so easy, even for complete beginners like me. I joined 3 months ago and my confidence has skyrocketed!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Verified Student'
    },
    {
      id: 2,
      name: 'Vikram & Sneha',
      batch: 'Royal Sangeet Bootcamp',
      rating: 5,
      comment: 'We booked Ethos for our wedding sangeet choreography. Ananya and the team mixed custom music tracks and choreographed our entire family within 4 sessions. Everyone was raving about our dance on the wedding night!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badge: 'Sangeet Couple'
    },
    {
      id: 3,
      name: 'Kavita Reddy',
      batch: 'Kids Star Batch Mother',
      rating: 5,
      comment: 'My 7-year-old daughter looks forward to her Mon-Fri evening dance batch at Kukatpally every day. The instructors are incredibly patient, encouraging, and stage-focused!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      badge: 'Proud Parent'
    }
  ];

  return (
    <section id="testimonials" className="bg-[#000000] text-white py-16 sm:py-24 border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D900FF] text-black text-xs font-extrabold uppercase tracking-widest rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDENT REVIEWS & TRIBE LOVE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-display-giant text-white uppercase tracking-tight">
            WHAT OUR DANCERS SAY
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto font-normal">
            Real stories from 1,000+ dancers and families who found their flow at Ethos Dance Studio Kukatpally Hyderabad.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#111111] border border-[#262626] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-[#D0FBF9] transition-all group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#FF0044]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#222222] group-hover:text-[#D0FBF9] transition-colors" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#222222]">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full border-2 border-[#1F41FF] object-cover"
                />
                <div>
                  <h3 className="text-sm font-extrabold text-white uppercase font-display">{item.name}</h3>
                  <span className="text-[10px] font-bold text-[#D0FBF9] block uppercase tracking-wider">{item.batch}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
