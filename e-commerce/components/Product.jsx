import React from 'react'
import './Product.css'
import Image from 'next/image'
import Link from 'next/link'


const Product = ({ id, name, price, image }) => {
    
    
    return (
        <>

            <Link  href={`/product/${id}`}>
                <div className="productDisplay" key={id} >
                    <div className="imageContainer">
                        <Image
                            className="productImage"
                            src={image}
                            alt={name}
                        />
                    </div>
                    <p id="name">{name}</p>
                    <p>${price}</p>
                </div>
            </Link>

        </>
    )
}

export default Product