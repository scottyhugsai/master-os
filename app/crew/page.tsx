'use client';

import { useState, useEffect } from 'react';

export default function Crew() {
  const [crew, setCrew] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
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
      const res = await fetch('http://localhost:8000/api/crew');
      const data = await res.json();
      setCrew(data || []);
    } catch (error) {
      console.error('Error fetching crew:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/projects');
      const data = await res.json();
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        role: formData.role,
        email: formData.email,
        phone: formData.phone,
        project_id: formData.project_id ? parseInt(formData.project_id) : null,
      };

      const url = editingId
        ? `http://localhost:8000/api/crew/${editingId}`
        : 'http://localhost:8000/api/crew';
      
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormData({ name: '', role: '', email: '', phone: '', project_id: '' });
        setShowForm(false);
        setEditingId(null);
        fetchCrew();
      } else {
        const error = await res.json();
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error submitting crew member:', error);
    }
  };

  const handleEdit = (member: any) => {
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
    if (!confirm('Remove this crew member?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/crew/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCrew();
    } catch (error) {
      console.error('Error deleting crew member:', error);
    }
  };

  const filteredCrew = crew.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase())
  );

  const roleColors: Record<string, string> = {
    'Supervisor': '#00d9ff',
    'Roofer': '#10b981',
    'Laborer': '#a78bfa',
    'Foreman': '#f59e0b',
    'Safety Officer': '#ef4444',
  };

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ color: '#f1f5f9' }}>Crew Management</h1>
          <button
            onClick={() => {
              setFormData({ name: '', role: '', email: '', phone: '', project_id: '' });
              setEditingId(null);
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
            }}
          >
            + Add Crew Member
          </button>
        </div>

        <input
          type="text"
          placeholder="Search crew..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(26, 31, 58, 0.8)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            borderRadius: '0.5rem',
            color: '#f1f5f9',
            padding: '0.75rem 1rem',
            marginBottom: '2rem',
          }}
        />

        {showForm && (
          <div style={{
            background: 'rgba(26, 31, 58, 0.8)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem',
                  }}
                />
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem',
                  }}
                >
                  <option value="">Select Role</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Roofer">Roofer</option>
                  <option value="Laborer">Laborer</option>
                  <option value="Foreman">Foreman</option>
                  <option value="Safety Officer">Safety Officer</option>
                </select>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem',
                  }}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem',
                  }}
                />
                <select
                  value={formData.project_id}
                  onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem',
                  }}
                >
                  <option value="">Select Project (Optional)</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{
                  background: '#10b981',
                  color: '#fff',
                  fontWeight: 600,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                }}>
                  {editingId ? 'Update Member' : 'Add Member'}
                </button>
                <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} style={{
                  background: 'transparent',
                  color: '#cbd5e1',
                  fontWeight: 600,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer',
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredCrew.map((member) => (
            <div key={member.id} style={{
              background: 'rgba(26, 31, 58, 0.8)',
              border: '1px solid rgba(0, 217, 255, 0.1)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#f1f5f9', marginBottom: '0.5rem' }}>{member.name}</h3>
                <span style={{
                  background: `rgba(${roleColors[member.role] === '#00d9ff' ? '0, 217, 255' : roleColors[member.role] === '#10b981' ? '16, 185, 129' : roleColors[member.role] === '#a78bfa' ? '167, 139, 250' : roleColors[member.role] === '#f59e0b' ? '245, 158, 11' : '239, 68, 68'}, 0.15)`,
                  color: roleColors[member.role] || '#00d9ff',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  {member.role}
                </span>
              </div>
              {member.email && <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.25rem' }}>📧 {member.email}</p>}
              {member.phone && <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.75rem' }}>📞 {member.phone}</p>}
              {member.project_id && <p style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '1rem' }}>📁 Project ID: {member.project_id}</p>}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => handleEdit(member)} style={{
                  background: '#00d9ff',
                  color: '#0f172a',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  flex: 1,
                }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(member.id)} style={{
                  background: '#ef4444',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  flex: 1,
                }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCrew.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
            <p>No crew members yet. Add your first team member to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}
