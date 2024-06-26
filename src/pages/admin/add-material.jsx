// pages/admin/add-material.js
import AddMaterials from '@/components/admin/addMaterials';
import Footer from '@/components/footer/page';
import Header from '@/components/navbar/page';
import React from 'react';


const AddMaterial = () => {
    return (
        <>
            <Header />
            <AddMaterials />;
            <Footer />
        </>
    )

};

export default AddMaterial;
