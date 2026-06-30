import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Leaf } from "lucide-react";

const HomePage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    // 1. Убрали bg-white, overflow-hidden и relative. Они здесь больше не нужны.
    <div className="flex-1 flex items-center justify-center">
      {/* 2. МАГИЯ ЗДЕСЬ: Меняем absolute на fixed и добавляем -z-10. 
          Теперь картинка приклеена к экрану и всегда будет на весь размер окна, 
          игнорируя любые отступы (padding) родительских компонентов! 
      */}
      <img
        alt="Cover Image"
        src="/cover.webp"
        className="fixed inset-0 w-full h-full object-cover opacity-50 -z-10"
      />

      {/* 3. Оставляем relative, чтобы контент был поверх картинки */}
      <div className="relative text-center flex flex-col gap-4">
        <h1 className="text-5xl font-bold flex gap-1 items-center justify-center">
          <Leaf className="text-lime-500" size={60} /> NutriLog
        </h1>
        <p className="text-2xl">Track your nutrition with ease</p>

        {isAuthenticated ? (
          <div>
            <Button asChild size="lg">
              <Link to="/dashboard">Go To Your Dashboard</Link>
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 items-center justify-center">
            <Button asChild size="lg" className="bg-lime-600 hover:bg-lime-500">
              <Link to={"/auth/?mode=login"}>Log In</Link>
            </Button>
            <Button asChild size="lg">
              <Link to={"/auth/?mode=signup"}>Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
