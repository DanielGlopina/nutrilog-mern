import { Link } from "react-router";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button"; 
import { List } from "lucide-react"
import { siteConfig } from "../../config/site.config"; 

function NavbarMenuSheet() {
   return <Sheet>
      <SheetTrigger asChild >
         <Button asChild className="hover:cursor-pointer">
            <List size={45} />
         </Button>
      </SheetTrigger>
      <SheetContent side="left">
         <SheetHeader>
            <SheetTitle className="text-xl">Menu</SheetTitle>
         </SheetHeader>
         <nav>
            <ul>
               {siteConfig.navItems.map((item) => (
                  <li key={item.href} className="py-3">
                     <SheetClose asChild className="hover:font-semibold">
                        <Link to={item.href} className="text-[18px] pl-[16px]">{item.label}</Link>
                     </SheetClose>
                     <span className="w-[70%] h-px bg-zinc-400 flex mx-auto" />
                  </li>
               ))}
            </ul>
         </nav>
      </SheetContent>
   </Sheet>;
}

export default NavbarMenuSheet;

