import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, X, Tag } from 'lucide-react';
import SEO from '../components/SEO';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Science of Sleep and Weight Loss",
      excerpt: "Why getting enough rest is just as important as your diet and workout routine.",
      content: `
        <p class="mb-4">Most people focus on diet and exercise when trying to lose weight, but sleep is often the missing piece of the puzzle. Research shows that lack of sleep can significantly hinder fat loss and even lead to muscle loss.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">Hormonal Balance</h3>
        <p class="mb-4">Sleep deprivation disrupts the hormones that regulate hunger. Ghrelin (the hunger hormone) increases, while leptin (the fullness hormone) decreases. This leads to increased cravings, especially for high-calorie, sugary foods.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">Insulin Sensitivity</h3>
        <p class="mb-4">Poor sleep negatively affects your body's ability to process insulin, the hormone that regulates blood sugar. When you're sleep-deprived, your fat cells become less sensitive to insulin, making your body more likely to store energy as fat.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">Recovery and Performance</h3>
        <p class="mb-4">Sleep is when your body repairs muscle tissue damaged during workouts. Without adequate recovery, your performance in the gym suffers, leading to fewer calories burned and less muscle built.</p>
        <p class="mb-4">Aim for 7-9 hours of quality sleep per night to optimize your weight loss efforts.</p>
      `,
      author: "Dr. Sarah Miller",
      date: "Oct 15, 2025",
      readTime: "5 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1541781777621-3914173179fd?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Intermittent Fasting: A Beginner's Guide",
      excerpt: "Everything you need to know about the 16/8 method and how to get started safely.",
      content: `
        <p class="mb-4">Intermittent fasting (IF) isn't a diet, but a pattern of eating. It cycles between periods of fasting and eating. The most common method is the 16/8 protocol, where you fast for 16 hours and eat within an 8-hour window.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">How It Works</h3>
        <p class="mb-4">By extending the fasting window, you allow your insulin levels to drop significantly, which facilitates fat burning. It also naturally restricts your calorie intake by limiting the time you have to eat.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">Benefits Beyond Weight Loss</h3>
        <p class="mb-4">Studies suggest IF can improve heart health, brain function, and reduce inflammation. It may also induce cellular repair processes like autophagy.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">Getting Started</h3>
        <p class="mb-4">Start by pushing your breakfast back by a few hours or eating dinner earlier. Stay hydrated with water, black coffee, or tea during the fasting window. Listen to your body and consult a doctor before starting.</p>
      `,
      author: "Mark Johnson",
      date: "Oct 10, 2025",
      readTime: "7 min read",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1627483262268-9c96d8a31892?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "5 Superfoods to Boost Metabolism",
      excerpt: "Incorporate these nutrient-dense foods into your diet to burn more calories naturally.",
      content: `
        <p class="mb-4">While no food will magically melt fat, some foods can give your metabolism a temporary boost through the thermic effect of food (TEF) or by providing essential nutrients for metabolic processes.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">1. Chili Peppers</h3>
        <p class="mb-4">Capsaicin, the compound that makes peppers spicy, can slightly increase the rate at which your body burns calories.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">2. Coffee</h3>
        <p class="mb-4">Caffeine is a known metabolic booster and can improve physical performance, helping you burn more calories during workouts.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">3. Protein-Rich Foods</h3>
        <p class="mb-4">Protein has a high thermic effect, meaning your body uses more energy to digest it compared to fats or carbs. It also helps preserve muscle mass.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">4. Green Tea</h3>
        <p class="mb-4">Contains catechins and caffeine, which may work synergistically to boost metabolism.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">5. Ginger</h3>
        <p class="mb-4">Ginger can help decrease inflammation and stimulate digestion, potentially aiding in metabolic health.</p>
      `,
      author: "Emily Chen",
      date: "Oct 05, 2025",
      readTime: "4 min read",
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      title: "Strength Training vs. Cardio for Fat Loss",
      excerpt: "Which exercise modality is superior for shedding pounds? The answer might surprise you.",
      content: `
        <p class="mb-4">The debate between cardio and weights is ongoing. While cardio burns more calories per session, strength training builds muscle, which burns more calories at rest.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">The Cardio Advantage</h3>
        <p class="mb-4">Aerobic exercise like running or cycling is excellent for heart health and burns a significant amount of calories while you're doing it. It's great for creating an immediate calorie deficit.</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">The Strength Advantage</h3>
        <p class="mb-4">Lifting weights builds lean muscle mass. Muscle tissue is metabolically active, meaning it burns calories even when you're sleeping. This raises your Basal Metabolic Rate (BMR).</p>
        <h3 class="text-2xl font-bold text-brand-darkGreen mb-3 mt-6">The Verdict</h3>
        <p class="mb-4">For optimal body composition, a combination of both is best. Strength training preserves muscle while in a calorie deficit, and cardio helps increase total daily energy expenditure.</p>
      `,
      author: "Coach Mike",
      date: "Sep 28, 2025",
      readTime: "6 min read",
      category: "Fitness",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="animate-fade-in pb-20 bg-brand-surface">
      <SEO 
        title="Fitness & Nutrition Blog - SmartFit" 
        description="Read the latest articles on weight loss, nutrition, and healthy living." 
        keywords="fitness blog, nutrition tips, weight loss articles, health advice"
      />

      {/* Hero */}
      <div className="bg-brand-surface pt-32 pb-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/20 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[120px] transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-heading animate-fade-in-up">The SmartFit Blog</h1>
          <p className="text-xl text-white/70 font-medium max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Expert advice, science-backed tips, and motivation for your journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className="group bg-brand-card rounded-[2rem] overflow-hidden shadow-card border border-brand-gray/5 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-brand-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-darkGreen uppercase tracking-wide flex items-center gap-1">
                  <Tag size={12} className="text-brand-green" /> {post.category}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs font-bold text-brand-gray mb-4 uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-brand-darkGreen mb-4 font-heading group-hover:text-brand-green transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-brand-gray mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-gray/10">
                  <div className="flex items-center gap-2 text-sm font-bold text-brand-darkGreen">
                    <div className="w-8 h-8 bg-brand-surface rounded-full flex items-center justify-center text-brand-gray">
                      <User size={16} />
                    </div>
                    {post.author}
                  </div>
                  <span className="text-brand-green font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read More <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-brand-card rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl animate-fade-in-up">
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-brand-card/50 backdrop-blur-md rounded-full text-brand-darkGreen hover:bg-brand-card transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="relative h-80 md:h-96 w-full">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <div className="inline-block px-3 py-1 bg-brand-green text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                  {selectedPost.category}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white font-heading leading-tight mb-4">{selectedPost.title}</h2>
                <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-medium">
                  <span className="flex items-center gap-2"><User size={16} /> {selectedPost.author}</span>
                  <span className="flex items-center gap-2"><Calendar size={16} /> {selectedPost.date}</span>
                  <span className="flex items-center gap-2"><Clock size={16} /> {selectedPost.readTime}</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none text-brand-gray prose-headings:font-heading prose-headings:text-brand-darkGreen prose-a:text-brand-green hover:prose-a:text-brand-blue prose-strong:text-brand-darkGreen"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
              
              <div className="mt-12 pt-8 border-t border-brand-gray/10 flex justify-between items-center">
                <p className="text-brand-gray font-medium">Share this article:</p>
                <div className="flex gap-4">
                  <button className="p-2 rounded-full bg-brand-surface text-brand-darkGreen hover:bg-brand-green hover:text-white transition-colors">
                    <FacebookIcon />
                  </button>
                  <button className="p-2 rounded-full bg-brand-surface text-brand-darkGreen hover:bg-brand-green hover:text-white transition-colors">
                    <TwitterIcon />
                  </button>
                  <button className="p-2 rounded-full bg-brand-surface text-brand-darkGreen hover:bg-brand-green hover:text-white transition-colors">
                    <LinkedinIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple icon components for the share buttons
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export default Blog;
