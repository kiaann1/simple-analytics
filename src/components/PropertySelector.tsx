"use client";

import { GoogleAnalyticsProperty } from "@/lib/google-analytics-new";
import { Building2, Globe, ChevronRight } from "lucide-react";

interface PropertySelectorProps {
  properties: GoogleAnalyticsProperty[];
  loading: boolean;
  onPropertySelect: (propertyId: string) => void;
}

export function PropertySelector({ properties, loading, onPropertySelect }: PropertySelectorProps) {
  // Header component used across all states
  const Header = () => (
    <div className="text-center space-y-4 animate-slide-up mb-8">
      <h1 className="text-3xl font-bold text-white">Select a Property</h1>
      <p className="text-white/70 animate-fade-in-up">Choose which Google Analytics property you'd like to analyze</p>
    </div>
  );  if (loading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <Header />
        <div className="text-center space-y-6 animate-fade-in">
          {/* Beautiful pulsing dots loader */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="space-y-2">
            <p className="text-white font-medium">Loading your properties...</p>
            <p className="text-white/60 text-sm">Connecting to Google Analytics</p>
          </div>
        </div>
      </div>
    );
  }  if (properties.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <Header />
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm inline-block">
            <Building2 className="h-12 w-12 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">No Properties Found</h2>
            <p className="text-white/70">
              We couldn&apos;t find any Google Analytics properties associated with your account. 
              Make sure you have at least one GA4 property set up.
            </p>
          </div>
        </div>
      </div>
    );  }  return (
    <div className="flex-1 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
        <Header />
        
        {/* Grid layout that expands naturally without internal scrolling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {properties.map((property, index) => (
            <button
              key={property.propertyId}
              onClick={() => onPropertySelect(property.propertyId)}
              className="w-full bg-black/30 backdrop-blur-sm rounded-xl p-6 text-left hover:bg-black/50 card-hover transition-all duration-300 border border-white/10 hover:border-white/30 group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg group-hover:text-white transition-colors duration-300">
                      {property.displayName}
                    </h3>
                    {property.websiteUrl && (
                      <div className="flex items-center space-x-2 mt-1">
                        <Globe className="h-4 w-4 text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                        <span className="text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">{property.websiteUrl}</span>
                      </div>
                    )}
                    <span className="text-white/50 text-sm">ID: {property.propertyId}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-white/60 group-hover:text-white transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
