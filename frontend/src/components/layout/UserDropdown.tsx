import {
  LogOutIcon,
  NotebookPen,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router"
import { useAuthStore } from "@/store/useAuthStore"

export default function UserDropdown() {
  const {user, setLogout} = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-3 text-zinc-200 cursor-pointer">
            <img src={user?.avatar} alt="User Avatar" className="rounded-full h-9"/>
            <span className="mt-1 hidden sm:block">{user?.email}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
         <DropdownMenuLabel>My Account</DropdownMenuLabel>
         <DropdownMenuSeparator />
         <DropdownMenuItem>
          <NotebookPen/>
          <Link to="dashboard/nutritions">
          Edit Nutritions
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={setLogout}>
              <LogOutIcon />
              Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
