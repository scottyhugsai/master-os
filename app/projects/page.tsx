'use client';

import { useState, useEffect } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    status: 'quoted',
    estimatedCost: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          status: formData.status,
          budget: parseFloat(formData.estimatedCost) || 0,
          user_id: 1, // Default user
        }),
      });
      if (res.ok) {
        setFormData({ name: '', address: '', description: '', status: 'quoted', estimatedCost: '' });
        setShowForm(false);
        fetchProjects();
      } else {
        const error = await res.json();
        console.error('Error creating project:', error);
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.address.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statusColors: Record<string, string> = {
    quoted: '#a78bfa',
    approved: '#00d9ff',
    'in-progress': '#f59e0b',
    completed: '#10b981',
    cancelled: '#ef4444',
  };

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ color: '#f1f5f9' }}>Projects</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: '#00d9ff',
              color: '#0f172a',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#00b8d4';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 217, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#00d9ff';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            + New Project
          </button>
        </div>

        {/* Search and Filter */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              background: 'rgba(26, 31, 58, 0.8)',
              border: '1px solid rgba(0, 217, 255, 0.2)',
              borderRadius: '0.5rem',
              color: '#f1f5f9',
              padding: '0.75rem 1rem',
              transition: 'all 0.2s ease',
            }}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              background: 'rgba(26, 31, 58, 0.8)',
              border: '1px solid rgba(0, 217, 255, 0.2)',
              borderRadius: '0.5rem',
              color: '#f1f5f9',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Status</option>
            <option value="quoted">Quoted</option>
            <option value="approved">Approved</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Create Project Form */}
        {showForm && (
          <div style={{
            background: 'rgba(26, 31, 58, 0.8)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}>
            <form onSubmit={handleCreateProject}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Project Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    background: 'rgba(26, 31, 58, 0.8)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem 1rem',
                  }}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    background: 'rgba(26, 31, 58, 0.8)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem 1rem',
                  }}
                />
                <input
                  type="number"
                  placeholder="Estimated Cost"
                  value={formData.estimatedCost}
                  onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                  style={{
                    background: 'rgba(26, 31, 58, 0.8)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem 1rem',
                  }}
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{
                    background: 'rgba(26, 31, 58, 0.8)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                  }}
                >
                  <option value="quoted">Quoted</option>
                  <option value="approved">Approved</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(26, 31, 58, 0.8)',
                  border: '1px solid rgba(0, 217, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: '#f1f5f9',
                  padding: '0.75rem 1rem',
                  marginBottom: '1rem',
                  minHeight: '100px',
                  fontFamily: 'inherit',
                }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    background: '#00d9ff',
                    color: '#0f172a',
                    fontWeight: 600,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Create Project
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    background: 'transparent',
                    color: '#cbd5e1',
                    fontWeight: 600,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #cbd5e1',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects Grid - Masonry Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                background: 'rgba(26, 31, 58, 0.8)',
                border: `1px solid rgba(0, 217, 255, 0.1)`,
                borderRadius: '0.75rem',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.5)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
                e.currentTarget.style.background = 'rgba(26, 31, 58, 0.95)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 217, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(26, 31, 58, 0.8)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ color: '#00d9ff', fontSize: '1.125rem' }}>{project.name}</h3>
                <span style={{
                  background: `rgba(${statusColors[project.status] === '#a78bfa' ? '167, 139, 250' : statusColors[project.status] === '#00d9ff' ? '0, 217, 255' : statusColors[project.status] === '#f59e0b' ? '245, 158, 11' : statusColors[project.status] === '#10b981' ? '16, 185, 129' : '239, 68, 68'}, 0.15)`,
                  color: statusColors[project.status],
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {project.status}
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                📍 {project.address}
              </p>
              <p style={{ color: '#cbd5e1', marginBottom: '1rem', minHeight: '50px' }}>
                {project.description}
              </p>
              <div style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: '1.25rem',
                color: '#00d9ff',
                fontWeight: 700,
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(0, 217, 255, 0.1)',
              }}>
                ${project.budget ? project.budget.toLocaleString() : '0'}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: '#94a3b8',
          }}>
            <p>No projects found. Create your first project to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}
