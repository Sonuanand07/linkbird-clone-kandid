import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableSkeleton, CardSkeleton } from '@/components/Skeletons/TableSkeleton';
import { useCampaigns, useCampaignStats } from '@/lib/queries';
import { useAppStore } from '@/stores/appStore';
import { Campaign } from '@/types';
import { Plus, ArrowUpDown, ArrowUp, ArrowDown, Play, Pause, Edit, Trash2, Filter } from 'lucide-react';

const CampaignsUpgraded = () => {
  const {
    campaignsStatusFilter,
    setCampaignsStatusFilter,
    campaignsSortField,
    setCampaignsSortField,
    campaignsSortDirection,
    setCampaignsSortDirection,
  } = useAppStore();

  const { 
    data: campaigns, 
    isLoading, 
    error 
  } = useCampaigns(campaignsStatusFilter, campaignsSortField, campaignsSortDirection);

  const { data: stats, isLoading: isLoadingStats } = useCampaignStats();

  const handleSort = (field: string) => {
    if (campaignsSortField === field) {
      setCampaignsSortDirection(campaignsSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setCampaignsSortField(field);
      setCampaignsSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (campaignsSortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
    }
    return campaignsSortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-foreground" />
      : <ArrowDown className="h-4 w-4 text-foreground" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'paused':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'draft':
        return 'bg-secondary text-secondary-foreground';
      case 'completed':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getActionButton = (campaign: Campaign) => {
    switch (campaign.status) {
      case 'active':
        return (
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            <Pause className="h-3 w-3" />
          </Button>
        );
      case 'paused':
        return (
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            <Play className="h-3 w-3" />
          </Button>
        );
      default:
        return (
          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
            <Edit className="h-3 w-3" />
          </Button>
        );
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-destructive">Error loading campaigns: {error.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your outreach campaigns and track performance
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {isLoadingStats ? (
          Array.from({ length: 4 }, (_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{stats?.totalCampaigns || 0}</div>
                <p className="text-xs text-muted-foreground">Total Campaigns</p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-success">{stats?.activeCampaigns || 0}</div>
                <p className="text-xs text-muted-foreground">Active Campaigns</p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">{stats?.totalLeads || 0}</div>
                <p className="text-xs text-muted-foreground">Total Leads</p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-warning">{stats?.avgResponseRate || 0}%</div>
                <p className="text-xs text-muted-foreground">Avg Response Rate</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Campaigns Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Campaigns</CardTitle>
              <CardDescription>
                {campaigns?.length || 0} campaigns found
              </CardDescription>
            </div>
            <Select value={campaignsStatusFilter} onValueChange={setCampaignsStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <TableSkeleton rows={8} columns={7} />
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Campaign Name</span>
                        <SortIcon field="name" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Status</span>
                        <SortIcon field="status" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort('totalLeads')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Total Leads</span>
                        <SortIcon field="totalLeads" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort('successfulLeads')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Successful</span>
                        <SortIcon field="successfulLeads" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort('responseRate')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Response Rate</span>
                        <SortIcon field="responseRate" />
                      </div>
                    </TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Created</span>
                        <SortIcon field="createdAt" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns?.map((campaign) => (
                    <TableRow key={campaign.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{campaign.totalLeads}</TableCell>
                      <TableCell className="text-success font-medium">{campaign.successfulLeads}</TableCell>
                      <TableCell className="font-medium">{campaign.responseRate}%</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 min-w-[120px]">
                          <Progress 
                            value={campaign.responseRate} 
                            className="flex-1" 
                          />
                          <span className="text-xs text-muted-foreground">
                            {campaign.responseRate}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(campaign.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {getActionButton(campaign)}
                          <Button variant="outline" size="sm" className="w-8 h-8 p-0 text-destructive hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )) || []}
                  {campaigns?.length === 0 && !isLoading && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No campaigns found matching your filter criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignsUpgraded;