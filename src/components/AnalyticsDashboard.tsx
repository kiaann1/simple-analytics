"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useSession, signOut } from "next-auth/react";
import { AnalyticsData } from "@/lib/google-analytics-new";
import { MetricCard } from "./MetricCard";
import { TrafficChart } from "./TrafficChart";
import { DeviceChart } from "./DeviceChart";
import { GeographicChart } from "./GeographicChart";
import { OrganicChart } from "./OrganicChart";
import { LandingPagesTable } from "./LandingPagesTable";
import { DateRangePicker } from "./DateRangePicker";
import { 
  Users, 
  MousePointer, 
  Eye, 
  Clock, 
  UserCheck, 
  RefreshCw,
  Settings,
  LogOut,
  Menu,
  X,
  RotateCcw
} from "lucide-react";
import { subDays, format } from "date-fns";
import { Sidebar } from "./Sidebar";

interface AnalyticsDashboardProps {
  propertyId: string;
  onPropertyChange: () => void;
}

// Memoize individual metric cards
const MemoizedMetricCard = memo(MetricCard);
const MemoizedTrafficChart = memo(TrafficChart);
const MemoizedDeviceChart = memo(DeviceChart);
const MemoizedGeographicChart = memo(GeographicChart);
const MemoizedOrganicChart = memo(OrganicChart);
const MemoizedLandingPagesTable = memo(LandingPagesTable);

