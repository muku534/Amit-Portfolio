"use client"

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Avatar } from '@nextui-org/react';
import About from './about/page';
import Materials from './materials/page';
import Blogs from './blogs/page';
import Work from './work/page';
export default function Home() {

  return (
    <>
      <main id="Home" className="flex w-full flex-col lg:flex-row  lg:mt-40 lg:mb-20 justify-center items-center ">
        <div className="lg:w-1/2 lg:pr-10 lg:px-32 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <div className="lg:mb-10 ml-5 pr-5 justify-center items-center mt-16 lg:mt-0"> {/* Add mt-5 for small and medium screens */}
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className='mb-5' />
            <h1 className="text-3xl lg:text-5xl font-normal leading-tight tracking-tight text-start text-gray-900 dark:text-text-gray-900 mb-8 lg:mb-14">Hello! I&apos;m Dr.Amit Patel </h1>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:px-14 justify-center items-center">
          <div className='mb-10 ml-5 justify-center items-center'>
            <p className="text-3xl lg:ml-10 lg:text-4xl font-normal text-gray-700 tracking-tight mb-4 leading-relaxed">Assistant Professor | Ph.D. Pursuing </p>
            <p className="text-md lg:ml-10 lg:text-md font-normal text-gray-400 tracking-tight  leading-relaxed">
              Google Educator Level-1 | Google Workspace Administrator | Google Crowdsource Influencer
            </p>
            <p className="text-md lg:ml-10 lg:text-md font-normal text-gray-400 tracking-tight mb-4 leading-relaxed">
              With a passion for teaching and technology, I am dedicated to advancing education through innovative solutions and effective teaching methodologies.
            </p>

            <div className="mt-6 flex flex-row  items-center lg:ml-10  lg:items-start">
              <button href="#" className="text-gray-100 bg-gray-900 justify-center  inline-flex items-center  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 " role="button">
                Talk with me
              </button>
              <button type='download' className="text-gray-100 ml-5 bg-gray-900 justify-center  inline-flex items-center  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 " role="button"  >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path></svg> Resume
              </button>
            </div>
          </div>
        </div>
      </main>
      <About />
      <Materials />
      <Blogs />
      <Work />
    </>
  )
}
