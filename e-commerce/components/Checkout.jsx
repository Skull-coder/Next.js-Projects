import React from 'react'
import './Checkout.css'
import { useSearch } from '@/app/context/SearchContext';
import Link from 'next/link';
import { useState, useRef } from 'react';

const Checkout = () => {

    const { cartItems, setCartItems } = useSearch();
    const [Status, setStatus] = useState('Place Order');
    const buttonRef = useRef(null);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 20;
    const total = subtotal + shipping;

    const handleClick = () => {
        setStatus("Processing");
        if (buttonRef.current) {
            buttonRef.current.style.color = "black";
        }
        setTimeout(() => {
            setStatus("Success");
            
        }, 1500);

        setTimeout(()=>{
           window.location.reload();
        }, 2500)


    };

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Cart Totals </h1>

            <div className="cart-list">
                {cartItems.map(item => (
                    <div key={item._id + item.size} className="cart-item">
                        <div>
                            <h2>{item.name}</h2>
                            <p> SIze: {item.size} Qty: {item.quantity}</p>
                        </div>
                        <p className="price">${item.price * item.quantity}</p>
                    </div>
                ))}
            </div>

            <div className="summary">
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                </div>
                <div className="summary-row">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                </div>
                <div className="summary-row total">
                    <span>Total</span>
                    <span>${total}</span>
                </div>

                <button className="checkout-btn"
                    ref={buttonRef}
                    style={{
                        background: Status === 'Processing' ? 'yellow' : Status === 'Success' ? '#3eff2dff' : '',

                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '3px'
                    }}

                    onClick={handleClick}>{Status}
                    {Status === 'Success' && <img src="check.svg" alt="" />}</button>

            </div>
        </div>
    )
}

export default Checkout
