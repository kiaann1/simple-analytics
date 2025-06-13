import { google } from 'googleapis';

export interface AnalyticsData {
  totalUsers: number;
  sessions: number;
  pageviews: number;
  engagementRate: number;
  avgEngagementTime: number;
  newUsers: number;
  returningUsers: number;
  previousPeriodData: {
    totalUsers: number;
    sessions: number;
    pageviews: number;
  };
  trafficSources: Array<{
    source: string;
    sessions: number;
    percentage: number;
  }>;
  deviceBreakdown: Array<{
    device: string;
    sessions: number;
    percentage: number;
  }>;  geoData: Array<{
    city: string;
    sessions: number;
  }>;
  organicData: {
    organicSessions: number;
    organicUsers: number;
    organicEngagementRate: number;
    sessionsOverTime: Array<{
      date: string;
      sessions: number;
    }>;
  };
  topLandingPages: Array<{
    page: string;
    sessions: number;
    avgEngagementTime: number;
    engagementRate: number;
  }>;
}

export interface GoogleAnalyticsProperty {
  propertyId: string;
  displayName: string;
  websiteUrl?: string;
}

class GoogleAnalyticsService {
  private auth: any;

  constructor(accessToken: string) {
    this.auth = new google.auth.OAuth2();
    this.auth.setCredentials({ access_token: accessToken });
  }

  async getProperties(): Promise<GoogleAnalyticsProperty[]> {
    try {
      console.log('🔍 Starting getProperties...');
      console.log('🔑 Access token exists:', !!this.auth.credentials.access_token);
      
      // Try Analytics Admin API first
      const admin = google.analyticsadmin({
        version: 'v1beta',
        auth: this.auth,
      });

      console.log('📋 Attempting to fetch accounts first...');
      
      try {
        // First get accounts
        const accountsResponse = await admin.accounts.list();
        console.log('📋 Accounts response:', accountsResponse.data);
        
        if (!accountsResponse.data.accounts || accountsResponse.data.accounts.length === 0) {
          console.log('❌ No accounts found');
          return [];
        }

        const allProperties: GoogleAnalyticsProperty[] = [];
        
        // For each account, get properties
        for (const account of accountsResponse.data.accounts) {
          try {
            console.log(`🔍 Fetching properties for account: ${account.displayName}`);
            const propertiesResponse = await admin.properties.list({
              filter: `parent:${account.name}`,
            });
            
            console.log(`📊 Properties for ${account.displayName}:`, propertiesResponse.data);
            
            if (propertiesResponse.data.properties) {
              for (const property of propertiesResponse.data.properties) {
                allProperties.push({
                  propertyId: property.name?.split('/')[1] || '',
                  displayName: property.displayName || '',
                  websiteUrl: (property as any).websiteUrl || undefined,
                });
              }
            }
          } catch (accountError: any) {
            console.log(`⚠️ Error fetching properties for account ${account.name}:`, accountError.message);
          }
        }
        
        console.log('✅ Final properties list:', allProperties);
        
        if (allProperties.length > 0) {
          return allProperties;
        }
        
      } catch (adminError: any) {
        console.error('💥 Admin API failed:', adminError.message);
        console.error('💥 Full error:', adminError);
        
        // If it's a permissions error, let's try direct properties list
        if (adminError.message?.includes('403') || adminError.message?.includes('permission')) {
          console.log('🔍 Trying direct properties list without account filtering...');
          
          try {
            const directResponse = await admin.properties.list();
            console.log('📊 Direct properties response:', directResponse.data);
            
            if (directResponse.data.properties && directResponse.data.properties.length > 0) {
              const properties = directResponse.data.properties.map(property => ({
                propertyId: property.name?.split('/')[1] || '',
                displayName: property.displayName || '',
                websiteUrl: (property as any).websiteUrl || undefined,
              }));
              
              console.log('✅ Direct method found properties:', properties);
              return properties;
            }
          } catch (directError: any) {
            console.error('💥 Direct method also failed:', directError.message);
          }
        }
      }
      
      console.log('❌ All Admin API methods failed, returning empty array');
      return [];
      
    } catch (error: any) {
      console.error('💥 Complete failure in getProperties:', error.message);
      console.error('💥 Full error object:', error);
      return [];
    }
  }

