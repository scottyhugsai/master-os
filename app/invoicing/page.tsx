'use client';

import { useState, useEffect } from 'react';

export default function Invoicing() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    invoice_number: '',
    amount: '',
    status: 'draft',
    project_id: '',
    due_date: '',
  });

  useEffect(() => {
    fetchInvoices();
    fetchProjects();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/invoices');
      const data = await res.json();
      setInvoices(data || []);
    } catch (error) {
      console.error('Error fetching invoices:', error);
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
        invoice_number: formData.invoice_number,
        amount: parseFloat(formData.amount) || 0,
        status: formData.status,
        project_id: parseInt(formData.project_id) || 1,
        due_date: formData.due_date || null,
      };

      const url = editingId
        ? `http://localhost:8000/api/invoices/${editingId}`
        : 'http://localhost:8000/api/invoices';
      
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormData({ invoice_number: '', amount: '', status: 'draft', project_id: '', due_date: '' });
        setShowForm(false);
        setEditingId(null);
        fetchInvoices();
      } else {
        const error = await res.json();
        console.error('Error:', error);
      }
    } catch (error) {
      console.error('Error submitting invoice:', error);
    }
  };

  const handleEdit = (invoice: any) => {
    setFormData({
      invoice_number: invoice.invoice_number,
      amount: invoice.amount.toString(),
      status: invoice.status,
      project_id: invoice.project_id?.toString() || '',
      due_date: invoice.due_date || '',
    });
    setEditingId(invoice.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this invoice?')) return;
    try {
      const res = await fetch(`http://localhost:8000/api/invoices/${id}`, { method: 'DELETE' });
      if (res.ok) fetchInvoices();
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const filteredInvoices = invoices.filter((inv) =>
    inv.invoice_number.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors: Record<string, string> = {
    draft: '#94a3b8',
    sent: '#00d9ff',
    paid: '#10b981',
    overdue: '#ef4444',
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ color: '#f1f5f9' }}>Invoicing</h1>
          <button
            onClick={() => {
              setFormData({ invoice_number: '', amount: '', status: 'draft', project_id: '', due_date: '' });
              setEditingId(null);
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
            }}
          >
            + New Invoice
          </button>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{
            background: 'rgba(26, 31, 58, 0.8)',
            border: '1px solid rgba(0, 217, 255, 0.1)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
          }}>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Invoiced</p>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '1.75rem', color: '#a78bfa', fontWeight: 700 }}>
              ${totalAmount.toLocaleString()}
            </div>
          </div>
          <div style={{
            background: 'rgba(26, 31, 58, 0.8)',
            border: '1px solid rgba(16, 185, 129, 0.1)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
          }}>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Amount Paid</p>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '1.75rem', color: '#10b981', fontWeight: 700 }}>
              ${paidAmount.toLocaleString()}
            </div>
          </div>
          <div style={{
            background: 'rgba(26, 31, 58, 0.8)',
            border: '1px solid rgba(239, 68, 68, 0.1)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
          }}>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Outstanding</p>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '1.75rem', color: '#ef4444', fontWeight: 700 }}>
              ${(totalAmount - paidAmount).toLocaleString()}
            </div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search invoices..."
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
                  placeholder="Invoice Number"
                  required
                  value={formData.invoice_number}
                  onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
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
                  required
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
                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
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
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
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
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{
                  background: '#00d9ff',
                  color: '#0f172a',
                  fontWeight: 600,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                }}>
                  {editingId ? 'Update Invoice' : 'Create Invoice'}
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
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id} style={{
              background: 'rgba(26, 31, 58, 0.8)',
              border: '1px solid rgba(0, 217, 255, 0.1)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ color: '#00d9ff', marginBottom: '0.5rem' }}>INV-{invoice.invoice_number}</h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Project ID: {invoice.project_id}</p>
                </div>
                <span style={{
                  background: `rgba(${statusColors[invoice.status] === '#a78bfa' ? '167, 139, 250' : statusColors[invoice.status] === '#00d9ff' ? '0, 217, 255' : statusColors[invoice.status] === '#10b981' ? '16, 185, 129' : '239, 68, 68'}, 0.15)`,
                  color: statusColors[invoice.status],
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}>
                  {invoice.status}
                </span>
              </div>
              {invoice.due_date && <p style={{ color: '#cbd5e1', fontSize: '0.875rem', marginBottom: '1rem' }}>Due: {invoice.due_date}</p>}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '1.5rem', color: '#a78bfa', fontWeight: 700 }}>
                  ${invoice.amount.toLocaleString()}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => handleEdit(invoice)} style={{
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
                  <button onClick={() => handleDelete(invoice.id)} style={{
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

        {filteredInvoices.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
            <p>No invoices yet. Create your first invoice to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}
