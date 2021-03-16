import React, {useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getApiData } from '../../api'
import { Link } from "react-router-dom";



const DetailView = () => {
    const { id } = useParams()
    const [pokemon, setPokemon] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getApiData(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(result => {
            setLoading(false)
            setPokemon(result)
        })
        .catch(e => console.log(e))
    }, [id]);


    pokemon && console.log(pokemon)


    if (loading) {
        return <h1>Loading...</h1>
      }

    if (pokemon) {
        return (
            <div className="container">
                <div className="py-3">
                <h2>{pokemon.name}</h2>

                </div>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <img src={pokemon.sprites.other.dream_world.front_default} height="250px" alt={pokemon.name}/>
                    </div>
                    <div className="col-12 col-md-8">
                    <div className="ability-container row">
                        {pokemon.stats.map((stat, index) => {
                            return (
                                <div key={index} className="row col-12 text-left">
                                    <div className="col-3">
                                        <p>{stat.stat.name}</p>
                                    </div>
                                    <div className="col-9">
                                 
                                        <div  className="progress">
                                            <div className="progress-bar" 
                                                role="progressbar" 
                                                style={{width: `${stat.base_stat}%`}}
                                                aria-valuenow={stat.base_stat} 
                                                aria-valuemin="0" 
                                                aria-valuemax="200">
                                                {stat.base_stat}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
                <Link to="/">
                    <button className="btn btn-outline-dark my-5">Back</button>
                </Link>
                <Link to="/">
                    <button className="btn btn-poke my-5 m-3">Select</button>
                </Link>
                
            </div>
        )
    } else {
        return <h1>Error</h1>
    }
   
}

export default DetailView
