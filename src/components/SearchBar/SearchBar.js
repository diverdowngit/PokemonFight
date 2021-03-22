import React from 'react'
import './SearchBar.css'

const SearchBar = () => (
    <div className="input-wrapper">
    <form action="/" method="get">
        <label htmlFor="header-search">
            
        </label>
        <input
            type="text"
            id="header-search"
            className="search-bar"
            placeholder="Search blog posts"
            name="s" 
        />
        <button type="submit" className="search-bar">Search</button>
    </form>
    </div>
);

export default SearchBar