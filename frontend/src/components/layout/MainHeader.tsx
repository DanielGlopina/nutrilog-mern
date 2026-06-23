import { Link } from "react-router"
import NavbarMenuSheet from "./NavbarMenuSheet"
// import UserDropdown from './UserDropdown';
import { UtensilsCrossed } from "lucide-react"

const MainHeader = () => {
  return (
    <header className="bg-primary flex items-center h-20 px-4">
        <NavbarMenuSheet />

        <Link to="/" className="flex align-middle gap-1 text-lime-400 text-xl ml-5">
            <UtensilsCrossed className="w-8"/>
            Nutrilog
        </Link>

        <div className=" flex flex-end gap-7 ml-auto">
           {/* <UserDropdown/>  USER IS LOGGED IN*/} 
          <Link to={'/auth/?mode=login'}>
            Login
          </Link>

          <Link to={'/auth/?mode=signup'}>
            Sign Up
          </Link>
        </div>
    </header>
  )
}

export default MainHeader