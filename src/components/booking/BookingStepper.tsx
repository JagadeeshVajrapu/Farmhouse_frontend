'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BOOKING_STEPS } from '@/lib/booking-schema';

interface BookingStepperProps {
  currentStep: number;
  className?: string;
}

export function BookingStepper({ currentStep, className }: BookingStepperProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Desktop stepper */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between">
          {BOOKING_STEPS.map((step, index) => {
            const isComplete = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div key={step.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      borderColor: isComplete || isActive ? 'rgba(201,169,98,0.6)' : 'rgba(255,255,255,0.1)',
                      backgroundColor: isComplete
                        ? 'rgba(201,169,98,0.2)'
                        : isActive
                          ? 'rgba(201,169,98,0.1)'
                          : 'transparent',
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors"
                  >
                    {isComplete ? (
                      <Check className="h-4 w-4 text-gold" />
                    ) : (
                      <span
                        className={cn(
                          'text-xs font-medium',
                          isActive ? 'text-gold' : 'text-muted-foreground'
                        )}
                      >
                        {index + 1}
                      </span>
                    )}
                  </motion.div>
                  <p
                    className={cn(
                      'mt-2 text-center text-[10px] uppercase tracking-wider',
                      isActive ? 'text-gold' : isComplete ? 'text-foreground/70' : 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </p>
                </div>
                {index < BOOKING_STEPS.length - 1 && (
                  <div
                    className={cn(
                      'mx-2 h-0.5 flex-1 transition-colors duration-500',
                      index < currentStep ? 'bg-gold/50' : 'bg-border'
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile progress */}
      <div className="lg:hidden">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="uppercase tracking-wider text-gold">
            Step {currentStep + 1} of {BOOKING_STEPS.length}
          </span>
          <span className="text-muted-foreground">{BOOKING_STEPS[currentStep]?.label}</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full bg-gold"
            animate={{ width: `${((currentStep + 1) / BOOKING_STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {BOOKING_STEPS[currentStep]?.description}
        </p>
      </div>
    </div>
  );
}
