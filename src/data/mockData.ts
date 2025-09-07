import { Lead, Campaign } from '@/types';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q4 Enterprise Outreach',
    status: 'active',
    totalLeads: 150,
    successfulLeads: 45,
    responseRate: 30,
    createdAt: '2024-01-15',
    description: 'Targeting enterprise clients for Q4 sales push',
    budget: 25000
  },
  {
    id: '2',
    name: 'SaaS Startup Campaign',
    status: 'active',
    totalLeads: 89,
    successfulLeads: 32,
    responseRate: 36,
    createdAt: '2024-02-01',
    description: 'Focusing on early-stage SaaS companies',
    budget: 15000
  },
  {
    id: '3',
    name: 'Holiday Special Promo',
    status: 'completed',
    totalLeads: 200,
    successfulLeads: 85,
    responseRate: 42,
    createdAt: '2023-11-01',
    description: 'Holiday season promotional campaign',
    budget: 30000
  },
  {
    id: '4',
    name: 'Tech Conference Follow-up',
    status: 'paused',
    totalLeads: 67,
    successfulLeads: 12,
    responseRate: 18,
    createdAt: '2024-03-10',
    description: 'Following up with tech conference attendees',
    budget: 8000
  },
  {
    id: '5',
    name: 'Mid-Market Expansion',
    status: 'draft',
    totalLeads: 0,
    successfulLeads: 0,
    responseRate: 0,
    createdAt: '2024-03-20',
    description: 'Expanding into mid-market segment',
    budget: 20000
  }
];

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    company: 'TechCorp Industries',
    campaignId: '1',
    campaignName: 'Q4 Enterprise Outreach',
    status: 'converted',
    lastContactDate: '2024-03-18',
    createdAt: '2024-01-20',
    phone: '+1 (555) 123-4567',
    notes: 'Very interested in enterprise solution. Scheduled demo for next week.',
    value: 45000
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mike.chen@startupxyz.io',
    company: 'StartupXYZ',
    campaignId: '2',
    campaignName: 'SaaS Startup Campaign',
    status: 'responded',
    lastContactDate: '2024-03-17',
    createdAt: '2024-02-05',
    phone: '+1 (555) 234-5678',
    notes: 'Interested but needs to discuss with team. Follow up in 1 week.',
    value: 12000
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@innovateplus.com',
    company: 'InnovatePlus',
    campaignId: '1',
    campaignName: 'Q4 Enterprise Outreach',
    status: 'contacted',
    lastContactDate: '2024-03-16',
    createdAt: '2024-01-25',
    phone: '+1 (555) 345-6789',
    notes: 'Initial contact made. Waiting for response.',
    value: 28000
  },
  {
    id: '4',
    name: 'David Park',
    email: 'david.park@futuretech.com',
    company: 'FutureTech Solutions',
    campaignId: '2',
    campaignName: 'SaaS Startup Campaign',
    status: 'pending',
    lastContactDate: '2024-03-15',
    createdAt: '2024-02-10',
    phone: '+1 (555) 456-7890',
    notes: 'High-priority lead. VP of Engineering at growing startup.',
    value: 18000
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@globalcorp.com',
    company: 'GlobalCorp',
    campaignId: '3',
    campaignName: 'Holiday Special Promo',
    status: 'converted',
    lastContactDate: '2023-12-15',
    createdAt: '2023-11-05',
    phone: '+1 (555) 567-8901',
    notes: 'Converted during holiday campaign. Very satisfied customer.',
    value: 35000
  },
  {
    id: '6',
    name: 'Robert Kim',
    email: 'robert.kim@techstart.io',
    company: 'TechStart',
    campaignId: '4',
    campaignName: 'Tech Conference Follow-up',
    status: 'contacted',
    lastContactDate: '2024-03-14',
    createdAt: '2024-03-12',
    phone: '+1 (555) 678-9012',
    notes: 'Met at tech conference. Interested in our platform.',
    value: 15000
  },
  {
    id: '7',
    name: 'Jennifer Walsh',
    email: 'jen.walsh@creativeco.com',
    company: 'CreativeCo',
    campaignId: '1',
    campaignName: 'Q4 Enterprise Outreach',
    status: 'responded',
    lastContactDate: '2024-03-13',
    createdAt: '2024-01-30',
    phone: '+1 (555) 789-0123',
    notes: 'Creative agency looking for lead management solution.',
    value: 22000
  },
  {
    id: '8',
    name: 'Alex Morgan',
    email: 'alex@nextgentech.com',
    company: 'NextGen Technologies',
    campaignId: '2',
    campaignName: 'SaaS Startup Campaign',
    status: 'pending',
    lastContactDate: '2024-03-12',
    createdAt: '2024-02-15',
    phone: '+1 (555) 890-1234',
    notes: 'CTO at promising AI startup. High potential value.',
    value: 40000
  }
];