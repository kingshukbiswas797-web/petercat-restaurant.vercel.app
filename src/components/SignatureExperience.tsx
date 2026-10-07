"use client";

import React, { useState } from "react";
import Image from "next/image";

interface AnatomyPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ritualNote: string;
  icon: string;
}

const ANATOMY_PILLARS: AnatomyPillar[] = [
  {
    id: "rice",
    title: "Butter-Glazed Rice",
    subtitle: "Aromatic Persian Saffron Basmati",
    description:
      "A generous steaming bed of long-grain basmati rice, steamed to fluffy separation and crowned with a thick square pat of fresh salted table butter that melts into the grains.",
    ritualNote: "Mix the melting butter immediately into the hot rice before your first bite.",
    icon: "🍚",
  },
  {
    id: "egg",
    title: "Golden Sunny-Side Yolk",
    subtitle: "The Signature Emulsifier",
    description:
      "A pristine sunny-side-up fried egg rested atop the rice. The velvety, rich runny yolk serves as nature's most decadent sauce, binding the grains with golden silkiness.",
    ritualNote: "Pierce the yolk with your fork, letting the warm yellow velvet cascade across the buttered rice.",
    icon: "🍳",
  },
  {
    id: "mutton",
    title: "Charcoal-Charred Mutton Seekh",
    subtitle: "Heritage Spiced Kebabs",
    description:
      "Finely minced prime mutton blended with Nitin Kothari's closely guarded spice formulation from the 1970s, skewered and charred over red-hot coals with deep caramelized grill marks.",
    ritualNote: "Tear a tender morsel of mutton seekh and fold it into a spoonful of the egg-and-butter basmati.",
    icon: "🍢",
  },
  {
    id: "tomato",
    title: "Fire-Blistered Tomato & Chili",
    subtitle: "Charred Acidity & Smoke",
    description:
      "A whole ripe red tomato and green chili blistered over open flames until the skin splits, imparting an essential burst of tart, smoky sweetness that cuts through the rich butter.",
    ritualNote: "Crush the charred tomato against the edge of the oval silver platter to release its juices.",
    icon: "🍅",
  },
];

export default function SignatureExperience() {
  const [activePillar, setActivePillar] = useState<string>("rice");

  const currentPillar = ANATOMY_PILLARS.find((p) => p.id === activePillar) || ANATOMY_PILLARS[0];

  return (
    <section
      id="experience"
      className="relative py-28 sm:py-36 px-6 bg-peter-charcoal border-t border-b border-peter-brass/20 overflow-hidden"
    >
      {/* Decorative background brass filigree motifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(212,175,55,0.06)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle,_rgba(181,166,66,0.05)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-peter-gold/30 bg-peter-black/60 mb-4">
            <span className="text-peter-gold text-xs font-sans uppercase tracking-[0.25em]">
              The Culinary Crown Jewel • Est. 1975
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-peter-offwhite tracking-wide mb-6">
            THE CHELO KEBAB
          </h2>
          <p className="text-peter-offwhite/75 font-serif italic text-lg sm:text-xl leading-relaxed">
            A protected culinary secret, an immutable Park Street tradition, and a sacred rite of passage for every visitor to Calcutta.
          </p>
        </div>

        {/* 2-Column Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase Frame with Brass Accents */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] rounded-lg p-3 bg-peter-black border border-peter-brass/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group">
              {/* Filigree corner brackets */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-peter-gold pointer-events-none" />
              <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-peter-gold pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-peter-gold pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-peter-gold pointer-events-none" />

              {/* Responsive Image Wrapper */}
              <div className="relative w-full h-full overflow-hidden rounded">
                <Image
                  src="/images/chelo_kebab.png"
                  alt="Cinematic presentation of Peter Cat's signature Chelo Kebab on oval silver platter with buttered rice, poached egg, and charcoal seekh kebabs"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-peter-black/80 via-transparent to-transparent opacity-80" />

                {/* Platter Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded bg-peter-black/80 border border-peter-gold/40 text-peter-gold text-xs font-sans tracking-widest uppercase backdrop-blur-md">
                    Oval Silver Platter
                  </span>
                  <span className="text-peter-offwhite font-serif text-lg text-gold-gradient font-bold">
                    ₹495
                  </span>
                </div>
              </div>
            </div>

            {/* Platter Lore Caption */}
            <p className="mt-5 text-center text-xs text-peter-offwhite/60 font-sans tracking-wider uppercase">
              Served piping hot with table butter • Prepared fresh to order since 1975
            </p>
          </div>

          {/* Right Column: Culinary Secret & Interactive Anatomy of a Legend */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="text-peter-gold uppercase tracking-[0.3em] text-xs font-sans mb-3">
              Anatomy of a Legend
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-peter-offwhite mb-6">
              The Four Sacred Elements
            </h3>
            <p className="text-peter-offwhite/70 font-light leading-relaxed text-sm sm:text-base mb-8">
              Conceived in the mid-1970s by Nitin Kothari, Peter Cat’s Chelo Kebab married Persian kebabi heritage with Calcutta’s appetite for theatrical warmth. Every component plays a precise sensory role.
            </p>

            {/* Interactive Anatomy Pillar Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {ANATOMY_PILLARS.map((pillar) => {
                const isSelected = activePillar === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillar(pillar.id)}
                    className={`px-3 py-3 rounded text-left transition-all duration-300 border flex flex-col justify-between ${
                      isSelected
                        ? "bg-peter-black border-peter-gold shadow-[0_0_15px_rgba(212,175,55,0.25)] text-peter-gold"
                        : "bg-peter-charcoal border-peter-brass/20 text-peter-offwhite/70 hover:border-peter-brass/50 hover:text-peter-offwhite"
                    }`}
                  >
                    <span className="text-lg mb-1">{pillar.icon}</span>
                    <span className="text-xs font-sans uppercase tracking-wider font-semibold line-clamp-1">
                      {pillar.title.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Detail Card */}
            <div className="p-6 rounded-lg bg-peter-black/90 border border-peter-brass/30 relative">
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="text-xl sm:text-2xl font-serif text-peter-gold">
                  {currentPillar.title}
                </h4>
                <span className="text-xs text-peter-brass/80 font-sans uppercase tracking-widest">
                  {currentPillar.subtitle}
                </span>
              </div>

              <p className="text-peter-offwhite/80 font-light text-sm sm:text-base leading-relaxed mb-4">
                {currentPillar.description}
              </p>

              <div className="p-3 rounded bg-peter-charcoal/80 border-l-2 border-peter-gold flex items-start gap-3">
                <span className="text-peter-gold text-xs font-sans uppercase tracking-widest font-semibold shrink-0 mt-0.5">
                  The Ritual:
                </span>
                <p className="text-peter-offwhite/90 text-xs italic font-serif">
                  {currentPillar.ritualNote}
                </p>
              </div>
            </div>

            {/* Action Link to Full Menu */}
            <div className="mt-8 flex items-center gap-6">
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 text-peter-gold uppercase tracking-[0.25em] text-xs font-bold hover:text-peter-offwhite transition-colors border-b border-peter-gold pb-1"
              >
                <span>View in Catalogue</span>
                <span>→</span>
              </a>
              <span className="text-xs text-peter-offwhite/40 font-sans">
                Also available in All-Mutton Special
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
