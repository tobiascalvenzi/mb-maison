// TODO: Edit terms of service content and have it reviewed by a legal professional
export default function Terms() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-zinc-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Terms and conditions for using our services
          </p>
        </div>
        
        <div className="bg-white ring-1 ring-zinc-200/60 rounded-xl p-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-serif font-semibold text-zinc-900 mb-6">Terms of Service for MB Maison</h2>
            
            <p className="text-zinc-700 mb-6"><strong>Last updated:</strong> [Date]</p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">1. Acceptance of Terms</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">2. Products and Services</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              MB Maison offers handcrafted Italian textile accessories for the home. 
              All products are made in Italy using sustainable materials.
            </p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">3. Pricing and Payment</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              All prices are listed in EUR. Payment is processed through Stripe. 
              Prices are subject to change without notice.
            </p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">4. Shipping and Returns</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              Shipping policies and return information will be provided at checkout. 
              Please review these details before completing your purchase.
            </p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">5. Intellectual Property</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              All content on this website, including text, graphics, logos, and images, 
              is the property of MB Maison and is protected by copyright laws.
            </p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">6. Limitation of Liability</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              MB Maison shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of our services.
            </p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">7. Governing Law</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of Italy.
            </p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">8. Contact Information</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              For questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:hello@mbmaison.com" className="text-zinc-600 hover:text-zinc-800 underline">
                hello@mbmaison.com
              </a>
            </p>
            
            <div className="mt-8 p-6 bg-zinc-50 border border-zinc-200 rounded-xl">
              <p className="text-sm text-zinc-600">
                <strong>Note:</strong> This is placeholder content. Please replace with your actual terms of service 
                and have it reviewed by a legal professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
