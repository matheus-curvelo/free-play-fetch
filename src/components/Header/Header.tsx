import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/svg/logo.svg';
import './Header.scss';

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-slate-600 text-white shadow-lg">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="logo-area">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10 w-10" />
          </Link>
        </div>

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

        <div className="hidden lg:flex space-x-4">
          <Link to="/" className="hover:bg-slate-500 p-2 rounded">
            Home
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="focus:outline-none hover:bg-slate-500 p-2 rounded">
              Conteúdo
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg overflow-hidden">
                <Link to="/games" className="block px-4 py-2 hover:bg-gray-200">
                  Games
                </Link>
                <Link to="/expansions" className="block px-4 py-2 hover:bg-gray-200">
                  DLC
                </Link>
              </div>
            )}
          </div>
          <Link to="/about" className="hover:bg-slate-500 p-2 rounded">
            Sobre
          </Link>
          <Link to="/contact" className="hover:bg-slate-500 p-2 rounded">
            Contato
          </Link>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-slate-600 text-white">
            <Link to="/" className="block px-4 py-2 hover:bg-slate-500">
              Home
            </Link>
            <div className="bg-slate-700">
              <Link to="/games" className="block px-4 py-2 hover:bg-slate-500">
                Games
              </Link>
              <Link to="/expansions" className="block px-4 py-2 hover:bg-slate-500">
                DLC
              </Link>
            </div>
            <Link to="/about" className="block px-4 py-2 hover:bg-slate-500">
              Sobre
            </Link>
            <Link to="/contact" className="block px-4 py-2 hover:bg-slate-500">
              Contato
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
