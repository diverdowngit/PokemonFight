import React, {useState, useEffect } from 'react'
import './App.css';
import { getApiData } from './api'
import { Switch, Route } from "react-router-dom";
import MainView from './components/MainView/MainView'
import DetailView from './components/DetailView/DetailView'
import Footer from './components/Footer/Footer'
import Logo from './images/pokemon-image.png'
import spinner from './images/spinner.gif'
import FightView from './components/FightView/FightView';
import ScoreView from './components/ScoreView/ScoreView';
import SearchBar from './components/SearchBar/SearchBar';

const pokeUrl = "https://pokeapi.co/api/v2/pokemon?limit=90"

const App = () => {

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("");
  const [userInput, setUserInput] = useState("")
  const [error, setError] = useState(false)
  
  // useEffect(() => {
  //   fetchAllPokes(pokeUrl)
  // }, []);

  useEffect(() => {
    triggerSearch(search)
  }, [search])

  const handleUserInput = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  }

  const triggerSearch = (input) => {
    if (input === "") {
      setError(false)
      fetchAllPokes(pokeUrl)
    } 
    else {
      console.log("search triggered")
        getApiData(`https://pokeapi.co/api/v2/pokemon/${input}`)
        .then(pokemon => {
          setPokemons([pokemon,])
        }).catch(e => setError(true))

    }
  };

  const fetchAllPokes = (url) => {
    getApiData(url).then(
      (allpokemon) => {
        allpokemon && allpokemon.results.forEach((pokemon) => {
          fetchPokemonData(pokemon); 
        })
      })
   }


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
    

      <Switch>
        <Route exact path="/">
          <SearchBar handleUserInput={handleUserInput} userInput={userInput} setSearch={setSearch}/>
          <MainView pokemons={pokemons} error={error} />
        </Route>

        <Route exact path="/scores">
          <ScoreView />
        </Route>

        <Route exact path="/:id">
            <DetailView />
        </Route>

        <Route exact path="/fight/:pokeId/:opponentId">
            <FightView />
        </Route>




      </Switch>
      <Footer />

    </div>
  );
} else {
  return <h1>WTF</h1>
}
}

export default App;