import { Link } from "react-router";
import NavbarMenuSheet from "./NavbarMenuSheet";
import UserDropdown from "./UserDropdown";
import { Leaf } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "../ui/button";

const MainHeader = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="bg-primary flex items-center h-20 px-4">
      <NavbarMenuSheet />

      <Link
        to="/"
        className="flex align-middle gap-1 text-lime-400 text-xl ml-5"
      >
        <Leaf className="w-8" />
        <span className="text-white font-bold">NutriLog</span>
      </Link>

      <div className=" flex flex-end gap-7 ml-auto">
        {isAuthenticated ? (
          <UserDropdown />
        ) : (
          <div className="flex align-middle justify-center gap-3">
            <Button
              asChild
              className="bg-lime-400 text-primary hover:text-lime-400 border-lime-400"
            >
              <Link to={"/auth/?mode=login"}>Login</Link>
            </Button>

            <Button asChild className="border-lime-400 text-lime-400">
              <Link to={"/auth/?mode=signup"}>Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
