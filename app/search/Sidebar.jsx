import Link from 'next/link'
import React from 'react'

function SidebarPage() {
  return (
   
    <div className="w-full lg:w-1/4 px-4 order-2 lg:order-1">
      {/* Categories */}
      <h4 className="text-lg font-semibold mb-4">Categories</h4>
                <ul className="space-y-2">
                  {['Men', 'Women', 'Kids'].map((category) => (
                    <li key={category}>
                      <Link href="#" className="text-gray-600 hover:text-gray-800">
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>

          
              {/* Brand */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Brand</h4>
                <div className="space-y-2">
                  {['Calvin Klein', 'Diesel', 'Polo', 'Tommy Hilfiger'].map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input type="checkbox" id={`brand-${brand}`} className="mr-2" />
                      <label htmlFor={`brand-${brand}`} className="text-gray-600">{brand}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Price</h4>
                <div className="flex items-center space-x-4">
                  <input type="text" placeholder="Min" className="w-20 p-2 border rounded" />
                  <input type="text" placeholder="Max" className="w-20 p-2 border rounded" />
                </div>
                <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                  Filter
                </button>
              </div>

              {/* Color */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {['black', 'violet', 'blue', 'yellow', 'red', 'green'].map((color) => (
                    <div key={color} className="flex items-center">
                      <input type="radio" id={`color-${color}`} name="color" className="hidden" />
                      <label
                        htmlFor={`color-${color}`}
                        className={`w-6 h-6 rounded-full cursor-pointer border-2 border-gray-300 ${color}`}
                      ></label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Size</h4>
                <div className="flex space-x-2">
                  {['xs', 's', 'm', 'l', 'xl'].map((size) => (
                    <div key={size} className="flex items-center justify-center">
                      <input type="radio" id={`size-${size}`} name="size" className="hidden" />
                      <label
                        htmlFor={`size-${size}`}
                        className="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer text-sm uppercase"
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['Towel', 'Shoes', 'Coat', 'Dresses', 'Trousers', "Men's hats", 'Backpack'].map((tag) => (
                    <Link
                      key={tag}
                      href="#"
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>      
  )
}

export default SidebarPage
