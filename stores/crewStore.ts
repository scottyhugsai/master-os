/**
 * Crew Store - Zustand
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CrewMember } from '@/types';

interface CrewStore {
  crew: CrewMember[];
  currentMember: CrewMember | null;
  isLoading: boolean;
  error?: string;
  filters: {
    status?: string;
    expertise?: string[];
    searchTerm?: string;
  };

  // Actions
  fetchCrew: () => Promise<void>;
  fetchCrewMemberById: (id: string) => Promise<void>;
  createCrewMember: (member: Omit<CrewMember, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCrewMember: (id: string, member: Partial<CrewMember>) => Promise<void>;
  deleteCrewMember: (id: string) => Promise<void>;
  setCrew: (crew: CrewMember[]) => void;
  setCurrentMember: (member: CrewMember | null) => void;
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

      fetchCrew: async () => {
        set({ isLoading: true, error: undefined });
        try {
          // TODO: Call API endpoint
          // const response = await fetch('/api/crew');
          // const crew = await response.json();
          set({ crew: [], isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch crew',
            isLoading: false,
          });
        }
      },

      fetchCrewMemberById: async (id: string) => {
        set({ isLoading: true, error: undefined });
        try {
          // TODO: Call API endpoint
          // const response = await fetch(`/api/crew/${id}`);
          // const member = await response.json();
          set({ currentMember: null, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch crew member',
            isLoading: false,
          });
        }
      },

      createCrewMember: async (member) => {
        set({ isLoading: true, error: undefined });
        try {
          // TODO: Call API endpoint
          // const response = await fetch('/api/crew', {
          //   method: 'POST',
          //   body: JSON.stringify(member),
          // });
          // const newMember = await response.json();
          const { crew } = get();
          set({ crew, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to create crew member',
            isLoading: false,
          });
        }
      },

      updateCrewMember: async (id: string, updates: Partial<CrewMember>) => {
        set({ isLoading: true, error: undefined });
        try {
          // TODO: Call API endpoint
          // const response = await fetch(`/api/crew/${id}`, {
          //   method: 'PATCH',
          //   body: JSON.stringify(updates),
          // });
          const { crew, currentMember } = get();
          const updated = crew.map((m) => (m.id === id ? { ...m, ...updates } : m));
          set({
            crew: updated,
            currentMember: currentMember?.id === id ? { ...currentMember, ...updates } : currentMember,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to update crew member',
            isLoading: false,
          });
        }
      },

      deleteCrewMember: async (id: string) => {
        set({ isLoading: true, error: undefined });
        try {
          // TODO: Call API endpoint
          // await fetch(`/api/crew/${id}`, { method: 'DELETE' });
          const { crew } = get();
          set({
            crew: crew.filter((m) => m.id !== id),
            currentMember: null,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to delete crew member',
            isLoading: false,
          });
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
