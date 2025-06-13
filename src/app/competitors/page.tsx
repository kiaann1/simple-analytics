"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Target, TrendingUp, Search, Globe, Menu } from "lucide-react";

interface CompetitorData {
  name: string;
  domain: string;
  organicTraffic: number;
  keywords: number;
  backlinks: number;
  domainAuthority: number;
}

export default function Competitors() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [competitorData, setCompetitorData] = useState<CompetitorData[] | null>(null);

  useEffect(() => {
    // Mock competitor data
    setTimeout(() => {
      setCompetitorData([
        {
          name: 'Competitor A',
          domain: 'competitor-a.com',
          organicTraffic: 85000,
          keywords: 2400,
          backlinks: 15600,
          domainAuthority: 65
        },
        {
          name: 'Competitor B', 
          domain: 'competitor-b.co.uk',
          organicTraffic: 62000,
          keywords: 1850,
          backlinks: 9200,
          domainAuthority: 58
        },
        {
          name: 'Competitor C',
          domain: 'competitor-c.net',
          organicTraffic: 43000,
          keywords: 1200,
          backlinks: 7800,
          domainAuthority: 52
        }
      ]);
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
              <h1 className="text-2xl font-bold text-white">Competitor Analysis</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {competitorData && (
            <div className="space-y-6">
              {competitorData.map((competitor, index) => (
                <div key={index} className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-white text-xl font-semibold">{competitor.name}</h3>
                      <p className="text-white/60">{competitor.domain}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">Domain Authority</div>
                      <div className="text-2xl font-bold text-blue-400">{competitor.domainAuthority}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-400" />
                        <span className="text-white/80">Organic Traffic</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{competitor.organicTraffic.toLocaleString()}</div>
                      <div className="text-white/60 text-sm">monthly visits</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Search className="h-5 w-5 text-blue-400" />
                        <span className="text-white/80">Ranking Keywords</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{competitor.keywords.toLocaleString()}</div>
                      <div className="text-white/60 text-sm">keywords</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-5 w-5 text-purple-400" />
                        <span className="text-white/80">Backlinks</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{competitor.backlinks.toLocaleString()}</div>
                      <div className="text-white/60 text-sm">referring domains</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
