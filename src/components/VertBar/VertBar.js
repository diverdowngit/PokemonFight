import React from 'react'
import { Link } from "react-router-dom";
import './VertBar.css'

const VertBar = () => {
    return (
        <div className="container">
            <div className="outer-container">
                <Link to="/scores">
                    <button className="btn btn-poke">Score</button>
                </Link>
                <Link to="/">
                    <button className="btn btn-poke">Home</button>
                </Link>
              
            </div>
        </div>
    )
}

export default VertBar
