import { Outlet } from "react-router";
import MainHeader from "../components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import { toast, Toaster } from "sonner";
import { ErrorBoundary } from "react-error-boundary";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <MainHeader />

      {/* ВОЗВРАЩАЕМ pb-10 сюда. Это создаст пустое пространство внизу для футера */}
      <main className="flex min-h-0 flex-1 flex-col pb-12">
        <ErrorBoundary
          onError={() =>
            toast.error(`Unexpected error occured!`, {
              description: "Please, try again later",
            })
          }
          fallbackRender={() => <Outlet />}
        >
          <Outlet />
        </ErrorBoundary>
      </main>

      <Toaster richColors closeButton />
      <Footer />
    </div>
  );
};

export default MainLayout;
