// components/admin/AddMaterialPage.js
import React, { useState } from 'react';
import { db, storage } from '@/app/firebase';
import { collection, addDoc } from 'firebase/firestore';
import withAdminAccess from '../withAdminAccess';
import '../../app/globals.css'
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { Button, Input, Textarea } from '@nextui-org/react';
import Image from 'next/image';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

const AddMaterialPage = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    const handleImageUpload = (event) => {
        const image = event.target.files[0];
        setImage(image);

        const render = new FileReader();
        render.onloadend = () => {
            setImagePreview(render.result);
        };
        if (image) {
            render.readAsDataURL(image)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const imageRef = ref(storage, `Materials/${title}/image`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);

            const fileRef = ref(storage, `Materials/${title}/file`);
            await uploadBytes(fileRef, file);
            const fileUrl = await getDownloadURL(fileRef);

            await addDoc(collection(db, 'materials'), {
                title,
                summary,
                imageUrl,
                fileUrl
            });

            setTitle('');
            setSummary('');
            setImage(null);
            setFile(null);
            setImagePreview(null)

        } catch (error) {
            console.log("somthing went wrong", error)
        }
    };

    const handleAddMaterial = async () => {
        try {
            await addDoc(collection(db, 'materials'), { content: material });
        } catch (error) {
            console.error('Error adding material: ', error);
        }
    };

    return (
        <main className="py-20 mx-auto max-w-screen-xl lg:px-20 lg:py-20 ">
            <div className="box-root flex flex-col lg:mx-24 " style={{ flexGrow: 1, zIndex: 9 }}>
                <div className="mx-auto max-w-screen-lg text-center ">
                    <h2 className="text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Add Material</h2>
                    <hr className="w-20 h-0.5 mx-auto my-1 bg-gray-100 border-0 rounded dark:bg-gray-500"></hr>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
                </div>

                <div className="formbg-outer max-w-screen-lg mt-5">
                    <div className="formbg-inner ph-8">
                        <form id="stripe-login" onSubmit={handleSubmit}>
                            <div className="field pb-5">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-500 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF </p>
                                    </div>
                                </label>
                                <input id="dropzone-file" type="file" className="hidden" name='images' accept="images/*" onChange={handleImageUpload} />
                            </div>

                            {imagePreview && (
                                <div className="field  border-2 border-gray-300 border-dashed rounded-lg mb-4 max-w-20">
                                    <Image src={imagePreview} alt="Image Preview" height={120} width={120} className="max-h-64 p-3 " />
                                </div>
                            )}

                            <div className="field pb-5">
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <Input type="text" placeholder="Enter your Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>

                            <div className="field pb-5">
                                <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Simmary</label>
                                <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your Summary here..." value={summary} onChange={(e) => setSummary(e.target.value)} required ></textarea>
                            </div>

                            <div className="field pb-5">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload files</label>
                                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx" multiple />
                            </div>

                            <div className="field pb-5">
                                <Button color="primary" type='submit'>
                                    Save
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default withAdminAccess(AddMaterialPage);
