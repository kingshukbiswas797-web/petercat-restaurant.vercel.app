import React from "react";
import Image from "next/image";

interface SensoryPillar {
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

const SENSORY_PILLARS: SensoryPillar[] = [
  {
    title: "The Amber Glow",
    tagline: "Low-Hanging Stained Glass",
    description:
      "Intimate pools of golden light cast from custom fluted amber lampshades suspended low over dark wood tables, creating an atmosphere where secrets are whispered and memories linger.",
    icon: "🏮",
  },
  {
    title: "The Turbaned Stewards",
    tagline: "Courtly Hospitality",
    description:
      "Dressed in immaculate white Indian sherwanis and stately red-and-gold turbans, our stewards embody the courteous, dignified hospitality that has defined Calcutta fine dining since 1962.",
    icon: "🎩",
  },
  {
    title: "The Sizzling Cadence",
    tagline: "Theatre of Sound & Smoke",
    description:
      "The unmistakable crackle of blistering cast-iron platters weaving through the dining room amidst clouds of aromatic herb-butter smoke, an intoxicating sensory symphony.",
    icon: "🔥",
  },
  {
    title: "The Teakwood Heritage",
    tagline: "Sanctuary of Warmth",
    description:
      "Deep mahogany wall panelling, polished brass railings, and crimson leather booths shielded from the clamour of Park Street, welcoming diners into an eternal cocoon of comfort.",
    icon: "🪵",
  },
];

export default function AtmosphereSection() {
  return (
    <section
      id="atmosphere"
      className="relative py-28 sm:py-36 px-6 bg-peter-charcoal overflow-hidden border-t border-b border-peter-brass/20"
    >
      {/* Cinematic Background Banner */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/atmospheric_dining_room.png"
          alt="Peter Cat romantic atmospheric interior illuminated by amber lamps and candlelight"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-peter-charcoal via-peter-charcoal/90 to-peter-charcoal" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-peter-brass/30 bg-peter-black/60 mb-4">
            <span className="text-peter-gold text-xs font-sans uppercase tracking-[0.25em]">
              Sensory & Ambience
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-peter-offwhite tracking-wide mb-6">
            The Atmosphere
          </h2>
          <span className="text-xs uppercase tracking-[0.3em] text-peter-brass font-sans block mb-6">
            Calcutta’s Most Intimate Sanctuary
          </span>
        </div>

        {/* Editorial Pull-Quote */}
        <div className="max-w-4xl mx-auto text-center mb-24 p-8 sm:p-12 rounded-xl bg-peter-black/80 border border-peter-brass/30 shadow-2xl backdrop-blur-md relative">
          <div className="text-peter-gold font-serif text-5xl mb-4 opacity-40 leading-none">
            “
          </div>
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic text-peter-offwhite/95 leading-relaxed mb-6 font-light">
            Step off the bustling rhythm of Park Street into Peter Cat, and time slows down. Beneath the amber glass lanterns, the fragrance of sizzling platters and the quiet grace of turbaned stewards create Calcutta’s most timeless sanctuary.
          </blockquote>
          <p className="text-xs uppercase tracking-[0.25em] text-peter-gold font-sans font-semibold">
            This is somewhere you experience, not simply somewhere you eat.
          </p>
        </div>

        {/* 4 Core Sensory Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SENSORY_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 rounded-lg bg-peter-black/85 border border-peter-brass/25 hover:border-peter-gold/60 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-full border border-peter-gold/30 bg-peter-charcoal flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <span className="text-[10px] text-peter-brass uppercase tracking-[0.2em] font-sans block mb-1">
                  {pillar.tagline}
                </span>
                <h3 className="text-xl font-serif text-peter-gold mb-3 group-hover:text-peter-offwhite transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-peter-offwhite/70 font-light text-xs sm:text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-peter-brass/15 flex items-center justify-between text-[11px] text-peter-brass/70 font-sans">
                <span>The Ritual</span>
                <span>• Est. 1962</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
