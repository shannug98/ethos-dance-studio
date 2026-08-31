import React, { useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, ChevronRight, Video, User, Award, ShieldCheck } from 'lucide-react';

export default function TrainerApplicationPage({ API_URL, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Hyderabad',
    profilePhotoUrl: '',
    primaryDanceStyle: 'Hip-Hop / Urban',
    secondaryDanceStyles: 'Contemporary, Commercial',
    experienceYears: 5,
    currentStudio: '',
    bio: '',
    instagramUrl: '',
    youtubeUrl: '',
    videoUrl: '',
    videoType: 'URL'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`http://localhost:5152/api/trainers/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const responseText = await res.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonErr) {
        throw new Error("Server error: " + responseText.substring(0, 150));
      }

      if (!res.ok) throw new Error(data.message || 'Failed to submit application.');

      onSuccess(data);
    } catch (err) {
      setError(err.message || 'Application submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 pt-24 pb-16 px-4 sm:px-6 font-sans flex items-center justify-center">
      <div className="bg-white border-2 border-slate-200 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden text-slate-900 my-auto">
        
        {/* Header Bar */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0088FF]/10 border border-[#0088FF]/30 flex items-center justify-center text-[#0088FF] font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0088FF]">Step {step} of 4</span>
              <h2 className="text-xl sm:text-2xl font-black uppercase font-syne text-slate-900">Ethos Trainer Registration</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Cancel &amp; Back
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2">
          <div
            className="bg-[#0088FF] h-2 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step Indicator Badges */}
        <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold uppercase overflow-x-auto gap-2">
          {[
            { num: 1, label: '1. Personal' },
            { num: 2, label: '2. Dance Info' },
            { num: 3, label: '3. Audition Video' },
            { num: 4, label: '4. Review' }
          ].map(s => (
            <button
              key={s.num}
              onClick={() => s.num < step && setStep(s.num)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                step === s.num
                  ? 'bg-[#0088FF] text-white font-black shadow-xs'
                  : step > s.num
                  ? 'bg-emerald-100 text-emerald-700 font-bold'
                  : 'text-slate-400'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="m-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Step 1 — Personal Information</h3>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Shanmuka Gaddam"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="shanmukagaddam98@gmail.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">WhatsApp Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Hyderabad"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Profile Photo URL (Optional)</label>
                  <input
                    type="url"
                    name="profilePhotoUrl"
                    value={formData.profilePhotoUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  disabled={!formData.fullName || !formData.email || !formData.phone}
                  onClick={() => setStep(2)}
                  className="px-6 py-3.5 bg-[#0088FF] hover:bg-[#0077EE] disabled:opacity-50 text-white font-bold uppercase text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  Next: Dance Info <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Dance Experience */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Step 2 — Dance Style &amp; Experience</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Primary Dance Style *</label>
                  <select
                    name="primaryDanceStyle"
                    value={formData.primaryDanceStyle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                  >
                    <option value="Hip-Hop / Urban">Hip-Hop / Urban</option>
                    <option value="Commercial Bollywood">Commercial Bollywood</option>
                    <option value="Contemporary Fusion">Contemporary Fusion</option>
                    <option value="Classical / Bharatanatyam">Classical / Bharatanatyam</option>
                    <option value="K-Pop Choreography">K-Pop Choreography</option>
                    <option value="Sangeet / Event Choreography">Sangeet / Event Choreography</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Years of Teaching Experience *</label>
                  <input
                    type="number"
                    name="experienceYears"
                    min="1"
                    max="30"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Secondary Styles</label>
                <input
                  type="text"
                  name="secondaryDanceStyles"
                  value={formData.secondaryDanceStyles}
                  onChange={handleChange}
                  placeholder="e.g. House, Popping, Krump"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Trainer Bio &amp; Achievements</label>
                <textarea
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Brief summary of your dance background, workshops conducted, awards..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3.5 bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold uppercase text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                >
                  Next: Audition &amp; Social <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Audition & Social Links */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Step 3 — Video Audition &amp; Portfolio</h3>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Dance Audition / Video Reel URL *</label>
                <input
                  type="url"
                  name="videoUrl"
                  required
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=... or Google Drive link"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Link your choreography reel or workshop recording for Ethos admin evaluation.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Instagram Handle / URL</label>
                  <input
                    type="text"
                    name="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={handleChange}
                    placeholder="@shanmuka_dance"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">YouTube Channel URL</label>
                  <input
                    type="url"
                    name="youtubeUrl"
                    value={formData.youtubeUrl}
                    onChange={handleChange}
                    placeholder="https://youtube.com/@..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  disabled={!formData.videoUrl}
                  onClick={() => setStep(4)}
                  className="px-6 py-3.5 bg-[#0088FF] hover:bg-[#0077EE] disabled:opacity-50 text-white font-bold uppercase text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer"
                >
                  Review Application <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Step 4 — Review Your Application</h3>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-bold">Applicant Name</span>
                  <span className="font-bold text-slate-900">{formData.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-bold">Contact</span>
                  <span className="font-bold text-slate-900">{formData.phone} • {formData.email}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-bold">Primary Style</span>
                  <span className="font-bold text-[#0088FF]">{formData.primaryDanceStyle}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-bold">Teaching Experience</span>
                  <span className="font-bold text-slate-900">{formData.experienceYears} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">Audition Reel</span>
                  <span className="font-bold text-slate-900 truncate max-w-xs">{formData.videoUrl}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                >
                  ← Edit Video Link
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black uppercase text-xs rounded-xl flex items-center gap-2 shadow-xl shadow-emerald-600/30 cursor-pointer"
                >
                  {loading ? 'Submitting Application...' : 'Submit Application to Ethos Admin 🎉'}
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
