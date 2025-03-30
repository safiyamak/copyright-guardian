import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Book,
  Eye,
  Music,
  LayoutDashboard,
  MenuIcon,
  Users,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Art Theft Detection",
    path: "/art-theft-detection",
    icon: Eye,
  },
  {
    name: "Music Similarity",
    path: "/music-similarity",
    icon: Music,
  },
];

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const location = useLocation();

  return (
    <div
      className={cn(
        "flex flex-col fixed inset-y-0 left-0 z-40 lg:relative transition-all duration-300 ease-in-out bg-sidebar shadow-lg",
        isOpen ? "w-64" : "w-0 lg:w-20 overflow-hidden"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <div
          className={cn("flex items-center", !isOpen && "lg:justify-center")}
        >
          <Book className="h-8 w-8 text-sidebar-foreground" />
          <span
            className={cn(
              "ml-2 text-xl font-semibold text-sidebar-foreground",
              !isOpen && "lg:hidden"
            )}
          >
            Copyright Guardian
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-sidebar-foreground hover:text-sidebar-accent-foreground"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "group flex items-center px-2 py-3 text-base font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                  !isOpen && "lg:justify-center lg:px-3"
                )}
              >
                <item.icon
                  className={cn("h-6 w-6 flex-shrink-0", !isOpen && "lg:mr-0")}
                />
                <span className={cn("ml-3", !isOpen && "lg:hidden")}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center p-4 border-t border-sidebar-border">
        <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
          <span className="text-sidebar-accent-foreground font-semibold">
            CG
          </span>
        </div>
        <div className={cn("ml-3", !isOpen && "lg:hidden")}>
          <p className="text-sm font-medium text-sidebar-foreground">
            Hackathon Project
          </p>
          <p className="text-xs text-sidebar-foreground opacity-75">
            Copyright Guardian
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
