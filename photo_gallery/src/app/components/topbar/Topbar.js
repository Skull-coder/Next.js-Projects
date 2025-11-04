import React from 'react'
import UserInfo from '../userInfo/UserInfo'

const Topbar = ({setDrawerOpen}) => {
  return (
    <div className='py-3 flex items-center justify-between  mx-auto'>

      <div className='flex items-center gap-5'>
        <img src="/menu.svg" alt="" width={24} className='hidden max-[1000px]:block ' onClick={()=> setDrawerOpen((prev)=> !prev)} />
        <span className='md:text-5xl text-4xl text-white text-shadow-background'>Moments.</span>
      </div>

      <div>
        <UserInfo/>
      </div>

    </div>
  )
}

export default Topbar