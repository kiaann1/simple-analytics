interface LandingPageData {
  page: string;
  sessions: number;
  avgEngagementTime: number;
  engagementRate: number;
}

interface LandingPagesTableProps {
  data: LandingPageData[];
}

export function LandingPagesTable({ data }: LandingPagesTableProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:bg-black/50 transition-all duration-300">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-white text-lg font-semibold animate-slide-in-left">Top Landing Pages by Organic Traffic</h3>
      </div>
      
      {/* Mobile View */}
      <div className="block md:hidden">
        {data.map((page, index) => (
          <div 
            key={index} 
            className="p-4 border-b border-white/5 hover:bg-white/10 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-mono truncate max-w-[200px] hover:text-blue-300 transition-colors duration-300">
                  {page.page}
                </span>
                <span className="text-white font-medium text-sm animate-scale-in">{page.sessions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/70 hover:text-white/90 transition-colors duration-300">Avg. Time: {formatTime(page.avgEngagementTime)}</span>
                <span className="text-white/70 hover:text-white/90 transition-colors duration-300">Rate: {(page.engagementRate * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="animate-slide-in-left">
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/70 font-medium hover:text-white/90 transition-colors duration-300">Page</th>
              <th className="text-right p-4 text-white/70 font-medium hover:text-white/90 transition-colors duration-300">Sessions</th>
              <th className="text-right p-4 text-white/70 font-medium hover:text-white/90 transition-colors duration-300">Avg. Engagement Time</th>
              <th className="text-right p-4 text-white/70 font-medium hover:text-white/90 transition-colors duration-300">Engagement Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((page, index) => (
              <tr 
                key={index} 
                className="border-b border-white/5 hover:bg-white/10 transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <td className="p-4">
                  <span className="text-white text-sm font-mono hover:text-blue-300 transition-colors duration-300">
                    {page.page.length > 60 ? `${page.page.substring(0, 60)}...` : page.page}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-white font-medium group-hover:text-white group-hover:scale-105 transition-all duration-300 animate-scale-in">{page.sessions.toLocaleString()}</span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-white font-medium group-hover:text-white group-hover:scale-105 transition-all duration-300 animate-scale-in">{formatTime(page.avgEngagementTime)}</span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-white font-medium group-hover:text-white group-hover:scale-105 transition-all duration-300 animate-scale-in">
                    {(page.engagementRate * 100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        
      {data.length === 0 && (
        <div className="p-8 text-center animate-fade-in">
          <p className="text-white/60">No landing page data available for the selected period.</p>
        </div>
      )}
    </div>
  );
}
