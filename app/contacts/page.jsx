"use client"

import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import Footer from '@/components/public/Footer'
import { Button } from '@/components/ui/button'


const contacts = () => {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-5/12 px-4 mb-8 lg:mb-0">
              <div className="mb-8">
                <h4 className="text-2xl font-bold mb-4">Contact Us</h4>
                <p className="text-gray-600">
                  Contrary to popular belief, Lorem Ipsum is simply random text. It has roots in a piece of
                  classical Latin literature from 45 BC, making it over 2000 years old.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold block">Address:</span>
                    <p className="text-gray-600">60-49 Road 11378 New York</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold block">Phone:</span>
                    <p className="text-gray-600">+65 11.188.888</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold block">Email:</span>
                    <p className="text-gray-600">hellocolorlib@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12 lg:offset-lg-1 px-4">
              <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold mb-4">Leave A Comment</h4>
                <p className="text-gray-600 mb-6">Our staff will call back later and answer your questions.</p>
                <form className="space-y-4">
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <textarea
                    placeholder="Your message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                  <Button
                    type="submit"
                    className="px-6 py-2 bg-customYellow text-white rounded-md hover:bg-customYellow/50 transition duration-300"
                  >
                    Send message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default contacts