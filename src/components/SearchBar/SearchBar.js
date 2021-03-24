import React from 'react'
import './SearchBar.css'

const SearchBar = ({handleUserInput, userInput, setSearch}) => {

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setSearch(userInput)
          }
    }

    return (
        <div className="input-wrapper">
            <input
                type="search" 
                placeholder="Search ... " 
                aria-label="Search" 
                value={userInput}
                onChange={handleUserInput}
                className="search-bar"
                onKeyDown={_handleKeyDown}
            />
        </div>
    )
    
}

export default SearchBar;