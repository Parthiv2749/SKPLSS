import React from 'react';
import logo from '../../../assets/logo.png';

function Navbar(){

    return(
        <header className="bg-[#FDF8F3] border-b border-[#E1D5C9] p-4 md:p-8 flex flex-wrap justify-between items-center flex flex-col md:flex-row items-start md:items-center">
        <img src={logo} alt="Logo" className="h-[50px]" />
        <nav className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="font-semibold text-[#f48f0f]">Home</a>
            <a href="#" className="font-semibold text-[#292929]">About</a>
            <a href="#" className="font-semibold text-[#292929]">Gallery</a>
            <a href="#" className="font-semibold text-[#292929]">Education</a>
        </nav>
        <button className="bg-[#F48F0F] text-[#292929] py-2 px-4 rounded-full font-semibold">Become a member</button>
        </header>

    );
}

export default Navbar;