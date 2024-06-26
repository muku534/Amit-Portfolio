// pages/admin/post-blog.js
import PostBlogs from '@/components/admin/postBlogs';
import Footer from '@/components/footer/page';
import Header from '@/components/navbar/page';
import React from 'react';

const PostBlog = () => {
    return (
        <>
            <Header />
            <PostBlogs />;
            <Footer />
        </>
    )
};

export default PostBlog;
