import { Metadata } from 'next';

export const metadata: Metadata = {
title: 'Support - KWMT Marketing Analytics',
description: 'Get help with KWMT Marketing Analytics Dashboard',
};

export default function Support() {
return (
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
  {/* Simple Navigation */}
  <nav className="border-b border-white/10 py-4">
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-center justify-between">
        <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <img 
            src="/bb-logo.png" 
            alt="KWMT Marketing Logo" 
            className="h-8 w-8 object-contain"
          />
          <span className="text-white font-semibold">KWMT Analytics</span>
        </a>

      </div>
    </div>
  </nav>

  <div className="max-w-4xl mx-auto px-6 py-16">
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Support & Help</h1>
          <p className="text-white/80 text-lg">We're here to help you get the most out of your analytics dashboard</p>
        </div>

        <div className="space-y-8 text-white/90">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Common Questions</h2>
            <div className="space-y-6">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">How do I connect my Google Analytics account?</h3>
                <p>Simply click "Sign in with Google" on the main page. You'll be prompted to grant read-only access to
                  your Google Analytics data. We only request the minimum permissions needed to display your analytics.
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">What data do you access?</h3>
                <p>We only access your Google Analytics data in read-only mode to display metrics and create
                  visualizations. We don't store your analytics data on our servers - it's fetched in real-time when you
                  view the dashboard.</p>
              </div>

              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">How do I revoke access?</h3>
                <p>You can revoke access at any time by going to your Google Account settings &gt; Security &gt;
                  Third-party apps with account access, and removing "KWMT Marketing Analytics Dashboard" from the list.
                </p>
              </div>

              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-2">Is my data secure?</h3>
                <p>Yes! We use industry-standard security practices including HTTPS encryption for all data transmission
                  and secure OAuth authentication. We never store your analytics data on our servers.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <div className="space-y-4">
              <p>Need additional help? We're here to assist you:</p>

              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">KWMT Marketing</h3>
                    <p className="text-white/80">Professional digital marketing services and analytics solutions</p>
                  </div>

                  <div className="space-y-2">
                    <p><strong>Website:</strong> <a href="https://kwmt.dev"
                        className="text-blue-400 hover:text-blue-300 transition-colors">kwmt.dev</a></p>
                    <p><strong>Business Focus:</strong> Digital Marketing, Analytics, SEO, PPC Management</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Report an Issue</h3>
                <p className="mb-4">If you encounter any technical issues with the dashboard, please include:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-white/80">
                  <li>Description of the issue</li>
                  <li>Steps to reproduce the problem</li>
                  <li>Browser and device information</li>
                  <li>Any error messages you see</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">About This Application</h2>
            <div className="space-y-4">
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <p className="mb-4">
                  The KWMT Marketing Analytics Dashboard is designed to simplify Google Analytics data visualization.
                  Our goal is to make website analytics more accessible and easier to understand for businesses of all
                  sizes.
                </p>
                <div className="space-y-2">
                  <p><strong>Key Features:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-white/80">
                    <li>Real-time Google Analytics data visualization</li>
                    <li>Simplified metrics and KPIs</li>
                    <li>Mobile-responsive dashboard</li>
                    <li>Secure OAuth authentication</li>
                    <li>No data storage - your data stays with Google</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</div>
);
}