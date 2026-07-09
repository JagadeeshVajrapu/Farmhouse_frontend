export const EVENT_TYPE_LABELS: Record<string, string> = {
  'weekend-stay': 'Weekend Stay',
  'pool-party': 'Pool Party',
  birthday: 'Birthday Celebration',
  wedding: 'Wedding / Pre-Wedding',
  corporate: 'Corporate Retreat',
  family: 'Family Gathering',
  other: 'Other Event',
};

export const CONTACT_STATUSES = ['New', 'Contacted', 'Booked', 'Closed'] as const;

export const CONTACT_STATUS_COLORS: Record<string, string> = {
  New: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Contacted: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Booked: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Closed: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

export function formatEventType(slug: string): string {
  return EVENT_TYPE_LABELS[slug] || slug;
}
