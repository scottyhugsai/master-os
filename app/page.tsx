'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#0f1436] to-[#05081b]">
      {/* HERO SECTION */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <div className="mb-6 inline-block">
            <div className="text-6xl mb-4">🏗️</div>
            <h1 className="text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#60a5fa] to-[#34d399] mb-6 leading-tight">
              Master Your Roofing Business
            </h1>
          </div>

          <p className="text-xl text-[#cbd5e1] mb-8 leading-relaxed max-w-2xl mx-auto">
            All-in-one management platform for project tracking, quote generation, crew coordination, and business analytics. Built for roofing contractors who demand professional tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/dashboard"
              className="btn btn-primary text-base px-8 py-4 rounded-lg hover:shadow-lg"
            >
              Enter Dashboard
              <span>→</span>
            </Link>
            <a
              href="#features"
              className="btn btn-secondary text-base px-8 py-4 rounded-lg"
            >
              Learn More
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-[#334155]">
            <div>
              <div className="text-3xl font-bold text-[#3b82f6] mb-1">100%</div>
              <div className="text-sm text-[#94a3b8]">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#10b981] mb-1">0.5s</div>
              <div className="text-sm text-[#94a3b8]">Load Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#f59e0b] mb-1">24/7</div>
              <div className="text-sm text-[#94a3b8]">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Powerful Features</h2>
        <p className="text-center text-[#cbd5e1] mb-16 max-w-2xl mx-auto">
          Everything you need to run a professional roofing business
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: '📊',
              title: 'Real-Time Dashboard',
              description: 'Track projects, revenue, and team performance at a glance'
            },
            {
              icon: '📋',
              title: 'Smart Quoting',
              description: 'Generate professional quotes in minutes, track conversion rates'
            },
            {
              icon: '👥',
              title: 'Crew Management',
              description: 'Assign crew, track time, manage availability and skill levels'
            },
            {
              icon: '💰',
              title: 'Invoicing & Payments',
              description: 'Professional invoices, payment tracking, financial reports'
            },
            {
              icon: '🎯',
              title: 'Project Tracking',
              description: 'From quote to completion, track every project milestone'
            },
            {
              icon: '📸',
              title: 'Photo Gallery',
              description: 'Organize before/after photos, build client galleries'
            },
            {
              icon: '📈',
              title: 'Analytics',
              description: 'Profit margins, project ROI, customer acquisition metrics'
            },
            {
              icon: '🔒',
              title: 'Enterprise Security',
              description: 'Bank-level encryption, role-based access, data protection'
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="card group hover:border-[#3b82f6]"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">{feature.icon}</div>
              <h3 className="font-bold text-lg text-white mb-2">{feature.title}</h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK ACCESS SECTION */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Get Started in 3 Clicks</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/dashboard" className="card hover:border-[#3b82f6] cursor-pointer">
            <div className="text-5xl mb-6">📊</div>
            <h3 className="text-xl font-bold text-white mb-3">View Dashboard</h3>
            <p className="text-[#94a3b8] mb-6">See real-time project status, revenue, and team performance.</p>
            <div className="text-[#3b82f6] font-semibold flex items-center gap-2">
              Open <span>→</span>
            </div>
          </Link>

          <Link href="/projects" className="card hover:border-[#3b82f6] cursor-pointer">
            <div className="text-5xl mb-6">🏗️</div>
            <h3 className="text-xl font-bold text-white mb-3">Manage Projects</h3>
            <p className="text-[#94a3b8] mb-6">Create, track, and complete roofing projects with your team.</p>
            <div className="text-[#3b82f6] font-semibold flex items-center gap-2">
              Open <span>→</span>
            </div>
          </Link>

          <Link href="/quotes" className="card hover:border-[#3b82f6] cursor-pointer">
            <div className="text-5xl mb-6">📝</div>
            <h3 className="text-xl font-bold text-white mb-3">Create Quotes</h3>
            <p className="text-[#94a3b8] mb-6">Generate professional quotes, track responses, and close deals.</p>
            <div className="text-[#3b82f6] font-semibold flex items-center gap-2">
              Open <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* BUSINESS SITES CTA */}
      <section className="container mx-auto px-4 py-20 border-t border-[#334155]">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Your Business Ecosystem</h2>
        <p className="text-center text-[#cbd5e1] mb-12 max-w-2xl mx-auto">
          Access all your business websites from one unified hub
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: '🏠',
              name: 'Guayas Roofing',
              desc: 'Main company website',
              url: 'https://guayas-roofing-modern.vercel.app'
            },
            {
              icon: '📋',
              name: 'Quoting Tool',
              desc: 'Professional quote generator',
              url: 'https://guayas-quoting-tool.vercel.app'
            },
            {
              icon: '💧',
              name: 'Aqua Finish',
              desc: 'Pool finishing services',
              url: 'https://aqua-finish.vercel.app'
            },
            {
              icon: '⚙️',
              name: 'Scotty Hub',
              desc: 'Personal operations center',
              url: 'https://scotty-hub.vercel.app'
            },
          ].map((site, i) => (
            <a
              key={i}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card group hover:border-[#3b82f6]"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">{site.icon}</div>
              <h3 className="font-bold text-lg text-white mb-1">{site.name}</h3>
              <p className="text-[#94a3b8] text-sm mb-4">{site.desc}</p>
              <div className="text-[#3b82f6] text-sm font-semibold">Visit →</div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Business?
        </h2>
        <p className="text-[#cbd5e1] mb-8 max-w-2xl mx-auto text-lg">
          Join professional roofing contractors who use Master OS to scale their operations and increase profitability.
        </p>
        <Link
          href="/dashboard"
          className="btn btn-primary text-lg px-10 py-4 rounded-lg inline-flex gap-2"
        >
          Start Now
          <span>🚀</span>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#334155] py-12 px-4">
        <div className="container mx-auto text-center text-[#94a3b8] text-sm">
          <p>© 2026 Master OS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
