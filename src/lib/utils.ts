import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, differenceInDays } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'dd MMM yyyy');
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  return Math.max(differenceInDays(checkOut, checkIn), 1);
}

export function calculateTotal(pricePerNight: number, checkIn: Date, checkOut: Date): number {
  return pricePerNight * calculateNights(checkIn, checkOut);
}
