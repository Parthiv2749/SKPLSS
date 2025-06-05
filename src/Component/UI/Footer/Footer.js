
import React from 'react';
// import logo from '../../../assets/';


function Footer(){

    return(
    <>
        <footer className="flex flex-wrap justify-around border-t border-[#E1D5C9] bg-[#FDF8F3] p-8">
        <div className="min-w-[200px] mb-4">
            <h4 className="font-semibold mb-2">Get in Touch</h4>
            <p>📧 info@example.org<br />📞 +1 234 567 8900</p>
        </div>
        <div className="min-w-[200px] mb-4">
            <h4 className="font-semibold mb-2">Useful links</h4>
            <p>Home<br />About Us<br />Education<br />Contact Us</p>
        </div>
        <div className="min-w-[200px] mb-4">
            <h4 className="font-semibold mb-2">Subscribe to our newsletter</h4>
            <input type="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded mb-2" />
            <div className="flex items-center gap-2">
            <input type="checkbox" id="agree" />
            <label htmlFor="agree">I agree to receive newsletters</label>
            </div>
            <button className="bg-[#F48F0F] text-[#292929] py-2 px-4 rounded-lg font-semibold mt-2">Subscribe</button>
        </div>
        </footer>
        <div className="text-center py-4 text-sm">
        © 2025 Your LMS | All rights reserved
        </div>

    </>
    );
}

export default Footer;