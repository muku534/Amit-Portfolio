import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";

export default function Work() {

    const Works = [
        {
            id: 1,
            image: "https://flowbite.com/docs/images/blog/image-1.jpg",
            title: "Noteworthy technology acquisitions 2021",
            description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
        },
        {
            id: 2,
            image: "https://flowbite.com/docs/images/blog/image-1.jpg",
            title: "Noteworthy technology acquisitions 2021",
            description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
        },
        {
            id: 3,
            image: "https://flowbite.com/docs/images/blog/image-1.jpg",
            title: "Noteworthy technology acquisitions 2021",
            description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
        },
    ]
    return (
        <>
            <main className="flex w-full lg:flex-row flex-col p-5 mt-10 lg:mt-20 lg:mb-10 justify-center items-center ">
                <div className="lg:w-2/2 lg:pr-10 lg:px-10 flex flex-col justify-center items-center text-center ">
                    <div className="lg:mb-10  pt-5 justify-center items-center">
                        <h1 className="text-2xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-text-gray-900 mb-4">Work</h1>
                        <p className="text-md lg:text-md font-normal text-gray-400 tracking-tight mb-4 leading-relaxed">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center lg:items-start">
                            {Works.map((item, index) => (
                                <div key={item.id} class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href="#">
                                        <Image class="rounded-t-lg " src={item.image} alt="" />
                                    </a>
                                    <div class="p-5">
                                        <a href="#">
                                            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                                        </a>
                                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
                                       
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}