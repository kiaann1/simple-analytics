"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { PropertySelector } from "@/components/PropertySelector";
import { GoogleAnalyticsProperty } from "@/lib/google-analytics-new";
import { LogIn } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  const [properties, setProperties] = useState<GoogleAnalyticsProperty[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const fetchAttempted = useRef(false);
  const fetchInProgress = useRef(false);

  // Load selected property from localStorage on mount
  useEffect(() => {
    const savedProperty = localStorage.getItem('selectedProperty');
    if (savedProperty) {
      setSelectedProperty(savedProperty);
    }
  }, []);

  // Save selected property to localStorage when it changes
  useEffect(() => {
    if (selectedProperty) {
      localStorage.setItem('selectedProperty', selectedProperty);
    }
  }, [selectedProperty]);

  useEffect(() => {
    console.log('🔄 Session effect triggered', { 
      hasSession: !!session, 
      hasAccessToken: !!session?.accessToken, 
      fetchAttempted: fetchAttempted.current,
      fetchInProgress: fetchInProgress.current 
    });
    if (session?.accessToken && !fetchAttempted.current && !fetchInProgress.current) {
      fetchProperties();
    }
  }, [session?.accessToken]); // Only depend on accessToken

  const fetchProperties = async () => {
    if (fetchInProgress.current || fetchAttempted.current) {
      console.log('🚫 Skipping fetch - already in progress or attempted', { 
        fetchInProgress: fetchInProgress.current, 
        fetchAttempted: fetchAttempted.current 
      });
      return;
    }
    
    console.log('🚀 Starting properties fetch');
    fetchInProgress.current = true;
    fetchAttempted.current = true;
    setLoading(true);
    
    try {
      const response = await fetch("/api/analytics/properties");
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Properties loaded:', data.length);
        setProperties(data);
        
        // Validate saved property still exists
        const savedProperty = localStorage.getItem('selectedProperty');
        if (savedProperty && !data.find((p: GoogleAnalyticsProperty) => p.propertyId === savedProperty)) {
          // Saved property no longer exists, clear it
          localStorage.removeItem('selectedProperty');
          setSelectedProperty(null);
        }
      } else {
        console.error('❌ Failed to fetch properties:', response.status);
      }
    } catch (error) {
      console.error("💥 Error fetching properties:", error);
      fetchAttempted.current = false; // Allow retry on error
    } finally {
      setLoading(false);
      fetchInProgress.current = false;
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-6 animate-fade-in">
          {/* Beautiful pulsing dots loader */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="space-y-2 animate-fade-in-up">
            <p className="text-white font-medium text-lg">Loading session</p>
            <p className="text-white/60 text-sm">Authenticating your account</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session && !demoMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-md mx-auto px-6 animate-fade-in">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-500">
                <img 
                  src="/bb-logo.png" 
                  alt="Company Logo" 
                  className="h-16 w-16 object-contain"
                />
              </div>
            </div>            <h1 className="text-4xl font-bold text-white animate-slide-up">Marketing Analytics Dashboard</h1>
            <h2 className="text-xl font-light text-white/90 animate-slide-up">Simplified Google Analytics for Business Success</h2>
            <p className="text-white/80 text-lg animate-fade-in-up">
              Connect your Google Analytics account to view detailed insights about your website performance in a simplified, easy-to-understand dashboard.
            </p>
          </div>
          
          {/* <button
            onClick={() => signIn("google")}
            className="w-full bg-white text-gray-700 px-6 py-3 rounded-md font-medium flex items-center justify-center gap-3 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm border border-gray-300 animate-scale-in"
          >
            <img 
              src="/google-logo.svg" 
              alt="Google" 
              className="h-5 w-5"
            />
            Sign in with Google
          </button> */}
          <button
            onClick={() => {
              // Enable demo mode and set mock properties
              setDemoMode(true);
              setProperties([
                { propertyId: '987633231', displayName: 'blog.kwmt.dev', websiteUrl: 'https://blog.kwmt.dev' },
                { propertyId: '123456789', displayName: 'kwmt.dev', websiteUrl: 'https://kwmt.dev' },
                { propertyId: '987654321', displayName: 'blog.kwmt.dev', websiteUrl: 'https://blog.kwmt.dev' },
                { propertyId: '555666777', displayName: 'demo.kwmt.dev', websiteUrl: 'https://demo.kwmt.dev' }
              ]);
              fetchAttempted.current = true;
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center gap-3 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg animate-scale-in"
          >
            <LogIn className="h-5 w-5" />
            View Demo Dashboard
          </button>


          <div className="text-white/60 text-sm animate-fade-in-delay">
            <p>Requires Google Analytics read permissions</p>
          </div>
        </div>
      </div>
    );
  }

  const handlePropertyChange = () => {
    console.log('🔄 Property change - resetting states');
    setSelectedProperty(null);
    setDemoMode(false);
    fetchAttempted.current = false;
    localStorage.removeItem('selectedProperty');
  };

  if (!selectedProperty) {
    return (
      <div className="bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex-1 flex flex-col">
        <PropertySelector
          properties={properties}
          loading={loading}
          onPropertySelect={setSelectedProperty}
        />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex-1 flex flex-col">
      <AnalyticsDashboard 
        propertyId={selectedProperty}
        onPropertyChange={handlePropertyChange}
      />
    </div>
  );
}
