import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface TrafficData {
  source: string;
  sessions: number;
  percentage: number;
}

interface TrafficChartProps {
  data: TrafficData[];
}

const COLORS = [
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#ec4899', // Pink
  '#84cc16', // Lime
];

export function TrafficChart({ data }: TrafficChartProps) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-black/50 transition-all duration-300 card-hover chart-container">
      <h3 className="text-white text-lg font-semibold mb-4 animate-slide-in-left">Traffic by Channel</h3>
      
      <div className="h-80 animate-fade-in-up animate-delay-150">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="sessions"
              nameKey="source"
              animationBegin={200}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.95)', // slate-800 with transparency
                border: '1px solid rgba(148, 163, 184, 0.3)', // slate-400 border
                borderRadius: '8px',
                color: '#ffffff',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
                fontSize: '14px',
                fontWeight: 'normal'
              }}
              formatter={(value: number, name: string) => [
                `${value.toLocaleString()} sessions`,
                name
              ]}
              labelStyle={{ 
                color: '#ffffff',
                fontWeight: '600',
                marginBottom: '4px'
              }}              itemStyle={{
                color: '#ffffff'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
        <div className="mt-4 space-y-2 animate-fade-in-up animate-delay-300">
        {data.slice(0, 5).map((item, index) => (
          <div 
            key={item.source} 
            className="flex items-center justify-between text-sm hover:bg-white/5 p-2 rounded-lg transition-all duration-300 animate-slide-in-left"
            style={{ animationDelay: `${index * 100 + 400}ms` }}
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full animate-pulse-glow transition-all duration-300 hover:scale-125"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-white/80 hover:text-white transition-colors duration-300">{item.source}</span>
            </div>
            <span className="text-white font-medium hover:scale-105 transition-transform duration-300">{item.percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
