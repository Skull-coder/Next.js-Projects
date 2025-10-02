"use client";
import React from "react";
import { products } from "@/app/assets/frontend_assets/assets";
import Image from "next/image";
import { useState } from "react";
import './page.css'
import Product from "@/components/Product";
import TitleText from "@/components/TitleText";
import { useSearch } from "@/app/context/SearchContext";

const ProductPage = ({ params }) => {
  // unwrap params
  const { id } = React.use(params);
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState('')

  const FilterProduct = products.filter((item) => item._id.toString() === id);

  const { cartItems, setCartItems } = useSearch();

  const handleClick = () => {
    setCartItems((prevCart) => {
      
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === id && item.size === selected
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        // item doesn't exist → add new one
        return [
          ...prevCart,
          {
            _id: id,
            name: FilterProduct[0].name,
            price: FilterProduct[0].price,
            image: FilterProduct[0].image[0].src,
            size: selected,
            quantity: 1,
          },
        ];
      }
    });
  };


  return (
    <>
      {FilterProduct.map((item) => (

        <div className="ProductInfo" key={item._id}>

          <div className="productimages" key={item._id}>

            <div className="imageslist">
              {
                item.image.map((img, index) => (

                  <img src={img.src} key={index} width={80} onClick={(e) => setIndex(index)} />
                )

                )
              }
            </div>

            <div className="displayedphoto">
              <Image src={item.image[index]} width={390} alt="" id="BigPhoto" />
            </div>


          </div>


          <div className="product-content">

            <p id="itemName">{item.name}</p>

            <p id="itemPrice">Price: ${item.price}</p>

            <p id="itemDescription">{item.description}</p>

            <div className="boxes">
              {item.sizes.map((s, index) => (


                <span className="box" key={index} onClick={() => setSelected(s)} style={{
                  border: selected === s ? '2px solid #000000ff' : ''
                }}>{s}</span>
              ))}
            </div>

            <button onClick={handleClick} disabled={!selected}>ADD TO CART</button>

          </div>



        </div>



      ))}

      <div className="RealtedProducts">
        <TitleText text1={'Realted'} text2={'Products'} />
        <div className="ProductsGrid">
          {products

            .filter(item => (item.category === FilterProduct[0].category) && (item.subCategory === FilterProduct[0].subCategory))   // only keep bestseller items
            .map((item) => (
              <Product
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image[0]}
              />
            ))}
        </div>
      </div>

    </>
  );
};

export default ProductPage;
