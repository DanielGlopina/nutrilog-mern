import { siteConfig } from "@/config/site.config";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 w-full z-50 border-t border-white/30 bg-white/50 backdrop-blur-sm">
      <div className="p-2 text-center text-sm font-medium text-gray-700">
        {currentYear} {siteConfig.title}. All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
