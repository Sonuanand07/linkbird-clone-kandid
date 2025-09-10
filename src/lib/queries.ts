import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { mockLeads, mockCampaigns } from '@/data/mockData';
import { Lead, Campaign } from '@/types';

// Simulate API delay
const simulateDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Leads queries
export const useLeads = (searchTerm: string = '', statusFilter: string = 'all') => {
  return useQuery({
    queryKey: ['leads', searchTerm, statusFilter],
    queryFn: async () => {
      await simulateDelay();
      
      let filtered = [...mockLeads];
      
      if (searchTerm) {
        filtered = filtered.filter(lead => 
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (statusFilter !== 'all') {
        filtered = filtered.filter(lead => lead.status === statusFilter);
      }
      
      return filtered;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useInfiniteLeads = (searchTerm: string = '', statusFilter: string = 'all') => {
  const pageSize = 20;
  
  return useInfiniteQuery({
    queryKey: ['leads-infinite', searchTerm, statusFilter],
    queryFn: async ({ pageParam = 0 }) => {
      await simulateDelay(200);
      
      let filtered = [...mockLeads];
      
      if (searchTerm) {
        filtered = filtered.filter(lead => 
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (statusFilter !== 'all') {
        filtered = filtered.filter(lead => lead.status === statusFilter);
      }
      
      const start = pageParam * pageSize;
      const end = start + pageSize;
      const items = filtered.slice(start, end);
      
      return {
        items,
        nextCursor: end < filtered.length ? pageParam + 1 : undefined,
        totalCount: filtered.length,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useLead = (id: string | null) => {
  return useQuery({
    queryKey: ['lead', id],
    queryFn: async () => {
      if (!id) return null;
      await simulateDelay(100);
      return mockLeads.find(lead => lead.id === id) || null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Campaigns queries
export const useCampaigns = (statusFilter: string = 'all', sortField: string = 'name', sortDirection: 'asc' | 'desc' = 'asc') => {
  return useQuery({
    queryKey: ['campaigns', statusFilter, sortField, sortDirection],
    queryFn: async () => {
      await simulateDelay();
      
      let filtered = [...mockCampaigns];
      
      if (statusFilter !== 'all') {
        filtered = filtered.filter(campaign => campaign.status === statusFilter);
      }
      
      // Sort campaigns
      filtered.sort((a, b) => {
        let aValue: any = a[sortField as keyof Campaign];
        let bValue: any = b[sortField as keyof Campaign];
        
        if (sortField === 'createdAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
      
      return filtered;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useCampaign = (id: string | null) => {
  return useQuery({
    queryKey: ['campaign', id],
    queryFn: async () => {
      if (!id) return null;
      await simulateDelay(100);
      return mockCampaigns.find(campaign => campaign.id === id) || null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

// Stats queries
export const useLeadStats = () => {
  return useQuery({
    queryKey: ['lead-stats'],
    queryFn: async () => {
      await simulateDelay(100);
      
      return {
        all: mockLeads.length,
        pending: mockLeads.filter(l => l.status === 'pending').length,
        contacted: mockLeads.filter(l => l.status === 'contacted').length,
        responded: mockLeads.filter(l => l.status === 'responded').length,
        converted: mockLeads.filter(l => l.status === 'converted').length,
      };
    },
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const useCampaignStats = () => {
  return useQuery({
    queryKey: ['campaign-stats'],
    queryFn: async () => {
      await simulateDelay(100);
      
      const totalCampaigns = mockCampaigns.length;
      const activeCampaigns = mockCampaigns.filter(c => c.status === 'active').length;
      const totalLeads = mockCampaigns.reduce((sum, c) => sum + c.totalLeads, 0);
      const successfulLeads = mockCampaigns.reduce((sum, c) => sum + c.successfulLeads, 0);
      const avgResponseRate = totalLeads > 0 ? (successfulLeads / totalLeads) * 100 : 0;
      
      return {
        totalCampaigns,
        activeCampaigns,
        totalLeads,
        successfulLeads,
        avgResponseRate: Math.round(avgResponseRate * 10) / 10,
      };
    },
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};