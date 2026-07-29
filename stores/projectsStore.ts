/**
 * Projects Store - Zustand
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { RoofingProject } from '@/types';

interface ProjectsStore {
  projects: RoofingProject[];
  currentProject: RoofingProject | null;
  isLoading: boolean;
  error?: string;
  filters: {
    status?: string;
    searchTerm?: string;
  };

  // Actions
  fetchProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
  createProject: (project: Omit<RoofingProject, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (id: string, project: Partial<RoofingProject>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setProjects: (projects: RoofingProject[]) => void;
  setCurrentProject: (project: RoofingProject | null) => void;
  setFilters: (filters: Partial<ProjectsStore['filters']>) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error?: string) => void;
}

export const useProjectsStore = create<ProjectsStore>()(
  devtools(
    (set, get) => ({
      projects: [],
      currentProject: null,
      isLoading: false,
      error: undefined,
      filters: {},

      fetchProjects: async () => {
        set({ isLoading: true, error: undefined });
        try {
          // TODO: Call API endpoint
          // const response = await fetch('/api/projects');
          // const projects = await response.json();
          set({ projects: [], isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch projects',
            isLoading: false,
          });
        }
      },

      fetchProjectById: async (id: string) => {
        set({ isLoading: true, error: undefined });
        try {
          // TODO: Call API endpoint
          // const response = await fetch(`/api/projects/${id}`);
          // const project = await response.json();
          set({ currentProject: null, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch project',
            isLoading: false,
          });
        }
      },

      createProject: async (project) => {
        set({ isLoading: true, error: undefined });
        try {
          // TODO: Call API endpoint
          // const response = await fetch('/api/projects', {
          //   method: 'POST',
          //   body: JSON.stringify(project),
          // });
          // const newProject = await response.json();
          const { projects } = get();
          set({ projects, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to create project',
            isLoading: false,
          });
        }
      },

      updateProject: async (id: string, updates: Partial<RoofingProject>) => {
        set({ isLoading: true, error: undefined });
        try {
          // TODO: Call API endpoint
          // const response = await fetch(`/api/projects/${id}`, {
          //   method: 'PATCH',
          //   body: JSON.stringify(updates),
          // });
          const { projects, currentProject } = get();
          const updated = projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
          set({
            projects: updated,
            currentProject:
              currentProject?.id === id ? { ...currentProject, ...updates } : currentProject,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to update project',
            isLoading: false,
          });
        }
      },

      deleteProject: async (id: string) => {
        set({ isLoading: true, error: undefined });
        try {
          // TODO: Call API endpoint
          // await fetch(`/api/projects/${id}`, { method: 'DELETE' });
          const { projects } = get();
          set({
            projects: projects.filter((p) => p.id !== id),
            currentProject: null,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to delete project',
            isLoading: false,
          });
        }
      },

      setProjects: (projects) => set({ projects }),
      setCurrentProject: (project) => set({ currentProject: project }),
      setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
      clearFilters: () => set({ filters: {} }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    { name: 'ProjectsStore' }
  )
);
