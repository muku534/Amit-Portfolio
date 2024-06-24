// components/AddMaterialPage.js
import React, { useState } from 'react';
import { db } from '@/app/firebase';
import { collection, addDoc } from 'firebase/firestore';
import withAdminAccess from './withAdminAccess';

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

    return (
        <div>
            <h1>Add Material</h1>
            <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
            />
            <button onClick={handleAddMaterial}>Add Material</button>
        </div>
    );
};

export default withAdminAccess(AddMaterialPage);
