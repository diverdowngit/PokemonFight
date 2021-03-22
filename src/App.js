import React, {useState, useEffect } from 'react'
import './App.css';
import { getApiData } from './api'
import { Switch, Route } from "react-router-dom";
import MainView from './components/MainView/MainView'
import DetailView from './components/DetailView/DetailView'
import SearchBar from './components/SearchBar/SearchBar'
// import Footer from './components/Footer/Footer'
import Logo from './images/pokemon-image.png'
import spinner from './images/spinner.gif'
import FightView from './components/FightView/FightView';

// const backendUrl = "https://poke-express-api.herokuapp.com/api/pokemon"
const pokeUrl = "https://pokeapi.co/api/v2/pokemon?limit=90"

const App = () => {

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    const fetchAllPokes = () => {
      getApiData(pokeUrl).then(
        (allpokemon) => {
          allpokemon.results.forEach((pokemon) => {
            fetchPokemonData(pokemon); 
          })
        })
     }
    fetchAllPokes()
  }, []);

  const fetchPokemonData = (pokemon) => {
    let url = pokemon.url

    getApiData(url)
      .then((pokeData) => {
        setLoading(false);
        setPokemons(prevData => [...prevData, pokeData]);
      })
    }
  
    if (loading) {
      return (
        <div>
          <img src={spinner} alt="spinner" className="spinner"/>
        </div>
      )
    }
  
    if (pokemons) {
    
      return (
      <div className="App">

        <div className="text-center pb-2">
          <img src={Logo} alt="logo" className="logo-img"/>
        </div>
     
     

        <SearchBar />


        <Switch>
          <Route exact path="/">
            <MainView pokemons={pokemons}/>
          </Route>

          <Route exact path="/:id">
              <DetailView />
          </Route>

          <Route exact path="/fight/:pokeId/:opponentId">
              <FightView />
          </Route>

          <Route exact path="/scores">
              {/* Placeholder for SCORE */}
          </Route>

        </Switch>
        {/* Placeholder for FOOTER */}

      </div>
);
} else {
  return <h1>WTF</h1>
}
}

export default App;