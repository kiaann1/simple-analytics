import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - KWMT Marketing Analytics',
  description: 'Learn about KWMT Marketing and our Analytics Dashboard',
};

export default function About() {
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
              <span className="text-white font-semibold">BBM Analytics</span>
            </a>
            <div className="flex items-center space-x-6">
              <a href="/support" className="text-white/70 hover:text-white transition-colors text-sm">Support</a>
              <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">Dashboard</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <img 
                    src="/bb-logo.png" 
                    alt="KWMT Marketing Logo" 
                    className="h-20 w-20 object-contain"
                  />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white">About KWMT Marketing</h1>
              <p className="text-white/80 text-lg">Professional Digital Marketing & Analytics Solutions</p>
            </div>

            <div className="space-y-8 text-white/90">
              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Our Company</h2>
                <div className="space-y-4">
                  <p>
                    KWMT Marketing is a digital marketing agency dedicated to helping businesses grow through data-driven strategies and innovative solutions. 
                    We specialize in making complex analytics accessible and actionable for our clients.
                  </p>
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Our Services</h3>
                        <ul className="space-y-2 text-white/80">
                          <li>• Digital Marketing Strategy</li>
                          <li>• Search Engine Optimization (SEO)</li>
                          <li>• Pay-Per-Click (PPC) Management</li>
                          <li>• Analytics & Reporting</li>
                          <li>• Conversion Rate Optimization</li>
                          <li>• Social Media Marketing</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Our Expertise</h3>
                        <ul className="space-y-2 text-white/80">
                          <li>• Google Analytics & GA4</li>
                          <li>• Google Ads & Shopping</li>
                          <li>• Facebook & Instagram Ads</li>
                          <li>• Technical SEO</li>
                          <li>• Data Visualization</li>
                          <li>• Custom Analytics Solutions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">About This Dashboard</h2>
                <div className="space-y-4">
                  <p>
                    The KWMT Marketing Analytics Dashboard was created to address a common challenge: Google Analytics can be overwhelming for many business owners. 
                    Our simplified dashboard presents the most important metrics in an easy-to-understand format.
                  </p>
                  
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-3">Why We Built This</h3>
                    <div className="space-y-3 text-white/80">
                      <p>
                        <strong>Simplicity:</strong> Google Analytics has hundreds of metrics. We focus on the ones that matter most for business decisions.
                      </p>
                      <p>
                        <strong>Accessibility:</strong> Our dashboard is designed for business owners who need insights quickly, without getting lost in complex interfaces.
                      </p>
                      <p>
                        <strong>Security:</strong> We prioritize data security by using read-only access and not storing any of your analytics data on our servers.
                      </p>
                      <p>
                        <strong>Performance:</strong> Fast loading times and responsive design ensure you can check your metrics from anywhere, on any device.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Technical Information</h2>
                <div className="space-y-4">
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Built With</h3>
                        <ul className="space-y-2 text-white/80">
                          <li>• Next.js 15 (React Framework)</li>
                          <li>• TypeScript</li>
                          <li>• Tailwind CSS</li>
                          <li>• Google Analytics API</li>
                          <li>• NextAuth.js for Authentication</li>
                          <li>• Recharts for Visualizations</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Security Features</h3>
                        <ul className="space-y-2 text-white/80">
                          <li>• OAuth 2.0 Authentication</li>
                          <li>• HTTPS Encryption</li>
                          <li>• Read-only Data Access</li>
                          <li>• No Data Storage</li>
                          <li>• Secure Session Management</li>
                          <li>• Regular Security Updates</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Get in Touch</h3>
                        <p className="text-white/80">
                          Whether you need help with this dashboard or are interested in our full range of digital marketing services, 
                          we'd love to hear from you.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <p><strong>Company:</strong> KWMT Marketing</p>
                        <p><strong>Website:</strong> <a href="https://kwmt.dev" className="text-blue-400 hover:text-blue-300 transition-colors">bravemarketing.co.uk</a></p>
                        <p><strong>Application URL:</strong> <a href="https://kwmt.dev" className="text-blue-400 hover:text-blue-300 transition-colors">bravemarketing.co.uk</a></p>
                      </div>
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
