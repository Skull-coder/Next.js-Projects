import React from 'react'
import Image from 'next/image'
import { assets } from '@/app/assets/admin_assets/assets'
import './OurServices.css'

const OurServices = () => {
    return (
        <>
            <div className="services">
                <div className="service">
                    <Image src='/quality_icon.png' alt="Quality" width={70} height={70} />
                    <p>Best Quality Products</p>
                </div>

                <div className="service">
                    <Image src='/exchange_icon.png' alt="Exchange" width={70} height={70} />
                    <p>Easy Exchange Policy</p>
                </div>

                <div className="service">
                    <Image src='/support_img.png' alt="Support" width={70} height={70} />
                    <p>24/7 Customer Support</p>
                </div>
            </div>



        </>
    )
}

export default OurServices