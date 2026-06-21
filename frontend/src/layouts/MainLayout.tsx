import { Outlet } from "react-router";
import MainHeader from "../components/layout/MainHeader";
import Footer from "@/components/layout/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader/>
        <main className="flex min-h-0 flex-1 flex-col">
            <Outlet/>
        </main>
      <Footer/>
    </div>
  )
}

export default MainLayout