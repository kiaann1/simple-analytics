import { NextRequest, NextResponse } from 'next/server';

// Mock Google Analytics data
const mockAnalyticsData = {
  overview: {
    users: 12847,
    sessions: 18432,
    pageviews: 45621,
    bounceRate: 34.2,
    avgSessionDuration: '00:02:34',
    newUsers: 8234
  },
  
  // Daily data for the last 30 days
  dailyData: Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    return {
      date: date.toISOString().split('T')[0],
      users: Math.floor(Math.random() * 500) + 200,
      sessions: Math.floor(Math.random() * 800) + 300,
      pageviews: Math.floor(Math.random() * 2000) + 800,
      bounceRate: Math.floor(Math.random() * 30) + 25
    };
  }),

  // Top pages
  topPages: [
    { page: '/', pageviews: 8432, uniquePageviews: 6234, avgTimeOnPage: '00:02:15' },
    { page: '/services', pageviews: 5621, uniquePageviews: 4123, avgTimeOnPage: '00:03:42' },
    { page: '/about', pageviews: 3244, uniquePageviews: 2876, avgTimeOnPage: '00:01:58' },
    { page: '/contact', pageviews: 2134, uniquePageviews: 1987, avgTimeOnPage: '00:02:33' },
    { page: '/blog', pageviews: 1876, uniquePageviews: 1432, avgTimeOnPage: '00:04:12' }
  ],

  // Traffic sources
  trafficSources: [
    { source: 'google', sessions: 7234, percentage: 39.2 },
    { source: 'direct', sessions: 4521, percentage: 24.5 },
    { source: 'social', sessions: 3421, percentage: 18.6 },
    { source: 'referral', sessions: 2123, percentage: 11.5 },
    { source: 'email', sessions: 1133, percentage: 6.2 }
  ],

  // Device types
  deviceTypes: [
    { device: 'desktop', sessions: 9876, percentage: 53.6 },
    { device: 'mobile', sessions: 7234, percentage: 39.2 },
    { device: 'tablet', sessions: 1322, percentage: 7.2 }
  ],

  // Geographic data
  countries: [
    { country: 'United Kingdom', sessions: 12343, percentage: 67.0 },
    { country: 'United States', sessions: 2134, percentage: 11.6 },
    { country: 'Canada', sessions: 1234, percentage: 6.7 },
    { country: 'Australia', sessions: 987, percentage: 5.4 },
    { country: 'Germany', sessions: 734, percentage: 4.0 }
  ]
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'overview';
  const propertyId = searchParams.get('propertyId');

  // Check if property is selected (for bypass mode)
  if (process.env.BYPASS_AUTH === "true" && !propertyId) {
    return NextResponse.json({ error: 'Please select a property first' }, { status: 400 });
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  switch (type) {
    case 'overview':
      return NextResponse.json(mockAnalyticsData.overview);
    case 'daily':
      return NextResponse.json(mockAnalyticsData.dailyData);
    case 'pages':
      return NextResponse.json(mockAnalyticsData.topPages);
    case 'sources':
      return NextResponse.json(mockAnalyticsData.trafficSources);
    case 'devices':
      return NextResponse.json(mockAnalyticsData.deviceTypes);
    case 'countries':
      return NextResponse.json(mockAnalyticsData.countries);
    default:
      return NextResponse.json(mockAnalyticsData);
  }
}
