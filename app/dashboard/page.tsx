'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalRevenue: 0,
    pendingQuotes: 0,
    totalCrew: 0,
  });

  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
    fetchRecentProjects();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, quotesRes, crewRes] = await Promise.all([
        fetch('http://localhost:8000/api/projects'),
        fetch('http://localhost:8000/api/quotes'),
        fetch('http://localhost:8000/api/crew'),
      ]);

      const projects = await projectsRes.json();
      const quotes = await quotesRes.json();
      const crew = await crewRes.json();

      const activeProjects = projects.filter((p: any) => p.status === 'in-progress').length;
      const completedProjects = projects.filter((p: any) => p.status === 'completed').length;
      const totalRevenue = projects.reduce((sum: number, p: any) => sum + (p.budget || 0), 0);
      const pendingQuotes = quotes.filter((q: any) => q.status === 'draft').length;

      setStats({
        totalProjects: projects.length,
        activeProjects,
        completedProjects,
        totalRevenue,
        pendingQuotes,
        totalCrew: crew.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentProjects = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/projects');
      const data = await res.json();
      setRecentProjects(data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching recent projects:', error);
    }
  };

  const statCards = [
    {
      label: 'Total Projects',
      value: stats.totalProjects,
      color: '#00d9ff',
      icon: '📊',
    },
    {
      label: 'Active Projects',
      value: stats.activeProjects,
      color: '#a78bfa',
      icon: '⚙️',
    },
    {
      label: 'Completed',
      value: stats.completedProjects,
      color: '#10b981',
      icon: '✓',
    },
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      color: '#f59e0b',
      icon: '💰',
    },
    {
      label: 'Pending Quotes',
      value: stats.pendingQuotes,
      color: '#ef4444',
      icon: '📝',
    },
    {
      label: 'Crew Members',
      value: stats.totalCrew,
      color: '#06b6d4',
      icon: '👥',
    },
  ];

  const statusColors: Record<string, string> = {
    quoted: '#cbd5e1',
    approved: '#00d9ff',
    'in-progress': '#a78bfa',
    completed: '#10b981',
  };

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ color: '#f1f5f9', marginBottom: '0.5rem', fontSize: '2rem' }}>Dashboard</h1>
          <p style={{ color: '#94a3b8' }}>Welcome back. Here's your business overview.</p>
        </div>

        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {statCards.map((card, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(26, 31, 58, 0.8)',
                border: `1px solid rgba(${card.color === '#00d9ff' ? '0, 217, 255' : card.color === '#a78bfa' ? '167, 139, 250' : card.color === '#10b981' ? '16, 185, 129' : card.color === '#f59e0b' ? '245, 158, 11' : card.color === '#ef4444' ? '239, 68, 68' : '6, 182, 212'}, 0.15)`,
                borderRadius: '0.75rem',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500 }}>{card.label}</p>
                <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
              </div>
              <div
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: card.label === 'Total Revenue' ? '1.5rem' : '2.25rem',
                  color: card.color,
                  fontWeight: 700,
                }}
              >
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div style={{
          background: 'rgba(26, 31, 58, 0.8)',
          border: '1px solid rgba(0, 217, 255, 0.1)',
          borderRadius: '0.75rem',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
        }}>
          <h2 style={{ color: '#f1f5f9', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Recent Projects</h2>

          {recentProjects.length > 0 ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    background: 'rgba(15, 23, 42, 0.5)',
                    border: '1px solid rgba(0, 217, 255, 0.05)',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <h4 style={{ color: '#f1f5f9', marginBottom: '0.25rem' }}>{project.name}</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{project.address}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span
                      style={{
                        background: `rgba(${statusColors[project.status] === '#cbd5e1' ? '203, 213, 225' : statusColors[project.status] === '#00d9ff' ? '0, 217, 255' : statusColors[project.status] === '#a78bfa' ? '167, 139, 250' : '16, 185, 129'}, 0.15)`,
                        color: statusColors[project.status],
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {project.status}
                    </span>
                    <div style={{ fontFamily: "'Fira Code', monospace", color: '#a78bfa', fontWeight: 700 }}>
                      ${project.budget.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#94a3b8' }}>No projects yet. Create your first project to get started.</p>
          )}
        </div>
      </div>
    </main>
  );
}
