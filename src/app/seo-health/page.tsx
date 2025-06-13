"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  Zap,
  Menu
} from "lucide-react";

export default function SEOHealth() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock SEO health data
    setTimeout(() => {
      setHealthData({
        overallScore: 78,
        categories: {
          technicalSEO: { score: 85, status: 'good', issues: 2 },
          contentQuality: { score: 72, status: 'warning', issues: 5 },
          userExperience: { score: 80, status: 'good', issues: 3 },
          performance: { score: 65, status: 'warning', issues: 4 }
        },
        quickWins: [
          { title: 'Add missing meta descriptions', impact: 'High', effort: 'Low' },
          { title: 'Optimize page titles', impact: 'Medium', effort: 'Low' },
          { title: 'Fix broken internal links', impact: 'Medium', effort: 'Medium' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 relative">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                >
                  <Menu className="h-5 w-5 text-white" />
                </button>
                <h1 className="text-2xl font-bold text-white">SEO Health Dashboard</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-white">Loading SEO health data...</div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Overall Score */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">{healthData.overallScore}</div>
                  <div className="text-white/80">Overall SEO Health Score</div>
                </div>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(healthData.categories).map(([key, category]) => (
                  <div key={key} className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      {category.status === 'good' ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      )}
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{category.score}</div>
                    <div className="text-white/60 text-sm">{category.issues} issues found</div>
                  </div>
                ))}
              </div>

              {/* Quick Wins */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Wins
                </h3>
                <div className="space-y-4">
                  {healthData.quickWins.map((win, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium">{win.title}</h4>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            win.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                            win.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {win.impact} Impact
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            win.effort === 'Low' ? 'bg-green-500/20 text-green-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {win.effort} Effort
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
