import React from 'react';
import Image from 'next/image';
import banner_1 from '@/public/img/banner-1.jpg';
import banner_2 from '@/public/img/banner-2.jpg';
import banner_3 from '@/public/img/banner-3.jpg';
import Blog from './Blog';
import DealSection from './DealSection';
import MenBanner from './MenBanner';
import WomenBanner from './WomenBanner';
import Ig_Photo from './Ig_Photo';

function Banner() {
  return (
    <div className="banner-section py-12">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/3 p-2">
            <div className="relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
              <Image
                src={banner_1}
                alt="Men’s Banner"
                className="w-full h-auto"
                layout="responsive"
                width={300}
                height={400}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 ">
                <h4 className="text-lg md:text-xl lg:text-2xl relative bg-gray-400 bg-opacity-50 p-4">
                  Men’s
                </h4>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 p-2">
            <div className="relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
              <Image
                src={banner_2}
                alt="Women’s Banner"
                className="w-full h-auto"
                layout="responsive"
                width={300}
                height={400}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 ">
                <h4 className="text-lg md:text-xl lg:text-2xl relative bg-gray-400 bg-opacity-50 p-4">
                  Women’s
                  </h4>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 p-2">
            <div className="relative overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">
              <Image
                src={banner_3}
                alt="Kid’s Banner"
                className="w-full h-auto"
                layout="responsive"
                width={300}
                height={400}
              />
              <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 ">
                <h4 className="text-lg md:text-xl lg:text-2xl relative bg-gray-400 bg-opacity-50 p-4">
                  Kid’s
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WomenBanner/>
      <DealSection/>
      <MenBanner/>
      {/* <Ig_Photo/> */}
      <Blog/>
    </div>
  );
}

export default Banner;