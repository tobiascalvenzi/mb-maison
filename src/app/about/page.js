// TODO: Edit about page text content and replace /about.jpg with your actual image
export default function About() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-zinc-900 mb-4">About MB Maison</h1>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Column */}
          <div className="space-y-8">
            <p className="text-lg text-zinc-700 leading-relaxed">
              <strong>MB Maison</strong> is the project of a woman who strongly believes in the values of <em>Italian craftsmanship</em> and <em>sustainability</em>, interpreted with elegance.
            </p>
            
            <p className="text-lg text-zinc-700 leading-relaxed">
              The driving idea is that everyone deserves to be surrounded by beauty, with unique pieces designed and created according to their personal tastes and needs.
            </p>
            
            <p className="text-lg text-zinc-700 leading-relaxed">
              This is the foundation of <strong>MB Maison</strong>: a collection of textile accessories for the home, strictly made in Italy.
            </p>
            
            <p className="text-lg text-zinc-700 leading-relaxed">
              Great emphasis is placed on <em>stain-resistant coated linen</em>: a high-quality, eco-sustainable fabric that is both aesthetic and functional, allowing MB Maison to offer elegance without compromising on practicality.
            </p>
            
                          <p className="text-lg text-zinc-700 leading-relaxed">
                <strong>MB Maison&apos;s</strong> textile items are strictly handmade in Italy, using fine Italian fabrics.
              </p>
          </div>
          
          {/* Image Column */}
          <div className="flex justify-center">
            <div className="relative w-full">
              <img
                src="/about.jpg"
                alt="MB Maison craftsmanship"
                className="w-full h-[500px] object-cover rounded-xl ring-1 ring-zinc-200/60"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
