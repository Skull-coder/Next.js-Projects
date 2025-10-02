"use client"
import { createContext, useContext, useState } from "react";

// Create Context
const SearchContext = createContext();

// Provider Component
export const SearchProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [SearchText, setSearchText] = useState('');
  const [cartItems, setCartItems] = useState([]);

  return (
    <SearchContext.Provider value={{ showSearch, setShowSearch, setSearchText, SearchText, cartItems, setCartItems }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom Hook (cleaner usage)
export const useSearch = () => useContext(SearchContext);
