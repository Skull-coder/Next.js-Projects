"use client"
import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='py-3 flex items-center justify-between md:w-[80%] w-[95%] mx-auto'>

      <div>

        <span className='md:text-5xl text-4xl text-white text-shadow-background'>Moments.</span>
      </div>

      <div className='text-xl flex gap-5'>
        <Link href={"/authentication/login"}>
          <button className='border-white border-2 rounded-xl p-2 hover:bg-gray-800 transition duration-300 ease-in-out'>Login</button>
        </Link>

        <Link href={"/authentication/signup"}>
          <button className='bg-white text-black rounded-xl p-2 hover:bg-black hover:text-white border-2 border-white  transition duration-300 ease'>Sign up</button>
        </Link>
      </div>

    </div>
  )
}

export default Navbar