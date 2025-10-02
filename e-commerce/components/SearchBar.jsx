"use client"
import React from 'react'
import { assets } from '@/app/assets/frontend_assets/assets'
import './SearchBar.css'
import { useSearch } from '@/app/context/SearchContext'

const SearchBar = ({ }) => {
    const { setShowSearch, setSearchText, SearchText } = useSearch();
    console.log(SearchText)
    return (
        <>
            <div className="parentSearchInputBox" >
                <div className="SearchInputBox">
                    <input type="text" placeholder='Search' value={SearchText} onChange={(e)=> setSearchText(e.target.value)}  />
                    <img src={assets.search_icon.src} alt="" width={22} />
                </div>
                <img src={assets.cross_icon.src} alt="" width={16} onClick={()=>setShowSearch(false)} />
            </div>


        </>
    )
}

export default SearchBar