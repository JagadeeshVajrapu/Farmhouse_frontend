export function ContactFormSkeleton() {
  return (
    <section
      className="bg-[#FAFAF8] py-20 dark:bg-background lg:py-28"
      aria-busy="true"
      aria-label="Loading contact form"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="h-3 w-32 animate-pulse rounded-full bg-muted" />
            <div className="h-10 w-3/4 animate-pulse rounded-xl bg-muted" />
            <div className="h-10 w-1/2 animate-pulse rounded-xl bg-muted" />
            <div className="mt-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 w-48 animate-pulse rounded bg-muted" />
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card/60 p-8 lg:p-10">
            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="h-14 animate-pulse rounded-xl bg-muted" />
                <div className="h-14 animate-pulse rounded-xl bg-muted" />
              </div>
              <div className="h-14 animate-pulse rounded-xl bg-muted" />
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="h-14 animate-pulse rounded-xl bg-muted" />
                <div className="h-14 animate-pulse rounded-xl bg-muted" />
              </div>
              <div className="h-14 animate-pulse rounded-xl bg-muted" />
              <div className="h-32 animate-pulse rounded-xl bg-muted" />
              <div className="h-12 w-40 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
