export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  campaignId: string;
  campaignName: string;
  status: 'pending' | 'contacted' | 'responded' | 'converted';
  lastContactDate: string;
  createdAt: string;
  phone?: string;
  notes?: string;
  value?: number;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  totalLeads: number;
  successfulLeads: number;
  responseRate: number;
  createdAt: string;
  description?: string;
  budget?: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}