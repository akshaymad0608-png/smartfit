import React from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "SmartFit",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@smartfit.com",
        "contactType": "customer support"
      }
    }
  };

  return (
    <div className="animate-fade-in pb-20 bg-brand-surface">
      <SEO 
        title="Contact Us - SmartFit Support" 
        description="Get in touch with the SmartFit team." 
        keywords="contact us, support, weight loss plan help"
        schema={contactSchema}
      />

      <div className="max-w-5xl mx-auto px-4 py-24">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-brand-darkGreen mb-6 tracking-tight font-heading">Let's Chat</h1>
          <p className="text-xl text-brand-gray max-w-xl mx-auto">Have questions about the diet plan or workouts? We're here to help you succeed.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-brand-card p-8 rounded-[2rem] shadow-card border border-brand-gray/5 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-brand-surface text-brand-green rounded-2xl flex items-center justify-center mb-6">
                <Mail size={28} />
              </div>
              <h3 className="font-bold text-brand-darkGreen text-xl mb-2">Email Us</h3>
              <p className="text-brand-gray text-sm mb-4 leading-relaxed">For general inquiries & partnerships:</p>
              <a href="mailto:hello@smartfit.com" className="text-brand-green font-bold hover:underline break-words text-sm">hello@smartfit.com</a>
            </div>
            
            <div className="bg-brand-card p-8 rounded-[2rem] shadow-card border border-brand-gray/5 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-brand-surface text-brand-green rounded-2xl flex items-center justify-center mb-6">
                <MapPin size={28} />
              </div>
              <h3 className="font-bold text-brand-darkGreen text-xl mb-2">HQ</h3>
              <p className="text-brand-gray text-sm leading-relaxed">
                Digital First Company<br />
                Mumbai, India & Global
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-brand-card rounded-[2.5rem] shadow-card border border-brand-gray/5 p-8 md:p-12 relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             {/* Decorative blob */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-surface rounded-bl-full -mr-10 -mt-10 z-0"></div>
             
            <h2 className="text-3xl font-bold text-brand-darkGreen mb-8 relative z-10 font-heading">Send a message</h2>
            <form className="space-y-6 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your message! We'll get back to you soon."); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-darkGreen uppercase tracking-wide">Name</label>
                  <input type="text" className="w-full px-5 py-4 rounded-2xl border border-brand-gray/10 bg-brand-surface focus:bg-brand-card focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition font-medium text-brand-darkGreen" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-darkGreen uppercase tracking-wide">Email</label>
                  <input type="email" className="w-full px-5 py-4 rounded-2xl border border-brand-gray/10 bg-brand-surface focus:bg-brand-card focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition font-medium text-brand-darkGreen" placeholder="your@email.com" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-darkGreen uppercase tracking-wide">Subject</label>
                 <select className="w-full px-5 py-4 rounded-2xl border border-brand-gray/10 bg-brand-surface focus:bg-brand-card focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition font-medium text-brand-gray">
                    <option>General Inquiry</option>
                    <option>Feedback on Plan</option>
                    <option>Technical Issue</option>
                    <option>Partnership</option>
                 </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-darkGreen uppercase tracking-wide">Message</label>
                <textarea rows={5} className="w-full px-5 py-4 rounded-2xl border border-brand-gray/10 bg-brand-surface focus:bg-brand-card focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition font-medium text-brand-darkGreen" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="w-full bg-brand-darkGreen text-white font-bold py-5 rounded-2xl hover:bg-brand-green transition-all shadow-lg flex items-center justify-center transform active:scale-95 duration-200 hover:shadow-brand-green/20">
                <Send size={20} className="mr-2" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
