"use client"
import React from 'react'
import { useState } from 'react'

const Sidebar = ({DrawerOpen , setSection, section}) => {

  


  return (

    <div className={`flex flex-col gap-10 w-[200px] max-[1000px]:absolute  max-[1000px]:bg-[#1e1f20] h-[calc(100vh-100px)] transition-all duration-300 ease-linear ${DrawerOpen ? "max-[1000px]:left-0" : "max-[1000px]:-left-full"}`} >

        <div className={` ${section === "image" && "bg-blue-950"} transition-all duration-100 ease-linear p-2  py-3 text-[18px] border  rounded-2xl flex items-center gap-3`} onClick={()=> setSection(prev=> prev!=="image" && "image" )} > <img src="/photo.svg" alt="" width={24} /> Photos</div>
        <div className={` ${section === "video" && "bg-blue-950"} transition-all duration-100 ease-linear   p-2 py-3 text-[18px] border  rounded-2xl flex items-center gap-3`} onClick={()=> setSection(prev=> prev!=="video" && "video" )} > <img src="/play.svg" alt="" width={24} />  Videos</div>
        <div className={` ${section === "document" && "bg-blue-950"} transition-all duration-100 ease-linear  p-2 py-3 text-[18px] border  rounded-2xl flex items-center gap-3`} onClick={()=> setSection(prev=> prev!=="document" && "document" )} > <img src="/docs.svg" alt="" width={24} />Document</div>


    </div>
  )
}

export default Sidebar