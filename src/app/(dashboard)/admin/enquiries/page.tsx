'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Search, Download, Eye, Mail, Trash2, ChevronLeft, ChevronRight, Inbox,
} from 'lucide-react';
import { contactApi } from '@/lib/api';
import { useAuth } from '@/features/auth/context/AuthContext';
import { LoadingSpinner } from '@/components/shared';
import { formatDate } from '@/lib/utils';
import {
  CONTACT_STATUSES,
  formatEventType,
} from '@/lib/contact-admin';
import { EnquiryViewDialog } from '@/components/admin/EnquiryViewDialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LuxuryButton } from '@/components/ui/luxury-button';
import type { ContactEnquiryFull, ContactStatus } from '@/types';

const PAGE_SIZE = 10;

export default function AdminEnquiriesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewEnquiry, setViewEnquiry] = useState<ContactEnquiryFull | null>(null);

  const isAdmin = isAuthenticated && (user?.role === 'admin' || user?.role === 'staff');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-enquiries', page, search, statusFilter],
    queryFn: async () => {
      const res = await contactApi.getAll({
        page,
        limit: PAGE_SIZE,
        search: search || undefined,
        status: statusFilter,
      });
      return res.data;
    },
    enabled: isAdmin,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactStatus }) =>
      contactApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] });
      toast.success('Status updated');
    },
    onError: () => toast.error('Failed to update status'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contactApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] });
      toast.success('Enquiry deleted');
    },
    onError: () => toast.error('Failed to delete enquiry'),
  });

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/auth/login?redirect=/admin/enquiries');
      } else if (user?.role !== 'admin' && user?.role !== 'staff') {
        router.push('/');
      }
    }
  }, [authLoading, isAuthenticated, user, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleExport = async () => {
    try {
      const res = await contactApi.exportCsv({
        search: search || undefined,
        status: statusFilter,
      });
      const blob = new Blob([res.data as BlobPart], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `customer-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('CSV exported');
    } catch {
      toast.error('Export failed');
    }
  };

  const handleReply = (enquiry: ContactEnquiryFull) => {
    const subject = encodeURIComponent(`Re: Your enquiry — Vidhaan Farm House`);
    const body = encodeURIComponent(
      `Dear ${enquiry.name},\n\nThank you for your enquiry regarding ${formatEventType(enquiry.eventType)}.\n\n`
    );
    window.open(`mailto:${enquiry.email}?subject=${subject}&body=${body}`, '_self');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete enquiry from ${name}? This cannot be undone.`)) {
      deleteMutation.mutate(id);
    }
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const enquiries = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
              <Inbox className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-light text-foreground md:text-3xl">
                Customer Enquiries
              </h1>
              <p className="text-sm text-muted-foreground">
                {total} total enquiry{total !== 1 ? 'ies' : ''}
              </p>
            </div>
          </div>
        </div>
        <LuxuryButton variant="outline" size="sm" className="gap-2" onClick={handleExport}>
          <Download className="h-4 w-4" />
          Export CSV
        </LuxuryButton>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search name, email, phone..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border-border bg-card pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            if (v) {
              setStatusFilter(v);
              setPage(1);
            }
          }}
        >
          <SelectTrigger className="w-full border-border bg-card sm:w-44">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {CONTACT_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30 text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3.5 lg:px-6">Name</th>
                <th className="px-4 py-3.5">Phone</th>
                <th className="px-4 py-3.5">Email</th>
                <th className="px-4 py-3.5">Guests</th>
                <th className="px-4 py-3.5">Preferred Date</th>
                <th className="px-4 py-3.5">Event Type</th>
                <th className="px-4 py-3.5">Submitted</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 lg:px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-muted-foreground">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : !enquiries.length ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-muted-foreground">
                    No enquiries found
                  </td>
                </tr>
              ) : (
                enquiries.map((enquiry: ContactEnquiryFull) => (
                  <tr key={enquiry._id} className="transition-colors hover:bg-muted/20">
                    <td className="px-4 py-4 font-medium text-foreground lg:px-6">
                      {enquiry.name}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{enquiry.phone}</td>
                    <td className="max-w-[160px] truncate px-4 py-4 text-muted-foreground">
                      {enquiry.email}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{enquiry.guestCount}</td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {formatDate(enquiry.preferredDate)}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {formatEventType(enquiry.eventType)}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">
                      {formatDate(enquiry.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <Select
                        value={enquiry.status}
                        onValueChange={(status) => {
                          if (status) {
                            updateMutation.mutate({
                              id: enquiry._id,
                              status: status as ContactStatus,
                            });
                          }
                        }}
                      >
                        <SelectTrigger className="h-8 w-[128px] border-border bg-background text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTACT_STATUSES.map((s) => (
                            <SelectItem key={s} value={s}>
                              <span className="flex items-center gap-2">
                                <span
                                  className={`inline-block h-2 w-2 rounded-full ${
                                    s === 'New'
                                      ? 'bg-blue-400'
                                      : s === 'Contacted'
                                        ? 'bg-amber-400'
                                        : s === 'Booked'
                                          ? 'bg-emerald-400'
                                          : 'bg-slate-400'
                                  }`}
                                />
                                {s}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-4 lg:px-6">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setViewEnquiry(enquiry)}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-gold/10 hover:text-gold"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReply(enquiry)}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-gold/10 hover:text-gold"
                          title="Reply"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(enquiry._id, enquiry.name)}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-4 lg:px-6">
            <p className="text-xs text-muted-foreground">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <LuxuryButton
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </LuxuryButton>
              <LuxuryButton
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </LuxuryButton>
            </div>
          </div>
        )}
      </div>

      <EnquiryViewDialog
        enquiry={viewEnquiry}
        open={!!viewEnquiry}
        onClose={() => setViewEnquiry(null)}
      />
    </div>
  );
}
