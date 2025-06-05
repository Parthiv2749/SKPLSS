import React from 'react';
import banner from '../../../assets/banner.png';

export default function Banner() {
  return       <img
        src={banner}
        alt="Web Banner"
        className="w-full rounded-2xl my-6 px-[5vw] object-cover"
      />;
}