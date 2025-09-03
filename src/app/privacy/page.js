// TODO: Edit privacy policy content and have it reviewed by a legal professional
export default function Privacy() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-zinc-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            How we protect and handle your personal information
          </p>
        </div>
        
        <div className="bg-white ring-1 ring-zinc-200/60 rounded-xl p-12">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-serif font-semibold text-zinc-900 mb-6">Privacy Policy for MB Maison</h2>
            
            <p className="text-zinc-700 mb-6"><strong>Last updated:</strong> [Date]</p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">1. Information We Collect</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, or contact us for support.
            </p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">2. How We Use Your Information</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, 
              process transactions, and communicate with you.
            </p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">3. Information Sharing</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy.
            </p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">4. Data Security</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">5. Your Rights</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              You have the right to access, update, or delete your personal information. 
              Contact us to exercise these rights.
            </p>
            
            <h3 className="text-xl font-serif font-semibold text-zinc-900 mb-4">6. Contact Us</h3>
            <p className="text-zinc-700 mb-6 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:hello@mbmaison.com" className="text-zinc-600 hover:text-zinc-800 underline">
                hello@mbmaison.com
              </a>
            </p>
            
            <div className="mt-8 p-6 bg-zinc-50 border border-zinc-200 rounded-xl">
              <p className="text-sm text-zinc-600">
                <strong>Note:</strong> This is placeholder content. Please replace with your actual privacy policy 
                and have it reviewed by a legal professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