export function AnalyticsDashboard({ propertyId, onPropertyChange }: AnalyticsDashboardProps) {
  const { data: session } = useSession();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd')
  });

  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/analytics/data?propertyId=${propertyId}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
        { 
          cache: 'force-cache', // Enable caching
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  }, [propertyId, dateRange.startDate, dateRange.endDate]);

  // Debounce date range changes
  const debouncedFetch = useMemo(
    () => {
      let timeoutId: NodeJS.Timeout;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fetchAnalyticsData, 300);
      };
    },
    [fetchAnalyticsData]
  );

  useEffect(() => {
    debouncedFetch();
  }, [debouncedFetch]);

  // Memoize the percentage calculation to avoid recalculation
  const calculatePercentageChange = useMemo(() => 
    (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    }, []
  );

  // Memoize metric cards with stable dependencies
  const metricCards = useMemo(() => {
    if (!data) return null;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MemoizedMetricCard
          title="Total Users"
          value={data.totalUsers.toLocaleString()}
          change={calculatePercentageChange(data.totalUsers, data.previousPeriodData.totalUsers)}
          icon={Users}
          gradient="from-blue-500 to-blue-600"
        />
        <MemoizedMetricCard
          title="Sessions"
          value={data.sessions.toLocaleString()}
          change={calculatePercentageChange(data.sessions, data.previousPeriodData.sessions)}
          icon={MousePointer}
          gradient="from-purple-500 to-purple-600"
        />
        <MemoizedMetricCard
          title="Pageviews"
          value={data.pageviews.toLocaleString()}
          change={calculatePercentageChange(data.pageviews, data.previousPeriodData.pageviews)}
          icon={Eye}
          gradient="from-green-500 to-green-600"
        />
        <MemoizedMetricCard
          title="Engagement Rate"
          value={`${(data.engagementRate * 100).toFixed(1)}%`}
          icon={UserCheck}
          gradient="from-cyan-500 to-cyan-600"
        />
      </div>
    );
  }, [data, calculatePercentageChange]);

  if (loading && !data) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-6 animate-fade-in">
          {/* Beautiful pulsing dots loader */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="space-y-2 animate-fade-in-up">
            <p className="text-white font-medium text-lg">Loading analytics data</p>
            <p className="text-white/60 text-sm">Fetching insights from Google Analytics</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 relative">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md animate-slide-in-left">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 animate-slide-in-left animate-delay-150">
                {/* Sidebar Toggle */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 cursor-pointer btn-hover focus-ring"
                  title="Toggle Sidebar"
                >
                  <Menu className="h-5 w-5 text-white" />
                </button>
                
                <div className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <img 
                    src="/bb-logo.png" 
                    alt="Company Logo" 
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">Analytics Dashboard</h1>
                  <p className="text-white/60 text-sm hidden sm:block">Project: {propertyId}</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-4 animate-slide-in-right animate-delay-225">
                <DateRangePicker 
                  startDate={dateRange.startDate}
                  endDate={dateRange.endDate}
                  onChange={setDateRange}
                />
                
                <button
                  onClick={onPropertyChange}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 cursor-pointer btn-hover focus-ring"
                  title="Change Property"
                >
                  <RotateCcw className="h-5 w-5 text-white" />
                </button>
                
                {/* User Profile & Sign Out */}
                <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2 card-hover">
                  {session?.user?.image && (
                    <img 
                      src={session.user.image} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full animate-scale-in"
                    />
                  )}
                  <div className="hidden xl:block">
                    <div className="text-white text-sm font-medium">
                      {session?.user?.name}
                    </div>
                    <div className="text-white/60 text-xs">
                      {session?.user?.email}
                    </div>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="p-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-md transition-all duration-300 group cursor-pointer btn-hover focus-ring"
                    title="Sign Out"
                  >
                    <LogOut className="h-4 w-4 text-red-400 group-hover:text-red-300" />
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 cursor-pointer btn-hover focus-ring animate-slide-in-right"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4 animate-fade-in-up">
                <div className="space-y-4">
                  <DateRangePicker 
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    onChange={setDateRange}
                  />
                  
                  <div className="flex items-center justify-between">
                    <button
                      onClick={onPropertyChange}
                      className="flex items-center space-x-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 cursor-pointer btn-hover"
                      title="Change Property"
                    >
                      <RotateCcw className="h-5 w-5 text-white" />
                      <span className="text-white text-sm">Change Property</span>
                    </button>
                    
                    {/* Mobile User Profile & Sign Out */}
                    <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2 card-hover">
                      {session?.user?.image && (
                        <img 
                          src={session.user.image} 
                          alt="Profile" 
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      <div>
                        <div className="text-white text-sm font-medium">
                          {session?.user?.name}
                        </div>
                        <div className="text-white/60 text-xs">
                          {session?.user?.email}
                        </div>
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="p-1.5 bg-red-500/20 hover:bg-red-500/30 rounded-md transition-all duration-300 group cursor-pointer btn-hover"
                        title="Sign Out"
                      >
                        <LogOut className="h-4 w-4 text-red-400 group-hover:text-red-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {data && (
          <>
            {/* Section 1: Website Overview */}
            <section className="space-y-6 animate-slide-up">
              <h2 className="text-2xl font-bold text-white">Website Overview</h2>
                {metricCards}
            </section>            {/* Section 2: Traffic Source Overview */}
            <section className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white">Traffic Sources</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="chart-enter">
                  <MemoizedTrafficChart data={data.trafficSources} />
                </div>
                <div className="chart-enter">
                  <MemoizedDeviceChart data={data.deviceBreakdown} />
                </div>
              </div>
              
              <div className="chart-enter">
                <MemoizedGeographicChart data={data.geoData} />
              </div>
            </section>

            {/* Section 3: Organic Search Performance */}
            <section className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white">Organic Search Performance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="animate-bounce-in">
                  <MetricCard
                    title="Organic Sessions"
                    value={data.organicData.organicSessions.toLocaleString()}
                    icon={MousePointer}
                    gradient="from-emerald-500 to-emerald-600"
                  />
                </div>
                
                <div className="animate-bounce-in">
                  <MetricCard
                    title="Organic Users"
                    value={data.organicData.organicUsers.toLocaleString()}
                    icon={Users}
                    gradient="from-teal-500 to-teal-600"
                  />
                </div>
                
                <div className="animate-bounce-in">
                  <MetricCard
                    title="Organic Engagement Rate"
                    value={`${(data.organicData.organicEngagementRate * 100).toFixed(1)}%`}
                    icon={UserCheck}
                    gradient="from-lime-500 to-lime-600"
                  />
                </div>
              </div>
              
              <div className="chart-enter">
                <MemoizedOrganicChart data={data.organicData.sessionsOverTime} />
              </div>
            </section>

            {/* Section 4: Top Landing Pages */}
            <section className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white">Top Landing Pages from Organic Search</h2>              <div className="animate-slide-up">
                <MemoizedLandingPagesTable data={data.topLandingPages} />
              </div>
            </section>
          </>
        )}
      </main>
      </div>
    </div>
  );
}
