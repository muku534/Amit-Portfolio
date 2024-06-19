"use client"

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, image } from "@nextui-org/react";
import axios from "axios";

const material = [
    {
        id: 1,
        images: "",
        title: "C",
        summary: "Explore the fundamentals of the C programming language with comprehensive course materials.",
    },
    {
        id: 2,
        images: "",
        title: "C++",
        summary: "Master object-oriented programming using C++ with detailed course materials and exercises.",
    },
    {
        id: 3,
        images: "",
        title: "PHP",
        summary: "Learn server-side scripting with PHP through hands-on tutorials and project-based learning.",
    },
    {
        id: 4,
        images: "",
        title: "Python",
        summary: "Dive into Python programming with practical course materials covering syntax, libraries, and applications.",
    },
    {
        id: 5,
        images: "", // Replace with actual path to Java language SVG icon
        title: "Java",
        summary: "Gain proficiency in Java programming with structured courses covering Java SE and advanced topics.",
    },
    {
        id: 6,
        images: "", // Replace with actual path to JavaScript language SVG icon
        title: "JavaScript",
        summary: "Explore the fundamentals and advanced concepts of JavaScript for front-end and server-side development.",
    },

];



export default function Materials() {
    // const [material, setMaterial] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:5000/getMaterial');
    //             setMaterial(response.data.Materials);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchData();
    // }, []);


    return (
        <>
            <main className="flex w-full lg:flex-row flex-col p-5 mt-10 lg:mt-24 lg:mb-10 justify-center items-center ">
                <div className="lg:w-2/2 lg:pr-10 lg:px-10 flex flex-col justify-center items-center text-center ">
                    <div className="lg:mb-10 justify-center items-center">
                        <h1 className="text-2xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-300 mb-4">Course Materials</h1>
                        <p className="text-md lg:text-md font-normal dark:text-gray-400 text-gray-400 tracking-tight mb-4 leading-relaxed">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center lg:items-start">
                            {material.map((item, index) => (
                                <article
                                    key={item._id}
                                    className="p-6 bg-white hover:shadow-xl rounded-lg border dark:bg-gray-800 dark:border-gray-700 border-gray-200 shadow-md"
                                >
                                    <div className="flex mb-3 justify-between items-center space-x-4">
                                        {item.images && item.images.length > 0 && (
                                            <Image className="w-25 h-20 rounded-full" src={item.images[0].url} alt={item.title} />
                                        )}
                                    </div>

                                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                                        {item.title}
                                    </h2>
                                    <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                                        {item.summary}
                                    </p>
                                    <div className="flex justify-center items-center">
                                        <div className=' justify-between '>
                                            <a href="" type='download' className={`inline-flex items-center px-2 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:text-gray-100  dark:bg-primary-600 dark:border-gray-600 dark:hover:text-gray-800 dark:hover:bg-gray-black dark:focus:ring-gray-700 '
                                                }`} >
                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path></svg> PDF Notes
                                            </a>
                                            <a href="" type='download' className={`inline-flex ml-5 items-center px-2 py-1 justify-between text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:text-gray-100  dark:bg-primary-600  dark:border-gray-600 dark:hover:text-gray-800 dark:hover:bg-gray-black dark:focus:ring-gray-700'
                                                }`}
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path></svg>  Chapterwise Notes
                                            </a>
                                        </div>
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