import React, {useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getApiData } from '../../api'
import { Link } from "react-router-dom";
import spinner from '../../images/spinner.gif'
import FightCard from '../FightCard/FightCard';
import './FightView.css'

const FightView = () => {
    const { pokeId, opponentId } = useParams()
    const [pokemon, setPokemon] = useState()
    const [opponent, setOpponent] = useState()
    const [pokemonScore, setPokemonScore] = useState(100)
    const [opponentScore, setOpponentScore] = useState(100)
    const [loading, setLoading] = useState(true)

    const random = (factor) => Math.floor(Math.random() * factor);

    useEffect(() => {    
        getApiData(`https://pokeapi.co/api/v2/pokemon/${opponentId}`)
        .then(result => {
            setOpponent(result)
        })
        .catch(e => console.log(e))
    }, [opponentId]);

    useEffect(() => {
        getApiData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then(result => {
            setPokemon(result)
            setLoading(false)
        })
        .catch(e => console.log(e))
    }, [pokeId]);


    const calcFight = () => {
        
    }


    const fight = () => {
        console.log(opponentScore)
        setOpponentScore(opponentScore => opponentScore - random(30));
        setPokemonScore(pokemonScore => pokemonScore - random(30));
      }


    while (loading) {
        return (
          <div>
            <img src={spinner} alt="spinner" className="spinner"/>
          </div>
        )
      }


      opponent && console.log(opponent)

    if (pokemon && opponent) {
        return (
            <div className="container">
                <div className="container row text-center">
                   
                   <FightCard pokemon={pokemon} setAction={setPokemon} score={pokemonScore}/>
                   <FightCard pokemon={opponent} setAction={setOpponent} score={opponentScore}/>
         
                </div>
                <Link to="/">
                    <button className="btn btn-outline-dark my-5">Back</button>
                </Link>
                <button className="btn btn-poke my-5" onClick={fight}>Fight</button>

            </div>
        )
    } else {
        return <h1>Error</h1>
    }

   
}

export default FightView
