"use client";

import { FileText, Target, Lightbulb } from "lucide-react";

interface ContentGap {
  topic: string;
  searchVolume: number;
  difficulty: 'Low' | 'Medium' | 'High';
  competitorCoverage: number;
  opportunity: string;
  suggestedContent: string;
}

export function ContentGapAnalysis() {
  const contentGaps: ContentGap[] = [
    {
      topic: 'Local SEO strategies',
      searchVolume: 2400,
      difficulty: 'Medium',
      competitorCoverage: 3,
      opportunity: 'High',
      suggestedContent: 'Complete guide to local SEO for small businesses'
    },
    {
      topic: 'Google Analytics 4 setup',
      searchVolume: 1800,
      difficulty: 'Low',
      competitorCoverage: 7,
      opportunity: 'Medium',
      suggestedContent: 'Step-by-step GA4 migration tutorial'
    },
    {
      topic: 'Mobile SEO checklist',
      searchVolume: 1200,
      difficulty: 'Low',
      competitorCoverage: 2,
      opportunity: 'High',
      suggestedContent: '2024 mobile SEO optimization checklist'
    }
  ];

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-5 w-5 text-white" />
        <h3 className="text-white text-xl font-semibold">Content Gap Analysis</h3>
      </div>

      <div className="space-y-4">
        {contentGaps.map((gap, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">{gap.topic}</h4>
              <span className={`px-2 py-1 rounded text-xs ${
                gap.opportunity === 'High' ? 'bg-green-500/20 text-green-400' :
                gap.opportunity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {gap.opportunity} Opportunity
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
              <div>
                <div className="text-white/60">Search Volume</div>
                <div className="text-white">{gap.searchVolume.toLocaleString()}/month</div>
              </div>
              <div>
                <div className="text-white/60">Difficulty</div>
                <div className="text-white">{gap.difficulty}</div>
              </div>
              <div>
                <div className="text-white/60">Competitors</div>
                <div className="text-white">{gap.competitorCoverage} covering this</div>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5" />
              <div>
                <div className="text-yellow-400 text-sm font-medium">Suggested Content:</div>
                <div className="text-white/80 text-sm">{gap.suggestedContent}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
