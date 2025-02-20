"use client";

import React from 'react';
import timeBg from '@/public/img/time-bg.jpg'; 
import { useRouter } from 'next/navigation';
import Deal from '../ui/countdown-timer';

function DealSection() {
  const router = useRouter();
  
  return (
    <section
      className="container px-2 mx-auto bg-cover bg-center h-[540px] py-16"
      style={{ backgroundImage: `url(${timeBg.src})` }}
    >
      <div className="container flex flex-col items-center h-full">
        <div className="max-w-lg text-center">
          <div className="section-title mb-8">
            <h2 className="text-3xl font-bold mb-4">Deal Of The Week</h2>
            <p className="mb-8 text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
              <br /> do ipsum dolor sit amet, consectetur adipisicing elit
            </p>
            <div className="product-price text-4xl font-bold text-primary mb-8">
              $35.00 <span className="text-xl font-normal text-gray-700">/ HandBag</span>
            </div>
          </div>
          <div className="countdown-timer flex justify-center space-x-4 mb-8" id="countdown">
            <Deal/>
          </div>
          <div className="bg-customYellow hover:bg-customYellow/90 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 hover:bg-opacity-80 cursor-pointer" onClick={() => router.push(`/search?q=${encodeURIComponent("HandBag")}`)}>
            Shop Now
          </div>
        </div>
      </div>
    </section>
  );
}

export default DealSection;