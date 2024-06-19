import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link } from "@nextui-org/react";
import Image from "next/image";
import { EmailAuthCredential, EmailAuthProvider, GithubAuthProvider, GoogleAuthProvider, fetchSignInMethodsForEmail, getRedirectResult, linkWithCredential, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from "@/app/firebase";

export default function Login({ isOpen, onOpenChange }) {

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            // Initiate sign-in with redirect
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Google sign-in error: ", error);
        }
    };

    const signInWithGitHub = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("GitHub sign-in error: ", error);
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
                            />
                            <Input
                                // endContent={
                                //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                // }
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
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
                        </ModalBody>
                        <ModalFooter className="flex justify-center">
                            <Button color="primary"  >
                                Sign in
                            </Button>
                        </ModalFooter>

                        <Button color="dark" onClick={signInWithGoogle} className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-400 mx-10 my-2">
                            <div className="mr-2">
                                {/* <Image src="/assets/Google.png" alt="Google Logo" width={24} height={24} className="filter invert" /> */}
                            </div>
                            Sign in with Google
                        </Button>
                    </>
                )}
            </ModalContent>
        </Modal >
    );
}