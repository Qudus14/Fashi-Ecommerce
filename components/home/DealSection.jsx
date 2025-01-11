import React from 'react';
import timeBg from '@/public/img/time-bg.jpg'; // Replace with the correct path to your image

function DealSection() {
  return (
    <section
      className="bg-cover bg-center h-[540px] py-16"
      style={{ backgroundImage: `url(${timeBg.src})` }}
    >
      <div className="container mx-auto flex flex-col items-center h-full">
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
            <div className="cd-item text-center">
              <span className="text-4xl font-bold">56</span>
              <p className="text-sm">Days</p>
            </div>
            <div className="cd-item text-center">
              <span className="text-4xl font-bold">12</span>
              <p className="text-sm">Hrs</p>
            </div>
            <div className="cd-item text-center">
              <span className="text-4xl font-bold">40</span>
              <p className="text-sm">Mins</p>
            </div>
            <div className="cd-item text-center">
              <span className="text-4xl font-bold">52</span>
              <p className="text-sm">Secs</p>
            </div>
          </div>
          <a href="#" className="bg-primary text-white py-3 px-6 rounded-lg transition duration-300 hover:bg-opacity-80">
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
}

export default DealSection;