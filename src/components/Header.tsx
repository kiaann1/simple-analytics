import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src="/bb-logo.png" 
              alt="Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-white font-semibold text-lg">
              BBM Analytics
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/about"
              className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
            >
              About
            </Link>
            <Link 
              href="/support"
              className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
            >
              Support
            </Link>
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-white/70 text-sm">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            {session ? (
              <button
                onClick={() => signOut()}
                className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
