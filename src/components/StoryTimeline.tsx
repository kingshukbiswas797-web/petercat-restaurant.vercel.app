import React from "react";
import Image from "next/image";

interface TimelineEvent {
  year: string;
  era: string;
  title: string;
  narrative: string;
  imageSrc?: string;
  imageAlt?: string;
  caption?: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "1962",
    era: "The Founding Era",
    title: "Nitin Kothari Opens 18A Park Street",
    narrative:
      "Visionary restaurateur Nitin Kothari opened the doors of Peter Cat on Park Street, then the undisputed epicentre of Calcutta's nightlife and dining culture. Inspired by bohemian European bistros and warm Oriental sanctuaries, Peter Cat set an unprecedented benchmark for courteous service and Continental elegance.",
    imageSrc: "/images/heritage_menu_archive.png",
    imageAlt: "Original 1962 Peter Cat opening menu artifact and vintage calligraphy on Park Street Calcutta",
    caption: "Original Opening Menu Artifact (1962)",
  },
  {
    year: "1975",
    era: "The Chelo Era",
    title: "Invention of the Sacred Chelo Kebab",
    narrative:
      "Recognising the Calcutta palate's romance with aromatic rice and tandoori smoke, Nitin Kothari perfected the Chelo Kebab platter. Steaming saffron basmati crowned with butter, a fried egg with runny yolk, and charred seekh kebabs on an oval metal platter created a culinary sensation that rapidly became Calcutta’s most celebrated dish.",
    imageSrc: "/images/vintage_peter_cat_sign.png",
    imageAlt: "Vintage Peter Cat glowing neon sign illuminating Park Street at night in the 1970s",
    caption: "Park Street Nighttime Exterior & Neon Sign (1970s)",
  },
  {
    year: "1980s – 1990s",
    era: "Cultural Sanctuary",
    title: "Calcutta's Cultural Living Room",
    narrative:
      "Through decades of political and cultural transformation, Peter Cat remained an unchanged sanctuary. Intellectuals, artists, cinephiles, and multi-generational families queued faithfully on Park Street under the watchful gaze of the turbaned stewards, cherishing conversations over sizzling platters and vintage shandies.",
    imageSrc: "/images/atmospheric_dining_room.png",
    imageAlt: "Atmospheric Peter Cat dining room with glowing stained-glass lamps and turbaned stewards",
    caption: "Intimate Amber Glow & Turbaned Stewards",
  },
  {
    year: "Today",
    era: "Living Legacy",
    title: "Uncompromising Standards in the Present Day",
    narrative:
      "Six decades later, Peter Cat stands untouched by ephemeral culinary fads. The sacred walk-in policy endures, the spice formulas remain unaltered, and the amber glow continues to welcome thousands every week. Today, it remains not merely a restaurant, but an indelible piece of Kolkata's soul.",
  },
];

export default function StoryTimeline() {
  return (
    <section
      id="story"
      className="relative py-28 sm:py-36 px-6 bg-peter-black relative overflow-hidden"
    >
      {/* Background ambient texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-peter-charcoal/80 via-peter-black to-peter-black pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-peter-brass/30 bg-peter-charcoal/60 mb-4">
            <span className="text-peter-gold text-xs font-sans uppercase tracking-[0.25em]">
              Heritage Lore • 1962 to Present
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-peter-gold tracking-wide mb-6">
            A Timeline of Taste
          </h2>
          <p className="text-peter-offwhite/70 font-serif italic text-lg sm:text-xl leading-relaxed">
            The extraordinary journey of Nitin Kothari’s culinary sanctuary across six decades on Park Street.
          </p>
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative">
          {/* Central Vertical Guideline */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-peter-brass/20 via-peter-gold/50 to-peter-brass/20" />

          <div className="flex flex-col gap-16 md:gap-24">
            {TIMELINE_EVENTS.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={event.year}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Text Content Card */}
                  <div className={`w-full md:w-1/2 ${isEven ? "md:text-right md:pr-10" : "md:text-left md:pl-10"}`}>
                    <div className="p-6 sm:p-8 rounded-lg bg-peter-charcoal/90 border border-peter-brass/25 shadow-xl hover:border-peter-gold/50 transition-colors">
                      <div className="flex items-center gap-3 mb-2 justify-start md:justify-end">
                        <span className="text-xs uppercase tracking-[0.25em] text-peter-brass font-sans">
                          {event.era}
                        </span>
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-serif text-peter-gold mb-3 font-normal">
                        {event.year}
                      </h3>
                      <h4 className="text-lg sm:text-xl font-serif text-peter-offwhite mb-4">
                        {event.title}
                      </h4>
                      <p className="text-peter-offwhite/75 font-light text-sm sm:text-base leading-relaxed">
                        {event.narrative}
                      </p>
                    </div>
                  </div>

                  {/* Central Illuminated Node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-peter-gold bg-peter-black items-center justify-center z-10 shadow-[0_0_20px_rgba(212,175,55,0.7)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-peter-gold animate-pulse" />
                  </div>

                  {/* Timeline Image / Visual Artifact */}
                  <div className={`w-full md:w-1/2 ${isEven ? "md:pl-10" : "md:pr-10"}`}>
                    {event.imageSrc ? (
                      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg p-2.5 bg-peter-charcoal border border-peter-brass/30 shadow-2xl group overflow-hidden">
                        <div className="relative w-full h-full overflow-hidden rounded">
                          <Image
                            src={event.imageSrc}
                            alt={event.imageAlt || event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-peter-black/80 via-transparent to-transparent" />
                          {event.caption && (
                            <div className="absolute bottom-3 left-3 right-3 text-left">
                              <span className="text-xs text-peter-gold/90 font-sans tracking-wide">
                                {event.caption}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 rounded-lg border border-dashed border-peter-brass/30 bg-peter-charcoal/40 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-full border border-peter-gold/40 flex items-center justify-center mb-3">
                          <span className="text-peter-gold font-serif text-lg">PC</span>
                        </div>
                        <span className="text-xs uppercase tracking-[0.25em] text-peter-brass font-sans">
                          Living Legacy
                        </span>
                        <p className="text-peter-offwhite/80 font-serif text-sm mt-2">
                          1962 – Present • Park Street, Kolkata
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
