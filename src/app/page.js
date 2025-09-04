
// TODO: Edit hero title, subtitle, bullet points, testimonial text, and CTA button text
import Image from "next/image";

export default function Page() {
  return (
    <main>
      <section className="bg-[#7f7f7f] text-zinc-50"> {/* grey band */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-14 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: white-on-grey logo artwork */}
          <div>
            <div className="relative w-[260px] md:w-[320px] aspect-square rounded-2xl overflow-hidden ring-1 ring-white/20">
              <Image
                src="/logo-hero.png"
                alt="MB Maison"
                fill
                className="object-contain"
                priority
                sizes="(min-width: 768px) 320px, 60vw"
              />
            </div>

            <p className="mt-6 text-lg text-zinc-100/90 max-w-xl">
              Italian craftsmanship, sustainability, and elegance for your home.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/products"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-white text-zinc-900 hover:bg-zinc-100 transition"
              >
                Explore Our Collection
              </a>
              <a
                href="/customize"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 border border-white text-white hover:bg-white hover:text-zinc-900 transition"
              >
                Personalize Your Placemat
              </a>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/20">
            <Image
              src="/hero.jpg"          // ensure this file exists in /public
              alt="MB Maison linens"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
