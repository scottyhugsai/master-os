'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';

interface Project {
  id: number;
  name: string;
  address?: string;
  description?: string;
  status: 'quoted' | 'approved' | 'in-progress' | 'completed' | 'cancelled';
  budget: number;
  created_at: string;
  updated_at: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<{
    name: string;
    address: string;
    description: string;
    status: 'quoted' | 'approved' | 'in-progress' | 'completed' | 'cancelled';
    budget: string;
  }>({
    name: '',
    address: '',
    description: '',
    status: 'quoted',
    budget: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      description: '',
      status: 'quoted',
      budget: '',
    });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('Project name is required');
      return;
    }

    try {
      setLoading(true);
      const url = editingId
        ? `http://localhost:8000/api/projects/${editingId}`
        : 'http://localhost:8000/api/projects';
      
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        name: formData.name,
        address: formData.address,
        description: formData.description,
        status: formData.status,
        budget: parseFloat(formData.budget) || 0,
        user_id: 1,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to save project');
      }

      const createdProject = await res.json();

      // Create receipt/audit trail entry
      if (!editingId && createdProject.id) {
        try {
          await api.createReceipt({
            action_type: 'project_created',
            entity_type: 'project',
            entity_id: createdProject.id,
            entity_name: formData.name,
            user_id: 1,
            user_name: 'Admin',
            details: {
              budget: parseFloat(formData.budget) || 0,
              status: formData.status,
            }
          });
        } catch (receiptError) {
          console.warn('Failed to create receipt entry:', receiptError);
          // Don't block the success message if receipt creation fails
        }
      }

      setSuccess(editingId ? 'Project updated successfully!' : 'Project created successfully!');
      resetForm();
      fetchProjects();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error saving project');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      name: project.name,
      address: project.address || '',
      description: project.description || '',
      status: project.status,
      budget: project.budget.toString(),
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete project');
      
      setSuccess('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      setError('Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          (p.address?.toLowerCase().includes(search.toLowerCase()) || false);
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
    <main style={{ minHeight: '100vh', padding: '2rem 1rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ color: '#f1f5f9', fontSize: '2rem', fontWeight: 700 }}>Projects</h1>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
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

        {/* Messages */}
        {success && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            color: '#10b981',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
          }}>
            ✓ {success}
          </div>
        )}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
          }}>
            ✕ {error}
          </div>
        )}

        {/* Search and Filter */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search projects by name or address..."
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
              minWidth: '150px',
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

        {/* Create/Edit Project Form */}
        {showForm && (
          <div style={{
            background: 'rgba(26, 31, 58, 0.8)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}>
            <h2 style={{ color: '#00d9ff', marginBottom: '1.5rem' }}>
              {editingId ? 'Edit Project' : 'Create New Project'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Project Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  placeholder="Budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'quoted' | 'approved' | 'in-progress' | 'completed' | 'cancelled' })}
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
                  disabled={loading}
                  style={{
                    background: '#00d9ff',
                    color: '#0f172a',
                    fontWeight: 600,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  {loading ? 'Saving...' : (editingId ? 'Update Project' : 'Create Project')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
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

        {/* Projects Grid */}
        {loading && !showForm ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            Loading projects...
          </div>
        ) : filteredProjects.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                style={{
                  background: 'rgba(26, 31, 58, 0.8)',
                  border: '1px solid rgba(0, 217, 255, 0.1)',
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
                    background: `rgba(${
                      statusColors[project.status] === '#a78bfa' ? '167, 139, 250' :
                      statusColors[project.status] === '#00d9ff' ? '0, 217, 255' :
                      statusColors[project.status] === '#f59e0b' ? '245, 158, 11' :
                      statusColors[project.status] === '#10b981' ? '16, 185, 129' :
                      '239, 68, 68'
                    }, 0.15)`,
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
                {project.address && (
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                    📍 {project.address}
                  </p>
                )}
                {project.description && (
                  <p style={{ color: '#cbd5e1', marginBottom: '1rem', minHeight: '50px', lineHeight: '1.5' }}>
                    {project.description}
                  </p>
                )}
                <div style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '1.25rem',
                  color: '#00d9ff',
                  fontWeight: 700,
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(0, 217, 255, 0.1)',
                  marginBottom: '1rem',
                }}>
                  ${project.budget.toLocaleString()}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => handleEdit(project)}
                    style={{
                      flex: 1,
                      background: '#00d9ff',
                      color: '#0f172a',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    style={{
                      flex: 1,
                      background: '#ef4444',
                      color: '#fff',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: '#94a3b8',
          }}>
            <p>No projects found. {!search && !editingId && 'Create your first project to get started.'}</p>
          </div>
        )}
      </div>
    </main>
  );
}
