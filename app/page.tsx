'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">
            Welcome to Master OS
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Your centralized hub for roofing project management, crew coordination, quote generation, and business analytics.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <Link
              href="/dashboard"
              className="block p-6 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold text-center"
            >
              📊 Go to Dashboard
            </Link>
            <Link
              href="/projects"
              className="block p-6 bg-green-600 hover:bg-green-700 rounded-lg transition font-semibold text-center"
            >
              🏗️ View Projects
            </Link>
          </div>

          <p className="text-gray-400 text-sm">
            💡 Tip: Use the sidebar on desktop or hamburger menu on mobile to navigate between all sections.
          </p>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold mb-8">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard"
            className="p-6 bg-gray-800 hover:bg-gray-700 rounded-lg transition border border-gray-700 hover:border-blue-500"
          >
            <div className="text-3xl mb-2">📊</div>
            <h4 className="font-semibold mb-1">Dashboard</h4>
            <p className="text-sm text-gray-400">Project overview & analytics</p>
          </Link>

          <Link
            href="/quotes"
            className="p-6 bg-gray-800 hover:bg-gray-700 rounded-lg transition border border-gray-700 hover:border-green-500"
          >
            <div className="text-3xl mb-2">📝</div>
            <h4 className="font-semibold mb-1">Quotes</h4>
            <p className="text-sm text-gray-400">Generate & manage quotes</p>
          </Link>

          <Link
            href="/projects"
            className="p-6 bg-gray-800 hover:bg-gray-700 rounded-lg transition border border-gray-700 hover:border-yellow-500"
          >
            <div className="text-3xl mb-2">🏗️</div>
            <h4 className="font-semibold mb-1">Projects</h4>
            <p className="text-sm text-gray-400">Track active jobs</p>
          </Link>

          <Link
            href="/crew"
            className="p-6 bg-gray-800 hover:bg-gray-700 rounded-lg transition border border-gray-700 hover:border-purple-500"
          >
            <div className="text-3xl mb-2">👥</div>
            <h4 className="font-semibold mb-1">Crew</h4>
            <p className="text-sm text-gray-400">Manage team members</p>
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold mb-8">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-lg font-semibold mb-3">📊 Real-time Analytics</h4>
            <p className="text-gray-300">Track revenue, project completion rates, and team performance with live dashboards.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-lg font-semibold mb-3">📋 Quote Management</h4>
            <p className="text-gray-300">Generate professional quotes in minutes and track their status through the sales pipeline.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-lg font-semibold mb-3">👥 Team Coordination</h4>
            <p className="text-gray-300">Assign crew members to projects, track time, and manage crew schedules.</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-lg font-semibold mb-3">💰 Invoice & Payments</h4>
            <p className="text-gray-300">Create invoices, track payments, and manage your business finances seamlessly.</p>
          </div>
        </div>
      </section>

      {/* Business Sites Section */}
      <section className="container mx-auto px-4 py-16 border-t border-gray-700">
        <h3 className="text-2xl font-bold mb-8">Integrated Business Sites</h3>
        <p className="text-gray-300 mb-8">Access your other business websites from the sidebar, or visit them directly:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://guayas-roofing-modern.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-gray-800 hover:bg-gray-700 rounded-lg transition border border-gray-700 hover:border-blue-500"
          >
            <div className="text-3xl mb-2">🏠</div>
            <h4 className="font-semibold mb-1">Guayas Roofing</h4>
            <p className="text-sm text-gray-400">Main company website</p>
          </a>

          <a
            href="https://guayas-quoting-tool.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-gray-800 hover:bg-gray-700 rounded-lg transition border border-gray-700 hover:border-green-500"
          >
            <div className="text-3xl mb-2">📋</div>
            <h4 className="font-semibold mb-1">Quoting Tool</h4>
            <p className="text-sm text-gray-400">Generate roofing quotes</p>
          </a>

          <a
            href="https://aqua-finish.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-gray-800 hover:bg-gray-700 rounded-lg transition border border-gray-700 hover:border-cyan-500"
          >
            <div className="text-3xl mb-2">💧</div>
            <h4 className="font-semibold mb-1">Aqua Finish</h4>
            <p className="text-sm text-gray-400">Pool finishing services</p>
          </a>

          <a
            href="https://scotty-hub.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-gray-800 hover:bg-gray-700 rounded-lg transition border border-gray-700 hover:border-purple-500"
          >
            <div className="text-3xl mb-2">⚙️</div>
            <h4 className="font-semibold mb-1">Scotty Hub</h4>
            <p className="text-sm text-gray-400">Personal dashboard</p>
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Start creating projects, managing your team, and growing your roofing business with Master OS.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          Go to Dashboard →
        </Link>
      </section>
    </div>
  );
}
