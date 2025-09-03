// TODO: Edit contact email, form fields, and add Formspree action URL to form tag
export default function Contact() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-zinc-900 mb-4">Contact Us</h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Get in touch with us for any questions about our products or custom orders.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="bg-white ring-1 ring-zinc-200/60 rounded-xl p-8">
            <h2 className="text-2xl font-serif font-semibold text-zinc-900 mb-8">Get in Touch</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-zinc-900 mb-3">Email</h3>
                <a
                  href="mailto:hello@mbmaison.com"
                  className="text-zinc-600 hover:text-zinc-800 transition-colors text-lg"
                >
                  hello@mbmaison.com
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-zinc-900 mb-3">Location</h3>
                <p className="text-zinc-600">Made in Italy</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-zinc-900 mb-3">Response Time</h3>
                <p className="text-zinc-600">We typically respond within 24 hours</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white ring-1 ring-zinc-200/60 rounded-xl p-8">
            <h2 className="text-2xl font-serif font-semibold text-zinc-900 mb-8">Send us a Message</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-500 focus:border-transparent transition-all"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-zinc-900 text-white py-4 px-6 rounded-xl hover:bg-zinc-800 transition-all hover:-translate-y-[1px] font-medium"
              >
                Send Message
              </button>
            </form>
            
            <div className="mt-8 p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
              <p className="text-sm text-zinc-600">
                <strong>Note:</strong> This form is ready for Formspree integration. 
                Add your Formspree action URL to the form tag when ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
