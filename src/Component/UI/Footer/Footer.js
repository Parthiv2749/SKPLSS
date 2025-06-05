
import React from 'react';
// import logo from '../../../../assets/';


function Footer(){

    return(
    <>
      <footer>
        <div>
          <h4>Get in Touch</h4>
          <p>📧 info@example.org<br />📞 +1 234 567 8900</p>
        </div>
        <div>
          <h4>Useful links</h4>
          <p>Home<br />About Us<br />Education<br />Contact Us</p>
        </div>
        <div className="newsletter">
          <h4>Subscribe to our newsletter</h4>
          <input type="email" placeholder="Email" />
          <div>
            <input type="checkbox" id="agree" />
            <label htmlFor="agree">I agree to receive newsletters</label>
          </div>
          <button>Subscribe</button>
        </div>
      </footer>
      <div style={{ textAlign: 'center', padding: '1rem', fontSize: '0.9rem' }}>
        © 2025 Your LMS | All rights reserved
      </div>
    </>
    );
}

export default Footer;