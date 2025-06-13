import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - KWMT Marketing Analytics',
  description: 'Sign in to access your Google Analytics dashboard',
};

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex items-center justify-center">
      <div className="max-w-md mx-auto px-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <img 
                  src="/bb-logo.png" 
                  alt="KWMT Marketing Logo" 
                  className="h-16 w-16 object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-white/80">Sign in to access your analytics dashboard</p>
          </div>

          {/* OAuth Information */}
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-lg border border-white/10 space-y-4">
              <h2 className="text-lg font-semibold text-white">About This Application</h2>
              <div className="space-y-3 text-white/90 text-sm">
                <p>
                  <strong>Application:</strong> KWMT Marketing Analytics Dashboard
                </p>
                <p>
                  <strong>Developer:</strong> KWMT Marketing
                </p>
                <p>
                  <strong>Website:</strong> <a href="https://kwmt.dev" className="text-blue-400 hover:text-blue-300">bravemarketing.co.uk</a>
                </p>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border border-white/10 space-y-4">
              <h3 className="text-lg font-semibold text-white">Permissions Requested</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white/90 font-medium">Basic Profile Information</p>
                    <p className="text-white/70 text-sm">Your name, email, and profile picture</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white/90 font-medium">Google Analytics (Read-Only)</p>
                    <p className="text-white/70 text-sm">View your Google Analytics data to display in the dashboard</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-lg border border-white/10 space-y-4">
              <h3 className="text-lg font-semibold text-white">Data Usage & Privacy</h3>
              <div className="space-y-2 text-white/80 text-sm">
                <p>• We only access your data to display it in the dashboard</p>
                <p>• Your analytics data is not stored on our servers</p>
                <p>• You can revoke access at any time from your Google Account settings</p>
                <p>• All data transmission is encrypted via HTTPS</p>
              </div>
            </div>
          </div>

          {/* Sign In Button */}
          <div className="space-y-4">
            <a
              href="/api/auth/signin/google"
              className="w-full bg-white text-gray-700 px-6 py-3 rounded-md font-medium flex items-center justify-center gap-3 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm border border-gray-300"
            >
              <img 
                src="/google-logo.svg" 
                alt="Google" 
                className="h-5 w-5"
              />
              Sign in with Google
            </a>

            <div className="text-center">
              <p className="text-white/60 text-xs">
                By signing in, you agree to our{' '}
                <a href="/terms" className="text-blue-400 hover:text-blue-300 underline">Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</a>
              </p>
            </div>
          </div>

          {/* Support Link */}
          <div className="text-center pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm">
              Need help? Visit our{' '}
              <a href="/support" className="text-blue-400 hover:text-blue-300 underline">Support Center</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
