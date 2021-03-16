import React from 'react'
import { Link } from "react-router-dom";
import './Card.css'

export default function Card({ name, sprites, id }) {

    return (
        <div className="col-12 col-md-6 col-lg-2">
            <div className="poke-card mb-4">
                <p className="title">{name} </p>
                <img src={sprites.front_default} alt={name}/>
                <Link to={`/${id}`} >
                    <button className="btn btn-poke">Open</button>
                </Link>
            </div>
        </div>
    )             
}
