import './App.css';
import { Switch, Route } from "react-router-dom";
import SearchBar from './components/SearchBar/SearchBar'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'



function App() {

  const backendUrl = "https://poke-express-api.herokuapp.com/"
  console.log(backendUrl)

  return (
    <div className="App">

      {/* Placeholder for SearchBar */}
      <h1>Poke Fight</h1>

      <Switch>

        <Route exact path="/">
          {/* Placeholder for ALL POKEMONS */}
        </Route>

        <Route exact path="/:id">
            {/* Placeholder for ONE POKEMON */}
        </Route>

        <Route exact path="/fight">
            {/* Placeholder for POKEMON FIGHT */}
        </Route>

        <Route exact path="/scores">
            {/* Placeholder for SCORE */}
        </Route>

      </Switch>

      {/* Placeholder for FOOTER */}

    </div>
  );
}

export default App;
