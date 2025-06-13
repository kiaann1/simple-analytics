import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  gradient: string;
}

export function MetricCard({ title, value, change, icon: Icon, gradient }: MetricCardProps) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-black/50 transition-all duration-300 card-hover group cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} group-hover:scale-110 transition-transform duration-300 animate-pulse-glow`}>
          <Icon className="h-6 w-6 text-white" />
        </div>        {change !== undefined && (
          <div className={`flex items-center space-x-1 transition-all duration-300 ${change >= 0 ? 'text-green-400 group-hover:text-green-300' : 'text-red-400 group-hover:text-red-300'}`}>
            {change >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {Math.abs(change).toFixed(1)}%
            </span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-white/70 text-sm font-medium mb-1 group-hover:text-white/90 transition-colors duration-300">{title}</h3>
        <p className="text-white text-2xl font-bold group-hover:text-white group-hover:scale-105 transition-all duration-300">{value}</p>
      </div>
    </div>
  );
}
