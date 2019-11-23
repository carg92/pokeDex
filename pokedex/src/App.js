import React, { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "./services/pokedata";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './actions';
import { async } from "q";

function App() {
  const dispatch = useDispatch();
  const contador = useSelector(state => state.contador);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);

      setNextUrl(response.next);
      setPrevUrl(response.previous);
      setLoading(false);
      let pokemon = await loadingPokemon(response.results);
      console.log(pokemon);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async data => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  console.log(pokemonData);

  return (
    <div>
      {loading ? (
        <h1>Buscando tus pokemon...</h1>
      ) : (
          <>
            <Navbar />
            <h1>El número de pokemon en la página es {contador}</h1>
            <button onClick={() => dispatch(increment(2))}>+</button> &nbsp;
            <button onClick={() => dispatch(decrement(2))}>-</button>

            <div className="btn">
              <button onClick={prev}>Anterior</button>&nbsp;
              <button onClick={next}>Siguiente</button>
            </div>
            <div>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick="{prev}">Anterior</button>
              <button onClick="{next}">Siguiente</button>
            </div>
          </>
        )}
    </div>
  );
}

export default App;
