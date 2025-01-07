import React from 'react';

const Blog = () => {
    const blogs = [
        {
            id: 1,
            imgSrc: 'img/latest-1.jpg',
            date: 'May 4, 2019',
            comments: 5,
            title: 'The Best Street Style From London Fashion Week',
            description: 'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat',
        },
        {
            id: 2,
            imgSrc: 'img/latest-2.jpg',
            date: 'May 4, 2019',
            comments: 5,
            title: "Vogue's Ultimate Guide To Autumn/Winter 2019 Shoes",
            description: 'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat',
        },
        {
            id: 3,
            imgSrc: 'img/latest-3.jpg',
            date: 'May 4, 2019',
            comments: 5,
            title: 'How To Brighten Your Wardrobe With A Dash Of Lime',
            description: 'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat',
        },
    ];

    const benefits = [
        {
            id: 1,
            iconSrc: 'img/icon-1.png',
            title: 'Free Shipping',
            description: 'For all order over 99$',
        },
        {
            id: 2,
            iconSrc: 'img/icon-2.png',
            title: 'Delivery On Time',
            description: 'If good have problems',
        },
        {
            id: 3,
            iconSrc: 'img/icon-1.png',
            title: 'Secure Payment',
            description: '100% secure payment',
        },
    ];

    return (
        <section className="latest-blog py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold">From The Blog</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <div key={blog.id} className="single-latest-blog bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={blog.imgSrc} alt="" className="w-full h-48 object-cover" />
                            <div className="latest-text p-4">
                                <div className="tag-list flex justify-between text-gray-500 mb-2">
                                    <div className="tag-item flex items-center">
                                        <i className="fa fa-calendar-o mr-1"></i>
                                        {blog.date}
                                    </div>
                                    <div className="tag-item flex items-center">
                                        <i className="fa fa-comment-o mr-1"></i>
                                        {blog.comments}
                                    </div>
                                </div>
                                <a href="#">
                                    <h4 className="text-lg font-semibold hover:text-blue-500">{blog.title}</h4>
                                </a>
                                <p className="text-gray-700 mt-2">{blog.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="benefit-items mt-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map(benefit => (
                            <div key={benefit.id} className="single-benefit flex items-center bg-white p-4">
                                <div className="sb-icon mr-4">
                                    <img src={benefit.iconSrc} alt="" className="w-12 h-12" />
                                </div>
                                <div className="sb-text">
                                    <h6 className="text-lg font-semibold">{benefit.title}</h6>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;