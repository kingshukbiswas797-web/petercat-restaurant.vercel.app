import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-between px-6 py-20 bg-peter-black overflow-hidden"
    >
      {/* Background Image: Atmospheric Dining Room */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/atmospheric_dining_room.png"
          alt="Peter Cat atmospheric dining room with warm amber stained glass lamps and turbaned stewards"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        {/* Layered Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-peter-black via-peter-black/60 to-peter-black/90" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      {/* Top Banner / Heritage Crest */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-b border-peter-brass/20 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-peter-gold/50 flex items-center justify-center bg-peter-charcoal/80">
            <span className="font-serif text-sm text-peter-gold font-bold">PC</span>
          </div>
          <div>
            <span className="text-peter-gold font-serif text-base tracking-widest block">
              PETER CAT
            </span>
            <span className="text-[10px] text-peter-offwhite/60 tracking-[0.25em] font-sans uppercase">
              18A Park Street • Kolkata 700016
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-peter-brass/30 bg-peter-charcoal/60 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-peter-offwhite/80 text-xs font-sans tracking-wider">
            Daily Dining: 11:00 AM – 11:15 PM • Strictly Walk-in
          </span>
        </div>
      </div>

      {/* Hero Headline & Editorial Narrative */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center my-auto py-12">
        <div className="inline-block px-4 py-1.5 rounded-full border border-peter-gold/30 bg-peter-charcoal/80 mb-6">
          <span className="text-peter-gold text-xs font-sans tracking-[0.3em] uppercase">
            EST. 1962 • PARK STREET INSTITUTION
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-gold-gradient tracking-[0.12em] uppercase mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          PETER CAT
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-peter-offwhite/90 max-w-2xl mb-4 leading-relaxed">
          Calcutta’s Timeless Culinary Sanctuary
        </p>

        <p className="text-peter-offwhite/70 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-10 font-light">
          Where amber glass lanterns glow, turbaned stewards glide with silver platters, and the unmistakable aroma of sizzling platters has captivated generations since 1962.
        </p>

        {/* Dual Luxury Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <a
            href="#catalogue"
            className="px-8 py-4 bg-peter-gold text-peter-black font-sans text-xs uppercase tracking-[0.25em] font-bold hover:bg-peter-offwhite transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.3)] text-center"
          >
            Explore the Catalogue
          </a>
          <a
            href="#experience"
            className="px-8 py-4 border border-peter-brass/60 text-peter-gold font-sans text-xs uppercase tracking-[0.25em] font-bold hover:bg-peter-brass/10 hover:border-peter-gold transition-all duration-300 text-center backdrop-blur-sm"
          >
            The Chelo Kebab Ritual
          </a>
        </div>
      </div>

      {/* Heritage Metrics Ribbon */}
      <div className="relative z-10 w-full max-w-5xl mx-auto pt-8 border-t border-peter-brass/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-serif text-peter-gold font-medium">1962</span>
            <span className="text-[11px] text-peter-offwhite/60 uppercase tracking-[0.2em] font-sans mt-1">Founded on Park St.</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-serif text-peter-gold font-medium">62+</span>
            <span className="text-[11px] text-peter-offwhite/60 uppercase tracking-[0.2em] font-sans mt-1">Years of Heritage</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-serif text-peter-gold font-medium">10M+</span>
            <span className="text-[11px] text-peter-offwhite/60 uppercase tracking-[0.2em] font-sans mt-1">Platters Served</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-serif text-peter-gold font-medium">#1</span>
            <span className="text-[11px] text-peter-offwhite/60 uppercase tracking-[0.2em] font-sans mt-1">Calcutta Icon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
