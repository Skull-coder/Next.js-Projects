"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './Navbar.css'
import { useDrawer } from "./DrawerContext";

const Navbar = () => {

  const { openDrawer,GPopenDrawer  } = useDrawer();

  return (
    <nav>

        <div className="logo">
            <Image src="/BestLogo.png" alt="" width={172} height={90} />
        </div>

        <div className="links">
            
                {/* <Link href="/" className='nav-link link'>My Passwords</Link>                */}
                <button className='nav-link link' style={{border: 'none'}} onClick={openDrawer}>Add New Password</button>
                <button className='nav-link link' style={{border: 'none'}} onClick={GPopenDrawer}>Generate Password</button>
        </div>


    </nav>
  )
}

export default Navbar