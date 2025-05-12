
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Settings, Plus } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export const MainLayout = ({ children, showNav = true }: MainLayoutProps) => {
  const location = useLocation();
  
  const navigationItems = [
    { icon: Home, path: "/", label: "Dashboard" },
    { icon: Plus, path: "/visit", label: "New Visit" },
    { icon: Settings, path: "/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {showNav && (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg md:shadow-none md:relative md:w-16 md:h-screen md:border-r border-border z-10">
          <div className="flex md:flex-col justify-around md:justify-start items-center h-full py-6 gap-8">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-white bg-syntera-purple"
                      : "text-gray-500 hover:text-syntera-purple hover:bg-syntera-purple-light/30"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="sr-only">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  );
};

export default MainLayout;
