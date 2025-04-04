import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#010103] w-full">
      <div className="max-w-[1200px] flex justify-between items-center mx-auto px-8 py-6 max-sm:py-4">
        <div className="text-white text-2xl font-bold relative group">
          <span className="inline-block transition-transform duration-300 group-hover:scale-110">
            Copyright Guardian
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
        </div>

        <div className="flex items-center gap-16">
          <nav className="flex items-center gap-16 max-md:hidden">
            <a
              href="#"
              className="text-white text-lg hover:text-gray-300 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white text-lg hover:text-gray-300 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              About Us
            </a>
            <a
              href="#dashboard"
              className="text-white text-lg hover:text-gray-300 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              Dashboard
            </a>
          </nav>

          <Button
            variant="ghost"
            className="hidden max-md:flex text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="ti ti-menu-2 text-2xl" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#010103] px-6 py-4 border-t border-gray-800">
          <nav className="flex flex-col gap-4">
            <a
              href="#"
              className="text-white text-xl hover:text-gray-300 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white text-xl hover:text-gray-300 transition-colors"
            >
              About Us
            </a>
            <a
              href="dashboard"
              className="text-white text-xl hover:text-gray-300 transition-colors"
            >
              Dashboard
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
