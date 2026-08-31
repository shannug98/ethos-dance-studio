import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';

export default function TrainerApplicationModal({ API_URL, onClose, onSuccess }) {
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
    <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn font-sans">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative my-8 text-slate-900">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0088FF]">Step {step} of 4</span>
            <h2 className="text-xl font-bold uppercase font-syne text-slate-900">Ethos Trainer Registration</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-[#0088FF] h-1.5 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {error && (
          <div className="m-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
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
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
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
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
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
                    placeholder="8341701113"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
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
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
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
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.fullName || !formData.email || !formData.phone}
                  className="px-6 py-3 bg-[#0088FF] hover:bg-[#0077EE] disabled:opacity-40 text-white font-bold uppercase text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  Next: Dance Info <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Dance Credentials */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Step 2 — Dance Styles &amp; Bio</h3>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Primary Dance Style *</label>
                <select
                  name="primaryDanceStyle"
                  value={formData.primaryDanceStyle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                >
                  <option value="Hip-Hop / Urban">Hip-Hop / Urban</option>
                  <option value="Contemporary">Contemporary</option>
                  <option value="Bollywood">Bollywood Choreography</option>
                  <option value="K-Pop">K-Pop</option>
                  <option value="Classical">Classical / Semiclassical</option>
                  <option value="Salsa">Salsa / Bachata</option>
                  <option value="Jazz">Jazz / Heels</option>
                  <option value="Zumba">Dance Fitness / Zumba</option>
                  <option value="Freestyle">Freestyle</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Secondary Styles</label>
                <input
                  type="text"
                  name="secondaryDanceStyles"
                  value={formData.secondaryDanceStyles}
                  onChange={handleChange}
                  placeholder="e.g. Popping, House, Sangeet Choreography"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Professional Bio &amp; Achievements</label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell Ethos students and admin about your dance journey, training background, and workshops."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Instagram Link</label>
                  <input
                    type="url"
                    name="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={handleChange}
                    placeholder="https://instagram.com/..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">YouTube Link</label>
                  <input
                    type="url"
                    name="youtubeUrl"
                    value={formData.youtubeUrl}
                    onChange={handleChange}
                    placeholder="https://youtube.com/..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold uppercase text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  Next: Experience <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Experience */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Step 3 — Professional Experience</h3>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Years of Experience</label>
                <input
                  type="number"
                  name="experienceYears"
                  min="0"
                  max="40"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Current Dance Studio / Academy (If any)</label>
                <input
                  type="text"
                  name="currentStudio"
                  value={formData.currentStudio}
                  onChange={handleChange}
                  placeholder="e.g. Freelance / Independent / Studio Name"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                />
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700 space-y-1">
                <p className="font-bold text-[#0088FF]">💡 Ethos Verification Note:</p>
                <p className="text-[11px] text-slate-600 font-medium">Upon submitting, your unique Application Code will be displayed on screen and dispatched to your WhatsApp number.</p>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 bg-[#0088FF] hover:bg-[#0077EE] text-white font-bold uppercase text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                >
                  Next: Audition Video <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Audition Video Submission */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Step 4 — Audition Video Submission</h3>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Provide a short video link (30s – 5m) demonstrating your dance execution and teaching style for Ethos Admin evaluation.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Audition Video Link (Instagram Reel / YouTube / Drive URL) *</label>
                <input
                  type="url"
                  name="videoUrl"
                  required
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=... or Instagram Reel URL"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-[#0088FF] focus:bg-white focus:outline-none font-medium"
                />
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verification &amp; WhatsApp Notification
                </div>
                <ul className="space-y-1 text-emerald-700 text-[11px] font-medium list-disc list-inside">
                  <li>Your application code will be generated immediately</li>
                  <li>WhatsApp confirmation will be sent to <strong>{formData.phone || 'your mobile number'}</strong></li>
                </ul>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.videoUrl}
                  className="px-8 py-3.5 bg-[#0088FF] hover:bg-[#0077EE] disabled:opacity-50 text-white font-black uppercase tracking-wider text-xs rounded-xl flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  {loading ? 'Submitting...' : 'Submit Application to Ethos'} <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
