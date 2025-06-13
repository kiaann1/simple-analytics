interface GeoData {
  city: string;
  sessions: number;
}

interface GeographicChartProps {
  data: GeoData[];
}

export function GeographicChart({ data }: GeographicChartProps) {
  const maxSessions = Math.max(...data.map(d => d.sessions));

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-black/50 transition-all duration-300 card-hover chart-container">
      <h3 className="text-white text-lg font-semibold mb-4 animate-slide-in-left">Geographic Breakdown by City</h3>
      
      <div className="space-y-3 animate-fade-in-up animate-delay-150">
        {data.slice(0, 10).map((item, index) => {
          const percentage = (item.sessions / maxSessions) * 100;
          
          return (            <div 
              key={item.city} 
              className="space-y-1 animate-slide-in-left hover:bg-white/5 p-2 rounded-lg transition-all duration-300"
              style={{ animationDelay: `${index * 75 + 200}ms` }}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80 hover:text-white transition-colors duration-300">{item.city}</span>
                <span className="text-white font-medium hover:scale-105 transition-transform duration-300">{item.sessions.toLocaleString()}</span>
              </div><div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${percentage}%`,
                    animationDelay: `${index * 100 + 400}ms`
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {data.length > 10 && (
        <div className="mt-4 text-center animate-fade-in animate-delay-700">          <span className="text-white/60 text-sm hover:text-white/80 transition-colors duration-300">
            Showing top 10 of {data.length} cities
          </span>
        </div>
      )}
    </div>
  );
}
