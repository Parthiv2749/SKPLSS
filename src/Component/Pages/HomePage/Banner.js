import React from 'react';
import banner from '../../../../assets/banner.png';

export default function Banner() {
  return <img className="banner" src={banner} alt="Web Banner" style={{ width: '100%', borderRadius: '20px' }} />;
}