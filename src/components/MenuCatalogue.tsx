"use client";

import React, { useEffect, useState, useMemo } from "react";
import { getMenuItems } from "@/lib/firebase/menuService";
import { MENU_CATEGORIES, type MenuItem } from "@/types/menu";

export default function MenuCatalogue() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function loadMenu() {
      setIsLoading(true);
      setError(null);
      try {
        const fetched = await getMenuItems();
        if (isMounted) {
          setItems(fetched);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.warn("Using fallback menu items:", err);
          setError("Displaying archived offline catalogue.");
          setIsLoading(false);
        }
      }
    }

    loadMenu();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered catalogue logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter against MenuItem.dietary
      if (dietaryFilter !== "all" && item.dietary !== dietaryFilter) {
        return false;
      }
      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesHeritage = item.heritageNotes?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesHeritage) {
          return false;
        }
      }
      return true;
    });
  }, [items, selectedCategory, dietaryFilter, searchQuery]);

  return (
    <section
      id="catalogue"
      className="py-28 sm:py-36 px-6 bg-peter-black border-t border-peter-brass/20 relative"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-peter-gold/30 bg-peter-charcoal/80 mb-4">
            <span className="text-peter-gold text-xs font-sans uppercase tracking-[0.25em]">
              The Culinary Repertoire • Live Firestore CMS
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-peter-gold tracking-wide mb-6">
            The Catalogue
          </h2>
          <p className="text-peter-offwhite/75 font-serif italic text-lg sm:text-xl leading-relaxed">
            Curated Park Street classics, Continental sizzlers, and timeless heritage confections perfected since 1962.
          </p>
        </div>

        {/* Controls: Search, Category Tabs, Dietary Toggle */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Top Bar: Search Input & Dietary Toggle */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes or ingredients..."
                className="w-full px-4 py-2.5 rounded-md bg-peter-charcoal border border-peter-brass/30 text-peter-offwhite text-sm placeholder:text-peter-offwhite/40 focus:outline-none focus:border-peter-gold transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-peter-brass hover:text-peter-gold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Filter Segmented Control */}
            <div className="flex items-center gap-1 p-1 rounded-md bg-peter-charcoal border border-peter-brass/25">
              <button
                onClick={() => setDietaryFilter("all")}
                className={`px-3 py-1.5 rounded text-xs font-sans uppercase tracking-wider font-medium transition-colors ${
                  dietaryFilter === "all"
                    ? "bg-peter-gold text-peter-black font-bold shadow"
                    : "text-peter-offwhite/70 hover:text-peter-offwhite"
                }`}
              >
                All Dishes
              </button>
              <button
                onClick={() => setDietaryFilter("veg")}
                className={`px-3 py-1.5 rounded text-xs font-sans uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5 ${
                  dietaryFilter === "veg"
                    ? "bg-emerald-600 text-white font-bold shadow"
                    : "text-emerald-400/80 hover:text-emerald-300"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Vegetarian
              </button>
              <button
                onClick={() => setDietaryFilter("non-veg")}
                className={`px-3 py-1.5 rounded text-xs font-sans uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5 ${
                  dietaryFilter === "non-veg"
                    ? "bg-peter-crimson text-white font-bold shadow"
                    : "text-peter-crimson/90 hover:text-red-400"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-400" />
                Non-Veg
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-peter-brass/20">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-t text-xs font-sans uppercase tracking-[0.2em] font-semibold shrink-0 transition-all border-b-2 ${
                selectedCategory === "All"
                  ? "border-peter-gold text-peter-gold bg-peter-charcoal/50"
                  : "border-transparent text-peter-offwhite/60 hover:text-peter-offwhite"
              }`}
            >
              All Categories
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-t text-xs font-sans uppercase tracking-[0.2em] font-semibold shrink-0 transition-all border-b-2 ${
                  selectedCategory === cat
                    ? "border-peter-gold text-peter-gold bg-peter-charcoal/50"
                    : "border-transparent text-peter-offwhite/60 hover:text-peter-offwhite"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg bg-peter-charcoal border border-peter-brass/20 shimmer-skeleton h-48 flex flex-col justify-between"
              >
                <div className="h-6 w-2/3 bg-peter-charcoal/60 rounded" />
                <div className="h-4 w-full bg-peter-charcoal/40 rounded mt-2" />
                <div className="h-4 w-4/5 bg-peter-charcoal/40 rounded" />
                <div className="h-6 w-1/4 bg-peter-charcoal/60 rounded mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Fallback Notice */}
        {error && !isLoading && (
          <div className="mb-8 p-3 rounded bg-peter-charcoal/80 border border-peter-brass/30 text-center text-xs text-peter-brass">
            {error}
          </div>
        )}

        {/* Empty Search Result State */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20 bg-peter-charcoal/40 rounded-lg border border-peter-brass/20">
            <p className="font-serif text-xl text-peter-offwhite/70 mb-2">
              No culinary items found
            </p>
            <p className="text-xs text-peter-brass font-sans">
              Try adjusting your search keywords or dietary filters.
            </p>
          </div>
        )}

        {/* Menu Items Grid */}
        {!isLoading && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((item) => {
              const isVeg = item.dietary === "veg";

              return (
                <div
                  key={item.id}
                  className="p-6 rounded-lg bg-peter-charcoal/90 border border-peter-brass/25 hover:border-peter-gold/60 transition-all duration-300 shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Item Top: Category, Badges, Dietary Icon */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        {/* Dietary Dot Icon */}
                        <span
                          className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center p-0.5 ${
                            isVeg
                              ? "border-emerald-500"
                              : "border-red-600"
                          }`}
                          title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isVeg ? "bg-emerald-500" : "bg-red-600"
                            }`}
                          />
                        </span>

                        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-peter-brass">
                          {item.category}
                        </span>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans uppercase tracking-widest bg-peter-black border border-peter-brass/40 text-peter-gold">
                            {item.badge}
                          </span>
                        )}
                        {item.isSignature && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans uppercase tracking-widest bg-peter-gold text-peter-black font-bold">
                            House Legend
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dish Title & Price */}
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="text-xl sm:text-2xl font-serif text-peter-offwhite group-hover:text-peter-gold transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-xl sm:text-2xl font-serif text-gold-gradient font-semibold shrink-0">
                        {item.currency}{item.price}
                      </span>
                    </div>

                    {/* Culinary Description */}
                    <p className="text-peter-offwhite/75 font-light text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Heritage Lore Footer Note */}
                  {item.heritageNotes && (
                    <div className="mt-4 pt-3 border-t border-peter-brass/15 flex items-start gap-2 text-xs text-peter-offwhite/60 font-serif italic">
                      <span className="text-peter-gold not-italic">✦</span>
                      <span>{item.heritageNotes}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Menu Footnote */}
        <div className="mt-16 text-center border-t border-peter-brass/20 pt-8">
          <p className="text-xs text-peter-offwhite/60 font-sans tracking-wider uppercase mb-2">
            Prices are in Indian Rupees (₹) • Taxes as applicable
          </p>
          <p className="text-xs text-peter-brass font-serif italic">
            Prepared fresh to order using heritage spice recipes perfected over 60 years.
          </p>
        </div>
      </div>
    </section>
  );
}
