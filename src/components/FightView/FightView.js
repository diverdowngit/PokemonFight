import React, {useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getApiData } from '../../api'
import { Link } from "react-router-dom";
import spinner from '../../images/spinner.gif'
import FightCard from '../FightCard/FightCard';
import VertBar from '../VertBar/VertBar';
import './FightView.css'
const axios = require('axios');

const FightView = () => {
    const { pokeId, opponentId } = useParams()

    const [pokemon, setPokemon] = useState()
    const [opponent, setOpponent] = useState()
    const [pokemonScore, setPokemonScore] = useState(100)
    const [opponentScore, setOpponentScore] = useState(100)
    const [loading, setLoading] = useState(true)
    const [gameOver, setGameOver] = useState(false)
    const [pokemonWon, setPokemonWon] = useState(false)
    const [opponentWon, setOpponentWon] = useState(false)

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


    useEffect(() => {
        if (pokemonWon || opponentWon) {
            setGameOver(true);
            saveGame();
        }
    }, [pokemonWon, opponentWon])
 

    const reset = () => {
        setPokemonScore(100)
        setOpponentScore(100)
        setOpponentWon(false)
        setPokemonWon(false)
        setGameOver(false)
    }

    const random = (factor) => Math.floor(Math.random() * factor);

    const saveGame = async () => {
        const response = await axios.post(
            'https://poke-express-api.herokuapp.com/api/v1/score',
            { 
                user: `6050dd4f3146d8ebba7cd373`,
                user_pokemon: pokemon.name,
                opponent_pokemon: opponent.name,
                user_wins: pokemonWon
             },
            { headers: { 'Content-Type': 'application/json' } }
          )
          console.log(response.data)
    }



    const calcFight = ( oldScore, attacker, victim ) => {
        // [1] attack
        // [2] defence
        // [3] special-attack
        // [4] special-defence
        // [5] speed
        // substract attackpoints from opponent to own score / 3
        // add own defence points / 9
        let lucky = random(4)
        let score = oldScore 
                    - random(attacker.stats[1].base_stat/3) 
                    + random(victim.stats[2].base_stat/9) 
                    + random(victim.stats[5].base_stat/19)

        // if lucky add bit of defence
        if (lucky === 1) score += random(victim.stats[4].base_stat/5) 
        // if unlucky reinforce ooponent attack
        if (lucky === 0) score -= random(attacker.stats[3].base_stat/5)

        if (score >= oldScore) return oldScore
        if (score <= 0) return 0
        return score
    }

    const fight = async () => {
        const poke = await calcFight(pokemonScore, opponent, pokemon)
        const oppo = await calcFight(opponentScore, pokemon, opponent)

        setPokemonScore(poke);
        setOpponentScore(oppo);
        
        if (poke <= 0) setOpponentWon(true);
        if (oppo <= 0) setPokemonWon(true);
    }


    while (loading) {
        return (
          <div>
            <img src={spinner} alt="spinner" className="spinner"/>
          </div>
        )
      }


    if (pokemon && opponent) {
        return (
            <>
            <VertBar />
            <div className="container">
                <div className="container row text-center">
                    {pokemonWon && <h1 className="text-white">USER WON</h1>}
                    {opponentWon && <h1 className="text-white">Opponent WON</h1>}
                   
                   <FightCard pokemon={pokemon} setAction={setPokemon} score={pokemonScore}/>
                   <FightCard pokemon={opponent} setAction={setOpponent} score={opponentScore}/>
         
                </div>
                <div className="fight-btn text-center">
                    <button className={`btn btn-danger btn-lg m-1 ${gameOver && "disabled"}`} onClick={fight} >Fight</button>
                </div>


                <div className="btn-container">
                    <Link to="/">
                        <button className="btn btn-outline-dark m-1">Home</button>
                    </Link>
                    <Link to={`/${pokeId}`}>
                        <button className="btn btn-outline-dark m-1 mr-5">Same pokemon - new opponent</button>
                    </Link>
                    <button className="btn btn-outline-danger m-1" onClick={reset}>Reset</button>

                </div>
               
            </div>
            </>
        )
    } else {
        return <h1>Error</h1>
    }

   
}

export default FightView
