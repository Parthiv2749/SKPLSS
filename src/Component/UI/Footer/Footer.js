
import React from 'react';
// import logo from '../../../assets/';


function Footer(){

    return(
    <>
      <footer className="border-t border-[#E1D5C9] px-[5vw] py-10 flex flex-col md:flex-row justify-between gap-10">
        <div>
          <h4 className="text-lg font-semibold mb-2">Get in Touch</h4>
          <p className="text-sm">
            📧 info@example.org<br />📞 +1 234 567 8900
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Useful links</h4>
          <p className="text-sm">Home<br />About Us<br />Education<br />Contact Us</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h4>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
          />
          <div className="flex items-center mb-2">
            <input type="checkbox" id="agree" className="mr-2" />
            <label htmlFor="agree" className="text-sm">I agree to receive newsletters</label>
          </div>
          <button className="bg-[#F48F0F] text-[#292929] py-2 px-5 rounded-full text-sm font-semibold">
            Subscribe
          </button>
        </div>
      </footer>


    </>
    );
}

export default Footer;