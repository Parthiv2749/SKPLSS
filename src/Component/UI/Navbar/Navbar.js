import React, { useState } from 'react';
import logo from '../../../assets/logo.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#FDF8F3] border-b border-[#E1D5C9] p-4 font-sans">
      <div className="flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-[8vw] max-h-20 min-h-[4rem] transition-all duration-300"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="ml-auto md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-3xl font-bold text-[#292929]"
          >
            ☰
          </button>
        </div>

        {/* Nav Links */}
        <nav
          className={`w-full md:flex md:flex-1 md:justify-center md:items-center ${
            isMenuOpen ? 'flex flex-col items-center mt-4' : 'hidden'
          } md:flex-row md:mt-0 md:gap-6 text-[clamp(0.95rem,2vw,1.1rem)] font-medium tracking-wide`}
        >
          <a href="#" className="text-[#f48f0f] px-2 hover:underline underline-offset-4">
            Home
          </a>
          <a href="#" className="text-[#292929] px-2 hover:underline underline-offset-4">
            About
          </a>
          <a href="#" className="text-[#292929] px-2 hover:underline underline-offset-4">
            Gallery
          </a>
          <a href="#" className="text-[#292929] px-2 hover:underline underline-offset-4">
            Education
          </a>
        </nav>

        {/* Button */}
        <div className="hidden md:block md:ml-auto">
          <button className="bg-[#F48F0F] text-[#292929] px-5 py-2 rounded-full font-semibold text-[clamp(1rem,2vw,1.05rem)] uppercase tracking-wider shadow hover:brightness-110 transition-all duration-200">
            Become a member
          </button>
        </div>

        {/* Mobile Button */}
        {isMenuOpen && (
          <div className="w-full flex justify-center mt-4 md:hidden">
            <button className="bg-[#F48F0F] text-[#292929] px-5 py-2 rounded-full font-semibold text-[clamp(0.9rem,2vw,1rem)] uppercase tracking-wide shadow hover:brightness-110 transition-all duration-200">
              Become a member
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
