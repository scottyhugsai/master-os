'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';

export default function Dashboard() {
  const [stats, setStats] = useState({
    // Business
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalRevenue: 0,
    pendingQuotes: 0,
    totalCrew: 0,
    // Operations
    agentsActive: 0,
    agentsHealthy: 0,
    pendingOperations: 0,
    // Trading
    portfolioValue: 0,
    dailyPnL: 0,
    dailyPnLPercent: 0,
    activePositions: 0,
    activeSignals: 0,
  });

  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setError('');
      const [ecosystemRes, projectsRes, agentsRes, notificationsRes] = await Promise.all([
        api.getEcosystemDashboard().catch(() => null),
        api.getProjects().catch(() => []),
        api.getAgents().catch(() => ({ agents: [] })),
        api.getNotifications(5).catch(() => ({ notifications: [] })),
      ]);

      // Parse ecosystem data
      if (ecosystemRes) {
        setStats({
          totalProjects: ecosystemRes.business?.total_projects || 0,
          activeProjects: ecosystemRes.business?.active_projects || 0,
          completedProjects: ecosystemRes.business?.completed_projects || 0,
          totalRevenue: ecosystemRes.business?.total_revenue || 0,
          pendingQuotes: ecosystemRes.business?.pending_quotes || 0,
          totalCrew: ecosystemRes.business?.crew_count || 0,
          agentsActive: ecosystemRes.operations?.agents_active || 0,
          agentsHealthy: ecosystemRes.operations?.agents_healthy || 0,
          pendingOperations: ecosystemRes.operations?.pending_operations || 0,
          portfolioValue: ecosystemRes.trading?.portfolio_value || 0,
          dailyPnL: ecosystemRes.trading?.daily_pnl || 0,
          dailyPnLPercent: ecosystemRes.trading?.daily_pnl_percent || 0,
          activePositions: ecosystemRes.trading?.active_positions || 0,
          activeSignals: ecosystemRes.trading?.active_signals || 0,
        });
      }

      if (Array.isArray(projectsRes)) {
        setRecentProjects(projectsRes.slice(0, 5));
      }

      if (agentsRes?.agents) {
        setAgents(agentsRes.agents);
      }

      if (notificationsRes?.notifications) {
        setNotifications(notificationsRes.notifications);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const StatCard = ({ label, value, color, icon }: any) => (
    <div
      style={{
        background: 'linear-gradient(135deg, #1a1f3a 0%, #0f172a 100%)',
        border: `1px solid ${color}40`,
        borderRadius: '0.75rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '120px',
        boxShadow: `0 0 20px ${color}20`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '0.875rem', color: '#94a3b8', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 700, color, fontFamily: 'Fira Code' }}>
        {typeof value === 'number' && value > 1000 ? `$${(value / 1000).toFixed(1)}k` : value}
      </div>
    </div>
  );

  const AgentCard = ({ agent }: any) => (
    <div
      style={{
        background: '#1a1f3a',
        border: `1px solid ${agent.status === 'active' ? '#10b981' : '#ef4444'}40`,
        borderRadius: '0.5rem',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <div style={{ fontSize: '0.875rem', color: '#f1f5f9', fontWeight: 600 }}>{agent.name}</div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
          {agent.id}
        </div>
      </div>
      <div
        style={{
          display: 'inline-block',
          padding: '0.25rem 0.75rem',
          background: agent.status === 'active' ? '#10b981' : '#ef4444',
          color: '#0f172a',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        {agent.status}
      </div>
    </div>
  );

  const NotificationItem = ({ notification }: any) => {
    const bgColor = 
      notification.type === 'error' ? '#ef444420' :
      notification.type === 'success' ? '#10b98120' :
      '#f59e0b20';
    const borderColor =
      notification.type === 'error' ? '#ef4444' :
      notification.type === 'success' ? '#10b981' :
      '#f59e0b';

    return (
      <div
        style={{
          background: bgColor,
          border: `1px solid ${borderColor}`,
          borderRadius: '0.5rem',
          padding: '0.75rem',
          marginBottom: '0.75rem',
        }}
      >
        <div style={{ fontSize: '0.875rem', color: '#f1f5f9', fontWeight: 600 }}>
          {notification.title}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
          {notification.message}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', padding: '2rem 1rem', background: '#0f172a' }}>
        <div style={{ textAlign: 'center', color: '#94a3b8' }}>Loading dashboard...</div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem', background: '#0f172a' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {error && (
          <div
            style={{
              background: '#ef444420',
              border: '1px solid #ef4444',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '2rem',
              color: '#f87171',
              fontSize: '0.875rem',
            }}
          >
            {error}
          </div>
        )}

        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ color: '#f1f5f9', marginBottom: '2rem', fontSize: '2rem' }}>Dashboard</h1>

          {/* Business Stats */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#a78bfa', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              📊 Business Metrics
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}
            >
              <StatCard label="Total Projects" value={stats.totalProjects} color="#00d9ff" icon="📋" />
              <StatCard label="Active Projects" value={stats.activeProjects} color="#a78bfa" icon="⚙️" />
              <StatCard label="Completed" value={stats.completedProjects} color="#10b981" icon="✓" />
              <StatCard label="Total Revenue" value={stats.totalRevenue} color="#f59e0b" icon="💰" />
              <StatCard label="Pending Quotes" value={stats.pendingQuotes} color="#f43f5e" icon="📄" />
              <StatCard label="Crew Members" value={stats.totalCrew} color="#06b6d4" icon="👥" />
            </div>
          </div>

          {/* Operations & Trading */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {/* Operations */}
            <div>
              <h2 style={{ color: '#a78bfa', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
                ⚡ Operations
              </h2>
              <div
                style={{
                  background: 'linear-gradient(135deg, #1a1f3a 0%, #0f172a 100%)',
                  border: '1px solid #a78bfa40',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Agents Active</div>
                  <div style={{ color: '#a78bfa', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Fira Code' }}>
                    {stats.agentsActive} / {stats.agentsHealthy} healthy
                  </div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Pending Operations</div>
                  <div style={{ color: '#f59e0b', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Fira Code' }}>
                    {stats.pendingOperations}
                  </div>
                </div>
              </div>
            </div>

            {/* Trading */}
            <div>
              <h2 style={{ color: '#00d9ff', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
                📈 Trading Bot
              </h2>
              <div
                style={{
                  background: 'linear-gradient(135deg, #1a1f3a 0%, #0f172a 100%)',
                  border: '1px solid #00d9ff40',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Portfolio Value</div>
                  <div style={{ color: '#00d9ff', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Fira Code' }}>
                    ${stats.portfolioValue.toLocaleString()}
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Daily P&L</div>
                  <div
                    style={{
                      color: stats.dailyPnL >= 0 ? '#10b981' : '#ef4444',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      fontFamily: 'Fira Code',
                    }}
                  >
                    {stats.dailyPnL >= 0 ? '+' : ''}{stats.dailyPnL.toFixed(2)} ({stats.dailyPnLPercent.toFixed(2)}%)
                  </div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Active Signals</div>
                  <div style={{ color: '#06b6d4', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Fira Code' }}>
                    {stats.activeSignals} signals / {stats.activePositions} positions
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agents Status */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#a78bfa', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              🤖 Agent Status
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#00d9ff', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              📌 Recent Projects
            </h2>
            <div
              style={{
                background: '#1a1f3a',
                border: '1px solid #00d9ff40',
                borderRadius: '0.75rem',
                overflow: 'hidden',
              }}
            >
              {recentProjects.length > 0 ? (
                recentProjects.map((project) => (
                  <div
                    key={project.id}
                    style={{
                      padding: '1rem',
                      borderBottom: '1px solid #00d9ff20',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '0.95rem' }}>
                        {project.name}
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        {project.status} • ${project.budget?.toLocaleString() || 0}
                      </div>
                    </div>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: project.status === 'completed' ? '#10b981' : '#a78bfa',
                        color: '#0f172a',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                ))
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                  No recent projects
                </div>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h2 style={{ color: '#f59e0b', fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>
              🔔 Recent Notifications
            </h2>
            <div
              style={{
                background: '#1a1f3a',
                border: '1px solid #f59e0b40',
                borderRadius: '0.75rem',
                padding: '1rem',
              }}
            >
              {notifications.length > 0 ? (
                notifications.map((notif) => <NotificationItem key={notif.id} notification={notif} />)
              ) : (
                <div style={{ textAlign: 'center', color: '#94a3b8', padding: '1rem' }}>
                  No recent notifications
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
