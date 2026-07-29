'use client';

import { useState, useEffect } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    company_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/users/1');
      const data = await res.json();
      setSettings({
        company_name: data.company_name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        zip: data.zip || '',
        country: data.country || '',
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:8000/api/users/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error saving settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <h1 style={{ color: '#f1f5f9', marginBottom: '2rem' }}>Settings</h1>

        {message && (
          <div style={{
            background: message.includes('success') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${message.includes('success') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '2rem',
            color: message.includes('success') ? '#10b981' : '#ef4444',
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{
          background: 'rgba(26, 31, 58, 0.8)',
          border: '1px solid rgba(0, 217, 255, 0.2)',
          borderRadius: '0.75rem',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
        }}>
          <h2 style={{ color: '#f1f5f9', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Company Information</h2>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
              Company Name
            </label>
            <input
              type="text"
              value={settings.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(0, 217, 255, 0.2)',
                borderRadius: '0.5rem',
                color: '#f1f5f9',
                padding: '0.75rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <h2 style={{ color: '#f1f5f9', marginBottom: '1.5rem', marginTop: '2rem', fontSize: '1.25rem' }}>Contact Information</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(0, 217, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: '#f1f5f9',
                  padding: '0.75rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                Phone
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(0, 217, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: '#f1f5f9',
                  padding: '0.75rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <h2 style={{ color: '#f1f5f9', marginBottom: '1.5rem', marginTop: '2rem', fontSize: '1.25rem' }}>Address</h2>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
              Street Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(0, 217, 255, 0.2)',
                borderRadius: '0.5rem',
                color: '#f1f5f9',
                padding: '0.75rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                City
              </label>
              <input
                type="text"
                value={settings.city}
                onChange={(e) => handleChange('city', e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(0, 217, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: '#f1f5f9',
                  padding: '0.75rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                State
              </label>
              <input
                type="text"
                value={settings.state}
                onChange={(e) => handleChange('state', e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(0, 217, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: '#f1f5f9',
                  padding: '0.75rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                ZIP
              </label>
              <input
                type="text"
                value={settings.zip}
                onChange={(e) => handleChange('zip', e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(0, 217, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: '#f1f5f9',
                  padding: '0.75rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>
              Country
            </label>
            <input
              type="text"
              value={settings.country}
              onChange={(e) => handleChange('country', e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(0, 217, 255, 0.2)',
                borderRadius: '0.5rem',
                color: '#f1f5f9',
                padding: '0.75rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              width: '100%',
              background: '#a78bfa',
              color: '#0f172a',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </main>
  );
}
