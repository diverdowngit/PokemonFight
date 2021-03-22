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
    const [gameOver, setGameOver] = useState(false)
    const [hurra, setHurra] = useState(false)
    const [pokemonWon, setPokemonWon] = useState(false)
    const [opponentWon, setOpponentWon] = useState(false)

    const reset = () => {
        setPokemonScore(100)
        setOpponentScore(100)
        setOpponentWon(false)
        setOpponentWon(false)
        setGameOver(false)
    }

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


 

    const calcFight = ( ownScore, attacker, victim ) => {
        // [1] attack
        // [2] defence
        // [3] special-attack
        // [4] special-defence
        // [5] speed
        // substract attackpoints from opponent to own score / 3
        // add own defence points / 9
        let lucky = random(4)
        let score = ownScore 
                    - random(attacker.stats[1].base_stat/3) 
                    + random(victim.stats[2].base_stat/9) 
                    + random(victim.stats[5].base_stat/19)
        // if lucky add bit of defence
        if (lucky === 1) {
            console.log("lucky")
            score += random(victim.stats[4].base_stat/5) 
        }
        // if unlucky reinforce ooponent attack
        if (lucky === 0) {
            console.log("unlucky")
            score -= random(attacker.stats[3].base_stat/5)
        }

        if (score >= ownScore) return ownScore
        if (score <= 0) return 0
        return score
    }


    const fight = () => {

        if (pokemonScore <= 0) {
            setGameOver(true)
            setOpponentWon(true)
        } else if (opponentScore <= 0) {
            setGameOver(true)
            setPokemonWon(true)
        }

        setOpponentScore(opponentScore => calcFight(opponentScore, pokemon, opponent));
        setPokemonScore(pokemonScore => calcFight(pokemonScore, opponent, pokemon));
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
                    {pokemonWon && <h1 className="text-dark">USER WON</h1>}
                    {opponentWon && <h1 className="text-dark">Opponent WON</h1>}
                   
                   <FightCard pokemon={pokemon} setAction={setPokemon} score={pokemonScore}/>
                   <FightCard pokemon={opponent} setAction={setOpponent} score={opponentScore}/>
         
                </div>
                <Link to="/">
                    <button className="btn btn-outline-dark my-5">Back</button>
                </Link>
                <button className="btn btn-outline-dark my-5" onClick={reset}>Reset</button>
                <Link to={`/${pokeId}`}>
                    <button className="btn btn-outline-dark my-5">Same pokemon - new opponent</button>
                </Link>
                <button className={`btn btn-poke my-5 ${gameOver && "disabled"}`} onClick={fight} >Fight</button>

            </div>
        )
    } else {
        return <h1>Error</h1>
    }

   
}

export default FightView
