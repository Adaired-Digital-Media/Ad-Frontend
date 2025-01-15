import { Skeleton } from '@core/ui/shadcn-ui/skeleton';

export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-12 items-start gap-4 border-b border-muted py-6 first:pt-0 sm:flex sm:gap-6 2xl:py-8">
      <figure className="col-span-4 sm:max-w-[180px]">
        {/* Skeleton for the image */}
        <Skeleton className="rounded-ful aspect-square h-12 w-full rounded-lg bg-black" />
      </figure>
      <div className="col-span-8 sm:col-span-6">
        {/* Skeleton for the product title */}
        <Skeleton className="rounded-ful aspect-square h-12 w-full rounded-lg bg-black" />
        {/* Optional additional placeholders (e.g., description) */}
        <Skeleton className="rounded-ful aspect-square h-12 w-full rounded-lg bg-black" />
      </div>
    </div>
  );
}
