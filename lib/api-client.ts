/**
 * API client — automatically routes to backend based on environment
 * Dev: http://localhost:8000
 * Prod: NEXT_PUBLIC_API_URL env var or default to Vercel Railway URL
 */

export const API_BASE_URL =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    : 'http://localhost:8000';

export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error(`Fetch failed for ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  // Ecosystem (unified dashboard)
  getEcosystemDashboard: () => fetchAPI('/api/ecosystem/dashboard/summary'),
  getAgents: () => fetchAPI('/api/ecosystem/agents'),
  getAgentLogs: (agentId: string, limit: number = 50) =>
    fetchAPI(`/api/ecosystem/agents/${agentId}/logs?limit=${limit}`),
  getTradingMetrics: () => fetchAPI('/api/ecosystem/trading/metrics'),
  getTradingPositions: () => fetchAPI('/api/ecosystem/trading/positions'),
  getTradingSignals: () => fetchAPI('/api/ecosystem/trading/signals'),
  getOperationsQueue: () => fetchAPI('/api/ecosystem/operations/queue'),
  getNotifications: (limit: number = 20) =>
    fetchAPI(`/api/ecosystem/notifications?limit=${limit}`),
  triggerOperation: (operationId: string) =>
    fetchAPI(`/api/ecosystem/operations/${operationId}/trigger`, { method: 'POST' }),
  stopAgent: (agentId: string) =>
    fetchAPI(`/api/ecosystem/agents/${agentId}/stop`, { method: 'POST' }),

  // Business CRUD
  getProjects: () => fetchAPI('/api/projects'),
  createProject: (data: any) =>
    fetchAPI('/api/projects', { method: 'POST', body: JSON.stringify(data) }),
  updateProject: (id: number, data: any) =>
    fetchAPI(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProject: (id: number) =>
    fetchAPI(`/api/projects/${id}`, { method: 'DELETE' }),

  getQuotes: () => fetchAPI('/api/quotes'),
  createQuote: (data: any) =>
    fetchAPI('/api/quotes', { method: 'POST', body: JSON.stringify(data) }),
  updateQuote: (id: number, data: any) =>
    fetchAPI(`/api/quotes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteQuote: (id: number) =>
    fetchAPI(`/api/quotes/${id}`, { method: 'DELETE' }),

  getCrew: () => fetchAPI('/api/crew'),
  createCrew: (data: any) =>
    fetchAPI('/api/crew', { method: 'POST', body: JSON.stringify(data) }),
  updateCrew: (id: number, data: any) =>
    fetchAPI(`/api/crew/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCrew: (id: number) =>
    fetchAPI(`/api/crew/${id}`, { method: 'DELETE' }),

  getPhotos: () => fetchAPI('/api/photos'),
  createPhoto: (data: any) =>
    fetchAPI('/api/photos', { method: 'POST', body: JSON.stringify(data) }),
  updatePhoto: (id: number, data: any) =>
    fetchAPI(`/api/photos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePhoto: (id: number) =>
    fetchAPI(`/api/photos/${id}`, { method: 'DELETE' }),

  getInvoices: () => fetchAPI('/api/invoices'),
  createInvoice: (data: any) =>
    fetchAPI('/api/invoices', { method: 'POST', body: JSON.stringify(data) }),
  updateInvoice: (id: number, data: any) =>
    fetchAPI(`/api/invoices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteInvoice: (id: number) =>
    fetchAPI(`/api/invoices/${id}`, { method: 'DELETE' }),

  getUser: (id: number) => fetchAPI(`/api/users/${id}`),
  updateUser: (id: number, data: any) =>
    fetchAPI(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Audit Trail / Receipts
  getReceipts: (limit: number = 100) =>
    fetchAPI(`/api/receipts?limit=${limit}`),
  createReceipt: (data: any) =>
    fetchAPI('/api/receipts', { method: 'POST', body: JSON.stringify(data) }),
};
