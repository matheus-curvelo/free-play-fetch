import React, { useState, useEffect, useRef } from "react";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Função para fechar o dropdown ao clicar fora
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup ao desmontar
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-slate-600 text-white shadow-lg">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden focus:outline-none hover:bg-slate-500 p-2 rounded">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Links - Hidden on Mobile */}
        <div className="hidden lg:flex space-x-4">
          <a href="#" className="hover:bg-slate-500 p-2 rounded">
            Home
          </a>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="focus:outline-none hover:bg-slate-500 p-2 rounded">
              Conteúdo
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  Games
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                  DLC
                </a>
              </div>
            )}
          </div>
          <a href="#" className="hover:bg-slate-500 p-2 rounded">
            Sobre
          </a>
          <a href="#" className="hover:bg-slate-500 p-2 rounded">
            Contato
          </a>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-slate-600 text-white">
            <a href="#" className="block px-4 py-2 hover:bg-slate-500">
              Home
            </a>
            <div className="bg-slate-700">
              <a href="#" className="block px-4 py-2 hover:bg-slate-500">
                Games
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-slate-500">
                DLC
              </a>
            </div>
            <a href="#" className="block px-4 py-2 hover:bg-slate-500">
              Sobre
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-slate-500">
              Contato
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
