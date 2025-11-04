import React from 'react'
import Image from 'next/image'

const Box = ({ link, name, content, reverse }) => {
    return (
        <div className={` my-10 py-5 bg-gray-600  flex ${reverse && "flex-row-reverse"} flex-wrap   justify-center items-center gap-5 mx-auto border-2 border-white rounded-2xl`}>

            <div className='flex  items-center justify-center gap-5 w-[400px]   ' >

                <img src={link} alt="" className='md:h-[80px] md:w-[80px] w-[50px] h-[50px] object-contain  ' />
                <p className='md:text-3xl text-xl font-black'>{name}</p>
            </div>

            <p className={`text-gray-200 text-justify  leading-relaxed  p-4  md:text-2xl text-[16px]  w-[600px] ${ !reverse ? "md:border-l  " : "md:border-r" } `} >
                {content}
            </p>


        </div>
    )
}

export default Box