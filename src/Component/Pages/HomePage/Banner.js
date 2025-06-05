import React from 'react';
import banner from '../../../assets/banner.png';

export default function Banner() {
  return <img src={banner} alt="Banner" className="w-full rounded-xl my-4 object-cover" />;
}