import { NextRequest, NextResponse } from 'next/server';

// Mock comprehensive analytics data matching the AnalyticsData interface
const mockAnalyticsData = {
  totalUsers: 12847,
  sessions: 18432,
  pageviews: 45621,
  engagementRate: 0.342,
  avgEngagementTime: 154,
  newUsers: 8234,
  returningUsers: 4613,
  
  previousPeriodData: {
    totalUsers: 11234,
    sessions: 16789,
    pageviews: 41234,
    engagementRate: 0.328,
    avgEngagementTime: 142,
    newUsers: 7456,
    returningUsers: 3778
  },

  trafficSources: [
    { source: 'google', sessions: 7234, percentage: 39.2 },
    { source: 'direct', sessions: 4521, percentage: 24.5 },
    { source: 'social', sessions: 3421, percentage: 18.6 },
    { source: 'referral', sessions: 2123, percentage: 11.5 },
    { source: 'email', sessions: 1133, percentage: 6.2 }
  ],

  deviceBreakdown: [
    { device: 'desktop', sessions: 9876, percentage: 53.6 },
    { device: 'mobile', sessions: 7234, percentage: 39.2 },
    { device: 'tablet', sessions: 1322, percentage: 7.2 }
  ],

  geoData: [
    { city: 'London', sessions: 12343, percentage: 67.0 },
    { city: 'New York', sessions: 2134, percentage: 11.6 },
    { city: 'Toronto', sessions: 1234, percentage: 6.7 },
    { city: 'Sydney', sessions: 987, percentage: 5.4 },
    { city: 'Berlin', sessions: 734, percentage: 4.0 }
  ],

  organicData: {
    organicSessions: 7234,
    organicUsers: 5643,
    organicEngagementRate: 0.378,
    sessionsOverTime: Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      
      return {
        date: date.toISOString().split('T')[0],
        sessions: Math.floor(Math.random() * 300) + 150
      };
    })
  },

  topLandingPages: [
    { page: '/', sessions: 3421, engagementRate: 0.45, avgEngagementTime: 182 },
    { page: '/services', sessions: 2134, engagementRate: 0.52, avgEngagementTime: 234 },
    { page: '/about', sessions: 1876, engagementRate: 0.38, avgEngagementTime: 156 },
    { page: '/contact', sessions: 1234, engagementRate: 0.42, avgEngagementTime: 198 },
    { page: '/blog', sessions: 987, engagementRate: 0.48, avgEngagementTime: 287 }
  ]
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  console.log('Analytics data request:', { propertyId, startDate, endDate });

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json(mockAnalyticsData);
}
