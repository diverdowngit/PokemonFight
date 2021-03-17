import React from 'react'
import { Link } from "react-router-dom";
import './Card.css'

export default function Card({ name, sprites, id }) {

    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
            <div className="poke-card mb-4">
                <p className="title">{name} </p>
                <img src={sprites.other.dream_world.front_default} alt={name} className="card-img"/>
                <Link to={`/${id}`} >
                    <button className="btn btn-poke">Open</button>
                </Link>
            </div>
        </div>
    )             
}