  async getAnalyticsData(propertyId: string, startDate: string, endDate: string): Promise<AnalyticsData> {
    try {
      console.log(`📊 Fetching analytics data for property ${propertyId} from ${startDate} to ${endDate}`);
      
      const analytics = google.analyticsdata({
        version: 'v1beta',
        auth: this.auth,
      });
      
      // Calculate previous period dates
      const start = new Date(startDate);
      const end = new Date(endDate);
      const periodLength = Math.abs(end.getTime() - start.getTime());
      const prevEnd = new Date(start.getTime() - 1);
      const prevStart = new Date(prevEnd.getTime() - periodLength);

      const [
        overviewResponse,
        previousResponse,
        trafficSourcesResponse,
        deviceResponse,
        geoResponse,
        organicResponse,
        organicTimeSeriesResponse,
        landingPagesResponse
      ] = await Promise.all([
        // Main overview metrics
        analytics.properties.runReport({
          property: `properties/${propertyId}`,
          requestBody: {
            dateRanges: [{ startDate, endDate }],
            metrics: [
              { name: 'totalUsers' },
              { name: 'sessions' },
              { name: 'screenPageViews' },
              { name: 'engagementRate' },
              { name: 'userEngagementDuration' },
              { name: 'newUsers' },
            ],
          },
        }),
        
        // Previous period for comparison
        analytics.properties.runReport({
          property: `properties/${propertyId}`,
          requestBody: {
            dateRanges: [{ 
              startDate: prevStart.toISOString().split('T')[0], 
              endDate: prevEnd.toISOString().split('T')[0] 
            }],
            metrics: [
              { name: 'totalUsers' },
              { name: 'sessions' },
              { name: 'screenPageViews' },
            ],
          },
        }),

        // Traffic sources
        analytics.properties.runReport({
          property: `properties/${propertyId}`,
          requestBody: {
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'sessionDefaultChannelGrouping' }],
            metrics: [{ name: 'sessions' }],
            orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
          },
        }),

        // Device breakdown
        analytics.properties.runReport({
          property: `properties/${propertyId}`,
          requestBody: {
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'deviceCategory' }],
            metrics: [{ name: 'sessions' }],
          },
        }),        // Geographic data (cities)
        analytics.properties.runReport({
          property: `properties/${propertyId}`,
          requestBody: {
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'city' }],
            metrics: [{ name: 'sessions' }],
            orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
            limit: '10',
          },
        }),

        // Organic search data
        analytics.properties.runReport({
          property: `properties/${propertyId}`,
          requestBody: {
            dateRanges: [{ startDate, endDate }],
            dimensionFilter: {
              filter: {
                fieldName: 'sessionDefaultChannelGrouping',
                stringFilter: { value: 'Organic Search' }
              }
            },
            metrics: [
              { name: 'sessions' },
              { name: 'totalUsers' },
              { name: 'engagementRate' },
            ],
          },
        }),

        // Organic sessions over time
        analytics.properties.runReport({
          property: `properties/${propertyId}`,
          requestBody: {
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'date' }],
            dimensionFilter: {
              filter: {
                fieldName: 'sessionDefaultChannelGrouping',
                stringFilter: { value: 'Organic Search' }
              }
            },
            metrics: [{ name: 'sessions' }],
            orderBys: [{ dimension: { dimensionName: 'date' } }],
          },
        }),

        // Top landing pages from organic search
        analytics.properties.runReport({
          property: `properties/${propertyId}`,
          requestBody: {
            dateRanges: [{ startDate, endDate }],
            dimensions: [{ name: 'landingPage' }],
            dimensionFilter: {
              filter: {
                fieldName: 'sessionDefaultChannelGrouping',
                stringFilter: { value: 'Organic Search' }
              }
            },
            metrics: [
              { name: 'sessions' },
              { name: 'userEngagementDuration' },
              { name: 'engagementRate' },            ],
            orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
            limit: '10',
          },
        }),
      ]);

      // Process the data
      const mainData = overviewResponse.data.rows?.[0]?.metricValues || [];
      const previousData = previousResponse.data.rows?.[0]?.metricValues || [];

      const totalSessions = trafficSourcesResponse.data.rows?.reduce((sum: number, row: any) => 
        sum + parseInt(row.metricValues?.[0]?.value || '0'), 0) || 1;

      return {
        totalUsers: parseInt(mainData[0]?.value || '0'),
        sessions: parseInt(mainData[1]?.value || '0'),
        pageviews: parseInt(mainData[2]?.value || '0'),
        engagementRate: parseFloat(mainData[3]?.value || '0'),
        avgEngagementTime: parseFloat(mainData[4]?.value || '0') / parseInt(mainData[1]?.value || '1'),
        newUsers: parseInt(mainData[5]?.value || '0'),
        returningUsers: parseInt(mainData[0]?.value || '0') - parseInt(mainData[5]?.value || '0'),
        
        previousPeriodData: {
          totalUsers: parseInt(previousData[0]?.value || '0'),
          sessions: parseInt(previousData[1]?.value || '0'),
          pageviews: parseInt(previousData[2]?.value || '0'),
        },

        trafficSources: trafficSourcesResponse.data.rows?.map((row: any) => ({
          source: row.dimensionValues?.[0]?.value || 'Unknown',
          sessions: parseInt(row.metricValues?.[0]?.value || '0'),
          percentage: (parseInt(row.metricValues?.[0]?.value || '0') / totalSessions) * 100,
        })) || [],

        deviceBreakdown: deviceResponse.data.rows?.map((row: any) => ({
          device: row.dimensionValues?.[0]?.value || 'Unknown',
          sessions: parseInt(row.metricValues?.[0]?.value || '0'),
          percentage: (parseInt(row.metricValues?.[0]?.value || '0') / totalSessions) * 100,
        })) || [],        geoData: geoResponse.data.rows?.map((row: any) => ({
          city: row.dimensionValues?.[0]?.value || 'Unknown',
          sessions: parseInt(row.metricValues?.[0]?.value || '0'),
        })) || [],

        organicData: {
          organicSessions: parseInt(organicResponse.data.rows?.[0]?.metricValues?.[0]?.value || '0'),
          organicUsers: parseInt(organicResponse.data.rows?.[0]?.metricValues?.[1]?.value || '0'),
          organicEngagementRate: parseFloat(organicResponse.data.rows?.[0]?.metricValues?.[2]?.value || '0'),
          sessionsOverTime: organicTimeSeriesResponse.data.rows?.map((row: any) => ({
            date: row.dimensionValues?.[0]?.value || '',
            sessions: parseInt(row.metricValues?.[0]?.value || '0'),
          })) || [],
        },

        topLandingPages: landingPagesResponse.data.rows?.map((row: any) => ({
          page: row.dimensionValues?.[0]?.value || '',
          sessions: parseInt(row.metricValues?.[0]?.value || '0'),
          avgEngagementTime: parseFloat(row.metricValues?.[1]?.value || '0') / parseInt(row.metricValues?.[0]?.value || '1'),
          engagementRate: parseFloat(row.metricValues?.[2]?.value || '0'),
        })) || [],
      };
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      throw error;
    }
  }
}

export default GoogleAnalyticsService;
