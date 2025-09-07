import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, Target, TrendingUp, DollarSign } from 'lucide-react';
import { mockCampaigns, mockLeads } from '@/data/mockData';

const Dashboard = () => {
  const totalLeads = mockLeads.length;
  const convertedLeads = mockLeads.filter(lead => lead.status === 'converted').length;
  const activeCampaigns = mockCampaigns.filter(campaign => campaign.status === 'active').length;
  const totalRevenue = mockLeads
    .filter(lead => lead.status === 'converted')
    .reduce((sum, lead) => sum + (lead.value || 0), 0);

  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  const stats = [
    {
      title: 'Total Leads',
      value: totalLeads.toString(),
      change: '+12%',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Active Campaigns',
      value: activeCampaigns.toString(),
      change: '+3%',
      icon: Target,
      color: 'text-success'
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      change: '+5%',
      icon: TrendingUp,
      color: 'text-warning'
    },
    {
      title: 'Revenue',
      value: `$${(totalRevenue / 1000).toFixed(0)}k`,
      change: '+18%',
      icon: DollarSign,
      color: 'text-success'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your lead generation and campaign performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>
              Latest leads from your campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLeads.slice(0, 5).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'converted' ? 'bg-success/10 text-success' :
                      lead.status === 'responded' ? 'bg-primary/10 text-primary' :
                      lead.status === 'contacted' ? 'bg-warning/10 text-warning' :
                      'bg-secondary text-secondary-foreground'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Progress of your active campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCampaigns
                .filter(campaign => campaign.status === 'active')
                .map((campaign) => (
                <div key={campaign.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{campaign.name}</p>
                    <span className="text-sm text-muted-foreground">
                      {campaign.responseRate}%
                    </span>
                  </div>
                  <Progress value={campaign.responseRate} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {campaign.successfulLeads} of {campaign.totalLeads} leads converted
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;