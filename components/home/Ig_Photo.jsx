import InstagramIcon from "@mui/icons-material/Instagram";
import React from "react";

const Ig_Photo = () => {
  const photos = [
    { id: 1, imgSrc: "img/insta-1.jpg", alt: "colorlib_Collection" },
    { id: 2, imgSrc: "img/insta-2.jpg", alt: "colorlib_Collection" },
    { id: 3, imgSrc: "img/insta-3.jpg", alt: "colorlib_Collection" },
    { id: 4, imgSrc: "img/insta-4.jpg", alt: "colorlib_Collection" },
    { id: 5, imgSrc: "img/insta-5.jpg", alt: "colorlib_Collection" },
    { id: 6, imgSrc: "img/insta-6.jpg", alt: "colorlib_Collection" },
  ];

  return (
    <div className="md:px-9 px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 cursor-pointer">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="relative bg-cover bg-center h-64 sm:h-64 lg:h-80 group hover:bg-slate-900"
          style={{ backgroundImage: `url(${photo.imgSrc})` }}
        >
          <div className="absolute inset-0 top-1/4 flex items-center justify-center bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
            <div className="text-white text-center flex flex-col items-center">
              <InstagramIcon
                fontSize="large"
                className="transition-colors duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ig_Photo;
