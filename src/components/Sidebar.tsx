"use client";

import { memo, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Search, 
  FileText, 
  BookOpen, 
  Target,
  Menu,
  X,
  Home,
  TrendingUp,
  Users
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = memo(function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  // Memoize navigation items to prevent recreating on every render
  const navigationItems = useMemo(() => [
    {
      title: "Analytics",
      items: [
        { icon: BarChart3, label: "Select Property", href: "/" },
        { icon: TrendingUp, label: "SEO Health", href: "/seo-health" },
        { icon: Search, label: "Keywords", href: "/keywords" },
        { icon: Users, label: "Audience", href: "/audience" },
      ]
    },
    {
      title: "SEO Tools",
      items: [
        { icon: FileText, label: "Content Gaps", href: "/content-gaps" },
        { icon: Target, label: "Competitor Analysis", href: "/competitors" },
        { icon: BookOpen, label: "SEO Learning Hub", href: "/seo-tips" },
      ]
    }
  ], []);

  const handlePropertySelect = useCallback(() => {
    localStorage.removeItem('selectedProperty');
    window.location.href = "/";
    onToggle();
  }, [onToggle]);

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-black/40 backdrop-blur-md border-r border-white/10 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <img 
              src="/bb-logo.png" 
              alt="KWMT Marketing Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-white font-semibold text-sm">KWMT Analytics</span>
          </div>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-6">
            {navigationItems.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const isActive = pathname === item.href;
                    
                    return (
                      <li key={itemIndex}>
                        {item.href === "/" ? (
                          <button
                            onClick={handlePropertySelect}
                            className={`
                              w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-left
                              ${isActive 
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                                : 'text-white/70 hover:text-white hover:bg-white/10'
                              }
                            `}
                          >
                            <item.icon className="h-5 w-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={onToggle}
                            className={`
                              flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                              ${isActive 
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                                : 'text-white/70 hover:text-white hover:bg-white/10'
                              }
                            `}
                          >
                            <item.icon className="h-5 w-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-white/60 text-xs mb-2">KWMT Marketing</div>
            <Link 
              href="https://kwmt.dev" 
              target="_blank"
              className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
            >
              kwmt.dev
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});

export { Sidebar };
