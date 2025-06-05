import React from 'react';
import logo from '../../../../assets/logo.png';

function Navbar(){

    return(
    <header>
      <img src={logo} alt="Logo" style={{ height: '50px' }} />
      <nav>
        <a href="#" className="active">Home</a>
        <a href="#">About</a>
        <a href="#">Gallery</a>
        <a href="#">Education</a>
      </nav>
      <button className="btn-primary">Become a member</button>
    </header>
    );
}

export default Navbar;