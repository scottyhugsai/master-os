/**
 * API Utilities for Master OS Frontend
 * Handles all communications with FastAPI backend at localhost:8000
 */

const API_BASE_URL = 'http://localhost:8000';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.detail || `HTTP ${response.status}`,
        errorData
      );
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Network error', { originalError: error });
  }
}

// ============================================================================
// PROJECT ENDPOINTS
// ============================================================================

export interface ProjectInput {
  name: string;
  description?: string;
  status?: string;
  budget?: number;
  user_id: number;
}

export interface Project extends ProjectInput {
  id: number;
  created_at: string;
  updated_at: string;
}

export const projectsApi = {
  list: async (userId?: number): Promise<Project[]> => {
    const query = userId ? `?user_id=${userId}` : '';
    return apiCall<Project[]>(`/projects${query}`);
  },

  get: async (id: number): Promise<Project> => {
    return apiCall<Project>(`/projects/${id}`);
  },

  create: async (project: ProjectInput): Promise<Project> => {
    return apiCall<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  },

  update: async (id: number, project: Partial<ProjectInput>): Promise<Project> => {
    return apiCall<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  },

  delete: async (id: number): Promise<void> => {
    return apiCall<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================================================
// QUOTE ENDPOINTS
// ============================================================================

export interface QuoteInput {
  title: string;
  description?: string;
  amount: number;
  status?: string;
  project_id: number;
}

export interface Quote extends QuoteInput {
  id: number;
  created_at: string;
}

export const quotesApi = {
  list: async (projectId?: number): Promise<Quote[]> => {
    const query = projectId ? `?project_id=${projectId}` : '';
    return apiCall<Quote[]>(`/quotes${query}`);
  },

  get: async (id: number): Promise<Quote> => {
    return apiCall<Quote>(`/quotes/${id}`);
  },

  create: async (quote: QuoteInput): Promise<Quote> => {
    return apiCall<Quote>('/quotes', {
      method: 'POST',
      body: JSON.stringify(quote),
    });
  },

  update: async (id: number, quote: Partial<QuoteInput>): Promise<Quote> => {
    return apiCall<Quote>(`/quotes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(quote),
    });
  },

  delete: async (id: number): Promise<void> => {
    return apiCall<void>(`/quotes/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================================================
// CREW ENDPOINTS
// ============================================================================

export interface CrewInput {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  project_id: number;
}

export interface Crew extends CrewInput {
  id: number;
  created_at: string;
}

export const crewApi = {
  list: async (projectId?: number): Promise<Crew[]> => {
    const query = projectId ? `?project_id=${projectId}` : '';
    return apiCall<Crew[]>(`/crew${query}`);
  },

  get: async (id: number): Promise<Crew> => {
    return apiCall<Crew>(`/crew/${id}`);
  },

  create: async (crew: CrewInput): Promise<Crew> => {
    return apiCall<Crew>('/crew', {
      method: 'POST',
      body: JSON.stringify(crew),
    });
  },

  update: async (id: number, crew: Partial<CrewInput>): Promise<Crew> => {
    return apiCall<Crew>(`/crew/${id}`, {
      method: 'PUT',
      body: JSON.stringify(crew),
    });
  },

  delete: async (id: number): Promise<void> => {
    return apiCall<void>(`/crew/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================================================
// USER/CREW MEMBER ENDPOINTS (for team management)
// ============================================================================

export interface UserInput {
  email: string;
  username: string;
  full_name?: string;
  is_active?: boolean;
}

export interface User extends UserInput {
  id: number;
  created_at: string;
}

export const usersApi = {
  list: async (): Promise<User[]> => {
    return apiCall<User[]>(`/users`);
  },

  get: async (id: number): Promise<User> => {
    return apiCall<User>(`/users/${id}`);
  },

  create: async (user: UserInput): Promise<User> => {
    return apiCall<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  },

  update: async (id: number, user: Partial<UserInput>): Promise<User> => {
    return apiCall<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  },

  delete: async (id: number): Promise<void> => {
    return apiCall<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================================================
// INVOICE ENDPOINTS
// ============================================================================

export interface InvoiceInput {
  invoice_number: string;
  amount: number;
  status?: string;
  due_date?: string;
  project_id: number;
}

export interface Invoice extends InvoiceInput {
  id: number;
  created_at: string;
}

export const invoicesApi = {
  list: async (projectId?: number): Promise<Invoice[]> => {
    const query = projectId ? `?project_id=${projectId}` : '';
    return apiCall<Invoice[]>(`/invoices${query}`);
  },

  get: async (id: number): Promise<Invoice> => {
    return apiCall<Invoice>(`/invoices/${id}`);
  },

  create: async (invoice: InvoiceInput): Promise<Invoice> => {
    return apiCall<Invoice>('/invoices', {
      method: 'POST',
      body: JSON.stringify(invoice),
    });
  },

  update: async (id: number, invoice: Partial<InvoiceInput>): Promise<Invoice> => {
    return apiCall<Invoice>(`/invoices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(invoice),
    });
  },

  delete: async (id: number): Promise<void> => {
    return apiCall<void>(`/invoices/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================================================
// PHOTO/GALLERY ENDPOINTS
// ============================================================================

export interface PhotoInput {
  filename: string;
  description?: string;
  url?: string;
  project_id: number;
}

export interface Photo extends PhotoInput {
  id: number;
  created_at: string;
}

export const photosApi = {
  list: async (projectId?: number): Promise<Photo[]> => {
    const query = projectId ? `?project_id=${projectId}` : '';
    return apiCall<Photo[]>(`/photos${query}`);
  },

  get: async (id: number): Promise<Photo> => {
    return apiCall<Photo>(`/photos/${id}`);
  },

  create: async (photo: PhotoInput): Promise<Photo> => {
    return apiCall<Photo>('/photos', {
      method: 'POST',
      body: JSON.stringify(photo),
    });
  },

  update: async (id: number, photo: Partial<PhotoInput>): Promise<Photo> => {
    return apiCall<Photo>(`/photos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(photo),
    });
  },

  delete: async (id: number): Promise<void> => {
    return apiCall<void>(`/photos/${id}`, {
      method: 'DELETE',
    });
  },
};
