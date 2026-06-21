import { Card, CardContent} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardCardSkeleton() {
   return <Card className='w-[98%] lg:w-[85%] mx-auto mt-10'>
      <Skeleton className="w-75 h-6 bg-zinc-300 ml-[1%] lg:ml-[5.5%]" />

      <CardContent className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 place-items-center gap-y-4">
         {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} className="w-[170px] h-48 bg-zinc-100 border flex justify-center align-middle">
               <Skeleton className="w-20 h-4 bg-zinc-300 mx-auto" />
               <Skeleton className="w-24 h-25 flex justify-center align-middle bg-zinc-300 rounded-full mx-auto">
                  <div className="w-21 h-21 bg-zinc-100 rounded-full m-auto" />
               </Skeleton>
               <Skeleton className="w-20 h-4 bg-zinc-300 mx-auto" />
            </Card>

         ))}
      </CardContent>
      <Skeleton className="w-65 h-4 bg-zinc-300  mx-auto " />
   </Card>;
}

export default DashboardCardSkeleton;

