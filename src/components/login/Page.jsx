import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link } from "@nextui-org/react";
import Image from "next/image";
import { EmailAuthCredential, EmailAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, GoogleAuthProvider, fetchSignInMethodsForEmail, getRedirectResult, linkWithCredential, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from "@/app/firebase";

export default function Login({ isOpen, onOpenChange }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onOpenChange(false); // Close modal after successful sign-in
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('No user found for that email.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Wrong password provided for that user.');
            } else {
                setError(error.message);
            }
            console.log(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            // Initiate sign-in with redirect
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Google sign-in error: ", error);
        }
    };

    useEffect(() => {
        const handleRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    const user = result.user;
                    onOpenChange(false);

                    const methods = await fetchSignInMethodsForEmail(auth, user.email);
                    if (methods.includes("password")) {
                        const credential = EmailAuthProvider.credential(user.email, prompt("Please enter your password"));
                        await linkWithCredential(user, credential);
                        console.log("Account linked successfully!");
                    }
                }
            } catch (error) {
                console.error("Error handling redirect result:", error);
            }
        };

        handleRedirectResult();
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                // endContent={
                                //     <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                // }
                                label="Email"
                                placeholder="Enter your email"
                                variant="bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                // endContent={
                                //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                // }
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="bordered"
                            />
                            <div className="flex py-2 px-1 justify-between">
                                <Checkbox
                                    classNames={{
                                        label: "text-small",
                                    }}
                                >
                                    Remember me
                                </Checkbox>
                                <Link color="primary" href="#" size="sm">
                                    Forgot password?
                                </Link>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                        </ModalBody>
                        <ModalFooter className="flex justify-center">
                            <Button color="primary" onPress={signIn} >
                                Sign in
                            </Button>
                        </ModalFooter>

                        <Button color="dark" onClick={signInWithGoogle} className="flex items-center bg-gray-100 text-gray-600 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-400 mx-10 my-2">
                            <div className="mr-2">
                                <Image src="/assets/images/google.png" alt="Google Logo" width={24} height={24} />
                            </div>
                            Sign in with Google
                        </Button>
                    </>
                )}
            </ModalContent>
        </Modal >
    );
}