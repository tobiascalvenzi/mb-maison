
// TODO: Edit hero title, subtitle, bullet points, testimonial text, and CTA button text
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Dark Band */}
      <section className="bg-zinc-950 text-zinc-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight">
                MB Maison
              </h1>
              <p className="text-xl lg:text-2xl text-zinc-300 leading-relaxed max-w-2xl">
                Italian craftsmanship, sustainability, and elegance for your home.
              </p>
              <Link 
                href="/products"
                className="inline-block bg-zinc-900 text-white px-10 py-4 text-lg font-medium rounded-xl hover:bg-zinc-800 transition-all hover:-translate-y-[1px] shadow-lg"
              >
                Explore Our Collection
              </Link>
            </div>
            <div className="hidden lg:block">
              {/* Optional hero image placeholder */}
              <div className="w-full h-96 bg-zinc-800 rounded-xl flex items-center justify-center">
                <span className="text-zinc-400 text-lg">Hero Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section - Light Background */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-zinc-900 mb-4">
              Our Values
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white ring-1 ring-zinc-200/60 p-8 rounded-xl hover:-translate-y-[1px] transition-all duration-300">
              <div className="text-4xl mb-4">🇮🇹</div>
              <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-3">Handmade in Italy</h3>
              <p className="text-zinc-600 leading-relaxed">Authentic Italian craftsmanship in every piece, ensuring the highest quality standards.</p>
            </div>
            <div className="bg-white ring-1 ring-zinc-200/60 p-8 rounded-xl hover:-translate-y-[1px] transition-all duration-300">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-3">Stain-resistant Coated Linen</h3>
              <p className="text-zinc-600 leading-relaxed">High-quality, practical, and beautiful fabric that combines elegance with functionality.</p>
            </div>
            <div className="bg-white ring-1 ring-zinc-200/60 p-8 rounded-xl hover:-translate-y-[1px] transition-all duration-300">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-3">Sustainable & Elegant Design</h3>
              <p className="text-zinc-600 leading-relaxed">Eco-friendly luxury for conscious living, without compromising on style.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <blockquote className="text-xl text-zinc-600 italic leading-relaxed">
            &ldquo;The quality and elegance of MB Maison products transformed our dining experience. Every piece tells a story of Italian craftsmanship.&rdquo;
          </blockquote>
          <cite className="block mt-4 text-zinc-500">— Satisfied Customer</cite>
        </div>
      </section>
    </div>
  );
}
