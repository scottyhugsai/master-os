'use client';

import { useState, useEffect } from 'react';

interface LineItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Quote {
  id: number;
  title: string;
  description?: string;
  amount: number;
  status: 'draft' | 'sent' | 'won' | 'lost';
  project_id?: number;
  line_items?: LineItem[];
  created_at: string;
  updated_at: string;
}

interface Project {
  id: number;
  name: string;
}

export default function Quotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    status: 'draft' | 'sent' | 'won' | 'lost';
    project_id: string;
    lineItems: LineItem[];
  }>({
    title: '',
    description: '',
    status: 'draft',
    project_id: '',
    lineItems: [{ id: '0', description: '', quantity: 1, unitPrice: 0, total: 0 }],
  });

  useEffect(() => {
    fetchQuotes();
    fetchProjects();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/api/quotes');
      const data = await res.json();
      setQuotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setError('Failed to load quotes');
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

  const calculateTotal = (items: LineItem[]) => {
    return items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const updateLineItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.lineItems];
    const item = newItems[index];
    
    if (field === 'quantity' || field === 'unitPrice') {
      (item as any)[field] = parseFloat(value) || 0;
      item.total = item.quantity * item.unitPrice;
    } else {
      (item as any)[field] = value;
    }
    
    setFormData({ ...formData, lineItems: newItems });
  };

  const addLineItem = () => {
    setFormData({
      ...formData,
      lineItems: [
        ...formData.lineItems,
        { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0, total: 0 }
      ]
    });
  };

  const removeLineItem = (index: number) => {
    if (formData.lineItems.length > 1) {
      setFormData({
        ...formData,
        lineItems: formData.lineItems.filter((_, i) => i !== index)
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'draft',
      project_id: '',
      lineItems: [{ id: '0', description: '', quantity: 1, unitPrice: 0, total: 0 }],
    });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title.trim()) {
      setError('Quote title is required');
      return;
    }

    if (formData.lineItems.some(item => !item.description.trim())) {
      setError('All line items must have a description');
      return;
    }

    try {
      setLoading(true);
      const totalAmount = calculateTotal(formData.lineItems);
      
      const url = editingId
        ? `http://localhost:8000/api/quotes/${editingId}`
        : 'http://localhost:8000/api/quotes';
      
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        title: formData.title,
        description: formData.description || `${formData.lineItems.length} line items`,
        amount: totalAmount,
        status: formData.status,
        project_id: formData.project_id ? parseInt(formData.project_id) : null,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to save quote');
      }

      setSuccess(editingId ? 'Quote updated successfully!' : 'Quote created successfully!');
      resetForm();
      fetchQuotes();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error saving quote');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (quote: Quote) => {
    const lineItems = quote.line_items && quote.line_items.length > 0
      ? quote.line_items
      : [{ id: '0', description: '', quantity: 1, unitPrice: 0, total: 0 }];
    
    setFormData({
      title: quote.title,
      description: quote.description || '',
      status: quote.status as 'draft' | 'sent' | 'won' | 'lost',
      project_id: quote.project_id?.toString() || '',
      lineItems: lineItems,
    });
    setEditingId(quote.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quote?')) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/api/quotes/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete quote');
      
      setSuccess('Quote deleted successfully!');
      fetchQuotes();
    } catch (error) {
      setError('Failed to delete quote');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (quoteId: number, newStatus: string) => {
    try {
      const quote = quotes.find(q => q.id === quoteId);
      if (!quote) return;

      const res = await fetch(`http://localhost:8000/api/quotes/${quoteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: quote.title,
          description: quote.description,
          amount: quote.amount,
          status: newStatus,
          project_id: quote.project_id,
        }),
      });

      if (res.ok) {
        setSuccess(`Quote marked as ${newStatus}!`);
        fetchQuotes();
      }
    } catch (error) {
      setError('Failed to update quote status');
    }
  };

  const filteredQuotes = quotes.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    (q.description?.toLowerCase().includes(search.toLowerCase()) || false)
  );

  const statusColors: Record<string, string> = {
    draft: '#94a3b8',
    sent: '#00d9ff',
    won: '#10b981',
    lost: '#ef4444',
  };

  const totalAmount = calculateTotal(formData.lineItems);

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ color: '#f1f5f9', fontSize: '2rem', fontWeight: 700 }}>Quotes</h1>
          <button
            onClick={() => {
              resetForm();
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
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#9370db';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(167, 139, 250, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#a78bfa';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            + New Quote
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

        {/* Create/Edit Quote Form */}
        {showForm && (
          <div style={{
            background: 'rgba(26, 31, 58, 0.8)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
          }}>
            <h2 style={{ color: '#a78bfa', marginBottom: '1.5rem' }}>
              {editingId ? 'Edit Quote' : 'Create New Quote'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  placeholder="Quote Title *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'sent' | 'won' | 'lost' })}
                  style={{
                    background: 'rgba(26, 31, 58, 0.8)',
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                  }}
                >
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
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
                  <option value="">Select Project (Optional)</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <textarea
                placeholder="Quote Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(26, 31, 58, 0.8)',
                  border: '1px solid rgba(0, 217, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: '#f1f5f9',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.5rem',
                  minHeight: '80px',
                  fontFamily: 'inherit',
                }}
              />

              {/* Line Items Section */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#00d9ff', marginBottom: '1rem', fontSize: '1rem' }}>Line Items</h3>
                <div style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  marginBottom: '1rem',
                }}>
                  {formData.lineItems.map((item, index) => (
                    <div key={item.id} style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <input
                          type="text"
                          placeholder="Description *"
                          value={item.description}
                          onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                          style={{
                            background: 'rgba(26, 31, 58, 0.8)',
                            border: '1px solid rgba(0, 217, 255, 0.2)',
                            borderRadius: '0.5rem',
                            color: '#f1f5f9',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.875rem',
                          }}
                        />
                        <input
                          type="number"
                          placeholder="Qty"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(index, 'quantity', e.target.value)}
                          style={{
                            background: 'rgba(26, 31, 58, 0.8)',
                            border: '1px solid rgba(0, 217, 255, 0.2)',
                            borderRadius: '0.5rem',
                            color: '#f1f5f9',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.875rem',
                          }}
                        />
                        <input
                          type="number"
                          placeholder="Unit Price"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateLineItem(index, 'unitPrice', e.target.value)}
                          style={{
                            background: 'rgba(26, 31, 58, 0.8)',
                            border: '1px solid rgba(0, 217, 255, 0.2)',
                            borderRadius: '0.5rem',
                            color: '#f1f5f9',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.875rem',
                          }}
                        />
                        <div style={{
                          background: 'rgba(0, 217, 255, 0.1)',
                          border: '1px solid rgba(0, 217, 255, 0.3)',
                          borderRadius: '0.5rem',
                          color: '#00d9ff',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}>
                          ${item.total.toFixed(2)}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLineItem(index)}
                          disabled={formData.lineItems.length === 1}
                          style={{
                            background: '#ef4444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5rem',
                            padding: '0.5rem 0.75rem',
                            cursor: formData.lineItems.length === 1 ? 'not-allowed' : 'pointer',
                            fontSize: '0.875rem',
                            opacity: formData.lineItems.length === 1 ? 0.5 : 1,
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addLineItem}
                    style={{
                      background: 'rgba(0, 217, 255, 0.2)',
                      color: '#00d9ff',
                      border: '1px dashed rgba(0, 217, 255, 0.5)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      cursor: 'pointer',
                      fontWeight: 500,
                      width: '100%',
                    }}
                  >
                    + Add Line Item
                  </button>
                </div>

                {/* Total */}
                <div style={{
                  background: 'rgba(167, 139, 250, 0.1)',
                  border: '1px solid rgba(167, 139, 250, 0.3)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Total Amount:</span>
                  <span style={{ color: '#a78bfa', fontSize: '1.5rem', fontWeight: 700, fontFamily: "'Fira Code', monospace" }}>
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: '#a78bfa',
                    color: '#0f172a',
                    fontWeight: 600,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  {loading ? 'Saving...' : (editingId ? 'Update Quote' : 'Create Quote')}
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

        {/* Quotes List */}
        {loading && !showForm ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            Loading quotes...
          </div>
        ) : filteredQuotes.length > 0 ? (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {filteredQuotes.map((quote) => (
              <div key={quote.id} style={{
                background: 'rgba(26, 31, 58, 0.8)',
                border: '1px solid rgba(0, 217, 255, 0.1)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ color: '#00d9ff', marginBottom: '0.5rem' }}>{quote.title}</h3>
                    {quote.project_id && (
                      <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                        📁 Project ID: {quote.project_id}
                      </p>
                    )}
                  </div>
                  <span style={{
                    background: `rgba(${
                      statusColors[quote.status] === '#94a3b8' ? '148, 163, 184' :
                      statusColors[quote.status] === '#00d9ff' ? '0, 217, 255' :
                      statusColors[quote.status] === '#10b981' ? '16, 185, 129' :
                      '239, 68, 68'
                    }, 0.15)`,
                    color: statusColors[quote.status],
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}>
                    {quote.status}
                  </span>
                </div>

                {quote.description && (
                  <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>{quote.description}</p>
                )}

                <div style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  marginBottom: '1rem',
                }}>
                  <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '1.5rem', color: '#a78bfa', fontWeight: 700 }}>
                    ${quote.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button onClick={() => handleEdit(quote)} style={{
                    background: '#00d9ff',
                    color: '#0f172a',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}>
                    Edit
                  </button>
                  {quote.status !== 'won' && (
                    <button onClick={() => handleStatusChange(quote.id, 'won')} style={{
                      background: '#10b981',
                      color: '#fff',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}>
                      Mark Won
                    </button>
                  )}
                  {quote.status !== 'lost' && (
                    <button onClick={() => handleStatusChange(quote.id, 'lost')} style={{
                      background: '#ef4444',
                      color: '#fff',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}>
                      Mark Lost
                    </button>
                  )}
                  <button onClick={() => handleDelete(quote.id)} style={{
                    background: 'transparent',
                    color: '#ef4444',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #ef4444',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    marginLeft: 'auto',
                  }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
            <p>No quotes yet. Create your first quote to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}
