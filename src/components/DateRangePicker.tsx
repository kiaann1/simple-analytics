interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onChange: (dateRange: { startDate: string; endDate: string }) => void;
}

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ startDate: e.target.value, endDate });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ startDate, endDate: e.target.value });
  };

  const presetRanges = [
    { label: "90 days", days: 90 },
    { label: "30 days", days: 30 },
    { label: "7 days", days: 7 },
  ];

  const setPresetRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    
    onChange({
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    });
  };

  // Check if current date range matches a preset
  const isActivePreset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    
    const expectedStart = start.toISOString().split('T')[0];
    const expectedEnd = end.toISOString().split('T')[0];
    
    return startDate === expectedStart && endDate === expectedEnd;
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
      <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2 hover:bg-white/20 transition-all duration-300 focus-ring">        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="bg-transparent text-white text-sm border-none outline-none cursor-pointer hover:text-white/90 transition-colors duration-300 [color-scheme:dark]"
        />
        <span className="text-white/60">to</span>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="bg-transparent text-white text-sm border-none outline-none cursor-pointer hover:text-white/90 transition-colors duration-300 [color-scheme:dark]"
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        {presetRanges.map((range, index) => {
          const isActive = isActivePreset(range.days);
          return (
            <button
              key={range.days}
              onClick={() => setPresetRange(range.days)}
              className={`px-3 py-1 text-xs rounded-md transition-all duration-300 cursor-pointer whitespace-nowrap btn-hover animate-scale-in focus-ring ${
                isActive 
                  ? 'bg-indigo-500 text-white shadow-lg animate-pulse-glow' 
                  : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white hover:scale-105'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {range.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
