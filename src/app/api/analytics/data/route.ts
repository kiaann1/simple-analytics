import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  // Calculate date range
  const start = new Date(startDate || '2024-01-01');
  const end = new Date(endDate || new Date().toISOString().split('T')[0]);
  const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  // Generate data based on date range
  const baseMultiplier = Math.max(0.5, daysDiff / 30);
  
  // Pre-calculate random values to avoid recalculation
  const engagementVariation = (Math.random() - 0.5) * 0.1;
  const timeVariation = Math.floor((Math.random() - 0.5) * 40);
  
  const mockAnalyticsData = {
    totalUsers: Math.floor(12847 * baseMultiplier),
    sessions: Math.floor(18432 * baseMultiplier),
    pageviews: Math.floor(45621 * baseMultiplier),
    engagementRate: 0.342 + engagementVariation,
    avgEngagementTime: 154 + timeVariation,
    newUsers: Math.floor(8234 * baseMultiplier),
    returningUsers: Math.floor(4613 * baseMultiplier),
    
    previousPeriodData: {
      totalUsers: Math.floor(11234 * baseMultiplier * 0.9),
      sessions: Math.floor(16789 * baseMultiplier * 0.9),
      pageviews: Math.floor(41234 * baseMultiplier * 0.9),
      engagementRate: 0.328,
      avgEngagementTime: 142,
      newUsers: Math.floor(7456 * baseMultiplier * 0.9),
      returningUsers: Math.floor(3778 * baseMultiplier * 0.9)
    },

    trafficSources: [
      { source: 'google', sessions: Math.floor(7234 * baseMultiplier), percentage: 39.2 },
      { source: 'direct', sessions: Math.floor(4521 * baseMultiplier), percentage: 24.5 },
      { source: 'social', sessions: Math.floor(3421 * baseMultiplier), percentage: 18.6 },
      { source: 'referral', sessions: Math.floor(2123 * baseMultiplier), percentage: 11.5 },
      { source: 'email', sessions: Math.floor(1133 * baseMultiplier), percentage: 6.2 }
    ],

    deviceBreakdown: [
      { device: 'desktop', sessions: Math.floor(9876 * baseMultiplier), percentage: 53.6 },
      { device: 'mobile', sessions: Math.floor(7234 * baseMultiplier), percentage: 39.2 },
      { device: 'tablet', sessions: Math.floor(1322 * baseMultiplier), percentage: 7.2 }
    ],

    geoData: [
      { city: 'London', sessions: Math.floor(12343 * baseMultiplier), percentage: 67.0 },
      { city: 'New York', sessions: Math.floor(2134 * baseMultiplier), percentage: 11.6 },
      { city: 'Toronto', sessions: Math.floor(1234 * baseMultiplier), percentage: 6.7 },
      { city: 'Sydney', sessions: Math.floor(987 * baseMultiplier), percentage: 5.4 },
      { city: 'Berlin', sessions: Math.floor(734 * baseMultiplier), percentage: 4.0 }
    ],

    organicData: {
      organicSessions: Math.floor(7234 * baseMultiplier),
      organicUsers: Math.floor(5643 * baseMultiplier),
      organicEngagementRate: 0.378,
      sessionsOverTime: Array.from({ length: Math.min(daysDiff, 30) }, (_, i) => {
        const date = new Date(start);
        date.setDate(date.getDate() + i);
        
        return {
          date: date.toISOString().split('T')[0],
          sessions: Math.floor((200 + (i * 10) + Math.sin(i * 0.5) * 50) * baseMultiplier)
        };
      })
    },

    topLandingPages: [
      { page: '/', sessions: Math.floor(3421 * baseMultiplier), engagementRate: 0.45, avgEngagementTime: 182 },
      { page: '/services', sessions: Math.floor(2134 * baseMultiplier), engagementRate: 0.52, avgEngagementTime: 234 },
      { page: '/about', sessions: Math.floor(1876 * baseMultiplier), engagementRate: 0.38, avgEngagementTime: 156 },
      { page: '/contact', sessions: Math.floor(1234 * baseMultiplier), engagementRate: 0.42, avgEngagementTime: 198 },
      { page: '/blog', sessions: Math.floor(987 * baseMultiplier), engagementRate: 0.48, avgEngagementTime: 287 }
    ]
  };

  // Reduce API delay significantly
  await new Promise(resolve => setTimeout(resolve, 200));

  return NextResponse.json(mockAnalyticsData);
}
