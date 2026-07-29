'use client';

import { useState, useEffect } from 'react';

export default function Quotes() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    status: 'draft',
    project_id: '',
  });

  useEffect(() => {
    fetchQuotes();
    fetchProjects();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/quotes');
      const data = await res.json();
      setQuotes(data || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
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
        title: formData.title,
        description: formData.description,
        amount: parseFloat(formData.amount) || 0,
        status: formData.status,
        project_id: parseInt(formData.project_id) || 1,
      };

      const url = editingId
        ? `http://localhost:8000/api/quotes/${editingId}`
        : 'http://localhost:8000/api/quotes';
      
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormData({ title: '', description: '', amount: '', status: 'draft', project_id: '' });
        setShowForm(false);
        setEditingId(null);
        fetchQuotes();
      } else {
        const error = await res.json();
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  const handleEdit = (quote: any) => {
    setFormData({
      title: quote.title,
      description: quote.description,
      amount: quote.amount.toString(),
      status: quote.status,
      project_id: quote.project_id?.toString() || '',
    });
    setEditingId(quote.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this quote?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/quotes/${id}`, { method: 'DELETE' });
      if (res.ok) fetchQuotes();
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  const filteredQuotes = quotes.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    q.description.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    draft: '#94a3b8',
    sent: '#00d9ff',
    accepted: '#10b981',
    rejected: '#ef4444',
  };

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ color: '#f1f5f9' }}>Quotes</h1>
          <button
            onClick={() => {
              setFormData({ title: '', description: '', amount: '', status: 'draft', project_id: '' });
              setEditingId(null);
              setShowForm(!showForm);
            }}
            style={{
              background: '#a78bfa',
              color: '#0f172a',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            + New Quote
          </button>
        </div>

        <input
          type="text"
          placeholder="Search quotes..."
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
                  placeholder="Quote Title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem',
                  }}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem',
                  }}
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem',
                  }}
                >
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
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
                  <option value="">Select Project</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(0, 217, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: '#f1f5f9',
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  minHeight: '100px',
                  fontFamily: 'inherit',
                }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{
                  background: '#a78bfa',
                  color: '#0f172a',
                  fontWeight: 600,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                }}>
                  {editingId ? 'Update Quote' : 'Create Quote'}
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

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {filteredQuotes.map((quote) => (
            <div key={quote.id} style={{
              background: 'rgba(26, 31, 58, 0.8)',
              border: '1px solid rgba(0, 217, 255, 0.1)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ color: '#00d9ff', marginBottom: '0.5rem' }}>{quote.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Project ID: {quote.project_id}</p>
                </div>
                <span style={{
                  background: `rgba(${statusColors[quote.status] === '#a78bfa' ? '167, 139, 250' : statusColors[quote.status] === '#00d9ff' ? '0, 217, 255' : statusColors[quote.status] === '#10b981' ? '16, 185, 129' : '239, 68, 68'}, 0.15)`,
                  color: statusColors[quote.status],
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  {quote.status}
                </span>
              </div>
              <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>{quote.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '1.25rem', color: '#a78bfa', fontWeight: 700 }}>
                  ${quote.amount.toLocaleString()}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => handleEdit(quote)} style={{
                    background: '#00d9ff',
                    color: '#0f172a',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(quote.id)} style={{
                    background: '#ef4444',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredQuotes.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
            <p>No quotes yet. Create your first quote to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}
