"use client"
import React from 'react'
import { useSearch } from '../context/SearchContext';
import TitleText from '@/components/TitleText';
import './page.css'
import Checkout from '@/components/Checkout';

const Cart = () => {

    const { cartItems, setCartItems } = useSearch();

    const DeleteItem = (idToRemove, sizeToRemove) => {
        setCartItems(cartItems.filter(item => {

            return (item._id !== idToRemove || item.size !== sizeToRemove);
        }));
    };

    const Increase = (id, size) => {
        setCartItems(prevCart =>
            prevCart.map(item =>
                (item._id === id && item.size === size)
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            )
        );
    };

    const Decrease = (id, size) => {
        setCartItems(prevCart =>
            prevCart.map(item =>
                (item._id === id && item.size === size)
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            )
        );
    };

    return (
        <>



            {cartItems.length > 0 ? (
                <div className="CartContainer">
                    {/* Title */}
                    <TitleText text1="Your" text2="Cart" className="TitleText" />

                    {/* Cart Items */}
                    <div className="CartItems">
                        {cartItems.map((item) => (
                            <div className="CartItem" key={`${item._id}-${item.size}`}>
                                <div className="product">
                                    <div className="itemImage">
                                        <img src={item.image} alt={item.name} height={100} />
                                    </div>

                                    <div className="ItemInfo">
                                        <p>{item.name}</p>
                                        <span>${item.price}</span>
                                        <span className="itemSize">Size: {item.size}</span>
                                    </div>
                                </div>

                                <div className="quantity">
                                    <img
                                        src="/addbtn.svg"
                                        alt="Increase"
                                        onClick={() => Increase(item._id, item.size)}
                                    />
                                    <span>{item.quantity}</span>
                                    <img
                                        src="/removebtn.svg"
                                        alt="Decrease"
                                        onClick={() => Decrease(item._id, item.size)}
                                    />
                                </div>

                                <div className="deletebtn" onClick={() => DeleteItem(item._id, item.size)}>
                                    <img src="/delete.png" alt="Delete" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout */}
                    <div className="checkout">
                        <Checkout />
                    </div>
                </div>
            ) : (
                <div className="EmptyCart">
                    <img src="/empty_cart.svg" alt=""  />
                    <h1>Your cart is empty</h1>
                </div>
            )}





        </>
    )
}

export default Cart