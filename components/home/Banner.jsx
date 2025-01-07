import React from 'react';
import Image from 'next/image';
import banner_1 from '@/public/img/banner-1.jpg';
import banner_2 from '@/public/img/banner-2.jpg';
import banner_3 from '@/public/img/banner-3.jpg';
import WomenBanner from './WomenBanner';
import MenBanner from './MenBanner';
import Ig_Photo from "./Ig_Photo";
import Blog from "./Blog";
import DealSection from './DealSection';
import Footer from '../Public/Footer';

function Banner() {
  return (
    <div className="bg-cover bg-center h-screen py-12 md:py-24 lg:py-36 banner-section">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-1/3 xl:w-1/3 p-6">
            <div className="single-banner relative overflow-hidden">
              <Image
                src={banner_1}
                alt="Men’s Banner image"
                className="w-full h-auto"
                layout="responsive"
                width={300}
                height={400}
              />
              <div className="inner-text absolute bottom-0 left-0  text-white p-4">
                <h4 className="text-lg md:text-xl lg:text-2xl">Men’s</h4>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 xl:w-1/3 p-6">
            <div className="single-banner relative overflow-hidden">
              <Image
                src={banner_2}
                alt="Women’s Banner image"
                className="w-full h-auto"
                layout="responsive"
                width={300}
                height={400}
              />
              <div className="inner-text absolute bottom-0 left-0 text-white p-4">
                <h4 className="text-lg md:text-xl lg:text-2xl">Women’s</h4>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 xl:w-1/3 p-6">
            <div className="single-banner relative overflow-hidden">
              <Image
                src={banner_3}
                alt="Kid’s Banner image"
                className="w-full h-auto"
                layout="responsive"
                width={300}
                height={400}
              />
              <div className="inner-text absolute bottom-0 left-0 text-white p-4">
                <h4 className="text-lg md:text-xl lg:text-2xl">Kid’s</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WomenBanner />
      <DealSection />
      <MenBanner />
      <Ig_Photo />
      <Blog />
      <Footer/>
    </div>
  );
}

export default Banner;