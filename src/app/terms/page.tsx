import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - KWMT Marketing Analytics',
  description: 'Terms of Service for KWMT Marketing Analytics Dashboard',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
              <p className="text-white/80 text-lg">KWMT Marketing Analytics Dashboard</p>
              <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-8 text-white/90">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                <div className="space-y-4">
                  <p>
                    By accessing and using the KWMT Marketing Analytics Dashboard ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
                <div className="space-y-4">
                  <p>
                    Our service provides a simplified dashboard interface for viewing Google Analytics data. The Service:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Connects to your Google Analytics account with read-only permissions</li>
                    <li>Displays analytics data in an easy-to-understand dashboard format</li>
                    <li>Provides visualizations and insights based on your Google Analytics data</li>
                    <li>Does not store your analytics data on our servers</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
                <div className="space-y-4">
                  <p>As a user of the Service, you agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide accurate and complete information when using the Service</li>
                    <li>Maintain the security of your Google account credentials</li>
                    <li>Use the Service only for lawful purposes</li>
                    <li>Not attempt to gain unauthorized access to the Service or other users' data</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">4. Privacy and Data Use</h2>
                <div className="space-y-4">
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                  </p>
                  <p>
                    We only access your Google Analytics data to display it in our dashboard interface. We do not store, sell, or share your analytics data with third parties.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">5. Service Availability</h2>
                <div className="space-y-4">
                  <p>
                    While we strive to keep the Service available 24/7, we do not guarantee uninterrupted access. The Service may be temporarily unavailable due to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Scheduled maintenance</li>
                    <li>Technical issues beyond our control</li>
                    <li>Google Analytics API limitations or changes</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
                <div className="space-y-4">
                  <p>
                    KWMT Marketing shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">7. Termination</h2>
                <div className="space-y-4">
                  <p>
                    You may discontinue use of the Service at any time by revoking Google OAuth access. We may terminate or suspend access to our Service immediately, without prior notice, if you breach these Terms.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to Terms</h2>
                <div className="space-y-4">
                  <p>
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Information</h2>
                <div className="space-y-4">
                  <p>
                    For questions about these Terms of Service, please contact:
                  </p>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p><strong>KWMT Marketing</strong></p>
                    <p>Website: <a href="https://kwmt.dev" className="text-blue-400 hover:text-blue-300">bravemarketing.co.uk</a></p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">10. Governing Law</h2>
                <div className="space-y-4">
                  <p>
                    These Terms shall be interpreted and governed in accordance with the laws of the United Kingdom.
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
