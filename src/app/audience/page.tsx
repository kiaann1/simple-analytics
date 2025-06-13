"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Users, Globe, Clock, TrendingUp, Menu } from "lucide-react";

export default function Audience() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [audienceData, setAudienceData] = useState(null);

  useEffect(() => {
    // Mock audience data
    setTimeout(() => {
      setAudienceData({
        demographics: {
          ageGroups: [
            { range: '18-24', percentage: 15, users: 1847 },
            { range: '25-34', percentage: 35, users: 4296 },
            { range: '35-44', percentage: 28, users: 3437 },
            { range: '45-54', percentage: 15, users: 1847 },
            { range: '55+', percentage: 7, users: 860 }
          ],
          interests: [
            { category: 'Technology', affinity: 95 },
            { category: 'Business', affinity: 88 },
            { category: 'Marketing', affinity: 82 },
            { category: 'Education', affinity: 76 }
          ]
        },
        behavior: {
          avgSessionDuration: '2m 34s',
          pagesPerSession: 3.2,
          bounceRate: 34.2,
          returningVisitors: 42
        }
      });
    }, 500);
  }, []);

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
              <h1 className="text-2xl font-bold text-white">Audience Insights</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {audienceData && (
            <>
              {/* Demographics */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-white text-xl font-semibold mb-6">Age Demographics</h3>
                <div className="space-y-4">
                  {audienceData.demographics.ageGroups.map((group, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-white/80">{group.range}</span>
                      <div className="flex items-center gap-4 flex-1 ml-4">
                        <div className="flex-1 bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${group.percentage}%` }}
                          />
                        </div>
                        <span className="text-white text-sm w-12">{group.percentage}%</span>
                        <span className="text-white/60 text-sm w-16">{group.users.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-white text-xl font-semibold mb-6">Interest Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {audienceData.demographics.interests.map((interest, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-white font-medium mb-2">{interest.category}</div>
                      <div className="text-2xl font-bold text-blue-400">{interest.affinity}</div>
                      <div className="text-white/60 text-sm">Affinity Index</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Behavior Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-blue-400" />
                    <h3 className="text-white font-semibold">Avg Session</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{audienceData.behavior.avgSessionDuration}</div>
                </div>
                
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-6 w-6 text-green-400" />
                    <h3 className="text-white font-semibold">Pages/Session</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{audienceData.behavior.pagesPerSession}</div>
                </div>
                
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                    <h3 className="text-white font-semibold">Bounce Rate</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{audienceData.behavior.bounceRate}%</div>
                </div>
                
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-6 w-6 text-orange-400" />
                    <h3 className="text-white font-semibold">Returning</h3>
                  </div>
                  <div className="text-2xl font-bold text-white">{audienceData.behavior.returningVisitors}%</div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
