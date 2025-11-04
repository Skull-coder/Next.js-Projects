import React from 'react'
import Image from 'next/image'

const Logo = ({link, text}) => {
  return (
    <div className='flex flex-col items-center justify-center gap-3  w-max p-2 hover:scale-110 transition-all duration-300 ease-out'>

        
        <Image src={link} alt="" className='h-[70px] object-contain' width={70} height={70} />
        
        <span>{text}</span>

    </div>
  )
}

export default Logo