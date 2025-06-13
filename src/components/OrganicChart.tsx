import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";

interface OrganicData {
  date: string;
  sessions: number;
}

interface OrganicChartProps {
  data: OrganicData[];
}

export function OrganicChart({ data }: OrganicChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.date), 'MMM dd')
  }));  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-black/50 transition-all duration-300 card-hover chart-container">
      <h3 className="text-white text-lg font-semibold mb-4 animate-slide-in-left">Organic Sessions Over Time</h3>
      
      <div className="h-80 animate-fade-in-up animate-delay-150">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="formattedDate" 
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
              formatter={(value: number) => [`${value.toLocaleString()} sessions`, 'Organic Sessions']}
              labelFormatter={(label) => `Date: ${label}`}
              labelStyle={{ 
                color: '#ffffff',
                fontWeight: '600',
                marginBottom: '4px'
              }}
              itemStyle={{
                color: '#ffffff'
              }}
            />            <Line 
              type="monotone" 
              dataKey="sessions" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              animationBegin={200}
              animationDuration={1200}
              strokeDasharray="5 5"
              strokeDashoffset={100}
            />
            <defs>
              <linearGradient id="organicGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
