"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { BookOpen, Target, Zap, Users, Menu } from "lucide-react";

export default function SEOTips() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tipCategories = [
    {
      icon: Target,
      title: "Keyword Research",
      tips: [
        "Start with your customers' language - what terms do they actually use?",
        "Use long-tail keywords (3+ words) for easier ranking opportunities",
        "Check keyword difficulty - aim for easier keywords when starting",
        "Look at 'People Also Ask' sections in Google for content ideas"
      ]
    },
    {
      icon: BookOpen,
      title: "Content Optimization",
      tips: [
        "Write for humans first, search engines second",
        "Include your target keyword in the title, first paragraph, and naturally throughout",
        "Use header tags (H1, H2, H3) to structure your content",
        "Aim for comprehensive content that answers all related questions"
      ]
    },
    {
      icon: Zap,
      title: "Technical SEO",
      tips: [
        "Ensure your site loads in under 3 seconds",
        "Make sure your site works perfectly on mobile devices",
        "Use descriptive URLs (example.com/seo-tips not example.com/page123)",
        "Add alt text to all images describing what they show"
      ]
    },
    {
      icon: Users,
      title: "User Experience",
      tips: [
        "Keep users on your site longer with engaging, valuable content",
        "Make navigation intuitive - users should find what they need quickly",
        "Use internal links to guide users to related content",
        "Ensure your site has a clear purpose and call-to-action"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 relative">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
              >
                <Menu className="h-5 w-5 text-white" />
              </button>
              <h1 className="text-2xl font-bold text-white">SEO Learning Hub</h1>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">SEO Learning Hub</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Master the fundamentals of SEO with these beginner-friendly tips and strategies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tipCategories.map((category, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{category.title}</h2>
                </div>
                
                <ul className="space-y-3">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-white/90">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick Action Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Improve Your SEO?</h2>
            <p className="text-white/80 mb-6">
              Start with these quick wins that can improve your search rankings in just a few hours:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">1. Audit Your Titles</h3>
                <p className="text-white/70 text-sm">Check that all pages have unique, descriptive titles under 60 characters</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">2. Add Meta Descriptions</h3>
                <p className="text-white/70 text-sm">Write compelling 150-character descriptions for your most important pages</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">3. Fix Broken Links</h3>
                <p className="text-white/70 text-sm">Find and fix any 404 errors or broken internal links on your site</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
