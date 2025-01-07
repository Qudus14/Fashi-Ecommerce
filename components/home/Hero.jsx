// "use client"

// import React from 'react';
// import { useEffect, useState, useRef } from 'react';
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious
// } from "@/components/ui/carousel";


// function Hero() {
//   // const [products, setProducts]= useState([]);
//   const plugin = useRef(
//     Autoplay({ delay: 2000, stopOnInteraction: true })
//   );

//   const heroData = [
//     {
//       img: 'img/hero-1.jpg',
//       title: 'Black Friday',
//       subtitle: 'Bag, kids',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
//       sale: '50%',
//     },
//     {
//       img: 'img/hero-2.jpg',
//       title: 'Black Friday',
//       subtitle: 'Bag, kids',
//       description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
//       sale: '50%',
//     },
//     // Add more hero data objects as needed
//   ];

//   return (

//     <Carousel
//     opt={{
//       loop:true,
//     }}
//       plugins={[plugin.current]}
//       className="w-full"
//       onMouseEnter={plugin.current.stop}
//       onMouseLeave={plugin.current.reset}
//     >
//       <CarouselContent>
//         {heroData.slice(0, 2).map(heroData => (
//           <CarouselItem key={heroData} className="relative">
//             <div
//               className=" p-0 m-0 relative w-full h-[500px] bg-cover bg-center object-contain"
//               style={{ backgroundImage: `url(${heroData.img})` }}
//             >
//               <div className="absolute inset-0 bg-opacity-50 flex items-center">
//                 <div className="container mx-auto px-4 pt-5">
//                   <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
//                     <div className="max-w-lg p-10">
//                       <span className="text-md font-semibold text-customYellow">{heroData.title}</span>
//                       <h1 className="text-4xl font-bold mt-2 text-black">${heroData.subtitle}</h1>
//                       <p className="mt-4 text-lg text-black">{heroData.description}</p>
//                       <a href="#" className="inline-block mt-4 px-6 py-3 bg-primary text-white font-semibold rounded">Shop Now</a>
//                     </div>
//                   </div>
//                   <div className="absolute item-center border-1 bg-red-600 text-white py-2 px-4 rounded">
//                     <h2 className="text-2xl font-bold">Sale <span className="text-3xl">${heroData.sale}</span></h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
//         <span className="text-gray-900">&lt;</span>
//       </CarouselPrevious>
//       <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
//         <span className="text-gray-900">&gt;</span>
//       </CarouselNext>
//     </Carousel>  
//     );
// };

// export default Hero;
