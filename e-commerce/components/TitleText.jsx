import React from 'react'
import './TitleText.css'

const TitleText = ({text1, text2}) => {
  return (
    <div className='TitleText'>
        <span id='text1'>{text1} </span> 
        
        <span id='text2'>{text2}</span>

        
    </div>
  )
}

export default TitleText