/**
 * Projects Store - Zustand
 * Connected to FastAPI backend at localhost:8000
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { projectsApi, Project, ProjectInput, ApiError } from '@/lib/api';

interface ProjectsStore {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error?: string;
  filters: {
    status?: string;
    searchTerm?: string;
  };

  // Actions
  fetchProjects: () => Promise<void>;
  fetchProjectById: (id: number) => Promise<void>;
  createProject: (project: ProjectInput) => Promise<void>;
  updateProject: (id: number, project: Partial<ProjectInput>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
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
          const projects = await projectsApi.list();
          set({ projects, isLoading: false });
        } catch (error) {
          const message = error instanceof ApiError ? error.message : 'Failed to fetch projects';
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      fetchProjectById: async (id: number) => {
        set({ isLoading: true, error: undefined });
        try {
          const currentProject = await projectsApi.get(id);
          set({ currentProject, isLoading: false });
        } catch (error) {
          const message = error instanceof ApiError ? error.message : 'Failed to fetch project';
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      createProject: async (project) => {
        set({ isLoading: true, error: undefined });
        try {
          const newProject = await projectsApi.create(project);
          const { projects } = get();
          set({ projects: [...projects, newProject], isLoading: false });
        } catch (error) {
          const message = error instanceof ApiError ? error.message : 'Failed to create project';
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      updateProject: async (id: number, updates: Partial<ProjectInput>) => {
        set({ isLoading: true, error: undefined });
        try {
          const updated = await projectsApi.update(id, updates);
          const { projects, currentProject } = get();
          const newProjects = projects.map((p) => (p.id === id ? updated : p));
          set({
            projects: newProjects,
            currentProject: currentProject?.id === id ? updated : currentProject,
            isLoading: false,
          });
        } catch (error) {
          const message = error instanceof ApiError ? error.message : 'Failed to update project';
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      deleteProject: async (id: number) => {
        set({ isLoading: true, error: undefined });
        try {
          await projectsApi.delete(id);
          const { projects } = get();
          set({
            projects: projects.filter((p) => p.id !== id),
            currentProject: null,
            isLoading: false,
          });
        } catch (error) {
          const message = error instanceof ApiError ? error.message : 'Failed to delete project';
          set({
            error: message,
            isLoading: false,
          });
          throw error;
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
