import { Skeleton } from "@core/ui/shadcn-ui/skeleton";

export function CartTemplateSkeleton() {
  return (
    // <div className="mx-auto w-full max-w-[1536px] items-start @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
    //   {/* Left section skeleton */}
    //   <div className="@5xl:col-span-8 @6xl:col-span-7">
    //     {Array.from({ length: 3 }).map((_, index) => (
    //       <div
    //         key={index}
    //         className="grid grid-cols-12 items-start gap-4 border-b border-muted py-6 sm:flex sm:gap-6 2xl:py-8"
    //       >
    //         {/* Image skeleton */}
    //         <figure className="col-span-4 sm:max-w-[180px]">
    //           <Skeleton className="aspect-square w-full rounded-lg bg-gray-100" />
    //         </figure>
    //         {/* Text skeleton */}
    //         <div className="col-span-8 sm:col-span-6">
    //           <Skeleton className="h-5 w-3/4 mb-2" />
    //           <Skeleton className="h-4 w-1/2" />
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Right section skeleton (Order Summary) */}
    //   <div className="sticky top-24 mt-10 @container @5xl:col-span-4 @5xl:mt-0 @5xl:px-4 @6xl:col-span-3 2xl:top-28">
    //     <div className="border border-muted rounded-lg p-4">
    //       <Skeleton className="h-6 w-1/2 mb-4" />
    //       {Array.from({ length: 3 }).map((_, index) => (
    //         <div
    //           key={index}
    //           className="flex items-center justify-between py-2 border-b border-muted"
    //         >
    //           <Skeleton className="h-4 w-3/4" />
    //           <Skeleton className="h-4 w-1/4" />
    //         </div>
    //       ))}
    //       <div className="flex items-center justify-between py-4 font-semibold">
    //         <Skeleton className="h-5 w-1/2" />
    //         <Skeleton className="h-5 w-1/4" />
    //       </div>
    //       <Skeleton className="h-10 w-full rounded-md" />
    //     </div>
    //   </div>
    // </div>
    <h1>loading...</h1>
  );
}
