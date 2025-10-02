// app/components/MenuSlider.jsx
"use client"
import React from "react";
import { assets } from "@/app/assets/frontend_assets/assets";
import Image from "next/image";
import './MenuSlider.css'
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuSlider = ({ isOpen, setIsOpen }) => {


    const pathname = usePathname();


    return (


        <>




            <div className={`menu-slider ${isOpen ? "open" : ""}`}>
                <div className="menu-header">

                    <span className="close" onClick={() => setIsOpen(false)}>
                        <img src="back.svg" alt="" />
                        <span>Back</span>
                    </span>
                </div>
                <ul>
                    <li>
                        <Link
                            href="/"
                            className={pathname === '/' ? "active" : ""}
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/collection"
                            className={pathname === '/collection' ? "active" : ""}
                            onClick={() => setIsOpen(false)}
                        >
                            Collection
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/about"
                            className={pathname === '/about' ? "active" : ""}
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/contact"
                            className={pathname === '/contact' ? "active" : ""}
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>


            </div>

        </>
    );
};

export default MenuSlider;
