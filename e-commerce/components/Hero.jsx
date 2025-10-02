"use client"
import React from 'react'
import './Hero.css'
import { assets } from '@/app/assets/frontend_assets/assets'

const Hero = () => {
    return (
        <>
            <div className='Hero'>
                <div className="leftHero">
                    <p>Just</p>
                    <h1>FLEX</h1>
                </div>
                <img src={assets.hero_img.src} alt='hero_img'  />
            </div>
        </>
    )
}

export default Hero