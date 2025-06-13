"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { KeywordTracker } from "@/components/KeywordTracker";
import { Menu } from "lucide-react";

export default function Keywords() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 relative">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
              >
                <Menu className="h-5 w-5 text-white" />
              </button>
              <h1 className="text-2xl font-bold text-white">Keyword Performance</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <KeywordTracker propertyId="123456789" />
        </main>
      </div>
    </div>
  );
}
