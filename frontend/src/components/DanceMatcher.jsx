import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, Zap, Music, Flame, Sparkles, ArrowRight } from 'lucide-react';

export default function DanceMatcher({ onBookRecommendedStyle }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [vibe, setVibe] = useState('');
  const [level, setLevel] = useState('');

  const goals = [
    { id: 'fitness', title: 'High Energy Fitness & Sweat', desc: 'Burn calories while jamming to explosive beats', icon: Flame, color: 'bg-[#D900FF] text-black' },
    { id: 'stage', title: 'Stage Confidence & Swag', desc: 'Learn performance attitude, lines & isolations', icon: Zap, color: 'bg-[#1F41FF] text-white' },
    { id: 'event', title: 'Wedding / Sangeet Performance', desc: 'Choreography for couples, family & flashmobs', icon: Sparkles, color: 'bg-[#F59E0B] text-black' },
    { id: 'grace', title: 'Graceful Expression & Storytelling', desc: 'Fluid movement, floorwork & emotional range', icon: Music, color: 'bg-[#D0FBF9] text-black' }
  ];

  const vibes = [
    { id: 'hiphop', title: 'Urban Beats & Street Style', styleName: 'Urban Hip-Hop & Grooves', price: 499 },
    { id: 'bolly', title: 'Bolly-Hop & Desi Energy', styleName: 'Bollywood Commercial Fusion', price: 450 },
    { id: 'sangeet', title: 'Bollywood Sangeet Magic', styleName: 'Royal Sangeet Choreography', price: 14999 },
    { id: 'contemporary', title: 'Contemporary & Soulful', styleName: 'Contemporary Storytelling', price: 550 },
    { id: 'heels', title: 'Fierce Heels & Commercial', styleName: 'High Heels Commercial', price: 599 }
  ];

  const getRecommendation = () => {
    if (goal === 'event') return vibes.find(v => v.id === 'sangeet');
    if (goal === 'grace') return vibes.find(v => v.id === 'contemporary');
    if (vibe === 'hiphop') return vibes.find(v => v.id === 'hiphop');
    if (vibe === 'heels') return vibes.find(v => v.id === 'heels');
    return vibes.find(v => v.id === 'bolly');
  };

  const handleReset = () => {
    setStep(1);
    setGoal('');
    setVibe('');
    setLevel('');
  };

  const matchedStyle = getRecommendation();

  return (
    <section id="quiz" className="py-20 bg-[#D0FBF9] text-[#000000] border-b border-[#000000] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="px-3 py-1 bg-[#000000] text-[#D0FBF9] text-xs font-extrabold uppercase tracking-widest inline-block">
            INTERACTIVE STYLE FINDER
          </span>
          <h2 className="text-4xl sm:text-5xl font-display-giant uppercase tracking-tight text-[#000000]">
            FIND YOUR PERFECT RHYTHM
          </h2>
          <p className="text-sm font-semibold text-slate-800 max-w-xl mx-auto">
            Answer 3 quick questions to discover your ideal dance class style!
          </p>
        </div>

        {/* Quiz Container Card (Crisp White Block for High Contrast) */}
        <div className="bg-[#FFFFFF] border-2 border-[#000000] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              {step <= 3 ? `Question ${step} of 3` : 'Your Style Recommendation'}
            </span>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-2.5 transition-all duration-300 ${
                    i === step ? 'w-10 bg-[#1F41FF]' : i < step ? 'w-4 bg-[#D900FF]' : 'w-4 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: Select Goal */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold uppercase font-display text-black">What is your primary dance goal?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goals.map((g) => {
                  const Icon = g.icon;
                  return (
                    <button
                      key={g.id}
                      onClick={() => { setGoal(g.id); setStep(2); }}
                      className={`p-5 bg-slate-50 border-2 border-slate-200 hover:border-[#1F41FF] text-left transition-all hover:translate-y-[-2px] flex items-start gap-4 group ${
                        goal === g.id ? 'border-[#1F41FF] bg-blue-50' : ''
                      }`}
                    >
                      <div className={`p-3 ${g.color} font-bold shadow-sm shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-extrabold text-black text-base uppercase font-display group-hover:text-[#1F41FF] transition-colors">
                          {g.title}
                        </div>
                        <div className="text-xs text-slate-600 font-medium mt-1">{g.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Music Preference */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold uppercase font-display text-black">What type of music gets your feet moving?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'hiphop', label: 'Commercial Hip-Hop & Afro Beats', desc: 'Groovy, bouncy & heavy basslines' },
                  { id: 'bolly', label: 'Bollywood Hits & Desi Fusion', desc: 'Desi swag, mass steps & festive energy' },
                  { id: 'contemporary', label: 'Instrumental & Emotional Melodies', desc: 'Soulful strings, fluid & deep beats' },
                  { id: 'heels', label: 'Pop & Commercial Diva Anthems', desc: 'Bold, confident & stylish choreography' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setVibe(item.id); setStep(3); }}
                    className="p-5 bg-slate-50 border-2 border-slate-200 hover:border-[#1F41FF] text-left transition-all hover:translate-y-[-2px]"
                  >
                    <div className="font-extrabold text-black text-base uppercase font-display">{item.label}</div>
                    <div className="text-xs text-slate-600 font-medium mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="text-xs font-bold text-slate-600 hover:text-black mt-4 underline block">
                ← Back to previous question
              </button>
            </div>
          )}

          {/* STEP 3: Experience Level */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold uppercase font-display text-black">What is your current dance experience level?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'beg', label: 'Absolute Beginner', sub: 'Zero experience needed!' },
                  { id: 'int', label: 'Intermediate', sub: 'I know basic grooves & steps' },
                  { id: 'adv', label: 'Advanced / Pro', sub: 'Looking for complex choreography' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setLevel(item.id); setStep(4); }}
                    className="p-5 bg-slate-50 border-2 border-slate-200 hover:border-[#1F41FF] text-center transition-all hover:translate-y-[-2px]"
                  >
                    <div className="font-extrabold text-black text-base uppercase font-display">{item.label}</div>
                    <div className="text-xs text-slate-600 font-medium mt-1">{item.sub}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="text-xs font-bold text-slate-600 hover:text-black mt-4 underline block">
                ← Back to previous question
              </button>
            </div>
          )}

          {/* STEP 4: Quiz Recommendation Result */}
          {step === 4 && matchedStyle && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 bg-[#1F41FF] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-extrabold text-[#D900FF] uppercase tracking-widest block">RECOMMENDED DANCE STYLE</span>
                <h3 className="text-3xl font-display-giant text-black uppercase mt-1">
                  {matchedStyle.styleName}
                </h3>
                <p className="text-sm font-semibold text-slate-700 max-w-md mx-auto mt-2">
                  This style builds your confidence, isolations, and musicality step-by-step!
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={() => onBookRecommendedStyle && onBookRecommendedStyle({
                    id: matchedStyle.id,
                    title: matchedStyle.styleName,
                    price: matchedStyle.price,
                    type: 'Recommended Pass'
                  })}
                  className="btn-blue text-sm py-4 px-8 uppercase font-bold tracking-wider"
                >
                  <span>Select & Book This Style</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>

                <button
                  onClick={handleReset}
                  className="px-5 py-4 bg-slate-200 hover:bg-slate-300 text-xs font-bold text-black border border-slate-300 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
