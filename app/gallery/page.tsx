'use client';

import { useState, useEffect } from 'react';

export default function Gallery() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    project_id: '',
  });

  useEffect(() => {
    fetchPhotos();
    fetchProjects();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/photos');
      const data = await res.json();
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
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
        url: formData.url,
        project_id: formData.project_id ? parseInt(formData.project_id) : null,
      };

      const url = editingId
        ? `http://localhost:8000/api/photos/${editingId}`
        : 'http://localhost:8000/api/photos';
      
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormData({ title: '', url: '', project_id: '' });
        setEditingId(null);
        fetchPhotos();
      } else {
        const error = await res.json();
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error submitting photo:', error);
    }
  };

  const handleEdit = (photo: any) => {
    setFormData({
      title: photo.title,
      url: photo.url,
      project_id: photo.project_id?.toString() || '',
    });
    setEditingId(photo.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this photo?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/photos/${id}`, { method: 'DELETE' });
      if (res.ok) fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const filteredPhotos = photos.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <h1 style={{ color: '#f1f5f9', marginBottom: '2rem' }}>Photo Gallery</h1>

        <input
          type="text"
          placeholder="Search photos..."
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

        <div style={{
          background: 'rgba(26, 31, 58, 0.8)',
          border: '1px solid rgba(0, 217, 255, 0.2)',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)',
        }}>
          <h3 style={{ color: '#f1f5f9', marginBottom: '1rem' }}>
            {editingId ? 'Edit Photo' : 'Add New Photo'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Photo Title"
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
                type="url"
                placeholder="Image URL"
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
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
                background: '#a78bfa',
                color: '#0f172a',
                fontWeight: 600,
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
              }}>
                {editingId ? 'Update Photo' : 'Add Photo'}
              </button>
              {editingId && (
                <button type="button" onClick={() => setEditingId(null)} style={{
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
              )}
            </div>
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredPhotos.map((photo) => (
            <div key={photo.id} style={{
              background: 'rgba(26, 31, 58, 0.8)',
              border: '1px solid rgba(0, 217, 255, 0.1)',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
            }}>
              <div style={{
                width: '100%',
                height: '200px',
                background: 'rgba(15, 23, 42, 0.5)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {photo.url ? (
                  <img
                    src={photo.url}
                    alt={photo.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>No image available</div>
                )}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ color: '#00d9ff', marginBottom: '0.5rem' }}>{photo.title}</h3>
                {photo.project_id && (
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>Project ID: {photo.project_id}</p>
                )}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => handleEdit(photo)} style={{
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
                  <button onClick={() => handleDelete(photo.id)} style={{
                    background: '#ef4444',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    flex: 1,
                  }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
            <p>No photos yet. Upload your first photo to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}
