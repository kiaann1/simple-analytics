import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');

  // Mock SEO health data
  const seoHealthData = {
    overallScore: 78,
    categories: {
      organicTraffic: {
        score: 85,
        status: 'good',
        trend: '+12%',
        issues: [],
        recommendations: ['Continue optimizing for high-performing keywords']
      },
      technicalSEO: {
        score: 72,
        status: 'warning',
        trend: '-3%',
        issues: ['Slow page load times detected', 'Missing meta descriptions on 5 pages'],
        recommendations: [
          'Optimize images to improve page speed',
          'Add meta descriptions to all pages',
          'Fix 404 errors found in crawl'
        ]
      },
      contentQuality: {
        score: 80,
        status: 'good',
        trend: '+8%',
        issues: ['Low word count on 3 pages'],
        recommendations: [
          'Expand content on thin pages',
          'Add more internal links',
          'Update content published over 2 years ago'
        ]
      },
      userExperience: {
        score: 75,
        status: 'warning',
        trend: '+5%',
        issues: ['High bounce rate on mobile'],
        recommendations: [
          'Improve mobile page experience',
          'Add clear call-to-action buttons',
          'Reduce page load time'
        ]
      }
    },
    quickWins: [
      {
        title: 'Add missing meta descriptions',
        impact: 'Medium',
        effort: 'Low',
        description: '5 pages are missing meta descriptions which can improve click-through rates'
      },
      {
        title: 'Optimize page titles',
        impact: 'High',
        effort: 'Low',
        description: '3 pages have titles over 60 characters that may be truncated in search results'
      },
      {
        title: 'Fix broken internal links',
        impact: 'Medium',
        effort: 'Low',
        description: '7 internal links are returning 404 errors'
      }
    ]
  };

  await new Promise(resolve => setTimeout(resolve, 300));
  return NextResponse.json(seoHealthData);
}
