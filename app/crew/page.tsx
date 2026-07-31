'use client';

import { useState, useEffect } from 'react';

interface CrewMember {
  id: number;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  project_id?: number;
  created_at: string;
  updated_at: string;
}

interface Project {
  id: number;
  name: string;
}

export default function Crew() {
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    project_id: '',
  });

  useEffect(() => {
    fetchCrew();
    fetchProjects();
  }, []);

  const fetchCrew = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/api/crew');
      const data = await res.json();
      setCrew(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching crew:', error);
      setError('Failed to load crew members');
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      email: '',
      phone: '',
      project_id: '',
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
      setError('Full name is required');
      return;
    }

    if (!formData.role.trim()) {
      setError('Role is required');
      return;
    }

    try {
      setLoading(true);
      const url = editingId
        ? `http://localhost:8000/api/crew/${editingId}`
        : 'http://localhost:8000/api/crew';
      
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        name: formData.name,
        role: formData.role,
        email: formData.email || null,
        phone: formData.phone || null,
        project_id: formData.project_id ? parseInt(formData.project_id) : null,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to save crew member');
      }

      setSuccess(editingId ? 'Crew member updated successfully!' : 'Crew member added successfully!');
      resetForm();
      fetchCrew();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error saving crew member');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: CrewMember) => {
    setFormData({
      name: member.name,
      role: member.role,
      email: member.email || '',
      phone: member.phone || '',
      project_id: member.project_id?.toString() || '',
    });
    setEditingId(member.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this crew member?')) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/crew/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to remove crew member');
      
      setSuccess('Crew member removed successfully!');
      fetchCrew();
    } catch (error) {
      setError('Failed to remove crew member');
    } finally {
      setLoading(false);
    }
  };

  const assignToProject = async (memberId: number, projectId: number | null) => {
    try {
      const member = crew.find(m => m.id === memberId);
      if (!member) return;

      const res = await fetch(`http://localhost:8000/api/crew/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: member.name,
          role: member.role,
          email: member.email,
          phone: member.phone,
          project_id: projectId,
        }),
      });

      if (res.ok) {
        setSuccess(projectId ? 'Crew member assigned to project!' : 'Crew member unassigned!');
        fetchCrew();
      }
    } catch (error) {
      setError('Failed to update assignment');
    }
  };

  const filteredCrew = crew.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                         m.role.toLowerCase().includes(search.toLowerCase()) ||
                         (m.email?.toLowerCase().includes(search.toLowerCase()) || false);
    const matchesRole = roleFilter === 'all' || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const uniqueRoles = Array.from(new Set(crew.map(m => m.role))).sort();

  const roleColors: Record<string, string> = {
    'Supervisor': '#00d9ff',
    'Roofer': '#10b981',
    'Laborer': '#a78bfa',
    'Foreman': '#f59e0b',
    'Safety Officer': '#ef4444',
    'Apprentice': '#8b5cf6',
    'Inspector': '#06b6d4',
  };

  const getProjectName = (projectId?: number) => {
    return projects.find(p => p.id === projectId)?.name || null;
  };

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ color: '#f1f5f9', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Crew Management</h1>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Total members: {crew.length}</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            style={{
              background: '#10b981',
              color: '#fff',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#059669';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#10b981';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            + Add Crew Member
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

        {/* Search and Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search by name, role, or email..."
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
            }}
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
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
            <option value="all">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Add/Edit Crew Form */}
        {showForm && (
          <div style={{
            background: 'rgba(26, 31, 58, 0.8)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}>
            <h2 style={{ color: '#10b981', marginBottom: '1.5rem' }}>
              {editingId ? 'Edit Crew Member' : 'Add New Crew Member'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Full Name *"
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
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{
                    background: 'rgba(26, 31, 58, 0.8)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Select Role *</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Roofer">Roofer</option>
                  <option value="Laborer">Laborer</option>
                  <option value="Foreman">Foreman</option>
                  <option value="Safety Officer">Safety Officer</option>
                  <option value="Apprentice">Apprentice</option>
                  <option value="Inspector">Inspector</option>
                </select>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    background: 'rgba(26, 31, 58, 0.8)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem 1rem',
                  }}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    background: 'rgba(26, 31, 58, 0.8)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem 1rem',
                  }}
                />
                <select
                  value={formData.project_id}
                  onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                  style={{
                    background: 'rgba(26, 31, 58, 0.8)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Assign to Project (Optional)</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: '#10b981',
                    color: '#fff',
                    fontWeight: 600,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  {loading ? 'Saving...' : (editingId ? 'Update Member' : 'Add Member')}
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

        {/* Crew Grid */}
        {loading && !showForm ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            Loading crew members...
          </div>
        ) : filteredCrew.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}>
            {filteredCrew.map((member) => {
              const projectName = getProjectName(member.project_id);
              const roleColor = roleColors[member.role] || '#00d9ff';
              
              return (
                <div
                  key={member.id}
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
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ color: '#f1f5f9', marginBottom: '0.5rem' }}>{member.name}</h3>
                    <span style={{
                      background: `rgba(${
                        roleColor === '#00d9ff' ? '0, 217, 255' :
                        roleColor === '#10b981' ? '16, 185, 129' :
                        roleColor === '#a78bfa' ? '167, 139, 250' :
                        roleColor === '#f59e0b' ? '245, 158, 11' :
                        roleColor === '#ef4444' ? '239, 68, 68' :
                        roleColor === '#8b5cf6' ? '139, 92, 246' :
                        '6, 182, 212'
                      }, 0.15)`,
                      color: roleColor,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      {member.role}
                    </span>
                  </div>

                  {member.email && (
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                      📧 {member.email}
                    </p>
                  )}
                  {member.phone && (
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                      📞 {member.phone}
                    </p>
                  )}

                  {projectName ? (
                    <div style={{
                      background: 'rgba(0, 217, 255, 0.1)',
                      border: '1px solid rgba(0, 217, 255, 0.2)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      marginBottom: '1rem',
                    }}>
                      <p style={{ color: '#00d9ff', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                        ASSIGNED PROJECT
                      </p>
                      <p style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>
                        📁 {projectName}
                      </p>
                    </div>
                  ) : (
                    <div style={{
                      background: 'rgba(148, 163, 184, 0.1)',
                      border: '1px dashed rgba(148, 163, 184, 0.3)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem',
                      marginBottom: '1rem',
                    }}>
                      <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                        No project assigned
                      </p>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleEdit(member)}
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
                        minWidth: '80px',
                      }}
                    >
                      Edit
                    </button>
                    {member.project_id && (
                      <button
                        onClick={() => assignToProject(member.id, null)}
                        style={{
                          flex: 1,
                          background: 'rgba(239, 68, 68, 0.2)',
                          color: '#ef4444',
                          padding: '0.5rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #ef4444',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          minWidth: '80px',
                        }}
                      >
                        Unassign
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(member.id)}
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
                        minWidth: '80px',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
            <p>No crew members found. Add your first team member to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}
