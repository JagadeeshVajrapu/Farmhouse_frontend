import type { Metadata } from 'next';
import Image from 'next/image';
import { UtensilsCrossed, Sparkles, Trees, Wine } from 'lucide-react';
import { EXPERIENCES } from '@/lib/constants';
import { pickImage } from '@/lib/media/registry';
import { SectionHeading } from '@/components/ui/section-heading';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { bookNowWhatsAppUrl, ENQUIRY_HREF } from '@/lib/cta';

export const metadata: Metadata = {
  title: 'Experiences',
  description: 'Discover curated luxury experiences at Vidhaan Farm House — from private dining to wellness retreats.',
};

const iconMap = {
  UtensilsCrossed,
  Sparkles,
  Trees,
  Wine,
};

export default function ExperiencesPage() {
  return (
    <>
      <section className="relative flex h-[50vh] min-h-[350px] items-end">
        <Image
          src={pickImage('food')}
          alt="Fine dining experience at Vidhaan Farm House"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="gradient-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-8">
          <h1 className="font-heading text-5xl font-light text-white md:text-6xl">Experiences</h1>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            subtitle="Curated for You"
            title="Unforgettable Moments"
            description="Beyond accommodation, we craft bespoke experiences that transform your stay into a journey of discovery."
          />

          <div className="mt-16 space-y-24">
            {EXPERIENCES.map((exp, index) => {
              const Icon = iconMap[exp.icon as keyof typeof iconMap];
              const isEven = index % 2 === 0;
              return (
                <div
                  key={exp.slug}
                  id={exp.slug}
                  className={`scroll-mt-32 grid items-center gap-12 lg:grid-cols-2 ${
                    !isEven ? 'lg:[direction:rtl]' : ''
                  }`}
                >
                  <div
                    className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${!isEven ? 'lg:[direction:ltr]' : ''}`}
                  >
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className={!isEven ? 'lg:[direction:ltr]' : ''}>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                    <h2 className="font-heading text-3xl font-light text-foreground">{exp.title}</h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{exp.description}</p>
                    <p className="mt-4 text-sm text-gold">
                      Available for all guests · Advance booking recommended
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <LuxuryButton href={bookNowWhatsAppUrl()} external size="sm">
                        Book on WhatsApp
                      </LuxuryButton>
                      <LuxuryButton href={ENQUIRY_HREF} variant="outline" size="sm">
                        Send Enquiry
                      </LuxuryButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
