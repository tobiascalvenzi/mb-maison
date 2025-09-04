// src/app/page.js
"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

// Update filenames if you use different ones
const GALLERY = [
  "/gallery/1.jpg",
  "/gallery/2.jpg",
  "/gallery/3.jpg",
  "/gallery/4.jpg",
  "/gallery/5.jpg",
  "/gallery/6.jpg",
];

export default function Page() {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);

  const scrollByDir = (dir) => {
    const el = trackRef.current;
    if (!el) return;

    const step = el.clientWidth * 0.9; // ~90% viewport
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    const atStart = el.scrollLeft <= 8;

    if (dir === "next") {
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" }); // loop to start
      else el.scrollBy({ left: step, behavior: "smooth" });
    } else {
      if (atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" }); // loop to end
      else el.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  // Slow autoplay (7s). Pauses on hover/touch.
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) scrollByDir("next");
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <main>
      {/* 1) Big centered logo + tagline */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 text-center">
          <Image
            src="/logo-grey.png"
            alt="MB Maison"
            width={800}
            height={220}
            className="mx-auto h-auto w-[220px] sm:w-[300px] md:w-[380px] lg:w-[460px]"
            priority
          />
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-zinc-700 max-w-3xl mx-auto">
            Italian craftsmanship, sustainability, and elegance for your home.
          </p>
        </div>
      </section>

      {/* 2) Scrollable gallery with snap + arrows + autoplay */}
      <section className="bg-white">
        <div className="pb-12 -mx-2 sm:-mx-4">{/* full-bleed */}
          <div className="relative px-2 sm:px-4">{/* small side padding */}
            {/* Track */}
            <div
              ref={trackRef}
              className="
                flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory
                [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              "
              onMouseEnter={() => (pausedRef.current = true)}
              onMouseLeave={() => (pausedRef.current = false)}
              onTouchStart={() => (pausedRef.current = true)}
              onTouchEnd={() => (pausedRef.current = false)}
            >
              {GALLERY.map((src) => (
                <div
                  key={src}
                  className="
                    relative shrink-0 snap-center
                    w-[92vw] sm:w-[72vw] md:w-[54vw] lg:w-[44vw] xl:w-[36vw]
                    aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-zinc-200
                  "
                >
                  <Image
                    src={src}
                    alt="MB Maison gallery"
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 60vw, 85vw"
                    priority
                  />
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={() => scrollByDir("prev")}
              aria-label="Previous"
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow ring-1 ring-zinc-200 hover:bg-white"
            >
              ‹
            </button>
            <button
              onClick={() => scrollByDir("next")}
              aria-label="Next"
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow ring-1 ring-zinc-200 hover:bg-white"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* 3) CTA band (gradient + flares) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-14 text-center text-white">
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
            Personalize your table
          </h2>
          <p className="mt-2 text-zinc-200">
            Choose shape, material, colors and monogram to create your unique placemat.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-white text-zinc-900 hover:bg-zinc-100 transition"
            >
              Explore Our Collection
            </a>
            <a
              href="/customize"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 border border-white/80 text-white hover:bg-white/10 transition"
            >
              Personalize Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

