"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Avatar, Switch } from "@nextui-org/react";
import Login from "../login/Page";
import Signup from "../signup/Page";
import { auth, db } from "@/app/firebase";
import Link from "next/link";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@nextui-org/react";
import { doc, getDoc } from "firebase/firestore";

export default function Header() {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, "admins", currentUser.uid)); // Assuming admins collection
                    if (userDoc.exists()) {
                        setUser({ ...currentUser, role: 'admin', ...userDoc.data() });

                    } else {
                        const userDoc = await getDoc(doc(db, "users", currentUser.uid)); // Assuming users collection
                        if (userDoc.exists()) {
                            setUser({ ...currentUser, role: 'user', ...userDoc.data() });
                        } else {
                            setUser(null); // Handle case where user document doesn't exist
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                }
            } else {
                setUser(null); // No user signed in
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        console.log("Current user:", user); // Log user whenever it changes
    }, [user]);

    const menuItems = [
        { text: "Home", url: "/" },
        { text: "About", url: "/about" },
        { text: "Materials", url: "/materials" },
        { text: "Blog", url: "/blogs" },
        { text: "Contact", url: "/contact" },
        ...(user?.role === 'admin' ? [
            { text: "Add Materials", url: "/admin/add-material" },
            { text: "Post Blogs", url: "/admin/post-blog" }
        ] : [])
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
                {user?.role === 'admin' && (
                    <>
                        <NavbarItem>
                            <Link color="foreground" href="/admin/add-material">
                                Add Materials
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color="foreground" href="/admin/post-blog">
                                PostBlogs
                            </Link>
                        </NavbarItem>
                    </>
                )}
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
                {isMenuOpen === false && (
                    <>
                        <Switch
                            value={theme === 'dark'}
                            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            label={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                            scale="sm"
                        />
                    </>
                )}
                {user ? (
                    <NavbarItem>
                        <Dropdown>
                            <DropdownTrigger>
                                <Avatar isBordered src={user?.photoURL} className="cursor-pointer" />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
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
                            href={item.url}
                            size="lg"
                        >
                            {item.text}
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
