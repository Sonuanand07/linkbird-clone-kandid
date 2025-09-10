import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLead } from '@/lib/queries';
import { Mail, Phone, Building, Calendar, DollarSign, FileText, MessageSquare } from 'lucide-react';

interface LeadDetailSheetProps {
  leadId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailSheet: React.FC<LeadDetailSheetProps> = ({ leadId, isOpen, onClose }) => {
  const { data: lead, isLoading, error } = useLead(leadId);

  if (error) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg">
          <div className="flex items-center justify-center h-full">
            <p className="text-destructive">Error loading lead details</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (isLoading) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!lead) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'converted':
        return 'bg-success/10 text-success border-success/20';
      case 'responded':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'contacted':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>{lead.name}</span>
            <Badge className={getStatusColor(lead.status)}>
              {lead.status}
            </Badge>
          </SheetTitle>
          <SheetDescription>
            Lead details and interaction history
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{lead.email}</p>
                  <p className="text-sm text-muted-foreground">Email</p>
                </div>
              </div>
              
              {lead.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{lead.phone}</p>
                    <p className="text-sm text-muted-foreground">Phone</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Building className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{lead.company}</p>
                  <p className="text-sm text-muted-foreground">Company</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Campaign Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">{lead.campaignName}</p>
                <p className="text-sm text-muted-foreground">Associated Campaign</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{formatDate(lead.lastContactDate)}</p>
                  <p className="text-sm text-muted-foreground">Last Contact</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{formatDate(lead.createdAt)}</p>
                  <p className="text-sm text-muted-foreground">Lead Created</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lead Value */}
          {lead.value && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Lead Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-success">
                  {formatCurrency(lead.value)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estimated deal value
                </p>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {lead.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{lead.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Contact Lead
            </Button>
            <Button variant="outline" className="flex-1">
              Update Status
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LeadDetailSheet;