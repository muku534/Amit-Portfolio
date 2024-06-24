// components/withAdminAccess.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/app/firebase';

const withAdminAccess = (WrappedComponent) => {
    return (props) => {
        const [loading, setLoading] = useState(true);
        const [user, setUser] = useState(null);
        const router = useRouter();

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                if (currentUser) {
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    const userData = userDoc.data();

                    if (userData?.role === 'admin') {
                        setUser({ ...currentUser, ...userData });
                    } else {
                        router.push('/unauthorized');
                    }
                } else {
                    router.push('/login');
                }
                setLoading(false);
            });

            return () => unsubscribe();
        }, [router]);

        if (loading) {
            return <p>Loading...</p>;
        }

        return user ? <WrappedComponent {...props} user={user} /> : null;
    };
};

export default withAdminAccess;




