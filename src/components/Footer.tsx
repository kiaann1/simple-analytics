import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-6">
          {/* Top section with logo and links */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <img 
                src="/bb-logo.png" 
                alt="Marketing Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="text-white/80 text-sm font-medium">
                KWMT Marketing Analytics Dashboard
              </span>
            </div>
            
            <Link 
              href="https://kwmt.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-300 hover:underline"
            >
              kwmt.dev
            </Link>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8">
            <Link 
              href="/about"
              className="text-white/60 hover:text-white text-sm transition-colors duration-300 hover:underline"
            >
              About
            </Link>
            <Link 
              href="/privacy"
              className="text-white/60 hover:text-white text-sm transition-colors duration-300 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms"
              className="text-white/60 hover:text-white text-sm transition-colors duration-300 hover:underline"
            >
              Terms of Service
            </Link>
            <Link 
              href="/support"
              className="text-white/60 hover:text-white text-sm transition-colors duration-300 hover:underline"
            >
              Support
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <span className="text-white/60 text-xs">
              © 2025 KWMT Marketing. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
