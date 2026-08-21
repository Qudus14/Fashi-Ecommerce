import InstagramIcon from "@mui/icons-material/Instagram";
import React, { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Share2 } from "lucide-react";

// ========== FIXED: Instagram Photo Grid ==========
const Ig_Photo = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const photos = [
    {
      id: 1,
      imgSrc: "/img/insta-1.jpg",
      alt: "colorlib_Collection",
      likes: 124,
      comments: 32,
    },
    {
      id: 2,
      imgSrc: "/img/insta-2.jpg",
      alt: "colorlib_Collection",
      likes: 89,
      comments: 18,
    },
    {
      id: 3,
      imgSrc: "/img/insta-3.jpg",
      alt: "colorlib_Collection",
      likes: 256,
      comments: 45,
    },
    {
      id: 4,
      imgSrc: "/img/insta-4.jpg",
      alt: "colorlib_Collection",
      likes: 67,
      comments: 12,
    },
    {
      id: 5,
      imgSrc: "/img/insta-5.jpg",
      alt: "colorlib_Collection",
      likes: 178,
      comments: 29,
    },
    {
      id: 6,
      imgSrc: "/img/insta-6.jpg",
      alt: "colorlib_Collection",
      likes: 203,
      comments: 37,
    },
  ];

  return (
    <div className="relative">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Follow Us <span className="text-customYellow">@Instagram</span>
        </h2>
        <p className="text-gray-500 text-sm">
          Shop our latest collections and get inspired
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 cursor-pointer">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative overflow-hidden aspect-square bg-gray-100 group"
            onMouseEnter={() => setHoveredId(photo.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={photo.imgSrc}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16.67vw"
              />
            </div>

            {/* Gradient Overlay */}
            <div
              className={`
              absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
              transition-opacity duration-300
              ${hoveredId === photo.id ? "opacity-100" : "opacity-0"}
            `}
            />

            {/* Hover Content */}
            <div
              className={`
              absolute inset-0 flex flex-col items-center justify-center
              transition-all duration-500 ease-in-out
              ${
                hoveredId === photo.id
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }
            `}
            >
              {/* Instagram Icon */}
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-3">
                <InstagramIcon
                  fontSize="large"
                  className="text-white transition-colors duration-300 hover:text-customYellow"
                  style={{ fontSize: 32 }}
                />
              </div>

              {/* Follow Button */}
              <button className="mt-4 bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-semibold hover:bg-customYellow hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                Follow
              </button>
            </div>

            {/* Instagram Badge - Top Right */}
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-1.5">
                <InstagramIcon
                  className="text-white"
                  style={{ fontSize: 16 }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ig_Photo;
