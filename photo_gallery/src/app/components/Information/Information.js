import React from 'react'
import Box from './Box'

const Information = () => {
  return (
    <div className='md:w-[80%] w-[95%] mx-auto'>

        <p className='text-5xl'>Information </p>

        <Box link={"/next-js-seeklogo.png"} name={"Next.js"} content={"Next.js is a modern React framework for building fast, full-stack web applications. It makes server-side rendering, routing, and API creation super easy — all in one project."} reverse={false}/>
        <Box link={"/imagekit-io-logo.png"} name={"Imagekit.io"} content={"ImageKit.io is a powerful media management and optimization platform used to store, transform, and deliver images and videos efficiently. It helps developers handle file uploads, resizing, and delivery — all with lightning speed through a global CDN."} reverse={true} />
        <Box link={"/NextAuth.png"} name={"NextAuth.js"} content={"NextAuth.js is a complete authentication solution for Next.js applications. It makes it easy to add secure login systems using credentials, social logins, or magic links — all with minimal setup."} />
        <Box link={"/mongodb.svg"} name={"MongoDB"} content={"MongoDB is a NoSQL databasethat stores data in a flexible, JSON-like format.It’s widely used in web apps for being fast, scalable,and easy to use with JavaScript."} reverse={true} />
        <Box link={"/nodemailer.png"} name={"Nodemailer"} content={"Nodemailer is a Node.js library used to send emails directly from your backend. It’s simple, powerful, and perfect for sending verification codes, password resets, or notifications."} />
        <Box link={"/jwt-seeklogo.png"} name={"JsonWebToken"} content={"JWT (JSON Web Token) is a secure way to verify user identity and share data between the client and server. It’s commonly used for authentication and authorization in modern web applications."} reverse={true} />
    </div>
  )
}

export default Information