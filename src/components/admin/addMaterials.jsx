// components/admin/AddMaterialPage.js
import React, { useState } from 'react';
import { db } from '@/app/firebase';
import { collection, addDoc } from 'firebase/firestore';
import withAdminAccess from '../withAdminAccess';
import '../../app/globals.css'
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { Button, Input, Textarea } from '@nextui-org/react';
import Image from 'next/image';

const AddMaterialPage = () => {

    const [material, setMaterial] = useState('');

    const handleAddMaterial = async () => {
        try {
            await addDoc(collection(db, 'materials'), { content: material });
            setMaterial('');
        } catch (error) {
            console.error('Error adding material: ', error);
        }
    };
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setFile(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('file', file);

        axios
            .post('http://localhost:5000/Material', formData)
            .then((response) => {
                console.log(response.data);
                // do something with the response
            })
            .catch((error) => {
                console.log(error);
                // handle the error
            });
    };

    return (
        <main className="py-20 mx-auto max-w-screen-xl lg:px-20 md:mx-5 mx-5">
            <div className="box-root flex flex-col lg:mx-24 " style={{ flexGrow: 1, zIndex: 9 }}>
                <div className="mx-auto max-w-screen-lg text-center ">
                    <h2 className="text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray">Add Material</h2>
                    <hr className="w-20 h-0.5 mx-auto my-1 bg-gray-100 border-0 rounded dark:bg-gray-500"></hr>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
                </div>

                <div className="formbg-outer max-w-screen-lg ">
                    <div className="formbg-inner ph-8">
                        <form id="stripe-login" onSubmit={handleSubmit}>
                            <div className="field pb-5">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
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
                                <input id="dropzone-file" type="file" className="hidden" name='images' onChange={handleFileUpload} accept="images/*" />
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
                                <Button color="primary" type='submit' onPress={handleAddMaterial}>
                                    Loading
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
