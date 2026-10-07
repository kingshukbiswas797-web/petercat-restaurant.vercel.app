import React from "react";

export default function VisitSection() {
  return (
    <footer
      id="visit"
      className="relative py-28 sm:py-36 px-6 bg-peter-black border-t border-peter-brass/25 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-peter-gold/30 bg-peter-charcoal/80 mb-4">
            <span className="text-peter-gold text-xs font-sans uppercase tracking-[0.25em]">
              The Sacred Address • Est. 1962
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-peter-gold tracking-wide mb-6">
            Visit the Institution
          </h2>
          <p className="text-peter-offwhite/75 font-serif italic text-lg sm:text-xl leading-relaxed">
            Where Park Street’s golden era continues uninterrupted every day of the week.
          </p>
        </div>

        {/* 3-Column Logistics & Planning Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 w-full border-t border-b border-peter-brass/20 py-16">
          {/* 1. Location Card */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-12 h-12 rounded-full border border-peter-gold/40 bg-peter-charcoal flex items-center justify-center text-xl mb-6 text-peter-gold">
              📍
            </div>
            <h4 className="text-2xl font-serif text-peter-offwhite mb-4">
              Physical Location
            </h4>
            <p className="text-peter-offwhite/75 font-light text-sm sm:text-base leading-relaxed mb-6">
              18A, Park Street<br />
              Stephen Court Building<br />
              Kolkata, West Bengal 700016
            </p>
            <a
              href="https://maps.google.com/?q=Peter+Cat+18A+Park+Street+Kolkata+700016"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-peter-gold uppercase tracking-[0.2em] text-xs font-bold border-b border-peter-gold pb-1 hover:text-peter-offwhite transition-colors"
            >
              <span>Get Directions</span>
              <span>→</span>
            </a>
          </div>

          {/* 2. Operating Hours & Walk-in Policy */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-12 h-12 rounded-full border border-peter-gold/40 bg-peter-charcoal flex items-center justify-center text-xl mb-6 text-peter-gold">
              ⏰
            </div>
            <h4 className="text-2xl font-serif text-peter-offwhite mb-4">
              Dining Hours
            </h4>
            <p className="text-peter-offwhite/75 font-light text-sm sm:text-base leading-relaxed mb-4">
              Monday – Sunday<br />
              11:00 AM – 11:15 PM Daily
            </p>
            <div className="p-4 rounded bg-peter-charcoal/80 border border-peter-brass/20 text-xs text-peter-offwhite/70 leading-relaxed">
              <strong className="text-peter-gold block uppercase tracking-wider mb-1 font-sans">
                The Sacred Walk-in Tradition:
              </strong>
              We do not accept reservations. Tables are assigned strictly on a first-come, first-served walk-in basis. The queue outside on Park Street is part of the Calcutta ritual.
            </div>
          </div>

          {/* 3. Telephone & Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-12 h-12 rounded-full border border-peter-gold/40 bg-peter-charcoal flex items-center justify-center text-xl mb-6 text-peter-gold">
              ☎️
            </div>
            <h4 className="text-2xl font-serif text-peter-offwhite mb-4">
              Telephone & Enquiries
            </h4>
            <p className="text-peter-offwhite/75 font-light text-sm sm:text-base leading-relaxed mb-6">
              Telephone: <a href="tel:+913322298841" className="text-peter-gold hover:underline font-mono">+91 33 2229 8841</a><br />
              Telephone: <a href="tel:+913322298842" className="text-peter-gold hover:underline font-mono">+91 33 2229 8842</a><br />
              Email: enquiries@petercatkolkata.in
            </p>
            <span className="text-xs text-peter-brass uppercase tracking-wider font-sans">
              Park Street Dining • Est. 1962
            </span>
          </div>
        </div>

        {/* Monogram Crest & Heritage Seal Footer */}
        <div className="mt-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full border-2 border-peter-brass/60 flex items-center justify-center mb-6 bg-peter-charcoal/60 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <span className="font-serif text-3xl text-peter-gold font-bold tracking-wider">
              PC
            </span>
          </div>

          <h3 className="text-2xl font-serif text-peter-gold tracking-[0.2em] mb-2 uppercase">
            Peter Cat
          </h3>

          <p className="text-xs text-peter-offwhite/60 font-sans tracking-[0.25em] uppercase mb-8">
            Stephen Court • 18A Park Street • Kolkata 700016
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-peter-offwhite/50 uppercase tracking-widest font-sans mb-10">
            <a href="#hero" className="hover:text-peter-gold transition-colors">Return to Top</a>
            <span>•</span>
            <a href="#experience" className="hover:text-peter-gold transition-colors">The Chelo Kebab</a>
            <span>•</span>
            <a href="#story" className="hover:text-peter-gold transition-colors">Our Story</a>
            <span>•</span>
            <a href="#atmosphere" className="hover:text-peter-gold transition-colors">Ambiance</a>
            <span>•</span>
            <a href="#catalogue" className="hover:text-peter-gold transition-colors">Catalogue</a>
          </div>

          <p className="text-[11px] uppercase tracking-[0.3em] font-sans text-peter-offwhite/40">
            © 1962 – 2026 Peter Cat Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
