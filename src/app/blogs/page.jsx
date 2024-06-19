"use client"

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import axios from "axios";

const blogs = [
    {
        _id: 1,
        category: "Technology",
        createdAt: new Date(),
        title: "Introduction to React Hooks",
        summary: "Learn about React Hooks and how they simplify state management in functional components.",
    },
    {
        _id: 2,
        category: "Programming",
        createdAt: new Date(),
        title: "Getting Started with Node.js",
        summary: "Explore the basics of Node.js and set up your first server-side application.",
    },
    {
        _id: 3,
        category: "Web Development",
        createdAt: new Date(),
        title: "CSS Grid Layout Explained",
        summary: "Master CSS Grid Layout with practical examples and create responsive web layouts.",
    },
    {
        _id: 4,
        category: "JavaScript",
        createdAt: new Date(),
        title: "Understanding Promises in JavaScript",
        summary: "Deep dive into JavaScript Promises and asynchronous programming.",
    },
];

export default function Blogs() {
    // const [blogs, setBlogs] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchBlogs = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/getBlogs');
    //             setBlogs(response.data.Blogs);
    //             setLoading(false);
    //             console.log(response.data.Blogs);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchBlogs();
    // }, []);

    return (
        <>
            <main className="flex w-full lg:flex-row flex-col p-5 mt-10 lg:mt-18 lg:mb-10 justify-center items-center bg-gray-50">
                <div className="lg:w-2/2 lg:pr-10 lg:px-10 flex flex-col justify-center items-center text-center ">
                    <div className="lg:mb-10  pt-5 justify-center items-center">
                        <h1 className="text-2xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-text-gray-900 mb-4">Blog</h1>
                        <p className="text-md lg:text-md font-normal text-gray-400 tracking-tight mb-4 leading-relaxed">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-center items-center lg:items-start">
                            {blogs.map((blog, index) => (
                                <article key={blog._id} className="p-6 bg-white rounded-lg hover:shadow-xl border border-gray-200 shadow-md">
                                    <div className="flex justify-between items-center mb-5 text-gray-500">
                                        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-800">
                                            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                            {blog.category}
                                        </span>
                                        <span className="text-sm">{new Date(blog.createdAt).toLocaleDateString('en-in', { dateStyle: 'medium' })}</span>
                                    </div>
                                    <h2 className="mb-2 text-2xl font-bold tracking-tight">
                                        <Link to={`/SingleBlog/${blog._id}`} className="text-gray-500 dark:text-gray-900">
                                            {blog.title}
                                        </Link>
                                    </h2>
                                    <p className="mb-5 font-light text-gray-500 dark:text-gray-500">{blog.summary}</p>
                                    <div className="flex justify-between items-center">
                                        <Link to={`/SingleBlog/${blog._id}`} className="inline-flex items-center font-medium text-primary-600 dark:text-gray-600 hover:underline">
                                            Read more
                                            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </Link>
                                    </div>
                                </article>
                            ))}

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}