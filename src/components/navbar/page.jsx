"use client"

import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Avatar } from "@nextui-org/react";
import Login from "../login/Page";
import Signup from "../signup/Page";
import { auth } from "@/app/firebase";
import Link from "next/link";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@nextui-org/react";

export default function Header() {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);


    auth.onAuthStateChanged((currentUser) => {
        if (currentUser) {
            // User is signed in.
            setUser(currentUser);
            // console.log("image",user);
        } else {
            // No user is signed in.
            setUser(null);
        }
    });

    const menuItems = [
        "Home",
        "About",
        "Materials",
        "Blog",
        "Contact"
    ];

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };


    const handleLoginButtonClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleSignUpButtonClick = () => {
        setIsSignUpModalOpen(true);
    };

    const handleCloseSignUpModal = () => {
        setIsSignUpModalOpen(false);
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setUser(null); 
        } catch (error) {
            console.error("Sign-out error:", error);
        }
    };

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/about" color="foreground" aria-current="page">
                        About
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/materials">
                        Materials
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/blogs">
                        Blogs
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Contact
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {user ? (
                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Avatar isBordered src={user?.photoURL} className="cursor-pointer" />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="new">Dashboard</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" onPress={handleLogout} color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {/* <Image src={session?.user?.image} alt="User Avatar" width={40} height={40} className="rounded-full" /> */}
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Button onPress={handleLoginButtonClick} href="#">Login</Button>
                        </NavbarItem>
                        <NavbarItem>
                            {isMenuOpen === false && (
                                <Button onPress={handleSignUpButtonClick} color="primary" href="#" variant="flat">
                                    Sign Up
                                </Button>
                            )}
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
                {user ? (
                    <Button color="danger" href="#" onPress={handleLogout} variant="flat" className="text-danger" >
                        Logout
                    </Button>
                ) : (
                    <Button onPress={handleSignUpButtonClick} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                )}
            </NavbarMenu>
            <Login isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
            <Signup isOpen={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen} />
        </Navbar>
    );
}
