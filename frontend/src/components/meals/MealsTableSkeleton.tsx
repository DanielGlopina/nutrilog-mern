
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function MealsTablesSkeleton() {
   return <>
      {Array.from({ length: 4 }).map((_, index) => (
         <Card key={index} className="w-[90%] lg:w-[80%] h-61 px-[1%] grid grid-rows-4 grid-cols-8 bg-zinc-100 mx-auto border mt-5">
            {Array.from({ length: 8 }).map((_, index) => (
               <Skeleton key={index} className={cn(index === 0 && "bg-zinc-300")} />
            ))}
            {Array.from({ length: 8 }).map((_, index) => (<Skeleton key={index} className=" bg-zinc-300" />))}
            {Array.from({ length: 8 }).map((_, index) => (<Skeleton key={index} className=" bg-zinc-300" />))}
            {Array.from({ length: 8 }).map((_, index) => (
               <Skeleton key={index} className={cn(index === 3 && "bg-zinc-300 col-span-2")} />
            ))}
         </Card>
      ))}
   </>;
}

export default MealsTablesSkeleton;
