import React from 'react'
import Logo from './Logo'

const Introduction = () => {
  return (
    <div className=' md:w-[80%] w-[95%] mx-auto flex flex-col gap-7 '>

        <p className='md:text-3xl text-[18px]'>We have used Technologies such as:</p>

        <div className='flex items-center md:justify-between gap-5 flex-wrap justify-center  '>
            <Logo link={"/next-js-seeklogo.png"} text={'Next.js'}  />
            <Logo link={"/imagekit-io-logo.png"} text={"Imagekit.io"}/>
            <Logo link={"/NextAuth.png"} text={"NextAuth.js"} />
            <Logo link={"/mongodb.svg"} text={"MongoDB"}/>
            <Logo link={"/nodemailer.png"} text={"Nodemailer"}/>
            <Logo link={"/jwt-seeklogo.png"} text={"JsonWebToken"}/>
        </div>



    </div>
  )
}

export default Introduction