import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, PlayCircle, Utensils, Calendar, Download, Star, ShieldCheck, Users, Zap, ChevronDown, Activity, Loader2, Calculator, X, Heart } from 'lucide-react';
import { jsPDF } from "jspdf";
import SEO from '../components/SEO';
import BMICalculator from '../components/BMICalculator';

const Home: React.FC = () => {
  const [isBMIModalOpen, setIsBMIModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Structured Data for the Organization/WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "SmartFit Weight Loss",
        "url": "https://smartweightlossblueprint.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://smartweightlossblueprint.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "SmartFit",
        "url": "https://smartweightlossblueprint.com",
        "logo": "https://smartweightlossblueprint.com/logo.png",
        "sameAs": [
          "https://facebook.com/smartfit",
          "https://twitter.com/smartfit",
          "https://instagram.com/smartfit"
        ]
      }
    ]
  };

  const handleDownloadEbook = async () => {
    setIsGenerating(true);
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPos = 20;

      // --- HELPER FUNCTIONS ---
      const centerText = (text: string, y: number, size = 12, font = "helvetica", style = "normal") => {
        doc.setFont(font, style);
        doc.setFontSize(size);
        const textWidth = doc.getTextWidth(text);
        doc.text(text, (pageWidth - textWidth) / 2, y);
      };

      const drawFooter = (pageNo: number) => {
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.setFont("helvetica", "normal");
        doc.text("SmartFit Starter Kit | www.smartfit.com", margin, pageHeight - 10);
        doc.text(`Page ${pageNo}`, pageWidth - margin - 10, pageHeight - 10);
      };

      // --- PAGE 1: COVER ---
      // Brand Header
      doc.setFillColor(13, 148, 136); // Brand Green
      doc.rect(0, 0, pageWidth, 15, "F"); 

      yPos = 80;
      doc.setTextColor(13, 148, 136);
      centerText("SmartFit", yPos, 45, "helvetica", "bold");
      
      yPos += 25;
      doc.setTextColor(15, 23, 42); // Slate 900
      centerText("STARTER KIT", yPos, 28, "helvetica", "bold");

      yPos += 15;
      doc.setTextColor(100, 116, 139); // Slate 500
      centerText("Your 30-Day Blueprint for Natural Weight Loss", yPos, 14);

      yPos += 40;
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(margin + 30, yPos, pageWidth - margin - 30, yPos);
      
      yPos += 25;
      doc.setTextColor(15, 23, 42);
      centerText("INSIDE THIS GUIDE:", yPos, 12, "helvetica", "bold");
      
      yPos += 15;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      centerText("• Week 1 Workout Schedule", yPos, 12);
      yPos += 10;
      centerText("• The 'Healthy Plate' Nutrition Rule", yPos, 12);
      yPos += 10;
      centerText("• Essential Grocery Checklist", yPos, 12);

      drawFooter(1);

      // --- PAGE 2: WORKOUT PLAN ---
      doc.addPage();
      yPos = 20;
      
      doc.setFontSize(20);
      doc.setTextColor(13, 148, 136);
      doc.text("Week 1: The Kickstart", margin, yPos);
      
      yPos += 10;
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text("Goal: Establish the routine. Focus on form over speed.", margin, yPos);

      yPos += 15;
      
      // Table Header
      doc.setFillColor(241, 245, 249); // Slate 100
      doc.rect(margin, yPos, pageWidth - (margin * 2), 10, "F");
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text("Day", margin + 5, yPos + 7);
      doc.text("Workout Focus", margin + 35, yPos + 7);
      doc.text("Diet Focus", margin + 110, yPos + 7);

      yPos += 10;
      doc.setFont("helvetica", "normal");
      
      const schedule = [
        { d: "1", w: "Full Body Strength (20m)", f: "High Protein Breakfast" },
        { d: "2", w: "HIIT Cardio (15m)", f: "Complex Carbs (Lunch)" },
        { d: "3", w: "Rest & Light Stretch", f: "Detox / Hydration" },
        { d: "4", w: "Upper Body & Abs (20m)", f: "High Protein Dinner" },
        { d: "5", w: "Lower Body Tone (20m)", f: "No Sugar Day" },
        { d: "6", w: "Active Recovery (Walk)", f: "Veggie Overload" },
        { d: "7", w: "Meal Prep Sunday", f: "Plan Next Week" },
      ];

      schedule.forEach((day, index) => {
        // Alternating row background
        if (index % 2 === 1) {
             doc.setFillColor(248, 250, 252);
             doc.rect(margin, yPos, pageWidth - (margin * 2), 10, "F");
        } else {
             doc.setFillColor(255, 255, 255);
             doc.rect(margin, yPos, pageWidth - (margin * 2), 10, "F");
        }
        
        // Border bottom
        doc.setDrawColor(226, 232, 240);
        doc.line(margin, yPos + 10, pageWidth - margin, yPos + 10);

        doc.text(`Day ${day.d}`, margin + 5, yPos + 7);
        doc.text(day.w, margin + 35, yPos + 7);
        doc.text(day.f, margin + 110, yPos + 7);
        yPos += 10;
      });

      yPos += 15;
      doc.setFont("helvetica", "bold");
      doc.text("Pro Tip:", margin, yPos);
      doc.setFont("helvetica", "normal");
      doc.text("Drink 500ml of water immediately after waking up to boost metabolism.", margin + 15, yPos);

      drawFooter(2);

      // --- PAGE 3: NUTRITION & SHOPPING ---
      doc.addPage();
      yPos = 20;

      doc.setFontSize(20);
      doc.setTextColor(13, 148, 136);
      doc.text("Nutrition Essentials", margin, yPos);

      yPos += 15;
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text("The Healthy Plate Method", margin, yPos);
      
      yPos += 10;
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      const dietText = [
        "Stop counting calories. Instead, visualize your plate proportions:",
        "",
        "• 50% Vegetables: Fiber keeps you full. (Spinach, Cucumber, Broccoli)",
        "• 25% Lean Protein: Builds muscle. (Dal, Chicken, Eggs, Paneer)",
        "• 25% Complex Carbs: Energy. (Oats, Brown Rice, Roti, Sweet Potato)",
      ];
      
      dietText.forEach(line => {
        doc.text(line, margin, yPos);
        yPos += 7;
      });

      yPos += 15;
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text("Grocery Shopping List", margin, yPos);
      
      yPos += 10;
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      
      // Grocery Grid
      const col1X = margin;
      const col2X = pageWidth / 2 + 10;
      
      doc.setFont("helvetica", "bold");
      doc.text("Proteins", col1X, yPos);
      doc.text("Carbs & Fiber", col2X, yPos);
      
      yPos += 8;
      doc.setFont("helvetica", "normal");
      
      const proteins = ["[] Eggs / Tofu", "[] Greek Yogurt", "[] Lentils (Moong/Masoor)", "[] Chicken Breast", "[] Almonds / Walnuts"];
      const carbs = ["[] Rolled Oats", "[] Green Tea", "[] Apples / Papaya", "[] Spinach / Palak", "[] Sweet Potatoes"];

      proteins.forEach((item, i) => {
        doc.text(item, col1X, yPos + (i * 7));
        doc.text(carbs[i], col2X, yPos + (i * 7));
      });

      drawFooter(3);

      doc.save("SmartFit_Starter_Kit.pdf");
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="overflow-hidden bg-brand-cream text-brand-darkGreen">
      <SEO 
        title="SmartFit - Holistic Weight Loss & Wellness" 
        description="A natural, sustainable approach to weight loss with free daily exercises, simple diet plans, and mindfulness." 
        keywords="holistic weight loss, wellness plan, home workout, diet plan"
        schema={websiteSchema}
      />

      {/* BMI Modal */}
      {isBMIModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-darkGreen/40 backdrop-blur-sm animate-fade-in">
           <div className="absolute inset-0" onClick={() => setIsBMIModalOpen(false)}></div>
           <div className="relative w-full max-w-md animate-scale-in z-10">
              <button 
                onClick={() => setIsBMIModalOpen(false)}
                className="absolute -top-12 right-0 p-2 bg-brand-cream/20 text-brand-cream hover:bg-brand-cream/30 rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={24} />
              </button>
              <BMICalculator />
           </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Organic Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-brand-green/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-darkGreen/10 shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
               </svg>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-darkGreen/70">Holistic Wellness Plan</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-heading font-extrabold leading-[1.1] text-brand-darkGreen">
              Smart Weight Loss.<br />
              <span className="italic text-brand-green font-medium">Sustainable Results.</span>
            </h1>
            
            <p className="text-xl text-brand-darkGreen/70 max-w-lg leading-relaxed font-light">
              Stop dieting and start living. Get your free daily workout routine, simple meal plans, and a 30-day blueprint to transform your health naturally.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/plan" className="btn-primary inline-flex items-center justify-center px-10 py-4 text-lg font-medium rounded-full shadow-soft hover:shadow-lg transform transition-all">
                Start 30-Day Journey
              </Link>
              
              <div className="flex gap-4">
                  <button 
                    onClick={() => setIsBMIModalOpen(true)}
                    className="inline-flex items-center justify-center px-8 py-4 border border-brand-darkGreen/20 bg-transparent text-lg font-medium rounded-full text-brand-darkGreen hover:bg-white hover:border-transparent hover:shadow-soft transition-all"
                  >
                     <Calculator size={20} className="mr-2 opacity-70"/> Check BMI
                  </button>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-brand-darkGreen/10">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-cream bg-gray-200 overflow-hidden">
                       <img src={`https://randomuser.me/api/portraits/women/${20+i}.jpg`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
               <div>
                  <div className="flex text-brand-accent mb-1">
                     {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-sm font-medium text-brand-darkGreen/60">Trusted by 10,000+ members</p>
               </div>
            </div>
          </div>
          
          {/* Hero Visual - Updated Image Container */}
          <div className="relative z-10 lg:pl-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             <div className="relative">
                {/* Main Image Container */}
                <div className="relative z-20 w-full aspect-[3/4] max-w-md mx-auto">
                   <img 
                     src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop" 
                     alt="Wellness Woman" 
                     width="448"
                     height="600"
                     className="w-full h-full object-cover shadow-2xl rounded-[3rem] bg-slate-200 relative z-20"
                   />
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -left-10 z-10 w-40 h-40 bg-brand-green/20 rounded-full blur-2xl"></div>
                
                {/* Repositioned Circle Outline - Centered behind image to avoid cutoff */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[120%] h-[120%] border border-brand-accent/20 rounded-full animate-float pointer-events-none" style={{ animationDuration: '8s' }}></div>
                
                {/* Floating Card */}
                <div className="absolute bottom-10 -left-6 z-30 bg-white p-6 rounded-2xl shadow-lg border border-slate-100 max-w-[220px] animate-float">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-brand-green/10 rounded-full text-brand-green">
                         <Activity size={20} />
                      </div>
                      <span className="text-sm font-bold text-brand-darkGreen">Daily Goal</span>
                   </div>
                   <p className="text-xs text-brand-darkGreen/60 font-medium leading-relaxed">"Consistency beats intensity every time."</p>
                   {/* Progress bar visual */}
                   <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div className="bg-brand-green h-full w-2/3 rounded-full"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
               <span className="text-brand-accent font-bold uppercase tracking-widest text-xs mb-4 block">Our Philosophy</span>
               <h2 className="text-4xl md:text-5xl font-heading text-brand-darkGreen mb-6">Complete Wellness Ecosystem</h2>
               <p className="text-brand-darkGreen/70 text-lg leading-relaxed">Most plans fail because they are incomplete. We combine nutrition, gentle movement, and mindfulness to help you thrive.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {/* Card 1 */}
               <div className="bg-brand-cream rounded-t-[100px] rounded-b-[20px] p-8 text-center hover:shadow-soft transition-all duration-300 group">
                  <div className="w-full aspect-square rounded-full overflow-hidden mb-8 border-4 border-white shadow-sm group-hover:scale-105 transition-transform duration-500">
                     <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop" width="400" height="400" className="w-full h-full object-cover" alt="Nutrition" />
                  </div>
                  <h3 className="text-2xl font-heading text-brand-darkGreen mb-3">Mindful Nutrition</h3>
                  <p className="text-brand-darkGreen/60 text-sm mb-6 leading-relaxed">Wholesome meal plans that nourish without deprivation. Vegetarian, Vegan & Balanced options.</p>
                  <Link to="/diet" className="inline-flex items-center text-brand-green font-bold text-sm uppercase tracking-wider hover:underline">
                     View Plans <ArrowRight size={14} className="ml-2" />
                  </Link>
               </div>

               {/* Card 2 */}
               <div className="bg-brand-cream rounded-t-[100px] rounded-b-[20px] p-8 text-center hover:shadow-soft transition-all duration-300 group mt-0 md:-mt-12">
                  <div className="w-full aspect-square rounded-full overflow-hidden mb-8 border-4 border-white shadow-sm group-hover:scale-105 transition-transform duration-500">
                     <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop" width="400" height="400" className="w-full h-full object-cover" alt="Movement" />
                  </div>
                  <h3 className="text-2xl font-heading text-brand-darkGreen mb-3">Joyful Movement</h3>
                  <p className="text-brand-darkGreen/60 text-sm mb-6 leading-relaxed">Effective home workouts designed for every body type. No equipment needed.</p>
                  <Link to="/exercises" className="inline-flex items-center text-brand-green font-bold text-sm uppercase tracking-wider hover:underline">
                     Start Moving <ArrowRight size={14} className="ml-2" />
                  </Link>
               </div>

               {/* Card 3 */}
               <div className="bg-brand-cream rounded-t-[100px] rounded-b-[20px] p-8 text-center hover:shadow-soft transition-all duration-300 group">
                  <div className="w-full aspect-square rounded-full overflow-hidden mb-8 border-4 border-white shadow-sm group-hover:scale-105 transition-transform duration-500">
                     <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop" width="400" height="400" className="w-full h-full object-cover" alt="Structure" />
                  </div>
                  <h3 className="text-2xl font-heading text-brand-darkGreen mb-3">Guided Structure</h3>
                  <p className="text-brand-darkGreen/60 text-sm mb-6 leading-relaxed">A 30-day blueprint to build sustainable habits that last a lifetime.</p>
                  <Link to="/plan" className="inline-flex items-center text-brand-green font-bold text-sm uppercase tracking-wider hover:underline">
                     See Roadmap <ArrowRight size={14} className="ml-2" />
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* Trust Ticker */}
      <section className="py-16 border-y border-brand-darkGreen/5 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center gap-3">
               <ShieldCheck size={28} className="text-brand-green" />
               <span className="font-heading text-xl text-brand-darkGreen">Science Backed</span>
             </div>
             <div className="w-2 h-2 rounded-full bg-brand-darkGreen/20 hidden md:block"></div>
             <div className="flex items-center gap-3">
               <Users size={28} className="text-brand-green" />
               <span className="font-heading text-xl text-brand-darkGreen">Community Focused</span>
             </div>
             <div className="w-2 h-2 rounded-full bg-brand-darkGreen/20 hidden md:block"></div>
             <div className="flex items-center gap-3">
               <Heart size={28} className="text-brand-green" />
               <span className="font-heading text-xl text-brand-darkGreen">Health First</span>
             </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-green to-teal-800">
           {/* Texture overlay could go here */}
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
           <div className="w-16 h-16 text-white mx-auto mb-8 animate-pulse-slow flex items-center justify-center">
              <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="64" 
                  height="64" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
               </svg>
           </div>
          <h2 className="text-4xl md:text-6xl font-heading text-brand-cream mb-8">Begin Your Transformation</h2>
          <p className="text-brand-cream/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Download our comprehensive <strong>"SmartFit Starter Kit"</strong> eBook featuring 50+ nourishing recipes and a printable workout calendar.
          </p>
          
          <button 
            onClick={handleDownloadEbook}
            disabled={isGenerating}
            className={`bg-brand-cream text-brand-darkGreen hover:bg-brand-darkGreen hover:text-white px-12 py-5 rounded-full font-medium text-lg inline-flex items-center justify-center transition-all shadow-soft transform hover:-translate-y-1 ${isGenerating ? 'opacity-80 cursor-wait' : ''}`}
          >
            {isGenerating ? (
              <><Loader2 className="mr-3 animate-spin" size={20} /> Preparing Guide...</>
            ) : (
              <><Download className="mr-3" size={20} /> Download Free Guide</>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;