/**
 * TypeScript Interfaces for Master OS Roofing Management
 */

// User & Authentication
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'admin' | 'manager' | 'crew';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
}

// Roofing Projects
export interface RoofingProject {
  id: string;
  name: string;
  description?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
  };
  clientId: string;
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  status: 'quoted' | 'approved' | 'in-progress' | 'completed' | 'cancelled';
  startDate?: Date;
  completionDate?: Date;
  estimatedCompletionDate?: Date;
  squareFootage: number;
  roofType: 'asphalt-shingle' | 'metal' | 'tile' | 'slate' | 'flat' | 'other';
  contractAmount: number;
  materials: ProjectMaterial[];
  crew: CrewMember[];
  photos: ProjectPhoto[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMaterial {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
  supplier?: string;
  notes?: string;
}

export interface ProjectPhoto {
  id: string;
  url: string;
  caption?: string;
  stage: 'before' | 'during' | 'after' | 'detail';
  uploadedAt: Date;
  uploadedBy: string;
}

// Quotes
export interface Quote {
  id: string;
  projectId?: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  squareFootage: number;
  roofType: string;
  laborCost: number;
  materialsCost: number;
  tax: number;
  discount?: number;
  totalAmount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  validUntil?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

// Crew Management
export interface CrewMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: 'crew' | 'supervisor' | 'apprentice';
  expertise: string[];
  certifications?: Certification[];
  status: 'active' | 'inactive' | 'on-leave';
  projects?: string[];
  availabilityStatus?: 'available' | 'on-job' | 'on-leave';
  createdAt: Date;
  updatedAt: Date;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  expiryDate?: Date;
  certificateNumber?: string;
}

// Gallery & Media
export interface GalleryProject {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  roofType: string;
  location: string;
  images: GalleryImage[];
  featured: boolean;
  createdAt: Date;
}

export interface GalleryImage {
  id: string;
  url: string;
  thumbnail?: string;
  caption?: string;
  stage: 'before' | 'during' | 'after';
}

// Invoicing
export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  issueDate: Date;
  dueDate: Date;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  discount?: number;
  total: number;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Settings
export interface CompanySettings {
  companyName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  logo?: string;
  taxId?: string;
  licenseNumber?: string;
}

export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    projectUpdates: boolean;
    crewAssignments: boolean;
    invoiceReminders: boolean;
  };
  preferences: Record<string, any>;
}

// Dashboard
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalRevenue: number;
  pendingInvoices: number;
  activeCrewMembers: number;
}

export interface ProjectStats {
  projectId: string;
  status: string;
  progressPercentage: number;
  scheduledDays: number;
  completedDays: number;
  remainingDays: number;
}
