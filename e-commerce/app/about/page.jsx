import React from 'react'
import Image from 'next/image'
import { assets } from '../assets/frontend_assets/assets'
import TitleText from '@/components/TitleText'
import './page.css'

const About = () => {
  return (
    <>
      <div className="aboutpage">

        <div className="header">
          <TitleText text1={'About'} text2={'Us'} />
        </div>

        <div className="aboutus" >

          <div className="image">
            <Image src={assets.about_img} alt="Forever Clothing" style={{ width: '90%', height: 'auto' }}  />
          </div>

          <div
            className="aboutinfo"
            style={{
              maxWidth: '500px',
              fontFamily: 'Arial, sans-serif',
              color: '#333',
              lineHeight: '1.6',
              fontSize: '16px',

              textAlign: 'justify'
            }}
          >
            <h2 style={{ color: '#e91e63', marginBottom: '15px', textAlign: 'center' }}>Welcome to Forever</h2>
            <p>Forever is your ultimate destination for stylish and trendy clothing. We bring you high-quality fashion pieces that suit every occasion and style.</p>
            <p>Our mission is to make fashion accessible, comfortable, and sustainable for everyone. We carefully curate our collections to provide you with the latest trends and timeless classics.</p>
            <p>Join us at Forever and experience a world of fashion that empowers your unique style.</p>
          </div>

        </div>

      </div>
    </>
  )
}

export default About
