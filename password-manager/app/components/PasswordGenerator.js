"use client"
import React, { use } from 'react'
import Image from 'next/image'
import './PasswordGenerator.css'
import { useState } from 'react'
import { useDrawer } from './DrawerContext'

const PasswordGenerator = () => {
  const { isGPOpen, GPcloseDrawer } = useDrawer();

  const [copy, setCopy] = useState(false)
  const [value, setValue] = useState('')
  const [specialChar, setSpecialChar] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [length, setLength] = useState(8);



  const generatePassword = () => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const special = "@#$&";

    let pwdArray = [];

    // Step 1: first 3 lowercase
    for (let i = 0; i < 3 && pwdArray.length < length; i++) {
      pwdArray.push(lower[Math.floor(Math.random() * lower.length)]);
    }

    // Step 2: one uppercase (if enabled)
    if (uppercase && pwdArray.length < length) {
      pwdArray.push(upper[Math.floor(Math.random() * upper.length)]);
    }

    // Step 3: two numbers (if enabled)
    if (numbers) {
      for (let i = 0; i < 2 && pwdArray.length < length; i++) {
        pwdArray.push(nums[Math.floor(Math.random() * nums.length)]);
      }
    }

    // Step 4: one special character (if enabled)
    if (specialChar && pwdArray.length < length) {
      pwdArray.push(special[Math.floor(Math.random() * special.length)]);
    }

    // Step 5: one lowercase
    if (pwdArray.length < length) {
      pwdArray.push(lower[Math.floor(Math.random() * lower.length)]);
    }

    // Step 6: fill remaining with random lowercase + uppercase
    let fillChars = lower;
    if (uppercase) fillChars += upper; // add uppercase if enabled

    while (pwdArray.length < length) {
      pwdArray.push(fillChars[Math.floor(Math.random() * fillChars.length)]);
    }

    // Shuffle remaining part (after first 7 structured characters)
    const fixedPart = pwdArray.slice(0, 7);
    const remainingPart = pwdArray.slice(7);

    for (let i = remainingPart.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingPart[i], remainingPart[j]] = [remainingPart[j], remainingPart[i]];
    }

    // Set final password
    setValue([...fixedPart, ...remainingPart].join(""));
  };


  const handleCopy = () => {

    setCopy(true);
    navigator.clipboard.writeText(value)

    setTimeout(() => {
      setCopy(false);
    }, 1500);

  }

  return (
    <>

      <div
        className={`overlay ${isGPOpen ? "show" : ""}`}
        onClick={GPcloseDrawer}
      ></div>

      <div className={` PasswordGeneratorBox drawer ${isGPOpen ? "open" : ""}`}>

        <button className="close-btn" onClick={GPcloseDrawer}>
          ×
        </button>

        {/* <h1>Password Generator</h1> */}

        <div className="inputbox" onClick={handleCopy} >
          <input type="text" placeholder='Password' readOnly value={value} id='CopyPassword' />
          <Image src={copy ? value? '/tick.png' : '/copy.png'  : '/copy.png'} alt="copy" width={24} height={24} />
        </div>
        <div className="options">

          <div className="option" id='characterOption'>

            <label htmlFor="characters">No. of characters</label>

            <div className="rangebox">
              <span>8</span>

              <input
                type="range"
                id="characters"
                min="8"
                max="12"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />

              <span>12</span>

            </div>

          </div>

          <div className="option">

            <input
              type="checkbox"
              id="uppercase"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />

            <label htmlFor="uppercase">Include Uppercase Letters</label>

          </div>

          <div className="option">

            <input
              type="checkbox"
              id="specialCharacter"
              checked={specialChar}
              onChange={(e) => setSpecialChar(e.target.checked)}
            />

            <label htmlFor="specialCharacter">Include one special character</label>

          </div>

          <div className="option">

            <input
              type="checkbox"
              id="numbers"
              checked={numbers}
              onChange={(e) => setNumbers(e.target.checked)}
            />

            <label htmlFor="numbers">Include numbers</label>

          </div>


        </div>

        <div className="generateBtn">

          <button onClick={generatePassword}>Generate Password</button>
        </div>


      </div>




    </>
  )
}

export default PasswordGenerator


