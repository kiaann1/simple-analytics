"use client";

import { useState, useEffect } from "react";
import { Search, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface KeywordData {
  keyword: string;
  position: number;
  previousPosition: number;
  searchVolume: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  clicks: number;
  impressions: number;
  ctr: number;
}

export function KeywordTracker({ propertyId }: { propertyId: string }) {
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock keyword data
    const mockKeywords: KeywordData[] = [
      { keyword: 'digital marketing agency', position: 8, previousPosition: 12, searchVolume: 1200, difficulty: 'Hard', clicks: 45, impressions: 980, ctr: 4.6 },
      { keyword: 'seo services london', position: 15, previousPosition: 18, searchVolume: 800, difficulty: 'Medium', clicks: 23, impressions: 560, ctr: 4.1 },
      { keyword: 'website analytics', position: 25, previousPosition: 22, searchVolume: 600, difficulty: 'Easy', clicks: 12, impressions: 340, ctr: 3.5 },
    ];
    
    setTimeout(() => {
      setKeywords(mockKeywords);
      setLoading(false);
    }, 500);
  }, [propertyId]);

  if (loading) {
    return <div className="text-white">Loading keyword data...</div>;
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-xl font-semibold flex items-center gap-2">
          <Search className="h-5 w-5" />
          Keyword Performance
        </h3>
        <div className="text-sm text-white/60">Last 30 days</div>
      </div>

      <div className="space-y-4">
        {keywords.map((keyword, index) => {
          const positionChange = keyword.previousPosition - keyword.position;
          const isImproving = positionChange > 0;
          
          return (
            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-white font-medium">{keyword.keyword}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    keyword.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    keyword.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {keyword.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">#{keyword.position}</span>
                  {positionChange !== 0 && (
                    <div className={`flex items-center gap-1 ${isImproving ? 'text-green-400' : 'text-red-400'}`}>
                      {isImproving ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="text-sm">{Math.abs(positionChange)}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-white/60">Volume</div>
                  <div className="text-white">{keyword.searchVolume.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-white/60">Clicks</div>
                  <div className="text-white">{keyword.clicks}</div>
                </div>
                <div>
                  <div className="text-white/60">Impressions</div>
                  <div className="text-white">{keyword.impressions}</div>
                </div>
                <div>
                  <div className="text-white/60">CTR</div>
                  <div className="text-white">{keyword.ctr}%</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-blue-400 font-medium mb-1">SEO Tip</h4>
            <p className="text-white/80 text-sm">
              Focus on improving positions for keywords ranking 11-20. These have the best opportunity for quick wins to reach page 1.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
