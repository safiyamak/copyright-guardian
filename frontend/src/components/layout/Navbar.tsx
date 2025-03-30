import { Bell, MenuIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <header className="z-10 py-4 px-6 bg-background border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="p-1 mr-4 text-foreground rounded-full hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-brand-500 hidden lg:block"
            onClick={toggleSidebar}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-brand-500 ring-2 ring-background"></span>
          </Button>
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-500 to-brand-400"></div>
            <div className="absolute inset-0.5 rounded-full bg-white flex items-center justify-center">
              <span className="text-sm font-semibold text-brand-500">CG</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
