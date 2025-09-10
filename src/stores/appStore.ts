import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Sidebar state
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;

  // UI state
  selectedLeadId: string | null;
  setSelectedLeadId: (id: string | null) => void;
  isLeadDetailOpen: boolean;
  setIsLeadDetailOpen: (open: boolean) => void;

  // Filters and search
  leadsSearchTerm: string;
  setLeadsSearchTerm: (term: string) => void;
  leadsStatusFilter: string;
  setLeadsStatusFilter: (status: string) => void;
  
  campaignsStatusFilter: string;
  setCampaignsStatusFilter: (status: string) => void;
  campaignsSortField: string;
  setCampaignsSortField: (field: string) => void;
  campaignsSortDirection: 'asc' | 'desc';
  setCampaignsSortDirection: (direction: 'asc' | 'desc') => void;

  // Reset functions
  resetLeadsFilters: () => void;
  resetCampaignsFilters: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Sidebar state
      sidebarCollapsed: false,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),

      // UI state
      selectedLeadId: null,
      setSelectedLeadId: (id) => set({ selectedLeadId: id }),
      isLeadDetailOpen: false,
      setIsLeadDetailOpen: (open) => set({ isLeadDetailOpen: open }),

      // Filters and search
      leadsSearchTerm: '',
      setLeadsSearchTerm: (term) => set({ leadsSearchTerm: term }),
      leadsStatusFilter: 'all',
      setLeadsStatusFilter: (status) => set({ leadsStatusFilter: status }),
      
      campaignsStatusFilter: 'all',
      setCampaignsStatusFilter: (status) => set({ campaignsStatusFilter: status }),
      campaignsSortField: 'name',
      setCampaignsSortField: (field) => set({ campaignsSortField: field }),
      campaignsSortDirection: 'asc',
      setCampaignsSortDirection: (direction) => set({ campaignsSortDirection: direction }),

      // Reset functions
      resetLeadsFilters: () => set({ 
        leadsSearchTerm: '', 
        leadsStatusFilter: 'all' 
      }),
      resetCampaignsFilters: () => set({ 
        campaignsStatusFilter: 'all',
        campaignsSortField: 'name',
        campaignsSortDirection: 'asc'
      }),
    }),
    {
      name: 'linkbird-app-store',
      partialize: (state) => ({ 
        sidebarCollapsed: state.sidebarCollapsed,
        leadsStatusFilter: state.leadsStatusFilter,
        campaignsStatusFilter: state.campaignsStatusFilter,
      }),
    }
  )
);