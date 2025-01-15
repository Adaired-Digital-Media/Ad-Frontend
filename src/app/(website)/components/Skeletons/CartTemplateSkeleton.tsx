import { Skeleton } from '@core/ui/shadcn-ui/skeleton';

export function CartTemplateSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1536px] items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
      {/* Left section skeleton */}
      <div className="@5xl:col-span-8 @6xl:col-span-7">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-12 items-start gap-4 border-b border-muted py-6 sm:flex sm:gap-6 2xl:py-8"
          >
            {/* Image skeleton */}
            <figure className="col-span-4 sm:max-w-[180px]">
              <Skeleton className="aspect-square h-20 w-20" />
            </figure>
            {/* Text skeleton */}
            <div className="col-span-8 sm:col-span-6">
              <Skeleton className="mb-2 h-5 w-96" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>

      {/* Right section skeleton (Order Summary) */}
      <div className="sticky top-24 mt-10 @container @5xl:col-span-4 @5xl:mt-0 @5xl:px-4 @6xl:col-span-3 2xl:top-28">
        <div className="rounded-lg border border-muted p-4">
          <Skeleton className="m-auto h-6 w-1/2" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="mt-5 flex items-center justify-between gap-5 border-b border-muted py-2"
            >
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          ))}
          <div className="flex items-center justify-between py-4 font-semibold">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-1/4" />
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
