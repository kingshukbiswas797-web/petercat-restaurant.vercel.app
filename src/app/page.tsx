import React from "react";
import MuseumEntrance from "@/components/MuseumEntrance";
import HeroSection from "@/components/HeroSection";
import SignatureExperience from "@/components/SignatureExperience";
import StoryTimeline from "@/components/StoryTimeline";
import AtmosphereSection from "@/components/AtmosphereSection";
import MenuCatalogue from "@/components/MenuCatalogue";
import VisitSection from "@/components/VisitSection";

/**
 * Peter Cat Kolkata — Established 1962 by founder Nitin Kothari.
 * Location: Stephen Court Building, 18A Park Street, Kolkata 700016.
 * Operational Hours: Monday – Sunday 11:00 AM – 11:15 PM daily.
 * Contact: +91 33 2229 8841.
 * Reservation Policy: Strictly walk-in; we do not accept reservations.
 */
export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-peter-black text-peter-offwhite overflow-x-hidden selection:bg-peter-gold selection:text-peter-black">
      {/* Screen-reader accessible landmark overview */}
      <div className="sr-only">
        <h1>Peter Cat Kolkata • Founded 1962 by Nitin Kothari</h1>
        <p>Stephen Court Building, 18A Park Street, Kolkata 700016</p>
        <p>Operating Hours: 11:00 AM – 11:15 PM Daily</p>
        <p>Telephone: +91 33 2229 8841</p>
        <p>Walk-in policy: We do not accept reservations.</p>
      </div>

      {/* Chapter 1: The Digital Museum Entrance (Pinned 4-Stage GSAP Scroll Choreography) */}
      <MuseumEntrance />

      {/* Chapter 2: Modern Editorial Luxury Restaurant Experience */}
      <div className="relative z-30 w-full bg-peter-black">
        {/* 1. Hero Section (Modern Homepage) */}
        <HeroSection />

        {/* 2. Signature Experience (The Chelo Kebab Anatomy & Platter) */}
        <SignatureExperience />

        {/* 3. The Story (A Timeline of Taste from 1962 to Present) */}
        <StoryTimeline />

        {/* 4. The Atmosphere (Sensory Ambiance & Editorial Pull Quote) */}
        <AtmosphereSection />

        {/* 5. The Catalogue (Dynamic Firestore Menu Showcase) */}
        <MenuCatalogue />

        {/* 6. Visit the Institution (Location, Hours, Sacred Walk-in Tradition & Footer) */}
        <VisitSection />
      </div>
    </main>
  );
}
