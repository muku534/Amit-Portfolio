// components/PostBlogPage.js
import React, { useState } from 'react';
import { db } from '@/app/firebase';
import { collection, addDoc } from 'firebase/firestore';
import withAdminAccess from './withAdminAccess';

const PostBlogPage = () => {
    const [blog, setBlog] = useState('');

    const handleAddBlog = async () => {
        try {
            await addDoc(collection(db, 'blogs'), { content: blog });
            setBlog('');
        } catch (error) {
            console.error('Error adding blog: ', error);
        }
    };

    return (
        <div>
            <h1>Post Blog</h1>
            <input
                type="text"
                value={blog}
                onChange={(e) => setBlog(e.target.value)}
            />
            <button onClick={handleAddBlog}>Post Blog</button>
        </div>
    );
};

export default withAdminAccess(PostBlogPage);
