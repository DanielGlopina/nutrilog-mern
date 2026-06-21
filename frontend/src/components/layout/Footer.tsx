import { siteConfig } from "@/config/site.config";

function Footer() {
   const currentYear = new Date().getFullYear();

   return <footer className="border-t mt-10">
      <div className="p-2 text-center">
         {currentYear}
         {' '}
         {siteConfig.title}.
         All Rights Reserved
      </div>
   </footer>
}

export default Footer;