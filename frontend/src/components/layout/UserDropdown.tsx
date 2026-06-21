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

export default function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-3 text-zinc-200 cursor-pointer">
            <img src="//www.gravatar.com/avatar/160d34368ccada79187317c203d57be2?s=200&r=pg&d=mm" alt="User Avatar" className="rounded-full h-9"/>
            <span className="mt-1 hidden sm:block">glopinadaniel@gmail.com</span>
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
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
