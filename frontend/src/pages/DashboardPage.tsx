import { Suspense } from 'react';
import { useSearchParams } from 'react-router';
import { format } from 'date-fns';
import SelectDateForm from '@/components/forms/SelectDateForm';
import { Breadcrumbs } from '@/components/ui/breadcrumb';
import DashboardCardWrapper from '@/components/dashboard/DashboardCardWrapper';
import DashboardCardSkeleton from '@/components/dashboard/DashboardCardSkeleton';

function DashboardPage() {
   const [searchParams] = useSearchParams();
//    const navigate = useNavigate();

//    if (!userId) {
//       navigate('/');   AUTH QUERY
//    }

   const rawDate = searchParams.get('date');
   let validDate = new Date();
   const today = format(new Date(), 'yyyy-MM-dd');

   if (typeof rawDate === 'string') {
      const parsedDate = new Date(rawDate);
      if (!isNaN(parsedDate.getTime())) {
         validDate = parsedDate;
      }
   }
   const formatedDate = format(validDate, 'yyyy-MM-dd');


   return <div>
      <div className="flex justify-center mt-5">
         <Breadcrumbs items={
            [
               { label: 'Home Page', href: '/' },
               { label: 'Dashboard' },
            ]
         } />
      </div>

      <div className="w-[98%] lg:w-[85%] mx-auto flex flex-col gap-5 lg:flex-row lg:justify-between">
         <div>
            <h2 className="text-3xl font-semibold">Daily Nutrients for {' '}
               <span className="font-thin">
                  {formatedDate === today ? 'Today' : formatedDate}
               </span>
            </h2>
            <p className="text-zinc-500 mt-2">Select other date to view details</p>
         </div>
         <SelectDateForm path='/dashboard' />
      </div>

      <Suspense fallback={<DashboardCardSkeleton />}>
         <DashboardCardWrapper formatedDate={formatedDate ?? today} />
      </Suspense>

   </div >;
}

export default DashboardPage;