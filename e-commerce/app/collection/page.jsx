"use client"
import React, { useState, useEffect } from 'react'
import './page.css'
import { products } from '../assets/frontend_assets/assets'
import TitleText from '@/components/TitleText'
import Product from '@/components/Product'
import { ChevronDown, ChevronUp } from "lucide-react"
import { useSearch } from '../context/SearchContext'

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sort, setSort] = useState('');
  const { showSearch, setSearchText, SearchText } = useSearch();

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(item => item !== type)
        : [...prev, type]
    );
  };


  useEffect(() => {

    let updatedProducts = products;

    if (showSearch && (SearchText !== '')) {
      updatedProducts = updatedProducts.filter(item => item.name.toLowerCase().includes(SearchText.toLowerCase()))
    }


    if (selectedCategories.length > 0) {
      updatedProducts = updatedProducts.filter(item => selectedCategories.includes(item.category));
    }


    if (selectedTypes.length > 0) {
      updatedProducts = updatedProducts.filter(item => selectedTypes.includes(item.subCategory));
    }


    if (sort === 'low-high') {
      updatedProducts = [...updatedProducts].sort((a, b) => a.price - b.price);
    } else if (sort === 'high-low') {
      updatedProducts = [...updatedProducts].sort((a, b) => b.price - a.price);
    }


    setFilteredProducts(updatedProducts);

  }, [selectedCategories, selectedTypes, sort, showSearch, SearchText]);








  // detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="Page">
      <div className="filter">
        <h2 onClick={() => isMobile && setShowFilter(!showFilter)}>
          FILTER{" "}
          {isMobile && (showFilter ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
        </h2>

        {/* On desktop -> always show | On mobile -> show only if expanded */}
        {(!isMobile || showFilter) && (
          <>
            <div className="Filterbox">
              <h3>Categories</h3>
              <div className="inputs">
                <div className="input">
                  <input type="checkbox" onChange={() => handleCategoryChange("Men")} />
                  <span>Men</span>
                </div>
                <div className="input">
                  <input type="checkbox" onChange={() => handleCategoryChange("Women")} />
                  <span>Women</span>
                </div>
                <div className="input">
                  <input type="checkbox" onChange={() => handleCategoryChange("Kids")} />
                  <span>Kids</span>
                </div>
              </div>
            </div>

            <div className="Filterbox">
              <h3>Type</h3>
              <div className="inputs">
                <div className="input">
                  <input type="checkbox" onChange={() => handleTypeChange("Topwear")} />
                  <span>Topwear</span>
                </div>
                <div className="input">
                  <input type="checkbox" onChange={() => handleTypeChange("Bottomwear")} />
                  <span>Bottomwear</span>
                </div>
                <div className="input">
                  <input type="checkbox" onChange={() => handleTypeChange("Winterwear")} />
                  <span>Winterware</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="allcollections">
        <div className="AllCollectionsHeader">
          <TitleText text1={'All'} text2={'Collections'} className="TitleText" />
          <select className="options" onChange={(e) => setSort(e.target.value)}>
            <option value="relavent"  >Sort by: Relavent</option>
            <option value="low-high" >Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="AllCollectionsProducts">
          <div className="ProductsGrid">
            {filteredProducts.map((item) => (
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
      </div>
    </div>
  );
};

export default Collection;
