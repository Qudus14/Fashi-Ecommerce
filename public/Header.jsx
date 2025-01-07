"use client";
import React from 'react';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import PersonIcon from '@mui/icons-material/Person';
import Header_2 from '../components/Public/Header_2';
import Navbar from './Navbar';

function Header() {
  return (
    <header className="header_section font-sans text-sm">
      <div className="header-top bg-white py-0">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="ht-left flex items-center">
            <div className="mail-service flex items-center ml-4">
              <i className="fa fa-envelope text-gray-600 mr-2 "><MailOutlinedIcon fontSize="small"className='group-hover:animate-bounce' /></i>
              <span className="text-gray-700">hello.colorlib@gmail.com</span>
            </div>
            <div className="phone-service flex items-center ml-6">
              <i className="fa fa-phone text-gray-600 mr-2"><PhoneIcon fontSize="small" className='group-hover:animate-bounce'/></i>
              <span className="text-gray-700">+65 11.188.888</span>
            </div>
          </div>
          <div className="ht-right flex items-center ml-auto space-x-6">
            <div className="additional-numbers hidden md:flex space-x-4 cursor-pointer">
              <span className="text-blue-700"> <FacebookRoundedIcon fontSize="small" className='group-hover:animate-bounce'/></span>
              <span className="text-gray-700"> <XIcon fontSize="small"/></span>
              <span className="text-blue-700"><LinkedInIcon fontSize="small"/></span>
              <span className="text-red-600"><PinterestIcon fontSize="small"/></span>
            </div>
<div className=" border-r border-gray-300 h-14 mx-4"></div>
            {/* Language Selector */}
            <div className="lan-selector hidden md:block">
              <select
                className="language_drop p-1"
                name="countries"
                id="countries"
              >
                <option
                  value="yt"
                  data-image="/img/flag-1.jpg"
                  data-imagecss="flag yt"
                  data-title="English"
                >
                  English
                </option>
                <option
                  value="yu"
                  data-image="/img/flag-2.jpg"
                  data-imagecss="flag yu"
                  data-title="German"
                >
                  German
                </option>
              </select>
            </div>
<div className="border-r border-gray-300 h-14 mx-4"></div>
            {/* Login Container */}
            <div className="login-container md:flex flex items-center">
              <a href="#" className="flex items-center text-gray-700 px-4 py-0 hover:text-gray-900">
                <i className="fa fa-user"><PersonIcon fontSize="small"/></i>
                <span className="ml-2">Login</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Header_2 />
      <Navbar />
    </header>
  );
}

export default Header;
