import React from 'react';

export default function PackagesSection({ packages = [], onSelectPackage }) {
  const ethosPackages = [
    {
      id: 401,
      title: 'Free Demo Trial Pass',
      price: 0,
      billingCycle: '1 Session',
      type: 'Free Trial',
      isPopular: false,
      features: ['Monday - Friday Free Demo Trial', 'Valid for any 1 batch slot', 'Dance Fitness / Kids / Adults', '100% Free - No charges'],
      cta: 'Book Free Demo'
    },
    {
      id: 402,
      title: 'Kids Monthly Pass (4-12 Yrs)',
      price: 2000,
      billingCycle: 'Month',
      type: 'Kids Pass',
      isPopular: false,
      features: ['Choice of 4-6 Yrs (5 PM) or 6-12 Yrs (7 PM)', 'Monday - Friday Regular Batches', 'Stage Performance Showcase', 'Regular Progress Feedback'],
      cta: 'Join Kids Batch'
    },
    {
      id: 403,
      title: 'Adults / Fitness Monthly Pass',
      price: 2500,
      billingCycle: 'Month',
      type: 'Adults Pass',
      isPopular: true,
      features: ['Choice of Dance Fitness (7:30 AM)', 'Adults Beginner (9 AM / 6 PM)', 'Adults Advanced (8 PM)', 'Monday - Friday Regular Batches', '1 Free Demo Trial Included'],
      cta: 'Join Adults Batch'
    }
  ];

  return (
    <section id="packages" className="bg-[#000000] text-[#FFFFFF] py-20 border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D0FBF9] block mb-2">OFFICIAL ETHOS MEMBERSHIPS</span>
          <h2 className="text-4xl sm:text-6xl font-display-giant text-white uppercase tracking-tight">
            PRICING PASSES (INR)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ethosPackages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onSelectPackage && onSelectPackage({ id: pkg.id, title: pkg.title, price: pkg.price, type: pkg.type })}
              className={`p-8 border flex flex-col justify-between cursor-pointer transition-all ${
                pkg.isPopular
                  ? 'bg-[#1F41FF] text-white border-[#1F41FF]'
                  : 'bg-[#111111] text-white border-[#333333] hover:border-slate-500'
              }`}
            >
              <div>
                {pkg.isPopular && (
                  <span className="px-3 py-1 bg-[#D0FBF9] text-[#000000] text-[10px] font-extrabold uppercase mb-4 inline-block">
                    MOST POPULAR BATCH PASS
                  </span>
                )}
                
                <h3 className="text-2xl font-extrabold uppercase font-display mb-4">{pkg.title}</h3>
                
                <div className="mb-6">
                  <span className="text-4xl font-black font-display">₹{pkg.price}</span>
                  <span className="text-xs opacity-80 ml-1">/ {pkg.billingCycle}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/20 text-xs mb-6">
                  {pkg.features.map((feat, i) => (
                    <div key={i}>✓ {feat}</div>
                  ))}
                </div>
              </div>

              <div className="text-xs font-extrabold uppercase tracking-wider text-right underline opacity-90">
                Click to Checkout →
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
