/**
 * Crew Store - Zustand
 * Connected to FastAPI backend at localhost:8000
 * Uses /crew endpoint for crew members tied to projects
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { crewApi, Crew, CrewInput, ApiError } from '@/lib/api';

interface CrewStore {
  crew: Crew[];
  currentMember: Crew | null;
  isLoading: boolean;
  error?: string;
  filters: {
    role?: string;
    searchTerm?: string;
  };

  // Actions
  fetchCrew: (projectId?: number) => Promise<void>;
  fetchCrewMemberById: (id: number) => Promise<void>;
  createCrewMember: (member: CrewInput) => Promise<void>;
  updateCrewMember: (id: number, member: Partial<CrewInput>) => Promise<void>;
  deleteCrewMember: (id: number) => Promise<void>;
  setCrew: (crew: Crew[]) => void;
  setCurrentMember: (member: Crew | null) => void;
  setFilters: (filters: Partial<CrewStore['filters']>) => void;
  clearFilters: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error?: string) => void;
}

export const useCrewStore = create<CrewStore>()(
  devtools(
    (set, get) => ({
      crew: [],
      currentMember: null,
      isLoading: false,
      error: undefined,
      filters: {},

      fetchCrew: async (projectId?: number) => {
        set({ isLoading: true, error: undefined });
        try {
          const crew = await crewApi.list(projectId);
          set({ crew, isLoading: false });
        } catch (error) {
          const message = error instanceof ApiError ? error.message : 'Failed to fetch crew';
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      fetchCrewMemberById: async (id: number) => {
        set({ isLoading: true, error: undefined });
        try {
          const currentMember = await crewApi.get(id);
          set({ currentMember, isLoading: false });
        } catch (error) {
          const message = error instanceof ApiError ? error.message : 'Failed to fetch crew member';
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      createCrewMember: async (member) => {
        set({ isLoading: true, error: undefined });
        try {
          const newMember = await crewApi.create(member);
          const { crew } = get();
          set({ crew: [...crew, newMember], isLoading: false });
        } catch (error) {
          const message = error instanceof ApiError ? error.message : 'Failed to create crew member';
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      updateCrewMember: async (id: number, updates: Partial<CrewInput>) => {
        set({ isLoading: true, error: undefined });
        try {
          const updated = await crewApi.update(id, updates);
          const { crew, currentMember } = get();
          const newCrew = crew.map((m) => (m.id === id ? updated : m));
          set({
            crew: newCrew,
            currentMember: currentMember?.id === id ? updated : currentMember,
            isLoading: false,
          });
        } catch (error) {
          const message = error instanceof ApiError ? error.message : 'Failed to update crew member';
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      deleteCrewMember: async (id: number) => {
        set({ isLoading: true, error: undefined });
        try {
          await crewApi.delete(id);
          const { crew } = get();
          set({
            crew: crew.filter((m) => m.id !== id),
            currentMember: null,
            isLoading: false,
          });
        } catch (error) {
          const message = error instanceof ApiError ? error.message : 'Failed to delete crew member';
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      setCrew: (crew) => set({ crew }),
      setCurrentMember: (member) => set({ currentMember: member }),
      setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
      clearFilters: () => set({ filters: {} }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
    }),
    { name: 'CrewStore' }
  )
);
