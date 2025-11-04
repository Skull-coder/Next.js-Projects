import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-300 py-5 mt-10 border-t border-gray-700">
      <div className="md:w-[80%] w-[95%] mx-auto text-center flex flex-col gap-2">

        <p className="text-2xl font-bold text-white">Moments.</p>

        <p className="text-sm">
          A personal project built with 🧠 
        </p>

        <a
          href="https://github.com/Skull-coder"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-sm"
        >
          github.com/Skull-coder
        </a>

        <p className="text-xs text-gray-500 mt-2">
          Just a small project made with passion.
        </p>
      </div>
    </footer>
  )
}

export default Footer
