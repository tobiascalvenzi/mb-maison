"use client";

export default function Customize(){
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <section className="max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-3">Customize Your Placemats</h1>
        <p className="text-zinc-600">
          Craftsmanship is our strength: MB Maison offers products tailored to each customer’s
          specific needs—whether it’s measurements, color combinations, or embroidery—making
          every creation a truly unique piece.
        </p>
      </section>
      <section className="mt-8 grid sm:grid-cols-2 gap-4">
        <a href="/products" className="rounded-2xl border border-zinc-200 bg-white p-6 hover:bg-zinc-50 transition">
          <div className="font-semibold">Start from Products</div>
          <p className="text-zinc-600 text-sm mt-1">Pick a shape & material, then configure colors and monogram.</p>
        </a>
        {/* TODO: replace 'runner' with a real slug from data/products.json */}
        <a href="/products/runner" className="rounded-2xl border border-zinc-200 bg-white p-6 hover:bg-zinc-50 transition">
          <div className="font-semibold">Classic Placemat (quick start)</div>
          <p className="text-zinc-600 text-sm mt-1">Jump straight into the configurator.</p>
        </a>
      </section>
    </main>
  );
}


