import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - KWMT Marketing Analytics',
  description: 'Privacy Policy for KWMT Marketing Analytics Dashboard',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
              <p className="text-white/80 text-lg">KWMT Marketing Analytics Dashboard</p>
              <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-8 text-white/90">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                <div className="space-y-4">
                  <p>
                    Our Analytics Dashboard ("the Service") is operated by KWMT Marketing. When you use our service, we collect:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Google account information (email, name, profile picture) when you sign in</li>
                    <li>Google Analytics data from your connected properties (read-only access)</li>
                    <li>Usage information about how you interact with our dashboard</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                <div className="space-y-4">
                  <p>We use the collected information to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide access to your Google Analytics data in a simplified dashboard format</li>
                    <li>Authenticate your identity and maintain your session</li>
                    <li>Display analytics metrics and visualizations from your Google Analytics properties</li>
                    <li>Improve our service functionality and user experience</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. Data Storage and Security</h2>
                <div className="space-y-4">
                  <p>
                    We prioritize the security of your data:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>We do not store your Google Analytics data on our servers</li>
                    <li>Authentication tokens are securely managed through NextAuth.js</li>
                    <li>All data transmission is encrypted using HTTPS</li>
                    <li>We only request read-only access to your Google Analytics data</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Services</h2>
                <div className="space-y-4">
                  <p>Our service integrates with:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Google Analytics API for data retrieval</li>
                    <li>Google OAuth for authentication</li>
                    <li>NextAuth.js for session management</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
                <div className="space-y-4">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Revoke access to your Google Analytics data at any time</li>
                    <li>Request deletion of your account information</li>
                    <li>Access information about what data we process</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Information</h2>
                <div className="space-y-4">
                  <p>
                    For questions about this privacy policy or our data practices, please contact:
                  </p>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p><strong>KWMT Marketing</strong></p>
                    <p>Website: <a href="https://kwmt.dev" className="text-blue-400 hover:text-blue-300">kwmt.dev</a></p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to This Policy</h2>
                <div className="space-y-4">
                  <p>
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
