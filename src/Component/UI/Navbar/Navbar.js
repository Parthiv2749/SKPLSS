import React from 'react';
import logo from '../../../assets/logo.png';

function Navbar(){

    return(
        <header className="bg-[#FDF8F3] border-b border-[#E1D5C9] px-4 py-2 md:px-8 md:py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <img src={logo} alt="Logo" className="h-12" />
        <nav className="flex flex-col md:flex-row gap-2 md:gap-4">
            <a href="#" className="font-semibold text-[#f48f0f]">Home</a>
            <a href="#" className="font-semibold text-[#292929]">About</a>
            <a href="#" className="font-semibold text-[#292929]">Gallery</a>
            <a href="#" className="font-semibold text-[#292929]">Education</a>
        </nav>
        <button className="bg-[#F48F0F] text-[#292929] py-2 px-4 rounded-full font-semibold w-full md:w-auto">Become a member</button>
        </header>
    );
}

export default Navbar;