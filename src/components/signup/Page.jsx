import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link } from "@nextui-org/react";
import { auth } from "@/app/firebase"; // Adjust this import based on your Firebase configuration
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({ isOpen, onOpenChange }) {
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            // Optionally update the user's display name
            await user.updateProfile({
                displayName: firstName
            });
            // Optionally send email verification
            await user.sendEmailVerification();
            // Handle successful signup (e.g., close modal)
            onOpenChange(false);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={() => {
                onOpenChange(false);
                setError(null); // Reset error state on modal close
            }}
            placement="top-center"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>
                <ModalBody>
                    <Input
                        autoFocus
                        label="First name"
                        placeholder="Enter your First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        variant="bordered"
                    />
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="bordered"
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="bordered"
                    />
                    <div className="flex py-2 px-1 justify-between">
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
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
                <ModalFooter>
                    <Button color="default" onPress={() => onOpenChange(false)}>
                        Close
                    </Button>
                    <Button color="primary" onPress={handleSignUp}>
                        Sign up
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
