"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MuseumEntrance() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const leftWallRef = useRef<HTMLDivElement>(null);
  const rightWallRef = useRef<HTMLDivElement>(null);
  const doorContainerRef = useRef<HTMLDivElement>(null);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const portalLightRef = useRef<HTMLDivElement>(null);
  const guideCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !viewportRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Graceful fallback for users requesting reduced motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (introTextRef.current) gsap.set(introTextRef.current, { opacity: 0 });
        if (leftWallRef.current) gsap.set(leftWallRef.current, { opacity: 0 });
        if (rightWallRef.current) gsap.set(rightWallRef.current, { opacity: 0 });
        if (doorContainerRef.current) gsap.set(doorContainerRef.current, { opacity: 0 });
        if (portalLightRef.current) gsap.set(portalLightRef.current, { opacity: 0 });
        if (guideCueRef.current) gsap.set(guideCueRef.current, { opacity: 0 });
      });

      // Standard cinematic 4-stage choreography
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=3500",
            pin: viewportRef.current,
            pinSpacing: true,
            scrub: 1.2,
            onLeave: () => {
              // Smooth unpin handoff to allow fluid page interaction
              if (viewportRef.current) {
                viewportRef.current.classList.add("pointer-events-none");
              }
            },
            onEnterBack: () => {
              if (viewportRef.current) {
                viewportRef.current.classList.remove("pointer-events-none");
              }
            },
          },
        });

        // Initial setup
        gsap.set(leftWallRef.current, {
          xPercent: -40,
          scale: 0.8,
          opacity: 0,
          rotateY: 25,
        });
        gsap.set(rightWallRef.current, {
          xPercent: 40,
          scale: 0.8,
          opacity: 0,
          rotateY: -25,
        });
        gsap.set(doorContainerRef.current, {
          scale: 0.65,
          opacity: 0.1,
          z: -400,
        });
        gsap.set(portalLightRef.current, {
          opacity: 0,
          scale: 0.8,
        });

        // Stage 1: (0% - 20%) Threshold & Intro text dissolve
        tl.to(introTextRef.current, {
          opacity: 0,
          y: -60,
          scale: 0.92,
          filter: "blur(12px)",
          ease: "power2.inOut",
          duration: 1.5,
        }, 0)
        .to(guideCueRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.8,
        }, 0);

        // Stage 2: (15% - 55%) Lateral Heritage Walls fly past camera
        tl.to(leftWallRef.current, {
          opacity: 1,
          xPercent: 0,
          scale: 1,
          rotateY: 15,
          ease: "power1.out",
          duration: 1.8,
        }, 0.8)
        .to(rightWallRef.current, {
          opacity: 1,
          xPercent: 0,
          scale: 1,
          rotateY: -15,
          ease: "power1.out",
          duration: 1.8,
        }, 0.8)
        // Walls rush backwards beyond viewport
        .to(leftWallRef.current, {
          xPercent: -130,
          scale: 2.4,
          opacity: 0,
          ease: "power2.in",
          duration: 2.2,
        }, 2.6)
        .to(rightWallRef.current, {
          xPercent: 130,
          scale: 2.4,
          opacity: 0,
          ease: "power2.in",
          duration: 2.2,
        }, 2.6);

        // Stage 3: (50% - 85%) Grand Double Doors approach, 3D swing open, and zoom
        tl.to(doorContainerRef.current, {
          opacity: 1,
          scale: 1.05,
          z: 0,
          ease: "power1.out",
          duration: 2.5,
        }, 2.5)
        .to(doorLeftRef.current, {
          rotateY: -95,
          ease: "power2.inOut",
          duration: 2.2,
        }, 4.2)
        .to(doorRightRef.current, {
          rotateY: 95,
          ease: "power2.inOut",
          duration: 2.2,
        }, 4.2)
        // Camera plunges through the parted doorway
        .to(doorContainerRef.current, {
          scale: 4.8,
          opacity: 0,
          ease: "power2.in",
          duration: 2.4,
        }, 5.0);

        // Stage 4: (75% - 100%) Golden light spill burst revealing the modern restaurant
        tl.to(portalLightRef.current, {
          opacity: 0.95,
          scale: 1.6,
          ease: "power2.out",
          duration: 1.8,
        }, 5.2)
        .to(portalLightRef.current, {
          opacity: 0,
          scale: 2.2,
          ease: "power1.in",
          duration: 1.5,
        }, 6.8);
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400vh] bg-peter-black z-30"
      aria-label="Digital Museum Entrance"
    >
      {/* Sticky Viewport Container */}
      <div
        ref={viewportRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[1200px] pointer-events-auto bg-peter-black"
        style={{ perspective: "1200px" }}
      >
        {/* Ambient atmospheric vignette overlay */}
        <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none z-10" />

        {/* Subtle colonial grain/noise overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none z-10" />

        {/* Stage 1: Threshold Intro Banner */}
        <div
          ref={introTextRef}
          className="intro-text-fade absolute z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center pointer-events-auto"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-peter-gold/30 bg-peter-charcoal/70 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-peter-gold animate-pulse" />
            <span className="text-peter-gold text-xs font-sans uppercase tracking-[0.25em]">
              The Digital Museum Entrance • Chapter 1
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-gold-gradient tracking-[0.15em] mb-6 drop-shadow-[0_4px_30px_rgba(212,175,55,0.2)]">
            ENTER THE LEGEND
          </h1>

          <p className="text-peter-offwhite/80 font-serif italic text-lg sm:text-xl md:text-2xl tracking-wide max-w-2xl mb-8">
            Walk deeper into sixty years of Park Street culinary lore.
          </p>

          <p className="text-peter-brass text-xs uppercase tracking-[0.3em] font-sans">
            EST. 1962 • 18A PARK STREET, KOLKATA
          </p>
        </div>

        {/* Scroll cue indicator */}
        <div
          ref={guideCueRef}
          className="absolute bottom-10 z-20 flex flex-col items-center gap-2 pointer-events-none opacity-80"
        >
          <span className="text-peter-gold/70 text-[11px] font-sans uppercase tracking-[0.3em]">
            Scroll to Walk Inside
          </span>
          <div className="w-5 h-8 rounded-full border border-peter-gold/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-peter-gold animate-bounce" />
          </div>
        </div>

        {/* Stage 2 Left Wall: Archival 1962 Menu & Heritage Photos */}
        <div
          ref={leftWallRef}
          className="museum-wall-left absolute left-4 sm:left-10 md:left-20 top-1/4 z-15 flex flex-col items-center pointer-events-auto max-w-xs sm:max-w-sm"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-lg p-2.5 bg-peter-charcoal/90 border border-peter-brass/40 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-md">
            <div className="relative w-full h-full overflow-hidden rounded border border-peter-brass/20">
              <Image
                src="/images/heritage_menu_archive.png"
                alt="Peter Cat 1962 Archival Menu artifact and historical memorabilia"
                fill
                sizes="(max-width: 768px) 256px, 288px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-peter-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[10px] text-peter-gold uppercase tracking-[0.25em] font-sans block mb-1">
                  Park Street Archives
                </span>
                <p className="text-peter-offwhite font-serif text-sm">
                  The Opening Menu • 1962
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 2 Right Wall: Vintage Glowing Neon Sign */}
        <div
          ref={rightWallRef}
          className="museum-wall-right absolute right-4 sm:right-10 md:right-20 top-1/4 z-15 flex flex-col items-center pointer-events-auto max-w-xs sm:max-w-sm"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-lg p-2.5 bg-peter-charcoal/90 border border-peter-brass/40 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-md">
            <div className="relative w-full h-full overflow-hidden rounded border border-peter-brass/20">
              <Image
                src="/images/vintage_peter_cat_sign.png"
                alt="Vintage Peter Cat glowing neon sign on Park Street Kolkata at night"
                fill
                sizes="(max-width: 768px) 256px, 288px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-peter-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="text-[10px] text-peter-gold uppercase tracking-[0.25em] font-sans block mb-1">
                  Iconic Street Front
                </span>
                <p className="text-peter-offwhite font-serif text-sm">
                  Vintage Neon Sign • Park Street
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 3: Grand Double Entrance Door Portal */}
        <div
          ref={doorContainerRef}
          className="door-container absolute inset-0 flex items-center justify-center z-16 pointer-events-auto"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-[92vw] sm:w-[80vw] md:w-[70vw] max-w-4xl h-[75vh] sm:h-[80vh] flex flex-col items-center justify-center">
            {/* Arched Transom Window */}
            <div className="w-full h-28 sm:h-36 rounded-t-[120px] bg-gradient-to-b from-peter-charcoal to-peter-black border-t-2 border-x-2 border-peter-brass/60 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-peter-gold/25 via-transparent to-transparent" />
              <span className="text-peter-brass text-xs tracking-[0.4em] uppercase font-sans mb-1">
                Kolkata Heritage Sanctuary
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-peter-gold tracking-[0.25em]">
                PETER CAT
              </h2>
              <span className="text-[11px] text-peter-offwhite/50 tracking-[0.3em] font-serif mt-1">
                ANNO 1962
              </span>
            </div>

            {/* Double Door 3D Swing Panels */}
            <div
              className="w-full flex-1 flex relative border-x-2 border-b-2 border-peter-brass/60 rounded-b-md overflow-hidden bg-peter-charcoal"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              {/* Left Door Leaf */}
              <div
                ref={doorLeftRef}
                className="door-left-panel relative w-1/2 h-full bg-[#12100E] border-r border-peter-brass/50 flex items-center justify-end pr-4 sm:pr-8 shadow-2xl"
                style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
              >
                {/* Door Wood Paneling Visual */}
                <div className="absolute inset-0 opacity-40">
                  <Image
                    src="/images/museum_entrance_door.png"
                    alt="Grand dark teakwood entrance door panel left"
                    fill
                    sizes="50vw"
                    className="object-cover object-left"
                  />
                </div>
                <div className="absolute inset-4 border border-peter-brass/30 rounded pointer-events-none" />
                {/* Brass Door Handle */}
                <div className="relative z-10 w-4 sm:w-6 h-28 sm:h-36 rounded-full bg-gradient-to-r from-peter-brass via-peter-gold to-peter-brass shadow-[0_0_15px_rgba(212,175,55,0.6)] flex items-center justify-center">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-peter-black/60" />
                </div>
              </div>

              {/* Right Door Leaf */}
              <div
                ref={doorRightRef}
                className="door-right-panel relative w-1/2 h-full bg-[#12100E] border-l border-peter-brass/50 flex items-center justify-start pl-4 sm:pl-8 shadow-2xl"
                style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
              >
                {/* Door Wood Paneling Visual */}
                <div className="absolute inset-0 opacity-40">
                  <Image
                    src="/images/museum_entrance_door.png"
                    alt="Grand dark teakwood entrance door panel right"
                    fill
                    sizes="50vw"
                    className="object-cover object-right"
                  />
                </div>
                <div className="absolute inset-4 border border-peter-brass/30 rounded pointer-events-none" />
                {/* Brass Door Handle */}
                <div className="relative z-10 w-4 sm:w-6 h-28 sm:h-36 rounded-full bg-gradient-to-r from-peter-brass via-peter-gold to-peter-brass shadow-[0_0_15px_rgba(212,175,55,0.6)] flex items-center justify-center">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-peter-black/60" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 4: Radiant Golden Portal Light Spill Flare */}
        <div
          ref={portalLightRef}
          className="portal-light absolute inset-0 z-25 pointer-events-none flex items-center justify-center"
        >
          <div className="w-[120vw] h-[120vh] rounded-full bg-[radial-gradient(circle_at_center,_rgba(249,231,159,0.9)_0%,_rgba(212,175,55,0.7)_35%,_rgba(181,166,66,0.3)_60%,_transparent_75%)] blur-2xl" />
        </div>
      </div>
    </section>
  );
}
