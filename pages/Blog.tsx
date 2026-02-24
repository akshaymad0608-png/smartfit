import React, { useState } from 'react';
import { Calendar, User, ArrowRight, BookOpen, X, Share2, Clock } from 'lucide-react';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
  const [activePost, setActivePost] = useState<any>(null);

  const posts = [
    {
      id: 1,
      title: "5 Best Home Exercises to Lose Belly Fat",
      excerpt: "Targeting stubborn belly fat doesn't require a gym membership. Here are the top 5 scientifically proven moves...",
      date: "Oct 12, 2023",
      category: "Workout",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
      content: `
        <p class="mb-6">Belly fat is more than just a nuisance that makes your clothes feel tight. It's seriously harmful. This type of fat—referred to as visceral fat—is a major risk factor for type 2 diabetes, heart disease, and other conditions.</p>
        <h3 class="text-2xl font-bold text-slate-900 mb-4 mt-8">1. Crunches</h3>
        <p class="mb-4">The most effective exercise to burn stomach fat is crunches. Crunches rank top when we talk of fat-burning exercises. You can start by lying down flat with your knees bent and your feet on the ground.</p>
        <h3 class="text-2xl font-bold text-slate-900 mb-4 mt-8">2. Walking</h3>
        <p class="mb-4">A very simple cardio exercise which helps you lose the belly fat and stay fit. Walking along with a balanced diet can do wonders if you are trying to shed off the extra kilos.</p>
        <h3 class="text-2xl font-bold text-slate-900 mb-4 mt-8">3. Zumba</h3>
        <p class="mb-4">Workouts are not a punishment and therefore, some fun workouts can also do wonders for your health. Zumba workouts are high-intensity exercise.</p>
        <p class="mt-8 p-4 bg-brand-green/10 rounded-xl text-brand-darkGreen border border-brand-green/20"><strong>Summary:</strong> Consistency is key. Do these exercises 3-4 times a week combined with a caloric deficit for best results.</p>
      `
    },
    {
      id: 2,
      title: "Why You're Not Losing Weight (Even on a Diet)",
      excerpt: "Stuck at a plateau? You might be making one of these common mistakes with your calorie counting or sleep schedule.",
      date: "Oct 08, 2023",
      category: "Tips",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
      content: `
        <p class="mb-6">You've been eating clean, skipping dessert, and exercising, but the scale won't budge. It's frustrating, but common. Here are the top reasons why.</p>
        <h3 class="text-2xl font-bold text-slate-900 mb-4 mt-8">1. You're eating more than you think</h3>
        <p class="mb-4">Most people underestimate their calorie intake by up to 50%. That handful of nuts? It could be 200 calories. The oil you cooked with? Another 120.</p>
        <h3 class="text-2xl font-bold text-slate-900 mb-4 mt-8">2. You're not sleeping enough</h3>
        <p class="mb-4">Poor sleep raises cortisol levels, which promotes fat storage, especially in the belly area. Aim for 7-8 hours of quality sleep.</p>
        <h3 class="text-2xl font-bold text-slate-900 mb-4 mt-8">3. You're not eating enough protein</h3>
        <p class="mb-4">Protein is the single most important nutrient for losing weight. Eating protein at 25-30% of calories can boost metabolism by 80-100 calories per day.</p>
      `
    },
    {
      id: 3,
      title: "Simple Indian Diet Plan for Busy Professionals",
      excerpt: "A practical guide to eating healthy Indian meals without spending hours in the kitchen. Meal prep hacks included.",
      date: "Sep 25, 2023",
      category: "Diet",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&q=80&w=800",
      content: `
        <p class="mb-6">Indian food is delicious but can be heavy on oil and carbs. Here is how to fix it without losing flavor.</p>
        <h3 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Breakfast: Poha with Veggies</h3>
        <p class="mb-4">Add peas, carrots, and peanuts to your Poha. Reduce the oil. Use lemon for flavor instead of extra salt.</p>
        <h3 class="text-2xl font-bold text-slate-900 mb-4 mt-8">Lunch: The 50% Rule</h3>
        <p class="mb-4">Make sure 50% of your tiffin is Sabzi (Vegetables), 25% is Dal/Chicken, and only 25% is Roti/Rice.</p>
      `
    },
    {
      id: 4,
      title: "Morning Habits That Boost Metabolism",
      excerpt: "Start your day right with these simple rituals that fire up your fat-burning engines for the rest of the day.",
      date: "Sep 15, 2023",
      category: "Lifestyle",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1495197359483-d092478c170a?auto=format&fit=crop&q=80&w=800",
      content: `
        <p class="mb-6">How you start your morning sets the tone for the rest of the day. Try these:</p>
        <ul class="list-disc pl-5 space-y-4">
          <li><strong>Drink 500ml Water:</strong> Immediately upon waking up. It kickstarts your metabolism by 24% for 90 minutes.</li>
          <li><strong>Get Sunlight:</strong> Exposure to sunlight in the morning helps regulate your circadian rhythm and sleep better at night.</li>
          <li><strong>Cold Shower:</strong> It activates brown fat, which burns calories to generate heat.</li>
        </ul>
      `
    }
  ];

  return (
    <div className="animate-fade-in pb-20 bg-brand-surface">
      <SEO 
        title="Weight Loss Blog - Tips for Your Weight Loss Plan" 
        description="Read our latest articles on workouts, healthy recipes, motivation, and lifestyle tips for weight loss." 
        keywords="weight loss blog, fitness tips, healthy living articles, weight loss plan"
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "SmartFit Blog",
          "description": "Expert advice on weight loss and healthy living."
        }}
      />

      <div className="bg-white py-24 text-center border-b border-slate-100">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight font-heading">The Journal</h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Tips, tricks, and science-backed advice for a healthier you.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col group h-full hover:-translate-y-2">
              <div className="h-72 overflow-hidden relative">
                <div className="absolute top-6 left-6 flex gap-2 z-10">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-slate-900 shadow-lg">
                        {post.category}
                    </span>
                </div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  width="800"
                  height="450"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center text-xs font-bold text-slate-400 mb-6 space-x-4 uppercase tracking-wide">
                  <span className="flex items-center"><Calendar size={14} className="mr-2" /> {post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="flex items-center"><BookOpen size={14} className="mr-2" /> {post.readTime} read</span>
                </div>
                
                <h2 
                  onClick={() => setActivePost(post)}
                  className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-brand-green transition-colors cursor-pointer leading-tight font-heading"
                >
                  {post.title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8 line-clamp-3 text-lg font-light">
                  {post.excerpt}
                </p>
                
                <button 
                  onClick={() => setActivePost(post)}
                  className="text-slate-900 font-bold inline-flex items-center group/btn mt-auto text-sm uppercase tracking-wider"
                >
                  <span className="border-b-2 border-brand-green pb-1 group-hover:border-transparent transition-all">Read Article</span> 
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center ml-4 group-hover:bg-brand-green group-hover:text-white transition-all group-hover/btn:translate-x-2">
                    <ArrowRight size={18} />
                  </div>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activePost && (
         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in-up">
           <div className="bg-white h-[90vh] sm:h-auto sm:max-h-[90vh] w-full max-w-3xl sm:rounded-[2rem] rounded-t-[2rem] shadow-2xl overflow-y-auto relative animate-scale-in">
              <SEO 
                title={activePost.title} 
                description={activePost.excerpt}
                image={activePost.image}
                type="article"
                schema={{
                  "@context": "https://schema.org",
                  "@type": "Article",
                  "headline": activePost.title,
                  "image": [activePost.image],
                  "author": {
                    "@type": "Person",
                    "name": "Akshay Mahajan"
                  },
                  "datePublished": "2023-10-12" // Ideally dynamic
                }}
              />
              
              {/* Header Image */}
              <div className="relative h-64 sm:h-80 w-full shrink-0">
                 <img src={activePost.image} className="w-full h-full object-cover" alt="Article Cover" />
                 <button 
                  onClick={() => setActivePost(null)}
                  className="absolute top-6 right-6 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors z-20"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
              </div>

              {/* Content */}
              <div className="px-8 sm:px-12 pb-12 -mt-10 relative z-10">
                 <div className="flex items-center gap-4 mb-6">
                    <span className="bg-brand-green/10 text-brand-darkGreen px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                      {activePost.category}
                    </span>
                    <span className="text-slate-400 text-xs font-bold flex items-center">
                       <Clock size={14} className="mr-1" /> {activePost.readTime} read
                    </span>
                 </div>
                 
                 <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 leading-tight font-heading">{activePost.title}</h1>
                 
                 <div className="flex items-center justify-between border-y border-slate-100 py-4 mb-8">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                         <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-900">Akshay Mahajan</p>
                          <p className="text-xs text-slate-500">{activePost.date}</p>
                       </div>
                    </div>
                    <button className="text-slate-400 hover:text-brand-blue transition-colors">
                       <Share2 size={20} />
                    </button>
                 </div>

                 <div 
                   className="prose prose-lg text-slate-600 prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-brand-green"
                   dangerouslySetInnerHTML={{ __html: activePost.content }} 
                 />

                 <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                    <p className="text-slate-400 text-sm mb-4">Did you find this helpful?</p>
                    <button 
                      onClick={() => setActivePost(null)}
                      className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-green transition-all"
                    >
                      Close Article
                    </button>
                 </div>
              </div>
           </div>
         </div>
      )}
    </div>
  );
};

export default Blog;