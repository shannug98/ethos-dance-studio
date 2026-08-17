import React from 'react';

export default function PackagesSection({ packages = [], onSelectPackage }) {
  const defaultPackages = [
    {
      id: 401,
      title: 'Single Drop-in Pass',
      price: 499,
      billingCycle: 'Session',
      type: 'Single Pass',
      isPopular: false,
      features: ['1 Regular Class Session', 'Valid for any dance style', 'Studio locker access', '7-day validity'],
      cta: 'Select & Book'
    },
    {
      id: 402,
      title: 'Monthly All-Access VIP Pass',
      price: 3499,
      billingCycle: 'Month',
      type: 'Monthly Pass',
      isPopular: true,
      features: ['Unlimited Weekly Regular Classes', '1 Free Masterclass Workshop/mo', 'Priority Studio Slot Booking', '10% Off Sangeet Packages', 'Free Practice Room Hour/week'],
      cta: 'Select & Book'
    },
    {
      id: 403,
      title: '10-Class Flex Pass',
      price: 3999,
      billingCycle: 'Pack of 10',
      type: 'Flexi Pass',
      isPopular: false,
      features: ['10 Regular Class Credits', 'Mix & Match any Dance Style', 'Valid for 60 Days', 'Shareable with 1 Friend'],
      cta: 'Select & Book'
    }
  ];

  const packageList = packages.length > 0 ? packages.map(p => ({
    ...p,
    features: p.featuresJson ? JSON.parse(p.featuresJson) : p.features || []
  })) : defaultPackages;

  return (
    <section id="packages" className="bg-[#000000] text-[#FFFFFF] py-20 border-b border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D0FBF9] block mb-2">MEMBERSHIP & PASSES</span>
          <h2 className="text-4xl sm:text-6xl font-display-giant text-white uppercase tracking-tight">
            PRICING PASSES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packageList.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => onSelectPackage && onSelectPackage({ id: pkg.id, title: pkg.title, price: pkg.price, type: pkg.type || 'Pass' })}
              className={`p-8 border flex flex-col justify-between cursor-pointer transition-all ${
                pkg.isPopular
                  ? 'bg-[#1F41FF] text-white border-[#1F41FF]'
                  : 'bg-[#111111] text-white border-[#333333] hover:border-slate-500'
              }`}
            >
              <div>
                {pkg.isPopular && (
                  <span className="px-3 py-1 bg-[#D0FBF9] text-[#000000] text-[10px] font-extrabold uppercase mb-4 inline-block">
                    BEST VALUE PASS
                  </span>
                )}
                
                <h3 className="text-2xl font-extrabold uppercase font-display mb-4">{pkg.title}</h3>
                
                <div className="mb-6">
                  <span className="text-4xl font-black font-display">₹{pkg.price}</span>
                  <span className="text-xs opacity-80 ml-1">/ {pkg.billingCycle || 'month'}</span>
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
