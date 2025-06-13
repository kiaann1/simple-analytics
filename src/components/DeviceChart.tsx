import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DeviceData {
  device: string;
  sessions: number;
  percentage: number;
}

interface DeviceChartProps {
  data: DeviceData[];
}

export function DeviceChart({ data }: DeviceChartProps) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-black/50 transition-all duration-300 card-hover chart-container">
      <h3 className="text-white text-lg font-semibold mb-4 animate-slide-in-left">Device Breakdown</h3>
      
      <div className="h-80 animate-fade-in-up animate-delay-150">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="device" 
              stroke="rgba(255, 255, 255, 0.7)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255, 255, 255, 0.7)"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.95)', // slate-800 with transparency
                border: '1px solid rgba(148, 163, 184, 0.3)', // slate-400 border
                borderRadius: '8px',
                color: '#ffffff',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
                fontSize: '14px',
                fontWeight: 'normal'
              }}
              formatter={(value: number) => [`${value.toLocaleString()} sessions`, 'Sessions']}
              labelStyle={{ 
                color: '#ffffff',
                fontWeight: '600',
                marginBottom: '4px'
              }}
              itemStyle={{
                color: '#ffffff'
              }}
            />            <Bar 
              dataKey="sessions" 
              fill="url(#deviceGradient)"
              radius={[4, 4, 0, 0]}
              animationBegin={200}
              animationDuration={800}
            />
            <defs>
              <linearGradient id="deviceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 animate-fade-in-up animate-delay-300">
        {data.map((item, index) => (
          <div 
            key={item.device} 
            className="text-center p-3 rounded-lg hover:bg-white/5 transition-all duration-300 animate-scale-in card-hover"
            style={{ animationDelay: `${index * 100 + 400}ms` }}
          >
            <div className="text-white font-semibold hover:scale-105 transition-transform duration-300">{item.sessions.toLocaleString()}</div>
            <div className="text-white/60 text-sm hover:text-white/80 transition-colors duration-300">{item.device}</div>
            <div className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors duration-300">{item.percentage.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
