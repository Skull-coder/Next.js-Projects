"use client"
import React from 'react'
import Image from "next/image";
import { assets } from '@/app/assets/frontend_assets/assets';
import './Navbar.css'
import MenuSlider from './MenuSlider';
import { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from './SearchBar';
import { useSearch } from '@/app/context/SearchContext';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {

    const { showSearch, setShowSearch, cartItems } = useSearch();
    const totalQuantity = cartItems.reduce((accumulator, item) => {
        return accumulator + item.quantity;
    }, 0);

    const pathname = usePathname();
    const links = [
        { name: "Home", path: "/" },
        { name: "Collection", path: "/collection" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    const [isOpen, setIsOpen] = useState(false);
    return (

        <>
            <nav>

                <div className="logo" >
                    <Link href={'/'}><Image src={assets.logo} alt="logo" height={45} onClick={() => setShowSearch(false)} /></Link>

                </div>

                <div className="pages">
                    <ul>
                        {links.map((link) => (
                            <li key={link.path}
                                className={pathname === link.path ? "active" : ""}>
                                <Link href={link.path} onClick={() => setShowSearch(false)}>{link.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="navbar-actions">
                    <Link href={'/collection'}>
                        <img
                            src={assets.search_icon.src}
                            onClick={() => setShowSearch(!showSearch)}
                            height={22}
                        />
                    </Link>

                        <div className="carticon">
                    <Link href={'/cart'}>
                            <img
                                src={assets.cart_icon.src}
                                onClick={() => setShowSearch(false)}

                                height={22}
                            />
                    </Link>
                            {totalQuantity !== 0 && (<div className="countspan">
                                <span className='count'>{totalQuantity}</span>
                            </div>)}
                        </div>
                    <div className="clerk">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <span style={{ cursor: "pointer" }}>Sign In</span>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                    <img
                        src={assets.menu_icon.src}
                        className='nav-menu'
                        onClick={() => { setIsOpen(true), setShowSearch(false) }}
                        height={22}

                    />

                </div>

                <MenuSlider isOpen={isOpen} setIsOpen={setIsOpen} onClick={() => setShowSearch(false)} />



            </nav>

            <div className={`searchbar ${showSearch ? "open" : ""}`}>
                <SearchBar />
            </div>

        </>
    )
}

export default Navbar