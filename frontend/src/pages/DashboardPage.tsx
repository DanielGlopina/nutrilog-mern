import { Suspense } from "react";
import { useSearchParams } from "react-router";
import { format } from "date-fns";
import SelectDateForm from "@/components/forms/SelectDateForm";
import { Breadcrumbs } from "@/components/ui/breadcrumb";
import DashboardCardWrapper from "@/components/dashboard/DashboardCardWrapper";
import DashboardCardSkeleton from "@/components/dashboard/DashboardCardSkeleton";
import { getDateFromSearchParams } from "@/lib/dates";
import { useAuthStore } from "@/store/useAuthStore";

function DashboardPage() {
  const [searchParams] = useSearchParams();
  const { isChecking } = useAuthStore();
  const formatedDate = getDateFromSearchParams(searchParams.get("date"));
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <div>
      <div className="flex justify-center mt-5">
        <Breadcrumbs
          items={[{ label: "Home Page", href: "/" }, { label: "Dashboard" }]}
        />
      </div>

      <div className="w-[98%] lg:w-[85%] mx-auto flex flex-col gap-5 lg:flex-row lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold">
            Daily Nutrients for{" "}
            <span className="font-thin">
              {formatedDate === today ? "Today" : formatedDate}
            </span>
          </h2>
          <p className="text-zinc-500 mt-2">
            Select other date to view details
          </p>
        </div>
        <SelectDateForm path="/dashboard" />
      </div>

      <Suspense fallback={<DashboardCardSkeleton />}>
        {isChecking ? (
          <DashboardCardSkeleton />
        ) : (
          <DashboardCardWrapper formatedDate={formatedDate} />
        )}
      </Suspense>
    </div>
  );
}

export default DashboardPage;
